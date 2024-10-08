import { DOMElement, DOMElementView } from "./dom_element";
import { Action } from "./action";
import type { Formatters } from "./placeholder";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index } from "../../core/util/templating";
import type { ViewStorage, IterViews } from "../../core/build_views";
import type { PlainObject } from "../../core/types";
import type * as p from "../../core/properties";
export declare class TemplateView extends DOMElementView {
    model: Template;
    readonly action_views: ViewStorage<Action>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    update(source: ColumnarDataSource, i: Index | null, vars: PlainObject, formatters?: Formatters): void;
}
export declare namespace Template {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props & {
        actions: p.Property<Action[]>;
    };
}
export interface Template extends Template.Attrs {
}
export declare class Template extends DOMElement {
    properties: Template.Props;
    __view_type__: TemplateView;
}
//# sourceMappingURL=template.d.ts.map