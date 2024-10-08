import { ActionItem } from "./action_item";
import type * as p from "../../../core/properties";
export declare namespace CheckableItem {
    type Attrs = p.AttrsOf<Props>;
    type Props = ActionItem.Props & {
        checked: p.Property<boolean>;
    };
}
export interface CheckableItem extends CheckableItem.Attrs {
}
export declare class CheckableItem extends ActionItem {
    properties: CheckableItem.Props;
    constructor(attrs?: Partial<CheckableItem.Attrs>);
}
//# sourceMappingURL=checkable_item.d.ts.map