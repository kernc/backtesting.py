import type * as p from "../../core/properties";
import { InputWidget, InputWidgetView } from "./input_widget";
declare const Value: import("../../core/kinds").Kinds.Unknown;
type Value = typeof Value["__type__"];
declare const Options: import("../../core/kinds").Kinds.List<string | [unknown, string]>;
type Options = typeof Options["__type__"];
declare const OptionsGroups: import("../../core/kinds").Kinds.Dict<(string | [unknown, string])[]>;
type OptionsGroups = typeof OptionsGroups["__type__"];
export declare class SelectView extends InputWidgetView {
    model: Select;
    input_el: HTMLSelectElement;
    connect_signals(): void;
    private _known_values;
    protected options_el(): HTMLOptionElement[] | HTMLOptGroupElement[];
    protected _render_input(): HTMLElement;
    render(): void;
    change_input(): void;
    protected _update_value(): void;
}
export declare namespace Select {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<Value>;
        options: p.Property<Options | OptionsGroups>;
    };
}
export interface Select extends Select.Attrs {
}
export declare class Select extends InputWidget {
    properties: Select.Props;
    __view_type__: SelectView;
    constructor(attrs?: Partial<Select.Attrs>);
}
export {};
//# sourceMappingURL=select.d.ts.map