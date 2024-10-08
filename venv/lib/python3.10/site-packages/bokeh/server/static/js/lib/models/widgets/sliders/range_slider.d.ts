import { NumericalRangeSlider, NumericalRangeSliderView } from "./numerical_range_slider";
import type { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare class RangeSliderView extends NumericalRangeSliderView {
    model: RangeSlider;
    behaviour: "drag";
    connected: boolean[];
    protected _formatter(value: number, format: string | TickFormatter): string;
}
export declare namespace RangeSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalRangeSlider.Props;
}
export interface RangeSlider extends RangeSlider.Attrs {
}
export declare class RangeSlider extends NumericalRangeSlider {
    properties: RangeSlider.Props;
    __view_type__: RangeSliderView;
    constructor(attrs?: Partial<RangeSlider.Attrs>);
}
//# sourceMappingURL=range_slider.d.ts.map