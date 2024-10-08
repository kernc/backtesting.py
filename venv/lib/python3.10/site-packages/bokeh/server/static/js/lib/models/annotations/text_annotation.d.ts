import { Annotation, AnnotationView } from "./annotation";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
import type { BaseTextView } from "../text/base_text";
import { BaseText } from "../text/base_text";
import type { IterViews } from "../../core/build_views";
import type { GraphicsBox } from "../../core/graphics";
import { Padding, BorderRadius } from "../common/kinds";
import type { LRTB, XY, SXY, Corners } from "../../core/util/bbox";
import type { Size } from "../../core/layout";
import * as mixins from "../../core/property_mixins";
export declare abstract class TextAnnotationView extends AnnotationView {
    model: TextAnnotation;
    visuals: TextAnnotation.Visuals;
    protected _text_view: BaseTextView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    protected _init_text(): Promise<void>;
    update_layout(): void;
    connect_signals(): void;
    remove(): void;
    has_finished(): boolean;
    get displayed(): boolean;
    abstract get anchor(): XY<number>;
    abstract get origin(): SXY;
    abstract get angle(): number;
    get padding(): LRTB<number>;
    get border_radius(): Corners<number>;
    protected _text_box: GraphicsBox;
    protected _rect: {
        sx: number;
        sy: number;
        width: number;
        height: number;
        angle: number;
        anchor: XY<number>;
        padding: LRTB<number>;
        border_radius: Corners<number>;
    };
    protected _get_size(): Size;
    compute_geometry(): void;
    protected _paint(): void;
}
export declare namespace TextAnnotation {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        text: p.Property<string | BaseText>;
        padding: p.Property<Padding>;
        border_radius: p.Property<BorderRadius>;
    } & Mixins;
    type Mixins = mixins.Text & mixins.BorderLine & mixins.BackgroundFill & mixins.BackgroundHatch;
    type Visuals = Annotation.Visuals & {
        text: visuals.Text;
        border_line: visuals.Line;
        background_fill: visuals.Fill;
        background_hatch: visuals.Hatch;
    };
}
export interface TextAnnotation extends TextAnnotation.Attrs {
}
export declare abstract class TextAnnotation extends Annotation {
    properties: TextAnnotation.Props;
    __view_type__: TextAnnotationView;
    constructor(attrs?: Partial<TextAnnotation.Attrs>);
}
//# sourceMappingURL=text_annotation.d.ts.map