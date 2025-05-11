import {
    CapoTestHelper,
    DefaultCapoTestHelper,
    type StellarTestContext,
    type TestHelperState,
    type TestHelperSubmitOptions,
} from "@donecollectively/stellar-contracts/testing";
import { VestingCapo } from "./modules/VestingCapo.js";
import { makeValue } from "@helios-lang/ledger";
import type {
    VestingData,
    VestingDataLike,
    minimalVestingData,
} from "../Vesting.generic.typeInfo.js";
import {
    textToBytes,
    type FoundDatumUtxo,
    type SubmitOptions,
    type UutName,
} from "@donecollectively/stellar-contracts";
import type { VestingController } from "../VestingController.js";
import { equalsBytes } from "@helios-lang/codec-utils";

export let helperState: TestHelperState<VestingCapo> = {
    snapshots: {},
} as any;

export type Vesting_TC = StellarTestContext<VestingTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: Vesting_TC, snapName: string): void;
    loadSnapshot(this: Vesting_TC, snapName: string): void;
    reusableBootstrap(this: Vesting_TC): Promise<VestingCapo>;
};

export class VestingTestHelper extends DefaultCapoTestHelper.forCapoClass(
    VestingCapo
) {
    get stellarClass() {
        return VestingCapo;
    }

    get capo(): VestingCapo {
        return this.strella;
    }

    async vestingDgt() {
        return (await this.capo.getDgDataController(
            "vesting"
        )) as VestingController;
    }

    @CapoTestHelper.hasNamedSnapshot("firstVesting", "tina")
    async snapToFirstVesting() {
        throw new Error("never called");
        this.firstVesting();
    }

    async firstVesting() {
        this.setActor("tina");
        const controller = await this.vestingDgt();
        const vesting = controller.exampleData();
        return this.createVesting(vesting);
    }

    async createVesting(
        vesting: minimalVestingData,
        options: {
            submit?: boolean;
        } = {}
    ) {
        const { submit = true } = options;

        const vestingDgt = await this.vestingDgt();
        const tcx = await vestingDgt.mkTxnCreateRecord({
            data: vesting,
            // activity: <%= modelName %>Dgt.activity.MintingActivities.{ default = $seeded$CreatingRecord }
        });

        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }

    async findVesting(x: string | UutName) {
        const vestingDgt = await this.vestingDgt();
        const found = await this.capo.findDelegatedDataUtxos({
            type: "vesting",
            id: x,
        });
        return found[0];
    }

    async findFirstVesting() {
        const vestingDgt = await this.vestingDgt();
        const vestings = await vestingDgt.findRecords()
        if (vestings.length > 1) {
            throw new Error("expected only one vesting");
        }
        return vestings[0];
    }

    //Sample "activated" snapshot, with a model using a separate Wrapper class
    // can just remove if not needed
    @CapoTestHelper.hasNamedSnapshot("firstVestingActivated", "tina")
    async snapToFirstVestingActivated() {
        throw new Error("never called");
        this.firstVestingActivated();
    }

    async firstVestingActivated() {
        this.setActor("tina");
        await this.snapToFirstVesting();
        const vesting = await this.findFirstVesting();
        return this.activateVesting(vesting)
    }

    async activateVesting(
        vesting: FoundDatumUtxo<VestingData>,
        txnOptions: {
            txnDescription?: string;
            futureDate?: Date;
        } = {},
        newAttrs: Partial<VestingDataLike> = {}
    ) {
        const { capo } = this;
        const vestingDgt = await this.vestingDgt();
        const { futureDate, txnDescription } = txnOptions;

        if (txnDescription) {
            console.log("  ----- ⚗️ " + txnDescription);
        }

        let remainingNeededTokenCount = 0n;

        const tcx = capo.mkTcx(
                  txnDescription || "activating sale with existing tokens"
        );

        const tcx2 = await vestingDgt.mkTxnActivateVesting(
            vesting,
            {
                ...newAttrs,
            },
            tcx
        );
        return this.submitTxnWithBlock(tcx2, { futureDate });
    }

}
