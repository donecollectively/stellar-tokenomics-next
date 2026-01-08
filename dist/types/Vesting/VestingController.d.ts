import { DelegatedDataContract, StellarTxnContext } from "@donecollectively/stellar-contracts";
import type { AnyDataTemplate, minimalData } from "@donecollectively/stellar-contracts";
import type { minimalVestingData, VestingData, VestingDataLike } from "./Vesting.generic.typeInfo.js";
import VestingPolicyDataBridge from "./Vesting.generic.bridge.js";
export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any> ? T[K] : T[K] extends Record<any, any> ? Partial<T[K]> : T[K];
}>;
export type partialMinimalData<T extends AnyDataTemplate<any, any>> = PartialPartialData<minimalData<T>>;
/**
 * @public
 */
export declare class VestingController extends DelegatedDataContract<VestingData, VestingDataLike> {
    dataBridgeClass: typeof VestingPolicyDataBridge;
    scriptBundleClass(): Promise<import("@donecollectively/stellar-contracts").ConcreteCapoDelegateBundle>;
    idPrefix: string;
    get delegateName(): string;
    get recordTypeName(): "vesting";
    exampleData(): minimalVestingData;
    mkTxnCreatingVesting(this: VestingController, recData: minimalVestingData): Promise<import("@donecollectively/stellar-contracts").hasUutContext<string> & StellarTxnContext<import("@donecollectively/stellar-contracts").anyState> & import("@donecollectively/stellar-contracts").hasCharterRef & import("@donecollectively/stellar-contracts").hasSeedUtxo & import("@donecollectively/stellar-contracts").hasUutContext<"recordId" | "‹idPrefix (hint: declare with 'idPrefix = \"...\" as const')›">>;
    requirements(): import("@donecollectively/stellar-contracts").ReqtsMap<never, {
        inheriting: "\u2039empty/base class\u203A";
    }>;
}
//# sourceMappingURL=VestingController.d.ts.map