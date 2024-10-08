import { LRTB, LRTBView } from "./lrtb";
import type { LRTBRect } from "./lrtb";
import * as p from "../../core/properties";
export interface QuadView extends Quad.Data {
}
export declare class QuadView extends LRTBView {
    model: Quad;
    visuals: Quad.Visuals;
    scenterxy(i: number): [number, number];
    protected _lrtb(i: number): LRTBRect;
}
export declare namespace Quad {
    type Attrs = p.AttrsOf<Props>;
    type Props = LRTB.Props & {
        right: p.CoordinateSpec;
        bottom: p.CoordinateSpec;
        left: p.CoordinateSpec;
        top: p.CoordinateSpec;
    };
    type Visuals = LRTB.Visuals;
    type Data = LRTB.Data & p.GlyphDataOf<Props>;
}
export interface Quad extends Quad.Attrs {
}
export declare class Quad extends LRTB {
    properties: Quad.Props;
    __view_type__: QuadView;
    constructor(attrs?: Partial<Quad.Attrs>);
}
//# sourceMappingURL=quad.d.ts.map