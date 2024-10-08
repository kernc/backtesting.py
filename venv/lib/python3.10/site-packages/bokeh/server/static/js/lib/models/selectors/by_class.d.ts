import { Selector } from "./selector";
import type * as p from "../../core/properties";
export declare namespace ByClass {
    type Attrs = p.AttrsOf<Props>;
    type Props = Selector.Props;
}
export interface ByClass extends ByClass.Attrs {
}
export declare class ByClass extends Selector {
    properties: ByClass.Props;
    constructor(attrs?: Partial<ByClass.Attrs>);
    find_one(target: ParentNode): Node | null;
}
//# sourceMappingURL=by_class.d.ts.map