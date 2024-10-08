import { Scale } from "../scales/scale";
import type * as p from "../../core/properties";
import type { Arrayable, ScreenArray, FloatArray } from "../../core/types";
export declare namespace CompositeScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = Scale.Props & {
        source_scale: p.Property<Scale>;
        target_scale: p.Property<Scale>;
    };
}
export interface CompositeScale extends CompositeScale.Attrs {
}
export declare class CompositeScale extends Scale {
    properties: CompositeScale.Props;
    constructor(attrs?: Partial<CompositeScale.Attrs>);
    get s_compute(): (x: number) => number;
    get s_invert(): (sx: number) => number;
    compute(x: number): number;
    v_compute(xs: Arrayable<number>): ScreenArray;
    invert(sx: number): number;
    v_invert(sxs: Arrayable<number>): FloatArray;
}
//# sourceMappingURL=composite_scale.d.ts.map