import { Markup, MarkupView } from "./markup";
import type * as p from "../../core/properties";
export declare class PreTextView extends MarkupView {
    model: PreText;
    render(): void;
}
export declare namespace PreText {
    type Attrs = p.AttrsOf<Props>;
    type Props = Markup.Props;
}
export interface PreText extends PreText.Attrs {
}
export declare class PreText extends Markup {
    properties: PreText.Props;
    __view_type__: PreTextView;
    constructor(attrs?: Partial<PreText.Attrs>);
}
//# sourceMappingURL=pretext.d.ts.map