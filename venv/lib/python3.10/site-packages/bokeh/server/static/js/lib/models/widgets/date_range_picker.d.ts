import type flatpickr from "flatpickr";
import { BaseDatePicker, BaseDatePickerView, DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class DateRangePickerView extends BaseDatePickerView {
    model: DateRangePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace DateRangePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatePicker.Props;
}
export interface DateRangePicker extends DateRangePicker.Attrs {
}
export declare class DateRangePicker extends BaseDatePicker {
    properties: DateRangePicker.Props;
    __view_type__: DateRangePickerView;
    value: [DateLike, DateLike] | null;
    constructor(attrs?: Partial<DateRangePicker.Attrs>);
}
//# sourceMappingURL=date_range_picker.d.ts.map