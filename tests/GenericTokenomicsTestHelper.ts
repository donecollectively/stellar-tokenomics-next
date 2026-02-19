import {
    Capo,
    dumpAny,
    StellarTxnContext,
} from "@donecollectively/stellar-contracts";

import {
    ADA,
    addTestContext,
    TestHelperState,
    type StellarTestContext,
    StellarNetworkEmulator,
    NetworkSnapshot,
    DefaultCapoTestHelper,
    CapoTestHelper,
} from "@donecollectively/stellar-contracts/testing";
import { GenericTokenomicsCapo } from "./modules/GenericTokenomicsCapo.js";

export let helperState: TestHelperState<GenericTokenomicsCapo> = {
    snapshots: {},
} as any;
export class GenericTokenomicsTestHelper 
extends DefaultCapoTestHelper.forCapoClass(
    GenericTokenomicsCapo
) {
    get stellarClass() {
        return GenericTokenomicsCapo;
    }

    async setupActors() {
        this.addActor("operator", 1100n * ADA, ... Array(7).fill( 7n * ADA));

        super.setupActors();
        // participants
        this.addActor("pauline", 13n * ADA);
        this.addActor("possum", 120n * ADA);
        this.addActor("pablo", 13n * ADA);

        // a random person
        this.addActor("ralph", 13n * ADA);

        await this.setActor( "operator");
    }
    
    get capo(): GenericTokenomicsCapo {
        return this.strella;
    }

        // @CapoTestHelper.hasNamedSnapshot("firstListenerMember", "lila")
    // async snapToFirstListenerMember() {
    //     throw new Error("never called");
    // }
    // async firstListenerMember() {
    //     await this.setActor("lila");
    //     return this.participantSelfRegisters();
    // }


    @CapoTestHelper.hasNamedSnapshot({
        actor: "pauline",
        parentSnapName: "bootstrapped",
    })
    async snapToFirstMember() {
        throw new Error("never called; see firstMember()");
        return this.firstMember();
    }

    async firstMember() {
        this.setActor("pauline");
        const tcx = await this.capo.mkTxnMintParticipantToken(
            this.wallet.address
        );

        await this.submitTxnWithBlock(tcx);
    }

    async participantSelfRegisters() {
        await this.bootstrap()

        if (this.actorName == "operator") {
            throw new Error("use h.currentActor = '...', to register with a named participant");
        }
        const { capo, wallet } = this;
        console.log("--------------------------- "+this.relativeTs +" Test helper: Create collaborator token");
        const tcx = await capo.mkTxnMintParticipantToken(
            wallet.address
        );

        return this.submitTxnWithBlock(tcx);
    }

}

export type STOK_TC = StellarTestContext<GenericTokenomicsTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: STOK_TC, snapName: string): void;
    loadSnapshot(this: STOK_TC, snapName: string): void;
    reusableBootstrap(this: STOK_TC): Promise<GenericTokenomicsCapo>;
};

// Export pre-wired describe/it - tests import these instead of from vitest
export const { describe, it, fit, xit } = GenericTokenomicsTestHelper.createTestContext();
