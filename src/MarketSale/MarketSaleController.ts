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
    createContext,
    updateContext,
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
import type { StellarTokenomicsCapo } from "../StellarTokenomicsCapo.js";

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
    lotCount: bigint;
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

    get capo(): StellarTokenomicsCapo<any, any> {
        return super.capo as StellarTokenomicsCapo<any, any>;
    }

    get recordTypeName() {
        return "mktSale" as const;
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

    beforeCreate(newRecord, { activity }) {
        return {
            ...newRecord,
            details: {
                ...newRecord.details,
                V1: {
                    ...newRecord.details.V1,
                    threadInfo: {
                        ...newRecord.details.V1.threadInfo,
                        saleId: newRecord.id,
                    },
                },
            },
        };
    }

    beforeUpdate(
        updated: MarketSaleDataLike,
        { activity, original }: updateContext<ErgoMarketSaleData>
    ) {
        // doesn't interfere with the transaction-builder for selling while active:
        if (original.details.V1.saleState.state.Active) {
            return updated;
        }
        if (updated.details.V1.saleState.state.Pending) {
            return this.fixLotCount(
                this.enforceLastPurchaseAtStartTime(
                    this.enforcePrevPurchaseAtStartTime(updated)
                )
            );
        }
        return updated;
    }

    fixLotCount(
        record: MarketSaleDataLike
    ): MarketSaleDataLike {
        const lotCount = record.details.V1.saleAssets.totalSaleLots;
        if (record.details.V1.saleState.progressDetails.lotCount == lotCount) {
            return record;
        }
        return this.withSaleProgresssDetails(record, {
            ...record.details.V1.saleState.progressDetails,
            lotCount,
        });
    }

    withSaleProgresssDetails(
        record: MarketSaleDataLike,
        progressDetails: MarketSaleDataLike["details"]["V1"]["saleState"]["progressDetails"]
    ): MarketSaleDataLike {
        return {
            ...record,
            details: {
                ...record.details,
                V1: {
                    ...record.details.V1,
                    saleState: {
                        ...record.details.V1.saleState,
                        progressDetails,
                    },
                },
            },
        };
    }

    enforcePrevPurchaseAtStartTime(
        record: MarketSaleDataLike
    ): MarketSaleDataLike {
        const startAt = record.details.V1.fixedSaleDetails.startAt;
        if (
            record.details.V1.saleState.progressDetails.prevPurchaseAt ==
            startAt
        ) {
            return record;
        }
        return this.withSaleProgresssDetails(record, {
            ...record.details.V1.saleState.progressDetails,
            prevPurchaseAt: startAt,
        });
    }

    enforceLastPurchaseAtStartTime(
        record: MarketSaleDataLike
    ): MarketSaleDataLike {
        const startAt = record.details.V1.fixedSaleDetails.startAt;
        if (
            record.details.V1.saleState.progressDetails.lastPurchaseAt ==
            startAt
        ) {
            return record;
        }

        return this.withSaleProgresssDetails(record, {
            ...record.details.V1.saleState.progressDetails,
            lastPurchaseAt: startAt,
        });
    }

    exampleData(): minimalMarketSaleData {
        const tn = encodeUtf8("PLANKTON");
        const mph = this.capo.mph;
        const lots = 1000n;
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
                            targetedSellingTime:
                                4.5 * 24 * 3600 * 1_000 /** 4.5 days */,

                            minPrice: 0.5,
                            maxPrice: 4.2,

                            progressPricingDiscountFloorPoint: 0.2,
                            progressPricingDiscountWhenSlow: 0.25,
                            progressPricingExpansionWhenFast: 0.2,

                            dynaPaceFasterSaleWeight: 0.12,
                            dynaPaceIdleDecayRate: 0.5,

                            pricingWeightDynaPace: 1.5,
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
                        totalSaleLots: lots,
                        saleLotAssets: makeValue(
                            mph,
                            tn,
                            100_000_000n / lots
                        ),
                        singleBuyMaxLots: 25n,
                    },
                    saleState: {
                        progressDetails: {
                            lastPurchaseAt: startTime,
                            prevPurchaseAt: startTime,
                            lotCount: lots,
                            lotsSold: 0n,
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
    //         saleLotAssets: makeValue(
    //             primaryAssetMph,
    //             primaryAssetName,
    //             primaryAssetTargetCount / mktSale.totalSaleLots
    //         ),
    //         type: "mktSale",
    //         state: "Pending",
    //         startAt: now,
    //         progressDetails: {
    //             lastPurchaseAt: now,
    //             prevPurchaseAt: now,
    //             lotCount: mktSale.totalSaleLots,
    //             lotsSold: 0n,
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
            mktSale,
            {
                txnName: `activate ${mktSale.data!.name}`,
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
        mint?: boolean,
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
        const {capo} = this;

        if (!   addedTokenMph.isEqual(capo.mph)) {
            throw new Error("can't mint tokens except via capo's mph");
        }
        const tokenCount = BigInt(addedTokenCount);
        const tcx1 = mint ? await capo.txnMintingFungibleTokens(
            tcx || this.mkTcx("mint + add to market sale") as TCX,
            newTnBytes,
            tokenCount) : undefined;

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
        const previousSaleLot =
            existingSale.details.V1.saleAssets.saleLotAssets;
        console.log("    -- previousSaleLot", dumpAny(previousSaleLot));
        const prevSalelotCountThisToken =
            previousSaleLot.assets.getPolicyTokenQuantity(
                addedTokenMph,
                newTnBytes
            );
        const prevSaleLotThisTokenValue = makeValue(
            addedTokenMph,
            newTnBytes,
            prevSalelotCountThisToken
        );
        const otherValueInPrevSaleLot = previousSaleLot.subtract(
            prevSaleLotThisTokenValue
        );
        const updatedCount = existingTokensInContract + BigInt(addedTokenCount);

        // for primary tokens, it retains the lot-size for that token when adding them to the sale
        // for non-primary tokens added, the lot-size is updated to reflect the new deposted-token-amount
        const updatedlotCount = isPrimary
            ? prevSalelotCountThisToken
            : updatedCount / existingSale.details.V1.saleAssets.totalSaleLots;

        const newSaleLotThisTokenValue = makeValue(
            addedTokenMph,
            newTnBytes,
            updatedlotCount
        );
        console.log(
            "    -- newSaleLotThisTokenValue",
            dumpAny(newSaleLotThisTokenValue)
        );
        const saleLotAssets = otherValueInPrevSaleLot.add(
            newSaleLotThisTokenValue
        );
        console.log("    -- ℹ️  token name", displayTokenName(newTnBytes));
        console.log("    -- ℹ️  updatedCount", updatedCount);
        console.log("    -- ℹ️  new saleLotAssets", dumpAny(saleLotAssets));
        console.log(
            "    -- ℹ️  totalSaleLots",
            existingSale.details.V1.saleAssets.totalSaleLots
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
        }
        this.guardUnevenLots(updatedCount, existingSale);

        const tcx2 = await this.mkTxnUpdateRecord(
            mktSale,
            {
                txnName: `${mint ? "mint and " : ""}add tokens to ${mktSale.data!.name}`,
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
                                saleLotAssets,
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
            tcx1
        );
        return this.capo.txnAddGovAuthority(tcx2);
    }

    guardUnevenLots(updatedCount: bigint, existingSale: MarketSaleData) {
        if (updatedCount %
            existingSale.details.V1.saleAssets.totalSaleLots !=
            0n) {
            throw new Error(
                "Updated (non-primary) token count not divisible by total sale lots"
            );
        }
    }

    saleTokenValue(
        itemDetails: FoundDatumUtxo<MarketSaleData>,
        lotsPurchased: number | bigint = 1
    ) {
        return itemDetails.data!.details.V1.saleAssets.saleLotAssets.multiply(
            lotsPurchased
        );
    }

    // async XXXgetlotPriceViaHelios(
    //     sale: FoundDatumUtxo<MarketSaleData>,
    //     now_: Date,
    //     lotsPurchased_: number | bigint
    // ): Promise<number> {
    //     const funcs = this.onChainFunctions();
    //     const adapter = this.mkDatumAdapter();
    //     const ocDatum = new UplcDataValue(
    //         Site.dummy(),
    //         (await adapter.toOnchainDatum(sale.datum)).data
    //     );
    //     const now = UplcInt.new(now_.getTime()); //adapter.uplcInt
    //     const lotsPurchased = UplcInt.new(lotsPurchased_); // adapter.uplcInt(lotsPurchased_);
    //
    //     //@ts-expect-error
    //     const topScope = this.scriptProgram.evalTypes(); // TopScope {#parent: GlobalScope, #values: Array(13), #allowShadowing: false, #strict: false}
    //     const delegateModuleScope = topScope.getModuleScope(
    //         //@ts-expect-error
    //         this.scriptProgram.mainImportedModules.find(
    //             (x) => x.name.value == this.specializedDelegateModule.moduleName
    //         ).name
    //     );
    //     const func = delegateModuleScope.get("getlotPrice").asFunc;
    //
    //     throw new Error(
    //         `this doesn't work because the types of the data aren't understood by func.call()`
    //     );
    //     const result1 = func.call(Site.dummy(), [], {
    //         // named args
    //         mktSale: ocDatum,
    //         now: now,
    //         lotsPurchased: lotsPurchased,
    //     });
    //
    //     return 1.42;
    // }

    async mkTxnBuyFromMarketSale<TCX extends StellarTxnContext>(
        this: MarketSaleController,
        mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>,
        {
            lotsPurchased,
            delegateActivity,
        }: {
            lotsPurchased: number | bigint;
            delegateActivity?: isActivity;
        },
        tcxIn?: TCX
    ) {
        const tokenValuePurchase = this.saleTokenValue(
            mktSale,
            lotsPurchased
        );

        const tcx = tcxIn || this.mkTcx(tcxIn, "buyFromMarketSale");
        const mktSaleData = mktSale.data!;
        const mktSaleObj = mktSale.dataWrapped!;

        const thisPurchaseAt = tcx.txnTime;
        const pCtx: PurchaseContext = {
            prevSale: mktSaleObj,
            now: thisPurchaseAt,
            lotCount: BigInt(lotsPurchased),
        };
        console.log("🏒 buying from mktSale");
        debugger;
        const lotPrice = mktSaleObj.getLotPrice(pCtx);
        console.log("    -- lot price", lotPrice);

        const nextSalePace = mktSaleObj.computeNextSalePace(pCtx);
        console.log("    -- next sale pace", nextSalePace);
        const pmtAda = realMul(Number(lotsPurchased), lotPrice);

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

        const { lotCount, lotsSold } =
            mktSale.data!.details.V1.saleState.progressDetails;

        const activity =
            delegateActivity ??
            this.activity.SpendingActivities.SellingTokens({
                id: mktSale.data!.id,
                lotsPurchased: BigInt(lotsPurchased),
                salePrice: makeValue(this.ADA(lotPrice)),
            });
        return this.mkTxnUpdateRecord(
            mktSale,
            {
                txnName: `buy: ${mktSale.data?.name}`,
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
                                    lotCount,
                                    lotsSold:
                                        lotsSold +
                                        BigInt(lotsPurchased),
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
        lotCount,
        lotsSold,
    }: MarketSaleData["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleData["details"]["V1"]["saleState"]["progressDetails"] {
        return {
            lastPurchaseAt,
            prevPurchaseAt,
            lotCount,
            lotsSold,
        };
    }

    // async mkTxnBuyAndSplit(
    //     mktSale: FoundDatumUtxo<MarketSaleData>,
    //     lotsPurchased: number | bigint,
    //     tcxIn?: StellarTxnContext
    // ) {
    //     const tcx = tcxIn || this.mkTcx(tcxIn, "buyAndSplit");
    //     const tcx2 = await this.mkTxnBuyFromMarketSale(
    //         mktSale,
    //         {
    //             lotsPurchased,
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
                    "Activity:UpdatingPendingSale allows updates to a Pending mktSale",
                    "has a state machine for sale lifecycle",
                    "Will sell its tokens when conditions are right",
                    "updates appropriate sale details as a result of each sale",
                    "participates in the Txf protocol for getting paid",
                    "participates in the Txf protocol for distributing the tokens",
                    "Splits the sale into chunks for scaling",
                ],
                deltas: {
                    "wip": ["ongoing development"],
                    "0.8.0-beta.9": [
                        "basics implemented previously to beta.9",
                    ],
                    "0.8.0-beta.10": [
                        "added UpdatingPendingSale activity",
                        "adjusted policies for expressing the token bundle/lot contents",
                        "added constraints on AddTokens activity",
                    ],
                },
            },
            "it's created with key details of a sale": {
                purpose: "Supports accurate administration of the sale process",
                details: [],
                mech: [
                    "has expected labels and other high-level details",
                    "has initial timestamps",
                    "has key details of price, sale-sizes and token to be sold",
                    "rejects creation when saleLotAssets contains any tokens other than the primary asset",
                ],
                deltas: {
                    "0.8.0-beta.9": [
                        "basics implemented previously to beta.9",
                    ],
                    "0.8.0-beta.10": [
                        "constrains the saleLotAssets to only contain the primary asset when created",
                    ],
                },
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
                deltas: {
                    "0.8.0-beta.9": [
                        "requires the payment to be deposited with the sale's UUT",
                    ],
                },

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
                deltas: {
                    "0.8.0-beta.9": [
                        "no constraints on distribution of the tokens",
                    ],
                },

            },
            "Activity:AddTokens allows additional tokens to be added to a Pending mktSale":
                {
                    purpose:
                        "Manages the addition of tokens to a pending market sale",
                    details: [
                        "Ensures that tokens can be added to a pending sale under the correct conditions",
                        "Depositing tokens enforces even distribution of the tokens across the sale's lots",
                        "saleLotAssets can get out of sync with even token distribution when tokens are NOT being added",
                        "^ e.g. by doing a partial deposit of primary token, then changing the primary asset name",
                        "^ or, by doing a partial deposit of non-primary token, then changing the lot-count/totalSaleLots",
                        "Enforcing resync of even values during deposit ensures things are ok before starting the sale",
                    ],
                    mech: [
                        "saleLotAssets only allows the primary asset tokens when first created",
                        "can AddTokens to a Pending sale",
                        "can't add non-primary tokens if the saleLotAssets aren't even",
                        "requires the gov authority to AddTokens",
                        "the number of tokens in the UTxO must be evenly divisible by the lot count when depositing those tokens",
                        "starting the sale fails if the saleLotAssets are not evenly divisible by the lot count ",
                        "starting the sale fails if the deposited Value doesn't match the totalSaleLots * saleLotAssets",
                    ],
                    requires: [
                        "Activity:AddTokens constrains stored tokens' consistency with lot-count",
                    ],
                    deltas: {
                        "0.8.0-beta.9": [
                            "implemented previously to beta.9",
                        ],
                        "0.8.0-beta.10": [
                            "forces newly-deposited tokens to achieve an even multiple of the lot count",
                            "allows the primary asset to be changed, if everything remains consistent",

                        ],
                    },
    
                },
                "Activity:AddTokens constrains stored tokens' consistency with lot-count": {
                    purpose:
                    "Provides assurances leading to an easy launch, while allowing flexilbity to change all details before launch",
                    details: [
                        "Ensures that tokens are stored in a consistent way with the lot-count",
                    ],
                    mech: [
                        "when depositing tokens, the token count in the UTxO must be an even multiple of the lot count",
                    ],
                    requires: [],
                    deltas: {
                        "0.8.0-beta.10": [
                            "first implemented in beta.10",
                        ]
                    },
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
                deltas: {
                    "0.8.0-beta.9": [
                        "implemented previously to beta.9",
                    ],
                },

            },
            "Activity:UpdatingPendingSale allows updates to a Pending mktSale":
                {
                    purpose:
                        "Manages updates to pending market sales while maintaining data integrity",
                    details: [
                        "Enforces immutability of core identity fields, state, and progress details",
                        "Validates asset and lot-count consistency when updating sale configuration",
                        "Doesn't allow tokens to be added or removed from the UTxO when editing details",
                    ],
                    mech: [
                        "requires governance authority to update the sale details",
                        "can update saleAssets, fixedSaleDetails, and name fields",
                        "prevents the sale from leaving Pending state",
                        "doesn't allow changing sale pace, progress details, or thread info",
                        "fails if primaryAssetTargetCount is not an even multiple of the lot count",
                        "fails if the token count in the UTxO is modified during the update",
                    ],
                    requires: [
                        "Updating a pending sale keeps the saleAssets consistent",
                    ],
                    deltas: {
                        "wip": ["in progress"],
                        "0.8.0-beta.10": [
                            "first implemented in beta.10",
                        ]
                    },
                },
            "Updating a pending sale keeps the saleAssets consistent": {
                purpose:
                    "Ensures saleAssets remain consistent during updates, while remaining flexible to end-user changes",
                details: [
                    "Maintains even lot sizes and prevents removal of already deposited tokens from the lot/token bundle (saleLotAssets)",
                    "Allows primary asset changes when consistency is preserved",
                ],
                mech: [
                    "can update saleAssets.totalSaleLots if primaryAssetTargetCount remains an even multiple",
                    "if previous primary tokens exist in UTxO, saleLotAssets‹primaryAsset› must keep a minimum lot-size, ≥ depositedTokens/totalSaleLots",
                    "if primaryAsset changes and old tokens exist, saleLotAssets must contain the NEW primary token",
                    "if primaryAsset changes and old tokens don't exist, saleLotAssets must not reference previous primary token",
                ],
                requires: ["Maintains consistency of saleAssets while Pending"],
                deltas: {
                    "wip": ["in progress"],
                    "0.8.0-beta.10": [
                        "first implemented in beta.10",
                    ]
                },
            },
            "Maintains consistency of saleAssets while Pending": {
                purpose:
                    "Ensures saleAssets are always consistent prior to starting the sale",
                details: [
                    "Enforces consistency rules while allowing necessary changes",
                ],
                mech: [
                    "saleLotAssets only allows the primary asset tokens when first created",
                    "saleLotAssets MUST always contain the primary asset, even if no tokens have been deposited yet",
                    "saleLotAssets‹primaryAsset› count must equal primaryAssetTargetCount / totalSaleLots",
                    "primaryAssetTargetCount must be an even multiple of the lot count ",
                ],
                requires: [
                    "Activity:AddTokens constrains stored tokens' consistency with lot-count"
                ],                
                deltas: {
                    "wip": ["in progress"],
                    "0.8.0-beta.10": [
                        "first implemented in beta.10",
                    ]
                },
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
                    "won't sell more than singleBuyMaxLots, or less than 1 unit",
                    "sells tokens when Active and in the selling period",
                    "won't sell tokens from a sale chunk less than 10 minutes old",
                ],
                requires: [],
                deltas: {
                    "0.8.0-beta.9": [
                        "implemented previously to beta.9",
                    ],
                },

            },
            "updates appropriate sale details as a result of each sale": {
                purpose: "Updates the sale details after each sale",
                details: [
                    "Ensures the sale record is updated with sale-progress details after each sale",
                    "Ensures the sale record is updated with dynamic sale details after each sale",
                ],
                mech: [
                    "updates the timestamps and units-sold",
                    "fails if it changes the settings or unit-counts",
                    "updates the saleState's sellingPace field",
                    "fails without the correct next dynamicPace",
                ],
                requires: [],
                deltas: {
                    "0.8.0-beta.9": [
                        "implemented previously to beta.9",
                    ],
                },

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
                deltas: {
                    "0.8.0-beta.9": [
                        "implemented previously to beta.9",
                    ],
                },

            },
        });
    }

    mkDataWrapper(data: ErgoMarketSaleData): MarketSaleDataWrapper {
        return new MarketSaleDataWrapper(data, this, this.capo as any);
    }
}
