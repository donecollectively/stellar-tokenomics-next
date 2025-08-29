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
import { DelegatedDataBundle } from '@donecollectively/stellar-contracts';
import { EnumBridge } from '@donecollectively/stellar-contracts';
import type { FoundDatumUtxo } from '@donecollectively/stellar-contracts';
import type { FoundUut } from '@donecollectively/stellar-contracts';
import { hasCharterRef } from '@donecollectively/stellar-contracts';
import { hasGovAuthority } from '@donecollectively/stellar-contracts';
import { hasSeed } from '@donecollectively/stellar-contracts';
import type { hasSeedUtxo } from '@donecollectively/stellar-contracts';
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
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_2, Partial<{
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
declare interface AnyData {
    id: number[];
    type: string;
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike {
    id: number[];
    type: string;
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
declare type BurningActivity$Ergo$JoiningWithParentChunk = BurningActivity$JoiningWithParentChunk;

/**
 * A strong type for the canonical form of BurningActivity$JoiningWithParentChunk
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see BurningActivity$Ergo$JoiningWithParentChunk instead.
 * @public
 */
declare interface BurningActivity$JoiningWithParentChunk {
    id: string;
    parentChunkId: string;
}

/**
 * A strong type for the permissive form of BurningActivity$JoiningWithParentChunk
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface BurningActivity$JoiningWithParentChunkLike {
    id: string;
    parentChunkId: string;
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
declare type BurningActivity = {
    DeletingRecord: number[];
} | {
    JoiningWithParentChunk: BurningActivity$JoiningWithParentChunk;
} | {
    CleanupRetired: string;
};

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
declare type BurningActivityLike = IntersectedEnum<{
    DeletingRecord: number[];
} | {
    JoiningWithParentChunk: BurningActivity$JoiningWithParentChunkLike;
} | {
    CleanupRetired: string;
}>;

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx {
    mph: MintingPolicyHash;
    charter: cctx_CharterInputType;
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike {
    mph: /*minStructField*/ MintingPolicyHash | string | number[];
    charter: cctx_CharterInputTypeLike;
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData {
    spendDelegateLink: RelativeDelegateLink_2;
    spendInvariants: Array<RelativeDelegateLink_2>;
    otherNamedDelegates: Map<string, RelativeDelegateLink_2>;
    mintDelegateLink: RelativeDelegateLink_2;
    mintInvariants: Array<RelativeDelegateLink_2>;
    govAuthorityLink: RelativeDelegateLink_2;
    manifest: Map<string, CapoManifestEntry>;
    pendingChanges: Array<PendingCharterChange>;
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike {
    spendDelegateLink: RelativeDelegateLinkLike;
    spendInvariants: Array<RelativeDelegateLinkLike>;
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike>;
    mintDelegateLink: RelativeDelegateLinkLike;
    mintInvariants: Array<RelativeDelegateLinkLike>;
    govAuthorityLink: RelativeDelegateLinkLike;
    manifest: Map<string, CapoManifestEntryLike>;
    pendingChanges: Array<PendingCharterChangeLike>;
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
declare type CapoDatum$Ergo$CharterData = {
    spendDelegateLink: ErgoRelativeDelegateLink;
    spendInvariants: Array<ErgoRelativeDelegateLink>;
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink>;
    mintDelegateLink: ErgoRelativeDelegateLink;
    mintInvariants: Array<ErgoRelativeDelegateLink>;
    govAuthorityLink: ErgoRelativeDelegateLink;
    manifest: Map<string, ErgoCapoManifestEntry>;
    pendingChanges: Array<ErgoPendingCharterChange>;
};

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
    spendDelegateLink: ErgoRelativeDelegateLink_2;
    spendInvariants: Array<ErgoRelativeDelegateLink_2>;
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_2>;
    mintDelegateLink: ErgoRelativeDelegateLink_2;
    mintInvariants: Array<ErgoRelativeDelegateLink_2>;
    govAuthorityLink: ErgoRelativeDelegateLink_2;
    manifest: Map<string, ErgoCapoManifestEntry_2>;
    pendingChanges: Array<ErgoPendingCharterChange_2>;
};

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate {
    seed: TxOutputId;
    purpose: string;
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike {
    seed: TxOutputId | string;
    purpose: string;
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
declare type CapoLifecycleActivity$Ergo$CreatingDelegate = CapoLifecycleActivity$CreatingDelegate;

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate = CapoLifecycleActivity$forcingNewMintDelegate;

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate = CapoLifecycleActivity$forcingNewSpendDelegate;

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate {
    seed: TxOutputId;
    purpose: string;
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike {
    seed: TxOutputId | string;
    purpose: string;
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate {
    seed: TxOutputId;
    purpose: string;
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike {
    seed: TxOutputId | string;
    purpose: string;
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
declare type CapoLifecycleActivity = {
    CreatingDelegate: CapoLifecycleActivity$CreatingDelegate;
} | {
    queuePendingChange: tagOnly;
} | {
    removePendingChange: DelegateRole_2;
} | {
    commitPendingChanges: tagOnly;
} | {
    forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate;
} | {
    forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate;
} | {
    updatingManifest: ManifestActivity;
};

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
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): DelegateRoleHelperNested;
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
declare type CapoLifecycleActivityLike = IntersectedEnum<{
    CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike;
} | {
    queuePendingChange: tagOnly;
} | {
    removePendingChange: DelegateRoleLike;
} | {
    commitPendingChanges: tagOnly;
} | {
    forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike;
} | {
    forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike;
} | {
    updatingManifest: ManifestActivityLike;
}>;

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry {
    entryType: ManifestEntryType;
    tokenName: number[];
    mph: /*minStructField*/ MintingPolicyHash | undefined;
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike {
    entryType: ManifestEntryTypeLike;
    tokenName: number[];
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
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
declare type cctx_CharterInputType$Ergo$Input = {
    datum: CapoDatum$Ergo$CharterData_2;
    utxo: TxInput;
};

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput = {
    datum: CapoDatum$Ergo$CharterData_2;
    utxo: TxInput;
};

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input {
    datum: CapoDatum$CharterData;
    utxo: TxInput;
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike {
    datum: CapoDatum$CharterDataLike;
    utxo: TxInput;
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput {
    datum: CapoDatum$CharterData;
    utxo: TxInput;
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike {
    datum: CapoDatum$CharterDataLike;
    utxo: TxInput;
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
declare type cctx_CharterInputType = {
    Unk: tagOnly;
} | {
    RefInput: cctx_CharterInputType$RefInput;
} | {
    Input: cctx_CharterInputType$Input;
};

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
declare type cctx_CharterInputTypeLike = IntersectedEnum<{
    Unk: tagOnly;
} | {
    RefInput: cctx_CharterInputType$RefInputLike;
} | {
    Input: cctx_CharterInputType$InputLike;
}>;

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
declare interface DelegateActivity$CreatingDelegatedData {
    seed: TxOutputId;
    dataType: string;
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike {
    seed: TxOutputId | string;
    dataType: string;
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData {
    dataType: string;
    recId: number[];
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike {
    dataType: string;
    recId: number[];
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
declare type DelegateActivity$Ergo$CreatingDelegatedData = DelegateActivity$CreatingDelegatedData;

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData = DelegateActivity$DeletingDelegatedData;

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData = DelegateActivity$UpdatingDelegatedData;

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData {
    dataType: string;
    recId: number[];
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike {
    dataType: string;
    recId: number[];
}

/**
 * DelegateActivity enum variants
 *
 * @remarks - expresses the essential raw data structures
 * supporting the **9 variant(s)** of the DelegateActivity enum type
 *
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity = {
    CapoLifecycleActivities: CapoLifecycleActivity;
} | {
    DelegateLifecycleActivities: DelegateLifecycleActivity;
} | {
    SpendingActivities: SpendingActivity;
} | {
    MintingActivities: MintingActivity;
} | {
    BurningActivities: BurningActivity;
} | {
    CreatingDelegatedData: DelegateActivity$CreatingDelegatedData;
} | {
    UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData;
} | {
    DeletingDelegatedData: DelegateActivity$DeletingDelegatedData;
} | {
    MultipleDelegateActivities: Array<UplcData>;
};

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
}

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData {
    data: MarketSaleData;
    version: bigint;
    otherDetails: UplcData;
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike {
    data: MarketSaleDataLike;
    version: IntLike;
    otherDetails: UplcData;
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken {
    cip68meta: AnyData;
    cip68version: bigint;
    otherDetails: UplcData;
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike {
    cip68meta: AnyDataLike;
    cip68version: IntLike;
    otherDetails: UplcData;
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
declare type DelegateDatum$Ergo$capoStoredData = {
    data: ErgoMarketSaleData;
    version: bigint;
    otherDetails: UplcData;
};

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken = {
    cip68meta: ErgoAnyData;
    cip68version: bigint;
    otherDetails: UplcData;
};

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
declare type DelegateDatum = {
    Cip68RefToken: DelegateDatum$Cip68RefToken;
} | {
    IsDelegation: DelegationDetail;
} | {
    capoStoredData: DelegateDatum$capoStoredData;
};

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
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe = DelegateLifecycleActivity$ReplacingMe;

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe {
    seed: TxOutputId;
    purpose: string;
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike {
    seed: TxOutputId | string;
    purpose: string;
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
declare type DelegateLifecycleActivity = {
    ReplacingMe: DelegateLifecycleActivity$ReplacingMe;
} | {
    Retiring: tagOnly;
} | {
    ValidatingSettings: tagOnly;
};

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
declare type DelegateLifecycleActivityLike = IntersectedEnum<{
    ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike;
} | {
    Retiring: tagOnly;
} | {
    ValidatingSettings: tagOnly;
}>;

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
declare type DelegateRole = {
    MintDgt: tagOnly;
} | {
    SpendDgt: tagOnly;
} | {
    MintInvariant: tagOnly;
} | {
    SpendInvariant: tagOnly;
} | {
    DgDataPolicy: string;
} | {
    OtherNamedDgt: string;
} | {
    BothMintAndSpendDgt: tagOnly;
} | {
    HandledByCapoOnly: tagOnly;
};

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
declare type DelegateRole_2 = {
    MintDgt: tagOnly;
} | {
    SpendDgt: tagOnly;
} | {
    MintInvariant: tagOnly;
} | {
    SpendInvariant: tagOnly;
} | {
    DgDataPolicy: string;
} | {
    OtherNamedDgt: string;
} | {
    BothMintAndSpendDgt: tagOnly;
} | {
    HandledByCapoOnly: tagOnly;
};

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_2, Partial<{
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
declare class DelegateRoleHelperNested extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_2, Partial<{
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
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
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
declare type DelegateRoleLike = IntersectedEnum<{
    MintDgt: tagOnly;
} | {
    SpendDgt: tagOnly;
} | {
    MintInvariant: tagOnly;
} | {
    SpendInvariant: tagOnly;
} | {
    DgDataPolicy: string;
} | {
    OtherNamedDgt: string;
} | {
    BothMintAndSpendDgt: tagOnly;
} | {
    HandledByCapoOnly: tagOnly;
}>;

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail {
    capoAddr: Address;
    mph: MintingPolicyHash;
    tn: number[];
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike {
    capoAddr: /*minStructField*/ Address | string;
    mph: /*minStructField*/ MintingPolicyHash | string | number[];
    tn: number[];
}

/**
 * A strong type for the canonical form of dgd_DataSrc$Both
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see dgd_DataSrc$Ergo$Both instead.
 * @public
 */
declare interface dgd_DataSrc$Both {
    utxo: TxInput;
    txo: TxOutput;
}

/**
 * A strong type for the permissive form of dgd_DataSrc$Both
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface dgd_DataSrc$BothLike {
    utxo: TxInput;
    txo: TxOutput;
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
declare type dgd_DataSrc$Ergo$Both = dgd_DataSrc$Both;

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
declare type dgd_DataSrc = {
    Unk: tagOnly;
} | {
    Input: TxInput;
} | {
    Output: TxOutput;
} | {
    Both: dgd_DataSrc$Both;
};

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
declare type dgd_DataSrcLike = IntersectedEnum<{
    Unk: tagOnly;
} | {
    Input: TxInput;
} | {
    Output: TxOutput;
} | {
    Both: dgd_DataSrc$BothLike;
}>;

/**
 * A strong type for the canonical form of DgDataDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDgDataDetails instead.
 * @public
 */
declare interface DgDataDetails {
    dataSrc: dgd_DataSrc;
    id: number[];
    type: string;
    mph: MintingPolicyHash;
}

/**
 * A strong type for the permissive form of DgDataDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DgDataDetailsLike {
    dataSrc: dgd_DataSrcLike;
    id: number[];
    type: string;
    mph: /*minStructField*/ MintingPolicyHash | string | number[];
}

/**
 * A strong type for the canonical form of DTS_PurchaseInfo
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDTS_PurchaseInfo instead.
 * @public
 */
declare interface DTS_PurchaseInfo {
    inferredPace: number;
    hoursSinceLastPurchase: number;
    unitsPurchased: bigint;
    purchaseTime: number;
    prevSalePace: number;
    totalProgress: SaleProgressDetails;
}

/**
 * A strong type for the permissive form of DTS_PurchaseInfo
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DTS_PurchaseInfoLike {
    inferredPace: number;
    hoursSinceLastPurchase: number;
    unitsPurchased: IntLike;
    purchaseTime: TimeLike;
    prevSalePace: number;
    totalProgress: SaleProgressDetailsLike;
}

/**
 * A strong type for the canonical form of DynamicSaleV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDynamicSaleV1 instead.
 * @public
 */
declare interface DynamicSaleV1 {
    settings: DynamicSaleV1Settings;
    purchase: DTS_PurchaseInfo;
    sale: MarketSaleData;
    updatedSale: /*minStructField*/ MarketSaleData | undefined;
}

/**
 * A strong type for the permissive form of DynamicSaleV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DynamicSaleV1Like {
    settings: DynamicSaleV1SettingsLike;
    purchase: DTS_PurchaseInfoLike;
    sale: MarketSaleDataLike;
    updatedSale: /*minStructField*/ MarketSaleDataLike | undefined;
}

/**
 * A strong type for the canonical form of DynamicSaleV1Settings
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDynamicSaleV1Settings instead.
 * @public
 */
declare interface DynamicSaleV1Settings {
    targetPrice: number;
    targetedSellingTime: bigint;
    minPrice: number;
    maxPrice: number;
    progressPricingDiscountFloorPoint: number;
    progressPricingDiscountWhenSlow: number;
    progressPricingExpansionWhenFast: number;
    dynaPaceFasterSaleWeight: number;
    dynaPaceIdleDecayRate: number;
    pricingWeightDynaPace: number;
}

/**
 * A strong type for the permissive form of DynamicSaleV1Settings
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DynamicSaleV1SettingsLike {
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
}

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData = AnyData;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity = IntersectedEnum<{
    DeletingRecord: number[];
} | {
    JoiningWithParentChunk: BurningActivity$Ergo$JoiningWithParentChunk;
} | {
    CleanupRetired: string;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity = IntersectedEnum<{
    CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate;
} | {
    queuePendingChange: tagOnly;
} | {
    removePendingChange: ErgoDelegateRole_2;
} | {
    commitPendingChanges: tagOnly;
} | {
    forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate;
} | {
    forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate;
} | {
    updatingManifest: ErgoManifestActivity_2;
}>;

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry = {
    entryType: ErgoManifestEntryType;
    tokenName: number[];
    mph: /*minStructField*/ MintingPolicyHash | undefined;
};

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
    entryType: ErgoManifestEntryType_2;
    tokenName: number[];
    mph: /*minStructField*/ MintingPolicyHash | undefined;
};

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType = IntersectedEnum<{
    Unk: tagOnly;
} | {
    RefInput: cctx_CharterInputType$Ergo$RefInput;
} | {
    Input: cctx_CharterInputType$Ergo$Input;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity = IntersectedEnum<{
    CapoLifecycleActivities: ErgoCapoLifecycleActivity;
} | {
    DelegateLifecycleActivities: ErgoDelegateLifecycleActivity;
} | {
    SpendingActivities: ErgoSpendingActivity;
} | {
    MintingActivities: ErgoMintingActivity;
} | {
    BurningActivities: ErgoBurningActivity;
} | {
    CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData;
} | {
    UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData;
} | {
    DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData;
} | {
    MultipleDelegateActivities: Array<UplcData>;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum = IntersectedEnum<{
    Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken;
} | {
    IsDelegation: ErgoDelegationDetail;
} | {
    capoStoredData: DelegateDatum$Ergo$capoStoredData;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity = IntersectedEnum<{
    ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe;
} | {
    Retiring: tagOnly;
} | {
    ValidatingSettings: tagOnly;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole = IntersectedEnum<DelegateRole>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_2 = IntersectedEnum<DelegateRole_2>;

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail = DelegationDetail;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergodgd_DataSrc = IntersectedEnum<{
    Unk: tagOnly;
} | {
    Input: TxInput;
} | {
    Output: TxOutput;
} | {
    Both: dgd_DataSrc$Ergo$Both;
}>;

/**
 * An ergonomic, though less strictly-safe form of DynamicSaleV1Settings
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DynamicSaleV1SettingsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDynamicSaleV1Settings = DynamicSaleV1Settings;

/**
 * An ergonomic, though less strictly-safe form of FixedSaleDetails
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the FixedSaleDetailsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoFixedSaleDetails = {
    settings: ErgoDynamicSaleV1Settings;
    startAt: number;
    vxfTokensTo: /*minStructField*/ ErgoVxfDestination | undefined;
    vxfFundsTo: /*minStructField*/ ErgoVxfDestination | undefined;
};

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity = IntersectedEnum<{
    retiringEntry: string;
} | {
    updatingEntry: ManifestActivity$Ergo$updatingEntry;
} | {
    addingEntry: ManifestActivity$Ergo$addingEntry;
} | {
    forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken;
} | {
    burningThreadToken: ManifestActivity$Ergo$burningThreadToken;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_2 = IntersectedEnum<{
    retiringEntry: string;
} | {
    updatingEntry: ManifestActivity$Ergo$updatingEntry_2;
} | {
    addingEntry: ManifestActivity$Ergo$addingEntry_2;
} | {
    forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_2;
} | {
    burningThreadToken: ManifestActivity$Ergo$burningThreadToken_2;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType = IntersectedEnum<{
    NamedTokenRef: tagOnly;
} | {
    DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy;
} | {
    DelegateThreads: ManifestEntryType$Ergo$DelegateThreads;
} | {
    MerkleMembership: tagOnly;
} | {
    MerkleStateRoot: tagOnly;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_2 = IntersectedEnum<{
    NamedTokenRef: tagOnly;
} | {
    DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_2;
} | {
    DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_2;
} | {
    MerkleMembership: tagOnly;
} | {
    MerkleStateRoot: tagOnly;
}>;

/**
 * An ergonomic, though less strictly-safe form of MarketSaleData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MarketSaleDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoMarketSaleData = {
    id: number[];
    type: string;
    name: string;
    moreFields: ErgoMoreFields;
};

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMarketSaleState = IntersectedEnum<MarketSaleState>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity = IntersectedEnum<{
    CreatingRecord: TxOutputId;
} | {
    SplittingSaleChunkAndBuying: MintingActivity$Ergo$SplittingSaleChunkAndBuying;
}>;

/**
 * An ergonomic, though less strictly-safe form of MoreFields
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MoreFieldsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoMoreFields = {
    saleState: ErgoOtherSaleState;
    fixedSaleDetails: ErgoFixedSaleDetails;
    saleAssets: ErgoSaleAssets;
    threadInfo: ErgoThreadInfo;
};

/**
 * An ergonomic, though less strictly-safe form of OtherSaleState
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the OtherSaleStateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoOtherSaleState = {
    progressDetails: ErgoSaleProgressDetails;
    salePace: number;
    state: ErgoMarketSaleState;
};

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange = IntersectedEnum<{
    delegateChange: ErgoPendingDelegateChange;
} | {
    otherManifestChange: PendingCharterChange$Ergo$otherManifestChange;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_2 = IntersectedEnum<{
    delegateChange: ErgoPendingDelegateChange_2;
} | {
    otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_2;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction = IntersectedEnum<{
    Add: PendingDelegateAction$Ergo$Add;
} | {
    Remove: tagOnly;
} | {
    Replace: PendingDelegateAction$Ergo$Replace;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_2 = IntersectedEnum<{
    Add: PendingDelegateAction$Ergo$Add_2;
} | {
    Remove: tagOnly;
} | {
    Replace: PendingDelegateAction$Ergo$Replace_2;
}>;

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange = {
    action: ErgoPendingDelegateAction;
    role: ErgoDelegateRole;
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink | undefined;
};

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
    action: ErgoPendingDelegateAction_2;
    role: ErgoDelegateRole_2;
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_2 | undefined;
};

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink = RelativeDelegateLink;

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_2 = RelativeDelegateLink_2;

/**
 * An ergonomic, though less strictly-safe form of SaleAssets
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SaleAssetsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoSaleAssets = SaleAssets;

/**
 * An ergonomic, though less strictly-safe form of SaleProgressDetails
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SaleProgressDetailsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoSaleProgressDetails = SaleProgressDetails;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity = IntersectedEnum<{
    UpdatingRecord: number[];
} | {
    AddingToSale: SpendingActivity$Ergo$AddingToSale;
} | {
    Activating: number[];
} | {
    SellingTokens: SpendingActivity$Ergo$SellingTokens;
} | {
    MergingChildChunk: SpendingActivity$Ergo$MergingChildChunk;
} | {
    Retiring: number[];
}>;

/**
 * An ergonomic, though less strictly-safe form of ThreadInfo
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ThreadInfoLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoThreadInfo = ThreadInfo;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVxfDestination = IntersectedEnum<{
    RelativeLink: VxfDestination$Ergo$RelativeLink;
} | {
    AnyTokenHolder: VxfDestination$Ergo$AnyTokenHolder;
} | {
    PubKey: PubKeyHash;
} | {
    Anywhere: tagOnly;
} | {
    NotYetDefined: tagOnly;
}>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoVxfExpectedActivity = IntersectedEnum<{
    VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    SpecificRedeemerId: VxfExpectedActivity$Ergo$SpecificRedeemerId;
} | {
    TaggedRedeemer: VxfExpectedActivity$Ergo$TaggedRedeemer;
}>;

/**
 * A strong type for the canonical form of FixedSaleDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoFixedSaleDetails instead.
 * @public
 */
declare interface FixedSaleDetails {
    settings: DynamicSaleV1Settings;
    startAt: number;
    vxfTokensTo: /*minStructField*/ VxfDestination | undefined;
    vxfFundsTo: /*minStructField*/ VxfDestination | undefined;
}

/**
 * A strong type for the permissive form of FixedSaleDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface FixedSaleDetailsLike {
    settings: DynamicSaleV1SettingsLike;
    startAt: TimeLike;
    vxfTokensTo: /*minStructField*/ VxfDestinationLike | undefined;
    vxfFundsTo: /*minStructField*/ VxfDestinationLike | undefined;
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
 *     scriptBundle(): CapoDelegateBundle {
 *        return MyMintSpendDelegateBundle.create();
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
declare interface ManifestActivity$addingEntry {
    key: string;
    tokenName: number[];
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
    key: string;
    tokenName: number[];
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike {
    key: string;
    tokenName: number[];
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken {
    key: string;
    burnedThreadCount: bigint;
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
    key: string;
    burnedThreadCount: bigint;
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike {
    key: string;
    burnedThreadCount: IntLike;
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
declare type ManifestActivity$Ergo$addingEntry = ManifestActivity$addingEntry;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_2 = ManifestActivity$addingEntry_2;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken = ManifestActivity$burningThreadToken;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_2 = ManifestActivity$burningThreadToken_2;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken = ManifestActivity$forkingThreadToken;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_2 = ManifestActivity$forkingThreadToken_2;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry = ManifestActivity$updatingEntry;

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_2 = ManifestActivity$updatingEntry_2;

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken {
    key: string;
    newThreadCount: bigint;
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
    key: string;
    newThreadCount: bigint;
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike {
    key: string;
    newThreadCount: IntLike;
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry {
    key: string;
    tokenName: number[];
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
    key: string;
    tokenName: number[];
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike {
    key: string;
    tokenName: number[];
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
declare type ManifestActivity = {
    retiringEntry: string;
} | {
    updatingEntry: ManifestActivity$updatingEntry_2;
} | {
    addingEntry: ManifestActivity$addingEntry_2;
} | {
    forkingThreadToken: ManifestActivity$forkingThreadToken_2;
} | {
    burningThreadToken: ManifestActivity$burningThreadToken_2;
};

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
declare type ManifestActivityLike = IntersectedEnum<{
    retiringEntry: string;
} | {
    updatingEntry: ManifestActivity$updatingEntryLike;
} | {
    addingEntry: ManifestActivity$addingEntryLike;
} | {
    forkingThreadToken: ManifestActivity$forkingThreadTokenLike;
} | {
    burningThreadToken: ManifestActivity$burningThreadTokenLike;
}>;

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads {
    role: DelegateRole_2;
    refCount: bigint;
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike {
    role: DelegateRoleLike;
    refCount: IntLike;
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy {
    policyLink: RelativeDelegateLink_2;
    idPrefix: string;
    refCount: bigint;
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike {
    policyLink: RelativeDelegateLinkLike;
    idPrefix: string;
    refCount: IntLike;
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
declare type ManifestEntryType$Ergo$DelegateThreads = {
    role: ErgoDelegateRole;
    refCount: bigint;
};

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
    role: ErgoDelegateRole_2;
    refCount: bigint;
};

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy = {
    policyLink: ErgoRelativeDelegateLink;
    idPrefix: string;
    refCount: bigint;
};

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
    policyLink: ErgoRelativeDelegateLink_2;
    idPrefix: string;
    refCount: bigint;
};

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
declare type ManifestEntryType = {
    NamedTokenRef: tagOnly;
} | {
    DgDataPolicy: ManifestEntryType$DgDataPolicy;
} | {
    DelegateThreads: ManifestEntryType$DelegateThreads;
} | {
    MerkleMembership: tagOnly;
} | {
    MerkleStateRoot: tagOnly;
};

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
declare type ManifestEntryTypeLike = IntersectedEnum<{
    NamedTokenRef: tagOnly;
} | {
    DgDataPolicy: ManifestEntryType$DgDataPolicyLike;
} | {
    DelegateThreads: ManifestEntryType$DelegateThreadsLike;
} | {
    MerkleMembership: tagOnly;
} | {
    MerkleStateRoot: tagOnly;
}>;

/**
 * @public
 */
declare class MarketSaleBundle extends DelegatedDataBundle {
    specializedDelegateModule: Source;
    requiresGovAuthority: boolean;
    get modules(): Source[];
}

/**
 * @public
 */
export declare class MarketSaleController extends WrappedDgDataContract<MarketSaleData, MarketSaleDataLike, MarketSaleDataWrapper> {
    dataBridgeClass: typeof MarketSalePolicyDataBridge;
    get recordTypeName(): string;
    get abstractBundleClass(): typeof MarketSaleBundle;
    get idPrefix(): string;
    scriptBundle(): any;
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
    mkUpdatedProgressDetails({ lastPurchaseAt, prevPurchaseAt, chunkUnitCount, chunkUnitsSold, }: MarketSaleData["moreFields"]["saleState"]["progressDetails"]): MarketSaleData["moreFields"]["saleState"]["progressDetails"];
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
declare interface MarketSaleData {
    id: number[];
    type: string;
    name: string;
    moreFields: MoreFields;
}

/**
 * A strong type for the permissive form of MarketSaleData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface MarketSaleDataLike {
    id: number[];
    type: string;
    name: string;
    moreFields: MoreFieldsLike;
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
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***ConcreteMarketSaleBundle***)
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
         * generates UplcData for the enum type ***SaleProgressDetails*** for the `BasicDelegate` script
         */
        SaleProgressDetails: (fields: SaleProgressDetailsLike | {
            lastPurchaseAt: TimeLike_2;
            prevPurchaseAt: TimeLike_2;
            chunkUnitCount: IntLike;
            chunkUnitsSold: IntLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***OtherSaleState*** for the `BasicDelegate` script
         */
        OtherSaleState: (fields: OtherSaleStateLike | {
            progressDetails: SaleProgressDetailsLike;
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
         * generates UplcData for the enum type ***FixedSaleDetails*** for the `BasicDelegate` script
         */
        FixedSaleDetails: (fields: FixedSaleDetailsLike | {
            settings: DynamicSaleV1SettingsLike;
            startAt: TimeLike_2;
            vxfTokensTo: /*minStructField*/ VxfDestinationLike | undefined;
            vxfFundsTo: /*minStructField*/ VxfDestinationLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***SaleAssets*** for the `BasicDelegate` script
         */
        SaleAssets: (fields: SaleAssetsLike | {
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
         * generates UplcData for the enum type ***ThreadInfo*** for the `BasicDelegate` script
         */
        ThreadInfo: (fields: ThreadInfoLike | {
            nestedThreads: IntLike;
            retiredThreads: IntLike;
            parentChunkId: number[];
            chunkForkedAt: TimeLike_2;
            saleId: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***MoreFields*** for the `BasicDelegate` script
         */
        MoreFields: (fields: MoreFieldsLike | {
            saleState: OtherSaleStateLike;
            fixedSaleDetails: FixedSaleDetailsLike;
            saleAssets: SaleAssetsLike;
            threadInfo: ThreadInfoLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***MarketSaleData*** for the `BasicDelegate` script
         */
        MarketSaleData: (fields: MarketSaleDataLike | {
            id: number[];
            type: string;
            name: string;
            moreFields: MoreFieldsLike;
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
            totalProgress: SaleProgressDetailsLike;
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
    ᱺᱺSaleProgressDetailsCast: Cast<SaleProgressDetails, SaleProgressDetailsLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺOtherSaleStateCast: Cast<OtherSaleState, OtherSaleStateLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDynamicSaleV1SettingsCast: Cast<DynamicSaleV1Settings, DynamicSaleV1SettingsLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_2, RelativeDelegateLinkLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺFixedSaleDetailsCast: Cast<FixedSaleDetails, FixedSaleDetailsLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺSaleAssetsCast: Cast<SaleAssets, SaleAssetsLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺThreadInfoCast: Cast<ThreadInfo, ThreadInfoLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺMoreFieldsCast: Cast<MoreFields, MoreFieldsLike>;
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
    DelegateRole(d: UplcData): ErgoDelegateRole_2;
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
    ManifestActivity(d: UplcData): ErgoManifestActivity_2;
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
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_2;
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
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_2;
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
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_2;
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
     * reads UplcData *known to fit the **SaleProgressDetails*** struct type,
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
    SaleProgressDetails(d: UplcData): SaleProgressDetails;
    /**
     * reads UplcData *known to fit the **OtherSaleState*** struct type,
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
    OtherSaleState(d: UplcData): OtherSaleState;
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
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_2;
    /**
     * reads UplcData *known to fit the **FixedSaleDetails*** struct type,
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
    FixedSaleDetails(d: UplcData): FixedSaleDetails;
    /**
     * reads UplcData *known to fit the **SaleAssets*** struct type,
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
    SaleAssets(d: UplcData): SaleAssets;
    /**
     * reads UplcData *known to fit the **ThreadInfo*** struct type,
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
    ThreadInfo(d: UplcData): ThreadInfo;
    /**
     * reads UplcData *known to fit the **MoreFields*** struct type,
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
    MoreFields(d: UplcData): MoreFields;
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
declare type MarketSaleState = {
    Pending: tagOnly;
} | {
    Active: tagOnly;
} | {
    Retired: tagOnly;
} | {
    SoldOut: tagOnly;
};

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
declare type MarketSaleStateLike = IntersectedEnum<{
    Pending: tagOnly;
} | {
    Active: tagOnly;
} | {
    Retired: tagOnly;
} | {
    SoldOut: tagOnly;
}>;

/**
 * expresses the essential fields needed for initiating creation of a MarketSaleData
 * @public
 */
declare type minimalMarketSaleData = minimalData<MarketSaleDataLike>;

/**
 * An ergonomic, though less strictly-safe form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the MintingActivity$SplittingSaleChunkAndBuyingLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type MintingActivity$Ergo$SplittingSaleChunkAndBuying = MintingActivity$SplittingSaleChunkAndBuying;

/**
 * A strong type for the canonical form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see MintingActivity$Ergo$SplittingSaleChunkAndBuying instead.
 * @public
 */
declare interface MintingActivity$SplittingSaleChunkAndBuying {
    seed: TxOutputId;
    parentChunkId: string;
    buyingUnitQuantity: bigint;
}

/**
 * A strong type for the permissive form of MintingActivity$SplittingSaleChunkAndBuying
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface MintingActivity$SplittingSaleChunkAndBuyingLike {
    seed: TxOutputId | string;
    parentChunkId: string;
    buyingUnitQuantity: IntLike;
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
declare type MintingActivity = {
    CreatingRecord: TxOutputId;
} | {
    SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuying;
};

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
     * - or see the {@link hasSeed} type for other ways to feed it with a TxOutputId.
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
     * - or see the {@link hasSeed} type for other ways to feed it with a TxOutputId.
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
declare type MintingActivityLike = IntersectedEnum<{
    CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ TxOutputId | string;
} | {
    SplittingSaleChunkAndBuying: MintingActivity$SplittingSaleChunkAndBuyingLike;
}>;

/**
 * A strong type for the canonical form of MoreFields
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoMoreFields instead.
 * @public
 */
declare interface MoreFields {
    saleState: OtherSaleState;
    fixedSaleDetails: FixedSaleDetails;
    saleAssets: SaleAssets;
    threadInfo: ThreadInfo;
}

/**
 * A strong type for the permissive form of MoreFields
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface MoreFieldsLike {
    saleState: OtherSaleStateLike;
    fixedSaleDetails: FixedSaleDetailsLike;
    saleAssets: SaleAssetsLike;
    threadInfo: ThreadInfoLike;
}

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
 * A strong type for the canonical form of OtherSaleState
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoOtherSaleState instead.
 * @public
 */
declare interface OtherSaleState {
    progressDetails: SaleProgressDetails;
    salePace: number;
    state: MarketSaleState;
}

/**
 * A strong type for the permissive form of OtherSaleState
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface OtherSaleStateLike {
    progressDetails: SaleProgressDetailsLike;
    salePace: number;
    state: MarketSaleStateLike;
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
declare type PendingCharterChange$Ergo$otherManifestChange = {
    activity: ErgoManifestActivity;
    remainingDelegateValidations: Array<ErgoDelegateRole>;
};

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
    activity: ErgoManifestActivity_2;
    remainingDelegateValidations: Array<ErgoDelegateRole_2>;
};

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange {
    activity: ManifestActivity;
    remainingDelegateValidations: Array<DelegateRole_2>;
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike {
    activity: ManifestActivityLike;
    remainingDelegateValidations: Array<DelegateRoleLike>;
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
declare type PendingCharterChange = {
    delegateChange: PendingDelegateChange;
} | {
    otherManifestChange: PendingCharterChange$otherManifestChange;
};

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
declare type PendingCharterChangeLike = IntersectedEnum<{
    delegateChange: PendingDelegateChangeLike;
} | {
    otherManifestChange: PendingCharterChange$otherManifestChangeLike;
}>;

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add {
    seed: TxOutputId;
    purpose: string;
    idPrefix: string;
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
    seed: TxOutputId;
    purpose: string;
    idPrefix: string;
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike {
    seed: TxOutputId | string;
    purpose: string;
    idPrefix: string;
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
declare type PendingDelegateAction$Ergo$Add = PendingDelegateAction$Add;

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_2 = PendingDelegateAction$Add_2;

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace = PendingDelegateAction$Replace;

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_2 = PendingDelegateAction$Replace_2;

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace {
    seed: TxOutputId;
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass;
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
    seed: TxOutputId;
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass;
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike {
    seed: TxOutputId | string;
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
        mph: MintingPolicyHash | string | number[];
        tokenName: string | number[];
    };
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
declare type PendingDelegateAction = {
    Add: PendingDelegateAction$Add_2;
} | {
    Remove: tagOnly;
} | {
    Replace: PendingDelegateAction$Replace_2;
};

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
declare type PendingDelegateActionLike = IntersectedEnum<{
    Add: PendingDelegateAction$AddLike;
} | {
    Remove: tagOnly;
} | {
    Replace: PendingDelegateAction$ReplaceLike;
}>;

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange {
    action: PendingDelegateAction;
    role: DelegateRole_2;
    dgtLink: /*minStructField*/ RelativeDelegateLink_2 | undefined;
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike {
    action: PendingDelegateActionLike;
    role: DelegateRoleLike;
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined;
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
declare interface RelativeDelegateLink {
    uutName: string;
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined;
    config: number[];
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
    uutName: string;
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined;
    config: number[];
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike {
    uutName: string;
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
    config: number[];
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
 * A strong type for the canonical form of SaleAssets
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoSaleAssets instead.
 * @public
 */
declare interface SaleAssets {
    saleUnitAssets: Value;
    singleBuyMaxUnits: bigint;
    primaryAssetMph: MintingPolicyHash;
    primaryAssetName: number[];
    primaryAssetTargetCount: bigint;
    totalSaleUnits: bigint;
}

/**
 * A strong type for the permissive form of SaleAssets
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SaleAssetsLike {
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
}

/**
 * A strong type for the canonical form of SaleProgressDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoSaleProgressDetails instead.
 * @public
 */
declare interface SaleProgressDetails {
    lastPurchaseAt: number;
    prevPurchaseAt: number;
    chunkUnitCount: bigint;
    chunkUnitsSold: bigint;
}

/**
 * A strong type for the permissive form of SaleProgressDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SaleProgressDetailsLike {
    lastPurchaseAt: TimeLike;
    prevPurchaseAt: TimeLike;
    chunkUnitCount: IntLike;
    chunkUnitsSold: IntLike;
}

/**
 * A strong type for the canonical form of SpendingActivity$AddingToSale
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$AddingToSale instead.
 * @public
 */
declare interface SpendingActivity$AddingToSale {
    id: number[];
    mph: MintingPolicyHash;
    tn: number[];
}

/**
 * A strong type for the permissive form of SpendingActivity$AddingToSale
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SpendingActivity$AddingToSaleLike {
    id: number[];
    mph: MintingPolicyHash | string | number[];
    tn: number[];
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
declare type SpendingActivity$Ergo$AddingToSale = SpendingActivity$AddingToSale;

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$MergingChildChunk
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$MergingChildChunkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type SpendingActivity$Ergo$MergingChildChunk = SpendingActivity$MergingChildChunk;

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$SellingTokens
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$SellingTokensLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type SpendingActivity$Ergo$SellingTokens = SpendingActivity$SellingTokens;

/**
 * A strong type for the canonical form of SpendingActivity$MergingChildChunk
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$MergingChildChunk instead.
 * @public
 */
declare interface SpendingActivity$MergingChildChunk {
    id: number[];
    childChunkId: string;
}

/**
 * A strong type for the permissive form of SpendingActivity$MergingChildChunk
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SpendingActivity$MergingChildChunkLike {
    id: number[];
    childChunkId: string;
}

/**
 * A strong type for the canonical form of SpendingActivity$SellingTokens
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$SellingTokens instead.
 * @public
 */
declare interface SpendingActivity$SellingTokens {
    id: number[];
    sellingUnitQuantity: bigint;
    salePrice: Value;
}

/**
 * A strong type for the permissive form of SpendingActivity$SellingTokens
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SpendingActivity$SellingTokensLike {
    id: number[];
    sellingUnitQuantity: IntLike;
    salePrice: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
        mph: MintingPolicyHash | string | number[];
        tokens: {
            name: number[] | string;
            qty: IntLike;
        }[];
    }[];
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
declare type SpendingActivity = {
    UpdatingRecord: number[];
} | {
    AddingToSale: SpendingActivity$AddingToSale;
} | {
    Activating: number[];
} | {
    SellingTokens: SpendingActivity$SellingTokens;
} | {
    MergingChildChunk: SpendingActivity$MergingChildChunk;
} | {
    Retiring: number[];
};

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
declare type SpendingActivityLike = IntersectedEnum<{
    UpdatingRecord: number[];
} | {
    AddingToSale: SpendingActivity$AddingToSaleLike;
} | {
    Activating: number[];
} | {
    SellingTokens: SpendingActivity$SellingTokensLike;
} | {
    MergingChildChunk: SpendingActivity$MergingChildChunkLike;
} | {
    Retiring: number[];
}>;

/**
 * @public
 */
export declare abstract class StellarTokenomicsCapo<SELF extends StellarTokenomicsCapo<any, any>, //= StellarTokenomics<any>
F extends CapoFeatureFlags = GenericTokenomicsFeatureFlags> extends Capo<SELF, F> {
    static get defaultParams(): {
        rev: bigint;
    };
    getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<STokMintDelegate>;
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
    requirements(): ReqtsMap<"Provides a single entry point dApps can use to get tokenomics for their project" | "Uses the Capo (leader) to gather tokenomics-related contracts together" | "Defines a tokenomics minting delegate" | "Has a settings data structure where tokenomics plugins can store protocol parameters" | "issues 'membership card' tokens to participants" | "Can upgrade the Settings data" | "the settings data can be updated to have new details if backward compatible" | "Can find membership card tokens for participants", never>;
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
    scriptBundle(): any;
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
 * A strong type for the canonical form of ThreadInfo
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoThreadInfo instead.
 * @public
 */
declare interface ThreadInfo {
    nestedThreads: bigint;
    retiredThreads: bigint;
    parentChunkId: number[];
    chunkForkedAt: number;
    saleId: number[];
}

/**
 * A strong type for the permissive form of ThreadInfo
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ThreadInfoLike {
    nestedThreads: IntLike;
    retiredThreads: IntLike;
    parentChunkId: number[];
    chunkForkedAt: TimeLike;
    saleId: number[];
}

declare type TimeLike = IntLike;

/**
 * @public
 */
declare type TimeLike_2 = IntLike;

/**
 * A strong type for the canonical form of VxfDestination$AnyTokenHolder
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$AnyTokenHolder instead.
 * @public
 */
declare interface VxfDestination$AnyTokenHolder {
    mph: MintingPolicyHash;
    assetName: number[];
}

/**
 * A strong type for the permissive form of VxfDestination$AnyTokenHolder
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfDestination$AnyTokenHolderLike {
    mph: MintingPolicyHash | string | number[];
    assetName: number[];
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
declare type VxfDestination$Ergo$AnyTokenHolder = VxfDestination$AnyTokenHolder;

/**
 * An ergonomic, though less strictly-safe form of VxfDestination$RelativeLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfDestination$RelativeLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfDestination$Ergo$RelativeLink = {
    link: ErgoRelativeDelegateLink_2;
    vxfActivity: ErgoVxfExpectedActivity | undefined;
};

/**
 * A strong type for the canonical form of VxfDestination$RelativeLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfDestination$Ergo$RelativeLink instead.
 * @public
 */
declare interface VxfDestination$RelativeLink {
    link: RelativeDelegateLink_2;
    vxfActivity: VxfExpectedActivity | undefined;
}

/**
 * A strong type for the permissive form of VxfDestination$RelativeLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfDestination$RelativeLinkLike {
    link: RelativeDelegateLinkLike;
    vxfActivity: VxfExpectedActivityLike | undefined;
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
declare type VxfDestination = {
    RelativeLink: VxfDestination$RelativeLink;
} | {
    AnyTokenHolder: VxfDestination$AnyTokenHolder;
} | {
    PubKey: PubKeyHash;
} | {
    Anywhere: tagOnly;
} | {
    NotYetDefined: tagOnly;
};

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
declare type VxfDestinationLike = IntersectedEnum<{
    RelativeLink: VxfDestination$RelativeLinkLike;
} | {
    AnyTokenHolder: VxfDestination$AnyTokenHolderLike;
} | {
    PubKey: /* implied wrapper { pkh: ... } for singleVariantField */ PubKeyHash | string | number[];
} | {
    Anywhere: tagOnly;
} | {
    NotYetDefined: tagOnly;
}>;

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$SpecificRedeemerIdLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfExpectedActivity$Ergo$SpecificRedeemerId = VxfExpectedActivity$SpecificRedeemerId;

/**
 * An ergonomic, though less strictly-safe form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the VxfExpectedActivity$TaggedRedeemerLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type VxfExpectedActivity$Ergo$TaggedRedeemer = VxfExpectedActivity$TaggedRedeemer;

/**
 * A strong type for the canonical form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$SpecificRedeemerId instead.
 * @public
 */
declare interface VxfExpectedActivity$SpecificRedeemerId {
    id: bigint;
    inNestedList: boolean;
    nestedListRedeemerId: bigint | undefined;
    appData: UplcData | undefined;
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$SpecificRedeemerId
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfExpectedActivity$SpecificRedeemerIdLike {
    id: IntLike;
    inNestedList: boolean;
    nestedListRedeemerId: IntLike | undefined;
    appData: UplcData | undefined;
}

/**
 * A strong type for the canonical form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see VxfExpectedActivity$Ergo$TaggedRedeemer instead.
 * @public
 */
declare interface VxfExpectedActivity$TaggedRedeemer {
    firstFieldConstrTag: bigint;
    inNestedList: boolean;
    appData: UplcData | undefined;
}

/**
 * A strong type for the permissive form of VxfExpectedActivity$TaggedRedeemer
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface VxfExpectedActivity$TaggedRedeemerLike {
    firstFieldConstrTag: IntLike;
    inNestedList: boolean;
    appData: UplcData | undefined;
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
declare type VxfExpectedActivity = {
    VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerId;
} | {
    TaggedRedeemer: VxfExpectedActivity$TaggedRedeemer;
};

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
declare type VxfExpectedActivityLike = IntersectedEnum<{
    VxfTransfer: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    VxfStorage: /* implied wrapper { appData: ... } for singleVariantField */ UplcData | undefined;
} | {
    SpecificRedeemerId: VxfExpectedActivity$SpecificRedeemerIdLike;
} | {
    TaggedRedeemer: VxfExpectedActivity$TaggedRedeemerLike;
}>;

export { }
