import { ActionTool, ActionToolView } from "./action_tool";
import type * as p from "../../../core/properties";
export declare class HelpToolView extends ActionToolView {
    model: HelpTool;
    doit(): void;
}
export declare namespace HelpTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionTool.Props & {
        redirect: p.Property<string>;
    };
}
export interface HelpTool extends HelpTool.Attrs {
}
export declare class HelpTool extends ActionTool {
    properties: HelpTool.Props;
    __view_type__: HelpToolView;
    constructor(attrs?: Partial<HelpTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=help_tool.d.ts.map