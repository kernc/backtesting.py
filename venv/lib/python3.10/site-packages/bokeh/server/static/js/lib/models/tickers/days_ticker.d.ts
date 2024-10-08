import type { TickSpec } from "./ticker";
import { BaseSingleIntervalTicker } from "./single_interval_ticker";
import type * as p from "../../core/properties";
export declare namespace DaysTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseSingleIntervalTicker.Props & {
        days: p.Property<number[]>;
    };
}
export interface DaysTicker extends DaysTicker.Attrs {
}
export declare class DaysTicker extends BaseSingleIntervalTicker {
    properties: DaysTicker.Props;
    constructor(attrs?: Partial<DaysTicker.Attrs>);
    interval: number;
    initialize(): void;
    get_ticks_no_defaults(data_low: number, data_high: number, _cross_loc: number, _desired_n_ticks: number): TickSpec<number>;
}
//# sourceMappingURL=days_ticker.d.ts.map