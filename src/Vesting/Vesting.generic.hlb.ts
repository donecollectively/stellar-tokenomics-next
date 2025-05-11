import { CapoHeliosBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import VestingPolicy from "./VestingPolicy.hl"

import VestingData from "./VestingData.hl";
import AbstractVestingBundle from "./Vesting.abstractBundle.js";

export default class GenericVestingBundle 
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

