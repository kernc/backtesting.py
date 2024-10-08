import { Axis, AxisView } from "./axis";
import type * as p from "../../core/properties";
export declare abstract class ContinuousAxisView extends AxisView {
    model: ContinuousAxis;
    protected _hit_value(sx: number, sy: number): number | null;
}
export declare namespace ContinuousAxis {
    type Attrs = p.AttrsOf<Props>;
    type Props = Axis.Props;
}
export interface ContinuousAxis extends ContinuousAxis.Attrs {
}
export declare abstract class ContinuousAxis extends Axis {
    properties: ContinuousAxis.Props;
    __view_type__: ContinuousAxisView;
    constructor(attrs?: Partial<ContinuousAxis.Attrs>);
}
//# sourceMappingURL=continuous_axis.d.ts.map