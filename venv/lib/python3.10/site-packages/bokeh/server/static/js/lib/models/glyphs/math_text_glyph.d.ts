import { Text, TextView } from "./text";
import type { BaseText } from "../text/base_text";
import type { GraphicsBox } from "../../core/graphics";
import type * as p from "../../core/properties";
import type { ViewStorage, IterViews } from "../../core/build_views";
export interface MathTextGlyphView extends MathTextGlyph.Data {
}
export declare abstract class MathTextGlyphView extends TextView {
    model: MathTextGlyph;
    visuals: MathTextGlyph.Visuals;
    protected _label_views: ViewStorage<BaseText>;
    remove(): void;
    children(): IterViews;
    has_finished(): boolean;
    protected abstract _build_label(text: string): BaseText;
    protected _build_labels(text: p.Uniform<string | null>): Promise<(GraphicsBox | null)[]>;
    after_lazy_visuals(): Promise<void>;
}
export declare namespace MathTextGlyph {
    type Attrs = p.AttrsOf<Props>;
    type Props = Text.Props;
    type Visuals = Text.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface MathTextGlyph extends MathTextGlyph.Attrs {
}
export declare abstract class MathTextGlyph extends Text {
    properties: MathTextGlyph.Props;
    __view_type__: MathTextGlyphView;
    constructor(attrs?: Partial<MathTextGlyph.Attrs>);
}
//# sourceMappingURL=math_text_glyph.d.ts.map