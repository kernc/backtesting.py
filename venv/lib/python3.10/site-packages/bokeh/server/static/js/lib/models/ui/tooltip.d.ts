import { UIElement, UIElementView } from "./ui_element";
import { DOMNode } from "../dom/dom_node";
import { Coordinate } from "../coordinates/coordinate";
import { Selector } from "../selectors/selector";
import { Anchor, TooltipAttachment } from "../../core/enums";
import type { StyleSheetLike } from "../../core/dom";
import type { IterViews, ViewOf } from "../../core/build_views";
import type * as p from "../../core/properties";
declare const NativeNode: {
    new (): Node;
    prototype: Node;
    readonly ELEMENT_NODE: 1;
    readonly ATTRIBUTE_NODE: 2;
    readonly TEXT_NODE: 3;
    readonly CDATA_SECTION_NODE: 4;
    readonly ENTITY_REFERENCE_NODE: 5;
    readonly ENTITY_NODE: 6;
    readonly PROCESSING_INSTRUCTION_NODE: 7;
    readonly COMMENT_NODE: 8;
    readonly DOCUMENT_NODE: 9;
    readonly DOCUMENT_TYPE_NODE: 10;
    readonly DOCUMENT_FRAGMENT_NODE: 11;
    readonly NOTATION_NODE: 12;
    readonly DOCUMENT_POSITION_DISCONNECTED: 1;
    readonly DOCUMENT_POSITION_PRECEDING: 2;
    readonly DOCUMENT_POSITION_FOLLOWING: 4;
    readonly DOCUMENT_POSITION_CONTAINS: 8;
    readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
};
type NativeNode = globalThis.Node;
export declare class TooltipView extends UIElementView {
    model: Tooltip;
    protected arrow_el: HTMLElement;
    protected content_el: HTMLElement;
    protected _observer: ResizeObserver;
    private _target;
    get target(): Element;
    set target(el: Element);
    protected _init_target(): void;
    initialize(): void;
    protected _element_view: ViewOf<DOMNode | UIElement> | null;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    protected _build_content(): Promise<void>;
    private _scroll_listener?;
    connect_signals(): void;
    disconnect_signals(): void;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    get content(): NativeNode;
    private _has_rendered;
    render(): void;
    _after_render(): void;
    _after_resize(): void;
    private _anchor_to_align;
    protected _reposition(): void;
}
export declare namespace Tooltip {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        target: p.Property<UIElement | Selector | NativeNode | "auto">;
        position: p.Property<Anchor | [number, number] | Coordinate | null>;
        content: p.Property<string | DOMNode | UIElement | NativeNode>;
        attachment: p.Property<TooltipAttachment | "auto">;
        show_arrow: p.Property<boolean>;
        closable: p.Property<boolean>;
        interactive: p.Property<boolean>;
    };
}
export interface Tooltip extends Tooltip.Attrs {
}
export declare class Tooltip extends UIElement {
    properties: Tooltip.Props;
    __view_type__: TooltipView;
    constructor(attrs?: Partial<Tooltip.Attrs>);
    show({ x, y }: {
        x: number;
        y: number;
    }): void;
    clear(): void;
}
export {};
//# sourceMappingURL=tooltip.d.ts.map