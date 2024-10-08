import { Signal0 } from "../../core/signaling";
import type { PlotView } from "./plot_canvas";
import type { RangeInfo } from "./range_manager";
import type { Selection } from "../selections/selection";
import type { DataRenderer } from "../renderers/data_renderer";
export type StateInfo = {
    range?: RangeInfo;
    selection?: Map<DataRenderer, Selection>;
};
type SelectionChange = "box_select" | "poly_select" | "lasso_select" | "tap";
type RangeChange = "pan" | "wheel_pan" | "box_zoom" | "zoom_in" | "zoom_out" | "wheel_zoom";
export type StateType = SelectionChange | RangeChange;
type StateEntry = {
    type: StateType;
    state: StateInfo;
};
export declare class StateManager {
    readonly parent: PlotView;
    readonly initial_state: StateInfo;
    readonly changed: Signal0<this["parent"]>;
    constructor(parent: PlotView, initial_state: StateInfo);
    protected history: StateEntry[];
    protected index: number;
    protected _do_state_change(index: number): StateInfo;
    peek(): StateEntry | null;
    push(type: StateType, new_state: StateInfo): void;
    clear(): void;
    undo(): StateInfo | null;
    redo(): StateInfo | null;
    get can_undo(): boolean;
    get can_redo(): boolean;
}
export {};
//# sourceMappingURL=state_manager.d.ts.map