import { ColorMapper } from "./color_mapper";
import type * as p from "../../core/properties";
export declare namespace StackColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ColorMapper.Props;
}
export interface StackColorMapper extends StackColorMapper.Attrs {
}
export declare abstract class StackColorMapper extends ColorMapper {
    properties: StackColorMapper.Props;
    constructor(attrs?: Partial<StackColorMapper.Attrs>);
}
//# sourceMappingURL=stack_color_mapper.d.ts.map