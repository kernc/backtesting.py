import type flatpickr from "flatpickr";
import { BaseDatePicker, BaseDatePickerView } from "./base_date_picker";
import { Clock } from "../../core/enums";
import type * as p from "../../core/properties";
export declare abstract class BaseDatetimePickerView extends BaseDatePickerView {
    model: BaseDatetimePicker;
    connect_signals(): void;
    protected get flatpickr_options(): flatpickr.Options.Options;
    render(): void;
    protected _update_second_increment(): void;
}
export declare namespace BaseDatetimePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatePicker.Props & {
        hour_increment: p.Property<number>;
        minute_increment: p.Property<number>;
        second_increment: p.Property<number>;
        seconds: p.Property<boolean>;
        clock: p.Property<Clock>;
    };
}
export interface BaseDatetimePicker extends BaseDatetimePicker.Attrs {
}
export declare abstract class BaseDatetimePicker extends BaseDatePicker {
    properties: BaseDatetimePicker.Props;
    __view_type__: BaseDatetimePickerView;
    constructor(attrs?: Partial<BaseDatetimePicker.Attrs>);
}
//# sourceMappingURL=base_datetime_picker.d.ts.map