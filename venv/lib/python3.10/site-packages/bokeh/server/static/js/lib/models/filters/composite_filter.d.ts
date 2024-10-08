import { Filter } from "./filter";
import type * as p from "../../core/properties";
import { Indices } from "../../core/types";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
export declare namespace CompositeFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Filter.Props & {
        operands: p.Property<Filter[]>;
    };
}
export interface CompositeFilter extends CompositeFilter.Attrs {
}
export declare abstract class CompositeFilter extends Filter {
    properties: CompositeFilter.Props;
    constructor(attrs?: Partial<CompositeFilter.Attrs>);
    connect_signals(): void;
    compute_indices(source: ColumnarDataSource): Indices;
    protected abstract _inplace_op(index: Indices, op: Indices): void;
}
//# sourceMappingURL=composite_filter.d.ts.map