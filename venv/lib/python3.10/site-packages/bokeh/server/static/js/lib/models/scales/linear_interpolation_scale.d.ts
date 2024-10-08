import { Scale } from "./scale";
import { LinearScale } from "./linear_scale";
import type { Arrayable, ScreenArray, FloatArray } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace LinearInterpolationScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = Scale.Props & {
        binning: p.Property<Arrayable<number>>;
        linear_scale: p.Property<LinearScale>;
    };
}
export interface LinearInterpolationScale extends LinearInterpolationScale.Attrs {
}
export declare class LinearInterpolationScale extends Scale<number> {
    properties: LinearInterpolationScale.Props;
    constructor(attrs?: Partial<LinearInterpolationScale.Attrs>);
    initialize(): void;
    connect_signals(): void;
    get s_compute(): (x: number) => number;
    get s_invert(): (sx: number) => number;
    compute(x: number): number;
    v_compute(vs: Arrayable<number>): ScreenArray;
    invert(xprime: number): number;
    v_invert(xprimes: Arrayable<number>): FloatArray;
}
//# sourceMappingURL=linear_interpolation_scale.d.ts.map