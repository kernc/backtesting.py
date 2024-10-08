import type { DOMComponentView } from "../dom_view";
import type { CanvasLayer } from "../util/canvas";
import type * as p from "../properties";
export type NameOf<Key extends string> = Key extends `text_${infer Name}` ? Name : never;
export type ValuesOf<T> = {
    [Key in keyof T & string as NameOf<Key>]: T[Key] extends p.Property<infer V> ? V : never;
};
export interface Paintable {
    request_paint(): void;
    readonly canvas: {
        create_layer(): CanvasLayer;
    };
}
export declare abstract class VisualProperties {
    readonly obj: DOMComponentView & Paintable;
    readonly prefix: string;
    /** @prototype */
    type: string;
    attrs: string[];
    private readonly _props;
    [Symbol.iterator](): Generator<p.Property<unknown>, void, undefined>;
    readonly css_prefix: string;
    constructor(obj: DOMComponentView & Paintable, prefix?: string);
    abstract get doit(): boolean;
    update(): void;
    protected _get_css_value(name: string): string;
}
export declare abstract class VisualUniforms {
    readonly obj: DOMComponentView & Paintable;
    readonly prefix: string;
    /** @prototype */
    type: string;
    attrs: string[];
    [Symbol.iterator](): Generator<p.Property<unknown>, void, undefined>;
    constructor(obj: DOMComponentView & Paintable, prefix?: string);
    abstract get doit(): boolean;
    update(): void;
}
//# sourceMappingURL=visual.d.ts.map