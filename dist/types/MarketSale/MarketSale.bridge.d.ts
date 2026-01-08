import { type Cast } from "@helios-lang/contract-utils";
import type { UplcData } from "@helios-lang/uplc";
import type { IntLike } from "@helios-lang/codec-utils";
import type { Address, AssetClass, MintingPolicyHash, PubKeyHash, TxInput, TxOutput, TxOutputId, ValidatorHash, Value } from "@helios-lang/ledger";
import { type InlineTxOutputDatum } from "@helios-lang/ledger";
import type { EnumTypeSchema, StructTypeSchema } from "@helios-lang/type-utils";
import { ContractDataBridge, DataBridge, DataBridgeReaderClass, EnumBridge, type tagOnly, type hasSeed, type isActivity, type JustAnEnum } from "@donecollectively/stellar-contracts";
/**
 * @public
 */
export type TimeLike = IntLike;
import type { AnyData, AnyDataLike, DelegateDatum$Ergo$Cip68RefToken, DelegateDatum$Cip68RefTokenLike, DelegationDetail, ErgoDelegationDetail, DelegationDetailLike, SaleProgressDetailsV1, SaleProgressDetailsV1Like, MarketSaleState, ErgoMarketSaleState, MarketSaleStateLike, OtherSaleStateV1, OtherSaleStateV1Like, DynamicSaleV1Settings, DynamicSaleV1SettingsLike, RelativeDelegateLink, RelativeDelegateLinkLike, VxfExpectedActivity$SpecificRedeemerIdLike, VxfExpectedActivity$TaggedRedeemerLike, VxfExpectedActivity, ErgoVxfExpectedActivity, VxfDestination$RelativeLinkLike, VxfDestination$AnyTokenHolderLike, VxfDestination, ErgoVxfDestination, VxfDestinationLike, FixedSaleDetailsV1, FixedSaleDetailsV1Like, SaleAssetsV1, SaleAssetsV1Like, ThreadInfoV1, ThreadInfoV1Like, MktSaleDetails$V1, MktSaleDetails$V1Like, ErgoMktSaleDetails, MktSaleDetailsLike, MarketSaleData, MarketSaleDataLike, DelegateDatum$Ergo$capoStoredData, DelegateDatum$capoStoredDataLike, DelegateDatum, ErgoDelegateDatum, CapoLifecycleActivity$CreatingDelegateLike, DelegateRole, ErgoDelegateRole, DelegateRoleLike, CapoLifecycleActivity$forcingNewSpendDelegateLike, CapoLifecycleActivity$forcingNewMintDelegateLike, ManifestActivity$updatingEntryLike, ManifestActivity$addingEntryLike, ManifestActivity$forkingThreadTokenLike, ManifestActivity$burningThreadTokenLike, ManifestActivity, ErgoManifestActivity, ManifestActivityLike, CapoLifecycleActivity, ErgoCapoLifecycleActivity, CapoLifecycleActivityLike, DelegateLifecycleActivity$ReplacingMeLike, DelegateLifecycleActivity, ErgoDelegateLifecycleActivity, DelegateLifecycleActivityLike, SpendingActivity$AddingToSaleLike, SpendingActivity$SellingTokensLike, SpendingActivity$MergingChildChunkLike, SpendingActivity, ErgoSpendingActivity, SpendingActivityLike, MintingActivity$SplittingSaleChunkAndBuyingLike, MintingActivity, ErgoMintingActivity, MintingActivityLike, BurningActivity$JoiningWithParentChunkLike, BurningActivity, ErgoBurningActivity, BurningActivityLike, DelegateActivity$CreatingDelegatedDataLike, DelegateActivity$UpdatingDelegatedDataLike, DelegateActivity$DeletingDelegatedDataLike, DelegateActivity, ErgoDelegateActivity, PendingDelegateAction$AddLike, PendingDelegateAction$ReplaceLike, PendingDelegateAction, ErgoPendingDelegateAction, PendingDelegateActionLike, PendingDelegateChange, PendingDelegateChangeLike, ManifestEntryType$DgDataPolicyLike, ManifestEntryType$DelegateThreadsLike, ManifestEntryType, ErgoManifestEntryType, ManifestEntryTypeLike, CapoManifestEntry, CapoManifestEntryLike, PendingCharterChange$otherManifestChangeLike, PendingCharterChange, ErgoPendingCharterChange, CapoDatum$CharterDataLike, cctx_CharterInputType$RefInputLike, cctx_CharterInputType$InputLike, cctx_CharterInputType, Ergocctx_CharterInputType, cctx_CharterInputTypeLike, CapoCtx, CapoCtxLike, dgd_DataSrc$BothLike, dgd_DataSrc, Ergodgd_DataSrc, dgd_DataSrcLike, AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike, AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike, AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike, AbstractDelegateActivitiesEnum, ErgoAbstractDelegateActivitiesEnum, AbstractDelegateActivitiesEnumLike, DgDataDetails, DgDataDetailsLike, DTS_PurchaseInfo, DTS_PurchaseInfoLike, DynamicSaleV1, DynamicSaleV1Like } from "./MarketSale.typeInfo.js";
export type * as types from "./MarketSale.typeInfo.js";
/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***MarketSaleBundle***)
 * main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**
 * @remarks
* This class doesn't need to be used directly.  Its methods are available through the ***contract's methods***:
*  - `get mkDatum` - returns the datum-building bridge for the contract's datum type
*  - `get activity` - returns an activity-building bridge for the contract's activity type
*  - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types
*  - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script
* The advanced methods are not typically needed - mkDatum and activity should normally provide all the
* type-safe data-encoding needed for the contract.  For reading on-chain data, the Capo's `findDelegatedDataUtxos()`
* method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.
*
* ##### customizing the bridge class name
* Note that you may override `get bridgeClassName() { return "..." }` to customize the name of this bridge class
* @public
 */
export declare class MarketSalePolicyDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper;
    readDatum: (d: UplcData) => ErgoDelegateDatum;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper;
    DelegateActivity: DelegateActivityHelper;
    reader: MarketSalePolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***MarketSaleState*** for the `BasicDelegate` script
         */
        MarketSaleState: MarketSaleStateHelper;
        /**
         * generates UplcData for the enum type ***VxfExpectedActivity*** for the `BasicDelegate` script
         */
        VxfExpectedActivity: VxfExpectedActivityHelper;
        /**
         * generates UplcData for the enum type ***VxfDestination*** for the `BasicDelegate` script
         */
        VxfDestination: VxfDestinationHelper;
        /**
         * generates UplcData for the enum type ***MktSaleDetails*** for the `BasicDelegate` script
         */
        MktSaleDetails: MktSaleDetailsHelper;
        /**
         * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
         */
        DelegateDatum: DelegateDatumHelper;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper;
        /**
         * generates UplcData for the enum type ***dgd_DataSrc*** for the `BasicDelegate` script
         */
        dgd_DataSrc: dgd_DataSrcHelper;
        /**
         * generates UplcData for the enum type ***AbstractDelegateActivitiesEnum*** for the `BasicDelegate` script
         */
        AbstractDelegateActivitiesEnum: AbstractDelegateActivitiesEnumHelper;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***SaleProgressDetailsV1*** for the `BasicDelegate` script
         */
        SaleProgressDetailsV1: (fields: SaleProgressDetailsV1Like | {
            lastPurchaseAt: TimeLike;
            prevPurchaseAt: TimeLike;
            lotCount: IntLike;
            lotsSold: IntLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***OtherSaleStateV1*** for the `BasicDelegate` script
         */
        OtherSaleStateV1: (fields: OtherSaleStateV1Like | {
            progressDetails: SaleProgressDetailsV1Like;
            salePace: number;
            state: MarketSaleStateLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DynamicSaleV1Settings*** for the `BasicDelegate` script
         */
        DynamicSaleV1Settings: (fields: DynamicSaleV1SettingsLike | {
            targetPrice: number;
            targetedSellingTime: IntLike;
            minPrice: number;
            maxPrice: number;
            progressPricingDiscountFloorPoint: number;
            progressPricingDiscountWhenSlow: number;
            progressPricingExpansionWhenFast: number;
            dynaPaceFasterSaleWeight: number;
            dynaPaceIdleDecayRate: number;
            pricingWeightDynaPace: number;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***FixedSaleDetailsV1*** for the `BasicDelegate` script
         */
        FixedSaleDetailsV1: (fields: FixedSaleDetailsV1Like | {
            settings: DynamicSaleV1SettingsLike;
            startAt: TimeLike;
            vxfTokensTo: /*minStructField*/ VxfDestinationLike | undefined;
            vxfFundsTo: /*minStructField*/ VxfDestinationLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***SaleAssetsV1*** for the `BasicDelegate` script
         */
        SaleAssetsV1: (fields: SaleAssetsV1Like | {
            saleLotAssets: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            singleBuyMaxLots: IntLike;
            primaryAssetMph: /*minStructField*/ MintingPolicyHash | string | number[];
            primaryAssetName: number[];
            primaryAssetTargetCount: IntLike;
            totalSaleLots: IntLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***ThreadInfoV1*** for the `BasicDelegate` script
         */
        ThreadInfoV1: (fields: ThreadInfoV1Like | {
            nestedThreads: IntLike;
            retiredThreads: IntLike;
            parentChunkId: number[];
            chunkForkedAt: TimeLike;
            saleId: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***MarketSaleData*** for the `BasicDelegate` script
         */
        MarketSaleData: (fields: MarketSaleDataLike | {
            id: number[];
            type: string;
            name: string;
            details: MktSaleDetailsLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike | {
            action: PendingDelegateActionLike;
            role: DelegateRoleLike;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike | {
            entryType: ManifestEntryTypeLike;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DgDataDetails*** for the `BasicDelegate` script
         */
        DgDataDetails: (fields: DgDataDetailsLike | {
            dataSrc: dgd_DataSrcLike;
            id: number[];
            type: string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DTS_PurchaseInfo*** for the `BasicDelegate` script
         */
        DTS_PurchaseInfo: (fields: DTS_PurchaseInfoLike | {
            inferredPace: number;
            hoursSinceLastPurchase: number;
            lotsPurchased: IntLike;
            purchaseTime: TimeLike;
            prevSalePace: number;
            totalProgress: SaleProgressDetailsV1Like;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DynamicSaleV1*** for the `BasicDelegate` script
         */
        DynamicSaleV1: (fields: DynamicSaleV1Like | {
            settings: DynamicSaleV1SettingsLike;
            purchase: DTS_PurchaseInfoLike;
            sale: MarketSaleDataLike;
            updatedSale: /*minStructField*/ MarketSaleDataLike | undefined;
        }) => UplcData;
    };
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData, AnyDataLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail, DelegationDetailLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺSaleProgressDetailsV1Cast: Cast<SaleProgressDetailsV1, SaleProgressDetailsV1Like>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺOtherSaleStateV1Cast: Cast<OtherSaleStateV1, OtherSaleStateV1Like>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDynamicSaleV1SettingsCast: Cast<DynamicSaleV1Settings, DynamicSaleV1SettingsLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink, RelativeDelegateLinkLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺFixedSaleDetailsV1Cast: Cast<FixedSaleDetailsV1, FixedSaleDetailsV1Like>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺSaleAssetsV1Cast: Cast<SaleAssetsV1, SaleAssetsV1Like>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺThreadInfoV1Cast: Cast<ThreadInfoV1, ThreadInfoV1Like>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺMarketSaleDataCast: Cast<MarketSaleData, MarketSaleDataLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange, PendingDelegateChangeLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry, CapoManifestEntryLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx, CapoCtxLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDgDataDetailsCast: Cast<DgDataDetails, DgDataDetailsLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDTS_PurchaseInfoCast: Cast<DTS_PurchaseInfo, DTS_PurchaseInfoLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDynamicSaleV1Cast: Cast<DynamicSaleV1, DynamicSaleV1Like>;
}
export default MarketSalePolicyDataBridge;
/**
 * @public
 */
export declare class MarketSalePolicyDataBridgeReader extends DataBridgeReaderClass {
    bridge: MarketSalePolicyDataBridge;
    constructor(bridge: MarketSalePolicyDataBridge, isMainnet: boolean);
    /**
        * reads UplcData *known to fit the **MarketSaleState*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    MarketSaleState(d: UplcData): ErgoMarketSaleState;
    /**
        * reads UplcData *known to fit the **VxfExpectedActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    VxfExpectedActivity(d: UplcData): ErgoVxfExpectedActivity;
    /**
        * reads UplcData *known to fit the **VxfDestination*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    VxfDestination(d: UplcData): ErgoVxfDestination;
    /**
        * reads UplcData *known to fit the **MktSaleDetails*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    MktSaleDetails(d: UplcData): ErgoMktSaleDetails;
    datum: (d: UplcData) => Partial<{
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken;
        IsDelegation: ErgoDelegationDetail;
        capoStoredData: DelegateDatum$Ergo$capoStoredData;
    }>;
    /**
        * reads UplcData *known to fit the **DelegateDatum*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DelegateDatum(d: UplcData): ErgoDelegateDatum;
    /**
        * reads UplcData *known to fit the **DelegateRole*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DelegateRole(d: UplcData): ErgoDelegateRole;
    /**
        * reads UplcData *known to fit the **ManifestActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    ManifestActivity(d: UplcData): ErgoManifestActivity;
    /**
        * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity;
    /**
        * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity;
    /**
        * reads UplcData *known to fit the **SpendingActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    SpendingActivity(d: UplcData): ErgoSpendingActivity;
    /**
        * reads UplcData *known to fit the **MintingActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    MintingActivity(d: UplcData): ErgoMintingActivity;
    /**
        * reads UplcData *known to fit the **BurningActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    BurningActivity(d: UplcData): ErgoBurningActivity;
    /**
        * reads UplcData *known to fit the **DelegateActivity*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DelegateActivity(d: UplcData): ErgoDelegateActivity;
    /**
        * reads UplcData *known to fit the **PendingDelegateAction*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction;
    /**
        * reads UplcData *known to fit the **ManifestEntryType*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    ManifestEntryType(d: UplcData): ErgoManifestEntryType;
    /**
        * reads UplcData *known to fit the **PendingCharterChange*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange;
    /**
        * reads UplcData *known to fit the **cctx_CharterInputType*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType;
    /**
        * reads UplcData *known to fit the **dgd_DataSrc*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    dgd_DataSrc(d: UplcData): Ergodgd_DataSrc;
    /**
        * reads UplcData *known to fit the **AbstractDelegateActivitiesEnum*** enum type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the enum type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    AbstractDelegateActivitiesEnum(d: UplcData): ErgoAbstractDelegateActivitiesEnum;
    /**
        * reads UplcData *known to fit the **AnyData*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    AnyData(d: UplcData): AnyData;
    /**
        * reads UplcData *known to fit the **DelegationDetail*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DelegationDetail(d: UplcData): DelegationDetail;
    /**
        * reads UplcData *known to fit the **SaleProgressDetailsV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    SaleProgressDetailsV1(d: UplcData): SaleProgressDetailsV1;
    /**
        * reads UplcData *known to fit the **OtherSaleStateV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    OtherSaleStateV1(d: UplcData): OtherSaleStateV1;
    /**
        * reads UplcData *known to fit the **DynamicSaleV1Settings*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DynamicSaleV1Settings(d: UplcData): DynamicSaleV1Settings;
    /**
        * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink;
    /**
        * reads UplcData *known to fit the **FixedSaleDetailsV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    FixedSaleDetailsV1(d: UplcData): FixedSaleDetailsV1;
    /**
        * reads UplcData *known to fit the **SaleAssetsV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    SaleAssetsV1(d: UplcData): SaleAssetsV1;
    /**
        * reads UplcData *known to fit the **ThreadInfoV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    ThreadInfoV1(d: UplcData): ThreadInfoV1;
    /**
        * reads UplcData *known to fit the **MarketSaleData*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    MarketSaleData(d: UplcData): MarketSaleData;
    /**
        * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    PendingDelegateChange(d: UplcData): PendingDelegateChange;
    /**
        * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    CapoManifestEntry(d: UplcData): CapoManifestEntry;
    /**
        * reads UplcData *known to fit the **CapoCtx*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    CapoCtx(d: UplcData): CapoCtx;
    /**
        * reads UplcData *known to fit the **DgDataDetails*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DgDataDetails(d: UplcData): DgDataDetails;
    /**
        * reads UplcData *known to fit the **DTS_PurchaseInfo*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DTS_PurchaseInfo(d: UplcData): DTS_PurchaseInfo;
    /**
        * reads UplcData *known to fit the **DynamicSaleV1*** struct type,
        * for the BasicDelegate script.
        * #### Standard WARNING
        *
        * This is a low-level data-reader for use in ***advanced development scenarios***.
        *
        * Used correctly with data that matches the type, this reader
        * returns strongly-typed data - your code using these types will be safe.
        *
        * On the other hand, reading non-matching data will not give you a valid result.
        * It may throw an error, or it may throw no error, but return a value that
        * causes some error later on in your code, when you try to use it.
        */
    DynamicSaleV1(d: UplcData): DynamicSaleV1;
}
/**
 * Helper class for generating UplcData for the struct ***AnyData*** type.
 * @public
 */
export declare class AnyDataHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<AnyData, AnyDataLike>;
}
/**
 * Helper class for generating UplcData for the struct ***DelegationDetail*** type.
 * @public
 */
export declare class DelegationDetailHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegationDetail, DelegationDetailLike>;
}
/**
 * Helper class for generating UplcData for the struct ***SaleProgressDetailsV1*** type.
 * @public
 */
export declare class SaleProgressDetailsV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SaleProgressDetailsV1, SaleProgressDetailsV1Like>;
}
/**
 * Helper class for generating UplcData for variants of the ***MarketSaleState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class MarketSaleStateHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MarketSaleState, Partial<{
        Pending: tagOnly;
        Active: tagOnly;
        Retired: tagOnly;
        SoldOut: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Pending"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Pending(): UplcData;
    /**
     * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Active"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Active(): UplcData;
    /**
     * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Retired"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get Retired(): UplcData;
    /**
     * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.SoldOut"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SoldOut(): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***OtherSaleStateV1*** type.
 * @public
 */
export declare class OtherSaleStateV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<OtherSaleStateV1, OtherSaleStateV1Like>;
}
/**
 * Helper class for generating UplcData for the struct ***DynamicSaleV1Settings*** type.
 * @public
 */
export declare class DynamicSaleV1SettingsHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DynamicSaleV1Settings, DynamicSaleV1SettingsLike>;
}
/**
 * Helper class for generating UplcData for the struct ***RelativeDelegateLink*** type.
 * @public
 */
export declare class RelativeDelegateLinkHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<RelativeDelegateLink, RelativeDelegateLinkLike>;
}
/**
 * Helper class for generating UplcData for variants of the ***VxfExpectedActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class VxfExpectedActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VxfExpectedActivity, Partial<{
        VxfTransfer: UplcData | undefined;
        VxfStorage: UplcData | undefined;
        SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike;
        TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike;
    }>>;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.VxfTransfer"***
     */
    VxfTransfer(appData: UplcData | undefined): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.VxfStorage"***
     */
    VxfStorage(appData: UplcData | undefined): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.SpecificRedeemerId"***
     * @remarks - ***VxfExpectedActivity$SpecificRedeemerIdLike*** is the same as the expanded field-types.
     */
    SpecificRedeemerId(fields: VxfExpectedActivity$SpecificRedeemerIdLike | {
        id: IntLike;
        inNestedList: boolean;
        nestedListRedeemerId: IntLike | undefined;
        appData: UplcData | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.TaggedRedeemer"***
     * @remarks - ***VxfExpectedActivity$TaggedRedeemerLike*** is the same as the expanded field-types.
     */
    TaggedRedeemer(fields: VxfExpectedActivity$TaggedRedeemerLike | {
        firstFieldConstrTag: IntLike;
        inNestedList: boolean;
        appData: UplcData | undefined;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***VxfDestination*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class VxfDestinationHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VxfDestination, Partial<{
        RelativeLink: VxfDestination$RelativeLinkLike;
        AnyTokenHolder: VxfDestination$AnyTokenHolderLike;
        PubKey: PubKeyHash | string | number[];
        Anywhere: tagOnly;
        NotYetDefined: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfDestination.RelativeLink"***
     * @remarks - ***VxfDestination$RelativeLinkLike*** is the same as the expanded field-types.
     */
    RelativeLink(fields: VxfDestination$RelativeLinkLike | {
        link: RelativeDelegateLinkLike;
        vxfActivity: {
            VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
        } | {
            VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
        } | {
            SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike;
        } | {
            TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike;
        } | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfDestination.AnyTokenHolder"***
     * @remarks - ***VxfDestination$AnyTokenHolderLike*** is the same as the expanded field-types.
     */
    AnyTokenHolder(fields: VxfDestination$AnyTokenHolderLike | {
        mph: MintingPolicyHash | string | number[];
        assetName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfDestination.PubKey"***
     */
    PubKey(pkh: PubKeyHash | string | number[]): UplcData;
    /**
     * (property getter): UplcData for ***"VxfProtocol::VxfDestination.Anywhere"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#98***
     */
    get Anywhere(): UplcData;
    /**
     * (property getter): UplcData for ***"VxfProtocol::VxfDestination.NotYetDefined"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#99***
     */
    get NotYetDefined(): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***FixedSaleDetailsV1*** type.
 * @public
 */
export declare class FixedSaleDetailsV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<FixedSaleDetailsV1, FixedSaleDetailsV1Like>;
}
/**
 * Helper class for generating UplcData for the struct ***SaleAssetsV1*** type.
 * @public
 */
export declare class SaleAssetsV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SaleAssetsV1, SaleAssetsV1Like>;
}
/**
 * Helper class for generating UplcData for the struct ***ThreadInfoV1*** type.
 * @public
 */
export declare class ThreadInfoV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ThreadInfoV1, ThreadInfoV1Like>;
}
/**
 * Helper class for generating UplcData for variants of the ***MktSaleDetails*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class MktSaleDetailsHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        V1: MktSaleDetails$V1;
    }, {
        V1: MktSaleDetails$V1Like;
    }>;
    /**
     * generates  UplcData for ***"MarketSaleData::MktSaleDetails.V1"***
     * @remarks - ***MktSaleDetails$V1Like*** is the same as the expanded field-types.
     */
    V1(fields: MktSaleDetails$V1Like | {
        saleState: OtherSaleStateV1Like;
        fixedSaleDetails: FixedSaleDetailsV1Like;
        saleAssets: SaleAssetsV1Like;
        threadInfo: ThreadInfoV1Like;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***MarketSaleData*** type.
 * @public
 */
export declare class MarketSaleDataHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MarketSaleData, MarketSaleDataLike>;
}
/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class DelegateDatumHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike;
        IsDelegation: DelegationDetailLike;
        capoStoredData: DelegateDatum$capoStoredDataLike;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike | {
        cip68meta: AnyDataLike;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike | {
        data: MarketSaleDataLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}
/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class DelegateRoleHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     */
    OtherNamedDgt(name: string): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class ManifestActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike;
        addingEntry: ManifestActivity$addingEntryLike;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike;
        burningThreadToken: ManifestActivity$burningThreadTokenLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class CapoLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike;
        updatingManifest: ManifestActivityLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => UplcData>;
}
/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class DelegateLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class SpendingActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity, Partial<{
        UpdatingRecord: number[];
        AddingToSale: SpendingActivity$AddingToSaleLike;
        UpdatingPendingSale: number[];
        Activating: number[];
        SellingTokens: SpendingActivity$SellingTokensLike;
        MergingChildChunk: SpendingActivity$MergingChildChunkLike;
        Retiring: number[];
    }>>;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingRecord"***
     */
    UpdatingRecord(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.AddingToSale"***
     * @remarks - ***SpendingActivity$AddingToSaleLike*** is the same as the expanded field-types.
     */
    AddingToSale(fields: SpendingActivity$AddingToSaleLike | {
        id: number[];
        mph: MintingPolicyHash | string | number[];
        tn: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingPendingSale"***
     */
    UpdatingPendingSale(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.Activating"***
     */
    Activating(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.SellingTokens"***
     * @remarks - ***SpendingActivity$SellingTokensLike*** is the same as the expanded field-types.
     */
    SellingTokens(fields: SpendingActivity$SellingTokensLike | {
        id: number[];
        lotsPurchased: IntLike;
        salePrice: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.MergingChildChunk"***
     * @remarks - ***SpendingActivity$MergingChildChunkLike*** is the same as the expanded field-types.
     */
    MergingChildChunk(fields: SpendingActivity$MergingChildChunkLike | {
        id: number[];
        childChunkId: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.Retiring"***
     */
    Retiring(id: number[]): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class MintingActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MintingActivity, Partial<{
        CreatingRecord: TxOutputId | string;
        SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuyingLike;
    }>>;
    /**
    * generates  UplcData for ***"MarketSalePolicy::MintingActivity.CreatingRecord"***,
    * given a transaction-context (or direct arg) with a ***seed utxo***
    * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
    *  - to get a transaction context having the seed needed for this argument,
    *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
    * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
    *  - in a context providing an implicit seed utxo, use
    *    the `$seeded$CreatingRecord}` variant of this activity instead
    *
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.CreatingRecord"***
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     */
    get $seeded$CreatingRecord(): import("@donecollectively/stellar-contracts").SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$SplittingSaleChunkAndBuying}` for use in a context
     * providing an implicit seed utxo.
     */
    SplittingSaleChunkAndBuying(value: hasSeed, fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***
     * with raw seed details included in fields.
     */
    SplittingSaleChunkAndBuying(fields: MintingActivity$SplittingSaleChunkAndBuyingLike | {
        seed: TxOutputId | string;
        parentChunkId: string;
        lotsPurchased: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * @param fields - \{ parentChunkId: string, lotsPurchased: IntLike \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$SplittingSaleChunkAndBuying({ parentChunkId, lotsPurchased })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$SplittingSaleChunkAndBuying: (fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }) => UplcData>;
}
/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class BurningActivityHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<BurningActivity, Partial<{
        DeletingRecord: number[];
        JoiningWithParentChunk: BurningActivity$JoiningWithParentChunkLike;
        CleanupRetired: string;
    }>>;
    /**
     * generates  UplcData for ***"MarketSalePolicy::BurningActivity.DeletingRecord"***
     */
    DeletingRecord(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::BurningActivity.JoiningWithParentChunk"***
     * @remarks - ***BurningActivity$JoiningWithParentChunkLike*** is the same as the expanded field-types.
     */
    JoiningWithParentChunk(fields: BurningActivity$JoiningWithParentChunkLike | {
        id: string;
        parentChunkId: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::BurningActivity.CleanupRetired"***
     */
    CleanupRetired(id: string): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class ActivityDelegateRoleHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    OtherNamedDgt(name: string): isActivity;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): {
        redeemer: UplcData;
    };
}
/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class ManifestActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike;
        addingEntry: ManifestActivity$addingEntryLike;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike;
        burningThreadToken: ManifestActivity$burningThreadTokenLike;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    retiringEntry(key: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike | {
        key: string;
        newThreadCount: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}
/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class CapoLifecycleActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike;
        updatingManifest: ManifestActivityLike;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): {
        redeemer: UplcData;
    };
    /**
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): ActivityDelegateRoleHelperNested;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested;
}
/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class DelegateLifecycleActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): {
        redeemer: UplcData;
    };
}
/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class SpendingActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity, Partial<{
        UpdatingRecord: number[];
        AddingToSale: SpendingActivity$AddingToSaleLike;
        UpdatingPendingSale: number[];
        Activating: number[];
        SellingTokens: SpendingActivity$SellingTokensLike;
        MergingChildChunk: SpendingActivity$MergingChildChunkLike;
        Retiring: number[];
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingRecord"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    UpdatingRecord(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.AddingToSale"***
     * @remarks - ***SpendingActivity$AddingToSaleLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    AddingToSale(fields: SpendingActivity$AddingToSaleLike | {
        id: number[];
        mph: MintingPolicyHash | string | number[];
        tn: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingPendingSale"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    UpdatingPendingSale(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.Activating"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Activating(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.SellingTokens"***
     * @remarks - ***SpendingActivity$SellingTokensLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    SellingTokens(fields: SpendingActivity$SellingTokensLike | {
        id: number[];
        lotsPurchased: IntLike;
        salePrice: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.MergingChildChunk"***
     * @remarks - ***SpendingActivity$MergingChildChunkLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    MergingChildChunk(fields: SpendingActivity$MergingChildChunkLike | {
        id: number[];
        childChunkId: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.Retiring"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Retiring(id: number[]): isActivity;
}
/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class MintingActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MintingActivity, Partial<{
        CreatingRecord: TxOutputId | string;
        SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuyingLike;
    }>>;
    /**
    * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.CreatingRecord"***,
    * given a transaction-context (or direct arg) with a ***seed utxo***
    * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
    *  - to get a transaction context having the seed needed for this argument,
    *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
    * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
    *  - in a context providing an implicit seed utxo, use
    *    the `$seeded$CreatingRecord}` variant of this activity instead
    *
     * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
    */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.CreatingRecord"***
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    get $seeded$CreatingRecord(): import("@donecollectively/stellar-contracts").SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$SplittingSaleChunkAndBuying}` for use in a context
     * providing an implicit seed utxo.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    SplittingSaleChunkAndBuying(value: hasSeed, fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***
     * with raw seed details included in fields.
     */
    SplittingSaleChunkAndBuying(fields: MintingActivity$SplittingSaleChunkAndBuyingLike | {
        seed: TxOutputId | string;
        parentChunkId: string;
        lotsPurchased: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * @param fields - \{ parentChunkId: string, lotsPurchased: IntLike \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$SplittingSaleChunkAndBuying({ parentChunkId, lotsPurchased })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    $seeded$SplittingSaleChunkAndBuying: (fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        parentChunkId: string;
        lotsPurchased: IntLike;
    }) => isActivity>;
}
/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class BurningActivityHelperNested extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<BurningActivity, Partial<{
        DeletingRecord: number[];
        JoiningWithParentChunk: BurningActivity$JoiningWithParentChunkLike;
        CleanupRetired: string;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.DeletingRecord"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    DeletingRecord(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.JoiningWithParentChunk"***
     * @remarks - ***BurningActivity$JoiningWithParentChunkLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    JoiningWithParentChunk(fields: BurningActivity$JoiningWithParentChunkLike | {
        id: string;
        parentChunkId: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.CleanupRetired"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    CleanupRetired(id: string): isActivity;
}
/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class DelegateActivityHelper extends EnumBridge<isActivity> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike;
        SpendingActivities: SpendingActivityLike;
        MintingActivities: MintingActivityLike;
        BurningActivities: BurningActivityLike;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.OtherActivities"***
     */
    OtherActivities(activity: UplcData): isActivity;
}
/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class PendingDelegateActionHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction, Partial<{
        Add: PendingDelegateAction$AddLike;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Add}` for use in a context
     * providing an implicit seed utxo.
     */
    Add(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***
     * with raw seed details included in fields.
     */
    Add(fields: PendingDelegateAction$AddLike | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * @param fields - \{ purpose: string, idPrefix: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Add({ purpose, idPrefix })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Add: (fields: {
        purpose: string;
        idPrefix: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Remove(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Replace}` for use in a context
     * providing an implicit seed utxo.
     */
    Replace(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***
     * with raw seed details included in fields.
     */
    Replace(fields: PendingDelegateAction$ReplaceLike | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * @param fields - \{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\} \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Replace: (fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => UplcData>;
}
/**
 * Helper class for generating UplcData for the struct ***PendingDelegateChange*** type.
 * @public
 */
export declare class PendingDelegateChangeHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateChange, PendingDelegateChangeLike>;
}
/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class ManifestEntryTypeHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike;
        MerkleMembership: tagOnly;
        MerkleStateRoot: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get NamedTokenRef(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
     * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
     */
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike | {
        policyLink: RelativeDelegateLinkLike;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike | {
        role: DelegateRoleLike;
        refCount: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get MerkleMembership(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
     */
    get MerkleStateRoot(): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***CapoManifestEntry*** type.
 * @public
 */
export declare class CapoManifestEntryHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoManifestEntry, CapoManifestEntryLike>;
}
/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class PendingCharterChangeHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange, Partial<{
        delegateChange: PendingDelegateChangeLike;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike | {
        action: PendingDelegateActionLike;
        role: DelegateRoleLike;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike | {
        activity: ManifestActivityLike;
        remainingDelegateValidations: Array<DelegateRoleLike>;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class cctx_CharterInputTypeHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike;
        Input: cctx_CharterInputType$InputLike;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
     * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
     */
    RefInput(fields: cctx_CharterInputType$RefInputLike | {
        datum: CapoDatum$CharterDataLike;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike | {
        datum: CapoDatum$CharterDataLike;
        utxo: TxInput;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***CapoCtx*** type.
 * @public
 */
export declare class CapoCtxHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoCtx, CapoCtxLike>;
}
/**
 * Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class dgd_DataSrcHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<dgd_DataSrc, Partial<{
        Unk: tagOnly;
        Input: TxInput;
        Output: TxOutput;
        Both: dgd_DataSrc$BothLike;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::dgd_DataSrc.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Input"***
     */
    Input(utxo: TxInput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Output"***
     */
    Output(txo: TxOutput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Both"***
     * @remarks - ***dgd_DataSrc$BothLike*** is the same as the expanded field-types.
     */
    Both(fields: dgd_DataSrc$BothLike | {
        utxo: TxInput;
        txo: TxOutput;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***AbstractDelegateActivitiesEnum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class AbstractDelegateActivitiesEnumHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<AbstractDelegateActivitiesEnum, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike;
        SpendingActivities: UplcData;
        MintingActivities: UplcData;
        BurningActivities: UplcData;
        CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike;
        UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike;
        DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.SpendingActivities"***
     */
    SpendingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MintingActivities"***
     */
    MintingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.BurningActivities"***
     */
    BurningActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike | {
        seed: TxOutputId | string;
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
    * ##### Seeded activity
    * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
      *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => import("@donecollectively/stellar-contracts").SeedActivity<(value: hasSeed, fields: {
        dataType: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.UpdatingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.DeletingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.OtherActivities"***
     */
    OtherActivities(activity: UplcData): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***DgDataDetails*** type.
 * @public
 */
export declare class DgDataDetailsHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DgDataDetails, DgDataDetailsLike>;
}
/**
 * Helper class for generating UplcData for the struct ***DTS_PurchaseInfo*** type.
 * @public
 */
export declare class DTS_PurchaseInfoHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DTS_PurchaseInfo, DTS_PurchaseInfoLike>;
}
/**
 * Helper class for generating UplcData for the struct ***DynamicSaleV1*** type.
 * @public
 */
export declare class DynamicSaleV1Helper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DynamicSaleV1, DynamicSaleV1Like>;
}
export declare const AnyDataSchema: StructTypeSchema;
export declare const DelegationDetailSchema: StructTypeSchema;
export declare const SaleProgressDetailsV1Schema: StructTypeSchema;
export declare const MarketSaleStateSchema: EnumTypeSchema;
export declare const OtherSaleStateV1Schema: StructTypeSchema;
export declare const DynamicSaleV1SettingsSchema: StructTypeSchema;
export declare const RelativeDelegateLinkSchema: StructTypeSchema;
export declare const VxfExpectedActivitySchema: EnumTypeSchema;
export declare const VxfDestinationSchema: EnumTypeSchema;
export declare const FixedSaleDetailsV1Schema: StructTypeSchema;
export declare const SaleAssetsV1Schema: StructTypeSchema;
export declare const ThreadInfoV1Schema: StructTypeSchema;
export declare const MktSaleDetailsSchema: EnumTypeSchema;
export declare const MarketSaleDataSchema: StructTypeSchema;
export declare const DelegateDatumSchema: EnumTypeSchema;
export declare const DelegateRoleSchema: EnumTypeSchema;
export declare const ManifestActivitySchema: EnumTypeSchema;
export declare const CapoLifecycleActivitySchema: EnumTypeSchema;
export declare const DelegateLifecycleActivitySchema: EnumTypeSchema;
export declare const SpendingActivitySchema: EnumTypeSchema;
export declare const MintingActivitySchema: EnumTypeSchema;
export declare const BurningActivitySchema: EnumTypeSchema;
export declare const DelegateActivitySchema: EnumTypeSchema;
export declare const PendingDelegateActionSchema: EnumTypeSchema;
export declare const PendingDelegateChangeSchema: StructTypeSchema;
export declare const ManifestEntryTypeSchema: EnumTypeSchema;
export declare const CapoManifestEntrySchema: StructTypeSchema;
export declare const PendingCharterChangeSchema: EnumTypeSchema;
export declare const cctx_CharterInputTypeSchema: EnumTypeSchema;
export declare const CapoCtxSchema: StructTypeSchema;
export declare const dgd_DataSrcSchema: EnumTypeSchema;
export declare const AbstractDelegateActivitiesEnumSchema: EnumTypeSchema;
export declare const DgDataDetailsSchema: StructTypeSchema;
export declare const DTS_PurchaseInfoSchema: StructTypeSchema;
export declare const DynamicSaleV1Schema: StructTypeSchema;
//# sourceMappingURL=MarketSale.bridge.d.ts.map