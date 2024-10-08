import { Range } from "./range";
import * as p from "../../core/properties";
export declare namespace NumericalRange {
    type Attrs = p.AttrsOf<Props>;
    type Props = Range.Props & {
        start: p.Property<number>;
        end: p.Property<number>;
    };
}
export interface NumericalRange extends NumericalRange.Attrs {
}
export declare abstract class NumericalRange extends Range {
    properties: NumericalRange.Props;
    constructor(attrs?: Partial<NumericalRange.Attrs>);
}
//# sourceMappingURL=numerical_range.d.ts.map