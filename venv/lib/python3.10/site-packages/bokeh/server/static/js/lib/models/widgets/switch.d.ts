import { ToggleInput, ToggleInputView } from "./toggle_input";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class SwitchView extends ToggleInputView {
    model: Switch;
    protected knob_el: HTMLElement;
    protected bar_el: HTMLElement;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    render(): void;
    protected _update_active(): void;
    protected _update_disabled(): void;
}
export declare namespace Switch {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleInput.Props;
}
export interface Switch extends Switch.Attrs {
}
export declare class Switch extends ToggleInput {
    properties: Switch.Props;
    __view_type__: SwitchView;
    constructor(attrs?: Partial<Switch.Attrs>);
}
//# sourceMappingURL=switch.d.ts.map