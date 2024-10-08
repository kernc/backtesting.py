import type { CategoricalMapper } from "./categorical_mapper";
import type { Factor } from "../ranges/factor_range";
import { Mapper } from "./mapper";
import type * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
import { MarkerType } from "../../core/enums";
export declare namespace CategoricalMarkerMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = Mapper.Props & CategoricalMapper.Props & {
        markers: p.Property<MarkerType[]>;
        default_value: p.Property<MarkerType>;
    };
}
export interface CategoricalMarkerMapper extends Mapper.Attrs, CategoricalMapper.Attrs, CategoricalMarkerMapper.Attrs {
}
export declare class CategoricalMarkerMapper extends Mapper<string> {
    properties: CategoricalMarkerMapper.Props;
    constructor(attrs?: Partial<CategoricalMarkerMapper.Attrs>);
    v_compute(xs: Arrayable<Factor | number | null>): Arrayable<string>;
}
//# sourceMappingURL=categorical_marker_mapper.d.ts.map