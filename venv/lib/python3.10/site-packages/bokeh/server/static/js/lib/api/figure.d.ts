import type { HasProps } from "../core/has_props";
import type { Attrs } from "../core/types";
import type { Vector } from "../core/vectorization";
import type { Property } from "../core/properties";
import type { Class } from "../core/class";
import type { Location } from "../core/enums";
import type { Glyph, Scale, Plot, Toolbar } from "./models";
import { Axis, CoordinateMapping, GlyphRenderer, Grid, Range, Tool } from "./models";
import { Legend } from "../models/annotations/legend";
import { LegendItem } from "../models/annotations/legend_item";
import type { ToolAliases } from "../models/tools/tool";
import { Figure as BaseFigure } from "../models/plots/figure";
import type { NamesOf } from "./glyph_api";
import { GlyphAPI } from "./glyph_api";
export type ToolName = keyof ToolAliases;
export type AxisType = "auto" | "linear" | "datetime" | "log" | "mercator" | null;
export type AxisLocation = Location | null;
export declare namespace Figure {
    type Attrs = Omit<Plot.Attrs, "x_range" | "y_range"> & {
        x_range: Range | [number, number] | ArrayLike<string>;
        y_range: Range | [number, number] | ArrayLike<string>;
        x_axis_type: AxisType;
        y_axis_type: AxisType;
        x_axis_location: AxisLocation;
        y_axis_location: AxisLocation;
        x_axis_label: Axis["axis_label"];
        y_axis_label: Axis["axis_label"];
        x_minor_ticks: number | "auto";
        y_minor_ticks: number | "auto";
        tools: (Tool | ToolName)[] | string;
        active_drag: Toolbar.Attrs["active_drag"] | string;
        active_inspect: Toolbar.Attrs["active_inspect"] | string;
        active_scroll: Toolbar.Attrs["active_scroll"] | string;
        active_tap: Toolbar.Attrs["active_tap"] | string;
        active_multi: Toolbar.Attrs["active_multi"] | string;
    };
}
type IModelProxy<T extends HasProps> = {
    each(fn: (model: T, i: number) => void): void;
    [Symbol.iterator](): Generator<T, void, undefined>;
};
type PropsOf<T extends HasProps> = {
    [K in keyof T["properties"]]: T["properties"][K] extends Property<infer P> ? P : never;
};
type Proxied<T extends HasProps> = PropsOf<T> & IModelProxy<T>;
export type ICoordinateMapping = {
    x_source?: Range;
    y_source?: Range;
    x_scale?: Scale;
    y_scale?: Scale;
    x_target: Range;
    y_target: Range;
};
export declare class SubFigure extends GlyphAPI {
    readonly coordinates: CoordinateMapping;
    readonly parent: Figure;
    constructor(coordinates: CoordinateMapping, parent: Figure);
    _glyph<G extends Glyph>(cls: Class<G>, method: string, positional: NamesOf<G>, args: unknown[], overrides?: object): GlyphRenderer<G>;
}
export interface Figure extends GlyphAPI {
}
export declare class Figure extends BaseFigure {
    get xaxes(): Axis[];
    get yaxes(): Axis[];
    get axes(): Axis[];
    get xaxis(): Proxied<Axis>;
    get yaxis(): Proxied<Axis>;
    get axis(): Proxied<Axis>;
    get xgrids(): Grid[];
    get ygrids(): Grid[];
    get grids(): Grid[];
    get xgrid(): Proxied<Grid>;
    get ygrid(): Proxied<Grid>;
    get grid(): Proxied<Grid>;
    get legend(): Legend;
    constructor(attrs?: Partial<Figure.Attrs>);
    get coordinates(): CoordinateMapping | null;
    subplot(coordinates: ICoordinateMapping): SubFigure;
    _pop_visuals(cls: Class<HasProps>, props: Attrs, prefix?: string, defaults?: Attrs, override_defaults?: Attrs): Attrs;
    _find_uniq_name(data: Map<string, unknown>, name: string): string;
    _fixup_values(cls: Class<HasProps>, data: Map<string, unknown>, attrs: Attrs): Set<string>;
    _signature(method: string, positional: string[]): string;
    _glyph<G extends Glyph>(cls: Class<G>, method: string, positional: NamesOf<G>, args: unknown[], overrides?: object): GlyphRenderer<G>;
    static _get_range(range?: Range | [number, number] | ArrayLike<string>): Range;
    static _get_scale(range_input: Range, axis_type: AxisType): Scale;
    _process_axis_and_grid(axis_type: AxisType, axis_location: AxisLocation, minor_ticks: number | "auto" | undefined, axis_label: Axis["axis_label"], rng: Range, dim: 0 | 1): void;
    _get_axis(axis_type: AxisType, range: Range, dim: 0 | 1): Axis | null;
    _get_num_minor_ticks(axis: Axis, num_minor_ticks?: number | "auto"): number;
    _update_legend(legend_item_label: Vector<string>, glyph_renderer: GlyphRenderer): void;
    protected _handle_legend_label(value: string, legend: Legend, glyph_renderer: GlyphRenderer): void;
    protected _handle_legend_field(field: string, legend: Legend, glyph_renderer: GlyphRenderer): void;
    protected _handle_legend_group(name: string, legend: Legend, glyph_renderer: GlyphRenderer): void;
    protected _find_legend_item(label: Vector<string>, legend: Legend): LegendItem | null;
}
export declare function figure(attributes?: Partial<Figure.Attrs>): Figure;
export {};
//# sourceMappingURL=figure.d.ts.map