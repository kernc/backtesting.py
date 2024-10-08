import { Filter } from "./filter";
import type * as p from "../../core/properties";
import type { Indices } from "../../core/types";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
export declare namespace InversionFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Filter.Props & {
        operand: p.Property<Filter>;
    };
}
export interface InversionFilter extends InversionFilter.Attrs {
}
export declare class InversionFilter extends Filter {
    properties: InversionFilter.Props;
    constructor(attrs?: Partial<InversionFilter.Attrs>);
    connect_signals(): void;
    compute_indices(source: ColumnarDataSource): Indices;
}
//# sourceMappingURL=inversion_filter.d.ts.map