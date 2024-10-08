import { Annotation, AnnotationView } from "./annotation";
import { Dimensional } from "./dimensional";
import { Range } from "../ranges/range";
import { Align, Orientation, Location } from "../../core/enums";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import { BBox } from "../../core/util/bbox";
import type { Context2d } from "../../core/util/canvas";
import type { Size, Layoutable } from "../../core/layout";
import { TextLayout } from "../../core/layout";
import { Grid } from "../../core/layout/grid";
import type { ContinuousAxis, ContinuousAxisView } from "../axes/continuous_axis";
import { Ticker } from "../tickers/ticker";
import type { Scale } from "../scales/scale";
import { AutoAnchor } from "../common/kinds";
declare const Position: import("../../core/kinds").Kinds.Or<["center" | "left" | "right" | "top" | "bottom" | "top_left" | "top_center" | "top_right" | "center_left" | "center_center" | "center_right" | "bottom_left" | "bottom_center" | "bottom_right", [string | number | [string, string] | [string, string, string], string | number | [string, string] | [string, string, string]]]>;
type Position = typeof Position["__type__"];
declare const PositionUnits: import("../../core/kinds").Kinds.Enum<"data" | "screen" | "percent" | "view">;
type PositionUnits = typeof PositionUnits["__type__"];
declare const LengthUnits: import("../../core/kinds").Kinds.Enum<"data" | "screen" | "percent">;
type LengthUnits = typeof LengthUnits["__type__"];
declare const LengthSizing: import("../../core/kinds").Kinds.Enum<"adaptive" | "exact">;
type LengthSizing = typeof LengthSizing["__type__"];
export declare class ScaleBarView extends AnnotationView {
    model: ScaleBar;
    visuals: ScaleBar.Visuals;
    protected _bbox: BBox;
    get bbox(): BBox;
    protected label_layout: TextLayout;
    protected title_layout: TextLayout;
    protected axis_layout: Layoutable;
    protected box_layout: Grid;
    protected axis: ContinuousAxis;
    protected axis_view: ContinuousAxisView;
    protected axis_scale: Scale;
    protected cross_scale: Scale;
    protected range: Range;
    protected _get_size(): Size;
    initialize(): void;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    update_layout(): void;
    update_geometry(): void;
    protected get horizontal(): boolean;
    protected text_layout(args: {
        text: string;
        location: Location;
        align: Align;
        visuals: visuals.Text;
    }): TextLayout;
    compute_geometry(): void;
    protected _draw_box(ctx: Context2d): void;
    protected _draw_axis(_ctx: Context2d): void;
    protected _draw_text(ctx: Context2d, layout: TextLayout, location: Location): void;
    protected _draw_label(ctx: Context2d): void;
    protected _draw_title(ctx: Context2d): void;
    protected _paint(): void;
}
export declare namespace ScaleBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        anchor: p.Property<AutoAnchor>;
        bar_length: p.Property<number>;
        bar_length_units: p.Property<LengthUnits>;
        dimensional: p.Property<Dimensional>;
        label: p.Property<string>;
        label_align: p.Property<Align>;
        label_location: p.Property<Location>;
        label_standoff: p.Property<number>;
        length_sizing: p.Property<LengthSizing>;
        location: p.Property<Position>;
        margin: p.Property<number>;
        orientation: p.Property<Orientation>;
        padding: p.Property<number>;
        range: p.Property<Range | "auto">;
        ticker: p.Property<Ticker>;
        title: p.Property<string>;
        title_align: p.Property<Align>;
        title_location: p.Property<Location>;
        title_standoff: p.Property<number>;
        unit: p.Property<string>;
        x_units: p.Property<PositionUnits>;
        y_units: p.Property<PositionUnits>;
    } & Mixins;
    type Mixins = mixins.BackgroundFill & mixins.BackgroundHatch & mixins.BarLine & mixins.BorderLine & mixins.LabelText & mixins.TitleText;
    type Visuals = Annotation.Visuals & {
        background_fill: visuals.Fill;
        background_hatch: visuals.Hatch;
        bar_line: visuals.Line;
        border_line: visuals.Line;
        label_text: visuals.Text;
        title_text: visuals.Text;
    };
}
export interface ScaleBar extends ScaleBar.Attrs {
}
export declare class ScaleBar extends Annotation {
    properties: ScaleBar.Props;
    __view_type__: ScaleBarView;
    constructor(attrs?: Partial<ScaleBar.Attrs>);
}
export {};
//# sourceMappingURL=scale_bar.d.ts.map