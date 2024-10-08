import { CompositeRenderer, CompositeRendererView } from "../renderers/composite_renderer";
import type { SidePanel } from "../../core/layout/side_panel";
import type { Size, Layoutable } from "../../core/layout";
import type { BBox } from "../../core/util/bbox";
import type * as p from "../../core/properties";
export declare abstract class AnnotationView extends CompositeRendererView {
    model: Annotation;
    layout?: Layoutable;
    panel?: SidePanel;
    update_layout?(): void;
    after_layout?(): void;
    get bbox(): BBox | undefined;
    get_size(): Size;
    protected _get_size(): Size;
    connect_signals(): void;
    get needs_clip(): boolean;
}
export declare namespace Annotation {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeRenderer.Props;
    type Visuals = CompositeRenderer.Visuals;
}
export interface Annotation extends Annotation.Attrs {
}
export declare abstract class Annotation extends CompositeRenderer {
    properties: Annotation.Props;
    __view_type__: AnnotationView;
    constructor(attrs?: Partial<Annotation.Attrs>);
}
//# sourceMappingURL=annotation.d.ts.map