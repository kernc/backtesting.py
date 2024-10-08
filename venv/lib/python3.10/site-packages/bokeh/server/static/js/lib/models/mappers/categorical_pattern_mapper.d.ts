import type { CategoricalMapper } from "./categorical_mapper";
import type { Factor } from "../ranges/factor_range";
import { Mapper } from "./mapper";
import type * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
import { HatchPatternType } from "../../core/enums";
export declare namespace CategoricalPatternMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = Mapper.Props & CategoricalMapper.Props & {
        patterns: p.Property<HatchPatternType[]>;
        default_value: p.Property<HatchPatternType>;
    };
}
export interface CategoricalPatternMapper extends Mapper.Attrs, CategoricalMapper.Attrs, CategoricalPatternMapper.Attrs {
}
export declare class CategoricalPatternMapper extends Mapper<string> {
    properties: CategoricalPatternMapper.Props;
    constructor(attrs?: Partial<CategoricalPatternMapper.Attrs>);
    v_compute(xs: Arrayable<Factor | number | null>): Arrayable<string>;
}
//# sourceMappingURL=categorical_pattern_mapper.d.ts.map