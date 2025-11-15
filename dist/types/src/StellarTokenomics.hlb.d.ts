import { CapoHeliosBundle } from "@donecollectively/stellar-contracts";
import type { Source } from "@helios-lang/compiler-utils";
/**
 * A CapoHeliosBundle subclass that can be used with generic UUTs.
 */
export default class StellarTokenomicsCapoBundle extends CapoHeliosBundle {
    static isAbstract: boolean;
    /**
     * Makes certain modules available on-demand for import by Capo plugins
     * @remarks
     * Only include modules here when they should force tightly-coupled
     * collaborating modules to be updated at the same time.  When any of
     * these modules are modified, it will cause all places where the imports
     * are used to be recompiled and force on-chain scripts to receive updates.
     *
     * Generally, it's safer to explicitly import any dependency modules to the respective plugins,
     * and to include only definitions here for data types that are not expected to require change.
     */
    get modules(): Source[];
}
//# sourceMappingURL=StellarTokenomics.hlb.d.ts.map