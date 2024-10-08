import { Control, ControlView } from "./control";
import { Orientation } from "../../core/enums";
import type * as p from "../../core/properties";
export declare abstract class OrientedControlView extends ControlView {
    model: OrientedControl;
}
export declare namespace OrientedControl {
    type Attrs = p.AttrsOf<Props>;
    type Props = Control.Props & {
        orientation: p.Property<Orientation>;
    };
}
export interface OrientedControl extends OrientedControl.Attrs {
}
export declare abstract class OrientedControl extends Control {
    properties: OrientedControl.Props;
    __view_type__: OrientedControlView;
    constructor(attrs?: Partial<OrientedControl.Attrs>);
}
//# sourceMappingURL=oriented_control.d.ts.map