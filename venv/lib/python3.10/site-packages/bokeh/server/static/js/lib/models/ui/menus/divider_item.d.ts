import { MenuItem } from "./menu_item";
import type * as p from "../../../core/properties";
export declare namespace DividerItem {
    type Attrs = p.AttrsOf<Props>;
    type Props = MenuItem.Props;
}
export interface DividerItem extends DividerItem.Attrs {
}
export declare class DividerItem extends MenuItem {
    properties: DividerItem.Props;
    constructor(attrs?: Partial<DividerItem.Attrs>);
}
//# sourceMappingURL=divider_item.d.ts.map