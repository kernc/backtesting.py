import { ToggleInputGroup, ToggleInputGroupView } from "./toggle_input_group";
import type * as p from "../../core/properties";
export declare class RadioGroupView extends ToggleInputGroupView {
    model: RadioGroup;
    connect_signals(): void;
    render(): void;
    change_active(i: number): void;
}
export declare namespace RadioGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleInputGroup.Props & {
        active: p.Property<number | null>;
    };
}
export interface RadioGroup extends RadioGroup.Attrs {
}
export declare class RadioGroup extends ToggleInputGroup {
    properties: RadioGroup.Props;
    __view_type__: RadioGroupView;
    constructor(attrs?: Partial<RadioGroup.Attrs>);
}
//# sourceMappingURL=radio_group.d.ts.map