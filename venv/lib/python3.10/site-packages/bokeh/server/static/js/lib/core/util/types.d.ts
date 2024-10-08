import type { Arrayable, TypedArray, Dict } from "../types";
export declare function is_undefined(obj: unknown): obj is undefined;
export declare function is_defined<T>(obj: T): obj is (T extends undefined ? never : T);
export declare function is_nullish(obj: unknown): obj is null | undefined;
export declare function isBoolean(obj: unknown): obj is boolean;
export declare function isNumber(obj: unknown): obj is number;
export declare function isInteger(obj: unknown): obj is number;
export declare function isString(obj: unknown): obj is string;
export declare function isSymbol(obj: unknown): obj is symbol;
export type Primitive = null | boolean | number | string | symbol;
export declare function isPrimitive(obj: unknown): obj is Primitive;
export declare function isFunction(obj: unknown): obj is Function;
export declare function isArray<T>(obj: unknown): obj is T[];
export declare function isArrayOf<T>(array: unknown[], predicate: (item: unknown) => item is T): array is T[];
export declare function isArrayableOf<T>(array: Arrayable, predicate: (item: unknown) => item is T): array is Arrayable<T>;
export declare function isTypedArray(obj: unknown): obj is TypedArray;
export declare function isObject(obj: unknown): obj is object;
export declare function isBasicObject<T>(obj: unknown): obj is {
    [key: string]: T;
};
export declare function isPlainObject<T>(obj: unknown): obj is {
    [key: string]: T;
};
export declare function isDict<T>(obj: unknown): obj is Dict<T>;
export declare function isIterable(obj: unknown): obj is Iterable<unknown>;
export declare function isArrayable(obj: unknown): obj is Arrayable<unknown>;
//# sourceMappingURL=types.d.ts.map