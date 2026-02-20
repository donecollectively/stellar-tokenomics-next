// import { Capo } from "@donecollectively/stellar-contracts";

import {
    Capo,
    defineRole,
    delegateRoles,
    mkValuesEntry,
    StellarTxnContext,
    textToBytes,
} from "@donecollectively/stellar-contracts";
import MarketSaleCapoBundle from "./MarketSaleCapo.hlb.js";
import { MarketSaleController } from "../../MarketSaleController.js";
import { STokMintDelegate } from "../../../STokMintDelegate.js";
import type { CapoDatum$Ergo$CharterData } from "../../MarketSale.typeInfo.js";

import {STokMintDelegateDataBridge as msCapoMintDelegateDataBridge} from "./msCapoMintDelegate.bridge.js";
import msCapoMintDelegateBundle from "./msCapoMintDelegate.hlb.js";

type MktSaleFeatures = {
    mktSale: boolean;
};

class ConcreteMSC extends MarketSaleController {
    static async scriptBundleClass() {
        const module = await import("../../MarketSale.hlb.js");
        
        return module.MarketSaleBundle
    }
}

class msCapoMintDelegate extends STokMintDelegate {
    get delegateName() {
        return "msCapoMintDelegate";
    }
    dataBridgeClass = msCapoMintDelegateDataBridge;
    static async scriptBundleClass() {
        return msCapoMintDelegateBundle
    }
}

export class MarketSaleCapo extends Capo<MarketSaleCapo, MktSaleFeatures> {
    autoSetup = true;
    
    static async scriptBundleClass() {
        return MarketSaleCapoBundle
    }

    get defaultFeatureFlags(): MktSaleFeatures {
        return {
            mktSale: true,
        };
    }

    initDelegateRoles() {
        const inh = super.basicDelegateRoles();
        const { mintDelegate: parentMD, spendDelegate, govAuthority } = inh;

        return delegateRoles({
            govAuthority,
            spendDelegate: defineRole("spendDgt", msCapoMintDelegate, {}),
            mintDelegate: defineRole("mintDgt", msCapoMintDelegate, {}),
            ...(this.featureEnabled("mktSale")
                ? {
                      mktSale: defineRole(
                          "dgDataPolicy",
                          ConcreteMSC,
                          {}
                      ),
                  }
                : {}),
        });
    }

    async getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<msCapoMintDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    async getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<msCapoMintDelegate> {
        return super.getSpendDelegate(charterData) as any;
    }


    async txnMintingFungibleTokens<TCX extends StellarTxnContext>(
        tcx: TCX,
        tokenName: string | number[],
        tokenCount: bigint
    ) {
        // todo: allow this by explicit commission of the token,
        //   ... with minting details found in that token-commission

        if (typeof tokenName === "string") {
            tokenName = textToBytes(tokenName);
        }
        const mintDgt = await this.getMintDelegate();
        const tcx2 = await this.tcxWithCharterRef(tcx);
        const tcx2a = await this.txnAddGovAuthority(tcx2);
        const minter = this.minter;

        return minter.txnMintWithDelegateAuthorizing(
            tcx2a,
            [mkValuesEntry(tokenName, tokenCount)],
            mintDgt,
            mintDgt.activity.MintingActivities.MintingFungibleTokens(tokenName)
        );
    }
}
    