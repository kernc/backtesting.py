import { Markup, MarkupView } from "./markup";
import type * as p from "../../core/properties";
export declare class ParagraphView extends MarkupView {
    model: Paragraph;
    render(): void;
}
export declare namespace Paragraph {
    type Attrs = p.AttrsOf<Props>;
    type Props = Markup.Props;
}
export interface Paragraph extends Paragraph.Attrs {
}
export declare class Paragraph extends Markup {
    properties: Paragraph.Props;
    __view_type__: ParagraphView;
    constructor(attrs?: Partial<Paragraph.Attrs>);
}
//# sourceMappingURL=paragraph.d.ts.map