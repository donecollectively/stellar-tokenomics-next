import { CapoHeliosBundle } from '@donecollectively/stellar-contracts';
import { makeSource } from '@helios-lang/compiler-utils';

const TieredScale_hl = makeSource(
  "module TieredScale\nimport {\n    AnyData\n} from CapoHelpers\n\nstruct Tier {\n    type: String\n    threshold: Int\n    name: String\n    /**\n     * actually an Enum \n     * interpreted in specific context with variants having their own concrete types\n     */\n    scaledDetails: Data    \n}\n\n\n// struct TierLookupResult {\n//     // scaledValue: Real\n//     scaledDetails: Option[\n//         Data\n//         // actually an Enum with variants having their own concrete types\n//     ]\n// }\n\nstruct TieredScale {\n    tiers: []Tier\n\n    func findTierValue(self, value: Int) -> Option[Data] {\n        // list.fold_lazy[ReducedType: Any](\n        //     reducer: (item: ItemType, next: () -> ReducedType) -> ReducedType,\n        //     final: ReducedType\n        // ) -> ReducedType\n        print(\"  -- tiered scale: lookup value \"+value.show());\n        result = self.tiers.fold_lazy[Option[Data]](\n           // reducer: \n            (thisTier: Tier, next : () -> Option[Data]) -> Option[Data] {\n                higherTierResult : Option[Data] = next(); // go deep first, to the latest possible item in the list\n                success : Option[Data] = higherTierResult.switch { \n                    None => {\n                        // this is potentially a match, if the threshold is met by the item\n                        // print(\"     -- checking tier \"+ thisTier.threshold.show());\n                        if (value < thisTier.threshold) { // this tier is too big to match the input value.\n                            // no-match; defers to the next smaller tier at a lesser depth \n                            Option[Data]::None\n                        } else {\n                            print(\"    <--  found tier '\"+ thisTier.name + \"' at threshold \"+ thisTier.threshold.show());\n                            Option[Data]::Some{thisTier.scaledDetails}\n                        }                    \n                    }, \n                    Some => {\n                        // pops back through all the earlier items, returning \n                        //   that last tier having any successful lookup result\n                        higherTierResult \n                    }\n                };\n\n                 success\n            },\n            // the \"final\" item for the fold is a no-match indticator\n            Option[Data]::None\n        )\n\n        result.switch {\n            None => {\n                print(\"  -- tiered scale: no tier found for value \"+value.show());\n            }\n        }\n        result\n    }\n}\n\n\nstruct TierAsInt {\n    type: String\n    threshold: Int\n    name: String\n    scaledDetails: Data // actually Map[String]Data\n}\n\nstruct TieredScaleAsInt {\n    tiers: []TierAsInt\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/TieredScale.hl", // source filename
    moduleName:  "TieredScale",
});

class StellarTokenomicsCapoBundle extends CapoHeliosBundle {
  static isAbstract = true;
  /**
   * Makes certain modules available on-demand for import by Capo plugins 
   * @remarks
   * Only include modules here when they should force tightly-coupled 
   * collaborating modules to be updated at the same time.  When any of
   * these modules are modified, it will cause all places where the imports
   * are used to be recompiled and force on-chain scripts to receive updates.
   * 
   * Generally, it's safer to explicitly import any dependency modules to the respective plugins,
   * and to include only definitions here for data types that are not expected to require change.
   */
  get modules() {
    return [
      ...super.modules,
      TieredScale_hl
      // MarketSaleData,            
      // SaleStrategies,
    ];
  }
}

export { StellarTokenomicsCapoBundle as default };
//# sourceMappingURL=StellarTokenomics.hlb.mjs.map
