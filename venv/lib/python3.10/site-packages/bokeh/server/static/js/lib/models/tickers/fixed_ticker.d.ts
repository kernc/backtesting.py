import type { TickSpec } from "./ticker";
import { ContinuousTicker } from "./continuous_ticker";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace FixedTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousTicker.Props & {
        ticks: p.Property<Arrayable<number>>;
        minor_ticks: p.Property<Arrayable<number>>;
    };
}
export interface FixedTicker extends FixedTicker.Attrs {
}
export declare class FixedTicker extends ContinuousTicker {
    properties: FixedTicker.Props;
    constructor(attrs?: Partial<FixedTicker.Attrs>);
    get_ticks_no_defaults(_data_low: number, _data_high: number, _cross_loc: number, _desired_n_ticks: number): TickSpec<number>;
    get_interval(_data_low: number, _data_high: number, _desired_n_ticks: number): number;
    get_min_interval(): number;
    get_max_interval(): number;
}
//# sourceMappingURL=fixed_ticker.d.ts.map