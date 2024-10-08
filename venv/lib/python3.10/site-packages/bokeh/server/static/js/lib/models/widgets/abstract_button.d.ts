import type * as p from "../../core/properties";
import { ButtonType } from "../../core/enums";
import type { StyleSheetLike } from "../../core/dom";
import type { ViewOf, IterViews } from "../../core/build_views";
import { Control, ControlView } from "./control";
import { DOMNode } from "../dom/dom_node";
import { Icon } from "../ui/icons/icon";
export declare abstract class AbstractButtonView extends ControlView {
    model: AbstractButton;
    protected label_view?: ViewOf<DOMNode>;
    protected icon_view?: ViewOf<Icon>;
    button_el: HTMLButtonElement;
    protected group_el: HTMLElement;
    controls(): Generator<HTMLButtonElement, void, unknown>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    _rebuild_label(): Promise<void>;
    _rebuild_icon(): Promise<void>;
    connect_signals(): void;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    _render_button(...children: (string | ChildNode | null | undefined)[]): HTMLButtonElement;
    render(): void;
    click(): void;
}
export declare namespace AbstractButton {
    type Attrs = p.AttrsOf<Props>;
    type Props = Control.Props & {
        label: p.Property<DOMNode | string>;
        icon: p.Property<Icon | null>;
        button_type: p.Property<ButtonType>;
    };
}
export interface AbstractButton extends AbstractButton.Attrs {
}
export declare abstract class AbstractButton extends Control {
    properties: AbstractButton.Props;
    __view_type__: AbstractButtonView;
    constructor(attrs?: Partial<AbstractButton.Attrs>);
}
//# sourceMappingURL=abstract_button.d.ts.map