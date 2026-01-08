import { DelegatedDataBundle, CapoHeliosBundle } from '@donecollectively/stellar-contracts';
import { V as VestingPolicy_hl, a as VestingData_hl } from '../VestingData.mjs';
import { V as VxfProtocol_hl } from '../VxfProtocol.mjs';
import '@helios-lang/compiler-utils';

class AbstractVestingBundle extends DelegatedDataBundle {
  specializedDelegateModule = VestingPolicy_hl;
  requiresGovAuthority = true;
  // includeFromCapoModules(): string[] {
  //     return [ 
  //         "TieredScale",
  //         "ArtistVaultData"
  //     ]
  // }
  get modules() {
    return [
      ...super.modules,
      VestingData_hl,
      VxfProtocol_hl
      // xxx Don't include ProtocolSettings here.  Instead, use any abstract settings
      // definition instead.
      // ProtocolSettings
    ];
  }
}

class GenericVestingBundle extends AbstractVestingBundle.usingCapoBundleClass(CapoHeliosBundle) {
  precompiledScriptDetails = {
    singleton: {
      scriptHash: "df7c5a0675234ed2f33e385df358a311737100a31390b553a03faa4f",
      config: { "rev": "1", "delegateName": "VestingPolicy", "isMintDelegate": false, "isSpendDelegate": false, "isDgDataPolicy": true, "requiresGovAuthority": true }
    }
  };
  scriptParamsSource = "bundle";
  async loadPrecompiledVariant(variant) {
    const module = await import('stellar-tokenomics/contracts-preprod/Vesting.generic.compiled.hlb');
    const foundVariant = module.precompiled[variant];
    if (!foundVariant) {
      throw new Error(`unknown variant: ${variant}`);
    }
    return foundVariant;
  }
  specializedDelegateModule = VestingPolicy_hl;
  requiresGovAuthority = true;
  // includeFromCapoModules(): string[] {
  //     return [ 
  //         "TieredScale",
  //         "ArtistVaultData"
  //     ]
  // }
}

export { GenericVestingBundle, GenericVestingBundle as default };
//# sourceMappingURL=Vesting.generic.hlb.mjs.map
