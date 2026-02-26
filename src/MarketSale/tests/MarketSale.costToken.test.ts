/**
 * CostToken / non-ADA pricing tests — Non-ADA Pricing work unit (p7k2m9x4q6)
 *
 * Covers:
 *   REQT/4zkj5q4n38  CostToken in DynamicSaleV1Settings (scale validation)
 *   REQT/jxdnb3dxmx  Payment Denomination Enforcement
 *   REQT/jdkhmeg463  Payment Matches Pricing Strategy (non-ADA path)
 *   REQT/gy6jd9cjkg  Tokens Must Remain / WithdrawingProceeds (non-ADA)
 *   REQT/hk93w5zb16  UTxO Token Assets Unchanged (lifecycle with non-ADA)
 *
 * Snapshot chain:
 *   bootstrapped → saleNativeTokenCost → saleNativeTokenPaused
 */

import { expect, vi } from "vitest";
import {
    describe,
    it,
    fit,
    xit,
    TUNA_TOKEN_NAME,
    TUNA_SCALE,
    type MarketSale_TC,
} from "./MarketSaleTestHelper.js";
import { makeValue } from "@helios-lang/ledger";
import { textToBytes } from "@donecollectively/stellar-contracts";
describe("CostToken / Non-ADA Pricing", () => {

// ── CostToken Settings Validation ────────────────────────────────────────────

describe("CostToken Settings Validation (REQT/4zkj5q4n38)", () => {
    it("rejects CostToken::Other with scale=0 (cost-token-scale-zero/REQT/4zkj5q4n38)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToFirstMarketSale();
        const sale = await h.findFirstMarketSale();

        const updating = h.updatePendingMarketSale(
            sale,
            {
                details: {
                    V1: {
                        ...sale.data!.details.V1,
                        fixedSaleDetails: {
                            ...sale.data!.details.V1.fixedSaleDetails,
                            settings: {
                                ...sale.data!.details.V1.fixedSaleDetails.settings,
                                costToken: {
                                    Other: {
                                        mph: h.capo.mph,
                                        tokenName: TUNA_TOKEN_NAME,
                                        scale: 0n,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "setting costToken with scale=0",
            { expectError: true }
        );
        await expect(updating).rejects.toThrow(/costToken scale too low/);
    });

    it("rejects CostToken::Other with scale exceeding 10^19 (cost-token-scale-too-high/REQT/4zkj5q4n38)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToFirstMarketSale();
        const sale = await h.findFirstMarketSale();

        const updating = h.updatePendingMarketSale(
            sale,
            {
                details: {
                    V1: {
                        ...sale.data!.details.V1,
                        fixedSaleDetails: {
                            ...sale.data!.details.V1.fixedSaleDetails,
                            settings: {
                                ...sale.data!.details.V1.fixedSaleDetails.settings,
                                costToken: {
                                    Other: {
                                        mph: h.capo.mph,
                                        tokenName: TUNA_TOKEN_NAME,
                                        scale: 10_000_000_000_000_000_001n,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "setting costToken with scale > 10^19",
            { expectError: true }
        );
        await expect(updating).rejects.toThrow(/costToken scale too high/);
    });

    it("accepts CostToken::Other with valid scale and creates TUNA-priced sale (cost-token-valid-tuna/REQT/4zkj5q4n38)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToFirstMarketSale();
        const sale = await h.findFirstMarketSale();

        await h.updatePendingMarketSale(
            sale,
            {
                details: {
                    V1: {
                        ...sale.data!.details.V1,
                        fixedSaleDetails: {
                            ...sale.data!.details.V1.fixedSaleDetails,
                            settings: {
                                ...sale.data!.details.V1.fixedSaleDetails.settings,
                                costToken: {
                                    Other: {
                                        mph: h.capo.mph,
                                        tokenName: TUNA_TOKEN_NAME,
                                        scale: TUNA_SCALE,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "setting costToken to TUNA with scale=1000"
        );

        const updated = await h.findFirstMarketSale();
        const costToken = updated.data!.details.V1.fixedSaleDetails.settings.costToken;
        expect("Other" in costToken).toBe(true);
        if ("Other" in costToken) {
            expect(costToken.Other.scale).toEqual(TUNA_SCALE);
        }
    });
});

// ── Non-ADA Pricing ───────────────────────────────────────────────────────────

describe("Non-ADA Cost Token Pricing (REQT/jdkhmeg463, REQT/jxdnb3dxmx)", () => {
    it("buys lots with TUNA cost token at correct price (non-ada-buy/REQT/jdkhmeg463)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenCost();

        const saleBefore = await h.findFirstMarketSale();
        const lotsSoldBefore = saleBefore.data!.details.V1.saleState.progressDetails.lotsSold;
        const tunaBefore = saleBefore.utxo.value.assets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === TUNA_TOKEN_NAME[i]))?.[1] ?? 0n;

        await h.fundActorWithTuna("tom", 10_000n);
        h.setActor("tom");

        const startAt = saleBefore.data!.details.V1.fixedSaleDetails.startAt;
        const nowMs = h.network.currentSlot * 1000;
        const buyTime = new Date(Math.max(startAt + 11 * 60 * 1000, nowMs + 1000));
        await h.buyFromMktSale(saleBefore, 1n, "buy 1 lot with TUNA", {
            travelToFuture: buyTime,
        });

        const afterBuy = await h.findFirstMarketSale();
        // One more lot sold
        expect(afterBuy.data!.details.V1.saleState.progressDetails.lotsSold).toEqual(lotsSoldBefore + 1n);
        // TUNA proceeds increased in sale UTxO
        const tunaAfter = afterBuy.utxo.value.assets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === TUNA_TOKEN_NAME[i]))?.[1] ?? 0n;
        expect(tunaAfter, "TUNA proceeds should increase after buy").toBeGreaterThan(tunaBefore);
    });

    it("rejects buy with wrong token (non-ada-wrong-token/REQT/jxdnb3dxmx)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenCost();

        // Mint FISH tokens and send to tom
        const fishName = textToBytes("FISH");
        h.setActor("tina");
        const mintTcx = await h.capo.txnMintingFungibleTokens(
            h.capo.mkTcx("mint FISH for wrong-token test"),
            fishName,
            10_000_000n
        );
        const fishValue = makeValue(
            2_000_000n,
            [[h.capo.mph, [[fishName, 10_000_000n]]]]
        );
        const { makeTxOutput } = await import("@helios-lang/ledger");
        const mintTcx2 = mintTcx.addOutput(makeTxOutput(h.actors["tom"].address, fishValue));
        await h.submitTxnWithBlock(mintTcx2);

        h.setActor("tom");

        const activeSale = await h.findFirstMarketSale();
        const startAt =
            activeSale.data!.details.V1.fixedSaleDetails.startAt;
        const nowMs = h.network.currentSlot * 1000;
        const buyTime = new Date(Math.max(startAt + 11 * 60 * 1000, nowMs + 1000));

        // Mock mkCostTokenValue to produce FISH value instead of TUNA
        const controller = await h.mktSaleDgt();
        vi.spyOn(controller, "mkCostTokenValue").mockImplementation(
            (_mktSale, amount) => makeValue(h.capo.mph, fishName, amount)
        );

        const buying = h.buyFromMktSale(activeSale, 1n, "buy with FISH instead of TUNA", {
            travelToFuture: buyTime,
            expectError: true,
        });
        await expect(buying).rejects.toThrow(/key not found/);
    });

    it("rejects buy with insufficient cost token (non-ada-underpayment/REQT/jdkhmeg463)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenCost();

        await h.fundActorWithTuna("tom", 10_000n);
        h.setActor("tom");

        const activeSale = await h.findFirstMarketSale();
        const startAt =
            activeSale.data!.details.V1.fixedSaleDetails.startAt;
        const nowMs = h.network.currentSlot * 1000;
        const buyTime = new Date(Math.max(startAt + 11 * 60 * 1000, nowMs + 1000));

        // Mock mkCostTokenValue to produce a much smaller payment amount
        const controller = await h.mktSaleDgt();
        vi.spyOn(controller, "mkCostTokenValue").mockImplementation(
            (_mktSale, _amount) => {
                // Return 1 micro-token instead of the real price
                return makeValue(h.capo.mph, TUNA_TOKEN_NAME, 1n);
            }
        );

        const buying = h.buyFromMktSale(activeSale, 1n, "buy with insufficient TUNA", {
            travelToFuture: buyTime,
            expectError: true,
        });
        await expect(buying).rejects.toThrow(/incorrect lot price in redeemer/);
    });
});

// ── WithdrawingProceeds with Non-ADA Cost Token ───────────────────────────────

describe("WithdrawingProceeds Non-ADA (REQT/gy6jd9cjkg)", () => {
    it("withdraws TUNA proceeds — sale tokens and UUT unchanged, datum unchanged (non-ada-withdraw/REQT/gy6jd9cjkg)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenPaused();

        const pausedSale = await h.findFirstMarketSale();
        const prevData = pausedSale.data!;
        const prevUtxoAssets = pausedSale.utxo.value.assets;

        // Withdraw 1 macro-TUNA of proceeds
        await h.withdrawProceeds(pausedSale, 1.0);

        const afterWithdraw = await h.findFirstMarketSale();
        // Datum unchanged
        expect(afterWithdraw.data!.details).toEqual(prevData.details);
        expect(afterWithdraw.data!.name).toEqual(prevData.name);

        // Sale tokens (PLANKTON) unchanged — compare non-TUNA assets
        const afterAssets = afterWithdraw.utxo.value.assets;
        const planktonName = prevData.details.V1.saleAssets.primaryAssetName;
        const prevPlankton = prevUtxoAssets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === planktonName[i]))?.[1] ?? 0n;
        const afterPlankton = afterAssets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === planktonName[i]))?.[1] ?? 0n;
        expect(afterPlankton, "PLANKTON sale tokens must remain").toEqual(prevPlankton);

        // TUNA decreased
        const prevTuna = prevUtxoAssets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === TUNA_TOKEN_NAME[i]))?.[1] ?? 0n;
        const afterTuna = afterAssets.getPolicyTokens(h.capo.mph)
            ?.find(([tn]) => tn.every((b, i) => b === TUNA_TOKEN_NAME[i]))?.[1] ?? 0n;
        expect(afterTuna, "TUNA should decrease after withdrawal").toBeLessThan(prevTuna);
    });
});

// ── Lifecycle Transitions with Non-ADA Cost Token ────────────────────────────

describe("Lifecycle with Non-ADA Cost Token (REQT/hk93w5zb16)", () => {
    it("stops a TUNA-priced sale — state becomes Paused, all fields unchanged (non-ada-stop/REQT/03ff0mfddc)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenCost();

        const activeSale = await h.findFirstMarketSale();
        const prevData = activeSale.data!;

        await h.stopMarketSale(activeSale);

        const stoppedSale = await h.findFirstMarketSale();
        expect("Paused" in stoppedSale.data!.details.V1.saleState.state).toBe(true);
        expect(stoppedSale.data!.details.V1.saleAssets).toEqual(prevData.details.V1.saleAssets);
        expect(stoppedSale.data!.details.V1.fixedSaleDetails).toEqual(prevData.details.V1.fixedSaleDetails);
        // CostToken field survives the transition
        const costToken = stoppedSale.data!.details.V1.fixedSaleDetails.settings.costToken;
        expect("Other" in costToken).toBe(true);
    });

    it("resumes a TUNA-priced sale with proceeds intact (non-ada-resume/REQT/998waf4mz3)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenPaused();

        const pausedSale = await h.findFirstMarketSale();
        const prevUtxoAssets = pausedSale.utxo.value.assets;

        await h.resumeMarketSale(pausedSale);

        const resumedSale = await h.findFirstMarketSale();
        expect("Active" in resumedSale.data!.details.V1.saleState.state).toBe(true);
        // Non-ADA assets (PLANKTON + TUNA proceeds) unchanged through resume
        expect(resumedSale.utxo.value.assets.isEqual(prevUtxoAssets)).toBe(true);
    });

    it("retires a TUNA-priced sale with proceeds locked (non-ada-retire/REQT/dtpwzjqn9p)", async (context: MarketSale_TC) => {
        const { h } = context;
        await h.reusableBootstrap();
        await h.snapToSaleNativeTokenPaused();

        const pausedSale = await h.findFirstMarketSale();
        const prevUtxoAssets = pausedSale.utxo.value.assets;

        await h.retireMarketSale(pausedSale);

        const retiredSale = await h.findFirstMarketSale();
        expect("Retired" in retiredSale.data!.details.V1.saleState.state).toBe(true);
        // Non-ADA assets unchanged through retire
        expect(retiredSale.utxo.value.assets.isEqual(prevUtxoAssets)).toBe(true);
    });
});

}); // CostToken / Non-ADA Pricing
