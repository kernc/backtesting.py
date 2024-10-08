import type { Arrayable } from "./types";
import type { HasProps } from "./has_props";
import type { Signal0 } from "./signaling";
import type { ColumnarDataSource } from "../models/sources/columnar_data_source";
export type Transform<In, Out> = {
    compute(x: In): Out;
    v_compute(xs: Arrayable<In>): Arrayable<Out>;
    change: Signal0<HasProps>;
};
export type ScalarExpression<Out> = {
    compute(source: ColumnarDataSource): Out;
    change: Signal0<HasProps>;
};
export type VectorExpression<Out> = {
    v_compute(source: ColumnarDataSource): Arrayable<Out>;
    change: Signal0<HasProps>;
};
export type Expression<T> = ScalarExpression<T> | VectorExpression<T>;
import type { Serializable } from "./serialization";
export type Value<T> = Partial<Serializable> & {
    value: T;
};
export type Field = Partial<Serializable> & {
    field: string;
};
export type Expr<T> = Partial<Serializable> & {
    expr: Expression<T>;
};
export type Scalar<T> = Value<T> & Transformed<T>;
export type Vector<T> = (Value<T> | Field | Expr<T>) & Transformed<T>;
export type Dimensional<T, U> = T & {
    units?: U;
};
export type Transformed<T> = {
    transform?: Transform<unknown, T>;
};
export declare function isValue<T>(obj: unknown): obj is Value<T>;
export declare function isField(obj: unknown): obj is Field;
export declare function isExpr<T>(obj: unknown): obj is Expr<T>;
export declare function isVectorized<T>(obj: unknown): obj is Vector<T>;
//# sourceMappingURL=vectorization.d.ts.map