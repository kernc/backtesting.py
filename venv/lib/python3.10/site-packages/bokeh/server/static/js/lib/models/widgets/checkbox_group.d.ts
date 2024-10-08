import { ToggleInputGroup, ToggleInputGroupView } from "./toggle_input_group";
import type * as p from "../../core/properties";
export declare class CheckboxGroupView extends ToggleInputGroupView {
    model: CheckboxGroup;
    get active(): Set<number>;
    connect_signals(): void;
    render(): void;
    change_active(i: number): void;
}
export declare namespace CheckboxGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleInputGroup.Props & {
        active: p.Property<number[]>;
    };
}
export interface CheckboxGroup extends CheckboxGroup.Attrs {
}
export declare class CheckboxGroup extends ToggleInputGroup {
    properties: CheckboxGroup.Props;
    __view_type__: CheckboxGroupView;
    constructor(attrs?: Partial<CheckboxGroup.Attrs>);
}
//# sourceMappingURL=checkbox_group.d.ts.map