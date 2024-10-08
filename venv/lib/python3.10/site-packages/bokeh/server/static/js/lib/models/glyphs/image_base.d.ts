import { XYGlyph, XYGlyphView } from "./xy_glyph";
import type { Arrayable } from "../../core/types";
import { ImageOrigin } from "../../core/enums";
import * as p from "../../core/properties";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type { Context2d } from "../../core/util/canvas";
import type { ImageIndex } from "../selections/selection";
import { Selection } from "../selections/selection";
import type { PointGeometry } from "../../core/geometry";
import type { SpatialIndex } from "../../core/util/spatial";
import type { NDArrayType } from "../../core/util/ndarray";
import type { XY } from "../../core/util/bbox";
import { Anchor } from "../common/kinds";
type ImageData = HTMLCanvasElement | null;
export interface ImageBaseView extends ImageBase.Data {
}
export declare abstract class ImageBaseView extends XYGlyphView {
    model: ImageBase;
    visuals: ImageBase.Visuals;
    connect_signals(): void;
    get image_dimension(): number;
    get xy_scale(): XY<number>;
    get xy_offset(): XY<number>;
    get xy_anchor(): XY<number>;
    get xy_sign(): XY<number>;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<ImageBase.Data>): void;
    protected abstract _flat_img_to_buf8(img: NDArrayType<number>): Uint8ClampedArray;
    protected get _can_inherit_image_data(): boolean;
    protected _set_data(indices: number[] | null): void;
    protected _index_data(index: SpatialIndex): void;
    _lrtb(i: number): [number, number, number, number];
    protected _get_or_create_canvas(i: number): HTMLCanvasElement;
    protected _set_image_data_from_buffer(i: number, buf8: Uint8ClampedArray): void;
    protected _map_data(): void;
    protected _image_index(index: number, x: number, y: number): ImageIndex;
    _hit_point(geometry: PointGeometry): Selection;
}
export declare namespace ImageBase {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        image: p.NDArraySpec;
        dw: p.DistanceSpec;
        dh: p.DistanceSpec;
        dilate: p.Property<boolean>;
        origin: p.Property<ImageOrigin>;
        anchor: p.Property<Anchor>;
    } & Mixins;
    type Mixins = mixins.ImageVector;
    type Visuals = XYGlyph.Visuals & {
        image: visuals.ImageVector;
    };
    type Data = p.GlyphDataOf<Props> & {
        image_data: Arrayable<ImageData> | undefined;
        inherited_image_data: boolean;
        image_width: Uint32Array;
        inherited_image_width: boolean;
        image_height: Uint32Array;
        inherited_image_height: boolean;
    };
}
export interface ImageBase extends ImageBase.Attrs {
}
export declare abstract class ImageBase extends XYGlyph {
    properties: ImageBase.Props;
    __view_type__: ImageBaseView;
    constructor(attrs?: Partial<ImageBase.Attrs>);
}
export {};
//# sourceMappingURL=image_base.d.ts.map