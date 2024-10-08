import { DOMNode, DOMNodeView } from "./dom_node";
import { StylesLike } from "../ui/styled_element";
import { UIElement } from "../ui/ui_element";
import type { ViewStorage, IterViews } from "../../core/build_views";
import type * as p from "../../core/properties";
export declare abstract class DOMElementView extends DOMNodeView {
    model: DOMElement;
    el: HTMLElement;
    readonly child_views: ViewStorage<DOMNode | UIElement>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    render(): void;
}
export declare namespace DOMElement {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMNode.Props & {
        style: p.Property<StylesLike>;
        children: p.Property<(string | DOMNode | UIElement)[]>;
    };
}
export interface DOMElement extends DOMElement.Attrs {
}
export declare abstract class DOMElement extends DOMNode {
    properties: DOMElement.Props;
    __view_type__: DOMElementView;
    constructor(attrs?: Partial<DOMElement.Attrs>);
}
//# sourceMappingURL=dom_element.d.ts.map