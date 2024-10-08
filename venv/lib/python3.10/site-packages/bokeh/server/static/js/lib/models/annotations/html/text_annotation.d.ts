import { Annotation, AnnotationView } from "../annotation";
import type * as visuals from "../../../core/visuals";
import type * as p from "../../../core/properties";
import type { Context2d } from "../../../core/util/canvas";
import { Padding, BorderRadius } from "../../common/kinds";
import type { LRTB, Corners } from "../../../core/util/bbox";
export declare abstract class TextAnnotationView extends AnnotationView {
    model: TextAnnotation;
    visuals: TextAnnotation.Visuals;
    protected text_el: Node;
    rendering_target(): HTMLElement;
    update_layout(): void;
    initialize(): void;
    connect_signals(): void;
    paint(): void;
    get padding(): LRTB<number>;
    get border_radius(): Corners<number>;
    render(): void;
    protected _paint_text(ctx: Context2d, text: string, sx: number, sy: number, angle: number): void;
}
export declare namespace TextAnnotation {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        padding: p.Property<Padding>;
        border_radius: p.Property<BorderRadius>;
    };
    type Visuals = Annotation.Visuals & {
        text: visuals.Text;
        border_line: visuals.Line;
        background_fill: visuals.Fill;
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