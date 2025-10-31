import { Address } from '@helios-lang/ledger';
import { anyState } from '@donecollectively/stellar-contracts';
import type { AssetClass } from '@helios-lang/ledger';
import { BasicMintDelegate } from '@donecollectively/stellar-contracts';
import { Capo } from '@donecollectively/stellar-contracts';
import type { CapoFeatureFlags } from '@donecollectively/stellar-contracts';
import { CapoHeliosBundle } from '@donecollectively/stellar-contracts';
import { Cast } from '@helios-lang/contract-utils';
import { ConcreteCapoDelegateBundle } from '@donecollectively/stellar-contracts';
import { ContractDataBridge } from '@donecollectively/stellar-contracts';
import { DataBridgeReaderClass } from '@donecollectively/stellar-contracts';
import { DelegatedDataContract } from '@donecollectively/stellar-contracts';
import { EnumBridge } from '@donecollectively/stellar-contracts';
import type { EnumTypeMeta } from '@donecollectively/stellar-contracts';
import type { FoundDatumUtxo } from '@donecollectively/stellar-contracts';
import type { FoundUut } from '@donecollectively/stellar-contracts';
import { hasCharterRef } from '@donecollectively/stellar-contracts';
import { hasGovAuthority } from '@donecollectively/stellar-contracts';
import { hasSeed } from '@donecollectively/stellar-contracts';
import { hasSeedUtxo } from '@donecollectively/stellar-contracts';
import type { hasSettingsRef } from '@donecollectively/stellar-contracts';
import { hasUutContext } from '@donecollectively/stellar-contracts';
import { InlineTxOutputDatum } from '@helios-lang/ledger';
import type { IntersectedEnum } from '@donecollectively/stellar-contracts';
import type { IntLike } from '@helios-lang/codec-utils';
import { isActivity } from '@donecollectively/stellar-contracts';
import { JustAnEnum } from '@donecollectively/stellar-contracts';
import type { minimalData } from '@donecollectively/stellar-contracts';
import { MintingPolicyHash } from '@helios-lang/ledger';
import type { PubKeyHash } from '@helios-lang/ledger';
import { ReqtsMap } from '@donecollectively/stellar-contracts';
import { SeedActivity } from '@donecollectively/stellar-contracts';
import type { singleEnumVariantMeta } from '@donecollectively/stellar-contracts';
import type { Source } from '@helios-lang/compiler-utils';
import { StellarTxnContext } from '@donecollectively/stellar-contracts';
import { tagOnly } from '@donecollectively/stellar-contracts';
import tokenomicsBasicMintDelegate from './STokMintDelegate.hl';
import { TxInput } from '@helios-lang/ledger';
import type { TxOutput } from '@helios-lang/ledger';
import type { TxOutputId } from '@helios-lang/ledger';
import type { UplcData } from '@helios-lang/uplc';
import { UutName } from '@donecollectively/stellar-contracts';
import type { ValidatorHash } from '@helios-lang/ledger';
import { Value } from '@helios-lang/ledger';
import { WrappedDgDataContract } from '@donecollectively/stellar-contracts';

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData instead.
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedData {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedData_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData instead.
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData = AbstractDelegateActivitiesEnum$CreatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData_2 = AbstractDelegateActivitiesEnum$CreatingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData = AbstractDelegateActivitiesEnum$DeletingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData_2 = AbstractDelegateActivitiesEnum$DeletingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData = AbstractDelegateActivitiesEnum$UpdatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData_2 = AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData instead.
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * AbstractDelegateActivitiesEnum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type AbstractDelegateActivitiesEnum = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * AbstractDelegateActivitiesEnum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type AbstractDelegateActivitiesEnum_2 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***AbstractDelegateActivitiesEnum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class AbstractDelegateActivitiesEnumHelper extends EnumBridge<JustAnEnum> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * Helper class for generating UplcData for variants of the ***AbstractDelegateActivitiesEnum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class AbstractDelegateActivitiesEnumHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<AbstractDelegateActivitiesEnum_2, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_2;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_2;
        SpendingActivities: UplcData;
        MintingActivities: UplcData;
        BurningActivities: UplcData;
        CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2;
        UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2;
        DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2;
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
    CreatingDelegatedData(fields: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.UpdatingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.DeletingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 | {
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
 * AbstractDelegateActivitiesEnum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type AbstractDelegateActivitiesEnumLike = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * AbstractDelegateActivitiesEnum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type AbstractDelegateActivitiesEnumLike_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type AbstractDelegateActivitiesEnumMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "AbstractDelegateActivitiesEnum"}, {
    CapoLifecycleActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "CapoLifecycleActivities",
    "Constr#0", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity   , "noSpecialFlags"
    >,
    DelegateLifecycleActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "DelegateLifecycleActivities",
    "Constr#1", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity   , "noSpecialFlags"
    >,
    SpendingActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "SpendingActivities",
    "Constr#2", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    MintingActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "MintingActivities",
    "Constr#3", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    BurningActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "BurningActivities",
    "Constr#4", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    CreatingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "CreatingDelegatedData",
    "Constr#5", 
    "fields", AbstractDelegateActivitiesEnum$CreatingDelegatedData, "isSeededActivity"
    >,
    UpdatingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "UpdatingDelegatedData",
    "Constr#6", 
    "fields", AbstractDelegateActivitiesEnum$UpdatingDelegatedData, "noSpecialFlags"
    >,
    DeletingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "DeletingDelegatedData",
    "Constr#7", 
    "fields", AbstractDelegateActivitiesEnum$DeletingDelegatedData, "noSpecialFlags"
    >,
    MultipleDelegateActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "MultipleDelegateActivities",
    "Constr#8", "singletonField", /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>   , "noSpecialFlags"
    >,
    OtherActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "OtherActivities",
    "Constr#9", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >
}
>;

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested extends EnumBridge<isActivity> {
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
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_3, Partial<{
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
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
export declare interface AnyData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
declare interface AnyData_2 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface AnyDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike_2 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * An ergonomic, though less strictly-safe form of BurningActivity$JoiningWithParentChunk
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the BurningActivity$JoiningWithParentChunkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type BurningActivity$Ergo$JoiningWithParentChunk = BurningActivity$JoiningWithParentChunk

/**
 * A strong type for the canonical form of BurningActivity$JoiningWithParentChunk
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see BurningActivity$Ergo$JoiningWithParentChunk instead.
 * @public
 */
export declare interface BurningActivity$JoiningWithParentChunk {
    id: string  /*minVariantField*/ ,
    parentChunkId: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of BurningActivity$JoiningWithParentChunk
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface BurningActivity$JoiningWithParentChunkLike {
    id: string  /*minVariantField*/ ,
    parentChunkId: string  /*minVariantField*/ 
}

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type BurningActivity = 
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { JoiningWithParentChunk: BurningActivity$JoiningWithParentChunk /*minEnumVariant*/ }
| { CleanupRetired: /* implied wrapper { id: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type BurningActivity_2 = 
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper_2 extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested extends EnumBridge<isActivity> {
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
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested_2 extends EnumBridge<isActivity> {
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
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type BurningActivityLike = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { JoiningWithParentChunk: BurningActivity$JoiningWithParentChunkLike /*minEnumVariant*/ }
| { CleanupRetired: /* implied wrapper { id: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
>

/**
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type BurningActivityLike_2 = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type BurningActivityMeta = EnumTypeMeta<
    {module: "MarketSalePolicy", enumName: "BurningActivity"}, {
    DeletingRecord: singleEnumVariantMeta<BurningActivityMeta, "DeletingRecord",
    "Constr#0", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    JoiningWithParentChunk: singleEnumVariantMeta<BurningActivityMeta, "JoiningWithParentChunk",
    "Constr#1", 
    "fields", BurningActivity$JoiningWithParentChunk, "noSpecialFlags"
    >,
    CleanupRetired: singleEnumVariantMeta<BurningActivityMeta, "CleanupRetired",
    "Constr#2", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
export declare interface CapoCtx {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType
}

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx_2 {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType_2
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoCtxLike {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike_2 {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike_2
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
export declare interface CapoDatum$CharterData {
    spendDelegateLink: RelativeDelegateLink  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData_2 {
    spendDelegateLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink_3>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink_3>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink_3>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry_2>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange_2>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoDatum$CharterDataLike {
    spendDelegateLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike_2 {
    spendDelegateLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike_2>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike_2>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type CapoDatum$Ergo$CharterData = {
    spendDelegateLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_2 = {
    spendDelegateLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_2>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_2>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_3 = {
    spendDelegateLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_3>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_3>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
export declare interface CapoLifecycleActivity$CreatingDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoLifecycleActivity$CreatingDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type CapoLifecycleActivity$Ergo$CreatingDelegate = CapoLifecycleActivity$CreatingDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$CreatingDelegate_2 = CapoLifecycleActivity$CreatingDelegate_2

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate = CapoLifecycleActivity$forcingNewMintDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate_2 = CapoLifecycleActivity$forcingNewMintDelegate_2

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate = CapoLifecycleActivity$forcingNewSpendDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_2 = CapoLifecycleActivity$forcingNewSpendDelegate_2

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
export declare interface CapoLifecycleActivity$forcingNewMintDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoLifecycleActivity$forcingNewMintDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
export declare interface CapoLifecycleActivity$forcingNewSpendDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type CapoLifecycleActivity = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity    /*minEnumVariant*/ }

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type CapoLifecycleActivity_2 = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_3    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity_2    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_2, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_2;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2;
        updatingManifest: ManifestActivityLike_2;
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
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested extends EnumBridge<isActivity> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_2, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_2;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2;
        updatingManifest: ManifestActivityLike_2;
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
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    get removePendingChange(): ActivityDelegateRoleHelperNested_2;
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
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested_2;
}

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type CapoLifecycleActivityLike = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike    /*minEnumVariant*/ }
>

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type CapoLifecycleActivityLike_2 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike_2    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike_2    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type CapoLifecycleActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "CapoLifecycleActivity"}, {
    CreatingDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "CreatingDelegate",
    "Constr#0", 
    "fields", CapoLifecycleActivity$CreatingDelegate, "isSeededActivity"
    >,
    queuePendingChange: singleEnumVariantMeta<CapoLifecycleActivityMeta, "queuePendingChange",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    removePendingChange: singleEnumVariantMeta<CapoLifecycleActivityMeta, "removePendingChange",
    "Constr#2", "singletonField", /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole   , "noSpecialFlags"
    >,
    commitPendingChanges: singleEnumVariantMeta<CapoLifecycleActivityMeta, "commitPendingChanges",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    forcingNewSpendDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "forcingNewSpendDelegate",
    "Constr#4", 
    "fields", CapoLifecycleActivity$forcingNewSpendDelegate, "isSeededActivity"
    >,
    forcingNewMintDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "forcingNewMintDelegate",
    "Constr#5", 
    "fields", CapoLifecycleActivity$forcingNewMintDelegate, "isSeededActivity"
    >,
    updatingManifest: singleEnumVariantMeta<CapoLifecycleActivityMeta, "updatingManifest",
    "Constr#6", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
export declare interface CapoManifestEntry {
    entryType: /*minStructField*/ ManifestEntryType
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry_2 {
    entryType: /*minStructField*/ ManifestEntryType_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface CapoManifestEntryLike {
    entryType: /*minStructField*/ ManifestEntryTypeLike
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike_2 {
    entryType: /*minStructField*/ ManifestEntryTypeLike_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type cctx_CharterInputType$Ergo$Input = {
    datum: CapoDatum$Ergo$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$Input_2 = {
    datum: CapoDatum$Ergo$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type cctx_CharterInputType$Ergo$RefInput = {
    datum: CapoDatum$Ergo$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput_2 = {
    datum: CapoDatum$Ergo$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
export declare interface cctx_CharterInputType$Input {
    datum: CapoDatum$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input_2 {
    datum: CapoDatum$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface cctx_CharterInputType$InputLike {
    datum: CapoDatum$CharterDataLike  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike_2 {
    datum: CapoDatum$CharterDataLike_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
export declare interface cctx_CharterInputType$RefInput {
    datum: CapoDatum$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput_2 {
    datum: CapoDatum$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface cctx_CharterInputType$RefInputLike {
    datum: CapoDatum$CharterDataLike  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike_2 {
    datum: CapoDatum$CharterDataLike_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type cctx_CharterInputType = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input /*minEnumVariant*/ }

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type cctx_CharterInputType_2 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input_2 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType_2, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike_2;
        Input: cctx_CharterInputType$InputLike_2;
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
    RefInput(fields: cctx_CharterInputType$RefInputLike_2 | {
        datum: CapoDatum$CharterDataLike_2;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike_2 | {
        datum: CapoDatum$CharterDataLike_2;
        utxo: TxInput;
    }): UplcData;
}

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type cctx_CharterInputTypeLike = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike /*minEnumVariant*/ }
>

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type cctx_CharterInputTypeLike_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type cctx_CharterInputTypeMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "cctx_CharterInputType"}, {
    Unk: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "Unk",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    RefInput: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "RefInput",
    "Constr#1", 
    "fields", cctx_CharterInputType$RefInput, "noSpecialFlags"
    >,
    Input: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "Input",
    "Constr#2", 
    "fields", cctx_CharterInputType$Input, "noSpecialFlags"
    >
}
>;

/**
 * @public
 */
declare type Constructor<T> = new (...args: any[]) => T;

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
export declare interface DelegateActivity$CreatingDelegatedData {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedData_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateActivity$CreatingDelegatedDataLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
export declare interface DelegateActivity$DeletingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateActivity$DeletingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateActivity$Ergo$CreatingDelegatedData = DelegateActivity$CreatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$CreatingDelegatedData_2 = DelegateActivity$CreatingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateActivity$Ergo$DeletingDelegatedData = DelegateActivity$DeletingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData_2 = DelegateActivity$DeletingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateActivity$Ergo$UpdatingDelegatedData = DelegateActivity$UpdatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData_2 = DelegateActivity$UpdatingDelegatedData_2

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
export declare interface DelegateActivity$UpdatingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateActivity$UpdatingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type DelegateActivity = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity_2 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity_2    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity_2    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity_2    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper extends EnumBridge<isActivity> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity_2, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_2;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_2;
        SpendingActivities: SpendingActivityLike_2;
        MintingActivities: MintingActivityLike_2;
        BurningActivities: BurningActivityLike_2;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike_2;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike_2;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike_2;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested_2;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested_2;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested_2;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested_2;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested_2;
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
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"VestingPolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike_2 | {
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
 * DelegateActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type DelegateActivityLike = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivityLike    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivityLike    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivityLike    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type DelegateActivityMeta = EnumTypeMeta<
    {module: "MarketSalePolicy", enumName: "DelegateActivity"}, {
    CapoLifecycleActivities: singleEnumVariantMeta<DelegateActivityMeta, "CapoLifecycleActivities",
    "Constr#0", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity   , "noSpecialFlags"
    >,
    DelegateLifecycleActivities: singleEnumVariantMeta<DelegateActivityMeta, "DelegateLifecycleActivities",
    "Constr#1", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity   , "noSpecialFlags"
    >,
    SpendingActivities: singleEnumVariantMeta<DelegateActivityMeta, "SpendingActivities",
    "Constr#2", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity   , "noSpecialFlags"
    >,
    MintingActivities: singleEnumVariantMeta<DelegateActivityMeta, "MintingActivities",
    "Constr#3", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity   , "noSpecialFlags"
    >,
    BurningActivities: singleEnumVariantMeta<DelegateActivityMeta, "BurningActivities",
    "Constr#4", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity   , "noSpecialFlags"
    >,
    CreatingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "CreatingDelegatedData",
    "Constr#5", 
    "fields", DelegateActivity$CreatingDelegatedData, "isSeededActivity"
    >,
    UpdatingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "UpdatingDelegatedData",
    "Constr#6", 
    "fields", DelegateActivity$UpdatingDelegatedData, "noSpecialFlags"
    >,
    DeletingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "DeletingDelegatedData",
    "Constr#7", 
    "fields", DelegateActivity$DeletingDelegatedData, "noSpecialFlags"
    >,
    MultipleDelegateActivities: singleEnumVariantMeta<DelegateActivityMeta, "MultipleDelegateActivities",
    "Constr#8", "singletonField", /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>   , "noSpecialFlags"
    >,
    OtherActivities: singleEnumVariantMeta<DelegateActivityMeta, "OtherActivities",
    "Constr#9", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
export declare interface DelegateDatum$capoStoredData {
    data: MarketSaleData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData_2 {
    data: VestingData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateDatum$capoStoredDataLike {
    data: MarketSaleDataLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike_2 {
    data: VestingDataLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
export declare interface DelegateDatum$Cip68RefToken {
    cip68meta: AnyData  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken_2 {
    cip68meta: AnyData_2  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateDatum$Cip68RefTokenLike {
    cip68meta: AnyDataLike  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike_2 {
    cip68meta: AnyDataLike_2  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateDatum$Ergo$capoStoredData = {
    data: ErgoMarketSaleData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$capoStoredData_2 = {
    data: ErgoVestingData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateDatum$Ergo$Cip68RefToken = {
    cip68meta: ErgoAnyData  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken_2 = {
    cip68meta: ErgoAnyData_2  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type DelegateDatum = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData /*minEnumVariant*/ }

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateDatum_2 = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken_2 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail_2    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData_2 /*minEnumVariant*/ }

/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum_2, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike_2;
        IsDelegation: DelegationDetailLike_2;
        capoStoredData: DelegateDatum$capoStoredDataLike_2;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike_2 | {
        cip68meta: AnyDataLike_2;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike_2 | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"VestingPolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike_2 | {
        data: VestingDataLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}

/**
 * DelegateDatum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type DelegateDatumLike = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Cip68RefTokenLike /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetailLike    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredDataLike /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type DelegateDatumMeta = EnumTypeMeta<
    {module: "MarketSalePolicy", enumName: "DelegateDatum"}, {
    Cip68RefToken: singleEnumVariantMeta<DelegateDatumMeta, "Cip68RefToken",
    "Constr#0", 
    "fields", DelegateDatum$Cip68RefToken, "noSpecialFlags"
    >,
    IsDelegation: singleEnumVariantMeta<DelegateDatumMeta, "IsDelegation",
    "Constr#1", "singletonField", /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail   , "noSpecialFlags"
    >,
    capoStoredData: singleEnumVariantMeta<DelegateDatumMeta, "capoStoredData",
    "Constr#2", 
    "fields", DelegateDatum$capoStoredData, "noSpecialFlags"
    >
}
>;

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type DelegateLifecycleActivity$Ergo$ReplacingMe = DelegateLifecycleActivity$ReplacingMe

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe_2 = DelegateLifecycleActivity$ReplacingMe_2

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
export declare interface DelegateLifecycleActivity$ReplacingMe {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegateLifecycleActivity$ReplacingMeLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type DelegateLifecycleActivity = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateLifecycleActivity_2 = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_2, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2;
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
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested extends EnumBridge<isActivity> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_2, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2;
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
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type DelegateLifecycleActivityLike = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateLifecycleActivityLike_2 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type DelegateLifecycleActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "DelegateLifecycleActivity"}, {
    ReplacingMe: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "ReplacingMe",
    "Constr#0", 
    "fields", DelegateLifecycleActivity$ReplacingMe, "isSeededActivity"
    >,
    Retiring: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "Retiring",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    ValidatingSettings: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "ValidatingSettings",
    "Constr#2", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type DelegateRole = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_2 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_3 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_3, Partial<{
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
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type DelegateRoleLike = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateRoleLike_2 = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type DelegateRoleMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "DelegateRole"}, {
    MintDgt: singleEnumVariantMeta<DelegateRoleMeta, "MintDgt",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    SpendDgt: singleEnumVariantMeta<DelegateRoleMeta, "SpendDgt",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    MintInvariant: singleEnumVariantMeta<DelegateRoleMeta, "MintInvariant",
    "Constr#2", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    SpendInvariant: singleEnumVariantMeta<DelegateRoleMeta, "SpendInvariant",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    DgDataPolicy: singleEnumVariantMeta<DelegateRoleMeta, "DgDataPolicy",
    "Constr#4", "singletonField", /* implied wrapper { name: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    OtherNamedDgt: singleEnumVariantMeta<DelegateRoleMeta, "OtherNamedDgt",
    "Constr#5", "singletonField", /* implied wrapper { name: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    BothMintAndSpendDgt: singleEnumVariantMeta<DelegateRoleMeta, "BothMintAndSpendDgt",
    "Constr#6", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    HandledByCapoOnly: singleEnumVariantMeta<DelegateRoleMeta, "HandledByCapoOnly",
    "Constr#7", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
export declare interface DelegationDetail {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail_2 {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DelegationDetailLike {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike_2 {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of dgd_DataSrc$Both
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see dgd_DataSrc$Ergo$Both instead.
 * @public
 */
export declare interface dgd_DataSrc$Both {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of dgd_DataSrc$Both
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see dgd_DataSrc$Ergo$Both instead.
 * @public
 */
declare interface dgd_DataSrc$Both_2 {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of dgd_DataSrc$Both
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface dgd_DataSrc$BothLike {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of dgd_DataSrc$Both
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface dgd_DataSrc$BothLike_2 {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of dgd_DataSrc$Both
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the dgd_DataSrc$BothLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type dgd_DataSrc$Ergo$Both = dgd_DataSrc$Both

/**
 * An ergonomic, though less strictly-safe form of dgd_DataSrc$Both
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the dgd_DataSrc$BothLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type dgd_DataSrc$Ergo$Both_2 = dgd_DataSrc$Both_2

/**
 * dgd_DataSrc enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type dgd_DataSrc = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Both /*minEnumVariant*/ }

/**
 * dgd_DataSrc enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type dgd_DataSrc_2 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Both_2 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class dgd_DataSrcHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class dgd_DataSrcHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<dgd_DataSrc_2, Partial<{
        Unk: tagOnly;
        Input: TxInput;
        Output: TxOutput;
        Both: dgd_DataSrc$BothLike_2;
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
    Both(fields: dgd_DataSrc$BothLike_2 | {
        utxo: TxInput;
        txo: TxOutput;
    }): UplcData;
}

/**
 * dgd_DataSrc enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type dgd_DataSrcLike = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$BothLike /*minEnumVariant*/ }
>

/**
 * dgd_DataSrc enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type dgd_DataSrcLike_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$BothLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type dgd_DataSrcMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "dgd_DataSrc"}, {
    Unk: singleEnumVariantMeta<dgd_DataSrcMeta, "Unk",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Input: singleEnumVariantMeta<dgd_DataSrcMeta, "Input",
    "Constr#1", "singletonField", /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput   , "noSpecialFlags"
    >,
    Output: singleEnumVariantMeta<dgd_DataSrcMeta, "Output",
    "Constr#2", "singletonField", /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput   , "noSpecialFlags"
    >,
    Both: singleEnumVariantMeta<dgd_DataSrcMeta, "Both",
    "Constr#3", 
    "fields", dgd_DataSrc$Both, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DgDataDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDgDataDetails instead.
 * @public
 */
export declare interface DgDataDetails {
    dataSrc: /*minStructField*/ dgd_DataSrc
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ AbstractDelegateActivitiesEnum | undefined
}

/**
 * A strong type for the canonical form of DgDataDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDgDataDetails instead.
 * @public
 */
declare interface DgDataDetails_2 {
    dataSrc: /*minStructField*/ dgd_DataSrc_2
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ AbstractDelegateActivitiesEnum_2 | undefined
}

/**
 * A strong type for the permissive form of DgDataDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DgDataDetailsLike {
    dataSrc: /*minStructField*/ dgd_DataSrcLike
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike | undefined
}

/**
 * A strong type for the permissive form of DgDataDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DgDataDetailsLike_2 {
    dataSrc: /*minStructField*/ dgd_DataSrcLike_2
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike_2 | undefined
}

/**
 * A strong type for the canonical form of DTS_PurchaseInfo
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDTS_PurchaseInfo instead.
 * @public
 */
export declare interface DTS_PurchaseInfo {
    inferredPace: /*minStructField*/ number
    hoursSinceLastPurchase: /*minStructField*/ number
    unitsPurchased: /*minStructField*/ bigint
    purchaseTime: /*minStructField*/ number
    prevSalePace: /*minStructField*/ number
    totalProgress: /*minStructField*/ SaleProgressDetailsV1
}

/**
 * A strong type for the permissive form of DTS_PurchaseInfo
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DTS_PurchaseInfoLike {
    inferredPace: /*minStructField*/ number
    hoursSinceLastPurchase: /*minStructField*/ number
    unitsPurchased: /*minStructField*/ IntLike
    purchaseTime: /*minStructField*/ TimeLike
    prevSalePace: /*minStructField*/ number
    totalProgress: /*minStructField*/ SaleProgressDetailsV1Like
}

/**
 * A strong type for the canonical form of DynamicSaleV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDynamicSaleV1 instead.
 * @public
 */
export declare interface DynamicSaleV1 {
    settings: /*minStructField*/ DynamicSaleV1Settings
    purchase: /*minStructField*/ DTS_PurchaseInfo
    sale: /*minStructField*/ MarketSaleData
    updatedSale: /*minStructField*/ MarketSaleData | undefined
}

/**
 * A strong type for the permissive form of DynamicSaleV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DynamicSaleV1Like {
    settings: /*minStructField*/ DynamicSaleV1SettingsLike
    purchase: /*minStructField*/ DTS_PurchaseInfoLike
    sale: /*minStructField*/ MarketSaleDataLike
    updatedSale: /*minStructField*/ MarketSaleDataLike | undefined
}

/**
 * A strong type for the canonical form of DynamicSaleV1Settings
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDynamicSaleV1Settings instead.
 * @public
 */
export declare interface DynamicSaleV1Settings {
    targetPrice: /*minStructField*/ number
    targetedSellingTime: /*minStructField*/ bigint
    minPrice: /*minStructField*/ number
    maxPrice: /*minStructField*/ number
    progressPricingDiscountFloorPoint: /*minStructField*/ number
    progressPricingDiscountWhenSlow: /*minStructField*/ number
    progressPricingExpansionWhenFast: /*minStructField*/ number
    dynaPaceFasterSaleWeight: /*minStructField*/ number
    dynaPaceIdleDecayRate: /*minStructField*/ number
    pricingWeightDynaPace: /*minStructField*/ number
}

/**
 * A strong type for the permissive form of DynamicSaleV1Settings
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface DynamicSaleV1SettingsLike {
    targetPrice: /*minStructField*/ number
    targetedSellingTime: /*minStructField*/ IntLike
    minPrice: /*minStructField*/ number
    maxPrice: /*minStructField*/ number
    progressPricingDiscountFloorPoint: /*minStructField*/ number
    progressPricingDiscountWhenSlow: /*minStructField*/ number
    progressPricingExpansionWhenFast: /*minStructField*/ number
    dynaPaceFasterSaleWeight: /*minStructField*/ number
    dynaPaceIdleDecayRate: /*minStructField*/ number
    pricingWeightDynaPace: /*minStructField*/ number
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoAbstractDelegateActivitiesEnum = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoAbstractDelegateActivitiesEnum_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoAnyData = AnyData

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData_2 = AnyData_2

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoBurningActivity = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { JoiningWithParentChunk: BurningActivity$Ergo$JoiningWithParentChunk /*minEnumVariant*/ }
| { CleanupRetired: /* implied wrapper { id: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity_2 = IntersectedEnum<BurningActivity_2/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of CapoCtx
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoCtxLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoCapoCtx = {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ Ergocctx_CharterInputType
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoCapoLifecycleActivity = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity_2 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole_3    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity_3    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoCapoManifestEntry = {
    entryType: /*minStructField*/ ErgoManifestEntryType
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_2 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_3 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_3
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type Ergocctx_CharterInputType = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoDelegateActivity = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity_2    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity_2    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity_2    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoDelegateDatum = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum_2 = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_2 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail_2    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoDelegateLifecycleActivity = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity_2 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoDelegateRole = IntersectedEnum<DelegateRole/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_2 = IntersectedEnum<DelegateRole_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_3 = IntersectedEnum<DelegateRole_3/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoDelegationDetail = DelegationDetail

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail_2 = DelegationDetail_2

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type Ergodgd_DataSrc = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Ergo$Both /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergodgd_DataSrc_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Ergo$Both_2 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of DgDataDetails
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DgDataDetailsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoDgDataDetails = {
    dataSrc: /*minStructField*/ Ergodgd_DataSrc
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ ErgoAbstractDelegateActivitiesEnum | undefined
}

/**
 * An ergonomic, though less strictly-safe form of DTS_PurchaseInfo
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DTS_PurchaseInfoLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoDTS_PurchaseInfo = {
    inferredPace: /*minStructField*/ number
    hoursSinceLastPurchase: /*minStructField*/ number
    unitsPurchased: /*minStructField*/ bigint
    purchaseTime: /*minStructField*/ number
    prevSalePace: /*minStructField*/ number
    totalProgress: /*minStructField*/ ErgoSaleProgressDetailsV1
}

/**
 * An ergonomic, though less strictly-safe form of DynamicSaleV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DynamicSaleV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoDynamicSaleV1 = {
    settings: /*minStructField*/ ErgoDynamicSaleV1Settings
    purchase: /*minStructField*/ ErgoDTS_PurchaseInfo
    sale: /*minStructField*/ ErgoMarketSaleData
    updatedSale: /*minStructField*/ ErgoMarketSaleData | undefined
}

/**
 * An ergonomic, though less strictly-safe form of DynamicSaleV1Settings
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DynamicSaleV1SettingsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoDynamicSaleV1Settings = DynamicSaleV1Settings

/**
 * An ergonomic, though less strictly-safe form of FixedSaleDetailsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the FixedSaleDetailsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoFixedSaleDetailsV1 = {
    settings: /*minStructField*/ ErgoDynamicSaleV1Settings
    startAt: /*minStructField*/ number
    vxfTokensTo: /*minStructField*/ ErgoVxfDestination | undefined
    vxfFundsTo: /*minStructField*/ ErgoVxfDestination | undefined
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoManifestActivity = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_2 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_2 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_2 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_2 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_3 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_3 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_3 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_3 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoManifestEntryType = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_2 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_3 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_3 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_3 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of MarketSaleData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MarketSaleDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoMarketSaleData = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    name: /*minStructField*/ string
    details: /*minStructField*/ ErgoMktSaleDetails
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoMarketSaleState = IntersectedEnum<MarketSaleState/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoMintingActivity = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }
| { SplittingSaleChunkAndBuying: MintingActivity$Ergo$SplittingSaleChunkAndBuying /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity_2 = IntersectedEnum<MintingActivity_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoMktSaleDetails = IntersectedEnum<
| { V1: MktSaleDetails$Ergo$V1 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of OtherSaleStateV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the OtherSaleStateV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoOtherSaleStateV1 = {
    progressDetails: /*minStructField*/ ErgoSaleProgressDetailsV1
    salePace: /*minStructField*/ number
    state: /*minStructField*/ ErgoMarketSaleState
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoPendingCharterChange = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_2 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_3 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_3    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoPendingDelegateAction = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_2 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_2 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_3 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_3 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_3 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoPendingDelegateChange = {
    action: /*minStructField*/ ErgoPendingDelegateAction
    role: /*minStructField*/ ErgoDelegateRole
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_2 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_2
    role: /*minStructField*/ ErgoDelegateRole_2
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_2 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_3 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_3
    role: /*minStructField*/ ErgoDelegateRole_3
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_3 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoRelativeDelegateLink = RelativeDelegateLink

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_2 = RelativeDelegateLink_2

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_3 = RelativeDelegateLink_3

/**
 * An ergonomic, though less strictly-safe form of SaleAssetsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SaleAssetsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoSaleAssetsV1 = SaleAssetsV1

/**
 * An ergonomic, though less strictly-safe form of SaleProgressDetailsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SaleProgressDetailsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoSaleProgressDetailsV1 = SaleProgressDetailsV1

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoSpendingActivity = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { AddingToSale: SpendingActivity$Ergo$AddingToSale /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SellingTokens: SpendingActivity$Ergo$SellingTokens /*minEnumVariant*/ }
| { MergingChildChunk: SpendingActivity$Ergo$MergingChildChunk /*minEnumVariant*/ }
| { Retiring: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity_2 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SwitchToVerifying: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { VerifyingBeneficiary: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Withdrawing: SpendingActivity$Ergo$Withdrawing /*minEnumVariant*/ }
| { Pausing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Resuming: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Closing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of ThreadInfoV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ThreadInfoV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoThreadInfoV1 = ThreadInfoV1

/**
 * An ergonomic, though less strictly-safe form of VestingData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoVestingData = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    ownerToken: /*minStructField*/ number[]
    beneficiary: /*minStructField*/ ErgoVxfDestination_2
    state: /*minStructField*/ ErgoVestingState
    vestingDetails: /*minStructField*/ ErgoVestingDetails
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVestingDetails = IntersectedEnum<
| { Once: VestingDetails$Ergo$Once /*minEnumVariant*/ }
| { StraightLine: VestingDetails$Ergo$StraightLine /*minEnumVariant*/ }
| { SimpleContingency: VestingDetails$Ergo$SimpleContingency /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVestingFrequency = IntersectedEnum<
| { Interval: VestingFrequency$Ergo$Interval /*minEnumVariant*/ }
| { Continuous: tagOnly /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of VestingProgress
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingProgressLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoVestingProgress = VestingProgress

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVestingState = IntersectedEnum<
| { Initializing: tagOnly /*minEnumVariant*/ }
| { VerifyingBeneficiary: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { Paused: VestingState$Ergo$Paused /*minEnumVariant*/ }
| { Closed: VestingState$Ergo$Closed /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoVxfDestination = IntersectedEnum<
| { RelativeLink: VxfDestination$Ergo$RelativeLink /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$Ergo$AnyTokenHolder /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVxfDestination_2 = IntersectedEnum<
| { RelativeLink: VxfDestination$Ergo$RelativeLink_2 /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$Ergo$AnyTokenHolder_2 /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
export declare type ErgoVxfExpectedActivity = IntersectedEnum<
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$Ergo$SpecificRedeemerId /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$Ergo$TaggedRedeemer /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVxfExpectedActivity_2 = IntersectedEnum<
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$Ergo$SpecificRedeemerId_2 /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$Ergo$TaggedRedeemer_2 /*minEnumVariant*/ }
>

/**
 * A strong type for the canonical form of FixedSaleDetailsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoFixedSaleDetailsV1 instead.
 * @public
 */
export declare interface FixedSaleDetailsV1 {
    settings: /*minStructField*/ DynamicSaleV1Settings
    startAt: /*minStructField*/ number
    vxfTokensTo: /*minStructField*/ VxfDestination | undefined
    vxfFundsTo: /*minStructField*/ VxfDestination | undefined
}

/**
 * A strong type for the permissive form of FixedSaleDetailsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface FixedSaleDetailsV1Like {
    settings: /*minStructField*/ DynamicSaleV1SettingsLike
    startAt: /*minStructField*/ TimeLike
    vxfTokensTo: /*minStructField*/ VxfDestinationLike | undefined
    vxfFundsTo: /*minStructField*/ VxfDestinationLike | undefined
}

/**
 * @public
 */
export declare type GenericTokenomicsFeatureFlags = {
    mktSale: boolean;
    fundedPurpose: boolean;
    vesting: boolean;
};

/**
 * @public
 */
export declare type hasMemberToken = StellarTxnContext<anyState & {
    memberToken: UutName;
}>;

/**
 * @public
 */
declare type IsStokMintDelegate = {
    specializedDelegateModule: typeof tokenomicsBasicMintDelegate;
    requiresGovAuthority: true;
};

/**
 * Creates a typed helper class to use as a mint delegate for tokenomics subclasses
 *
 * ## Usage:
 * In your `MyMintDelegate.hlb.ts`:
 * ```typescript
 *    export const MyMintDelegate = makeSTokMintDelegateBundle(MyCapoBundle, "MyMintDelegate")
 *    export default MyMintDelegate
 * ```
 * This HLB file will be compiled to make  `.bridge.ts` and `.typeInfo.d.ts` for your delegate.  Import
 * the DataBridge and make your `MySpendMintDelegate.ts`, extending `STokMintDelegate`
 * and using:
 * ```typescript
 * export class MyMintSpendDelegate extends STokMintDelegate {
 *    get delegateName() {
 *        return "MyMintSpendDelegate";
 *    }
 *    dataBridgeClass = MyMintSpendDelegateDataBridge;
 *     async scriptBundleClass(): Promise<CapoDelegateBundle> {
 *        const module = await import("./MyMintSpendDelegate.hlb");
 *        return module.MyMintSpendDelegateBundle
 *     }
 * ```
 *
 * Use your Mint Delegate class in your Capo:
 * ```typescript
 * delegateRoles({
 *    spendDelegate: defineRole("spendDgt", MyMintSpendDelegate, {}),
 *    mintDelegate: defineRole("mintDgt", MyMintSpendDelegate, {}),
 * })
 * ```
 *
 * @public
 */
export declare function makeSTokMintDelegateBundle(capoBundle: typeof CapoHeliosBundle, delegateName: string): ConcreteCapoDelegateBundle & Constructor<STokMintDelegateBundle & IsStokMintDelegate>;

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
export declare interface ManifestActivity$addingEntry {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestActivity$addingEntryLike {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
export declare interface ManifestActivity$burningThreadToken {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_2 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_3 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestActivity$burningThreadTokenLike {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike_2 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestActivity$Ergo$addingEntry = ManifestActivity$addingEntry

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_2 = ManifestActivity$addingEntry_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_3 = ManifestActivity$addingEntry_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestActivity$Ergo$burningThreadToken = ManifestActivity$burningThreadToken

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_2 = ManifestActivity$burningThreadToken_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_3 = ManifestActivity$burningThreadToken_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestActivity$Ergo$forkingThreadToken = ManifestActivity$forkingThreadToken

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_2 = ManifestActivity$forkingThreadToken_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_3 = ManifestActivity$forkingThreadToken_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestActivity$Ergo$updatingEntry = ManifestActivity$updatingEntry

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_2 = ManifestActivity$updatingEntry_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_3 = ManifestActivity$updatingEntry_3

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
export declare interface ManifestActivity$forkingThreadToken {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_2 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_3 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestActivity$forkingThreadTokenLike {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike_2 {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
export declare interface ManifestActivity$updatingEntry {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestActivity$updatingEntryLike {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type ManifestActivity = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken /*minEnumVariant*/ }

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestActivity_2 = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry_3 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry_3 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken_3 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken_3 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_2, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_2;
        addingEntry: ManifestActivity$addingEntryLike_2;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_2 | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_2 | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested extends EnumBridge<isActivity> {
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
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_2, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_2;
        addingEntry: ManifestActivity$addingEntryLike_2;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_2;
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
    updatingEntry(fields: ManifestActivity$updatingEntryLike_2 | {
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
    addingEntry(fields: ManifestActivity$addingEntryLike_2 | {
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
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_2 | {
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
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_2 | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type ManifestActivityLike = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike /*minEnumVariant*/ }
>

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestActivityLike_2 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike_2 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike_2 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type ManifestActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "ManifestActivity"}, {
    retiringEntry: singleEnumVariantMeta<ManifestActivityMeta, "retiringEntry",
    "Constr#0", "singletonField", /* implied wrapper { key: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    updatingEntry: singleEnumVariantMeta<ManifestActivityMeta, "updatingEntry",
    "Constr#1", 
    "fields", ManifestActivity$updatingEntry, "noSpecialFlags"
    >,
    addingEntry: singleEnumVariantMeta<ManifestActivityMeta, "addingEntry",
    "Constr#2", 
    "fields", ManifestActivity$addingEntry, "noSpecialFlags"
    >,
    forkingThreadToken: singleEnumVariantMeta<ManifestActivityMeta, "forkingThreadToken",
    "Constr#3", 
    "fields", ManifestActivity$forkingThreadToken, "noSpecialFlags"
    >,
    burningThreadToken: singleEnumVariantMeta<ManifestActivityMeta, "burningThreadToken",
    "Constr#4", 
    "fields", ManifestActivity$burningThreadToken, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
export declare interface ManifestEntryType$DelegateThreads {
    role: DelegateRole  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads_2 {
    role: DelegateRole_3  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestEntryType$DelegateThreadsLike {
    role: DelegateRoleLike  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike_2 {
    role: DelegateRoleLike_2  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
export declare interface ManifestEntryType$DgDataPolicy {
    policyLink: RelativeDelegateLink  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy_2 {
    policyLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ManifestEntryType$DgDataPolicyLike {
    policyLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike_2 {
    policyLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestEntryType$Ergo$DelegateThreads = {
    role: ErgoDelegateRole  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_2 = {
    role: ErgoDelegateRole_2  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_3 = {
    role: ErgoDelegateRole_3  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ManifestEntryType$Ergo$DgDataPolicy = {
    policyLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_2 = {
    policyLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_3 = {
    policyLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type ManifestEntryType = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestEntryType_2 = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType_2, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike_2;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike_2;
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
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike_2 | {
        policyLink: RelativeDelegateLinkLike_2;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike_2 | {
        role: DelegateRoleLike_2;
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
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type ManifestEntryTypeLike = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestEntryTypeLike_2 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type ManifestEntryTypeMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "ManifestEntryType"}, {
    NamedTokenRef: singleEnumVariantMeta<ManifestEntryTypeMeta, "NamedTokenRef",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    DgDataPolicy: singleEnumVariantMeta<ManifestEntryTypeMeta, "DgDataPolicy",
    "Constr#1", 
    "fields", ManifestEntryType$DgDataPolicy, "noSpecialFlags"
    >,
    DelegateThreads: singleEnumVariantMeta<ManifestEntryTypeMeta, "DelegateThreads",
    "Constr#2", 
    "fields", ManifestEntryType$DelegateThreads, "noSpecialFlags"
    >,
    MerkleMembership: singleEnumVariantMeta<ManifestEntryTypeMeta, "MerkleMembership",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    MerkleStateRoot: singleEnumVariantMeta<ManifestEntryTypeMeta, "MerkleStateRoot",
    "Constr#4", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * @public
 */
declare class MarketSaleBundle extends MarketSaleBundle_base {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get modules(): Source[];
}

declare const MarketSaleBundle_base: ConcreteCapoDelegateBundle;

/**
 * @public
 */
export declare class MarketSaleController extends WrappedDgDataContract<MarketSaleData, MarketSaleDataLike, MarketSaleDataWrapper> {
    dataBridgeClass: typeof MarketSalePolicyDataBridge;
    get recordTypeName(): string;
    get idPrefix(): string;
    scriptBundleClass(): Promise<MarketSaleBundle>;
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
    beforeCreate(data: MarketSaleData): MarketSaleData;
    mkTxnActivateMarketSale<TCX extends hasCharterRef | StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, addedTokenValue: Value | undefined, newAttrs: Partial<MarketSaleDataLike>, tcx?: TCX): Promise<TCX>;
    mkTxnAddToMarketSale<TCX extends hasCharterRef>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData>, addedTokenMph: MintingPolicyHash, addedTokenName: string | number[], addedTokenCount: number | bigint, tcx?: TCX): Promise<TCX>;
    saleTokenValue(itemDetails: FoundDatumUtxo<MarketSaleData>, sellingUnitQuantity?: number | bigint): Value;
    mkTxnBuyFromMarketSale<TCX extends StellarTxnContext>(this: MarketSaleController, mktSale: FoundDatumUtxo<MarketSaleData, MarketSaleDataWrapper>, { sellingUnitQuantity, delegateActivity, }: {
        sellingUnitQuantity: number | bigint;
        delegateActivity?: isActivity;
    }, tcxIn?: TCX): Promise<StellarTxnContext<anyState>>;
    /**
     * mockable method for updating sale data, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedDetails(msd: MarketSaleData, pmsd: Partial<MarketSaleData>): Partial<MarketSaleData>;
    /**
     * mockable method for updating progress details for a sale, called during mkTxnBuyFromMarketSale
     */
    mkUpdatedProgressDetails({ lastPurchaseAt, prevPurchaseAt, chunkUnitCount, chunkUnitsSold, }: MarketSaleData["details"]["V1"]["saleState"]["progressDetails"]): MarketSaleData["details"]["V1"]["saleState"]["progressDetails"];
    requirements(): ReqtsMap<"Governs the process of selling tokens to buyers" | "it's created with key details of a sale" | "Activity:AddTokens allows additional tokens to be added to a Pending mktSale" | "has a state machine for sale lifecycle" | "Will sell its tokens when conditions are right" | "updates appropriate sale details as a result of each sale" | "participates in the Txf protocol for getting paid" | "participates in the Txf protocol for distributing the tokens" | "Splits the sale into chunks for scaling", never>;
    mkDataWrapper(data: ErgoMarketSaleData): MarketSaleDataWrapper;
}

/**
 * A strong type for the canonical form of MarketSaleData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoMarketSaleData instead.
 * @public
 */
export declare interface MarketSaleData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    name: /*minStructField*/ string
    details: /*minStructField*/ MktSaleDetails
}

/**
 * A strong type for the permissive form of MarketSaleData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface MarketSaleDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    name: /*minStructField*/ string
    details: /*minStructField*/ MktSaleDetailsLike
}

/**
 * @public
 */
declare class MarketSaleDataWrapper {
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
declare class MarketSalePolicyDataBridge extends ContractDataBridge {
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
            lastPurchaseAt: TimeLike_2;
            prevPurchaseAt: TimeLike_2;
            chunkUnitCount: IntLike;
            chunkUnitsSold: IntLike;
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
            startAt: TimeLike_2;
            vxfTokensTo: /*minStructField*/ VxfDestinationLike | undefined;
            vxfFundsTo: /*minStructField*/ VxfDestinationLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***SaleAssetsV1*** for the `BasicDelegate` script
         */
        SaleAssetsV1: (fields: SaleAssetsV1Like | {
            saleUnitAssets: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            singleBuyMaxUnits: IntLike;
            primaryAssetMph: /*minStructField*/ MintingPolicyHash | string | number[];
            primaryAssetName: number[];
            primaryAssetTargetCount: IntLike;
            totalSaleUnits: IntLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***ThreadInfoV1*** for the `BasicDelegate` script
         */
        ThreadInfoV1: (fields: ThreadInfoV1Like | {
            nestedThreads: IntLike;
            retiredThreads: IntLike;
            parentChunkId: number[];
            chunkForkedAt: TimeLike_2;
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
            unitsPurchased: IntLike;
            purchaseTime: TimeLike_2;
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

/**
 * @public
 */
declare class MarketSalePolicyDataBridgeReader extends DataBridgeReaderClass {
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
 * MarketSaleState enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the MarketSaleState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MarketSaleStateHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type MarketSaleState = 
| { Pending: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { Retired: tagOnly /*minEnumVariant*/ }
| { SoldOut: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***MarketSaleState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MarketSaleStateHelper extends EnumBridge<JustAnEnum> {
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
 * MarketSaleState enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the MarketSaleState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MarketSaleStateHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type MarketSaleStateLike = IntersectedEnum<
| { Pending: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { Retired: tagOnly /*minEnumVariant*/ }
| { SoldOut: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type MarketSaleStateMeta = EnumTypeMeta<
    {module: "MarketSaleData", enumName: "MarketSaleState"}, {
    Pending: singleEnumVariantMeta<MarketSaleStateMeta, "Pending",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Active: singleEnumVariantMeta<MarketSaleStateMeta, "Active",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Retired: singleEnumVariantMeta<MarketSaleStateMeta, "Retired",
    "Constr#2", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    SoldOut: singleEnumVariantMeta<MarketSaleStateMeta, "SoldOut",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * expresses the essential fields needed for initiating creation of a AnyData
 * @public
 */
export declare type minimalAnyData = minimalData<AnyDataLike>

/**
 * expresses the essential fields needed for initiating creation of a DgDataDetails
 * @public
 */
export declare type minimalDgDataDetails = minimalData<DgDataDetailsLike>

/**
 * expresses the essential fields needed for initiating creation of a MarketSaleData
 * @public
 */
export declare type minimalMarketSaleData = minimalData<MarketSaleDataLike>

/**
 * expresses the essential fields needed for initiating creation of a VestingData
 * @public
 */
export declare type minimalVestingData = minimalData<VestingDataLike>

/**
 * An ergonomic, though less strictly-safe form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MintingActivity$SplittingSaleChunkAndBuyingLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type MintingActivity$Ergo$SplittingSaleChunkAndBuying = MintingActivity$SplittingSaleChunkAndBuying

/**
 * A strong type for the canonical form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see MintingActivity$Ergo$SplittingSaleChunkAndBuying instead.
 * @public
 */
export declare interface MintingActivity$SplittingSaleChunkAndBuying {
    seed: TxOutputId  /*minVariantField*/ ,
    parentChunkId: string  /*minVariantField*/ ,
    buyingUnitQuantity: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface MintingActivity$SplittingSaleChunkAndBuyingLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    parentChunkId: string  /*minVariantField*/ ,
    buyingUnitQuantity: IntLike  /*minVariantField*/ 
}

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type MintingActivity = 
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }
| { SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuying /*minEnumVariant*/ }

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type MintingActivity_2 = 
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper extends EnumBridge<JustAnEnum> {
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
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
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
        buyingUnitQuantity: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***
     * with raw seed details included in fields.
     */
    SplittingSaleChunkAndBuying(fields: MintingActivity$SplittingSaleChunkAndBuyingLike | {
        seed: TxOutputId | string;
        parentChunkId: string;
        buyingUnitQuantity: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * @param fields - \{ parentChunkId: string, buyingUnitQuantity: IntLike \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$SplittingSaleChunkAndBuying({ parentChunkId, buyingUnitQuantity })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$SplittingSaleChunkAndBuying: (fields: {
        parentChunkId: string;
        buyingUnitQuantity: IntLike;
    }) => SeedActivity<(value: hasSeed, fields: {
    parentChunkId: string;
    buyingUnitQuantity: IntLike;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper_2 extends EnumBridge<JustAnEnum> {
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
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested extends EnumBridge<isActivity> {
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
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
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
        buyingUnitQuantity: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***
     * with raw seed details included in fields.
     */
    SplittingSaleChunkAndBuying(fields: MintingActivity$SplittingSaleChunkAndBuyingLike | {
        seed: TxOutputId | string;
        parentChunkId: string;
        buyingUnitQuantity: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying"***,
     * @param fields - \{ parentChunkId: string, buyingUnitQuantity: IntLike \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$SplittingSaleChunkAndBuying({ parentChunkId, buyingUnitQuantity })`
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
        buyingUnitQuantity: IntLike;
    }) => SeedActivity<(value: hasSeed, fields: {
    parentChunkId: string;
    buyingUnitQuantity: IntLike;
    }) => isActivity>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested_2 extends EnumBridge<isActivity> {
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
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
}

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type MintingActivityLike = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
| { SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuyingLike /*minEnumVariant*/ }
>

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type MintingActivityLike_2 = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type MintingActivityMeta = EnumTypeMeta<
    {module: "MarketSalePolicy", enumName: "MintingActivity"}, {
    CreatingRecord: singleEnumVariantMeta<MintingActivityMeta, "CreatingRecord",
    "Constr#0", "singletonField", /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId   , "isSeededActivity"
    >,
    SplittingSaleChunkAndBuying: singleEnumVariantMeta<MintingActivityMeta, "SplittingSaleChunkAndBuying",
    "Constr#1", 
    "fields", MintingActivity$SplittingSaleChunkAndBuying, "isSeededActivity"
    >
}
>;

/**
 * An ergonomic, though less strictly-safe form of MktSaleDetails$V1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MktSaleDetails$V1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type MktSaleDetails$Ergo$V1 = {
    saleState: ErgoOtherSaleStateV1  /*minVariantField*/ ,
    fixedSaleDetails: ErgoFixedSaleDetailsV1  /*minVariantField*/ ,
    saleAssets: ErgoSaleAssetsV1  /*minVariantField*/ ,
    threadInfo: ErgoThreadInfoV1  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of MktSaleDetails$V1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see MktSaleDetails$Ergo$V1 instead.
 * @public
 */
export declare interface MktSaleDetails$V1 {
    saleState: OtherSaleStateV1  /*minVariantField*/ ,
    fixedSaleDetails: FixedSaleDetailsV1  /*minVariantField*/ ,
    saleAssets: SaleAssetsV1  /*minVariantField*/ ,
    threadInfo: ThreadInfoV1  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of MktSaleDetails$V1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface MktSaleDetails$V1Like {
    saleState: OtherSaleStateV1Like  /*minVariantField*/ ,
    fixedSaleDetails: FixedSaleDetailsV1Like  /*minVariantField*/ ,
    saleAssets: SaleAssetsV1Like  /*minVariantField*/ ,
    threadInfo: ThreadInfoV1Like  /*minVariantField*/ 
}

/**
 * MktSaleDetails enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the MktSaleDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MktSaleDetailsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type MktSaleDetails = 
| { V1: MktSaleDetails$V1 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***MktSaleDetails*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MktSaleDetailsHelper extends EnumBridge<JustAnEnum> {
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
 * MktSaleDetails enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the MktSaleDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MktSaleDetailsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type MktSaleDetailsLike = IntersectedEnum<
| { V1: MktSaleDetails$V1Like /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type MktSaleDetailsMeta = EnumTypeMeta<
    {module: "MarketSaleData", enumName: "MktSaleDetails"}, {
    V1: singleEnumVariantMeta<MktSaleDetailsMeta, "V1",
    "Constr#4000", 
    "fields", MktSaleDetails$V1, "noSpecialFlags"
    >
}
>;

/**
 * @public
 */
export declare type optionalMemberToken<T extends {
    mbrTkn: string;
} | {
    memberToken: string;
}> = Omit<T, "mbrTkn" | "memberToken"> & (T extends {
    mbrTkn: string;
} ? {
    mbrTkn?: string;
} : {
    memberToken?: string;
});

/**
 * A strong type for the canonical form of OtherSaleStateV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoOtherSaleStateV1 instead.
 * @public
 */
export declare interface OtherSaleStateV1 {
    progressDetails: /*minStructField*/ SaleProgressDetailsV1
    salePace: /*minStructField*/ number
    state: /*minStructField*/ MarketSaleState
}

/**
 * A strong type for the permissive form of OtherSaleStateV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface OtherSaleStateV1Like {
    progressDetails: /*minStructField*/ SaleProgressDetailsV1Like
    salePace: /*minStructField*/ number
    state: /*minStructField*/ MarketSaleStateLike
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type PendingCharterChange$Ergo$otherManifestChange = {
    activity: ErgoManifestActivity  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_2 = {
    activity: ErgoManifestActivity_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_2>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_3 = {
    activity: ErgoManifestActivity_3  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_3>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
export declare interface PendingCharterChange$otherManifestChange {
    activity: ManifestActivity  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange_2 {
    activity: ManifestActivity_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole_3>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface PendingCharterChange$otherManifestChangeLike {
    activity: ManifestActivityLike  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike_2 {
    activity: ManifestActivityLike_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike_2>  /*minVariantField*/ 
}

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type PendingCharterChange = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange /*minEnumVariant*/ }

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingCharterChange_2 = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange_2 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange_2, Partial<{
        delegateChange: PendingDelegateChangeLike_2;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike_2 | {
        action: PendingDelegateActionLike_2;
        role: DelegateRoleLike_2;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike_2 | {
        activity: ManifestActivityLike_2;
        remainingDelegateValidations: Array<DelegateRoleLike_2>;
    }): UplcData;
}

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type PendingCharterChangeLike = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike /*minEnumVariant*/ }
>

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingCharterChangeLike_2 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type PendingCharterChangeMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "PendingCharterChange"}, {
    delegateChange: singleEnumVariantMeta<PendingCharterChangeMeta, "delegateChange",
    "Constr#0", "singletonField", /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange   , "noSpecialFlags"
    >,
    otherManifestChange: singleEnumVariantMeta<PendingCharterChangeMeta, "otherManifestChange",
    "Constr#1", 
    "fields", PendingCharterChange$otherManifestChange, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
export declare interface PendingDelegateAction$Add {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface PendingDelegateAction$AddLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type PendingDelegateAction$Ergo$Add = PendingDelegateAction$Add

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_2 = PendingDelegateAction$Add_2

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_3 = PendingDelegateAction$Add_3

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type PendingDelegateAction$Ergo$Replace = PendingDelegateAction$Replace

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_2 = PendingDelegateAction$Replace_2

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_3 = PendingDelegateAction$Replace_3

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
export declare interface PendingDelegateAction$Replace {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface PendingDelegateAction$ReplaceLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type PendingDelegateAction = 
| { Add: PendingDelegateAction$Add /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace /*minEnumVariant*/ }

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingDelegateAction_2 = 
| { Add: PendingDelegateAction$Add_3 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace_3 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper extends EnumBridge<JustAnEnum> {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction_2, Partial<{
        Add: PendingDelegateAction$AddLike_2;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike_2;
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
    Add(fields: PendingDelegateAction$AddLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
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
    Replace(fields: PendingDelegateAction$ReplaceLike_2 | {
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
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type PendingDelegateActionLike = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike /*minEnumVariant*/ }
>

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingDelegateActionLike_2 = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike_2 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type PendingDelegateActionMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "PendingDelegateAction"}, {
    Add: singleEnumVariantMeta<PendingDelegateActionMeta, "Add",
    "Constr#0", 
    "fields", PendingDelegateAction$Add, "isSeededActivity"
    >,
    Remove: singleEnumVariantMeta<PendingDelegateActionMeta, "Remove",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Replace: singleEnumVariantMeta<PendingDelegateActionMeta, "Replace",
    "Constr#2", 
    "fields", PendingDelegateAction$Replace, "isSeededActivity"
    >
}
>;

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
export declare interface PendingDelegateChange {
    action: /*minStructField*/ PendingDelegateAction
    role: /*minStructField*/ DelegateRole
    dgtLink: /*minStructField*/ RelativeDelegateLink | undefined
}

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange_2 {
    action: /*minStructField*/ PendingDelegateAction_2
    role: /*minStructField*/ DelegateRole_3
    dgtLink: /*minStructField*/ RelativeDelegateLink_3 | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface PendingDelegateChangeLike {
    action: /*minStructField*/ PendingDelegateActionLike
    role: /*minStructField*/ DelegateRoleLike
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike_2 {
    action: /*minStructField*/ PendingDelegateActionLike_2
    role: /*minStructField*/ DelegateRoleLike_2
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined
}

/**
 * @public
 */
export declare type PurchaseContext = {
    prevSale: MarketSaleDataWrapper;
    now: Date;
    unitCount: bigint;
};

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
export declare interface RelativeDelegateLink {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_2 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_3 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface RelativeDelegateLinkLike {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike_2 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * @public
 */
export declare type requiredMemberToken<T extends {
    mbrTkn: string;
} | {
    memberToken: string;
} | {
    mbrTkn?: string;
} | {
    memberToken?: string;
}> = Omit<T, "mbrTkn" | "memberToken"> & (T extends {
    mbrTkn: string;
} ? {
    mbrTkn: string;
} : {
    memberToken: string;
});

/**
 * A strong type for the canonical form of SaleAssetsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoSaleAssetsV1 instead.
 * @public
 */
export declare interface SaleAssetsV1 {
    saleUnitAssets: /*minStructField*/ Value
    singleBuyMaxUnits: /*minStructField*/ bigint
    primaryAssetMph: /*minStructField*/ MintingPolicyHash
    primaryAssetName: /*minStructField*/ number[]
    primaryAssetTargetCount: /*minStructField*/ bigint
    totalSaleUnits: /*minStructField*/ bigint
}

/**
 * A strong type for the permissive form of SaleAssetsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface SaleAssetsV1Like {
    saleUnitAssets: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    singleBuyMaxUnits: /*minStructField*/ IntLike
    primaryAssetMph: /*minStructField*/ MintingPolicyHash | string | number[]
    primaryAssetName: /*minStructField*/ number[]
    primaryAssetTargetCount: /*minStructField*/ IntLike
    totalSaleUnits: /*minStructField*/ IntLike
}

/**
 * A strong type for the canonical form of SaleProgressDetailsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoSaleProgressDetailsV1 instead.
 * @public
 */
export declare interface SaleProgressDetailsV1 {
    lastPurchaseAt: /*minStructField*/ number
    prevPurchaseAt: /*minStructField*/ number
    chunkUnitCount: /*minStructField*/ bigint
    chunkUnitsSold: /*minStructField*/ bigint
}

/**
 * A strong type for the permissive form of SaleProgressDetailsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface SaleProgressDetailsV1Like {
    lastPurchaseAt: /*minStructField*/ TimeLike
    prevPurchaseAt: /*minStructField*/ TimeLike
    chunkUnitCount: /*minStructField*/ IntLike
    chunkUnitsSold: /*minStructField*/ IntLike
}

/**
 * A strong type for the canonical form of SpendingActivity$AddingToSale
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$AddingToSale instead.
 * @public
 */
export declare interface SpendingActivity$AddingToSale {
    id: number[]  /*minVariantField*/ ,
    mph: MintingPolicyHash  /*minVariantField*/ ,
    tn: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of SpendingActivity$AddingToSale
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface SpendingActivity$AddingToSaleLike {
    id: number[]  /*minVariantField*/ ,
    mph: MintingPolicyHash | string | number[]  /*minVariantField*/ ,
    tn: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$AddingToSale
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$AddingToSaleLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type SpendingActivity$Ergo$AddingToSale = SpendingActivity$AddingToSale

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$MergingChildChunk
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$MergingChildChunkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type SpendingActivity$Ergo$MergingChildChunk = SpendingActivity$MergingChildChunk

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$SellingTokens
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$SellingTokensLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type SpendingActivity$Ergo$SellingTokens = SpendingActivity$SellingTokens

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$Withdrawing
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$WithdrawingLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type SpendingActivity$Ergo$Withdrawing = SpendingActivity$Withdrawing

/**
 * A strong type for the canonical form of SpendingActivity$MergingChildChunk
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$MergingChildChunk instead.
 * @public
 */
export declare interface SpendingActivity$MergingChildChunk {
    id: number[]  /*minVariantField*/ ,
    childChunkId: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of SpendingActivity$MergingChildChunk
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface SpendingActivity$MergingChildChunkLike {
    id: number[]  /*minVariantField*/ ,
    childChunkId: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of SpendingActivity$SellingTokens
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$SellingTokens instead.
 * @public
 */
export declare interface SpendingActivity$SellingTokens {
    id: number[]  /*minVariantField*/ ,
    sellingUnitQuantity: bigint  /*minVariantField*/ ,
    salePrice: Value  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of SpendingActivity$SellingTokens
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface SpendingActivity$SellingTokensLike {
    id: number[]  /*minVariantField*/ ,
    sellingUnitQuantity: IntLike  /*minVariantField*/ ,
    salePrice: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of SpendingActivity$Withdrawing
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$Withdrawing instead.
 * @public
 */
declare interface SpendingActivity$Withdrawing {
    id: number[]  /*minVariantField*/ ,
    value: Value  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of SpendingActivity$Withdrawing
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SpendingActivity$WithdrawingLike {
    id: number[]  /*minVariantField*/ ,
    value: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ 
}

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **6 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type SpendingActivity = 
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { AddingToSale: SpendingActivity$AddingToSale /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SellingTokens: SpendingActivity$SellingTokens /*minEnumVariant*/ }
| { MergingChildChunk: SpendingActivity$MergingChildChunk /*minEnumVariant*/ }
| { Retiring: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SpendingActivity_2 = 
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SwitchToVerifying: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { VerifyingBeneficiary: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Withdrawing: SpendingActivity$Withdrawing /*minEnumVariant*/ }
| { Pausing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Resuming: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Closing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity, Partial<{
        UpdatingRecord: number[];
        AddingToSale: SpendingActivity$AddingToSaleLike;
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
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.Activating"***
     */
    Activating(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.SellingTokens"***
     * @remarks - ***SpendingActivity$SellingTokensLike*** is the same as the expanded field-types.
     */
    SellingTokens(fields: SpendingActivity$SellingTokensLike | {
        id: number[];
        sellingUnitQuantity: IntLike;
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
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_2, Partial<{
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
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity, Partial<{
        UpdatingRecord: number[];
        AddingToSale: SpendingActivity$AddingToSaleLike;
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
        sellingUnitQuantity: IntLike;
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
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_2, Partial<{
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
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **6 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type SpendingActivityLike = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { AddingToSale: SpendingActivity$AddingToSaleLike /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SellingTokens: SpendingActivity$SellingTokensLike /*minEnumVariant*/ }
| { MergingChildChunk: SpendingActivity$MergingChildChunkLike /*minEnumVariant*/ }
| { Retiring: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SpendingActivityLike_2 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { SwitchToVerifying: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { VerifyingBeneficiary: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Activating: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Withdrawing: SpendingActivity$WithdrawingLike /*minEnumVariant*/ }
| { Pausing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Resuming: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { Closing: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type SpendingActivityMeta = EnumTypeMeta<
    {module: "MarketSalePolicy", enumName: "SpendingActivity"}, {
    UpdatingRecord: singleEnumVariantMeta<SpendingActivityMeta, "UpdatingRecord",
    "Constr#0", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    AddingToSale: singleEnumVariantMeta<SpendingActivityMeta, "AddingToSale",
    "Constr#1", 
    "fields", SpendingActivity$AddingToSale, "noSpecialFlags"
    >,
    Activating: singleEnumVariantMeta<SpendingActivityMeta, "Activating",
    "Constr#2", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    SellingTokens: singleEnumVariantMeta<SpendingActivityMeta, "SellingTokens",
    "Constr#3", 
    "fields", SpendingActivity$SellingTokens, "noSpecialFlags"
    >,
    MergingChildChunk: singleEnumVariantMeta<SpendingActivityMeta, "MergingChildChunk",
    "Constr#4", 
    "fields", SpendingActivity$MergingChildChunk, "noSpecialFlags"
    >,
    Retiring: singleEnumVariantMeta<SpendingActivityMeta, "Retiring",
    "Constr#5", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >
}
>;

/**
 * @public
 */
export declare abstract class StellarTokenomicsCapo<SELF extends StellarTokenomicsCapo<any, any>, //= StellarTokenomics<any>
F extends CapoFeatureFlags = GenericTokenomicsFeatureFlags> extends Capo<SELF, F> {
    static get defaultParams(): {
        rev: bigint;
    };
    getMintDelegate(charterData?: CapoDatum$Ergo$CharterData_2): Promise<STokMintDelegate>;
    getMarketSaleController(this: SELF, charterData?: CapoDatum$Ergo$CharterData_2): Promise<MarketSaleController>;
    mkUutName(purpose: string, txin: TxInput): UutName;
    /**
     * Finds the user's member token and adds it to the transaction context
     * @remarks
     * Includes a seed-utxo in the transaction context for use in any aspect
     * of the transaction that may need it (i.e. minting a discount token or ?)
     */
    mkTxnWithMemberInfo<TCX extends StellarTxnContext = StellarTxnContext>(skipReturningToken?: "skipTokenReturn", tcx?: TCX): Promise<TCX & hasMemberToken>;
    mustFindMemberInfo(): Promise<FoundUut>;
    findMemberInfo(): Promise<FoundUut | undefined>;
    txnAddMemberToken<TCX extends StellarTxnContext>(tcx: TCX, memberInfo?: FoundUut, skipReturningToken?: "skipTokenReturn"): Promise<TCX & hasMemberToken & hasSeedUtxo>;
    /**
     * Creates a transaction minting a collaborator token
     * @remarks
     *
     * Sends the collaborator token to the provided address
     * @param address - recipient of the collaborator token
     * @public
     **/
    mkTxnMintParticipantToken(addr: Address): Promise<hasUutContext<"member"> & StellarTxnContext<anyState> & hasSeedUtxo>;
    txnMintingFungibleTokens<TCX extends StellarTxnContext>(tcx: TCX, tokenName: string | number[], tokenCount: bigint): Promise<TCX & hasCharterRef & hasGovAuthority>;
    requirements(): any;
}

/**
 * @public
 */
declare const stmdbBase: ConcreteCapoDelegateBundle;

/**
 * Base class for mint/spend delegates
 * @public
 */
export declare class STokMintDelegate extends BasicMintDelegate {
    get delegateName(): string;
    constructor(...args: any[]);
    scriptBundleClass(): Promise<any>;
}

/**
 * A specialized minting delegate for testing purposes
 * @public
 */
declare class STokMintDelegateBundle extends stmdbBase {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get delegateName(): string;
}

/**
 * A strong type for the canonical form of ThreadInfoV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoThreadInfoV1 instead.
 * @public
 */
export declare interface ThreadInfoV1 {
    nestedThreads: /*minStructField*/ bigint
    retiredThreads: /*minStructField*/ bigint
    parentChunkId: /*minStructField*/ number[]
    chunkForkedAt: /*minStructField*/ number
    saleId: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of ThreadInfoV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface ThreadInfoV1Like {
    nestedThreads: /*minStructField*/ IntLike
    retiredThreads: /*minStructField*/ IntLike
    parentChunkId: /*minStructField*/ number[]
    chunkForkedAt: /*minStructField*/ TimeLike
    saleId: /*minStructField*/ number[]
}

/**
 * @public
 */
export declare type TimeLike = IntLike;

/**
 * @public
 */
declare type TimeLike_2 = IntLike;

/**
 * @public
 */
declare type TimeLike_3 = IntLike;

/**
 * @public
 */
declare type TimeLike_4 = IntLike;

/**
 * @public
 */
export declare class VestingController extends DelegatedDataContract<VestingData, VestingDataLike> {
    dataBridgeClass: typeof VestingPolicyDataBridge;
    scriptBundleClass(): Promise<ConcreteCapoDelegateBundle>;
    idPrefix: string;
    get delegateName(): string;
    get recordTypeName(): string;
    exampleData(): minimalVestingData;
    mkTxnCreatingVesting(this: VestingController, recData: minimalVestingData): Promise<hasUutContext<string> & StellarTxnContext<anyState> & hasCharterRef & hasSeedUtxo & hasUutContext<"recordId" | "‹idPrefix (hint: declare with 'idPrefix = \"...\" as const')›">>;
    requirements(): ReqtsMap<never, never>;
}

/**
 * A strong type for the canonical form of VestingData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoVestingData instead.
 * @public
 */
export declare interface VestingData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    ownerToken: /*minStructField*/ number[]
    beneficiary: /*minStructField*/ VxfDestination_2
    state: /*minStructField*/ VestingState
    vestingDetails: /*minStructField*/ VestingDetails
}

/**
 * A strong type for the permissive form of VestingData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface VestingDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    ownerToken: /*minStructField*/ number[]
    beneficiary: /*minStructField*/ VxfDestinationLike_2
    state: /*minStructField*/ VestingStateLike
    vestingDetails: /*minStructField*/ VestingDetailsLike
}

/**
 * An ergonomic, though less strictly-safe form of VestingDetails$Once
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingDetails$OnceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingDetails$Ergo$Once = VestingDetails$Once

/**
 * An ergonomic, though less strictly-safe form of VestingDetails$SimpleContingency
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingDetails$SimpleContingencyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingDetails$Ergo$SimpleContingency = VestingDetails$SimpleContingency

/**
 * An ergonomic, though less strictly-safe form of VestingDetails$StraightLine
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingDetails$StraightLineLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingDetails$Ergo$StraightLine = {
    totalValue: Value  /*minVariantField*/ ,
    fullMaturity: number  /*minVariantField*/ ,
    vestingStart: number  /*minVariantField*/ ,
    frequency: ErgoVestingFrequency  /*minVariantField*/ ,
    vestingProgress: ErgoVestingProgress  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VestingDetails$Once
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingDetails$Ergo$Once instead.
 * @public
 */
declare interface VestingDetails$Once {
    totalValue: Value  /*minVariantField*/ ,
    fullMaturity: number  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingDetails$Once
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingDetails$OnceLike {
    totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ ,
    fullMaturity: TimeLike_3  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VestingDetails$SimpleContingency
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingDetails$Ergo$SimpleContingency instead.
 * @public
 */
declare interface VestingDetails$SimpleContingency {
    totalValue: Value  /*minVariantField*/ ,
    fullMaturity: number | undefined  /*minVariantField*/ ,
    contingencyDescription: string  /*minVariantField*/ ,
    usesReqts: boolean  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingDetails$SimpleContingency
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingDetails$SimpleContingencyLike {
    totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ ,
    fullMaturity: TimeLike_3 | undefined  /*minVariantField*/ ,
    contingencyDescription: string  /*minVariantField*/ ,
    usesReqts: boolean  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VestingDetails$StraightLine
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingDetails$Ergo$StraightLine instead.
 * @public
 */
declare interface VestingDetails$StraightLine {
    totalValue: Value  /*minVariantField*/ ,
    fullMaturity: number  /*minVariantField*/ ,
    vestingStart: number  /*minVariantField*/ ,
    frequency: VestingFrequency  /*minVariantField*/ ,
    vestingProgress: VestingProgress  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingDetails$StraightLine
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingDetails$StraightLineLike {
    totalValue: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ ,
    fullMaturity: TimeLike_3  /*minVariantField*/ ,
    vestingStart: TimeLike_3  /*minVariantField*/ ,
    frequency: VestingFrequencyLike  /*minVariantField*/ ,
    vestingProgress: VestingProgressLike  /*minVariantField*/ 
}

/**
 * VestingDetails enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the VestingDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingDetailsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type VestingDetails = 
| { Once: VestingDetails$Once /*minEnumVariant*/ }
| { StraightLine: VestingDetails$StraightLine /*minEnumVariant*/ }
| { SimpleContingency: VestingDetails$SimpleContingency /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***VestingDetails*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VestingDetailsHelper extends EnumBridge<JustAnEnum> {
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
        fullMaturity: TimeLike_4;
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
        fullMaturity: TimeLike_4;
        vestingStart: TimeLike_4;
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
        fullMaturity: TimeLike_4 | undefined;
        contingencyDescription: string;
        usesReqts: boolean;
    }): UplcData;
}

/**
 * VestingDetails enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the VestingDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingDetailsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type VestingDetailsLike = IntersectedEnum<
| { Once: VestingDetails$OnceLike /*minEnumVariant*/ }
| { StraightLine: VestingDetails$StraightLineLike /*minEnumVariant*/ }
| { SimpleContingency: VestingDetails$SimpleContingencyLike /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of VestingFrequency$Interval
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingFrequency$IntervalLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingFrequency$Ergo$Interval = VestingFrequency$Interval

/**
 * A strong type for the canonical form of VestingFrequency$Interval
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingFrequency$Ergo$Interval instead.
 * @public
 */
declare interface VestingFrequency$Interval {
    interval: bigint  /*minVariantField*/ ,
    count: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingFrequency$Interval
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingFrequency$IntervalLike {
    interval: IntLike  /*minVariantField*/ ,
    count: IntLike  /*minVariantField*/ 
}

/**
 * VestingFrequency enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the VestingFrequency enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingFrequencyHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type VestingFrequency = 
| { Interval: VestingFrequency$Interval /*minEnumVariant*/ }
| { Continuous: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***VestingFrequency*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VestingFrequencyHelper extends EnumBridge<JustAnEnum> {
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
 * VestingFrequency enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the VestingFrequency enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingFrequencyHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type VestingFrequencyLike = IntersectedEnum<
| { Interval: VestingFrequency$IntervalLike /*minEnumVariant*/ }
| { Continuous: tagOnly /*minEnumVariant*/ }
>

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
declare class VestingPolicyDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper_2;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper_2;
    readDatum: (d: UplcData) => ErgoDelegateDatum_2;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper_2;
    DelegateActivity: DelegateActivityHelper_2;
    reader: VestingPolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***VxfExpectedActivity*** for the `BasicDelegate` script
         */
        VxfExpectedActivity: VxfExpectedActivityHelper_2;
        /**
         * generates UplcData for the enum type ***VxfDestination*** for the `BasicDelegate` script
         */
        VxfDestination: VxfDestinationHelper_2;
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
        DelegateDatum: DelegateDatumHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper_2;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper_2;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper_2;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper_2;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper_2;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper_2;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper_2;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper_2;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper_2;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper_2;
        /**
         * generates UplcData for the enum type ***dgd_DataSrc*** for the `BasicDelegate` script
         */
        dgd_DataSrc: dgd_DataSrcHelper_2;
        /**
         * generates UplcData for the enum type ***AbstractDelegateActivitiesEnum*** for the `BasicDelegate` script
         */
        AbstractDelegateActivitiesEnum: AbstractDelegateActivitiesEnumHelper_2;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike_2 | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike_2 | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike_2 | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***VestingProgress*** for the `BasicDelegate` script
         */
        VestingProgress: (fields: VestingProgressLike | {
            lastPartialMaturity: TimeLike_4;
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
            beneficiary: VxfDestinationLike_2;
            state: VestingStateLike;
            vestingDetails: VestingDetailsLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike_2 | {
            action: PendingDelegateActionLike_2;
            role: DelegateRoleLike_2;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike_2 | {
            entryType: ManifestEntryTypeLike_2;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike_2 | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike_2;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DgDataDetails*** for the `BasicDelegate` script
         */
        DgDataDetails: (fields: DgDataDetailsLike_2 | {
            dataSrc: dgd_DataSrcLike_2;
            id: number[];
            type: string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike_2 | undefined;
        }) => UplcData;
    };
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData_2, AnyDataLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail_2, DelegationDetailLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_3, RelativeDelegateLinkLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺVestingProgressCast: Cast<VestingProgress, VestingProgressLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺVestingDataCast: Cast<VestingData, VestingDataLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange_2, PendingDelegateChangeLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry_2, CapoManifestEntryLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx_2, CapoCtxLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDgDataDetailsCast: Cast<DgDataDetails_2, DgDataDetailsLike_2>;
}

/**
 * @public
 */
declare class VestingPolicyDataBridgeReader extends DataBridgeReaderClass {
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
    VxfExpectedActivity(d: UplcData): ErgoVxfExpectedActivity_2;
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
    VxfDestination(d: UplcData): ErgoVxfDestination_2;
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
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_2;
        IsDelegation: ErgoDelegationDetail_2;
        capoStoredData: DelegateDatum$Ergo$capoStoredData_2;
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
    DelegateDatum(d: UplcData): ErgoDelegateDatum_2;
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
    DelegateRole(d: UplcData): ErgoDelegateRole_3;
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
    ManifestActivity(d: UplcData): ErgoManifestActivity_3;
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
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity_2;
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
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity_2;
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
    SpendingActivity(d: UplcData): ErgoSpendingActivity_2;
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
    MintingActivity(d: UplcData): ErgoMintingActivity_2;
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
    BurningActivity(d: UplcData): ErgoBurningActivity_2;
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
    DelegateActivity(d: UplcData): ErgoDelegateActivity_2;
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
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_3;
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
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_3;
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
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_3;
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
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType_2;
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
    dgd_DataSrc(d: UplcData): Ergodgd_DataSrc_2;
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
    AbstractDelegateActivitiesEnum(d: UplcData): ErgoAbstractDelegateActivitiesEnum_2;
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
    AnyData(d: UplcData): AnyData_2;
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
    DelegationDetail(d: UplcData): DelegationDetail_2;
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
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_3;
    /**
     * reads UplcData *known to fit the **VestingProgress*** struct type,
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
    VestingProgress(d: UplcData): VestingProgress;
    /**
     * reads UplcData *known to fit the **VestingData*** struct type,
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
    VestingData(d: UplcData): VestingData;
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
    PendingDelegateChange(d: UplcData): PendingDelegateChange_2;
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
    CapoManifestEntry(d: UplcData): CapoManifestEntry_2;
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
    CapoCtx(d: UplcData): CapoCtx_2;
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
    DgDataDetails(d: UplcData): DgDataDetails_2;
}

/**
 * A strong type for the canonical form of VestingProgress
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoVestingProgress instead.
 * @public
 */
declare interface VestingProgress {
    lastPartialMaturity: /*minStructField*/ number
    vestedValue: /*minStructField*/ Value
    vestedFreqUnits: /*minStructField*/ number
}

/**
 * A strong type for the permissive form of VestingProgress
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingProgressLike {
    lastPartialMaturity: /*minStructField*/ TimeLike_3
    vestedValue: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    vestedFreqUnits: /*minStructField*/ number
}

/**
 * A strong type for the canonical form of VestingState$Closed
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingState$Ergo$Closed instead.
 * @public
 */
declare interface VestingState$Closed {
    reason: string  /*minVariantField*/ ,
    infoRef: AssetClass | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingState$Closed
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingState$ClosedLike {
    reason: string  /*minVariantField*/ ,
    infoRef: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]} | undefined  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of VestingState$Closed
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingState$ClosedLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingState$Ergo$Closed = VestingState$Closed

/**
 * An ergonomic, though less strictly-safe form of VestingState$Paused
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VestingState$PausedLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VestingState$Ergo$Paused = VestingState$Paused

/**
 * A strong type for the canonical form of VestingState$Paused
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VestingState$Ergo$Paused instead.
 * @public
 */
declare interface VestingState$Paused {
    reason: string  /*minVariantField*/ ,
    infoRef: AssetClass | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VestingState$Paused
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VestingState$PausedLike {
    reason: string  /*minVariantField*/ ,
    infoRef: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]} | undefined  /*minVariantField*/ 
}

/**
 * VestingState enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the VestingState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingStateHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type VestingState = 
| { Initializing: tagOnly /*minEnumVariant*/ }
| { VerifyingBeneficiary: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { Paused: VestingState$Paused /*minEnumVariant*/ }
| { Closed: VestingState$Closed /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***VestingState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VestingStateHelper extends EnumBridge<JustAnEnum> {
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
 * VestingState enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the VestingState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VestingStateHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type VestingStateLike = IntersectedEnum<
| { Initializing: tagOnly /*minEnumVariant*/ }
| { VerifyingBeneficiary: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { Paused: VestingState$PausedLike /*minEnumVariant*/ }
| { Closed: VestingState$ClosedLike /*minEnumVariant*/ }
>

/**
 * A strong type for the canonical form of VxfDestination$AnyTokenHolder
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$AnyTokenHolder instead.
 * @public
 */
export declare interface VxfDestination$AnyTokenHolder {
    mph: MintingPolicyHash  /*minVariantField*/ ,
    assetName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfDestination$AnyTokenHolder
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$AnyTokenHolder instead.
 * @public
 */
declare interface VxfDestination$AnyTokenHolder_2 {
    mph: MintingPolicyHash  /*minVariantField*/ ,
    assetName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfDestination$AnyTokenHolder
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface VxfDestination$AnyTokenHolderLike {
    mph: MintingPolicyHash | string | number[]  /*minVariantField*/ ,
    assetName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfDestination$AnyTokenHolder
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfDestination$AnyTokenHolderLike_2 {
    mph: MintingPolicyHash | string | number[]  /*minVariantField*/ ,
    assetName: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of VxfDestination$AnyTokenHolder
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfDestination$AnyTokenHolderLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type VxfDestination$Ergo$AnyTokenHolder = VxfDestination$AnyTokenHolder

/**
 * An ergonomic, though less strictly-safe form of VxfDestination$AnyTokenHolder
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfDestination$AnyTokenHolderLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfDestination$Ergo$AnyTokenHolder_2 = VxfDestination$AnyTokenHolder_2

/**
 * An ergonomic, though less strictly-safe form of VxfDestination$RelativeLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfDestination$RelativeLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type VxfDestination$Ergo$RelativeLink = {
    link: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    vxfActivity: ErgoVxfExpectedActivity | undefined  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of VxfDestination$RelativeLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfDestination$RelativeLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfDestination$Ergo$RelativeLink_2 = {
    link: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    vxfActivity: ErgoVxfExpectedActivity_2 | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfDestination$RelativeLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$RelativeLink instead.
 * @public
 */
export declare interface VxfDestination$RelativeLink {
    link: RelativeDelegateLink  /*minVariantField*/ ,
    vxfActivity: VxfExpectedActivity | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfDestination$RelativeLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$RelativeLink instead.
 * @public
 */
declare interface VxfDestination$RelativeLink_2 {
    link: RelativeDelegateLink_3  /*minVariantField*/ ,
    vxfActivity: VxfExpectedActivity_2 | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfDestination$RelativeLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface VxfDestination$RelativeLinkLike {
    link: RelativeDelegateLinkLike  /*minVariantField*/ ,
    vxfActivity: VxfExpectedActivityLike | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfDestination$RelativeLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfDestination$RelativeLinkLike_2 {
    link: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    vxfActivity: VxfExpectedActivityLike_2 | undefined  /*minVariantField*/ 
}

/**
 * VxfDestination enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the VxfDestination enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfDestinationHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type VxfDestination = 
| { RelativeLink: VxfDestination$RelativeLink /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$AnyTokenHolder /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }

/**
 * VxfDestination enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the VxfDestination enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfDestinationHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type VxfDestination_2 = 
| { RelativeLink: VxfDestination$RelativeLink_2 /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$AnyTokenHolder_2 /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***VxfDestination*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VxfDestinationHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***VxfDestination*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VxfDestinationHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VxfDestination_2, Partial<{
        RelativeLink: VxfDestination$RelativeLinkLike_2;
        AnyTokenHolder: VxfDestination$AnyTokenHolderLike_2;
        PubKey: PubKeyHash | string | number[];
        Anywhere: tagOnly;
        NotYetDefined: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfDestination.RelativeLink"***
     * @remarks - ***VxfDestination$RelativeLinkLike*** is the same as the expanded field-types.
     */
    RelativeLink(fields: VxfDestination$RelativeLinkLike_2 | {
        link: RelativeDelegateLinkLike_2;
        vxfActivity: {
            VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
        } | {
            VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
        } | {
            SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike_2;
        } | {
            TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike_2;
        } | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfDestination.AnyTokenHolder"***
     * @remarks - ***VxfDestination$AnyTokenHolderLike*** is the same as the expanded field-types.
     */
    AnyTokenHolder(fields: VxfDestination$AnyTokenHolderLike_2 | {
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
 * VxfDestination enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the VxfDestination enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfDestinationHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type VxfDestinationLike = IntersectedEnum<
| { RelativeLink: VxfDestination$RelativeLinkLike /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$AnyTokenHolderLike /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash | string | number[]    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }
>

/**
 * VxfDestination enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the VxfDestination enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfDestinationHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type VxfDestinationLike_2 = IntersectedEnum<
| { RelativeLink: VxfDestination$RelativeLinkLike_2 /*minEnumVariant*/ }
| { AnyTokenHolder: VxfDestination$AnyTokenHolderLike_2 /*minEnumVariant*/ }
| { PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash | string | number[]    /*minEnumVariant*/ }
| { Anywhere: tagOnly /*minEnumVariant*/ }
| { NotYetDefined: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type VxfDestinationMeta = EnumTypeMeta<
    {module: "VxfProtocol", enumName: "VxfDestination"}, {
    RelativeLink: singleEnumVariantMeta<VxfDestinationMeta, "RelativeLink",
    "Constr#0", 
    "fields", VxfDestination$RelativeLink, "noSpecialFlags"
    >,
    AnyTokenHolder: singleEnumVariantMeta<VxfDestinationMeta, "AnyTokenHolder",
    "Constr#1", 
    "fields", VxfDestination$AnyTokenHolder, "noSpecialFlags"
    >,
    PubKey: singleEnumVariantMeta<VxfDestinationMeta, "PubKey",
    "Constr#2", "singletonField", /* implied wrapper { pkh: ... } for singleVariantField */ 
    			PubKeyHash   , "noSpecialFlags"
    >,
    Anywhere: singleEnumVariantMeta<VxfDestinationMeta, "Anywhere",
    "Constr#98", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    NotYetDefined: singleEnumVariantMeta<VxfDestinationMeta, "NotYetDefined",
    "Constr#99", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$SpecificRedeemerIdLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type VxfExpectedActivity$Ergo$SpecificRedeemerId = VxfExpectedActivity$SpecificRedeemerId

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$SpecificRedeemerIdLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfExpectedActivity$Ergo$SpecificRedeemerId_2 = VxfExpectedActivity$SpecificRedeemerId_2

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$TaggedRedeemerLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type VxfExpectedActivity$Ergo$TaggedRedeemer = VxfExpectedActivity$TaggedRedeemer

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$TaggedRedeemerLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfExpectedActivity$Ergo$TaggedRedeemer_2 = VxfExpectedActivity$TaggedRedeemer_2

/**
 * A strong type for the canonical form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$SpecificRedeemerId instead.
 * @public
 */
export declare interface VxfExpectedActivity$SpecificRedeemerId {
    id: bigint  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    nestedListRedeemerId: bigint | undefined  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$SpecificRedeemerId instead.
 * @public
 */
declare interface VxfExpectedActivity$SpecificRedeemerId_2 {
    id: bigint  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    nestedListRedeemerId: bigint | undefined  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface VxfExpectedActivity$SpecificRedeemerIdLike {
    id: IntLike  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    nestedListRedeemerId: IntLike | undefined  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfExpectedActivity$SpecificRedeemerIdLike_2 {
    id: IntLike  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    nestedListRedeemerId: IntLike | undefined  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$TaggedRedeemer instead.
 * @public
 */
export declare interface VxfExpectedActivity$TaggedRedeemer {
    firstFieldConstrTag: bigint  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$TaggedRedeemer instead.
 * @public
 */
declare interface VxfExpectedActivity$TaggedRedeemer_2 {
    firstFieldConstrTag: bigint  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
export declare interface VxfExpectedActivity$TaggedRedeemerLike {
    firstFieldConstrTag: IntLike  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfExpectedActivity$TaggedRedeemerLike_2 {
    firstFieldConstrTag: IntLike  /*minVariantField*/ ,
    inNestedList: boolean  /*minVariantField*/ ,
    appData: UplcData | undefined  /*minVariantField*/ 
}

/**
 * VxfExpectedActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the VxfExpectedActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfExpectedActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
export declare type VxfExpectedActivity = 
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerId /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$TaggedRedeemer /*minEnumVariant*/ }

/**
 * VxfExpectedActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the VxfExpectedActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfExpectedActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type VxfExpectedActivity_2 = 
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerId_2 /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$TaggedRedeemer_2 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***VxfExpectedActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VxfExpectedActivityHelper extends EnumBridge<JustAnEnum> {
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
 * Helper class for generating UplcData for variants of the ***VxfExpectedActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class VxfExpectedActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<VxfExpectedActivity_2, Partial<{
        VxfTransfer: UplcData | undefined;
        VxfStorage: UplcData | undefined;
        SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike_2;
        TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike_2;
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
    SpecificRedeemerId(fields: VxfExpectedActivity$SpecificRedeemerIdLike_2 | {
        id: IntLike;
        inNestedList: boolean;
        nestedListRedeemerId: IntLike | undefined;
        appData: UplcData | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.TaggedRedeemer"***
     * @remarks - ***VxfExpectedActivity$TaggedRedeemerLike*** is the same as the expanded field-types.
     */
    TaggedRedeemer(fields: VxfExpectedActivity$TaggedRedeemerLike_2 | {
        firstFieldConstrTag: IntLike;
        inNestedList: boolean;
        appData: UplcData | undefined;
    }): UplcData;
}

/**
 * VxfExpectedActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the VxfExpectedActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfExpectedActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
export declare type VxfExpectedActivityLike = IntersectedEnum<
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike /*minEnumVariant*/ }
>

/**
 * VxfExpectedActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the VxfExpectedActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `VxfExpectedActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type VxfExpectedActivityLike_2 = IntersectedEnum<
| { VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined    /*minEnumVariant*/ }
| { SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike_2 /*minEnumVariant*/ }
| { TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
export declare type VxfExpectedActivityMeta = EnumTypeMeta<
    {module: "VxfProtocol", enumName: "VxfExpectedActivity"}, {
    VxfTransfer: singleEnumVariantMeta<VxfExpectedActivityMeta, "VxfTransfer",
    "Constr#22104", "singletonField", /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined   , "noSpecialFlags"
    >,
    VxfStorage: singleEnumVariantMeta<VxfExpectedActivityMeta, "VxfStorage",
    "Constr#22106", "singletonField", /* implied wrapper { appData: ... } for singleVariantField */ 
    			UplcData | undefined   , "noSpecialFlags"
    >,
    SpecificRedeemerId: singleEnumVariantMeta<VxfExpectedActivityMeta, "SpecificRedeemerId",
    "Constr#22107", 
    "fields", VxfExpectedActivity$SpecificRedeemerId, "noSpecialFlags"
    >,
    TaggedRedeemer: singleEnumVariantMeta<VxfExpectedActivityMeta, "TaggedRedeemer",
    "Constr#22108", 
    "fields", VxfExpectedActivity$TaggedRedeemer, "noSpecialFlags"
    >
}
>;

export { }
