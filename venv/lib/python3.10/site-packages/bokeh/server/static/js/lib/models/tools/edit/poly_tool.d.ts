import type * as p from "../../../core/properties";
import type { UIEvent } from "../../../core/ui_events";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import type { XYGlyph } from "../../glyphs/xy_glyph";
import { EditTool, EditToolView } from "./edit_tool";
export declare abstract class PolyToolView extends EditToolView {
    model: PolyTool;
    _set_vertices(xs: number[] | number, ys: number[] | number): void;
    _hide_vertices(): void;
    _snap_to_vertex(ev: UIEvent, x: number, y: number): [number, number];
}
export declare namespace PolyTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = EditTool.Props & {
        vertex_renderer: p.Property<GlyphRenderer<XYGlyph> | null>;
    };
}
export interface PolyTool extends PolyTool.Attrs {
}
export declare abstract class PolyTool extends EditTool {
    properties: PolyTool.Props;
    __view_type__: PolyToolView;
    constructor(attrs?: Partial<PolyTool.Attrs>);
}
//# sourceMappingURL=poly_tool.d.ts.map