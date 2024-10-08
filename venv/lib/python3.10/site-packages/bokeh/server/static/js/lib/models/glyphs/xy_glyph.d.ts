import type { SpatialIndex } from "../../core/util/spatial";
import * as p from "../../core/properties";
import { Glyph, GlyphView } from "./glyph";
export interface XYGlyphView extends XYGlyph.Data {
}
export declare abstract class XYGlyphView extends GlyphView {
    model: XYGlyph;
    visuals: XYGlyph.Visuals;
    protected _project_data(): void;
    protected _index_data(index: SpatialIndex): void;
    scenterxy(i: number): [number, number];
}
export declare namespace XYGlyph {
    type Attrs = p.AttrsOf<Props>;
    type Props = Glyph.Props & {
        x: p.CoordinateSpec;
        y: p.CoordinateSpec;
    };
    type Visuals = Glyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface XYGlyph extends XYGlyph.Attrs {
}
export declare abstract class XYGlyph extends Glyph {
    properties: XYGlyph.Props;
    __view_type__: XYGlyphView;
    constructor(attrs?: Partial<XYGlyph.Attrs>);
}
//# sourceMappingURL=xy_glyph.d.ts.map