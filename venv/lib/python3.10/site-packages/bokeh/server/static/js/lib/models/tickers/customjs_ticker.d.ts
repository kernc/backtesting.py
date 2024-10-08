import type { FactorTickSpec } from "./categorical_ticker";
import type { TickSpec } from "./ticker";
import { Ticker } from "./ticker";
import type { Range } from "../ranges/range";
import type * as p from "../../core/properties";
import type { Dict } from "../../core/types";
type MajorCBData = {
    start: number;
    end: number;
    range: Range;
    cross_loc: number;
};
type MinorCBData = MajorCBData & {
    major_ticks: any[];
};
export declare namespace CustomJSTicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = Ticker.Props & {
        args: p.Property<Dict<unknown>>;
        major_code: p.Property<string>;
        minor_code: p.Property<string>;
    };
}
export interface CustomJSTicker extends CustomJSTicker.Attrs {
}
export declare class CustomJSTicker extends Ticker {
    properties: CustomJSTicker.Props;
    constructor(attrs?: Partial<CustomJSTicker.Attrs>);
    get names(): string[];
    get values(): unknown[];
    get_ticks(start: number, end: number, range: Range, cross_loc: number): TickSpec<number> | FactorTickSpec;
    protected major_ticks(cb_data: MajorCBData): any[];
    protected minor_ticks(cb_data: MinorCBData): any[];
}
export {};
//# sourceMappingURL=customjs_ticker.d.ts.map