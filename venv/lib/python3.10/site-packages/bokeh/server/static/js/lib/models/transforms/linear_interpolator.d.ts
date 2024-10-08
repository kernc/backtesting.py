import { Interpolator } from "./interpolator";
import type * as p from "../../core/properties";
export declare namespace LinearInterpolator {
    type Attrs = p.AttrsOf<Props>;
    type Props = Interpolator.Props;
}
export interface LinearInterpolator extends LinearInterpolator.Attrs {
}
export declare class LinearInterpolator extends Interpolator {
    properties: LinearInterpolator.Props;
    constructor(attrs?: Partial<LinearInterpolator.Attrs>);
    compute(x: number): number;
}
//# sourceMappingURL=linear_interpolator.d.ts.map