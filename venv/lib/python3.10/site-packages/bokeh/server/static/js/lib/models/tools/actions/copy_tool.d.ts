import { ActionTool, ActionToolView } from "./action_tool";
import type * as p from "../../../core/properties";
export declare class CopyToolView extends ActionToolView {
    model: CopyTool;
    copy(): Promise<void>;
    doit(): void;
}
export declare namespace CopyTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionTool.Props;
}
export interface CopyTool extends CopyTool.Attrs {
}
export declare class CopyTool extends ActionTool {
    properties: CopyTool.Props;
    __view_type__: CopyToolView;
    constructor(attrs?: Partial<CopyTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=copy_tool.d.ts.map