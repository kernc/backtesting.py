import { FlexBox, FlexBoxView } from "./flex_box";
import type * as p from "../../core/properties";
export declare class RowView extends FlexBoxView {
    model: Row;
    protected _direction: "row";
}
export declare namespace Row {
    type Attrs = p.AttrsOf<Props>;
    type Props = FlexBox.Props;
}
export interface Row extends Row.Attrs {
}
export declare class Row extends FlexBox {
    properties: Row.Props;
    __view_type__: RowView;
    constructor(attrs?: Partial<Row.Attrs>);
}
//# sourceMappingURL=row.d.ts.map