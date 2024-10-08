import type { TypedArray } from "../types";
import type { Ref } from "../util/refs";
import type { TypedArrayRep } from "./reps";
export type SerializableType = null | boolean | number | string | Date | Serializable | SerializableType[] | {
    [key: string]: SerializableType;
} | ArrayBuffer;
export declare const serialize: unique symbol;
export interface Serializable {
    [serialize](serializer: Serializer): unknown;
}
export type SerializableOf<T extends SerializableType> = T extends Serializable ? ReturnType<T[typeof serialize]> : T extends SerializableType[] ? SerializableOf<T[number]>[] : unknown;
export declare class SerializationError extends Error {
}
declare class Serialized<T> {
    readonly value: T;
    constructor(value: T);
    to_json(): string;
}
export type Options = {
    references: Map<unknown, Ref>;
    binary: boolean;
    include_defaults: boolean;
};
export declare class Serializer {
    private readonly _references;
    readonly binary: boolean;
    readonly include_defaults: boolean;
    protected readonly _circular: WeakSet<object>;
    constructor(options?: Partial<Options>);
    get_ref(obj: unknown): Ref | undefined;
    add_ref(obj: unknown, ref: Ref): void;
    to_serializable<T extends SerializableType>(obj: T): Serialized<SerializableOf<T>>;
    to_serializable(obj: unknown): Serialized<unknown>;
    encode<T extends SerializableType>(obj: T): SerializableOf<T>;
    encode(obj: unknown): unknown;
    protected _encode(obj: unknown): unknown;
    encode_struct(struct: {
        [key: string]: unknown;
    }): {
        [key: string]: unknown;
    };
    error(message: string): never;
    protected _encode_typed_array(obj: TypedArray): TypedArrayRep;
}
export {};
//# sourceMappingURL=serializer.d.ts.map