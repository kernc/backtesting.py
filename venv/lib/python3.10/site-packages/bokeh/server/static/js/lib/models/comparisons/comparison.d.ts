import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare namespace Comparison {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Comparison extends Comparison.Attrs {
}
export declare abstract class Comparison extends Model {
    properties: Comparison.Props;
    constructor(attrs?: Partial<Comparison.Attrs>);
    abstract compute(x: unknown, y: unknown): -1 | 0 | 1;
}
//# sourceMappingURL=comparison.d.ts.map