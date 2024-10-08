import { RegionSelectTool, RegionSelectToolView } from "./region_select_tool";
import { PolyAnnotation } from "../../annotations/poly_annotation";
import type { SelectionMode } from "../../../core/enums";
import type { Arrayable } from "../../../core/types";
import type { PanEvent, KeyEvent } from "../../../core/ui_events";
import type { CoordinateMapper } from "../../../core/util/bbox";
import type * as p from "../../../core/properties";
type NumArray = Arrayable<number>;
export declare class LassoSelectToolView extends RegionSelectToolView {
    model: LassoSelectTool;
    protected _is_selecting: boolean;
    protected _mappers(): {
        x: CoordinateMapper;
        y: CoordinateMapper;
    };
    protected _v_compute(xs: NumArray, ys: NumArray): [NumArray, NumArray];
    protected _v_invert(sxs: NumArray, sys: NumArray): [NumArray, NumArray];
    connect_signals(): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    _keyup(ev: KeyEvent): void;
    _clear_selection(): void;
    _do_select(sx: NumArray, sy: NumArray, final: boolean, mode: SelectionMode): void;
}
export declare namespace LassoSelectTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = RegionSelectTool.Props & {
        overlay: p.Property<PolyAnnotation>;
    };
}
export interface LassoSelectTool extends LassoSelectTool.Attrs {
}
export declare class LassoSelectTool extends RegionSelectTool {
    properties: LassoSelectTool.Props;
    __view_type__: LassoSelectToolView;
    overlay: PolyAnnotation;
    constructor(attrs?: Partial<LassoSelectTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: "pan";
    default_order: number;
}
export {};
//# sourceMappingURL=lasso_select_tool.d.ts.map