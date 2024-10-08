import type { Transform } from "./base";
import { BaseGLGlyph } from "./base";
import { Float32Buffer, NormalizedUint8Buffer, Uint8Buffer } from "./buffer";
import type { ReglWrapper } from "./regl_wrap";
import type { GlyphView } from "../glyph";
import type * as visuals from "../../../core/visuals";
import type { Framebuffer2D, Texture2D } from "regl";
import type { Arrayable } from "../../../core/types";
export type BaseLineVisuals = visuals.LineVector | visuals.LineScalar;
export declare abstract class BaseLineGL extends BaseGLGlyph {
    readonly glyph: GlyphView;
    protected readonly _antialias: number;
    protected readonly _miter_limit = 10;
    protected _points?: Float32Buffer;
    protected _show?: Uint8Buffer;
    protected readonly _linewidth: Float32Buffer;
    protected readonly _line_color: NormalizedUint8Buffer;
    protected readonly _line_cap: Uint8Buffer;
    protected readonly _line_join: Uint8Buffer;
    protected _is_dashed: boolean;
    protected _length_so_far?: Float32Buffer;
    protected _dash_tex: (Texture2D | null)[];
    protected _dash_tex_info?: Float32Buffer;
    protected _dash_scale?: Float32Buffer;
    protected _dash_offset?: Float32Buffer;
    constructor(regl_wrapper: ReglWrapper, glyph: GlyphView);
    abstract draw(_indices: number[], main_glyph: GlyphView, transform: Transform): void;
    protected _draw_single(main_gl_glyph: BaseLineGL, transform: Transform, line_offset: number, point_offset: number, nsegments: number, framebuffer: Framebuffer2D | null, show?: Uint8Buffer | null): void;
    protected abstract _get_visuals(): BaseLineVisuals;
    protected abstract _set_data(data_changed: boolean): void;
    protected _set_length_single(length_so_far: Float32Array, points: Float32Array, show: Uint8Array): void;
    protected _set_points_single(points: Float32Array, sx: Arrayable<number>, sy: Arrayable<number>): void;
    protected _set_show_single(show: Uint8Array, points: Float32Array): void;
    protected _set_visuals(): void;
}
//# sourceMappingURL=base_line.d.ts.map