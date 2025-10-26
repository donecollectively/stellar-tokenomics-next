import { CapoHeliosBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import VestingPolicy from "./VestingPolicy.hl"

import VestingData from "./VestingData.hl";
import AbstractVestingBundle from "./Vesting.abstractBundle.js";

export class GenericVestingBundle 
extends AbstractVestingBundle.usingCapoBundleClass(CapoHeliosBundle) {
    specializedDelegateModule = VestingPolicy;
    requiresGovAuthority = true;

    // includeFromCapoModules(): string[] {
    //     return [ 
    //         "TieredScale",
    //         "ArtistVaultData"
    //     ]
    // }
}

export default GenericVestingBundle;