import { DOMElement, DOMElementView } from "./dom_element";
import { HasProps } from "../../core/has_props";
import type * as p from "../../core/properties";
export declare class ValueOfView extends DOMElementView {
    model: ValueOf;
    connect_signals(): void;
    render(): void;
}
export declare namespace ValueOf {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props & {
        obj: p.Property<HasProps>;
        attr: p.Property<string>;
    };
}
export interface ValueOf extends ValueOf.Attrs {
}
export declare class ValueOf extends DOMElement {
    properties: ValueOf.Props;
    __view_type__: ValueOfView;
    constructor(attrs?: Partial<ValueOf.Attrs>);
}
//# sourceMappingURL=value_of.d.ts.map