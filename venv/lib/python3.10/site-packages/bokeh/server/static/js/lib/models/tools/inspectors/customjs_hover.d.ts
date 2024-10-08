import { Model } from "../../../model";
import type * as p from "../../../core/properties";
import type { Dict } from "../../../core/types";
export declare namespace CustomJSHover {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        args: p.Property<Dict<unknown>>;
        code: p.Property<string>;
    };
}
export interface CustomJSHover extends CustomJSHover.Attrs {
}
export declare class CustomJSHover extends Model {
    properties: CustomJSHover.Props;
    constructor(attrs?: Partial<CustomJSHover.Attrs>);
    get values(): unknown[];
    _make_code(valname: string, formatname: string, varsname: string, fn: string): Function;
    format(value: unknown, format: string, special_vars: {
        [key: string]: unknown;
    }): string;
}
//# sourceMappingURL=customjs_hover.d.ts.map