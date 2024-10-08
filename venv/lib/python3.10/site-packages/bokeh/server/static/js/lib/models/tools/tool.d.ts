import type * as p from "../../core/properties";
import { View } from "../../core/view";
import type { Class } from "../../core/class";
import type { Dimensions } from "../../core/enums";
import { ToolIcon } from "../../core/enums";
import type { MenuItem } from "../../core/util/menus";
import { Model } from "../../model";
import type { Renderer } from "../renderers/renderer";
import type { CartesianFrameView } from "../canvas/cartesian_frame";
import type { EventType, PanEvent, PinchEvent, RotateEvent, ScrollEvent, TapEvent, MoveEvent, KeyEvent } from "../../core/ui_events";
import type { ToolButton } from "./tool_button";
import type { PanTool } from "./gestures/pan_tool";
import type { WheelPanTool } from "./gestures/wheel_pan_tool";
import type { WheelZoomTool } from "./gestures/wheel_zoom_tool";
import type { ZoomInTool } from "./actions/zoom_in_tool";
import type { ZoomOutTool } from "./actions/zoom_out_tool";
import type { TapTool } from "./gestures/tap_tool";
import type { CrosshairTool } from "./inspectors/crosshair_tool";
import type { BoxSelectTool } from "./gestures/box_select_tool";
import type { PolySelectTool } from "./gestures/poly_select_tool";
import type { LassoSelectTool } from "./gestures/lasso_select_tool";
import type { BoxZoomTool } from "./gestures/box_zoom_tool";
import type { HoverTool } from "./inspectors/hover_tool";
import type { SaveTool } from "./actions/save_tool";
import type { UndoTool } from "./actions/undo_tool";
import type { RedoTool } from "./actions/redo_tool";
import type { ResetTool } from "./actions/reset_tool";
import type { HelpTool } from "./actions/help_tool";
import type { ToolButtonView } from "./tool_button";
export type ToolAliases = {
    pan: PanTool;
    xpan: PanTool;
    ypan: PanTool;
    xwheel_pan: WheelPanTool;
    ywheel_pan: WheelPanTool;
    wheel_zoom: WheelZoomTool;
    xwheel_zoom: WheelZoomTool;
    ywheel_zoom: WheelZoomTool;
    zoom_in: ZoomInTool;
    xzoom_in: ZoomInTool;
    yzoom_in: ZoomInTool;
    zoom_out: ZoomOutTool;
    xzoom_out: ZoomOutTool;
    yzoom_out: ZoomOutTool;
    click: TapTool;
    tap: TapTool;
    crosshair: CrosshairTool;
    xcrosshair: CrosshairTool;
    ycrosshair: CrosshairTool;
    box_select: BoxSelectTool;
    xbox_select: BoxSelectTool;
    ybox_select: BoxSelectTool;
    poly_select: PolySelectTool;
    lasso_select: LassoSelectTool;
    box_zoom: BoxZoomTool;
    xbox_zoom: BoxZoomTool;
    ybox_zoom: BoxZoomTool;
    hover: HoverTool;
    save: SaveTool;
    undo: UndoTool;
    redo: RedoTool;
    reset: ResetTool;
    help: HelpTool;
};
export type EventRole = EventType | "multi";
export declare abstract class ToolView extends View {
    model: Tool;
    connect_signals(): void;
    get overlays(): Renderer[];
    activate(): void;
    deactivate(): void;
    _pan_start?(e: PanEvent): void | boolean;
    _pan?(e: PanEvent): void | boolean;
    _pan_end?(e: PanEvent): void | boolean;
    _pinch_start?(e: PinchEvent): void | boolean;
    _pinch?(e: PinchEvent): void | boolean;
    _pinch_end?(e: PinchEvent): void | boolean;
    _rotate_start?(e: RotateEvent): void | boolean;
    _rotate?(e: RotateEvent): void | boolean;
    _rotate_end?(e: RotateEvent): void | boolean;
    _tap?(e: TapEvent): void | boolean;
    _doubletap?(e: TapEvent): void | boolean;
    _press?(e: TapEvent): void | boolean;
    _pressup?(e: TapEvent): void | boolean;
    _move_enter?(e: MoveEvent): void | boolean;
    _move?(e: MoveEvent): void | boolean;
    _move_exit?(e: MoveEvent): void | boolean;
    _scroll?(e: ScrollEvent): void | boolean;
    _keydown?(e: KeyEvent): void | boolean;
    _keyup?(e: KeyEvent): void | boolean;
}
export declare namespace Tool {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        icon: p.Property<ToolIcon | string | null>;
        description: p.Property<string | null>;
        visible: p.Property<boolean>;
        active: p.Property<boolean>;
        disabled: p.Property<boolean>;
    };
}
export interface Tool extends Tool.Attrs {
}
export declare abstract class Tool extends Model {
    properties: Tool.Props;
    __view_type__: ToolView;
    constructor(attrs?: Partial<Tool.Attrs>);
    readonly tool_name: string;
    readonly tool_icon?: string;
    readonly event_type?: EventType | EventType[];
    get event_role(): EventRole;
    get event_types(): EventType[];
    button_view: Class<ToolButtonView>;
    abstract tool_button(): ToolButton;
    get tooltip(): string;
    get computed_icon(): string | undefined;
    get menu(): MenuItem[] | null;
    supports_auto(): boolean;
    _get_dim_limits([sx0, sy0]: [number, number], [sx1, sy1]: [number, number], frame: CartesianFrameView, dims: Dimensions): [[number, number], [number, number]];
    protected _get_dim_tooltip(dims: Dimensions | "auto"): string;
    /** @prototype */
    private _known_aliases;
    static register_alias(name: string, fn: () => Tool): void;
    static from_string<K extends keyof ToolAliases>(name: K): ToolAliases[K];
    static from_string(name: string): Tool;
}
//# sourceMappingURL=tool.d.ts.map