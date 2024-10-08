import { HasProps } from "../core/has_props";
import type * as p from "../core/properties";
declare class ThemedAttrs<T extends typeof HasProps> {
    readonly type: T;
    readonly attrs: Partial<p.AttrsOf<T["prototype"]["properties"]>>;
    readonly defaults: Map<string, unknown>;
    constructor(type: T, attrs: Partial<p.AttrsOf<T["prototype"]["properties"]>>);
}
declare class Theme implements p.Theme {
    readonly attrs: ThemedAttrs<typeof HasProps>[];
    constructor(attrs: ThemedAttrs<typeof HasProps>[]);
    get(obj: HasProps | typeof HasProps, attr: string): unknown | undefined;
}
export declare const dark_minimal: Theme;
export declare const light_minimal: Theme;
export declare const caliber: Theme;
export declare const constrast: Theme;
export declare const night_sky: Theme;
export {};
//# sourceMappingURL=themes.d.ts.map