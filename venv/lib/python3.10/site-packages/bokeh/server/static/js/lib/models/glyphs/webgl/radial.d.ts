import type { ReglWrapper } from "./regl_wrap";
import type { Float32Buffer } from "./buffer";
import type { SXSYGlyphView } from "./sxsy";
import { SXSYGlyphGL } from "./sxsy";
import type { Arrayable } from "../../../core/types";
type RadialLikeGlyphView = SXSYGlyphView & {
    sradius: Arrayable<number>;
};
export declare abstract class RadialGL extends SXSYGlyphGL {
    readonly glyph: RadialLikeGlyphView;
    constructor(regl_wrapper: ReglWrapper, glyph: RadialLikeGlyphView);
    get size(): Float32Buffer;
    protected _set_data(): void;
    protected _set_once(): void;
}
export {};
//# sourceMappingURL=radial.d.ts.map