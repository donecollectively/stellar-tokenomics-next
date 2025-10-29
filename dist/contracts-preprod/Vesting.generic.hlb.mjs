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
      scriptHash: "b77c2d4a7ee9ae764207ca39da535d78131726b9d7128b231ba54d51",
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
