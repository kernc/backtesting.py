import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type * as p from "../../core/properties";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Arrayable } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
export interface SplineView extends Spline.Data {
}
export declare class SplineView extends XYGlyphView {
    model: Spline;
    visuals: Spline.Visuals;
    protected _set_data(): void;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, _indices: number[], data?: Partial<Spline.Data>): void;
}
export declare namespace Spline {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & Mixins & {
        tension: p.Property<number>;
        closed: p.Property<boolean>;
    };
    type Mixins = mixins.LineScalar;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineScalar;
    };
    type Data = p.GlyphDataOf<Props> & {
        readonly xt: Arrayable<number>;
        readonly yt: Arrayable<number>;
        readonly sxt: Arrayable<number>;
        readonly syt: Arrayable<number>;
    };
}
export interface Spline extends Spline.Attrs {
}
export declare class Spline extends XYGlyph {
    properties: Spline.Props;
    __view_type__: SplineView;
    constructor(attrs?: Partial<Spline.Attrs>);
}
//# sourceMappingURL=spline.d.ts.map