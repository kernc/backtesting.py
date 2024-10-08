import { Scale } from "./scale";
import type { FactorRange, FactorLike } from "../ranges/factor_range";
import type * as p from "../../core/properties";
export declare namespace CategoricalScale {
    type Attrs = p.AttrsOf<Props>;
    type Props = Scale.Props;
}
export interface CategoricalScale extends CategoricalScale.Attrs {
}
export declare class CategoricalScale extends Scale<FactorLike> {
    properties: CategoricalScale.Props;
    constructor(attrs?: Partial<CategoricalScale.Attrs>);
    source_range: FactorRange;
    get s_compute(): (x: FactorLike) => number;
    get s_invert(): (sx: number) => number;
}
//# sourceMappingURL=categorical_scale.d.ts.map