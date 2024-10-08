import type { TickSpec } from "./ticker";
import { Ticker } from "./ticker";
import type { Range } from "../ranges/range";
import type * as p from "../../core/properties";
import { ScanningColorMapper } from "../mappers/scanning_color_mapper";
export declare namespace BinnedTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = Ticker.Props & {
        mapper: p.Property<ScanningColorMapper>;
        num_major_ticks: p.Property<number | "auto">;
    };
}
export interface BinnedTicker extends BinnedTicker.Attrs {
}
export declare class BinnedTicker extends Ticker {
    properties: BinnedTicker.Props;
    constructor(attrs?: Partial<BinnedTicker.Attrs>);
    get_ticks(data_low: number, data_high: number, _range: Range, _cross_loc: number): TickSpec<number>;
}
//# sourceMappingURL=binned_ticker.d.ts.map