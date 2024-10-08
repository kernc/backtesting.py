import { Glyph, GlyphView } from "./glyph";
import { Selection } from "../selections/selection";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type { PointGeometry, SpanGeometry, RectGeometry } from "../../core/geometry";
import type { Arrayable, Rect } from "../../core/types";
import type * as visuals from "../../core/visuals";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
export interface HStripView extends HStrip.Data {
}
export declare class HStripView extends GlyphView {
    model: HStrip;
    visuals: HStrip.Visuals;
    lazy_initialize(): Promise<void>;
    get sleft(): Arrayable<number>;
    get sright(): Arrayable<number>;
    get stop(): Arrayable<number>;
    get sbottom(): Arrayable<number>;
    protected _set_data(indices: number[] | null): void;
    protected _index_data(index: SpatialIndex): void;
    protected _bounds(bounds: Rect): Rect;
    protected _map_data(): void;
    scenterxy(i: number): [number, number];
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<HStrip.Data>): void;
    protected _get_candidates(sy0: number, sy1?: number): Iterable<number>;
    protected _find_strips(candidates: Iterable<number>, fn: (sy0: number, sy1: number) => boolean): number[];
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    protected _hit_rect(geometry: RectGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace HStrip {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        y0: p.CoordinateSpec;
        y1: p.CoordinateSpec;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props> & {
        max_height: number;
    };
}
export interface HStrip extends HStrip.Attrs {
}
export declare class HStrip extends Glyph {
    properties: HStrip.Props;
    __view_type__: HStripView;
    constructor(attrs?: Partial<HStrip.Attrs>);
}
//# sourceMappingURL=hstrip.d.ts.map