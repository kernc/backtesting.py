import { UpperLower, UpperLowerView } from "./upper_lower";
import type { Context2d } from "../../core/util/canvas";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
export declare class BandView extends UpperLowerView {
    model: Band;
    visuals: Band.Visuals;
    _paint_data(ctx: Context2d): void;
}
export declare namespace Band {
    type Attrs = p.AttrsOf<Props>;
    type Props = UpperLower.Props & Mixins;
    type Mixins = mixins.Line & mixins.Fill;
    type Visuals = UpperLower.Visuals & {
        line: visuals.Line;
        fill: visuals.Fill;
    };
}
export interface Band extends Band.Attrs {
}
export declare class Band extends UpperLower {
    properties: Band.Props;
    __view_type__: BandView;
    constructor(attrs?: Partial<Band.Attrs>);
}
//# sourceMappingURL=band.d.ts.map