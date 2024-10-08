import type { RenderOne } from "./defs";
import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { PointGeometry, SpanGeometry, RectGeometry, PolyGeometry } from "../../core/geometry";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect, Indices } from "../../core/types";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface MarkerView extends Marker.Data {
}
export declare abstract class MarkerView extends XYGlyphView {
    model: Marker;
    visuals: Marker.Visuals;
    protected _render_one: RenderOne;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Marker.Data>): void;
    protected _mask_data(): Indices;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    protected _hit_rect(geometry: RectGeometry): Selection;
    protected _hit_poly(geometry: PolyGeometry): Selection;
    _get_legend_args({ x0, x1, y0, y1 }: Rect, index: number): Partial<Marker.Data>;
    draw_legend_for_index(ctx: Context2d, { x0, x1, y0, y1 }: Rect, index: number): void;
}
export declare namespace Marker {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        size: p.DistanceSpec;
        angle: p.AngleSpec;
        hit_dilation: p.Property<number>;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Marker extends Marker.Attrs {
}
export declare abstract class Marker extends XYGlyph {
    properties: Marker.Props;
    __view_type__: MarkerView;
    constructor(attrs?: Partial<Marker.Attrs>);
}
//# sourceMappingURL=marker.d.ts.map