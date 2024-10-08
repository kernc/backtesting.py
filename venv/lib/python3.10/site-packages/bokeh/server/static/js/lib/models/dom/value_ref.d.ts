import { Placeholder, PlaceholderView, Formatter } from "./placeholder";
import type { Formatters } from "./placeholder";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index } from "../../core/util/templating";
import type * as p from "../../core/properties";
import type { PlainObject } from "../../core/types";
export declare class ValueRefView extends PlaceholderView {
    model: ValueRef;
    update(source: ColumnarDataSource, i: Index | null, vars: PlainObject, _formatters?: Formatters): void;
}
export declare namespace ValueRef {
    type Attrs = p.AttrsOf<Props>;
    type Props = Placeholder.Props & {
        field: p.Property<string>;
        format: p.Property<string | null>;
        formatter: p.Property<Formatter>;
    };
}
export interface ValueRef extends ValueRef.Attrs {
}
export declare class ValueRef extends Placeholder {
    properties: ValueRef.Props;
    __view_type__: ValueRefView;
    constructor(attrs?: Partial<ValueRef.Attrs>);
}
//# sourceMappingURL=value_ref.d.ts.map