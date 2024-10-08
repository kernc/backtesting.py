import { Markup, MarkupView } from "./markup";
import type * as p from "../../core/properties";
export declare class DivView extends MarkupView {
    model: Div;
    render(): void;
}
export declare namespace Div {
    type Attrs = p.AttrsOf<Props>;
    type Props = Markup.Props & {
        render_as_text: p.Property<boolean>;
    };
}
export interface Div extends Div.Attrs {
}
export declare class Div extends Markup {
    properties: Div.Props;
    __view_type__: DivView;
    constructor(attrs?: Partial<Div.Attrs>);
}
//# sourceMappingURL=div.d.ts.map