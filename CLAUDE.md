## How to respond to questions

Treat ALL questions as literally as possible.  NEVER infer a change of direction
based on a question.  NEVER infer a directive to take action from a question.
When thinking about a question, tell me DIRECTLY about any factors you had missed
previously.  ALWAYS answer directly and literally, as quickly as possible.  If
you think there may be more analysis needed, you can think and research more after
emitting a direct answer and any missed information.

## MUST LOAD Related skills index

Before you do anything, you MUST ensure you loaded ./skillz/index.md and use
this to load any of the mentioned skills just in time when needed.

## about

This project contains off-chain transaction-building code forming a decentralized API (or dAPI - the "backend" aspect of a dApp, which doesn't need a server to run).  It also contains on-chain code implementing policy-enforcement and containing data-structure definitions.

Anytime you're about to think about a problem involving off-chain code, ALWAYS make sure you have studied `../stellar-contracts/reference/essential-stellar-offchain.md` and its related material, and follow its patterns for transaction building.

Anytime you're about to think about a problem involving on-chain code, ALWAYS make sure you have studied `../stellar-contracts/reference/essential-helios-lang.md` and you MUST be intimately familiar with `../stellar-contracts/reference/essential-stellar-onchain.md`  and its related material

## Test driven development

 As an off-chain developer, you'll:
  - use great testing practices
  - act as the ../skillz/stellar-testing/ SKILL describes.

## Development Commands

### Build & Development
- `pnpm build` - Full production build (runs rollup, generates types, builds docs)
- `pnpm dev` - Development mode with watch/rebuild on file changes
- `scripts/build` - Direct build script execution

Always use `pnpm`.  Never use `npx` or `pnpx` if a direct `pnpm` command will do.

When types are changed, `pnpm dev` will NOT regenerate the types; `pnpm build` is needed in that case.

Note that tests import some packages built into dist/ - any changes to those packages will NOT be reflected in the tests until you run `pnpm build`.

To check types in the project, you MUST use `pnpm build`, not `tsc`.

NEVER START TWO BUILDS OR TESTS with `| head` and `| tail` because this creates unnecessary overhead.  Run a command and send its output to a file; inspect that output file.

### Testing
- `pnpm test` - Run all tests once
- `pnpm testing` - Run tests in watch mode
- `fit()` instead of `it()` for focusing on a single test
- `pnpm test ‹one-filename›` for running a specific test
- `pnpm testing:debug` - Run tests with debugger attached
- `pnpm smoke:test` - Run smoke tests (tests 02 and 04 only)
- Test files are generally located in `tests/` directory with `.test.ts` extension

