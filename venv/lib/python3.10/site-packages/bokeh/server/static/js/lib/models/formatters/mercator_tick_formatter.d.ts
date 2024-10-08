import { BasicTickFormatter } from "./basic_tick_formatter";
import { LatLon } from "../../core/enums";
import type * as p from "../../core/properties";
export declare namespace MercatorTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = BasicTickFormatter.Props & {
        dimension: p.Property<LatLon | null>;
    };
}
export interface MercatorTickFormatter extends MercatorTickFormatter.Attrs {
}
export declare class MercatorTickFormatter extends BasicTickFormatter {
    properties: MercatorTickFormatter.Props;
    constructor(attrs?: Partial<MercatorTickFormatter.Attrs>);
    doFormat(ticks: number[], opts: {
        loc: number;
    }): string[];
}
//# sourceMappingURL=mercator_tick_formatter.d.ts.map