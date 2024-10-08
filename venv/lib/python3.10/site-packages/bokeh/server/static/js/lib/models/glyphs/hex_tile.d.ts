import { Glyph, GlyphView } from "./glyph";
import type { PointGeometry, RectGeometry, SpanGeometry } from "../../core/geometry";
import * as p from "../../core/properties";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type { Rect, Arrayable } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import type * as visuals from "../../core/visuals";
import { HexTileOrientation } from "../../core/enums";
import { Selection } from "../selections/selection";
export type Vertices = [number, number, number, number, number, number];
export interface HexTileView extends HexTile.Data {
}
export declare class HexTileView extends GlyphView {
    model: HexTile;
    visuals: HexTile.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/hex_tile").HexTileGL>;
    scenterxy(i: number): [number, number];
    protected _set_data(): void;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    map_data(): void;
    protected _get_unscaled_vertices(): [Vertices, Vertices];
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<HexTile.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    protected _hit_rect(geometry: RectGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace HexTile {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        r: p.NumberSpec;
        q: p.NumberSpec;
        scale: p.NumberSpec;
        size: p.Property<number>;
        aspect_scale: p.Property<number>;
        orientation: p.Property<HexTileOrientation>;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props> & {
        readonly x: Arrayable<number>;
        readonly y: Arrayable<number>;
        readonly sx: Arrayable<number>;
        readonly sy: Arrayable<number>;
        readonly svx: Vertices;
        readonly svy: Vertices;
    };
}
export interface HexTile extends HexTile.Attrs {
}
export declare class HexTile extends Glyph {
    properties: HexTile.Props;
    __view_type__: HexTileView;
    constructor(attrs?: Partial<HexTile.Attrs>);
}
//# sourceMappingURL=hex_tile.d.ts.map