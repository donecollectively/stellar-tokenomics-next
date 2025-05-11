import { 
    MintSpendDelegateBundle,
} from "@donecollectively/stellar-contracts"
import MarketSaleCapoBundle from "./MarketSaleCapo.hlb.js"
import STokMintDelegateScript from "../../../STokMintDelegate.hl"
import STokMintDelegateBundle from "../../../STokMintDelegate.hlb.js"
import STokMintDelegateDataBridge from "./msCapoMintDelegate.bridge.js"

export class msCapoMintDelegateBundle 
extends STokMintDelegateBundle.usingCapoBundleClass(MarketSaleCapoBundle) {
    specializedDelegateModule = STokMintDelegateScript
    dataBridgeClass = STokMintDelegateDataBridge
    
    requiresGovAuthority = true

    get delegateName() {
        return "msCapoMintDelegate"
    }
}

export default msCapoMintDelegateBundle;
