import type { PointGeometry, SpanGeometry } from "../../core/geometry";
import * as p from "../../core/properties";
import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import type { SpatialIndex } from "../../core/util/spatial";
import type { Context2d } from "../../core/util/canvas";
import { Glyph, GlyphView } from "./glyph";
import { Selection } from "../selections/selection";
export interface SegmentView extends Segment.Data {
}
export declare class SegmentView extends GlyphView {
    model: Segment;
    visuals: Segment.Visuals;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Segment.Data>): void;
    protected _render_decorations(ctx: Context2d, i: number, sx0: number, sy0: number, sx1: number, sy1: number): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    scenterxy(i: number): [number, number];
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace Segment {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        x0: p.CoordinateSpec;
        y0: p.CoordinateSpec;
        x1: p.CoordinateSpec;
        y1: p.CoordinateSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Segment extends Segment.Attrs {
}
export declare class Segment extends Glyph {
    properties: Segment.Props;
    __view_type__: SegmentView;
    constructor(attrs?: Partial<Segment.Attrs>);
}
//# sourceMappingURL=segment.d.ts.map