import { ZoomBaseTool, ZoomBaseToolView } from "./zoom_base_tool";
export declare class ZoomInToolView extends ZoomBaseToolView {
    model: ZoomBaseTool;
    get factor(): number;
}
export interface ZoomInTool extends ZoomBaseTool.Attrs {
}
export declare class ZoomInTool extends ZoomBaseTool {
    properties: ZoomBaseTool.Props;
    __view_type__: ZoomBaseToolView;
    readonly maintain_focus: boolean;
    constructor(attrs?: Partial<ZoomBaseTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=zoom_in_tool.d.ts.map