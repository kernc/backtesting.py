import { XYGlyph, XYGlyphView } from "./xy_glyph";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
import type { Rect } from "../../core/types";
import { StepMode } from "../../core/enums";
import type { Context2d } from "../../core/util/canvas";
export interface StepView extends Step.Data {
}
export declare class StepView extends XYGlyphView {
    model: Step;
    visuals: Step.Visuals;
    load_glglyph(): Promise<typeof import("./webgl/step").StepGL>;
    protected _paint(ctx: Context2d, indices: number[], data?: Partial<Step.Data>): void;
    protected _render_xy(ctx: Context2d, drawing: boolean, x: number, y: number): boolean;
    draw_legend_for_index(ctx: Context2d, bbox: Rect, _index: number): void;
}
export declare namespace Step {
    type Attrs = p.AttrsOf<Props>;
    type Props = XYGlyph.Props & {
        mode: p.Property<StepMode>;
    } & Mixins;
    type Mixins = mixins.LineScalar;
    type Visuals = XYGlyph.Visuals & {
        line: visuals.LineScalar;
    };
    type Data = p.GlyphDataOf<Props>;
}
export interface Step extends Step.Attrs {
}
export declare class Step extends XYGlyph {
    properties: Step.Props;
    __view_type__: StepView;
    constructor(attrs?: Partial<Step.Attrs>);
}
//# sourceMappingURL=step.d.ts.map