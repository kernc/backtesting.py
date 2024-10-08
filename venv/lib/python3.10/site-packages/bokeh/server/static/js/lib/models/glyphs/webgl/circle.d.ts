import type { ReglWrapper } from "./regl_wrap";
import { RadialGL } from "./radial";
import type { GLMarkerType } from "./types";
import type { CircleView } from "../circle";
export declare class CircleGL extends RadialGL {
    readonly glyph: CircleView;
    constructor(regl_wrapper: ReglWrapper, glyph: CircleView);
    get marker_type(): GLMarkerType;
    protected _set_once(): void;
}
//# sourceMappingURL=circle.d.ts.map