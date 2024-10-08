import { GestureTool, GestureToolView } from "./gesture_tool";
import type { RangeInfo, RangeState } from "../../plots/range_manager";
import type * as p from "../../../core/properties";
import type { PanEvent } from "../../../core/ui_events";
import { Dimensions } from "../../../core/enums";
import type { MenuItem } from "../../../core/util/menus";
import type { Scale } from "../../scales/scale";
export declare function update_ranges(scales: Map<string, Scale>, p0: number, p1: number): RangeState;
export declare class PanToolView extends GestureToolView {
    model: PanTool;
    protected last_dx: number;
    protected last_dy: number;
    protected v_axis_only: boolean;
    protected h_axis_only: boolean;
    protected pan_info?: RangeInfo & {
        sdx: number;
        sdy: number;
    };
    cursor(sx: number, sy: number): string | null;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(_e: PanEvent): void;
    _update(dx: number, dy: number): void;
}
export declare namespace PanTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = GestureTool.Props & {
        dimensions: p.Property<Dimensions>;
    };
}
export interface PanTool extends PanTool.Attrs {
}
export declare class PanTool extends GestureTool {
    properties: PanTool.Props;
    __view_type__: PanToolView;
    constructor(attrs?: Partial<PanTool.Attrs>);
    tool_name: string;
    event_type: "pan";
    default_order: number;
    get tooltip(): string;
    get computed_icon(): string;
    get menu(): MenuItem[] | null;
}
//# sourceMappingURL=pan_tool.d.ts.map