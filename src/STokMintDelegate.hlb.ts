import { MintSpendDelegateBundle } from "@donecollectively/stellar-contracts"
import type { Source } from "@helios-lang/compiler-utils"
import stellarBaseMintDelegate from "./STokMintDelegate.hl"
import StellarTokenomicsCapoBundle from "./StellarTokenomics.hlb.js";

/**
 * A specialized minting delegate for testing purposes
 * @public
 */
export class STokMintDelegateBundle 
extends MintSpendDelegateBundle.usingCapoBundleClass(
    StellarTokenomicsCapoBundle
) {
    specializedDelegateModule = stellarBaseMintDelegate
    requiresGovAuthority = true

    get delegateName() {
        return "STokMintDelegate"
    }

}

export default STokMintDelegateBundle;