import type { API } from "nouislider";
import * as p from "../../../core/properties";
import type { Color } from "../../../core/types";
import type { StyleSheetLike } from "../../../core/dom";
import { OrientedControl, OrientedControlView } from "../oriented_control";
export type SliderSpec<T> = {
    range: {
        min: number;
        max: number;
    };
    start: T[];
    step: number;
    format?: {
        to: (value: number) => string | number;
        from: (value: string) => number | false;
    };
};
export declare abstract class AbstractSliderView<T extends number | string> extends OrientedControlView {
    model: AbstractSlider<T>;
    protected behaviour: "drag" | "tap";
    protected connected: false | boolean[];
    protected group_el: HTMLElement;
    protected slider_el?: HTMLElement;
    protected title_el: HTMLElement;
    protected readonly _auto_width = "auto";
    protected readonly _auto_height = "auto";
    controls(): Generator<HTMLInputElement, void, unknown>;
    private _noUiSlider;
    get _steps(): API["steps"];
    abstract pretty(value: number | string): string;
    protected _update_slider(): void;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    _update_title(): void;
    protected _set_bar_color(): void;
    protected abstract _calc_to(): SliderSpec<T>;
    protected abstract _calc_from(values: number[]): T | T[];
    render(): void;
    protected _toggle_user_select(enable: boolean): void;
    protected _slide(values: number[]): void;
    protected _change(values: number[]): void;
}
export declare namespace AbstractSlider {
    type Attrs = p.AttrsOf<Props>;
    type Props = OrientedControl.Props & {
        title: p.Property<string | null>;
        show_value: p.Property<boolean>;
        value: p.Property<unknown>;
        value_throttled: p.Property<unknown>;
        direction: p.Property<"ltr" | "rtl">;
        tooltips: p.Property<boolean>;
        bar_color: p.Property<Color>;
    };
}
export interface AbstractSlider<T extends number | string> extends AbstractSlider.Attrs {
}
export declare abstract class AbstractSlider<T extends number | string> extends OrientedControl {
    properties: AbstractSlider.Props;
    __view_type__: AbstractSliderView<T>;
    constructor(attrs?: Partial<AbstractSlider.Attrs>);
}
//# sourceMappingURL=abstract_slider.d.ts.map