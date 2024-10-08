import { RangeTransform } from "./range_transform";
import type { Factor } from "../ranges/factor_range";
import { RandomGenerator } from "../random/random_generator";
import { Distribution } from "../../core/enums";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
import type { AbstractRandom } from "../../core/util/random";
export declare namespace Jitter {
    type Attrs = p.AttrsOf<Props>;
    type Props = RangeTransform.Props & {
        mean: p.Property<number>;
        width: p.Property<number>;
        distribution: p.Property<Distribution>;
        /** internal */
        random_generator: p.Property<RandomGenerator | null>;
    };
}
export interface Jitter extends Jitter.Attrs {
}
export declare class Jitter extends RangeTransform {
    properties: Jitter.Props;
    protected _previous_offsets: Float64Array | null;
    constructor(attrs?: Partial<Jitter.Attrs>);
    protected _generator: AbstractRandom;
    initialize(): void;
    v_compute(xs0: Arrayable<number | Factor>): Arrayable<number>;
    protected _compute(): number;
    protected _v_compute(n: number): Float64Array;
}
//# sourceMappingURL=jitter.d.ts.map