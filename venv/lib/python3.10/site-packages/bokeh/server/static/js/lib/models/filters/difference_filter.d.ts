import { CompositeFilter } from "./composite_filter";
import type * as p from "../../core/properties";
import type { Indices } from "../../core/types";
export declare namespace DifferenceFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeFilter.Props;
}
export interface DifferenceFilter extends DifferenceFilter.Attrs {
}
export declare class DifferenceFilter extends CompositeFilter {
    properties: DifferenceFilter.Props;
    constructor(attrs?: Partial<DifferenceFilter.Attrs>);
    protected _inplace_op(index: Indices, op: Indices): void;
}
//# sourceMappingURL=difference_filter.d.ts.map