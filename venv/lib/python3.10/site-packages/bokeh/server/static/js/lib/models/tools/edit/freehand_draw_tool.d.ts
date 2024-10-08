import type { UIEvent, PanEvent, TapEvent, KeyEvent } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
import { EditTool, EditToolView } from "./edit_tool";
import type { XsYsGlyph } from "./common";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
export declare class FreehandDrawToolView extends EditToolView {
    model: FreehandDrawTool;
    _draw(ev: UIEvent, mode: string, emit?: boolean): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    _tap(ev: TapEvent): void;
    _keyup(ev: KeyEvent): void;
}
export declare namespace FreehandDrawTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = EditTool.Props & {
        num_objects: p.Property<number>;
        renderers: p.Property<GlyphRenderer<XsYsGlyph>[]>;
    };
}
export interface FreehandDrawTool extends FreehandDrawTool.Attrs {
}
export declare class FreehandDrawTool extends EditTool {
    properties: FreehandDrawTool.Props;
    __view_type__: FreehandDrawToolView;
    constructor(attrs?: Partial<FreehandDrawTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan")[];
    default_order: number;
}
//# sourceMappingURL=freehand_draw_tool.d.ts.map