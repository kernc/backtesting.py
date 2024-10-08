export { min, max } from "./arrayable";
export declare function range(start: number, stop?: number, step?: number): Iterable<number>;
export declare function reverse<T>(array: T[]): Iterable<T>;
export declare function enumerate<T>(seq: Iterable<T>): Iterable<[T, number]>;
export declare function take<T>(seq: Iterable<T>, n: number): Iterable<T>;
export declare function skip<T>(seq: Iterable<T>, n: number): Iterable<T>;
export declare function tail<T>(seq: Iterable<T>): Iterable<T>;
export declare function join<T>(seq: Iterable<Iterable<T>>, separator?: () => T): Iterable<T>;
export declare function zip<T0, T1>(iterable0: Iterable<T0>, iterable1: Iterable<T1>): Iterable<[T0, T1]>;
export declare function interleave<T>(seq: Iterable<T>, separator: () => T): Iterable<T>;
export declare function map<T, U>(iterable: Iterable<T>, fn: (item: T, i: number) => U): Iterable<U>;
export declare function flat_map<T, U>(iterable: Iterable<T>, fn: (item: T, i: number) => Iterable<U>): Iterable<U>;
export declare function filter<T>(iterable: Iterable<T>, fn: (item: T, i: number) => boolean): Iterable<T>;
export declare function every<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): boolean;
export declare function some<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): boolean;
export declare function combinations<T>(seq: T[], r: number): Iterable<T[]>;
export declare function subsets<T>(seq: T[]): Iterable<T[]>;
//# sourceMappingURL=iterator.d.ts.map