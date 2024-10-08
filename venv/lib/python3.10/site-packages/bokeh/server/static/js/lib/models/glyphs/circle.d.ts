import { RadialGlyph, RadialGlyphView } from "./radial_glyph";
import type { PointGeometry, SpanGeometry, RectGeometry, PolyGeometry } from "../../core/geometry";
import type * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface CircleView extends Circle.Data {
}
export declare class CircleView extends RadialGlyphView {
    model: Circle;
    visuals: Circle.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/circle").CircleGL>;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Circle.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    protected _hit_rect(geometry: RectGeometry): Selection;
    protected _hit_poly(geometry: PolyGeometry): Selection;
}
export declare namespace Circle {
    type Attrs = p.AttrsOf<Props>;
    type Props = RadialGlyph.Props & {
        hit_dilation: p.Property<number>;
    };
    type Visuals = RadialGlyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface Circle extends Circle.Attrs {
}
export declare class Circle extends RadialGlyph {
    properties: Circle.Props;
    __view_type__: CircleView;
    constructor(attrs?: Partial<Circle.Attrs>);
}
//# sourceMappingURL=circle.d.ts.map