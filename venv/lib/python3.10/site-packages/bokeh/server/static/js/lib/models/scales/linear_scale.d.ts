import { ContinuousScale } from "./continuous_scale";
import type * as p from "../../core/properties";
export declare namespace LinearScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousScale.Props;
}
export interface LinearScale extends LinearScale.Attrs {
}
export declare class LinearScale extends ContinuousScale {
    properties: LinearScale.Props;
    constructor(attrs?: Partial<LinearScale.Attrs>);
    get s_compute(): (x: number) => number;
    get s_invert(): (sx: number) => number;
    _linear_compute_state(): [number, number];
}
//# sourceMappingURL=linear_scale.d.ts.map