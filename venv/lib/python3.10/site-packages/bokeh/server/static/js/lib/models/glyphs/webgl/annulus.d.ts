import type { ReglWrapper } from "./regl_wrap";
import type { Float32Buffer } from "./buffer";
import { SXSYGlyphGL } from "./sxsy";
import type { GLMarkerType } from "./types";
import type { AnnulusView } from "../annulus";
export declare class AnnulusGL extends SXSYGlyphGL {
    readonly glyph: AnnulusView;
    constructor(regl_wrapper: ReglWrapper, glyph: AnnulusView);
    get marker_type(): GLMarkerType;
    get outer_radius(): Float32Buffer;
    get inner_radius(): Float32Buffer;
    protected _set_data(): void;
    protected _set_once(): void;
}
//# sourceMappingURL=annulus.d.ts.map