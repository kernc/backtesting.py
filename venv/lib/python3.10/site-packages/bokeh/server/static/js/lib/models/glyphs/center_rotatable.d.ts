import { XYGlyph, XYGlyphView } from "./xy_glyph";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import * as p from "../../core/properties";
export interface CenterRotatableView extends CenterRotatable.Data {
}
export declare abstract class CenterRotatableView extends XYGlyphView {
    model: CenterRotatable;
    visuals: CenterRotatable.Visuals;
    get max_w2(): number;
    get max_h2(): number;
    protected _bounds({ x0, x1, y0, y1 }: Rect): Rect;
}
export declare namespace CenterRotatable {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        angle: p.AngleSpec;
        width: p.DistanceSpec;
        height: p.DistanceSpec;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface CenterRotatable extends CenterRotatable.Attrs {
}
export declare abstract class CenterRotatable extends XYGlyph {
    properties: CenterRotatable.Props;
    __view_type__: CenterRotatableView;
    constructor(attrs?: Partial<CenterRotatable.Attrs>);
}
//# sourceMappingURL=center_rotatable.d.ts.map