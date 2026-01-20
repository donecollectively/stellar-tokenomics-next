import { CapoHeliosBundle, CharterData, defineRole, delegateRoles, FoundDatumUtxo } from "@donecollectively/stellar-contracts";
import { GenericTokenomicsFeatureFlags, StellarTokenomicsCapo } from "../../src/StellarTokenomicsCapo";
import { TxInput } from "@helios-lang/ledger";
import { STokMintDelegate } from "../../src/STokMintDelegate";
import type { CapoDatum$Ergo$CharterData } from "../../src/STokMintDelegate.typeInfo";
import { MarketSaleController } from "../../src/MarketSale/MarketSaleController";
import {STokMintDelegateDataBridge as gtCapoMintDelegateDataBridge} from "./gtCapoMintDelegate.bridge.js";
import { gtCapoMintDelegateBundle } from "./gtCapoMintDelegate.hlb.js";

const featureFlags: GenericTokenomicsFeatureFlags = {
    mktSale: true,
    vesting: true,
    fundedPurpose: true,
}

class gtCapoMintDelegate extends STokMintDelegate {
    get delegateName() {
        return "gtCapoMintDelegate";
    }

    dataBridgeClass = gtCapoMintDelegateDataBridge;
    static async scriptBundleClass() {
        return gtCapoMintDelegateBundle
    }
}

/**
 * @public
 */
export class GenericTokenomicsCapo extends 
StellarTokenomicsCapo<
    GenericTokenomicsCapo, 
    GenericTokenomicsFeatureFlags
> {

    static async scriptBundleClass() {
        return CapoHeliosBundle
    }

    get defaultFeatureFlags() {
        return featureFlags;
    }

    // async findSettingsInfo(options: {
    //     charterData: CharterData;
    //     capoUtxos?: TxInput[];
    // }): Promise<FoundDatumUtxo<
    //     ErgoProtocolSettings, 
    //     BaseTokenomicsSettings
    // >> {
    //     return super.findSettingsInfo(options) as any;
    // }


    async getMintDelegate(
        charterData?: CapoDatum$Ergo$CharterData
    ): Promise<STokMintDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    async getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<STokMintDelegate> {
        return super.getSpendDelegate(charterData) as any;
    }

    // /**
    //  * Fetches the off-chain class providing access to the listener vault
    //  * @public
    //  */
    // async getFundedPurposeController(charterData: CharterData): Promise<FundedPurposeController> {
    //     return this.getDgDataController("listenerVault") as any;
    // }

    /**
     * Fetches the off-chain class for access to the artist/album vault
     * @public
     */
    async getMarketSaleController(options: {
        charterData?: CharterData;
        onchain?: boolean;
    } = {
        onchain: true,
    }): Promise<MarketSaleController> {
        const {
            charterData = await this.findCharterData(),
            onchain = true,
        } = options;
        return this.getDgDataController("mktSale", {
            charterData: charterData as CapoDatum$Ergo$CharterData,
            onchain,
        }) as Promise<MarketSaleController>;
    }

    // async mkInitialSettings(): Promise<minimalProtocolSettings> {
    //     return {}
    // }
    

    initDelegateRoles() {
        const inh = super.basicDelegateRoles();

        const { mintDelegate: parentMD, spendDelegate, govAuthority } = inh;

        const myDelegates = delegateRoles({
            govAuthority,
            spendDelegate: defineRole("spendDgt", gtCapoMintDelegate, {}),
            mintDelegate: defineRole("mintDgt", gtCapoMintDelegate, {}),
            ...(this.featureEnabled("mktSale") ? {
                mktSale: defineRole("dgDataPolicy", MarketSaleController, {}),
            } : {}),
            // ...(this.featureEnabled("fundedPurpose") ? {
            //     fundedPurpose: defineRole("dgDataPolicy", FundedPurposeController, {}),
            // } : {}),
        })
        return myDelegates;
    }
}
