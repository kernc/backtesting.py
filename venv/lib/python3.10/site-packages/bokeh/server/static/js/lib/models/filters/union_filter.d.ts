import { CompositeFilter } from "./composite_filter";
import type * as p from "../../core/properties";
import type { Indices } from "../../core/types";
export declare namespace UnionFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeFilter.Props;
}
export interface UnionFilter extends UnionFilter.Attrs {
}
export declare class UnionFilter extends CompositeFilter {
    properties: UnionFilter.Props;
    constructor(attrs?: Partial<UnionFilter.Attrs>);
    protected _inplace_op(index: Indices, op: Indices): void;
}
//# sourceMappingURL=union_filter.d.ts.map