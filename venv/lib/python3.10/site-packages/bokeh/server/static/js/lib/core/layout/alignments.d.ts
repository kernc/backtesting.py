import type { SizeHint, Size } from "./types";
import { Layoutable } from "./layoutable";
import { BBox } from "../util/bbox";
export declare abstract class Stack extends Layoutable {
    [Symbol.iterator](): Generator<Layoutable, void, unknown>;
    children: Layoutable[];
}
export declare class HStack extends Stack {
    protected _measure(_viewport: Size): SizeHint;
    protected _set_geometry(outer: BBox, inner: BBox): void;
}
export declare class VStack extends Stack {
    protected _measure(_viewport: Size): SizeHint;
    protected _set_geometry(outer: BBox, inner: BBox): void;
}
export declare class NodeLayout extends Layoutable {
    [Symbol.iterator](): Generator<Layoutable, void, unknown>;
    children: Layoutable[];
    protected _measure(viewport: Size): SizeHint;
    protected _set_geometry(outer: BBox, inner: BBox): void;
}
//# sourceMappingURL=alignments.d.ts.map