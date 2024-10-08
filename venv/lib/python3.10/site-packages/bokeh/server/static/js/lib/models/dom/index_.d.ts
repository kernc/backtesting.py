import { Placeholder, PlaceholderView } from "./placeholder";
import type { Formatters } from "./placeholder";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index as DataIndex } from "../../core/util/templating";
import type { PlainObject } from "../../core/types";
import type * as p from "../../core/properties";
export declare class IndexView extends PlaceholderView {
    model: Index;
    update(_source: ColumnarDataSource, i: DataIndex | null, _vars: PlainObject, _formatters?: Formatters): void;
}
export declare namespace Index {
    type Attrs = p.AttrsOf<Props>;
    type Props = Placeholder.Props;
}
export interface Index extends Index.Attrs {
}
export declare class Index extends Placeholder {
    properties: Index.Props;
    __view_type__: IndexView;
    constructor(attrs?: Partial<Index.Attrs>);
}
//# sourceMappingURL=index_.d.ts.map