import type flatpickr from "flatpickr";
import { PickerBase, PickerBaseView } from "./picker_base";
import type * as p from "../../core/properties";
export type DateLike = typeof DateLike["__type__"];
export declare const DateLike: import("../../core/kinds").Kinds.Or<[Date, string, number]>;
export type DateLikeList = typeof DateLikeList["__type__"];
export declare const DateLikeList: import("../../core/kinds").Kinds.List<string | number | Date | [string | number | Date, string | number | Date] | {
    from: string | number | Date;
    to: string | number | Date;
}>;
export declare abstract class BaseDatePickerView extends PickerBaseView {
    model: BaseDatePicker;
    protected _format_date(date: Date): string;
    connect_signals(): void;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected _convert_date_list(value: DateLikeList): flatpickr.Options.DateLimit[];
}
export declare namespace BaseDatePicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = PickerBase.Props & {
        value: p.Property<DateLike | DateLike[] | null>;
        min_date: p.Property<DateLike | null>;
        max_date: p.Property<DateLike | null>;
        disabled_dates: p.Property<DateLikeList | null>;
        enabled_dates: p.Property<DateLikeList | null>;
        date_format: p.Property<string>;
    };
}
export interface BaseDatePicker extends BaseDatePicker.Attrs {
}
export declare abstract class BaseDatePicker extends PickerBase {
    properties: BaseDatePicker.Props;
    __view_type__: BaseDatePickerView;
    constructor(attrs?: Partial<BaseDatePicker.Attrs>);
}
//# sourceMappingURL=base_date_picker.d.ts.map