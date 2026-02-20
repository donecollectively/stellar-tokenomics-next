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
import {
    bytesToText,
    dumpAny,
    textToBytes,
} from "@donecollectively/stellar-contracts";
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
            expect(mktSale.details.V1.saleAssets.totalSaleLots).toEqual(
                exampleData.details.V1.saleAssets.totalSaleLots
            );
            expect(mktSale.details.V1.threadInfo.saleId).toEqual(mktSale.id);

            // it doesn't have any of the indicated tokens (yet)
            expect(
                utxo.value.isGreaterOrEqual(
                    capo.tokenAsValue(
                        exampleData.details.V1.saleAssets.primaryAssetName,
                        BigInt(
                            exampleData.details.V1.saleAssets
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
            const {
                data: mktSale,
                dataWrapped: mktSaleObj,
                utxo,
            } = await h.findFirstMarketSale();
            if (!mktSale) throw new Error("for TS");
            h.ts("find first sale");

            // on-disk SNAPSHOT won't be current with NOW:
            // const now = Date.now();
            // expect(mktSale.details.V1.fixedSaleDetails.startAt).toBeCloseTo(
            //    now,
            //    -5
            // ); // within ~10 seconds is close enough to absorb txn-building time
            // starts with lastSaleAt = startDate
            expect(
                mktSale.details.V1.saleState.progressDetails.lastPurchaseAt
            ).toEqual(mktSale.details.V1.fixedSaleDetails.startAt);

            if (!mktSale) throw new Error("for TS");
            const controller = await h.mktSaleDgt();
            const exampleData = await controller.exampleData();
            h.ts("find first sale");
            // expect(
            //     mktSale.tokenPolicy.eq(capo.mph),
            //     "token policy should be the capo's mph"
            // ).toBeTruthy();
            expect(mktSale.details.V1.saleState.salePace).toEqual(1.0);
            // expect(mktSale.tokenName).toEqual(sampleMarketSale.tokenName);
            const { capo } = h;
            const expectedSaleAsset = makeValue(
                capo.mintingPolicyHash,
                exampleData.details.V1.saleAssets.primaryAssetName,
                BigInt(
                    exampleData.details.V1.saleAssets.primaryAssetTargetCount
                ) / BigInt(exampleData.details.V1.saleAssets.totalSaleLots)
            );
            expect(
                mktSale.details.V1.saleAssets.saleLotAssets.isEqual(
                    expectedSaleAsset
                ),
                `saleLotAssets ${dumpAny(
                    mktSale.details.V1.saleAssets.saleLotAssets
                )} should have the expected sale tokens:\n  ${dumpAny(
                    expectedSaleAsset
                )}`
            ).toBeTruthy();

            // expect(mktSale.totalTokenCount).toEqual(sampleMarketSale.totalTokenCount);
            // expect(mktSale.totalTokenCount).toEqual(sampleMarketSale.totalTokenCount);
            // expect(mktSale.minSaleSize).toEqual(sampleMarketSale.minSaleSize);
            expect(mktSale.details.V1.saleAssets.singleBuyMaxLots).toEqual(
                exampleData.details.V1.saleAssets.singleBuyMaxLots
            );
            expect(mktSale.details.V1.threadInfo.nestedThreads).toEqual(0n);
            expect(mktSale.details.V1.threadInfo.retiredThreads).toEqual(0n);
            expect(mktSale.details.V1.threadInfo.parentChunkId).toEqual([]);
        });

        it("rejects creation when saleLotAssets contains any tokens other than the primary asset", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            const controller = await h.mktSaleDgt();
            const example = controller.exampleData();

            const primaryPerLot =
                BigInt(example.details.V1.saleAssets.primaryAssetTargetCount) /
                BigInt(example.details.V1.saleAssets.totalSaleLots);

            const badSale = {
                ...example,
                details: {
                    V1: {
                        ...example.details.V1,
                        saleAssets: {
                            ...example.details.V1.saleAssets,
                            saleLotAssets: makeValue(
                                h.capo.mph,
                                example.details.V1.saleAssets.primaryAssetName,
                                primaryPerLot
                            ).add(
                                makeValue(h.capo.mph, textToBytes("EXTRA"), 1n)
                            ),
                        },
                    },
                },
            };

            const creating = h.createMarketSale(badSale, { submit: true });
            await expect(creating).rejects.toThrow(/saleLotAssets.*primary/i);
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
        it("can't AddTokens unless the sale is Pending", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const marketSale = await h.findFirstMarketSale();

            const minting = h.mintAndAddAssets(marketSale, "KRILL", 1000n);
            await expect(minting).rejects.toThrow(
                /adding to sale.* must be Pending/
            );
        });

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
                "token count not divisible by total sale lots"
            );
        });

        it("can't add primary tokens if the amount isn't divisible by totalSaleLots", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const mktSale = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();
            vi.spyOn(controller, "guardUnevenLots").mockImplementation(() => {
                // no guard, so the txn goes to on-chain instead of failing offchain
            })

            const minting = h.mintAndAddAssets(
                mktSale,
                mktSale.data!.details.V1.saleAssets.primaryAssetName,
                1001n // not divisible by default totalSaleLots (1000)
            );
            await expect(minting).rejects.toThrow(
                /deposited asset total not an even multiple of totalSaleLots/i
            );
        });

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
            await h.mintAndAddAssets(mktSale, "PLANKTON", 49_000n);
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
                exampleData.details.V1.saleAssets.primaryAssetName;
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
            "doesn't interfere with an unrelated, under-funded asset that's part of the saleLotAssets",
            async (context: STOK_TC) => {
                // if the sale has any asset mentioned, we ignore that other asset,
                // while ensure that the new assets being added to the saleLotAssets are fully funded within the AddTokens transaction.
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
            expect(data.details.V1.saleState.state.Pending).toBeTruthy();
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
                    exampleData.details.V1.saleAssets.primaryAssetName,
            });

            const updatedSale = await h.findFirstMarketSale();
            // @ts-ignore cast to more convenient type
            const data = updatedSale.data! as ErgoMarketSaleData;
            expect(data.details.V1.saleState.state.Active).toBeTruthy();
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

            mktSaleData.details.V1.fixedSaleDetails.vxfFundsTo = {
                NotYetDefined: {},
            };
            const submitting = h.activateMarketSale(marketSale, {
                mintTokenName:
                    mktSaleData.details.V1.saleAssets.primaryAssetName,
            });
            await expect(submitting).rejects.toThrow(
                "VxfDestination: vxfFundsTo: NotYetDefined"
            );
        });

        it("won't activate if saleLotAssets expect extra tokens that aren't deposited", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const mktSaleData = marketSale.data!;

            const updatedsaleLotAssets =
                mktSaleData.details.V1.saleAssets.saleLotAssets.add(
                    makeValue(h.capo.mph, textToBytes("KRILL"), 1n)
                );

            const submitting = h.activateMarketSale(
                marketSale,
                {
                    mintTokenName:
                        mktSaleData.details.V1.saleAssets.primaryAssetName,
                    txnDescription: "ACTIVATES SALE WITH MISSING KRILL",
                },
                {
                    details: {
                        V1: {
                            ...mktSaleData.details.V1,
                            saleAssets: {
                                ...mktSaleData.details.V1.saleAssets,
                                saleLotAssets: updatedsaleLotAssets,
                            },
                        },
                    },
                }
            );

            await expect(submitting).rejects.toThrow(
                /must contain the supply of tokens/i
            );
        });

        it("won't activate if primaryAssetTargetCount is not divisible by lot count", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const mktSaleData = marketSale.data!;

            const badTarget =
                mktSaleData.details.V1.saleAssets.totalSaleLots * 100_000n +
                1n;

            const submitting = h.activateMarketSale(
                marketSale,
                {
                    mintTokenName:
                        mktSaleData.details.V1.saleAssets.primaryAssetName,
                    txnDescription: "ACTIVATES SALE WITH NON-DIVISIBLE TARGET",
                },
                {
                    details: {
                        V1: {
                            ...mktSaleData.details.V1,
                            saleAssets: {
                                ...mktSaleData.details.V1.saleAssets,
                                primaryAssetTargetCount: badTarget,
                            },
                        },
                    },
                }
            );

            await expect(submitting).rejects.toThrow(/primaryToken.*mismatch/i);
        });

        it("won't activate if deposited primary tokens aren't evenly divisible by lot count", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const mktSaleData = marketSale.data!;
            const controller = await h.mktSaleDgt();
            vi.spyOn(controller, "guardUnevenLots").mockImplementation(() => {
                // no guard, so the txn goes to on-chain instead of failing offchain
            })

            // deposit a non-divisible amount of primary tokens
            const minting = h.mintAndAddAssets(
                marketSale,
                mktSaleData.details.V1.saleAssets.primaryAssetName,
                1001n
            );
            await expect(minting).rejects.toThrow(
                /deposited asset total not an even multiple of totalSaleLots/i
            );
        });

        it("won't activate if deposited non-primary tokens aren't evenly divisible by lot count", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();

            vi.spyOn(controller, "guardUnevenLots").mockImplementation(() => {
                // no off-chain guard, so the on-chain policy will get involved
            });
            const minting = h.mintAndAddAssets(marketSale, "KRILL", 1001n);
            await expect(minting).rejects.toThrow(
                /deposited asset total not an even multiple of totalSaleLots/i
            );
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
                exampleData.details.V1.saleAssets.primaryAssetName,
                BigInt(
                    exampleData.details.V1.saleAssets.primaryAssetTargetCount
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
            await expect(buying).rejects.toThrow(
                "previous sale: state must be Active"
            );
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
                        mktSaleData.details.V1.saleAssets.primaryAssetName,
                    txnDescription: "ACTIVATES SALE WITH FUTURE DATE",
                    // futureDate
                },
                {
                    details: {
                        V1: {
                            ...mktSaleData.details.V1,
                            fixedSaleDetails: {
                                ...mktSaleData.details.V1.fixedSaleDetails,
                                startAt: futureDate.getTime(),
                                // lastSaleAt: futureDate
                            },
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

        it("won't sell more than singleBuyMaxLots, or less than 1 lot", async (context: STOK_TC) => {
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
                BigInt(exampleData.details.V1.saleAssets.singleBuyMaxLots) +
                    1n,
                "case 3: buying too many lots FAILS",
                {
                    futureDate,
                    expectError: true,
                }
            );
            await expect(buyExcessive).rejects.toThrow("buy too many lots");

            const buyingMax = await h.buyFromMktSale(
                activeSale,
                exampleData.details.V1.saleAssets.singleBuyMaxLots,
                "case 4: buying the max number of lots WORKS",
                {
                    futureDate,
                }
            );

            const updatedSale = await h.findFirstMarketSale();
            const buyingMin = await h.buyFromMktSale(
                updatedSale,
                1n,
                "case 5: buying the min number of lots WORKS",
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
            await h.snapToFirstMarketSale();

            // Activate inline so the activation time is fresh (not from a stale snapshot)
            const pendingSale = await h.findFirstMarketSale();
            await h.activateMarketSale(pendingSale, {
                mintTokenName:
                    pendingSale.data!.details.V1.saleAssets.primaryAssetName,
            });

            const activatedSale = await h.findFirstMarketSale();
            const chunkCreatedAt =
                activatedSale.data!.details.V1.saleState.progressDetails
                    .lastPurchaseAt;

            // Try to buy 9 minutes after chunk creation — too fresh
            const buying = h.buyFromMktSale(
                activatedSale,
                1n,
                "won't sell from a sale chunk less than 10 minutes old",
                {
                    futureDate: new Date(chunkCreatedAt + 1000 * 60 * 9),
                    expectError: true,
                }
            );
            await expect(buying).rejects.toThrow("sale chunk too fresh");

            // Buy 10 minutes after — should succeed
            return h.buyFromMktSale(
                activatedSale,
                1n,
                "will sell from a sale chunk 10 minutes old",
                {
                    futureDate: new Date(chunkCreatedAt + 1000 * 60 * 10),
                }
            );
        });

        // it("XXX probably not a needed constraint: won't sell directly from the root chunk", async (context: STOK_TC) => {
        // })
    });
    describe("updates appropriate sale details as a result of each sale", () => {
        it("updates the timestamps and lots-sold", async (context: STOK_TC) => {
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
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lastPurchaseAt
            ).toEqual(tcx.txnTime.getTime());
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lotsSold
            ).toEqual(1n);

            const futurePlus3h = new Date(
                futureDate.getTime() + 1000 * 60 * 60 * 3
            );
            await h.buyFromMktSale(
                updatedSale,
                19n,
                "CHECK incremental lotsSold",
                {
                    futureDate: futurePlus3h,
                }
            );
            updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lotsSold
            ).toEqual(20n);

            updatedSale = await h.findFirstMarketSale();
            const futurePlus190m = new Date(
                futurePlus3h.getTime() + 1000 * 60 * 10
            );

            await h.buyFromMktSale(
                updatedSale,
                19n,
                "CHECK incremental lotsSold",
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
                "CHECK incremental lotsSold",
                {
                    futureDate: futurePlus9h,
                }
            );

            updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lotsSold
            ).toEqual(60n);
        });

        it("fails if it changes the settings or lot-counts", async (context: STOK_TC) => {
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
            const borkedlotCount = vi
                .spyOn(delegate, "mkUpdatedProgressDetails")
                .mockImplementation(function (progressDetails) {
                    return {
                        ...progressDetails,
                        lotCount: progressDetails.lotCount - 1n,
                    };
                });
            const buying = h.buyFromMktSale(marketSale, 1n, undefined, {
                futureDate,
                expectError: true,
            });
            await expect(buying).rejects.toThrow(
                "must not change chunk's lot count"
            );
            borkedlotCount.mockRestore();

            const borkedSettings = vi
                .spyOn(delegate, "mkUpdatedDetails")
                .mockImplementation(function (msd, pmsd) {
                    // console.log(msd, pmsd)
                    return {
                        ...msd,
                        details: {
                            V1: {
                                ...msd.details.V1,
                                ...pmsd.details!.V1,

                                fixedSaleDetails: {
                                    ...msd.details.V1.fixedSaleDetails,
                                    ...pmsd.details!.V1.fixedSaleDetails,
                                    settings: {
                                        ...msd.details.V1.fixedSaleDetails!
                                            .settings,
                                        ...pmsd.details!.V1.fixedSaleDetails!
                                            .settings,
                                        progressPricingDiscountFloorPoint:
                                            (
                                                msd.details.V1.fixedSaleDetails
                                                    .settings as any
                                            )
                                                .progressPricingDiscountFloorPoint +
                                            0.01,
                                    },
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
                updatedSale.data!.details.V1.saleState.salePace
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
            // buys 26 lots
            const marketSale = await h.findFirstMarketSale();
            const futureDate = new Date(
                // 1 day from now
                Date.now() + 1000 * 60 * 60 * 24 * 1
            );
            const buying = h.buyFromMktSale(marketSale, 26n, undefined, {
                futureDate,
                expectError: true,
            });
            await expect(buying).rejects.toThrow(
                "attempted to buy too many lots"
            );
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

    describe("Activity:UpdatingPendingSale allows updates to a Pending mktSale", () => {
        it("can update saleAssets, fixedSaleDetails, and name fields", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToPackagedPendingUpdate();
            const updatedSale = await h.findFirstMarketSale();
            const expectedDetails = h.packagedUpdateDetails();

            expect(updatedSale.data!.name).toEqual(expectedDetails.name);
            expect(
                updatedSale.data!.details.V1.fixedSaleDetails.startAt
            ).toEqual(expectedDetails.startAt);

            expect(
                updatedSale.data!.details.V1.fixedSaleDetails.settings
                    .targetPrice
            ).toEqual(expectedDetails.targetPrice);
            expect(
                updatedSale.data!.details.V1.saleAssets.totalSaleLots
            ).toEqual(expectedDetails.totalSaleLots);
            expect(
                updatedSale.data!.details.V1.saleAssets.singleBuyMaxLots
            ).toEqual(expectedDetails.singleBuyMaxLots);
            expect(
                updatedSale.data!.details.V1.saleAssets.primaryAssetTargetCount
            ).toEqual(expectedDetails.primaryAssetTargetCount);

            // Verify fixups happened correctly
            const startAt =
                updatedSale.data!.details.V1.fixedSaleDetails.startAt;
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lotCount
            ).toEqual(expectedDetails.totalSaleLots);
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .lastPurchaseAt
            ).toEqual(startAt);
            expect(
                updatedSale.data!.details.V1.saleState.progressDetails
                    .prevPurchaseAt
            ).toEqual(startAt);
        });

        it("prevents the sale from leaving Pending state", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleState: {
                                ...marketSale.data!.details.V1.saleState,
                                state: { Active: {} },
                            },
                        },
                    },
                } as any,
                "trying to change state to Active",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /UpdatingPendingSale: updated record: state must be Pending/i
            );
        });

        it("doesn't allow changing sale pace", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleState: {
                                ...marketSale.data!.details.V1.saleState,
                                salePace: 1.5,
                            },
                        },
                    },
                },
                "trying to change salePace",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(/sale pace must remain 1.0/);
        });

        it("doesn't allow changing progress details (lastPurchaseAt)", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();

            // Mock enforceLastPurchaseAtStartTime to not fix the value
            const enforceLastPurchaseAtStartTimeSpy = vi
                .spyOn(mktSaleDgt, "enforceLastPurchaseAtStartTime")
                .mockImplementation(function (record) {
                    return record;
                });

            const updating = h.packagedPendingUpdate({
                expectError: true,
            });

            await expect(updating).rejects.toThrow(
                /lastPurchaseAt must be equal to startAt/
            );

            enforceLastPurchaseAtStartTimeSpy.mockRestore();
        });

        it("doesn't allow changing progress details (lotCount)", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();

            // Mock fixLotCount to not fix the value
            const fixLotCountSpy = vi
                .spyOn(mktSaleDgt, "fixLotCount")
                .mockImplementation(function (record) {
                    return record;
                });

            const updating = h.packagedPendingUpdate({
                expectError: true,
            });

            await expect(updating).rejects.toThrow(
                /lotCount must be equal to totalSaleLots/
            );

            fixLotCountSpy.mockRestore();
        });

        it("doesn't allow changing progress details (prevPurchaseAt)", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();

            // Mock enforcePrevPurchaseAtStartTime to not fix the value
            const enforcePrevPurchaseAtStartTimeSpy = vi
                .spyOn(mktSaleDgt, "enforcePrevPurchaseAtStartTime")
                .mockImplementation(function (record) {
                    return record;
                });

            const updating = h.packagedPendingUpdate({
                expectError: true,
            });

            await expect(updating).rejects.toThrow(
                /prevPurchaseAt must be equal to startAt/
            );

            enforcePrevPurchaseAtStartTimeSpy.mockRestore();
        });

        it("doesn't allow changing thread info", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            threadInfo: {
                                ...marketSale.data!.details.V1.threadInfo,
                                nestedThreads: 1n,
                            },
                        },
                    },
                },
                "trying to change threadInfo",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /thread info must not change/
            );
        });

        it.todo(
            "fails if trying to change primaryAssetMph",
            async (context: STOK_TC) => {
                // This test would require creating a different minting policy hash,
                // which is complex to set up in the test environment.
                // The constraint is enforced in the Helios contract validation:
                // assert(nextAssets.primaryAssetMph == prevAssets.primaryAssetMph, "primaryAssetMph must not change")
            }
        );


        it("can update saleAssets.totalSaleLots if primaryAssetTargetCount remains an even multiple", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            const newtotalSaleLots = 2000n;
            const newPrimaryAssetTargetCount = 200_000_000n; // evenly divisible by 2000
            const newsaleLotAssets = makeValue(
                h.capo.mph,
                exampleData.details.V1.saleAssets.primaryAssetName,
                newPrimaryAssetTargetCount / newtotalSaleLots
            );

            await h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleAssets: {
                                ...marketSale.data!.details.V1.saleAssets,
                                totalSaleLots: newtotalSaleLots,
                                primaryAssetTargetCount:
                                    newPrimaryAssetTargetCount,
                                saleLotAssets: newsaleLotAssets,
                            },
                        },
                    },
                },
                "updating totalSaleLots with consistent primaryAssetTargetCount"
            );

            const updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.details.V1.saleAssets.totalSaleLots
            ).toEqual(newtotalSaleLots);
            expect(
                updatedSale.data!.details.V1.saleAssets.primaryAssetTargetCount
            ).toEqual(newPrimaryAssetTargetCount);
        });

        it("fails if primaryAssetTargetCount is not an even multiple of the lot count", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const controller = await h.mktSaleDgt();
            const exampleData = controller.exampleData();

            const newtotalSaleLots = 2000n;
            const incorrectPrimaryAssetTargetCount = 200_000_001n; // not divisible by lot count
            const newsaleLotAssets = makeValue(
                h.capo.mph,
                exampleData.details.V1.saleAssets.primaryAssetName,
                100_000n // would require 200_000_000n target
            );

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleAssets: {
                                ...marketSale.data!.details.V1.saleAssets,
                                totalSaleLots: newtotalSaleLots,
                                primaryAssetTargetCount:
                                    incorrectPrimaryAssetTargetCount,
                                saleLotAssets: newsaleLotAssets,
                            },
                        },
                    },
                },
                "trying inconsistent primaryAssetTargetCount",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /lot size mismatch with target count for primary asset/i
            );
        });

        it("saleLotAssets MUST always contain the primary asset", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleAssets: {
                                ...marketSale.data!.details.V1.saleAssets,
                                saleLotAssets: makeValue(
                                    h.capo.mph,
                                    textToBytes("KRILL"),
                                    1000n
                                ),
                            },
                        },
                    },
                },
                "dropping primary asset from saleLotAssets",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /missing primary token in saleLotAssets/i
            );
        });

        it("if primaryAsset changes and old tokens aren't deposited, saleLotAssets must not reference old primary token", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            const newPrimaryName = textToBytes("NEWPRIMARY");

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleAssets: {
                                ...marketSale.data!.details.V1.saleAssets,
                                primaryAssetName: newPrimaryName,
                                // incorrectly keep old primary reference in saleLotAssets
                                saleLotAssets: makeValue(
                                    h.capo.mph,
                                    marketSale.data!.details.V1.saleAssets
                                        .primaryAssetName,
                                    100_000n /
                                        marketSale.data!.details.V1.saleAssets
                                            .totalSaleLots
                                ),
                            },
                        },
                    },
                },
                "changing primary but still referencing old primary in saleLotAssets",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /saleLotAssets has old primary tokens remaining/i
            );
        });

        it("fails if the token count in the UTxO is modified during the update", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();

            const tcx = h.capo.mkTcx("update that changes value");
            const tcx2 = mktSaleDgt.mkTxnUpdateRecord(
                marketSale,
                {
                    txnName: "update that changes value",
                    activity:
                        mktSaleDgt.activity.SpendingActivities.UpdatingPendingSale(
                            marketSale.data!.id
                        ),
                    updatedFields: {
                        name: "Changing value should fail",
                    },
                    // Add 1 lovelace to change the UTxO value (should be rejected)
                    addedUtxoValue: makeValue(
                        h.capo.mph,
                        textToBytes("FISH"),
                        1n
                    ),
                },
                await h.capo.txnMintingFungibleTokens(tcx, "FISH", 1n)
            );
            const updating = h.submitTxnWithBlock(tcx2, {
                expectError: true,
            });

            await expect(updating).rejects.toThrow(
                /UTxO tokens changed; delta: /i
            );
        });

        it("if old primary tokens exist in UTxO, saleLotAssets must reference them with per-lot count ≥ depositedTokens/totalSaleLots", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            // Deposit some of the existing primary tokens to the sale
            const controller = await h.mktSaleDgt();
            const primaryName = bytesToText(
                marketSale.data!.details.V1.saleAssets.primaryAssetName
            );
            await h.mintAndAddAssets(marketSale, primaryName, 10_000n);

            const newPrimaryName = textToBytes("NEWPRIMARY");

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            saleAssets: {
                                ...marketSale.data!.details.V1.saleAssets,
                                primaryAssetName: newPrimaryName,
                                // Incorrectly drop reference to old primary in saleLotAssets
                                saleLotAssets: makeValue(
                                    h.capo.mph,
                                    newPrimaryName,
                                    1000n
                                ),
                            },
                        },
                    },
                },
                "changing primary without keeping old tokens referenced",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /lot size mismatch with target count for primary asset/
            );
        });

        it("fails if sale is not in Pending state", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const marketSale = await h.findFirstMarketSale();

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    name: "New Name",
                },
                "trying to update Active sale",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /UpdatingPendingSale: previous record: state must be Pending/
            );
        });

        it("requires governance authority to update the sale details", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();
            const capo = h.capo;

            vi.spyOn(capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );

            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    name: "New Name",
                },
                "trying without gov authority",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(/missing.* dgTkn capoGov/);
        });

        it("validates VxfDestination in vxfFundsTo if provided", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            // Setting vxfFundsTo to NotYetDefined should fail validation
            const updating = h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            fixedSaleDetails: {
                                ...marketSale.data!.details.V1.fixedSaleDetails,
                                vxfFundsTo: {
                                    NotYetDefined: {},
                                },
                            },
                        },
                    },
                } as any,
                "trying invalid vxfFundsTo",
                { expectError: true }
            );

            await expect(updating).rejects.toThrow(
                /VxfDestination: vxfFundsTo: NotYetDefined/
            );
        });

        it("can update vxfFundsTo to a valid value", async (context: STOK_TC) => {
            const { h } = context;

            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const marketSale = await h.findFirstMarketSale();

            await h.updatePendingMarketSale(
                marketSale,
                {
                    details: {
                        V1: {
                            ...marketSale.data!.details.V1,
                            fixedSaleDetails: {
                                ...marketSale.data!.details.V1.fixedSaleDetails,
                                vxfFundsTo: {
                                    Anywhere: {},
                                },
                            },
                        },
                    },
                },
                "updating vxfFundsTo to valid value"
            );

            const updatedSale = await h.findFirstMarketSale();
            expect(
                updatedSale.data!.details.V1.fixedSaleDetails.vxfFundsTo
            ).toBeDefined();
        });
    });

    // ============================================================
    // Paused Sale Management (REQT/05fzh7rd1q)
    // 31 tests: Stopping, Resuming, UpdatingPausedSale, Retiring
    // ============================================================

    describe("Stopping activity (REQT/03ff0mfddc)", () => {
        // Happy path: single transaction, multiple assertions
        it("stops an Active sale — state becomes Paused, all other fields unchanged (stop-active-sale/REQT/fx7m3y1ctf)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const activeSale = await h.findFirstMarketSale();
            const prevData = activeSale.data!;

            await h.stopMarketSale(activeSale);
            const stoppedSale = await h.findFirstMarketSale();
            expect("Paused" in stoppedSale.data!.details.V1.saleState.state).toBe(true);
            // All other fields unchanged
            expect(stoppedSale.data!.name).toEqual(prevData.name);
            expect(stoppedSale.data!.details.V1.saleAssets).toEqual(prevData.details.V1.saleAssets);
            expect(stoppedSale.data!.details.V1.saleState.progressDetails).toEqual(prevData.details.V1.saleState.progressDetails);
            expect(stoppedSale.data!.details.V1.saleState.salePace).toEqual(prevData.details.V1.saleState.salePace);
            expect(stoppedSale.data!.details.V1.fixedSaleDetails).toEqual(prevData.details.V1.fixedSaleDetails);
            expect(stoppedSale.data!.details.V1.threadInfo).toEqual(prevData.details.V1.threadInfo);
        });

        it("can't stop a Pending sale (stop-pending-rejected/REQT/fx7m3y1ctf)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const pendingSale = await h.findFirstMarketSale();

            await expect(h.stopMarketSale(pendingSale, { expectError: true }))
                .rejects.toThrow(/state must be Active/);
        });

        it("can't stop an already-Paused sale (stop-paused-rejected/REQT/fx7m3y1ctf)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.stopMarketSale(pausedSale, { expectError: true }))
                .rejects.toThrow(/state must be Active/);
        });

        it("requires gov authority to stop (stop-no-gov-rejected/REQT/mfpstpdjsp)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const activeSale = await h.findFirstMarketSale();

            // Mock gov authority away — on-chain policy must reject
            vi.spyOn(h.capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );
            await expect(h.stopMarketSale(activeSale, { expectError: true }))
                .rejects.toThrow(/missing.* dgTkn capoGov/);
        });

        it("can't change UTxO token value when stopping (stop-utxo-value-changed/REQT/tx3fyv3eb2)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const activeSale = await h.findFirstMarketSale();
            // Manually build Stopping txn with injected token value
            const mktSaleDgt = await h.mktSaleDgt();
            const tcx = h.capo.mkTcx("stop with value change");
            const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(activeSale, {
                txnName: "stop with value change",
                activity: mktSaleDgt.activity.SpendingActivities.Stopping(
                    activeSale.data!.details.V1.threadInfo.saleId),
                updatedFields: { details: { V1: { ...activeSale.data!.details.V1,
                    saleState: { ...activeSale.data!.details.V1.saleState,
                        state: { Paused: {} },
                    },
                }}},
                addedUtxoValue: makeValue(h.capo.mph, textToBytes("FISH"), 1n),
            }, await h.capo.txnMintingFungibleTokens(
                h.capo.mkTcx("mint FISH for stop value test"), "FISH", 1n));
            await expect(h.submitTxnWithBlock(tcx2, { expectError: true }))
                .rejects.toThrow(/UTxO tokens changed/);
        });

        it("can't sell tokens while Paused (sell-while-paused-rejected/REQT/jdepn901ag)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            h.setActor("tom"); // buyer
            await expect(h.buyFromMktSale(pausedSale, 1n, "buy while paused", { expectError: true }))
                .rejects.toThrow(/state must be Active/);
        });
    });

    describe("Resuming activity (REQT/qh3qkk8f92)", () => {
        // Happy path: resume + verify selling works after
        it("resumes a Paused sale — state becomes Active (resume-paused-sale/REQT/3h96mdmn5k)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await h.resumeMarketSale(pausedSale);
            const resumedSale = await h.findFirstMarketSale();
            expect("Active" in resumedSale.data!.details.V1.saleState.state).toBe(true);
        });

        it("selling works normally after resume (sell-after-resume/REQT/3h96mdmn5k)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleResumed();
            const resumedSale = await h.findFirstMarketSale();
            h.setActor("tom");
            await h.buyFromMktSale(resumedSale, 1n, "buy after resume");
            const afterBuy = await h.findFirstMarketSale();
            expect(afterBuy.data!.details.V1.saleState.progressDetails.lotsSold).toBeGreaterThan(0n);
        });

        it("can't resume a Pending sale (resume-pending-rejected/REQT/qh3qkk8f92)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const pendingSale = await h.findFirstMarketSale();

            await expect(h.resumeMarketSale(pendingSale, { expectError: true }))
                .rejects.toThrow(/state must be Paused/);
        });

        it("can't resume an Active sale (resume-active-rejected/REQT/qh3qkk8f92)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const activeSale = await h.findFirstMarketSale();

            await expect(h.resumeMarketSale(activeSale, { expectError: true }))
                .rejects.toThrow(/state must be Paused/);
        });

        it("requires gov authority to resume (resume-no-gov-rejected/REQT/pks8phr4y5)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            vi.spyOn(h.capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );
            await expect(h.resumeMarketSale(pausedSale, { expectError: true }))
                .rejects.toThrow(/missing.* dgTkn capoGov/);
        });

        it("rejects resume when record has invalid name (resume-invalid-name/REQT/fkww59zyt3)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            // Defense-in-depth: validate() called on resume catches datum integrity issues
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.resumeMarketSale(pausedSale, { expectError: true },
                { name: "short" }))
                .rejects.toThrow(/name must be at least 10 characters/);
        });

        it("rejects resume when saleAssets mutated (resume-frozen-saleAssets/REQT/60azhtn9dy)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.resumeMarketSale(pausedSale, { expectError: true },
                { details: { V1: { saleAssets: { ...pausedSale.data!.details.V1.saleAssets, totalSaleLots: 999n }}}}))
                .rejects.toThrow(/saleAssets|unchanged/);
        });

        it("rejects resume when startAt mutated (resume-frozen-startAt/REQT/60azhtn9dy)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.resumeMarketSale(pausedSale, { expectError: true },
                { details: { V1: { fixedSaleDetails: { ...pausedSale.data!.details.V1.fixedSaleDetails, startAt: Date.now() + 99999 }}}}))
                .rejects.toThrow(/startAt|unchanged/);
        });

        it("rejects resume when progressDetails mutated (resume-frozen-progress/REQT/60azhtn9dy)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.resumeMarketSale(pausedSale, { expectError: true },
                { details: { V1: { saleState: { ...pausedSale.data!.details.V1.saleState, progressDetails: { ...pausedSale.data!.details.V1.saleState.progressDetails, lotsSold: 999n }}}}}))
                .rejects.toThrow(/progressDetails|unchanged|lotsSold/);
        });
    });

    describe("UpdatingPausedSale activity (REQT/b30wn4bdw2)", () => {
        // Happy path: update editable fields in one transaction
        it("can update name, settings, and vxf destinations while Paused (update-paused-editables/REQT/d1967hd11e)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            const tcx = await h.updatePausedMarketSale(pausedSale, {
                name: "Updated Paused Sale Name",
                settings: { targetPrice: 2.0 },
                vxfFundsTo: { Anywhere: {} },
            });
            const updated = await h.findFirstMarketSale();
            expect(updated.data!.name).toEqual("Updated Paused Sale Name");
            expect(updated.data!.details.V1.fixedSaleDetails.settings.targetPrice).toEqual(2.0);
            expect(updated.data!.details.V1.fixedSaleDetails.vxfFundsTo).toEqual({ Anywhere: {} });

            // Wiring proof: shared validateCommonUpdateChecks pipeline ran
            h.assertEnforcedReqts(tcx, [
                "REQT-ntdbhc1xss",  // UTxO Value Unchanged — no token movement during edits
                "REQT-rg5zyhd2gb",  // ThreadInfo Frozen — equality check
                "REQT-6z88fg6j2s",  // Paused Update Validates VXF If Present — vxfTokensTo/vxfFundsTo
                "REQT-b731sye0fz",  // Settings Bounds Validation When Paused — sane pricing ranges
                "REQT-y16j4t955c",  // Name Length — at least 10 characters (via validate())
                "REQT-egttdcamhg",  // Non-Empty Assets — saleLotAssets, totalSaleLots, etc. (via validate())
            ]);
        });

        it("rejects invalid vxfFundsTo while Paused (update-paused-invalid-vxf/REQT/6z88fg6j2s)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(
                pausedSale,
                { vxfFundsTo: { NotYetDefined: {} } },
                { expectError: true },
            )).rejects.toThrow(/VxfDestination: vxfFundsTo: NotYetDefined/);
        });

        // Frozen-field tests: these bypass the helper (which structurally prevents
        // passing frozen fields) and build transactions directly via mkTxnUpdateRecord
        // + UpdatingPausedSale activity, to verify ON-CHAIN policy enforcement.

        it("can't change state during edit (update-paused-state-frozen/REQT/krpj42awmt)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    saleState: { ...pausedSale.data!.details.V1.saleState, state: { Active: {} } },
                }}},
                expectError: true,
            })).rejects.toThrow(/state must be Paused/);
        });

        it("can't change salePace (update-paused-pace-frozen/REQT/drdfrj7k96)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    saleState: { ...pausedSale.data!.details.V1.saleState, salePace: 2.0 },
                }}},
                expectError: true,
            })).rejects.toThrow(/salePace.*must equal previous|carry forward/);
        });

        it("can't change progress details (update-paused-progress-frozen/REQT/r20vvfdq05)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    saleState: { ...pausedSale.data!.details.V1.saleState,
                        progressDetails: { ...pausedSale.data!.details.V1.saleState.progressDetails,
                            lotsSold: 999n,
                        },
                    },
                }}},
                expectError: true,
            })).rejects.toThrow(/lotsSold.*must equal previous|progress.*frozen/);
        });

        it("can't change saleAssets (update-paused-assets-frozen/REQT/9eeh66pcnw)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    saleAssets: { ...pausedSale.data!.details.V1.saleAssets,
                        totalSaleLots: 999n,
                    },
                }}},
                expectError: true,
            })).rejects.toThrow(/saleAssets.*must equal previous|unchanged/);
        });

        it("can't change startAt (update-paused-startAt-frozen/REQT/q5wwj273n4)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    fixedSaleDetails: { ...pausedSale.data!.details.V1.fixedSaleDetails,
                        startAt: Date.now() + 99999,
                    },
                }}},
                expectError: true,
            })).rejects.toThrow(/startAt.*must equal previous|unchanged/);
        });

        it("can't change threadInfo (update-paused-threadInfo-frozen/REQT/rg5zyhd2gb)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { details: { V1: { ...pausedSale.data!.details.V1,
                    threadInfo: { ...pausedSale.data!.details.V1.threadInfo,
                        nestedThreads: 1n,
                    },
                }}},
                expectError: true,
            })).rejects.toThrow(/thread info must not change/);
        });

        it("can't change UTxO token value (update-paused-value-frozen/REQT/ntdbhc1xss)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            const mintTcx = await h.capo.txnMintingFungibleTokens(
                h.capo.mkTcx("mint FISH for value test"), "FISH", 1n);
            await expect(h.updatePausedMarketSale(pausedSale, {}, {
                rawUpdate: { name: pausedSale.data!.name },
                addedUtxoValue: makeValue(h.capo.mph, textToBytes("FISH"), 1n),
                preTcx: mintTcx,
                expectError: true,
            })).rejects.toThrow(/UTxO tokens changed/);
        });

        it("requires gov authority to update (update-paused-no-gov-rejected/REQT/4svc8tfffy)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            vi.spyOn(h.capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );
            await expect(h.updatePausedMarketSale(
                pausedSale,
                { name: "New Name Here!" },
                { expectError: true },
            )).rejects.toThrow(/missing.* dgTkn capoGov/);
        });
    });

    describe("Retiring activity (REQT/6kg1f7h500)", () => {
        it("retires a Paused sale — state becomes Retired (retire-paused-sale/REQT/hcagxtdt35)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            const prevData = pausedSale.data!;
            await h.retireMarketSale(pausedSale);
            const retiredSale = await h.findFirstMarketSale();
            expect("Retired" in retiredSale.data!.details.V1.saleState.state).toBe(true);
            // All fields unchanged except state
            expect(retiredSale.data!.name).toEqual(prevData.name);
            expect(retiredSale.data!.details.V1.saleAssets).toEqual(prevData.details.V1.saleAssets);
            expect(retiredSale.data!.details.V1.saleState.progressDetails).toEqual(prevData.details.V1.saleState.progressDetails);
            expect(retiredSale.data!.details.V1.fixedSaleDetails).toEqual(prevData.details.V1.fixedSaleDetails);
            expect(retiredSale.data!.details.V1.threadInfo).toEqual(prevData.details.V1.threadInfo);
        });

        it("can't retire from Active — must Stop first (retire-active-rejected/REQT/7j07yjvpbh)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleActivated();
            const activeSale = await h.findFirstMarketSale();

            await expect(h.retireMarketSale(activeSale, { expectError: true }))
                .rejects.toThrow(/state must be Paused/);
        });

        it("can't retire from Pending (retire-pending-rejected/REQT/7j07yjvpbh)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSale();
            const pendingSale = await h.findFirstMarketSale();

            await expect(h.retireMarketSale(pendingSale, { expectError: true }))
                .rejects.toThrow(/state must be Paused/);
        });

        it("requires gov authority to retire (retire-no-gov-rejected/REQT/3fhy62nx77)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            vi.spyOn(h.capo, "txnAddGovAuthority").mockImplementation(
                async (tcx) => tcx as any
            );
            await expect(h.retireMarketSale(pausedSale, { expectError: true }))
                .rejects.toThrow(/missing.* dgTkn capoGov/);
        });

        it("can't change UTxO token value when retiring (retire-utxo-value-changed/REQT/dtpwzjqn9p)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSalePaused();
            const pausedSale = await h.findFirstMarketSale();
            const mktSaleDgt = await h.mktSaleDgt();
            const tcx = h.capo.mkTcx("retire with value change");
            const tcx2 = await mktSaleDgt.mkTxnUpdateRecord(pausedSale, {
                txnName: "retire with value change",
                activity: mktSaleDgt.activity.SpendingActivities.Retiring(
                    pausedSale.data!.details.V1.threadInfo.saleId),
                updatedFields: { details: { V1: { ...pausedSale.data!.details.V1,
                    saleState: { ...pausedSale.data!.details.V1.saleState,
                        state: { Retired: {} },
                    },
                }}},
                addedUtxoValue: makeValue(h.capo.mph, textToBytes("FISH"), 1n),
            }, await h.capo.txnMintingFungibleTokens(
                h.capo.mkTcx("mint FISH for retire value test"), "FISH", 1n));
            await expect(h.submitTxnWithBlock(tcx2, { expectError: true }))
                .rejects.toThrow(/UTxO tokens changed/);
        });

        it("can't transition back from Retired (retired-no-regression/REQT/w0hvrt4xx8)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstMarketSaleRetired();
            const retiredSale = await h.findFirstMarketSale();
            await expect(h.resumeMarketSale(retiredSale, { expectError: true }))
                .rejects.toThrow(/state must be Paused/);
        });
    });
});
