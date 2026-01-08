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
import type { AnyData, ErgoAnyData, AnyDataLike, DelegateDatum$Ergo$Cip68RefToken, DelegateDatum$Cip68RefTokenLike, DelegationDetail, ErgoDelegationDetail, DelegationDetailLike, RelativeDelegateLink, ErgoRelativeDelegateLink, RelativeDelegateLinkLike, VxfExpectedActivity$SpecificRedeemerIdLike, VxfExpectedActivity$TaggedRedeemerLike, VxfExpectedActivity, ErgoVxfExpectedActivity, VxfDestination$RelativeLinkLike, VxfDestination$AnyTokenHolderLike, VxfDestination, ErgoVxfDestination, VxfDestinationLike, VestingState$PausedLike, VestingState$ClosedLike, VestingState, ErgoVestingState, VestingStateLike, VestingDetails$OnceLike, VestingFrequency$IntervalLike, VestingFrequency, ErgoVestingFrequency, VestingFrequencyLike, VestingProgress, ErgoVestingProgress, VestingProgressLike, VestingDetails$StraightLineLike, VestingDetails$SimpleContingencyLike, VestingDetails, ErgoVestingDetails, VestingDetailsLike, VestingData, ErgoVestingData, VestingDataLike, DelegateDatum$Ergo$capoStoredData, DelegateDatum$capoStoredDataLike, DelegateDatum, ErgoDelegateDatum, CapoLifecycleActivity$CreatingDelegateLike, DelegateRole, ErgoDelegateRole, DelegateRoleLike, CapoLifecycleActivity$forcingNewSpendDelegateLike, CapoLifecycleActivity$forcingNewMintDelegateLike, ManifestActivity$updatingEntryLike, ManifestActivity$addingEntryLike, ManifestActivity$forkingThreadTokenLike, ManifestActivity$burningThreadTokenLike, ManifestActivity, ErgoManifestActivity, ManifestActivityLike, CapoLifecycleActivity, ErgoCapoLifecycleActivity, CapoLifecycleActivityLike, DelegateLifecycleActivity$ReplacingMeLike, DelegateLifecycleActivity, ErgoDelegateLifecycleActivity, DelegateLifecycleActivityLike, SpendingActivity$WithdrawingLike, SpendingActivity, ErgoSpendingActivity, SpendingActivityLike, ErgoMintingActivity, MintingActivityLike, ErgoBurningActivity, BurningActivityLike, DelegateActivity$CreatingDelegatedDataLike, DelegateActivity$UpdatingDelegatedDataLike, DelegateActivity$DeletingDelegatedDataLike, DelegateActivity, ErgoDelegateActivity, PendingDelegateAction$AddLike, PendingDelegateAction$ReplaceLike, PendingDelegateAction, ErgoPendingDelegateAction, PendingDelegateActionLike, PendingDelegateChange, ErgoPendingDelegateChange, PendingDelegateChangeLike, ManifestEntryType$DgDataPolicyLike, ManifestEntryType$DelegateThreadsLike, ManifestEntryType, ErgoManifestEntryType, ManifestEntryTypeLike, CapoManifestEntry, ErgoCapoManifestEntry, CapoManifestEntryLike, PendingCharterChange$otherManifestChangeLike, PendingCharterChange, ErgoPendingCharterChange, CapoDatum$CharterDataLike, cctx_CharterInputType$RefInputLike, cctx_CharterInputType$InputLike, cctx_CharterInputType, Ergocctx_CharterInputType, cctx_CharterInputTypeLike, CapoCtx, ErgoCapoCtx, CapoCtxLike, dgd_DataSrc$BothLike, dgd_DataSrc, Ergodgd_DataSrc, dgd_DataSrcLike, AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike, AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike, AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike, AbstractDelegateActivitiesEnum, ErgoAbstractDelegateActivitiesEnum, AbstractDelegateActivitiesEnumLike, DgDataDetails, ErgoDgDataDetails, DgDataDetailsLike } from "./Vesting.generic.typeInfo.js";
export type * as types from "./Vesting.generic.typeInfo.js";
/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***GenericVestingBundle***)
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
export declare class VestingPolicyDataBridge extends ContractDataBridge {
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
    reader: VestingPolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***VxfExpectedActivity*** for the `BasicDelegate` script
         */
        VxfExpectedActivity: VxfExpectedActivityHelper;
        /**
         * generates UplcData for the enum type ***VxfDestination*** for the `BasicDelegate` script
         */
        VxfDestination: VxfDestinationHelper;
        /**
         * generates UplcData for the enum type ***VestingState*** for the `BasicDelegate` script
         */
        VestingState: VestingStateHelper;
        /**
         * generates UplcData for the enum type ***VestingFrequency*** for the `BasicDelegate` script
         */
        VestingFrequency: VestingFrequencyHelper;
        /**
         * generates UplcData for the enum type ***VestingDetails*** for the `BasicDelegate` script
         */
        VestingDetails: VestingDetailsHelper;
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
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***VestingProgress*** for the `BasicDelegate` script
         */
        VestingProgress: (fields: VestingProgressLike | {
            lastPartialMaturity: TimeLike;
            vestedValue: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            vestedFreqUnits: number;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***VestingData*** for the `BasicDelegate` script
         */
        VestingData: (fields: VestingDataLike | {
            id: number[];
            type: string;
            ownerToken: number[];
            beneficiary: VxfDestinationLike;
            state: VestingStateLike;
            vestingDetails: VestingDetailsLike;
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
    };
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData, AnyDataLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail, DelegationDetailLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink, RelativeDelegateLinkLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺVestingProgressCast: Cast<VestingProgress, VestingProgressLike>;
    /**
                * uses unicode U+1c7a - sorts to the end */
    ᱺᱺVestingDataCast: Cast<VestingData, VestingDataLike>;
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
}
export default VestingPolicyDataBridge;
/**
 * @public
 */
export declare class VestingPolicyDataBridgeReader extends DataBridgeReaderClass {
    bridge: VestingPolicyDataBridge;
    constructor(bridge: VestingPolicyDataBridge, isMainnet: boolean);
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
        * reads UplcData *known to fit the **VestingState*** enum type,
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
    VestingState(d: UplcData): ErgoVestingState;
    /**
        * reads UplcData *known to fit the **VestingFrequency*** enum type,
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
    VestingFrequency(d: UplcData): ErgoVestingFrequency;
    /**
        * reads UplcData *known to fit the **VestingDetails*** enum type,
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
    VestingDetails(d: UplcData): ErgoVestingDetails;
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
        * for the BasicDelegate script.  You may choose to recast this data to
        * AnyData or AnyDataLike
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
    AnyData(d: UplcData): ErgoAnyData;
    /**
        * reads UplcData *known to fit the **DelegationDetail*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * DelegationDetail or DelegationDetailLike
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
    DelegationDetail(d: UplcData): ErgoDelegationDetail;
    /**
        * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * RelativeDelegateLink or RelativeDelegateLinkLike
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
    RelativeDelegateLink(d: UplcData): ErgoRelativeDelegateLink;
    /**
        * reads UplcData *known to fit the **VestingProgress*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * VestingProgress or VestingProgressLike
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
    VestingProgress(d: UplcData): ErgoVestingProgress;
    /**
        * reads UplcData *known to fit the **VestingData*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * VestingData or VestingDataLike
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
    VestingData(d: UplcData): ErgoVestingData;
    /**
        * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * PendingDelegateChange or PendingDelegateChangeLike
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
    PendingDelegateChange(d: UplcData): ErgoPendingDelegateChange;
    /**
        * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * CapoManifestEntry or CapoManifestEntryLike
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
    CapoManifestEntry(d: UplcData): ErgoCapoManifestEntry;
    /**
        * reads UplcData *known to fit the **CapoCtx*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * CapoCtx or CapoCtxLike
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
    CapoCtx(d: UplcData): ErgoCapoCtx;
    /**
        * reads UplcData *known to fit the **DgDataDetails*** struct type,
        * for the BasicDelegate script.  You may choose to recast this data to
        * DgDataDetails or DgDataDetailsLike
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
    DgDataDetails(d: UplcData): ErgoDgDataDetails;
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
 * Helper class for generating UplcData for variants of the ***VestingState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class VestingStateHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VestingState, Partial<{
        Initializing: tagOnly;
        VerifyingBeneficiary: tagOnly;
        Active: tagOnly;
        Paused: VestingState$PausedLike;
        Closed: VestingState$ClosedLike;
    }>>;
    /**
     * (property getter): UplcData for ***"VestingData::VestingState.Initializing"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Initializing(): UplcData;
    /**
     * (property getter): UplcData for ***"VestingData::VestingState.VerifyingBeneficiary"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get VerifyingBeneficiary(): UplcData;
    /**
     * (property getter): UplcData for ***"VestingData::VestingState.Active"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get Active(): UplcData;
    /**
     * generates  UplcData for ***"VestingData::VestingState.Paused"***
     * @remarks - ***VestingState$PausedLike*** is the same as the expanded field-types.
     */
    Paused(fields: VestingState$PausedLike | {
        reason: string;
        infoRef: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        } | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"VestingData::VestingState.Closed"***
     * @remarks - ***VestingState$ClosedLike*** is the same as the expanded field-types.
     */
    Closed(fields: VestingState$ClosedLike | {
        reason: string;
        infoRef: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        } | undefined;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for variants of the ***VestingFrequency*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class VestingFrequencyHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VestingFrequency, Partial<{
        Interval: VestingFrequency$IntervalLike;
        Continuous: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"VestingData::VestingFrequency.Interval"***
     * @remarks - ***VestingFrequency$IntervalLike*** is the same as the expanded field-types.
     */
    Interval(fields: VestingFrequency$IntervalLike | {
        interval: IntLike;
        count: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"VestingData::VestingFrequency.Continuous"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Continuous(): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***VestingProgress*** type.
 * @public
 */
export declare class VestingProgressHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VestingProgress, VestingProgressLike>;
}
/**
 * Helper class for generating UplcData for variants of the ***VestingDetails*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
export declare class VestingDetailsHelper extends EnumBridge<JustAnEnum> {
    /**
            * @internal
            *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VestingDetails, Partial<{
        Once: VestingDetails$OnceLike;
        StraightLine: VestingDetails$StraightLineLike;
        SimpleContingency: VestingDetails$SimpleContingencyLike;
    }>>;
    /**
     * generates  UplcData for ***"VestingData::VestingDetails.Once"***
     * @remarks - ***VestingDetails$OnceLike*** is the same as the expanded field-types.
     */
    Once(fields: VestingDetails$OnceLike | {
        totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        fullMaturity: TimeLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"VestingData::VestingDetails.StraightLine"***
     * @remarks - ***VestingDetails$StraightLineLike*** is the same as the expanded field-types.
     */
    StraightLine(fields: VestingDetails$StraightLineLike | {
        totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        fullMaturity: TimeLike;
        vestingStart: TimeLike;
        frequency: VestingFrequencyLike;
        vestingProgress: VestingProgressLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"VestingData::VestingDetails.SimpleContingency"***
     * @remarks - ***VestingDetails$SimpleContingencyLike*** is the same as the expanded field-types.
     */
    SimpleContingency(fields: VestingDetails$SimpleContingencyLike | {
        totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        fullMaturity: TimeLike | undefined;
        contingencyDescription: string;
        usesReqts: boolean;
    }): UplcData;
}
/**
 * Helper class for generating UplcData for the struct ***VestingData*** type.
 * @public
 */
export declare class VestingDataHelper extends DataBridge {
    isCallable: boolean;
    /**
             * @internal
             * uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VestingData, VestingDataLike>;
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
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike | {
        cip68meta: AnyDataLike;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike | {
        data: VestingDataLike;
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
        SwitchToVerifying: number[];
        VerifyingBeneficiary: number[];
        Activating: number[];
        Withdrawing: SpendingActivity$WithdrawingLike;
        Pausing: number[];
        Resuming: number[];
        Closing: number[];
    }>>;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.UpdatingRecord"***
     */
    UpdatingRecord(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.SwitchToVerifying"***
     */
    SwitchToVerifying(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.VerifyingBeneficiary"***
     */
    VerifyingBeneficiary(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.Activating"***
     */
    Activating(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.Withdrawing"***
     * @remarks - ***SpendingActivity$WithdrawingLike*** is the same as the expanded field-types.
     */
    Withdrawing(fields: SpendingActivity$WithdrawingLike | {
        id: number[];
        value: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.Pausing"***
     */
    Pausing(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.Resuming"***
     */
    Resuming(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"VestingPolicy::SpendingActivity.Closing"***
     */
    Closing(id: number[]): UplcData;
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
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
    * generates  UplcData for ***"VestingPolicy::MintingActivity.CreatingRecord"***,
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
     * generates  UplcData for ***"VestingPolicy::MintingActivity.CreatingRecord"***
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
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates  UplcData for ***"VestingPolicy::BurningActivity.DeletingRecord"***
     */
    DeletingRecord(id: number[]): UplcData;
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
        SwitchToVerifying: number[];
        VerifyingBeneficiary: number[];
        Activating: number[];
        Withdrawing: SpendingActivity$WithdrawingLike;
        Pausing: number[];
        Resuming: number[];
        Closing: number[];
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.UpdatingRecord"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    UpdatingRecord(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.SwitchToVerifying"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    SwitchToVerifying(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.VerifyingBeneficiary"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    VerifyingBeneficiary(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.Activating"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Activating(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.Withdrawing"***
     * @remarks - ***SpendingActivity$WithdrawingLike*** is the same as the expanded field-types.
    * ##### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Withdrawing(fields: SpendingActivity$WithdrawingLike | {
        id: number[];
        value: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.Pausing"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Pausing(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.Resuming"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Resuming(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::SpendingActivity.Closing"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    Closing(id: number[]): isActivity;
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
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
    * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::MintingActivity.CreatingRecord"***,
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
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::MintingActivity.CreatingRecord"***
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
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::BurningActivity.DeletingRecord"***
    * @remarks
    * #### Nested activity:
    * this is connected to a nested-activity wrapper, so the details are piped through
    * the parent's uplc-encoder, producing a single uplc object with
    * a complete wrapper for this inner activity detail.
     */
    DeletingRecord(id: number[]): isActivity;
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
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.CreatingDelegatedData"***,
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
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.CreatingDelegatedData"***,
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
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.OtherActivities"***
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
export declare const AnyDataSchema: StructTypeSchema;
export declare const DelegationDetailSchema: StructTypeSchema;
export declare const RelativeDelegateLinkSchema: StructTypeSchema;
export declare const VxfExpectedActivitySchema: EnumTypeSchema;
export declare const VxfDestinationSchema: EnumTypeSchema;
export declare const VestingStateSchema: EnumTypeSchema;
export declare const VestingFrequencySchema: EnumTypeSchema;
export declare const VestingProgressSchema: StructTypeSchema;
export declare const VestingDetailsSchema: EnumTypeSchema;
export declare const VestingDataSchema: StructTypeSchema;
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
//# sourceMappingURL=Vesting.generic.bridge.d.ts.map