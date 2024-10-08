import type { ValuesOf } from "./visual";
import { VisualProperties, VisualUniforms } from "./visual";
import type * as p from "../properties";
import * as mixins from "../property_mixins";
import type { Context2d } from "../util/canvas";
export interface Image extends Readonly<mixins.Image> {
}
export declare class Image extends VisualProperties {
    get doit(): boolean;
    apply(ctx: Context2d): boolean;
    Values: ValuesOf<mixins.Image>;
    values(): this["Values"];
    set_value(ctx: Context2d): void;
}
export declare class ImageScalar extends VisualUniforms {
    readonly global_alpha: p.UniformScalar<number>;
    get doit(): boolean;
    apply(ctx: Context2d): boolean;
    Values: ValuesOf<mixins.Image>;
    values(): this["Values"];
    set_value(ctx: Context2d): void;
}
export declare class ImageVector extends VisualUniforms {
    readonly global_alpha: p.Uniform<number>;
    get doit(): boolean;
    v_doit(i: number): boolean;
    apply(ctx: Context2d, i: number): boolean;
    Values: ValuesOf<mixins.Image>;
    values(i: number): this["Values"];
    set_vectorize(ctx: Context2d, i: number): void;
}
//# sourceMappingURL=image.d.ts.map