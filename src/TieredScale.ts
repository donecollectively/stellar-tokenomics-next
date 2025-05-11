import { uplcDataSerializer } from "@donecollectively/stellar-contracts";
import type { UplcData } from "@helios-lang/uplc";

export type tierInfo<
    T extends string,
    additionalTierInfo// extends Record<string, unknown>
> = {
    type: T;
    threshold: bigint;
    scaledValue: number;
    moreInfo: additionalTierInfo;
};

export type scaleInfo<
    T extends string,
    additionalTierInfo
> = {
    tiers: tierInfo<T, additionalTierInfo>[]
}

export type ScaleLookupResult<
    additionalTierInfo
> = {
    input: bigint;
    found: tierInfo<any, additionalTierInfo>;
    result: number;
    textResult: string;
};

/**
 * actually a context-specific Map\<string, UplcData\>,
 * @remarks
 * "wrapped" by interpreting it in a subclass-specific way with a Cast helper
 * "unwrapped" by Uplc'ing it with a Cast helper
 * @public
 */ 
type moreInfoUplcMap = UplcData 

export abstract class TieredScale<
    T extends string,
    additionalTierInfo
> {
    tiers: tierInfo<T, additionalTierInfo>[];
    targetType: string;
    constructor(
        scaleInfo: {tiers: tierInfo<any, moreInfoUplcMap>[] },
        targetType: T, // ??? string,
    ) {
        this.targetType = targetType;
        let {tiers} = scaleInfo;
        if (!tiers.length) tiers = [];
        this.tiers = tiers
            .filter((t) => t.type === targetType)
            .sort((a, b) => Number(a.threshold - b.threshold))
            .map((t) => (
                {...t,
                    moreInfo: this.wrapMoreInfo(t.moreInfo)
                })
            );
    }

    wrapMoreInfo(i: moreInfoUplcMap) : additionalTierInfo {
        return {} as additionalTierInfo
    }

    unwrapData() : scaleInfo<T, moreInfoUplcMap> {
        const scaleInfo = this.tiers.map((scaleEntry) => {
            const { 
                type, 
                threshold, 
                scaledValue, 
                moreInfo 
            } = scaleEntry;
            
            return {
                type,
                threshold,
                scaledValue,
                moreInfo: this.unwrapMoreInfo(moreInfo)
            } 
        });

        return {tiers: scaleInfo }
    }

    abstract unwrapMoreInfo(
        i: additionalTierInfo
    ) : moreInfoUplcMap 

    findTierValue(value: bigint): ScaleLookupResult<additionalTierInfo> {
        let found = this.tiers.findLast((s) => BigInt(value) >= s.threshold);
        if (!found) {
            throw new Error(
                `No scale found for ${this.targetType} value ${value}`
            );
        }
        // console.log("found tier value: ", found.scaledValue);
        const result = {
            input: value,
            found: { ...found },
            result: found.scaledValue,
            textResult: this.UiPresentation(found.scaledValue),
        };
        
        console.log("tier lookup: "+ uplcDataSerializer("tierLookup", result, 1));

        return result
    }
    abstract UiPresentation(value: number): string;
    abstract fromUIValue(value: string): number;
}