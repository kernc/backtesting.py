import { Model } from "../../model";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
export declare namespace AreaVisuals {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {} & Mixins;
    type Mixins = mixins.Line & mixins.Fill & mixins.Hatch & mixins.HoverLine & mixins.HoverFill & mixins.HoverHatch;
    type Visuals = {
        line: visuals.Line;
        fill: visuals.Fill;
        hatch: visuals.Hatch;
        hover_line: visuals.Line;
        hover_fill: visuals.Fill;
        hover_hatch: visuals.Hatch;
    };
}
export interface AreaVisuals extends AreaVisuals.Attrs {
}
export declare class AreaVisuals extends Model {
    properties: AreaVisuals.Props;
    constructor(attrs?: Partial<AreaVisuals.Attrs>);
    clone(attrs?: Partial<AreaVisuals.Attrs>): this;
}
//# sourceMappingURL=area_visuals.d.ts.map