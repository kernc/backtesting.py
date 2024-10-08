import type { Mapper } from "./mapper";
import type { FactorSeq, Factor } from "../ranges/factor_range";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare function _cat_equals(a: ArrayLike<unknown>, b: ArrayLike<unknown>): boolean;
export declare function cat_v_compute<T>(data: Arrayable<unknown>, factors: Arrayable<Factor>, targets: Arrayable<T>, values: Arrayable<T>, start: number, end: number | null, extra_value: T): void;
export declare namespace CategoricalMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = Mapper.Props & {
        factors: p.Property<FactorSeq>;
        start: p.Property<number>;
        end: p.Property<number | null>;
    };
}
export interface CategoricalMapper extends CategoricalMapper.Attrs {
}
//# sourceMappingURL=categorical_mapper.d.ts.map