import type { DOMBoxSizing, UIElement, UIElementView } from "../ui/ui_element";
import { Pane, PaneView } from "../ui/pane";
import { Signal } from "../../core/signaling";
import { Align, Dimensions, FlowMode, SizingMode } from "../../core/enums";
import type * as p from "../../core/properties";
import type { ViewStorage, IterViews } from "../../core/build_views";
import type { DOMElementView } from "../../core/dom_view";
import type { Layoutable } from "../../core/layout";
import { SizingPolicy } from "../../core/layout";
import { CanvasLayer } from "../../core/util/canvas";
export { type DOMBoxSizing };
export type CSSSizeKeyword = "auto" | "min-content" | "fit-content" | "max-content";
type InnerDisplay = "block" | "inline";
type OuterDisplay = "flow" | "flow-root" | "flex" | "grid" | "table";
export type FullDisplay = {
    inner: InnerDisplay;
    outer: OuterDisplay;
};
export declare abstract class LayoutDOMView extends PaneView {
    model: LayoutDOM;
    parent: DOMElementView | null;
    protected readonly _child_views: ViewStorage<UIElement>;
    layout?: Layoutable;
    readonly mouseenter: Signal<MouseEvent, this>;
    readonly mouseleave: Signal<MouseEvent, this>;
    readonly disabled: Signal<boolean, this>;
    get is_layout_root(): boolean;
    _after_resize(): void;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    children(): IterViews;
    abstract get child_models(): UIElement[];
    get child_views(): UIElementView[];
    get layoutable_views(): LayoutDOMView[];
    build_child_views(): Promise<UIElementView[]>;
    render(): void;
    protected _update_children(): void;
    update_children(): Promise<void>;
    protected readonly _auto_width: CSSSizeKeyword;
    protected readonly _auto_height: CSSSizeKeyword;
    protected _intrinsic_display(): FullDisplay;
    protected _update_layout(): void;
    update_layout(): void;
    get is_managed(): boolean;
    /**
     * Update CSS layout with computed values from canvas layout.
     * This can be done more frequently than `_update_layout()`.
     */
    protected _measure_layout(): void;
    measure_layout(): void;
    private _layout_computed;
    compute_layout(): void;
    protected _compute_layout(): void;
    protected _propagate_layout(): void;
    update_bbox(): boolean;
    protected _after_layout(): void;
    after_layout(): void;
    _after_render(): void;
    invalidate_layout(): void;
    invalidate_render(): void;
    has_finished(): boolean;
    box_sizing(): DOMBoxSizing;
    export(type?: "auto" | "png" | "svg", hidpi?: boolean): CanvasLayer;
}
export declare namespace LayoutDOM {
    type Attrs = p.AttrsOf<Props>;
    type Props = Pane.Props & {
        width: p.Property<number | null>;
        height: p.Property<number | null>;
        min_width: p.Property<number | null>;
        min_height: p.Property<number | null>;
        max_width: p.Property<number | null>;
        max_height: p.Property<number | null>;
        margin: p.Property<number | [number, number] | [number, number, number, number] | null>;
        width_policy: p.Property<SizingPolicy | "auto">;
        height_policy: p.Property<SizingPolicy | "auto">;
        aspect_ratio: p.Property<number | "auto" | null>;
        flow_mode: p.Property<FlowMode>;
        sizing_mode: p.Property<SizingMode | null>;
        disabled: p.Property<boolean>;
        align: p.Property<Align | [Align, Align] | "auto">;
        resizable: p.Property<boolean | Dimensions>;
    };
}
export interface LayoutDOM extends LayoutDOM.Attrs {
}
export declare abstract class LayoutDOM extends Pane {
    properties: LayoutDOM.Props;
    __view_type__: LayoutDOMView;
    constructor(attrs?: Partial<LayoutDOM.Attrs>);
}
//# sourceMappingURL=layout_dom.d.ts.map