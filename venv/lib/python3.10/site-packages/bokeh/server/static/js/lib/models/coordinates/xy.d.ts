import { Coordinate } from "./coordinate";
import type * as p from "../../core/properties";
export declare namespace XY {
    type Attrs = p.AttrsOf<Props>;
    type Props = Coordinate.Props & {
        x: p.Property<number>;
        y: p.Property<number>;
    };
}
export interface XY extends XY.Attrs {
}
export declare class XY extends Coordinate {
    properties: XY.Props;
    constructor(attrs?: Partial<XY.Attrs>);
}
//# sourceMappingURL=xy.d.ts.map