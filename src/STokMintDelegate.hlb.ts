import { CapoHeliosBundle, MintSpendDelegateBundle, type ConcreteCapoDelegateBundle } from "@donecollectively/stellar-contracts"
import type { Source } from "@helios-lang/compiler-utils"
import tokenomicsBasicMintDelegate from "./STokMintDelegate.hl"
import StellarTokenomicsCapoBundle from "./StellarTokenomics.hlb.js";

/**
 * A specialized minting delegate for testing purposes
 * @public
 */
export class STokMintDelegateBundle 
extends MintSpendDelegateBundle.usingCapoBundleClass(
    StellarTokenomicsCapoBundle
) {
    specializedDelegateModule = tokenomicsBasicMintDelegate
    requiresGovAuthority = true

    get delegateName() {
        return "STokMintDelegate"
    }

}

export default STokMintDelegateBundle;

type IsStokMintDelegate = {
    specializedDelegateModule: typeof tokenomicsBasicMintDelegate
    requiresGovAuthority: true
}

export type Constructor<T> = new (...args: any[]) => T;
/**
 * Creates a typed helper class to use as a mint delegate for tokenomics subclasses
 * 
 * ## Usage:
 * In your `MyMintDelegate.hlb.ts`:
 * ```typescript
 *    export const MyMintDelegate = makeSTokMintDelegateBundle(MyCapoBundle, "MyMintDelegate")
 *    export default MyMintDelegate
 * ```
 * This HLB file will be compiled to make  `.bridge.ts` and `.typeInfo.ts` for your delegate.  Import
 * the DataBridge and make your `MySpendMintDelegate.ts`, extending `STokMintDelegate` 
 * and using:
 * ```typescript
 * export class MyMintSpendDelegate extends STokMintDelegate {
 *    get delegateName() {
 *        return "MyMintSpendDelegate";
 *    }
 *    dataBridgeClass = MyMintSpendDelegateDataBridge;
 *     scriptBundle(): CapoDelegateBundle {
 *        return MyMintSpendDelegateBundle.create();
 *     }
 * ```
 * 
 * Use your Mint Delegate class in your Capo:
 * ```typescript
 * delegateRoles({
 *    spendDelegate: defineRole("spendDgt", MyMintSpendDelegate, {}),
 *    mintDelegate: defineRole("mintDgt", MyMintSpendDelegate, {}),
 * })
 * ```
 * 
 * @public
 */
export function makeSTokMintDelegateBundle<CapoBundleType extends typeof CapoHeliosBundle>(
    capoBundle: CapoBundleType,
    delegateName: string
) : Constructor<STokMintDelegateBundle & IsStokMintDelegate> & ConcreteCapoDelegateBundle {
    const base = STokMintDelegateBundle.usingCapoBundleClass(capoBundle)
    abstract class SpecificDelegateBundle extends base {
        specializedDelegateModule = tokenomicsBasicMintDelegate
        requiresGovAuthority = true
        delegateName = delegateName
    }
    return SpecificDelegateBundle as any
    // Constructor<STokMintDelegateBundle & IsStokMintDelegate>
}