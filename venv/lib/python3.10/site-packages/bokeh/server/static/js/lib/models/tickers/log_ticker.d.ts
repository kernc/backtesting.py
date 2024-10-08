import type { TickSpec } from "./ticker";
import { AdaptiveTicker } from "./adaptive_ticker";
import type * as p from "../../core/properties";
export declare namespace LogTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = AdaptiveTicker.Props;
}
export interface LogTicker extends LogTicker.Attrs {
}
export declare class LogTicker extends AdaptiveTicker {
    properties: LogTicker.Props;
    constructor(attrs?: Partial<LogTicker.Attrs>);
    get_ticks_no_defaults(data_low: number, data_high: number, _cross_loc: number, desired_n_ticks: number): TickSpec<number>;
}
//# sourceMappingURL=log_ticker.d.ts.map