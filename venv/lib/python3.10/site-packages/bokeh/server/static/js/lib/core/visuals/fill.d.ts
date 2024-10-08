import type { ValuesOf } from "./visual";
import { VisualProperties, VisualUniforms } from "./visual";
import type { uint32, Color } from "../types";
import type * as p from "../properties";
import * as mixins from "../property_mixins";
import type { Context2d } from "../util/canvas";
export interface Fill extends Readonly<mixins.Fill> {
}
export declare class Fill extends VisualProperties {
    get doit(): boolean;
    apply(ctx: Context2d, rule?: CanvasFillRule): boolean;
    Values: ValuesOf<mixins.Fill>;
    values(): this["Values"];
    set_value(ctx: Context2d): void;
    get_fill_color(): Color | null;
    get_fill_alpha(): number;
}
export declare class FillScalar extends VisualUniforms {
    readonly fill_color: p.UniformScalar<uint32>;
    readonly fill_alpha: p.UniformScalar<number>;
    get doit(): boolean;
    apply(ctx: Context2d, rule?: CanvasFillRule): boolean;
    Values: ValuesOf<mixins.Fill>;
    values(): this["Values"];
    set_value(ctx: Context2d): void;
}
export declare class FillVector extends VisualUniforms {
    readonly fill_color: p.Uniform<uint32>;
    readonly fill_alpha: p.Uniform<number>;
    get doit(): boolean;
    v_doit(i: number): boolean;
    apply(ctx: Context2d, i: number, rule?: CanvasFillRule): boolean;
    Values: ValuesOf<mixins.Fill>;
    values(i: number): this["Values"];
    set_vectorize(ctx: Context2d, i: number): void;
}
//# sourceMappingURL=fill.d.ts.map