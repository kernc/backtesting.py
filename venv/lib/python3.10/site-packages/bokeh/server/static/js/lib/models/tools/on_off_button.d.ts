import { ToolButton, ToolButtonView } from "./tool_button";
import type * as p from "../../core/properties";
export declare class OnOffButtonView extends ToolButtonView {
    model: OnOffButton;
    protected _toggle_active(): void;
    connect_signals(): void;
    render(): void;
    protected _clicked(): void;
}
export declare namespace OnOffButton {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToolButton.Props;
}
export interface OnOffButton extends OnOffButton.Attrs {
}
export declare class OnOffButton extends ToolButton {
    properties: OnOffButton.Props;
    __view_type__: OnOffButtonView;
    constructor(attrs?: Partial<OnOffButton.Attrs>);
}
//# sourceMappingURL=on_off_button.d.ts.map