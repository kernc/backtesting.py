import type { FullDisplay } from "./layout_dom";
import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import type { UIElement } from "../ui/ui_element";
import type { TracksSizing } from "../common/kinds";
import { GridSpacing } from "../common/kinds";
import type * as p from "../../core/properties";
export declare abstract class CSSGridBoxView extends LayoutDOMView {
    model: CSSGridBox;
    connect_signals(): void;
    get child_models(): UIElement[];
    protected _intrinsic_display(): FullDisplay;
    protected abstract get _children(): [UIElement, number, number, number?, number?][];
    protected abstract get _rows(): TracksSizing | null;
    protected abstract get _cols(): TracksSizing | null;
    _update_layout(): void;
}
export declare namespace CSSGridBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        spacing: p.Property<GridSpacing>;
    };
}
export interface CSSGridBox extends CSSGridBox.Attrs {
}
export declare abstract class CSSGridBox extends LayoutDOM {
    properties: CSSGridBox.Props;
    __view_type__: CSSGridBoxView;
    constructor(attrs?: Partial<CSSGridBox.Attrs>);
}
//# sourceMappingURL=css_grid_box.d.ts.map