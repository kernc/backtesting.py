import { CenterRotatable, CenterRotatableView } from "./center_rotatable";
import type { PointGeometry, RectGeometry } from "../../core/geometry";
import type { Arrayable } from "../../core/types";
import { ScreenArray } from "../../core/types";
import type * as types from "../../core/types";
import type * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
import type { Scale } from "../scales/scale";
import type { Corners } from "../../core/util/bbox";
import { BorderRadius } from "../common/kinds";
export interface RectView extends Rect.Data {
}
export declare class RectView extends CenterRotatableView {
    model: Rect;
    visuals: Rect.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/rect").RectGL>;
    protected _set_data(indices: number[] | null): void;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Rect.Data>): void;
    protected _hit_rect(geometry: RectGeometry): Selection;
    protected _hit_point(geometry: PointGeometry): Selection;
    protected _map_dist_corner_for_data_side_length(coord: Arrayable<number>, side_length: p.Uniform<number>, scale: Scale): [ScreenArray, ScreenArray];
    protected _ddist(dim: 0 | 1, spts: Arrayable<number>, spans: Arrayable<number>): Arrayable<number>;
    draw_legend_for_index(ctx: Context2d, bbox: types.Rect, index: number): void;
}
export declare namespace Rect {
    type Attrs = p.AttrsOf<Props>;
    type Props = CenterRotatable.Props & {
        border_radius: p.Property<BorderRadius>;
        dilate: p.Property<boolean>;
    };
    type Visuals = CenterRotatable.Visuals;
    type Data = p.GlyphDataOf<Props> & {
        readonly sx0: Arrayable<number>;
        readonly sy1: Arrayable<number>;
        readonly max_x2_ddist: number;
        readonly max_y2_ddist: number;
        border_radius: Corners<number>;
    };
}
export interface Rect extends Rect.Attrs {
}
export declare class Rect extends CenterRotatable {
    properties: Rect.Props;
    __view_type__: RectView;
    constructor(attrs?: Partial<Rect.Attrs>);
}
//# sourceMappingURL=rect.d.ts.map