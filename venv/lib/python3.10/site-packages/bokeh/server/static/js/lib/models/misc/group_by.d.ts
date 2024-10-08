import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare namespace GroupBy {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface GroupBy extends GroupBy.Attrs {
}
export declare abstract class GroupBy extends Model {
    properties: GroupBy.Props;
    constructor(attrs?: Partial<GroupBy.Attrs>);
    abstract query_groups(models: Iterable<Model>, pool: Iterable<Model>): Iterable<Model[]>;
}
export declare namespace GroupByModels {
    type Attrs = p.AttrsOf<Props>;
    type Props = GroupBy.Props & {
        groups: p.Property<Model[][]>;
    };
}
export interface GroupByModels extends GroupByModels.Attrs {
}
export declare class GroupByModels extends GroupBy {
    properties: GroupByModels.Props;
    constructor(attrs?: Partial<GroupByModels.Attrs>);
    query_groups(models: Iterable<Model>, _pool: Iterable<Model>): Iterable<Model[]>;
}
export declare namespace GroupByName {
    type Attrs = p.AttrsOf<Props>;
    type Props = GroupBy.Props;
}
export interface GroupByName extends GroupByName.Attrs {
}
export declare class GroupByName extends GroupBy {
    properties: GroupByName.Props;
    constructor(attrs?: Partial<GroupByName.Attrs>);
    query_groups(models: Model[], pool: Model[]): Iterable<Model[]>;
}
//# sourceMappingURL=group_by.d.ts.map