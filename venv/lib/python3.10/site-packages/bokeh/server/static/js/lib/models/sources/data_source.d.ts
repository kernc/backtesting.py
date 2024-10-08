import { Model } from "../../model";
import { Selection } from "../selections/selection";
import type * as p from "../../core/properties";
export declare namespace DataSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        selected: p.Property<Selection>;
    };
}
export interface DataSource extends DataSource.Attrs {
}
export declare abstract class DataSource extends Model {
    properties: DataSource.Props;
    constructor(attrs?: Partial<DataSource.Attrs>);
    setup?(): void;
}
//# sourceMappingURL=data_source.d.ts.map