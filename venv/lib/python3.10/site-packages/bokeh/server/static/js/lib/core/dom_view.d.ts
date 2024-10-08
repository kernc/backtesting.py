import { View } from "./view";
import type { SerializableState } from "./view";
import type { StyleSheet, StyleSheetLike } from "./dom";
import { ClassList } from "./dom";
import type { BBox } from "./util/bbox";
export interface DOMView extends View {
    constructor: Function & {
        tag_name: keyof HTMLElementTagNameMap;
    };
}
export declare abstract class DOMView extends View {
    parent: DOMView | null;
    static tag_name: keyof HTMLElementTagNameMap;
    el: ChildNode;
    shadow_el?: ShadowRoot;
    get bbox(): BBox | undefined;
    serializable_state(): SerializableState;
    get children_el(): Node;
    initialize(): void;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    css_classes(): string[];
    abstract render(): void;
    render_to(target: Node): void;
    after_render(): void;
    r_after_render(): void;
    protected _create_element(): this["el"];
    reposition(_displayed?: boolean): void;
    protected _was_built: boolean;
    /**
     * Build a top-level DOM view (e.g. during embedding).
     */
    build(target: Node): void;
    /**
     * Define where to render this element or let the parent decide.
     *
     * This is useful when creating "floating" components or adding
     * components to canvas' layers.
     */
    rendering_target(): HTMLElement | null;
}
export declare abstract class DOMElementView extends DOMView {
    el: HTMLElement;
    class_list: ClassList;
    initialize(): void;
}
export declare abstract class DOMComponentView extends DOMElementView {
    parent: DOMElementView | null;
    readonly root: DOMComponentView;
    shadow_el: ShadowRoot;
    initialize(): void;
    stylesheets(): StyleSheetLike[];
    empty(): void;
    render(): void;
    reposition(_displayed?: boolean): void;
    protected _stylesheets(): Iterable<StyleSheet>;
    protected _css_classes(): Iterable<string>;
    protected _css_variables(): Iterable<[string, string]>;
    protected _applied_stylesheets: StyleSheet[];
    protected _apply_stylesheets(stylesheets: StyleSheet[]): void;
    protected _applied_css_classes: string[];
    protected _apply_css_classes(classes: string[]): void;
    protected _update_stylesheets(): void;
    protected _update_css_classes(): void;
    protected _update_css_variables(): void;
}
//# sourceMappingURL=dom_view.d.ts.map