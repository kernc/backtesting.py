import type { FullDisplay } from "./layout_dom";
import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
type Direction = "row" | "column";
export declare abstract class FlexBoxView extends LayoutDOMView {
    model: FlexBox;
    protected abstract _direction: Direction;
    connect_signals(): void;
    get child_models(): UIElement[];
    protected _intrinsic_display(): FullDisplay;
    _update_layout(): void;
}
export declare namespace FlexBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        children: p.Property<UIElement[]>;
        spacing: p.Property<number>;
    };
}
export interface FlexBox extends FlexBox.Attrs {
}
export declare abstract class FlexBox extends LayoutDOM {
    properties: FlexBox.Props;
    __view_type__: FlexBoxView;
    constructor(attrs?: Partial<FlexBox.Attrs>);
}
export {};
//# sourceMappingURL=flex_box.d.ts.map