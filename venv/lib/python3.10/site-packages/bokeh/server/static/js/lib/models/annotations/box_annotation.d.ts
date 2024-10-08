import { Annotation, AnnotationView } from "./annotation";
import { Model } from "../../model";
import { AreaVisuals } from "./area_visuals";
import type { AutoRanged } from "../ranges/data_range1d";
import { auto_ranged } from "../ranges/data_range1d";
import type { ViewOf, BuildResult } from "../../core/build_views";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import { CoordinateUnits } from "../../core/enums";
import type * as p from "../../core/properties";
import type { LRTB, Corners, CoordinateMapper } from "../../core/util/bbox";
import { BBox } from "../../core/util/bbox";
import type { PanEvent, PinchEvent, Pannable, Pinchable, MoveEvent, Moveable, KeyModifiers } from "../../core/ui_events";
import { Signal } from "../../core/signaling";
import type { Rect } from "../../core/types";
import { BorderRadius } from "../common/kinds";
import * as Box from "../common/box_kinds";
import { Node } from "../coordinates/node";
import { Coordinate } from "../coordinates/coordinate";
import type { Renderer } from "../renderers/renderer";
export declare const EDGE_TOLERANCE = 2.5;
export declare namespace BoxInteractionHandles {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        all: p.Property<AreaVisuals>;
        move: p.Property<AreaVisuals | null>;
        resize: p.Property<AreaVisuals | null>;
        sides: p.Property<AreaVisuals | null>;
        corners: p.Property<AreaVisuals | null>;
        left: p.Property<AreaVisuals | null>;
        right: p.Property<AreaVisuals | null>;
        top: p.Property<AreaVisuals | null>;
        bottom: p.Property<AreaVisuals | null>;
        top_left: p.Property<AreaVisuals | null>;
        top_right: p.Property<AreaVisuals | null>;
        bottom_left: p.Property<AreaVisuals | null>;
        bottom_right: p.Property<AreaVisuals | null>;
    };
}
export interface BoxInteractionHandles extends BoxInteractionHandles.Attrs {
}
export declare class BoxInteractionHandles extends Model {
    properties: BoxInteractionHandles.Props;
    __view_type__: BoxAnnotationView;
    constructor(attrs?: Partial<BoxInteractionHandles.Attrs>);
}
export declare class BoxAnnotationView extends AnnotationView implements Pannable, Pinchable, Moveable, AutoRanged {
    model: BoxAnnotation;
    visuals: BoxAnnotation.Visuals;
    protected _bbox: BBox;
    get bbox(): BBox;
    protected _handles: {
        [key in Box.HitTarget]: BoxAnnotation | null;
    };
    protected _handles_views: {
        [key in Box.HitTarget]?: ViewOf<BoxAnnotation>;
    };
    initialize(): void;
    protected _update_handles(): void;
    get computed_renderers(): Renderer[];
    connect_signals(): void;
    protected _build_renderers(): Promise<BuildResult<Renderer>>;
    readonly [auto_ranged] = true;
    bounds(): Rect;
    log_bounds(): Rect;
    get mappers(): LRTB<CoordinateMapper>;
    get border_radius(): Corners<number>;
    compute_geometry(): void;
    protected _paint(): void;
    interactive_bbox(): BBox;
    interactive_hit(sx: number, sy: number): boolean;
    private _hit_test;
    get resizable(): LRTB<boolean> & Corners<boolean>;
    get movable(): boolean;
    private _hittable;
    private _can_hit;
    private _pan_state;
    on_pan_start(ev: PanEvent): boolean;
    on_pan(ev: PanEvent): void;
    on_pan_end(ev: PanEvent): void;
    private _pinch_state;
    on_pinch_start(ev: PinchEvent): boolean;
    on_pinch(ev: PinchEvent): void;
    on_pinch_end(ev: PinchEvent): void;
    private get _has_hover();
    private _is_hovered;
    on_enter(_ev: MoveEvent): boolean;
    on_move(_ev: MoveEvent): void;
    on_leave(_ev: MoveEvent): void;
    cursor(sx: number, sy: number): string | null;
}
export declare namespace BoxAnnotation {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        top: p.Property<number | Coordinate>;
        bottom: p.Property<number | Coordinate>;
        left: p.Property<number | Coordinate>;
        right: p.Property<number | Coordinate>;
        top_units: p.Property<CoordinateUnits>;
        bottom_units: p.Property<CoordinateUnits>;
        left_units: p.Property<CoordinateUnits>;
        right_units: p.Property<CoordinateUnits>;
        top_limit: p.Property<Box.Limit>;
        bottom_limit: p.Property<Box.Limit>;
        left_limit: p.Property<Box.Limit>;
        right_limit: p.Property<Box.Limit>;
        min_width: p.Property<number>;
        min_height: p.Property<number>;
        max_width: p.Property<number>;
        max_height: p.Property<number>;
        border_radius: p.Property<BorderRadius>;
        editable: p.Property<boolean>;
        resizable: p.Property<Box.Resizable>;
        movable: p.Property<Box.Movable>;
        symmetric: p.Property<boolean>;
        use_handles: p.Property<boolean>;
        handles: p.Property<BoxInteractionHandles>;
        inverted: p.Property<boolean>;
        tl_cursor: p.Property<string>;
        tr_cursor: p.Property<string>;
        bl_cursor: p.Property<string>;
        br_cursor: p.Property<string>;
        ew_cursor: p.Property<string>;
        ns_cursor: p.Property<string>;
        in_cursor: p.Property<string>;
    } & Mixins;
    type Mixins = mixins.Line & mixins.Fill & mixins.Hatch & mixins.HoverLine & mixins.HoverFill & mixins.HoverHatch;
    type Visuals = Annotation.Visuals & {
        line: visuals.Line;
        fill: visuals.Fill;
        hatch: visuals.Hatch;
        hover_line: visuals.Line;
        hover_fill: visuals.Fill;
        hover_hatch: visuals.Hatch;
    };
}
export interface BoxAnnotation extends BoxAnnotation.Attrs {
}
export declare class BoxAnnotation extends Annotation {
    properties: BoxAnnotation.Props;
    __view_type__: BoxAnnotationView;
    constructor(attrs?: Partial<BoxAnnotation.Attrs>);
    clone(attrs?: Partial<BoxAnnotation.Attrs>): this;
    readonly pan: Signal<["pan" | "pan:start" | "pan:end", KeyModifiers], this>;
    update({ left, right, top, bottom }: LRTB<number | Coordinate>): void;
    clear(): void;
    readonly nodes: {
        readonly left: Node;
        readonly right: Node;
        readonly top: Node;
        readonly bottom: Node;
        readonly top_left: Node;
        readonly top_center: Node;
        readonly top_right: Node;
        readonly center_left: Node;
        readonly center: Node;
        readonly center_right: Node;
        readonly bottom_left: Node;
        readonly bottom_center: Node;
        readonly bottom_right: Node;
        readonly width: Node;
        readonly height: Node;
    };
}
//# sourceMappingURL=box_annotation.d.ts.map