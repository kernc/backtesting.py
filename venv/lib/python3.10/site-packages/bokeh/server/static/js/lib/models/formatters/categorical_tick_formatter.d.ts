import { TickFormatter } from "./tick_formatter";
import type * as p from "../../core/properties";
export declare namespace CategoricalTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = TickFormatter.Props;
}
export interface CategoricalTickFormatter extends CategoricalTickFormatter.Attrs {
}
export declare class CategoricalTickFormatter extends TickFormatter {
    properties: CategoricalTickFormatter.Props;
    constructor(attrs?: Partial<CategoricalTickFormatter.Attrs>);
    doFormat(ticks: string[], _opts: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=categorical_tick_formatter.d.ts.map