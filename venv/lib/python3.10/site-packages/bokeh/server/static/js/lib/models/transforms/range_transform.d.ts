import { Transform } from "./transform";
import { Range } from "../ranges/range";
import type { Factor } from "../ranges/factor_range";
import type * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
export declare namespace RangeTransform {
    type Attrs = p.AttrsOf<Props>;
    type Props = Transform.Props & {
        range: p.Property<Range | null>;
    };
}
export interface RangeTransform extends RangeTransform.Attrs {
}
export declare abstract class RangeTransform extends Transform {
    properties: RangeTransform.Props;
    constructor(attrs?: Partial<RangeTransform.Attrs>);
    v_compute(xs0: Arrayable<number | Factor>): Arrayable<number>;
    compute(x: number | Factor): number;
    protected abstract _compute(x: number): number;
}
//# sourceMappingURL=range_transform.d.ts.map