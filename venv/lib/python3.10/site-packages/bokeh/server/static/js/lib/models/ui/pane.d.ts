import { UIElement, UIElementView } from "./ui_element";
import { DOMNode } from "../dom/dom_node";
import { HTML } from "../dom/html";
import type { ViewStorage, BuildResult, IterViews, ViewOf } from "../../core/build_views";
import type * as p from "../../core/properties";
export declare const ElementLike: import("../../core/kinds").Kinds.Or<[UIElement, DOMNode, HTML]>;
export type ElementLike = typeof ElementLike["__type__"];
export declare class PaneView extends UIElementView {
    model: Pane;
    protected readonly _element_views: ViewStorage<ElementLike>;
    get elements(): ElementLike[];
    get element_views(): ViewOf<ElementLike>[];
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    protected _build_elements(): Promise<BuildResult<ElementLike>>;
    protected _update_elements(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    render(): void;
    has_finished(): boolean;
}
export declare namespace Pane {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        elements: p.Property<ElementLike[]>;
    };
}
export interface Pane extends Pane.Attrs {
}
export declare class Pane extends UIElement {
    properties: Pane.Props;
    __view_type__: PaneView;
    constructor(attrs?: Partial<Pane.Attrs>);
}
//# sourceMappingURL=pane.d.ts.map