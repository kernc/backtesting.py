import { UIGestures } from "./ui_gestures";
import { Signal } from "./signaling";
import type { Keys } from "./dom";
import type { ViewStorage } from "./build_views";
import type { PlotView } from "../models/plots/plot";
import type { Tool, ToolView } from "../models/tools/tool";
import type { ToolLike } from "../models/tools/tool_proxy";
import type { RendererView } from "../models/renderers/renderer";
import type { CanvasView } from "../models/canvas/canvas";
import type { TapEvent, PanEvent, PinchEvent, RotateEvent, MoveEvent, KeyModifiers } from "./ui_gestures";
export type { TapEvent, PanEvent, PinchEvent, RotateEvent, MoveEvent, KeyModifiers } from "./ui_gestures";
export interface Tapable {
    on_tap(event: TapEvent): void;
    on_doubletap?(event: TapEvent): void;
    on_press?(event: TapEvent): void;
    on_pressup?(event: TapEvent): void;
}
export interface Moveable {
    on_enter(event: MoveEvent): boolean;
    on_move(event: MoveEvent): void;
    on_leave(event: MoveEvent): void;
}
export interface Pannable {
    on_pan_start(event: PanEvent): boolean;
    on_pan(event: PanEvent): void;
    on_pan_end(event: PanEvent): void;
}
export interface Pinchable {
    on_pinch_start(event: PinchEvent): boolean;
    on_pinch(event: PinchEvent): void;
    on_pinch_end(event: PinchEvent): void;
}
export interface Rotatable {
    on_rotate_start(event: RotateEvent): boolean;
    on_rotate(event: RotateEvent): void;
    on_rotate_end(event: RotateEvent): void;
}
export interface Scrollable {
    on_scroll(event: ScrollEvent): void;
}
export interface Keyable {
    on_keydown(event: KeyEvent): void;
    on_keyup(event: KeyEvent): void;
}
export declare function is_Tapable(obj: unknown): obj is Keyable;
export declare function is_Moveable(obj: unknown): obj is Moveable;
export declare function is_Pannable(obj: unknown): obj is Pannable;
export declare function is_Pinchable(obj: unknown): obj is Pinchable;
export declare function is_Rotatable(obj: unknown): obj is Rotatable;
export declare function is_Scrollable(obj: unknown): obj is Scrollable;
export declare function is_Keyable(obj: unknown): obj is Keyable;
export type GestureEvent = PanEvent | PinchEvent | RotateEvent;
export type ScrollEvent = {
    type: "wheel";
    sx: number;
    sy: number;
    delta: number;
    modifiers: KeyModifiers;
    native: WheelEvent;
};
export type UIEvent = GestureEvent | TapEvent | MoveEvent | ScrollEvent;
export type KeyEvent = {
    type: "keyup" | "keydown";
    key: Keys;
    modifiers: KeyModifiers;
    native: KeyboardEvent;
};
export type EventType = "pan" | "pinch" | "rotate" | "move" | "tap" | "doubletap" | "press" | "pressup" | "scroll";
export type UISignal<E> = Signal<{
    tool: ToolLike<Tool> | null;
    e: E;
}, UIEventBus>;
export declare class UIEventBus {
    readonly canvas_view: CanvasView;
    readonly pan_start: UISignal<PanEvent>;
    readonly pan: UISignal<PanEvent>;
    readonly pan_end: UISignal<PanEvent>;
    readonly pinch_start: UISignal<PinchEvent>;
    readonly pinch: UISignal<PinchEvent>;
    readonly pinch_end: UISignal<PinchEvent>;
    readonly rotate_start: UISignal<RotateEvent>;
    readonly rotate: UISignal<RotateEvent>;
    readonly rotate_end: UISignal<RotateEvent>;
    readonly tap: UISignal<TapEvent>;
    readonly doubletap: UISignal<TapEvent>;
    readonly press: UISignal<TapEvent>;
    readonly pressup: UISignal<TapEvent>;
    readonly move_enter: UISignal<MoveEvent>;
    readonly move: UISignal<MoveEvent>;
    readonly move_exit: UISignal<MoveEvent>;
    readonly scroll: UISignal<ScrollEvent>;
    readonly keydown: UISignal<KeyEvent>;
    readonly keyup: UISignal<KeyEvent>;
    readonly hit_area: HTMLElement;
    readonly ui_gestures: UIGestures;
    constructor(canvas_view: CanvasView);
    remove(): void;
    protected readonly _tools: ViewStorage<ToolLike<Tool>>;
    register_tool(tool_view: ToolView): void;
    hit_test_renderers(plot_view: PlotView, sx: number, sy: number): RendererView[];
    set_cursor(cursor?: string | null): void;
    hit_test_frame(plot_view: PlotView, sx: number, sy: number): boolean;
    hit_test_plot(sx: number, sy: number): PlotView | null;
    protected _prev_move: {
        sx: number;
        sy: number;
        plot_view: PlotView | null;
    } | null;
    protected _curr_pan: {
        plot_view: PlotView;
    } | null;
    protected _curr_pinch: {
        plot_view: PlotView;
    } | null;
    protected _curr_rotate: {
        plot_view: PlotView;
    } | null;
    _trigger<E extends UIEvent>(signal: UISignal<E>, e: E): void;
    private _current_pan_view;
    private _current_pinch_view;
    private _current_rotate_view;
    private _current_move_views;
    __trigger<E extends UIEvent>(plot_view: PlotView, signal: UISignal<E>, e: E, srcEvent: Event): void;
    trigger<E extends UIEvent | KeyEvent>(signal: UISignal<E>, e: E, tool?: ToolLike<Tool> | null): boolean;
    _trigger_bokeh_event(plot_view: PlotView, ev: UIEvent): void;
    protected _get_sxy(event: MouseEvent): {
        sx: number;
        sy: number;
    };
    protected _get_modifiers(event: MouseEvent | KeyboardEvent): KeyModifiers;
    protected _scroll_event(event: WheelEvent): ScrollEvent;
    protected _key_event(event: KeyboardEvent): KeyEvent;
    on_tap(event: TapEvent): void;
    on_doubletap(event: TapEvent): void;
    on_press(event: TapEvent): void;
    on_pressup(event: TapEvent): void;
    on_enter(event: MoveEvent): void;
    on_move(event: MoveEvent): void;
    on_leave(event: MoveEvent): void;
    on_pan_start(event: PanEvent): void;
    on_pan(event: PanEvent): void;
    on_pan_end(event: PanEvent): void;
    on_pinch_start(event: PinchEvent): void;
    on_pinch(event: PinchEvent): void;
    on_pinch_end(event: PinchEvent): void;
    on_rotate_start(event: RotateEvent): void;
    on_rotate(event: RotateEvent): void;
    on_rotate_end(event: RotateEvent): void;
    on_mouse_wheel(event: WheelEvent): void;
    on_context_menu(_event: MouseEvent): void;
    on_key_down(event: KeyboardEvent): void;
    on_key_up(event: KeyboardEvent): void;
}
//# sourceMappingURL=ui_events.d.ts.map