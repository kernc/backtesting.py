import type { LatLon } from "../enums";
import type { Arrayable } from "../types";
export declare const wgs84_mercator: {
    compute(x: number, y: number): [number, number];
    invert(merc_x: number, merc_y: number): [number, number];
};
export declare function clip_mercator(low: number, high: number, dimension: LatLon): [number, number];
export declare function in_bounds(value: number, dimension: LatLon): boolean;
export declare namespace inplace {
    function project_xy(x: Arrayable<number>, y: Arrayable<number>, merc_x?: Arrayable<number>, merc_y?: Arrayable<number>): void;
    function project_xsys(xs: Arrayable<number>[], ys: Arrayable<number>[], merc_xs?: Arrayable<number>[], merc_ys?: Arrayable<number>[]): void;
}
export declare function project_xy(x: Arrayable<number>, y: Arrayable<number>): [Arrayable<number>, Arrayable<number>];
export declare function project_xsys(xs: Arrayable<number>[], ys: Arrayable<number>[]): [Arrayable<number>[], Arrayable<number>[]];
//# sourceMappingURL=projections.d.ts.map