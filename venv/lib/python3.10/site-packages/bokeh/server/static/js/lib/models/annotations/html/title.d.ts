import { TextAnnotation, TextAnnotationView } from "./text_annotation";
import { VerticalAlign, TextAlign } from "../../../core/enums";
import type { Size, Layoutable } from "../../../core/layout";
import type { SidePanel } from "../../../core/layout/side_panel";
import * as mixins from "../../../core/property_mixins";
import type * as p from "../../../core/properties";
export declare class HTMLTitleView extends TextAnnotationView {
    model: HTMLTitle;
    visuals: HTMLTitle.Visuals;
    layout: Layoutable;
    panel: SidePanel;
    protected _get_location(): [number, number];
    protected _paint(): void;
    protected _get_size(): Size;
}
export declare namespace HTMLTitle {
    type Attrs = p.AttrsOf<Props>;
    type Props = TextAnnotation.Props & {
        text: p.Property<string>;
        vertical_align: p.Property<VerticalAlign>;
        align: p.Property<TextAlign>;
        offset: p.Property<number>;
        standoff: p.Property<number>;
    } & Mixins;
    type Mixins = mixins.Text & mixins.BorderLine & mixins.BackgroundFill & mixins.BackgroundHatch;
    type Visuals = TextAnnotation.Visuals;
}
export interface HTMLTitle extends HTMLTitle.Attrs {
}
export declare class HTMLTitle extends TextAnnotation {
    properties: HTMLTitle.Props;
    __view_type__: HTMLTitleView;
    constructor(attrs?: Partial<HTMLTitle.Attrs>);
}
//# sourceMappingURL=title.d.ts.map