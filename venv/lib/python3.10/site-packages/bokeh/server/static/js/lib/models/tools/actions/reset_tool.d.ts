import { PlotActionTool, PlotActionToolView } from "./plot_action_tool";
import type * as p from "../../../core/properties";
export declare class ResetToolView extends PlotActionToolView {
    model: ResetTool;
    doit(): void;
}
export declare namespace ResetTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PlotActionTool.Props;
}
export interface ResetTool extends ResetTool.Attrs {
}
export declare class ResetTool extends PlotActionTool {
    properties: ResetTool.Props;
    __view_type__: ResetToolView;
    constructor(attrs?: Partial<ResetTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=reset_tool.d.ts.map