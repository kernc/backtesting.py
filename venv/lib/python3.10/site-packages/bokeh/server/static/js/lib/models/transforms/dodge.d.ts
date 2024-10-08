import { RangeTransform } from "./range_transform";
import type * as p from "../../core/properties";
export declare namespace Dodge {
    type Attrs = p.AttrsOf<Props>;
    type Props = RangeTransform.Props & {
        value: p.Property<number>;
    };
}
export interface Dodge extends Dodge.Attrs {
}
export declare class Dodge extends RangeTransform {
    properties: Dodge.Props;
    constructor(attrs?: Partial<Dodge.Attrs>);
    protected _compute(x: number): number;
}
//# sourceMappingURL=dodge.d.ts.map