import {
    ContractBasedDelegate,
    StellarContract,
    uplcDataSerializer,
} from "@donecollectively/stellar-contracts";
import type { UplcData } from "@helios-lang/uplc";

export type tierInfo<
    T extends string,
    additionalTierInfo // extends Record<string, unknown>
> = {
    type: T;
    threshold: bigint;
    name: string;
    scaledDetails: additionalTierInfo;
};

export type scaleInfo<T extends string, additionalTierInfo> = {
    tiers: {
        type: T,
        threshold: bigint,
        name: string,
        scaledDetails: additionalTierInfo
    }[];
};

export type ScaleLookupResult<additionalTierInfo> = {
    input: bigint | number;
    // this is a tierInfo, inlined to ease inspectability
    found: {
        type: string,
        threshold: bigint,
        name: string,
        scaledDetails: additionalTierInfo
    };
    textResult: string;
};

/**
 * actually a context-specific Map\<string, UplcData\>,
 * @remarks
 * "wrapped" by interpreting it in a subclass-specific way with a Cast helper
 * "unwrapped" by Uplc'ing it with a Cast helper
 * @public
 */
type moreInfoUplcMap = UplcData;

export abstract class TieredScale<T extends string, additionalTierInfo> {
    tiers: tierInfo<T, additionalTierInfo>[];
    targetType: string;
    hostDelegate: StellarContract<any>;

    constructor(
        scaleInfo: { tiers: tierInfo<any, moreInfoUplcMap>[] },
        targetType: T, // ??? string,
        hostDelegate: StellarContract<any>
    ) {
        this.targetType = targetType;
        this.hostDelegate = hostDelegate;
        let { tiers } = scaleInfo;
        if (!tiers.length) tiers = [];
        this.tiers = tiers
            .filter((t) => t.type === targetType)
            .sort((a, b) => Number(a.threshold - b.threshold))
            .map((t) => ({
                ...t,
                scaledDetails: this.wrapScaledDetails(t.scaledDetails),
            }));
    }

    wrapScaledDetails(i: moreInfoUplcMap): additionalTierInfo {
        return {} as additionalTierInfo;
    }

    unwrapData(): scaleInfo<T, moreInfoUplcMap> {
        const scaleInfo = this.tiers.map((scaleEntry) => {
            const { type, threshold, name, scaledDetails } = scaleEntry;

            return {
                type,
                threshold,
                name,
                scaledDetails: this.unwrapScaledDetails(scaledDetails),
            };
        });

        return { tiers: scaleInfo };
    }

    abstract unwrapScaledDetails(i: additionalTierInfo): moreInfoUplcMap;

    findTierValue(
        value: number | bigint
    ): ScaleLookupResult<additionalTierInfo> {
        let found = this.tiers.findLast((s) => BigInt(value) >= s.threshold);
        if (!found) {
            throw new Error(
                `No scale found for ${this.targetType} value ${value}`
            );
        }
        // console.log("found tier value: ", found.scaledValue);
        const result: ScaleLookupResult<additionalTierInfo> = {
            input: value,
            found,
            textResult: this.UiPresentation(found.scaledDetails),
        };

        console.log(
            "tier lookup: " + uplcDataSerializer("tierLookup", result, 1)
        );

        return result;
    }
    abstract UiPresentation(details: additionalTierInfo): string;
    // abstract fromUIValue(value: string): additionalTierInfo;
}
