import { Interpolator } from "./interpolator";
import { StepMode } from "../../core/enums";
import type * as p from "../../core/properties";
export declare namespace StepInterpolator {
    type Attrs = p.AttrsOf<Props>;
    type Props = Interpolator.Props & {
        mode: p.Property<StepMode>;
    };
}
export interface StepInterpolator extends StepInterpolator.Attrs {
}
export declare class StepInterpolator extends Interpolator {
    properties: StepInterpolator.Props;
    constructor(attrs?: Partial<StepInterpolator.Attrs>);
    compute(x: number): number;
}
//# sourceMappingURL=step_interpolator.d.ts.map