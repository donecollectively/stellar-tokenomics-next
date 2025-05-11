import { MintSpendDelegateBundle } from "@donecollectively/stellar-contracts";
import STokMintDelegateScript from "../../../STokMintDelegate.hl";
import { VestingCapoBundle } from "./VestingCapo.hlb.js";
import { STokMintDelegateBundle } from "../../../STokMintDelegate.hlb.js";
import STokMintDelegateDataBridge from "./vCapoMintDelegate.bridge.js";

export class vCapoMintDelegateBundle 
extends STokMintDelegateBundle.usingCapoBundleClass(
    VestingCapoBundle
) {
    specializedDelegateModule = STokMintDelegateScript;
    requiresGovAuthority = true;
    dataBridgeClass = STokMintDelegateDataBridge;
    
    get delegateName() {
        return "vCapoMintDelegate";
    }
}

export default vCapoMintDelegateBundle;
