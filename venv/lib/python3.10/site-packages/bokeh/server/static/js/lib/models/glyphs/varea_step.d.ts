import type { PointGeometry } from "../../core/geometry";
import type { Arrayable } from "../../core/types";
import { Area, AreaView } from "./area";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
import { StepMode } from "../../core/enums";
import { Selection } from "../selections/selection";
export interface VAreaStepView extends VAreaStep.Data {
}
export declare class VAreaStepView extends AreaView {
    model: VAreaStep;
    visuals: VAreaStep.Visuals;
    protected _index_data(index: SpatialIndex): void;
    protected _step_path(ctx: Context2d, mode: StepMode, sx: Arrayable<number>, sy: Arrayable<number>, from_i: number, to_i: number): void;
    protected _paint(ctx: Context2d, _indices: number[], data?: Partial<VAreaStep.Data>): void;
    scenterxy(i: number): [number, number];
    protected _line_selection_for(i: number): Selection;
    protected _hit_point_before(geometry: PointGeometry): Selection;
    protected _hit_point_after(geometry: PointGeometry): Selection;
    protected _hit_point_center(geometry: PointGeometry): Selection;
    protected _hit_point(geometry: PointGeometry): Selection;
}
export declare namespace VAreaStep {
    type Attrs = p.AttrsOf<Props>;
    type Props = Area.Props & {
        x: p.XCoordinateSpec;
        y1: p.YCoordinateSpec;
        y2: p.YCoordinateSpec;
        step_mode: p.Property<StepMode>;
    };
    type Visuals = Area.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface VAreaStep extends VAreaStep.Attrs {
}
export declare class VAreaStep extends Area {
    properties: VAreaStep.Props;
    __view_type__: VAreaStepView;
    constructor(attrs?: Partial<VAreaStep.Attrs>);
}
//# sourceMappingURL=varea_step.d.ts.map