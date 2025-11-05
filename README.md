# Stellar Tokenomics

This repository provides smart contracts for the Stellar tokenomics project

Please use `pnpm` version 10, not `npm`.  

### Goals

Support key economic use-cases for projects wanting to issue `$projectTokens`.

Enable key ways of using tokens, that unlock projects' ability to sell $projectTokens

Each project using this code is responsible for its own compliance issues, and for 
ensuring they way they use this code is appropriate given their jurisdiction, 
audiences, moment in their project's maturity path, and other factors.

No warranty of suitability or fitness for any purpose is provided.

## Using Stellar Tokenomics

1. Audit the code to verify it works the way you would want.

2. Use Node v20 or better.

3. Install the package as a dependency, using a github: url
```
pnpm add donecollectively/stellar-tokenomics#semver:^0.8.0-beta.8
```
... or the version appropriate for your needs.

4. import and Subclass the StellarTokenomicsCapo

```
import { StellarTokenomicsCapo } from "stellar-tokenomics"
```

5.  Get help if you need it.

Visit ODIN for getting help.  https://www.odin.eco/


## Developing in this project

 1.  ensure `pnpm` is installed, and that you have NodeJS version 18 (we like `nvm` 
  to help with that).

 2. To get started, first install the dependencies:

  ```bash
  pnpm install
  cp .env.example .env.local
  ```
  3. Use `pnpm testing` to run automated tests, or `pnpm testing:debug` for watch mode.

  4. Please add requirements and tests to go with your changes.

  5. To do co-development with changes in stellar-contracts, see pnpm-workspace.yaml.dev for a recipe.


