import { Tooltip } from "../ui/tooltip";
import { Model } from "../../model";
import { UIElement } from "../ui/ui_element";
import type * as p from "../../core/properties";
export declare namespace TabPanel {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        title: p.Property<string>;
        tooltip: p.Property<Tooltip | null>;
        child: p.Property<UIElement>;
        closable: p.Property<boolean>;
        disabled: p.Property<boolean>;
    };
}
export interface TabPanel extends TabPanel.Attrs {
}
export declare class TabPanel extends Model {
    properties: TabPanel.Props;
    constructor(attrs?: Partial<TabPanel.Attrs>);
}
//# sourceMappingURL=tab_panel.d.ts.map