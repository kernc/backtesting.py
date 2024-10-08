import type flatpickr from "flatpickr";
import { BaseDatetimePicker, BaseDatetimePickerView } from "./base_datetime_picker";
import { DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class DatetimePickerView extends BaseDatetimePickerView {
    model: DatetimePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace DatetimePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatetimePicker.Props & {};
}
export interface DatetimePicker extends DatetimePicker.Attrs {
}
export declare class DatetimePicker extends BaseDatetimePicker {
    properties: DatetimePicker.Props;
    __view_type__: DatetimePickerView;
    value: DateLike | null;
    constructor(attrs?: Partial<DatetimePicker.Attrs>);
}
//# sourceMappingURL=datetime_picker.d.ts.map