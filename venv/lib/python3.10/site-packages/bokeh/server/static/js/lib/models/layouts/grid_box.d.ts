import { CSSGridBox, CSSGridBoxView } from "./css_grid_box";
import { TracksSizing } from "../common/kinds";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
export declare class GridBoxView extends CSSGridBoxView {
    model: GridBox;
    connect_signals(): void;
    protected get _children(): [UIElement, number, number, number?, number?][];
    protected get _rows(): TracksSizing | null;
    protected get _cols(): TracksSizing | null;
}
export declare namespace GridBox {
    type Attrs = p.AttrsOf<Props>;
    type Props = CSSGridBox.Props & {
        children: p.Property<[UIElement, number, number, number?, number?][]>;
        rows: p.Property<TracksSizing | null>;
        cols: p.Property<TracksSizing | null>;
    };
}
export interface GridBox extends GridBox.Attrs {
}
export declare class GridBox extends CSSGridBox {
    properties: GridBox.Props;
    __view_type__: GridBoxView;
    constructor(attrs?: Partial<GridBox.Attrs>);
}
//# sourceMappingURL=grid_box.d.ts.map