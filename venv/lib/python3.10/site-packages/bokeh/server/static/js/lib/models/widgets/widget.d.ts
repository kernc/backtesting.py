import { LayoutDOM, LayoutDOMView } from "../layouts/layout_dom";
import type { MathJaxProvider } from "../text/providers";
import type * as p from "../../core/properties";
export declare abstract class WidgetView extends LayoutDOMView {
    model: Widget;
    get child_models(): LayoutDOM[];
    get provider(): MathJaxProvider;
    lazy_initialize(): Promise<void>;
    _after_layout(): void;
    process_tex(text: string): string;
    protected contains_tex_string(text: string): boolean;
}
export declare namespace Widget {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props;
}
export interface Widget extends Widget.Attrs {
}
export declare abstract class Widget extends LayoutDOM {
    properties: Widget.Props;
    __view_type__: WidgetView;
    constructor(attrs?: Partial<Widget.Attrs>);
}
//# sourceMappingURL=widget.d.ts.map