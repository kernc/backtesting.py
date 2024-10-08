import { NumericalRangeSlider, NumericalRangeSliderView } from "./numerical_range_slider";
import type { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare class DatetimeRangeSliderView extends NumericalRangeSliderView {
    model: DatetimeRangeSlider;
    behaviour: "drag";
    connected: boolean[];
    protected _formatter(value: number, format: string | TickFormatter): string;
}
export declare namespace DatetimeRangeSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalRangeSlider.Props;
}
export interface DatetimeRangeSlider extends DatetimeRangeSlider.Attrs {
}
export declare class DatetimeRangeSlider extends NumericalRangeSlider {
    properties: DatetimeRangeSlider.Props;
    __view_type__: DatetimeRangeSliderView;
    constructor(attrs?: Partial<DatetimeRangeSlider.Attrs>);
}
//# sourceMappingURL=datetime_range_slider.d.ts.map