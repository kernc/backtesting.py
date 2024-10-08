import { AdaptiveTicker } from "./adaptive_ticker";
import type * as p from "../../core/properties";
export declare namespace BasicTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = AdaptiveTicker.Props;
}
export interface BasicTicker extends BasicTicker.Attrs {
}
export declare class BasicTicker extends AdaptiveTicker {
    properties: BasicTicker.Props;
    constructor(attrs?: Partial<BasicTicker.Attrs>);
}
//# sourceMappingURL=basic_ticker.d.ts.map