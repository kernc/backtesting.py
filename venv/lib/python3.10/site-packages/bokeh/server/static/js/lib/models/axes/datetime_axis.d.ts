import { ContinuousAxis, ContinuousAxisView } from "./continuous_axis";
import { DatetimeTickFormatter } from "../formatters/datetime_tick_formatter";
import { DatetimeTicker } from "../tickers/datetime_ticker";
import type * as p from "../../core/properties";
export declare class DatetimeAxisView extends ContinuousAxisView {
    model: DatetimeAxis;
}
export declare namespace DatetimeAxis {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousAxis.Props & {};
}
export interface DatetimeAxis extends DatetimeAxis.Attrs {
}
export declare class DatetimeAxis extends ContinuousAxis {
    properties: DatetimeAxis.Props;
    __view_type__: DatetimeAxisView;
    ticker: DatetimeTicker;
    formatter: DatetimeTickFormatter;
    constructor(attrs?: Partial<DatetimeAxis.Attrs>);
}
//# sourceMappingURL=datetime_axis.d.ts.map