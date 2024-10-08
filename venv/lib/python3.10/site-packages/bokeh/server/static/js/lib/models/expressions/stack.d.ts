import type { ColumnarDataSource } from "../sources/columnar_data_source";
import { Expression } from "./expression";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace Stack {
    type Attrs = p.AttrsOf<Props>;
    type Props = Expression.Props & {
        fields: p.Property<string[]>;
    };
}
export interface Stack extends Stack.Attrs {
}
export declare class Stack extends Expression {
    properties: Stack.Props;
    constructor(attrs?: Partial<Stack.Attrs>);
    protected _v_compute(source: ColumnarDataSource): Arrayable<number>;
}
//# sourceMappingURL=stack.d.ts.map