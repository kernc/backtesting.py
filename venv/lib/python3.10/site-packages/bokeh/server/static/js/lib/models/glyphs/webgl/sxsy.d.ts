import type { ReglWrapper } from "./regl_wrap";
import type { SingleMarkerGlyphView } from "./single_marker";
import { SingleMarkerGL } from "./single_marker";
import type { Arrayable } from "../../../core/types";
export type SXSYGlyphView = SingleMarkerGlyphView & {
    sx: Arrayable<number>;
    sy: Arrayable<number>;
};
export declare abstract class SXSYGlyphGL extends SingleMarkerGL {
    readonly glyph: SXSYGlyphView;
    constructor(regl_wrapper: ReglWrapper, glyph: SXSYGlyphView);
    protected _set_data(): void;
}
//# sourceMappingURL=sxsy.d.ts.map