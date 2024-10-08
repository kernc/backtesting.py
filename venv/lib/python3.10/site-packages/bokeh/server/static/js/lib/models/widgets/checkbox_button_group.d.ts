import { ToggleButtonGroup, ToggleButtonGroupView } from "./toggle_button_group";
import type * as p from "../../core/properties";
export declare class CheckboxButtonGroupView extends ToggleButtonGroupView {
    model: CheckboxButtonGroup;
    get active(): Set<number>;
    change_active(i: number): void;
    protected _update_active(): void;
}
export declare namespace CheckboxButtonGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleButtonGroup.Props & {
        active: p.Property<number[]>;
    };
}
export interface CheckboxButtonGroup extends CheckboxButtonGroup.Attrs {
}
export declare class CheckboxButtonGroup extends ToggleButtonGroup {
    properties: CheckboxButtonGroup.Props;
    __view_type__: CheckboxButtonGroupView;
    constructor(attrs?: Partial<CheckboxButtonGroup.Attrs>);
}
//# sourceMappingURL=checkbox_button_group.d.ts.map