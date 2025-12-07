import {
    CapoDelegateBundle,
    CapoHeliosBundle,
    DelegatedDataBundle,
} from "@donecollectively/stellar-contracts";
import MarketSalePolicy from "./MarketSalePolicy.hl";

import MarketSaleData from "./MarketSaleData.hl";
import SaleProgressDetails from "./SaleProgressDetails.hl";
import DynamicSaleV1 from "./DynamicSaleV1.hl";
import DynamicSaleV1Settings from "./DynamicSaleV1Settings.hl";
import VxfProtocol from "../VxfProtocol/VxfProtocol.hl";
import type { Source } from "@helios-lang/compiler-utils";

/**
 * @public
 */
export class MarketSaleBundle extends DelegatedDataBundle.usingCapoBundleClass(
    CapoHeliosBundle,
    "generic"
) {
    specializedDelegateModule = MarketSalePolicy;
    requiresGovAuthority = true;

    get modules() {
        return [
            ...super.modules,
            MarketSaleData,
            SaleProgressDetails,
            DynamicSaleV1,
            DynamicSaleV1Settings,
            VxfProtocol,
        ];
    }
}

export default MarketSaleBundle;
