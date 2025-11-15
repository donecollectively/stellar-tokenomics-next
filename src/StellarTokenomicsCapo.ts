import {
    StellarTxnContext,
    partialTxn,
    txn,
    Capo,
    hasReqts,
    bytesToText,
    UutName,
    textToBytes,
    mkValuesEntry,
    mergesInheritedReqts,
} from "@donecollectively/stellar-contracts";

import type {
    anyState,
    CapoFeatureFlags,
    FoundUut,
    hasSeedUtxo,
    ReqtsMap,
} from "@donecollectively/stellar-contracts";

import { STokMintDelegate } from "./STokMintDelegate.js";
import { makeTxOutput, type Address, type TxInput } from "@helios-lang/ledger";
import type { CapoDatum$Ergo$CharterData } from "./STokMintDelegate.typeInfo.js";
import type { MarketSaleController } from "./MarketSale/MarketSaleController.js";

// import { FundedPurposeSettings } from "./FundedPurpose/FundedPurposeAdapter.js";
// import { FundedPurposeSettingsModule } from "./FundedPurpose/FundedPurposeSettingsModule.js";
// import { TieredScaleModule } from "./TieredScaleModule.js";
// import { MarketSaleAdapter } from "./MarketSale/MarketSaleAdapter.js";

export type StellarTokenomics_dataWrappers = {
    // mktSale: MarketSaleAdapter
};
/**
 * @public
 */
export type hasMemberToken = StellarTxnContext<
    anyState & { memberToken: UutName }
>;

/**
 * @public
 */
export type optionalMemberToken<
    T extends { mbrTkn: string } | { memberToken: string }
> = Omit<T, "mbrTkn" | "memberToken"> &
    (T extends { mbrTkn: string }
        ? { mbrTkn?: string }
        : { memberToken?: string });

/**
 * @public
 */
export type requiredMemberToken<
    T extends
        | { mbrTkn: string }
        | { memberToken: string }
        | { mbrTkn?: string }
        | { memberToken?: string }
> = Omit<T, "mbrTkn" | "memberToken"> &
    (T extends { mbrTkn: string }
        ? { mbrTkn: string }
        : { memberToken: string });

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
export abstract class StellarTokenomicsCapo<
    SELF extends StellarTokenomicsCapo<any, any>, //= StellarTokenomics<any>
    F extends CapoFeatureFlags = GenericTokenomicsFeatureFlags
> extends Capo<SELF, F> {
    // including this creates problems with subclassing with different config settings.
    // leaving it here as a pattern to be replicated where needed.
    // async XXXmkAdditionalCharterDatumArgs(initialTcx, charterDatumArgs) {
    //     const promise = this.txnMustGetSeedUtxo(
    //         initialTcx,
    //         "bootstrapping tokenomics delegates",
    //         ["lbm-xxxxxxxx"]
    //     ).then(async (seedUtxo) => {

    //         // mint uuts for all the delegates
    //         const tcx = await this.txnWillMintUuts(
    //             initialTcx,
    //             ["vault"],
    //             {
    //                 vaultDelegate: "vault",
    //             }
    //         );

    //         // create a delegate link for each delegate, using the corresponding UUT.
    //         const vaultDelegate = await this.txnCreateDelegateLink<
    //             StellarDelegate,
    //             "vaultDelegate"
    //         >(tcx, "vaultDelegate");

    //         // construct the config, having each of the needed delegates
    //         //  (or other non-delegate config details for the Charter Datum)
    //         const tokenomicsDatumArgs: TokenomicsDatumArgs = {
    //             ...charterDatumArgs,
    //             config: {
    //                 vaultDelegate,
    //             },
    //         };

    //         // return a typed pair with the updated tranaction context and the new config
    //         return [tcx, tokenomicsDatumArgs] as [
    //             typeof tcx,
    //             typeof tokenomicsDatumArgs
    //         ];
    //     });
    //     return promise;
    // }

    //     importModules() {
    //         const modules = [...super.importModules()]; //CMDBController];
    //         // console.error(modules.map(x => x.moduleName));
    //         return [
    //             ... modules,
    //             FundedPurposeSettingsModule,
    //             TieredScaleModule,
    // // MarketSalePolicy,
    // // MarketSaleDataModule,
    // // SaleStrategiesModule,

    //         ]
    //     }

    static get defaultParams() {
        return {
            ...super.defaultParams,
        };
    }

    // initSettingsAdapter() {
    //     return new BaseTokenomicsSettingsAdapter(this);
    // }

    // async mkCharterConfigEntry(
    //     config: Partial<CDT["config"]>
    // ): Promise<CDT["config"]> {
    //     const vaultAuthority = this.mkOnchainDelegateLink(
    //         config.vaultDelegateLink
    //     );
    //     const vestingAuthority = this.mkOnchainDelegateLink(
    //         config.vestingDelegateLink
    //     );

    //     return {
    //         vaultAuthority,
    //         vestingAuthority,
    //         ...config,
    //     };
    // }

    // initDelegateRoles() {
    //     const { mintDelegate: parentMD, ...inherited } = this.basicDelegateRoles()

    //     const { uutPurpose, } = parentMD;

    //     return {
    //         ...inherited,
    //         ownerAuthority: defineRole(
    //             "ownerAuthz",
    //             AuthorityPolicy,
    //             inherited.govAuthority.variants
    //         ),
    //         mintDelegate: defineRole(uutPurpose, baseClass, {
    //             defaultV1: {
    //                 delegateClass: STokMintDelegate,
    //                 // partialConfig: {},
    //                 // validateConfig(args): strategyValidation {
    //                 //     return undefined
    //                 // },
    //             },
    //         }),
    //         // vault
    //         vaultDelegate: defineRole("vaultDelegate", StellarDelegate, {
    //             defaultV1: {
    //                 // @ts-expect-error cannot assign abstract class to non-abstract type
    //                 delegateClass: StellarDelegate,
    //                 // partialConfig: {},
    //                 // validateConfig(args): strategyValidation {
    //                 //     return undefined;
    //                 // },
    //             },
    //         }),

    //         // supplyWarden
    //         // vesting
    //         // tokenSale
    //     };
    // }

    async getMintDelegate(
        charterData?: CapoDatum$Ergo$CharterData
    ): Promise<STokMintDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    // async mkInitialFPurpSettings() : Promise<FundedPurposeSettings> {
    //     return {
    //         championStake: new Value(100n * ADA),
    //         valuedAssets: [
    //             {
    //                 mph: new helios.MintingPolicyHash([]),
    //                 tokenName: [],
    //                 minCount: BigInt(50),
    //             }
    //         ],
    //     };

    // }
    
    async getMarketSaleController(this: SELF,
        charterData?: CapoDatum$Ergo$CharterData,
    ): Promise<MarketSaleController> {
        if (!charterData) {
            charterData = await this.findCharterData();
        }
        return this.getDgDataController("mktSale", {
            charterData: charterData as CapoDatum$Ergo$CharterData,
        }) as Promise<MarketSaleController>;
    }
    

    mkUutName(purpose: string, txin: TxInput) {
        const tokenNames = txin.value.assets
            .getPolicyTokenNames(this.mph)
            .map((x) => bytesToText(x))
            .filter((x) => x.startsWith(`${purpose}-`));

        if (tokenNames.length > 1)
            console.warn(
                `mkUutName() found multiple ${purpose} tokens in one Utxo.  This one has ${tokenNames.length} that match: ` +
                    tokenNames.join(", ")
            );

        return new UutName(purpose, tokenNames[0]);
    }

    // async getMintDelegate<
    //     THIS extends StellarTokenomics<any>,
    //     R extends StellarDelegate = THIS[
    //         "delegateRoles"]["mintDelegate"
    //     ] extends RoleInfo<infer DT, any, any> ? DT : any
    // >(
    //     this: THIS,
    // ) : Promise< R> {
    //     return (await super.getMintDelegate()) as unknown as R & STokMintDelegate;
    // }

    /**
     * Finds the user's member token and adds it to the transaction context
     * @remarks
     * Includes a seed-utxo in the transaction context for use in any aspect
     * of the transaction that may need it (i.e. minting a discount token or ?)
     */
    async mkTxnWithMemberInfo<
        TCX extends StellarTxnContext = StellarTxnContext
    >(
        skipReturningToken?: "skipTokenReturn",
        tcx: TCX = this.mkTcx() as TCX
    ): Promise<TCX & hasMemberToken> {
        const memberInfo = await this.mustFindMemberInfo();
        const maybeSkipReturningToken = skipReturningToken;

        if ((tcx.state as any).memberToken) {
            return tcx as any;
        }
        return this.txnAddMemberToken(tcx, memberInfo, maybeSkipReturningToken);
    }

    async mustFindMemberInfo() {
        const i = await this.findMemberInfo();
        if (!i) throw new Error(`no member token found`);
        return i;
    }

    async findMemberInfo() {
        return this.findActorUut("member");
    }

    @partialTxn
    async txnAddMemberToken<TCX extends StellarTxnContext>(
        tcx: TCX,
        memberInfo?: FoundUut,
        skipReturningToken?: "skipTokenReturn"
    ): Promise<TCX & hasMemberToken & hasSeedUtxo> {
        const resolvedMemberInfo = memberInfo || (await this.findMemberInfo());
        if (!resolvedMemberInfo) {
            throw new Error("No member token found");
        }
        const tcx2 = tcx.addInput(resolvedMemberInfo.utxo) as typeof tcx2 &
            hasMemberToken;
        tcx2.state.memberToken = resolvedMemberInfo.uut;

        const tcx3 = await this.tcxWithSeedUtxo(tcx2, resolvedMemberInfo.utxo);
        if (skipReturningToken) return tcx3;

        return tcx3.addOutput(
            makeTxOutput(
                resolvedMemberInfo.utxo.address,
                this.uh.mkMinTv(this.mph, resolvedMemberInfo.uut)
            )
        );
    }

    /**
     * Creates a transaction minting a collaborator token
     * @remarks
     *
     * Sends the collaborator token to the provided address
     * @param address - recipient of the collaborator token
     * @public
     **/
    @txn
    async mkTxnMintParticipantToken(addr: Address) {
        const tcx = await this.tcxWithSeedUtxo(
            this.mkTcx("minting participant token")
        );
        const mintDelegate = await this.getMintDelegate();

        // todo: "member" name can be configured by the project
        const tcx2 = await this.txnMintingUuts(tcx, ["member"], {
            mintDelegateActivity:
                //@ts-expect-error for now; We can add some methods to an abstract-TOKENOMICS-delegate
                // to make this more specific while remaining abstract.
                mintDelegate.activity.MintingActivities.MintingParticipantToken(
                    tcx
                ),
        });
        console.log("   🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞 mintingUUTs  ^^^");

        return tcx2.addOutput(
            makeTxOutput(
                addr,
                this.uh.mkMinTv(this.mph, tcx2.state.uuts.member)
            )
        );
    }

    async txnMintingFungibleTokens<TCX extends StellarTxnContext>(
        tcx: TCX,
        tokenName: string | number[],
        tokenCount: bigint,
    ) {
        // todo: allow this by explicit commission of the token,
        //   ... with minting details found in that token-commission

        if (typeof tokenName === "string") {
            tokenName = textToBytes(tokenName);
        }
        const mintDgt = await this.getMintDelegate();
        const tcx2 = await this.tcxWithCharterRef(tcx);
        const tcx2a = await this.txnAddGovAuthority(tcx2);
        const minter = this.minter;

        return minter.txnMintWithDelegateAuthorizing(
            tcx2a,
            [mkValuesEntry(tokenName, tokenCount)],
            mintDgt,
            //@ts-expect-error for now.  We can add some methods to an abstract-TOKENOMICS-delegate
            // to make this more specific while remaining abstract.
            mintDgt.activity.MintingActivities.MintingFungibleTokens(tokenName),
        );
    }

    requirements() {
        // note that these requirements augment the essential capabilities
        // ... and requirements of the base Capo class.
        const inherited = super.requirements();
        return mergesInheritedReqts(inherited, {
            "Provides a single entry point dApps can use to get tokenomics for their project":
                {
                    purpose:
                        "to provide a single point of access to tokenomics functions",
                    details: [
                        "Contains TypeScript classes with interfaces that dApps can use ",
                        "  ... to access the essential elements of their tokenomics policy",
                    ],
                    mech: [],
                    requires: [
                        // "Supports a Token-sale contract, where people can buy projectTokens",
                    ],
                },
            "Uses the Capo (leader) to gather tokenomics-related contracts together":
                {
                    purpose:
                        "keeps the leader contract focused on administrative activities",
                    details: [
                        "This leader contract provides a simple policy that serves as a hub ",
                        "  ... for plugging in other contract scripts, which handle various aspects of tokenomics.",
                    ],
                    mech: [
                        // see nested requirements
                    ],
                    requiresInherited: [],
                    requires: [
                        "Defines a tokenomics minting delegate",
                        "Has a settings data structure where tokenomics plugins can store protocol parameters",
                        "issues 'membership card' tokens to participants",
                    ],
                },
            "Defines a tokenomics minting delegate": {
                purpose:
                    "establishes a script that enforces tokenomics-related policies when any tokens are minted",
                details: [
                    "The minting delegate is a separate contract that is called by the leader contract ",
                    "  ... when any tokens are minted.  ",
                    "The minting delegate is provided by a specific version of the tokenomics package, ",
                    "  ... and it may be updated by a new version, given administrative approval of the change.",
                    "The basic minting delegate provides jumping-off points for tokenomics policies related",
                    "  ... to different areas of tokenomics functionality, such as staking or vesting.",
                    "When a new on-chain minting delegate becomes active, it facilitates migration to it.",
                    "A replacement mintingDelegate can only be activated by governance approval of the change.",
                ],
                mech: [
                    "defines a mintingDelegate role pointing to a separate mintingDelegate contract class",
                ],
            },

            "issues 'membership card' tokens to participants": {
                purpose:
                    "enables single point of authentication for tokenomics functions",
                details: [
                    "Anyone can mint a membership card token, which is a unique token",
                    "  ... based on utxo uniqueness.",
                    "A project MAY require a certain payment when minting a membership card.",
                    "Each project can choose the way the member token is named.",
                ],
                mech: [
                    "can mint a membership card token",
                    // "TODO: uses a project-specific prefix from the config for the token name"
                ],
                requires: [
                    "Has a settings data structure where tokenomics plugins can store protocol parameters",
                ],
            },

            "Has a settings data structure where tokenomics plugins can store protocol parameters":
                {
                    purpose:
                        "to provide shared storage and a convention for shared settings for cross-contract coordination",
                    details: [
                        "The settings data is stored in the Capo address.",
                        "It is structured as a CIP-68-like map of key-value pairs.",
                        "Any tokenomics plugin can define expected keys in it.",
                        "Any plugins' script can require the Settings data as a Reference Utxo",
                    ],
                    mech: [
                        "defines a delegated data controller for Settings ",
                        "the Settings can be upgraded by the ownerAuthority",
                        "the capo contains a settings record containing the current settings",
                        "the manifest contains a token-name pointing to currentSettings",
                    ],
                },

            "Can upgrade the Settings data": {
                purpose:
                    "to allow for changes to the configuration data structure",
                details: [
                    "The SettingsController can be upgraded by the ownerAuthority",
                    "Updating settings details only requires creating a new settings record, then installing it",
                    "Modifying the structure of the Settings data requires a new SettingsController to be installed",
                    "The existing delegates can check the updated data structure is valid by their existing rules",
                    "Newly installed delegates of any kind are expected to validate the settings during activation",
                ],
                mech: [
                    "new SettingsController is installed in the same way as any data delegate",
                    "an updated settings can be queued for installation via the pendingChanges structure",
                    "all the existing delegates have a chance to validate all updates to settings",
                ],
                requires: [
                    "Has a settings data structure where tokenomics plugins can store protocol parameters",
                ],
            },
            "the settings data can be updated to have new details if backward compatible":
                {
                    purpose:
                        "to allow for changes to the settings data structure",
                    details: [
                        "The settings data structure can be updated to have new details",
                        "The new details must be backward compatible with the old settings data",
                    ],
                    mech: [
                        "the Settings data can't be modified if current delegates find the new settings invalid",
                    ],
                    requires: [
                        "Has a settings data structure where tokenomics plugins can store protocol parameters",
                    ],
                },

            "Can find membership card tokens for participants": {
                purpose:
                    "to authenticate participants for on-chain tokenomics functions",
                details: [
                    "The Capo can find a membership card token for a participant",
                    "uses Capo's findActorUut() method to find the membership card token",
                    // added to the imported library.
                ],
                mech: [],
            },
        });
    }
}
