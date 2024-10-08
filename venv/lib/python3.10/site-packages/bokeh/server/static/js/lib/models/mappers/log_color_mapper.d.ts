import { ContinuousColorMapper } from "./continuous_color_mapper";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export type LogScanData = {
    min: number;
    max: number;
    scale: number;
};
export declare namespace LogColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ContinuousColorMapper.Props;
}
export interface LogColorMapper extends LogColorMapper.Attrs {
}
export declare class LogColorMapper extends ContinuousColorMapper {
    properties: LogColorMapper.Props;
    constructor(attrs?: Partial<LogColorMapper.Attrs>);
    protected scan(data: Arrayable<number>, n: number): LogScanData;
    index_to_value(index: number): number;
    value_to_index(value: number, palette_length: number): number;
}
//# sourceMappingURL=log_color_mapper.d.ts.map