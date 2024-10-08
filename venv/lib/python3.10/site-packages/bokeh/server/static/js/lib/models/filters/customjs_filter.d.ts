import { Filter } from "./filter";
import type * as p from "../../core/properties";
import type { Dict } from "../../core/types";
import { Indices } from "../../core/types";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
export declare namespace CustomJSFilter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Filter.Props & {
        args: p.Property<Dict<unknown>>;
        code: p.Property<string>;
    };
}
export interface CustomJSFilter extends CustomJSFilter.Attrs {
}
export declare class CustomJSFilter extends Filter {
    properties: CustomJSFilter.Props;
    constructor(attrs?: Partial<CustomJSFilter.Attrs>);
    get names(): string[];
    get values(): unknown[];
    get func(): Function;
    compute_indices(source: ColumnarDataSource): Indices;
}
//# sourceMappingURL=customjs_filter.d.ts.map