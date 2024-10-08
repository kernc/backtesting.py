import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { PointGeometry } from "../../core/geometry";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import { Selection } from "../selections/selection";
import type { XY, LRTB, Corners } from "../../core/util/bbox";
import { BBox } from "../../core/util/bbox";
import type { Rect } from "../../core/util/affine";
import type { GraphicsBox } from "../../core/graphics";
import type { TextAnchor } from "../common/kinds";
import { BorderRadius, Padding } from "../common/kinds";
import type { VectorVisuals } from "./defs";
import type { OutlineShapeName } from "../../core/enums";
declare class TextAnchorSpec extends p.DataSpec<TextAnchor> {
}
declare class OutlineShapeSpec extends p.DataSpec<OutlineShapeName> {
}
export interface TextView extends Text.Data {
}
export declare class TextView extends XYGlyphView {
    model: Text;
    visuals: Text.Visuals;
    protected _build_labels(text: p.Uniform<string | null>): Promise<(GraphicsBox | null)[]>;
    _set_lazy_data(): Promise<void>;
    after_visuals(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Text.Data>): void;
    protected _paint_shape(ctx: Context2d, i: number, shape: OutlineShapeName, bbox: BBox, visuals: VectorVisuals, border_radius: Corners<number>): void;
    protected _hit_point(geometry: PointGeometry): Selection;
    rect_i(i: number): Rect;
    scenterxy(i: number): [number, number];
}
export declare namespace Text {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        text: p.NullStringSpec;
        angle: p.AngleSpec;
        x_offset: p.NumberSpec;
        y_offset: p.NumberSpec;
        anchor: TextAnchorSpec;
        padding: p.Property<Padding>;
        border_radius: p.Property<BorderRadius>;
        outline_shape: OutlineShapeSpec;
    } & Mixins;
    type Mixins = mixins.TextVector & mixins.BorderLineVector & mixins.BackgroundFillVector & mixins.BackgroundHatchVector;
    type Visuals = XYGlyph.Visuals & {
        text: visuals.TextVector;
        border_line: visuals.LineVector;
        background_fill: visuals.FillVector;
        background_hatch: visuals.HatchVector;
    };
    type Data = p.GlyphDataOf<Props> & {
        readonly labels: (GraphicsBox | null)[];
        swidth: Float32Array;
        sheight: Float32Array;
        anchor_: p.Uniform<XY<number>>;
        padding: LRTB<number>;
        border_radius: Corners<number>;
    };
}
export interface Text extends Text.Attrs {
}
export declare class Text extends XYGlyph {
    properties: Text.Props;
    __view_type__: TextView;
    constructor(attrs?: Partial<Text.Attrs>);
}
export {};
//# sourceMappingURL=text.d.ts.map