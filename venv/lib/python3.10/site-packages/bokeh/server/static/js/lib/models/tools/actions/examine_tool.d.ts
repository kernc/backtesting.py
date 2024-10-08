import { ActionTool, ActionToolView } from "./action_tool";
import type * as p from "../../../core/properties";
import type { DialogView } from "../../ui/dialog";
import type { IterViews } from "../../../core/build_views";
export declare class ExamineToolView extends ActionToolView {
    model: ExamineTool;
    protected _dialog: DialogView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    doit(): void;
}
export declare namespace ExamineTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionTool.Props;
}
export interface ExamineTool extends ExamineTool.Attrs {
}
export declare class ExamineTool extends ActionTool {
    properties: ExamineTool.Props;
    __view_type__: ExamineToolView;
    constructor(attrs?: Partial<ExamineTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=examine_tool.d.ts.map