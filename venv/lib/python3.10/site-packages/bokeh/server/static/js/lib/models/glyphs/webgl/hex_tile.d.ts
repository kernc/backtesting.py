import type { ReglWrapper } from "./regl_wrap";
import { SXSYGlyphGL } from "./sxsy";
import type { GLMarkerType } from "./types";
import type { HexTileView } from "../hex_tile";
export declare class HexTileGL extends SXSYGlyphGL {
    readonly glyph: HexTileView;
    constructor(regl_wrapper: ReglWrapper, glyph: HexTileView);
    get marker_type(): GLMarkerType;
    protected _set_data(): void;
    protected _set_once(): void;
}
//# sourceMappingURL=hex_tile.d.ts.map