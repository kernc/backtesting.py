import type flatpickr from "flatpickr";
import { BaseDatePicker, BaseDatePickerView, DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class DatePickerView extends BaseDatePickerView {
    model: DatePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace DatePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatePicker.Props;
}
export interface DatePicker extends DatePicker.Attrs {
}
export declare class DatePicker extends BaseDatePicker {
    properties: DatePicker.Props;
    __view_type__: DatePickerView;
    value: DateLike | null;
    constructor(attrs?: Partial<DatePicker.Attrs>);
}
//# sourceMappingURL=date_picker.d.ts.map