import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import type { SpatialIndex } from "../../core/util/spatial";
import type { Context2d } from "../../core/util/canvas";
import { Glyph, GlyphView } from "./glyph";
import * as p from "../../core/properties";
export interface BezierView extends Bezier.Data {
}
export declare class BezierView extends GlyphView {
    model: Bezier;
    visuals: Bezier.Visuals;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Bezier.Data): void;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
    scenterxy(): [number, number];
}
export declare namespace Bezier {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        x0: p.CoordinateSpec;
        y0: p.CoordinateSpec;
        x1: p.CoordinateSpec;
        y1: p.CoordinateSpec;
        cx0: p.CoordinateSpec;
        cy0: p.CoordinateSpec;
        cx1: p.CoordinateSpec;
        cy1: p.CoordinateSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Bezier extends Bezier.Attrs {
}
export declare class Bezier extends Glyph {
    properties: Bezier.Props;
    __view_type__: BezierView;
    constructor(attrs?: Partial<Bezier.Attrs>);
}
//# sourceMappingURL=bezier.d.ts.map