import { Selector } from "./selector";
import type * as p from "../../core/properties";
export declare namespace ByCSS {
    type Attrs = p.AttrsOf<Props>;
    type Props = Selector.Props;
}
export interface ByCSS extends ByCSS.Attrs {
}
export declare class ByCSS extends Selector {
    properties: ByCSS.Props;
    constructor(attrs?: Partial<ByCSS.Attrs>);
    find_one(target: ParentNode): Node | null;
}
//# sourceMappingURL=by_css.d.ts.map