import { ImageBase, ImageBaseView } from "./image_base";
import { StackColorMapper } from "../mappers/stack_color_mapper";
import type { NDArrayType } from "../../core/util/ndarray";
import type * as p from "../../core/properties";
export interface ImageStackView extends ImageBase.Data {
}
export declare class ImageStackView extends ImageBaseView {
    model: ImageStack;
    visuals: ImageStack.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/image").ImageGL>;
    connect_signals(): void;
    get image_dimension(): number;
    protected _update_image(): void;
    protected get _can_inherit_image_data(): boolean;
    protected _flat_img_to_buf8(img: NDArrayType<number>): Uint8ClampedArray;
}
export declare namespace ImageStack {
    type Attrs = p.AttrsOf<Props>;
    type Props = ImageBase.Props & {
        color_mapper: p.Property<StackColorMapper>;
    };
    type Visuals = ImageBase.Visuals;
    type Data = p.GlyphDataOf<Props>;
}
export interface ImageStack extends ImageStack.Attrs {
}
export declare class ImageStack extends ImageBase {
    properties: ImageStack.Props;
    __view_type__: ImageStackView;
    constructor(attrs?: Partial<ImageStack.Attrs>);
}
//# sourceMappingURL=image_stack.d.ts.map