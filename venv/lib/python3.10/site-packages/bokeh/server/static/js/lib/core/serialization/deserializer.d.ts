import type { HasProps } from "../has_props";
import type { ModelResolver } from "../resolvers";
import type { ID, PlainObject, TypedArray } from "../types";
import type { Ref } from "../util/refs";
import type { NDArray } from "../util/ndarray";
import { Slice } from "../util/slice";
import type { Value, Field, Expr } from "../vectorization";
import type { SymbolRep, NumberRep, ArrayRep, SetRep, MapRep, BytesRep, SliceRep, DateRep, TypedArrayRep, NDArrayRep, ObjectRep, ObjectRefRep, ValueRep, FieldRep, ExprRep } from "./reps";
export type Decoder = (rep: any, deserializer: Deserializer) => unknown;
export declare class DeserializationError extends Error {
}
export declare class Deserializer {
    readonly resolver: ModelResolver;
    readonly references: Map<ID, HasProps>;
    readonly finalize?: ((obj: HasProps) => void) | undefined;
    static register(type: string, decoder: Decoder): void;
    constructor(resolver: ModelResolver, references?: Map<ID, HasProps>, finalize?: ((obj: HasProps) => void) | undefined);
    protected _decoding: boolean;
    protected readonly _buffers: Map<ID, ArrayBuffer>;
    protected readonly _finalizable: Set<HasProps>;
    decode(obj: unknown, buffers?: Map<ID, ArrayBuffer>): unknown;
    protected _decode(obj: unknown): unknown;
    protected _decode_symbol(obj: SymbolRep): symbol;
    protected _decode_number(obj: NumberRep): number;
    protected _decode_plain_array(obj: unknown[]): unknown[];
    protected _decode_plain_object(obj: PlainObject): PlainObject;
    protected _decode_array(obj: ArrayRep): unknown[];
    protected _decode_set(obj: SetRep): Set<unknown>;
    protected _decode_map(obj: MapRep): Map<unknown, unknown> | PlainObject<unknown>;
    protected _decode_bytes(obj: BytesRep): ArrayBuffer;
    protected _decode_slice(obj: SliceRep): Slice;
    protected _decode_date(obj: DateRep): Date;
    protected _decode_value(obj: ValueRep): Value<unknown>;
    protected _decode_field(obj: FieldRep): Field;
    protected _decode_expr(obj: ExprRep): Expr<unknown>;
    protected _decode_typed_array(obj: TypedArrayRep): TypedArray;
    protected _decode_ndarray(obj: NDArrayRep): NDArray;
    protected _decode_object(obj: ObjectRep): unknown;
    protected _decode_ref(obj: Ref): HasProps;
    protected _decode_object_ref(obj: ObjectRefRep): HasProps;
    error(message: string): never;
    warning(message: string): void;
    private _resolve_type;
}
//# sourceMappingURL=deserializer.d.ts.map