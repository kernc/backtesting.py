import { CompositeFilter } from "./composite_filter";
import type * as p from "../../core/properties";
import type { Indices } from "../../core/types";
export declare namespace IntersectionFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeFilter.Props;
}
export interface IntersectionFilter extends IntersectionFilter.Attrs {
}
export declare class IntersectionFilter extends CompositeFilter {
    properties: IntersectionFilter.Props;
    constructor(attrs?: Partial<IntersectionFilter.Attrs>);
    protected _inplace_op(index: Indices, op: Indices): void;
}
//# sourceMappingURL=intersection_filter.d.ts.map