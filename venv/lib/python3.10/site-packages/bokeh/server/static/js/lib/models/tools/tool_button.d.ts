import { UIElement, UIElementView } from "../ui/ui_element";
import { Tool } from "./tool";
import { ToolProxy } from "./tool_proxy";
import { UIGestures } from "../../core/ui_gestures";
import type { StyleSheetLike } from "../../core/dom";
import { ToolIcon } from "../../core/enums";
import { ContextMenu } from "../../core/util/menus";
import type * as p from "../../core/properties";
import type { ToolbarView } from "./toolbar";
export declare abstract class ToolButtonView extends UIElementView {
    model: ToolButton;
    readonly parent: ToolbarView;
    protected _menu: ContextMenu;
    protected _ui_gestures: UIGestures;
    initialize(): void;
    connect_signals(): void;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
    protected abstract _clicked(): void;
    protected _pressed(): void;
}
export declare namespace ToolButton {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        tool: p.Property<Tool | ToolProxy<Tool>>;
        icon: p.Property<ToolIcon | string | null>;
        tooltip: p.Property<string | null>;
    };
}
export interface ToolButton extends ToolButton.Attrs {
}
export declare abstract class ToolButton extends UIElement {
    properties: ToolButton.Props;
    __view_type__: ToolButtonView;
    constructor(attrs?: Partial<ToolButton.Attrs>);
}
//# sourceMappingURL=tool_button.d.ts.map