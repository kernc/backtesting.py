import type { TickSpec } from "./ticker";
import { BaseSingleIntervalTicker } from "./single_interval_ticker";
import type * as p from "../../core/properties";
export declare namespace MonthsTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseSingleIntervalTicker.Props & {
        months: p.Property<number[]>;
    };
}
export interface MonthsTicker extends MonthsTicker.Attrs {
}
export declare class MonthsTicker extends BaseSingleIntervalTicker {
    properties: MonthsTicker.Props;
    constructor(attrs?: Partial<MonthsTicker.Attrs>);
    interval: number;
    initialize(): void;
    get_ticks_no_defaults(data_low: number, data_high: number, _cross_loc: number, _desired_n_ticks: number): TickSpec<number>;
}
//# sourceMappingURL=months_ticker.d.ts.map