import { Model } from "../../model";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace Transform {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Transform<From = number, To = number> extends Transform.Attrs {
}
export declare abstract class Transform<From = number, To = number> extends Model {
    properties: Transform.Props;
    constructor(attrs?: Partial<Transform.Attrs>);
    abstract compute(x: From): To;
    abstract v_compute(xs: Arrayable<From>): Arrayable<To>;
}
//# sourceMappingURL=transform.d.ts.map