import type { DynamicSaleV1Settings, ErgoMarketSaleData, MarketSaleDataLike } from "./MarketSale.typeInfo.js";
import type { MarketSaleController, PurchaseContext } from "./MarketSaleController.js";
/**
 * @public
 */
export declare class MarketSaleDataWrapper {
    data: ErgoMarketSaleData;
    controller: MarketSaleController;
    capo: any;
    constructor(data: ErgoMarketSaleData, controller: MarketSaleController, capo: any);
    unwrapData(): MarketSaleDataLike;
    getUnitPrice(pCtx: PurchaseContext): number;
    getDynamicUnitPrice(pCtx: PurchaseContext): number;
    pricingFactorOverallProgress(pCtx: PurchaseContext): number;
    pricingFactorDynamicPace(pCtx: PurchaseContext): number;
    prevSalePace(pCtx: PurchaseContext): number;
    targetSellingPace(pCtx: PurchaseContext): number;
    computeNextSalePace(pCtx: PurchaseContext): number;
    hoursSinceLastPurchase(pCtx: PurchaseContext): number;
    overallPaceIncludingThisPurchase(pCtx: PurchaseContext): number;
    actualSellingPace(pCtx: PurchaseContext): number;
    elapsedSaleHours(pCtx: PurchaseContext): number;
    progressPricingDiscountDepth(overallPacingProgress: number, settings: DynamicSaleV1Settings): number;
    inferredPace(pCtx: PurchaseContext): number;
    priceExpansion(overallPace: number, settings: DynamicSaleV1Settings): number;
}
//# sourceMappingURL=MarketSaleDataWrapper.d.ts.map