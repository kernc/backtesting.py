import type { PointGeometry } from "../../core/geometry";
import { Area, AreaView } from "./area";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
import { Selection } from "../selections/selection";
export interface HAreaView extends HArea.Data {
}
export declare class HAreaView extends AreaView {
    model: HArea;
    visuals: HArea.Visuals;
    protected _index_data(index: SpatialIndex): void;
    protected _paint(ctx: Context2d, _indices: number[], data?: Partial<HArea.Data>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    scenterxy(i: number): [number, number];
}
export declare namespace HArea {
    type Attrs = p.AttrsOf<Props>;
    type Props = Area.Props & {
        x1: p.XCoordinateSpec;
        x2: p.XCoordinateSpec;
        y: p.YCoordinateSpec;
    };
    type Visuals = Area.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface HArea extends HArea.Attrs {
}
export declare class HArea extends Area {
    properties: HArea.Props;
    __view_type__: HAreaView;
    constructor(attrs?: Partial<HArea.Attrs>);
}
//# sourceMappingURL=harea.d.ts.map