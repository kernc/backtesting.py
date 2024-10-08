import type { EventRole } from "../tool";
import { GestureTool, GestureToolView } from "./gesture_tool";
import { BoxAnnotation } from "../../annotations/box_annotation";
import type { CartesianFrameView } from "../../canvas/cartesian_frame";
import type * as p from "../../../core/properties";
import type { PanEvent, KeyEvent, TapEvent } from "../../../core/ui_events";
import { Dimensions, BoxOrigin } from "../../../core/enums";
import type { MenuItem } from "../../../core/util/menus";
type Point = [number, number];
export declare class BoxZoomToolView extends GestureToolView {
    model: BoxZoomTool;
    get overlays(): import("../..").Renderer[];
    protected _base_point: Point | null;
    _match_aspect([bx, by]: Point, [cx, cy]: Point, frame: CartesianFrameView): [Point, Point];
    protected _compute_limits(base_point: Point, curr_point: Point): [Point, Point];
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    protected _stop(): void;
    _keydown(ev: KeyEvent): void;
    _doubletap(_ev: TapEvent): void;
    _update([sx0, sx1]: Point, [sy0, sy1]: Point): void;
}
export declare namespace BoxZoomTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = GestureTool.Props & {
        dimensions: p.Property<Dimensions | "auto">;
        overlay: p.Property<BoxAnnotation>;
        match_aspect: p.Property<boolean>;
        origin: p.Property<BoxOrigin>;
    };
}
export interface BoxZoomTool extends BoxZoomTool.Attrs {
}
export declare class BoxZoomTool extends GestureTool {
    properties: BoxZoomTool.Props;
    __view_type__: BoxZoomToolView;
    constructor(attrs?: Partial<BoxZoomTool.Attrs>);
    tool_name: string;
    event_type: ("doubletap" | "pan")[];
    get event_role(): EventRole;
    default_order: number;
    get computed_icon(): string;
    get tooltip(): string;
    get menu(): MenuItem[] | null;
}
export {};
//# sourceMappingURL=box_zoom_tool.d.ts.map