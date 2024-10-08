import { UIElement, UIElementView } from "../ui/ui_element";
import { DOMNode } from "../dom/dom_node";
import type { StyleSheetLike } from "../../core/dom";
import { InlineStyleSheet } from "../../core/dom";
import type { IterViews, ViewOf } from "../../core/build_views";
import type * as p from "../../core/properties";
import type { LRTB } from "../../core/util/bbox";
import { BBox } from "../../core/util/bbox";
import * as Box from "../common/box_kinds";
declare const UIElementLike: import("../../core/kinds").Kinds.Or<[UIElement, DOMNode]>;
type UIElementLike = typeof UIElementLike["__type__"];
type CSSVal = number | string;
type Position<T> = ({
    left: T;
    width: T;
} | {
    right: T;
    width: T;
} | {
    left: T;
    right: T;
} | {
    width: T;
}) & ({
    top: T;
    height: T;
} | {
    bottom: T;
    height: T;
} | {
    top: T;
    bottom: T;
} | {
    height: T;
});
type CSSPosition = Position<CSSVal>;
export declare class DialogView extends UIElementView {
    model: Dialog;
    protected _title: ViewOf<UIElementLike>;
    protected _content: ViewOf<UIElementLike>;
    children(): IterViews;
    protected readonly _position: InlineStyleSheet;
    protected readonly _stacking: InlineStyleSheet;
    stylesheets(): StyleSheetLike[];
    lazy_initialize(): Promise<void>;
    connect_signals(): void;
    remove(): void;
    protected _has_rendered: boolean;
    protected _handles: {
        [key in Box.HitTarget]: HTMLElement;
    };
    protected _pin_el: HTMLElement;
    protected _collapse_el: HTMLElement;
    protected _minimize_el: HTMLElement;
    protected _maximize_el: HTMLElement;
    protected _close_el: HTMLElement;
    protected _reposition(position: CSSPosition): void;
    render(): void;
    get resizable(): LRTB<boolean>;
    protected _hit_target(path: EventTarget[]): Box.HitTarget | null;
    protected _can_hit(target: Box.HitTarget): boolean;
    protected _move_bbox(target: Box.HitTarget, bbox: BBox, dx: number, dy: number): BBox;
    protected _pinned: boolean;
    pin(): void;
    protected _pin(value: boolean): void;
    protected _normal_bbox: BBox | null;
    protected _collapsed: boolean;
    collapse(): void;
    protected _collapse(value: boolean): void;
    protected _minimized: boolean;
    minimize(): void;
    protected _minimize(value: boolean): void;
    protected _maximized: boolean;
    maximize(): void;
    protected _maximize(value: boolean): void;
    restore(): void;
    protected _toggle(show: boolean): void;
    open(): void;
    close(): void;
    bring_to_front(): void;
}
export declare namespace Dialog {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        title: p.Property<string | UIElementLike | null>;
        content: p.Property<string | UIElementLike>;
        pinnable: p.Property<boolean>;
        collapsible: p.Property<boolean>;
        minimizable: p.Property<boolean>;
        maximizable: p.Property<boolean>;
        closable: p.Property<boolean>;
        close_action: p.Property<"hide" | "destroy">;
        resizable: p.Property<Box.Resizable>;
        movable: p.Property<Box.Movable>;
        symmetric: p.Property<boolean>;
        top_limit: p.Property<Box.Limit>;
        bottom_limit: p.Property<Box.Limit>;
        left_limit: p.Property<Box.Limit>;
        right_limit: p.Property<Box.Limit>;
    };
}
export interface Dialog extends Dialog.Attrs {
}
export declare class Dialog extends UIElement {
    properties: Dialog.Props;
    __view_type__: DialogView;
    constructor(attrs?: Partial<Dialog.Attrs>);
}
export {};
//# sourceMappingURL=dialog.d.ts.map