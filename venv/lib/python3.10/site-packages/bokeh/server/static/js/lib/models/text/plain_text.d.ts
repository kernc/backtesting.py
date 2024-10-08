import { BaseText, BaseTextView } from "./base_text";
import type { GraphicsBox } from "../../core/graphics";
import type * as p from "../../core/properties";
export declare class PlainTextView extends BaseTextView {
    model: PlainText;
    initialize(): void;
    graphics(): GraphicsBox;
}
export declare namespace PlainText {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseText.Props;
}
export interface PlainText extends PlainText.Attrs {
}
export declare class PlainText extends BaseText {
    properties: PlainText.Props;
    __view_type__: PlainTextView;
    constructor(attrs?: Partial<PlainText.Attrs>);
}
//# sourceMappingURL=plain_text.d.ts.map