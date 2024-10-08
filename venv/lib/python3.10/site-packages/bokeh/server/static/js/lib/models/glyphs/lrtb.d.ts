import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type { Rect } from "../../core/types";
import type { Anchor } from "../../core/enums";
import type * as visuals from "../../core/visuals";
import type { SpatialIndex } from "../../core/util/spatial";
import type { Context2d } from "../../core/util/canvas";
import { Glyph, GlyphView } from "./glyph";
import type { PointGeometry, SpanGeometry, RectGeometry } from "../../core/geometry";
import { Selection } from "../selections/selection";
import type * as p from "../../core/properties";
import type { Corners } from "../../core/util/bbox";
import type { XY } from "../../core/util/bbox";
import { BorderRadius } from "../common/kinds";
export type LRTBRect = {
    l: number;
    r: number;
    t: number;
    b: number;
};
export interface LRTBView extends LRTB.Data {
}
export declare abstract class LRTBView extends GlyphView {
    model: LRTB;
    visuals: LRTB.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/lrtb").LRTBGL>;
    get_anchor_point(anchor: Anchor, i: number, _spt: [number, number]): XY | null;
    protected _set_data(indices: number[] | null): void;
    protected abstract _lrtb(i: number): LRTBRect;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<LRTB.Data>): void;
    protected _clamp_to_viewport(): void;
    protected _hit_rect(geometry: RectGeometry): Selection;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace LRTB {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        border_radius: p.Property<BorderRadius>;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props & {
        readonly left: p.XCoordinateSpec;
        readonly right: p.XCoordinateSpec;
        readonly top: p.YCoordinateSpec;
        readonly bottom: p.YCoordinateSpec;
    }> & {
        border_radius: Corners<number>;
    };
}
export interface LRTB extends LRTB.Attrs {
}
export declare abstract class LRTB extends Glyph {
    properties: LRTB.Props;
    __view_type__: LRTBView;
    constructor(attrs?: Partial<LRTB.Attrs>);
}
//# sourceMappingURL=lrtb.d.ts.map