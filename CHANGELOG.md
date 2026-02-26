## [0.9.0-beta.1] — 2026-02-26

### Multi-Currency Support 
- Market sales can now be priced and settled in any Cardano native token, not just ADA
  - Configure CostToken in sale settings: ADA or Other{mph, tokenName, scale}
  - Price calculation, UTxO lookup, and proceeds handling all route through the same abstraction
  - Wrong tokens are not allowed in the payment for tokens: no shitcoins/spam & scam coins

- Sales now support a full pause/resume/retire lifecycle
  - Stop: Active → Paused (governance authority required)
  - Resume: Paused → Active, with defense-in-depth re-validation of datum integrity
  - Update while paused: editable fields only; frozen fields enforced on-chain
  - Retire: Paused → Retired; tokens remain locked, UTxO value preserved within minUtxo tolerance
  - Off-chain builders implemented for all four activities
  - 30+ tests covering happy paths, wrong-state rejections, frozen-field bypass attempts, and gov-authority checks

- Proceeds Withdrawal
  - New WithdrawingProceeds activity lets accumulated funds be withdrawn from a paused or retired sale, with governance approval
  - Sale tokens and UUT remain locked; only the cost token (ADA or native) may leave
