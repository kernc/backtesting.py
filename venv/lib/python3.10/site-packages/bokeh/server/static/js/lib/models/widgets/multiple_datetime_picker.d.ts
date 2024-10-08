import type flatpickr from "flatpickr";
import { BaseDatetimePicker, BaseDatetimePickerView } from "./base_datetime_picker";
import { DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class MultipleDatetimePickerView extends BaseDatetimePickerView {
    model: MultipleDatetimePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace MultipleDatetimePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatetimePicker.Props & {
        separator: p.Property<string>;
    };
}
export interface MultipleDatetimePicker extends MultipleDatetimePicker.Attrs {
}
export declare class MultipleDatetimePicker extends BaseDatetimePicker {
    properties: MultipleDatetimePicker.Props;
    __view_type__: MultipleDatetimePickerView;
    value: DateLike[];
    constructor(attrs?: Partial<MultipleDatetimePicker.Attrs>);
}
//# sourceMappingURL=multiple_datetime_picker.d.ts.map