import { DataRenderer, DataRendererView } from "./data_renderer";
import type { GlyphRendererView } from "./glyph_renderer";
import { GlyphRenderer } from "./glyph_renderer";
import type { GlyphView } from "../glyphs/glyph";
import { LayoutProvider } from "../graphs/layout_provider";
import { GraphHitTestPolicy } from "../graphs/graph_hit_test_policy";
import type * as p from "../../core/properties";
import type { IterViews } from "../../core/build_views";
import type { Geometry } from "../../core/geometry";
import type { HitTestResult } from "../../core/hittest";
import type { SelectionManager } from "../../core/selection_manager";
import { XYGlyph } from "../glyphs/xy_glyph";
import { MultiLine } from "../glyphs/multi_line";
import { Patches } from "../glyphs/patches";
type XsYsGlyph = MultiLine | Patches;
export declare class GraphRendererView extends DataRendererView {
    model: GraphRenderer;
    edge_view: GlyphRendererView;
    node_view: GlyphRendererView;
    get glyph_view(): GlyphView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    connect_signals(): void;
    protected apply_coordinates(): void;
    remove(): void;
    protected _paint(): void;
    get has_webgl(): boolean;
    hit_test(geometry: Geometry): HitTestResult;
}
export declare namespace GraphRenderer {
    type Attrs = p.AttrsOf<Props>;
    type Props = DataRenderer.Props & {
        layout_provider: p.Property<LayoutProvider>;
        node_renderer: p.Property<GlyphRenderer<XYGlyph>>;
        edge_renderer: p.Property<GlyphRenderer<XsYsGlyph>>;
        selection_policy: p.Property<GraphHitTestPolicy>;
        inspection_policy: p.Property<GraphHitTestPolicy>;
    };
}
export interface GraphRenderer extends GraphRenderer.Attrs {
}
export declare class GraphRenderer extends DataRenderer {
    properties: GraphRenderer.Props;
    __view_type__: GraphRendererView;
    constructor(attrs?: Partial<GraphRenderer.Attrs>);
    get_selection_manager(): SelectionManager;
}
export {};
//# sourceMappingURL=graph_renderer.d.ts.map