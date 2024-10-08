import { ToggleButtonGroup, ToggleButtonGroupView } from "./toggle_button_group";
import type * as p from "../../core/properties";
export declare class RadioButtonGroupView extends ToggleButtonGroupView {
    model: RadioButtonGroup;
    change_active(i: number): void;
    protected _update_active(): void;
}
export declare namespace RadioButtonGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleButtonGroup.Props & {
        active: p.Property<number | null>;
    };
}
export interface RadioButtonGroup extends RadioButtonGroup.Attrs {
}
export declare class RadioButtonGroup extends ToggleButtonGroup {
    properties: RadioButtonGroup.Props;
    __view_type__: RadioButtonGroupView;
    constructor(attrs?: Partial<RadioButtonGroup.Attrs>);
}
//# sourceMappingURL=radio_button_group.d.ts.map