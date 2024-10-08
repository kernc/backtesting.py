import { DataRenderer, DataRendererView } from "./data_renderer";
import type { GlyphView } from "../glyphs/glyph";
import { Glyph } from "../glyphs/glyph";
import { ColumnarDataSource } from "../sources/columnar_data_source";
import type { CDSViewView } from "../sources/cds_view";
import { CDSView } from "../sources/cds_view";
import { Indices } from "../../core/types";
import type * as p from "../../core/properties";
import type { HitTestResult } from "../../core/hittest";
import type { Geometry } from "../../core/geometry";
import type { SelectionManager } from "../../core/selection_manager";
import type { IterViews } from "../../core/build_views";
import type { Context2d } from "../../core/util/canvas";
import type { BBox } from "../../core/util/bbox";
import { Decoration } from "../graphics/decoration";
import type { Marking } from "../graphics/marking";
export declare class GlyphRendererView extends DataRendererView {
    model: GlyphRenderer;
    cds_view: CDSViewView;
    glyph: GlyphView;
    selection_glyph: GlyphView;
    nonselection_glyph: GlyphView;
    hover_glyph?: GlyphView;
    muted_glyph: GlyphView;
    decimated_glyph: GlyphView;
    get glyph_view(): GlyphView;
    children(): IterViews;
    protected all_indices: Indices;
    protected decimated: Indices;
    protected last_dtrender: number;
    get data_source(): p.Property<ColumnarDataSource>;
    lazy_initialize(): Promise<void>;
    build_glyph_view<T extends Glyph>(glyph: T): Promise<GlyphView>;
    remove(): void;
    private _previous_inspected?;
    connect_signals(): void;
    _update_masked_indices(): Indices;
    update_data(indices?: number[]): Promise<void>;
    set_data(indices?: number[]): Promise<void>;
    set_visuals(): Promise<void>;
    map_data(): void;
    get bbox(): BBox;
    get has_webgl(): boolean;
    protected _paint(): void;
    get_reference_point(field: string | null, value?: unknown): number;
    draw_legend(ctx: Context2d, x0: number, x1: number, y0: number, y1: number, field: string | null, label: unknown, index: number | null): void;
    hit_test(geometry: Geometry): HitTestResult;
}
export declare namespace GlyphRenderer {
    type Attrs<BaseGlyph, HoverGlyph = BaseGlyph, NonSelectionGlyph = BaseGlyph, SelectionGlyph = BaseGlyph, MutedGlyph = BaseGlyph> = p.AttrsOf<Props<BaseGlyph, HoverGlyph, NonSelectionGlyph, SelectionGlyph, MutedGlyph>>;
    type Props<BaseGlyph, HoverGlyph = BaseGlyph, NonSelectionGlyph = BaseGlyph, SelectionGlyph = BaseGlyph, MutedGlyph = BaseGlyph> = DataRenderer.Props & {
        data_source: p.Property<ColumnarDataSource>;
        view: p.Property<CDSView>;
        glyph: p.Property<BaseGlyph>;
        hover_glyph: p.Property<HoverGlyph | null>;
        nonselection_glyph: p.Property<NonSelectionGlyph | "auto" | null>;
        selection_glyph: p.Property<SelectionGlyph | "auto" | null>;
        muted_glyph: p.Property<MutedGlyph | "auto" | null>;
        muted: p.Property<boolean>;
    };
}
export interface GlyphRenderer<BaseGlyph extends Glyph = Glyph, HoverGlyph extends Glyph = BaseGlyph, NonSelectionGlyph extends Glyph = BaseGlyph, SelectionGlyph extends Glyph = BaseGlyph, MutedGlyph extends Glyph = BaseGlyph> extends GlyphRenderer.Attrs<BaseGlyph, HoverGlyph, NonSelectionGlyph, SelectionGlyph, MutedGlyph> {
}
export declare class GlyphRenderer<BaseGlyph extends Glyph = Glyph, HoverGlyph extends Glyph = BaseGlyph, NonSelectionGlyph extends Glyph = BaseGlyph, SelectionGlyph extends Glyph = BaseGlyph, MutedGlyph extends Glyph = BaseGlyph> extends DataRenderer {
    properties: GlyphRenderer.Props<BaseGlyph, HoverGlyph, NonSelectionGlyph, SelectionGlyph, MutedGlyph>;
    __view_type__: GlyphRendererView;
    constructor(attrs?: Partial<GlyphRenderer.Attrs<BaseGlyph, HoverGlyph, NonSelectionGlyph, SelectionGlyph, MutedGlyph>>);
    get_selection_manager(): SelectionManager;
    add_decoration(marking: Marking, node: "start" | "middle" | "end"): Decoration;
}
//# sourceMappingURL=glyph_renderer.d.ts.map