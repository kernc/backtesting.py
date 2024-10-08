import { ContinuousScale } from "./continuous_scale";
import type * as p from "../../core/properties";
export declare namespace LogScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousScale.Props;
}
export interface LogScale extends LogScale.Attrs {
}
export declare class LogScale extends ContinuousScale {
    properties: LogScale.Props;
    constructor(attrs?: Partial<LogScale.Attrs>);
    get s_compute(): (x: number) => number;
    get s_invert(): (x: number) => number;
    protected _get_safe_factor(orig_start: number, orig_end: number): [number, number];
    _compute_state(): [number, number, number, number];
}
//# sourceMappingURL=log_scale.d.ts.map