import type { SliderSpec } from "./abstract_slider";
import { NumericalRangeSlider, NumericalRangeSliderView } from "./numerical_range_slider";
import type { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare class DateRangeSliderView extends NumericalRangeSliderView {
    model: DateRangeSlider;
    behaviour: "drag";
    connected: boolean[];
    protected _calc_to(): SliderSpec<number>;
    protected _formatter(value: number, format: string | TickFormatter): string;
}
export declare namespace DateRangeSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalRangeSlider.Props;
}
export interface DateRangeSlider extends DateRangeSlider.Attrs {
}
export declare class DateRangeSlider extends NumericalRangeSlider {
    properties: DateRangeSlider.Props;
    __view_type__: DateRangeSliderView;
    constructor(attrs?: Partial<DateRangeSlider.Attrs>);
}
//# sourceMappingURL=date_range_slider.d.ts.map