# About MarketSale On-Chain Policy

## MAINTAINERS MUST READ:
> **AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY**
>
> This file is generated from the `.reqts.jsonl` source. To make changes:
> 1. Edit the JSONL source file
> 2. Run `node generate-reqts.mjs` to regenerate
>
> **COMPLIANCE TRIGGER**: Before interpreting these requirements, you **MUST** read:
> `reqt-consumer.SKILL.md`
>
> **hash.notice.reqt-consumer**: 5dddc026e9370dc8

On-chain policy enforcement for the MarketSale delegate. Governs creation, configuration, lifecycle transitions, token selling, and retirement of market sales through validated spending, minting, and burning activities. The policy enforces state machine integrity, data validation, dynamic pricing correctness, and VXF protocol compliance — all on-chain, all immutable once deployed.

The essential technologies are **Helios, Cardano eUTxO, stellar-contracts on-chain framework**. Related technologies include DynamicSaleV1 pricing model, VXF Protocol, stellar-contracts delegation pattern.


# Background

Market sales enable the distribution of token bundles in discrete lots over a specified time period, using an adaptive pricing model that responds to market dynamics. The on-chain policy is the ultimate authority — it enforces all business rules that the off-chain code proposes. Key challenges include:

1. **State machine integrity**: Sales transition through Pending → Active ⇄ Paused, with Paused → Retired/SoldOut, with each transition requiring specific preconditions and authority.
2. **Data consistency**: Sale assets, lot counts, pricing parameters, and progress details must remain consistent across all mutations.
3. **Dynamic pricing**: A real-time pricing model adjusts based on sale progress and buying pace, requiring on-chain validation of pricing calculations.
4. **VXF Protocol**: Funds and tokens must be routed to validated destinations, enforced during sale transactions.
5. **Chunk splitting**: Sales can be split into concurrent chunks for throughput scaling, requiring coordinated state across parent and child records.



# Design Goals

**General Approach**

- Policy-as-law: the on-chain validator is the single source of truth for what mutations are legal
- Activity-based dispatch: each mutation type (SpendingActivity, MintingActivity, BurningActivity) has its own validation path
- REQT traceability: on-chain assertions use REQT() macros for diagnostic output that maps to requirements

**Specific Goals**

1. **Correct state transitions**: Only valid lifecycle transitions are permitted, with appropriate authority checks.
2. **Data integrity across mutations**: Frozen fields stay frozen, editable fields are validated within bounds.
3. **Pricing honesty**: Dynamic pricing calculations are verified on-chain so buyers pay the correct price.
4. **VXF compliance**: Token and fund routing follows the VXF protocol, ensuring custodial assurances.
5. **Extensible activity model**: New activities (Stopping, Resuming, UpdatingPausedSale) can be added without restructuring existing validation.


# Must Read: Special Skills and Know-how

1. **Helios language patterns, stellar-contracts on-chain framework conventions, REQT traceability macros**: When implementing or modifying on-chain validation logic → load `../stellar-contracts/reference/essential-stellar-onchain.md`
2. **Pricing model: progress discounts, dynamic pace, idle decay, price floors/ceilings**: When working with DynamicSaleV1 pricing calculations or settings validation → load `./DynamicSaleV1.hl`
3. **VXF destination sealing, receiver participation, validation rules**: When working with VxfDestination validation or VXF protocol compliance → load `../VxfProtocol/`

# Collaborators



**Expected users:** MarketSale off-chain controller (transaction builders), test suites, future UI components

# Functional Areas and Key Requirements

### 1. Sale Creation
Governs the minting of new MarketSale records with correct initial state, validated data, and identity constraints.

#### Key Requirements:
1. **Sale Creation**: When a new sale is created, it arrives with validated initial state, correct identity, and only the primary asset in the lot bundle — ready for token deposits and configuration

### 2. Data Integrity & Shared Validation
Cross-cutting validation rules that apply across multiple activities: record-level validate(), name constraints, saleAssets consistency, and lot-count divisibility. Referenced by Creation, UpdatingPendingSale, AddTokens, Activating, and future activities.

#### Key Requirements:
1. **Data Integrity & Shared Validation**: Every mutation to a sale record passes through shared validation gates: name length, non-empty assets, lot-count divisibility, and primary asset target consistency

### 3. Sale Lifecycle
Defines the valid states and transitions for a MarketSale record. The state machine is the backbone — every spending activity must respect it.

#### Key Requirements:
1. **Sale Lifecycle**: The sale follows a defined state machine: Pending → Active ⇄ Paused, and Paused → Retired. Each transition requires specific authority and preconditions. Illegal transitions are rejected on-chain.

### 4. Token Management
Governs the AddingToSale activity: depositing tokens into a Pending sale while enforcing even lot distribution and asset consistency.

#### Key Requirements:
1. **Token Management**: Tokens are deposited into a Pending sale in amounts that maintain even lot distribution. The policy enforces divisibility, prevents over-deposit, and requires governance authority. Note: VXF destination configuration also occurs during this phase — see REQT-ywj3w9avvc (VXF Protocol Integration) for destination sealing requirements.

### 5. Pending Sale Configuration
Governs the UpdatingPendingSale activity: modifying sale details while in Pending state, with strict immutability on identity, state, and progress fields.

#### Key Requirements:
1. **Pending Sale Configuration**: While a sale is Pending, its configuration can be freely adjusted — name, pricing settings, asset configuration, VXF destinations — while identity, state, progress details, and thread info remain immutable

### 6. VXF Protocol Integration
Governs how the MarketSale participates in the VXF protocol for routing funds and tokens to validated destinations. Covers destination sealing, validation during state transitions, and enforcement during sales.

#### Key Requirements:
1. **VXF Protocol Integration**: The sale captures where funds and tokens should be routed (vxfFundsTo, vxfTokensTo), validates those destinations during configuration and activation, and enforces routing during actual sales

### 7. Activation
Governs the Activating activity: transitioning a fully-configured Pending sale to Active, with token deposit verification, VXF validation, and authority checks.

#### Key Requirements:
1. **Activation**: When a sale is activated, the policy verifies all tokens are deposited, VXF destinations are valid, the record passes all checks, and governance authority is present — then transitions to Active state

### 8. Sale Progress & Dynamic Pricing
Governs progress tracking (lotsSold, timestamps, pace) and the DynamicSaleV1 pricing model (progress discounts, dynamic pace, price floors). Referenced by SellingTokens and relevant to UpdatingPausedSale (settings are editable while paused).

#### Key Requirements:
1. **Sale Progress & Dynamic Pricing**: Each sale tracks progress (lots sold, timestamps, pace) and uses a dynamic pricing model that adjusts prices based on overall progress pace and short-term buying dynamics — with configurable discounts, floors, and ceilings

### 9. Token Selling
Governs the SellingTokens activity: executing token purchases from an Active sale with correct pricing, progress updates, payment verification, and state constraints.

#### Key Requirements:
1. **Token Selling**: Buyers purchase lots from an Active sale — the policy enforces state, timing, quantity limits, correct pricing, progress updates, and (once implemented) VXF-compliant payment routing

### 10. Paused Sale Management
Governs the Stopping, Resuming, and UpdatingPausedSale activities: temporarily halting an Active sale, modifying configuration while paused, and re-launching. Includes frozen/editable field inventory for paused edits.

#### Key Requirements:
1. **Paused Sale Management**: An Active sale can be temporarily stopped (paused) for configuration changes, then resumed or permanently retired. While paused, certain fields can be edited (name, pricing settings, VXF destinations) while others are frozen (state, progress, assets, startAt, threadInfo)

### 11. Sale Retirement
Governs the Retiring activity: permanently winding down a Paused sale, including token withdrawal/burning and transition to Retired state.

#### Key Requirements:
1. **Sale Retirement**: A paused sale can be permanently retired, transitioning to the Retired state with token withdrawal and burning. Direct Active → Retired is not supported — the sale must be Stopped first, making Paused the deliberation state.

### 12. Chunk Splitting & Scaling
Governs splitting sales into concurrent chunks for throughput scaling: minting child chunks, merging them back, and coordinating state between parent and child records.

#### Key Requirements:
1. **Chunk Splitting & Scaling**: Sales can be split into smaller concurrent chunks to enable parallel selling — each chunk has its own UTxO and progress tracking, coordinated with the parent via thread counters and sale identity

### 13. Proceeds Withdrawal
Governs the WithdrawingProceeds spending activity for extracting accumulated ADA from the sale UTxO. Applicable once funds have accumulated under None-mode vxfFundsTo routing. Valid in Paused, SoldOut, or Retired states.

#### Key Requirements:
1. **Proceeds Withdrawal**: Governance authority can withdraw accumulated ADA from a sale that is Paused, SoldOut, or Retired — with no constraint on withdrawal amount, and tokens must remain locked in the UTxO

### 14. Cost Token Denomination
Governs the denomination of sale pricing — which token buyers pay with. Defines the CostToken enum (ADA vs. Other) in settings, with helpers for scale-aware conversion between Real prices and on-chain Values. Referenced by pricing validation, lifecycle transition UTxO checks, and proceeds withdrawal.

#### Key Requirements:
1. **Cost Token Denomination**: The sale's pricing denomination is configurable via a CostToken enum in settings — ADA by default, with support for non-ADA tokens specifying mph, tokenName, and scale. Helpers convert between Real prices and on-chain Values using the cost token's scale factor.


# Detailed Requirements

## Area 1: Sale Creation

### **REQT-1.0/g2g1x60wpk**: **COMPLETED**/consented: **Sale Creation**
#### Purpose: Governs how new MarketSale records are minted. Applied when reviewing or modifying the CreatingRecord minting activity, or when evaluating what constraints apply to newly-created sale data.

 - 1.1.0: REQT-4zd4jczf3c: **COMPLETED**/consented: **CreatingRecord Activity**
     - 1.1.1: REQT-0m7sg0e84d: **COMPLETED**/consented: **Charter Reference** - CreatingRecord MUST require a charter reference (`cctx.withCharterRef()`).
     - 1.1.2: REQT-y1nj4z3jhg: **COMPLETED**/consented: **Gov Authority** - CreatingRecord MUST require governance authority.
     - 1.1.3: REQT-fqgxgcj2jj: **COMPLETED**/consented: **Pending State Validation** - The created record MUST pass `validateDetailsWhenPending()`, ensuring initial state is Pending with correctly initialized progress details, thread info, and settings.
     - 1.1.4: REQT-9703xjhdxg: **COMPLETED**/consented: **Primary Asset Only on Creation** - The created record's `saleLotAssets` MUST contain only the primary asset — no other tokens may be included at creation time.
 - 1.2.0: REQT-638fe24d5f: **COMPLETED**/consented: **Initial Sale Details**
     - 1.2.1: REQT-kxafp5yvt0: **COMPLETED**/consented: **Identity and Labels** - A created sale MUST have a unique id (derived from seed UUT), type 'mktSale', and a name of at least 10 characters.
     - 1.2.2: REQT-wrea872w6n: **COMPLETED**/consented: **Initial Timestamps** - A created sale MUST have `lastPurchaseAt` and `prevPurchaseAt` initialized to `startAt`, and `lotCount` initialized to `totalSaleLots`.

## Area 2: Data Integrity & Shared Validation

### **REQT-2.0/bw488gep8m**: **COMPLETED**/consented: **Data Integrity & Shared Validation**
#### Purpose: Establishes cross-cutting validation rules that multiple activities rely on. Applied when reviewing any activity that calls validate(), validateDetailsWhenPending(), or checks lot-count divisibility — or when adding a new activity that must inherit these checks.

 - 2.1.0: REQT-bk56aq15zn: **COMPLETED**/consented: **Record-Level Validation (validate())**
     - 2.1.1: REQT-y16j4t955c: **COMPLETED**/consented: **Name Length** - The record's `name` field MUST be at least 10 characters (serialized length).
     - 2.1.2: REQT-egttdcamhg: **COMPLETED**/consented: **Non-Empty Assets** - `saleLotAssets` MUST NOT be empty, `totalSaleLots` MUST be > 0, `singleBuyMaxLots` MUST be > 0 and < `totalSaleLots`, and `primaryAssetTargetCount` MUST be > 0.
     - 2.1.3: REQT-4m66trmpkr: **COMPLETED**/consented: **Primary Asset Target Consistency** - `primaryAssetTargetCount` MUST equal `saleLotAssets[primaryAsset] × totalSaleLots` — the per-lot size times the lot count must produce the target.
 - 2.2.0: REQT-v4j9fxv7ch: **COMPLETED**/consented: **Pending-State Validation (validateDetailsWhenPending())**
     - 2.2.1: REQT-ghwq4n2z47: **COMPLETED**/consented: **Sale Pace Initialized** - When Pending, `salePace` MUST be initialized to 1.0.
     - 2.2.2: REQT-r1gn242egz: **COMPLETED**/consented: **Progress Details When Pending** - When Pending, `lotsSold` MUST be 0, `lastPurchaseAt` and `prevPurchaseAt` MUST equal `startAt`, and `lotCount` MUST equal `totalSaleLots`.
     - 2.2.3: REQT-q1v92hjxwa: **COMPLETED**/consented: **Thread Info When Pending** - When Pending, `parentChunkId` MUST be empty, `saleId` MUST equal the record's id, and `nestedThreads` and `retiredThreads` MUST be 0.
     - 2.2.4: REQT-5x71zzdpgb: **COMPLETED**/consented: **Settings Validation When Pending** - When Pending, `fixedSaleDetails.settings` MUST pass `validateDetailsWhenPending()` — sane bounds on all pricing parameters.
 - 2.3.0: REQT-nfk38zrkrz: **NEXT**/draft: **Cross-Cutting State Transition Validations**
     - 2.3.1: REQT-yy15shmtwb: **NEXT**/draft: **Datum Fields Unchanged** - State-only transitions MUST leave all datum fields unchanged except the state field.
     - 2.3.2: REQT-hk93w5zb16: **NEXT**/draft: **UTxO Token Assets Unchanged** - State-only transitions MUST verify that the UTxO token assets (non-ADA) do not change — no token movement during the transition. ADA (lovelace) MAY shift within a 1 ADA tolerance to accommodate minUtxo adjustments caused by datum CBOR encoding size changes when the state field changes.
     - 2.3.3: REQT-kjbw4p63hf: **NEXT**/draft: **Tokens Remain in UTxO** - State-only transitions MUST NOT move or burn tokens — tokens stay locked in the UTxO. Any token disposal is a separate activity.

## Area 3: Sale Lifecycle

### **REQT-3.0/46gmm6198w**: **NEXT**/draft: **Sale Lifecycle**
#### Purpose: Defines the valid states and transitions for a MarketSale record. Applied when reviewing state transition logic, adding new activities, or auditing that illegal transitions are rejected.

 - 3.1.0: REQT-j12bhjzrxp: **COMPLETED**/consented: **Valid States**
     - 3.1.1: REQT-6kdmzqf3nk: **COMPLETED**/consented: **Pending State** - The `Pending` state is the initial state for all newly created sales. Sales remain Pending during configuration and token deposits.
     - 3.1.2: REQT-1whgp2m8jq: **NEXT**/draft: **Active State** - The `Active` state indicates the sale is open for token purchases. Entered via Activating (from Pending) or Resuming (from Paused).
     - 3.1.3: REQT-e7dqc25smj: **NEXT**/draft: **Paused State** - The `Paused` state indicates the sale is temporarily halted. Configuration can be modified while paused. Entered via Stopping (from Active).
     - 3.1.4: REQT-yq3genxzkf: **NEXT**/draft: **Retired State** - The `Retired` state indicates the sale has been permanently wound down. Entered via Retiring (from Paused only — must Stop before Retiring).
     - 3.1.5: REQT-0nnrndkzy2: **FUTURE**/draft: **SoldOut State** - The `SoldOut` state indicates all tokens have been purchased. Transition mechanism TBD.
 - 3.2.0: REQT-1gfsfsxcdh: **COMPLETED**/consented: **Valid Transitions**
     - 3.2.1: REQT-t537rnzjz9: **COMPLETED**/consented: **Pending → Active** - Transition via the `Activating` spending activity. MUST require gov authority. See REQT-3h96mdmn5k (Activation).
     - 3.2.2: REQT-fx7m3y1ctf: **NEXT**/draft: **Active → Paused** - Transition via the `Stopping` spending activity. MUST require gov authority. All datum fields except state MUST be unchanged.
     - 3.2.3: REQT-3h96mdmn5k: **NEXT**/draft: **Paused → Active** - Transition via the `Resuming` spending activity. MUST require gov authority. Deposited tokens must still match `saleLotAssets × totalSaleLots`. VxfDestination fields must validate.
     - 3.2.4: REQT-hcagxtdt35: **NEXT**/draft: **Paused → Retired** - Transition via the `Retiring` spending activity. MUST require gov authority. Token withdrawal/burning details apply.
 - 3.3.0: REQT-b2mqxegmvm: **COMPLETED**/consented: **Illegal Transitions**
     - 3.3.1: REQT-7j07yjvpbh: **NEXT**/draft: **No Direct Active → Retired** - Direct transition from Active to Retired MUST be rejected. The sale must be Stopped (Paused) first.
     - 3.3.2: REQT-jdepn901ag: **NEXT**/draft: **No Selling While Paused** - SellingTokens MUST reject transactions when the sale state is Paused.
     - 3.3.3: REQT-w0hvrt4xx8: **NEXT**/draft: **No State Regression from Retired** - Once Retired, no transition back to any other state is permitted.
 - 3.4.0: REQT-d35rbza73j: **COMPLETED**/consented: **State Helper Functions**
     - 3.4.1: REQT-drf4ze11j1: **COMPLETED**/consented: **mustBePending Helper** - `OtherSaleStateV1` MUST provide `mustBePending()` that asserts state == Pending with REQT tracing.
     - 3.4.2: REQT-b2yk2ga4xy: **COMPLETED**/consented: **mustBeActive Helper** - `OtherSaleStateV1` MUST provide `mustBeActive()` that asserts state == Active with REQT tracing.
     - 3.4.3: REQT-a1c1x495x6: **NEXT**/draft: **mustBePaused Helper** - `OtherSaleStateV1` MUST provide `mustBePaused()` that asserts state == Paused with REQT tracing.

## Area 4: Token Management

### **REQT-4.0/qfrahy70dw**: **COMPLETED**/consented: **Token Management**
#### Purpose: Governs the AddingToSale activity for depositing tokens into a Pending sale. Applied when reviewing token deposit logic, lot-count divisibility enforcement, or testing AddTokens scenarios.

 - 4.1.0: REQT-ajad2mdhf5: **COMPLETED**/consented: **AddingToSale Activity**
     - 4.1.1: REQT-8hpbbxf9f2: **COMPLETED**/consented: **Pending State Required** - AddingToSale MUST require both previous and next state to be Pending.
     - 4.1.2: REQT-83ne1xjxwh: **COMPLETED**/consented: **Gov Authority** - AddingToSale MUST require governance authority.
     - 4.1.3: REQT-8gydvpdfrf: **COMPLETED**/consented: **Even Lot Distribution** - The deposited asset total in the UTxO MUST be an even multiple of `totalSaleLots` — ensuring each lot gets the same number of tokens.
     - 4.1.4: REQT-qnp1cs4rdv: **COMPLETED**/consented: **No Over-Deposit** - The deposited asset total MUST NOT exceed `saleLotAssets[asset] × totalSaleLots` — prevents depositing more tokens than planned.
     - 4.1.5: REQT-kxvdv1ac56: **COMPLETED**/consented: **General Validation Passes** - The updated record MUST pass `validate()` and `threadInfo.validateDetailsWhenPending()`.
 - 4.2.0: REQT-kmbd7bwwy8: **COMPLETED**/consented: **Deposit Constraints for Sale Readiness**
     - 4.2.1: REQT-dmjase5q5f: **COMPLETED**/consented: **Non-Primary Token Evenness** - When adding non-primary tokens, the existing `saleLotAssets` MUST already be even (evenly divisible by totalSaleLots) — prevents adding tokens when the bundle is in an inconsistent state.
     - 4.2.2: REQT-yd80rz9kdx: **COMPLETED**/consented: **Primary Token Partial Deposit** - The primary token MAY be partially or fully deposited in a single AddTokens transaction, as long as the deposited amount is an even multiple of `totalSaleLots`.

## Area 5: Pending Sale Configuration

### **REQT-5.0/4pgkmk92t2**: **COMPLETED**/consented: **Pending Sale Configuration**
#### Purpose: Governs the UpdatingPendingSale activity for modifying sale details before activation. Applied when reviewing edit constraints, frozen/editable field logic, or testing Pending-state updates. Note: VXF destination fields are validated during pending updates — see REQT-ywj3w9avvc (VXF Protocol Integration) for validation rules.

 - 5.1.0: REQT-vw60xnp2cm: **COMPLETED**/consented: **UpdatingPendingSale Activity**
     - 5.1.1: REQT-awm703enab: **COMPLETED**/consented: **Pending State Required** - UpdatingPendingSale MUST require both previous and next state to be Pending.
     - 5.1.2: REQT-h0a7mc0trg: **COMPLETED**/consented: **Gov Authority** - UpdatingPendingSale MUST require governance authority.
     - 5.1.3: REQT-x90a87fs1w: **COMPLETED**/consented: **UTxO Token Value Unchanged** - The UTxO's token value (assets) MUST NOT change during an update — no tokens added or removed.
     - 5.1.4: REQT-p0mam5tnbd: **COMPLETED**/consented: **Sale Pace Frozen at 1.0** - `salePace` MUST remain at 1.0 during pending updates — no pace manipulation before activation.
     - 5.1.5: REQT-cvx2qrb5sv: **COMPLETED**/consented: **Thread Info Frozen** - `threadInfo` MUST equal previous — no structural changes during pending edits.
     - 5.1.6: REQT-d8enkc82c7: **COMPLETED**/consented: **Progress Details Validated** - Progress details MUST pass `validateDetailsWhenPending()` — lotsSold == 0, timestamps == startAt, lotCount == totalSaleLots.
     - 5.1.7: REQT-gwqygd9ntx: **COMPLETED**/consented: **Settings Bounds Validation** - Updated `settings` MUST pass `validateDetailsWhenPending()` — sane bounds on all pricing parameters.
     - 5.1.8: REQT-x5ntw4y5mf: **COMPLETED**/consented: **General Validation Passes** - The updated record MUST pass `validate()` and `threadInfo.validateDetailsWhenPending()`.
 - 5.2.0: REQT-3x0fmfejw2: **COMPLETED**/consented: **Primary Asset Change Logic**
     - 5.2.1: REQT-p36f93wy20: **COMPLETED**/consented: **Old Primary Tokens Present** - When old primary tokens exist in the UTxO and the primary asset changes, `saleLotAssets` MUST keep a minimum lot-size for the old primary ≥ depositedTokens / totalSaleLots.
     - 5.2.2: REQT-1qm3dvtqdy: **COMPLETED**/consented: **New Primary in SaleLotAssets** - When old primary tokens exist and the primary asset changes, `saleLotAssets` MUST contain the new primary token.
     - 5.2.3: REQT-p1vqggggec: **COMPLETED**/consented: **No Old Primary Without Deposit** - When no old primary tokens are deposited and the primary asset changes, `saleLotAssets` MUST NOT reference the old primary token.
     - 5.2.4: REQT-xmxrfjrdjk: **COMPLETED**/consented: **Primary Asset Target Consistency** - After any update, `primaryAssetTargetCount` MUST equal `saleLotAssets[primaryAsset] × totalSaleLots`.
     - 5.2.5: REQT-jpvcqgq1na: **COMPLETED**/consented: **SaleLotAssets Must Contain Primary** - `saleLotAssets` MUST always contain the primary asset, even if no tokens have been deposited yet.

## Area 6: VXF Protocol Integration

### **REQT-6.0/ywj3w9avvc**: **P1**/draft: **VXF Protocol Integration**
#### Purpose: Governs how the MarketSale participates in the VXF protocol for routing funds and tokens to validated destinations. Applied when reviewing destination configuration, validation during state transitions, or enforcement during sales — or when adding a new activity that touches VXF fields.

 - 6.1.0: REQT-9v1dz5dsn9: **P1**/draft: **VXF Destination Configuration**
     - 6.1.1: REQT-v3vjh5njnd: **P1**/draft: **Seal vxfTokensTo** - The sale MUST allow sealing a `VxfDestination` into the `vxfTokensTo` field, provided the VXF receiver is participating in the transaction.
     - 6.1.2: REQT-9ae13swvwy: **P1**/draft: **Seal vxfFundsTo** - The sale MUST allow sealing a `VxfDestination` into the `vxfFundsTo` field, provided the VXF receiver is participating in the transaction.
     - 6.1.3: REQT-9xhare9c1a: **P1**/draft: **Sealing Requires Gov Authority** - Sealing either VXF destination MUST require governance authority.
     - 6.1.4: REQT-7wfa7b7x3t: **P1**/draft: **Sealing Requires Receiver Participation** - Sealing MUST NOT succeed without the VXF receiver's participation in the transaction — the receiver's UTxO must be present.
 - 6.2.0: REQT-w6e5qsfxq1: **NEXT**/draft: **VXF Destination Validation on State Transitions**
     - 6.2.1: REQT-x3xkgwp94t: **DEPRECATED**/evolved: **Activating Requires vxfFundsTo** - SUPERSEDED by REQT-1h49829nsx (None-mode). Previously: Activating MUST validate that vxfFundsTo is present (Some) and passes VxfDestination.validate(). A sale MUST NOT activate without a configured funds destination.
     - 6.2.2: REQT-d67c29t29w: **DEPRECATED**/evolved: **Activating Validates vxfTokensTo If Present** - SUPERSEDED by REQT-88cfkdj7p2 (None-mode). Previously: Activating MUST validate vxfTokensTo if present (Some). If None, activation proceeds without token routing constraints.
     - 6.2.3: REQT-g563tb3ks1: **DEPRECATED**/evolved: **Pending Update Validates VXF If Present** - SUPERSEDED by REQT-1h49829nsx, REQT-88cfkdj7p2 (None-mode). Previously: UpdatingPendingSale MUST validate vxfTokensTo and vxfFundsTo if present (Some).
     - 6.2.4: REQT-6z88fg6j2s: **NEXT**/draft: **Paused Update Validates VXF If Present** - `UpdatingPausedSale` MUST validate `vxfTokensTo` and `vxfFundsTo` if present (Some), using the same validation as pending updates.
     - 6.2.5: REQT-jkbaba8n7n: **NEXT**/draft: **Resuming Validates VXF** - `Resuming` MUST validate `vxfTokensTo` (if present) and `vxfFundsTo` (required) — the same checks as Activating, since the sale is re-entering Active state.
 - 6.3.0: REQT-3g0gz0gdkd: **P1**/draft: **VXF Enforcement During Sale**
     - 6.3.1: REQT-tyqn2xp802: **P1**/draft: **Route Funds Per vxfFundsTo** - When vxfFundsTo is Some, SellingTokens MUST route payment per the VXF destination. While None-mode is active (REQT-2vmbpk5xw7), funds accumulate to the sale UTxO per REQT-wh3kjtwmj9.
     - 6.3.2: REQT-panxb0gcyv: **P1**/draft: **Route Tokens Per vxfTokensTo** - When `SellingTokens` and `vxfTokensTo` is configured (Some), purchased tokens MUST be routed to the configured VXF destination rather than directly to the buyer.
     - 6.3.3: REQT-mn6ffsd5j8: **P1**/draft: **Receiver Participation During Sale** - When `SellingTokens` with a configured VXF destination, the receiver's participation MUST be verified in the transaction — if so configured.
 - 6.4.0: REQT-2vmbpk5xw7: **NEXT**/draft: **VXF None-Mode Enforcement**
     - 6.4.1: REQT-1h49829nsx: **NEXT**/draft: **vxfFundsTo Must Be None** - All activities (Activating, UpdatingPendingSale, UpdatingPausedSale, Resuming, SellingTokens) MUST reject the transaction when `vxfFundsTo` is not None.
     - 6.4.2: REQT-88cfkdj7p2: **NEXT**/draft: **vxfTokensTo Must Be None** - All activities (Activating, UpdatingPendingSale, UpdatingPausedSale, Resuming, SellingTokens) MUST reject the transaction when `vxfTokensTo` is not None.
     - 6.4.3: REQT-wh3kjtwmj9: **NEXT**/draft: **Funds Accumulate to Sale UTxO** - When `vxfFundsTo` is None, funds received during SellingTokens MUST accumulate to the mktSale UTxO.
     - 6.4.4: REQT-nnxpz49srs: **NEXT**/draft: **Tokens Sent to Buyer** - When `vxfTokensTo` is None, purchased tokens MAY be sent anywhere — the buyer receives tokens directly with no on-chain routing constraint.

## Area 7: Activation

### **REQT-7.0/vwec81eepz**: **COMPLETED**/consented: **Activation**
#### Purpose: Governs the Activating spending activity that transitions a fully-configured Pending sale to Active. Applied when reviewing activation preconditions, token deposit verification, or testing the Pending → Active transition.

 - 7.1.0: REQT-1hkdfqvqff: **COMPLETED**/consented: **Activating Activity**
     - 7.1.1: REQT-cysrvb2b6f: **COMPLETED**/consented: **State Transition** - Activating MUST require previous state == Pending and next state == Active.
     - 7.1.2: REQT-f7m51tgbf0: **COMPLETED**/consented: **Gov Authority** - Activating MUST require governance authority.
     - 7.1.3: REQT-avxdr3ycqc: **COMPLETED**/consented: **Name Unchanged** - Activating MUST verify that `name` has not changed from the previous record.
     - 7.1.4: REQT-m7yz0yd80v: **COMPLETED**/consented: **Token Deposit Verification** - The UTxO MUST contain exactly `saleLotAssets × totalSaleLots` in token value (excluding the UUT). The full supply of tokens must be deposited before activation.
     - 7.1.5: REQT-4z5dkz9p2p: **NEXT**/draft: **VXF Validation** - Activating MUST enforce VXF None-mode per REQT-1h49829nsx (vxfFundsTo must be None) and REQT-88cfkdj7p2 (vxfTokensTo must be None).
     - 7.1.6: REQT-8ptt7tvth7: **COMPLETED**/consented: **Thread Info Structural Integrity** - Activating MUST verify `threadInfo` passes `validateDetailsWhenPending()` — structural fields (parentChunkId, saleId, nestedThreads, retiredThreads) are validated. Note: `chunkForkedAt` is excluded from this check and is freshened separately (REQT-apddgwqy9q).
     - 7.1.7: REQT-wt32kvjm9f: **COMPLETED**/consented: **General Validation Passes** - The activated record MUST pass `validate()`.
     - 7.1.8: REQT-apddgwqy9q: **NEXT**/draft: **chunkForkedAt Freshened at Activation** - Activating MUST set `chunkForkedAt` to the current time — freshening the chunk timestamp so the 10-minute maturity window (REQT/8sg001m18m) starts from when selling becomes possible, not from creation.
     - 7.1.9: REQT-stf3bz3fkk: **NEXT**/draft: **Progress Timestamps Freshened at Activation** - Activating MUST set `lastPurchaseAt` and `prevPurchaseAt` to the current time — syncing the progress baseline so dynamic pricing and pace calculations start from activation, not from the configured `startAt`.
 - 7.2.0: REQT-mgpyjxrhhw: **COMPLETED**/consented: **Activation Rejection Cases**
     - 7.2.1: REQT-wragmsgcr7: **COMPLETED**/consented: **Missing Extra Tokens** - Activation MUST fail if `saleLotAssets` expects tokens (e.g., bundled non-primary tokens) that aren't deposited in the UTxO.
     - 7.2.2: REQT-8qbbvqg5kq: **COMPLETED**/consented: **Indivisible Primary Tokens** - Activation MUST fail if `primaryAssetTargetCount` is not evenly divisible by lot count, or if deposited primary tokens aren't evenly divisible.
     - 7.2.3: REQT-g0638e8rje: **COMPLETED**/consented: **Indivisible Non-Primary Tokens** - Activation MUST fail if deposited non-primary tokens aren't evenly divisible by lot count.
     - 7.2.4: REQT-0sa1x0aj4z: **DEPRECATED**/evolved: **Invalid VXF Destination** - SUPERSEDED by REQT-1h49829nsx (None-mode). Previously: Activation MUST fail if vxfFundsTo does not validate or is missing.

## Area 8: Sale Progress & Dynamic Pricing

### **REQT-8.0/dn7s46r8qc**: **COMPLETED**/consented: **Sale Progress & Dynamic Pricing**
#### Purpose: Governs progress tracking and the DynamicSaleV1 pricing model. Applied when reviewing how sale progress is recorded, how pricing adjusts in response to pace, or when modifying pricing parameters (including while Paused). Key context for understanding the pricing impact of pausing — see REQT-fx7m3y1ctf (Active → Paused) and advisory notes in the work unit.

 - 8.1.0: REQT-jxfes3k49y: **COMPLETED**/consented: **Progress Detail Updates**
     - 8.1.1: REQT-zh5wt22z3z: **COMPLETED**/consented: **Lots Sold Increment** - After a sale, `lotsSold` MUST equal `previous.lotsSold + lotsPurchased`.
     - 8.1.2: REQT-jv32bcphjc: **COMPLETED**/consented: **Timestamp Rotation** - After a sale, `lastPurchaseAt` MUST be set to the current time range start, and `prevPurchaseAt` MUST be set to the previous `lastPurchaseAt`.
     - 8.1.3: REQT-ea0ty9p998: **COMPLETED**/consented: **Lot Count Unchanged** - After a sale, `lotCount` MUST remain unchanged from the previous value.
     - 8.1.4: REQT-w0pdvs7e7e: **COMPLETED**/consented: **Settings and Lot Counts Immutable During Sale** - SellingTokens MUST reject any change to `settings` or lot-count fields — only progress details and pace may update.
 - 8.2.0: REQT-6phpvpm67w: **COMPLETED**/consented: **Dynamic Pace Tracking**
     - 8.2.1: REQT-1eevay82t3: **COMPLETED**/consented: **Pace Update on Sale** - After each sale, `salePace` MUST be updated to reflect the new dynamic pace as computed by the DynamicSaleV1 pricing strategy.
     - 8.2.2: REQT-rabdpg7hjk: **COMPLETED**/consented: **Incorrect Pace Rejected** - SellingTokens MUST reject transactions where the next `salePace` doesn't match the pricing strategy's computed value.
 - 8.3.0: REQT-xwyp5rq40j: **COMPLETED**/consented: **Pricing Model Validation**
     - 8.3.1: REQT-jdkhmeg463: **COMPLETED**/consented: **Payment Matches Pricing Strategy** - SellingTokens MUST verify that the payment (paidValue) matches `lotSellPrice × lotsPurchased` as determined by the DynamicSaleV1 pricing strategy.
     - 8.3.2: REQT-yrw1e9vjdc: **COMPLETED**/consented: **Pricing Strategy Validates Updated Details** - The pricing strategy MUST validate that the updated sale details (pace, progress) are consistent with its own computations via `validateUpdatedDetails()`.
 - 8.4.0: REQT-eqd2j44phf: **NEXT**/draft: **Settings Editability While Paused**
     - 8.4.1: REQT-b731sye0fz: **NEXT**/draft: **Settings Bounds Validation When Paused** - Updated `settings` while Paused MUST pass the same bounds validation as when Pending — `validateDetailsWhenPending()` applies (the function name is misleading; the checks are state-independent sane bounds).

## Area 9: Token Selling

### **REQT-9.0/09dszn7mjs**: **COMPLETED**/consented: **Token Selling**
#### Purpose: Governs the SellingTokens spending activity for executing token purchases. Applied when reviewing sale execution logic, state constraints, purchase limits, or payment verification. Depends on REQT-dn7s46r8qc (Progress & Pricing) for pricing validation and REQT-ywj3w9avvc (VXF Protocol) for payment routing.

 - 9.1.0: REQT-83a2cgn3m2: **COMPLETED**/consented: **SellingTokens Activity**
     - 9.1.1: REQT-jarm09zdxx: **COMPLETED**/consented: **Active State Required** - SellingTokens MUST require both previous and next state to be Active. Sales MUST NOT execute from Pending, Paused, Retired, or SoldOut states.
     - 9.1.2: REQT-p387p68119: **COMPLETED**/consented: **After Start Date** - SellingTokens MUST reject transactions where the current time range is before `startAt`.
     - 9.1.3: REQT-9fxj7tm96b: **COMPLETED**/consented: **Purchase Quantity Limits** - SellingTokens MUST require `lotsPurchased > 0` and `lotsPurchased <= singleBuyMaxLots`.
     - 9.1.4: REQT-en9bvp16ds: **COMPLETED**/consented: **Progress Update Validation** - SellingTokens MUST validate that progress details are correctly updated per REQT-jxfes3k49y (Progress Detail Updates).
     - 9.1.5: REQT-fkekrst2w6: **COMPLETED**/consented: **Pricing Validation** - SellingTokens MUST validate pricing per REQT-xwyp5rq40j (Pricing Model Validation) — payment must match the pricing strategy's computed price.
     - 9.1.6: REQT-8wtgfdn4tv: **COMPLETED**/consented: **Redeemer Payment Match** - SellingTokens MUST verify that the actual payment (derived from UTxO value changes) matches `lotSellPrice × lotsPurchased` as declared in the redeemer.
 - 9.2.0: REQT-0g9sfw5zg3: **COMPLETED**/consented: **Chunk Maturity Guard**
     - 9.2.1: REQT-8sg001m18m: **COMPLETED**/consented: **10-Minute Maturity Window** - SellingTokens MUST reject sales from a chunk that is less than 10 minutes old (based on `chunkForkedAt`).
 - 9.3.0: REQT-89qspbx64j: **FUTURE**/draft: **Child Chunk Selling While Root Paused**
     - 9.3.1: REQT-5gmjkmqfrw: **FUTURE**/draft: **Root State Check for Child Sales** - When chunk-splitting is implemented, `SellingTokens` on a child chunk MUST require the root sale's UTxO as a reference input and MUST verify the root's state is Active.

## Area 10: Paused Sale Management

### **REQT-10.0/05fzh7rd1q**: **NEXT**/draft: **Paused Sale Management**
#### Purpose: Governs the Stopping, Resuming, and UpdatingPausedSale activities for managing a sale in the Paused state. Applied when reviewing pause/resume lifecycle, frozen/editable field inventory, or testing Paused-state mutations. See REQT-ywj3w9avvc (VXF Protocol) for VXF validation during paused updates and resuming.

 - 10.1.0: REQT-03ff0mfddc: **NEXT**/draft: **Stopping Activity**
     - 10.1.1: REQT-f12d51rvdz: **NEXT**/draft: **State Transition** - Stopping MUST require previous state == Active and next state == Paused.
     - 10.1.2: REQT-mfpstpdjsp: **NEXT**/draft: **Gov Authority** - Stopping MUST require governance authority.
     - 10.1.3: REQT-nxqq219k4r: **NEXT**/draft: **All Fields Unchanged** - All datum fields unchanged except state (Active → Paused); per REQT-yy15shmtwb.
     - 10.1.4: REQT-tx3fyv3eb2: **NEXT**/draft: **UTxO Token Assets Unchanged** - UTxO token assets (non-ADA) unchanged, ADA within 1 ADA tolerance for minUtxo shifts; per REQT-hk93w5zb16.
 - 10.2.0: REQT-qh3qkk8f92: **NEXT**/draft: **Resuming Activity**
     - 10.2.1: REQT-dpkz9kmr81: **NEXT**/draft: **State Transition** - Resuming MUST require previous state == Paused and next state == Active.
     - 10.2.2: REQT-pks8phr4y5: **NEXT**/draft: **Gov Authority** - Resuming MUST require governance authority.
     - 10.2.3: REQT-34yb7jx6tr: **NEXT**/draft: **Token Presence Verification** - Resuming MUST verify that deposited tokens still match `saleLotAssets × totalSaleLots` — the full supply must still be present.
     - 10.2.4: REQT-pypc9vmpfk: **NEXT**/draft: **VXF Validation on Resume** - Resuming MUST validate VXF destinations per REQT-jkbaba8n7n (Resuming Validates VXF) — same checks as Activating since the sale re-enters Active state.
     - 10.2.6: REQT-60azhtn9dy: **NEXT**/draft: **All Fields Unchanged** - All datum fields unchanged except state (Paused → Active); per REQT-yy15shmtwb.
     - 10.2.7: REQT-998waf4mz3: **NEXT**/draft: **UTxO Token Assets Unchanged** - UTxO token assets (non-ADA) unchanged, ADA within 1 ADA tolerance for minUtxo shifts; per REQT-hk93w5zb16.
 - 10.3.0: REQT-b30wn4bdw2: **NEXT**/draft: **UpdatingPausedSale Activity**
     - 10.3.1: REQT-krpj42awmt: **NEXT**/draft: **Paused State Required** - UpdatingPausedSale MUST require both previous and next state to be Paused.
     - 10.3.2: REQT-4svc8tfffy: **NEXT**/draft: **Gov Authority** - UpdatingPausedSale MUST require governance authority.
     - 10.3.3: REQT-ntdbhc1xss: **NEXT**/draft: **UTxO Value Unchanged** - UpdatingPausedSale MUST verify the UTxO token value does not change — no token movement during edits.
 - 10.4.0: REQT-xygjysee4h: **NEXT**/draft: **Frozen Fields While Paused**
     - 10.4.1: REQT-drdfrj7k96: **NEXT**/draft: **Sale Pace Carried Forward** - `salePace` MUST equal previous — carry forward the real dynamic pace, don't reset to 1.0.
     - 10.4.2: REQT-r20vvfdq05: **NEXT**/draft: **Progress Details Frozen** - All four progress detail fields MUST equal previous: `lotsSold`, `lastPurchaseAt`, `prevPurchaseAt`, `lotCount`. Requires a new `validateDetailsWhenPaused()` function.
     - 10.4.3: REQT-9eeh66pcnw: **NEXT**/draft: **SaleAssets Entire Struct Frozen** - The entire `saleAssets` struct MUST equal previous — `saleLotAssets`, `totalSaleLots`, `singleBuyMaxLots`, `primaryAssetMph`, `primaryAssetName`, `primaryAssetTargetCount` are all immutable while paused. The struct is entangled with deposited tokens and purchase history.
     - 10.4.4: REQT-q5wwj273n4: **NEXT**/draft: **StartAt Frozen** - `startAt` MUST equal previous — it's the time anchor for all pacing/pricing calculations. Moving it forward would corrupt `elapsedSaleHours`.
     - 10.4.5: REQT-rg5zyhd2gb: **NEXT**/draft: **ThreadInfo Frozen** - `threadInfo` MUST equal previous — frozen by equality (strictly stronger than structural re-validation).
 - 10.5.0: REQT-d1967hd11e: **NEXT**/draft: **Editable Fields While Paused**
     - 10.5.1: REQT-40n867ecfx: **NEXT**/draft: **Name Editable** - `name` MAY be changed while Paused. MUST still be at least 10 characters (via `validate()`).
     - 10.5.2: REQT-v8t41enngd: **NEXT**/draft: **Settings Editable** - `fixedSaleDetails.settings` MAY be changed while Paused — all pricing parameters (targetPrice, targetedSellingTime, minPrice, maxPrice, pace/discount knobs) are editable with bounds validation per REQT-b731sye0fz.
     - 10.5.3: REQT-917pgbgfpf: **NEXT**/draft: **VXF Destinations Editable** - `vxfTokensTo` and `vxfFundsTo` MAY be changed while Paused, with validation if present per REQT-6z88fg6j2s.

## Area 11: Sale Retirement

### **REQT-11.0/h6wqgc7fat**: **NEXT**/draft: **Sale Retirement**
#### Purpose: Governs the Retiring spending activity for permanently winding down a Paused sale. Applied when reviewing the retirement flow, token withdrawal/burning, or testing the Paused → Retired transition.

 - 11.1.0: REQT-6kg1f7h500: **NEXT**/draft: **Retiring Activity**
     - 11.1.1: REQT-6fb1gwxhvk: **NEXT**/draft: **State Transition** - Retiring MUST require previous state == Paused and next state == Retired.
     - 11.1.2: REQT-3fhy62nx77: **NEXT**/draft: **Gov Authority** - Retiring MUST require governance authority.
     - 11.1.3: REQT-je621r06f7: **NEXT**/draft: **Tokens Remain in UTxO** - Tokens stay locked in UTxO; per REQT-kjbw4p63hf. Token disposal deferred to `CleanupRetired` (FUTURE, REQT-kr9rseqaxf).
     - 11.1.4: REQT-dtpwzjqn9p: **NEXT**/draft: **UTxO Token Assets Unchanged** - UTxO token assets (non-ADA) unchanged, ADA within 1 ADA tolerance for minUtxo shifts; per REQT-hk93w5zb16. Tokens stay locked for future CleanupRetired (FUTURE, REQT-kr9rseqaxf).
     - 11.1.5: REQT-9nsee3zj78: **NEXT**/draft: **All Datum Fields Unchanged** - All datum fields unchanged except state (Paused → Retired); per REQT-yy15shmtwb.
 - 11.2.0: REQT-gexqz64w5d: **FUTURE**/draft: **Broader Retirement (Future)**
     - 11.2.1: REQT-wvfhmzb0bf: **FUTURE**/draft: **No Active Child Chunks on Retire** - When chunk-splitting is implemented, Retiring MUST verify that `retiredThreads == nestedThreads` — all child chunks must be merged/retired before the parent can retire.
     - 11.2.2: REQT-kr9rseqaxf: **FUTURE**/draft: **CleanupRetired Burning** - The `CleanupRetired` burning activity MUST burn the UUT and account for remaining tokens after retirement. Currently stubbed.

## Area 12: Chunk Splitting & Scaling

### **REQT-12.0/gxpr7tjxy4**: **FUTURE**/draft: **Chunk Splitting & Scaling**
#### Purpose: Governs splitting sales into concurrent chunks for throughput scaling. Applied when implementing chunk operations or reviewing the parent/child coordination model. All activities in this area are currently stubbed.

 - 12.1.0: REQT-98ff9d2w1m: **FUTURE**/draft: **SplittingSaleChunkAndBuying**
     - 12.1.1: REQT-2w6sx6etad: **FUTURE**/draft: **Parent Chunk Update** - Splitting MUST spend the parent chunk UTxO with a corresponding spending activity, incrementing `nestedThreads` and withdrawing the child's token allocation.
     - 12.1.2: REQT-9h1y00c098: **FUTURE**/draft: **Child Chunk Identity** - The child chunk MUST have `saleId` pointing to the root sale, `parentChunkId` pointing to the parent chunk, and zero `nestedThreads`/`retiredThreads`.
     - 12.1.3: REQT-fe7a2er1ec: **FUTURE**/draft: **Minimum Split Size** - Splitting MUST NOT create a child chunk smaller than a minimum sale size threshold.
     - 12.1.4: REQT-e7cwtc9hxa: **FUTURE**/draft: **Maturity Guard on Split Source** - Splitting MUST NOT split from a chunk that has aged into maturity (>10 minutes). Only immature chunks can be split.
 - 12.2.0: REQT-w6jee3g0zx: **FUTURE**/draft: **MergingChildChunk**
     - 12.2.1: REQT-5n5dn38npp: **FUTURE**/draft: **Child Burn Required** - Merging MUST burn the child chunk's UUT via `JoiningWithParentChunk` burning activity.
     - 12.2.2: REQT-ecb9p0vf2b: **FUTURE**/draft: **Parent Thread Counter Update** - Merging MUST increment the parent's `retiredThreads` counter.
 - 12.3.0: REQT-vjcyhre037: **COMPLETED**/consented: **Max Sale Size**
     - 12.3.1: REQT-6sa3bf29pc: **COMPLETED**/consented: **Sale Size Limit** - The sale MUST reject creation if the total sale size exceeds the maximum allowed size (enforced by transaction size or policy limits).

## Area 13: Proceeds Withdrawal

### **REQT-13.0/adazrztjma**: **NEXT**/draft: **Proceeds Withdrawal**
#### Purpose: Governs the WithdrawingProceeds spending activity for extracting accumulated ADA from the sale UTxO. Applied when reviewing proceeds management, testing withdrawal scenarios, or auditing that withdrawal only occurs in appropriate sale states.

 - 13.1.0: REQT-czp1jhqgdj: **NEXT**/draft: **WithdrawingProceeds Activity**
     - 13.1.1: REQT-ayvw26q6av: **NEXT**/draft: **Valid States for Withdrawal** - WithdrawingProceeds MUST be valid only when the sale state is Paused, SoldOut, or Retired. All other states MUST reject.
     - 13.1.2: REQT-aexkjfxm2k: **NEXT**/draft: **Gov Authority** - WithdrawingProceeds MUST require governance authority.
     - 13.1.3: REQT-5r79v9b4ht: **NEXT**/draft: **No Constraint on Withdrawal Amount** - WithdrawingProceeds has no constraint on how much of the cost token is withdrawn.
     - 13.1.4: REQT-gy6jd9cjkg: **NEXT**/draft: **Tokens Must Remain** - WithdrawingProceeds MUST only withdraw the cost token (ADA or the token specified by `costToken`). All sale tokens and the record-id UUT MUST remain in the UTxO.
     - 13.1.5: REQT-ykqx9qgh88: **NEXT**/draft: **Datum Fields Unchanged** - WithdrawingProceeds MUST leave all datum fields unchanged.

## Area 14: Cost Token Denomination

### **REQT-14.0/90fsr7px0z**: **NEXT**/draft: **Cost Token Denomination**
#### Purpose: Governs the denomination of sale pricing — which token buyers pay with. Applied when implementing or reviewing pricing validation, lifecycle transition UTxO checks, proceeds withdrawal, or any code path converting between Real prices and on-chain Values.

 - 14.1.0: REQT-nb3v1zg4fv: **NEXT**/draft: **CostToken Enum Definition**
     - 14.1.1: REQT-j7cf4ew85g: **NEXT**/draft: **ADA Variant** - `CostToken::ADA` MUST represent ADA-denominated pricing with an implicit scale of 6 (1 ADA = 10^6 lovelace). The variant carries no fields.
     - 14.1.2: REQT-y5gge63n84: **NEXT**/draft: **Other Variant** - `CostToken::Other` MUST carry `mph: MintingPolicyHash`, `tokenName: ByteArray`, and `scale: Int` fields identifying a non-ADA cost token and its decimal precision.
 - 14.2.0: REQT-4zkj5q4n38: **NEXT**/draft: **CostToken in Settings** - `DynamicSaleV1Settings` MUST include a `costToken: CostToken` field that determines which token buyers pay with. Settings validation MUST reject `CostToken::Other` with `scale` outside the range 1–19.


# Files

- `./MarketSaleData.hl` - Data types, enums (MarketSaleState, MktSaleDetails), validation functions (validate, validateDetailsWhenPending, validateUpdatePendingSale, validateActivating, validateAdding)
- `./MarketSalePolicy.hl` - Policy script: activity enums (SpendingActivity, MintingActivity, BurningActivity), additionalDelegateValidation dispatch, per-activity validation logic

# Implementation Log

> Maintainers MUST NOT modify past entries. Append new entries only.

### Version 0.8.0-beta.10

 - **added**: Added UpdatingPendingSale activity and enhanced AddTokens constraints — UpdatingPendingSale with frozen/editable field logic and primary asset change handling. AddTokens now enforces even lot distribution on deposit. Constrained saleLotAssets to primary-only on creation. Adjusted policies for expressing token bundle/lot contents.
 - **updated**: Enhanced primary asset change logic during pending updates (`REQT-3x0fmfejw2`) — Complex branching for primary asset identity changes: if old tokens exist, maintain minimum lot sizes; if asset changes and no old tokens, remove references to old primary. Target count consistency enforcement added.

### Version 0.8.0-beta.9

 - **added**: Initial implementation of MarketSale creation, activation, selling, and chunk splitting stubs — Sale creation with key details, initial timestamps, price/lot configuration. State machine basics (Pending → Active). SellingTokens with pricing strategy. Chunk splitting and merging stubs. VXF protocol: no constraints on token distribution.

### Version 2.0

 - **added**: Requirements formalization: MarketSale on-chain policy — First formal REQM v3 requirements document for MarketSale on-chain policy. Captured existing implementation as COMPLETED requirements, stubbed activities as FUTURE, and new Pause/Stop/Resume/Retire scope as NEXT. 12 functional areas in narrative lifecycle order.


# Release Management Plan

See `release-management-scope.md` for version criteria and lifecycle management.
