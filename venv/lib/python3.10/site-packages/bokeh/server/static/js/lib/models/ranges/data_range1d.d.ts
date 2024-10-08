import { DataRange } from "./data_range";
import type { Renderer, RendererView } from "../renderers/renderer";
import { PaddingUnits, StartEnd } from "../../core/enums";
import type { Rect } from "../../core/types";
import type * as p from "../../core/properties";
import type { PlotView } from "../plots/plot";
export declare const auto_ranged: unique symbol;
export interface AutoRanged {
    readonly [auto_ranged]: true;
    bounds(): Rect;
    log_bounds(): Rect;
}
export declare function is_auto_ranged<T extends RendererView>(r: T): r is T & AutoRanged;
export type Dim = 0 | 1;
export type Bounds = Map<Renderer, Rect>;
export declare namespace DataRange1d {
    type Attrs = p.AttrsOf<Props>;
    type Props = DataRange.Props & {
        range_padding: p.Property<number>;
        range_padding_units: p.Property<PaddingUnits>;
        flipped: p.Property<boolean>;
        follow: p.Property<StartEnd | null>;
        follow_interval: p.Property<number | null>;
        default_span: p.Property<number>;
        only_visible: p.Property<boolean>;
        scale_hint: p.Property<"log" | "auto">;
    };
}
export interface DataRange1d extends DataRange1d.Attrs {
}
export declare class DataRange1d extends DataRange {
    properties: DataRange1d.Props;
    constructor(attrs?: Partial<DataRange1d.Attrs>);
    protected _initial_start: number | null;
    protected _initial_end: number | null;
    protected _initial_range_padding: number;
    protected _initial_range_padding_units: PaddingUnits;
    protected _initial_follow: StartEnd | null;
    protected _initial_follow_interval: number | null;
    protected _initial_default_span: number;
    protected _plot_bounds: Map<PlotView, Rect>;
    have_updated_interactively: boolean;
    initialize(): void;
    get min(): number;
    get max(): number;
    computed_renderers(): Renderer[];
    _compute_plot_bounds(renderers: Renderer[], bounds: Bounds): Rect;
    adjust_bounds_for_aspect(bounds: Rect, ratio: number): Rect;
    _compute_min_max(plot_bounds: Iterable<[PlotView, Rect]>, dimension: Dim): [number, number];
    _compute_range(min: number, max: number): [number, number];
    update(bounds: Bounds, dimension: Dim, plot: PlotView, ratio?: number): void;
    reset(): void;
}
//# sourceMappingURL=data_range1d.d.ts.map