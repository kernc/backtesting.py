import { ToggleInput, ToggleInputView } from "./toggle_input";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class CheckboxView extends ToggleInputView {
    model: Checkbox;
    protected checkbox_el: HTMLInputElement;
    protected label_el: HTMLElement;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    render(): void;
    protected _update_active(): void;
    protected _update_disabled(): void;
    protected _update_label(): void;
}
export declare namespace Checkbox {
    type Attrs = p.AttrsOf<Props>;
    type Props = ToggleInput.Props & {
        label: p.Property<string>;
    };
}
export interface Checkbox extends Checkbox.Attrs {
}
export declare class Checkbox extends ToggleInput {
    properties: Checkbox.Props;
    __view_type__: CheckboxView;
    constructor(attrs?: Partial<Checkbox.Attrs>);
}
//# sourceMappingURL=checkbox.d.ts.map