import {
    describe as descrWithContext,
    expect,
    it as itWithContext,
    beforeEach,
    vi,
    assertType,
    expectTypeOf,
    beforeAll,
} from "vitest";

import {
    addTestContext,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";

import {
    MarketSaleTestHelper as SomeTokenomicsTestHelper,
    type MarketSale_TC as STOK_TC,
} from "./MarketSaleTestHelper.js";

import { MarketSaleCapo as SomeTokenomicsCapo } from "./modules/MarketSaleCapo.js";
import { dumpAny } from "@donecollectively/stellar-contracts";
import { makeValue } from "@helios-lang/ledger";

let helperState: TestHelperState<SomeTokenomicsCapo> = {
    snapshots: {},
} as any;

const it = itWithContext<STOK_TC>;
const fit = it.only;
const xit = it.skip; //!!! todo: update this when vitest can have skip<HeliosTestingContext>
//!!! until then, we need to use if(0) it(...) : (
// ... or something we make up that's nicer

const describe = descrWithContext<STOK_TC>;

// Copilot: The requirements for the MarketSale plugin should be drawn from the MarketSaleController.ts file
// ... in the requirements() method, the keys should be used for describe() sections in the tests.
// ... the requirements()'s 'mech' entries should be used for it() blocks.

describe("MarketSale plugin", async () => {
    beforeEach<STOK_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(
            context,
            SomeTokenomicsTestHelper,
            undefined,
            helperState
            // testContextSnapshots - TODO shift this capability to upstream.
        );
    });

    describe("It's created with the key details of a sale", () => {
        it("has expected labels and other high-level details", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstMarketSale();
            const capo = h.capo;
            h.ts("ok first sale snapped");
            const { data: mktSale, utxo } = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            expect(mktSale).toBeDefined();
            if (!mktSale) throw new Error("for TS");

            expect(mktSale.name).toEqual(exampleData.name);
            expect(mktSale.moreFields.saleAssets.totalSaleUnits).toEqual(
                exampleData.moreFields.saleAssets.totalSaleUnits
            );
            expect(mktSale.moreFields.threadInfo.saleId).toEqual(mktSale.id);

            // it doesn't have any of the indicated tokens (yet)
            expect(
                utxo.value.isGreaterOrEqual(
                    capo.tokenAsValue(
                        exampleData.moreFields.saleAssets.primaryAssetName,
                        BigInt(
                            exampleData.moreFields.saleAssets
                                .primaryAssetTargetCount
                        )
                    )
                )
            ).toBeFalsy();
        });

        it("has initial timestamps", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstMarketSale();
            h.ts("ok first sale snapped");
            const { data: mktSale, utxo } = await h.findFirstMarketSale();
            if (!mktSale) throw new Error("for TS");
            h.ts("find first sale");

            const now = Date.now();
            expect(mktSale.moreFields.fixedSaleDetails.startAt).toBeCloseTo(
                now,
                -5
            ); // within ~10 seconds is close enough to absorb txn-building time
            // starts with lastSaleAt = startDate
            expect(
                mktSale.moreFields.saleState.progressDetails.lastPurchaseAt
            ).toEqual(mktSale.moreFields.fixedSaleDetails.startAt);
        });

        it("has key details of price, sale-sizes and token to be sold", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstMarketSale();
            h.ts("ok first sale snapped");
            const { capo } = h;
            const {
                data: mktSale,
                dataWrapped: mktSaleObj,
                utxo,
            } = await h.findFirstMarketSale();
            if (!mktSale) throw new Error("for TS");
            const controller = await h.mktSaleDgt();
            const exampleData = await controller.exampleData();
            h.ts("find first sale");
            // expect(
            //     mktSale.tokenPolicy.eq(capo.mph),
            //     "token policy should be the capo's mph"
            // ).toBeTruthy();
            expect(mktSale.moreFields.saleState.salePace).toEqual(1.0);
            // expect(mktSale.tokenName).toEqual(sampleMarketSale.tokenName);
            const expectedSaleAsset = makeValue(
                capo.mintingPolicyHash,
                exampleData.moreFields.saleAssets.primaryAssetName,
                BigInt(
                    exampleData.moreFields.saleAssets.primaryAssetTargetCount
                ) / BigInt(exampleData.moreFields.saleAssets.totalSaleUnits)
            );
            expect(
                mktSale.moreFields.saleAssets.saleUnitAssets.isEqual(
                    expectedSaleAsset
                ),
                `saleUnitAssets ${dumpAny(
                    mktSale.moreFields.saleAssets.saleUnitAssets
                )} should have the expected sale tokens:\n  ${dumpAny(
                    expectedSaleAsset
                )}`
            ).toBeTruthy();

            // expect(mktSale.totalTokenCount).toEqual(sampleMarketSale.totalTokenCount);
            // expect(mktSale.totalTokenCount).toEqual(sampleMarketSale.totalTokenCount);
            // expect(mktSale.minSaleSize).toEqual(sampleMarketSale.minSaleSize);
            expect(mktSale.moreFields.saleAssets.singleBuyMaxUnits).toEqual(
                exampleData.moreFields.saleAssets.singleBuyMaxUnits
            );
            expect(mktSale.moreFields.threadInfo.nestedThreads).toEqual(0n);
            expect(mktSale.moreFields.threadInfo.retiredThreads).toEqual(0n);
            expect(mktSale.moreFields.threadInfo.parentChunkId).toEqual([]);
            // expect(mktSale.currentUnitPrice).toEqual(
            //     exampleData.currentUnitPrice
            // );
        });
    });

    // describe("participates in the Txf protocol for distributing the tokens", () => {
    //     it("can seal the Txf setup in the 'txfFundsTo' field if the receiver is participating", async (context: STOK_TC) => {
    //         const {
    //             h,
    //             h: { network, actors, delay, state },
    //         } = context;
    //         await h.reusableBootstrap();
    //         await h.snapToFirstFundedPurposeWithMarketSale();
    //         const capo = h.capo;
    //         const mktSale = await h.findFirstMarketSale();

    //         const txf = await capo.txnSealTxfForFunds(
    //             capo.mkTxf("seal funds for sale"),
    //             mktSale
    //         );
    //         await h.submitTxnWithBlock(txf);
    //     });

    //     it("won't seal the funds-receiver without the receiver's participation", async (context: STOK_TC) => {
    //         const {
    //             h,
    //             h: { network, actors, delay, state },
    //         } = context;
    //         await h.reusableBootstrap();
    //         await h.snapToFirstMarketSale();
    //         const capo = h.capo;
    //         const mktSale = await h.findFirstMarketSale();

    //         const txf = await capo.txnSealTxfForFunds(
    //             capo.mkTxf("seal funds for sale"),
    //             mktSale
    //         );
    //         const txf2 = txf.addInput(
    //             await capo.mustFindActorUtxo(
    //                 "pre-minted $PLANKTON",
    //                 capo.mkTokenPredicate("$PLANKTON", 1000n)
    //             )
    //         );
    //         const submitting = capo.submit(txf2);
    //         await expect(submitting).rejects.toThrow("missing dgTkn capoGov");
    //     })

    //     it.todo("requires the gov authority to seal the Txf for funds", async (context: STOK_TC) => {
    //         const {
    //             h,
    //             h: { network, actors, delay, state },
    //         } = context;
    //         await h.reusableBootstrap();
    //         await h.snapToFirstMarketSale();
    //         const capo = h.capo;

    //         const addedGovAuthority = vi.spyOn(capo, "txnAddGovAuthority").mockImplementation(
    //             async (tcx) => tcx as any
    //         );

    //         await expect(submitting).rejects.toThrow("missing dgTkn capoGov");
    //     });

    //     it.todo("requires the Txf funds-receiver's participation during a sale, if so configured", async (context: STOK_TC) => {
    //         const {
    //             h,
    //             h: { network, actors, delay, state },
    //         } = context;
    //         await h.reusableBootstrap();
    //         await h.snapToFirstMarketSale();
    //         const capo = h.capo;
    //         const mktSale = await h.findFirstMarketSale();

    //         // needs a receiving agent (we use the FundedPurpose here, even though it's a bit of a chicken/egg situation)
    //         throw new Error("TODO")

    //     });
    // })

    describe("Activity:AddTokens allows additional tokens to be added to a Pending mktSale", () => {
        it(
            "can't AddTokens unless the sale is Pending",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.reusableBootstrap();
                await h.snapToFirstMarketSaleActivated();
                const marketSale = await h.findFirstMarketSale();
    
                const minting = h.mintAndAddAssets(marketSale, "KRILL", 1000n);
                await expect(minting).rejects.toThrow(
                    /AddTokens.* must be Pending/
                );
            }
        );

        it("can AddTokens to a Pending sale", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const capo = h.capo;
            const mktSale = await h.findFirstMarketSale();

            await h.mintAndAddAssets(mktSale, "$KRILL", 1000n);
        });

        it("can't add non-primary tokens if the sale-assets aren't even", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const capo = h.capo;
            const mktSale = await h.findFirstMarketSale();

            const minting = h.mintAndAddAssets(mktSale, "KRILL", 999n);
            await expect(minting).rejects.toThrow(
                "token count not divisible by total sale units"
            );
        });

        it.todo(
            "TESTME: must update the saleUnitAssets to reflect a consistent new-tokens / totalSaleUnits",
            async (context: STOK_TC) => {
                // to test this one, mock out the off-chain calculation of next saleUnitAssets with a wrong implementation,
            }
        );

        it("the primary token can be partially or fully-funded by an AddTokens transaction", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const capo = h.capo;
            const mktSale = await h.findFirstMarketSale();

            await h.mintAndAddAssets(mktSale, "PLANKTON", 50_000n);

            await h.snapToFirstMarketSale();
            await h.mintAndAddAssets(mktSale, "PLANKTON", 49_999n);
        });

        it.todo(
            "TESTME: other tokens can be added to the sale",
            async (context: STOK_TC) => {}
        );

        it("requires the gov authority to AddTokens", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const capo = h.capo;
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            const mintTokenName =
                exampleData.moreFields.saleAssets.primaryAssetName;
            const mintTokenCount = 1000n;
            const tcx1 = await capo.txnMintingFungibleTokens(
                capo.mkTcx("separate mint using gov authority"),
                mintTokenName,
                mintTokenCount
            );
            await h.submitTxnWithBlock(tcx1);

            const mktSale = await h.findFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();
            vi.spyOn(capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );
            const tcx2 = await mktSaleDgt.mkTxnAddToMarketSale(
                mktSale,
                capo.mph,
                mintTokenName,
                mintTokenCount
            );

            const tcx2a = tcx2.addInput(
                await capo.uh.mustFindActorUtxo("pre-minted $PLANKTON", {
                    predicate: capo.uh.mkTokenPredicate(
                        mintTokenName,
                        mintTokenCount
                    ),
                })
            );
            const submitting = capo.submit(tcx2a);
            await expect(submitting).rejects.toThrow(/missing.* dgTkn capoGov/);
        });

        it.todo(
            "doesn't interfere with an unrelated, under-funded asset that's part of the sellingUnitAssets",
            async (context: STOK_TC) => {
                // if the sale has any asset mentioned, we ignore that other asset,
                // while ensure that the new assets being added to the sellingUnitAssets are fully funded within the AddTokens transaction.
            }
        );
    });

    describe("has a state machine for sale lifecycle", () => {
        it("starts in Pending state", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            // @ts-ignore cast to more convenient type
            const data = marketSale.data! as ErgoMarketSaleData;
            expect(data.moreFields.saleState.state.Pending).toBeTruthy();
        });

        it("moves to Active state when ActivatingSale", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            const tcx2 = await h.activateMarketSale(marketSale, {
                mintTokenName:
                    exampleData.moreFields.saleAssets.primaryAssetName,
            });

            const updatedSale = await h.findFirstMarketSale();
            // @ts-ignore cast to more convenient type
            const data = updatedSale.data! as ErgoMarketSaleData;
            expect(data.moreFields.saleState.state.Active).toBeTruthy();
        });

        it("won't activate if the txfFundsTo setting doesn't validate", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();

            const marketSale = await h.findFirstMarketSale();
            const mktSaleData = marketSale.data!;
            
            mktSaleData.moreFields.fixedSaleDetails.vxfFundsTo = { NotYetDefined: {} }
            const submitting = h.activateMarketSale(marketSale, {
                mintTokenName:
                    mktSaleData.moreFields.saleAssets.primaryAssetName,
            });
            await expect(submitting).rejects.toThrow("VxfDestination: vxfFundsTo: NotYetDefined");
        });

        it.todo(
            "TESTME: won't move to Active state unless it has the indicated number of tokens",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.reusableBootstrap();
                await h.snapToFirstMarketSale();

                const marketSale = await h.findFirstMarketSale();

                await expect(h.activateMarketSale(marketSale)).rejects.toThrow(
                    "sale assets mismatch"
                );
            }
        );
        // it("can move to SoldOut state when all tokens are sold", async (context: STOK_TC) => {

        // })
        it.todo(
            "TODO: moves from Pending to Retired state with gov authority, given it doesn't have tokens in it",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.snapToFirstMarketSale();

                const mktSaleDelegate = await h.mktSaleDgt();
                const marketSale = await h.findFirstMarketSale();

                //todo
                const tcx = await h.retireMarketSale(marketSale);
                const marketSale2 = await h.findMarketSale(
                    tcx.state.uuts.mktSale
                );

                expect(marketSale2.data!.state.Retired).toBeTruthy();
            }
        );

        it.todo(
            "TODO: moves from Active to Retired state with gov authority, if its tokens are withdrawn",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;
                await h.snapToFirstMarketSale();
                let capo: SomeTokenomicsCapo = h.capo;

                const mktSaleDelegate = await h.mktSaleDgt();
                const marketSale1 = await h.findFirstMarketSale();

                //todo
                const tcx = await h.retireMarketSale(marketSale1);
                const marketSale1a = await h.findMarketSale(
                    tcx.state.uuts.mktSale
                );

                expect(marketSale1a.data!.state.Retired).toBeTruthy();

                console.log("Retire #2: without withdrawing tokens");
                await h.snapToFirstMarketSale();
                const marketSale2 = await h.findFirstMarketSale();
                const mktSaleDgt = await h.mktSaleDgt();
                vi.spyOn(mktSaleDgt, "txnBurnSaleTokens").mockImplementation(
                    async (tcx) => tcx
                );
                await expect(h.retireMarketSale(marketSale2)).rejects.toThrow(
                    "must burn retired tokens"
                );
            }
        );
    });

    describe("Sells its tokens", () => {
        it("doesn't sell while state is Pending", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();

            const mktSaleDelegate = await h.mktSaleDgt();
            const exampleData = mktSaleDelegate.exampleData();
            const initialMarketSale = await h.findFirstMarketSale();
            await h.mintAndAddAssets(
                initialMarketSale,
                exampleData.moreFields.saleAssets.primaryAssetName,
                BigInt(
                    exampleData.moreFields.saleAssets.primaryAssetTargetCount
                )
            );
            const fundedSale = await h.findFirstMarketSale();
            console.log(
                "actor has assets: ",
                dumpAny(await h.actorContext.wallet!.utxos)
            );
            const buying = h.buyFromMktSale(
                fundedSale,
                1n,
                "no sale while pending",
                {
                    futureDate: new Date(Date.now() + 1000 * 60 * 10),
                    expectError: true,
                }
            );
            // await buying;
            await expect(buying).rejects.toThrow("old: state must be Active");
        });

        it("doesn't sell tokens before the start date", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const controller = await h.mktSaleDgt();
            const marketSale = await h.findFirstMarketSale();
            const mktSaleData = marketSale.data!;
            const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
            await h.activateMarketSale(
                marketSale,
                {
                    mintTokenName:
                        mktSaleData.moreFields.saleAssets.primaryAssetName,
                    txnDescription: "ACTIVATES SALE WITH FUTURE DATE",
                    // futureDate
                },
                {
                    moreFields: {
                        ...mktSaleData.moreFields,
                        fixedSaleDetails: {
                            ...mktSaleData.moreFields.fixedSaleDetails,
                            startAt: futureDate.getTime(),
                            // lastSaleAt: futureDate
                        },
                    },
                }
            );
            const activatedSale = await h.findFirstMarketSale();
            console.log(
                "-----------------------------------------------------"
            );

            const buying = h.buyFromMktSale(
                activatedSale,
                1n,
                "buying before start date",
                {
                    expectError: true,
                }
            );
            // await buying
            await expect(buying).rejects.toThrow("sale not yet started");
        });

        it("won't sell more than singleBuyMaxUnits, or less than 1 unit", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            const activeSale = await h.findFirstMarketSale();
            // TODO: mock the pay-in amount so it's positive, to prove that the contract throws
            //   ... the error we expect.
            // chemistry emoji:  ⚗️
            console.log(
                "  ----- ⚗️ case 1: buying negative amount FAILS (disabled for now.  Help by fixing it?)"
            );
            // const buyingNegative = h.buyFromMktSale(activeSale, -1n, "case 1: buying negative amount FAILS");
            // await expect(buyingNegative).rejects.toThrow(
            //     "must sell at least one"
            //    ^^^^ this error - from the contract!
            // );

            const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 10);

            const buyingZero = h.buyFromMktSale(
                activeSale,
                0n,
                "case 2: buying zero amount FAILS",
                {
                    futureDate,
                    expectError: true,
                }
            );
            await expect(buyingZero).rejects.toThrow("must sell at least one");

            const buyExcessive = h.buyFromMktSale(
                activeSale,
                BigInt(exampleData.moreFields.saleAssets.singleBuyMaxUnits) +
                    1n,
                "case 3: buying too many units FAILS",
                {
                    futureDate,
                    expectError: true,
                }
            );
            await expect(buyExcessive).rejects.toThrow("buy too many units");

            const buyingMax = await h.buyFromMktSale(
                activeSale,
                exampleData.moreFields.saleAssets.singleBuyMaxUnits,
                "case 4: buying the max number of units WORKS",
                {
                    futureDate,
                }
            );

            const updatedSale = await h.findFirstMarketSale();
            const buyingMin = await h.buyFromMktSale(
                updatedSale,
                1n,
                "case 5: buying the min number of units WORKS",
                {
                    futureDate: new Date(futureDate.getTime() + 1000 * 60 * 13),
                }
            );
        });

        it("sells tokens when Active and in the selling period", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const marketSale = await h.findFirstMarketSale();

            await h.buyFromMktSale(marketSale, 1n, "sells when active", {
                futureDate: new Date(Date.now() + 1000 * 60 * 10),
            });
        });

        it("won't sell tokens from a sale chunk less than 10 minutes old", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const activatedSale = await h.findFirstMarketSale();
            const buying = h.buyFromMktSale(
                activatedSale,
                1n,
                "won't sell from a sale chunk less than 10 minutes old",
                {
                    futureDate: new Date(
                        activatedSale.data!.moreFields.saleState.progressDetails
                            .lastPurchaseAt +
                            1000 * 60 * 9
                    ),
                    expectError: true,
                }
            );
            await expect(buying).rejects.toThrow("sale chunk too fresh");

            return h.buyFromMktSale(
                activatedSale,
                1n,
                "will sell from a sale chunk 10 minutes old",
                {
                    futureDate: new Date(Date.now() + 1000 * 60 * 10),
                }
            );
        });

        // it("XXX probably not a needed constraint: won't sell directly from the root chunk", async (context: STOK_TC) => {
        // })
    });
    describe("updates appropriate sale details as a result of each sale", () => {
        it("updates the timestamps and units-sold", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 week from now
                Date.now() + 1000 * 60 * 60 * 24 * 7
            );
            const tcx = await h.buyFromMktSale(
                marketSale,
                1n,
                "update timestamps for first chunk",
                {
                    futureDate,
                }
            );

            let updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.moreFields.saleState.progressDetails
                    .lastPurchaseAt
            ).toEqual(tcx.txnTime.getTime());
            expect(
                updatedSale.data!.moreFields.saleState.progressDetails
                    .chunkUnitsSold
            ).toEqual(1n);

            const futurePlus3h = new Date(
                futureDate.getTime() + 1000 * 60 * 60 * 3
            );
            await h.buyFromMktSale(
                updatedSale,
                19n,
                "CHECK incremental chunkUnitsSold",
                {
                    futureDate: futurePlus3h,
                }
            );
            updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.moreFields.saleState.progressDetails
                    .chunkUnitsSold
            ).toEqual(20n);

            updatedSale = await h.findFirstMarketSale();
            const futurePlus190m = new Date(
                futurePlus3h.getTime() + 1000 * 60 * 10
            );

            await h.buyFromMktSale(
                updatedSale,
                19n,
                "CHECK incremental chunkUnitsSold",
                {
                    futureDate: futurePlus190m,
                }
            );

            updatedSale = await h.findFirstMarketSale();
            const futurePlus9h = new Date(
                futureDate.getTime() + 1000 * 60 * 60 * 9
            );
            await h.buyFromMktSale(
                updatedSale,
                21n,
                "CHECK incremental chunkUnitsSold",
                {
                    futureDate: futurePlus9h,
                }
            );

            updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.moreFields.saleState.progressDetails
                    .chunkUnitsSold
            ).toEqual(60n);
        });

        it("fails if it changes the settings or unit-counts", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const delegate = await h.mktSaleDgt();
            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 day from now
                Date.now() + 1000 * 60 * 60 * 24 * 1
            );
            const borkedUnitCount = vi
                .spyOn(delegate, "mkUpdatedProgressDetails")
                .mockImplementation(function (progressDetails) {
                    return {
                        ...progressDetails,
                        chunkUnitCount: progressDetails.chunkUnitCount - 1n,
                    };
                });
            const buying = h.buyFromMktSale(marketSale, 1n, undefined, {
                futureDate,
                expectError: true,
            });
            await expect(buying).rejects.toThrow(
                "must not change chunk unit count"
            );
            borkedUnitCount.mockRestore();

            const borkedSettings = vi
                .spyOn(delegate, "mkUpdatedDetails")
                .mockImplementation(function (msd, pmsd) {
                    // console.log(msd, pmsd)
                    return {
                        ...msd,
                        moreFields: {
                            ...msd.moreFields,
                            ...pmsd.moreFields,
                            fixedSaleDetails: {
                                ...(msd.moreFields!.fixedSaleDetails),
                                ...(pmsd.moreFields!.fixedSaleDetails),
                                settings: {
                                    ...(msd.moreFields!.fixedSaleDetails!.settings),
                                    ...(pmsd.moreFields!.fixedSaleDetails!.settings),
                                    progressPricingDiscountFloorPoint:
                                        (
                                            msd.moreFields.fixedSaleDetails
                                                .settings as any
                                        ).progressPricingDiscountFloorPoint + 0.01,
                                },
                            },
                        },
                    };
                });
            const buying2 = h.buyFromMktSale(marketSale, 1n, undefined, {
                futureDate,
                expectError: true,
            });
            await expect(buying2).rejects.toThrow("settings were changed");
            expect(borkedSettings).toHaveBeenCalled();
        });

        it("updates the stratState's sellingPace field", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 day from now
                Date.now() + 1000 * 60 * 60 * 24 * 1
            );
            debugger;
            await h.buyFromMktSale(marketSale, 25n, undefined, {
                futureDate,
            });

            const updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.moreFields.saleState.salePace
            ).toBeGreaterThan(0);
        });

        it("fails without the correct next dynamicPace", async (context: STOK_TC) => {
            // mocks getNextDynamicPace

            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();

            const delegate = await h.mktSaleDgt();
            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 day from now
                Date.now() + 1000 * 60 * 60 * 24 * 1
            );

            const borkedPace = vi
                .spyOn(marketSale.dataWrapped, "computeNextSalePace")
                .mockImplementation(function () {
                    //    "BOGUSSS"
                    return 8061555.424242;
                });
            const buying = h.buyFromMktSale(marketSale, 1n, undefined, {
                futureDate,
                expectError: true,
            });
            await expect(buying).rejects.toThrow("wrong next salePace");
        });
    });

    describe("max sale size", () => {
        it("fails if the sale size is too large", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            // buys 26 units
            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 day from now
                Date.now() + 1000 * 60 * 60 * 24 * 1
            );
            const buying = h.buyFromMktSale(marketSale, 26n, undefined, {
                futureDate, 
                expectError: true,
            });
            await expect(buying).rejects.toThrow("attempted to buy too many units");
        });
    });

    describe("Splits the sale into chunks for scaling", () => {
        it.todo(
            "splits a chunk from the root sale record",
            async (context: STOK_TC) => {}
        );
        it.todo(
            "will split a new chunk from an immature chunk",
            async (context: STOK_TC) => {}
        );
        it.todo(
            "won't split a chunk that's aged into maturity",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.reusableBootstrap();
                await h.snapToFirstMarketSaleActivated();

                const marketSale = await h.findFirstMarketSale();
                const futureDate = new Date(
                    // 1 day from now
                    Date.now() + 1000 * 60 * 60 * 24 * 1
                );
                await h.buyFromMktSale(marketSale, 25n, undefined, {
                    futureDate,
                });

                const updatedSale = await h.findFirstMarketSale();
                const futureDate2 = new Date(
                    // 1 hour from the first purchase
                    futureDate.getTime() + 1000 * 60 * 60
                );
                //todo
                const buying = h.buyAndSplitMktSale(
                    updatedSale,
                    25n,
                    undefined,
                    {
                        futureDate: futureDate2,
                        expectError: true,
                    }
                );
                await expect(buying).rejects.toThrow("chunk is mature");
            }
        );
        it.todo(
            "won't create a split chunk smaller than the minSaleSize",
            async (context: STOK_TC) => {}
        );

        it.todo(
            "sets correct details for the new chunk",
            async (context: STOK_TC) => {
                // The new chunk's totalTokenCount should be the size of the split
                // The old chunk's totalTokenCount should be unchanged (it rolls up the nested token-count)
                // Value transferred to the new chunk must be the same as its totalTokenCount
                // lastSaleAt = 0; it can be sold immediately without waiting for maturity
                // startedAt should be same as the parent
                // tokenPolicy, tokenName, totalTokenCount should be the same as the root sale
                // min/maxSaleSize should be the same as the parent
                // saleId should point to the root sale record
                // parentChunkId should point to the chunk it was split from
                // threadCount and retiredThreads are zero
                // chunkPrice is 1.6x the parent's chunkPrice
            }
        );

        it.todo(
            "won't split off a child chunk without correct updates to the parent",
            async (context: STOK_TC) => {
                // the parent chunk should increment its nestedThreads
                // the parent chunk mustn't modify its retiredThreads
                // the parent-chunk mustn't modify lastSaleAt, startedAt, tokenPolicy, or tokenName
                // the parent-chunk mustn't modify min/maxSaleSize, saleId, parentChunkId, or **totalTokenCount**
                // the parent-chunk tokenCount should be reduced by the size of the split chunk
                // the parent-chunk's chunkPrice increases by a growth factor of 1.6x
                // the parent-chunk
            }
        );
    });
});
