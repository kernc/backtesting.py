export declare namespace Matrix {
    type MapFn<T, U> = (value: T, row: number, col: number) => U;
}
export declare class Matrix<T> {
    readonly nrows: number;
    readonly ncols: number;
    private _matrix;
    constructor(nrows: number, ncols: number, init: (row: number, col: number) => T);
    at(row: number, col: number): T;
    [Symbol.iterator](): Iterator<[T, number, number]>;
    values(): Iterable<T>;
    map<U>(fn: Matrix.MapFn<T, U>): Matrix<U>;
    apply<U>(obj: Matrix<Matrix.MapFn<T, U>> | Matrix.MapFn<T, U>[][]): Matrix<U>;
    to_sparse(): [T, number, number][];
    static from<U>(obj: U[], ncols: number): Matrix<U>;
    static from<U>(obj: Matrix<U> | U[][]): Matrix<U>;
}
//# sourceMappingURL=matrix.d.ts.map