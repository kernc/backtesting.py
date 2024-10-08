import type { ReglWrapper } from "./regl_wrap";
import type { Float32Buffer } from "./buffer";
import { SXSYGlyphGL } from "./sxsy";
import type { GLMarkerType } from "./types";
import type { AnnularWedgeView } from "../annular_wedge";
export declare class AnnularWedgeGL extends SXSYGlyphGL {
    readonly glyph: AnnularWedgeView;
    constructor(regl_wrapper: ReglWrapper, glyph: AnnularWedgeView);
    get marker_type(): GLMarkerType;
    get outer_radius(): Float32Buffer;
    get inner_radius(): Float32Buffer;
    get start_angle(): Float32Buffer;
    get end_angle(): Float32Buffer;
    protected _set_data(): void;
}
//# sourceMappingURL=annular_wedge.d.ts.map