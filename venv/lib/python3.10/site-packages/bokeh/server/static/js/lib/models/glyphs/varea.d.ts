import type { PointGeometry } from "../../core/geometry";
import { Area, AreaView } from "./area";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
import { Selection } from "../selections/selection";
export interface VAreaView extends VArea.Data {
}
export declare class VAreaView extends AreaView {
    model: VArea;
    visuals: VArea.Visuals;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, _indices: number[], data?: Partial<VArea.Data>): void;
    scenterxy(i: number): [number, number];
    protected _hit_point(geometry: PointGeometry): Selection;
}
export declare namespace VArea {
    type Attrs = p.AttrsOf<Props>;
    type Props = Area.Props & {
        x: p.XCoordinateSpec;
        y1: p.YCoordinateSpec;
        y2: p.YCoordinateSpec;
    };
    type Visuals = Area.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface VArea extends VArea.Attrs {
}
export declare class VArea extends Area {
    properties: VArea.Props;
    __view_type__: VAreaView;
    constructor(attrs?: Partial<VArea.Attrs>);
}
//# sourceMappingURL=varea.d.ts.map