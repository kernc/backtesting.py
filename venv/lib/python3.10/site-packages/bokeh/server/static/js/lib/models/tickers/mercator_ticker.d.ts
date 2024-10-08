import type { TickSpec } from "./ticker";
import { BasicTicker } from "./basic_ticker";
import { LatLon } from "../../core/enums";
import type * as p from "../../core/properties";
export declare namespace MercatorTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = BasicTicker.Props & {
        dimension: p.Property<LatLon | null>;
    };
}
export interface MercatorTicker extends MercatorTicker.Attrs {
}
export declare class MercatorTicker extends BasicTicker {
    properties: MercatorTicker.Props;
    constructor(attrs?: Partial<MercatorTicker.Attrs>);
    get_ticks_no_defaults(data_low: number, data_high: number, cross_loc: number, desired_n_ticks: number): TickSpec<number>;
    protected _get_ticks_lon(data_low: number, data_high: number, cross_loc: number, desired_n_ticks: number): TickSpec<number>;
    protected _get_ticks_lat(data_low: number, data_high: number, cross_loc: number, desired_n_ticks: number): TickSpec<number>;
}
//# sourceMappingURL=mercator_ticker.d.ts.map