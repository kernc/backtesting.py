import { Renderer, RendererView } from "./renderer";
import { UIElement } from "../ui/ui_element";
import { DOMNode } from "../dom/dom_node";
import type { ViewStorage, BuildResult, IterViews, ViewOf } from "../../core/build_views";
import type * as p from "../../core/properties";
declare const ElementLike: import("../../core/kinds").Kinds.Or<[UIElement, DOMNode]>;
type ElementLike = typeof ElementLike["__type__"];
export declare abstract class CompositeRendererView extends RendererView {
    model: CompositeRenderer;
    protected readonly _renderer_views: ViewStorage<Renderer>;
    get renderer_views(): ViewOf<Renderer>[];
    protected readonly _element_views: ViewStorage<ElementLike>;
    get element_views(): ViewOf<ElementLike>[];
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    protected readonly _computed_renderers: Renderer[];
    get computed_renderers(): Renderer[];
    get computed_renderer_views(): ViewOf<Renderer>[];
    protected _build_renderers(): Promise<BuildResult<Renderer>>;
    protected readonly _computed_elements: ElementLike[];
    get computed_elements(): ElementLike[];
    get computed_element_views(): ViewOf<ElementLike>[];
    protected _build_elements(): Promise<BuildResult<ElementLike>>;
    protected _update_renderers(): Promise<void>;
    protected _update_elements(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    private _has_rendered_elements;
    paint(): void;
    has_finished(): boolean;
}
export declare namespace CompositeRenderer {
    type Attrs = p.AttrsOf<Props>;
    type Props = Renderer.Props & {
        renderers: p.Property<Renderer[]>;
        elements: p.Property<ElementLike[]>;
    };
    type Visuals = Renderer.Visuals;
}
export interface CompositeRenderer extends CompositeRenderer.Attrs {
}
export declare abstract class CompositeRenderer extends Renderer {
    properties: CompositeRenderer.Props;
    __view_type__: CompositeRendererView;
    constructor(attrs?: Partial<CompositeRenderer.Attrs>);
}
export {};
//# sourceMappingURL=composite_renderer.d.ts.map