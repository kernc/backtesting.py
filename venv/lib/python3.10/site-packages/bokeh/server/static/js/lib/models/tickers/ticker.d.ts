import { Model } from "../../model";
import type { Range } from "../ranges/range";
import type * as p from "../../core/properties";
export type TickSpec<T> = {
    major: T[];
    minor: T[];
};
export declare namespace Ticker {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Ticker extends Ticker.Attrs {
}
export declare abstract class Ticker extends Model {
    properties: Ticker.Props;
    constructor(attrs?: Partial<Ticker.Attrs>);
    abstract get_ticks(data_low: number, data_high: number, range: Range, cross_loc: number): TickSpec<any>;
}
//# sourceMappingURL=ticker.d.ts.map