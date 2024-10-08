import { Transform } from "../transforms/transform";
import type { Factor } from "../ranges/factor_range";
import type { Arrayable, ArrayableOf } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace Mapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = Transform.Props;
}
export interface Mapper<T> extends Mapper.Attrs {
}
export declare abstract class Mapper<T> extends Transform<number, T> {
    properties: Mapper.Props;
    constructor(attrs?: Partial<Mapper.Attrs>);
    compute(_x: number): never;
    abstract v_compute(xs: ArrayableOf<number | Factor>): Arrayable<T>;
}
//# sourceMappingURL=mapper.d.ts.map