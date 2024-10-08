import { HasProps } from "./core/has_props";
import { ModelResolver } from "./core/resolvers";
export declare const default_resolver: ModelResolver;
export declare const Models: ModelResolver & {
    readonly [key: string]: typeof HasProps;
};
export declare function register_models(models: {
    [key: string]: unknown;
} | unknown[], force?: boolean): void;
//# sourceMappingURL=base.d.ts.map