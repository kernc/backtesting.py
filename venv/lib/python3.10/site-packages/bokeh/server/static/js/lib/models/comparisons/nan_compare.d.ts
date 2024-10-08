import { Comparison } from "./comparison";
import type * as p from "../../core/properties";
export declare namespace NanCompare {
    type Attrs = p.AttrsOf<Props>;
    type Props = Comparison.Props & {
        ascending_first: p.Property<boolean>;
    };
}
export interface NanCompare extends NanCompare.Attrs {
}
export declare class NanCompare extends Comparison {
    properties: NanCompare.Props;
    constructor(attrs?: Partial<NanCompare.Attrs>);
    compute(x: unknown, y: unknown): 0 | 1 | -1;
}
//# sourceMappingURL=nan_compare.d.ts.map