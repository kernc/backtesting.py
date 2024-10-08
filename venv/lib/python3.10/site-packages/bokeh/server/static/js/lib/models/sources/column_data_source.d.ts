import { ColumnarDataSource } from "./columnar_data_source";
import type { Data } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace ColumnDataSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = ColumnarDataSource.Props & {
        data: p.Property<Data>;
    };
}
export interface ColumnDataSource extends ColumnDataSource.Attrs {
}
export declare class ColumnDataSource extends ColumnarDataSource {
    properties: ColumnDataSource.Props;
    constructor(attrs?: Partial<ColumnDataSource.Attrs>);
}
//# sourceMappingURL=column_data_source.d.ts.map