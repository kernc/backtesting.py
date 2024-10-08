import type { Arrayable } from "../../../core/types";
import type { HatchPattern } from "../../../core/property_mixins";
import type { GLMarkerType } from "./types";
export declare function interleave(arr0: Arrayable<number>, arr1: Arrayable<number>, n: number, alt: number, out: Float32Array): void;
export declare const cap_lookup: {
    butt: number;
    round: number;
    square: number;
};
export declare const join_lookup: {
    miter: number;
    round: number;
    bevel: number;
};
export declare function hatch_pattern_to_index(pattern: HatchPattern): number;
export declare function marker_type_to_size_hint(marker_type: GLMarkerType): number;
//# sourceMappingURL=webgl_utils.d.ts.map