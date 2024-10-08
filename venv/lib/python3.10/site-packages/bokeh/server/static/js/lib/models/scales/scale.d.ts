import { Transform } from "../transforms/transform";
import { Range } from "../ranges/range";
import { Range1d } from "../ranges/range1d";
import type { Arrayable, FloatArray } from "../../core/types";
import { ScreenArray } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace Scale {
    type Attrs = p.AttrsOf<Props>;
    type Props = Transform.Props & {
        source_range: p.Property<Range>;
        target_range: p.Property<Range1d>;
    };
}
export interface Scale<T = number> extends Scale.Attrs {
}
export declare abstract class Scale<T = number> extends Transform<T, number> {
    properties: Scale.Props;
    constructor(attrs?: Partial<Scale.Attrs>);
    abstract get s_compute(): (x: T) => number;
    abstract get s_invert(): (sx: number) => number;
    compute(x: T): number;
    v_compute(xs: Arrayable<T>): ScreenArray;
    invert(sx: number): number;
    v_invert(sxs: Arrayable<number>): FloatArray;
    r_compute(x0: T, x1: T): [number, number];
    r_invert(sx0: number, sx1: number): [number, number];
}
//# sourceMappingURL=scale.d.ts.map