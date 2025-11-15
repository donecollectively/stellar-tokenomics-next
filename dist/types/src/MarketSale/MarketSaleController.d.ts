import { StellarTxnContext, WrappedDgDataContract } from "@donecollectively/stellar-contracts";
import type { FoundDatumUtxo, hasSettingsRef, hasCharterRef, isActivity } from "@donecollectively/stellar-contracts";
import { type MintingPolicyHash, type Value } from "@helios-lang/ledger";
import { MarketSaleDataWrapper } from "./MarketSaleDataWrapper.js";
import MarketSalePolicyDataBridge from "./MarketSale.bridge.js";
import type { ErgoMarketSaleData, MarketSaleData, MarketSaleDataLike, minimalMarketSaleData } from "./MarketSale.typeInfo.js";
export type { ErgoMarketSaleData, MarketSaleData, MarketSaleDataLike, minimalMarketSaleData, } from "./MarketSale.typeInfo.js";
/**
 * @public
 */
export type PurchaseContext = {
    prevSale: MarketSaleDataWrapper;
    now: Date;
    unitCount: bigint;
};
/**
 * @public
 */
export declare class MarketSaleController extends WrappedDgDataContract<MarketSaleData, MarketSaleDataLike, MarketSaleDataWrapper> {
    dataBridgeClass: typeof MarketSalePolicyDataBridge;
    get recordTypeName(): string;
    get idPrefix(): string;
    scriptBundleClass(): Promise<typeof import("./MarketSale.hlb.js").MarketSaleBundle>;
    exampleData(): minimalMarketSaleData;
    findMarketSales({ saleId, parentId, isRoot, pending, active, retired, }: {
        saleId?: string;
        parentId?: string;
        isRoot?: boolean;
        pending?: boolean;
        active?: boolean;
        retired?: boolean;
    }): Promise<FoundDatumUtxo<MarketSaleData>[]>;
    /**
     * returns a timestamp for expected expiration of the discount
     *
     * @param tcx - transaction context with settings
     * @returns
     */
    getExpiry<TCX extends StellarTxnContext & hasSettingsRef>(tcx: TCX): Promise<Date>;
    beforeCreate(data: MarketSaleData): MarketSaleData;
    mkTxnActivateMarketSale<TCX extends hasCharterRef | StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, addedTokenValue: Value | undefined, newAttrs: Partial<MarketSaleDataLike>, tcx?: TCX): Promise<TCX>;
    mkTxnAddToMarketSale<TCX extends hasCharterRef>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData>, addedTokenMph: MintingPolicyHash, addedTokenName: string | number[], addedTokenCount: number | bigint, tcx?: TCX): Promise<TCX>;
    saleTokenValue(itemDetails: FoundDatumUtxo<MarketSaleData>, sellingUnitQuantity?: number | bigint): Value;
    mkTxnBuyFromMarketSale<TCX extends StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, { sellingUnitQuantity, delegateActivity, }: {
        sellingUnitQuantity: number | bigint;
        delegateActivity?: isActivity;
    }, tcxIn?: TCX): Promise<StellarTxnContext<import("@donecollectively/stellar-contracts").anyState>>;
    /**
     * mockable method for updating sale data, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedDetails(msd: MarketSaleData, pmsd: Partial<MarketSaleData>): Partial<MarketSaleData>;
    /**
     * mockable method for updating progress details for a sale, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedProgressDetails({ lastPurchaseAt, prevPurchaseAt, chunkUnitCount, chunkUnitsSold, }: MarketSaleData["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleData["details"]["V1"]["saleState"]["progressDetails"];
    requirements(): import("@donecollectively/stellar-contracts").ReqtsMap<"Governs the process of selling tokens to buyers" | "it's created with key details of a sale" | "Activity:AddTokens allows additional tokens to be added to a Pending mktSale" | "has a state machine for sale lifecycle" | "Will sell its tokens when conditions are right" | "updates appropriate sale details as a result of each sale" | "participates in the Txf protocol for getting paid" | "participates in the Txf protocol for distributing the tokens" | "Splits the sale into chunks for scaling", {
        inheriting: "\u2039empty/base class\u203A";
    }>;
    mkDataWrapper(data: ErgoMarketSaleData): MarketSaleDataWrapper;
}
//# sourceMappingURL=MarketSaleController.d.ts.map