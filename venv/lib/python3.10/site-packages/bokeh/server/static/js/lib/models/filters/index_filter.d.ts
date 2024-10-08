import { Filter } from "./filter";
import type * as p from "../../core/properties";
import { Indices } from "../../core/types";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
export declare namespace IndexFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Filter.Props & {
        indices: p.Property<Iterable<number> | null>;
    };
}
export interface IndexFilter extends IndexFilter.Attrs {
}
export declare class IndexFilter extends Filter {
    properties: IndexFilter.Props;
    constructor(attrs?: Partial<IndexFilter.Attrs>);
    compute_indices(source: ColumnarDataSource): Indices;
}
//# sourceMappingURL=index_filter.d.ts.map