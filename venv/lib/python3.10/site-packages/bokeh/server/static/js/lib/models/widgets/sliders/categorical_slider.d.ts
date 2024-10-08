import type { SliderSpec } from "./abstract_slider";
import { AbstractSlider, AbstractSliderView } from "./abstract_slider";
import type * as p from "../../../core/properties";
export declare class CategoricalSliderView extends AbstractSliderView<string> {
    model: CategoricalSlider;
    behaviour: "tap";
    connect_signals(): void;
    protected _calc_to(): SliderSpec<string>;
    protected _calc_from([value]: number[]): string;
    pretty(value: number | string): string;
}
export declare namespace CategoricalSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = AbstractSlider.Props & {
        categories: p.Property<string[]>;
        value: p.Property<string>;
        value_throttled: p.Property<string>;
    };
}
export interface CategoricalSlider extends CategoricalSlider.Attrs {
}
export declare class CategoricalSlider extends AbstractSlider<string> {
    properties: CategoricalSlider.Props;
    __view_type__: CategoricalSliderView;
    value: string;
    value_throttled: string;
    constructor(attrs?: Partial<CategoricalSlider.Attrs>);
}
//# sourceMappingURL=categorical_slider.d.ts.map