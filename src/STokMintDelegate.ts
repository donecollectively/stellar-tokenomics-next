import {
    Activity,
    BasicMintDelegate,
    HeliosScriptBundle,
    type SeedAttrs,
    UutName,
    type hasSeed,
    type isActivity,
} from "@donecollectively/stellar-contracts";
// import STokMintDelegateBundle from "./STokMintDelegate.hlb.js";
import STokMintDelegateDataBridge from "./STokMintDelegate.bridge.js";

/**
 * Base class for mint/spend delegates
 * @public
 */
export class STokMintDelegate extends BasicMintDelegate {
    // MAINTAINERS NOTE: DO NOT EXPOSE THIS DATA BRIDGE CLASS.
    // dataBridgeClass = STokMintDelegateDataBridge;
    // INSTEAD, Subclasses should assign their own dataBridgeClass.

    // ditto, scriptBundle()
    // scriptBundle() {
    //     console.warn("STokMintDelegate.scriptBundle(): using default on-chain scripts\n"+
    //         "  ... override this method in your subclass to use custom on-chain scripts\n"+
    //         "  ... also, provide a custom `get delegateName()` and dataBridgeClass = ..."
    //     );
    //     return STokMintDelegateBundle.create()
    // }

    get delegateName() {
        return "STokMintDelegate";
    }

    constructor(...args: any[]) {
        //@ts-ignore
        super(...args);
        (this.constructor as typeof STokMintDelegate).scriptBundleClass(); // check that there's a scriptBundle method
    }

    static async scriptBundleClass() {
        throw new Error(`${this.constructor.name}: required method scriptBundleClass not implemented for subclass of STokMintDelegate`);
        return null as any
    }

    // @Activity.redeemer
    // activityMintingParticipantToken(seedFrom: hasSeed) : isActivity {
    //     const seed = this.getSeed(seedFrom)
    //     return  this.mkSeededMintingActivity("MintingParticipantToken", seed);
    // }
    // _m : HeliosModuleSrc
    // get specializedMintDelegate(): HeliosModuleSrc {
    //     if (this._m) return this._m
    //     return this._m = mkHeliosModule(SpecialMintDelegate, "specializedDelegate");
    // }
}
