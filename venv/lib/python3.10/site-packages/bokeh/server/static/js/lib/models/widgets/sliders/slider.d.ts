import { NumericalSlider, NumericalSliderView } from "./numerical_slider";
import type { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare class SliderView extends NumericalSliderView {
    model: Slider;
    behaviour: "tap";
    connected: boolean[];
    protected _formatter(value: number, format: string | TickFormatter): string;
}
export declare namespace Slider {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalSlider.Props;
}
export interface Slider extends Slider.Attrs {
}
export declare class Slider extends NumericalSlider {
    properties: Slider.Props;
    __view_type__: SliderView;
    constructor(attrs?: Partial<Slider.Attrs>);
}
//# sourceMappingURL=slider.d.ts.map