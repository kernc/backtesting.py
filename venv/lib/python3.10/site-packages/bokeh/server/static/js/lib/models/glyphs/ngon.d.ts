import { RadialGlyph, RadialGlyphView } from "./radial_glyph";
import type { PointGeometry, PolyGeometry, RectGeometry, SpanGeometry } from "../../core/geometry";
import * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface NgonView extends Ngon.Data {
}
export declare class NgonView extends RadialGlyphView {
    model: Ngon;
    visuals: Ngon.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/ngon").NgonGL>;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Ngon.Data>): void;
    protected _ngon(index: number): [Arrayable<number>, Arrayable<number>];
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _hit_span(geometry: SpanGeometry): Selection;
    protected _hit_poly(geometry: PolyGeometry): Selection;
    protected _hit_rect(geometry: RectGeometry): Selection;
}
export declare namespace Ngon {
    type Attrs = p.AttrsOf<Props>;
    type Props = RadialGlyph.Props & {
        angle: p.AngleSpec;
        n: p.NumberSpec;
    };
    type Visuals = RadialGlyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface Ngon extends Ngon.Attrs {
}
export declare class Ngon extends RadialGlyph {
    properties: Ngon.Props;
    __view_type__: NgonView;
    constructor(attrs?: Partial<Ngon.Attrs>);
}
//# sourceMappingURL=ngon.d.ts.map