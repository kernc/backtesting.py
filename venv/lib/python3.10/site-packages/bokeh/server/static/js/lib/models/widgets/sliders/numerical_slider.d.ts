import type { SliderSpec } from "./abstract_slider";
import { BaseNumericalSlider, BaseNumericalSliderView } from "./base_numerical_slider";
import type * as p from "../../../core/properties";
export declare abstract class NumericalSliderView extends BaseNumericalSliderView {
    model: NumericalSlider;
    protected _calc_to(): SliderSpec<number>;
    protected _calc_from([value]: number[]): number;
}
export declare namespace NumericalSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseNumericalSlider.Props & {
        value: p.Property<number>;
        value_throttled: p.Property<number>;
    };
}
export interface NumericalSlider extends NumericalSlider.Attrs {
}
export declare abstract class NumericalSlider extends BaseNumericalSlider {
    properties: NumericalSlider.Props;
    __view_type__: NumericalSliderView;
    value: number;
    value_throttled: number;
    constructor(attrs?: Partial<NumericalSlider.Attrs>);
}
//# sourceMappingURL=numerical_slider.d.ts.map