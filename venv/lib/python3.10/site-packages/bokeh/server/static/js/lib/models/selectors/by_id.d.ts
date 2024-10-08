import { Selector } from "./selector";
import type * as p from "../../core/properties";
export declare namespace ByID {
    type Attrs = p.AttrsOf<Props>;
    type Props = Selector.Props;
}
export interface ByID extends ByID.Attrs {
}
export declare class ByID extends Selector {
    properties: ByID.Props;
    constructor(attrs?: Partial<ByID.Attrs>);
    find_one(target: ParentNode): Node | null;
}
//# sourceMappingURL=by_id.d.ts.map