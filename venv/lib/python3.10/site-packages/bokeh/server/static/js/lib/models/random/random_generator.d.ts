import { Model } from "../../model";
import type { AbstractRandom } from "../../core/util/random";
import type * as p from "../../core/properties";
export declare namespace RandomGenerator {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface RandomGenerator extends RandomGenerator.Attrs {
}
export declare abstract class RandomGenerator extends Model {
    properties: RandomGenerator.Props;
    constructor(attrs?: Partial<RandomGenerator.Attrs>);
    abstract generator(): AbstractRandom;
}
//# sourceMappingURL=random_generator.d.ts.map