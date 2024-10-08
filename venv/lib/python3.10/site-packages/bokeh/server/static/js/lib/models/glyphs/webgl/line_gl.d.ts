import type { Transform } from "./base";
import type { BaseLineVisuals } from "./base_line";
import { Uint8Buffer } from "./buffer";
import type { ReglWrapper } from "./regl_wrap";
import { SingleLineGL } from "./single_line";
import type { LineView } from "../line";
export declare class LineGL extends SingleLineGL {
    readonly glyph: LineView;
    constructor(regl_wrapper: ReglWrapper, glyph: LineView);
    draw(indices: number[], main_glyph: LineView, transform: Transform): void;
    protected _get_show_buffer(indices: number[], main_gl_glyph: LineGL): Uint8Buffer;
    protected _get_visuals(): BaseLineVisuals;
    protected _set_data_points(): Float32Array;
}
//# sourceMappingURL=line_gl.d.ts.map