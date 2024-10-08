import { ContinuousColorMapper } from "./continuous_color_mapper";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export type ScanningScanData = {
    min: number;
    max: number;
    binning: Arrayable<number>;
    force_low_cutoff: boolean;
};
export declare namespace ScanningColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousColorMapper.Props;
}
export interface ScanningColorMapper extends ScanningColorMapper.Attrs {
}
export declare abstract class ScanningColorMapper extends ContinuousColorMapper {
    properties: ScanningColorMapper.Props;
    constructor(attrs?: Partial<ScanningColorMapper.Attrs>);
    MatricsType: {
        min: number;
        max: number;
        binning: Arrayable<number>;
        force_low_cutoff: boolean;
    };
    index_to_value(index: number): number;
    value_to_index(value: number, palette_length: number): number;
}
//# sourceMappingURL=scanning_color_mapper.d.ts.map