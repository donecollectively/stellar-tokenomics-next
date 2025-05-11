import { DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import VestingPolicy from "./VestingPolicy.hl"

import VestingData from "./VestingData.hl";
import VxfProtocol from "./VxfProtocol.hl";
import type { Source } from "@helios-lang/compiler-utils";

export default class AbstractVestingBundle 
extends DelegatedDataBundle {
    specializedDelegateModule = VestingPolicy;
    requiresGovAuthority = true;

    // includeFromCapoModules(): string[] {
    //     return [ 
    //         "TieredScale",
    //         "ArtistVaultData"
    //     ]
    // }


    get modules(): Source[] {
        return [
            ...super.modules,
            VestingData,
            VxfProtocol,
            // xxx Don't include ProtocolSettings here.  Instead, use any abstract settings
            // definition instead.
            // ProtocolSettings
        ];
    }
}

