import { Scale } from "./scale";
import type * as p from "../../core/properties";
export declare namespace ContinuousScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = Scale.Props;
}
export interface ContinuousScale extends ContinuousScale.Attrs {
}
export declare abstract class ContinuousScale extends Scale<number> {
    properties: ContinuousScale.Props;
    constructor(attrs?: Partial<ContinuousScale.Attrs>);
}
//# sourceMappingURL=continuous_scale.d.ts.map