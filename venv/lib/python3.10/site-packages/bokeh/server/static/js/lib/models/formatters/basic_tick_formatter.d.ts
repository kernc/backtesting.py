import { TickFormatter } from "./tick_formatter";
import type * as p from "../../core/properties";
export declare function unicode_replace(input: string): string;
export declare namespace BasicTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = TickFormatter.Props & {
        precision: p.Property<number | "auto">;
        use_scientific: p.Property<boolean>;
        power_limit_high: p.Property<number>;
        power_limit_low: p.Property<number>;
    };
}
export interface BasicTickFormatter extends BasicTickFormatter.Attrs {
}
export declare class BasicTickFormatter extends TickFormatter {
    properties: BasicTickFormatter.Props;
    constructor(attrs?: Partial<BasicTickFormatter.Attrs>);
    protected last_precision: number;
    get scientific_limit_low(): number;
    get scientific_limit_high(): number;
    _need_sci(ticks: number[]): boolean;
    _format_with_precision(ticks: number[], need_sci: boolean, precision: number | undefined): string[];
    _auto_precision(ticks: number[], need_sci: boolean): number | undefined;
    doFormat(ticks: number[], _opts: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=basic_tick_formatter.d.ts.map