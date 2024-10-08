import { AbstractSlider, AbstractSliderView } from "./abstract_slider";
import { TickFormatter } from "../../formatters/tick_formatter";
import type * as p from "../../../core/properties";
export declare abstract class BaseNumericalSliderView extends AbstractSliderView<number> {
    model: BaseNumericalSlider;
    connect_signals(): void;
    protected abstract _formatter(value: number, format: string | TickFormatter): string;
    pretty(value: number): string;
}
export declare namespace BaseNumericalSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = AbstractSlider.Props & {
        start: p.Property<number>;
        end: p.Property<number>;
        step: p.Property<number>;
        format: p.Property<string | TickFormatter>;
    };
}
export interface BaseNumericalSlider extends BaseNumericalSlider.Attrs {
}
export declare abstract class BaseNumericalSlider extends AbstractSlider<number> {
    properties: BaseNumericalSlider.Props;
    declare__view_type__: BaseNumericalSliderView;
    constructor(attrs?: Partial<BaseNumericalSlider.Attrs>);
}
//# sourceMappingURL=base_numerical_slider.d.ts.map