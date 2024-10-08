import { Axis } from "../axes";
import { GuideRenderer, GuideRendererView } from "../renderers/guide_renderer";
import type { Range } from "../ranges/range";
import { Ticker } from "../tickers/ticker";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
export declare class GridView extends GuideRendererView {
    model: Grid;
    visuals: Grid.Visuals;
    protected _paint(): void;
    connect_signals(): void;
    protected _draw_regions(ctx: Context2d): void;
    protected _draw_grids(ctx: Context2d): void;
    protected _draw_minor_grids(ctx: Context2d): void;
    protected _draw_grid_helper(ctx: Context2d, visuals: visuals.Line, xs: number[][], ys: number[][]): void;
    ranges(): [Range, Range];
    computed_bounds(): [number, number];
    grid_coords(location: "major" | "minor", exclude_ends?: boolean): [number[][], number[][]];
}
export declare namespace Grid {
    type Attrs = p.AttrsOf<Props>;
    type Props = GuideRenderer.Props & {
        bounds: p.Property<[number, number] | "auto">;
        cross_bounds: p.Property<[number, number] | "auto">;
        dimension: p.Property<0 | 1>;
        axis: p.Property<Axis | null>;
        ticker: p.Property<Ticker | null>;
    } & Mixins;
    type Mixins = mixins.GridLine & mixins.MinorGridLine & mixins.BandFill & mixins.BandHatch;
    type Visuals = GuideRenderer.Visuals & {
        grid_line: visuals.Line;
        minor_grid_line: visuals.Line;
        band_fill: visuals.Fill;
        band_hatch: visuals.Hatch;
    };
}
export interface Grid extends Grid.Attrs {
}
export declare class Grid extends GuideRenderer {
    properties: Grid.Props;
    __view_type__: GridView;
    constructor(attrs?: Partial<Grid.Attrs>);
    get_ticker(): Ticker | null;
}
//# sourceMappingURL=grid.d.ts.map