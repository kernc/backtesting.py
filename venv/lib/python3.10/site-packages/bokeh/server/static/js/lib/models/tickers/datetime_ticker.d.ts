import type * as p from "../../core/properties";
import { CompositeTicker } from "./composite_ticker";
export declare namespace DatetimeTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = CompositeTicker.Props;
}
export interface DatetimeTicker extends DatetimeTicker.Attrs {
}
export declare class DatetimeTicker extends CompositeTicker {
    properties: DatetimeTicker.Props;
    constructor(attrs?: Partial<DatetimeTicker.Attrs>);
}
//# sourceMappingURL=datetime_ticker.d.ts.map