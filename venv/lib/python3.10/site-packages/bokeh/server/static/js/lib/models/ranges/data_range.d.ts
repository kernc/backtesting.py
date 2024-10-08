import { NumericalRange } from "./numerical_range";
import type { DataRenderer } from "../renderers/data_renderer";
import type * as p from "../../core/properties";
export declare namespace DataRange {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalRange.Props & {
        renderers: p.Property<DataRenderer[] | "auto">;
    };
}
export interface DataRange extends DataRange.Attrs {
}
export declare abstract class DataRange extends NumericalRange {
    properties: DataRange.Props;
    constructor(attrs?: Partial<DataRange.Attrs>);
}
//# sourceMappingURL=data_range.d.ts.map