import type { Source } from "@helios-lang/compiler-utils";
declare const MarketSaleBundle_base: import("@donecollectively/stellar-contracts").ConcreteCapoDelegateBundle;
/**
 * @public
 */
export declare class MarketSaleBundle extends MarketSaleBundle_base {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get modules(): Source[];
}
export default MarketSaleBundle;
//# sourceMappingURL=MarketSale.hlb.d.ts.map