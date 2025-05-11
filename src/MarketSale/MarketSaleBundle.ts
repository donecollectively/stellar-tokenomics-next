import { CapoDelegateBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import MarketSalePolicy from "./MarketSalePolicy.hl"

import MarketSaleData from "./MarketSaleData.hl"
import SaleProgressDetails from "./SaleProgressDetails.hl"
import DynamicSaleV1 from "./DynamicSaleV1.hl"
import DynamicSaleV1Settings from "./DynamicSaleV1Settings.hl"
import VxfProtocol from "../Vesting/VxfProtocol.hl"

/**
 * @public
 */
export default class MarketSaleBundle extends DelegatedDataBundle {
    specializedDelegateModule = MarketSalePolicy
    requiresGovAuthority = true
    
    get modules() {
        return [
            ...super.modules,
            MarketSaleData,
            SaleProgressDetails,
            DynamicSaleV1,
            DynamicSaleV1Settings,
            VxfProtocol
        ]
    }

}

