import { Selector } from "./selector";
import type * as p from "../../core/properties";
export declare namespace ByXPath {
    type Attrs = p.AttrsOf<Props>;
    type Props = Selector.Props;
}
export interface ByXPath extends ByXPath.Attrs {
}
export declare class ByXPath extends Selector {
    properties: ByXPath.Props;
    constructor(attrs?: Partial<ByXPath.Attrs>);
    find_one(target: ParentNode): Node | null;
}
//# sourceMappingURL=by_xpath.d.ts.map