import type { SliderSpec } from "./abstract_slider";
import { BaseNumericalSlider, BaseNumericalSliderView } from "./base_numerical_slider";
import type * as p from "../../../core/properties";
export declare abstract class NumericalRangeSliderView extends BaseNumericalSliderView {
    model: NumericalRangeSlider;
    protected _calc_to(): SliderSpec<number>;
    protected _calc_from(values: number[]): number[];
}
export declare namespace NumericalRangeSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseNumericalSlider.Props & {
        value: p.Property<[number, number]>;
        value_throttled: p.Property<[number, number]>;
    };
}
export interface NumericalRangeSlider extends NumericalRangeSlider.Attrs {
}
export declare abstract class NumericalRangeSlider extends BaseNumericalSlider {
    properties: NumericalRangeSlider.Props;
    declare__view_type__: NumericalRangeSliderView;
    value: [number, number];
    value_throttled: [number, number];
    constructor(attrs?: Partial<NumericalRangeSlider.Attrs>);
}
//# sourceMappingURL=numerical_range_slider.d.ts.map