import { InputWidgetView, InputWidget } from "./input_widget";
import { TickFormatter } from "../formatters/tick_formatter";
import type * as p from "../../core/properties";
export declare class NumericInputView extends InputWidgetView {
    model: NumericInput;
    input_el: HTMLInputElement;
    protected old_value: string;
    connect_signals(): void;
    get format_value(): string;
    _set_input_filter(inputFilter: (value: string) => boolean): void;
    protected _render_input(): HTMLElement;
    render(): void;
    set_input_filter(): void;
    bound_value(value: number): number;
    get value(): number | null;
    change_input(): void;
}
export declare namespace NumericInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<number | null>;
        placeholder: p.Property<string>;
        mode: p.Property<"int" | "float">;
        format: p.Property<string | TickFormatter | null>;
        low: p.Property<number | null>;
        high: p.Property<number | null>;
    };
}
export interface NumericInput extends NumericInput.Attrs {
}
export declare class NumericInput extends InputWidget {
    properties: NumericInput.Props;
    __view_type__: NumericInputView;
    constructor(attrs?: Partial<NumericInput.Attrs>);
    protected _formatter(value: number, format: string | TickFormatter): string;
    pretty(value: number): string;
}
//# sourceMappingURL=numeric_input.d.ts.map