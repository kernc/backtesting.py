import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { Rect } from "../../core/types";
import type { PointGeometry } from "../../core/geometry";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface AnnulusView extends Annulus.Data {
}
export declare class AnnulusView extends XYGlyphView {
    model: Annulus;
    visuals: Annulus.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/annulus").AnnulusGL>;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Annulus.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, { x0, y0, x1, y1 }: Rect, index: number): void;
}
export declare namespace Annulus {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        inner_radius: p.DistanceSpec;
        outer_radius: p.DistanceSpec;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Annulus extends Annulus.Attrs {
}
export declare class Annulus extends XYGlyph {
    properties: Annulus.Props;
    __view_type__: AnnulusView;
    constructor(attrs?: Partial<Annulus.Attrs>);
}
//# sourceMappingURL=annulus.d.ts.map