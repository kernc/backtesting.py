import { CellFormatter } from "./cell_formatters";
import { CellEditor } from "./cell_editors";
import type { ColumnType } from "./definitions";
import type * as p from "../../../core/properties";
import { Sort } from "../../../core/enums";
import { Comparison } from "../../../models/comparisons";
import { Model } from "../../../model";
export declare namespace TableColumn {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        field: p.Property<string>;
        title: p.Property<string | null>;
        width: p.Property<number>;
        formatter: p.Property<CellFormatter>;
        editor: p.Property<CellEditor>;
        sortable: p.Property<boolean>;
        default_sort: p.Property<Sort>;
        visible: p.Property<boolean>;
        sorter: p.Property<Comparison | null>;
    };
}
export interface TableColumn extends TableColumn.Attrs {
}
export declare class TableColumn extends Model {
    properties: TableColumn.Props;
    constructor(attrs?: Partial<TableColumn.Attrs>);
    toColumn(): ColumnType;
}
//# sourceMappingURL=table_column.d.ts.map