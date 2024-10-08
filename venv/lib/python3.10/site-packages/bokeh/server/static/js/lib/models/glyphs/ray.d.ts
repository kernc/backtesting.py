import { XYGlyph, XYGlyphView } from "./xy_glyph";
import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
export interface RayView extends Ray.Data {
}
export declare class RayView extends XYGlyphView {
    model: Ray;
    visuals: Ray.Visuals;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Ray.Data>): void;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace Ray {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        length: p.DistanceSpec;
        angle: p.AngleSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Ray extends Ray.Attrs {
}
export declare class Ray extends XYGlyph {
    properties: Ray.Props;
    __view_type__: RayView;
    constructor(attrs?: Partial<Ray.Attrs>);
}
//# sourceMappingURL=ray.d.ts.map