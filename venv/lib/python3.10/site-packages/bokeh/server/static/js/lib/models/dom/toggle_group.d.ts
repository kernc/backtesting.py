import { Action, ActionView } from "./action";
import { RendererGroup } from "../renderers/renderer_group";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index as DataIndex } from "../../core/util/templating";
import type * as p from "../../core/properties";
export declare class ToggleGroupView extends ActionView {
    model: ToggleGroup;
    update(_source: ColumnarDataSource, i: DataIndex | null, _vars: object): void;
}
export declare namespace ToggleGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = Action.Props & {
        groups: p.Property<RendererGroup[]>;
    };
}
export interface ToggleGroup extends ToggleGroup.Attrs {
}
export declare class ToggleGroup extends Action {
    properties: ToggleGroup.Props;
    __view_type__: ToggleGroupView;
    constructor(attrs?: Partial<ToggleGroup.Attrs>);
}
//# sourceMappingURL=toggle_group.d.ts.map