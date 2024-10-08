import type { PanEvent, TapEvent, MoveEvent, KeyEvent, UIEvent } from "../../../core/ui_events";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import { PolyTool, PolyToolView } from "./poly_tool";
import type { XsYsGlyph } from "./common";
import type * as p from "../../../core/properties";
export declare class PolyEditToolView extends PolyToolView {
    model: PolyEditTool;
    _selected_renderer: GlyphRenderer<XsYsGlyph> | null;
    _drawing: boolean;
    _cur_index: number | null;
    _press(ev: TapEvent): void;
    _show_vertices(ev: UIEvent): void;
    _update_vertices(renderer: GlyphRenderer<XsYsGlyph>): void;
    _move(ev: MoveEvent): void;
    _tap(ev: TapEvent): void;
    _remove_vertex(): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    _keyup(ev: KeyEvent): void;
    deactivate(): void;
}
export declare namespace PolyEditTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PolyTool.Props & {
        renderers: p.Property<GlyphRenderer<XsYsGlyph>[]>;
    };
}
export interface PolyEditTool extends PolyEditTool.Attrs {
}
export declare class PolyEditTool extends PolyTool {
    properties: PolyEditTool.Props;
    __view_type__: PolyEditToolView;
    constructor(attrs?: Partial<PolyEditTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan" | "press" | "move")[];
    default_order: number;
}
//# sourceMappingURL=poly_edit_tool.d.ts.map