import { ContinuousColorMapper } from "./continuous_color_mapper";
import { StackColorMapper } from "./stack_color_mapper";
import type * as p from "../../core/properties";
import type { Arrayable, ArrayableOf, uint32 } from "../../core/types";
import { RGBAArray } from "../../core/types";
export declare namespace WeightedStackColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = StackColorMapper.Props & {
        alpha_mapper: p.Property<ContinuousColorMapper>;
        color_baseline: p.Property<number | null>;
        stack_labels: p.Property<string[] | null>;
    };
}
export interface WeightedStackColorMapper extends WeightedStackColorMapper.Attrs {
}
export declare class WeightedStackColorMapper extends StackColorMapper {
    properties: WeightedStackColorMapper.Props;
    constructor(attrs?: Partial<WeightedStackColorMapper.Attrs>);
    protected _mix_colors(colors_rgba: RGBAArray, nan_color: uint32, weights: Array<number>, total_weight: number): uint32;
    protected _v_compute<T>(_data: Arrayable<number>, _values: Arrayable<T>, _palette: Arrayable<T>, _colors: {
        nan_color: T;
    }): void;
    protected _v_compute_uint32(data: ArrayableOf<number>, values: Arrayable<uint32>, palette: Arrayable<uint32>, colors: {
        nan_color: uint32;
    }): void;
}
//# sourceMappingURL=weighted_stack_color_mapper.d.ts.map