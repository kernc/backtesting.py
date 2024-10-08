import type flatpickr from "flatpickr";
import { BaseDatetimePicker, BaseDatetimePickerView } from "./base_datetime_picker";
import { DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class DatetimeRangePickerView extends BaseDatetimePickerView {
    model: DatetimeRangePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace DatetimeRangePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatetimePicker.Props;
}
export interface DatetimeRangePicker extends DatetimeRangePicker.Attrs {
}
export declare class DatetimeRangePicker extends BaseDatetimePicker {
    properties: DatetimeRangePicker.Props;
    __view_type__: DatetimeRangePickerView;
    value: [DateLike, DateLike] | null;
    constructor(attrs?: Partial<DatetimeRangePicker.Attrs>);
}
//# sourceMappingURL=datetime_range_picker.d.ts.map