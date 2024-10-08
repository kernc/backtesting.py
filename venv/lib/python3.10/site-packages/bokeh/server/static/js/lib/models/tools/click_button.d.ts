import { ToolButton, ToolButtonView } from "./tool_button";
import type { ActionTool } from "./actions/action_tool";
import type * as p from "../../core/properties";
export declare class ClickButtonView extends ToolButtonView {
    model: ClickButton;
    protected _clicked(): void;
}
export declare namespace ClickButton {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToolButton.Props & {
        tool: p.Property<ActionTool>;
    };
}
export interface ClickButton extends ClickButton.Attrs {
    tool: ActionTool;
}
export declare class ClickButton extends ToolButton {
    properties: ClickButton.Props;
    __view_type__: ClickButtonView;
    constructor(attrs?: Partial<ClickButton.Attrs>);
}
//# sourceMappingURL=click_button.d.ts.map