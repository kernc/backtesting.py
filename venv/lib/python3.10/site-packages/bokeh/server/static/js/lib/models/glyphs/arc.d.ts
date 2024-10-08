import { XYGlyph, XYGlyphView } from "./xy_glyph";
import { LineVector } from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type { Rect } from "../../core/types";
import { Direction } from "../../core/enums";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
export interface ArcView extends Arc.Data {
}
export declare class ArcView extends XYGlyphView {
    model: Arc;
    visuals: Arc.Visuals;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Arc.Data>): void;
    protected _render_decorations(ctx: Context2d, i: number, sx: number, sy: number, sradius: number, start_angle: number, end_angle: number, _anticlock: boolean): void;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, index: number): void;
}
export declare namespace Arc {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        direction: p.Property<Direction>;
        radius: p.DistanceSpec;
        start_angle: p.AngleSpec;
        end_angle: p.AngleSpec;
    } & Mixins;
    type Mixins = LineVector;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineVector;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Arc extends Arc.Attrs {
}
export declare class Arc extends XYGlyph {
    properties: Arc.Props;
    __view_type__: ArcView;
    constructor(attrs?: Partial<Arc.Attrs>);
}
//# sourceMappingURL=arc.d.ts.map