import { PlotActionTool, PlotActionToolView } from "./plot_action_tool";
import { DataRenderer } from "../../renderers/data_renderer";
import { Dimensions } from "../../../core/enums";
import type * as p from "../../../core/properties";
export declare abstract class ZoomBaseToolView extends PlotActionToolView {
    model: ZoomBaseTool;
    abstract get factor(): number;
    doit(): void;
}
export declare namespace ZoomBaseTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PlotActionTool.Props & {
        factor: p.Property<number>;
        dimensions: p.Property<Dimensions>;
        renderers: p.Property<DataRenderer[] | "auto">;
        level: p.Property<number>;
    };
}
export interface ZoomBaseTool extends ZoomBaseTool.Attrs {
}
export declare abstract class ZoomBaseTool extends PlotActionTool {
    properties: ZoomBaseTool.Props;
    __view_type__: ZoomBaseToolView;
    constructor(attrs?: Partial<ZoomBaseTool.Attrs>);
    get tooltip(): string;
    abstract readonly maintain_focus: boolean;
}
//# sourceMappingURL=zoom_base_tool.d.ts.map