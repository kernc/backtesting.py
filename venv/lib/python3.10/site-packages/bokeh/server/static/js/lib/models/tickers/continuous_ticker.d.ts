import type { TickSpec } from "./ticker";
import { Ticker } from "./ticker";
import type { Range } from "../ranges/range";
import type * as p from "../../core/properties";
export declare namespace ContinuousTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = Ticker.Props & {
        num_minor_ticks: p.Property<number>;
        desired_num_ticks: p.Property<number>;
    };
}
export interface ContinuousTicker extends ContinuousTicker.Attrs {
}
export declare abstract class ContinuousTicker extends Ticker {
    properties: ContinuousTicker.Props;
    constructor(attrs?: Partial<ContinuousTicker.Attrs>);
    get_ticks(data_low: number, data_high: number, _range: Range, cross_loc: number): TickSpec<number>;
    abstract get_interval(data_low: number, data_high: number, desired_n_ticks: number): number;
    get_ticks_no_defaults(data_low: number, data_high: number, _cross_loc: number, desired_n_ticks: number): TickSpec<number>;
    abstract get_min_interval(): number;
    abstract get_max_interval(): number;
    get_ideal_interval(data_low: number, data_high: number, desired_n_ticks: number): number;
}
//# sourceMappingURL=continuous_ticker.d.ts.map