import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
import { Widget, WidgetView } from "./widget";
export declare abstract class MarkupView extends WidgetView {
    model: Markup;
    protected markup_el: HTMLElement;
    protected readonly _auto_width = "fit-content";
    protected readonly _auto_height = "auto";
    lazy_initialize(): Promise<void>;
    has_math_disabled(): boolean;
    protected rerender(): void;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
}
export declare namespace Markup {
    type Attrs = p.AttrsOf<Props>;
    type Props = Widget.Props & {
        text: p.Property<string>;
        disable_math: p.Property<boolean>;
    };
}
export interface Markup extends Markup.Attrs {
}
export declare abstract class Markup extends Widget {
    properties: Markup.Props;
    __view_type__: MarkupView;
    constructor(attrs?: Partial<Markup.Attrs>);
}
//# sourceMappingURL=markup.d.ts.map