import type { ColumnarDataSource } from "../sources/columnar_data_source";
import { ScalarExpression } from "./expression";
import type * as p from "../../core/properties";
export declare namespace Minimum {
    type Attrs = p.AttrsOf<Props>;
    type Props = ScalarExpression.Props & {
        field: p.Property<string>;
        initial: p.Property<number>;
    };
}
export interface Minimum extends Minimum.Attrs {
}
export declare class Minimum extends ScalarExpression<number> {
    properties: Minimum.Props;
    constructor(attrs?: Partial<Minimum.Attrs>);
    protected _compute(source: ColumnarDataSource): number;
}
//# sourceMappingURL=minimum.d.ts.map