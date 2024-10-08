import type * as v from "../../core/visuals";
import type { Context2d } from "../../core/util/canvas";
import type { Rect } from "../../core/types";
import type { PointGeometry, SpanGeometry } from "../../core/geometry";
import type { GlyphRendererView } from "../renderers/glyph_renderer";
export declare function generic_line_scalar_legend(visuals: {
    line: v.LineScalar;
}, ctx: Context2d, { x0, x1, y0, y1 }: Rect): void;
export declare function generic_line_vector_legend(visuals: {
    line: v.LineVector;
}, ctx: Context2d, { x0, x1, y0, y1 }: Rect, i: number): void;
export declare function generic_area_scalar_legend(visuals: {
    line?: v.LineScalar;
    fill: v.FillScalar;
    hatch?: v.HatchScalar;
}, ctx: Context2d, { x0, x1, y0, y1 }: Rect): void;
export declare function generic_area_vector_legend(visuals: {
    line?: v.LineVector;
    fill: v.FillVector;
    hatch?: v.HatchVector;
}, ctx: Context2d, { x0, x1, y0, y1 }: Rect, i: number): void;
export { generic_line_vector_legend as generic_line_legend };
export { generic_area_vector_legend as generic_area_legend };
export declare function line_interpolation(renderer: GlyphRendererView, geometry: PointGeometry | SpanGeometry, x2: number, y2: number, x3: number, y3: number): [number, number];
//# sourceMappingURL=utils.d.ts.map