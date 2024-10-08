import { Texture } from "./texture";
import type * as p from "../../core/properties";
import type { Color } from "../../core/types";
import type { PatternSource } from "../../core/visuals/patterns";
export declare namespace ImageURLTexture {
    type Attrs = p.AttrsOf<Props>;
    type Props = Texture.Props & {
        url: p.Property<string>;
    };
}
export interface ImageURLTexture extends ImageURLTexture.Attrs {
}
export declare class ImageURLTexture extends Texture {
    properties: ImageURLTexture.Props;
    constructor(attrs?: Partial<ImageURLTexture.Attrs>);
    private _loader;
    initialize(): void;
    get_pattern(_color: Color, _scale: number, _weight: number): PatternSource | Promise<PatternSource>;
}
//# sourceMappingURL=image_url_texture.d.ts.map