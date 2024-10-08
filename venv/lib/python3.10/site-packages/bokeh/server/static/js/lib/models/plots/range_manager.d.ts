import type { Range } from "../ranges/range";
import type { CartesianFrameView } from "../canvas/cartesian_frame";
import type { CoordinateMapping } from "../coordinates/coordinate_mapping";
import type { PlotView } from "./plot_canvas";
import type { Interval } from "../../core/types";
export type RangeState = Map<Range, Interval>;
export type RangeInfo = {
    xrs: RangeState;
    yrs: RangeState;
};
export type RangeOptions = {
    panning: boolean;
    scrolling: boolean;
    maintain_focus: boolean;
};
export declare class RangeManager {
    readonly parent: PlotView;
    constructor(parent: PlotView);
    get frame(): CartesianFrameView;
    invalidate_dataranges: boolean;
    update(range_info: RangeInfo, options?: Partial<RangeOptions>): void;
    ranges(): {
        x_ranges: Range[];
        y_ranges: Range[];
    };
    reset(): void;
    protected _update_dataranges(frame: CartesianFrameView | CoordinateMapping): void;
    update_dataranges(): void;
    compute_initial(): RangeInfo | null;
    protected _update_ranges_together(range_state: RangeState): void;
    protected _update_ranges_individually(range_state: RangeState, options: RangeOptions): void;
    protected _get_weight_to_constrain_interval(rng: Range, range_info: Interval): number;
}
//# sourceMappingURL=range_manager.d.ts.map