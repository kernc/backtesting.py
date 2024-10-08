import type { ReglWrapper } from "./regl_wrap";
import { RadialGL } from "./radial";
import type { GLMarkerType } from "./types";
import type { NgonView } from "../ngon";
export declare class NgonGL extends RadialGL {
    readonly glyph: NgonView;
    constructor(regl_wrapper: ReglWrapper, glyph: NgonView);
    get marker_type(): GLMarkerType;
    protected _set_data(): void;
}
//# sourceMappingURL=ngon.d.ts.map