import type { View } from "./view";
import type { Class } from "./class";
import type { Attrs, Data, Dict } from "./types";
import type { ISignalable } from "./signaling";
import { Signal0, Signal } from "./signaling";
import type { Ref } from "./util/refs";
import * as p from "./properties";
import type { Property } from "./properties";
import type { Serializable, Serializer, ObjectRefRep } from "./serialization";
import { serialize } from "./serialization";
import type { Document } from "../document/document";
import type { Equatable, Comparator } from "./util/eq";
import { equals } from "./util/eq";
import type { Printable, Printer } from "./util/pretty";
import { pretty } from "./util/pretty";
import type { Cloneable } from "./util/cloneable";
import { clone, Cloner } from "./util/cloneable";
import * as kinds from "./kinds";
import type { PatchSet } from "./patching";
type AttrsLike = Dict<unknown>;
export declare namespace HasProps {
    type Attrs = p.AttrsOf<Props>;
    type Props = {};
    type SetOptions = {
        check_eq?: boolean;
        silent?: boolean;
        sync?: boolean;
        no_change?: boolean;
    };
}
export interface HasProps extends HasProps.Attrs, ISignalable {
    constructor: Function & {
        __name__: string;
        __module__?: string;
        __qualified__: string;
    };
}
export type PropertyGenerator = Generator<Property, void, undefined>;
declare const HasProps_base: {
    new (): {
        connect<Args, Sender extends object>(signal: Signal<Args, Sender>, slot: import("./signaling").Slot<Args, Sender>): boolean;
        disconnect<Args, Sender extends object>(signal: Signal<Args, Sender>, slot: import("./signaling").Slot<Args, Sender>): boolean;
    };
};
export declare abstract class HasProps extends HasProps_base implements Equatable, Printable, Serializable, Cloneable {
    __view_type__: View;
    readonly id: string;
    get is_syncable(): boolean;
    get type(): string;
    static __name__: string;
    static __module__?: string;
    static get __qualified__(): string;
    static set __qualified__(qualified: string);
    get [Symbol.toStringTag](): string;
    /** @prototype */
    default_view?: Class<View, [View.Options]>;
    /** @prototype */
    _props: {
        [key: string]: {
            type: p.PropertyConstructor<unknown>;
            default_value: (self: HasProps) => unknown | p.Unset;
            options: p.PropertyOptions<unknown>;
        };
    };
    /** @prototype */
    _mixins: [string, object][];
    private static _fix_default;
    static define<T, HP extends HasProps = HasProps>(obj: Partial<p.DefineOf<T, HP>> | ((types: typeof kinds) => Partial<p.DefineOf<T, HP>>)): void;
    static internal<T>(obj: Partial<p.DefineOf<T>> | ((types: typeof kinds) => Partial<p.DefineOf<T>>)): void;
    static mixins<_T>(defs: Attrs | (Attrs | [string, Attrs])[]): void;
    static override<T>(obj: Partial<p.DefaultsOf<T>>): void;
    static toString(): string;
    toString(): string;
    document: Document | null;
    readonly destroyed: Signal0<this>;
    readonly change: Signal0<this>;
    readonly transformchange: Signal0<this>;
    readonly exprchange: Signal0<this>;
    readonly streaming: Signal0<this>;
    readonly patching: Signal<number[], this>;
    readonly properties: {
        [key: string]: Property;
    };
    property(name: string): Property;
    get attributes(): Attrs;
    [clone](cloner: Cloner): this;
    [equals](that: this, cmp: Comparator): boolean;
    [pretty](printer: Printer): string;
    [serialize](serializer: Serializer): ObjectRefRep;
    constructor(attrs?: {
        id: string;
    } | AttrsLike);
    initialize_props(vals: Dict<unknown>): void;
    finalize(): void;
    initialize(): void;
    assert_initialized(): void;
    connect_signals(): void;
    disconnect_signals(): void;
    destroy(): void;
    clone(attrs?: Partial<HasProps.Attrs>): this;
    private _watchers;
    protected _clear_watchers(): void;
    changed_for(obj: object): boolean;
    private _pending;
    private _changing;
    private _setv;
    setv<T extends Attrs>(changed_attrs: Partial<T>, options?: HasProps.SetOptions): void;
    ref(): Ref;
    [Symbol.iterator](): PropertyGenerator;
    syncable_properties(): PropertyGenerator;
    own_properties(): PropertyGenerator;
    static _value_record_references(value: unknown, refs: Set<HasProps>, options: {
        recursive: boolean;
    }): void;
    static references(value: unknown, options: {
        recursive: boolean;
    }): Set<HasProps>;
    references(): Set<HasProps>;
    protected _doc_attached(): void;
    protected _doc_detached(): void;
    attach_document(doc: Document): void;
    detach_document(): void;
    protected _needs_invalidate(old_value: unknown, new_value: unknown): boolean;
    protected _push_changes(changes: [Property, unknown, unknown][], sync: boolean): void;
    on_change(properties: Property<unknown> | Property<unknown>[], fn: () => void): void;
    stream_to(prop: Property<Data>, new_data: Data, rollover?: number, { sync }?: {
        sync?: boolean;
    }): void;
    patch_to(prop: Property<Data>, patches: PatchSet<unknown>, { sync }?: {
        sync?: boolean;
    }): void;
}
export {};
//# sourceMappingURL=has_props.d.ts.map