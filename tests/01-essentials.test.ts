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
    dumpAny,
    StellarTxnContext,
    textToBytes,
    UutName,
} from "@donecollectively/stellar-contracts";

import {
    ADA,
    addTestContext,
    type StellarTestContext,
    StellarNetworkEmulator,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";

import { GenericTokenomicsTestHelper, STOK_TC, helperState } from "./GenericTokenomicsTestHelper.js";
import {
    makeMintingPolicyHash,
    makeTxOutput,
    makeValue,
    TxInput,
    TxOutput,
    Value,
} from "@helios-lang/ledger";

const months = 24 * 60 * 60 * 1000 * 30;

const it = itWithContext<STOK_TC>;
const fit = it.only;
const xit = it.skip; //!!! todo: update this when vitest can have skip<HeliosTestingContext>
//!!! until then, we need to use if(0) it(...) : (
// ... or something we make up that's nicer

const describe = descrWithContext<STOK_TC>;
describe("Basic Tokenomics Capo", async () => {
    beforeEach<STOK_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(
            context,
            GenericTokenomicsTestHelper,
            {
                featureFlags: {
                    artistVault: false,
                    listenerVault: true,
                    nodeOpVault: false,
                    mktSale: false,
                    fundedPurpose: false,
                },
            },
            helperState
            // testContextSnapshots - TODO shift this capability to upstream.
        );
        await context.h.delay(10);
    });

    describe("Minting fungible tokens()", () => {
        it.todo(
            "TEST ME: refuses to mint tokens without gov authority",
            async (context: STOK_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;
                await h.reusableBootstrap();
                await h.snapToFirstMember();
                let { capo } = h;
                throw new Error("test me!");
            }
        );

        it("will mint some fungible tokens, given gov authority", async (context: STOK_TC) => {
            // prettier-ignore
            const {h, h:{network, actors, delay, state} } = context;
            await h.reusableBootstrap();

            let { capo } = h;

            const charterData = await capo.findCharterData();

            const tcx = await capo.txnMintingFungibleTokens(
                capo.mkTcx(),
                textToBytes("GEMS"),
                19n
            );
            await h.submitTxnWithBlock(tcx);
            const { wallet } = h.actorContext;
            const expectedGems = makeValue(
                [capo.mph, textToBytes("GEMS")],
                19n
            );
            const utxos = await wallet?.utxos;
            const gems = utxos?.find((utxo: TxInput) => {
                return utxo.value.isGreaterOrEqual(expectedGems);
            });
            expect(gems).toBeTruthy();
        });


    });
});
