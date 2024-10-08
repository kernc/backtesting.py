import { PlotActionTool, PlotActionToolView } from "./plot_action_tool";
import { PanDirection } from "../../../core/enums";
import type * as p from "../../../core/properties";
export declare class ClickPanToolView extends PlotActionToolView {
    model: ClickPanTool;
    doit(): void;
}
export declare namespace ClickPanTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PlotActionTool.Props & {
        direction: p.Property<PanDirection>;
        factor: p.Property<number>;
    };
}
export interface ClickPanTool extends ClickPanTool.Attrs {
}
export declare class ClickPanTool extends PlotActionTool {
    properties: ClickPanTool.Props;
    __view_type__: ClickPanToolView;
    constructor(attrs?: Partial<ClickPanTool.Attrs>);
    tool_name: string;
    get tooltip(): string;
    get computed_icon(): string;
}
//# sourceMappingURL=click_pan_tool.d.ts.map