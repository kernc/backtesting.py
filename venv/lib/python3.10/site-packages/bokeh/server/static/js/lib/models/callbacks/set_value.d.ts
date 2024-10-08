import { Callback } from "./callback";
import { HasProps } from "../../core/has_props";
import type * as p from "../../core/properties";
export declare namespace SetValue {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        obj: p.Property<HasProps>;
        attr: p.Property<string>;
        value: p.Property<unknown>;
    };
}
export interface SetValue extends SetValue.Attrs {
}
export declare class SetValue extends Callback {
    properties: SetValue.Props;
    constructor(attrs?: Partial<SetValue.Attrs>);
    execute(): void;
}
//# sourceMappingURL=set_value.d.ts.map