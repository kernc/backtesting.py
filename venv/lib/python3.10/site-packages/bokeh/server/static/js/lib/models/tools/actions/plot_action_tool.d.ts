import { ActionTool, ActionToolView } from "./action_tool";
import type { PlotView } from "../../plots/plot_canvas";
import type * as p from "../../../core/properties";
export declare abstract class PlotActionToolView extends ActionToolView {
    model: PlotActionTool;
    readonly parent: PlotView;
    get plot_view(): PlotView;
}
export declare namespace PlotActionTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionTool.Props;
}
export interface PlotActionTool extends PlotActionTool.Attrs {
}
export declare abstract class PlotActionTool extends ActionTool {
    properties: PlotActionTool.Props;
    __view_type__: PlotActionToolView;
    constructor(attrs?: Partial<PlotActionTool.Attrs>);
}
//# sourceMappingURL=plot_action_tool.d.ts.map