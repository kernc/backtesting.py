import { Model } from "../../model";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index as DataIndex } from "../../core/util/templating";
import { View } from "../../core/view";
import type * as p from "../../core/properties";
export declare abstract class ActionView extends View {
    model: Action;
    abstract update(source: ColumnarDataSource, i: DataIndex | null, vars: object): void;
}
export declare namespace Action {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Action extends Action.Attrs {
}
export declare abstract class Action extends Model {
    properties: Action.Props;
    __view_type__: ActionView;
    static __module__: string;
    constructor(attrs?: Partial<Action.Attrs>);
}
//# sourceMappingURL=action.d.ts.map