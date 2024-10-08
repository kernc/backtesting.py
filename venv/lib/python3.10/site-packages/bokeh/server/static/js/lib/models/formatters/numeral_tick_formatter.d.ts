import { TickFormatter } from "./tick_formatter";
import { RoundingFunction } from "../../core/enums";
import type * as p from "../../core/properties";
export declare namespace NumeralTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = TickFormatter.Props & {
        format: p.Property<string>;
        language: p.Property<string>;
        rounding: p.Property<RoundingFunction>;
    };
}
export interface NumeralTickFormatter extends NumeralTickFormatter.Attrs {
}
export declare class NumeralTickFormatter extends TickFormatter {
    properties: NumeralTickFormatter.Props;
    constructor(attrs?: Partial<NumeralTickFormatter.Attrs>);
    private get _rounding_fn();
    doFormat(ticks: number[], _opts: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=numeral_tick_formatter.d.ts.map