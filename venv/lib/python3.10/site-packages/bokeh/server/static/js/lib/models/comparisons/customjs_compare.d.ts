import { Comparison } from "./comparison";
import type * as p from "../../core/properties";
import type { Dict } from "../../core/types";
export declare namespace CustomJSCompare {
    type Attrs = p.AttrsOf<Props>;
    type Props = Comparison.Props & {
        args: p.Property<Dict<unknown>>;
        code: p.Property<string>;
    };
}
export interface CustomJSCompare extends CustomJSCompare.Attrs {
}
export declare class CustomJSCompare extends Comparison {
    properties: CustomJSCompare.Props;
    constructor(attrs?: Partial<CustomJSCompare.Attrs>);
    get names(): string[];
    get values(): unknown[];
    private _make_func;
    compute(x: unknown, y: unknown): 0 | 1 | -1;
}
//# sourceMappingURL=customjs_compare.d.ts.map