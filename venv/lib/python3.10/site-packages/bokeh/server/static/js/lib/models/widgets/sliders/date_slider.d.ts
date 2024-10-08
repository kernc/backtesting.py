import type { SliderSpec } from "./abstract_slider";
import { NumericalSlider, NumericalSliderView } from "./numerical_slider";
import type { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare class DateSliderView extends NumericalSliderView {
    model: DateSlider;
    behaviour: "tap";
    connected: boolean[];
    protected _calc_to(): SliderSpec<number>;
    protected _formatter(value: number, format: string | TickFormatter): string;
}
export declare namespace DateSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalSlider.Props;
}
export interface DateSlider extends DateSlider.Attrs {
}
export declare class DateSlider extends NumericalSlider {
    properties: DateSlider.Props;
    __view_type__: DateSliderView;
    constructor(attrs?: Partial<DateSlider.Attrs>);
}
//# sourceMappingURL=date_slider.d.ts.map