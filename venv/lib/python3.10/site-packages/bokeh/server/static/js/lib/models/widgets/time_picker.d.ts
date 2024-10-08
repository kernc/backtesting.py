import type flatpickr from "flatpickr";
import { PickerBase, PickerBaseView } from "./picker_base";
import { Clock } from "../../core/enums";
import type * as p from "../../core/properties";
export type TimeLike = typeof TimeLike["__type__"];
export declare const TimeLike: import("../../core/kinds").Kinds.Or<[string, number]>;
export declare class TimePickerView extends PickerBaseView {
    model: TimePicker;
    protected _format_time(date: Date): string;
    connect_signals(): void;
    protected get flatpickr_options(): flatpickr.Options.Options;
    render(): void;
    protected _update_second_increment(): void;
    protected _on_change(selected: Date[]): void;
}
export declare namespace TimePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = PickerBase.Props & {
        value: p.Property<TimeLike | null>;
        min_time: p.Property<TimeLike | null>;
        max_time: p.Property<TimeLike | null>;
        time_format: p.Property<string>;
        hour_increment: p.Property<number>;
        minute_increment: p.Property<number>;
        second_increment: p.Property<number>;
        seconds: p.Property<boolean>;
        clock: p.Property<Clock>;
    };
}
export interface TimePicker extends TimePicker.Attrs {
}
export declare class TimePicker extends PickerBase {
    properties: TimePicker.Props;
    __view_type__: TimePickerView;
    constructor(attrs?: Partial<TimePicker.Attrs>);
}
//# sourceMappingURL=time_picker.d.ts.map