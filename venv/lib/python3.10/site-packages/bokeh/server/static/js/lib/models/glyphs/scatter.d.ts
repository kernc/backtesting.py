import { Marker, MarkerView } from "./marker";
import type { Rect } from "../../core/types";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
export interface ScatterView extends Scatter.Data {
}
export declare class ScatterView extends MarkerView {
    model: Scatter;
    load_glglyph(): Promise<typeof import("./webgl/multi_marker").MultiMarkerGL>;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Scatter.Data>): void;
    draw_legend_for_index(ctx: Context2d, { x0, x1, y0, y1 }: Rect, index: number): void;
}
export declare namespace Scatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Marker.Props & {
        marker: p.MarkerSpec;
    };
    type Visuals = Marker.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface Scatter extends Scatter.Attrs {
}
export declare class Scatter extends Marker {
    properties: Scatter.Props;
    __view_type__: ScatterView;
    constructor(attrs?: Partial<Scatter.Attrs>);
}
//# sourceMappingURL=scatter.d.ts.map