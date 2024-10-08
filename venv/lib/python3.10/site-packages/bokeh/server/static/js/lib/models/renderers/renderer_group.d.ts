import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare namespace RendererGroup {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        visible: p.Property<boolean>;
    };
}
export interface RendererGroup extends RendererGroup.Attrs {
}
export declare class RendererGroup extends Model {
    properties: RendererGroup.Props;
    constructor(attrs?: Partial<RendererGroup.Attrs>);
}
//# sourceMappingURL=renderer_group.d.ts.map