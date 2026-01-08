import { StellarTxnContext, WrappedDgDataContract } from "@donecollectively/stellar-contracts";
import type { FoundDatumUtxo, hasSettingsRef, hasCharterRef, isActivity, updateContext } from "@donecollectively/stellar-contracts";
import { type MintingPolicyHash, type Value } from "@helios-lang/ledger";
import { MarketSaleDataWrapper } from "./MarketSaleDataWrapper.js";
import MarketSalePolicyDataBridge from "./MarketSale.bridge.js";
import type { ErgoMarketSaleData, MarketSaleData, MarketSaleDataLike, minimalMarketSaleData } from "./MarketSale.typeInfo.js";
import type { StellarTokenomicsCapo } from "../StellarTokenomicsCapo.js";
export type { ErgoMarketSaleData, MarketSaleData, MarketSaleDataLike, minimalMarketSaleData, } from "./MarketSale.typeInfo.js";
/**
 * @public
 */
export type PurchaseContext = {
    prevSale: MarketSaleDataWrapper;
    now: Date;
    lotCount: bigint;
};
/**
 * @public
 */
export declare class MarketSaleController extends WrappedDgDataContract<MarketSaleData, MarketSaleDataLike, MarketSaleDataWrapper> {
    dataBridgeClass: typeof MarketSalePolicyDataBridge;
    get capo(): StellarTokenomicsCapo<any, any>;
    get recordTypeName(): "mktSale";
    get idPrefix(): string;
    scriptBundleClass(): Promise<typeof import("./MarketSale.hlb.js").MarketSaleBundle>;
    beforeCreate(newRecord: any, { activity }: {
        activity: any;
    }): any;
    beforeUpdate(updated: MarketSaleDataLike, { activity, original }: updateContext<ErgoMarketSaleData>): MarketSaleDataLike;
    fixLotCount(record: MarketSaleDataLike): MarketSaleDataLike;
    withSaleProgresssDetails(record: MarketSaleDataLike, progressDetails: MarketSaleDataLike["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleDataLike;
    enforcePrevPurchaseAtStartTime(record: MarketSaleDataLike): MarketSaleDataLike;
    enforceLastPurchaseAtStartTime(record: MarketSaleDataLike): MarketSaleDataLike;
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
    mkTxnActivateMarketSale<TCX extends hasCharterRef | StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, addedTokenValue: Value | undefined, newAttrs: Partial<MarketSaleDataLike>, tcx?: TCX): Promise<TCX>;
    mkTxnAddToMarketSale<TCX extends hasCharterRef>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData>, addedTokenMph: MintingPolicyHash, addedTokenName: string | number[], addedTokenCount: number | bigint, mint?: boolean, tcx?: TCX): Promise<TCX>;
    guardUnevenLots(updatedCount: bigint, existingSale: MarketSaleData): void;
    saleTokenValue(itemDetails: FoundDatumUtxo<MarketSaleData>, lotsPurchased?: number | bigint): Value;
    mkTxnBuyFromMarketSale<TCX extends StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, { lotsPurchased, delegateActivity, }: {
        lotsPurchased: number | bigint;
        delegateActivity?: isActivity;
    }, tcxIn?: TCX): Promise<StellarTxnContext<import("@donecollectively/stellar-contracts").anyState>>;
    /**
     * mockable method for updating sale data, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedDetails(msd: MarketSaleData, pmsd: Partial<MarketSaleData>): Partial<MarketSaleData>;
    /**
     * mockable method for updating progress details for a sale, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedProgressDetails({ lastPurchaseAt, prevPurchaseAt, lotCount, lotsSold, }: MarketSaleData["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleData["details"]["V1"]["saleState"]["progressDetails"];
    requirements(): import("@donecollectively/stellar-contracts").ReqtsMap<"Governs the process of selling tokens to buyers" | "it's created with key details of a sale" | "Activity:AddTokens allows additional tokens to be added to a Pending mktSale" | "Activity:UpdatingPendingSale allows updates to a Pending mktSale" | "has a state machine for sale lifecycle" | "Will sell its tokens when conditions are right" | "updates appropriate sale details as a result of each sale" | "participates in the Txf protocol for getting paid" | "participates in the Txf protocol for distributing the tokens" | "Splits the sale into chunks for scaling" | "Activity:AddTokens constrains stored tokens' consistency with lot-count" | "Updating a pending sale keeps the saleAssets consistent" | "Maintains consistency of saleAssets while Pending", {
        inheriting: "\u2039empty/base class\u203A";
    }>;
    mkDataWrapper(data: ErgoMarketSaleData): MarketSaleDataWrapper;
}
//# sourceMappingURL=MarketSaleController.d.ts.map