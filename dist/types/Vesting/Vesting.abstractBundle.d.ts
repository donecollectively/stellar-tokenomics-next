import { DelegatedDataBundle } from "@donecollectively/stellar-contracts";
import type { Source } from "@helios-lang/compiler-utils";
export default class AbstractVestingBundle extends DelegatedDataBundle {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get modules(): Source[];
}
//# sourceMappingURL=Vesting.abstractBundle.d.ts.map