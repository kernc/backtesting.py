import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import type { SpatialIndex } from "../../core/util/spatial";
import type { Context2d } from "../../core/util/canvas";
import { Glyph, GlyphView } from "./glyph";
import * as p from "../../core/properties";
export interface QuadraticView extends Quadratic.Data {
}
export declare class QuadraticView extends GlyphView {
    model: Quadratic;
    visuals: Quadratic.Visuals;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Quadratic.Data>): void;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
    scenterxy(): [number, number];
}
export declare namespace Quadratic {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        x0: p.CoordinateSpec;
        y0: p.CoordinateSpec;
        x1: p.CoordinateSpec;
        y1: p.CoordinateSpec;
        cx: p.CoordinateSpec;
        cy: p.CoordinateSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = Glyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Quadratic extends Quadratic.Attrs {
}
export declare class Quadratic extends Glyph {
    properties: Quadratic.Props;
    __view_type__: QuadraticView;
    constructor(attrs?: Partial<Quadratic.Attrs>);
}
//# sourceMappingURL=quadratic.d.ts.map