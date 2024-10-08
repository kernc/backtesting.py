import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import { UIElement } from "../ui/ui_element";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class GroupBoxView extends LayoutDOMView {
    model: GroupBox;
    checkbox_el: HTMLInputElement;
    fieldset_el: HTMLFieldSetElement;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    get child_models(): UIElement[];
    render(): void;
    protected _update_children(): void;
}
export declare namespace GroupBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        title: p.Property<string | null>;
        child: p.Property<UIElement>;
        checkable: p.Property<boolean>;
    };
}
export interface GroupBox extends GroupBox.Attrs {
}
export declare class GroupBox extends LayoutDOM {
    properties: GroupBox.Props;
    __view_type__: GroupBoxView;
    constructor(attrs?: Partial<GroupBox.Attrs>);
}
//# sourceMappingURL=group_box.d.ts.map