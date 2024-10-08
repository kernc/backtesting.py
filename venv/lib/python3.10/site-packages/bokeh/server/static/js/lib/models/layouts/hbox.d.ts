import { CSSGridBox, CSSGridBoxView } from "./css_grid_box";
import { TracksSizing } from "../common/kinds";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
type HBoxChild = {
    child: UIElement;
    col?: number;
    span?: number;
};
declare const HBoxChild: import("../../core/kinds").Kinds.Struct<HBoxChild>;
export declare class HBoxView extends CSSGridBoxView {
    model: HBox;
    connect_signals(): void;
    protected get _children(): [UIElement, number, number, number?, number?][];
    protected get _rows(): TracksSizing | null;
    protected get _cols(): TracksSizing | null;
}
export declare namespace HBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = CSSGridBox.Props & {
        children: p.Property<HBoxChild[]>;
        cols: p.Property<TracksSizing | null>;
    };
}
export interface HBox extends HBox.Attrs {
}
export declare class HBox extends CSSGridBox {
    properties: HBox.Props;
    __view_type__: HBoxView;
    constructor(attrs?: Partial<HBox.Attrs>);
}
export {};
//# sourceMappingURL=hbox.d.ts.map