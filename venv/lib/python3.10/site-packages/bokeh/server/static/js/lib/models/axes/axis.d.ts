import { GuideRenderer, GuideRendererView } from "../renderers/guide_renderer";
import { Ticker } from "../tickers/ticker";
import { TickFormatter } from "../formatters/tick_formatter";
import { LabelingPolicy } from "../policies/labeling";
import type { Range } from "../ranges/range";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import { Align, Face, LabelOrientation } from "../../core/enums";
import type { Size, Layoutable } from "../../core/layout";
import type { Orient, Normal, Dimension } from "../../core/layout/side_panel";
import { SidePanel } from "../../core/layout/side_panel";
import type { Context2d } from "../../core/util/canvas";
import { GraphicsBoxes } from "../../core/graphics";
import type { Factor } from "../ranges/factor_range";
import type { BaseTextView } from "../text/base_text";
import { BaseText } from "../text/base_text";
import type { IterViews } from "../../core/build_views";
import { BBox } from "../../core/util/bbox";
export declare const LabelOverrides: import("../../core/kinds").Kinds.Or<[import("core/types").Dict<string | BaseText>, Map<string | number, string | BaseText>]>;
export type LabelOverrides = typeof LabelOverrides["__type__"];
export type Extents = {
    tick: number;
    tick_labels: number[];
    tick_label: number;
    axis_label: number;
};
export type Coords = [number[], number[]];
export type TickCoords = {
    major: Coords;
    minor: Coords;
};
export declare abstract class AxisView extends GuideRendererView {
    model: Axis;
    visuals: Axis.Visuals;
    readonly RangeType: Range;
    layout?: Layoutable;
    private _panel;
    get panel(): SidePanel;
    set panel(panel: SidePanel);
    _axis_label_view: BaseTextView | null;
    _major_label_views: Map<string | number, BaseTextView>;
    get bbox(): BBox;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    protected _init_axis_label(): Promise<void>;
    protected _init_major_labels(): Promise<void>;
    update_layout(): void;
    get_size(): Size;
    get is_renderable(): boolean;
    protected abstract _hit_value(sx: number, sy: number): number | Factor | null;
    interactive_hit(sx: number, sy: number): boolean;
    on_hit(sx: number, sy: number): boolean;
    protected _paint(): void;
    connect_signals(): void;
    get needs_clip(): boolean;
    protected _draw_background(ctx: Context2d, _extents: Extents): void;
    protected _draw_rule(ctx: Context2d, _extents: Extents): void;
    protected _draw_major_ticks(ctx: Context2d, _extents: Extents, tick_coords: TickCoords): void;
    protected _draw_minor_ticks(ctx: Context2d, _extents: Extents, tick_coords: TickCoords): void;
    protected _draw_major_labels(ctx: Context2d, extents: Extents, tick_coords: TickCoords): void;
    protected _axis_label_extent(): number;
    protected _draw_axis_label(ctx: Context2d, extents: Extents, _tick_coords: TickCoords): void;
    protected _draw_ticks(ctx: Context2d, coords: Coords, tin: number, tout: number, visuals: visuals.Line): void;
    protected _draw_oriented_labels(ctx: Context2d, labels: GraphicsBoxes, coords: Coords, orient: Orient | number, standoff: number, visuals: visuals.Text): void;
    _tick_extent(): number;
    protected _tick_label_extents(): number[];
    get extents(): Extents;
    protected _oriented_labels_extent(labels: GraphicsBoxes, orient: Orient | number, standoff: number, visuals: visuals.Text): number;
    get normals(): [Normal, Normal];
    get dimension(): Dimension;
    compute_labels(ticks: number[]): GraphicsBoxes;
    scoords(coords: Coords): Coords;
    get ranges(): [typeof this["RangeType"], typeof this["RangeType"]];
    get computed_bounds(): [number, number];
    get rule_coords(): Coords;
    get rule_scoords(): {
        sx0: number;
        sy0: number;
        sx1: number;
        sy1: number;
    };
    get tick_coords(): TickCoords;
    get loc(): number;
    get face(): Face;
    remove(): void;
    has_finished(): boolean;
}
export declare namespace Axis {
    type Attrs = p.AttrsOf<Props>;
    type Props = GuideRenderer.Props & {
        dimension: p.Property<0 | 1 | "auto">;
        face: p.Property<Face | "auto">;
        bounds: p.Property<[number, number] | "auto">;
        ticker: p.Property<Ticker>;
        formatter: p.Property<TickFormatter>;
        axis_label: p.Property<string | BaseText | null>;
        axis_label_standoff: p.Property<number>;
        axis_label_orientation: p.Property<LabelOrientation | number>;
        axis_label_align: p.Property<Align>;
        major_label_standoff: p.Property<number>;
        major_label_orientation: p.Property<LabelOrientation | number>;
        major_label_overrides: p.Property<LabelOverrides>;
        major_label_policy: p.Property<LabelingPolicy>;
        major_tick_in: p.Property<number>;
        major_tick_out: p.Property<number>;
        minor_tick_in: p.Property<number>;
        minor_tick_out: p.Property<number>;
        fixed_location: p.Property<number | Factor | null>;
    } & Mixins;
    type Mixins = mixins.AxisLine & mixins.MajorTickLine & mixins.MinorTickLine & mixins.MajorLabelText & mixins.AxisLabelText & mixins.BackgroundFill;
    type Visuals = GuideRenderer.Visuals & {
        axis_line: visuals.Line;
        major_tick_line: visuals.Line;
        minor_tick_line: visuals.Line;
        major_label_text: visuals.Text;
        axis_label_text: visuals.Text;
        background_fill: visuals.Fill;
    };
}
export interface Axis extends Axis.Attrs {
}
export declare abstract class Axis extends GuideRenderer {
    properties: Axis.Props;
    __view_type__: AxisView;
    constructor(attrs?: Partial<Axis.Attrs>);
}
//# sourceMappingURL=axis.d.ts.map