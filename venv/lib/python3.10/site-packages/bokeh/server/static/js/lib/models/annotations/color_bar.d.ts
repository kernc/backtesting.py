import { BaseColorBar, BaseColorBarView } from "./base_color_bar";
import type { Axis } from "../axes";
import type { TickFormatter } from "../formatters/tick_formatter";
import { ColorMapper } from "../mappers/color_mapper";
import { ScanningColorMapper, ContinuousColorMapper } from "../mappers";
import type { Range } from "../ranges";
import type { Scale } from "../scales";
import type { Ticker } from "../tickers/ticker";
import type * as p from "../../core/properties";
import type { Layoutable } from "../../core/layout";
import type { Arrayable } from "../../core/types";
import type { BBox } from "../../core/util/bbox";
import type { Context2d } from "../../core/util/canvas";
export declare class ColorBarView extends BaseColorBarView {
    model: ColorBar;
    layout: Layoutable;
    protected _image: HTMLCanvasElement | null;
    protected _index_low: number | null;
    protected _index_high: number | null;
    connect_signals(): void;
    get color_mapper(): ColorMapper;
    update_layout(): void;
    _create_axis(): Axis;
    _create_formatter(): TickFormatter;
    _create_major_range(): Range;
    _create_major_scale(): Scale;
    _create_ticker(): Ticker;
    protected _continuous_metrics(color_mapper: ContinuousColorMapper): {
        min: number;
        max: number;
    };
    _get_major_size_factor(): number | null;
    protected _metrics_changed(): void;
    _paint_colors(ctx: Context2d, bbox: BBox): void;
    protected _scanning_binning(color_mapper: ScanningColorMapper): Arrayable<number>;
    protected _set_canvas_image(): void;
}
export declare namespace ColorBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseColorBar.Props & {
        color_mapper: p.Property<ColorMapper>;
        display_low: p.Property<number | null>;
        display_high: p.Property<number | null>;
    };
}
export interface ColorBar extends ColorBar.Attrs {
}
export declare class ColorBar extends BaseColorBar {
    properties: ColorBar.Props;
    __view_type__: ColorBarView;
    constructor(attrs?: Partial<ColorBar.Attrs>);
}
//# sourceMappingURL=color_bar.d.ts.map