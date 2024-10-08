import { CenterRotatable, CenterRotatableView } from "./center_rotatable";
import type { PointGeometry } from "../../core/geometry";
import type { Rect } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
import * as p from "../../core/properties";
export interface EllipseView extends Ellipse.Data {
}
export declare class EllipseView extends CenterRotatableView {
    model: Ellipse;
    visuals: Ellipse.Visuals;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Ellipse.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    draw_legend_for_index(ctx: Context2d, { x0, y0, x1, y1 }: Rect, index: number): void;
}
export declare namespace Ellipse {
    type Attrs = p.AttrsOf<Props>;
    type Props = CenterRotatable.Props;
    type Visuals = CenterRotatable.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface Ellipse extends Ellipse.Attrs {
}
export declare class Ellipse extends CenterRotatable {
    properties: Ellipse.Props;
    __view_type__: EllipseView;
    constructor(attrs?: Partial<Ellipse.Attrs>);
}
//# sourceMappingURL=ellipse.d.ts.map