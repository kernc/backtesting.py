import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare namespace Selector {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        query: p.Property<string>;
    };
}
export interface Selector extends Selector.Attrs {
}
export declare abstract class Selector extends Model {
    properties: Selector.Props;
    constructor(attrs?: Partial<Selector.Attrs>);
    abstract find_one(target: ParentNode): Node | null;
}
//# sourceMappingURL=selector.d.ts.map