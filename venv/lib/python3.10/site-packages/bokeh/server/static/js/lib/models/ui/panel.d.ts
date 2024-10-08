import { Pane, PaneView } from "../ui/pane";
import { Coordinate } from "../coordinates/coordinate";
import { Node } from "../coordinates/node";
import { Anchor } from "../common/kinds";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class PanelView extends PaneView {
    model: Panel;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    reposition(displayed?: boolean): void;
}
export declare namespace Panel {
    type Attrs = p.AttrsOf<Props>;
    type Props = Pane.Props & {
        position: p.Property<Coordinate>;
        anchor: p.Property<Anchor>;
        width: p.Property<"auto" | number | Node>;
        height: p.Property<"auto" | number | Node>;
    };
}
export interface Panel extends Panel.Attrs {
}
export declare class Panel extends Pane {
    properties: Panel.Props;
    __view_type__: PanelView;
    constructor(attrs?: Partial<Panel.Attrs>);
}
//# sourceMappingURL=panel.d.ts.map