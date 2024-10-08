import { MenuItem } from "./menu_item";
import type { Menu } from "./menu";
import type { CallbackLike1 } from "../../../core/util/callbacks";
import type * as p from "../../../core/properties";
declare const IconLike: import("../../../core/kinds").Kinds.Or<["delete" | "bold" | "italic" | "square" | "append_mode" | "arrow_down_to_bar" | "arrow_up_from_bar" | "auto_box_zoom" | "box_edit" | "box_select" | "box_zoom" | "caret_down" | "caret_left" | "caret_right" | "caret_up" | "check" | "chevron_down" | "chevron_left" | "chevron_right" | "chevron_up" | "clear_selection" | "copy" | "crosshair" | "freehand_draw" | "fullscreen" | "help" | "hover" | "intersect_mode" | "invert_selection" | "lasso_select" | "line_edit" | "maximize" | "minimize" | "pan" | "pin" | "point_draw" | "pointer" | "poly_draw" | "poly_edit" | "polygon_select" | "range" | "redo" | "replace_mode" | "reset" | "save" | "see_off" | "see_on" | "settings" | "square_check" | "subtract_mode" | "tap_select" | "text_align_center" | "text_align_left" | "text_align_right" | "undo" | "unknown" | "unpin" | "wheel_pan" | "wheel_zoom" | "x_box_select" | "x_box_zoom" | "x_grip" | "x_pan" | "xor_mode" | "y_box_select" | "y_box_zoom" | "y_grip" | "y_pan" | "zoom_in" | "zoom_out", string, string, string]>;
type IconLike = typeof IconLike["__type__"];
type ActionCallback = CallbackLike1<Menu, {
    item: ActionItem;
}>;
export declare namespace ActionItem {
    type Attrs = p.AttrsOf<Props>;
    type Props = MenuItem.Props & {
        icon: p.Property<IconLike | null>;
        label: p.Property<string>;
        tooltip: p.Property<string | null>;
        shortcut: p.Property<string | null>;
        menu: p.Property<Menu | null>;
        disabled: p.Property<boolean>;
        action: p.Property<ActionCallback | null>;
    };
}
export interface ActionItem extends ActionItem.Attrs {
}
export declare class ActionItem extends MenuItem {
    properties: ActionItem.Props;
    constructor(attrs?: Partial<ActionItem.Attrs>);
}
export {};
//# sourceMappingURL=action_item.d.ts.map