import { Callback } from "./callback";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
export declare namespace ToggleVisibility {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        target: p.Property<UIElement>;
    };
}
export interface ToggleVisibility extends ToggleVisibility.Attrs {
}
export declare class ToggleVisibility extends Callback {
    properties: ToggleVisibility.Props;
    constructor(attrs?: Partial<ToggleVisibility.Attrs>);
    execute(): void;
}
//# sourceMappingURL=toggle_visibility.d.ts.map