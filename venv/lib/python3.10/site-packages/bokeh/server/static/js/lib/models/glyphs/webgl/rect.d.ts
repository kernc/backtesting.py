import type { ReglWrapper } from "./regl_wrap";
import { SXSYGlyphGL } from "./sxsy";
import type { GLMarkerType } from "./types";
import type { RectView } from "../rect";
export declare class RectGL extends SXSYGlyphGL {
    readonly glyph: RectView;
    constructor(regl_wrapper: ReglWrapper, glyph: RectView);
    get marker_type(): GLMarkerType;
    protected _set_data(): void;
    protected _set_once(): void;
}
//# sourceMappingURL=rect.d.ts.map