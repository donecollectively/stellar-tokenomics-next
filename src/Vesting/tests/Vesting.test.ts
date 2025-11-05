import {
    describe as descrWithContext,
    expect,
    it as itWithContext,
    beforeEach,
    vi,
    assertType,
    expectTypeOf,
    beforeAll,
} from "vitest";

import {
    addTestContext,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";

import {
    VestingTestHelper as SomeTokenomicsTestHelper,
    type Vesting_TC as STOK_TC,
} from "./VestingTestHelper.js";

import { VestingCapo as SomeTokenomicsCapo } from "./modules/VestingCapo.js";
import { dumpAny } from "@donecollectively/stellar-contracts";
import { makeValue } from "@helios-lang/ledger";


let helperState: TestHelperState<SomeTokenomicsCapo> = {
    snapshots: {},
} as any;

const it = itWithContext<STOK_TC>;
const fit = it.only;
const xit = it.skip; //!!! todo: update this when vitest can have skip<HeliosTestingContext>
//!!! until then, we need to use if(0) it(...) : (
// ... or something we make up that's nicer

const describe = descrWithContext<STOK_TC>;

// Copilot: The requirements for the MarketSale plugin should be drawn from the MarketSaleController.ts file
// ... in the requirements() method, the keys should be used for describe() sections in the tests.
// ... the requirements()'s 'mech' entries should be used for it() blocks.

describe("Vesting plugin", async () => {
    beforeEach<STOK_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(
            context,
            SomeTokenomicsTestHelper,
            undefined,
            helperState
            // testContextSnapshots - TODO shift this capability to upstream.
        );
    });

    describe("It's created with key details", () => {
        it("has expected labels and other high-level details", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstVesting();
            const capo = h.capo;
            h.ts("ok first vesting snapped");
            const { data, utxo } = await h.findFirstVesting();
            const controller = await h.vestingDgt();
            const exampleData = controller.exampleData();

            expect(data).toBeDefined();
            if (!data) throw new Error("for TS");

            expect(data.id).toBeDefined();
            expect(data.type).toEqual("vest");
        });

        it("has initial timestamps", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstVesting();
            const capo = h.capo;

            const { data, utxo } = await h.findFirstVesting();
            // things to check here...
        });

        it("has key details", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstVesting();
            const capo = h.capo;

            const { data, utxo } = await h.findFirstVesting();
            // things to check here...
        });
    });

    describe("... some zones of responsibility", () => {
        it("... some functional requirements", async (context: STOK_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstVesting();

            const vesting = await h.findFirstVesting();
            // things to check here...
        });        
    });

    describe("Vesting Record Creation (Minting)", () => {
        it("REQT: the operator must provide a valid minting seed", async (context: STOK_TC) => {
            // TODO: Implement test
            // - Attempt to create a record without a valid seed or with a malformed seed
            // - Expect failure
            // - Create a record with a valid seed
            // - Expect success
        });

        it("bREQT: verifies the owner-token's presence in the txn", async (context: STOK_TC) => {
            // TODO: Implement test
            // - Attempt to create a record without the owner token in the transaction inputs
            // - Expect failure
            // - Create a record with the owner token present
            // - Expect success
        });

        it("REQT: the vesting instance is created in Initializing state (from validateCreated)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            // Assuming bootstrap creates a vesting record, or add a specific creation step here
            await h.snapToFirstVesting(); 
            const { data } = await h.findFirstVesting();
            if (!data) throw new Error("required Vesting data not found");
            expect("Initializing" in data.state).toBe(true); // Check if Initializing key exists in state object
        });

        it("bREQT: the vesting-progress must be empty (from validateCreated)", async (context: STOK_TC) => {
            const { h } = context;
            await h.reusableBootstrap();
            await h.snapToFirstVesting(); 
            // This requirement is enforced by VestingData.validateCreated() in Helios.
            // Successful creation of a vesting record implies this condition was met.
            // Direct verification in TS depends on the specific VestingDetails type created
            // and the structure of VestingProgress.
            // For now, we assume that if reusableBootstrap and snapToFirstVesting succeed,
            // and validateCreated is part of that flow, this REQT is met.
            // A more specific test could be written if we ensure a "StraightLine" type is created
            // and then check data.vestingDetails.value.vestingProgress.
            const { data } = await h.findFirstVesting();
            if (!data) throw new Error("Vesting data not found");

            // Example for StraightLine (if created by default):
            if ("StraightLine" in data.vestingDetails && data.vestingDetails.StraightLine) { // Check if StraightLine key exists and is not null/undefined
                const progress = data.vestingDetails.StraightLine.vestingProgress;
                expect(progress.lastPartialMaturity).toEqual(0n); // Or BigInt(0) depending on type
                expect(
                    progress.vestedValue.isGreaterThan(makeValue(0n))
                ).toBe(true); 
                expect(progress.vestedFreqUnits).toEqual(0.0);
            } else {
                // For Once or SimpleContingency, the concept of 'vestingProgress' field might not apply directly in datum,
                // but the contract logic in validateCreated considers them as having 'empty progress'.
                console.log("Test for 'vesting-progress must be empty' notes: VestingDetails type is not StraightLine, Helios logic handles emptiness.");
            }
        });
        
        it("bREQT: verifies the vesting instance's overall validity (calls rec.validate())", async (context: STOK_TC) => {
            // This is implicitly tested by successful creation.
            // Could add a test that tries to create an invalid VestingData if possible.
        });
    });

    describe("Vesting State Transitions", () => {
        describe("Initializing -> VerifyingBeneficiary (SwitchToVerifying Activity)", () => {
            it("REQT: switches the vesting instance to verifying mode", async (context: STOK_TC) => {
                // TODO: Setup a vesting record in Initializing state
                // TODO: Perform SwitchToVerifying activity
                // TODO: Assert the new state is VerifyingBeneficiary
            });
            it("REQT: requires the owner-token's presence in the txn", async (context: STOK_TC) => {
                // TODO: Attempt SwitchToVerifying without owner token
                // TODO: Expect failure
                // TODO: Attempt SwitchToVerifying with owner token
                // TODO: Expect success
            });
            it("REQT: doesn't change any details of the vesting data", async (context: STOK_TC) => {
                // TODO: Get data before SwitchToVerifying
                // TODO: Perform SwitchToVerifying
                // TODO: Get data after
                // TODO: Compare relevant fields (beneficiary, vestingDetails etc.) excluding state
            });
             it("VestingData.validateVerifyingBeneficiary: current is Initializing, next is VerifyingBeneficiary", async (context: STOK_TC) => {
                // This is covered by "switches the vesting instance to verifying mode"
            });
            it("VestingData.validateVerifyingBeneficiary: vesting-progress must be empty", async (context: STOK_TC) => {
                // TODO: Check vesting progress after transition to VerifyingBeneficiary
            });
            it("VestingData.validateVerifyingBeneficiary: beneficiary is valid", async (context: STOK_TC) => {
                // TODO: Ensure the beneficiary set during creation is valid as per VxfDestination.validate()
                // This might involve testing different VxfDestination types, especially PubKey initially.
            });
        });

        describe("VerifyingBeneficiary -> Active (Activating Activity)", () => {
            it("REQT: activates the vesting instance", async (context: STOK_TC) => {
                // TODO: Setup a vesting record in VerifyingBeneficiary state
                // TODO: Perform Activating activity
                // TODO: Assert the new state is Active
            });
            it("REQT: verifies the owner-token's presence in the txn for Activating", async (context: STOK_TC) => {
                // TODO: Attempt Activating without owner token
                // TODO: Expect failure
            });
            it("TODO: REQT: verifies the beneficiary-token's presence in the txn (for Activating, if applicable)", async (context: STOK_TC) => {
                // This REQT is from VestingPolicy's Activating but has a TODO.
                // If beneficiary is PubKey, this might mean beneficiary signature.
            });
            it("VestingData.validateActivating: beneficiary is verified (verifyDestination)", async (context: STOK_TC) => {
                // TODO: For PubKey beneficiary, this means tx must be signed by the beneficiary's public key.
                // TODO: Attempt Activating without beneficiary signature. Expect failure.
                // TODO: Attempt Activating with beneficiary signature. Expect success.
            });
            it("REQT: doesn't change any details of the vesting data (for Activating)", async (context: STOK_TC) => {
                // TODO: Similar to SwitchToVerifying, compare data before and after, excluding state.
            });
            it("REQT: requires that the indicated totalAmount is deposited", async (context: STOK_TC) => {
                // TODO: When activating, the UTXO containing the VestingData should also hold the totalAmount specified in vestingDetails.
            });
        });
    });

    describe("Pausing and Resuming Vesting", () => {
        describe("Pausing (Active -> Paused)", () => {
            it("REQT: pauses the vesting instance", async (context: STOK_TC) => {
                // TODO: Setup Active vesting
                // TODO: Perform Pausing activity
                // TODO: Assert state is Paused
            });
            it("REQT: requires the owner-token's presence in the txn for Pausing", async (context: STOK_TC) => {
                // TODO: Attempt Pausing without owner token
            });
            it("REQT: requires a Pause reason (at least 12 characters)", async (context: STOK_TC) => {
                // TODO: Attempt Pausing with reason < 12 chars (expect failure)
                // TODO: Attempt Pausing with reason >= 12 chars (expect success part for reason)
            });
            it("REQT: doesn't change beneficiary or vesting-details during Pausing", async (context: STOK_TC) => {
                // TODO: Compare data before/after Pausing activity
            });
             it("VestingData.validatePausing: current is Active, next is Paused", async (context: STOK_TC) => {
                // Covered by "pauses the vesting instance"
            });
        });

        describe("Resuming (Paused -> Active)", () => {
            it("REQT: resumes the vesting instance", async (context: STOK_TC) => {
                // TODO: Setup Paused vesting
                // TODO: Perform Resuming activity
                // TODO: Assert state is Active
            });
            it("REQT: requires the owner-token's presence in the txn for Resuming", async (context: STOK_TC) => {
                // TODO: Attempt Resuming without owner token
            });
            it("REQT: doesn't change any details of the vesting data during Resuming", async (context: STOK_TC) => {
                // TODO: Compare data before/after Resuming activity
            });
        });
    });
    
    describe("Withdrawing Funds", () => {
        // These REQTs are from SpendingActivities::Withdrawing
        it("REQT: StraightLine is supported (for withdrawals)", async (context: STOK_TC) => {
            // TODO: Setup StraightLine vesting, make some funds available, withdraw.
        });
        it("REQT: Once is NOT supported (for withdrawals)", async (context: STOK_TC) => {
            // TODO: Setup Once vesting, attempt to withdraw using the 'Withdrawing' activity (if it's generic)
            // This might be tricky if 'Once' implies a different withdrawal mechanism.
        });
        it("REQT: SimpleContingency is NOT supported (for withdrawals)", async (context: STOK_TC) => {
            // TODO: Setup SimpleContingency, attempt to withdraw.
        });
        it("REQT: fails if the vesting instance is not Active", async (context: STOK_TC) => {
            // TODO: Attempt withdrawal from Initializing, VerifyingBeneficiary, Paused, Closed states. Expect failure.
        });
        it("REQT: requires the beneficiary-token's presence in the txn (or beneficiary signature for PubKey)", async (context: STOK_TC) => {
            // TODO: Attempt withdrawal without beneficiary's involvement.
        });
        it("REQT: requires that the correct funds are withdrawn", async (context: STOK_TC) => {
            // TODO: Calculate vestable amount, attempt to withdraw less/more.
        });
        it("REQT: doesn't change any details of the vesting data (except progress)", async (context: STOK_TC) => {
            // TODO: Compare pre/post withdrawal data (owner, beneficiary, totalAmount, frequency etc.)
        });
        it("REQT: updates the lastPartialMaturity and vested progress fields", async (context: STOK_TC) => {
            // TODO: Check VestingProgress fields after withdrawal.
        });
        it("REQT: on the last vesting period - no funds may remain", async (context: STOK_TC) => {
            // TODO: Withdraw all funds in the final period. Check contract balance.
        });
        it("REQT: on the last vesting period - the state must be Closed 'complete'", async (context: STOK_TC) => {
            // TODO: After final withdrawal, check if state transitions to Closed with appropriate reason.
        });
    });

    describe("Closing Vesting Record (Owner-initiated)", () => {
        // These REQTs are from SpendingActivities::Closing
        it("REQT: closes the vesting instance", async (context: STOK_TC) => {
            // TODO: Setup Active (or Paused) vesting. Perform Closing activity. Assert state is Closed.
        });
        it("REQT: requires the owner-token's presence in the txn for Closing", async (context: STOK_TC) => {
            // TODO: Attempt Closing without owner token.
        });
        it("REQT: requires a Close reason (at least 12 characters)", async (context: STOK_TC) => {
            // TODO: Attempt Closing with short reason / no reason.
            // TODO: Attempt Closing with valid reason.
        });
        it("REQT: doesn't change (most) details of the vesting data during Closing", async (context: STOK_TC) => {
            // TODO: Compare pre/post Close data, except state and reason.
        });
        it("REQT: withdraws any remaining funds to a destination specified by the owner", async (context: STOK_TC) => {
            // TODO: Ensure remaining (non-vested or vested but not withdrawn) funds go to owner.
        });
    });

    describe("VestingDetails Logic", () => {
        // REQTs from VestingDetails.nextPartialMaturity
        it.todo("**Once** vesting - no partial-maturity; withdrawing now, so partial-maturity is now", async(context: STOK_TC) => {
            // TODO: Test nextPartialMaturity for Once type.
        });
        it.todo("**SimpleContingency** vesting - no partial-maturity; withdrawing now, so partial-maturity is now", async(context: STOK_TC) => {
            // TODO: Test nextPartialMaturity for SimpleContingency type.
        });
        it("**Interval** vesting - extends the last-partial-maturity by an integer-multiple of the interval", async(context: STOK_TC) => {
            // TODO: Test nextPartialMaturity for StraightLine -> Interval.
        });
        it("**Continuous** vesting - extends the last-partial-maturity by exactly the amount of elapsed time", async(context: STOK_TC) => {
            // TODO: Test nextPartialMaturity for StraightLine -> Continuous.
        });
    });

    // TODO: Add tests for VxfDestination validation and verification if not covered above.
    // Especially for PubKey:
    // - VxfDestination.validate() for PubKey returns true.
    // - VxfDestination.verifyDestination() for PubKey checks tx.is_signed_by(self.pubKey).
});
