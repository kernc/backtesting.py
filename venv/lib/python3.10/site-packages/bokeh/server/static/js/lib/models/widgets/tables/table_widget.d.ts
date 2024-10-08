import { Widget } from "../widget";
import { ColumnDataSource } from "../../sources/column_data_source";
import { CDSView } from "../../sources/cds_view";
import type * as p from "../../../core/properties";
export declare namespace TableWidget {
    type Attrs = p.AttrsOf<Props>;
    type Props = Widget.Props & {
        source: p.Property<ColumnDataSource>;
        view: p.Property<CDSView>;
    };
}
export interface TableWidget extends TableWidget.Attrs {
}
export declare class TableWidget extends Widget {
    properties: TableWidget.Props;
    constructor(attrs?: Partial<TableWidget.Attrs>);
}
//# sourceMappingURL=table_widget.d.ts.map