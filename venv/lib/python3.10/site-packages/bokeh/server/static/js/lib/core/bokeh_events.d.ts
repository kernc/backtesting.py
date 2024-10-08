import type { HasProps } from "./has_props";
import type { Attrs } from "./types";
import type { GeometryData } from "./geometry";
import type { Class } from "./class";
import type { KeyModifiers } from "./ui_gestures";
import type { Serializable, Serializer } from "./serialization";
import { serialize } from "./serialization";
import type { Equatable, Comparator } from "./util/eq";
import { equals } from "./util/eq";
import type { Legend } from "../models/annotations/legend";
import type { Axis } from "../models/axes/axis";
import type { LegendItem } from "../models/annotations/legend_item";
import type { Factor } from "../models/ranges/factor_range";
import type { ClearInput } from "../models/widgets/input_widget";
export type BokehEventType = DocumentEventType | ModelEventType;
export type DocumentEventType = "document_ready" | ConnectionEventType;
export type ConnectionEventType = "connection_lost";
export type ModelEventType = "axis_click" | "button_click" | "legend_item_click" | "menu_item_click" | "value_submit" | UIEventType;
export type UIEventType = "lodstart" | "lodend" | "rangesupdate" | "selectiongeometry" | "reset" | PointEventType;
export type PointEventType = "pan" | "pinch" | "rotate" | "wheel" | "mousemove" | "mouseenter" | "mouseleave" | "tap" | "doubletap" | "press" | "pressup" | "panstart" | "panend" | "pinchstart" | "pinchend" | "rotatestart" | "rotateend";
/**
 * Events known to bokeh by name, for type-safety of Model.on_event(event_name, (EventType) => void).
 * Other events, including user defined events, can be referred to by event's class object.
 */
export type BokehEventMap = {
    axis_click: AxisClick;
    button_click: ButtonClick;
    clear_input: ClearInput;
    connection_lost: ConnectionLost;
    document_ready: DocumentReady;
    doubletap: DoubleTap;
    legend_item_click: LegendItemClick;
    lodend: LODEnd;
    lodstart: LODStart;
    menu_item_click: MenuItemClick;
    mouseenter: MouseEnter;
    mouseleave: MouseLeave;
    mousemove: MouseMove;
    pan: Pan;
    panend: PanEnd;
    panstart: PanStart;
    pinch: Pinch;
    pinchend: PinchEnd;
    pinchstart: PinchStart;
    press: Press;
    pressup: PressUp;
    rangesupdate: RangesUpdate;
    reset: Reset;
    rotate: Rotate;
    rotateend: RotateEnd;
    rotatestart: RotateStart;
    selectiongeometry: SelectionGeometry;
    tap: Tap;
    value_submit: ValueSubmit;
    wheel: MouseWheel;
};
export type BokehEventRep = {
    type: "event";
    name: string;
    values: unknown;
};
/**
 * Marks and registers a class as a one way (server -> client) event.
 */
export declare function server_event(event_name: string): (cls: Class<BokehEvent>) => void;
export declare abstract class BokehEvent implements Serializable, Equatable {
    event_name: string;
    publish: boolean;
    [serialize](serializer: Serializer): BokehEventRep;
    [equals](that: this, cmp: Comparator): boolean;
    protected abstract get event_values(): Attrs;
    static from_values?(values: Attrs): BokehEvent;
}
export declare abstract class ModelEvent extends BokehEvent {
    origin: HasProps | null;
    protected get event_values(): Attrs;
}
export declare abstract class UserEvent extends ModelEvent {
    readonly values: Attrs;
    constructor(values: Attrs);
    protected get event_values(): Attrs;
    static from_values(values: Attrs): UserEvent;
}
export declare abstract class DocumentEvent extends BokehEvent {
}
export declare class DocumentReady extends DocumentEvent {
    protected get event_values(): Attrs;
}
export declare abstract class ConnectionEvent extends DocumentEvent {
}
export declare class ConnectionLost extends ConnectionEvent {
    readonly timestamp: Date;
    protected get event_values(): Attrs;
}
export declare class AxisClick extends ModelEvent {
    readonly model: Axis;
    readonly value: number | Factor;
    constructor(model: Axis, value: number | Factor);
    protected get event_values(): Attrs;
}
export declare class ButtonClick extends ModelEvent {
}
export declare class LegendItemClick extends ModelEvent {
    readonly model: Legend;
    readonly item: LegendItem;
    constructor(model: Legend, item: LegendItem);
    protected get event_values(): Attrs;
}
export declare class MenuItemClick extends ModelEvent {
    readonly item: string;
    constructor(item: string);
    protected get event_values(): Attrs;
}
export declare class ValueSubmit extends ModelEvent {
    readonly value: string;
    constructor(value: string);
    protected get event_values(): Attrs;
}
export declare abstract class UIEvent extends ModelEvent {
}
export declare class LODStart extends UIEvent {
}
export declare class LODEnd extends UIEvent {
}
export declare class RangesUpdate extends UIEvent {
    readonly x0: number;
    readonly x1: number;
    readonly y0: number;
    readonly y1: number;
    constructor(x0: number, x1: number, y0: number, y1: number);
    protected get event_values(): Attrs;
}
export declare class SelectionGeometry extends UIEvent {
    readonly geometry: GeometryData;
    readonly final: boolean;
    constructor(geometry: GeometryData, final: boolean);
    protected get event_values(): Attrs;
}
export declare class Reset extends UIEvent {
}
export declare abstract class PointEvent extends UIEvent {
    readonly sx: number;
    readonly sy: number;
    readonly x: number;
    readonly y: number;
    readonly modifiers: KeyModifiers;
    constructor(sx: number, sy: number, x: number, y: number, modifiers: KeyModifiers);
    protected get event_values(): Attrs;
}
export declare class Pan extends PointEvent {
    readonly delta_x: number;
    readonly delta_y: number;
    constructor(sx: number, sy: number, x: number, y: number, delta_x: number, delta_y: number, modifiers: KeyModifiers);
    protected get event_values(): Attrs;
}
export declare class Pinch extends PointEvent {
    readonly scale: number;
    constructor(sx: number, sy: number, x: number, y: number, scale: number, modifiers: KeyModifiers);
    protected get event_values(): Attrs;
}
export declare class Rotate extends PointEvent {
    readonly rotation: number;
    constructor(sx: number, sy: number, x: number, y: number, rotation: number, modifiers: KeyModifiers);
    protected get event_values(): Attrs;
}
export declare class MouseWheel extends PointEvent {
    readonly delta: number;
    constructor(sx: number, sy: number, x: number, y: number, delta: number, modifiers: KeyModifiers);
    protected get event_values(): Attrs;
}
export declare class MouseMove extends PointEvent {
}
export declare class MouseEnter extends PointEvent {
}
export declare class MouseLeave extends PointEvent {
}
export declare class Tap extends PointEvent {
}
export declare class DoubleTap extends PointEvent {
}
export declare class Press extends PointEvent {
}
export declare class PressUp extends PointEvent {
}
export declare class PanStart extends PointEvent {
}
export declare class PanEnd extends PointEvent {
}
export declare class PinchStart extends PointEvent {
}
export declare class PinchEnd extends PointEvent {
}
export declare class RotateStart extends PointEvent {
}
export declare class RotateEnd extends PointEvent {
}
//# sourceMappingURL=bokeh_events.d.ts.map