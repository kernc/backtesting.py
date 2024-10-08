export type CloneableType = null | boolean | number | string | Cloneable | CloneableType[] | {
    [key: string]: CloneableType;
} | Map<CloneableType, CloneableType> | Set<CloneableType>;
export declare const clone: unique symbol;
export interface Cloneable {
    [clone](cloner: Cloner): this;
}
export declare function is_Cloneable<T>(obj: T): obj is T & Cloneable;
export declare class CloningError extends Error {
}
export declare class Cloner {
    constructor();
    clone<T extends CloneableType>(obj: T): T;
    clone(obj: unknown): unknown;
}
//# sourceMappingURL=cloneable.d.ts.map