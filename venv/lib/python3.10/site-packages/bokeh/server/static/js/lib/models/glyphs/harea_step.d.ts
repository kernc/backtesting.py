import type { PointGeometry } from "../../core/geometry";
import type { Arrayable } from "../../core/types";
import { Area, AreaView } from "./area";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
import { StepMode } from "../../core/enums";
import { Selection } from "../selections/selection";
export interface HAreaStepView extends HAreaStep.Data {
}
export declare class HAreaStepView extends AreaView {
    model: HAreaStep;
    visuals: HAreaStep.Visuals;
    protected _index_data(index: SpatialIndex): void;
    protected _step_path(ctx: Context2d, mode: StepMode, sx: Arrayable<number>, sy: Arrayable<number>, from_i: number, to_i: number): void;
    protected _paint(ctx: Context2d, _indices: number[], data?: Partial<HAreaStep.Data>): void;
    scenterxy(i: number): [number, number];
    protected _line_selection_for(i: number): Selection;
    protected _hit_point_before(geometry: PointGeometry): Selection;
    protected _hit_point_after(geometry: PointGeometry): Selection;
    protected _hit_point_center(geometry: PointGeometry): Selection;
    protected _hit_point(geometry: PointGeometry): Selection;
}
export declare namespace HAreaStep {
    type Attrs = p.AttrsOf<Props>;
    type Props = Area.Props & {
        x1: p.XCoordinateSpec;
        x2: p.XCoordinateSpec;
        y: p.YCoordinateSpec;
        step_mode: p.Property<StepMode>;
    };
    type Visuals = Area.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface HAreaStep extends HAreaStep.Attrs {
}
export declare class HAreaStep extends Area {
    properties: HAreaStep.Props;
    __view_type__: HAreaStepView;
    constructor(attrs?: Partial<HAreaStep.Attrs>);
}
//# sourceMappingURL=harea_step.d.ts.map