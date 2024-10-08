import { PlotActionTool, PlotActionToolView } from "./plot_action_tool";
import type * as p from "../../../core/properties";
export declare class UndoToolView extends PlotActionToolView {
    model: UndoTool;
    connect_signals(): void;
    doit(): void;
}
export declare namespace UndoTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PlotActionTool.Props;
}
export interface UndoTool extends UndoTool.Attrs {
}
export declare class UndoTool extends PlotActionTool {
    properties: UndoTool.Props;
    __view_type__: UndoToolView;
    constructor(attrs?: Partial<UndoTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=undo_tool.d.ts.map