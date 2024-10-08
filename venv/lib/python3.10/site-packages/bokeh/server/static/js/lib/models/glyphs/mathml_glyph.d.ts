import { MathTextGlyph, MathTextGlyphView } from "./math_text_glyph";
import { MathML } from "../text/math_text";
import type * as p from "../../core/properties";
export interface MathMLGlyphView extends MathMLGlyph.Data {
}
export declare class MathMLGlyphView extends MathTextGlyphView {
    model: MathMLGlyph;
    visuals: MathMLGlyph.Visuals;
    protected _build_label(text: string): MathML;
}
export declare namespace MathMLGlyph {
    type Attrs = p.AttrsOf<Props>;
    type Props = MathTextGlyph.Props;
    type Visuals = MathTextGlyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface MathMLGlyph extends MathMLGlyph.Attrs {
}
export declare class MathMLGlyph extends MathTextGlyph {
    properties: MathMLGlyph.Props;
    __view_type__: MathMLGlyphView;
    constructor(attrs?: Partial<MathMLGlyph.Attrs>);
}
//# sourceMappingURL=mathml_glyph.d.ts.map