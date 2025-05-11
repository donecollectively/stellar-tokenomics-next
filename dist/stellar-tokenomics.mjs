import { Capo, bytesToText, UutName, textToBytes, mkValuesEntry, hasReqts, partialTxn, txn, DelegatedDataBundle, realMul, toFixedReal, debugMath, realDiv, ContractDataBridge, DataBridgeReaderClass, EnumBridge, impliedSeedActivityMaker, WrappedDgDataContract, dumpAny, displayTokenName } from '@donecollectively/stellar-contracts';
import { makeCast } from '@helios-lang/contract-utils';
import { makeTxOutput, makeInlineTxOutputDatum, makeValue } from '@helios-lang/ledger';
import { makeSource } from '@helios-lang/compiler-utils';
import { encodeUtf8 } from '@helios-lang/codec-utils';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class StellarTokenomicsCapo extends Capo {
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
      ...super.defaultParams
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
  async getMintDelegate(charterData) {
    return super.getMintDelegate(charterData);
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
  mkUutName(purpose, txin) {
    const tokenNames = txin.value.assets.getPolicyTokenNames(this.mph).map((x) => bytesToText(x)).filter((x) => x.startsWith(`${purpose}-`));
    if (tokenNames.length > 1)
      console.warn(
        `mkUutName() found multiple ${purpose} tokens in one Utxo.  This one has ${tokenNames.length} that match: ` + tokenNames.join(", ")
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
  async mkTxnWithMemberInfo(skipReturningToken, tcx = this.mkTcx()) {
    const memberInfo = await this.mustFindMemberInfo();
    const maybeSkipReturningToken = skipReturningToken;
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
  async txnAddMemberToken(tcx, memberInfo, skipReturningToken) {
    const resolvedMemberInfo = memberInfo || await this.findMemberInfo();
    if (!resolvedMemberInfo) {
      throw new Error("No member token found");
    }
    const tcx2 = tcx.addInput(resolvedMemberInfo.utxo);
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
  async mkTxnMintParticipantToken(addr) {
    const tcx = await this.tcxWithSeedUtxo(
      this.mkTcx("minting participant token")
    );
    const mintDelegate = await this.getMintDelegate();
    const tcx2 = await this.txnMintingUuts(tcx, ["member"], {
      mintDelegateActivity: (
        //@ts-expect-error for now; We can add some methods to an abstract-TOKENOMICS-delegate
        // to make this more specific while remaining abstract.
        mintDelegate.activity.MintingActivities.MintingParticipantToken(
          tcx
        )
      )
    });
    console.log("   \u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E}\u{1F41E} mintingUUTs  ^^^");
    return tcx2.addOutput(
      makeTxOutput(
        addr,
        this.uh.mkMinTv(this.mph, tcx2.state.uuts.member)
      )
    );
  }
  async txnMintingFungibleTokens(tcx, tokenName, tokenCount) {
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
      mintDgt.activity.MintingActivities.MintingFungibleTokens(tokenName)
    );
  }
  requirements() {
    return hasReqts({
      "Provides a single entry point dApps can use to get tokenomics for their project": {
        purpose: "to provide a single point of access to tokenomics functions",
        details: [
          "Contains TypeScript classes with interfaces that dApps can use ",
          "  ... to access the essential elements of their tokenomics policy"
        ],
        mech: [],
        requires: [
          // "Supports a Token-sale contract, where people can buy projectTokens",
        ]
      },
      "Uses the Capo (leader) to gather tokenomics-related contracts together": {
        purpose: "keeps the leader contract focused on administrative activities",
        details: [
          "This leader contract provides a simple policy that serves as a hub ",
          "  ... for plugging in other contract scripts, which handle various aspects of tokenomics."
        ],
        mech: [
          // see nested requirements
        ],
        requiresInherited: [],
        requires: [
          "Defines a tokenomics minting delegate",
          "Has a settings data structure where tokenomics plugins can store protocol parameters",
          "issues 'membership card' tokens to participants"
        ]
      },
      "Defines a tokenomics minting delegate": {
        purpose: "establishes a script that enforces tokenomics-related policies when any tokens are minted",
        details: [
          "The minting delegate is a separate contract that is called by the leader contract ",
          "  ... when any tokens are minted.  ",
          "The minting delegate is provided by a specific version of the tokenomics package, ",
          "  ... and it may be updated by a new version, given administrative approval of the change.",
          "The basic minting delegate provides jumping-off points for tokenomics policies related",
          "  ... to different areas of tokenomics functionality, such as staking or vesting.",
          "When a new on-chain minting delegate becomes active, it facilitates migration to it.",
          "A replacement mintingDelegate can only be activated by governance approval of the change."
        ],
        mech: [
          "defines a mintingDelegate role pointing to a separate mintingDelegate contract class"
        ]
      },
      "issues 'membership card' tokens to participants": {
        purpose: "enables single point of authentication for tokenomics functions",
        details: [
          "Anyone can mint a membership card token, which is a unique token",
          "  ... based on utxo uniqueness.",
          "A project MAY require a certain payment when minting a membership card.",
          "Each project can choose the way the member token is named."
        ],
        mech: [
          "can mint a membership card token"
          // "TODO: uses a project-specific prefix from the config for the token name"
        ],
        requires: [
          "Has a settings data structure where tokenomics plugins can store protocol parameters"
        ]
      },
      "Has a settings data structure where tokenomics plugins can store protocol parameters": {
        purpose: "to provide shared storage and a convention for shared settings for cross-contract coordination",
        details: [
          "The settings data is stored in the Capo address.",
          "It is structured as a CIP-68-like map of key-value pairs.",
          "Any tokenomics plugin can define expected keys in it.",
          "Any plugins' script can require the Settings data as a Reference Utxo"
        ],
        mech: [
          "defines a delegated data controller for Settings ",
          "the Settings can be upgraded by the ownerAuthority",
          "the capo contains a settings record containing the current settings",
          "the manifest contains a token-name pointing to currentSettings"
        ]
      },
      "Can upgrade the Settings data": {
        purpose: "to allow for changes to the configuration data structure",
        details: [
          "The SettingsController can be upgraded by the ownerAuthority",
          "Updating settings details only requires creating a new settings record, then installing it",
          "Modifying the structure of the Settings data requires a new SettingsController to be installed",
          "The existing delegates can check the updated data structure is valid by their existing rules",
          "Newly installed delegates of any kind are expected to validate the settings during activation"
        ],
        mech: [
          "new SettingsController is installed in the same way as any data delegate",
          "an updated settings can be queued for installation via the pendingChanges structure",
          "all the existing delegates have a chance to validate all updates to settings"
        ],
        requires: [
          "Has a settings data structure where tokenomics plugins can store protocol parameters"
        ]
      },
      "the settings data can be updated to have new details if backward compatible": {
        purpose: "to allow for changes to the settings data structure",
        details: [
          "The settings data structure can be updated to have new details",
          "The new details must be backward compatible with the old settings data"
        ],
        mech: [
          "the Settings data can't be modified if current delegates find the new settings invalid"
        ],
        requires: [
          "Has a settings data structure where tokenomics plugins can store protocol parameters"
        ]
      },
      "Can find membership card tokens for participants": {
        purpose: "to authenticate participants for on-chain tokenomics functions",
        details: [
          "The Capo can find a membership card token for a participant",
          "uses Capo's findActorUut() method to find the membership card token"
          // added to the imported library.
        ],
        mech: []
      }
    });
  }
}
__decorateClass([
  partialTxn
], StellarTokenomicsCapo.prototype, "txnAddMemberToken");
__decorateClass([
  txn
], StellarTokenomicsCapo.prototype, "mkTxnMintParticipantToken");

const MarketSalePolicy_hl = makeSource(
  "module MarketSalePolicy\n\n\n// this is a Helios smart contract module for managing a market sale of assets.\n// Reference Value.md for the Value type and its operations.\n\n\n\n// specialized to ...\n//   -  support MarketSale custom-data\n// original notes about (un)specialization follow:\n\n//  //! provides a basic version, ~~not yet specialized~~\n//  // of the \"specializedDelegate\" interface, which simply\n//  // exports a DelegateDatum enum and DelegateActivities (redeemer enum).  \n\n//  //! Your specialization MUST include the enum variants found in this\n//  //  ... unspecialized version.  It MAY include additional Datum variants.\n//  // Any additional Redeemer/Activity variants should be added underneath \n//  // the SpendingActivity / MintingActivity top-level enum variants, instead \n//  // of adding new top-level enum variants to DelegateActivity.\n\n//  // The DelegateActivity (redeemer) enum conforms to the \n//  // Delegate Redeemer protocol, in which enum 0 is reserved for\n//  // lifecycle activities, enum 1 is used for spend-related activities \n//  // (if the delegate is used as a spend delegate), and enum 2 is called\n//  // for authorizing minting.  Enum 3 and beyond are reserved for\n//  // extensions to the Delegate Redeemer protocol.\n\n//  // Within the minting and spending activities, the specialization can \n//  // indicate a nested activity enum to support various dApp-specific\n//  // activities.  \n\n//  // Activities that validate minting of UUTs should contain enum fields \n//  // to identify the seed-transaction details needed for properly validating \n//  // UUT mints fitting the use-case.\n\n//  //! Your specialization MAY include any additional functions, imports or \n//  //  methods defined on any of the types in this file.\n\nimport {tx, get_current_input} from ScriptContext\n\nimport {\n    TODO,\n    REQT,\n    bREQT,\n    AnyData,\n    getTimeRange,\n    endsBefore\n} from StellarHeliosHelpers\n\nimport {\n    DelegationDetail,\n    mustReturnValueToScript,\n    DelegateLifecycleActivity,\n    CapoLifecycleActivity,\n    unmodifiedDelegation\n} from CapoDelegateHelpers\n\nimport {\n    validateUutMinting,\n    mkUutTnFactory\n} from CapoMintHelpers\n\n// import {\n//     ProtocolSettings\n// } from ProtocolSettings\n\nimport {\n    DgDataDetails,\n    CapoCtx,\n    mkCapoCtx\n} from CapoHelpers\n\nimport {\n    MarketSaleData,\n    MarketSaleState,\n    SaleAssets,\n    OtherSaleState,\n    FixedSaleDetails,\n    ThreadInfo,\n    MoreFields\n} from MarketSaleData\n\nimport {\n    SaleProgressDetails\n} from SaleProgressDetails\n\nimport {\n    DynamicSaleV1Settings\n} from DynamicSaleV1Settings\n\nimport {\n    DynamicSaleV1,\n    DTS_PurchaseInfo\n} from DynamicSaleV1\n\nenum DelegateDatum {\n    Cip68RefToken {  \n        // NOTE: this datum contains reference details for a user-facing token minted according to the cip-68 standard \n        //  - the asset name (in the Value of this UTXO) MUST be:  #000643b0 + tokenName\n        //     - this asset name can serve user-side tokens using the CIP-68 \"222\", \"333\" or other token types.\n        //     - the user-side asset name with its (222/333/etc) CIP-67 prefix and \n        //       ... its remaining tokenName will be matched to this asset name (#000643b0 +tokenName)\n        //       ... to locate this reference datum; this datum content will be interpreted\n        //       ... according to the semantics implied by the user-side asset-name prefix.\n        //\n        //  - The attached 'meta' field in this Datum variant contains the relevant data, depending on the token type\n        //    - for \"222\" tokens, the meta field should contain the following fields:\n        //        - \"name\" : String\n        //        - \"description\" : String \n        //        - \"files\" :   // {mediaType, src (url), name?, ... otherFields)\n        //        - \"image\": String  // image url: https://, ar://, ipfs:// or data:// (RFC2397 data)\n        //    - for \"333\" tokens, the meta field should contain the following fields:\n        //        - \"name\" : String\n        //        - \"description\" : String \n        //        - \"ticker\" : String\n\n        //        - \"url\": String  // project URL\n        //        - \"logo\": String  // image url: https://, ar://, ipfs:// or data:// (RFC2397 data)\n        //                    - it must have a mime type `image/png`, `image/jpeg` or `image/svg+xml`\n        //        - \"decimals\" : Int\n\n        cip68meta: AnyData\n        cip68version: Int\n        otherDetails: Data // can be Unit () or anything else\n    }\n\n    IsDelegation {\n        dd: DelegationDetail\n    }\n    // same variant-index as Capo's DelegatedData\n    capoStoredData {\n        data: MarketSaleData\n        version: Int\n        otherDetails: Data \n    }\n\n    func validateSettings(self, settings: AnyData) -> Bool {\n        assert(false, \"not valid (stubbed)\");\n        assert(settings.serialize() != self.serialize(), \"no\");\n\n        true\n    }\n}\n\nenum MintingActivity {\n    CreatingRecord {\n        seed: TxOutputId\n    }\n    SplittingSaleChunkAndBuying {\n        seed: TxOutputId\n        parentChunkId: String\n        buyingUnitQuantity: Int\n    }\n}\n\nenum SpendingActivity {\n    UpdatingRecord {\n        id: ByteArray\n    }\n\n    AddingToSale {\n        id: ByteArray\n        mph: MintingPolicyHash\n        tn: ByteArray\n    }\n    Activating {\n        id: ByteArray\n    }\n    SellingTokens {\n        id: ByteArray\n        sellingUnitQuantity: Int\n        salePrice: Value\n    }\n    MergingChildChunk {\n        id: ByteArray\n        childChunkId: String\n    }\n    Retiring {\n        id: ByteArray \n    }\n}\n\nenum BurningActivity {\n    DeletingRecord {\n        id: ByteArray\n    }\n\n    JoiningWithParentChunk {\n        // burns the indicated chunk UUT\n        // requires the parent-chunk to be updated with MergingChildChunk\n        id: String\n        parentChunkId: String\n    }\n    CleanupRetired {\n        id: String\n    }\n}\n\nenum DelegateActivity {\n    // must ALWAYS be at Enum position 0\n    CapoLifecycleActivities {\n        activity: CapoLifecycleActivity\n    }\n\n    // must ALWAYS be at Enum position 1\n    DelegateLifecycleActivities {\n        // administrative activities for the delegate lifecycle, enforced\n        //  by the basic mint delegate code.  Specializations can add more \n        //  restrictions, but in many/most cases they will not need to.\n        activity: DelegateLifecycleActivity\n    }\n\n    // application-specific spending activities, ALWAYS at Enum position 2\n    SpendingActivities {\n        activity: SpendingActivity\n    }\n\n    // application-specific minting activities, ALWAYS at Enum position 3\n    MintingActivities {\n        activity: MintingActivity\n    }\n\n    BurningActivities {\n        activity: BurningActivity\n    }\n    \n    CreatingDelegatedData {\n        seed: TxOutputId\n        dataType: String\n        // record id created from seed\n    }\n\n    UpdatingDelegatedData {\n        // no seed\n        dataType: String\n        recId: ByteArray\n    }\n\n    DeletingDelegatedData {\n        // no seed\n        dataType: String\n        recId: ByteArray\n    }\n\n    MultipleDelegateActivities {\n        // todo: change this back when the recursive enum's `__is_valid_data not found` error is resolved\n        activities: []Data // actually a DelegateActivity\n    }\n\n    // this function gives a general-purpose implementation of checking for \n    // valid uut minting. \n    //\n    // A specialization might modify it to use different policies\n    // or enforce additional requirements\n    // \n    // func genericUutMinting(self, \n    //     mdd: DelegateDatum\n    // ) -> Bool {\n    //     //!!! replace with an activity using the same seed-txn pattern:\n    //     // MintingActivities::SomethingMintingUuts{sTxId, sIdx, purposes} = self;\n    //     DelegateDatum::IsDelegation{dd} = mdd;\n    //     returnsAuthzToken : Bool = mustReturnValueToScript(dd.tvAuthorityToken());\n\n    //     o : []TxOutput = get_cont_outputs();\n    //     if (o.length != 1) { error(\"single utxo only\") };\n\n    //     print (\"in unsp_MD\");\n    //     isOk : Bool = returnsAuthzToken && \n\n    //     unmodifiedDelegation( /* isD, same as mdd */ mdd.serialize()) &&\n\n    //     // This call can serve as a template for enforcing expected mints \n    //     // of uuts (and additional token values) in validation of application-\n    //     // specific activities, given (mph, sTxId, sIdx, purposes)\n    //     validateUutMinting(\n    //         mph: dd.mph,\n    //         seedTxId: sTxId, \n    //         seedIdx: sIdx, \n    //         purposes: purposes,\n    //         // otherMintedValue: ()\n    //         mkTokenName: mkUutTnFactory(sTxId, sIdx)\n    //     );\n\n    //     isOk\n    // }\n\n    //! used only for validating IsDelegation datum, that is,\n    //   ... to approve minting requests or any customize spending modes \n    //   ... of that datum.  \n    \n    //  Note that the basic delegate already enforces some basic\n    //    administrative expectations for DelegateLifecycleActivities and CapoLifecycleActivities\n    //    so a specialization doesn't need to re-implement those checks.\n    func additionalDelegateValidation( self,\n        priorMddd: DelegateDatum::IsDelegation,\n        cctx: CapoCtx\n    ) -> Bool {\n        print(\"  -- mktSalePolicy: checking additional delegate validation\");\n        self.switch {\n            // generic DelegateLifecycleActivities is already validated, but \n            //  ... you can add more constraints here if needed\n            DelegateLifecycleActivities => true,\n            CapoLifecycleActivities => {\n                // CapoLifecycleActivites are always rejected except for MINTING delegates.\n                error(\"unreachable\")\n            },\n            MintingActivities{ma} => {\n                ma.switch {\n                    SplittingSaleChunkAndBuying => { //{_,_,_/*seed, parentChunkId, buyingQuanityt*/} => {\n                        // mint of new UUT already checked\n                        \n                        //!!! it should spend the parent-chunk UUT \n                        // ... with activity-indicator SpendingActivity::SplittingToChildChunk\n                        //  ^^^ requires that the DelegatedData activities are structured \n                        //   ... with tight binding to delegate activities from this module\n                        // !!!!!!!!!!!!!!!!!!!!!!!!!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n                        error(\"SplittingSaleChunk: Implement the above details\") // ^^^\n\n                        // it should return the parent-chunk UUT to the Capo\n                        // the new chunk should have saleId pointing to the parent chunk\n                        // the new chunk should validate\n                        // the new chunk's token value should be withdrawn from the parent chunk\n                        // the new chunk's totalTokenCount should equal the withdrawn token value                        \n                    },\n                    CreatingRecord {seed} => {\n                        // mint of new UUT already checked\n                        assert(cctx.withCharterRef().orFail(), \"can't\");\n\n                        mktSaleId : String = mkUutTnFactory(seed)(\"mktSale\");\n                        mktSaleDD : DgDataDetails = cctx.creatingDgData(mktSaleId);\n\n                        // gets the new MarketSaleData record\n                        mktSale : MarketSaleData = MarketSaleData::from_data(\n                            mktSaleDD.outputData()\n                        );\n\n                        true\n                        // validates it (general)\n                        && mktSale.validate()\n                        // validates creation details\n                        && mktSale.validateCreatedDetails()\n                        && mktSale.validatePendingDetails()\n                        && true\n                    }\n                }\n            },\n            SpendingActivities{x} => x.switch {\n                UpdatingRecord => error(\"use more specific spending activity\"),\n                AddingToSale {saleId, mph, tn} => {\n                    TODO(\"AddingToSale mktSale: test this code path\");\n                    assert(cctx.withCharterRef().orFail(), \"can't\");\n\n                    // mktSale = cctx.updatingDgData(mktSaleId)\n                    mktSaleDD : DgDataDetails = cctx.updatingDgData(recIdBytes: saleId);\n                    \n                    previous : MarketSaleData = MarketSaleData::previous(mktSaleDD);\n                    \n                    true\n                    && previous.validateAdding(mktSaleDD, mph, tn)\n                    && cctx.requiresGovAuthority().orFail()\n                },\n                Activating {saleId} => {\n                    TODO(\"Activating mktSale: test this code path\");\n                    assert(cctx.withCharterRef().orFail(), \"can't\");\n\n                    // mktSale = cctx.updatingDgData(mktSaleId)\n                    mktSaleDD : DgDataDetails = cctx.updatingDgData(recIdBytes: saleId);\n\n                    // gets the previous MarketSaleData record\n                    previous : MarketSaleData = MarketSaleData::previous(mktSaleDD);\n                    // gets the new MarketSaleData record\n                    updated : MarketSaleData = MarketSaleData::updated(mktSaleDD);\n\n                    prevState : OtherSaleState = previous.moreFields.saleState\n                    nextState : OtherSaleState = updated.moreFields.saleState\n\n                    newValue : Value = mktSaleDD.output().value;\n                    true\n                    && cctx.requiresGovAuthority().orFail()\n                    && prevState.mustBePending(\"old\").trace(\"sale was Pending? \")\n                    && nextState.mustBeActive(\"new\").trace(\"Pending -> Active ok: \")\n                    // // validates updated record\n                    && updated.validate()\n                    && updated.validateActivating(newValue, mktSaleDD).trace(\"valid for activation: \")\n                    && true\n\n                }, \n                SellingTokens { recId, sellingUnitQuantity, unitSellPrice : Value } => {\n                    assert(cctx.withCharterRef().orFail(), \"can't\");\n\n                    mktSaleDD : DgDataDetails = cctx.updatingDgData(recIdBytes: recId);\n                    // print(\"SellingTokens: x\" + sellingUnitQuantity.show() );\n                    // print(\"               ^^\"+  recId.show());\n\n                    // gets the previous MarketSaleData record\n                    previous = MarketSaleData::previous(mktSaleDD);\n\n                    // gets the new MarketSaleData record\n                    updated = MarketSaleData::updated(mktSaleDD);\n\n                    correctActiveState = true\n                    && previous.moreFields.saleState.mustBeActive(\"old\").trace(\"sale was Active? \")\n                    && updated.moreFields.saleState.mustBeActive(\"new\").trace(\"sale is still Active? \")\n\n                    REQT(\"doesn't sell before the start date\")\n                    nowRange = getTimeRange(5*Duration::MINUTE);\n                    print(\"   --- now start: \" + nowRange.start.show());\n                    print(\"   --- startAt:   \" + previous.moreFields.fixedSaleDetails.startAt.show());\n                    print(\"   --- now end:   \" + nowRange.end.show());\n\n                    assert(\n                        nowRange.is_after(\n                            previous.moreFields.fixedSaleDetails.startAt\n                        ), \n                        \"sale not yet started\"\n                    );\n\n                    assert(sellingUnitQuantity > 0, \"must sell at least one unit\");\n                    assert(sellingUnitQuantity <= previous.moreFields.saleAssets.singleBuyMaxUnits, \n                        \"attempted to buy too many units\"\n                    );\n                    prevProgress : SaleProgressDetails = previous.moreFields.saleState.progressDetails;\n                    nextProgress : SaleProgressDetails = updated.moreFields.saleState.progressDetails;\n\n                    TODO(\"don't gather the payments to the mktSale, but follow the VxfDestination instead\");\n                    oldValue : Value = mktSaleDD.input().value;\n                    newValue : Value = mktSaleDD.output().value;\n\n                    purchasedTokens : Value = previous.moreFields.saleAssets.saleUnitAssets * sellingUnitQuantity;\n\n                    totalProgress = SaleProgressDetails{\n                        lastPurchaseAt: nowRange.start,\n                        prevPurchaseAt: prevProgress.lastPurchaseAt,\n                        chunkUnitCount: nextProgress.chunkUnitCount,\n                        chunkUnitsSold: prevProgress.chunkUnitsSold + sellingUnitQuantity\n                    };\n\n                    pricingStrategy = DynamicSaleV1{\n                        settings: previous.moreFields.fixedSaleDetails.settings,\n                        purchase: DTS_PurchaseInfo::create(\n                            unitsPurchased: sellingUnitQuantity,\n                            purchaseTime: nowRange.start,\n                            prevPurchaseTime: prevProgress.lastPurchaseAt,\n                            prevSalePace: previous.moreFields.saleState.salePace,\n                            totalProgress: totalProgress\n                        ),\n                        sale: previous,\n                        updatedSale: Option[MarketSaleData]::Some{updated}\n                        // prevSalePace: previous.moreFields.saleState.salePace,\n                        // updatedSettings: Option[DynamicSaleV1Settings]::None\n                    };\n                    \n                    // print(\"ok pricing strategy\");\n                    // unitPrice : Real = pricingStrategy.getUnitPrice();\n                    // print(\"  -- unitPrice: \" + unitPrice.show());\n\n                    // costForPurchase : Value = Value::lovelace( \n                    //     (\n                    //         // delegate this to the selected pricing strategy!\n                    //         unitPrice * sellingUnitQuantity\n                    //         * 1_000_000\n                    //     ).floor()\n                    // );\n\n                    paidValue : Value = newValue - oldValue + purchasedTokens;\n                    \n                    // print(\"  -- costForPurchase: \" + costForPurchase.show());\n                    print(\"  -- paidValue: \");\n                    print(paidValue.show());\n                    // if (!paidValue.contains(costForPurchase)) {\n                    //     error( \"insufficient payment\")\n                    // };\n                    // if (!costForPurchase.contains(paidValue)) {\n                    //     error( \"overpayment or wrong distribution of purchased tokens\")\n                    // };\n                    // print(\"  -- payment ok\");\n\n                    // todo: the purchased tokens are distributed to a\n                    //   configured sale-distribution contract (e.g. vesting/escrow/yield-farm)\n                    \n                    REQT(\"Matches redeemer payment with paid value\")\n                    assert(\n                        (\n                            paidValue == unitSellPrice * sellingUnitQuantity\n                        ).trace(\" -- found payment matching redeemer details? \"),\n                        \"actual payment/redeemer mismatch\"\n                    );\n\n                    true\n                    && correctActiveState\n                    && bREQT(\"ensures the sale record is updated with sale-progress details\")\n                    && nextProgress.validateUpdatedDetails(\n                        prevProgress, \n                        nowRange.start, \n                        sellingUnitQuantity\n                    ).trace(\"details updated correctly? \")\n                    && bREQT(\"ensures the sale record is updated with dynamic sale details\")\n                    && pricingStrategy.validateUpdatedDetails()\n                    && bREQT(\"Requires payment according to the dynamic pricing strategy\")\n                    && pricingStrategy.isRightPayment(paidValue).trace(\"  -- right payment? \")\n                    && true                    \n                    // && costForPurchase.contains(paidValue).trace(\"payment correct and tokens distributed? \")\n                    && true\n                },\n                MergingChildChunk => { //{_, _ /* recId, childChunkId */} => {\n                    error(\"todo: MergingChildChunk\")\n                },\n                Retiring => { //{_ /* recId */} => {                    \n                    error(\"todo: Retiring\")\n                    // Must not have active child chunks:\n                    // ...  previous.retiredThreads must be === previous.nestedThreads\n\n                    // updated \n                    // updated.state must be retired\n                }                \n            },\n            BurningActivities{ba} => {\n                ba.switch {\n                    DeletingRecord => error(\"use more specific burning activity\"),\n                    JoiningWithParentChunk => { //{_, _, _/* recId, parentChunkId */} => {\n                        // burns the indicated chunk UUT\n                        // requires the parent-chunk to be updated with MergingChildChunk\n                        //  ^^^ requires that the DelegatedData activities are structured \n                        //   ... with tight binding to delegate activities from this module\n                        // !!!!!!!!!!!!!!!!!!!!!!!!!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n                        error(\"todo: JoinWithParent: Implement the above details\") // ^^^\n                    },\n                    CleanupRetired => {//{_/* recId */} => {\n                        // burns the indicated chunk UUT\n\n                        error(\"todo: CleanupRetired\")\n                        // requires that the chunk is retired\n\n                        // burns the remaining previous.totalTokenCount\n\n                        // !!! todo: more details to account positively for the number of tokens actually sold\n                        //   ... by this chunk\n                        //   ... and in aggregate (this chunk and its children)\n\n                    }\n                }\n            },\n            _ => false\n        } || tx.serialize() == priorMddd.serialize()        \n    }\n\n    func supportedCapoDelegatePurposes(self) -> []String {\n        assert(true || /* prevent unused variable */ self == self, \"no way\" );\n         []String{\n            // \"nothingHereYet\",\n        }\n    }\n\n    //! Used only for validating non-IsDelegation datum types and activities.\n    // if you have any special admininstrative data structures that inform \n    // ...  your minting policy, this might be useful.  Otherwise, and typically,\n    // ... you should look to Activity validations above in additionalDelegateValidation,\n    // ...  in which the isDelegation token is being spent with an application-specific\n    // ...  activity/redeemer\n    func otherDatumValidation( self,\n        _priorMdd: DelegateDatum        \n    ) -> Bool {\n        neverTriggered = () -> {  error(\"never called\") };\n        self.switch{\n            // Note: this set of DelegateActivities is reserved for the IsDelegation datum.\n            //  Using it on any other Datum type will always fail and execution will never arrive here.\n            DelegateLifecycleActivities => neverTriggered(),\n            CapoLifecycleActivities => neverTriggered(),\n\n            // -- Application-specific activities can be added here \n            // -- for special & app-specific types of datum in a delegate,\n            // -- for EXCEPTIONAL cases, if you really know what you're doing.  \n            //  -- see above for normal cases\n\n            _ => false  // prevents non-exhaustive match errors, even if you remove the above neverTriggered() calls\n        }\n    }\n}\n\n\n// func getUnitPrice(mktSale: OutputDatum::Inline, now: Time, sellingUnitQuantity: Int) -> Real {\n//     mkPricingStrategy(\n//         MarketSaleData::from_data(mktSale.data), \n//         now, \n//         sellingUnitQuantity\n//     ).getUnitPrice()\n// }\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/MarketSale/MarketSalePolicy.hl", // source filename
    moduleName:  "MarketSalePolicy",
});

const MarketSaleData_hl = makeSource(
  "module MarketSaleData\n\nimport {\n    REQT,\n    bREQT,\n    TODO\n} from StellarHeliosHelpers\n\nimport {\n    DgDataDetails,\n    CapoCtx,\n    mkCapoCtx\n} from CapoHelpers\n\nimport {\n    DynamicSaleV1Settings\n} from DynamicSaleV1Settings\n\nimport {\n    SaleProgressDetails\n} from SaleProgressDetails\n\nimport {\n    VxfDestination\n} from VxfProtocol\n\nenum MarketSaleState {\n    Pending\n    Active\n    Retired\n    SoldOut\n}\n\nstruct SaleAssets {\n    saleUnitAssets: Value\n    singleBuyMaxUnits: Int\n    primaryAssetMph: MintingPolicyHash\n    primaryAssetName: ByteArray\n    primaryAssetTargetCount: Int \n    totalSaleUnits: Int\n}\n\nstruct FixedSaleDetails {\n    settings: DynamicSaleV1Settings\n    // ^ was saleStrategy: AnySaleStrategy \"strat\" \n    startAt: Time\n\n    // these details about the sale should always be sync'd to nested chunks\n    vxfTokensTo: Option[VxfDestination]\n    vxfFundsTo: Option[VxfDestination] \n}\n\nstruct OtherSaleState {\n    progressDetails: SaleProgressDetails\n    salePace: Real\n    state: MarketSaleState \n    // ^ was saleStrategyState: AnySaleState \"stratState\" \n\n    func mustBeActive(self, which : String) -> Bool {\n        if (self.state == MarketSaleState::Active) {\n            true\n        } else {\n            error(which + \": state must be Active\")\n        }\n    }\n\n    func mustBePending(self, which : String) -> Bool {\n        if (self.state == MarketSaleState::Pending) {\n            true\n        } else {\n            error(which + \": state must be Pending\")\n        }\n    }\n}\n\nstruct ThreadInfo {\n    // These details will always start with zero values.  \n    // They act as reference-counters, and they increment during split/join transactions\n    nestedThreads: Int\n    retiredThreads: Int\n    \n    // Each chunk should point to the chunk it was split from.  Level 1 chunks will have parentChunkId == saleId\n    parentChunkId: ByteArray \n    chunkForkedAt: Time \n\n    // saleId is empty in the root MarketSale.\n    // each split chunk should point to the root MarketSale \n    saleId: ByteArray \n}\n\nstruct MoreFields {\n    saleState: OtherSaleState \n    fixedSaleDetails: FixedSaleDetails \n    saleAssets: SaleAssets \n    threadInfo: ThreadInfo \n}\n\nstruct MarketSaleData {\n    id: ByteArray  \"@id\"\n    type: String \"tpe\"\n    name: String\n    moreFields: MoreFields \"mo\"\n\n    // func totalSaleSize(self) -> Value {\n    //     self.moreFields.saleAssets.saleUnitAssets * self.moreFields.saleAssets.totalSaleUnits\n    // }\n\n    func validate(self) -> Bool {\n        print(\"mktSale: validate()\");\n        assert(self.type == \"mktSale\", \"wrong type\");\n        assert(self.name.serialize().length > 10, \"name must be at least 10 characters\");\n        saleAssets = self.moreFields.saleAssets;\n        assert(\n            saleAssets.totalSaleUnits *\n            saleAssets.saleUnitAssets\n            .get_assets()\n                .get_policy(saleAssets.primaryAssetMph)\n                .get(saleAssets.primaryAssetName) \n            == saleAssets.primaryAssetTargetCount, \n            \"saleUnitAssets' primary-token value must divide the target-count over the sale-unit count\"\n        );\n\n        // assert(self.currentUnitPrice > 0, \"currentUnitPrice must be greater than zero\");\n\n        assert(saleAssets.saleUnitAssets.get_assets().to_map().length > 0, \"saleUnitAssets must not be empty\");\n        assert(saleAssets.totalSaleUnits > 0, \"totalSaleUnits must be greater than zero\");\n        assert(saleAssets.singleBuyMaxUnits > 0, \"singleBuyMaxUnits must be greater than zero\");\n        assert(saleAssets.singleBuyMaxUnits < saleAssets.totalSaleUnits, \"singleBuyMaxUnits must be less than totalSaleUnits\");\n\n        true\n    }\n\n    func validatePendingDetails(self) -> Bool {\n        print(\"mktSale: validatePendingDetails()\");\n        threadInfo = self.moreFields.threadInfo;\n        assert(threadInfo.parentChunkId == #, \"parentChunkId must be empty\");\n        assert(threadInfo.saleId == self.id, \"saleId must be equal to id\");\n        assert(threadInfo.nestedThreads == 0, \"nestedThreads must be zero\");\n        assert(threadInfo.retiredThreads == 0, \"retiredThreads must be zero\");\n\n        true\n    }\n\n    func validateCreatedDetails(self) -> Bool {\n        print(\"mktSale: validateCreatedDetails()\");\n        saleState = self.moreFields.saleState;\n        assert(saleState.salePace == 1.0, \"salePace must be initialized to 1.0\");\n        // assert(self.weightedPace == 0 * Duration::SECOND, \"weightedPace must be zero\");\n        saleDetails = self.moreFields.fixedSaleDetails;\n        saleAssets = self.moreFields.saleAssets;\n        true\n        && saleState.mustBePending(\"created\").trace(\"must be Pending? \")\n        && saleDetails.settings.validateCreatedDetails()\n        && saleState.progressDetails.validateCreatedDetails(\n            saleDetails.startAt, \n            saleAssets.totalSaleUnits\n        ).trace(\"progress details OK? \")\n        && true\n    }\n\n    func validateActivating(self, utxoValue: Value, DDdetails : DgDataDetails ) -> Bool {\n        print(\"mktSale: validateActivating()\");\n        prevMktSale : MarketSaleData = MarketSaleData::from_data(\n            DDdetails.inputData()\n        );\n        // expectedDatum : ByteArray = prevMktSale.copy(\n        //     state: MarketSaleState::Active\n        // ).serialize();\n        // print(\"expectedDatum: \");\n        // print(expectedDatum.show());\n        // print(\"actualDatum: \");\n        // print(self.serialize().show());\n        // assert(expectedDatum == self.serialize(), \"Activating a sale may only change the state to Active\");\n\n        assert(self.name == prevMktSale.name, \"name must not change\");\n        assert(\n            prevMktSale.moreFields.saleState.mustBePending(\"old\"), \n            \"previous sale not Pending\"\n        );\n        assert(self.moreFields.saleState.state == MarketSaleState::Active, \"state must be Active\");\n        // ok to change the sale start time\n        // assert(self.startAt == prevMktSale.startAt, \"startAt must not change\");\n\n        // assert(self.lastPurchaseAt == prevMktSale.lastPurchaseAt, \"lastPurchaseAt must not change\");\n        // assert(self.prevPurchaseAt == prevMktSale.prevPurchaseAt, \"prevPurchaseAt must not change\");\n\n        // assert(self.weightedPace == prevMktSale.weightedPace, \"weightedPace must not change\");\n        // ok to change the assets & sale units, as long as everthing else checks out\n        //    assert(self.saleUnitAssets == prevMktSale.saleUnitAssets, \"saleUnitAssets must not change\");\n        //    assert(self.totalSaleUnits == prevMktSale.totalSaleUnits, \"totalSaleUnits must not change\");\n        //    assert(self.singleBuyMaxUnits == prevMktSale.singleBuyMaxUnits, \"singleBuyMaxUnits must not change\");\n        //    assert(self.currentUnitPrice == prevMktSale.currentUnitPrice, \"currentUnitPrice must not change\");\n\n        assets : Value = utxoValue.get_assets() - DDdetails.uutValue();\n        print(\"expected assets: \");\n        print(assets.show());\n\n        assert(self.moreFields.saleAssets.saleUnitAssets * self.moreFields.saleAssets.totalSaleUnits == assets, \"utxo must contain the supply of tokens to be sold\");\n\n        REQT(\"validates VxfDestination in vxfTokensTo field\");\n        self.moreFields.fixedSaleDetails.vxfTokensTo.switch {\n            Some{vxf} => {\n                assert(vxf.validate(\"vxfTokensTo\"), \"<-- that fails; this can't\");\n            },\n            None => {\n                print(\"  -- vxfTokensTo is not restricted\");\n            }\n        }\n\n        REQT(\"validates VxfDestination in vxfFundsTo field\");\n        assert(\n            (\n                self.moreFields.fixedSaleDetails.vxfFundsTo.unwrap().validate(\"vxfFundsTo\")\n            ).trace(\"  -- vxfFundsTo ok? \"), \n            \"^^^ that fails; this can't\"\n        );\n\n\n        true\n        && self.validatePendingDetails() \n        && true\n    }\n\n    func previous(ddd : DgDataDetails) -> MarketSaleData {\n        MarketSaleData::from_data(ddd.inputData())    \n    }\n\n    func updated(ddd : DgDataDetails) -> MarketSaleData {\n        MarketSaleData::from_data(ddd.outputData())\n    }\n\n   func validateAdding(self, ddd : DgDataDetails, mph : MintingPolicyHash, tn: ByteArray) -> Bool {\n        updated : MarketSaleData = MarketSaleData::updated(ddd);\n        outValue : Value = ddd.output().value;\n \n        updatedAssetCount : Int = outValue.get_policy(mph).get(tn);\n                // print(\"primary tn\" + self.primaryAssetName.decode_utf8());\n                // print(\"this tn: \" + tn.decode_utf8());\n                // print(\"primary mph\" + self.primaryAssetMph.show());\n                // print(\"this mph: \" + mph.show());\n\n        currentAssets = self.moreFields.saleAssets;\n        currentState = self.moreFields.saleState;\n        nextAssets = updated.moreFields.saleAssets;\n        nextState = updated.moreFields.saleState;\n        isPrimary : Bool = ( true\n            && ( mph == currentAssets.primaryAssetMph )\n                .trace(\"    -- is primary mph? \")\n            && ( tn == currentAssets.primaryAssetName )\n                .trace(\"    -- is primary tn? \")\n        ).trace(\"  -- isPrimary? \");\n            \n        print(\"vvv ... for added tn: \"+ tn.show());\n        updatedAssetChunkSize : Int = nextAssets.saleUnitAssets.get_policy(mph).get(tn);\n        expectedAssetCount : Int = if (isPrimary) {\n            existingAssetChunkSize : Int = currentAssets.saleUnitAssets.get_policy(mph).get(tn);\n            if (updatedAssetChunkSize < existingAssetChunkSize) {\n                error(\"primary asset chunk size shouldn't decrease\")\n            };\n            print(\"    ... each sale-unit has \" + updatedAssetChunkSize.show());\n            print(\"    ... sale now supplied with \" + updatedAssetCount.show());\n            print(\"    ... ^ / saleUnits  \"+ nextAssets.totalSaleUnits.show());\n            percentSupplied = 100.0 * updatedAssetCount / nextAssets.primaryAssetTargetCount;\n            print(\"Now supplied with \"+ percentSupplied.show() +\"% of the primary token\");\n    \n            // allows that the primary tokens can be progressively funded,\n            // without disturbing the sale-unit chunk size for that primary token\n            updatedAssetCount\n        } else {            \n            isEvenChunk : Bool = updatedAssetCount % nextAssets.totalSaleUnits == 0;\n            print(\"got \"+ updatedAssetCount.show());\n            print(\"Expected chunks of \"+ nextAssets.totalSaleUnits.show());\n            if (!isEvenChunk) {\n                error(\"new non-primary asset must have an even distribution for each unit of sale\")\n            };\n\n            print(\"    ... each sale-unit has \" + updatedAssetChunkSize.show());\n            print(\"    ... ^ times sale-units  \"+ nextAssets.totalSaleUnits.show());\n\n            // non-primary tokens must have the sale-unit sync'd with the deposited value\n            expected : Int = updatedAssetChunkSize * nextAssets.totalSaleUnits;\n            print(\"Expecting the value to be = \"+ expected.show() + \" (= current Value/this-tn)\");\n            \n            expected\n        };\n        // check that the deposited assets don't exceed the number of tokens implied by the saleUnitAssets * totalSaleUnits \n        print(\"    ... updated value has \"+ updatedAssetCount.show() + \" \" + tn.show());\n        hasMatchyValue : Bool = if (updatedAssetCount != expectedAssetCount) {\n            if (isPrimary) {\n                error(\"no way\") // unreachable\n            };\n            error(\"The updated sale-units * sale-unit-count / this-tn must match the updated deposit-value / this-tn\")\n        } else { true };\n\n        true\n        && hasMatchyValue\n        && currentState.mustBePending(\"old: AddTokens\").trace(\"input sale must be Pending: \")\n        && nextState.mustBePending(\"new:AddTokens\").trace(\"updated sale must be Pending: \")\n        && updated.validate()\n        && updated.validateCreatedDetails()\n        && updated.validatePendingDetails()\n        && true\n    }\n}", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/MarketSale/MarketSaleData.hl", // source filename
    moduleName:  "MarketSaleData",
});

const SaleProgressDetails_hl = makeSource(
  "module SaleProgressDetails\n\nimport {\n    REQT,\n    bREQT,\n    TODO\n} from StellarHeliosHelpers\n\nstruct SaleProgressDetails {\n    lastPurchaseAt: Time \n    prevPurchaseAt: Time \n\n    chunkUnitCount: Int \n    chunkUnitsSold: Int \n\n    func validateCreatedDetails(self, \n        saleStartTime : Time, \n        totalSaleUnits : Int\n     ) -> Bool {\n        print(\"progDtls: validate\");\n        assert(self.lastPurchaseAt == saleStartTime, \"lastPurchaseAt must be equal to startAt\");\n        assert(self.prevPurchaseAt == saleStartTime, \"prevPurchaseAt must be equal to startAt\");\n        assert(self.chunkUnitCount == totalSaleUnits, \"chunkUnitCount must be equal to totalSaleUnits\");\n        assert(self.chunkUnitsSold == 0, \"chunkUnitsSold must be zero\");\n        // assert(self.lastPurchaseAt >= self.prevPurchaseAt, \"lastPurchaseAt must be greater than or equal to prevPurchaseAt\");\n        true    \n    }\n\n    func validateUpdatedDetails(\n        self, \n        prevProgress: SaleProgressDetails, \n        now: Time,\n        unitsSold: Int\n    ) -> Bool {\n        print(\"SaleProgressDetails: validating update\");\n\n        REQT(\"Updates last-purchase-time to the current tx time\");\n        print(\"   ----  lastPurchaseAt: \" + self.lastPurchaseAt.show());\n        print(\"   ----  now: \" + now.show());\n        assert(\n            (self.lastPurchaseAt == now).trace(\"  -- updated lastPurchaseAt ok? \"),\n            \"lastPurchaseAt not updated correctly\"\n        );\n\n        REQT(\"Keeps a record of the prior purchase time for dynamic pacing\");\n        prevNow : Time = prevProgress.lastPurchaseAt;\n        assert(self.prevPurchaseAt == prevNow,\n            \"must update prevPurchaseAt to prev lastPurchaseAt \" + prevNow.show() + \n            \", got \" + self.prevPurchaseAt.show()\n        );\n\n        REQT(\"Updates total-sale-units to include the new units being purchased\");\n        print(\"   ----  prev unitsSold: \" + prevProgress.chunkUnitsSold.show());\n        print(\"   ----  unitsSold: \" + self.chunkUnitsSold.show());\n        assert(\n            (\n                self.chunkUnitsSold == prevProgress.chunkUnitsSold + unitsSold\n            ).trace(\"  -- updated chunkUnitsSold ok? \"),\n            \"must update progress units sold\"\n        );\n\n        REQT(\"Ensures the total number of units available for purchase is unchanged\");\n        assert(\n            (\n                self.chunkUnitCount == prevProgress.chunkUnitCount\n            ).trace(\"  -- chunkUnitCount unchanged? \"),\n            \"must not change chunk unit count\"\n        );\n        print(\"✔ progress details updated OK\");\n\n        true\n    }\n}", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/MarketSale/SaleProgressDetails.hl", // source filename
    moduleName:  "SaleProgressDetails",
});

const DynamicSaleV1_hl = makeSource(
  "module DynamicSaleV1\n\nimport {\n    REQT,\n    bREQT,\n    TODO\n} from StellarHeliosHelpers\n\nimport {\n    MarketSaleData\n} from MarketSaleData\n\nimport {\n    DynamicSaleV1Settings\n} from DynamicSaleV1Settings\n\nimport {\n    SaleProgressDetails\n} from SaleProgressDetails\n\n// struct DynamicSaleV1State {\n//     dynamicPace: Real \"dynaPace\"\n    \n//     func validateCreatedDetails(self) -> Bool {\n//         assert(self.dynamicPace == 1.0, \"dynamic pace must be initialized to 1.0\");\n//         true\n//     }\n// }\n\nfunc maxReal(a: Real, b: Real) -> Real {\n    // assert(true || /* never executed */ self.serialize() == self.serialize(), \"no way\");\n    if (a > b)  { a } else { b }\n}\n\nfunc minReal(a: Real, b: Real) -> Real {\n    // assert(true || /* never executed */ self.serialize() == self.serialize(), \"no way\");\n    if (a < b) { a } else { b }\n}\n\n// information about a specific, single purchase\nstruct DTS_PurchaseInfo {\n    inferredPace: Real\n    hoursSinceLastPurchase: Real\n\n    unitsPurchased: Int\n    purchaseTime: Time\n    // previousPurchaseTime: Time\n    \n    // dynamicPace: Real\n    prevSalePace: Real\n\n    totalProgress: SaleProgressDetails\n\n    // func inferredPace(self) -> Real {\n    //      p : Real = \n    //      self.unitsPurchased / self.hoursSinceLastPurchase()\n    //      ;print (\"    ---- inferredPace \" + p.show());\n    //      p\n    // }\n\n    // // probably can optimize\n    // func hoursSinceLastPurchase(self) -> Real {\n    //     h : Real = \n    //      (   \n    //         (\n    //             self.purchaseTime - self.previousPurchaseTime\n    //         ) / Duration::new(1) * 1_000_000.0\n    //         / 3_600_000.0\n    //     ) / 1_000_000.0\n    //     ; print(\"    ---- hoursSinceLastPurchase \" + h.show());\n    //     h\n    // }\n    func create(\n        unitsPurchased: Int, \n        purchaseTime: Time, \n        prevPurchaseTime: Time,\n        prevSalePace: Real,\n        totalProgress: SaleProgressDetails\n    ) -> DTS_PurchaseInfo {\n        // using Ratio adds some library size to the bundle\n        // hoursSinceLastPurchase  = Ratio::new(\n        //     (purchaseTime - prevPurchaseTime) / Duration::MINUTE,\n        //     60\n        // )\n        hoursSinceLastPurchase : Real = (\n            (purchaseTime - prevPurchaseTime) / Duration::new(1)* 1_000_000.0/ \n            3_600_000.0\n        ) / 1_000_000.0;\n        REQT(\"Infers the pace of the current purchase\")\n        print(\"      ---- unitsPurchased \" + unitsPurchased.show());\n        print(\"      ---- hoursSinceLastPurchase \" + hoursSinceLastPurchase.show());\n        // inferredPace = Ratio::new(\n        //     unitsPurchased, 1\n        // ) / hoursSinceLastPurchase;\n        inferredPace : Real = unitsPurchased / hoursSinceLastPurchase;\n        print(\"  -- inferredPace \" + inferredPace.show());\n        DTS_PurchaseInfo{\n            inferredPace: inferredPace,\n            hoursSinceLastPurchase: hoursSinceLastPurchase,\n            unitsPurchased: unitsPurchased,\n            purchaseTime: purchaseTime,\n            // previousPurchaseTime: prevPurchaseTime,\n            prevSalePace: prevSalePace,\n            totalProgress: totalProgress\n        }\n    }\n}\n\nstruct DynamicSaleV1 {\n    settings: DynamicSaleV1Settings\n    purchase: DTS_PurchaseInfo\n\n    sale: MarketSaleData\n    updatedSale: Option[MarketSaleData]\n    \n    // prevSalePace: Real\n    // updatedSettings: Option[DynamicSaleV1Settings]\n    // updatedState: DynamicSaleV1State\n\n    func isRightPayment(self, payment: Value) -> Bool {\n        expected : Real = self.unitPriceForSale() * self.purchase.unitsPurchased;\n        actual : Real = payment.get_lovelace() / 1_000_000.0;\n        \n        print(\"    ---- expected payment \" + expected.show());\n        print(\"    ---- actual payment \" + actual.show() + \" +/- 0.000002\");\n        assert(payment.get_assets().is_zero(), \"non-ADA assets not yet supported here\");\n\n    if ( (actual - expected).abs() > 0.000002) {\n            error(\"payment amount is not correct\")\n        };\n        true\n    }\n\n    // func updatedSettings(self) -> DynamicSaleV1Settings {\n    //     self.updatedSale.switch {\n    //         None => error(\"must have updatedSale during tx validation\"),\n    //         Some{sale} => {\n    //             AnySaleStrategy::from_data(sale.saleStrategy).switch {\n    //                 DynamicSaleV1{settings /* DynamicSaleV1Settings */ } => settings,\n    //                 _ => error(\"no way\") // should never happen\n    //             }\n    //         }\n    //     }\n    // }\n\n    func unitPriceForSale(self) -> Real {\n        // paceThisPurchase : Real = self.purchase.inferredPace(); // units / hours-since-last-purchase\n        print(\"    ---- target price \" + self.settings.targetPrice.show());\n        targetPrice = self.settings.targetPrice\n        price: Real = targetPrice\n            * self.pricingFactorOverallProgress()\n            * self.pricingFactorDynamicPace();\n            print(\"    ---- unitPriceForSale - unclamped \" + price.show());\n\n        // clamp the price to min/max limits\n        clamped : Real = minReal(\n            maxReal(price, self.settings.minPrice),\n            self.settings.maxPrice\n        );\n        print(\"    -- unitPriceForSale: clamped = \" + clamped.show());\n        clamped\n    }\n\n    func validateUpdatedDetails(self) -> Bool {\n        print(\"DynamicSaleV1: validating updated details\");\n        upd : MarketSaleData = self.updatedSale.switch {\n            None => error(\"must have updatedSale during tx validation\"),\n            Some{s} => s\n        };\n        REQT(\"EXPECTS the basic SaleProgressDetails to be validated separately\")\n\n        REQT(\"The sale settings must not be changed\");\n        prevSettings : DynamicSaleV1Settings = self.settings;\n        nextSettings = upd.moreFields.fixedSaleDetails.settings;\n        assert(\n            (\n                prevSettings == nextSettings\n            ).trace(\"  -- settings unchanged? \"), \n            \"settings were changed\"\n        );\n\n        expectedPace : Real = self.nextSalePace();\n        nextPace : Real = upd.moreFields.saleState.salePace;\n\n        // prevState : SaleProgressDetails = self.purchase.totalProgress;\n\n        REQT(\"Updates the nextPace to reflect the ongoing dynamic sale progress\");\n        print(\"  ---- updated salePace: \" + nextPace.show());\n        assert(\n            (\n                (nextPace - expectedPace).abs() < 0.000005\n            ).trace(\"  -- nextPace ok? \"),\n            \"wrong next salePace in updated sale, expected \" + expectedPace.show()\n        );\n\n        REQT(\"Guards against underflow in dynamic pace calculations, by enforcing a minimum chunk age\");\n        chunkAge : Duration = upd.moreFields.saleState.progressDetails.lastPurchaseAt\n            - self.sale.moreFields.saleState.progressDetails.lastPurchaseAt;\n\n        print(\"  ---- chunkAge: \" + chunkAge.show());\n        assert(\n            (chunkAge >= 10 * Duration::MINUTE).trace(\"  -- chunkAge ok? \"),\n            \"sale chunk too fresh (less than 10 minutes)\"\n        );\n\n        true\n    }\n\n    func actualSellingPace(self) -> Real {\n        t : Real = (\n            self.purchase.unitsPurchased\n            + self.sale.moreFields.saleState.progressDetails.chunkUnitsSold \n        ) / self.elapsedSaleHours();\n        print(\"    ---- actualSellingPace \" + t.show());\n        t\n    }\n\n    func targetSellingPace(self) -> Real {\n        // print(\"selling time \" + self.settings.targetedSellingTime.show());\n        // print(\"  -- in hours\" + (100 *  self.settings.targetedSellingTime / Duration::HOUR / 100.0).show());\n        chunkUnitCount : Int = self.purchase.totalProgress.chunkUnitCount;\n        // print(\"chunkUnitCount\"+ self.purchase.totalProgress.chunkUnitCount.show());\n        t : Real = \n         (chunkUnitCount + 0.0) / (\n             self.settings.targetedSellingTime * 100 / Duration::HOUR / 100.0\n        ) \n\n        ; print( \"    ---- targetSellingPace \" + t.show());\n        t\n\n        // returns the CHUNK-RELATIVE selling pace\n        // ^^^ distinct from sale-aggregate pace vvv\n        // return self.sale.totalSaleUnits / self.settings.targetedSellingTime\n    }\n\n    func elapsedSaleHours(self) -> Real {\n        h : Real = \n        ( self.purchase.purchaseTime - self.sale.moreFields.fixedSaleDetails.startAt ) * 1_000_000 / Duration::HOUR / 1_000_000.0\n        ;print(\"    ---- elapsedSaleHours \" + h.show());\n        h\n    }\n\n    // 5000 hours = 208.3333333333333 days\n   // = 5000 * 3600 * 1000 = 18_000_000_000 ms\n   // 5 minutes = 60 * 5 * 1000 = 300_000 ms\n    // at the 5 minute mark, the total pace would be  300 / 18_000_000 = 0.000017\n    // this is okay, though it's near the lower limit of Helios fixed-point precision\n\n    // using elapsedSaleHours in actualSellingPace helps avoid underflow that could otherwise\n    // arise when using elapsed time MS / targetSellingTime, when the target time is very large\n\n    // if the actual selling pace is near 0, then the overall pace will also be near 0\n    //   ... or worst case, actually 0 due to underflow.\n\n    func overallPaceIncludingThisPurchase(self) -> Real {\n        op : Real = \n        self.actualSellingPace() / self.targetSellingPace()\n        ;print(\"    ---- overallPaceIncludingThisPurchase \" + op.show());\n        op\n        \n        // // fraction of time elapsed can be by hours, but it can just as easily use milliseconds; \n        // // ... the HOURs (or ms) cancel each other out in the division.\n        // timeProgress: Real  = self.elapsedTime() / self.settings.targetedSellingTime\n\n        // saleProgress : SaleProgressDetails = self.purchase.totalProgress;\n        // unitsProgress : Real = saleProgress.chunkUnitsSold / saleProgress.chunkUnitCount;\n\n        // // net overall pacing is the portion of units sold vs the portion of time elapsed\n        // unitsProgress / timeProgress\n    }\n\n    func pricingFactorDynamicPace(self) -> Real {\n        // from Google Sheet:\n        // =max(0.5,(\n        //     LET(prevWeight, 1\n        //    ,LET(prevPace, recent_pace_in\n        //    ,LET(nextPace, recent_pace_out\n        //    ,LET(nextWeight, weightNextDynaPace,\n        //     ( \n        //         IF(prevPace=0,1,\n        //           prevPace / targetSellingPace\n        //         ) * prevWeight\n        //       + IF(nextPace=0,1,\n        //          nextPace / targetSellingPace\n        //         ) * nextWeight \n        //     ) / ( prevWeight +nextWeight )\n        //   ))))\n        //   ))\n\n        // the weight of the previous dyanamic pace\n        prevWeight : Real = 1.0;\n        nextPace : Real = self.nextSalePace();\n        prevPace : Real = self.purchase.prevSalePace;\n        // the weight of the next dynamic pace is variable\n        nextWeight : Real = self.settings.pricingWeightDynaPace;\n        targetSellingPace : Real = self.targetSellingPace();\n        r : Real = \n        ( \n            if (prevPace == 0) { 1.0 } else { \n                prevPace / targetSellingPace\n            } * prevWeight\n            + if (nextPace == 0) { 1.0 } else { \n                nextPace / targetSellingPace\n            } * nextWeight\n        ) / (prevWeight + nextWeight)\n\n        ;print(\"  -- pricingFactorDynamicPace \" + r.show());\n        r\n    }\n\n    func nextSalePace(self) -> Real {\n        // from Google Sheet:\n        // = LET(nextWeight, \n        //     if(purchase_inferred_pace > prev_dyna_pace,\n        //         dynaPaceFasterSaleWeight,\n        //         if (purchase_inferred_pace/targetSellingPace > 1,\n        //           purchase_inferred_pace/targetSellingPace,\n        //           max(1,time_lag * dynaPaceIdleDecayRate)\n        //         )\n        //       ),\n        //      ( purchase_inferred_pace*nextWeight\n        //        + prev_dyna_pace\n        //      ) / (1+nextWeight)\n        //   )\n        purchase : DTS_PurchaseInfo = self.purchase;\n        settings : DynamicSaleV1Settings = self.settings;\n        // sale : MarketSaleData = self.sale;\n        \n        REQT(\"Computes the next sale pace, escalating when the pace increases or decaying when the pace below the target pace\");\n        inferredPace : Real = purchase.inferredPace;\n        print(\"    ---- inferredPace \" + inferredPace.show());\n        nextPaceWeight : Real = if (inferredPace > purchase.prevSalePace) {\n            // this buyer is buying faster than the previous pace,\n            //  ... indicating strong demand and likely opportunity to get a higher price\n            //  ... or at least for that higher price to make space for easing buyer exuberance\n            print(\"    ---- nextPaceWeight: dynaPaceFasterSaleWeight (sale is speeding up)\");\n            settings.dynaPaceFasterSaleWeight\n        } else {\n            if (inferredPace > self.targetSellingPace()) {\n                // the pace is slowing down some, but still selling faster than the target pace\n                //   ... so it's not necessary to soften the price for this buyer or apply an idle-decay\n                // this lets the dynamic pace evolve gently downward to reflect\n                //   ... that the \"recent pace\" isn't quite as fast as it was.\n                // This works in opposition to the escalation effect of the increasing pace.\n                // The current buy will be at higher price than the previous one,\n                //   ... but if the next buy is \"at target pace\", then it will be at a lower price,\n                //   ... reflecting the lower demand pressure.\n                //   ... This creates a small window for a single buyer to game a slightly\n                //   ... lower price, but other people can slip in and buy at that price too. \n                print(\"    ---- nextPaceWeight: 1.0 (sale is proceeding faster than target pace)\");\n                1.0\n            } else {\n                // The pace has slowed significantly - not only lower demand pressure,\n                //   ... but the new buy happened slower than the target pace.  This\n                //   ... clearly indicates that the exuberance-limitations above worked,\n                //   ... slowing down the pace.  This is a good thing, because it means\n                //   ... a more moderate price.\n                // If it's been a short time, we don't give this buyer the benefit\n                //   ... of the idle-decay, as a buyer could just be trying to\n                //   ... game the system by sandbagging the pace, only to take advantage \n                //   ... of that lower pace.\n                // However, if it's actually been a significant amount of time, and other \n                //   ... buyers have had a chance to buy at a consensually supportable price, \n                //   ... then clearly it's important to reduce the price for this buyer.\n                // Without the idle-decay, the pricing would remain high, and likely\n                //   ... the sale would stall out.\n                // This applies the decay rate in the form of a > 1.0, or stronger, weight \n                //   ... of the slower pace, reducing the next-dynamic-pace \n                //   ... as well as the current price.\n                print(\"    ---- nextPaceWeight: slowing sale; using dynaPaceIdleDecayRate \");\n                print(\"      ---- hoursSinceLastPurchase \" + purchase.hoursSinceLastPurchase.show());\n                print(\"      ---- * dynaPaceIdleDecayRate \" + settings.dynaPaceIdleDecayRate.show());\n                result = maxReal(\n                    1.0, purchase.hoursSinceLastPurchase * settings.dynaPaceIdleDecayRate\n                )\n                print(\"  -- nextPaceWeight = \" + result.show());\n                result\n            }\n        };\n        print(\"    ---- nextPaceWeight \" + nextPaceWeight.show());\n        psp : Real = purchase.prevSalePace;\n        print(\"    ---- prev salePace \" + psp.show());\n\n        nextDynamicPace : Real = (inferredPace * nextPaceWeight + psp) \n            / (nextPaceWeight + 1)\n        print(\"    ---- next salePace: \" + nextDynamicPace.show());\n        nextDynamicPace\n    }\n\n\n    func pricingFactorOverallProgress(self) -> Real {\n        // from Google Sheet:\n        // = LET(ceilingHeight, 1-paceDiscountFloorPoint\n        //     ,LET(aboveFloor,current_pace-paceDiscountFloorPoint\n        //     ,LET(relativeHeight, if(aboveFloor<=0,0, aboveFloor/ceilingHeight)\n        //     ,LET(discountDepth,1-relativeHeight\n        //     , LET(discountEarned, \n        //       discountDepth*paceDiscountWhenSlow\n        //     , LET(clampedMaxDiscount,\n        //       MAX(0,MIN(discountEarned, paceDiscountWhenSlow))\n        //     , LET(priceExpansion,\n        //       if(current_pace<1,1, \n        //          1+(\n        //            (current_pace-1)*(1+paceExpansionWhenFast)/3\n        //          )\n        //       )\n        //     , LET(RESULT, \n        //       (1-clampedMaxDiscount) * priceExpansion,  \n        //       RESULT\n        //     ))))))))\n\n        settings : DynamicSaleV1Settings = self.settings;\n        overallPacingProgress : Real = self.overallPaceIncludingThisPurchase();\n        discountEarned : Real = self.progressPricingDiscountDepth(overallPacingProgress) * \n           settings.progressPricingDiscountWhenSlow;\n        print(\"      ---- unclamped discountEarned \" + discountEarned.show());\n        clampedMaxDiscount : Real = maxReal(\n            0.0, minReal(\n                discountEarned, settings.progressPricingDiscountWhenSlow\n            )\n        );\n        print(\"      ---- clampedDiscount \" + clampedMaxDiscount.show());\n\n        r : Real = \n        (1 - clampedMaxDiscount) * self.priceExpansion(overallPacingProgress)\n        ;print(\"  -- pricingFactorOverallProgress \" + r.show());\n        r\n    }\n\n    func priceExpansion(self, overallPace: Real) -> Real {\n        expansion : Real = if (overallPace < 1.0) {\n            1.0\n        } else {\n            1.0 + (\n                (overallPace - 1.0) \n                * (1.0 + self.settings.progressPricingExpansionWhenFast) \n                / 3.0\n            )\n        }\n        ;print(\"    ---- priceExpansion \" + expansion.show());\n        expansion\n    }\n\n    func progressPricingDiscountDepth(self, overallPace: Real) -> Real {\n        settings : DynamicSaleV1Settings = self.settings;        \n\n        print(\"      ---- pPDD overallPace \" + overallPace.show());\n        ceilingHeight : Real = 1.0 - settings.progressPricingDiscountFloorPoint;       \n        // = 0.5 to 0.95\n\n        \n        aboveFloor : Real = if (overallPace > settings.progressPricingDiscountFloorPoint) {\n            overallPace - settings.progressPricingDiscountFloorPoint\n        } else {  0.0 };\n        relativeHeight : Real = if ( aboveFloor <= 0 ) { 0.0 } else { aboveFloor / ceilingHeight };\n        \n        print(\"      ---- pPDD ceilingHeight \" + ceilingHeight.show());\n        print(\"      ---- pPDD aboveFloor \" + aboveFloor.show());\n        print(\"      ---- pPDD relativeHeight \" + relativeHeight.show());\n\n        ppdd : Real = 1 - relativeHeight\n        print(\"    ---- progressPricingDiscountDepth \" + ppdd.show());\n        ppdd\n    }\n}\n\n// use this pattern inline, instead of as a function, to enable\n// optimizations in the surrounding code for accessing the various\n// details mentioned\n//\n// func mkSaleController(\n//     prevMktSale: MarketSaleData, \n//     now: Time, \n//     sellingUnitQuantity: Int,\n//     updatedSale: Option[MarketSaleData] = Option[MarketSaleData]::None\n// ) -> DynamicSaleV1 {\n//     prevProgress : SaleProgressDetails = prevMktSale.progressDetails;\n//     totalProgress: SaleProgressDetails = SaleProgressDetails{\n//         lastPurchaseAt: now,\n//         prevPurchaseAt: prevProgress.lastPurchaseAt,\n//         chunkUnitCount: prevProgress.chunkUnitCount,\n//         chunkUnitsSold: prevProgress.chunkUnitsSold + sellingUnitQuantity\n//     };\n//     prevPace : Real = prevMktSale.salePace;\n//     DynamicSaleV1{\n//         settings: prevMktSale.saleSettings,\n//         purchase: DTS_PurchaseInfo{\n//             unitsPurchased: sellingUnitQuantity,\n//             purchaseTime: now,\n//             previousPurchaseTime: prevProgress.lastPurchaseAt,\n//             prevSalePace: prevPace,\n//             totalProgress: totalProgress\n//         },\n//         sale: prevMktSale,\n//         updatedSale: updatedSale,\n//         prevSalePace: prevPace,\n//         updatedSettings: Option[DynamicSaleV1Settings]::None\n//     }\n// }\n\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/MarketSale/DynamicSaleV1.hl", // source filename
    moduleName:  "DynamicSaleV1",
});

const DynamicSaleV1Settings_hl = makeSource(
  "module DynamicSaleV1Settings\n\nstruct DynamicSaleV1Settings {\n    targetPrice: Real  // same as targetPriceBenchmark\n    targetedSellingTime: Duration  \n\n    minPrice: Real  // same as minSalePrice\n    maxPrice: Real  // same as maxSalePrice\n\n    // 0.20 by default\n    progressPricingDiscountFloorPoint: Real // same as paceDiscountFloorPoint\n    // 0.25 by default\n    progressPricingDiscountWhenSlow: Real  // same as paceDiscountWhenSlow\n    // 0.20 by default\n    progressPricingExpansionWhenFast: Real // same as paceExpansionWhenFast\n\n    // 0.3 by default\n    dynaPaceFasterSaleWeight: Real \n    // 0.5 by default\n    dynaPaceIdleDecayRate: Real \n\n    // 5 by default\n    pricingWeightDynaPace: Real  // same as weightNextDynaPace\n\n    func validateCreatedDetails(self) -> Bool {\n        assert(self.progressPricingDiscountFloorPoint > 0.05, \"floor point too low\");\n        assert(self.progressPricingDiscountFloorPoint < 0.50, \"floor point too high\");\n        assert(self.progressPricingDiscountWhenSlow >= 0.0, \"negative discount\");\n        assert(self.progressPricingDiscountWhenSlow < 1.0, \"discount too high\");\n        assert(self.progressPricingExpansionWhenFast > 0.05, \"expansion too low\");\n        assert(self.progressPricingExpansionWhenFast < 10.0, \"expansion too high\");\n        assert(self.dynaPaceFasterSaleWeight >= 0.0, \"faster weight negative\");\n        assert(self.dynaPaceFasterSaleWeight < 2.0, \"faster weight way too high\");\n        assert(self.dynaPaceIdleDecayRate >= 0.0, \"negative decay rate\");\n        assert(self.dynaPaceIdleDecayRate < 2.0, \"decay rate too high\");\n        assert(self.pricingWeightDynaPace >= 0.0, \"dyna pace weight negative\");\n        assert(self.pricingWeightDynaPace < 15, \"dyna pace weight way too high\");\n\n        true\n    }\n\n    // func validateUpdatedDetails(self) -> Bool {\n\n    //     true\n    // }\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/MarketSale/DynamicSaleV1Settings.hl", // source filename
    moduleName:  "DynamicSaleV1Settings",
});

const VxfProtocol_hl = makeSource(
  "module VxfProtocol\n\nimport {\n    RelativeDelegateLink\n} from CapoDelegateHelpers\n\nimport {\n    REQT,\n    bREQT,\n    TODO\n} from StellarHeliosHelpers\n\n/**\n * The VxfExpectedActivity enum is used to capture details of how the vesting contract can\n * enforce the required smart contract to which funds may be distributed after they vest.\n * It is used in the Vxf Sealing process to establish a positive linkage to a receiving contract, \n * or to a collaborating (Vxf Transfer agent) contract that has a stake or policy to be enforced \n * during the funds distribution.\n *\n * the appData field can include additional details which are transparent to the vesting contract,\n * interpreted only by the receiving contract to enforce any details of its required behavior.\n * When distributing funds out of the vesting contract, the receiving contract must match with the\n * provided appData (if provided).\n */\nenum VxfExpectedActivity {\n    /** \n    * implicitly seeks a tagged redeemer with first-field constructor 'VX' = 0x5658 = decimal 22104\n    *\n    * This is the same as using TaggedRedeemer with id=22104.\n    *\n    * The appData field can include further details to be enforced by the receiving \n    * contract, and if provided, the target redeemer's 22104 must have the matching appData \n    * in its first field. ??? TODO: value needed too?\n    */\n    22104: VxfTransfer {\n        appData: Option[Data]\n    }\n\n    /**\n    * implicitly seeks a tagged redeemer with first-field constructor 'VZ' = 0x565A = decimal 22106.\n    * \n    * This is the same as using TaggedRedeemer with id=22106.\n    *\n    * When provided, the appData field must be matched by the receiving contract's \n    * matched redeemer, the VZ constructor's first field. \n    * TODO: value needed too?\n    */\n    22106: VxfStorage {\n        appData: Option[Data]\n    }\n    /**\n    * Seeks a redeemer with a specific constructor tag.  When inNestedList is true,\n    * the indicated constructor tag is also sought in any item of a nested list found \n    * in the first field of any top-level constructor tag.  With a nestedListRedeemerId,\n    * that top-level constructor-tag is required to match, before the nested-list item is sought.\n    *\n    * When provided, the appData field must be matched by the receiving contract's \n    * matched redeemer, in the constructor tag's second field.\n    * TODO: value needed too?\n    */\n    22107: SpecificRedeemerId {\n        id: Int\n        inNestedList: Bool\n        nestedListRedeemerId: Option[Int]\n        appData: Option[Data]\n    }\n    /**\n     * Seeks a redeemer at any index, with its first field as a tagged constructor with \n     * the specified integer tag.  This first-field constructor-index convention allows \n     * any top-level redeemer index, with the indicated first field as a highly selective \n     * discriminator of minimal size.  \n     *\n     * When inNestedList is true, the indicated constructor tag is also sought in any item of a \n     * nested list found in the first field of any top-level constructor tag.\n     *\n     * When provided, the appData field must be matched by the receiving contract's \n     * matched redeemer, in the matched field constructor's first field.\n     * TODO: value needed too?\n     */\n    22108: TaggedRedeemer {\n        firstFieldConstrTag: Int\n        inNestedList: Bool\n        // scriptPurpose: ScriptPurpose\n        appData: Option[Data]\n    }\n}\n\nenum VxfDestination {\n    /**\n    * When the beneficiary is a relative link with a validator hash, the link is used to identify\n    * a delegate script whose UUT controls spending of its utxos, including\n    * the vested + distributed funds.  That script's activity is anchored with the ***required `vxfActvity`***,\n    * identifying the script activity (redeemer variant) needed to take control of the funds \n    * on distribution\n    *\n    * When the beneficiary is a member UUT name, the delegate link\n    * will have no delegateValidatorHash, and the vxfActivity field is not required.\n    * The UUT is a token name in the minting policy of the same Capo in which the vesting\n    * record is created.  In this case, the vxfActivity field is not required.  ***The holder\n    * of the indicated token will be able to withdraw vested funds.***\n    */\n    RelativeLink { \n        link: RelativeDelegateLink \n        vxfActivity: Option[VxfExpectedActivity]\n    }\n\n    /**\n     * The beneficiary is any token holder of the given minting policy\n     * and asset name.  Normally this asset name will be a unique token.\n     */\n    AnyTokenHolder {\n        mph: MintingPolicyHash\n        assetName: ByteArray\n    }\n\n    /**\n     * The beneficiary is identified by a public key.  This is useful for indicating a\n     * wallet address, without the scripting overhead needed for encoding an Address here.\n     */\n    PubKey {\n        pkh: PubKeyHash\n    }\n    /**\n     * when the beneficiary is not constrained\n     */\n    98: Anywhere\n    /**\n     * when the beneficiary is not yet defined.  Will need to be defined before activation.\n     */\n    99: NotYetDefined\n    /**\n     * The beneficiary is any address.  This is useful for vesting to a\n     * multi-sig address, or other situations where a more specific way of identifying\n     * the beneficiary is not available.\n     *\n     * The credential for the address is required.  When the address is a plutus script,\n     * the vxfActivity is strongly recommended, to create a strong linkage between the\n     * vesting instance and specific activities under the receiving contract's control; otherwise,\n     * a utxo could be created that not ever be spendable by the receiver, or which could misdirect\n     * the receiver's further disposition of the funds.\n     *\n     * When the address is a multi-sig (/NativeScript) address, the Credential (a hash of the script)\n     * is required, and the vxfActivity is not needed.\n     */\n    //  TODO when there's a good use-case for this generic angle on distributing based on address\n    // AnyAddress {\n    //     unsupported: Int\n    //     // NOTE: Address is a pretty large type, consuming from a limited space in the compiled script\n    //     // address: Address\n    //     // credential: Credential\n    //     // vxfExpectedActivity: Option[VxfExpectedActivity]\n    // }\n\n    func validate(self, fieldName: String) -> Bool {\n        self.switch {\n            RelativeLink => error(fieldName + \": todo: RelativeLink support\"),\n            AnyTokenHolder => error(fieldName+ \": todo: AnyTokenHolder support\"),\n            PubKey => true,\n            Anywhere => true,\n            NotYetDefined => error(\"VxfDestination: \" + fieldName + \": NotYetDefined\")\n            // should NOT need to check the default case\n            // if the above cases are exhaustive\n            // _ => false\n        }\n    }\n\n    func verifyDestination(self, tx: Tx) -> Bool {\n        self.switch {\n            RelativeLink => error(\"todo: RelativeLink support\"),\n            AnyTokenHolder => error(\"todo: AnyTokenHolder support\"),\n            PubKey{pkh} => tx.is_signed_by(pkh),\n            Anywhere => true,\n            NotYetDefined => {\n                error(\"unreachable\")\n            }\n            // should NOT need to check the default case\n            // if the above cases are exhaustive\n            // _ => false\n        }\n    }\n}", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/Vesting/VxfProtocol.hl", // source filename
    moduleName:  "VxfProtocol",
});

class MarketSaleBundle extends DelegatedDataBundle {
  specializedDelegateModule = MarketSalePolicy_hl;
  requiresGovAuthority = true;
  get modules() {
    return [
      ...super.modules,
      MarketSaleData_hl,
      SaleProgressDetails_hl,
      DynamicSaleV1_hl,
      DynamicSaleV1Settings_hl,
      VxfProtocol_hl
    ];
  }
}

class MarketSaleDataWrapper {
  //  todo make the interface work?
  // implements someDataWrapper<MarketSaleData>
  data;
  controller;
  capo;
  constructor(data, controller, capo) {
    this.data = data;
    this.controller = controller;
    this.capo = capo;
  }
  unwrapData() {
    return this.data;
  }
  getUnitPrice(pCtx) {
    return this.getDynamicUnitPrice(pCtx);
  }
  // hasDynamicPrice(x: MarketSaleData): x is MarketSaleData & {
  //     saleStrategy: DynamicPriceSettings;
  //     saleStrategyState: DynamicPriceState;
  // } {
  //     return (x.saleStrategy as any).dynaPaceFasterSaleWeight !== undefined;
  // }
  getDynamicUnitPrice(pCtx) {
    const { prevSale: sale, now, unitCount } = pCtx;
    const s = sale.data.moreFields.fixedSaleDetails.settings;
    console.log("    ---- targetPrice", s.targetPrice);
    const a = realMul(
      s.targetPrice,
      this.pricingFactorOverallProgress(pCtx)
    );
    console.log(
      "    ---- unitPriceForSale: targetPrice * pricingFactorOverallProgress =",
      a
    );
    const price = realMul(a, this.pricingFactorDynamicPace(pCtx));
    console.log("    ---- unitPriceForSale - unclamped", price);
    const result = Math.min(Math.max(price, s.minPrice), s.maxPrice);
    console.log("    ---- unitPriceForSale - clamped", result);
    return result;
  }
  pricingFactorOverallProgress(pCtx) {
    const settings = pCtx.prevSale.data.moreFields.fixedSaleDetails.settings;
    const overallPacingProgress = this.overallPaceIncludingThisPurchase(pCtx);
    const discountEarned = realMul(
      this.progressPricingDiscountDepth(overallPacingProgress, settings),
      settings.progressPricingDiscountWhenSlow
    );
    const clampedMaxDiscount = Math.max(
      0,
      Math.min(discountEarned, settings.progressPricingDiscountWhenSlow)
    );
    const result = realMul(
      toFixedReal(1 - clampedMaxDiscount),
      this.priceExpansion(overallPacingProgress, settings)
    );
    console.log("    ---- pricingFactorOverallProgress", result);
    return result;
  }
  pricingFactorDynamicPace(pCtx) {
    const s = pCtx.prevSale.data.moreFields.fixedSaleDetails.settings;
    const prevWeight = 1;
    const nextPace = this.computeNextSalePace(pCtx);
    const prevPace = this.prevSalePace(pCtx);
    const nextWeight = s.pricingWeightDynaPace;
    const targetSellingPace = this.targetSellingPace(pCtx);
    const r = debugMath(() => {
      const thing1 = realMul(
        prevPace == 0 ? 1 : realDiv(prevPace, targetSellingPace),
        prevWeight
      );
      console.log("    ---- pricingFactorDynamicPace: thing1 ^");
      const thing2 = realMul(
        nextPace == 0 ? 1 : realDiv(nextPace, targetSellingPace),
        nextWeight
      );
      console.log("    ---- pricingFactorDynamicPace: thing2 ^");
      const result = realDiv(thing1 + thing2, prevWeight + nextWeight);
      console.log("    ---- pricingFactorDynamicPace", result);
      return result;
    });
    return r;
  }
  prevSalePace(pCtx) {
    return pCtx.prevSale.data.moreFields.saleState.salePace;
  }
  targetSellingPace(pCtx) {
    const { prevSale: sale } = pCtx;
    const s = sale.data.moreFields.fixedSaleDetails.settings;
    const { chunkUnitCount } = sale.data.moreFields.saleState.progressDetails;
    const tsp = realDiv(
      Number(chunkUnitCount),
      realDiv(Number(s.targetedSellingTime), 60 * 60 * 1e3)
    );
    console.log("    ---- targetSellingPace", tsp);
    return tsp;
  }
  computeNextSalePace(pCtx) {
    const s = pCtx.prevSale.data.moreFields.fixedSaleDetails.settings;
    const inferredPace = this.inferredPace(pCtx);
    const prevSalePace = this.prevSalePace(pCtx);
    if (inferredPace > prevSalePace) {
      console.log("    ---- using dynaPaceFasterSaleWeight");
    } else if (inferredPace > this.targetSellingPace(pCtx)) {
      console.log(
        "    ---- inferred pace faster than target; using 1.0 weight"
      );
    } else {
      console.log(
        "    ---- inferred pace slower than target; using idle decay rate"
      );
    }
    const { dynaPaceFasterSaleWeight, dynaPaceIdleDecayRate } = s;
    const targetSellingPace = this.targetSellingPace(pCtx);
    const hoursSinceLastPurchase = this.hoursSinceLastPurchase(pCtx);
    console.log("    ---- inferredPace", inferredPace);
    console.log("    ---- targetSellingPace", this.targetSellingPace(pCtx));
    const nextWeight = inferredPace > prevSalePace ? (() => {
      console.log(
        "    ---- nextPaceWeight: dynaPaceFasterSaleWeight (sale is speeding up)"
      );
      return dynaPaceFasterSaleWeight;
    })() : inferredPace > targetSellingPace ? (() => {
      console.log(
        "    ---- nextPaceWeight: 1.0 (sale is not slowing under the target pace)"
      );
      return 1;
    })() : (() => {
      console.log(
        "    ---- nextPaceWeight: using dynaPaceIdleDecayRate for hoursSinceLastPurchase "
      );
      console.log(
        `      ---- hoursSinceLastPurchase ${hoursSinceLastPurchase}`
      );
      console.log(
        `      ---- dynaPaceIdleDecayRate ${dynaPaceIdleDecayRate}`
      );
      const result = Math.max(
        1,
        realMul(hoursSinceLastPurchase, dynaPaceIdleDecayRate)
      );
      return result;
    })();
    console.log("    ----  prev salePace", prevSalePace);
    console.log("    ---- nextPaceWeight", nextWeight);
    const nextDynamicPace = realDiv(
      realMul(inferredPace, nextWeight) + prevSalePace,
      nextWeight + 1
    );
    console.log("    ---- next salePace", nextDynamicPace);
    return nextDynamicPace;
  }
  hoursSinceLastPurchase(pCtx) {
    const h = debugMath(() => {
      return realDiv(
        pCtx.now.getTime() - pCtx.prevSale.data.moreFields.saleState.progressDetails.lastPurchaseAt,
        60 * 60 * 1e3
      );
    });
    console.log("    ---- hoursSinceLastPurchase", {
      now: pCtx.now,
      lastPurchaseAt: pCtx.prevSale.data.moreFields.saleState.progressDetails.lastPurchaseAt,
      result: h
    });
    return h;
  }
  overallPaceIncludingThisPurchase(pCtx) {
    const oppp = realDiv(
      this.actualSellingPace(pCtx),
      this.targetSellingPace(pCtx)
    );
    console.log("    ---- overallPaceIncludingThisPurchase", oppp);
    return oppp;
  }
  actualSellingPace(pCtx) {
    const unitsPurchased = pCtx.unitCount;
    const alreadySold = pCtx.prevSale.data.moreFields.saleState.progressDetails.chunkUnitsSold;
    const sp = realDiv(
      Number(unitsPurchased) + Number(alreadySold),
      this.elapsedSaleHours(pCtx)
    );
    console.log("    ---- actualSellingPace", sp);
    return sp;
  }
  elapsedSaleHours(pCtx) {
    const eh = realDiv(
      pCtx.now.getTime() - pCtx.prevSale.data.moreFields.fixedSaleDetails.startAt,
      60 * 60 * 1e3
    );
    console.log("    ---- elapsedSaleHours", eh);
    return eh;
  }
  progressPricingDiscountDepth(overallPacingProgress, settings) {
    const ceilingHeight = toFixedReal(
      1 - settings.progressPricingDiscountFloorPoint
    );
    const aboveFloor = overallPacingProgress > settings.progressPricingDiscountFloorPoint ? toFixedReal(
      overallPacingProgress - settings.progressPricingDiscountFloorPoint
    ) : 0;
    const relativeHeight = aboveFloor <= 0 ? 0 : realDiv(aboveFloor, ceilingHeight);
    console.log(
      "      ---- progressPricingDiscountDepth: ceilingHeight",
      ceilingHeight
    );
    console.log(
      "      ---- progressPricingDiscountDepth: aboveFloor",
      aboveFloor
    );
    console.log(
      "      ---- progressPricingDiscountDepth: relativeHeight",
      relativeHeight
    );
    const ppdd = toFixedReal(1 - relativeHeight);
    console.log("    ---- progressPricingDiscountDepth", ppdd);
    return ppdd;
  }
  inferredPace(pCtx) {
    debugger;
    const ip = realDiv(
      Number(pCtx.unitCount),
      this.hoursSinceLastPurchase(pCtx)
    );
    console.log("    ---- inferredPace", ip);
    return ip;
  }
  priceExpansion(overallPace, settings) {
    const pe = overallPace < 1 ? 1 : 1 + realDiv(
      realMul(
        toFixedReal(overallPace - 1),
        settings.progressPricingExpansionWhenFast
      ),
      3
    );
    console.log("    ---- priceExpansion", pe);
    return pe;
  }
  //     getNextSalePace(pCtx: PurchaseContext) {
  //         return pCtx.sale.nextSalePace(pCtx);
  //     }
}

class MarketSalePolicyDataBridge extends ContractDataBridge {
  static isAbstract = false;
  isAbstract = false;
  /**
   * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
   * for this contract script. 
   */
  datum = new DelegateDatumHelper({ isMainnet: this.isMainnet });
  // datumAccessor/enum
  /**
   * this is the specific type of datum for the `BasicDelegate` script
   */
  DelegateDatum = this.datum;
  readDatum = (d) => {
    return this.reader.DelegateDatum(d);
  };
  /**
   * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
   */
  activity = new DelegateActivityHelper({ isMainnet: this.isMainnet, isActivity: true });
  // activityAccessor/enum
  DelegateActivity = this.activity;
  reader = new MarketSalePolicyDataBridgeReader(this, this.isMainnet);
  /**
   * accessors for all the types defined in the `BasicDelegate` script
   * @remarks - these accessors are used to generate UplcData for each type
   */
  types = {
    /**
     * generates UplcData for the enum type ***MarketSaleState*** for the `BasicDelegate` script
     */
    MarketSaleState: new MarketSaleStateHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***VxfExpectedActivity*** for the `BasicDelegate` script
     */
    VxfExpectedActivity: new VxfExpectedActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***VxfDestination*** for the `BasicDelegate` script
     */
    VxfDestination: new VxfDestinationHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
     */
    DelegateDatum: new DelegateDatumHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
     */
    DelegateRole: new DelegateRoleHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
     */
    ManifestActivity: new ManifestActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
     */
    CapoLifecycleActivity: new CapoLifecycleActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
     */
    DelegateLifecycleActivity: new DelegateLifecycleActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
     */
    SpendingActivity: new SpendingActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
     */
    MintingActivity: new MintingActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
     */
    BurningActivity: new BurningActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
     */
    DelegateActivity: new DelegateActivityHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
     */
    PendingDelegateAction: new PendingDelegateActionHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
     */
    ManifestEntryType: new ManifestEntryTypeHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
     */
    PendingCharterChange: new PendingCharterChangeHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
     */
    cctx_CharterInputType: new cctx_CharterInputTypeHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***dgd_DataSrc*** for the `BasicDelegate` script
     */
    dgd_DataSrc: new dgd_DataSrcHelper({ isMainnet: this.isMainnet }),
    /**
     * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
     */
    AnyData: (fields) => {
      return this["\u1C7A\u1C7AAnyDataCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
     */
    DelegationDetail: (fields) => {
      return this["\u1C7A\u1C7ADelegationDetailCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***SaleProgressDetails*** for the `BasicDelegate` script
     */
    SaleProgressDetails: (fields) => {
      return this["\u1C7A\u1C7ASaleProgressDetailsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***OtherSaleState*** for the `BasicDelegate` script
     */
    OtherSaleState: (fields) => {
      return this["\u1C7A\u1C7AOtherSaleStateCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***DynamicSaleV1Settings*** for the `BasicDelegate` script
     */
    DynamicSaleV1Settings: (fields) => {
      return this["\u1C7A\u1C7ADynamicSaleV1SettingsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
     */
    RelativeDelegateLink: (fields) => {
      return this["\u1C7A\u1C7ARelativeDelegateLinkCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***FixedSaleDetails*** for the `BasicDelegate` script
     */
    FixedSaleDetails: (fields) => {
      return this["\u1C7A\u1C7AFixedSaleDetailsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***SaleAssets*** for the `BasicDelegate` script
     */
    SaleAssets: (fields) => {
      return this["\u1C7A\u1C7ASaleAssetsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***ThreadInfo*** for the `BasicDelegate` script
     */
    ThreadInfo: (fields) => {
      return this["\u1C7A\u1C7AThreadInfoCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***MoreFields*** for the `BasicDelegate` script
     */
    MoreFields: (fields) => {
      return this["\u1C7A\u1C7AMoreFieldsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***MarketSaleData*** for the `BasicDelegate` script
     */
    MarketSaleData: (fields) => {
      return this["\u1C7A\u1C7AMarketSaleDataCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
     */
    PendingDelegateChange: (fields) => {
      return this["\u1C7A\u1C7APendingDelegateChangeCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
     */
    CapoManifestEntry: (fields) => {
      return this["\u1C7A\u1C7ACapoManifestEntryCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
     */
    CapoCtx: (fields) => {
      return this["\u1C7A\u1C7ACapoCtxCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***DgDataDetails*** for the `BasicDelegate` script
     */
    DgDataDetails: (fields) => {
      return this["\u1C7A\u1C7ADgDataDetailsCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***DTS_PurchaseInfo*** for the `BasicDelegate` script
     */
    DTS_PurchaseInfo: (fields) => {
      return this["\u1C7A\u1C7ADTS_PurchaseInfoCast"].toUplcData(fields);
    },
    /**
     * generates UplcData for the enum type ***DynamicSaleV1*** for the `BasicDelegate` script
     */
    DynamicSaleV1: (fields) => {
      return this["\u1C7A\u1C7ADynamicSaleV1Cast"].toUplcData(fields);
    }
  };
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AAnyDataCast" = makeCast(
    AnyDataSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ADelegationDetailCast" = makeCast(
    DelegationDetailSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ASaleProgressDetailsCast" = makeCast(
    SaleProgressDetailsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AOtherSaleStateCast" = makeCast(
    OtherSaleStateSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ADynamicSaleV1SettingsCast" = makeCast(
    DynamicSaleV1SettingsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ARelativeDelegateLinkCast" = makeCast(
    RelativeDelegateLinkSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AFixedSaleDetailsCast" = makeCast(
    FixedSaleDetailsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ASaleAssetsCast" = makeCast(
    SaleAssetsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AThreadInfoCast" = makeCast(
    ThreadInfoSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AMoreFieldsCast" = makeCast(
    MoreFieldsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7AMarketSaleDataCast" = makeCast(
    MarketSaleDataSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7APendingDelegateChangeCast" = makeCast(
    PendingDelegateChangeSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ACapoManifestEntryCast" = makeCast(
    CapoManifestEntrySchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ACapoCtxCast" = makeCast(
    CapoCtxSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ADgDataDetailsCast" = makeCast(
    DgDataDetailsSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ADTS_PurchaseInfoCast" = makeCast(
    DTS_PurchaseInfoSchema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
  /**
              * uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7ADynamicSaleV1Cast" = makeCast(
    DynamicSaleV1Schema,
    { isMainnet: true, unwrapSingleFieldEnumVariants: true }
  );
}
class MarketSalePolicyDataBridgeReader extends DataBridgeReaderClass {
  constructor(bridge, isMainnet) {
    super();
    this.bridge = bridge;
  }
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
  MarketSaleState(d) {
    const typeHelper = this.bridge.types.MarketSaleState;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  VxfExpectedActivity(d) {
    const typeHelper = this.bridge.types.VxfExpectedActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  VxfDestination(d) {
    const typeHelper = this.bridge.types.VxfDestination;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
  datum = (d) => {
    return this.DelegateDatum(d);
  };
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
  DelegateDatum(d) {
    const typeHelper = this.bridge.types.DelegateDatum;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  DelegateRole(d) {
    const typeHelper = this.bridge.types.DelegateRole;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  ManifestActivity(d) {
    const typeHelper = this.bridge.types.ManifestActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  CapoLifecycleActivity(d) {
    const typeHelper = this.bridge.types.CapoLifecycleActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  DelegateLifecycleActivity(d) {
    const typeHelper = this.bridge.types.DelegateLifecycleActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  SpendingActivity(d) {
    const typeHelper = this.bridge.types.SpendingActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  MintingActivity(d) {
    const typeHelper = this.bridge.types.MintingActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  BurningActivity(d) {
    const typeHelper = this.bridge.types.BurningActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  DelegateActivity(d) {
    const typeHelper = this.bridge.types.DelegateActivity;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  PendingDelegateAction(d) {
    const typeHelper = this.bridge.types.PendingDelegateAction;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  ManifestEntryType(d) {
    const typeHelper = this.bridge.types.ManifestEntryType;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  PendingCharterChange(d) {
    const typeHelper = this.bridge.types.PendingCharterChange;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  cctx_CharterInputType(d) {
    const typeHelper = this.bridge.types.cctx_CharterInputType;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  dgd_DataSrc(d) {
    const typeHelper = this.bridge.types.dgd_DataSrc;
    const cast = typeHelper["\u1C7A\u1C7Acast"];
    return cast.fromUplcData(d);
  }
  /* enumReader helper */
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
  AnyData(d) {
    const cast = this.bridge["\u1C7A\u1C7AAnyDataCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  DelegationDetail(d) {
    const cast = this.bridge["\u1C7A\u1C7ADelegationDetailCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  SaleProgressDetails(d) {
    const cast = this.bridge["\u1C7A\u1C7ASaleProgressDetailsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  OtherSaleState(d) {
    const cast = this.bridge["\u1C7A\u1C7AOtherSaleStateCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  DynamicSaleV1Settings(d) {
    const cast = this.bridge["\u1C7A\u1C7ADynamicSaleV1SettingsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  RelativeDelegateLink(d) {
    const cast = this.bridge["\u1C7A\u1C7ARelativeDelegateLinkCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  FixedSaleDetails(d) {
    const cast = this.bridge["\u1C7A\u1C7AFixedSaleDetailsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  SaleAssets(d) {
    const cast = this.bridge["\u1C7A\u1C7ASaleAssetsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  ThreadInfo(d) {
    const cast = this.bridge["\u1C7A\u1C7AThreadInfoCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  MoreFields(d) {
    const cast = this.bridge["\u1C7A\u1C7AMoreFieldsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  MarketSaleData(d) {
    const cast = this.bridge["\u1C7A\u1C7AMarketSaleDataCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  PendingDelegateChange(d) {
    const cast = this.bridge["\u1C7A\u1C7APendingDelegateChangeCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  CapoManifestEntry(d) {
    const cast = this.bridge["\u1C7A\u1C7ACapoManifestEntryCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  CapoCtx(d) {
    const cast = this.bridge["\u1C7A\u1C7ACapoCtxCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  DgDataDetails(d) {
    const cast = this.bridge["\u1C7A\u1C7ADgDataDetailsCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  DTS_PurchaseInfo(d) {
    const cast = this.bridge["\u1C7A\u1C7ADTS_PurchaseInfoCast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
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
  DynamicSaleV1(d) {
    const cast = this.bridge["\u1C7A\u1C7ADynamicSaleV1Cast"];
    return cast.fromUplcData(d);
  }
  /* structReader helper */
}
class MarketSaleStateHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    MarketSaleStateSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Pending"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get Pending() {
    const uplc = this.mkUplcData(
      { Pending: {} },
      "MarketSaleData::MarketSaleState.Pending"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Active"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get Active() {
    const uplc = this.mkUplcData(
      { Active: {} },
      "MarketSaleData::MarketSaleState.Active"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.Retired"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get Retired() {
    const uplc = this.mkUplcData(
      { Retired: {} },
      "MarketSaleData::MarketSaleState.Retired"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"MarketSaleData::MarketSaleState.SoldOut"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get SoldOut() {
    const uplc = this.mkUplcData(
      { SoldOut: {} },
      "MarketSaleData::MarketSaleState.SoldOut"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class VxfExpectedActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    VxfExpectedActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.VxfTransfer"***
   */
  VxfTransfer(appData) {
    const uplc = this.mkUplcData({
      VxfTransfer: appData
    }, "VxfProtocol::VxfExpectedActivity.VxfTransfer");
    return uplc;
  }
  /**
   * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.VxfStorage"***
   */
  VxfStorage(appData) {
    const uplc = this.mkUplcData({
      VxfStorage: appData
    }, "VxfProtocol::VxfExpectedActivity.VxfStorage");
    return uplc;
  }
  /**
   * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.SpecificRedeemerId"***
   * @remarks - ***VxfExpectedActivity$SpecificRedeemerIdLike*** is the same as the expanded field-types.
   */
  SpecificRedeemerId(fields) {
    const uplc = this.mkUplcData({
      SpecificRedeemerId: fields
    }, "VxfProtocol::VxfExpectedActivity.SpecificRedeemerId");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"VxfProtocol::VxfExpectedActivity.TaggedRedeemer"***
   * @remarks - ***VxfExpectedActivity$TaggedRedeemerLike*** is the same as the expanded field-types.
   */
  TaggedRedeemer(fields) {
    const uplc = this.mkUplcData({
      TaggedRedeemer: fields
    }, "VxfProtocol::VxfExpectedActivity.TaggedRedeemer");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
class VxfDestinationHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    VxfDestinationSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"VxfProtocol::VxfDestination.RelativeLink"***
   * @remarks - ***VxfDestination$RelativeLinkLike*** is the same as the expanded field-types.
   */
  RelativeLink(fields) {
    const uplc = this.mkUplcData({
      RelativeLink: fields
    }, "VxfProtocol::VxfDestination.RelativeLink");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"VxfProtocol::VxfDestination.AnyTokenHolder"***
   * @remarks - ***VxfDestination$AnyTokenHolderLike*** is the same as the expanded field-types.
   */
  AnyTokenHolder(fields) {
    const uplc = this.mkUplcData({
      AnyTokenHolder: fields
    }, "VxfProtocol::VxfDestination.AnyTokenHolder");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"VxfProtocol::VxfDestination.PubKey"***
   */
  PubKey(pkh) {
    const uplc = this.mkUplcData({
      PubKey: pkh
    }, "VxfProtocol::VxfDestination.PubKey");
    return uplc;
  }
  /**
   * (property getter): UplcData for ***"VxfProtocol::VxfDestination.Anywhere"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#98***
   */
  get Anywhere() {
    const uplc = this.mkUplcData(
      { Anywhere: {} },
      "VxfProtocol::VxfDestination.Anywhere"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"VxfProtocol::VxfDestination.NotYetDefined"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#99***
   */
  get NotYetDefined() {
    const uplc = this.mkUplcData(
      { NotYetDefined: {} },
      "VxfProtocol::VxfDestination.NotYetDefined"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class DelegateDatumHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateDatumSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.Cip68RefToken"***
   * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
   */
  Cip68RefToken(fields) {
    const uplc = this.mkUplcData({
      Cip68RefToken: fields
    }, "MarketSalePolicy::DelegateDatum.Cip68RefToken");
    return makeInlineTxOutputDatum(uplc);
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.IsDelegation"***
   * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
   */
  IsDelegation(dd) {
    const uplc = this.mkUplcData({
      IsDelegation: dd
    }, "MarketSalePolicy::DelegateDatum.IsDelegation");
    return makeInlineTxOutputDatum(uplc);
  }
  /**
   * generates  InlineTxOutputDatum for ***"MarketSalePolicy::DelegateDatum.capoStoredData"***
   * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
   */
  capoStoredData(fields) {
    const uplc = this.mkUplcData({
      capoStoredData: fields
    }, "MarketSalePolicy::DelegateDatum.capoStoredData");
    return makeInlineTxOutputDatum(uplc);
  }
  /*multiFieldVariant enum accessor*/
}
class DelegateRoleHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateRoleSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get MintDgt() {
    const uplc = this.mkUplcData(
      { MintDgt: {} },
      "CapoDelegateHelpers::DelegateRole.MintDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get SpendDgt() {
    const uplc = this.mkUplcData(
      { SpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.SpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get MintInvariant() {
    const uplc = this.mkUplcData(
      { MintInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.MintInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get SpendInvariant() {
    const uplc = this.mkUplcData(
      { SpendInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.SpendInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
   */
  DgDataPolicy(name) {
    const uplc = this.mkUplcData({
      DgDataPolicy: name
    }, "CapoDelegateHelpers::DelegateRole.DgDataPolicy");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
   */
  OtherNamedDgt(name) {
    const uplc = this.mkUplcData({
      OtherNamedDgt: name
    }, "CapoDelegateHelpers::DelegateRole.OtherNamedDgt");
    return uplc;
  }
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
   */
  get BothMintAndSpendDgt() {
    const uplc = this.mkUplcData(
      { BothMintAndSpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
   */
  get HandledByCapoOnly() {
    const uplc = this.mkUplcData(
      { HandledByCapoOnly: {} },
      "CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class ManifestActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    ManifestActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
   */
  retiringEntry(key) {
    const uplc = this.mkUplcData({
      retiringEntry: key
    }, "CapoDelegateHelpers::ManifestActivity.retiringEntry");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
   * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
   */
  updatingEntry(fields) {
    const uplc = this.mkUplcData({
      updatingEntry: fields
    }, "CapoDelegateHelpers::ManifestActivity.updatingEntry");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
   * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
   */
  addingEntry(fields) {
    const uplc = this.mkUplcData({
      addingEntry: fields
    }, "CapoDelegateHelpers::ManifestActivity.addingEntry");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
   * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
   */
  forkingThreadToken(fields) {
    const uplc = this.mkUplcData({
      forkingThreadToken: fields
    }, "CapoDelegateHelpers::ManifestActivity.forkingThreadToken");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
   * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
   */
  burningThreadToken(fields) {
    const uplc = this.mkUplcData({
      burningThreadToken: fields
    }, "CapoDelegateHelpers::ManifestActivity.burningThreadToken");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
class DelegateRoleHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateRoleSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get MintDgt() {
    const uplc = this.mkUplcData(
      { MintDgt: {} },
      "CapoDelegateHelpers::DelegateRole.MintDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get SpendDgt() {
    const uplc = this.mkUplcData(
      { SpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.SpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get MintInvariant() {
    const uplc = this.mkUplcData(
      { MintInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.MintInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get SpendInvariant() {
    const uplc = this.mkUplcData(
      { SpendInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.SpendInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  DgDataPolicy(name) {
    const uplc = this.mkUplcData({
      DgDataPolicy: name
    }, "CapoDelegateHelpers::DelegateRole.DgDataPolicy");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  OtherNamedDgt(name) {
    const uplc = this.mkUplcData({
      OtherNamedDgt: name
    }, "CapoDelegateHelpers::DelegateRole.OtherNamedDgt");
    return uplc;
  }
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
   */
  get BothMintAndSpendDgt() {
    const uplc = this.mkUplcData(
      { BothMintAndSpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
   */
  get HandledByCapoOnly() {
    const uplc = this.mkUplcData(
      { HandledByCapoOnly: {} },
      "CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class ManifestActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    ManifestActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  retiringEntry(key) {
    const uplc = this.mkUplcData({
      retiringEntry: key
    }, "CapoDelegateHelpers::ManifestActivity.retiringEntry");
    return uplc;
  }
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
   * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  updatingEntry(fields) {
    const uplc = this.mkUplcData({
      updatingEntry: fields
    }, "CapoDelegateHelpers::ManifestActivity.updatingEntry");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
   * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  addingEntry(fields) {
    const uplc = this.mkUplcData({
      addingEntry: fields
    }, "CapoDelegateHelpers::ManifestActivity.addingEntry");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
   * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  forkingThreadToken(fields) {
    const uplc = this.mkUplcData({
      forkingThreadToken: fields
    }, "CapoDelegateHelpers::ManifestActivity.forkingThreadToken");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
   * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  burningThreadToken(fields) {
    const uplc = this.mkUplcData({
      burningThreadToken: fields
    }, "CapoDelegateHelpers::ManifestActivity.burningThreadToken");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
class CapoLifecycleActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    CapoLifecycleActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  CreatingDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        CreatingDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        CreatingDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$CreatingDelegate = impliedSeedActivityMaker(
    this,
    this.CreatingDelegate
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get queuePendingChange() {
    const uplc = this.mkUplcData(
      { queuePendingChange: {} },
      "CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
   */
  get removePendingChange() {
    const nestedAccessor = new DelegateRoleHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: false
    });
    nestedAccessor.mkDataVia(
      (role) => {
        return this.mkUplcData(
          { removePendingChange: role },
          "CapoDelegateHelpers::CapoLifecycleActivity.removePendingChange"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get commitPendingChanges() {
    const uplc = this.mkUplcData(
      { commitPendingChanges: {} },
      "CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"
    );
    return uplc;
  }
  forcingNewSpendDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        forcingNewSpendDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        forcingNewSpendDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$forcingNewSpendDelegate = impliedSeedActivityMaker(
    this,
    this.forcingNewSpendDelegate
  );
  forcingNewMintDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        forcingNewMintDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        forcingNewMintDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$forcingNewMintDelegate = impliedSeedActivityMaker(
    this,
    this.forcingNewMintDelegate
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
   */
  get updatingManifest() {
    const nestedAccessor = new ManifestActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: false
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { updatingManifest: activity },
          "CapoDelegateHelpers::CapoLifecycleActivity.updatingManifest"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
}
class DelegateLifecycleActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateLifecycleActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  ReplacingMe(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        ReplacingMe: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        ReplacingMe: fields
      }, "CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$ReplacingMe = impliedSeedActivityMaker(
    this,
    this.ReplacingMe
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get Retiring() {
    const uplc = this.mkUplcData(
      { Retiring: {} },
      "CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get ValidatingSettings() {
    const uplc = this.mkUplcData(
      { ValidatingSettings: {} },
      "CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class SpendingActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    SpendingActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingRecord"***
   */
  UpdatingRecord(id) {
    const uplc = this.mkUplcData({
      UpdatingRecord: id
    }, "MarketSalePolicy::SpendingActivity.UpdatingRecord");
    return uplc;
  }
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.AddingToSale"***
   * @remarks - ***SpendingActivity$AddingToSaleLike*** is the same as the expanded field-types.
   */
  AddingToSale(fields) {
    const uplc = this.mkUplcData({
      AddingToSale: fields
    }, "MarketSalePolicy::SpendingActivity.AddingToSale");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.Activating"***
   */
  Activating(id) {
    const uplc = this.mkUplcData({
      Activating: id
    }, "MarketSalePolicy::SpendingActivity.Activating");
    return uplc;
  }
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.SellingTokens"***
   * @remarks - ***SpendingActivity$SellingTokensLike*** is the same as the expanded field-types.
   */
  SellingTokens(fields) {
    const uplc = this.mkUplcData({
      SellingTokens: fields
    }, "MarketSalePolicy::SpendingActivity.SellingTokens");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.MergingChildChunk"***
   * @remarks - ***SpendingActivity$MergingChildChunkLike*** is the same as the expanded field-types.
   */
  MergingChildChunk(fields) {
    const uplc = this.mkUplcData({
      MergingChildChunk: fields
    }, "MarketSalePolicy::SpendingActivity.MergingChildChunk");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"MarketSalePolicy::SpendingActivity.Retiring"***
   */
  Retiring(id) {
    const uplc = this.mkUplcData({
      Retiring: id
    }, "MarketSalePolicy::SpendingActivity.Retiring");
    return uplc;
  }
}
class MintingActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    MintingActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
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
  CreatingRecord(thingWithSeed) {
    const seedTxOutputId = this.getSeed(thingWithSeed);
    const uplc = this.mkUplcData({
      CreatingRecord: seedTxOutputId
    }, "MarketSalePolicy::MintingActivity.CreatingRecord");
    return uplc;
  }
  /*singleField/seeded enum variant*/
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
  get $seeded$CreatingRecord() {
    return impliedSeedActivityMaker(this, this.CreatingRecord)();
  }
  SplittingSaleChunkAndBuying(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        SplittingSaleChunkAndBuying: { seed: seedTxOutputId, ...filteredFields }
      }, "MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        SplittingSaleChunkAndBuying: fields
      }, "MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$SplittingSaleChunkAndBuying = impliedSeedActivityMaker(
    this,
    this.SplittingSaleChunkAndBuying
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
}
class BurningActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    BurningActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"MarketSalePolicy::BurningActivity.DeletingRecord"***
   */
  DeletingRecord(id) {
    const uplc = this.mkUplcData({
      DeletingRecord: id
    }, "MarketSalePolicy::BurningActivity.DeletingRecord");
    return uplc;
  }
  /**
   * generates  UplcData for ***"MarketSalePolicy::BurningActivity.JoiningWithParentChunk"***
   * @remarks - ***BurningActivity$JoiningWithParentChunkLike*** is the same as the expanded field-types.
   */
  JoiningWithParentChunk(fields) {
    const uplc = this.mkUplcData({
      JoiningWithParentChunk: fields
    }, "MarketSalePolicy::BurningActivity.JoiningWithParentChunk");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"MarketSalePolicy::BurningActivity.CleanupRetired"***
   */
  CleanupRetired(id) {
    const uplc = this.mkUplcData({
      CleanupRetired: id
    }, "MarketSalePolicy::BurningActivity.CleanupRetired");
    return uplc;
  }
}
class ActivityDelegateRoleHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateRoleSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get MintDgt() {
    const uplc = this.mkUplcData(
      { MintDgt: {} },
      "CapoDelegateHelpers::DelegateRole.MintDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get SpendDgt() {
    const uplc = this.mkUplcData(
      { SpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.SpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get MintInvariant() {
    const uplc = this.mkUplcData(
      { MintInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.MintInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get SpendInvariant() {
    const uplc = this.mkUplcData(
      { SpendInvariant: {} },
      "CapoDelegateHelpers::DelegateRole.SpendInvariant"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  DgDataPolicy(name) {
    const uplc = this.mkUplcData({
      DgDataPolicy: name
    }, "CapoDelegateHelpers::DelegateRole.DgDataPolicy");
    return uplc;
  }
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  OtherNamedDgt(name) {
    const uplc = this.mkUplcData({
      OtherNamedDgt: name
    }, "CapoDelegateHelpers::DelegateRole.OtherNamedDgt");
    return uplc;
  }
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
   */
  get BothMintAndSpendDgt() {
    const uplc = this.mkUplcData(
      { BothMintAndSpendDgt: {} },
      "CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
   */
  get HandledByCapoOnly() {
    const uplc = this.mkUplcData(
      { HandledByCapoOnly: {} },
      "CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class CapoLifecycleActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    CapoLifecycleActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  CreatingDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        CreatingDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        CreatingDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$CreatingDelegate = impliedSeedActivityMaker(
    this,
    this.CreatingDelegate
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get queuePendingChange() {
    const uplc = this.mkUplcData(
      { queuePendingChange: {} },
      "CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
   */
  get removePendingChange() {
    const nestedAccessor = new ActivityDelegateRoleHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (role) => {
        return this.mkUplcData(
          { removePendingChange: role },
          "CapoDelegateHelpers::CapoLifecycleActivity.removePendingChange"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get commitPendingChanges() {
    const uplc = this.mkUplcData(
      { commitPendingChanges: {} },
      "CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"
    );
    return uplc;
  }
  forcingNewSpendDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        forcingNewSpendDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        forcingNewSpendDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$forcingNewSpendDelegate = impliedSeedActivityMaker(
    this,
    this.forcingNewSpendDelegate
  );
  forcingNewMintDelegate(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        forcingNewMintDelegate: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        forcingNewMintDelegate: fields
      }, "CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$forcingNewMintDelegate = impliedSeedActivityMaker(
    this,
    this.forcingNewMintDelegate
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
   */
  get updatingManifest() {
    const nestedAccessor = new ManifestActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { updatingManifest: activity },
          "CapoDelegateHelpers::CapoLifecycleActivity.updatingManifest"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
}
class DelegateLifecycleActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateLifecycleActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  ReplacingMe(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        ReplacingMe: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        ReplacingMe: fields
      }, "CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$ReplacingMe = impliedSeedActivityMaker(
    this,
    this.ReplacingMe
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get Retiring() {
    const uplc = this.mkUplcData(
      { Retiring: {} },
      "CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
   */
  get ValidatingSettings() {
    const uplc = this.mkUplcData(
      { ValidatingSettings: {} },
      "CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class SpendingActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    SpendingActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.UpdatingRecord"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  UpdatingRecord(id) {
    const uplc = this.mkUplcData({
      UpdatingRecord: id
    }, "MarketSalePolicy::SpendingActivity.UpdatingRecord");
    return uplc;
  }
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.AddingToSale"***
   * @remarks - ***SpendingActivity$AddingToSaleLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  AddingToSale(fields) {
    const uplc = this.mkUplcData({
      AddingToSale: fields
    }, "MarketSalePolicy::SpendingActivity.AddingToSale");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.Activating"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  Activating(id) {
    const uplc = this.mkUplcData({
      Activating: id
    }, "MarketSalePolicy::SpendingActivity.Activating");
    return uplc;
  }
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.SellingTokens"***
   * @remarks - ***SpendingActivity$SellingTokensLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  SellingTokens(fields) {
    const uplc = this.mkUplcData({
      SellingTokens: fields
    }, "MarketSalePolicy::SpendingActivity.SellingTokens");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.MergingChildChunk"***
   * @remarks - ***SpendingActivity$MergingChildChunkLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  MergingChildChunk(fields) {
    const uplc = this.mkUplcData({
      MergingChildChunk: fields
    }, "MarketSalePolicy::SpendingActivity.MergingChildChunk");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::SpendingActivity.Retiring"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  Retiring(id) {
    const uplc = this.mkUplcData({
      Retiring: id
    }, "MarketSalePolicy::SpendingActivity.Retiring");
    return uplc;
  }
}
class MintingActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    MintingActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
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
  CreatingRecord(thingWithSeed) {
    const seedTxOutputId = this.getSeed(thingWithSeed);
    const uplc = this.mkUplcData({
      CreatingRecord: seedTxOutputId
    }, "MarketSalePolicy::MintingActivity.CreatingRecord");
    return uplc;
  }
  /*singleField/seeded enum variant*/
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
  get $seeded$CreatingRecord() {
    return impliedSeedActivityMaker(this, this.CreatingRecord)();
  }
  SplittingSaleChunkAndBuying(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        SplittingSaleChunkAndBuying: { seed: seedTxOutputId, ...filteredFields }
      }, "MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        SplittingSaleChunkAndBuying: fields
      }, "MarketSalePolicy::MintingActivity.SplittingSaleChunkAndBuying");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$SplittingSaleChunkAndBuying = impliedSeedActivityMaker(
    this,
    this.SplittingSaleChunkAndBuying
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
}
class BurningActivityHelperNested extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    BurningActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.DeletingRecord"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  DeletingRecord(id) {
    const uplc = this.mkUplcData({
      DeletingRecord: id
    }, "MarketSalePolicy::BurningActivity.DeletingRecord");
    return uplc;
  }
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.JoiningWithParentChunk"***
   * @remarks - ***BurningActivity$JoiningWithParentChunkLike*** is the same as the expanded field-types.
  * ##### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  JoiningWithParentChunk(fields) {
    const uplc = this.mkUplcData({
      JoiningWithParentChunk: fields
    }, "MarketSalePolicy::BurningActivity.JoiningWithParentChunk");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::BurningActivity.CleanupRetired"***
  * @remarks
  * #### Nested activity: 
  * this is connected to a nested-activity wrapper, so the details are piped through 
  * the parent's uplc-encoder, producing a single uplc object with 
  * a complete wrapper for this inner activity detail.
   */
  CleanupRetired(id) {
    const uplc = this.mkUplcData({
      CleanupRetired: id
    }, "MarketSalePolicy::BurningActivity.CleanupRetired");
    return uplc;
  }
}
class DelegateActivityHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    DelegateActivitySchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
   */
  get CapoLifecycleActivities() {
    const nestedAccessor = new CapoLifecycleActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { CapoLifecycleActivities: activity },
          "MarketSalePolicy::DelegateActivity.CapoLifecycleActivities"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
   */
  get DelegateLifecycleActivities() {
    const nestedAccessor = new DelegateLifecycleActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { DelegateLifecycleActivities: activity },
          "MarketSalePolicy::DelegateActivity.DelegateLifecycleActivities"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
   */
  get SpendingActivities() {
    const nestedAccessor = new SpendingActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { SpendingActivities: activity },
          "MarketSalePolicy::DelegateActivity.SpendingActivities"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
   */
  get MintingActivities() {
    const nestedAccessor = new MintingActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { MintingActivities: activity },
          "MarketSalePolicy::DelegateActivity.MintingActivities"
        );
      }
    );
    return nestedAccessor;
  }
  /* nested enum accessor */
  /**
   * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
   */
  get BurningActivities() {
    const nestedAccessor = new BurningActivityHelperNested({
      isMainnet: this.isMainnet,
      isNested: true,
      isActivity: true
    });
    nestedAccessor.mkDataVia(
      (activity) => {
        return this.mkUplcData(
          { BurningActivities: activity },
          "MarketSalePolicy::DelegateActivity.BurningActivities"
        );
      }
    );
    return nestedAccessor;
  }
  CreatingDelegatedData(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        CreatingDelegatedData: { seed: seedTxOutputId, ...filteredFields }
      }, "MarketSalePolicy::DelegateActivity.CreatingDelegatedData");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        CreatingDelegatedData: fields
      }, "MarketSalePolicy::DelegateActivity.CreatingDelegatedData");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$CreatingDelegatedData = impliedSeedActivityMaker(
    this,
    this.CreatingDelegatedData
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.UpdatingDelegatedData"***
   * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
   */
  UpdatingDelegatedData(fields) {
    const uplc = this.mkUplcData({
      UpdatingDelegatedData: fields
    }, "MarketSalePolicy::DelegateActivity.UpdatingDelegatedData");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.DeletingDelegatedData"***
   * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
   */
  DeletingDelegatedData(fields) {
    const uplc = this.mkUplcData({
      DeletingDelegatedData: fields
    }, "MarketSalePolicy::DelegateActivity.DeletingDelegatedData");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates isActivity/redeemer wrapper with UplcData for ***"MarketSalePolicy::DelegateActivity.MultipleDelegateActivities"***
   */
  MultipleDelegateActivities(activities) {
    const uplc = this.mkUplcData({
      MultipleDelegateActivities: activities
    }, "MarketSalePolicy::DelegateActivity.MultipleDelegateActivities");
    return uplc;
  }
}
class PendingDelegateActionHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    PendingDelegateActionSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  Add(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        Add: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::PendingDelegateAction.Add");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        Add: fields
      }, "CapoDelegateHelpers::PendingDelegateAction.Add");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$Add = impliedSeedActivityMaker(
    this,
    this.Add
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
  /**
   * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
   */
  get Remove() {
    const uplc = this.mkUplcData(
      { Remove: {} },
      "CapoDelegateHelpers::PendingDelegateAction.Remove"
    );
    return uplc;
  }
  Replace(seedOrUf, filteredFields) {
    if (filteredFields) {
      const seedTxOutputId = this.getSeed(seedOrUf);
      const uplc = this.mkUplcData({
        Replace: { seed: seedTxOutputId, ...filteredFields }
      }, "CapoDelegateHelpers::PendingDelegateAction.Replace");
      return uplc;
    } else {
      const fields = seedOrUf;
      const uplc = this.mkUplcData({
        Replace: fields
      }, "CapoDelegateHelpers::PendingDelegateAction.Replace");
      return uplc;
    }
  }
  /*multiFieldVariant/seeded enum accessor*/
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
  $seeded$Replace = impliedSeedActivityMaker(
    this,
    this.Replace
  );
  /* coda: seeded helper in same multiFieldVariant/seeded */
}
class ManifestEntryTypeHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    ManifestEntryTypeSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get NamedTokenRef() {
    const uplc = this.mkUplcData(
      { NamedTokenRef: {} },
      "CapoHelpers::ManifestEntryType.NamedTokenRef"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
   * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
   */
  DgDataPolicy(fields) {
    const uplc = this.mkUplcData({
      DgDataPolicy: fields
    }, "CapoHelpers::ManifestEntryType.DgDataPolicy");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
   * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
   */
  DelegateThreads(fields) {
    const uplc = this.mkUplcData({
      DelegateThreads: fields
    }, "CapoHelpers::ManifestEntryType.DelegateThreads");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
   */
  get MerkleMembership() {
    const uplc = this.mkUplcData(
      { MerkleMembership: {} },
      "CapoHelpers::ManifestEntryType.MerkleMembership"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
   */
  get MerkleStateRoot() {
    const uplc = this.mkUplcData(
      { MerkleStateRoot: {} },
      "CapoHelpers::ManifestEntryType.MerkleStateRoot"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
}
class PendingCharterChangeHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    PendingCharterChangeSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
   * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
   */
  delegateChange(change) {
    const uplc = this.mkUplcData({
      delegateChange: change
    }, "CapoDelegateHelpers::PendingCharterChange.delegateChange");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
   * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
   */
  otherManifestChange(fields) {
    const uplc = this.mkUplcData({
      otherManifestChange: fields
    }, "CapoDelegateHelpers::PendingCharterChange.otherManifestChange");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
class cctx_CharterInputTypeHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    cctx_CharterInputTypeSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get Unk() {
    const uplc = this.mkUplcData(
      { Unk: {} },
      "CapoHelpers::cctx_CharterInputType.Unk"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
   * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
   */
  RefInput(fields) {
    const uplc = this.mkUplcData({
      RefInput: fields
    }, "CapoHelpers::cctx_CharterInputType.RefInput");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
  /**
   * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
   * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
   */
  Input(fields) {
    const uplc = this.mkUplcData({
      Input: fields
    }, "CapoHelpers::cctx_CharterInputType.Input");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
class dgd_DataSrcHelper extends EnumBridge {
  /*mkEnumHelperClass*/
  /**
          * @internal
          *  uses unicode U+1c7a - sorts to the end */
  "\u1C7A\u1C7Acast" = makeCast(
    dgd_DataSrcSchema,
    { isMainnet: this.isMainnet, unwrapSingleFieldEnumVariants: true }
  );
  /**
   * (property getter): UplcData for ***"CapoHelpers::dgd_DataSrc.Unk"***
   * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
   */
  get Unk() {
    const uplc = this.mkUplcData(
      { Unk: {} },
      "CapoHelpers::dgd_DataSrc.Unk"
    );
    return uplc;
  }
  /* tagOnly variant accessor */
  /**
   * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Input"***
   */
  Input(utxo) {
    const uplc = this.mkUplcData({
      Input: utxo
    }, "CapoHelpers::dgd_DataSrc.Input");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Output"***
   */
  Output(txo) {
    const uplc = this.mkUplcData({
      Output: txo
    }, "CapoHelpers::dgd_DataSrc.Output");
    return uplc;
  }
  /**
   * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Both"***
   * @remarks - ***dgd_DataSrc$BothLike*** is the same as the expanded field-types.
   */
  Both(fields) {
    const uplc = this.mkUplcData({
      Both: fields
    }, "CapoHelpers::dgd_DataSrc.Both");
    return uplc;
  }
  /*multiFieldVariant enum accessor*/
}
const AnyDataSchema = {
  "kind": "struct",
  "format": "map",
  "id": "__module__StellarHeliosHelpers__AnyData[]",
  "name": "AnyData",
  "fieldTypes": [
    {
      "name": "id",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      },
      "key": "@id"
    },
    {
      "name": "type",
      "type": {
        "kind": "internal",
        "name": "String"
      },
      "key": "tpe"
    }
  ]
};
const DelegationDetailSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__CapoDelegateHelpers__DelegationDetail[]",
  "name": "DelegationDetail",
  "fieldTypes": [
    {
      "name": "capoAddr",
      "type": {
        "kind": "internal",
        "name": "Address"
      }
    },
    {
      "name": "mph",
      "type": {
        "kind": "internal",
        "name": "MintingPolicyHash"
      }
    },
    {
      "name": "tn",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    }
  ]
};
const SaleProgressDetailsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
  "name": "SaleProgressDetails",
  "fieldTypes": [
    {
      "name": "lastPurchaseAt",
      "type": {
        "kind": "internal",
        "name": "Time"
      }
    },
    {
      "name": "prevPurchaseAt",
      "type": {
        "kind": "internal",
        "name": "Time"
      }
    },
    {
      "name": "chunkUnitCount",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "chunkUnitsSold",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    }
  ]
};
const MarketSaleStateSchema = {
  "kind": "enum",
  "name": "MarketSaleState",
  "id": "__module__MarketSaleData__MarketSaleState[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
      "name": "Pending",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSaleData__MarketSaleState[]__Active",
      "name": "Active",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
      "name": "Retired",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
      "name": "SoldOut",
      "fieldTypes": []
    }
  ]
};
const OtherSaleStateSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__MarketSaleData__OtherSaleState[]",
  "name": "OtherSaleState",
  "fieldTypes": [
    {
      "name": "progressDetails",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
        "name": "SaleProgressDetails",
        "fieldTypes": [
          {
            "name": "lastPurchaseAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "prevPurchaseAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "chunkUnitCount",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "chunkUnitsSold",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          }
        ]
      }
    },
    {
      "name": "salePace",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "enum",
        "name": "MarketSaleState",
        "id": "__module__MarketSaleData__MarketSaleState[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
            "name": "Pending",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__MarketSaleData__MarketSaleState[]__Active",
            "name": "Active",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
            "name": "Retired",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 3,
            "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
            "name": "SoldOut",
            "fieldTypes": []
          }
        ]
      }
    }
  ]
};
const DynamicSaleV1SettingsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
  "name": "DynamicSaleV1Settings",
  "fieldTypes": [
    {
      "name": "targetPrice",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "targetedSellingTime",
      "type": {
        "kind": "internal",
        "name": "Duration"
      }
    },
    {
      "name": "minPrice",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "maxPrice",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "progressPricingDiscountFloorPoint",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "progressPricingDiscountWhenSlow",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "progressPricingExpansionWhenFast",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "dynaPaceFasterSaleWeight",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "dynaPaceIdleDecayRate",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "pricingWeightDynaPace",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    }
  ]
};
const RelativeDelegateLinkSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
  "name": "RelativeDelegateLink",
  "fieldTypes": [
    {
      "name": "uutName",
      "type": {
        "kind": "internal",
        "name": "String"
      }
    },
    {
      "name": "delegateValidatorHash",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "internal",
          "name": "ValidatorHash"
        }
      }
    },
    {
      "name": "config",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    }
  ]
};
const VxfExpectedActivitySchema = {
  "kind": "enum",
  "name": "VxfExpectedActivity",
  "id": "__module__VxfProtocol__VxfExpectedActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 22104,
      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
      "name": "VxfTransfer",
      "fieldTypes": [
        {
          "name": "appData",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "internal",
              "name": "Data"
            }
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 22106,
      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
      "name": "VxfStorage",
      "fieldTypes": [
        {
          "name": "appData",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "internal",
              "name": "Data"
            }
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 22107,
      "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
      "name": "SpecificRedeemerId",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        },
        {
          "name": "inNestedList",
          "type": {
            "kind": "internal",
            "name": "Bool"
          }
        },
        {
          "name": "nestedListRedeemerId",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "internal",
              "name": "Int"
            }
          }
        },
        {
          "name": "appData",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "internal",
              "name": "Data"
            }
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 22108,
      "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
      "name": "TaggedRedeemer",
      "fieldTypes": [
        {
          "name": "firstFieldConstrTag",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        },
        {
          "name": "inNestedList",
          "type": {
            "kind": "internal",
            "name": "Bool"
          }
        },
        {
          "name": "appData",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "internal",
              "name": "Data"
            }
          }
        }
      ]
    }
  ]
};
const VxfDestinationSchema = {
  "kind": "enum",
  "name": "VxfDestination",
  "id": "__module__VxfProtocol__VxfDestination[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
      "name": "RelativeLink",
      "fieldTypes": [
        {
          "name": "link",
          "type": {
            "kind": "struct",
            "format": "list",
            "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
            "name": "RelativeDelegateLink",
            "fieldTypes": [
              {
                "name": "uutName",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "delegateValidatorHash",
                "type": {
                  "kind": "option",
                  "someType": {
                    "kind": "internal",
                    "name": "ValidatorHash"
                  }
                }
              },
              {
                "name": "config",
                "type": {
                  "kind": "internal",
                  "name": "ByteArray"
                }
              }
            ]
          }
        },
        {
          "name": "vxfActivity",
          "type": {
            "kind": "option",
            "someType": {
              "kind": "enum",
              "name": "VxfExpectedActivity",
              "id": "__module__VxfProtocol__VxfExpectedActivity[]",
              "variantTypes": [
                {
                  "kind": "variant",
                  "tag": 22104,
                  "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                  "name": "VxfTransfer",
                  "fieldTypes": [
                    {
                      "name": "appData",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "Data"
                        }
                      }
                    }
                  ]
                },
                {
                  "kind": "variant",
                  "tag": 22106,
                  "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                  "name": "VxfStorage",
                  "fieldTypes": [
                    {
                      "name": "appData",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "Data"
                        }
                      }
                    }
                  ]
                },
                {
                  "kind": "variant",
                  "tag": 22107,
                  "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                  "name": "SpecificRedeemerId",
                  "fieldTypes": [
                    {
                      "name": "id",
                      "type": {
                        "kind": "internal",
                        "name": "Int"
                      }
                    },
                    {
                      "name": "inNestedList",
                      "type": {
                        "kind": "internal",
                        "name": "Bool"
                      }
                    },
                    {
                      "name": "nestedListRedeemerId",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      }
                    },
                    {
                      "name": "appData",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "Data"
                        }
                      }
                    }
                  ]
                },
                {
                  "kind": "variant",
                  "tag": 22108,
                  "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                  "name": "TaggedRedeemer",
                  "fieldTypes": [
                    {
                      "name": "firstFieldConstrTag",
                      "type": {
                        "kind": "internal",
                        "name": "Int"
                      }
                    },
                    {
                      "name": "inNestedList",
                      "type": {
                        "kind": "internal",
                        "name": "Bool"
                      }
                    },
                    {
                      "name": "appData",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "Data"
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
      "name": "AnyTokenHolder",
      "fieldTypes": [
        {
          "name": "mph",
          "type": {
            "kind": "internal",
            "name": "MintingPolicyHash"
          }
        },
        {
          "name": "assetName",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
      "name": "PubKey",
      "fieldTypes": [
        {
          "name": "pkh",
          "type": {
            "kind": "internal",
            "name": "PubKeyHash"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 98,
      "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
      "name": "Anywhere",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 99,
      "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
      "name": "NotYetDefined",
      "fieldTypes": []
    }
  ]
};
const FixedSaleDetailsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__MarketSaleData__FixedSaleDetails[]",
  "name": "FixedSaleDetails",
  "fieldTypes": [
    {
      "name": "settings",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
        "name": "DynamicSaleV1Settings",
        "fieldTypes": [
          {
            "name": "targetPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "targetedSellingTime",
            "type": {
              "kind": "internal",
              "name": "Duration"
            }
          },
          {
            "name": "minPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "maxPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingDiscountFloorPoint",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingDiscountWhenSlow",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingExpansionWhenFast",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "dynaPaceFasterSaleWeight",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "dynaPaceIdleDecayRate",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "pricingWeightDynaPace",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          }
        ]
      }
    },
    {
      "name": "startAt",
      "type": {
        "kind": "internal",
        "name": "Time"
      }
    },
    {
      "name": "vxfTokensTo",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "enum",
          "name": "VxfDestination",
          "id": "__module__VxfProtocol__VxfDestination[]",
          "variantTypes": [
            {
              "kind": "variant",
              "tag": 0,
              "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
              "name": "RelativeLink",
              "fieldTypes": [
                {
                  "name": "link",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "vxfActivity",
                  "type": {
                    "kind": "option",
                    "someType": {
                      "kind": "enum",
                      "name": "VxfExpectedActivity",
                      "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 22104,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                          "name": "VxfTransfer",
                          "fieldTypes": [
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22106,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                          "name": "VxfStorage",
                          "fieldTypes": [
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22107,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                          "name": "SpecificRedeemerId",
                          "fieldTypes": [
                            {
                              "name": "id",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            },
                            {
                              "name": "inNestedList",
                              "type": {
                                "kind": "internal",
                                "name": "Bool"
                              }
                            },
                            {
                              "name": "nestedListRedeemerId",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Int"
                                }
                              }
                            },
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22108,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                          "name": "TaggedRedeemer",
                          "fieldTypes": [
                            {
                              "name": "firstFieldConstrTag",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            },
                            {
                              "name": "inNestedList",
                              "type": {
                                "kind": "internal",
                                "name": "Bool"
                              }
                            },
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 1,
              "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
              "name": "AnyTokenHolder",
              "fieldTypes": [
                {
                  "name": "mph",
                  "type": {
                    "kind": "internal",
                    "name": "MintingPolicyHash"
                  }
                },
                {
                  "name": "assetName",
                  "type": {
                    "kind": "internal",
                    "name": "ByteArray"
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 2,
              "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
              "name": "PubKey",
              "fieldTypes": [
                {
                  "name": "pkh",
                  "type": {
                    "kind": "internal",
                    "name": "PubKeyHash"
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 98,
              "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
              "name": "Anywhere",
              "fieldTypes": []
            },
            {
              "kind": "variant",
              "tag": 99,
              "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
              "name": "NotYetDefined",
              "fieldTypes": []
            }
          ]
        }
      }
    },
    {
      "name": "vxfFundsTo",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "enum",
          "name": "VxfDestination",
          "id": "__module__VxfProtocol__VxfDestination[]",
          "variantTypes": [
            {
              "kind": "variant",
              "tag": 0,
              "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
              "name": "RelativeLink",
              "fieldTypes": [
                {
                  "name": "link",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "vxfActivity",
                  "type": {
                    "kind": "option",
                    "someType": {
                      "kind": "enum",
                      "name": "VxfExpectedActivity",
                      "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 22104,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                          "name": "VxfTransfer",
                          "fieldTypes": [
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22106,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                          "name": "VxfStorage",
                          "fieldTypes": [
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22107,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                          "name": "SpecificRedeemerId",
                          "fieldTypes": [
                            {
                              "name": "id",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            },
                            {
                              "name": "inNestedList",
                              "type": {
                                "kind": "internal",
                                "name": "Bool"
                              }
                            },
                            {
                              "name": "nestedListRedeemerId",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Int"
                                }
                              }
                            },
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 22108,
                          "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                          "name": "TaggedRedeemer",
                          "fieldTypes": [
                            {
                              "name": "firstFieldConstrTag",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            },
                            {
                              "name": "inNestedList",
                              "type": {
                                "kind": "internal",
                                "name": "Bool"
                              }
                            },
                            {
                              "name": "appData",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "Data"
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 1,
              "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
              "name": "AnyTokenHolder",
              "fieldTypes": [
                {
                  "name": "mph",
                  "type": {
                    "kind": "internal",
                    "name": "MintingPolicyHash"
                  }
                },
                {
                  "name": "assetName",
                  "type": {
                    "kind": "internal",
                    "name": "ByteArray"
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 2,
              "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
              "name": "PubKey",
              "fieldTypes": [
                {
                  "name": "pkh",
                  "type": {
                    "kind": "internal",
                    "name": "PubKeyHash"
                  }
                }
              ]
            },
            {
              "kind": "variant",
              "tag": 98,
              "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
              "name": "Anywhere",
              "fieldTypes": []
            },
            {
              "kind": "variant",
              "tag": 99,
              "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
              "name": "NotYetDefined",
              "fieldTypes": []
            }
          ]
        }
      }
    }
  ]
};
const SaleAssetsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__MarketSaleData__SaleAssets[]",
  "name": "SaleAssets",
  "fieldTypes": [
    {
      "name": "saleUnitAssets",
      "type": {
        "kind": "internal",
        "name": "Value"
      }
    },
    {
      "name": "singleBuyMaxUnits",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "primaryAssetMph",
      "type": {
        "kind": "internal",
        "name": "MintingPolicyHash"
      }
    },
    {
      "name": "primaryAssetName",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    },
    {
      "name": "primaryAssetTargetCount",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "totalSaleUnits",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    }
  ]
};
const ThreadInfoSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__MarketSaleData__ThreadInfo[]",
  "name": "ThreadInfo",
  "fieldTypes": [
    {
      "name": "nestedThreads",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "retiredThreads",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "parentChunkId",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    },
    {
      "name": "chunkForkedAt",
      "type": {
        "kind": "internal",
        "name": "Time"
      }
    },
    {
      "name": "saleId",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    }
  ]
};
const MoreFieldsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__MarketSaleData__MoreFields[]",
  "name": "MoreFields",
  "fieldTypes": [
    {
      "name": "saleState",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__MarketSaleData__OtherSaleState[]",
        "name": "OtherSaleState",
        "fieldTypes": [
          {
            "name": "progressDetails",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
              "name": "SaleProgressDetails",
              "fieldTypes": [
                {
                  "name": "lastPurchaseAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "prevPurchaseAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "chunkUnitCount",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "chunkUnitsSold",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                }
              ]
            }
          },
          {
            "name": "salePace",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "state",
            "type": {
              "kind": "enum",
              "name": "MarketSaleState",
              "id": "__module__MarketSaleData__MarketSaleState[]",
              "variantTypes": [
                {
                  "kind": "variant",
                  "tag": 0,
                  "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
                  "name": "Pending",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 1,
                  "id": "__module__MarketSaleData__MarketSaleState[]__Active",
                  "name": "Active",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 2,
                  "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
                  "name": "Retired",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 3,
                  "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
                  "name": "SoldOut",
                  "fieldTypes": []
                }
              ]
            }
          }
        ]
      }
    },
    {
      "name": "fixedSaleDetails",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__MarketSaleData__FixedSaleDetails[]",
        "name": "FixedSaleDetails",
        "fieldTypes": [
          {
            "name": "settings",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
              "name": "DynamicSaleV1Settings",
              "fieldTypes": [
                {
                  "name": "targetPrice",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "targetedSellingTime",
                  "type": {
                    "kind": "internal",
                    "name": "Duration"
                  }
                },
                {
                  "name": "minPrice",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "maxPrice",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "progressPricingDiscountFloorPoint",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "progressPricingDiscountWhenSlow",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "progressPricingExpansionWhenFast",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "dynaPaceFasterSaleWeight",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "dynaPaceIdleDecayRate",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "pricingWeightDynaPace",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                }
              ]
            }
          },
          {
            "name": "startAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "vxfTokensTo",
            "type": {
              "kind": "option",
              "someType": {
                "kind": "enum",
                "name": "VxfDestination",
                "id": "__module__VxfProtocol__VxfDestination[]",
                "variantTypes": [
                  {
                    "kind": "variant",
                    "tag": 0,
                    "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                    "name": "RelativeLink",
                    "fieldTypes": [
                      {
                        "name": "link",
                        "type": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "name": "vxfActivity",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "enum",
                            "name": "VxfExpectedActivity",
                            "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                            "variantTypes": [
                              {
                                "kind": "variant",
                                "tag": 22104,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                "name": "VxfTransfer",
                                "fieldTypes": [
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22106,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                "name": "VxfStorage",
                                "fieldTypes": [
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22107,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                "name": "SpecificRedeemerId",
                                "fieldTypes": [
                                  {
                                    "name": "id",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Int"
                                    }
                                  },
                                  {
                                    "name": "inNestedList",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Bool"
                                    }
                                  },
                                  {
                                    "name": "nestedListRedeemerId",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  },
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22108,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                "name": "TaggedRedeemer",
                                "fieldTypes": [
                                  {
                                    "name": "firstFieldConstrTag",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Int"
                                    }
                                  },
                                  {
                                    "name": "inNestedList",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Bool"
                                    }
                                  },
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 1,
                    "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                    "name": "AnyTokenHolder",
                    "fieldTypes": [
                      {
                        "name": "mph",
                        "type": {
                          "kind": "internal",
                          "name": "MintingPolicyHash"
                        }
                      },
                      {
                        "name": "assetName",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 2,
                    "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                    "name": "PubKey",
                    "fieldTypes": [
                      {
                        "name": "pkh",
                        "type": {
                          "kind": "internal",
                          "name": "PubKeyHash"
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 98,
                    "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                    "name": "Anywhere",
                    "fieldTypes": []
                  },
                  {
                    "kind": "variant",
                    "tag": 99,
                    "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                    "name": "NotYetDefined",
                    "fieldTypes": []
                  }
                ]
              }
            }
          },
          {
            "name": "vxfFundsTo",
            "type": {
              "kind": "option",
              "someType": {
                "kind": "enum",
                "name": "VxfDestination",
                "id": "__module__VxfProtocol__VxfDestination[]",
                "variantTypes": [
                  {
                    "kind": "variant",
                    "tag": 0,
                    "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                    "name": "RelativeLink",
                    "fieldTypes": [
                      {
                        "name": "link",
                        "type": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "name": "vxfActivity",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "enum",
                            "name": "VxfExpectedActivity",
                            "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                            "variantTypes": [
                              {
                                "kind": "variant",
                                "tag": 22104,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                "name": "VxfTransfer",
                                "fieldTypes": [
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22106,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                "name": "VxfStorage",
                                "fieldTypes": [
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22107,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                "name": "SpecificRedeemerId",
                                "fieldTypes": [
                                  {
                                    "name": "id",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Int"
                                    }
                                  },
                                  {
                                    "name": "inNestedList",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Bool"
                                    }
                                  },
                                  {
                                    "name": "nestedListRedeemerId",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  },
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 22108,
                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                "name": "TaggedRedeemer",
                                "fieldTypes": [
                                  {
                                    "name": "firstFieldConstrTag",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Int"
                                    }
                                  },
                                  {
                                    "name": "inNestedList",
                                    "type": {
                                      "kind": "internal",
                                      "name": "Bool"
                                    }
                                  },
                                  {
                                    "name": "appData",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "Data"
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 1,
                    "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                    "name": "AnyTokenHolder",
                    "fieldTypes": [
                      {
                        "name": "mph",
                        "type": {
                          "kind": "internal",
                          "name": "MintingPolicyHash"
                        }
                      },
                      {
                        "name": "assetName",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 2,
                    "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                    "name": "PubKey",
                    "fieldTypes": [
                      {
                        "name": "pkh",
                        "type": {
                          "kind": "internal",
                          "name": "PubKeyHash"
                        }
                      }
                    ]
                  },
                  {
                    "kind": "variant",
                    "tag": 98,
                    "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                    "name": "Anywhere",
                    "fieldTypes": []
                  },
                  {
                    "kind": "variant",
                    "tag": 99,
                    "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                    "name": "NotYetDefined",
                    "fieldTypes": []
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "saleAssets",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__MarketSaleData__SaleAssets[]",
        "name": "SaleAssets",
        "fieldTypes": [
          {
            "name": "saleUnitAssets",
            "type": {
              "kind": "internal",
              "name": "Value"
            }
          },
          {
            "name": "singleBuyMaxUnits",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "primaryAssetMph",
            "type": {
              "kind": "internal",
              "name": "MintingPolicyHash"
            }
          },
          {
            "name": "primaryAssetName",
            "type": {
              "kind": "internal",
              "name": "ByteArray"
            }
          },
          {
            "name": "primaryAssetTargetCount",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "totalSaleUnits",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          }
        ]
      }
    },
    {
      "name": "threadInfo",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__MarketSaleData__ThreadInfo[]",
        "name": "ThreadInfo",
        "fieldTypes": [
          {
            "name": "nestedThreads",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "retiredThreads",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "parentChunkId",
            "type": {
              "kind": "internal",
              "name": "ByteArray"
            }
          },
          {
            "name": "chunkForkedAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "saleId",
            "type": {
              "kind": "internal",
              "name": "ByteArray"
            }
          }
        ]
      }
    }
  ]
};
const MarketSaleDataSchema = {
  "kind": "struct",
  "format": "map",
  "id": "__module__MarketSaleData__MarketSaleData[]",
  "name": "MarketSaleData",
  "fieldTypes": [
    {
      "name": "id",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      },
      "key": "@id"
    },
    {
      "name": "type",
      "type": {
        "kind": "internal",
        "name": "String"
      },
      "key": "tpe"
    },
    {
      "name": "name",
      "type": {
        "kind": "internal",
        "name": "String"
      }
    },
    {
      "name": "moreFields",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__MarketSaleData__MoreFields[]",
        "name": "MoreFields",
        "fieldTypes": [
          {
            "name": "saleState",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__MarketSaleData__OtherSaleState[]",
              "name": "OtherSaleState",
              "fieldTypes": [
                {
                  "name": "progressDetails",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
                    "name": "SaleProgressDetails",
                    "fieldTypes": [
                      {
                        "name": "lastPurchaseAt",
                        "type": {
                          "kind": "internal",
                          "name": "Time"
                        }
                      },
                      {
                        "name": "prevPurchaseAt",
                        "type": {
                          "kind": "internal",
                          "name": "Time"
                        }
                      },
                      {
                        "name": "chunkUnitCount",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      },
                      {
                        "name": "chunkUnitsSold",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "salePace",
                  "type": {
                    "kind": "internal",
                    "name": "Real"
                  }
                },
                {
                  "name": "state",
                  "type": {
                    "kind": "enum",
                    "name": "MarketSaleState",
                    "id": "__module__MarketSaleData__MarketSaleState[]",
                    "variantTypes": [
                      {
                        "kind": "variant",
                        "tag": 0,
                        "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
                        "name": "Pending",
                        "fieldTypes": []
                      },
                      {
                        "kind": "variant",
                        "tag": 1,
                        "id": "__module__MarketSaleData__MarketSaleState[]__Active",
                        "name": "Active",
                        "fieldTypes": []
                      },
                      {
                        "kind": "variant",
                        "tag": 2,
                        "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
                        "name": "Retired",
                        "fieldTypes": []
                      },
                      {
                        "kind": "variant",
                        "tag": 3,
                        "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
                        "name": "SoldOut",
                        "fieldTypes": []
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "name": "fixedSaleDetails",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__MarketSaleData__FixedSaleDetails[]",
              "name": "FixedSaleDetails",
              "fieldTypes": [
                {
                  "name": "settings",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
                    "name": "DynamicSaleV1Settings",
                    "fieldTypes": [
                      {
                        "name": "targetPrice",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "targetedSellingTime",
                        "type": {
                          "kind": "internal",
                          "name": "Duration"
                        }
                      },
                      {
                        "name": "minPrice",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "maxPrice",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "progressPricingDiscountFloorPoint",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "progressPricingDiscountWhenSlow",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "progressPricingExpansionWhenFast",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "dynaPaceFasterSaleWeight",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "dynaPaceIdleDecayRate",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "pricingWeightDynaPace",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "startAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "vxfTokensTo",
                  "type": {
                    "kind": "option",
                    "someType": {
                      "kind": "enum",
                      "name": "VxfDestination",
                      "id": "__module__VxfProtocol__VxfDestination[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 0,
                          "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                          "name": "RelativeLink",
                          "fieldTypes": [
                            {
                              "name": "link",
                              "type": {
                                "kind": "struct",
                                "format": "list",
                                "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                "name": "RelativeDelegateLink",
                                "fieldTypes": [
                                  {
                                    "name": "uutName",
                                    "type": {
                                      "kind": "internal",
                                      "name": "String"
                                    }
                                  },
                                  {
                                    "name": "delegateValidatorHash",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "ValidatorHash"
                                      }
                                    }
                                  },
                                  {
                                    "name": "config",
                                    "type": {
                                      "kind": "internal",
                                      "name": "ByteArray"
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "name": "vxfActivity",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "enum",
                                  "name": "VxfExpectedActivity",
                                  "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                  "variantTypes": [
                                    {
                                      "kind": "variant",
                                      "tag": 22104,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                      "name": "VxfTransfer",
                                      "fieldTypes": [
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22106,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                      "name": "VxfStorage",
                                      "fieldTypes": [
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22107,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                      "name": "SpecificRedeemerId",
                                      "fieldTypes": [
                                        {
                                          "name": "id",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Int"
                                          }
                                        },
                                        {
                                          "name": "inNestedList",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Bool"
                                          }
                                        },
                                        {
                                          "name": "nestedListRedeemerId",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        },
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22108,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                      "name": "TaggedRedeemer",
                                      "fieldTypes": [
                                        {
                                          "name": "firstFieldConstrTag",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Int"
                                          }
                                        },
                                        {
                                          "name": "inNestedList",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Bool"
                                          }
                                        },
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 1,
                          "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                          "name": "AnyTokenHolder",
                          "fieldTypes": [
                            {
                              "name": "mph",
                              "type": {
                                "kind": "internal",
                                "name": "MintingPolicyHash"
                              }
                            },
                            {
                              "name": "assetName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 2,
                          "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                          "name": "PubKey",
                          "fieldTypes": [
                            {
                              "name": "pkh",
                              "type": {
                                "kind": "internal",
                                "name": "PubKeyHash"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 98,
                          "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                          "name": "Anywhere",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 99,
                          "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                          "name": "NotYetDefined",
                          "fieldTypes": []
                        }
                      ]
                    }
                  }
                },
                {
                  "name": "vxfFundsTo",
                  "type": {
                    "kind": "option",
                    "someType": {
                      "kind": "enum",
                      "name": "VxfDestination",
                      "id": "__module__VxfProtocol__VxfDestination[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 0,
                          "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                          "name": "RelativeLink",
                          "fieldTypes": [
                            {
                              "name": "link",
                              "type": {
                                "kind": "struct",
                                "format": "list",
                                "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                "name": "RelativeDelegateLink",
                                "fieldTypes": [
                                  {
                                    "name": "uutName",
                                    "type": {
                                      "kind": "internal",
                                      "name": "String"
                                    }
                                  },
                                  {
                                    "name": "delegateValidatorHash",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "internal",
                                        "name": "ValidatorHash"
                                      }
                                    }
                                  },
                                  {
                                    "name": "config",
                                    "type": {
                                      "kind": "internal",
                                      "name": "ByteArray"
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "name": "vxfActivity",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "enum",
                                  "name": "VxfExpectedActivity",
                                  "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                  "variantTypes": [
                                    {
                                      "kind": "variant",
                                      "tag": 22104,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                      "name": "VxfTransfer",
                                      "fieldTypes": [
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22106,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                      "name": "VxfStorage",
                                      "fieldTypes": [
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22107,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                      "name": "SpecificRedeemerId",
                                      "fieldTypes": [
                                        {
                                          "name": "id",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Int"
                                          }
                                        },
                                        {
                                          "name": "inNestedList",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Bool"
                                          }
                                        },
                                        {
                                          "name": "nestedListRedeemerId",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        },
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "variant",
                                      "tag": 22108,
                                      "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                      "name": "TaggedRedeemer",
                                      "fieldTypes": [
                                        {
                                          "name": "firstFieldConstrTag",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Int"
                                          }
                                        },
                                        {
                                          "name": "inNestedList",
                                          "type": {
                                            "kind": "internal",
                                            "name": "Bool"
                                          }
                                        },
                                        {
                                          "name": "appData",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "Data"
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 1,
                          "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                          "name": "AnyTokenHolder",
                          "fieldTypes": [
                            {
                              "name": "mph",
                              "type": {
                                "kind": "internal",
                                "name": "MintingPolicyHash"
                              }
                            },
                            {
                              "name": "assetName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 2,
                          "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                          "name": "PubKey",
                          "fieldTypes": [
                            {
                              "name": "pkh",
                              "type": {
                                "kind": "internal",
                                "name": "PubKeyHash"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 98,
                          "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                          "name": "Anywhere",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 99,
                          "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                          "name": "NotYetDefined",
                          "fieldTypes": []
                        }
                      ]
                    }
                  }
                }
              ]
            }
          },
          {
            "name": "saleAssets",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__MarketSaleData__SaleAssets[]",
              "name": "SaleAssets",
              "fieldTypes": [
                {
                  "name": "saleUnitAssets",
                  "type": {
                    "kind": "internal",
                    "name": "Value"
                  }
                },
                {
                  "name": "singleBuyMaxUnits",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "primaryAssetMph",
                  "type": {
                    "kind": "internal",
                    "name": "MintingPolicyHash"
                  }
                },
                {
                  "name": "primaryAssetName",
                  "type": {
                    "kind": "internal",
                    "name": "ByteArray"
                  }
                },
                {
                  "name": "primaryAssetTargetCount",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "totalSaleUnits",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                }
              ]
            }
          },
          {
            "name": "threadInfo",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__MarketSaleData__ThreadInfo[]",
              "name": "ThreadInfo",
              "fieldTypes": [
                {
                  "name": "nestedThreads",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "retiredThreads",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "parentChunkId",
                  "type": {
                    "kind": "internal",
                    "name": "ByteArray"
                  }
                },
                {
                  "name": "chunkForkedAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "saleId",
                  "type": {
                    "kind": "internal",
                    "name": "ByteArray"
                  }
                }
              ]
            }
          }
        ]
      },
      "key": "mo"
    }
  ]
};
const DelegateDatumSchema = {
  "kind": "enum",
  "name": "DelegateDatum",
  "id": "__module__MarketSalePolicy__DelegateDatum[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSalePolicy__DelegateDatum[]__Cip68RefToken",
      "name": "Cip68RefToken",
      "fieldTypes": [
        {
          "name": "cip68meta",
          "type": {
            "kind": "struct",
            "format": "map",
            "id": "__module__StellarHeliosHelpers__AnyData[]",
            "name": "AnyData",
            "fieldTypes": [
              {
                "name": "id",
                "type": {
                  "kind": "internal",
                  "name": "ByteArray"
                },
                "key": "@id"
              },
              {
                "name": "type",
                "type": {
                  "kind": "internal",
                  "name": "String"
                },
                "key": "tpe"
              }
            ]
          }
        },
        {
          "name": "cip68version",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        },
        {
          "name": "otherDetails",
          "type": {
            "kind": "internal",
            "name": "Data"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSalePolicy__DelegateDatum[]__IsDelegation",
      "name": "IsDelegation",
      "fieldTypes": [
        {
          "name": "dd",
          "type": {
            "kind": "struct",
            "format": "list",
            "id": "__module__CapoDelegateHelpers__DelegationDetail[]",
            "name": "DelegationDetail",
            "fieldTypes": [
              {
                "name": "capoAddr",
                "type": {
                  "kind": "internal",
                  "name": "Address"
                }
              },
              {
                "name": "mph",
                "type": {
                  "kind": "internal",
                  "name": "MintingPolicyHash"
                }
              },
              {
                "name": "tn",
                "type": {
                  "kind": "internal",
                  "name": "ByteArray"
                }
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__MarketSalePolicy__DelegateDatum[]__capoStoredData",
      "name": "capoStoredData",
      "fieldTypes": [
        {
          "name": "data",
          "type": {
            "kind": "struct",
            "format": "map",
            "id": "__module__MarketSaleData__MarketSaleData[]",
            "name": "MarketSaleData",
            "fieldTypes": [
              {
                "name": "id",
                "type": {
                  "kind": "internal",
                  "name": "ByteArray"
                },
                "key": "@id"
              },
              {
                "name": "type",
                "type": {
                  "kind": "internal",
                  "name": "String"
                },
                "key": "tpe"
              },
              {
                "name": "name",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "moreFields",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__MarketSaleData__MoreFields[]",
                  "name": "MoreFields",
                  "fieldTypes": [
                    {
                      "name": "saleState",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__MarketSaleData__OtherSaleState[]",
                        "name": "OtherSaleState",
                        "fieldTypes": [
                          {
                            "name": "progressDetails",
                            "type": {
                              "kind": "struct",
                              "format": "list",
                              "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
                              "name": "SaleProgressDetails",
                              "fieldTypes": [
                                {
                                  "name": "lastPurchaseAt",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Time"
                                  }
                                },
                                {
                                  "name": "prevPurchaseAt",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Time"
                                  }
                                },
                                {
                                  "name": "chunkUnitCount",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                },
                                {
                                  "name": "chunkUnitsSold",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "name": "salePace",
                            "type": {
                              "kind": "internal",
                              "name": "Real"
                            }
                          },
                          {
                            "name": "state",
                            "type": {
                              "kind": "enum",
                              "name": "MarketSaleState",
                              "id": "__module__MarketSaleData__MarketSaleState[]",
                              "variantTypes": [
                                {
                                  "kind": "variant",
                                  "tag": 0,
                                  "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
                                  "name": "Pending",
                                  "fieldTypes": []
                                },
                                {
                                  "kind": "variant",
                                  "tag": 1,
                                  "id": "__module__MarketSaleData__MarketSaleState[]__Active",
                                  "name": "Active",
                                  "fieldTypes": []
                                },
                                {
                                  "kind": "variant",
                                  "tag": 2,
                                  "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
                                  "name": "Retired",
                                  "fieldTypes": []
                                },
                                {
                                  "kind": "variant",
                                  "tag": 3,
                                  "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
                                  "name": "SoldOut",
                                  "fieldTypes": []
                                }
                              ]
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "fixedSaleDetails",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__MarketSaleData__FixedSaleDetails[]",
                        "name": "FixedSaleDetails",
                        "fieldTypes": [
                          {
                            "name": "settings",
                            "type": {
                              "kind": "struct",
                              "format": "list",
                              "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
                              "name": "DynamicSaleV1Settings",
                              "fieldTypes": [
                                {
                                  "name": "targetPrice",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "targetedSellingTime",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Duration"
                                  }
                                },
                                {
                                  "name": "minPrice",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "maxPrice",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "progressPricingDiscountFloorPoint",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "progressPricingDiscountWhenSlow",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "progressPricingExpansionWhenFast",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "dynaPaceFasterSaleWeight",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "dynaPaceIdleDecayRate",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                },
                                {
                                  "name": "pricingWeightDynaPace",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Real"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "name": "startAt",
                            "type": {
                              "kind": "internal",
                              "name": "Time"
                            }
                          },
                          {
                            "name": "vxfTokensTo",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "enum",
                                "name": "VxfDestination",
                                "id": "__module__VxfProtocol__VxfDestination[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                    "name": "RelativeLink",
                                    "fieldTypes": [
                                      {
                                        "name": "link",
                                        "type": {
                                          "kind": "struct",
                                          "format": "list",
                                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                          "name": "RelativeDelegateLink",
                                          "fieldTypes": [
                                            {
                                              "name": "uutName",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            },
                                            {
                                              "name": "delegateValidatorHash",
                                              "type": {
                                                "kind": "option",
                                                "someType": {
                                                  "kind": "internal",
                                                  "name": "ValidatorHash"
                                                }
                                              }
                                            },
                                            {
                                              "name": "config",
                                              "type": {
                                                "kind": "internal",
                                                "name": "ByteArray"
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "vxfActivity",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "enum",
                                            "name": "VxfExpectedActivity",
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                            "variantTypes": [
                                              {
                                                "kind": "variant",
                                                "tag": 22104,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                                "name": "VxfTransfer",
                                                "fieldTypes": [
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22106,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                                "name": "VxfStorage",
                                                "fieldTypes": [
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22107,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                                "name": "SpecificRedeemerId",
                                                "fieldTypes": [
                                                  {
                                                    "name": "id",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  },
                                                  {
                                                    "name": "inNestedList",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Bool"
                                                    }
                                                  },
                                                  {
                                                    "name": "nestedListRedeemerId",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Int"
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22108,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                                "name": "TaggedRedeemer",
                                                "fieldTypes": [
                                                  {
                                                    "name": "firstFieldConstrTag",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  },
                                                  {
                                                    "name": "inNestedList",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Bool"
                                                    }
                                                  },
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                    "name": "AnyTokenHolder",
                                    "fieldTypes": [
                                      {
                                        "name": "mph",
                                        "type": {
                                          "kind": "internal",
                                          "name": "MintingPolicyHash"
                                        }
                                      },
                                      {
                                        "name": "assetName",
                                        "type": {
                                          "kind": "internal",
                                          "name": "ByteArray"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                    "name": "PubKey",
                                    "fieldTypes": [
                                      {
                                        "name": "pkh",
                                        "type": {
                                          "kind": "internal",
                                          "name": "PubKeyHash"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 98,
                                    "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                    "name": "Anywhere",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 99,
                                    "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                    "name": "NotYetDefined",
                                    "fieldTypes": []
                                  }
                                ]
                              }
                            }
                          },
                          {
                            "name": "vxfFundsTo",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "enum",
                                "name": "VxfDestination",
                                "id": "__module__VxfProtocol__VxfDestination[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                    "name": "RelativeLink",
                                    "fieldTypes": [
                                      {
                                        "name": "link",
                                        "type": {
                                          "kind": "struct",
                                          "format": "list",
                                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                          "name": "RelativeDelegateLink",
                                          "fieldTypes": [
                                            {
                                              "name": "uutName",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            },
                                            {
                                              "name": "delegateValidatorHash",
                                              "type": {
                                                "kind": "option",
                                                "someType": {
                                                  "kind": "internal",
                                                  "name": "ValidatorHash"
                                                }
                                              }
                                            },
                                            {
                                              "name": "config",
                                              "type": {
                                                "kind": "internal",
                                                "name": "ByteArray"
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "vxfActivity",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "enum",
                                            "name": "VxfExpectedActivity",
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                            "variantTypes": [
                                              {
                                                "kind": "variant",
                                                "tag": 22104,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                                "name": "VxfTransfer",
                                                "fieldTypes": [
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22106,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                                "name": "VxfStorage",
                                                "fieldTypes": [
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22107,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                                "name": "SpecificRedeemerId",
                                                "fieldTypes": [
                                                  {
                                                    "name": "id",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  },
                                                  {
                                                    "name": "inNestedList",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Bool"
                                                    }
                                                  },
                                                  {
                                                    "name": "nestedListRedeemerId",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Int"
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              },
                                              {
                                                "kind": "variant",
                                                "tag": 22108,
                                                "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                                "name": "TaggedRedeemer",
                                                "fieldTypes": [
                                                  {
                                                    "name": "firstFieldConstrTag",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  },
                                                  {
                                                    "name": "inNestedList",
                                                    "type": {
                                                      "kind": "internal",
                                                      "name": "Bool"
                                                    }
                                                  },
                                                  {
                                                    "name": "appData",
                                                    "type": {
                                                      "kind": "option",
                                                      "someType": {
                                                        "kind": "internal",
                                                        "name": "Data"
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                    "name": "AnyTokenHolder",
                                    "fieldTypes": [
                                      {
                                        "name": "mph",
                                        "type": {
                                          "kind": "internal",
                                          "name": "MintingPolicyHash"
                                        }
                                      },
                                      {
                                        "name": "assetName",
                                        "type": {
                                          "kind": "internal",
                                          "name": "ByteArray"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                    "name": "PubKey",
                                    "fieldTypes": [
                                      {
                                        "name": "pkh",
                                        "type": {
                                          "kind": "internal",
                                          "name": "PubKeyHash"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 98,
                                    "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                    "name": "Anywhere",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 99,
                                    "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                    "name": "NotYetDefined",
                                    "fieldTypes": []
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "saleAssets",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__MarketSaleData__SaleAssets[]",
                        "name": "SaleAssets",
                        "fieldTypes": [
                          {
                            "name": "saleUnitAssets",
                            "type": {
                              "kind": "internal",
                              "name": "Value"
                            }
                          },
                          {
                            "name": "singleBuyMaxUnits",
                            "type": {
                              "kind": "internal",
                              "name": "Int"
                            }
                          },
                          {
                            "name": "primaryAssetMph",
                            "type": {
                              "kind": "internal",
                              "name": "MintingPolicyHash"
                            }
                          },
                          {
                            "name": "primaryAssetName",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          },
                          {
                            "name": "primaryAssetTargetCount",
                            "type": {
                              "kind": "internal",
                              "name": "Int"
                            }
                          },
                          {
                            "name": "totalSaleUnits",
                            "type": {
                              "kind": "internal",
                              "name": "Int"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "threadInfo",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__MarketSaleData__ThreadInfo[]",
                        "name": "ThreadInfo",
                        "fieldTypes": [
                          {
                            "name": "nestedThreads",
                            "type": {
                              "kind": "internal",
                              "name": "Int"
                            }
                          },
                          {
                            "name": "retiredThreads",
                            "type": {
                              "kind": "internal",
                              "name": "Int"
                            }
                          },
                          {
                            "name": "parentChunkId",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          },
                          {
                            "name": "chunkForkedAt",
                            "type": {
                              "kind": "internal",
                              "name": "Time"
                            }
                          },
                          {
                            "name": "saleId",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                "key": "mo"
              }
            ]
          }
        },
        {
          "name": "version",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        },
        {
          "name": "otherDetails",
          "type": {
            "kind": "internal",
            "name": "Data"
          }
        }
      ]
    }
  ]
};
const DelegateRoleSchema = {
  "kind": "enum",
  "name": "DelegateRole",
  "id": "__module__CapoDelegateHelpers__DelegateRole[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
      "name": "MintDgt",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
      "name": "SpendDgt",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
      "name": "MintInvariant",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
      "name": "SpendInvariant",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
      "name": "DgDataPolicy",
      "fieldTypes": [
        {
          "name": "name",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 5,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
      "name": "OtherNamedDgt",
      "fieldTypes": [
        {
          "name": "name",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 6,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
      "name": "BothMintAndSpendDgt",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 7,
      "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
      "name": "HandledByCapoOnly",
      "fieldTypes": []
    }
  ]
};
const ManifestActivitySchema = {
  "kind": "enum",
  "name": "ManifestActivity",
  "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
      "name": "retiringEntry",
      "fieldTypes": [
        {
          "name": "key",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
      "name": "updatingEntry",
      "fieldTypes": [
        {
          "name": "key",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "tokenName",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
      "name": "addingEntry",
      "fieldTypes": [
        {
          "name": "key",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "tokenName",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
      "name": "forkingThreadToken",
      "fieldTypes": [
        {
          "name": "key",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "newThreadCount",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
      "name": "burningThreadToken",
      "fieldTypes": [
        {
          "name": "key",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "burnedThreadCount",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        }
      ]
    }
  ]
};
const CapoLifecycleActivitySchema = {
  "kind": "enum",
  "name": "CapoLifecycleActivity",
  "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate",
      "name": "CreatingDelegate",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingChange",
      "name": "queuePendingChange",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingChange",
      "name": "removePendingChange",
      "fieldTypes": [
        {
          "name": "role",
          "type": {
            "kind": "enum",
            "name": "DelegateRole",
            "id": "__module__CapoDelegateHelpers__DelegateRole[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                "name": "MintDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                "name": "SpendDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                "name": "MintInvariant",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                "name": "SpendInvariant",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                "name": "DgDataPolicy",
                "fieldTypes": [
                  {
                    "name": "name",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 5,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                "name": "OtherNamedDgt",
                "fieldTypes": [
                  {
                    "name": "name",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 6,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                "name": "BothMintAndSpendDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 7,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                "name": "HandledByCapoOnly",
                "fieldTypes": []
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingChanges",
      "name": "commitPendingChanges",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate",
      "name": "forcingNewSpendDelegate",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 5,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate",
      "name": "forcingNewMintDelegate",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 6,
      "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest",
      "name": "updatingManifest",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "ManifestActivity",
            "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                "name": "retiringEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                "name": "updatingEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "tokenName",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                "name": "addingEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "tokenName",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                "name": "forkingThreadToken",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "newThreadCount",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                "name": "burningThreadToken",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "burnedThreadCount",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};
const DelegateLifecycleActivitySchema = {
  "kind": "enum",
  "name": "DelegateLifecycleActivity",
  "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe",
      "name": "ReplacingMe",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring",
      "name": "Retiring",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings",
      "name": "ValidatingSettings",
      "fieldTypes": []
    }
  ]
};
const SpendingActivitySchema = {
  "kind": "enum",
  "name": "SpendingActivity",
  "id": "__module__MarketSalePolicy__SpendingActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__UpdatingRecord",
      "name": "UpdatingRecord",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__AddingToSale",
      "name": "AddingToSale",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        },
        {
          "name": "mph",
          "type": {
            "kind": "internal",
            "name": "MintingPolicyHash"
          }
        },
        {
          "name": "tn",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__Activating",
      "name": "Activating",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__SellingTokens",
      "name": "SellingTokens",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        },
        {
          "name": "sellingUnitQuantity",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        },
        {
          "name": "salePrice",
          "type": {
            "kind": "internal",
            "name": "Value"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__MergingChildChunk",
      "name": "MergingChildChunk",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        },
        {
          "name": "childChunkId",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 5,
      "id": "__module__MarketSalePolicy__SpendingActivity[]__Retiring",
      "name": "Retiring",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    }
  ]
};
const MintingActivitySchema = {
  "kind": "enum",
  "name": "MintingActivity",
  "id": "__module__MarketSalePolicy__MintingActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSalePolicy__MintingActivity[]__CreatingRecord",
      "name": "CreatingRecord",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSalePolicy__MintingActivity[]__SplittingSaleChunkAndBuying",
      "name": "SplittingSaleChunkAndBuying",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "parentChunkId",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "buyingUnitQuantity",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        }
      ]
    }
  ]
};
const BurningActivitySchema = {
  "kind": "enum",
  "name": "BurningActivity",
  "id": "__module__MarketSalePolicy__BurningActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSalePolicy__BurningActivity[]__DeletingRecord",
      "name": "DeletingRecord",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSalePolicy__BurningActivity[]__JoiningWithParentChunk",
      "name": "JoiningWithParentChunk",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "parentChunkId",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__MarketSalePolicy__BurningActivity[]__CleanupRetired",
      "name": "CleanupRetired",
      "fieldTypes": [
        {
          "name": "id",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    }
  ]
};
const DelegateActivitySchema = {
  "kind": "enum",
  "name": "DelegateActivity",
  "id": "__module__MarketSalePolicy__DelegateActivity[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__CapoLifecycleActivities",
      "name": "CapoLifecycleActivities",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "CapoLifecycleActivity",
            "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__CreatingDelegate",
                "name": "CreatingDelegate",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  },
                  {
                    "name": "purpose",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__queuePendingChange",
                "name": "queuePendingChange",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__removePendingChange",
                "name": "removePendingChange",
                "fieldTypes": [
                  {
                    "name": "role",
                    "type": {
                      "kind": "enum",
                      "name": "DelegateRole",
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 0,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                          "name": "MintDgt",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 1,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                          "name": "SpendDgt",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 2,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                          "name": "MintInvariant",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 3,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                          "name": "SpendInvariant",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 4,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                          "name": "DgDataPolicy",
                          "fieldTypes": [
                            {
                              "name": "name",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 5,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                          "name": "OtherNamedDgt",
                          "fieldTypes": [
                            {
                              "name": "name",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 6,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                          "name": "BothMintAndSpendDgt",
                          "fieldTypes": []
                        },
                        {
                          "kind": "variant",
                          "tag": 7,
                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                          "name": "HandledByCapoOnly",
                          "fieldTypes": []
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__commitPendingChanges",
                "name": "commitPendingChanges",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewSpendDelegate",
                "name": "forcingNewSpendDelegate",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  },
                  {
                    "name": "purpose",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 5,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__forcingNewMintDelegate",
                "name": "forcingNewMintDelegate",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  },
                  {
                    "name": "purpose",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 6,
                "id": "__module__CapoDelegateHelpers__CapoLifecycleActivity[]__updatingManifest",
                "name": "updatingManifest",
                "fieldTypes": [
                  {
                    "name": "activity",
                    "type": {
                      "kind": "enum",
                      "name": "ManifestActivity",
                      "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
                      "variantTypes": [
                        {
                          "kind": "variant",
                          "tag": 0,
                          "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                          "name": "retiringEntry",
                          "fieldTypes": [
                            {
                              "name": "key",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 1,
                          "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                          "name": "updatingEntry",
                          "fieldTypes": [
                            {
                              "name": "key",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "tokenName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 2,
                          "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                          "name": "addingEntry",
                          "fieldTypes": [
                            {
                              "name": "key",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "tokenName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 3,
                          "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                          "name": "forkingThreadToken",
                          "fieldTypes": [
                            {
                              "name": "key",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "newThreadCount",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            }
                          ]
                        },
                        {
                          "kind": "variant",
                          "tag": 4,
                          "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                          "name": "burningThreadToken",
                          "fieldTypes": [
                            {
                              "name": "key",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "burnedThreadCount",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__DelegateLifecycleActivities",
      "name": "DelegateLifecycleActivities",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "DelegateLifecycleActivity",
            "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ReplacingMe",
                "name": "ReplacingMe",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  },
                  {
                    "name": "purpose",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__Retiring",
                "name": "Retiring",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__DelegateLifecycleActivity[]__ValidatingSettings",
                "name": "ValidatingSettings",
                "fieldTypes": []
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__SpendingActivities",
      "name": "SpendingActivities",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "SpendingActivity",
            "id": "__module__MarketSalePolicy__SpendingActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__UpdatingRecord",
                "name": "UpdatingRecord",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__AddingToSale",
                "name": "AddingToSale",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  },
                  {
                    "name": "mph",
                    "type": {
                      "kind": "internal",
                      "name": "MintingPolicyHash"
                    }
                  },
                  {
                    "name": "tn",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__Activating",
                "name": "Activating",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__SellingTokens",
                "name": "SellingTokens",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  },
                  {
                    "name": "sellingUnitQuantity",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  },
                  {
                    "name": "salePrice",
                    "type": {
                      "kind": "internal",
                      "name": "Value"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__MergingChildChunk",
                "name": "MergingChildChunk",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  },
                  {
                    "name": "childChunkId",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 5,
                "id": "__module__MarketSalePolicy__SpendingActivity[]__Retiring",
                "name": "Retiring",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__MintingActivities",
      "name": "MintingActivities",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "MintingActivity",
            "id": "__module__MarketSalePolicy__MintingActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__MarketSalePolicy__MintingActivity[]__CreatingRecord",
                "name": "CreatingRecord",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__MarketSalePolicy__MintingActivity[]__SplittingSaleChunkAndBuying",
                "name": "SplittingSaleChunkAndBuying",
                "fieldTypes": [
                  {
                    "name": "seed",
                    "type": {
                      "kind": "internal",
                      "name": "TxOutputId"
                    }
                  },
                  {
                    "name": "parentChunkId",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "buyingUnitQuantity",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__BurningActivities",
      "name": "BurningActivities",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "BurningActivity",
            "id": "__module__MarketSalePolicy__BurningActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__MarketSalePolicy__BurningActivity[]__DeletingRecord",
                "name": "DeletingRecord",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__MarketSalePolicy__BurningActivity[]__JoiningWithParentChunk",
                "name": "JoiningWithParentChunk",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "parentChunkId",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__MarketSalePolicy__BurningActivity[]__CleanupRetired",
                "name": "CleanupRetired",
                "fieldTypes": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 5,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__CreatingDelegatedData",
      "name": "CreatingDelegatedData",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "dataType",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 6,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__UpdatingDelegatedData",
      "name": "UpdatingDelegatedData",
      "fieldTypes": [
        {
          "name": "dataType",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "recId",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 7,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__DeletingDelegatedData",
      "name": "DeletingDelegatedData",
      "fieldTypes": [
        {
          "name": "dataType",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "recId",
          "type": {
            "kind": "internal",
            "name": "ByteArray"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 8,
      "id": "__module__MarketSalePolicy__DelegateActivity[]__MultipleDelegateActivities",
      "name": "MultipleDelegateActivities",
      "fieldTypes": [
        {
          "name": "activities",
          "type": {
            "kind": "list",
            "itemType": {
              "kind": "internal",
              "name": "Data"
            }
          }
        }
      ]
    }
  ]
};
const PendingDelegateActionSchema = {
  "kind": "enum",
  "name": "PendingDelegateAction",
  "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
      "name": "Add",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "idPrefix",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
      "name": "Remove",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
      "name": "Replace",
      "fieldTypes": [
        {
          "name": "seed",
          "type": {
            "kind": "internal",
            "name": "TxOutputId"
          }
        },
        {
          "name": "purpose",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "idPrefix",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "replacesDgt",
          "type": {
            "kind": "internal",
            "name": "AssetClass"
          }
        }
      ]
    }
  ]
};
const PendingDelegateChangeSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
  "name": "PendingDelegateChange",
  "fieldTypes": [
    {
      "name": "action",
      "type": {
        "kind": "enum",
        "name": "PendingDelegateAction",
        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
            "name": "Add",
            "fieldTypes": [
              {
                "name": "seed",
                "type": {
                  "kind": "internal",
                  "name": "TxOutputId"
                }
              },
              {
                "name": "purpose",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "idPrefix",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
            "name": "Remove",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
            "name": "Replace",
            "fieldTypes": [
              {
                "name": "seed",
                "type": {
                  "kind": "internal",
                  "name": "TxOutputId"
                }
              },
              {
                "name": "purpose",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "idPrefix",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "replacesDgt",
                "type": {
                  "kind": "internal",
                  "name": "AssetClass"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "role",
      "type": {
        "kind": "enum",
        "name": "DelegateRole",
        "id": "__module__CapoDelegateHelpers__DelegateRole[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
            "name": "MintDgt",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
            "name": "SpendDgt",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
            "name": "MintInvariant",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 3,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
            "name": "SpendInvariant",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 4,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
            "name": "DgDataPolicy",
            "fieldTypes": [
              {
                "name": "name",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 5,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
            "name": "OtherNamedDgt",
            "fieldTypes": [
              {
                "name": "name",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 6,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
            "name": "BothMintAndSpendDgt",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 7,
            "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
            "name": "HandledByCapoOnly",
            "fieldTypes": []
          }
        ]
      }
    },
    {
      "name": "dgtLink",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "struct",
          "format": "list",
          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
          "name": "RelativeDelegateLink",
          "fieldTypes": [
            {
              "name": "uutName",
              "type": {
                "kind": "internal",
                "name": "String"
              }
            },
            {
              "name": "delegateValidatorHash",
              "type": {
                "kind": "option",
                "someType": {
                  "kind": "internal",
                  "name": "ValidatorHash"
                }
              }
            },
            {
              "name": "config",
              "type": {
                "kind": "internal",
                "name": "ByteArray"
              }
            }
          ]
        }
      }
    }
  ]
};
const ManifestEntryTypeSchema = {
  "kind": "enum",
  "name": "ManifestEntryType",
  "id": "__module__CapoHelpers__ManifestEntryType[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
      "name": "NamedTokenRef",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
      "name": "DgDataPolicy",
      "fieldTypes": [
        {
          "name": "policyLink",
          "type": {
            "kind": "struct",
            "format": "list",
            "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
            "name": "RelativeDelegateLink",
            "fieldTypes": [
              {
                "name": "uutName",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "delegateValidatorHash",
                "type": {
                  "kind": "option",
                  "someType": {
                    "kind": "internal",
                    "name": "ValidatorHash"
                  }
                }
              },
              {
                "name": "config",
                "type": {
                  "kind": "internal",
                  "name": "ByteArray"
                }
              }
            ]
          }
        },
        {
          "name": "idPrefix",
          "type": {
            "kind": "internal",
            "name": "String"
          }
        },
        {
          "name": "refCount",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
      "name": "DelegateThreads",
      "fieldTypes": [
        {
          "name": "role",
          "type": {
            "kind": "enum",
            "name": "DelegateRole",
            "id": "__module__CapoDelegateHelpers__DelegateRole[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                "name": "MintDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                "name": "SpendDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                "name": "MintInvariant",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                "name": "SpendInvariant",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                "name": "DgDataPolicy",
                "fieldTypes": [
                  {
                    "name": "name",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 5,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                "name": "OtherNamedDgt",
                "fieldTypes": [
                  {
                    "name": "name",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 6,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                "name": "BothMintAndSpendDgt",
                "fieldTypes": []
              },
              {
                "kind": "variant",
                "tag": 7,
                "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                "name": "HandledByCapoOnly",
                "fieldTypes": []
              }
            ]
          }
        },
        {
          "name": "refCount",
          "type": {
            "kind": "internal",
            "name": "Int"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
      "name": "MerkleMembership",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 4,
      "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
      "name": "MerkleStateRoot",
      "fieldTypes": []
    }
  ]
};
const CapoManifestEntrySchema = {
  "kind": "struct",
  "format": "map",
  "id": "__module__CapoHelpers__CapoManifestEntry[]",
  "name": "CapoManifestEntry",
  "fieldTypes": [
    {
      "name": "entryType",
      "type": {
        "kind": "enum",
        "name": "ManifestEntryType",
        "id": "__module__CapoHelpers__ManifestEntryType[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
            "name": "NamedTokenRef",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
            "name": "DgDataPolicy",
            "fieldTypes": [
              {
                "name": "policyLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "idPrefix",
                "type": {
                  "kind": "internal",
                  "name": "String"
                }
              },
              {
                "name": "refCount",
                "type": {
                  "kind": "internal",
                  "name": "Int"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
            "name": "DelegateThreads",
            "fieldTypes": [
              {
                "name": "role",
                "type": {
                  "kind": "enum",
                  "name": "DelegateRole",
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                  "variantTypes": [
                    {
                      "kind": "variant",
                      "tag": 0,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                      "name": "MintDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 1,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                      "name": "SpendDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 2,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                      "name": "MintInvariant",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 3,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                      "name": "SpendInvariant",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 4,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                      "name": "DgDataPolicy",
                      "fieldTypes": [
                        {
                          "name": "name",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        }
                      ]
                    },
                    {
                      "kind": "variant",
                      "tag": 5,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                      "name": "OtherNamedDgt",
                      "fieldTypes": [
                        {
                          "name": "name",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        }
                      ]
                    },
                    {
                      "kind": "variant",
                      "tag": 6,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                      "name": "BothMintAndSpendDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 7,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                      "name": "HandledByCapoOnly",
                      "fieldTypes": []
                    }
                  ]
                }
              },
              {
                "name": "refCount",
                "type": {
                  "kind": "internal",
                  "name": "Int"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 3,
            "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
            "name": "MerkleMembership",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 4,
            "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
            "name": "MerkleStateRoot",
            "fieldTypes": []
          }
        ]
      },
      "key": "tpe"
    },
    {
      "name": "tokenName",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      },
      "key": "tn"
    },
    {
      "name": "mph",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "internal",
          "name": "MintingPolicyHash"
        }
      }
    }
  ]
};
const PendingCharterChangeSchema = {
  "kind": "enum",
  "name": "PendingCharterChange",
  "id": "__module__CapoDelegateHelpers__PendingCharterChange[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__delegateChange",
      "name": "delegateChange",
      "fieldTypes": [
        {
          "name": "change",
          "type": {
            "kind": "struct",
            "format": "list",
            "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
            "name": "PendingDelegateChange",
            "fieldTypes": [
              {
                "name": "action",
                "type": {
                  "kind": "enum",
                  "name": "PendingDelegateAction",
                  "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
                  "variantTypes": [
                    {
                      "kind": "variant",
                      "tag": 0,
                      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
                      "name": "Add",
                      "fieldTypes": [
                        {
                          "name": "seed",
                          "type": {
                            "kind": "internal",
                            "name": "TxOutputId"
                          }
                        },
                        {
                          "name": "purpose",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        },
                        {
                          "name": "idPrefix",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        }
                      ]
                    },
                    {
                      "kind": "variant",
                      "tag": 1,
                      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
                      "name": "Remove",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 2,
                      "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
                      "name": "Replace",
                      "fieldTypes": [
                        {
                          "name": "seed",
                          "type": {
                            "kind": "internal",
                            "name": "TxOutputId"
                          }
                        },
                        {
                          "name": "purpose",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        },
                        {
                          "name": "idPrefix",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        },
                        {
                          "name": "replacesDgt",
                          "type": {
                            "kind": "internal",
                            "name": "AssetClass"
                          }
                        }
                      ]
                    }
                  ]
                }
              },
              {
                "name": "role",
                "type": {
                  "kind": "enum",
                  "name": "DelegateRole",
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                  "variantTypes": [
                    {
                      "kind": "variant",
                      "tag": 0,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                      "name": "MintDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 1,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                      "name": "SpendDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 2,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                      "name": "MintInvariant",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 3,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                      "name": "SpendInvariant",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 4,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                      "name": "DgDataPolicy",
                      "fieldTypes": [
                        {
                          "name": "name",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        }
                      ]
                    },
                    {
                      "kind": "variant",
                      "tag": 5,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                      "name": "OtherNamedDgt",
                      "fieldTypes": [
                        {
                          "name": "name",
                          "type": {
                            "kind": "internal",
                            "name": "String"
                          }
                        }
                      ]
                    },
                    {
                      "kind": "variant",
                      "tag": 6,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                      "name": "BothMintAndSpendDgt",
                      "fieldTypes": []
                    },
                    {
                      "kind": "variant",
                      "tag": 7,
                      "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                      "name": "HandledByCapoOnly",
                      "fieldTypes": []
                    }
                  ]
                }
              },
              {
                "name": "dgtLink",
                "type": {
                  "kind": "option",
                  "someType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__otherManifestChange",
      "name": "otherManifestChange",
      "fieldTypes": [
        {
          "name": "activity",
          "type": {
            "kind": "enum",
            "name": "ManifestActivity",
            "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
            "variantTypes": [
              {
                "kind": "variant",
                "tag": 0,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                "name": "retiringEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 1,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                "name": "updatingEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "tokenName",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 2,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                "name": "addingEntry",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "tokenName",
                    "type": {
                      "kind": "internal",
                      "name": "ByteArray"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 3,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                "name": "forkingThreadToken",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "newThreadCount",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  }
                ]
              },
              {
                "kind": "variant",
                "tag": 4,
                "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                "name": "burningThreadToken",
                "fieldTypes": [
                  {
                    "name": "key",
                    "type": {
                      "kind": "internal",
                      "name": "String"
                    }
                  },
                  {
                    "name": "burnedThreadCount",
                    "type": {
                      "kind": "internal",
                      "name": "Int"
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          "name": "remainingDelegateValidations",
          "type": {
            "kind": "list",
            "itemType": {
              "kind": "enum",
              "name": "DelegateRole",
              "id": "__module__CapoDelegateHelpers__DelegateRole[]",
              "variantTypes": [
                {
                  "kind": "variant",
                  "tag": 0,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                  "name": "MintDgt",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 1,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                  "name": "SpendDgt",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 2,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                  "name": "MintInvariant",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 3,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                  "name": "SpendInvariant",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 4,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                  "name": "DgDataPolicy",
                  "fieldTypes": [
                    {
                      "name": "name",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    }
                  ]
                },
                {
                  "kind": "variant",
                  "tag": 5,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                  "name": "OtherNamedDgt",
                  "fieldTypes": [
                    {
                      "name": "name",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    }
                  ]
                },
                {
                  "kind": "variant",
                  "tag": 6,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                  "name": "BothMintAndSpendDgt",
                  "fieldTypes": []
                },
                {
                  "kind": "variant",
                  "tag": 7,
                  "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                  "name": "HandledByCapoOnly",
                  "fieldTypes": []
                }
              ]
            }
          }
        }
      ]
    }
  ]
};
const cctx_CharterInputTypeSchema = {
  "kind": "enum",
  "name": "cctx_CharterInputType",
  "id": "__module__CapoHelpers__cctx_CharterInputType[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoHelpers__cctx_CharterInputType[]__Unk",
      "name": "Unk",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoHelpers__cctx_CharterInputType[]__RefInput",
      "name": "RefInput",
      "fieldTypes": [
        {
          "name": "datum",
          "type": {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoHelpers__CapoDatum[]__CharterData",
            "name": "CharterData",
            "fieldTypes": [
              {
                "name": "spendDelegateLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "spendInvariants",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "otherNamedDelegates",
                "type": {
                  "kind": "map",
                  "keyType": {
                    "kind": "internal",
                    "name": "String"
                  },
                  "valueType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "mintDelegateLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "mintInvariants",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "govAuthorityLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "manifest",
                "type": {
                  "kind": "map",
                  "keyType": {
                    "kind": "internal",
                    "name": "String"
                  },
                  "valueType": {
                    "kind": "struct",
                    "format": "map",
                    "id": "__module__CapoHelpers__CapoManifestEntry[]",
                    "name": "CapoManifestEntry",
                    "fieldTypes": [
                      {
                        "name": "entryType",
                        "type": {
                          "kind": "enum",
                          "name": "ManifestEntryType",
                          "id": "__module__CapoHelpers__ManifestEntryType[]",
                          "variantTypes": [
                            {
                              "kind": "variant",
                              "tag": 0,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
                              "name": "NamedTokenRef",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 1,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
                              "name": "DgDataPolicy",
                              "fieldTypes": [
                                {
                                  "name": "policyLink",
                                  "type": {
                                    "kind": "struct",
                                    "format": "list",
                                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                    "name": "RelativeDelegateLink",
                                    "fieldTypes": [
                                      {
                                        "name": "uutName",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      },
                                      {
                                        "name": "delegateValidatorHash",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "internal",
                                            "name": "ValidatorHash"
                                          }
                                        }
                                      },
                                      {
                                        "name": "config",
                                        "type": {
                                          "kind": "internal",
                                          "name": "ByteArray"
                                        }
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "idPrefix",
                                  "type": {
                                    "kind": "internal",
                                    "name": "String"
                                  }
                                },
                                {
                                  "name": "refCount",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 2,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
                              "name": "DelegateThreads",
                              "fieldTypes": [
                                {
                                  "name": "role",
                                  "type": {
                                    "kind": "enum",
                                    "name": "DelegateRole",
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                        "name": "MintDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                        "name": "SpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                        "name": "MintInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                        "name": "SpendInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                        "name": "DgDataPolicy",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 5,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                        "name": "OtherNamedDgt",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 6,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                        "name": "BothMintAndSpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 7,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                        "name": "HandledByCapoOnly",
                                        "fieldTypes": []
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "refCount",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 3,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
                              "name": "MerkleMembership",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 4,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
                              "name": "MerkleStateRoot",
                              "fieldTypes": []
                            }
                          ]
                        },
                        "key": "tpe"
                      },
                      {
                        "name": "tokenName",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        },
                        "key": "tn"
                      },
                      {
                        "name": "mph",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "MintingPolicyHash"
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "pendingChanges",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "enum",
                    "name": "PendingCharterChange",
                    "id": "__module__CapoDelegateHelpers__PendingCharterChange[]",
                    "variantTypes": [
                      {
                        "kind": "variant",
                        "tag": 0,
                        "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__delegateChange",
                        "name": "delegateChange",
                        "fieldTypes": [
                          {
                            "name": "change",
                            "type": {
                              "kind": "struct",
                              "format": "list",
                              "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
                              "name": "PendingDelegateChange",
                              "fieldTypes": [
                                {
                                  "name": "action",
                                  "type": {
                                    "kind": "enum",
                                    "name": "PendingDelegateAction",
                                    "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
                                        "name": "Add",
                                        "fieldTypes": [
                                          {
                                            "name": "seed",
                                            "type": {
                                              "kind": "internal",
                                              "name": "TxOutputId"
                                            }
                                          },
                                          {
                                            "name": "purpose",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "idPrefix",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
                                        "name": "Remove",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
                                        "name": "Replace",
                                        "fieldTypes": [
                                          {
                                            "name": "seed",
                                            "type": {
                                              "kind": "internal",
                                              "name": "TxOutputId"
                                            }
                                          },
                                          {
                                            "name": "purpose",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "idPrefix",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "replacesDgt",
                                            "type": {
                                              "kind": "internal",
                                              "name": "AssetClass"
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "role",
                                  "type": {
                                    "kind": "enum",
                                    "name": "DelegateRole",
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                        "name": "MintDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                        "name": "SpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                        "name": "MintInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                        "name": "SpendInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                        "name": "DgDataPolicy",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 5,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                        "name": "OtherNamedDgt",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 6,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                        "name": "BothMintAndSpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 7,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                        "name": "HandledByCapoOnly",
                                        "fieldTypes": []
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "dgtLink",
                                  "type": {
                                    "kind": "option",
                                    "someType": {
                                      "kind": "struct",
                                      "format": "list",
                                      "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                      "name": "RelativeDelegateLink",
                                      "fieldTypes": [
                                        {
                                          "name": "uutName",
                                          "type": {
                                            "kind": "internal",
                                            "name": "String"
                                          }
                                        },
                                        {
                                          "name": "delegateValidatorHash",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "ValidatorHash"
                                            }
                                          }
                                        },
                                        {
                                          "name": "config",
                                          "type": {
                                            "kind": "internal",
                                            "name": "ByteArray"
                                          }
                                        }
                                      ]
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      },
                      {
                        "kind": "variant",
                        "tag": 1,
                        "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__otherManifestChange",
                        "name": "otherManifestChange",
                        "fieldTypes": [
                          {
                            "name": "activity",
                            "type": {
                              "kind": "enum",
                              "name": "ManifestActivity",
                              "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
                              "variantTypes": [
                                {
                                  "kind": "variant",
                                  "tag": 0,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                                  "name": "retiringEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 1,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                                  "name": "updatingEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "tokenName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 2,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                                  "name": "addingEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "tokenName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 3,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                                  "name": "forkingThreadToken",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "newThreadCount",
                                      "type": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 4,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                                  "name": "burningThreadToken",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "burnedThreadCount",
                                      "type": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          {
                            "name": "remainingDelegateValidations",
                            "type": {
                              "kind": "list",
                              "itemType": {
                                "kind": "enum",
                                "name": "DelegateRole",
                                "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                    "name": "MintDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                    "name": "SpendDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                    "name": "MintInvariant",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 3,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                    "name": "SpendInvariant",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 4,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                    "name": "DgDataPolicy",
                                    "fieldTypes": [
                                      {
                                        "name": "name",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 5,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                    "name": "OtherNamedDgt",
                                    "fieldTypes": [
                                      {
                                        "name": "name",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 6,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                    "name": "BothMintAndSpendDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 7,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                    "name": "HandledByCapoOnly",
                                    "fieldTypes": []
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        {
          "name": "utxo",
          "type": {
            "kind": "internal",
            "name": "TxInput"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoHelpers__cctx_CharterInputType[]__Input",
      "name": "Input",
      "fieldTypes": [
        {
          "name": "datum",
          "type": {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoHelpers__CapoDatum[]__CharterData",
            "name": "CharterData",
            "fieldTypes": [
              {
                "name": "spendDelegateLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "spendInvariants",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "otherNamedDelegates",
                "type": {
                  "kind": "map",
                  "keyType": {
                    "kind": "internal",
                    "name": "String"
                  },
                  "valueType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "mintDelegateLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "mintInvariants",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                    "name": "RelativeDelegateLink",
                    "fieldTypes": [
                      {
                        "name": "uutName",
                        "type": {
                          "kind": "internal",
                          "name": "String"
                        }
                      },
                      {
                        "name": "delegateValidatorHash",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "ValidatorHash"
                          }
                        }
                      },
                      {
                        "name": "config",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "govAuthorityLink",
                "type": {
                  "kind": "struct",
                  "format": "list",
                  "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                  "name": "RelativeDelegateLink",
                  "fieldTypes": [
                    {
                      "name": "uutName",
                      "type": {
                        "kind": "internal",
                        "name": "String"
                      }
                    },
                    {
                      "name": "delegateValidatorHash",
                      "type": {
                        "kind": "option",
                        "someType": {
                          "kind": "internal",
                          "name": "ValidatorHash"
                        }
                      }
                    },
                    {
                      "name": "config",
                      "type": {
                        "kind": "internal",
                        "name": "ByteArray"
                      }
                    }
                  ]
                }
              },
              {
                "name": "manifest",
                "type": {
                  "kind": "map",
                  "keyType": {
                    "kind": "internal",
                    "name": "String"
                  },
                  "valueType": {
                    "kind": "struct",
                    "format": "map",
                    "id": "__module__CapoHelpers__CapoManifestEntry[]",
                    "name": "CapoManifestEntry",
                    "fieldTypes": [
                      {
                        "name": "entryType",
                        "type": {
                          "kind": "enum",
                          "name": "ManifestEntryType",
                          "id": "__module__CapoHelpers__ManifestEntryType[]",
                          "variantTypes": [
                            {
                              "kind": "variant",
                              "tag": 0,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
                              "name": "NamedTokenRef",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 1,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
                              "name": "DgDataPolicy",
                              "fieldTypes": [
                                {
                                  "name": "policyLink",
                                  "type": {
                                    "kind": "struct",
                                    "format": "list",
                                    "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                    "name": "RelativeDelegateLink",
                                    "fieldTypes": [
                                      {
                                        "name": "uutName",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      },
                                      {
                                        "name": "delegateValidatorHash",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "internal",
                                            "name": "ValidatorHash"
                                          }
                                        }
                                      },
                                      {
                                        "name": "config",
                                        "type": {
                                          "kind": "internal",
                                          "name": "ByteArray"
                                        }
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "idPrefix",
                                  "type": {
                                    "kind": "internal",
                                    "name": "String"
                                  }
                                },
                                {
                                  "name": "refCount",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 2,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
                              "name": "DelegateThreads",
                              "fieldTypes": [
                                {
                                  "name": "role",
                                  "type": {
                                    "kind": "enum",
                                    "name": "DelegateRole",
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                        "name": "MintDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                        "name": "SpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                        "name": "MintInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                        "name": "SpendInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                        "name": "DgDataPolicy",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 5,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                        "name": "OtherNamedDgt",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 6,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                        "name": "BothMintAndSpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 7,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                        "name": "HandledByCapoOnly",
                                        "fieldTypes": []
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "refCount",
                                  "type": {
                                    "kind": "internal",
                                    "name": "Int"
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 3,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
                              "name": "MerkleMembership",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 4,
                              "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
                              "name": "MerkleStateRoot",
                              "fieldTypes": []
                            }
                          ]
                        },
                        "key": "tpe"
                      },
                      {
                        "name": "tokenName",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        },
                        "key": "tn"
                      },
                      {
                        "name": "mph",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "internal",
                            "name": "MintingPolicyHash"
                          }
                        }
                      }
                    ]
                  }
                }
              },
              {
                "name": "pendingChanges",
                "type": {
                  "kind": "list",
                  "itemType": {
                    "kind": "enum",
                    "name": "PendingCharterChange",
                    "id": "__module__CapoDelegateHelpers__PendingCharterChange[]",
                    "variantTypes": [
                      {
                        "kind": "variant",
                        "tag": 0,
                        "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__delegateChange",
                        "name": "delegateChange",
                        "fieldTypes": [
                          {
                            "name": "change",
                            "type": {
                              "kind": "struct",
                              "format": "list",
                              "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
                              "name": "PendingDelegateChange",
                              "fieldTypes": [
                                {
                                  "name": "action",
                                  "type": {
                                    "kind": "enum",
                                    "name": "PendingDelegateAction",
                                    "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
                                        "name": "Add",
                                        "fieldTypes": [
                                          {
                                            "name": "seed",
                                            "type": {
                                              "kind": "internal",
                                              "name": "TxOutputId"
                                            }
                                          },
                                          {
                                            "name": "purpose",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "idPrefix",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
                                        "name": "Remove",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
                                        "name": "Replace",
                                        "fieldTypes": [
                                          {
                                            "name": "seed",
                                            "type": {
                                              "kind": "internal",
                                              "name": "TxOutputId"
                                            }
                                          },
                                          {
                                            "name": "purpose",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "idPrefix",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "replacesDgt",
                                            "type": {
                                              "kind": "internal",
                                              "name": "AssetClass"
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "role",
                                  "type": {
                                    "kind": "enum",
                                    "name": "DelegateRole",
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                        "name": "MintDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                        "name": "SpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                        "name": "MintInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                        "name": "SpendInvariant",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                        "name": "DgDataPolicy",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 5,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                        "name": "OtherNamedDgt",
                                        "fieldTypes": [
                                          {
                                            "name": "name",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 6,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                        "name": "BothMintAndSpendDgt",
                                        "fieldTypes": []
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 7,
                                        "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                        "name": "HandledByCapoOnly",
                                        "fieldTypes": []
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "dgtLink",
                                  "type": {
                                    "kind": "option",
                                    "someType": {
                                      "kind": "struct",
                                      "format": "list",
                                      "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                      "name": "RelativeDelegateLink",
                                      "fieldTypes": [
                                        {
                                          "name": "uutName",
                                          "type": {
                                            "kind": "internal",
                                            "name": "String"
                                          }
                                        },
                                        {
                                          "name": "delegateValidatorHash",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "ValidatorHash"
                                            }
                                          }
                                        },
                                        {
                                          "name": "config",
                                          "type": {
                                            "kind": "internal",
                                            "name": "ByteArray"
                                          }
                                        }
                                      ]
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      },
                      {
                        "kind": "variant",
                        "tag": 1,
                        "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__otherManifestChange",
                        "name": "otherManifestChange",
                        "fieldTypes": [
                          {
                            "name": "activity",
                            "type": {
                              "kind": "enum",
                              "name": "ManifestActivity",
                              "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
                              "variantTypes": [
                                {
                                  "kind": "variant",
                                  "tag": 0,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                                  "name": "retiringEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 1,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                                  "name": "updatingEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "tokenName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 2,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                                  "name": "addingEntry",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "tokenName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 3,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                                  "name": "forkingThreadToken",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "newThreadCount",
                                      "type": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 4,
                                  "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                                  "name": "burningThreadToken",
                                  "fieldTypes": [
                                    {
                                      "name": "key",
                                      "type": {
                                        "kind": "internal",
                                        "name": "String"
                                      }
                                    },
                                    {
                                      "name": "burnedThreadCount",
                                      "type": {
                                        "kind": "internal",
                                        "name": "Int"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          {
                            "name": "remainingDelegateValidations",
                            "type": {
                              "kind": "list",
                              "itemType": {
                                "kind": "enum",
                                "name": "DelegateRole",
                                "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                    "name": "MintDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                    "name": "SpendDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                    "name": "MintInvariant",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 3,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                    "name": "SpendInvariant",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 4,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                    "name": "DgDataPolicy",
                                    "fieldTypes": [
                                      {
                                        "name": "name",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 5,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                    "name": "OtherNamedDgt",
                                    "fieldTypes": [
                                      {
                                        "name": "name",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 6,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                    "name": "BothMintAndSpendDgt",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 7,
                                    "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                    "name": "HandledByCapoOnly",
                                    "fieldTypes": []
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        {
          "name": "utxo",
          "type": {
            "kind": "internal",
            "name": "TxInput"
          }
        }
      ]
    }
  ]
};
const CapoCtxSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__CapoHelpers__CapoCtx[]",
  "name": "CapoCtx",
  "fieldTypes": [
    {
      "name": "mph",
      "type": {
        "kind": "internal",
        "name": "MintingPolicyHash"
      }
    },
    {
      "name": "charter",
      "type": {
        "kind": "enum",
        "name": "cctx_CharterInputType",
        "id": "__module__CapoHelpers__cctx_CharterInputType[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoHelpers__cctx_CharterInputType[]__Unk",
            "name": "Unk",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__CapoHelpers__cctx_CharterInputType[]__RefInput",
            "name": "RefInput",
            "fieldTypes": [
              {
                "name": "datum",
                "type": {
                  "kind": "variant",
                  "tag": 0,
                  "id": "__module__CapoHelpers__CapoDatum[]__CharterData",
                  "name": "CharterData",
                  "fieldTypes": [
                    {
                      "name": "spendDelegateLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "spendInvariants",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "otherNamedDelegates",
                      "type": {
                        "kind": "map",
                        "keyType": {
                          "kind": "internal",
                          "name": "String"
                        },
                        "valueType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "mintDelegateLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "mintInvariants",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "govAuthorityLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "manifest",
                      "type": {
                        "kind": "map",
                        "keyType": {
                          "kind": "internal",
                          "name": "String"
                        },
                        "valueType": {
                          "kind": "struct",
                          "format": "map",
                          "id": "__module__CapoHelpers__CapoManifestEntry[]",
                          "name": "CapoManifestEntry",
                          "fieldTypes": [
                            {
                              "name": "entryType",
                              "type": {
                                "kind": "enum",
                                "name": "ManifestEntryType",
                                "id": "__module__CapoHelpers__ManifestEntryType[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
                                    "name": "NamedTokenRef",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
                                    "name": "DgDataPolicy",
                                    "fieldTypes": [
                                      {
                                        "name": "policyLink",
                                        "type": {
                                          "kind": "struct",
                                          "format": "list",
                                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                          "name": "RelativeDelegateLink",
                                          "fieldTypes": [
                                            {
                                              "name": "uutName",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            },
                                            {
                                              "name": "delegateValidatorHash",
                                              "type": {
                                                "kind": "option",
                                                "someType": {
                                                  "kind": "internal",
                                                  "name": "ValidatorHash"
                                                }
                                              }
                                            },
                                            {
                                              "name": "config",
                                              "type": {
                                                "kind": "internal",
                                                "name": "ByteArray"
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "idPrefix",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      },
                                      {
                                        "name": "refCount",
                                        "type": {
                                          "kind": "internal",
                                          "name": "Int"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
                                    "name": "DelegateThreads",
                                    "fieldTypes": [
                                      {
                                        "name": "role",
                                        "type": {
                                          "kind": "enum",
                                          "name": "DelegateRole",
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                              "name": "MintDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                              "name": "SpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                              "name": "MintInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 3,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                              "name": "SpendInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 4,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                              "name": "DgDataPolicy",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 5,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                              "name": "OtherNamedDgt",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 6,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                              "name": "BothMintAndSpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 7,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                              "name": "HandledByCapoOnly",
                                              "fieldTypes": []
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "refCount",
                                        "type": {
                                          "kind": "internal",
                                          "name": "Int"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 3,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
                                    "name": "MerkleMembership",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 4,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
                                    "name": "MerkleStateRoot",
                                    "fieldTypes": []
                                  }
                                ]
                              },
                              "key": "tpe"
                            },
                            {
                              "name": "tokenName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              },
                              "key": "tn"
                            },
                            {
                              "name": "mph",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "MintingPolicyHash"
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "pendingChanges",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "enum",
                          "name": "PendingCharterChange",
                          "id": "__module__CapoDelegateHelpers__PendingCharterChange[]",
                          "variantTypes": [
                            {
                              "kind": "variant",
                              "tag": 0,
                              "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__delegateChange",
                              "name": "delegateChange",
                              "fieldTypes": [
                                {
                                  "name": "change",
                                  "type": {
                                    "kind": "struct",
                                    "format": "list",
                                    "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
                                    "name": "PendingDelegateChange",
                                    "fieldTypes": [
                                      {
                                        "name": "action",
                                        "type": {
                                          "kind": "enum",
                                          "name": "PendingDelegateAction",
                                          "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
                                              "name": "Add",
                                              "fieldTypes": [
                                                {
                                                  "name": "seed",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "TxOutputId"
                                                  }
                                                },
                                                {
                                                  "name": "purpose",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "idPrefix",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
                                              "name": "Remove",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
                                              "name": "Replace",
                                              "fieldTypes": [
                                                {
                                                  "name": "seed",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "TxOutputId"
                                                  }
                                                },
                                                {
                                                  "name": "purpose",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "idPrefix",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "replacesDgt",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "AssetClass"
                                                  }
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "role",
                                        "type": {
                                          "kind": "enum",
                                          "name": "DelegateRole",
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                              "name": "MintDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                              "name": "SpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                              "name": "MintInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 3,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                              "name": "SpendInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 4,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                              "name": "DgDataPolicy",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 5,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                              "name": "OtherNamedDgt",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 6,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                              "name": "BothMintAndSpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 7,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                              "name": "HandledByCapoOnly",
                                              "fieldTypes": []
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "dgtLink",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "struct",
                                            "format": "list",
                                            "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                            "name": "RelativeDelegateLink",
                                            "fieldTypes": [
                                              {
                                                "name": "uutName",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "String"
                                                }
                                              },
                                              {
                                                "name": "delegateValidatorHash",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "ValidatorHash"
                                                  }
                                                }
                                              },
                                              {
                                                "name": "config",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "ByteArray"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 1,
                              "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__otherManifestChange",
                              "name": "otherManifestChange",
                              "fieldTypes": [
                                {
                                  "name": "activity",
                                  "type": {
                                    "kind": "enum",
                                    "name": "ManifestActivity",
                                    "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                                        "name": "retiringEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                                        "name": "updatingEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "tokenName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                                        "name": "addingEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "tokenName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                                        "name": "forkingThreadToken",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "newThreadCount",
                                            "type": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                                        "name": "burningThreadToken",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "burnedThreadCount",
                                            "type": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "remainingDelegateValidations",
                                  "type": {
                                    "kind": "list",
                                    "itemType": {
                                      "kind": "enum",
                                      "name": "DelegateRole",
                                      "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                      "variantTypes": [
                                        {
                                          "kind": "variant",
                                          "tag": 0,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                          "name": "MintDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 1,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                          "name": "SpendDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 2,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                          "name": "MintInvariant",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 3,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                          "name": "SpendInvariant",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 4,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                          "name": "DgDataPolicy",
                                          "fieldTypes": [
                                            {
                                              "name": "name",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            }
                                          ]
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 5,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                          "name": "OtherNamedDgt",
                                          "fieldTypes": [
                                            {
                                              "name": "name",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            }
                                          ]
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 6,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                          "name": "BothMintAndSpendDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 7,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                          "name": "HandledByCapoOnly",
                                          "fieldTypes": []
                                        }
                                      ]
                                    }
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              },
              {
                "name": "utxo",
                "type": {
                  "kind": "internal",
                  "name": "TxInput"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__CapoHelpers__cctx_CharterInputType[]__Input",
            "name": "Input",
            "fieldTypes": [
              {
                "name": "datum",
                "type": {
                  "kind": "variant",
                  "tag": 0,
                  "id": "__module__CapoHelpers__CapoDatum[]__CharterData",
                  "name": "CharterData",
                  "fieldTypes": [
                    {
                      "name": "spendDelegateLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "spendInvariants",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "otherNamedDelegates",
                      "type": {
                        "kind": "map",
                        "keyType": {
                          "kind": "internal",
                          "name": "String"
                        },
                        "valueType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "mintDelegateLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "mintInvariants",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                          "name": "RelativeDelegateLink",
                          "fieldTypes": [
                            {
                              "name": "uutName",
                              "type": {
                                "kind": "internal",
                                "name": "String"
                              }
                            },
                            {
                              "name": "delegateValidatorHash",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "ValidatorHash"
                                }
                              }
                            },
                            {
                              "name": "config",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "govAuthorityLink",
                      "type": {
                        "kind": "struct",
                        "format": "list",
                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                        "name": "RelativeDelegateLink",
                        "fieldTypes": [
                          {
                            "name": "uutName",
                            "type": {
                              "kind": "internal",
                              "name": "String"
                            }
                          },
                          {
                            "name": "delegateValidatorHash",
                            "type": {
                              "kind": "option",
                              "someType": {
                                "kind": "internal",
                                "name": "ValidatorHash"
                              }
                            }
                          },
                          {
                            "name": "config",
                            "type": {
                              "kind": "internal",
                              "name": "ByteArray"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "name": "manifest",
                      "type": {
                        "kind": "map",
                        "keyType": {
                          "kind": "internal",
                          "name": "String"
                        },
                        "valueType": {
                          "kind": "struct",
                          "format": "map",
                          "id": "__module__CapoHelpers__CapoManifestEntry[]",
                          "name": "CapoManifestEntry",
                          "fieldTypes": [
                            {
                              "name": "entryType",
                              "type": {
                                "kind": "enum",
                                "name": "ManifestEntryType",
                                "id": "__module__CapoHelpers__ManifestEntryType[]",
                                "variantTypes": [
                                  {
                                    "kind": "variant",
                                    "tag": 0,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__NamedTokenRef",
                                    "name": "NamedTokenRef",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 1,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__DgDataPolicy",
                                    "name": "DgDataPolicy",
                                    "fieldTypes": [
                                      {
                                        "name": "policyLink",
                                        "type": {
                                          "kind": "struct",
                                          "format": "list",
                                          "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                          "name": "RelativeDelegateLink",
                                          "fieldTypes": [
                                            {
                                              "name": "uutName",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            },
                                            {
                                              "name": "delegateValidatorHash",
                                              "type": {
                                                "kind": "option",
                                                "someType": {
                                                  "kind": "internal",
                                                  "name": "ValidatorHash"
                                                }
                                              }
                                            },
                                            {
                                              "name": "config",
                                              "type": {
                                                "kind": "internal",
                                                "name": "ByteArray"
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "idPrefix",
                                        "type": {
                                          "kind": "internal",
                                          "name": "String"
                                        }
                                      },
                                      {
                                        "name": "refCount",
                                        "type": {
                                          "kind": "internal",
                                          "name": "Int"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 2,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__DelegateThreads",
                                    "name": "DelegateThreads",
                                    "fieldTypes": [
                                      {
                                        "name": "role",
                                        "type": {
                                          "kind": "enum",
                                          "name": "DelegateRole",
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                              "name": "MintDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                              "name": "SpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                              "name": "MintInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 3,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                              "name": "SpendInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 4,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                              "name": "DgDataPolicy",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 5,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                              "name": "OtherNamedDgt",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 6,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                              "name": "BothMintAndSpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 7,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                              "name": "HandledByCapoOnly",
                                              "fieldTypes": []
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "refCount",
                                        "type": {
                                          "kind": "internal",
                                          "name": "Int"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 3,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleMembership",
                                    "name": "MerkleMembership",
                                    "fieldTypes": []
                                  },
                                  {
                                    "kind": "variant",
                                    "tag": 4,
                                    "id": "__module__CapoHelpers__ManifestEntryType[]__MerkleStateRoot",
                                    "name": "MerkleStateRoot",
                                    "fieldTypes": []
                                  }
                                ]
                              },
                              "key": "tpe"
                            },
                            {
                              "name": "tokenName",
                              "type": {
                                "kind": "internal",
                                "name": "ByteArray"
                              },
                              "key": "tn"
                            },
                            {
                              "name": "mph",
                              "type": {
                                "kind": "option",
                                "someType": {
                                  "kind": "internal",
                                  "name": "MintingPolicyHash"
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      "name": "pendingChanges",
                      "type": {
                        "kind": "list",
                        "itemType": {
                          "kind": "enum",
                          "name": "PendingCharterChange",
                          "id": "__module__CapoDelegateHelpers__PendingCharterChange[]",
                          "variantTypes": [
                            {
                              "kind": "variant",
                              "tag": 0,
                              "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__delegateChange",
                              "name": "delegateChange",
                              "fieldTypes": [
                                {
                                  "name": "change",
                                  "type": {
                                    "kind": "struct",
                                    "format": "list",
                                    "id": "__module__CapoDelegateHelpers__PendingDelegateChange[]",
                                    "name": "PendingDelegateChange",
                                    "fieldTypes": [
                                      {
                                        "name": "action",
                                        "type": {
                                          "kind": "enum",
                                          "name": "PendingDelegateAction",
                                          "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Add",
                                              "name": "Add",
                                              "fieldTypes": [
                                                {
                                                  "name": "seed",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "TxOutputId"
                                                  }
                                                },
                                                {
                                                  "name": "purpose",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "idPrefix",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Remove",
                                              "name": "Remove",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__PendingDelegateAction[]__Replace",
                                              "name": "Replace",
                                              "fieldTypes": [
                                                {
                                                  "name": "seed",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "TxOutputId"
                                                  }
                                                },
                                                {
                                                  "name": "purpose",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "idPrefix",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                },
                                                {
                                                  "name": "replacesDgt",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "AssetClass"
                                                  }
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "role",
                                        "type": {
                                          "kind": "enum",
                                          "name": "DelegateRole",
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 0,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                              "name": "MintDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 1,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                              "name": "SpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 2,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                              "name": "MintInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 3,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                              "name": "SpendInvariant",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 4,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                              "name": "DgDataPolicy",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 5,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                              "name": "OtherNamedDgt",
                                              "fieldTypes": [
                                                {
                                                  "name": "name",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "String"
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 6,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                              "name": "BothMintAndSpendDgt",
                                              "fieldTypes": []
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 7,
                                              "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                              "name": "HandledByCapoOnly",
                                              "fieldTypes": []
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        "name": "dgtLink",
                                        "type": {
                                          "kind": "option",
                                          "someType": {
                                            "kind": "struct",
                                            "format": "list",
                                            "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                            "name": "RelativeDelegateLink",
                                            "fieldTypes": [
                                              {
                                                "name": "uutName",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "String"
                                                }
                                              },
                                              {
                                                "name": "delegateValidatorHash",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "ValidatorHash"
                                                  }
                                                }
                                              },
                                              {
                                                "name": "config",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "ByteArray"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            {
                              "kind": "variant",
                              "tag": 1,
                              "id": "__module__CapoDelegateHelpers__PendingCharterChange[]__otherManifestChange",
                              "name": "otherManifestChange",
                              "fieldTypes": [
                                {
                                  "name": "activity",
                                  "type": {
                                    "kind": "enum",
                                    "name": "ManifestActivity",
                                    "id": "__module__CapoDelegateHelpers__ManifestActivity[]",
                                    "variantTypes": [
                                      {
                                        "kind": "variant",
                                        "tag": 0,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__retiringEntry",
                                        "name": "retiringEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 1,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__updatingEntry",
                                        "name": "updatingEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "tokenName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 2,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__addingEntry",
                                        "name": "addingEntry",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "tokenName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 3,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__forkingThreadToken",
                                        "name": "forkingThreadToken",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "newThreadCount",
                                            "type": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "kind": "variant",
                                        "tag": 4,
                                        "id": "__module__CapoDelegateHelpers__ManifestActivity[]__burningThreadToken",
                                        "name": "burningThreadToken",
                                        "fieldTypes": [
                                          {
                                            "name": "key",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "burnedThreadCount",
                                            "type": {
                                              "kind": "internal",
                                              "name": "Int"
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "name": "remainingDelegateValidations",
                                  "type": {
                                    "kind": "list",
                                    "itemType": {
                                      "kind": "enum",
                                      "name": "DelegateRole",
                                      "id": "__module__CapoDelegateHelpers__DelegateRole[]",
                                      "variantTypes": [
                                        {
                                          "kind": "variant",
                                          "tag": 0,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintDgt",
                                          "name": "MintDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 1,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendDgt",
                                          "name": "SpendDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 2,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__MintInvariant",
                                          "name": "MintInvariant",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 3,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__SpendInvariant",
                                          "name": "SpendInvariant",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 4,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__DgDataPolicy",
                                          "name": "DgDataPolicy",
                                          "fieldTypes": [
                                            {
                                              "name": "name",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            }
                                          ]
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 5,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__OtherNamedDgt",
                                          "name": "OtherNamedDgt",
                                          "fieldTypes": [
                                            {
                                              "name": "name",
                                              "type": {
                                                "kind": "internal",
                                                "name": "String"
                                              }
                                            }
                                          ]
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 6,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__BothMintAndSpendDgt",
                                          "name": "BothMintAndSpendDgt",
                                          "fieldTypes": []
                                        },
                                        {
                                          "kind": "variant",
                                          "tag": 7,
                                          "id": "__module__CapoDelegateHelpers__DelegateRole[]__HandledByCapoOnly",
                                          "name": "HandledByCapoOnly",
                                          "fieldTypes": []
                                        }
                                      ]
                                    }
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              },
              {
                "name": "utxo",
                "type": {
                  "kind": "internal",
                  "name": "TxInput"
                }
              }
            ]
          }
        ]
      }
    }
  ]
};
const dgd_DataSrcSchema = {
  "kind": "enum",
  "name": "dgd_DataSrc",
  "id": "__module__CapoHelpers__dgd_DataSrc[]",
  "variantTypes": [
    {
      "kind": "variant",
      "tag": 0,
      "id": "__module__CapoHelpers__dgd_DataSrc[]__Unk",
      "name": "Unk",
      "fieldTypes": []
    },
    {
      "kind": "variant",
      "tag": 1,
      "id": "__module__CapoHelpers__dgd_DataSrc[]__Input",
      "name": "Input",
      "fieldTypes": [
        {
          "name": "utxo",
          "type": {
            "kind": "internal",
            "name": "TxInput"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 2,
      "id": "__module__CapoHelpers__dgd_DataSrc[]__Output",
      "name": "Output",
      "fieldTypes": [
        {
          "name": "txo",
          "type": {
            "kind": "internal",
            "name": "TxOutput"
          }
        }
      ]
    },
    {
      "kind": "variant",
      "tag": 3,
      "id": "__module__CapoHelpers__dgd_DataSrc[]__Both",
      "name": "Both",
      "fieldTypes": [
        {
          "name": "utxo",
          "type": {
            "kind": "internal",
            "name": "TxInput"
          }
        },
        {
          "name": "txo",
          "type": {
            "kind": "internal",
            "name": "TxOutput"
          }
        }
      ]
    }
  ]
};
const DgDataDetailsSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__CapoHelpers__DgDataDetails[]",
  "name": "DgDataDetails",
  "fieldTypes": [
    {
      "name": "dataSrc",
      "type": {
        "kind": "enum",
        "name": "dgd_DataSrc",
        "id": "__module__CapoHelpers__dgd_DataSrc[]",
        "variantTypes": [
          {
            "kind": "variant",
            "tag": 0,
            "id": "__module__CapoHelpers__dgd_DataSrc[]__Unk",
            "name": "Unk",
            "fieldTypes": []
          },
          {
            "kind": "variant",
            "tag": 1,
            "id": "__module__CapoHelpers__dgd_DataSrc[]__Input",
            "name": "Input",
            "fieldTypes": [
              {
                "name": "utxo",
                "type": {
                  "kind": "internal",
                  "name": "TxInput"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 2,
            "id": "__module__CapoHelpers__dgd_DataSrc[]__Output",
            "name": "Output",
            "fieldTypes": [
              {
                "name": "txo",
                "type": {
                  "kind": "internal",
                  "name": "TxOutput"
                }
              }
            ]
          },
          {
            "kind": "variant",
            "tag": 3,
            "id": "__module__CapoHelpers__dgd_DataSrc[]__Both",
            "name": "Both",
            "fieldTypes": [
              {
                "name": "utxo",
                "type": {
                  "kind": "internal",
                  "name": "TxInput"
                }
              },
              {
                "name": "txo",
                "type": {
                  "kind": "internal",
                  "name": "TxOutput"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "id",
      "type": {
        "kind": "internal",
        "name": "ByteArray"
      }
    },
    {
      "name": "type",
      "type": {
        "kind": "internal",
        "name": "String"
      }
    },
    {
      "name": "mph",
      "type": {
        "kind": "internal",
        "name": "MintingPolicyHash"
      }
    }
  ]
};
const DTS_PurchaseInfoSchema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__DynamicSaleV1__DTS_PurchaseInfo[]",
  "name": "DTS_PurchaseInfo",
  "fieldTypes": [
    {
      "name": "inferredPace",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "hoursSinceLastPurchase",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "unitsPurchased",
      "type": {
        "kind": "internal",
        "name": "Int"
      }
    },
    {
      "name": "purchaseTime",
      "type": {
        "kind": "internal",
        "name": "Time"
      }
    },
    {
      "name": "prevSalePace",
      "type": {
        "kind": "internal",
        "name": "Real"
      }
    },
    {
      "name": "totalProgress",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
        "name": "SaleProgressDetails",
        "fieldTypes": [
          {
            "name": "lastPurchaseAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "prevPurchaseAt",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "chunkUnitCount",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "chunkUnitsSold",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          }
        ]
      }
    }
  ]
};
const DynamicSaleV1Schema = {
  "kind": "struct",
  "format": "list",
  "id": "__module__DynamicSaleV1__DynamicSaleV1[]",
  "name": "DynamicSaleV1",
  "fieldTypes": [
    {
      "name": "settings",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
        "name": "DynamicSaleV1Settings",
        "fieldTypes": [
          {
            "name": "targetPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "targetedSellingTime",
            "type": {
              "kind": "internal",
              "name": "Duration"
            }
          },
          {
            "name": "minPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "maxPrice",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingDiscountFloorPoint",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingDiscountWhenSlow",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "progressPricingExpansionWhenFast",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "dynaPaceFasterSaleWeight",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "dynaPaceIdleDecayRate",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "pricingWeightDynaPace",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          }
        ]
      }
    },
    {
      "name": "purchase",
      "type": {
        "kind": "struct",
        "format": "list",
        "id": "__module__DynamicSaleV1__DTS_PurchaseInfo[]",
        "name": "DTS_PurchaseInfo",
        "fieldTypes": [
          {
            "name": "inferredPace",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "hoursSinceLastPurchase",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "unitsPurchased",
            "type": {
              "kind": "internal",
              "name": "Int"
            }
          },
          {
            "name": "purchaseTime",
            "type": {
              "kind": "internal",
              "name": "Time"
            }
          },
          {
            "name": "prevSalePace",
            "type": {
              "kind": "internal",
              "name": "Real"
            }
          },
          {
            "name": "totalProgress",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
              "name": "SaleProgressDetails",
              "fieldTypes": [
                {
                  "name": "lastPurchaseAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "prevPurchaseAt",
                  "type": {
                    "kind": "internal",
                    "name": "Time"
                  }
                },
                {
                  "name": "chunkUnitCount",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                },
                {
                  "name": "chunkUnitsSold",
                  "type": {
                    "kind": "internal",
                    "name": "Int"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "name": "sale",
      "type": {
        "kind": "struct",
        "format": "map",
        "id": "__module__MarketSaleData__MarketSaleData[]",
        "name": "MarketSaleData",
        "fieldTypes": [
          {
            "name": "id",
            "type": {
              "kind": "internal",
              "name": "ByteArray"
            },
            "key": "@id"
          },
          {
            "name": "type",
            "type": {
              "kind": "internal",
              "name": "String"
            },
            "key": "tpe"
          },
          {
            "name": "name",
            "type": {
              "kind": "internal",
              "name": "String"
            }
          },
          {
            "name": "moreFields",
            "type": {
              "kind": "struct",
              "format": "list",
              "id": "__module__MarketSaleData__MoreFields[]",
              "name": "MoreFields",
              "fieldTypes": [
                {
                  "name": "saleState",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__MarketSaleData__OtherSaleState[]",
                    "name": "OtherSaleState",
                    "fieldTypes": [
                      {
                        "name": "progressDetails",
                        "type": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
                          "name": "SaleProgressDetails",
                          "fieldTypes": [
                            {
                              "name": "lastPurchaseAt",
                              "type": {
                                "kind": "internal",
                                "name": "Time"
                              }
                            },
                            {
                              "name": "prevPurchaseAt",
                              "type": {
                                "kind": "internal",
                                "name": "Time"
                              }
                            },
                            {
                              "name": "chunkUnitCount",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            },
                            {
                              "name": "chunkUnitsSold",
                              "type": {
                                "kind": "internal",
                                "name": "Int"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "name": "salePace",
                        "type": {
                          "kind": "internal",
                          "name": "Real"
                        }
                      },
                      {
                        "name": "state",
                        "type": {
                          "kind": "enum",
                          "name": "MarketSaleState",
                          "id": "__module__MarketSaleData__MarketSaleState[]",
                          "variantTypes": [
                            {
                              "kind": "variant",
                              "tag": 0,
                              "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
                              "name": "Pending",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 1,
                              "id": "__module__MarketSaleData__MarketSaleState[]__Active",
                              "name": "Active",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 2,
                              "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
                              "name": "Retired",
                              "fieldTypes": []
                            },
                            {
                              "kind": "variant",
                              "tag": 3,
                              "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
                              "name": "SoldOut",
                              "fieldTypes": []
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "fixedSaleDetails",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__MarketSaleData__FixedSaleDetails[]",
                    "name": "FixedSaleDetails",
                    "fieldTypes": [
                      {
                        "name": "settings",
                        "type": {
                          "kind": "struct",
                          "format": "list",
                          "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
                          "name": "DynamicSaleV1Settings",
                          "fieldTypes": [
                            {
                              "name": "targetPrice",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "targetedSellingTime",
                              "type": {
                                "kind": "internal",
                                "name": "Duration"
                              }
                            },
                            {
                              "name": "minPrice",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "maxPrice",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "progressPricingDiscountFloorPoint",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "progressPricingDiscountWhenSlow",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "progressPricingExpansionWhenFast",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "dynaPaceFasterSaleWeight",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "dynaPaceIdleDecayRate",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            },
                            {
                              "name": "pricingWeightDynaPace",
                              "type": {
                                "kind": "internal",
                                "name": "Real"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "name": "startAt",
                        "type": {
                          "kind": "internal",
                          "name": "Time"
                        }
                      },
                      {
                        "name": "vxfTokensTo",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "enum",
                            "name": "VxfDestination",
                            "id": "__module__VxfProtocol__VxfDestination[]",
                            "variantTypes": [
                              {
                                "kind": "variant",
                                "tag": 0,
                                "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                "name": "RelativeLink",
                                "fieldTypes": [
                                  {
                                    "name": "link",
                                    "type": {
                                      "kind": "struct",
                                      "format": "list",
                                      "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                      "name": "RelativeDelegateLink",
                                      "fieldTypes": [
                                        {
                                          "name": "uutName",
                                          "type": {
                                            "kind": "internal",
                                            "name": "String"
                                          }
                                        },
                                        {
                                          "name": "delegateValidatorHash",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "ValidatorHash"
                                            }
                                          }
                                        },
                                        {
                                          "name": "config",
                                          "type": {
                                            "kind": "internal",
                                            "name": "ByteArray"
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    "name": "vxfActivity",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "enum",
                                        "name": "VxfExpectedActivity",
                                        "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                        "variantTypes": [
                                          {
                                            "kind": "variant",
                                            "tag": 22104,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                            "name": "VxfTransfer",
                                            "fieldTypes": [
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22106,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                            "name": "VxfStorage",
                                            "fieldTypes": [
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22107,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                            "name": "SpecificRedeemerId",
                                            "fieldTypes": [
                                              {
                                                "name": "id",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Int"
                                                }
                                              },
                                              {
                                                "name": "inNestedList",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Bool"
                                                }
                                              },
                                              {
                                                "name": "nestedListRedeemerId",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                }
                                              },
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22108,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                            "name": "TaggedRedeemer",
                                            "fieldTypes": [
                                              {
                                                "name": "firstFieldConstrTag",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Int"
                                                }
                                              },
                                              {
                                                "name": "inNestedList",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Bool"
                                                }
                                              },
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 1,
                                "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                "name": "AnyTokenHolder",
                                "fieldTypes": [
                                  {
                                    "name": "mph",
                                    "type": {
                                      "kind": "internal",
                                      "name": "MintingPolicyHash"
                                    }
                                  },
                                  {
                                    "name": "assetName",
                                    "type": {
                                      "kind": "internal",
                                      "name": "ByteArray"
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 2,
                                "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                "name": "PubKey",
                                "fieldTypes": [
                                  {
                                    "name": "pkh",
                                    "type": {
                                      "kind": "internal",
                                      "name": "PubKeyHash"
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 98,
                                "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                "name": "Anywhere",
                                "fieldTypes": []
                              },
                              {
                                "kind": "variant",
                                "tag": 99,
                                "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                "name": "NotYetDefined",
                                "fieldTypes": []
                              }
                            ]
                          }
                        }
                      },
                      {
                        "name": "vxfFundsTo",
                        "type": {
                          "kind": "option",
                          "someType": {
                            "kind": "enum",
                            "name": "VxfDestination",
                            "id": "__module__VxfProtocol__VxfDestination[]",
                            "variantTypes": [
                              {
                                "kind": "variant",
                                "tag": 0,
                                "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                "name": "RelativeLink",
                                "fieldTypes": [
                                  {
                                    "name": "link",
                                    "type": {
                                      "kind": "struct",
                                      "format": "list",
                                      "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                      "name": "RelativeDelegateLink",
                                      "fieldTypes": [
                                        {
                                          "name": "uutName",
                                          "type": {
                                            "kind": "internal",
                                            "name": "String"
                                          }
                                        },
                                        {
                                          "name": "delegateValidatorHash",
                                          "type": {
                                            "kind": "option",
                                            "someType": {
                                              "kind": "internal",
                                              "name": "ValidatorHash"
                                            }
                                          }
                                        },
                                        {
                                          "name": "config",
                                          "type": {
                                            "kind": "internal",
                                            "name": "ByteArray"
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    "name": "vxfActivity",
                                    "type": {
                                      "kind": "option",
                                      "someType": {
                                        "kind": "enum",
                                        "name": "VxfExpectedActivity",
                                        "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                        "variantTypes": [
                                          {
                                            "kind": "variant",
                                            "tag": 22104,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                            "name": "VxfTransfer",
                                            "fieldTypes": [
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22106,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                            "name": "VxfStorage",
                                            "fieldTypes": [
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22107,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                            "name": "SpecificRedeemerId",
                                            "fieldTypes": [
                                              {
                                                "name": "id",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Int"
                                                }
                                              },
                                              {
                                                "name": "inNestedList",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Bool"
                                                }
                                              },
                                              {
                                                "name": "nestedListRedeemerId",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                }
                                              },
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "kind": "variant",
                                            "tag": 22108,
                                            "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                            "name": "TaggedRedeemer",
                                            "fieldTypes": [
                                              {
                                                "name": "firstFieldConstrTag",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Int"
                                                }
                                              },
                                              {
                                                "name": "inNestedList",
                                                "type": {
                                                  "kind": "internal",
                                                  "name": "Bool"
                                                }
                                              },
                                              {
                                                "name": "appData",
                                                "type": {
                                                  "kind": "option",
                                                  "someType": {
                                                    "kind": "internal",
                                                    "name": "Data"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 1,
                                "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                "name": "AnyTokenHolder",
                                "fieldTypes": [
                                  {
                                    "name": "mph",
                                    "type": {
                                      "kind": "internal",
                                      "name": "MintingPolicyHash"
                                    }
                                  },
                                  {
                                    "name": "assetName",
                                    "type": {
                                      "kind": "internal",
                                      "name": "ByteArray"
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 2,
                                "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                "name": "PubKey",
                                "fieldTypes": [
                                  {
                                    "name": "pkh",
                                    "type": {
                                      "kind": "internal",
                                      "name": "PubKeyHash"
                                    }
                                  }
                                ]
                              },
                              {
                                "kind": "variant",
                                "tag": 98,
                                "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                "name": "Anywhere",
                                "fieldTypes": []
                              },
                              {
                                "kind": "variant",
                                "tag": 99,
                                "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                "name": "NotYetDefined",
                                "fieldTypes": []
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "saleAssets",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__MarketSaleData__SaleAssets[]",
                    "name": "SaleAssets",
                    "fieldTypes": [
                      {
                        "name": "saleUnitAssets",
                        "type": {
                          "kind": "internal",
                          "name": "Value"
                        }
                      },
                      {
                        "name": "singleBuyMaxUnits",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      },
                      {
                        "name": "primaryAssetMph",
                        "type": {
                          "kind": "internal",
                          "name": "MintingPolicyHash"
                        }
                      },
                      {
                        "name": "primaryAssetName",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      },
                      {
                        "name": "primaryAssetTargetCount",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      },
                      {
                        "name": "totalSaleUnits",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "threadInfo",
                  "type": {
                    "kind": "struct",
                    "format": "list",
                    "id": "__module__MarketSaleData__ThreadInfo[]",
                    "name": "ThreadInfo",
                    "fieldTypes": [
                      {
                        "name": "nestedThreads",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      },
                      {
                        "name": "retiredThreads",
                        "type": {
                          "kind": "internal",
                          "name": "Int"
                        }
                      },
                      {
                        "name": "parentChunkId",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      },
                      {
                        "name": "chunkForkedAt",
                        "type": {
                          "kind": "internal",
                          "name": "Time"
                        }
                      },
                      {
                        "name": "saleId",
                        "type": {
                          "kind": "internal",
                          "name": "ByteArray"
                        }
                      }
                    ]
                  }
                }
              ]
            },
            "key": "mo"
          }
        ]
      }
    },
    {
      "name": "updatedSale",
      "type": {
        "kind": "option",
        "someType": {
          "kind": "struct",
          "format": "map",
          "id": "__module__MarketSaleData__MarketSaleData[]",
          "name": "MarketSaleData",
          "fieldTypes": [
            {
              "name": "id",
              "type": {
                "kind": "internal",
                "name": "ByteArray"
              },
              "key": "@id"
            },
            {
              "name": "type",
              "type": {
                "kind": "internal",
                "name": "String"
              },
              "key": "tpe"
            },
            {
              "name": "name",
              "type": {
                "kind": "internal",
                "name": "String"
              }
            },
            {
              "name": "moreFields",
              "type": {
                "kind": "struct",
                "format": "list",
                "id": "__module__MarketSaleData__MoreFields[]",
                "name": "MoreFields",
                "fieldTypes": [
                  {
                    "name": "saleState",
                    "type": {
                      "kind": "struct",
                      "format": "list",
                      "id": "__module__MarketSaleData__OtherSaleState[]",
                      "name": "OtherSaleState",
                      "fieldTypes": [
                        {
                          "name": "progressDetails",
                          "type": {
                            "kind": "struct",
                            "format": "list",
                            "id": "__module__SaleProgressDetails__SaleProgressDetails[]",
                            "name": "SaleProgressDetails",
                            "fieldTypes": [
                              {
                                "name": "lastPurchaseAt",
                                "type": {
                                  "kind": "internal",
                                  "name": "Time"
                                }
                              },
                              {
                                "name": "prevPurchaseAt",
                                "type": {
                                  "kind": "internal",
                                  "name": "Time"
                                }
                              },
                              {
                                "name": "chunkUnitCount",
                                "type": {
                                  "kind": "internal",
                                  "name": "Int"
                                }
                              },
                              {
                                "name": "chunkUnitsSold",
                                "type": {
                                  "kind": "internal",
                                  "name": "Int"
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "salePace",
                          "type": {
                            "kind": "internal",
                            "name": "Real"
                          }
                        },
                        {
                          "name": "state",
                          "type": {
                            "kind": "enum",
                            "name": "MarketSaleState",
                            "id": "__module__MarketSaleData__MarketSaleState[]",
                            "variantTypes": [
                              {
                                "kind": "variant",
                                "tag": 0,
                                "id": "__module__MarketSaleData__MarketSaleState[]__Pending",
                                "name": "Pending",
                                "fieldTypes": []
                              },
                              {
                                "kind": "variant",
                                "tag": 1,
                                "id": "__module__MarketSaleData__MarketSaleState[]__Active",
                                "name": "Active",
                                "fieldTypes": []
                              },
                              {
                                "kind": "variant",
                                "tag": 2,
                                "id": "__module__MarketSaleData__MarketSaleState[]__Retired",
                                "name": "Retired",
                                "fieldTypes": []
                              },
                              {
                                "kind": "variant",
                                "tag": 3,
                                "id": "__module__MarketSaleData__MarketSaleState[]__SoldOut",
                                "name": "SoldOut",
                                "fieldTypes": []
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "name": "fixedSaleDetails",
                    "type": {
                      "kind": "struct",
                      "format": "list",
                      "id": "__module__MarketSaleData__FixedSaleDetails[]",
                      "name": "FixedSaleDetails",
                      "fieldTypes": [
                        {
                          "name": "settings",
                          "type": {
                            "kind": "struct",
                            "format": "list",
                            "id": "__module__DynamicSaleV1Settings__DynamicSaleV1Settings[]",
                            "name": "DynamicSaleV1Settings",
                            "fieldTypes": [
                              {
                                "name": "targetPrice",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "targetedSellingTime",
                                "type": {
                                  "kind": "internal",
                                  "name": "Duration"
                                }
                              },
                              {
                                "name": "minPrice",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "maxPrice",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "progressPricingDiscountFloorPoint",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "progressPricingDiscountWhenSlow",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "progressPricingExpansionWhenFast",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "dynaPaceFasterSaleWeight",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "dynaPaceIdleDecayRate",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              },
                              {
                                "name": "pricingWeightDynaPace",
                                "type": {
                                  "kind": "internal",
                                  "name": "Real"
                                }
                              }
                            ]
                          }
                        },
                        {
                          "name": "startAt",
                          "type": {
                            "kind": "internal",
                            "name": "Time"
                          }
                        },
                        {
                          "name": "vxfTokensTo",
                          "type": {
                            "kind": "option",
                            "someType": {
                              "kind": "enum",
                              "name": "VxfDestination",
                              "id": "__module__VxfProtocol__VxfDestination[]",
                              "variantTypes": [
                                {
                                  "kind": "variant",
                                  "tag": 0,
                                  "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                  "name": "RelativeLink",
                                  "fieldTypes": [
                                    {
                                      "name": "link",
                                      "type": {
                                        "kind": "struct",
                                        "format": "list",
                                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                        "name": "RelativeDelegateLink",
                                        "fieldTypes": [
                                          {
                                            "name": "uutName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "delegateValidatorHash",
                                            "type": {
                                              "kind": "option",
                                              "someType": {
                                                "kind": "internal",
                                                "name": "ValidatorHash"
                                              }
                                            }
                                          },
                                          {
                                            "name": "config",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      }
                                    },
                                    {
                                      "name": "vxfActivity",
                                      "type": {
                                        "kind": "option",
                                        "someType": {
                                          "kind": "enum",
                                          "name": "VxfExpectedActivity",
                                          "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 22104,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                              "name": "VxfTransfer",
                                              "fieldTypes": [
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22106,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                              "name": "VxfStorage",
                                              "fieldTypes": [
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22107,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                              "name": "SpecificRedeemerId",
                                              "fieldTypes": [
                                                {
                                                  "name": "id",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                },
                                                {
                                                  "name": "inNestedList",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Bool"
                                                  }
                                                },
                                                {
                                                  "name": "nestedListRedeemerId",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  }
                                                },
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22108,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                              "name": "TaggedRedeemer",
                                              "fieldTypes": [
                                                {
                                                  "name": "firstFieldConstrTag",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                },
                                                {
                                                  "name": "inNestedList",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Bool"
                                                  }
                                                },
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 1,
                                  "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                  "name": "AnyTokenHolder",
                                  "fieldTypes": [
                                    {
                                      "name": "mph",
                                      "type": {
                                        "kind": "internal",
                                        "name": "MintingPolicyHash"
                                      }
                                    },
                                    {
                                      "name": "assetName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 2,
                                  "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                  "name": "PubKey",
                                  "fieldTypes": [
                                    {
                                      "name": "pkh",
                                      "type": {
                                        "kind": "internal",
                                        "name": "PubKeyHash"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 98,
                                  "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                  "name": "Anywhere",
                                  "fieldTypes": []
                                },
                                {
                                  "kind": "variant",
                                  "tag": 99,
                                  "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                  "name": "NotYetDefined",
                                  "fieldTypes": []
                                }
                              ]
                            }
                          }
                        },
                        {
                          "name": "vxfFundsTo",
                          "type": {
                            "kind": "option",
                            "someType": {
                              "kind": "enum",
                              "name": "VxfDestination",
                              "id": "__module__VxfProtocol__VxfDestination[]",
                              "variantTypes": [
                                {
                                  "kind": "variant",
                                  "tag": 0,
                                  "id": "__module__VxfProtocol__VxfDestination[]__RelativeLink",
                                  "name": "RelativeLink",
                                  "fieldTypes": [
                                    {
                                      "name": "link",
                                      "type": {
                                        "kind": "struct",
                                        "format": "list",
                                        "id": "__module__CapoDelegateHelpers__RelativeDelegateLink[]",
                                        "name": "RelativeDelegateLink",
                                        "fieldTypes": [
                                          {
                                            "name": "uutName",
                                            "type": {
                                              "kind": "internal",
                                              "name": "String"
                                            }
                                          },
                                          {
                                            "name": "delegateValidatorHash",
                                            "type": {
                                              "kind": "option",
                                              "someType": {
                                                "kind": "internal",
                                                "name": "ValidatorHash"
                                              }
                                            }
                                          },
                                          {
                                            "name": "config",
                                            "type": {
                                              "kind": "internal",
                                              "name": "ByteArray"
                                            }
                                          }
                                        ]
                                      }
                                    },
                                    {
                                      "name": "vxfActivity",
                                      "type": {
                                        "kind": "option",
                                        "someType": {
                                          "kind": "enum",
                                          "name": "VxfExpectedActivity",
                                          "id": "__module__VxfProtocol__VxfExpectedActivity[]",
                                          "variantTypes": [
                                            {
                                              "kind": "variant",
                                              "tag": 22104,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfTransfer",
                                              "name": "VxfTransfer",
                                              "fieldTypes": [
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22106,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__VxfStorage",
                                              "name": "VxfStorage",
                                              "fieldTypes": [
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22107,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__SpecificRedeemerId",
                                              "name": "SpecificRedeemerId",
                                              "fieldTypes": [
                                                {
                                                  "name": "id",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                },
                                                {
                                                  "name": "inNestedList",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Bool"
                                                  }
                                                },
                                                {
                                                  "name": "nestedListRedeemerId",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Int"
                                                    }
                                                  }
                                                },
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            },
                                            {
                                              "kind": "variant",
                                              "tag": 22108,
                                              "id": "__module__VxfProtocol__VxfExpectedActivity[]__TaggedRedeemer",
                                              "name": "TaggedRedeemer",
                                              "fieldTypes": [
                                                {
                                                  "name": "firstFieldConstrTag",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Int"
                                                  }
                                                },
                                                {
                                                  "name": "inNestedList",
                                                  "type": {
                                                    "kind": "internal",
                                                    "name": "Bool"
                                                  }
                                                },
                                                {
                                                  "name": "appData",
                                                  "type": {
                                                    "kind": "option",
                                                    "someType": {
                                                      "kind": "internal",
                                                      "name": "Data"
                                                    }
                                                  }
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 1,
                                  "id": "__module__VxfProtocol__VxfDestination[]__AnyTokenHolder",
                                  "name": "AnyTokenHolder",
                                  "fieldTypes": [
                                    {
                                      "name": "mph",
                                      "type": {
                                        "kind": "internal",
                                        "name": "MintingPolicyHash"
                                      }
                                    },
                                    {
                                      "name": "assetName",
                                      "type": {
                                        "kind": "internal",
                                        "name": "ByteArray"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 2,
                                  "id": "__module__VxfProtocol__VxfDestination[]__PubKey",
                                  "name": "PubKey",
                                  "fieldTypes": [
                                    {
                                      "name": "pkh",
                                      "type": {
                                        "kind": "internal",
                                        "name": "PubKeyHash"
                                      }
                                    }
                                  ]
                                },
                                {
                                  "kind": "variant",
                                  "tag": 98,
                                  "id": "__module__VxfProtocol__VxfDestination[]__Anywhere",
                                  "name": "Anywhere",
                                  "fieldTypes": []
                                },
                                {
                                  "kind": "variant",
                                  "tag": 99,
                                  "id": "__module__VxfProtocol__VxfDestination[]__NotYetDefined",
                                  "name": "NotYetDefined",
                                  "fieldTypes": []
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    "name": "saleAssets",
                    "type": {
                      "kind": "struct",
                      "format": "list",
                      "id": "__module__MarketSaleData__SaleAssets[]",
                      "name": "SaleAssets",
                      "fieldTypes": [
                        {
                          "name": "saleUnitAssets",
                          "type": {
                            "kind": "internal",
                            "name": "Value"
                          }
                        },
                        {
                          "name": "singleBuyMaxUnits",
                          "type": {
                            "kind": "internal",
                            "name": "Int"
                          }
                        },
                        {
                          "name": "primaryAssetMph",
                          "type": {
                            "kind": "internal",
                            "name": "MintingPolicyHash"
                          }
                        },
                        {
                          "name": "primaryAssetName",
                          "type": {
                            "kind": "internal",
                            "name": "ByteArray"
                          }
                        },
                        {
                          "name": "primaryAssetTargetCount",
                          "type": {
                            "kind": "internal",
                            "name": "Int"
                          }
                        },
                        {
                          "name": "totalSaleUnits",
                          "type": {
                            "kind": "internal",
                            "name": "Int"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "name": "threadInfo",
                    "type": {
                      "kind": "struct",
                      "format": "list",
                      "id": "__module__MarketSaleData__ThreadInfo[]",
                      "name": "ThreadInfo",
                      "fieldTypes": [
                        {
                          "name": "nestedThreads",
                          "type": {
                            "kind": "internal",
                            "name": "Int"
                          }
                        },
                        {
                          "name": "retiredThreads",
                          "type": {
                            "kind": "internal",
                            "name": "Int"
                          }
                        },
                        {
                          "name": "parentChunkId",
                          "type": {
                            "kind": "internal",
                            "name": "ByteArray"
                          }
                        },
                        {
                          "name": "chunkForkedAt",
                          "type": {
                            "kind": "internal",
                            "name": "Time"
                          }
                        },
                        {
                          "name": "saleId",
                          "type": {
                            "kind": "internal",
                            "name": "ByteArray"
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              "key": "mo"
            }
          ]
        }
      }
    }
  ]
};

class MarketSaleController extends WrappedDgDataContract {
  dataBridgeClass = MarketSalePolicyDataBridge;
  get recordTypeName() {
    return "mktSale";
  }
  get abstractBundleClass() {
    return MarketSaleBundle;
  }
  get idPrefix() {
    return "mktSale";
  }
  scriptBundle() {
    const capoBundle = this.capo.scriptBundle().constructor;
    return MarketSaleBundle.usingCapoBundleClass(
      capoBundle
    ).create();
  }
  exampleData() {
    const tn = encodeUtf8("PLANKTON");
    const mph = this.capo.mph;
    const units = 1000n;
    const startTime = (/* @__PURE__ */ new Date()).getTime();
    return {
      // id: "mktSale_123",
      // type: "mktSale",
      name: "Sample marketSale",
      moreFields: {
        fixedSaleDetails: {
          settings: {
            targetPrice: 1,
            targetedSellingTime: 75 * 60 * 1e3,
            minPrice: 0.5,
            maxPrice: 4.2,
            progressPricingDiscountFloorPoint: 0.2,
            progressPricingDiscountWhenSlow: 0.25,
            progressPricingExpansionWhenFast: 0.2,
            dynaPaceFasterSaleWeight: 0.3,
            dynaPaceIdleDecayRate: 0.5,
            pricingWeightDynaPace: 5
          },
          startAt: startTime,
          vxfTokensTo: undefined,
          vxfFundsTo: {
            Anywhere: {}
          }
        },
        saleAssets: {
          primaryAssetMph: mph,
          primaryAssetName: tn,
          primaryAssetTargetCount: 100000000n,
          totalSaleUnits: units,
          saleUnitAssets: makeValue(mph, tn, 100000000n / units),
          singleBuyMaxUnits: 25n
        },
        saleState: {
          progressDetails: {
            lastPurchaseAt: startTime,
            prevPurchaseAt: startTime,
            chunkUnitCount: units,
            chunkUnitsSold: 0n
          },
          salePace: 1,
          state: { Pending: {} }
        },
        threadInfo: {
          chunkForkedAt: 0n,
          nestedThreads: 0n,
          retiredThreads: 0n,
          parentChunkId: encodeUtf8(""),
          // is changed to match the sale `id` on creation
          // ... or to parentChunkId's saleId, if this is a split chunk
          saleId: encodeUtf8("mktSale-123")
        }
      }
    };
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
    retired
  }) {
    if (isRoot && !!parentId) {
      throw new Error("isRoot and parentId are mutually exclusive");
    }
    const targetSaleId = saleId ? encodeUtf8(saleId) : undefined;
    const targetParentId = parentId ? encodeUtf8(parentId) : undefined;
    return this.capo.findDelegatedDataUtxos({
      type: "mktSale",
      predicate(utxo, data) {
        if (!!saleId && data.moreFields.threadInfo.saleId != targetSaleId)
          return false;
        if (!!parentId && data.moreFields.threadInfo.parentChunkId != targetParentId)
          return false;
        if (!!isRoot && data.id != data.moreFields.threadInfo.saleId)
          return false;
        {
          let stateMatch = false;
          if (pending && "Pending" in data.moreFields.saleState.state)
            stateMatch = true;
          if (active && "Active" in data.moreFields.saleState.state)
            stateMatch = true;
          if (retired && "Retired" in data.moreFields.saleState.state)
            stateMatch = true;
          if (!pending && !active && !retired) stateMatch = true;
          if (!stateMatch) return false;
        }
        return true;
      }
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
  async getExpiry(tcx) {
    return /* @__PURE__ */ new Date();
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
  beforeCreate(data) {
    debugger;
    data.moreFields.threadInfo.saleId = data.id;
    return data;
  }
  async mkTxnActivateMarketSale(mktSale, addedTokenValue = makeValue(0n), newAttrs, tcx) {
    console.log("\u{1F3D2} activating mktSale");
    const tt = await this.mkTxnUpdateRecord(
      "activate MarketSale",
      mktSale,
      {
        activity: this.activity.SpendingActivities.Activating(
          mktSale.data.moreFields.threadInfo.saleId
        ),
        updatedFields: {
          ...newAttrs,
          moreFields: {
            ...newAttrs.moreFields,
            saleState: {
              ...mktSale.data.moreFields.saleState,
              ...newAttrs.moreFields?.saleState,
              state: { Active: {} }
            },
            fixedSaleDetails: {
              ...mktSale.data.moreFields.fixedSaleDetails,
              ...newAttrs.moreFields?.fixedSaleDetails
            },
            saleAssets: {
              ...mktSale.data.moreFields.saleAssets,
              ...newAttrs.moreFields?.saleAssets
            },
            threadInfo: {
              ...mktSale.data.moreFields.threadInfo,
              ...newAttrs.moreFields?.threadInfo
            }
          }
        },
        addedUtxoValue: addedTokenValue
      },
      tcx
    );
    return tt;
  }
  async mkTxnAddToMarketSale(mktSale, addedTokenMph, addedTokenName, addedTokenCount, tcx) {
    console.log("\u{1F3D2} adding to mktSale");
    const existingSale = mktSale.data;
    if (!existingSale) {
      throw new Error("mktSale not found");
    }
    const newTnBytes = typeof addedTokenName === "string" ? textToBytes(addedTokenName) : addedTokenName;
    const addedTokenValue = makeValue(
      addedTokenMph,
      newTnBytes,
      BigInt(addedTokenCount)
    );
    console.log("  -- addedTokenValue", dumpAny(addedTokenValue));
    debugger;
    const newTnString = bytesToText(newTnBytes);
    const primaryTnString = "string" === typeof existingSale.moreFields.saleAssets.primaryAssetName ? existingSale.moreFields.saleAssets.primaryAssetName : bytesToText(
      existingSale.moreFields.saleAssets.primaryAssetName
    );
    const isPrimary = addedTokenMph.isEqual(
      existingSale.moreFields.saleAssets.primaryAssetMph
    ) && newTnString == primaryTnString;
    const existingTokensInContract = mktSale.utxo.value.assets.getPolicyTokenQuantity(
      addedTokenMph,
      newTnBytes
    );
    console.log(
      "    -- existingTokensInContract",
      existingTokensInContract
    );
    const previousSaleUnit = existingSale.moreFields.saleAssets.saleUnitAssets;
    console.log("    -- previousSaleUnit", dumpAny(previousSaleUnit));
    const prevSaleUnitCountThisToken = previousSaleUnit.assets.getPolicyTokenQuantity(
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
    const updatedUnitCount = isPrimary ? prevSaleUnitCountThisToken : updatedCount / existingSale.moreFields.saleAssets.totalSaleUnits;
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
    console.log("    -- \u2139\uFE0F  token name", displayTokenName(newTnBytes));
    console.log("    -- \u2139\uFE0F  updatedCount", updatedCount);
    console.log("    -- \u2139\uFE0F  new saleUnitAssets", dumpAny(saleUnitAssets));
    console.log(
      "    -- \u2139\uFE0F  totalSaleUnits",
      existingSale.moreFields.saleAssets.totalSaleUnits
    );
    if (isPrimary) {
      console.log(
        `Primary token is now ${Math.floor(
          Number(updatedCount) / Number(
            existingSale.moreFields.saleAssets.primaryAssetTargetCount
          ) * 1e6
        ) / 1e4}% funded`
      );
    } else {
      if (updatedCount % existingSale.moreFields.saleAssets.totalSaleUnits != 0n) {
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
          id: existingSale.moreFields.threadInfo.saleId,
          mph: addedTokenMph,
          tn: "string" === typeof addedTokenName ? textToBytes(addedTokenName) : addedTokenName
        }),
        updatedFields: {
          moreFields: {
            ...mktSale.data.moreFields,
            saleAssets: {
              ...mktSale.data.moreFields.saleAssets,
              saleUnitAssets
            },
            fixedSaleDetails: {
              ...mktSale.data.moreFields.fixedSaleDetails
            },
            threadInfo: {
              ...mktSale.data.moreFields.threadInfo
            },
            saleState: {
              ...mktSale.data.moreFields.saleState
            }
          }
        },
        addedUtxoValue: addedTokenValue
      },
      tcx
    );
    return this.capo.txnAddGovAuthority(tcx2);
  }
  saleTokenValue(itemDetails, sellingUnitQuantity = 1) {
    return itemDetails.data.moreFields.saleAssets.saleUnitAssets.multiply(
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
  async mkTxnBuyFromMarketSale(mktSale, {
    sellingUnitQuantity,
    delegateActivity
  }, tcxIn) {
    const tokenValuePurchase = this.saleTokenValue(
      mktSale,
      sellingUnitQuantity
    );
    const tcx = tcxIn || this.mkTcx(tcxIn, "buyFromMarketSale");
    const mktSaleData = mktSale.data;
    const mktSaleObj = mktSale.dataWrapped;
    const thisPurchaseAt = tcx.txnTime;
    const pCtx = {
      prevSale: mktSaleObj,
      now: thisPurchaseAt,
      unitCount: BigInt(sellingUnitQuantity)
    };
    console.log("\u{1F3D2} buying from mktSale");
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
    const { lastPurchaseAt: prevPurchaseAt } = mktSaleData.moreFields.saleState.progressDetails;
    debugger;
    const tcx2 = tcx.validFor(
      5 * 60 * 1e3
      // 5 minutes
    );
    const paymentUtxo = await this.uh.findActorUtxo(
      "token-purchase payment",
      this.uh.mkValuePredicate(pmtLovelace, tcxIn),
      {
        exceptInTcx: tcx
      }
    );
    if (paymentUtxo) {
      tcx2.addInput(paymentUtxo);
    } else {
      throw new Error("no payment utxo found");
    }
    const { chunkUnitCount, chunkUnitsSold } = mktSale.data.moreFields.saleState.progressDetails;
    const activity = delegateActivity ?? this.activity.SpendingActivities.SellingTokens({
      id: mktSale.data.id,
      sellingUnitQuantity: BigInt(sellingUnitQuantity),
      salePrice: makeValue(this.ADA(unitPrice))
    });
    return this.mkTxnUpdateRecord(
      "buy from MarketSale",
      mktSale,
      {
        activity,
        addedUtxoValue,
        updatedFields: this.mkUpdatedDetails(mktSaleData, {
          // state: "Active",
          moreFields: {
            ...mktSaleData.moreFields,
            saleState: {
              ...mktSaleData.moreFields.saleState,
              progressDetails: this.mkUpdatedProgressDetails({
                lastPurchaseAt: thisPurchaseAt.getTime(),
                prevPurchaseAt,
                chunkUnitCount,
                chunkUnitsSold: chunkUnitsSold + BigInt(sellingUnitQuantity)
              }),
              salePace: nextSalePace
            }
          }
          // prevSaleAt: mktSale.datum.lastSaleAt,
          // weightedPace:
          // this.computeWeightedPace(
          //  mktSale,  thisSaleAt
          // ) lastSaleAt, prevSaleAt, weightedPace => + X
        })
      },
      tcx2
    );
  }
  /**
   * mockable method for updating sale data, called during mkTxnBuyFromMarketSale
   */
  mkUpdatedDetails(msd, pmsd) {
    return pmsd;
  }
  /**
   * mockable method for updating progress details for a sale, called during mkTxnBuyFromMarketSale
   */
  mkUpdatedProgressDetails({
    lastPurchaseAt,
    prevPurchaseAt,
    chunkUnitCount,
    chunkUnitsSold
  }) {
    return {
      lastPurchaseAt,
      prevPurchaseAt,
      chunkUnitCount,
      chunkUnitsSold
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
        purpose: "Handles the creation and management of market sales, supporting many contextual use-cases in which tokens are offered for purchase",
        details: [
          "Ensures that market sales are created with the correct details and managed properly throughout their lifecycle",
          "This package of requirements is not (yet) well labeled for consumption (WIP)"
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
          "Splits the sale into chunks for scaling"
        ]
      },
      "it's created with key details of a sale": {
        purpose: "Supports accurate administration of the sale process",
        details: [],
        mech: [
          "has expected labels and other high-level details",
          "has initial timestamps",
          "has key details of price, sale-sizes and token to be sold"
        ],
        requires: []
      },
      "participates in the Txf protocol for getting paid": {
        purpose: "Gives the sale assurance of receiving funds, without having to hold the funds",
        details: [
          "Captures an expected destination for the amount people pay for tokens",
          "During a sale, it checks that the destination (a delegate's UUT) is participating as a Txf receiver",
          "See more elsewhere about the Txf protocol"
        ],
        mech: [
          "can seal the Txf setup in the 'txfFundsTo' field if the receiver is participating",
          "won't seal the funds-receiver without the receiver's participation",
          "requires the gov authority to seal the Txf for funds",
          "requires the Txf funds-receiver's participation during a sale, if so configured"
        ]
      },
      "participates in the Txf protocol for distributing the tokens": {
        purpose: "Allows other contract-script collaborators to be assured of being a custodian of the tokens",
        details: [
          "Captures an expected destination for the tokens sold",
          "During a sale, it checks that the destination (a delegate's UUT) is participating as a Txf receiver",
          "See more elsewhere about the Txf protocol"
        ],
        mech: [
          "can seal the Vxf setup in the 'vxfTokensTo' field if the receiver is participating",
          "won't seal the tokens-receiver without the receiver's participation",
          "requires the gov authority to seal the Vxf for tokens",
          "requires the Vxf tokens-receiver's participation during a sale, if so configured"
        ]
      },
      "Activity:AddTokens allows additional tokens to be added to a Pending mktSale": {
        purpose: "Manages the addition of tokens to a pending market sale",
        details: [
          "Ensures that tokens can be added to a pending sale under the correct conditions"
        ],
        mech: [
          "can AddTokens to a Pending sale",
          "can't add non-primary tokens if the sale-assets aren't even",
          "requires the gov authority to AddTokens"
        ],
        requires: []
      },
      "has a state machine for sale lifecycle": {
        purpose: "Manages the state transitions of a market sale",
        details: [
          "Ensures that market sales transition through the correct states during their lifecycle"
        ],
        mech: [
          "starts in Pending state",
          "moves to Active state when ActivatingSale"
        ],
        requires: []
      },
      "Will sell its tokens when conditions are right": {
        purpose: "Handles the sale of tokens under the correct conditions",
        details: [
          "Ensures that tokens are sold only when the conditions are met"
        ],
        mech: [
          "doesn't sell while state is Pending",
          "doesn't sell tokens before the start date",
          "won't sell more than singleBuyMaxUnits, or less than 1 unit",
          "sells tokens when Active and in the selling period",
          "won't sell tokens from a sale chunk less than 10 minutes old"
        ],
        requires: []
      },
      "updates appropriate sale details as a result of each sale": {
        purpose: "Updates the sale details after each sale",
        details: [
          "Ensures that the sale details are updated correctly after each sale"
        ],
        mech: [
          "updates the timestamps and units-sold",
          "fails if it changes the settings or unit-counts",
          "updates the stratState's sellingPace field",
          "fails without the correct next dynamicPace"
        ],
        requires: []
      },
      "Splits the sale into chunks for scaling": {
        purpose: "Manages the splitting of sales into chunks for better scaling",
        details: [
          "Ensures that sales can be split into smaller chunks for better management and scaling"
        ],
        mech: [
          "splits a chunk from the root sale record",
          "will split a new chunk from an immature chunk",
          "won't split a chunk that's aged into maturity",
          "won't create a split chunk smaller than the minSaleSize",
          "sets correct details for the new chunk",
          "won't split off a child chunk without correct updates to the parent"
        ],
        requires: []
      }
    });
  }
  mkDataWrapper(data) {
    return new MarketSaleDataWrapper(data, this, this.capo);
  }
}

export { MarketSaleController, StellarTokenomicsCapo };
//# sourceMappingURL=stellar-tokenomics.mjs.map
