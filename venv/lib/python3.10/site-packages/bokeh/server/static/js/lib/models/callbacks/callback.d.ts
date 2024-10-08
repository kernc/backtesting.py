import { Model } from "../../model";
import type * as p from "../../core/properties";
import type { Executable } from "../../core/util/callbacks";
export declare namespace Callback {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Callback extends Callback.Attrs {
}
export declare abstract class Callback extends Model implements Executable<unknown, any, unknown> {
    properties: Callback.Props;
    constructor(attrs?: Partial<Callback.Attrs>);
    abstract execute(cb_obj: unknown, cb_data?: {
        [key: string]: unknown;
    }): unknown | Promise<unknown>;
}
//# sourceMappingURL=callback.d.ts.map