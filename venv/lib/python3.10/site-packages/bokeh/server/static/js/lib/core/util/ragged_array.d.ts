import type { Constructor } from "../class";
import type { Arrayable, TypedArray } from "../types";
import type { Equatable, Comparator } from "./eq";
import { equals } from "./eq";
type OffsetArray = Uint8Array | Uint16Array | Uint32Array;
export declare class RaggedArray<ArrayType extends TypedArray = Float64Array> implements Equatable {
    readonly offsets: OffsetArray;
    readonly data: ArrayType;
    static [Symbol.toStringTag]: string;
    constructor(offsets: OffsetArray, data: ArrayType);
    [equals](that: this, cmp: Comparator): boolean;
    get length(): number;
    clone(): RaggedArray<ArrayType>;
    static from<ArrayType extends TypedArray>(items: Arrayable<Arrayable<number>>, ctor: Constructor<ArrayType>): RaggedArray<ArrayType>;
    [Symbol.iterator](): IterableIterator<ArrayType>;
    private _check_bounds;
    get(i: number): ArrayType;
    set(i: number, array: ArrayLike<number>): void;
}
export {};
//# sourceMappingURL=ragged_array.d.ts.map