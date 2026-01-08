import StellarTokenomicsCapoBundle from "../../../StellarTokenomics.hlb.js";
import type { Source } from "@helios-lang/compiler-utils"

import { 
    capoConfigurationDetails,
} from "@donecollectively/stellar-contracts";




export class MarketSaleCapoBundle 
extends StellarTokenomicsCapoBundle {
    static isAbstract = false;
    preConfigured = capoConfigurationDetails
    
    get modules(): Source[] {
        // optional
        return [
            ...super.modules,
            // NOTE: make each other module define its own settings area
            // ... and its abstract "record with my own needed settings"
            // ... without being subject to all changes that may arise over time
            // ... in the concrete & aggregated ProtocolSettings
            // ProtocolSettings,

        ];
    }
}

export default MarketSaleCapoBundle;