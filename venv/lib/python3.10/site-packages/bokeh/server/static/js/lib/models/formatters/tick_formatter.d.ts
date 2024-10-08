import { Model } from "../../model";
import type { GraphicsBox } from "../../core/graphics";
import type * as p from "../../core/properties";
export declare namespace TickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface TickFormatter extends TickFormatter.Attrs {
}
export declare abstract class TickFormatter extends Model {
    properties: TickFormatter.Props;
    constructor(attrs?: Partial<TickFormatter.Attrs>);
    abstract doFormat(ticks: string[] | number[], opts: {
        loc: number;
    }): string[];
    format_graphics(ticks: string[] | number[], opts: {
        loc: number;
    }): GraphicsBox[];
    compute(tick: string | number, opts?: {
        loc: number;
    }): string;
    v_compute(tick: string[] | number[], opts?: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=tick_formatter.d.ts.map