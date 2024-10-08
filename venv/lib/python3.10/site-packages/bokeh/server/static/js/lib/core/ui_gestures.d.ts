export type KeyModifiers = {
    shift: boolean;
    ctrl: boolean;
    alt: boolean;
};
export type TapEvent = {
    type: "tap" | "double_tap" | "press" | "press_up";
    sx: number;
    sy: number;
    modifiers: KeyModifiers;
    native: PointerEvent;
};
export type MoveEvent = {
    type: "enter" | "move" | "leave";
    sx: number;
    sy: number;
    modifiers: KeyModifiers;
    native: PointerEvent;
};
export type PanEvent = {
    type: "pan_start" | "pan" | "pan_end";
    sx: number;
    sy: number;
    dx: number;
    dy: number;
    modifiers: KeyModifiers;
    native: PointerEvent;
};
export type PinchEvent = {
    type: "pinch_start" | "pinch" | "pinch_end";
    sx: number;
    sy: number;
    scale: number;
    modifiers: KeyModifiers;
    native: PointerEvent;
};
export type RotateEvent = {
    type: "rotate_start" | "rotate" | "rotate_end";
    sx: number;
    sy: number;
    rotation: number;
    modifiers: KeyModifiers;
    native: PointerEvent;
};
export type GestureHandlers = {
    on_tap?(event: TapEvent): void;
    on_doubletap?(event: TapEvent): void;
    on_press?(event: TapEvent): void;
    on_pressup?(event: TapEvent): void;
    on_enter?(event: MoveEvent): void;
    on_move?(event: MoveEvent): void;
    on_leave?(event: MoveEvent): void;
    on_pan_start?(event: PanEvent): void;
    on_pan?(event: PanEvent): void;
    on_pan_end?(event: PanEvent): void;
    on_pinch_start?(event: PinchEvent): void;
    on_pinch?(event: PinchEvent): void;
    on_pinch_end?(event: PinchEvent): void;
    on_rotate_start?(event: RotateEvent): void;
    on_rotate?(event: RotateEvent): void;
    on_rotate_end?(event: RotateEvent): void;
};
export type Options = {
    /**
     * Whether the hit target must be the event target or are descendants permitted.
     * For example, canvas' events layer must be the event target, because we don't
     * want tooltips, toolbar or other panels to trigger UI events.
     */
    must_be_target?: boolean;
};
type PointerId = typeof PointerEvent.prototype["pointerId"];
type Pointer = {
    init: PointerEvent;
    last: PointerEvent;
};
type GesturePhase = "idle" | "started" | "pressing" | "panning" | "pinching" | "rotating" | "transitional";
export declare class UIGestures {
    readonly hit_area: HTMLElement;
    readonly handlers: GestureHandlers;
    readonly must_be_target: boolean;
    constructor(hit_area: HTMLElement, handlers: GestureHandlers, options?: Options);
    connect_signals(): void;
    disconnect_signals(): void;
    remove(): void;
    protected _self_is_target(event: PointerEvent): boolean;
    protected _is_event_target(event: PointerEvent): boolean;
    protected phase: GesturePhase;
    protected readonly pointers: Map<PointerId, Pointer>;
    protected press_timer: number | null;
    protected tap_timestamp: number;
    protected last_scale: number | null;
    protected last_rotation: number | null;
    reset(): void;
    static readonly move_threshold: number;
    static readonly press_threshold: number;
    static readonly doubletap_threshold: number;
    static readonly pinch_threshold: number;
    static readonly rotate_threshold: number;
    protected get _is_multi_gesture(): boolean;
    protected _within_threshold(ptr: Pointer): boolean;
    protected get _any_movement(): boolean;
    protected _start_timeout(): void;
    protected _cancel_timeout(): void;
    protected _pointer_timeout(): void;
    protected _pointer_over(event: PointerEvent): void;
    protected _pointer_out(event: PointerEvent): void;
    protected _pointer_down(event: PointerEvent): void;
    protected _pointer_move(event: PointerEvent): void;
    protected _pointer_up(event: PointerEvent): void;
    protected _pointer_cancel(event: PointerEvent): void;
    on_tap(ev: PointerEvent): void;
    on_doubletap(ev: PointerEvent): void;
    on_press(ev: PointerEvent): void;
    on_pressup(ev: PointerEvent): void;
    on_enter(ev: PointerEvent): void;
    on_move(ev: PointerEvent): void;
    on_leave(ev: PointerEvent): void;
    on_pan_start(ev: PointerEvent, dx: number, dy: number): void;
    on_pan(ev: PointerEvent, dx: number, dy: number): void;
    on_pan_end(ev: PointerEvent, dx: number, dy: number): void;
    on_pinch_start(ev0: PointerEvent, ev1: PointerEvent, scale: number): void;
    on_pinch(ev0: PointerEvent, ev1: PointerEvent, scale: number): void;
    on_pinch_end(ev0: PointerEvent, ev1: PointerEvent, scale: number): void;
    on_rotate_start(ev0: PointerEvent, ev1: PointerEvent, rotation: number): void;
    on_rotate(ev0: PointerEvent, ev1: PointerEvent, rotation: number): void;
    on_rotate_end(ev0: PointerEvent, ev1: PointerEvent, rotation: number): void;
    protected _get_sxy(event: MouseEvent): {
        sx: number;
        sy: number;
    };
    protected _get_modifiers(event: MouseEvent | KeyboardEvent): KeyModifiers;
    protected _tap_event(type: TapEvent["type"], event: PointerEvent): TapEvent;
    protected _move_event(type: MoveEvent["type"], event: PointerEvent): MoveEvent;
    protected _pan_event(type: PanEvent["type"], event: PointerEvent, dx: number, dy: number): PanEvent;
    protected _pinch_event(type: PinchEvent["type"], event0: PointerEvent, event1: PointerEvent, scale: number): PinchEvent;
    protected _rotate_event(type: RotateEvent["type"], event0: PointerEvent, event1: PointerEvent, rotation: number): RotateEvent;
    protected _movement(ptr: Pointer): {
        dx: number;
        dy: number;
    };
    protected _distance(ev0: PointerEvent, ev1: PointerEvent): number;
    protected _angle(ev0: PointerEvent, ev1: PointerEvent): number;
    protected _scale(ptr0: Pointer, ptr1: Pointer): number;
    protected _rotation(ptr0: Pointer, ptr1: Pointer): number;
}
export {};
//# sourceMappingURL=ui_gestures.d.ts.map