import { AbstractButton, AbstractButtonView } from "./abstract_button";
import { ButtonClick } from "../../core/bokeh_events";
import type { EventCallback } from "../../model";
import type * as p from "../../core/properties";
export declare class ButtonView extends AbstractButtonView {
    model: Button;
    click(): void;
}
export declare namespace Button {
    type Attrs = p.AttrsOf<Props>;
    type Props = AbstractButton.Props;
}
export interface Button extends Button.Attrs {
}
export declare class Button extends AbstractButton {
    properties: Button.Props;
    __view_type__: ButtonView;
    constructor(attrs?: Partial<Button.Attrs>);
    on_click(callback: EventCallback<ButtonClick>): void;
}
//# sourceMappingURL=button.d.ts.map