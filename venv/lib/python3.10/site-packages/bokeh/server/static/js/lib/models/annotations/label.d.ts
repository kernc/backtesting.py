import { TextAnnotation, TextAnnotationView } from "./text_annotation";
import type { CoordinateMapper } from "../../core/util/bbox";
import { CoordinateUnits, AngleUnits, Direction } from "../../core/enums";
import type * as p from "../../core/properties";
import type { Pannable, PanEvent, KeyModifiers } from "../../core/ui_events";
import { Signal } from "../../core/signaling";
import type { XY, SXY } from "../../core/util/bbox";
import { TextAnchor } from "../common/kinds";
import { Coordinate } from "../coordinates/coordinate";
type HitTarget = "area";
export declare class LabelView extends TextAnnotationView implements Pannable {
    model: Label;
    visuals: Label.Visuals;
    get mappers(): XY<CoordinateMapper>;
    get anchor(): XY<number>;
    get angle(): number;
    get origin(): SXY;
    interactive_hit(sx: number, sy: number): boolean;
    protected _hit_test(cx: number, cy: number): HitTarget | null;
    private _can_hit;
    private _pan_state;
    on_pan_start(ev: PanEvent): boolean;
    on_pan(ev: PanEvent): void;
    on_pan_end(ev: PanEvent): void;
    cursor(sx: number, sy: number): string | null;
}
export declare namespace Label {
    type Props = TextAnnotation.Props & {
        anchor: p.Property<TextAnchor>;
        x: p.Property<number | Coordinate>;
        y: p.Property<number | Coordinate>;
        x_units: p.Property<CoordinateUnits>;
        y_units: p.Property<CoordinateUnits>;
        x_offset: p.Property<number>;
        y_offset: p.Property<number>;
        angle: p.Property<number>;
        angle_units: p.Property<AngleUnits>;
        direction: p.Property<Direction>;
        editable: p.Property<boolean>;
    };
    type Attrs = p.AttrsOf<Props>;
    type Visuals = TextAnnotation.Visuals;
}
export interface Label extends Label.Attrs {
}
export declare class Label extends TextAnnotation {
    properties: Label.Props;
    __view_type__: LabelView;
    constructor(attrs?: Partial<Label.Attrs>);
    readonly pan: Signal<["pan" | "pan:start" | "pan:end", KeyModifiers], this>;
}
export {};
//# sourceMappingURL=label.d.ts.map