import { AbstractButton, AbstractButtonView } from "./abstract_button";
import type * as p from "../../core/properties";
export declare class ToggleView extends AbstractButtonView {
    model: Toggle;
    connect_signals(): void;
    render(): void;
    click(): void;
    protected _update_active(): void;
}
export declare namespace Toggle {
    type Attrs = p.AttrsOf<Props>;
    type Props = AbstractButton.Props & {
        active: p.Property<boolean>;
    };
}
export interface Toggle extends Toggle.Attrs {
}
export declare class Toggle extends AbstractButton {
    properties: Toggle.Props;
    __view_type__: ToggleView;
    constructor(attrs?: Partial<Toggle.Attrs>);
}
//# sourceMappingURL=toggle.d.ts.map