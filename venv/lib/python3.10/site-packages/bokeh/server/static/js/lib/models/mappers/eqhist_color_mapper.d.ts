import type { ScanningScanData } from "./scanning_color_mapper";
import { ScanningColorMapper } from "./scanning_color_mapper";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace EqHistColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ScanningColorMapper.Props & {
        bins: p.Property<number>;
        rescale_discrete_levels: p.Property<boolean>;
    };
}
export interface EqHistColorMapper extends EqHistColorMapper.Attrs {
}
export declare class EqHistColorMapper extends ScanningColorMapper {
    properties: EqHistColorMapper.Props;
    constructor(attrs?: Partial<EqHistColorMapper.Attrs>);
    scan(data: Arrayable<number>, n: number): ScanningScanData;
}
//# sourceMappingURL=eqhist_color_mapper.d.ts.map