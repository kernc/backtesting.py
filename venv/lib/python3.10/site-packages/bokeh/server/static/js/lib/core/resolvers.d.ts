import type { HasProps } from "./has_props";
export declare class ModelResolver {
    readonly parent: ModelResolver | null;
    protected _known_models: Map<string, typeof HasProps>;
    constructor(parent: ModelResolver | null, models?: (typeof HasProps)[]);
    get(name: string): typeof HasProps | null;
    get<M extends typeof HasProps>(name: string): M | null;
    register(model: typeof HasProps, force?: boolean): void;
    get names(): string[];
}
//# sourceMappingURL=resolvers.d.ts.map