import { OrientedControl, OrientedControlView } from "./oriented_control";
import { ButtonType } from "../../core/enums";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare abstract class ToggleButtonGroupView extends OrientedControlView {
    model: ToggleButtonGroup;
    protected _buttons: HTMLElement[];
    controls(): Generator<any, void, any>;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
    abstract change_active(i: number): void;
    protected abstract _update_active(): void;
}
export declare namespace ToggleButtonGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = OrientedControl.Props & {
        labels: p.Property<string[]>;
        button_type: p.Property<ButtonType>;
    };
}
export interface ToggleButtonGroup extends ToggleButtonGroup.Attrs {
}
export declare abstract class ToggleButtonGroup extends OrientedControl {
    properties: ToggleButtonGroup.Props & {
        active: p.Property<unknown>;
    };
    __view_type__: ToggleButtonGroupView;
    constructor(attrs?: Partial<ToggleButtonGroup.Attrs>);
}
//# sourceMappingURL=toggle_button_group.d.ts.map