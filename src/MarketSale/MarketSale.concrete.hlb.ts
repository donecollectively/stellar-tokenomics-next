import MarketSalePolicy from "./MarketSalePolicy.hl"
import MarketSaleData from "./MarketSaleData.hl"
// import SaleStrategies from "./SaleStrategies.hl"

import { CapoDelegateBundle, CapoHeliosBundle, type HeliosOptimizeOptions } from "@donecollectively/stellar-contracts"
import MarketSaleBundle from "./MarketSaleBundle.js"
/**
 * This concrete bundle for MarketSale presumes use in a basic Capo bundle
 * @remarks
 * Provides type-generation for the MarketSale module.  
 * 
 * #### Can it be used as is?
 * 
 * Yes, IF there are no dependencies on Capo's Settings data structure details.
 * It's okay for the contract to have an abstract requirement for that settings structure
 * to have a specific field whose nested type is concrete in our definition.
 * 
 * ... or to import a dependency on a concrete settings module.
 * @public
 */ 

export default class ConcreteMarketSaleBundle 
extends MarketSaleBundle.usingCapoBundleClass(CapoHeliosBundle) {
    requiresGovAuthority = true
    specializedDelegateModule = MarketSalePolicy
    
    // get modules() {
    //     return [
    //         ...super.modules,
    //         MarketSaleData,
    //         SaleStrategies
    //     ]
    // }

    // get optimize() : HeliosOptimizeOptions {
    //     return {
    //         inlineSimpleExprs: false
    //     }
    // }
    get optimize() { return true }
}
