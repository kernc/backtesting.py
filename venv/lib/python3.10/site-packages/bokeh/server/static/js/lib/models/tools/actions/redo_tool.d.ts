import { PlotActionTool, PlotActionToolView } from "./plot_action_tool";
import type * as p from "../../../core/properties";
export declare class RedoToolView extends PlotActionToolView {
    model: RedoTool;
    connect_signals(): void;
    doit(): void;
}
export declare namespace RedoTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PlotActionTool.Props;
}
export interface RedoTool extends RedoTool.Attrs {
}
export declare class RedoTool extends PlotActionTool {
    properties: RedoTool.Props;
    __view_type__: RedoToolView;
    constructor(attrs?: Partial<RedoTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=redo_tool.d.ts.map