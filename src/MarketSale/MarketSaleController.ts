// import {
//     MarketSaleAdapter,
//     mktSaleCreationHelper,
//     PurchaseContext,
//     type MarketSaleData,
// } from "./MarketSaleAdapter.tsxxx";

import {
    Activity,
    hasReqts,
    dumpAny,
    StellarTxnContext,
    DelegatedDataContract,
    displayTokenName,
    realMul,
    textToBytes,
    bytesToText,
    // tagOnly,
    toFixedReal,
    realDiv,
    debugMath,
    WrappedDgDataContract,
} from "@donecollectively/stellar-contracts";

import type {
    FoundDatumUtxo,
    hasSettingsRef,
    hasUutContext,
    hasSeed,
    hasSeedUtxo,
    hasCharterRef,
    isActivity,
    updateActivityFunc,
    seedActivityFunc,
    Capo,
    CapoDelegateBundle,
    DelegatedDataBundle,
} from "@donecollectively/stellar-contracts";
import {
    makeDummyAddress,
    makeValue,
    type MintingPolicyHash,
    type Value,
} from "@helios-lang/ledger";

// import type {
//     ErgoMarketSaleData,
//     MarketSaleData,
//     MarketSaleDataLike,
//     minimalMarketSaleData,
// } from "./MarketSale.generic.typeInfo.js";
// import MarketSalePolicyDataBridge from "./MarketSale.generic.bridge.js";
// import type MarketSaleBundle from "./MarketSale.generic.hlb.js";
import { encodeUtf8 } from "@helios-lang/codec-utils";
import { MarketSaleDataWrapper } from "./MarketSaleDataWrapper.js";
import MarketSalePolicyDataBridge from "./MarketSale.bridge.js";
import type {
    ErgoMarketSaleData,
    MarketSaleData,
    MarketSaleDataLike,
    minimalMarketSaleData,
} from "./MarketSale.typeInfo.js";
export type {
    ErgoMarketSaleData,
    MarketSaleData,
    MarketSaleDataLike,
    minimalMarketSaleData,
} from "./MarketSale.typeInfo.js";

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
export class MarketSaleController extends WrappedDgDataContract<
    MarketSaleData,
    MarketSaleDataLike,
    MarketSaleDataWrapper
> {
    dataBridgeClass = MarketSalePolicyDataBridge;

    get recordTypeName() {
        return "mktSale";
    }

    // get abstractBundleClass() {
    //     return MarketSaleBundle;
    // }

    get idPrefix() {
        return "mktSale";
    }

    async scriptBundleClass() {
        const module = await import("./MarketSale.hlb.js");

        return module.MarketSaleBundle;
    }

    exampleData(): minimalMarketSaleData {
        const tn = encodeUtf8("PLANKTON");
        const mph = this.capo.mph;
        const units = 1000n;
        const startTime = new Date().getTime();
        const data: minimalMarketSaleData = {
            // id: "mktSale_123",
            // type: "mktSale",
            name: "Sample marketSale",
            details: {
                V1: {
                    fixedSaleDetails: {
                        settings: {
                            targetPrice: 1,
                            targetedSellingTime: 75 * 60 * 1_000,

                            minPrice: 0.5,
                            maxPrice: 4.2,

                            progressPricingDiscountFloorPoint: 0.2,
                            progressPricingDiscountWhenSlow: 0.25,
                            progressPricingExpansionWhenFast: 0.2,

                            dynaPaceFasterSaleWeight: 0.3,
                            dynaPaceIdleDecayRate: 0.5,

                            pricingWeightDynaPace: 5,
                        },
                        startAt: startTime,
                        vxfTokensTo: undefined,
                        vxfFundsTo: {
                            Anywhere: {},
                        },
                    },
                    saleAssets: {
                        primaryAssetMph: mph,
                        primaryAssetName: tn,
                        primaryAssetTargetCount: 100_000_000n,
                        totalSaleUnits: units,
                        saleUnitAssets: makeValue(
                            mph,
                            tn,
                            100_000_000n / units
                        ),
                        singleBuyMaxUnits: 25n,
                    },
                    saleState: {
                        progressDetails: {
                            lastPurchaseAt: startTime,
                            prevPurchaseAt: startTime,
                            chunkUnitCount: units,
                            chunkUnitsSold: 0n,
                        },
                        salePace: 1,
                        state: { Pending: {} },
                    },
                    threadInfo: {
                        chunkForkedAt: 0n,
                        nestedThreads: 0n,
                        retiredThreads: 0n,
                        parentChunkId: encodeUtf8(""),
                        // is changed to match the sale `id` on creation
                        // ... or to parentChunkId's saleId, if this is a split chunk
                        saleId: encodeUtf8("mktSale-123"),
                    },
                },
            },
        };
        return data;
    }

    // mkDatumAdapter() {
    //     return new MarketSaleAdapter(this);
    // }

    async findMarketSales({
        saleId,
        parentId,
        isRoot,
        pending,
        active,
        retired,
    }: {
        saleId?: string;
        parentId?: string;
        isRoot?: boolean;
        pending?: boolean;
        active?: boolean;
        retired?: boolean;
    }): Promise<FoundDatumUtxo<MarketSaleData>[]> {
        if (isRoot && !!parentId) {
            throw new Error("isRoot and parentId are mutually exclusive");
        }
        const targetSaleId = saleId ? encodeUtf8(saleId) : undefined;
        const targetParentId = parentId ? encodeUtf8(parentId) : undefined;
        return this.capo.findDelegatedDataUtxos({
            type: "mktSale",
            predicate(utxo, data) {
                if (
                    !!saleId &&
                    data.details.V1.threadInfo.saleId != targetSaleId
                )
                    return false;
                if (
                    !!parentId &&
                    data.details.V1.threadInfo.parentChunkId != targetParentId
                )
                    return false;
                if (!!isRoot && data.id != data.details.V1.threadInfo.saleId)
                    return false;

                {
                    let stateMatch = false;
                    if (pending && "Pending" in data.details.V1.saleState.state)
                        stateMatch = true;
                    if (active && "Active" in data.details.V1.saleState.state)
                        stateMatch = true;
                    if (retired && "Retired" in data.details.V1.saleState.state)
                        stateMatch = true;
                    if (!pending && !active && !retired) stateMatch = true;

                    if (!stateMatch) return false;
                }

                return true;
            },
        });
    }

    // @Activity.redeemer
    // activitySplittingAndBuyingFromChunk(
    //     seedFrom: hasSeed,
    //     splitChunkId: string,
    //     buyQuantity: bigint
    // ) {
    //     const seed = this.getSeed(seedFrom);

    //     return this.mkSeededMintingActivity(
    //         "SplittingSaleChunkAndBuying",
    //         {seed,
    //         splitChunkId,
    //         buyQuantity}
    //     );
    // }

    // @Activity.redeemer
    // activityJoiningSaleChunk(chunkId: string, parentChunkId: string) {
    //     return this.mkBurningActivity(
    //         "CreatingMarketSale",
    //         chunkId,
    //         parentChunkId
    //     );
    // }

    // @Activity.redeemer
    // activityAddingToSale(
    //     saleId: string,
    //     mph: helios.MintingPolicyHash,
    //     tn: string | number[]
    // ) {
    //     const tnBytes = typeof tn === "string" ? helios.textToBytes(tn) : tn;
    //     return this.mkSpendingActivity("AddingToSale", saleId, mph, tnBytes);
    // }

    // @Activity.redeemer
    // activityActivating(saleId: string) {
    //     // const numbers = typeof saleId === "string" ? helios.textToBytes(saleId) : saleId;
    //     debugger;
    //     return this.mkSpendingActivity("Activating", saleId);
    // }

    // @Activity.redeemer
    // activitySellingTokens(chunkId: string, quantity: bigint) {
    //     const adapter = this.mkDatumAdapter();
    //     return this.mkSpendingActivity("SellingTokens", chunkId, quantity);
    // }

    /**
     * returns a timestamp for expected expiration of the discount
     *
     * @param tcx - transaction context with settings
     * @returns
     */
    async getExpiry<TCX extends StellarTxnContext & hasSettingsRef>(tcx: TCX) {
        // const settings = await this.capo.findSettingsInfo({
        //     settingsUtxo: tcx.state.settingsRef,
        // });

        const second = 1_000; // milliseconds
        const hour = 3_600 * second;
        const day = 24 * hour;
        // gives 1 hour of leeway for transaction-creation
        return new Date();
    }

    // use mkTxnCreateRecord instead
    // async mkTxnCreateMarketSale(
    //     this: MarketSaleController,
    //     /* mktSaleDta(some reqd, some optional), +primary-asset indicators */
    //     mktSaleCreationSettings: minimalMarketSaleData
    // ) {
    //     const tcx = this.mkTcx("createMarketSale");
    //     const { capo } = this;

    //     const {
    //         primaryAssetMph = capo.mph,
    //         primaryAssetName,
    //         primaryAssetTargetCount,
    //         ...mktSale
    //     } = mktSaleCreationSettings;

    //     const now = new Date();
    //     const sale: MarketSaleData = {
    //         id: "", // placeholder
    //         saleId: "", // placeholder

    //         ...mktSale,
    //         primaryAssetMph,
    //         primaryAssetName,
    //         primaryAssetTargetCount,
    //         saleUnitAssets: makeValue(
    //             primaryAssetMph,
    //             primaryAssetName,
    //             primaryAssetTargetCount / mktSale.totalSaleUnits
    //         ),
    //         type: "mktSale",
    //         state: "Pending",
    //         startAt: now,
    //         progressDetails: {
    //             lastPurchaseAt: now,
    //             prevPurchaseAt: now,
    //             chunkUnitCount: mktSale.totalSaleUnits,
    //             chunkUnitsSold: 0n,
    //         },
    //         nestedThreads: 0n,
    //         parentChunkId: "",
    //         retiredThreads: 0n,
    //     };
    //     // return this.mkTxnCreateRecord(
    //     //     sale,
    //     //     this.usesSeedActivity(this.activityCreatingMarketSale, "...seed"),
    //     //     {
    //     //         beforeSave(x) {
    //     //             return {
    //     //                 ...x,
    //     //                 saleId: x.id,
    //     //             } as typeof x;
    //     //         },
    //     //     }
    //     // );
    // }

    beforeCreate(data: MarketSaleData) {
        debugger;
        data.details.V1.threadInfo.saleId = data.id;
        return data;
    }

    async mkTxnActivateMarketSale<
        TCX extends hasCharterRef | StellarTxnContext
    >(
        this: MarketSaleController,
        mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        addedTokenValue: Value = makeValue(0n),
        newAttrs: Partial<MarketSaleDataLike>,
        tcx?: TCX
    ): Promise<TCX> {
        console.log("🏒 activating mktSale");

        // console.profile("activate sale");
        const tt = await this.mkTxnUpdateRecord(
            "activate MarketSale",
            mktSale,
            {
                activity: this.activity.SpendingActivities.Activating(
                    mktSale.data!.details.V1.threadInfo.saleId
                ),
                updatedFields: {
                    ...newAttrs,
                    details: {
                        V1: {
                            ...newAttrs.details?.V1,
                            saleState: {
                                ...mktSale.data!.details.V1.saleState,
                                ...newAttrs.details?.V1?.saleState,
                                state: { Active: {} },
                            },
                            fixedSaleDetails: {
                                ...mktSale.data!.details.V1.fixedSaleDetails,
                                ...newAttrs.details?.V1?.fixedSaleDetails,
                            },
                            saleAssets: {
                                ...mktSale.data!.details.V1.saleAssets,
                                ...newAttrs.details?.V1?.saleAssets,
                            },
                            threadInfo: {
                                ...mktSale.data!.details.V1.threadInfo,
                                ...newAttrs.details?.V1?.threadInfo,
                            },
                        },
                    },
                },
                addedUtxoValue: addedTokenValue,
            },
            tcx
        );
        // console.profileEnd("activate sale");
        return tt;
    }

    async mkTxnAddToMarketSale<TCX extends hasCharterRef>(
        this: MarketSaleController,
        mktSale: FoundDatumUtxo<MarketSaleData>,
        addedTokenMph: MintingPolicyHash,
        addedTokenName: string | number[],
        addedTokenCount: number | bigint,
        tcx?: TCX
    ): Promise<TCX> {
        console.log("🏒 adding to mktSale");
        const existingSale = mktSale.data!;
        if (!existingSale) {
            throw new Error("mktSale not found");
        }

        const newTnBytes =
            typeof addedTokenName === "string"
                ? textToBytes(addedTokenName)
                : addedTokenName;
        const addedTokenValue = makeValue(
            addedTokenMph,
            newTnBytes,
            BigInt(addedTokenCount)
        );
        console.log("  -- addedTokenValue", dumpAny(addedTokenValue));
        debugger;
        const newTnString = bytesToText(newTnBytes);
        const primaryTnString =
            "string" ===
            typeof existingSale.details.V1.saleAssets.primaryAssetName
                ? existingSale.details.V1.saleAssets.primaryAssetName
                : bytesToText(
                      existingSale.details.V1.saleAssets.primaryAssetName
                  );
        const isPrimary =
            addedTokenMph.isEqual(
                existingSale.details.V1.saleAssets.primaryAssetMph
            ) && newTnString == primaryTnString;
        const existingTokensInContract =
            mktSale.utxo.value.assets.getPolicyTokenQuantity(
                addedTokenMph,
                newTnBytes
            );
        console.log(
            "    -- existingTokensInContract",
            existingTokensInContract
        );
        const previousSaleUnit =
            existingSale.details.V1.saleAssets.saleUnitAssets;
        console.log("    -- previousSaleUnit", dumpAny(previousSaleUnit));
        const prevSaleUnitCountThisToken =
            previousSaleUnit.assets.getPolicyTokenQuantity(
                addedTokenMph,
                newTnBytes
            );
        const prevSaleUnitThisTokenValue = makeValue(
            addedTokenMph,
            newTnBytes,
            prevSaleUnitCountThisToken
        );
        const otherValueInPrevSaleUnit = previousSaleUnit.subtract(
            prevSaleUnitThisTokenValue
        );
        const updatedCount = existingTokensInContract + BigInt(addedTokenCount);

        // for primary tokens, it retains the unit-size for that token when adding them to the sale
        // for non-primary tokens added, the unit-size is updated to reflect the new deposted-token-amount
        const updatedUnitCount = isPrimary
            ? prevSaleUnitCountThisToken
            : updatedCount / existingSale.details.V1.saleAssets.totalSaleUnits;

        const newSaleUnitThisTokenValue = makeValue(
            addedTokenMph,
            newTnBytes,
            updatedUnitCount
        );
        console.log(
            "    -- newSaleUnitThisTokenValue",
            dumpAny(newSaleUnitThisTokenValue)
        );
        const saleUnitAssets = otherValueInPrevSaleUnit.add(
            newSaleUnitThisTokenValue
        );
        console.log("    -- ℹ️  token name", displayTokenName(newTnBytes));
        console.log("    -- ℹ️  updatedCount", updatedCount);
        console.log("    -- ℹ️  new saleUnitAssets", dumpAny(saleUnitAssets));
        console.log(
            "    -- ℹ️  totalSaleUnits",
            existingSale.details.V1.saleAssets.totalSaleUnits
        );
        if (isPrimary) {
            console.log(
                `Primary token is now ${
                    Math.floor(
                        (Number(updatedCount) /
                            Number(
                                existingSale.details.V1.saleAssets
                                    .primaryAssetTargetCount
                            )) *
                            1_000_000
                    ) / 10_000
                }% funded`
            );
        } else {
            if (
                updatedCount %
                    existingSale.details.V1.saleAssets.totalSaleUnits !=
                0n
            ) {
                throw new Error(
                    "Updated (non-primary) token count not divisible by total sale units"
                );
            }
        }

        const tcx2 = await this.mkTxnUpdateRecord(
            "add tokens to MarketSale",
            mktSale,
            {
                activity: this.activity.SpendingActivities.AddingToSale({
                    id: existingSale.details.V1.threadInfo.saleId,
                    mph: addedTokenMph,
                    tn:
                        "string" === typeof addedTokenName
                            ? textToBytes(addedTokenName)
                            : addedTokenName,
                }),
                updatedFields: {
                    details: {
                        V1: {
                            ...mktSale.data!.details.V1,
                            saleAssets: {
                                ...mktSale.data!.details.V1.saleAssets,
                                saleUnitAssets,
                            },
                            fixedSaleDetails: {
                                ...mktSale.data!.details.V1.fixedSaleDetails,
                            },
                            threadInfo: {
                                ...mktSale.data!.details.V1.threadInfo,
                            },
                            saleState: {
                                ...mktSale.data!.details.V1.saleState,
                            },
                        },
                    },
                },
                addedUtxoValue: addedTokenValue,
            },
            tcx
        );
        return this.capo.txnAddGovAuthority(tcx2);
    }

    saleTokenValue(
        itemDetails: FoundDatumUtxo<MarketSaleData>,
        sellingUnitQuantity: number | bigint = 1
    ) {
        return itemDetails.data!.details.V1.saleAssets.saleUnitAssets.multiply(
            sellingUnitQuantity
        );
    }

    // async XXXgetUnitPriceViaHelios(
    //     sale: FoundDatumUtxo<MarketSaleData>,
    //     now_: Date,
    //     sellingUnitQuantity_: number | bigint
    // ): Promise<number> {
    //     const funcs = this.onChainFunctions();
    //     const adapter = this.mkDatumAdapter();
    //     const ocDatum = new UplcDataValue(
    //         Site.dummy(),
    //         (await adapter.toOnchainDatum(sale.datum)).data
    //     );
    //     const now = UplcInt.new(now_.getTime()); //adapter.uplcInt
    //     const sellingUnitQuantity = UplcInt.new(sellingUnitQuantity_); // adapter.uplcInt(sellingUnitQuantity_);
    //
    //     //@ts-expect-error
    //     const topScope = this.scriptProgram.evalTypes(); // TopScope {#parent: GlobalScope, #values: Array(13), #allowShadowing: false, #strict: false}
    //     const delegateModuleScope = topScope.getModuleScope(
    //         //@ts-expect-error
    //         this.scriptProgram.mainImportedModules.find(
    //             (x) => x.name.value == this.specializedDelegateModule.moduleName
    //         ).name
    //     );
    //     const func = delegateModuleScope.get("getUnitPrice").asFunc;
    //
    //     throw new Error(
    //         `this doesn't work because the types of the data aren't understood by func.call()`
    //     );
    //     const result1 = func.call(Site.dummy(), [], {
    //         // named args
    //         mktSale: ocDatum,
    //         now: now,
    //         sellingUnitQuantity: sellingUnitQuantity,
    //     });
    //
    //     return 1.42;
    // }

    async mkTxnBuyFromMarketSale<TCX extends StellarTxnContext>(
        this: MarketSaleController,
        mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        {
            sellingUnitQuantity,
            delegateActivity,
        }: {
            sellingUnitQuantity: number | bigint;
            delegateActivity?: isActivity;
        },
        tcxIn?: TCX
    ) {
        const tokenValuePurchase = this.saleTokenValue(
            mktSale,
            sellingUnitQuantity
        );

        const tcx = tcxIn || this.mkTcx(tcxIn, "buyFromMarketSale");
        const mktSaleData = mktSale.data!;
        const mktSaleObj = mktSale.dataWrapped!;

        const thisPurchaseAt = tcx.txnTime;
        const pCtx: PurchaseContext = {
            prevSale: mktSaleObj,
            now: thisPurchaseAt,
            unitCount: BigInt(sellingUnitQuantity),
        };
        console.log("🏒 buying from mktSale");
        debugger;
        const unitPrice = mktSaleObj.getUnitPrice(pCtx);
        console.log("    -- unit price", unitPrice);

        const nextSalePace = mktSaleObj.computeNextSalePace(pCtx);
        console.log("    -- next sale pace", nextSalePace);
        const pmtAda = realMul(Number(sellingUnitQuantity), unitPrice);

        const pmtLovelace = this.ADA(pmtAda);
        const pmtValue = makeValue(pmtLovelace);

        const addedUtxoValue = pmtValue.subtract(tokenValuePurchase);

        console.log("    -- existing value", dumpAny(mktSale.utxo.value));
        console.log("    -- tokenValuePurchase", dumpAny(tokenValuePurchase));
        console.log("    -- value adjustment", dumpAny(addedUtxoValue));
        console.log("    -- payment lovelace", pmtLovelace);
        console.log("    -- payment", dumpAny(pmtValue));

        const { lastPurchaseAt: prevPurchaseAt } =
            mktSaleData.details.V1.saleState.progressDetails;

        debugger;
        const tcx2 = tcx.validFor(
            5 * 60 * 1000 // 5 minutes
        );

        const paymentUtxo = await this.uh.findActorUtxo(
            "token-purchase payment",
            this.uh.mkValuePredicate(pmtLovelace, tcxIn),
            {
                exceptInTcx: tcx,
            }
        );

        if (paymentUtxo) {
            tcx2.addInput(paymentUtxo) as TCX & typeof tcx;
        } else {
            throw new Error("no payment utxo found");
        }

        const { chunkUnitCount, chunkUnitsSold } =
            mktSale.data!.details.V1.saleState.progressDetails;

        const activity =
            delegateActivity ??
            this.activity.SpendingActivities.SellingTokens({
                id: mktSale.data!.id,
                sellingUnitQuantity: BigInt(sellingUnitQuantity),
                salePrice: makeValue(this.ADA(unitPrice)),
            });
        return this.mkTxnUpdateRecord(
            "buy from MarketSale",
            mktSale,
            {
                activity,
                addedUtxoValue,
                updatedFields: this.mkUpdatedDetails(mktSaleData, {
                    // state: "Active",
                    details: {
                        V1: {
                            ...mktSaleData.details.V1,
                            saleState: {
                                ...mktSaleData.details.V1.saleState,
                                progressDetails: this.mkUpdatedProgressDetails({
                                    lastPurchaseAt: thisPurchaseAt.getTime(),
                                    prevPurchaseAt,
                                    chunkUnitCount,
                                    chunkUnitsSold:
                                        chunkUnitsSold +
                                        BigInt(sellingUnitQuantity),
                                }),
                                salePace: nextSalePace,
                            },
                        },
                    },
                    // prevSaleAt: mktSale.datum.lastSaleAt,
                    // weightedPace:
                    // this.computeWeightedPace(
                    //  mktSale,  thisSaleAt
                    // ) lastSaleAt, prevSaleAt, weightedPace => + X
                }),
            },
            tcx2
        );
    }
    /**
     * mockable method for updating sale data, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedDetails(msd: MarketSaleData, pmsd: Partial<MarketSaleData>) {
        return pmsd;
    }

    /**
     * mockable method for updating progress details for a sale, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedProgressDetails({
        lastPurchaseAt,
        prevPurchaseAt,
        chunkUnitCount,
        chunkUnitsSold,
    }: MarketSaleData["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleData["details"]["V1"]["saleState"]["progressDetails"] {
        return {
            lastPurchaseAt,
            prevPurchaseAt,
            chunkUnitCount,
            chunkUnitsSold,
        };
    }

    // async mkTxnBuyAndSplit(
    //     mktSale: FoundDatumUtxo<MarketSaleData>,
    //     sellingUnitQuantity: number | bigint,
    //     tcxIn?: StellarTxnContext
    // ) {
    //     const tcx = tcxIn || this.mkTcx(tcxIn, "buyAndSplit");
    //     const tcx2 = await this.mkTxnBuyFromMarketSale(
    //         mktSale,
    //         {
    //             sellingUnitQuantity,
    //             delegateActivityFunc: this.activitySplittingAndBuyingFromChunk
    //         },
    //         tcx
    //     );

    //     return this.txnSplittingSaleChunk(tcx2, mktSale, splitToChunk);
    // }

    requirements() {
        return hasReqts({
            // each requirement entry describes a high-level scope of functionality
            // its key is a string that summarizes each requirement's scope
            // the nested 'purpose' key (string) should describe the high-level purpose of the requirement
            // the nested 'details' (string[]) should describe how the requirement is met
            // the nested 'mech' (string[]) should match the specific tests that verify the requirement
            // the nested 'requires' (string[]) should list the keys of any other requirements that are needed to support this requirement.

            // when generating requirements from tests, the test describe() label MUST be used for the requirement key, and
            // the it() labels MUST be used verbatim for the mech entries.  For example, if a test is:
            // describe("Governs the process of selling tokens to buyers", () => {
            //   it("has a frobnicator", () => { ... })
            //   it("does good things with it", () => { ... })
            // }
            // ... then the resulting requirment should be:
            // "Governs the process of selling tokens to buyers": {
            //     purpose: "supports many contextual use-cases in which tokens are offered for purchase",
            //     details: [
            //         "This package of requirements is not (yet) well labeled for consumption (WIP)"
            //     ],
            //     mech: [
            //         "has a frobnicator",
            //         "does good things with it"
            //   ],
            //     requires: [

            //     ]
            // },

            // Copilot: to generate additional requirements from tests, in the format indicated above:
            //  - consult the test files found near this file (in the same directory or in tests/ subdirectory)
            //  - there MUST be one requirement for each describe() block in the test, with its key exactly matching the describe() label.
            //  - in each requirement, the 'mech' key MUST list the it() labels from the test that verify the requirement.
            //  - Use ONLY the describe() and it() labels from the tests, when generating the requirement keys and mech entries.
            //  - include purpose and details as needed to clarify the requirement's scope and purpose.
            //  - the output entries MUST be in the same JSON format as the example above, with the requirement keys and structure described.

            "Governs the process of selling tokens to buyers": {
                purpose:
                    "Handles the creation and management of market sales, supporting many contextual use-cases in which tokens are offered for purchase",
                details: [
                    "Ensures that market sales are created with the correct details and managed properly throughout their lifecycle",
                    "This package of requirements is not (yet) well labeled for consumption (WIP)",
                ],
                mech: [],
                requires: [
                    "it's created with key details of a sale",
                    "Activity:AddTokens allows additional tokens to be added to a Pending mktSale",
                    "has a state machine for sale lifecycle",
                    "Will sell its tokens when conditions are right",
                    "updates appropriate sale details as a result of each sale",
                    "participates in the Txf protocol for getting paid",
                    "participates in the Txf protocol for distributing the tokens",
                    "Splits the sale into chunks for scaling",
                ],
            },
            "it's created with key details of a sale": {
                purpose: "Supports accurate administration of the sale process",
                details: [],
                mech: [
                    "has expected labels and other high-level details",
                    "has initial timestamps",
                    "has key details of price, sale-sizes and token to be sold",
                ],
                requires: [],
            },
            "participates in the Txf protocol for getting paid": {
                purpose:
                    "Gives the sale assurance of receiving funds, without having to hold the funds",
                details: [
                    "Captures an expected destination for the amount people pay for tokens",
                    "During a sale, it checks that the destination (a delegate's UUT) is participating as a Txf receiver",
                    "See more elsewhere about the Txf protocol",
                ],
                mech: [
                    "can seal the Txf setup in the 'txfFundsTo' field if the receiver is participating",
                    "won't seal the funds-receiver without the receiver's participation",
                    "requires the gov authority to seal the Txf for funds",
                    "requires the Txf funds-receiver's participation during a sale, if so configured",
                ],
            },
            "participates in the Txf protocol for distributing the tokens": {
                purpose:
                    "Allows other contract-script collaborators to be assured of being a custodian of the tokens",
                details: [
                    "Captures an expected destination for the tokens sold",
                    "During a sale, it checks that the destination (a delegate's UUT) is participating as a Txf receiver",
                    "See more elsewhere about the Txf protocol",
                ],
                mech: [
                    "can seal the Vxf setup in the 'vxfTokensTo' field if the receiver is participating",
                    "won't seal the tokens-receiver without the receiver's participation",
                    "requires the gov authority to seal the Vxf for tokens",
                    "requires the Vxf tokens-receiver's participation during a sale, if so configured",
                ],
            },
            "Activity:AddTokens allows additional tokens to be added to a Pending mktSale":
                {
                    purpose:
                        "Manages the addition of tokens to a pending market sale",
                    details: [
                        "Ensures that tokens can be added to a pending sale under the correct conditions",
                    ],
                    mech: [
                        "can AddTokens to a Pending sale",
                        "can't add non-primary tokens if the sale-assets aren't even",
                        "requires the gov authority to AddTokens",
                    ],
                    requires: [],
                },
            "has a state machine for sale lifecycle": {
                purpose: "Manages the state transitions of a market sale",
                details: [
                    "Ensures that market sales transition through the correct states during their lifecycle",
                ],
                mech: [
                    "starts in Pending state",
                    "moves to Active state when ActivatingSale",
                ],
                requires: [],
            },
            "Will sell its tokens when conditions are right": {
                purpose:
                    "Handles the sale of tokens under the correct conditions",
                details: [
                    "Ensures that tokens are sold only when the conditions are met",
                ],
                mech: [
                    "doesn't sell while state is Pending",
                    "doesn't sell tokens before the start date",
                    "won't sell more than singleBuyMaxUnits, or less than 1 unit",
                    "sells tokens when Active and in the selling period",
                    "won't sell tokens from a sale chunk less than 10 minutes old",
                ],
                requires: [],
            },
            "updates appropriate sale details as a result of each sale": {
                purpose: "Updates the sale details after each sale",
                details: [
                    "Ensures that the sale details are updated correctly after each sale",
                ],
                mech: [
                    "updates the timestamps and units-sold",
                    "fails if it changes the settings or unit-counts",
                    "updates the stratState's sellingPace field",
                    "fails without the correct next dynamicPace",
                ],
                requires: [],
            },
            "Splits the sale into chunks for scaling": {
                purpose:
                    "Manages the splitting of sales into chunks for better scaling",
                details: [
                    "Ensures that sales can be split into smaller chunks for better management and scaling",
                ],
                mech: [
                    "splits a chunk from the root sale record",
                    "will split a new chunk from an immature chunk",
                    "won't split a chunk that's aged into maturity",
                    "won't create a split chunk smaller than the minSaleSize",
                    "sets correct details for the new chunk",
                    "won't split off a child chunk without correct updates to the parent",
                ],
                requires: [],
            },
        });
    }

    mkDataWrapper(data: ErgoMarketSaleData): MarketSaleDataWrapper {
        return new MarketSaleDataWrapper(data, this, this.capo as any);
    }
}
