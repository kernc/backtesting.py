import { Annotation, AnnotationView } from "./annotation";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import { CoordinateUnits, Dimension } from "../../core/enums";
import type { PanEvent, Pannable, MoveEvent, Moveable, KeyModifiers } from "../../core/ui_events";
import { Signal } from "../../core/signaling";
import type * as p from "../../core/properties";
type Point = {
    x: number;
    y: number;
};
declare class Line {
    readonly p0: Point;
    readonly p1: Point;
    constructor(p0: Point, p1: Point);
    clone(): Line;
    hit_test(pt: Point, tolerance?: number): boolean;
    translate(dx: number, dy: number): Line;
}
export declare class SpanView extends AnnotationView implements Pannable, Moveable {
    model: Span;
    visuals: Span.Visuals;
    protected line: Line;
    connect_signals(): void;
    protected _paint(): void;
    interactive_hit(sx: number, sy: number): boolean;
    private _hit_test;
    private _can_hit;
    private _pan_state;
    on_pan_start(ev: PanEvent): boolean;
    on_pan(ev: PanEvent): void;
    on_pan_end(ev: PanEvent): void;
    private get _has_hover();
    private _is_hovered;
    on_enter(_ev: MoveEvent): boolean;
    on_move(_ev: MoveEvent): void;
    on_leave(_ev: MoveEvent): void;
    cursor(sx: number, sy: number): string | null;
}
export declare namespace Span {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        location: p.Property<number | null>;
        location_units: p.Property<CoordinateUnits>;
        dimension: p.Property<Dimension>;
        editable: p.Property<boolean>;
    } & Mixins;
    type Mixins = mixins.Line & mixins.HoverLine;
    type Visuals = Annotation.Visuals & {
        line: visuals.Line;
        hover_line: visuals.Line;
    };
}
export interface Span extends Span.Attrs {
}
export declare class Span extends Annotation {
    properties: Span.Props;
    __view_type__: SpanView;
    constructor(attrs?: Partial<Span.Attrs>);
    readonly pan: Signal<["pan" | "pan:start" | "pan:end", KeyModifiers], this>;
}
export {};
//# sourceMappingURL=span.d.ts.map