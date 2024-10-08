import type * as p from "../../core/properties";
import { InputWidget, InputWidgetView } from "./input_widget";
export declare class MultiSelectView extends InputWidgetView {
    model: MultiSelect;
    input_el: HTMLSelectElement;
    connect_signals(): void;
    protected _render_input(): HTMLElement;
    render(): void;
    render_selection(): void;
    change_input(): void;
}
export declare namespace MultiSelect {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<string[]>;
        options: p.Property<(string | [string, string])[]>;
        size: p.Property<number>;
    };
}
export interface MultiSelect extends MultiSelect.Attrs {
}
export declare class MultiSelect extends InputWidget {
    properties: MultiSelect.Props;
    __view_type__: MultiSelectView;
    constructor(attrs?: Partial<MultiSelect.Attrs>);
}
//# sourceMappingURL=multiselect.d.ts.map