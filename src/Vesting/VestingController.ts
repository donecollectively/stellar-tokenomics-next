// This is a template file - EJS syntax is used
import { makeTxOutput, makeValue, type Value } from "@helios-lang/ledger";
import {
    Activity,
    DelegatedDataContract,
    hasReqts,
    StellarTxnContext,
    // tagOnly,
    textToBytes,
} from "@donecollectively/stellar-contracts";
import type {
    FoundDatumUtxo,
    AnyDataTemplate,
    hasSeed,
    hasSettingsRef,
    minimalData,
} from "@donecollectively/stellar-contracts";

import GenericVestingBundle from "./Vesting.generic.hlb.js";
import type { ErgoVestingData, VestingData, VestingDataLike } from "./Vesting.generic.typeInfo.js";
import VestingPolicyDataBridge, { VestingStateHelper } from "./Vesting.generic.bridge.js";
import AbstractVestingBundle from "./Vesting.abstractBundle.js";

export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any>
        ? T[K]
        : T[K] extends Record<any, any>
        ? Partial<T[K]>
        : T[K];
}>;

export type minimalVestingData = minimalData<ErgoVestingData>;

export type partialMinimalData<T extends AnyDataTemplate<any, any>> =
    PartialPartialData<minimalData<T>>;

export class VestingController extends DelegatedDataContract<
    VestingData,
    VestingDataLike
> {
    dataBridgeClass = VestingPolicyDataBridge;

    scriptBundle() {
        const capoBundle = this.capo!.scriptBundle()!.constructor as any;

        return AbstractVestingBundle.usingCapoBundleClass(
            capoBundle
        ).create();
    }
    idPrefix = "vest";

    get delegateName() {
        return "vestingDgt";
    }

    get recordTypeName() {
        return "vesting";
    }

    exampleData(): minimalVestingData {
        return {
            beneficiary: {                
                RelativeLink: {
                    link: {
                        config: textToBytes("{}"),
                        uutName: "member-XXX",
                        delegateValidatorHash: undefined                        
                    },
                    vxfActivity: undefined
                }
            },
            ownerToken: textToBytes("member-YYY"),            
            state: {Initializing: {}},

            vestingDetails: {
                StraightLine: {
                    totalValue: makeValue(100_000n),
                    fullMaturity: Date.now() + 365 * 24 * 60 * 60 * 1000,
                    vestingStart: Date.now(),
                    frequency: { Interval: {
                        interval: BigInt(30 * 24 * 60 * 60 * 1000),
                        count: 36n,
                    }},
                    vestingProgress: {
                        lastPartialMaturity: Date.now(),
                        vestedValue: makeValue(0n),
                        vestedFreqUnits: 0.0,
                    }
                }
            }
        }
    }

    async mkTxnCreatingVesting(
        this: VestingController,
        recData: minimalVestingData,
        // initialVaultStake: bigint
    ) {
        const mintDelegate = await this.capo.getMintDelegate();

        // const tcx = await this.capo.mkTxnWithMemberInfo();
        return this.mkTxnCreateRecord(
            {
                activity:
                    this.activity.MintingActivities.$seeded$CreatingRecord,
                data: {
                    ...recData,
                    // memberToken: tcx.state.memberToken.name,
                },
                // addedUtxoValue: makeValue(initialVaultStake),
            },
            // tcx
        );
    }

    // mkTxnActivateVesting(
    //     this: VestingController,
    //     vesting: FoundDatumUtxo<VestingData>,
    //     txnOptions: {
    //         txnDescription?: string;
    //         futureDate?: Date;
    //     } = {},
    // ) {
    //     return this.mkTxnUpdateRecord(
    //         vesting,
    //         {
    //             ...txnOptions,
    //             data: {
    //                 ...txnOptions.data,
    //                 state: {Active: {}}
    //             }
    //         }
    //     );
    // }

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
