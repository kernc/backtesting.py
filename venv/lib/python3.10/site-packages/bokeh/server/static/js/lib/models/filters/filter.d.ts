import { Model } from "../../model";
import type { DataSource } from "../sources/data_source";
import type { Indices } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace Filter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Filter extends Filter.Attrs {
}
export declare abstract class Filter extends Model {
    properties: Filter.Props;
    constructor(attrs?: Partial<Filter.Attrs>);
    abstract compute_indices(source: DataSource): Indices;
}
//# sourceMappingURL=filter.d.ts.map