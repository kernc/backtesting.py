import { ActionTool, ActionToolView } from "./action_tool";
import type * as p from "../../../core/properties";
export declare class FullscreenToolView extends ActionToolView {
    model: FullscreenTool;
    fullscreen(): Promise<void>;
    doit(): void;
}
export declare namespace FullscreenTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionTool.Props;
}
export interface FullscreenTool extends FullscreenTool.Attrs {
}
export declare class FullscreenTool extends ActionTool {
    properties: FullscreenTool.Props;
    __view_type__: FullscreenToolView;
    constructor(attrs?: Partial<FullscreenTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=fullscreen_tool.d.ts.map