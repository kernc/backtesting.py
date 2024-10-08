import { ContinuousAxis, ContinuousAxisView } from "./continuous_axis";
import { BasicTickFormatter } from "../formatters/basic_tick_formatter";
import type { ContinuousTicker } from "../tickers/continuous_ticker";
import type * as p from "../../core/properties";
export declare class LinearAxisView extends ContinuousAxisView {
    model: LinearAxis;
}
export declare namespace LinearAxis {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousAxis.Props & {};
}
export interface LinearAxis extends LinearAxis.Attrs {
}
export declare class LinearAxis extends ContinuousAxis {
    properties: LinearAxis.Props;
    __view_type__: LinearAxisView;
    ticker: ContinuousTicker;
    formatter: BasicTickFormatter;
    constructor(attrs?: Partial<LinearAxis.Attrs>);
}
//# sourceMappingURL=linear_axis.d.ts.map