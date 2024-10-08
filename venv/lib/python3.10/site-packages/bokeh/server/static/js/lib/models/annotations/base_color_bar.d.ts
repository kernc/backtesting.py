import { Annotation, AnnotationView } from "./annotation";
import { Title } from "./title";
import { CartesianFrame } from "../canvas/cartesian_frame";
import type { CartesianFrameView } from "../canvas/cartesian_frame";
import type { Axis } from "../axes/axis";
import { LabelOverrides } from "../axes/axis";
import { Ticker } from "../tickers/ticker";
import { TickFormatter } from "../formatters/tick_formatter";
import { LabelingPolicy } from "../policies/labeling";
import type { Scale } from "../scales";
import type { Range } from "../ranges";
import { BaseText } from "../text/base_text";
import { Anchor, Orientation } from "../../core/enums";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import type { Layoutable } from "../../core/layout";
import { BorderLayout } from "../../core/layout/border";
import type { IterViews } from "../../core/build_views";
import { BBox } from "../../core/util/bbox";
export declare abstract class BaseColorBarView extends AnnotationView {
    model: BaseColorBar;
    visuals: BaseColorBar.Visuals;
    layout: Layoutable;
    protected _frame: CartesianFrame;
    protected _frame_view: CartesianFrameView;
    protected _axis: Axis;
    protected _axis_view: Axis["__view_type__"];
    protected _title: Title;
    protected _title_view: Title["__view_type__"];
    protected _ticker: Ticker;
    protected _formatter: TickFormatter;
    protected _inner_layout: BorderLayout;
    protected _major_range: Range;
    protected _major_scale: Scale;
    protected _minor_range: Range;
    protected _minor_scale: Scale;
    private _orientation;
    get orientation(): Orientation;
    children(): IterViews;
    initialize(): void;
    lazy_initialize(): Promise<void>;
    remove(): void;
    protected _apply_axis_properties(): void;
    protected _apply_title_properties(): void;
    connect_signals(): void;
    protected _update_frame(): void;
    update_layout(): void;
    protected _create_axis(): Axis;
    protected _create_formatter(): TickFormatter;
    protected _create_major_range(): Range;
    protected _create_major_scale(): Scale;
    protected _create_ticker(): Ticker;
    protected _get_major_size_factor(): number | null;
    protected abstract _paint_colors(ctx: Context2d, bbox: BBox): void;
    protected _paint(): void;
    protected _paint_bbox(ctx: Context2d, bbox: BBox): void;
}
export declare namespace BaseColorBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        location: p.Property<Anchor | [number, number]>;
        orientation: p.Property<Orientation | "auto">;
        title: p.Property<string | BaseText | null>;
        title_standoff: p.Property<number>;
        width: p.Property<number | "auto">;
        height: p.Property<number | "auto">;
        scale_alpha: p.Property<number>;
        ticker: p.Property<Ticker | "auto">;
        formatter: p.Property<TickFormatter | "auto">;
        major_label_overrides: p.Property<LabelOverrides>;
        major_label_policy: p.Property<LabelingPolicy>;
        label_standoff: p.Property<number>;
        margin: p.Property<number>;
        padding: p.Property<number>;
        major_tick_in: p.Property<number>;
        major_tick_out: p.Property<number>;
        minor_tick_in: p.Property<number>;
        minor_tick_out: p.Property<number>;
    } & Mixins;
    type Mixins = mixins.MajorLabelText & mixins.TitleText & mixins.MajorTickLine & mixins.MinorTickLine & mixins.BorderLine & mixins.BarLine & mixins.BackgroundFill;
    type Visuals = Annotation.Visuals & {
        major_label_text: visuals.Text;
        title_text: visuals.Text;
        major_tick_line: visuals.Line;
        minor_tick_line: visuals.Line;
        border_line: visuals.Line;
        bar_line: visuals.Line;
        background_fill: visuals.Fill;
    };
}
export interface BaseColorBar extends BaseColorBar.Attrs {
}
export declare class BaseColorBar extends Annotation {
    properties: BaseColorBar.Props;
    __view_type__: BaseColorBarView;
    constructor(attrs?: Partial<BaseColorBar.Attrs>);
}
//# sourceMappingURL=base_color_bar.d.ts.map