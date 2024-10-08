import type { ViewStorage } from "../../core/build_views";
import type { StyleSheetLike } from "../../core/dom";
import { Location } from "../../core/enums";
import type * as p from "../../core/properties";
import type { FullDisplay } from "./layout_dom";
import { LayoutDOM, LayoutDOMView } from "./layout_dom";
import { TabPanel } from "./tab_panel";
import type { UIElement } from "../ui/ui_element";
import type { Tooltip } from "../ui/tooltip";
export declare class TabsView extends LayoutDOMView {
    model: Tabs;
    protected tooltip_views: ViewStorage<Tooltip>;
    protected header_el: HTMLElement;
    protected header_els: HTMLElement[];
    connect_signals(): void;
    lazy_initialize(): Promise<void>;
    stylesheets(): StyleSheetLike[];
    get child_models(): UIElement[];
    protected _intrinsic_display(): FullDisplay;
    _update_layout(): void;
    _after_layout(): void;
    render(): void;
    protected _update_headers(): void;
    change_active(i: number): void;
    update_active(): void;
}
export declare namespace Tabs {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        tabs: p.Property<TabPanel[]>;
        tabs_location: p.Property<Location>;
        active: p.Property<number>;
    };
}
export interface Tabs extends Tabs.Attrs {
}
export declare class Tabs extends LayoutDOM {
    properties: Tabs.Props;
    __view_type__: TabsView;
    constructor(attrs?: Partial<Tabs.Attrs>);
}
//# sourceMappingURL=tabs.d.ts.map