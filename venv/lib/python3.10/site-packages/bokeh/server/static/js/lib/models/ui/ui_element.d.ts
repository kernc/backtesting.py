import { StyledElement, StyledElementView } from "./styled_element";
import type { Node } from "../coordinates/node";
import type { Menu } from "./menus/menu";
import type { Align } from "../../core/enums";
import type { SizingPolicy } from "../../core/layout";
import type { ViewOf } from "../../core/view";
import type { StyleSheet, StyleSheetLike } from "../../core/dom";
import { InlineStyleSheet } from "../../core/dom";
import { CanvasLayer } from "../../core/util/canvas";
import type { XY } from "../../core/util/bbox";
import { BBox } from "../../core/util/bbox";
import type * as p from "../../core/properties";
export type DOMBoxSizing = {
    width_policy: SizingPolicy | "auto";
    height_policy: SizingPolicy | "auto";
    width: number | null;
    height: number | null;
    aspect_ratio: number | "auto" | null;
    halign?: Align;
    valign?: Align;
};
export declare abstract class UIElementView extends StyledElementView {
    model: UIElement;
    protected readonly _display: InlineStyleSheet;
    protected _stylesheets(): Iterable<StyleSheet>;
    stylesheets(): StyleSheetLike[];
    update_style(): void;
    box_sizing(): DOMBoxSizing;
    private _bbox;
    get bbox(): BBox;
    update_bbox(): boolean;
    protected _update_bbox(): boolean;
    protected _resize_observer: ResizeObserver;
    protected _context_menu: ViewOf<Menu> | null;
    initialize(): void;
    lazy_initialize(): Promise<void>;
    connect_signals(): void;
    get_context_menu(_xy: XY): ViewOf<Menu> | null;
    show_context_menu(event: MouseEvent): void;
    remove(): void;
    private _resized;
    protected _after_resize(): void;
    after_resize(): void;
    render(): void;
    protected _after_render(): void;
    after_render(): void;
    private _is_displayed;
    get is_displayed(): boolean;
    protected _apply_visible(): void;
    protected _update_visible(): void;
    export(type?: "auto" | "png" | "svg", hidpi?: boolean): CanvasLayer;
    resolve_symbol(node: Node): XY | number;
}
export declare namespace UIElement {
    type Attrs = p.AttrsOf<Props>;
    type Props = StyledElement.Props & {
        visible: p.Property<boolean>;
        context_menu: p.Property<Menu | null>;
    };
}
export interface UIElement extends UIElement.Attrs {
}
export declare abstract class UIElement extends StyledElement {
    properties: UIElement.Props;
    __view_type__: UIElementView;
    constructor(attrs?: Partial<UIElement.Attrs>);
}
//# sourceMappingURL=ui_element.d.ts.map