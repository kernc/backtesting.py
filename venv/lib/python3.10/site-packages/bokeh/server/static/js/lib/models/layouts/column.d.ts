import { FlexBox, FlexBoxView } from "./flex_box";
import type * as p from "../../core/properties";
export declare class ColumnView extends FlexBoxView {
    model: Column;
    protected _direction: "column";
}
export declare namespace Column {
    type Attrs = p.AttrsOf<Props>;
    type Props = FlexBox.Props;
}
export interface Column extends Column.Attrs {
}
export declare class Column extends FlexBox {
    properties: Column.Props;
    __view_type__: ColumnView;
    constructor(attrs?: Partial<Column.Attrs>);
}
//# sourceMappingURL=column.d.ts.map