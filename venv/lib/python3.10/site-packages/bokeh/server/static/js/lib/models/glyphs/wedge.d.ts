import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { PointGeometry } from "../../core/geometry";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import { Direction } from "../../core/enums";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface WedgeView extends Wedge.Data {
}
export declare class WedgeView extends XYGlyphView {
    model: Wedge;
    visuals: Wedge.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/wedge").WedgeGL>;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Wedge.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
    scenterxy(i: number): [number, number];
}
export declare namespace Wedge {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        direction: p.Property<Direction>;
        radius: p.DistanceSpec;
        start_angle: p.AngleSpec;
        end_angle: p.AngleSpec;
    } & Mixins;
    type Mixins = LineVector & FillVector & HatchVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
        hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props> & {
        readonly max_sradius: number;
    };
}
export interface Wedge extends Wedge.Attrs {
}
export declare class Wedge extends XYGlyph {
    properties: Wedge.Props;
    __view_type__: WedgeView;
    constructor(attrs?: Partial<Wedge.Attrs>);
}
//# sourceMappingURL=wedge.d.ts.map