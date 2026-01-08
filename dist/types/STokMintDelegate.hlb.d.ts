import { CapoHeliosBundle, type ConcreteCapoDelegateBundle } from "@donecollectively/stellar-contracts";
import type { Source } from "@helios-lang/compiler-utils";
import tokenomicsBasicMintDelegate from "./STokMintDelegate.hl";
/**
 * @public
 */
declare const stmdbBase: ConcreteCapoDelegateBundle;
/**
 * A specialized minting delegate for testing purposes
 * @public
 */
export declare class STokMintDelegateBundle extends stmdbBase {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get delegateName(): string;
}
export default STokMintDelegateBundle;
/**
 * @public
 */
export type IsStokMintDelegate = {
    specializedDelegateModule: typeof tokenomicsBasicMintDelegate;
    requiresGovAuthority: true;
};
/**
 * @public
 */
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
 * This HLB file will be compiled to make  `.bridge.ts` and `.typeInfo.d.ts` for your delegate.  Import
 * the DataBridge and make your `MySpendMintDelegate.ts`, extending `STokMintDelegate`
 * and using:
 * ```typescript
 * export class MyMintSpendDelegate extends STokMintDelegate {
 *    get delegateName() {
 *        return "MyMintSpendDelegate";
 *    }
 *    dataBridgeClass = MyMintSpendDelegateDataBridge;
 *     async scriptBundleClass(): Promise<CapoDelegateBundle> {
 *        const module = await import("./MyMintSpendDelegate.hlb");
 *        return module.MyMintSpendDelegateBundle
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
export declare function makeSTokMintDelegateBundle(capoBundle: typeof CapoHeliosBundle, delegateName: string): ConcreteCapoDelegateBundle & Constructor<STokMintDelegateBundle & IsStokMintDelegate>;
//# sourceMappingURL=STokMintDelegate.hlb.d.ts.map