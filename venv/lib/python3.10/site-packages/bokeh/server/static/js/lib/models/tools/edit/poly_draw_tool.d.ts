import type { UIEvent, PanEvent, TapEvent, MoveEvent, KeyEvent } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import { PolyTool, PolyToolView } from "./poly_tool";
import type { XsYsGlyph } from "./common";
export declare class PolyDrawToolView extends PolyToolView {
    model: PolyDrawTool;
    _drawing: boolean;
    _initialized: boolean;
    _tap(ev: TapEvent): void;
    _draw(ev: UIEvent, mode: string, emit?: boolean): void;
    _show_vertices(): void;
    _press(ev: TapEvent): void;
    _move(ev: MoveEvent): void;
    _remove(): void;
    _keyup(ev: KeyEvent): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    activate(): void;
    deactivate(): void;
}
export declare namespace PolyDrawTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = PolyTool.Props & {
        drag: p.Property<boolean>;
        num_objects: p.Property<number>;
        renderers: p.Property<GlyphRenderer<XsYsGlyph>[]>;
    };
}
export interface PolyDrawTool extends PolyDrawTool.Attrs {
}
export declare class PolyDrawTool extends PolyTool {
    properties: PolyDrawTool.Props;
    __view_type__: PolyDrawToolView;
    constructor(attrs?: Partial<PolyDrawTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan" | "press" | "move")[];
    default_order: number;
}
//# sourceMappingURL=poly_draw_tool.d.ts.map