import { Model } from "../../../model";
import type * as p from "../../../core/properties";
export declare namespace MenuItem {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface MenuItem extends MenuItem.Attrs {
}
export declare abstract class MenuItem extends Model {
    properties: MenuItem.Props;
    constructor(attrs?: Partial<MenuItem.Attrs>);
}
//# sourceMappingURL=menu_item.d.ts.map