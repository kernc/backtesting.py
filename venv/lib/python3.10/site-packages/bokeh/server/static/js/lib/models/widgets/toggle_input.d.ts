import { Widget, WidgetView } from "./widget";
import type * as p from "../../core/properties";
export declare abstract class ToggleInputView extends WidgetView {
    model: ToggleInput;
    connect_signals(): void;
    protected abstract _update_active(): void;
    protected abstract _update_disabled(): void;
    protected _toggle_active(): void;
}
export declare namespace ToggleInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = Widget.Props & {
        active: p.Property<boolean>;
    };
}
export interface ToggleInput extends ToggleInput.Attrs {
}
export declare abstract class ToggleInput extends Widget {
    properties: ToggleInput.Props;
    __view_type__: ToggleInputView;
    constructor(attrs?: Partial<ToggleInput.Attrs>);
}
//# sourceMappingURL=toggle_input.d.ts.map