import { Control, ControlView } from "./control";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare abstract class ToggleInputGroupView extends ControlView {
    model: ToggleInputGroup;
    protected _inputs: HTMLInputElement[];
    controls(): Generator<HTMLInputElement, void, unknown>;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
}
export declare namespace ToggleInputGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = Control.Props & {
        labels: p.Property<string[]>;
        inline: p.Property<boolean>;
    };
}
export interface ToggleInputGroup extends ToggleInputGroup.Attrs {
}
export declare abstract class ToggleInputGroup extends Control {
    properties: ToggleInputGroup.Props & {
        active: p.Property<unknown>;
    };
    __view_type__: ToggleInputGroupView;
    constructor(attrs?: Partial<ToggleInputGroup.Attrs>);
}
//# sourceMappingURL=toggle_input_group.d.ts.map