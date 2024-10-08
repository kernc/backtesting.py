import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import { UIElement } from "../ui/ui_element";
import { ScrollbarPolicy } from "../../core/enums";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class ScrollBoxView extends LayoutDOMView {
    model: ScrollBox;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    get child_models(): UIElement[];
    _update_layout(): void;
}
export declare namespace ScrollBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        child: p.Property<UIElement>;
        horizontal_scrollbar: p.Property<ScrollbarPolicy>;
        vertical_scrollbar: p.Property<ScrollbarPolicy>;
    };
}
export interface ScrollBox extends ScrollBox.Attrs {
}
export declare class ScrollBox extends LayoutDOM {
    properties: ScrollBox.Props;
    __view_type__: ScrollBoxView;
    constructor(attrs?: Partial<ScrollBox.Attrs>);
}
//# sourceMappingURL=scroll_box.d.ts.map