import { DOMElement, DOMElementView } from "./dom_element";
import { CustomJS } from "../callbacks/customjs";
import { CustomJSHover } from "../tools/inspectors/customjs_hover";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index as DataIndex } from "../../core/util/templating";
import type * as p from "../../core/properties";
import type { Dict, PlainObject } from "../../core/types";
export declare const Formatter: import("../../core/kinds").Kinds.Or<["raw" | "basic" | "numeral" | "printf" | "datetime", CustomJS, CustomJSHover]>;
export type Formatter = typeof Formatter["__type__"];
export type Formatters = Dict<Formatter>;
export declare abstract class PlaceholderView extends DOMElementView {
    model: Placeholder;
    static tag_name: "span";
    abstract update(source: ColumnarDataSource, i: DataIndex | null, vars: PlainObject<unknown>, formatters?: Formatters): void;
}
export declare namespace Placeholder {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props;
}
export interface Placeholder extends Placeholder.Attrs {
}
export declare abstract class Placeholder extends DOMElement {
    properties: Placeholder.Props;
    __view_type__: PlaceholderView;
    constructor(attrs?: Partial<Placeholder.Attrs>);
}
//# sourceMappingURL=placeholder.d.ts.map