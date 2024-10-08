import type { Attrs } from "../types";
export type Struct = {
    id: string;
    type: string;
    attributes: Attrs;
};
export type Ref = {
    id: string;
};
export declare function is_ref(obj: unknown): obj is Ref;
export declare const has_refs: unique symbol;
export interface HasRefs {
    readonly [has_refs]: boolean;
}
export declare function is_HasRefs(v: unknown): v is HasRefs;
export declare function may_have_refs(obj: object): boolean;
//# sourceMappingURL=refs.d.ts.map