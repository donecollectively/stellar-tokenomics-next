import { 
    MintSpendDelegateBundle,
} from "@donecollectively/stellar-contracts"
import GenericTokenomicsCapoBundle from "./GenericTokenomicsCapo.hlb.js"
//@ts-expect-error because it doesn't recognize .hl files
import STokMintDelegateScript from "../../src/STokMintDelegate.hl"
import STokMintDelegateBundle from "../../src/STokMintDelegate.hlb.js"
import STokMintDelegateDataBridge from "./gtCapoMintDelegate.bridge.js"

export class gtCapoMintDelegateBundle 
extends STokMintDelegateBundle.usingCapoBundleClass(GenericTokenomicsCapoBundle) {
    specializedDelegateModule = STokMintDelegateScript
    dataBridgeClass = STokMintDelegateDataBridge
    
    requiresGovAuthority = true

    get delegateName() {
        return "gtCapoMintDelegate"
    }
}

export default gtCapoMintDelegateBundle;
