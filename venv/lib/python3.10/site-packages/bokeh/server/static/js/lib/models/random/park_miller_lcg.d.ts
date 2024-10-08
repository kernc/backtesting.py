import { RandomGenerator } from "./random_generator";
import type { AbstractRandom } from "../../core/util/random";
import type * as p from "../../core/properties";
export declare namespace ParkMillerLCG {
    type Attrs = p.AttrsOf<Props>;
    type Props = RandomGenerator.Props & {
        seed: p.Property<number | null>;
    };
}
export interface ParkMillerLCG extends ParkMillerLCG.Attrs {
}
export declare class ParkMillerLCG extends RandomGenerator {
    properties: ParkMillerLCG.Props;
    constructor(attrs?: Partial<ParkMillerLCG.Attrs>);
    generator(): AbstractRandom;
}
//# sourceMappingURL=park_miller_lcg.d.ts.map