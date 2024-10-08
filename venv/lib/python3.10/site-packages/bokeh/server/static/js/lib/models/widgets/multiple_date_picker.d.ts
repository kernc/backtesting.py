import type flatpickr from "flatpickr";
import { BaseDatePicker, BaseDatePickerView, DateLike } from "./base_date_picker";
import type * as p from "../../core/properties";
export declare class MultipleDatePickerView extends BaseDatePickerView {
    model: MultipleDatePicker;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _on_change(selected: Date[]): void;
}
export declare namespace MultipleDatePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseDatePicker.Props & {
        separator: p.Property<string>;
    };
}
export interface MultipleDatePicker extends MultipleDatePicker.Attrs {
}
export declare class MultipleDatePicker extends BaseDatePicker {
    properties: MultipleDatePicker.Props;
    __view_type__: MultipleDatePickerView;
    value: DateLike[];
    constructor(attrs?: Partial<MultipleDatePicker.Attrs>);
}
//# sourceMappingURL=multiple_date_picker.d.ts.map