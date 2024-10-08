import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { PointGeometry } from "../../core/geometry";
import { LineVector, FillVector, HatchVector } from "../../core/property_mixins";
import type { Rect } from "../../core/types";
import type * as visuals from "../../core/visuals";
import { Direction } from "../../core/enums";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
export interface AnnularWedgeView extends AnnularWedge.Data {
}
export declare class AnnularWedgeView extends XYGlyphView {
    model: AnnularWedge;
    visuals: AnnularWedge.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/annular_wedge").AnnularWedgeGL>;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<AnnularWedge.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
    scenterxy(i: number): [number, number];
}
export declare namespace AnnularWedge {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        direction: p.Property<Direction>;
        inner_radius: p.DistanceSpec;
        outer_radius: p.DistanceSpec;
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
        readonly max_souter_radius: number;
    };
}
export interface AnnularWedge extends AnnularWedge.Attrs {
}
export declare class AnnularWedge extends XYGlyph {
    properties: AnnularWedge.Props;
    __view_type__: AnnularWedgeView;
    constructor(attrs?: Partial<AnnularWedge.Attrs>);
}
//# sourceMappingURL=annular_wedge.d.ts.map