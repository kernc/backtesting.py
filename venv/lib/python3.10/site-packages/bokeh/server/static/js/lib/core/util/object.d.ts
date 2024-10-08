import type { Arrayable, Dict, PlainObject } from "../types";
export declare const assign: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare const extend: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare function to_object<T = any>(obj: PlainObject<T> | Iterable<readonly [PropertyKey, T]>): PlainObject<T>;
export declare function keys<T = unknown>(obj: {
    [key: string]: T;
} | Map<string, T>): string[];
export declare function keys(obj: {}): string[];
export declare function values<T = unknown>(obj: {
    [key: string]: T;
} | Map<string, T>): T[];
export declare function values(obj: {}): unknown[];
export declare function entries<T = unknown>(obj: {
    [key: string]: T;
} | Map<string, T>): [string, T][];
export declare function entries(obj: {}): [string, unknown][];
export declare const typed_keys: <T extends object>(obj: T) => (keyof T)[];
export declare const typed_values: <T extends object>(obj: T) => T[keyof T][];
export declare const typed_entries: <T extends object>(obj: T) => [keyof T, T[keyof T]][];
export declare function clone<T>(obj: Dict<T>): Dict<T>;
export declare function merge<K, V>(obj0: Map<K, Arrayable<V>>, obj1: Map<K, Arrayable<V>>): Map<K, V[]>;
export declare function size(obj: Dict<unknown>): number;
export declare function is_empty(obj: Dict<unknown>): boolean;
export declare class PlainObjectProxy<V> implements Map<string, V> {
    readonly obj: {
        [key: string]: V;
    };
    constructor(obj: {
        [key: string]: V;
    });
    readonly [Symbol.toStringTag] = "PlainObjectProxy";
    clear(): void;
    delete(key: string): boolean;
    has(key: string): boolean;
    get(key: string): V | undefined;
    set(key: string, value: V): this;
    get size(): number;
    [Symbol.iterator](): IterableIterator<[string, V]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[string, V]>;
    forEach(callback: (value: V, key: string, map: Map<string, V>) => void, that?: unknown): void;
}
export declare function dict<V, K = string>(obj: Dict<V> | Map<K, V>): Map<K | string, V>;
//# sourceMappingURL=object.d.ts.map