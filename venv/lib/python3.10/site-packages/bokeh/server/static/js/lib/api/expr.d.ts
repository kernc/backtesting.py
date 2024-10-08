import type { Arrayable } from "../core/types";
import type { NDArrayType } from "../core/util/ndarray";
import type { Numerical } from "./linalg";
export declare function f(strings: TemplateStringsArray, ...subs: number[]): number;
export declare function f<T = number>(strings: TemplateStringsArray, sub: NDArrayType<T>, ...subs: Numerical<T>[]): NDArrayType<T>;
export declare function f<T = number>(strings: TemplateStringsArray, ...subs: Numerical<T>[]): Arrayable<T>;
//# sourceMappingURL=expr.d.ts.map