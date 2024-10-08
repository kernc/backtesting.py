import type { SpatialIndex } from "../../core/util/spatial";
import type { PointGeometry, SpanGeometry } from "../../core/geometry";
import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Glyph, GlyphView } from "./glyph";
import { Selection } from "../selections/selection";
export interface MultiLineView extends MultiLine.Data {
}
export declare class MultiLineView extends GlyphView {
    model: MultiLine;
    visuals: MultiLine.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/multi_line").MultiLineGL>;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<MultiLine.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    get_interpolation_hit(i: number, point_i: number, geometry: PointGeometry | SpanGeometry): [number, number];
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
    scenterxy(): [number, number];
}
export declare namespace MultiLine {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        xs: p.CoordinateSeqSpec;
        ys: p.CoordinateSeqSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface MultiLine extends MultiLine.Attrs {
}
export declare class MultiLine extends Glyph {
    properties: MultiLine.Props;
    __view_type__: MultiLineView;
    constructor(attrs?: Partial<MultiLine.Attrs>);
}
//# sourceMappingURL=multi_line.d.ts.map