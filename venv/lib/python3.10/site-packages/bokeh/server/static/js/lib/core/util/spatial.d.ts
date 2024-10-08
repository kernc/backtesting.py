import type { Rect } from "../types";
import { Indices } from "../types";
export declare class SpatialIndex {
    private readonly index;
    constructor(size: number);
    add_rect(x0: number, y0: number, x1: number, y1: number): void;
    add_point(x: number, y: number): void;
    add_empty(): void;
    finish(): void;
    protected _normalize(rect: Rect): Rect;
    get bbox(): Rect;
    indices(rect: Rect): Indices;
    bounds(rect: Rect): Rect;
}
//# sourceMappingURL=spatial.d.ts.map