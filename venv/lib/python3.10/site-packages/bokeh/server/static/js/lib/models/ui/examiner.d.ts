import { UIElement, UIElementView } from "./ui_element";
import * as p from "../../core/properties";
import { HasProps } from "../../core/has_props";
import type { StyleSheetLike } from "../../core/dom";
import { Model } from "../../model";
import type { PlainObject } from "../../core/types";
export declare class HTMLPrinter {
    readonly click?: ((obj: unknown) => void) | undefined;
    readonly max_items: number;
    readonly max_depth: number;
    protected readonly visited: WeakSet<object>;
    protected depth: number;
    constructor(click?: ((obj: unknown) => void) | undefined, max_items?: number, max_depth?: number);
    to_html(obj: unknown): HTMLElement;
    null(): HTMLElement;
    token(val: string): HTMLElement;
    boolean(val: boolean): HTMLElement;
    number(val: number): HTMLElement;
    string(val: string): HTMLElement;
    symbol(val: symbol): HTMLElement;
    array(obj: unknown[]): HTMLElement;
    iterable(obj: Iterable<unknown>): HTMLElement;
    object(obj: PlainObject): HTMLElement;
    model(obj: Model): HTMLElement;
    property(obj: p.Property): HTMLElement;
}
export declare class ExaminerView extends UIElementView {
    model: Examiner;
    stylesheets(): StyleSheetLike[];
    private prev_listener;
    private watched_props;
    render(): void;
}
export declare namespace Examiner {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        target: p.Property<HasProps | null>;
    };
}
export interface Examiner extends Examiner.Attrs {
}
export declare class Examiner extends UIElement {
    properties: Examiner.Props;
    __view_type__: ExaminerView;
    constructor(attrs?: Partial<Examiner.Attrs>);
}
//# sourceMappingURL=examiner.d.ts.map