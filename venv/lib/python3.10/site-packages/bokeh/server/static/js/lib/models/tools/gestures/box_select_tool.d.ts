import { RegionSelectTool, RegionSelectToolView } from "./region_select_tool";
import { BoxAnnotation } from "../../annotations/box_annotation";
import type * as p from "../../../core/properties";
import type { SelectionMode } from "../../../core/enums";
import { Dimensions, BoxOrigin } from "../../../core/enums";
import type { PanEvent, KeyEvent } from "../../../core/ui_events";
import type { CoordinateMapper, LRTB } from "../../../core/util/bbox";
export declare class BoxSelectToolView extends RegionSelectToolView {
    model: BoxSelectTool;
    connect_signals(): void;
    protected _base_point: [number, number] | null;
    protected _compute_limits(curpoint: [number, number]): [[number, number], [number, number]];
    protected _mappers(): LRTB<CoordinateMapper>;
    protected _compute_lrtb({ left, right, top, bottom }: LRTB): LRTB;
    protected _invert_lrtb({ left, right, top, bottom }: LRTB): LRTB;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    protected get _is_selecting(): boolean;
    protected _stop(): void;
    _keyup(ev: KeyEvent): void;
    _clear_selection(): void;
    _do_select([sx0, sx1]: [number, number], [sy0, sy1]: [number, number], final: boolean, mode?: SelectionMode): void;
}
export declare namespace BoxSelectTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = RegionSelectTool.Props & {
        dimensions: p.Property<Dimensions>;
        overlay: p.Property<BoxAnnotation>;
        origin: p.Property<BoxOrigin>;
    };
}
export interface BoxSelectTool extends BoxSelectTool.Attrs {
}
export declare class BoxSelectTool extends RegionSelectTool {
    properties: BoxSelectTool.Props;
    __view_type__: BoxSelectToolView;
    overlay: BoxAnnotation;
    constructor(attrs?: Partial<BoxSelectTool.Attrs>);
    initialize(): void;
    tool_name: string;
    event_type: "pan";
    default_order: number;
    get computed_icon(): string;
    get tooltip(): string;
}
//# sourceMappingURL=box_select_tool.d.ts.map