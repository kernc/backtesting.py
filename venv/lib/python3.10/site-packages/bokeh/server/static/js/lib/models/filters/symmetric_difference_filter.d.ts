import { CompositeFilter } from "./composite_filter";
import type * as p from "../../core/properties";
import type { Indices } from "../../core/types";
export declare namespace SymmetricDifferenceFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeFilter.Props;
}
export interface SymmetricDifferenceFilter extends SymmetricDifferenceFilter.Attrs {
}
export declare class SymmetricDifferenceFilter extends CompositeFilter {
    properties: SymmetricDifferenceFilter.Props;
    constructor(attrs?: Partial<SymmetricDifferenceFilter.Attrs>);
    protected _inplace_op(index: Indices, op: Indices): void;
}
//# sourceMappingURL=symmetric_difference_filter.d.ts.map