import type { Transform } from "./base";
import { BaseLineGL } from "./base_line";
import { Uint8Buffer } from "./buffer";
import type { ReglWrapper } from "./regl_wrap";
import type { GlyphView } from "../glyph";
export declare abstract class SingleLineGL extends BaseLineGL {
    readonly glyph: GlyphView;
    constructor(regl_wrapper: ReglWrapper, glyph: GlyphView);
    abstract draw(indices: number[], main_glyph: GlyphView, transform: Transform): void;
    protected _draw_impl(indices: number[], transform: Transform, main_gl_glyph: SingleLineGL): void;
    protected abstract _get_show_buffer(indices: number[], main_gl_glyph: BaseLineGL): Uint8Buffer;
    protected _set_data(data_changed: boolean): void;
    protected abstract _set_data_points(): Float32Array;
    protected _set_length(): void;
}
//# sourceMappingURL=single_line.d.ts.map