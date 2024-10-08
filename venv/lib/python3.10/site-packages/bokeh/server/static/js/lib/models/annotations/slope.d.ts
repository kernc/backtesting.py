import { Annotation, AnnotationView } from "./annotation";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
export declare class SlopeView extends AnnotationView {
    model: Slope;
    visuals: Slope.Visuals;
    connect_signals(): void;
    protected _paint(): void;
}
export declare namespace Slope {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        gradient: p.Property<number | null>;
        y_intercept: p.Property<number | null>;
    } & Mixins;
    type Mixins = mixins.Line & mixins.AboveFill & mixins.AboveHatch & mixins.BelowFill & mixins.BelowHatch;
    type Visuals = Annotation.Visuals & {
        line: visuals.Line;
        above_fill: visuals.Fill;
        above_hatch: visuals.Hatch;
        below_fill: visuals.Fill;
        below_hatch: visuals.Hatch;
    };
}
export interface Slope extends Slope.Attrs {
}
export declare class Slope extends Annotation {
    properties: Slope.Props;
    __view_type__: SlopeView;
    constructor(attrs?: Partial<Slope.Attrs>);
}
//# sourceMappingURL=slope.d.ts.map