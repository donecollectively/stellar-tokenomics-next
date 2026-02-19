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
} from "../MarketSale.typeInfo.js";
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
            "mktSale",
            {
                onchain: false,
            }
        )) as MarketSaleController;
    }

    @CapoTestHelper.hasNamedSnapshot({
        actor: "tina",
        parentSnapName: "bootstrapped",
    })
    async snapToFirstMarketSale() {
        throw new Error("never called; see firstMarketSale()");
        return this.firstMarketSale();
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

    @CapoTestHelper.hasNamedSnapshot({
        actor: "tina",
        parentSnapName: "firstMarketSale",
    })
    async snapToFirstMarketSaleActivated() {
        throw new Error("never called; see firstMarketSaleActivated()");
        return this.firstMarketSaleActivated();
    }

    async firstMarketSaleActivated() {
        this.setActor("tina");
        const marketSale = await this.findFirstMarketSale();
        return this.activateMarketSale(marketSale, {
            mintTokenName:
                marketSale.data!.details.V1.saleAssets.primaryAssetName,
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
                marketSale.data!.details.V1.saleAssets.saleLotAssets.multiply(
                    marketSale.data!.details.V1.saleAssets.totalSaleLots
                );
            const needThisTokenCount = totalNeeded.assets
                .getPolicyTokens(capo.mph)
                ?.find(([tnb, _count]) => equalsBytes(tnBytes, tnb))?.[1];
            if (!needThisTokenCount) {
                throw new Error(
                    `token ${mintTokenName} not found in sale lot assets`
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

        const yesMintThem = true;
        const tcx2 = await mktSaleDgt.mkTxnAddToMarketSale(
            marketSale,
            capo.mph,
            mintTokenName,
            mintTokenCount,
            yesMintThem
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
                lotsPurchased: quantity,
            },
            futureDate ? tcx.futureDate(futureDate) : tcx
        );

        return this.submitTxnWithBlock(tcx2, submitOptions);
    }

    async updatePendingMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData>,
        updatedFields: Partial<MarketSaleDataLike>,
        description: string = "updating pending market sale",
        submitOptions: TestHelperSubmitOptions = {}
    ) {
        const { capo } = this;
        const mktSaleDgt = await this.mktSaleDgt();
        if (description) {
            console.log("  ----- ⚗️ " + description);
        }

        const tcx = capo.mkTcx(description);
        const existingSale = marketSale.data!;
        if (!existingSale) {
            throw new Error("mktSale not found");
        }

        const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(
            marketSale,
            {
                txnName: description,
                activity:
                    mktSaleDgt.activity.SpendingActivities.UpdatingPendingSale(
                        existingSale.details.V1.threadInfo.saleId
                    ),
                updatedFields,
            },
            tcx
        );

        return this.submitTxnWithBlock(tcx2, submitOptions);
    }

    // ============================================================
    // SKETCH: Paused Sale Management helpers
    // Pre-work sketch — coder fills in TODOs
    // ============================================================

    @CapoTestHelper.hasNamedSnapshot({
        actor: "tina",
        parentSnapName: "firstMarketSaleActivated",
    })
    async snapToFirstMarketSalePaused() {
        throw new Error("never called; see firstMarketSalePaused()");
        return this.firstMarketSalePaused();
    }

    async firstMarketSalePaused() {
        this.setActor("tina");
        const activeSale = await this.findFirstMarketSale();
        return this.stopMarketSale(activeSale);
    }

    @CapoTestHelper.hasNamedSnapshot({
        actor: "tina",
        parentSnapName: "firstMarketSalePaused",
    })
    async snapToFirstMarketSaleResumed() {
        throw new Error("never called; see firstMarketSaleResumed()");
        return this.firstMarketSaleResumed();
    }

    async firstMarketSaleResumed() {
        this.setActor("tina");
        const pausedSale = await this.findFirstMarketSale();
        return this.resumeMarketSale(pausedSale);
    }

    async stopMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        submitOptions: TestHelperSubmitOptions = {}
    ) {
        const mktSaleDgt = await this.mktSaleDgt();
        const existingSale = marketSale.data!;
        console.log("  ----- ⚗️ stopping market sale");

        const tcx = this.capo.mkTcx("stop market sale");
        // TODO: coder builds Stopping txn using mkTxnUpdateRecord + Stopping activity
        // const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(
        //     marketSale,
        //     {
        //         txnName: "stop market sale",
        //         activity: mktSaleDgt.activity.SpendingActivities.Stopping(
        //             existingSale.details.V1.threadInfo.saleId
        //         ),
        //         updatedFields: {
        //             details: { V1: { ...existingSale.details.V1,
        //                 saleState: { ...existingSale.details.V1.saleState,
        //                     state: { Paused: {} },
        //                 },
        //             }},
        //         },
        //     },
        //     tcx
        // );
        // return this.submitTxnWithBlock(tcx2, submitOptions);
        throw new Error("TODO: implement stopMarketSale");
    }

    async resumeMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        submitOptions: TestHelperSubmitOptions = {},
        overrideFields: Partial<MarketSaleDataLike> = {}
    ) {
        const mktSaleDgt = await this.mktSaleDgt();
        const existingSale = marketSale.data!;
        console.log("  ----- ⚗️ resuming market sale");

        const tcx = this.capo.mkTcx("resume market sale");
        // TODO: coder builds Resuming txn using mkTxnUpdateRecord + Resuming activity
        // const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(
        //     marketSale,
        //     {
        //         txnName: "resume market sale",
        //         activity: mktSaleDgt.activity.SpendingActivities.Resuming(
        //             existingSale.details.V1.threadInfo.saleId
        //         ),
        //         updatedFields: {
        //             details: { V1: { ...existingSale.details.V1,
        //                 saleState: { ...existingSale.details.V1.saleState,
        //                     state: { Active: {} },
        //                 },
        //             }},
        //             ...overrideFields,
        //         },
        //     },
        //     tcx
        // );
        // return this.submitTxnWithBlock(tcx2, submitOptions);
        throw new Error("TODO: implement resumeMarketSale");
    }

    async updatePausedMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData>,
        updatedFields: Partial<MarketSaleDataLike>,
        description: string = "updating paused market sale",
        submitOptions: TestHelperSubmitOptions = {}
    ) {
        const mktSaleDgt = await this.mktSaleDgt();
        const existingSale = marketSale.data!;
        console.log("  ----- ⚗️ " + description);

        const tcx = this.capo.mkTcx(description);
        // TODO: coder builds UpdatingPausedSale txn — same pattern as updatePendingMarketSale
        // const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(
        //     marketSale,
        //     {
        //         txnName: description,
        //         activity: mktSaleDgt.activity.SpendingActivities.UpdatingPausedSale(
        //             existingSale.details.V1.threadInfo.saleId
        //         ),
        //         updatedFields,
        //     },
        //     tcx
        // );
        // return this.submitTxnWithBlock(tcx2, submitOptions);
        throw new Error("TODO: implement updatePausedMarketSale");
    }

    async retireMarketSale(
        marketSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        submitOptions: TestHelperSubmitOptions = {}
    ) {
        const mktSaleDgt = await this.mktSaleDgt();
        const existingSale = marketSale.data!;
        console.log("  ----- ⚗️ retiring market sale");

        const tcx = this.capo.mkTcx("retire market sale");
        // TODO: coder builds Retiring txn
        // const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(
        //     marketSale,
        //     {
        //         txnName: "retire market sale",
        //         activity: mktSaleDgt.activity.SpendingActivities.Retiring(
        //             existingSale.details.V1.threadInfo.saleId
        //         ),
        //         updatedFields: {
        //             details: { V1: { ...existingSale.details.V1,
        //                 saleState: { ...existingSale.details.V1.saleState,
        //                     state: { Retired: {} },
        //                 },
        //             }},
        //         },
        //     },
        //     tcx
        // );
        // return this.submitTxnWithBlock(tcx2, submitOptions);
        throw new Error("TODO: implement retireMarketSale");
    }

    // ============================================================
    // END SKETCH
    // ============================================================

    @CapoTestHelper.hasNamedSnapshot({
        actor: "tina",
        parentSnapName: "firstMarketSale",
    })
    async snapToPackagedPendingUpdate() {
        throw new Error("never called; see packagedPendingUpdate()");
        return this.packagedPendingUpdate();
    }

    _cachedNow : number = Date.now();
    packagedUpdateDetails() {
        return {
            name: "Updated Market Sale Name",
            startAt: this._cachedNow + 1000 * 60 * 60 * 24, // 1 day from now
            totalSaleLots: 2000n,
            singleBuyMaxLots: 50n,
            primaryAssetTargetCount: 200_000_000n,
            targetPrice: 1.5,
        };

    }

    async packagedPendingUpdate(
        submitOptions?: TestHelperSubmitOptions
    ) {
        this.setActor("tina");
        const marketSale = await this.findFirstMarketSale();

        const updateDetails = this.packagedUpdateDetails();
        // Calculate KRILL per lot: original was 1000n per lot, so for 2000 lots it should be 2000n per lot
        const newsaleLotAssets = makeValue(
            this.capo.mph,
            marketSale.data!.details.V1.saleAssets.primaryAssetName,
            updateDetails.primaryAssetTargetCount / updateDetails.totalSaleLots
        ).add(
            makeValue(
                this.capo.mph,
                textToBytes("KRILL"),
                (updateDetails.totalSaleLots * 1000n) / updateDetails.totalSaleLots
            )
        );

        await this.updatePendingMarketSale(
            marketSale,
            {
                name: updateDetails.name,
                details: {
                    V1: {
                        ...marketSale.data!.details.V1,
                        fixedSaleDetails: {
                            ...marketSale.data!.details.V1.fixedSaleDetails,
                            startAt: updateDetails.startAt,
                            settings: {
                                ...marketSale.data!.details.V1.fixedSaleDetails
                                    .settings,
                                targetPrice: updateDetails.targetPrice,
                            },
                        },
                        saleAssets: {
                            ...marketSale.data!.details.V1.saleAssets,
                            totalSaleLots: updateDetails.totalSaleLots,
                            singleBuyMaxLots: updateDetails.singleBuyMaxLots,
                            primaryAssetTargetCount: updateDetails.primaryAssetTargetCount,
                            saleLotAssets: newsaleLotAssets,
                        },
                    },
                },
            },
            "updating all allowed fields",
            submitOptions
        );
    }
}

// Export pre-wired describe/it - tests import these instead of from vitest
export const { describe, it, fit, xit } = MarketSaleTestHelper.createTestContext();
