import { BaseColorBar, BaseColorBarView } from "./base_color_bar";
import type { Range } from "../ranges";
import type { GlyphRendererView } from "../renderers/glyph_renderer";
import { GlyphRenderer } from "../renderers/glyph_renderer";
import type { IterViews } from "../../core/build_views";
import type * as p from "../../core/properties";
import type { BBox } from "../../core/util/bbox";
import type { Context2d } from "../../core/util/canvas";
export declare class ContourColorBarView extends BaseColorBarView {
    model: ContourColorBar;
    protected _fill_view: GlyphRendererView;
    protected _line_view: GlyphRendererView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    _create_major_range(): Range;
    protected _paint_colors(ctx: Context2d, bbox: BBox): void;
}
export declare namespace ContourColorBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseColorBar.Props & {
        fill_renderer: p.Property<GlyphRenderer>;
        line_renderer: p.Property<GlyphRenderer>;
        levels: p.Property<number[]>;
    };
}
export interface ContourColorBar extends ContourColorBar.Attrs {
}
export declare class ContourColorBar extends BaseColorBar {
    properties: ContourColorBar.Props;
    __view_type__: ContourColorBarView;
    constructor(attrs?: Partial<ContourColorBar.Attrs>);
}
//# sourceMappingURL=contour_color_bar.d.ts.map