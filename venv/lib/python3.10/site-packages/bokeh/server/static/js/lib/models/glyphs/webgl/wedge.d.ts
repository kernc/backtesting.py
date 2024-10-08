import type { ReglWrapper } from "./regl_wrap";
import type { Float32Buffer } from "./buffer";
import { SXSYGlyphGL } from "./sxsy";
import type { GLMarkerType } from "./types";
import type { WedgeView } from "../wedge";
export declare class WedgeGL extends SXSYGlyphGL {
    readonly glyph: WedgeView;
    constructor(regl_wrapper: ReglWrapper, glyph: WedgeView);
    get marker_type(): GLMarkerType;
    get radius(): Float32Buffer;
    get start_angle(): Float32Buffer;
    get end_angle(): Float32Buffer;
    protected _set_data(): void;
    protected _set_once(): void;
}
//# sourceMappingURL=wedge.d.ts.map