import { StellarTxnContext, Capo, UutName } from "@donecollectively/stellar-contracts";
import type { anyState, CapoFeatureFlags, FoundUut, hasSeedUtxo, ReqtsMap } from "@donecollectively/stellar-contracts";
import { STokMintDelegate } from "./STokMintDelegate.js";
import { type Address, type TxInput } from "@helios-lang/ledger";
import type { CapoDatum$Ergo$CharterData } from "./STokMintDelegate.typeInfo.js";
import type { MarketSaleController } from "./MarketSale/MarketSaleController.js";
export type StellarTokenomics_dataWrappers = {};
/**
 * @public
 */
export type hasMemberToken = StellarTxnContext<anyState & {
    memberToken: UutName;
}>;
/**
 * @public
 */
export type optionalMemberToken<T extends {
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
 * @public
 */
export type requiredMemberToken<T extends {
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
 * @public
 */
export type GenericTokenomicsFeatureFlags = {
    mktSale: boolean;
    fundedPurpose: boolean;
    vesting: boolean;
};
/**
 * @public
 */
export declare abstract class StellarTokenomicsCapo<SELF extends StellarTokenomicsCapo<any, any>, //= StellarTokenomics<any>
F extends CapoFeatureFlags = GenericTokenomicsFeatureFlags> extends Capo<SELF, F> {
    static get defaultParams(): {
        rev: bigint;
    };
    getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<STokMintDelegate>;
    getMarketSaleController(this: SELF, charterData?: CapoDatum$Ergo$CharterData): Promise<MarketSaleController>;
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
    mkTxnMintParticipantToken(addr: Address): Promise<import("@donecollectively/stellar-contracts").hasUutContext<"member"> & StellarTxnContext<anyState> & hasSeedUtxo>;
    txnMintingFungibleTokens<TCX extends StellarTxnContext>(tcx: TCX, tokenName: string | number[], tokenCount: bigint): Promise<TCX & import("@donecollectively/stellar-contracts").hasCharterRef & import("@donecollectively/stellar-contracts").hasGovAuthority>;
    requirements(): ReqtsMap<"is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated" | "Provides a single entry point dApps can use to get tokenomics for their project" | "Uses the Capo (leader) to gather tokenomics-related contracts together" | "Defines a tokenomics minting delegate" | "Has a settings data structure where tokenomics plugins can store protocol parameters" | "issues 'membership card' tokens to participants" | "Can upgrade the Settings data" | "the settings data can be updated to have new details if backward compatible" | "Can find membership card tokens for participants", {
        inheriting: "is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated";
    }> & ReqtsMap<"is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated", {
        inheriting: "\u2039empty/base class\u203A";
    }>;
}
//# sourceMappingURL=StellarTokenomicsCapo.d.ts.map