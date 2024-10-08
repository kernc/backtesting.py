import type { MarkingView } from "./marking";
import { Marking } from "./marking";
import type { RendererView } from "../renderers/renderer";
import { Model } from "../../model";
import { View } from "../../core/view";
import type { IterViews } from "../../core/build_views";
import type * as visuals from "../../core/visuals";
import type * as p from "../../core/properties";
export declare class DecorationView extends View {
    model: Decoration;
    visuals: Decoration.Visuals;
    readonly parent: RendererView;
    marking: MarkingView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
}
export declare namespace Decoration {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        marking: p.Property<Marking>;
        node: p.Property<"start" | "middle" | "end">;
    };
    type Visuals = visuals.Visuals;
}
export interface Decoration extends Decoration.Attrs {
}
export declare class Decoration extends Model {
    properties: Decoration.Props;
    __view_type__: DecorationView;
    constructor(attrs?: Partial<Decoration.Attrs>);
}
//# sourceMappingURL=decoration.d.ts.map