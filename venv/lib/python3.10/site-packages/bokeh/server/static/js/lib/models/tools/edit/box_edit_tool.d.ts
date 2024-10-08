import type { PanEvent, TapEvent, KeyEvent, UIEvent, MoveEvent } from "../../../core/ui_events";
import { Dimensions } from "../../../core/enums";
import type * as p from "../../../core/properties";
import { Rect } from "../../glyphs/rect";
import type { LRTB } from "../../glyphs/lrtb";
import { HStrip } from "../../glyphs/hstrip";
import { VStrip } from "../../glyphs/vstrip";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import type { ColumnarDataSource } from "../../sources/columnar_data_source";
import { EditTool, EditToolView } from "./edit_tool";
export type BoxLikeGlyph = LRTB | Rect | HStrip | VStrip;
export type BoxLikeGlyphRenderer = GlyphRenderer & {
    glyph: BoxLikeGlyph;
    data_source: ColumnarDataSource;
};
export declare class BoxEditToolView extends EditToolView {
    model: BoxEditTool;
    _draw_basepoint: [number, number] | null;
    protected _recent_renderers: GlyphRenderer[];
    _tap(ev: TapEvent): void;
    _keyup(ev: KeyEvent): void;
    _set_extent([sx0, sx1]: [number, number], [sy0, sy1]: [number, number], append: boolean, emit?: boolean): void;
    _update_box(ev: UIEvent, append?: boolean, emit?: boolean): void;
    _press(ev: TapEvent): void;
    _move(ev: MoveEvent): void;
    _pan_start(ev: PanEvent): void;
    _pan(ev: PanEvent, append?: boolean, emit?: boolean): void;
    _drag_points(ev: UIEvent, renderers: GlyphRenderer[], dim?: Dimensions): void;
    _pan_end(ev: PanEvent): void;
}
export declare namespace BoxEditTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = EditTool.Props & {
        dimensions: p.Property<Dimensions>;
        num_objects: p.Property<number>;
        renderers: p.Property<BoxLikeGlyphRenderer[]>;
    };
}
export interface BoxEditTool extends BoxEditTool.Attrs {
}
export declare class BoxEditTool extends EditTool {
    properties: BoxEditTool.Props;
    __view_type__: BoxEditToolView;
    constructor(attrs?: Partial<BoxEditTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    event_type: ("tap" | "pan" | "press" | "move")[];
    default_order: number;
}
//# sourceMappingURL=box_edit_tool.d.ts.map