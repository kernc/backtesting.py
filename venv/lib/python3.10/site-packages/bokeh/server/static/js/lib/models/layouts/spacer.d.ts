import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import type * as p from "../../core/properties";
export declare class SpacerView extends LayoutDOMView {
    model: Spacer;
    get child_models(): LayoutDOM[];
    protected readonly _auto_width = "auto";
    protected readonly _auto_height = "auto";
}
export declare namespace Spacer {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props;
}
export interface Spacer extends Spacer.Attrs {
}
export declare class Spacer extends LayoutDOM {
    properties: Spacer.Props;
    __view_type__: SpacerView;
    constructor(attrs?: Partial<Spacer.Attrs>);
}
//# sourceMappingURL=spacer.d.ts.map