import {
    CapoTestHelper,
    DefaultCapoTestHelper,
    type StellarTestContext,
    type TestHelperState,
    type TestHelperSubmitOptions,
} from "@donecollectively/stellar-contracts/testing";
import { MarketSaleCapo } from "./modules/MarketSaleCapo.js";
import { makeValue } from "@helios-lang/ledger";
import type {
    ErgoMarketSaleData,
    MarketSaleData,
    MarketSaleDataLike,
    minimalMarketSaleData,
} from "../MarketSale.concrete.typeInfo.js";
import {
    textToBytes,
    type FoundDatumUtxo,
    type SubmitOptions,
    type UutName,
} from "@donecollectively/stellar-contracts";
import type { MarketSaleController } from "../MarketSaleController.js";
import { equalsBytes } from "@helios-lang/codec-utils";
import type { MarketSaleDataWrapper } from "../MarketSaleDataWrapper.js";

export let helperState: TestHelperState<MarketSaleCapo> = {
    snapshots: {},
} as any;

export type MarketSale_TC = StellarTestContext<MarketSaleTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: MarketSale_TC, snapName: string): void;
    loadSnapshot(this: MarketSale_TC, snapName: string): void;
    reusableBootstrap(this: MarketSale_TC): Promise<MarketSaleCapo>;
};

export class MarketSaleTestHelper extends DefaultCapoTestHelper.forCapoClass(
    MarketSaleCapo
) {
    get stellarClass() {
        return MarketSaleCapo;
    }

    get capo(): MarketSaleCapo {
        return this.strella;
    }

    async mktSaleDgt() {
        return (await this.capo.getDgDataController(
            "mktSale"
        )) as MarketSaleController;
    }

    @CapoTestHelper.hasNamedSnapshot("firstMarketSale", "tina")
    async snapToFirstMarketSale() {
        throw new Error("never called");
        this.firstMarketSale();
    }

    async firstMarketSale() {
        this.setActor("tina");
        const controller = await this.mktSaleDgt();
        const mktSale = await controller.exampleData();
        return this.createMarketSale(mktSale);
    }

    async createMarketSale(
        mktSale: minimalMarketSaleData,
        options: {
            submit?: boolean;
        } = {}
    ) {
        const { submit = true } = options;

        const mktSaleDgt = await this.mktSaleDgt();
        const tcx = await mktSaleDgt.mkTxnCreateRecord({
            data: mktSale,
            // activity: mktSaleDgt.activity.MintingActivities.$seeded$CreatingRecord
        });

        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }

    async findMarketSale(x: string | UutName) {
        const mktSaleDgt = await this.mktSaleDgt();
        const found = await this.capo.findDelegatedDataUtxos({
            type: "mktSale",
            id: x,
        });
        return found[0];
        // return mktSaleDgt.findRecords({id: x});
    }

    async findFirstMarketSale() {
        const mktSaleDgt = await this.mktSaleDgt();
        const marketSales = await mktSaleDgt.findMarketSales({
            isRoot: true,
        });
        if (marketSales.length > 1) {
            throw new Error("expected only one market sale");
        }
        return marketSales[0];
    }

    @CapoTestHelper.hasNamedSnapshot("firstMarketSaleActivated", "tina")
    async snapToFirstMarketSaleActivated() {
        throw new Error("never called");
        this.firstMarketSaleActivated();
    }

    async firstMarketSaleActivated() {
        this.setActor("tina");
        await this.snapToFirstMarketSale();
        const marketSale = await this.findFirstMarketSale();
        return this.activateMarketSale(marketSale, {
            mintTokenName:
                marketSale.data!.moreFields.saleAssets.primaryAssetName,
        });
    }

    async activateMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        txnOptions: {
            mintTokenName?: string | number[];
            txnDescription?: string;
            futureDate?: Date;
        } = {},
        newAttrs: Partial<MarketSaleDataLike> = {}
    ) {
        const { capo } = this;
        const mktSaleDgt = await this.mktSaleDgt();
        const { futureDate, mintTokenName, txnDescription } = txnOptions;

        if (txnDescription) {
            console.log("  ----- ⚗️ " + txnDescription);
        }

        let tnBytes =
            typeof mintTokenName == "string"
                ? textToBytes(mintTokenName)
                : mintTokenName!;

        let remainingNeededTokenCount = 0n;
        if (mintTokenName) {
            const totalNeeded =
                marketSale.data!.moreFields.saleAssets.saleUnitAssets.multiply(
                    marketSale.data!.moreFields.saleAssets.totalSaleUnits
                );
            const needThisTokenCount = totalNeeded.assets
                .getPolicyTokens(capo.mph)
                ?.find(([tnb, _count]) => equalsBytes(tnBytes, tnb))?.[1];
            if (!needThisTokenCount) {
                throw new Error(
                    `token ${mintTokenName} not found in sale unit assets`
                );
            }

            const haveExistingTokens =
                marketSale.utxo.value.assets
                    .getPolicyTokens(capo.mph)
                    ?.find(([tnb, _count]) => equalsBytes(tnBytes, tnb))?.[1] ||
                0n;

            remainingNeededTokenCount = needThisTokenCount - haveExistingTokens;
        }

        const tcx = mintTokenName
            ? await capo.txnMintingFungibleTokens(
                  capo.mkTcx(
                      txnDescription || "mint fungibles and activate sale"
                  ),
                  mintTokenName,
                  remainingNeededTokenCount
              )
            : capo.mkTcx(
                  txnDescription || "activating sale with existing tokens"
              );

        const tcx2 = await mktSaleDgt.mkTxnActivateMarketSale(
            marketSale,
            makeValue(0n, [[capo.mph, [[tnBytes, remainingNeededTokenCount]]]]),
            {
                ...newAttrs,
            },
            tcx
        );
        return this.submitTxnWithBlock(tcx2, { futureDate });
    }

    async mintAndAddAssets(
        marketSale: FoundDatumUtxo<MarketSaleData>,
        mintTokenName: string | number[],
        mintTokenCount: bigint
    ) {
        const { capo } = this;
        const mktSaleDgt = await this.mktSaleDgt();
        const tcx = await capo.txnMintingFungibleTokens(
            capo.mkTcx("mint + add to market sale"),
            mintTokenName,
            mintTokenCount
        );
        const tcx2 = await mktSaleDgt.mkTxnAddToMarketSale(
            marketSale,
            capo.mph,
            mintTokenName,
            mintTokenCount,
            tcx
        );
        return this.submitTxnWithBlock(tcx2);
    }

    // @CapoTestHelper.hasNamedSnapshot("firstFundedPurposeWIthMarketSale", "tina")
    // async snapToFirstFundedPurposeWithMarketSale() {
    //     throw new Error("never called");
    //     return this.firstFundedPurposeWithMarketSale();
    // }

    // async firstFundedPurposeWithMarketSale() {
    //     await this.setActor("tina");
    //     await this.snapToFirstMarketSale();
    //     const marketSale = await this.findFirstMarketSale();

    //     return this.createFundedPurpose({
    //         ...sampleFundedPurpose,
    //         mktSale: marketSale.data.id,
    //     });
    // }

    async buyFromMktSale(
        marketSale: FoundDatumUtxo<MarketSaleData>,
        quantity: number | bigint = 1n,
        description: string = "buying from mktSale",
        submitOptions: TestHelperSubmitOptions = {}
    ) {
        const { capo } = this;
        const mktSaleDgt = await this.mktSaleDgt();
        if (description) {
            console.log("  ----- ⚗️ " + description);
        }

        let tcx = capo.mkTcx(description);

        const { futureDate } = submitOptions;
        const tcx2 = await mktSaleDgt.mkTxnBuyFromMarketSale(
            marketSale,
            {
                sellingUnitQuantity: quantity,
            },
            futureDate ? tcx.futureDate(futureDate) : tcx
        );

        return this.submitTxnWithBlock(tcx2, submitOptions);
    }
}
