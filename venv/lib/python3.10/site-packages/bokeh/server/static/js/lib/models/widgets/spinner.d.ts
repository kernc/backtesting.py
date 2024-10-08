import { NumericInputView, NumericInput } from "./numeric_input";
import * as p from "../../core/properties";
export declare class SpinnerView extends NumericInputView {
    model: Spinner;
    protected wrapper_el: HTMLDivElement;
    protected btn_up_el: HTMLButtonElement;
    protected btn_down_el: HTMLButtonElement;
    private _handles;
    private _counter;
    private _interval;
    buttons(): Generator<HTMLButtonElement>;
    initialize(): void;
    connect_signals(): void;
    protected _render_input(): HTMLElement;
    render(): void;
    remove(): void;
    _start_incrementation(sign: 1 | -1): void;
    _stop_incrementation(): void;
    _btn_mouse_down(event: MouseEvent): void;
    _btn_mouse_up(): void;
    _btn_mouse_leave(): void;
    _input_mouse_wheel(event: WheelEvent): void;
    _input_key_down(event: KeyboardEvent): void;
    increment(step: number): void;
    change_input(): void;
    bound_value(value: number): number;
}
export declare namespace Spinner {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericInput.Props & {
        value_throttled: p.Property<number | null>;
        step: p.Property<number>;
        page_step_multiplier: p.Property<number>;
        wheel_wait: p.Property<number>;
    };
}
export interface Spinner extends Spinner.Attrs {
}
export declare class Spinner extends NumericInput {
    properties: Spinner.Props;
    __view_type__: SpinnerView;
    constructor(attrs?: Partial<Spinner.Attrs>);
}
//# sourceMappingURL=spinner.d.ts.map