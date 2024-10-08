import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { Arrayable, Rect } from "../../core/types";
import { Indices } from "../../core/types";
import { Anchor } from "../../core/enums";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
import type { SpatialIndex } from "../../core/util/spatial";
import { ImageLoader } from "../../core/util/image";
import type { XY } from "../../core/util/bbox";
export type CanvasImage = HTMLImageElement;
export interface ImageURLView extends ImageURL.Data {
}
export declare class ImageURLView extends XYGlyphView {
    model: ImageURL;
    visuals: ImageURL.Visuals;
    protected _images_rendered: boolean;
    protected _bounds_rect: Rect;
    anchor: XY<number>;
    image: (CanvasImage | null)[];
    loaders: (ImageLoader | null)[];
    protected resolved: Indices;
    connect_signals(): void;
    protected _index_data(index: SpatialIndex): void;
    private _set_data_iteration;
    protected _set_data(): void;
    has_finished(): boolean;
    protected _map_data(): void;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<ImageURL.Data>): void;
    protected _render_image(ctx: Context2d, i: number, image: CanvasImage, sx: Arrayable<number>, sy: Arrayable<number>, sw: Arrayable<number>, sh: Arrayable<number>, angle: p.Uniform<number>, alpha: p.Uniform<number>): void;
    bounds(): Rect;
}
export declare namespace ImageURL {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        url: p.StringSpec;
        anchor: p.Property<Anchor>;
        global_alpha: p.NumberSpec;
        angle: p.AngleSpec;
        w: p.NullDistanceSpec;
        h: p.NullDistanceSpec;
        dilate: p.Property<boolean>;
        retry_attempts: p.Property<number>;
        retry_timeout: p.Property<number>;
    };
    type Visuals = XYGlyph.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface ImageURL extends ImageURL.Attrs {
}
export declare class ImageURL extends XYGlyph {
    properties: ImageURL.Props;
    __view_type__: ImageURLView;
    constructor(attrs?: Partial<ImageURL.Attrs>);
}
//# sourceMappingURL=image_url.d.ts.map