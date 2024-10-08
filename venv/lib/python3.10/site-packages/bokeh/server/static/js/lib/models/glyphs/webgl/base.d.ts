import type { Context2d } from "../../../core/util/canvas";
import type { GlyphView } from "../glyph";
import type { ReglWrapper } from "./regl_wrap";
export type BaseGLGlyphConstructor = {
    new (regl: ReglWrapper, base_glyph: GlyphView): BaseGLGlyph;
};
export declare abstract class BaseGLGlyph {
    protected readonly regl_wrapper: ReglWrapper;
    readonly glyph: GlyphView;
    protected nvertices: number;
    protected size_changed: boolean;
    protected data_changed: boolean;
    protected data_mapped: boolean;
    protected visuals_changed: boolean;
    constructor(regl_wrapper: ReglWrapper, glyph: GlyphView);
    set_data_changed(): void;
    set_data_mapped(): void;
    set_visuals_changed(): void;
    render(_ctx: Context2d, indices: number[], mainglyph: GlyphView): void;
    abstract draw(indices: number[], mainglyph: GlyphView, trans: Transform): void;
}
export type Transform = {
    pixel_ratio: number;
    width: number;
    height: number;
};
//# sourceMappingURL=base.d.ts.map