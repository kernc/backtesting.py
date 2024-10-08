import type { PanEvent, TapEvent, KeyEvent } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import type { XYGlyph } from "../../glyphs/xy_glyph";
import { EditTool, EditToolView } from "./edit_tool";
export declare class PointDrawToolView extends EditToolView {
    model: PointDrawTool;
    _tap(ev: TapEvent): void;
    _keyup(ev: KeyEvent): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
}
export declare namespace PointDrawTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = EditTool.Props & {
        add: p.Property<boolean>;
        drag: p.Property<boolean>;
        num_objects: p.Property<number>;
        renderers: p.Property<GlyphRenderer<XYGlyph>[]>;
    };
}
export interface PointDrawTool extends PointDrawTool.Attrs {
}
export declare class PointDrawTool extends EditTool {
    properties: PointDrawTool.Props;
    __view_type__: PointDrawToolView;
    constructor(attrs?: Partial<PointDrawTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan" | "move")[];
    default_order: number;
}
//# sourceMappingURL=point_draw_tool.d.ts.map