import { CSSGridBox, CSSGridBoxView } from "./css_grid_box";
import { TracksSizing } from "../common/kinds";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
type VBoxChild = {
    child: UIElement;
    row?: number;
    span?: number;
};
declare const VBoxChild: import("../../core/kinds").Kinds.Struct<VBoxChild>;
export declare class VBoxView extends CSSGridBoxView {
    model: VBox;
    connect_signals(): void;
    protected get _children(): [UIElement, number, number, number?, number?][];
    protected get _rows(): TracksSizing | null;
    protected get _cols(): TracksSizing | null;
}
export declare namespace VBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = CSSGridBox.Props & {
        children: p.Property<VBoxChild[]>;
        rows: p.Property<TracksSizing | null>;
    };
}
export interface VBox extends VBox.Attrs {
}
export declare class VBox extends CSSGridBox {
    properties: VBox.Props;
    __view_type__: VBoxView;
    constructor(attrs?: Partial<VBox.Attrs>);
}
export {};
//# sourceMappingURL=vbox.d.ts.map