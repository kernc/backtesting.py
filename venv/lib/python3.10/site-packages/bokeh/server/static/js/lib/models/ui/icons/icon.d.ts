import { UIElement, UIElementView } from "../ui_element";
import type * as p from "../../../core/properties";
export declare abstract class IconView extends UIElementView {
    model: Icon;
    connect_signals(): void;
}
export declare namespace Icon {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        size: p.Property<number | string>;
    };
}
export interface Icon extends Icon.Attrs {
}
export declare abstract class Icon extends UIElement {
    properties: Icon.Props;
    __view_type__: IconView;
    constructor(attrs?: Partial<Icon.Attrs>);
}
//# sourceMappingURL=icon.d.ts.map