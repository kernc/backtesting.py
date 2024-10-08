import type { TickSpec } from "./ticker";
import { BasicTicker } from "./basic_ticker";
import { BaseSingleIntervalTicker } from "./single_interval_ticker";
import type * as p from "../../core/properties";
export declare namespace YearsTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseSingleIntervalTicker.Props;
}
export interface YearsTicker extends YearsTicker.Attrs {
}
export declare class YearsTicker extends BaseSingleIntervalTicker {
    properties: YearsTicker.Props;
    constructor(attrs?: Partial<YearsTicker.Attrs>);
    readonly interval: number;
    readonly basic_ticker: BasicTicker;
    get_ticks_no_defaults(data_low: number, data_high: number, cross_loc: number, desired_n_ticks: number): TickSpec<number>;
}
//# sourceMappingURL=years_ticker.d.ts.map