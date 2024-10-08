import { Widget, WidgetView } from "./widget";
import type * as p from "../../core/properties";
export declare abstract class ControlView extends WidgetView {
    model: Control;
    abstract controls(): Iterable<HTMLElement & {
        disabled: boolean;
    }>;
    connect_signals(): void;
}
export declare namespace Control {
    type Attrs = p.AttrsOf<Props>;
    type Props = Widget.Props;
}
export interface Control extends Control.Attrs {
}
export declare abstract class Control extends Widget {
    properties: Control.Props;
    __view_type__: ControlView;
    constructor(attrs?: Partial<Control.Attrs>);
}
//# sourceMappingURL=control.d.ts.map