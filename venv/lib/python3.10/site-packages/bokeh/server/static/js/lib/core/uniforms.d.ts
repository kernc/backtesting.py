import type { Indices, Arrayable } from "./types";
import type { Equatable, Comparator } from "./util/eq";
import { equals } from "./util/eq";
export declare abstract class Uniform<T = number> implements Equatable {
    abstract readonly is_scalar: boolean;
    abstract readonly length: number;
    abstract get(i: number): T;
    abstract [Symbol.iterator](): Generator<T, void, undefined>;
    abstract select(indices: Indices): Uniform<T>;
    abstract [equals](that: this, cmp: Comparator): boolean;
    abstract map<U>(fn: (v: T) => U): Uniform<U>;
    is_Scalar(): this is UniformScalar<T>;
    is_Vector(): this is UniformVector<T>;
}
export declare class UniformScalar<T> extends Uniform<T> {
    readonly value: T;
    readonly length: number;
    readonly is_scalar = true;
    constructor(value: T, length: number);
    get(_i: number): T;
    [Symbol.iterator](): Generator<T, void, undefined>;
    select(indices: Indices): UniformScalar<T>;
    [equals](that: this, cmp: Comparator): boolean;
    map<U>(fn: (v: T) => U): UniformScalar<U>;
}
export declare class UniformVector<T> extends Uniform<T> {
    readonly array: Arrayable<T>;
    readonly is_scalar = false;
    readonly length: number;
    constructor(array: Arrayable<T>);
    get(i: number): T;
    [Symbol.iterator](): Generator<T, void, undefined>;
    select(indices: Indices): UniformVector<T>;
    [equals](that: this, cmp: Comparator): boolean;
    map<U>(fn: (v: T) => U): UniformVector<U>;
}
export declare class ColorUniformVector extends UniformVector<number> {
    readonly array: Uint32Array;
    private readonly _view;
    constructor(array: Uint32Array);
    get(i: number): number;
    [Symbol.iterator](): Generator<number, void, undefined>;
}
export declare function min(u: Uniform<number>): number;
export declare function max(u: Uniform<number>): number;
//# sourceMappingURL=uniforms.d.ts.map