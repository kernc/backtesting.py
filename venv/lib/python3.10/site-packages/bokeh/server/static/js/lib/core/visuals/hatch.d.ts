import { VisualProperties, VisualUniforms } from "./visual";
import type { Color, uint32 } from "../types";
import * as p from "../properties";
import * as mixins from "../property_mixins";
import type { Context2d, CanvasPatternRepetition } from "../util/canvas";
export interface Hatch extends Readonly<mixins.Hatch> {
}
export declare class Hatch extends VisualProperties {
    protected _hatch_image: CanvasImageSource | null;
    protected _update_iteration: number;
    update(): void;
    get doit(): boolean;
    apply(ctx: Context2d, rule?: CanvasFillRule): boolean;
    set_value(ctx: Context2d): void;
    pattern(ctx: Context2d): CanvasPattern | null;
    repetition(): CanvasPatternRepetition;
    get_hatch_color(): Color | null;
    get_hatch_alpha(): number;
    get_hatch_scale(): number;
    get_hatch_pattern(): string | null;
    get_hatch_weight(): number;
    get_hatch_extra(): mixins.HatchExtra;
}
export declare class HatchScalar extends VisualUniforms {
    readonly hatch_color: p.UniformScalar<uint32>;
    readonly hatch_alpha: p.UniformScalar<number>;
    readonly hatch_scale: p.UniformScalar<number>;
    readonly hatch_pattern: p.UniformScalar<string | null>;
    readonly hatch_weight: p.UniformScalar<number>;
    readonly hatch_extra: p.UniformScalar<mixins.HatchExtra>;
    protected _hatch_image: p.UniformScalar<CanvasImageSource | null>;
    protected _static_doit: boolean;
    protected _compute_static_doit(): boolean;
    protected _update_iteration: number;
    update(): void;
    get doit(): boolean;
    apply(ctx: Context2d, rule?: CanvasFillRule): boolean;
    set_value(ctx: Context2d): void;
    pattern(ctx: Context2d): CanvasPattern | null;
    repetition(): CanvasPatternRepetition;
}
export declare class HatchVector extends VisualUniforms {
    readonly hatch_color: p.Uniform<uint32>;
    readonly hatch_alpha: p.Uniform<number>;
    readonly hatch_scale: p.Uniform<number>;
    readonly hatch_pattern: p.Uniform<string | null>;
    readonly hatch_weight: p.Uniform<number>;
    readonly hatch_extra: p.UniformScalar<mixins.HatchExtra>;
    protected _hatch_image: p.Uniform<CanvasImageSource | null>;
    protected _static_doit: boolean;
    protected _compute_static_doit(): boolean;
    protected _update_iteration: number;
    update(): void;
    get doit(): boolean;
    v_doit(i: number): boolean;
    apply(ctx: Context2d, i: number, rule?: CanvasFillRule): boolean;
    set_vectorize(ctx: Context2d, i: number): void;
    pattern(ctx: Context2d, i: number): CanvasPattern | null;
    repetition(i: number): CanvasPatternRepetition;
}
//# sourceMappingURL=hatch.d.ts.map