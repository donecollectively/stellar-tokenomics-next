import { BasicMintDelegate } from "@donecollectively/stellar-contracts";
/**
 * Base class for mint/spend delegates
 * @public
 */
export declare class STokMintDelegate extends BasicMintDelegate {
    get delegateName(): string;
    constructor(...args: any[]);
    scriptBundleClass(): Promise<any>;
}
//# sourceMappingURL=STokMintDelegate.d.ts.map