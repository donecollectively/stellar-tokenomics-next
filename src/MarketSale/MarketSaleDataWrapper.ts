import {
    debugMath,
    realDiv,
    realMul,
    toFixedReal,
    type someDataWrapper,
} from "@donecollectively/stellar-contracts";
import type {
    DynamicSaleV1Settings,
    ErgoMarketSaleData,
    MarketSaleData,
    MarketSaleDataLike,
} from "./MarketSale.typeInfo.js";
import type {
    MarketSaleController,
    PurchaseContext,
} from "./MarketSaleController.js";

/**
 * This class is used to wrap the MarketSaleData for computing sale prices
 * 
 * It is NOT used for write operations on the MarketSaleData.
 * 
 * The MarketSaleController provides this object in FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper> objects,
 * alongside the utxo and the (non-wrapped) ErgoMarketSaleData object.
 * @public
 */
export class MarketSaleDataWrapper {
    //  todo make the interface work?
    // implements someDataWrapper<MarketSaleData>
    data: ErgoMarketSaleData;
    controller: MarketSaleController;
    capo: any;

    constructor(
        data: ErgoMarketSaleData,
        controller: MarketSaleController,
        capo: any
    ) {
        this.data = data;
        this.controller = controller;
        this.capo = capo;
    }

    // !!! this class is ONLY used for computations, not as a read/write wrapper
    unwrapData(): MarketSaleDataLike {
        return this.data;
    }

    getUnitPrice(pCtx: PurchaseContext) {
        return this.getDynamicUnitPrice(pCtx);
    }

    // hasDynamicPrice(x: MarketSaleData): x is MarketSaleData & {
    //     saleStrategy: DynamicPriceSettings;
    //     saleStrategyState: DynamicPriceState;
    // } {
    //     return (x.saleStrategy as any).dynaPaceFasterSaleWeight !== undefined;
    // }

    getDynamicUnitPrice(pCtx: PurchaseContext) {
        const { prevSale: sale, now, unitCount } = pCtx;
        const s = sale.data.details.V1.fixedSaleDetails.settings;

        console.log("    ---- targetPrice", s.targetPrice);
        const a = realMul(
            s.targetPrice,
            this.pricingFactorOverallProgress(pCtx)
        );

        console.log(
            "    ---- unitPriceForSale: targetPrice * pricingFactorOverallProgress =",
            a
        );
        const price = toFixedReal(realMul(a, this.pricingFactorDynamicPace(pCtx)));
        console.log("    ---- unitPriceForSale - unclamped", price);
        const result = Math.min(Math.max(price, s.minPrice), s.maxPrice);
        console.log("    ---- unitPriceForSale - clamped", result);
        return result;
    }

    pricingFactorOverallProgress(pCtx: PurchaseContext) {
        const settings =
            pCtx.prevSale.data.details.V1.fixedSaleDetails.settings;
        const overallPacingProgress =
            this.overallPaceIncludingThisPurchase(pCtx);
        const discountEarned = realMul(
            this.progressPricingDiscountDepth(overallPacingProgress, settings),
            settings.progressPricingDiscountWhenSlow
        );
        const clampedMaxDiscount = Math.max(
            0,
            Math.min(discountEarned, settings.progressPricingDiscountWhenSlow)
        );
        const result = realMul(
            toFixedReal(1 - clampedMaxDiscount),
            this.priceExpansion(overallPacingProgress, settings)
        );
        console.log("    ---- pricingFactorOverallProgress", result);
        return result;
    }

    pricingFactorDynamicPace(pCtx: PurchaseContext) {
        // from Google Sheet:
        // =max(0.5,(
        //     LET(prevWeight, 1
        //    ,LET(prevPace, recent_pace_in
        //    ,LET(nextPace, recent_pace_out
        //    ,LET(nextWeight, weightNextDynaPace,
        //     (
        //         IF(prevPace=0,1,
        //           prevPace / targetSellingPace
        //         ) * prevWeight
        //       + IF(nextPace=0,1,
        //          nextPace / targetSellingPace
        //         ) * nextWeight
        //     ) / ( prevWeight +nextWeight )
        //   ))))
        //   ))
        const s = pCtx.prevSale.data.details.V1.fixedSaleDetails.settings;
        const prevWeight = 1;
        const nextPace = this.computeNextSalePace(pCtx);
        const prevPace = this.prevSalePace(pCtx);
        const nextWeight = s.pricingWeightDynaPace;
        const targetSellingPace = this.targetSellingPace(pCtx);
        const r = debugMath(() => {
            const thing1 = realMul(
                prevPace == 0 ? 1.0 : realDiv(prevPace, targetSellingPace),
                prevWeight
            );
            console.log("    ---- pricingFactorDynamicPace: thing1 ^");
            const thing2 = realMul(
                nextPace == 0 ? 1.0 : realDiv(nextPace, targetSellingPace),
                nextWeight
            );
            console.log("    ---- pricingFactorDynamicPace: thing2 ^");
            const result = realDiv(thing1 + thing2, prevWeight + nextWeight);
            console.log("    ---- pricingFactorDynamicPace", result);
            return result;
        });
        return r;
    }

    prevSalePace(pCtx: PurchaseContext): number {
        return pCtx.prevSale.data.details.V1.saleState.salePace;
    }

    targetSellingPace(pCtx: PurchaseContext): number {
        const { prevSale: sale } = pCtx;
        const s = sale.data.details.V1.fixedSaleDetails.settings;
        const { chunkUnitCount } =
            sale.data.details.V1.saleState.progressDetails;
        // console.log("  -- chunkUnitCount", chunkUnitCount);
        // console.log("  -- targetedSellingTime", s.targetedSellingTime);
        const tsp = realDiv(
            Number(chunkUnitCount),
            realDiv(Number(s.targetedSellingTime), 60 * 60 * 1000)
        );
        console.log("    ---- targetSellingPace", tsp);
        return tsp;
    }

    computeNextSalePace(pCtx: PurchaseContext): number {
        // see detailed comments in DynamicPricing.hl

        // from Google Sheet:
        // = LET(nextWeight,
        //     if(purchase_inferred_pace > prev_dyna_pace,
        //         dynaPaceFasterSaleWeight,
        //         if (purchase_inferred_pace/targetSellingPace > 1,
        //           purchase_inferred_pace/targetSellingPace,
        //           max(1,time_lag * dynaPaceIdleDecayRate)
        //         )
        //       ),
        //      ( purchase_inferred_pace*nextWeight
        //        + prev_dyna_pace
        //      ) / (1+nextWeight)
        //   )
        const s = pCtx.prevSale.data.details.V1.fixedSaleDetails.settings;
        const inferredPace = this.inferredPace(pCtx);
        const prevSalePace = this.prevSalePace(pCtx);
        if (inferredPace > prevSalePace) {
            console.log("    ---- using dynaPaceFasterSaleWeight");
        } else if (inferredPace > this.targetSellingPace(pCtx)) {
            console.log(
                "    ---- inferred pace faster than target; using 1.0 weight"
            );
        } else {
            console.log(
                "    ---- inferred pace slower than target; using idle decay rate"
            );
        }
        const { dynaPaceFasterSaleWeight, dynaPaceIdleDecayRate } = s;
        const targetSellingPace = this.targetSellingPace(pCtx);
        const hoursSinceLastPurchase = this.hoursSinceLastPurchase(pCtx);
        console.log("    ---- inferredPace", inferredPace);
        console.log("    ---- targetSellingPace", this.targetSellingPace(pCtx));
        const nextWeight =
            inferredPace > prevSalePace
                ? (() => {
                      console.log(
                          "    ---- nextPaceWeight: dynaPaceFasterSaleWeight (sale is speeding up)"
                      );
                      return dynaPaceFasterSaleWeight;
                  })()
                : inferredPace > targetSellingPace
                ? (() => {
                      console.log(
                          "    ---- nextPaceWeight: 1.0 (sale is not slowing under the target pace)"
                      );
                      return 1.0;
                  })()
                : (() => {
                      console.log(
                          "    ---- nextPaceWeight: using dynaPaceIdleDecayRate for hoursSinceLastPurchase "
                      );
                      console.log(
                          `      ---- hoursSinceLastPurchase ${hoursSinceLastPurchase}`
                      );
                      console.log(
                          `      ---- dynaPaceIdleDecayRate ${dynaPaceIdleDecayRate}`
                      );
                      const result = Math.max(
                          1,
                          realMul(hoursSinceLastPurchase, dynaPaceIdleDecayRate)
                      );
                      return result;
                  })();
        console.log("    ----  prev salePace", prevSalePace);
        console.log("    ---- nextPaceWeight", nextWeight);
        const nextDynamicPace = realDiv(
            realMul(inferredPace, nextWeight) + prevSalePace,
            nextWeight + 1
        );
        console.log("    ---- next salePace", nextDynamicPace);
        return nextDynamicPace;
    }

    hoursSinceLastPurchase(pCtx: PurchaseContext): number {
        const h = debugMath(() => {
            return realDiv(
                pCtx.now.getTime() -
                    pCtx.prevSale.data.details.V1.saleState.progressDetails
                        .lastPurchaseAt,
                60 * 60 * 1000
            );
        });
        console.log("    ---- hoursSinceLastPurchase", {
            now: pCtx.now,
            lastPurchaseAt:
                pCtx.prevSale.data.details.V1.saleState.progressDetails
                    .lastPurchaseAt,
            result: h,
        });
        return h;
    }

    overallPaceIncludingThisPurchase(pCtx: PurchaseContext): number {
        const oppp = realDiv(
            this.actualSellingPace(pCtx),
            this.targetSellingPace(pCtx)
        );
        console.log("    ---- overallPaceIncludingThisPurchase", oppp);
        return oppp;
    }

    actualSellingPace(pCtx: PurchaseContext): number {
        const unitsPurchased = pCtx.unitCount;
        const alreadySold =
            pCtx.prevSale.data.details.V1.saleState.progressDetails
                .chunkUnitsSold;
        const sp = realDiv(
            Number(unitsPurchased) + Number(alreadySold),
            this.elapsedSaleHours(pCtx)
        );
        console.log("    ---- actualSellingPace", sp);
        return sp;
    }

    elapsedSaleHours(pCtx: PurchaseContext): number {
        const eh = realDiv(
            pCtx.now.getTime() -
                pCtx.prevSale.data.details.V1.fixedSaleDetails.startAt,
            60 * 60 * 1000
        );
        console.log("    ---- elapsedSaleHours", eh);
        return eh;
    }

    progressPricingDiscountDepth(
        overallPacingProgress: number,
        settings: DynamicSaleV1Settings
    ): number {
        const ceilingHeight = toFixedReal(
            1 - settings.progressPricingDiscountFloorPoint
        );
        const aboveFloor =
            overallPacingProgress > settings.progressPricingDiscountFloorPoint
                ? toFixedReal(
                      overallPacingProgress -
                          settings.progressPricingDiscountFloorPoint
                  )
                : 0.0;
        const relativeHeight =
            aboveFloor <= 0 ? 0.0 : realDiv(aboveFloor, ceilingHeight);
        console.log(
            "      ---- progressPricingDiscountDepth: ceilingHeight",
            ceilingHeight
        );
        console.log(
            "      ---- progressPricingDiscountDepth: aboveFloor",
            aboveFloor
        );
        console.log(
            "      ---- progressPricingDiscountDepth: relativeHeight",
            relativeHeight
        );
        const ppdd = toFixedReal(1 - relativeHeight);
        console.log("    ---- progressPricingDiscountDepth", ppdd);
        return ppdd;
    }

    inferredPace(pCtx: PurchaseContext): number {
        debugger;
        const ip = realDiv(
            Number(pCtx.unitCount),
            this.hoursSinceLastPurchase(pCtx)
        );
        console.log("    ---- inferredPace", ip);
        return ip;
    }

    priceExpansion(
        overallPace: number,
        settings: DynamicSaleV1Settings
    ): number {
        const pe =
            overallPace < 1.0
                ? 1.0
                : 1.0 +
                  realDiv(
                      realMul(
                          toFixedReal(overallPace - 1.0),
                          settings.progressPricingExpansionWhenFast
                      ),
                      3
                  );
        console.log("    ---- priceExpansion", pe);
        return pe;
    }

    //     getNextSalePace(pCtx: PurchaseContext) {
    //         return pCtx.sale.nextSalePace(pCtx);
    //     }
}
