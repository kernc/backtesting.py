import type { Interval } from "../types";
import type { Scale } from "../../models/scales/scale";
import type { RangeInfo, RangeState } from "../../models/plots/range_manager";
type Bounds = [number, number];
type ScaleRanges = RangeInfo & {
    factor: number;
};
export declare function scale_interval(range: Interval, factor: number, center?: number | null): Bounds;
export declare function get_info(scales: Iterable<Scale>, [sxy0, sxy1]: Bounds): RangeState;
export declare function rescale(scales: Iterable<Scale>, factor: number, center?: number | null): RangeState;
export declare function scale_range(x_scales: Iterable<Scale>, y_scales: Iterable<Scale>, _x_target: Interval, _y_range: Interval, factor: number, x_axis?: boolean, y_axis?: boolean, center?: {
    x?: number | null;
    y?: number | null;
} | null): ScaleRanges;
export {};
//# sourceMappingURL=zoom.d.ts.map