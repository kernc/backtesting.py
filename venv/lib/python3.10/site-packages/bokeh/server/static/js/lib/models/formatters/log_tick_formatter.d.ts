import { TickFormatter } from "./tick_formatter";
import { BasicTickFormatter } from "./basic_tick_formatter";
import { LogTicker } from "../tickers/log_ticker";
import type { GraphicsBox } from "../../core/graphics";
import type * as p from "../../core/properties";
export declare namespace LogTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = TickFormatter.Props & {
        ticker: p.Property<LogTicker | null>;
        min_exponent: p.Property<number>;
    };
}
export interface LogTickFormatter extends LogTickFormatter.Attrs {
}
export declare class LogTickFormatter extends TickFormatter {
    properties: LogTickFormatter.Props;
    constructor(attrs?: Partial<LogTickFormatter.Attrs>);
    protected basic_formatter: BasicTickFormatter;
    initialize(): void;
    format_graphics(ticks: number[], opts: {
        loc: number;
    }): GraphicsBox[];
    protected _exponents(ticks: number[], base: number): number[] | null;
    doFormat(ticks: number[], opts: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=log_tick_formatter.d.ts.map