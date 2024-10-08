import type { PanEvent, TapEvent } from "../../../core/ui_events";
import { Dimensions } from "../../../core/enums";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import { LineTool, LineToolView } from "./line_tool";
import type * as p from "../../../core/properties";
import type { Line } from "../../glyphs/line";
export interface HasLineGlyph {
    glyph: Line;
}
export declare class LineEditToolView extends LineToolView {
    model: LineEditTool;
    _selected_renderer: GlyphRenderer<Line> | null;
    _drawing: boolean;
    _press(ev: TapEvent): void;
    _show_intersections(): void;
    _tap(ev: TapEvent): void;
    _update_line_cds(): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent): void;
    _pan_end(ev: PanEvent): void;
    activate(): void;
    deactivate(): void;
}
export declare namespace LineEditTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = LineTool.Props & {
        dimensions: p.Property<Dimensions>;
        renderers: p.Property<GlyphRenderer<Line>[]>;
    };
}
export interface LineEditTool extends LineEditTool.Attrs {
}
export declare class LineEditTool extends LineTool {
    properties: LineEditTool.Props;
    __view_type__: LineEditToolView;
    constructor(attrs?: Partial<LineEditTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan" | "press" | "move")[];
    default_order: number;
    get tooltip(): string;
}
//# sourceMappingURL=line_edit_tool.d.ts.map