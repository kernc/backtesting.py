import { Callback } from "./callback";
import type * as p from "../../core/properties";
import type { Model } from "../../model";
import type { Dict } from "../../core/types";
import type { ViewManager } from "../../core/view_manager";
type KV = {
    [key: string]: unknown;
};
type Context = {
    index: ViewManager;
};
type ESFunc = (args: KV, obj: Model, data: KV, context: Context) => Promise<unknown> | unknown;
type JSFunc = (this: Model, obj: Model, data: KV, context: Context) => Promise<unknown> | unknown;
type ESState = {
    func: ESFunc;
    module: true;
};
type JSState = {
    func: JSFunc;
    module: false;
};
type State = ESState | JSState;
export declare namespace CustomJS {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        args: p.Property<Dict<unknown>>;
        code: p.Property<string>;
        module: p.Property<"auto" | boolean>;
    };
}
export interface CustomJS extends CustomJS.Attrs {
}
export declare class CustomJS extends Callback {
    properties: CustomJS.Props;
    constructor(attrs?: Partial<CustomJS.Attrs>);
    connect_signals(): void;
    protected _compile_module(): Promise<ESFunc>;
    protected _compile_function(): Promise<JSFunc>;
    protected _is_es_module(code: string): boolean;
    protected _compile(): Promise<State>;
    private _state;
    state(): Promise<State>;
    execute(obj: Model, data?: KV): Promise<unknown>;
}
export {};
//# sourceMappingURL=customjs.d.ts.map