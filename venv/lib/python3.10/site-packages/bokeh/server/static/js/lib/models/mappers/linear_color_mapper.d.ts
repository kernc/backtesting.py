import { ContinuousColorMapper } from "./continuous_color_mapper";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace LinearColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousColorMapper.Props;
}
export type LinearScanData = {
    min: number;
    max: number;
    norm_factor: number;
    normed_interval: number;
};
export interface LinearColorMapper extends LinearColorMapper.Attrs {
}
export declare class LinearColorMapper extends ContinuousColorMapper {
    properties: LinearColorMapper.Props;
    constructor(attrs?: Partial<LinearColorMapper.Attrs>);
    protected scan(data: Arrayable<number>, n: number): LinearScanData;
    index_to_value(index: number): number;
    value_to_index(value: number, palette_length: number): number;
}
//# sourceMappingURL=linear_color_mapper.d.ts.map