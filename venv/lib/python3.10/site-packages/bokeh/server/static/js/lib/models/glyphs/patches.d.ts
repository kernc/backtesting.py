import type { SpatialIndex } from "../../core/util/spatial";
import { Glyph, GlyphView } from "./glyph";
import type { Rect, Indices } from "../../core/types";
import type { HitTestPoint, HitTestRect, HitTestPoly } from "../../core/geometry";
import type { Context2d } from "../../core/util/canvas";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import * as p from "../../core/properties";
import { Selection } from "../selections/selection";
export interface PatchesView extends Patches.Data {
}
export declare class PatchesView extends GlyphView {
    model: Patches;
    visuals: Patches.Visuals;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    protected _mask_data(): Indices;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Patches.Data>): void;
    protected _hit_poly(geometry: HitTestPoly): Selection;
    protected _hit_rect(geometry: HitTestRect): Selection;
    protected _hit_point(geometry: HitTestPoint): Selection;
    private _get_snap_coord;
    scenterxy(i: number, sx: number, sy: number): [number, number];
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace Patches {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        xs: p.CoordinateSeqSpec;
        ys: p.CoordinateSeqSpec;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Patches extends Patches.Attrs {
}
export declare class Patches extends Glyph {
    properties: Patches.Props;
    __view_type__: PatchesView;
    constructor(attrs?: Partial<Patches.Attrs>);
}
//# sourceMappingURL=patches.d.ts.map