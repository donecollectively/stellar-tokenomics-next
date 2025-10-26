// import { Capo } from "@donecollectively/stellar-contracts";

import {
    Capo,
    defineRole,
    delegateRoles,
    mkValuesEntry,
    StellarTxnContext,
    textToBytes,
} from "@donecollectively/stellar-contracts";
import VestingCapoBundle from "./VestingCapo.hlb.js";
import { VestingController } from "../../VestingController.js";
import { STokMintDelegate } from "../../../STokMintDelegate.js";
import type { CapoDatum$Ergo$CharterData } from "../../Vesting.generic.typeInfo.js";
import {
    STokMintDelegateDataBridge as vCapoMintDelegateBridge
} from "./vCapoMintDelegate.bridge.js";
import {vCapoMintDelegateBundle} from "./vCapoMintDelegate.hlb.js";

type VestingFeatures = {
    vesting: boolean;
};

class vCapoMintDelegate extends STokMintDelegate {
    get delegateName() {
        return "vCapoMintDelegate";
    }
    dataBridgeClass = vCapoMintDelegateBridge;
    async scriptBundleClass() {
        return vCapoMintDelegateBundle
    }
}

export class VestingCapo extends Capo<VestingCapo, VestingFeatures> {
    autoSetup = true;
    
    async scriptBundleClass() {
        return VestingCapoBundle
    }

    get defaultFeatureFlags(): VestingFeatures {
        return {
            vesting: true,
        };
    }

    initDelegateRoles() {
        const inh = super.basicDelegateRoles();
        const { mintDelegate: parentMD, spendDelegate, govAuthority } = inh;

        return delegateRoles({
            govAuthority,
            spendDelegate: defineRole("spendDgt", vCapoMintDelegate, {}),
            mintDelegate: defineRole("mintDgt", vCapoMintDelegate, {}),
            ...(this.featureEnabled("vesting")
                ? {
                      vesting: defineRole(
                          "dgDataPolicy",
                          VestingController,
                          {}
                      ),
                  }
                : {}),
        });
    }

    async getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<vCapoMintDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    async getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<vCapoMintDelegate> {
        return super.getSpendDelegate(charterData) as any;
    }


    // for tokenomics plugins:
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
