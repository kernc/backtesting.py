import { DOMView } from "../../core/dom_view";
import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare abstract class DOMNodeView extends DOMView {
    model: DOMNode;
}
export declare namespace DOMNode {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface DOMNode extends DOMNode.Attrs {
}
export declare abstract class DOMNode extends Model {
    properties: DOMNode.Props;
    __view_type__: DOMNodeView;
    static __module__: string;
    constructor(attrs?: Partial<DOMNode.Attrs>);
}
//# sourceMappingURL=dom_node.d.ts.map