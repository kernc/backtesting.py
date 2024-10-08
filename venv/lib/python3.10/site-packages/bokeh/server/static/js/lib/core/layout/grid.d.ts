import type { SizeHint, Size } from "./types";
import { Layoutable } from "./layoutable";
import type { Align } from "../enums";
import { BBox } from "../util/bbox";
export declare class DefaultMap<K, V> {
    readonly def: () => V;
    private _map;
    constructor(def: () => V);
    get(key: K): V;
    apply(key: K, fn: (val: V) => V): void;
}
export type GridItem<T extends Layoutable> = {
    layout: T;
    row: number;
    col: number;
    row_span?: number;
    col_span?: number;
};
export type ItemSizeHint = {
    layout: Layoutable;
    size_hint: SizeHint;
};
export type GridSizeHint = {
    size: Size;
    size_hints: Container<ItemSizeHint>;
    row_heights: number[];
    col_widths: number[];
};
type TrackAlign = "auto" | Align;
export type QuickTrackSizing = "auto" | "min" | "fit" | "max" | number;
export type RowSizing = {
    policy: "auto" | "min";
    align?: TrackAlign;
} | {
    policy: "fit" | "max";
    flex?: number;
    align?: TrackAlign;
} | {
    policy: "fixed";
    height: number;
    align?: TrackAlign;
};
export type ColSizing = {
    policy: "auto" | "min";
    align?: TrackAlign;
} | {
    policy: "fit" | "max";
    flex?: number;
    align?: TrackAlign;
} | {
    policy: "fixed";
    width: number;
    align?: TrackAlign;
};
export type RowsSizing = QuickTrackSizing | {
    [key: string]: QuickTrackSizing | RowSizing | undefined;
};
export type ColsSizing = QuickTrackSizing | {
    [key: string]: QuickTrackSizing | ColSizing | undefined;
};
type Span = {
    r0: number;
    c0: number;
    r1: number;
    c1: number;
};
export declare class Container<T> {
    private readonly _items;
    get size(): number;
    private _nrows;
    private _ncols;
    get nrows(): number;
    get ncols(): number;
    add(span: Span, data: T): void;
    at(r: number, c: number): T[];
    row(r: number): T[];
    col(c: number): T[];
    [Symbol.iterator](): Generator<{
        span: Span;
        data: T;
    }, void, undefined>;
    foreach(fn: (span: Span, data: T) => void): void;
    map<U>(fn: (span: Span, data: T) => U): Container<U>;
}
export declare class Grid<T extends Layoutable = Layoutable> extends Layoutable {
    items: GridItem<T>[];
    [Symbol.iterator](): Generator<T, void, unknown>;
    rows: RowsSizing;
    cols: ColsSizing;
    spacing: number | [number, number];
    private _state;
    constructor(items?: GridItem<T>[]);
    is_width_expanding(): boolean;
    is_height_expanding(): boolean;
    protected _init(): void;
    protected _measure_totals(row_heights: number[], col_widths: number[]): Size;
    protected _measure_cells(cell_viewport: (r: number, c: number) => Size): GridSizeHint;
    protected _measure_grid(viewport: Size): GridSizeHint;
    protected _measure(viewport: Size): SizeHint;
    protected _set_geometry(outer: BBox, inner: BBox): void;
}
export declare class Row extends Grid {
    constructor(items: Layoutable[]);
}
export declare class Column extends Grid {
    constructor(items: Layoutable[]);
}
export {};
//# sourceMappingURL=grid.d.ts.map