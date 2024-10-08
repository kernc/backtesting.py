import { SelectTool, SelectToolView } from "./select_tool";
import type { BoxAnnotation } from "../../annotations/box_annotation";
import type { PolyAnnotation } from "../../annotations/poly_annotation";
import { RegionSelectionMode } from "../../../core/enums";
import type { SelectionMode } from "../../../core/enums";
import type { Geometry } from "../../../core/geometry";
import type { KeyModifiers } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
export declare abstract class RegionSelectToolView extends SelectToolView {
    model: RegionSelectTool;
    get overlays(): import("../..").Renderer[];
    protected _is_continuous(modifiers: KeyModifiers): boolean;
    _select(geometry: Geometry, final: boolean, mode: SelectionMode): void;
    protected _clear_overlay(): void;
}
export declare namespace RegionSelectTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = SelectTool.Props & {
        mode: p.Property<RegionSelectionMode>;
        continuous: p.Property<boolean>;
        persistent: p.Property<boolean>;
        greedy: p.Property<boolean>;
    };
}
export interface RegionSelectTool extends RegionSelectTool.Attrs {
}
export declare abstract class RegionSelectTool extends SelectTool {
    properties: RegionSelectTool.Props;
    __view_type__: RegionSelectToolView;
    overlay: BoxAnnotation | PolyAnnotation;
    mode: RegionSelectionMode;
    constructor(attrs?: Partial<RegionSelectTool.Attrs>);
}
//# sourceMappingURL=region_select_tool.d.ts.map