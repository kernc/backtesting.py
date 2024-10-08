import type { Transform } from "./base";
import { BaseGLGlyph } from "./base";
import { Float32Buffer } from "./buffer";
import type { ReglWrapper } from "./regl_wrap";
import type { ImageBaseView } from "../image_base";
import type { Texture2D } from "regl";
export declare class ImageGL extends BaseGLGlyph {
    readonly glyph: ImageBaseView;
    protected _tex: (Texture2D | null)[];
    protected _bounds: (Float32Buffer | null)[];
    protected _image_changed: boolean;
    constructor(regl_wrapper: ReglWrapper, glyph: ImageBaseView);
    draw(indices: number[], main_glyph: ImageBaseView, transform: Transform): void;
    set_image_changed(): void;
    protected _set_data(): void;
    protected _set_image(): void;
}
//# sourceMappingURL=image.d.ts.map