import { DataRenderer, DataRendererView } from "./data_renderer";
import type { GlyphRendererView } from "./glyph_renderer";
import { GlyphRenderer } from "./glyph_renderer";
import type { GlyphView } from "../glyphs/glyph";
import type * as p from "../../core/properties";
import type { IterViews } from "../../core/build_views";
import type { SelectionManager } from "../../core/selection_manager";
import type { Geometry } from "../../core/geometry";
import type { HitTestResult } from "../../core/hittest";
export declare class ContourRendererView extends DataRendererView {
    model: ContourRenderer;
    fill_view: GlyphRendererView;
    line_view: GlyphRendererView;
    children(): IterViews;
    get glyph_view(): GlyphView;
    lazy_initialize(): Promise<void>;
    remove(): void;
    protected _paint(): void;
    hit_test(geometry: Geometry): HitTestResult;
}
export declare namespace ContourRenderer {
    type Attrs = p.AttrsOf<Props>;
    type Props = DataRenderer.Props & {
        fill_renderer: p.Property<GlyphRenderer>;
        line_renderer: p.Property<GlyphRenderer>;
        levels: p.Property<number[]>;
    };
}
export interface ContourRenderer extends ContourRenderer.Attrs {
}
export declare class ContourRenderer extends DataRenderer {
    properties: ContourRenderer.Props;
    __view_type__: ContourRendererView;
    constructor(attrs?: Partial<ContourRenderer.Attrs>);
    get_selection_manager(): SelectionManager;
}
//# sourceMappingURL=contour_renderer.d.ts.map