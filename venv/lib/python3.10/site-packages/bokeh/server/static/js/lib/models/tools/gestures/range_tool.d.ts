import { GestureTool, GestureToolView } from "../gestures/gesture_tool";
import { OnOffButton } from "../on_off_button";
import type { PlotView } from "../../plots/plot";
import { BoxAnnotation } from "../../annotations/box_annotation";
import { Range } from "../../ranges/range";
import type { PanEvent, TapEvent, MoveEvent, KeyEvent, EventType } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
import { Node } from "../../coordinates/node";
import type { CoordinateMapper, LRTB } from "../../../core/util/bbox";
declare const StartGesture: import("../../../core/kinds").Kinds.Enum<"none" | "tap" | "pan">;
type StartGesture = typeof StartGesture["__type__"];
export declare class RangeToolView extends GestureToolView {
    model: RangeTool;
    readonly parent: PlotView;
    get overlays(): import("../..").Renderer[];
    initialize(): void;
    connect_signals(): void;
    protected _mappers(): LRTB<CoordinateMapper>;
    protected _invert_lrtb({ left, right, top, bottom }: LRTB): LRTB<number | Node>;
    protected _compute_limits(curr_point: [number, number]): [[number, number], [number, number]];
    protected _base_point: [number, number] | null;
    _tap(ev: TapEvent): void;
    _move(ev: MoveEvent): void;
    _pan_start(ev: PanEvent): void;
    protected _update_overlay(sx: number, sy: number): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    protected get _is_selecting(): boolean;
    protected _stop(): void;
    _keyup(ev: KeyEvent): void;
}
export declare namespace RangeTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = GestureTool.Props & {
        x_range: p.Property<Range | null>;
        y_range: p.Property<Range | null>;
        x_interaction: p.Property<boolean>;
        y_interaction: p.Property<boolean>;
        overlay: p.Property<BoxAnnotation>;
        start_gesture: p.Property<StartGesture>;
    };
}
export interface RangeTool extends RangeTool.Attrs {
}
export declare class RangeTool extends GestureTool {
    properties: RangeTool.Props;
    __view_type__: RangeToolView;
    constructor(attrs?: Partial<RangeTool.Attrs>);
    initialize(): void;
    update_constraints(): void;
    update_ranges_from_overlay(): void;
    readonly nodes: import("../../coordinates/node").BoxNodes;
    update_overlay_from_ranges(): void;
    tool_name: string;
    tool_icon: string;
    get event_type(): EventType | EventType[];
    readonly default_order = 40;
    supports_auto(): boolean;
    tool_button(): OnOffButton;
}
export {};
//# sourceMappingURL=range_tool.d.ts.map