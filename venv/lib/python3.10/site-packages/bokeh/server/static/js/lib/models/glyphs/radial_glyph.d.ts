import { XYGlyph, XYGlyphView } from "./xy_glyph";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect, Indices } from "../../core/types";
import { RadiusDimension } from "../../core/enums";
import * as p from "../../core/properties";
import type { SpatialIndex } from "../../core/util/spatial";
import type { Context2d } from "../../core/util/canvas";
export interface RadialGlyphView extends RadialGlyph.Data {
}
export declare abstract class RadialGlyphView extends XYGlyphView {
    model: RadialGlyph;
    visuals: RadialGlyph.Visuals;
    protected _index_data(index: SpatialIndex): void;
    protected _map_data(): void;
    protected _mask_data(): Indices;
    draw_legend_for_index(ctx: Context2d, { x0, y0, x1, y1 }: Rect, index: number): void;
}
export declare namespace RadialGlyph {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        radius: p.DistanceSpec;
        radius_dimension: p.Property<RadiusDimension>;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface RadialGlyph extends RadialGlyph.Attrs {
}
export declare class RadialGlyph extends XYGlyph {
    properties: RadialGlyph.Props;
    __view_type__: RadialGlyphView;
    constructor(attrs?: Partial<RadialGlyph.Attrs>);
}
//# sourceMappingURL=radial_glyph.d.ts.map