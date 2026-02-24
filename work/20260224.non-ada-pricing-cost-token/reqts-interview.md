# Requirements Interview: CostToken Denomination

**Interview for**: Work Unit p7k2m9x4q6 (Non-ADA Pricing: CostToken Enum & Pricing Abstraction)
**Participants**: Rex (REQM), Osiris (Onchain Coder), Cwispy (Code Whisperer)
**Date**: 2026-02-24

## Phase 1: New Requirements — CostToken Enum & Helpers

### 1.1: CostToken::ADA variant

**Draft statement**: `CostToken::ADA` MUST represent ADA-denominated pricing with an implicit scale of 6 (1 ADA = 10^6 lovelace). The variant carries no fields.

**Design notes**: ADA is tag 0 (first variant, Helios default). Helpers derive mph/tokenName/scale from ADA's well-known constants. No explicit tag needed.

## Phase 2: Evolved Requirements — Pricing Validation

_Topics 2.1–2.2: isRightPayment cost-token awareness, redeemer Value typing_

## Phase 3: Evolved Requirements — Lifecycle Transition Checks

_Topics 3.1–3.4: UTxO checks for Stopping, Resuming, Retiring, WithdrawingProceeds_
