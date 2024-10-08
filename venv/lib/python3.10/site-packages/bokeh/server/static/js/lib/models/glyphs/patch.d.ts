import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { PointGeometry } from "../../core/geometry";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import { Selection } from "../selections/selection";
export interface PatchView extends Patch.Data {
}
export declare class PatchView extends XYGlyphView {
    model: Patch;
    visuals: Patch.Visuals;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Patch.Data>): void;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, _index: number): void;
    protected _hit_point(geometry: PointGeometry): Selection;
}
export declare namespace Patch {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & Mixins;
    type Mixins = mixins.LineScalar & mixins.FillScalar & mixins.HatchScalar;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineScalar;
        fill: visuals.FillScalar;
        hatch: visuals.HatchScalar;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Patch extends Patch.Attrs {
}
export declare class Patch extends XYGlyph {
    properties: Patch.Props;
    __view_type__: PatchView;
    constructor(attrs?: Partial<Patch.Attrs>);
}
//# sourceMappingURL=patch.d.ts.map