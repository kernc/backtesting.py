import { RegionSelectTool, RegionSelectToolView } from "./region_select_tool";
import { PolyAnnotation } from "../../annotations/poly_annotation";
import type { SelectionMode } from "../../../core/enums";
import type { Arrayable } from "../../../core/types";
import type { TapEvent, KeyEvent, KeyModifiers } from "../../../core/ui_events";
import type { CoordinateMapper } from "../../../core/util/bbox";
import type * as p from "../../../core/properties";
type NumArray = Arrayable<number>;
export declare class PolySelectToolView extends RegionSelectToolView {
    model: PolySelectTool;
    protected _is_selecting: boolean;
    protected _mappers(): {
        x: CoordinateMapper;
        y: CoordinateMapper;
    };
    protected _v_compute(xs: NumArray, ys: NumArray): [NumArray, NumArray];
    protected _v_invert(sxs: NumArray, sys: NumArray): [NumArray, NumArray];
    connect_signals(): void;
    _tap(ev: TapEvent): void;
    protected _finish_selection(ev: KeyModifiers): void;
    _press(ev: TapEvent): void;
    _keyup(ev: KeyEvent): void;
    _clear_selection(): void;
    protected _clear_overlay(): void;
    _do_select(sx: NumArray, sy: NumArray, final: boolean, mode: SelectionMode): void;
}
export declare const DEFAULT_POLY_OVERLAY: () => PolyAnnotation;
export declare namespace PolySelectTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = RegionSelectTool.Props & {
        overlay: p.Property<PolyAnnotation>;
    };
}
export interface PolySelectTool extends PolySelectTool.Attrs {
}
export declare class PolySelectTool extends RegionSelectTool {
    properties: PolySelectTool.Props;
    __view_type__: PolySelectToolView;
    overlay: PolyAnnotation;
    constructor(attrs?: Partial<PolySelectTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: "tap";
    default_order: number;
}
export {};
//# sourceMappingURL=poly_select_tool.d.ts.map