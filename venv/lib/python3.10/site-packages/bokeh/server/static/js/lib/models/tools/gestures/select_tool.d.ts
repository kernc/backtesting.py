import { GestureTool, GestureToolView } from "./gesture_tool";
import { DataRenderer } from "../../renderers/data_renderer";
import type { DataSource } from "../../sources/data_source";
import type * as p from "../../../core/properties";
import type { KeyEvent, KeyModifiers } from "../../../core/ui_events";
import type { SelectionMode } from "../../../core/enums";
import type { Geometry } from "../../../core/geometry";
import { Signal0 } from "../../../core/signaling";
import type { MenuItem } from "../../../core/util/menus";
export declare abstract class SelectToolView extends GestureToolView {
    model: SelectTool;
    connect_signals(): void;
    get computed_renderers(): DataRenderer[];
    _computed_renderers_by_data_source(): Map<DataSource, DataRenderer[]>;
    protected _clear_overlay(): void;
    protected _clear_other_overlays(): void;
    protected _clear_selection(): void;
    protected _invert_selection(): void;
    protected _select_mode(modifiers: KeyModifiers): SelectionMode;
    _keyup(ev: KeyEvent): void;
    protected abstract _select(geometry: Geometry, final: boolean, mode: SelectionMode): void;
    protected _emit_selection_event(geometry: Geometry, final?: boolean): void;
}
export declare namespace SelectTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = GestureTool.Props & {
        renderers: p.Property<DataRenderer[] | "auto">;
    };
}
export interface SelectTool extends SelectTool.Attrs {
}
export declare abstract class SelectTool extends GestureTool {
    properties: SelectTool.Props;
    __view_type__: SelectToolView;
    readonly invert: Signal0<this>;
    readonly clear: Signal0<this>;
    constructor(attrs?: Partial<SelectTool.Attrs>);
    mode: SelectionMode;
    get menu(): MenuItem[] | null;
}
//# sourceMappingURL=select_tool.d.ts.map