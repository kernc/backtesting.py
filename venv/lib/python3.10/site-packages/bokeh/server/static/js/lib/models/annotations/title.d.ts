import { TextAnnotation, TextAnnotationView } from "./text_annotation";
import { VerticalAlign, TextAlign } from "../../core/enums";
import type { Size, Layoutable } from "../../core/layout";
import type { SidePanel } from "../../core/layout/side_panel";
import type * as p from "../../core/properties";
import type { XY, SXY } from "../../core/util/bbox";
import type { Position } from "../../core/graphics";
export declare class TitleView extends TextAnnotationView {
    model: Title;
    visuals: Title.Visuals;
    layout: Layoutable;
    panel: SidePanel;
    protected _get_position(): Position;
    get anchor(): XY<number>;
    get origin(): SXY;
    get angle(): number;
    protected _get_size(): Size;
}
export declare namespace Title {
    type Attrs = p.AttrsOf<Props>;
    type Props = TextAnnotation.Props & {
        vertical_align: p.Property<VerticalAlign>;
        align: p.Property<TextAlign>;
        offset: p.Property<number>;
        standoff: p.Property<number>;
    };
    type Visuals = TextAnnotation.Visuals;
}
export interface Title extends Title.Attrs {
}
export declare class Title extends TextAnnotation {
    properties: Title.Props;
    __view_type__: TitleView;
    constructor(attrs?: Partial<Title.Attrs>);
}
//# sourceMappingURL=title.d.ts.map