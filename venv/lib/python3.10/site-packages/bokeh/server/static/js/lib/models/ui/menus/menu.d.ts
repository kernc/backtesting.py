import { UIElement, UIElementView } from "../ui_element";
import { MenuItem } from "./menu_item";
import { ActionItem } from "./action_item";
import type * as p from "../../../core/properties";
import type { XY } from "../../../core/util/bbox";
import type { StyleSheetLike } from "../../../core/dom";
import type { ViewStorage, IterViews } from "../../../core/build_views";
export declare class MenuView extends UIElementView {
    model: Menu;
    protected _menu_views: ViewStorage<Menu>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    prevent_hide?: (event: MouseEvent) => boolean;
    protected _open: boolean;
    get is_open(): boolean;
    protected _item_click: (item: ActionItem) => void;
    protected _on_mousedown: (event: MouseEvent) => void;
    protected _on_keydown: (event: KeyboardEvent) => void;
    protected _on_blur: () => void;
    remove(): void;
    protected _listen(): void;
    protected _unlisten(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
    protected _show_submenu(target: HTMLElement): void;
    show(at: XY): void;
    hide(): void;
}
export declare namespace Menu {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        items: p.Property<MenuItem[]>;
        reversed: p.Property<boolean>;
    };
}
export interface Menu extends Menu.Attrs {
}
export declare class Menu extends UIElement {
    properties: Menu.Props;
    __view_type__: MenuView;
    constructor(attrs?: Partial<Menu.Attrs>);
}
//# sourceMappingURL=menu.d.ts.map