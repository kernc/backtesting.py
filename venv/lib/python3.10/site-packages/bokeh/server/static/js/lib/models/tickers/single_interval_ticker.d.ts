import { ContinuousTicker } from "./continuous_ticker";
import type * as p from "../../core/properties";
export declare namespace BaseSingleIntervalTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousTicker.Props;
}
export interface BaseSingleIntervalTicker extends BaseSingleIntervalTicker.Attrs {
}
export declare abstract class BaseSingleIntervalTicker extends ContinuousTicker {
    properties: BaseSingleIntervalTicker.Props;
    constructor(attrs?: Partial<BaseSingleIntervalTicker.Attrs>);
    abstract interval: number;
    get_interval(_data_low: number, _data_high: number, _n_desired_ticks: number): number;
    get_min_interval(): number;
    get_max_interval(): number;
}
export declare namespace SingleIntervalTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BaseSingleIntervalTicker.Props & {
        interval: p.Property<number>;
    };
}
export interface SingleIntervalTicker extends SingleIntervalTicker.Attrs {
}
export declare class SingleIntervalTicker extends BaseSingleIntervalTicker {
    properties: SingleIntervalTicker.Props;
    constructor(attrs?: Partial<SingleIntervalTicker.Attrs>);
    interval: number;
}
//# sourceMappingURL=single_interval_ticker.d.ts.map