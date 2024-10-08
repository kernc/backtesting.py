import type { FullDisplay } from "../layouts/layout_dom";
import { LayoutDOM, LayoutDOMView } from "../layouts/layout_dom";
import type { GridBoxView } from "../layouts/grid_box";
import { GridBox } from "../layouts/grid_box";
import { TracksSizing } from "../common/kinds";
import type { ToolbarView } from "../tools/toolbar";
import { Toolbar } from "../tools/toolbar";
import type { UIElement } from "../ui/ui_element";
import type { IterViews } from "../../core/build_views";
import { Location } from "../../core/enums";
import type * as p from "../../core/properties";
export declare class GridPlotView extends LayoutDOMView {
    model: GridPlot;
    protected _grid_box: GridBox;
    get toolbar_view(): ToolbarView;
    get grid_box_view(): GridBoxView;
    protected _update_location(): void;
    initialize(): void;
    lazy_initialize(): Promise<void>;
    connect_signals(): void;
    remove(): void;
    private readonly _tool_views;
    build_tool_views(): Promise<void>;
    children(): IterViews;
    get child_models(): UIElement[];
    protected _intrinsic_display(): FullDisplay;
    _update_layout(): void;
}
export declare namespace GridPlot {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutDOM.Props & {
        toolbar: p.Property<Toolbar>;
        toolbar_location: p.Property<Location | null>;
        children: p.Property<[LayoutDOM, number, number, number?, number?][]>;
        rows: p.Property<TracksSizing | null>;
        cols: p.Property<TracksSizing | null>;
        spacing: p.Property<number | [number, number]>;
    };
}
export interface GridPlot extends GridPlot.Attrs {
}
export declare class GridPlot extends LayoutDOM {
    properties: GridPlot.Props;
    __view_type__: GridPlotView;
    constructor(attrs?: Partial<GridPlot.Attrs>);
}
//# sourceMappingURL=grid_plot.d.ts.map