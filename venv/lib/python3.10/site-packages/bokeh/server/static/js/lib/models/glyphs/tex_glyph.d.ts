import { MathTextGlyph, MathTextGlyphView } from "./math_text_glyph";
import type { BaseText } from "../text/base_text";
import type * as p from "../../core/properties";
import type { Dict } from "../../core/types";
export declare const DisplayMode: import("../../core/kinds").Kinds.Or<["block" | "inline", "auto"]>;
export type DisplayMode = typeof DisplayMode["__type__"];
export interface TeXGlyphView extends TeXGlyph.Data {
}
export declare class TeXGlyphView extends MathTextGlyphView {
    model: TeXGlyph;
    visuals: TeXGlyph.Visuals;
    protected _build_label(text: string): BaseText;
}
export declare namespace TeXGlyph {
    type Attrs = p.AttrsOf<Props>;
    type Props = MathTextGlyph.Props & {
        macros: p.Property<Dict<string | [string, number]>>;
        display: p.Property<DisplayMode>;
    };
    type Visuals = MathTextGlyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface TeXGlyph extends TeXGlyph.Attrs {
}
export declare class TeXGlyph extends MathTextGlyph {
    properties: TeXGlyph.Props;
    __view_type__: TeXGlyphView;
    constructor(attrs?: Partial<TeXGlyph.Attrs>);
}
//# sourceMappingURL=tex_glyph.d.ts.map