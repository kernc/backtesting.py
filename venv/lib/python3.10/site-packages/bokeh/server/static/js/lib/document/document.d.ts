import type { Class } from "../core/class";
import type { HasProps } from "../core/has_props";
import { ModelResolver } from "../core/resolvers";
import type { ModelRep } from "../core/serialization";
import type { ID } from "../core/types";
import { Signal0 } from "../core/signaling";
import type { Equatable, Comparator } from "../core/util/eq";
import { equals } from "../core/util/eq";
import type { CallbackLike } from "../core/util/callbacks";
import { Model } from "../model";
import type { ModelDef } from "./defs";
import type { BokehEvent, BokehEventType, BokehEventMap } from "../core/bokeh_events";
import { ModelEvent } from "../core/bokeh_events";
import type { DocumentEvent, DocumentChangedEvent, DocumentChanged } from "./events";
import type { ViewManager } from "../core/view_manager";
export type Out<T> = T;
export type DocumentEventCallback<T extends BokehEvent = BokehEvent> = CallbackLike<Document, [T]>;
export declare class EventManager {
    readonly document: Document;
    readonly subscribed_models: Set<Model>;
    constructor(document: Document);
    send_event(bokeh_event: BokehEvent): void;
    trigger(event: ModelEvent): void;
}
export type DocJson = {
    version?: string;
    title?: string;
    defs?: ModelDef[];
    roots: ModelRep[];
    callbacks?: {
        [key: string]: ModelRep[];
    };
};
export type Patch = {
    events: DocumentChanged[];
};
export declare const documents: Document[];
export declare const DEFAULT_TITLE = "Bokeh Application";
export declare class Document implements Equatable {
    /** @experimental */
    views_manager?: ViewManager;
    readonly event_manager: EventManager;
    readonly idle: Signal0<this>;
    protected readonly _init_timestamp: number;
    protected readonly _resolver: ModelResolver;
    protected _title: string;
    protected _roots: HasProps[];
    _all_models: Map<ID, Model>;
    protected _new_models: Set<HasProps>;
    protected _all_models_freeze_count: number;
    protected _callbacks: Map<((event: DocumentEvent) => void) | ((event: DocumentChangedEvent) => void), boolean>;
    protected _document_callbacks: Map<string, DocumentEventCallback[]>;
    protected _message_callbacks: Map<string, Set<(data: unknown) => void>>;
    private _idle_roots;
    protected _interactive_timestamp: number | null;
    protected _interactive_plot: Model | null;
    protected _interactive_finalize: (() => void) | null;
    constructor(options?: {
        roots?: Iterable<HasProps>;
        resolver?: ModelResolver;
    });
    [equals](that: this, _cmp: Comparator): boolean;
    get all_models(): Set<HasProps>;
    get is_idle(): boolean;
    notify_idle(model: HasProps): void;
    clear(): void;
    interactive_start(plot: Model, finalize?: (() => void) | null): void;
    interactive_stop(): void;
    interactive_duration(): number;
    destructively_move(dest_doc: Document): void;
    protected _push_all_models_freeze(): void;
    protected _pop_all_models_freeze(): void;
    _invalidate_all_models(): void;
    protected _recompute_all_models(): void;
    roots(): HasProps[];
    protected _add_roots(...models: HasProps[]): boolean;
    protected _remove_root(model: HasProps): boolean;
    protected _set_title(title: string): boolean;
    add_root(model: HasProps, { sync }?: {
        sync?: boolean;
    }): void;
    remove_root(model: HasProps, { sync }?: {
        sync?: boolean;
    }): void;
    set_title(title: string, { sync }?: {
        sync?: boolean;
    }): void;
    title(): string;
    get_model_by_id(model_id: string): HasProps | null;
    get_model_by_name(name: string): HasProps | null;
    on_message(msg_type: string, callback: (msg_data: unknown) => void): void;
    remove_on_message(msg_type: string, callback: (msg_data: unknown) => void): void;
    protected _trigger_on_message(msg_type: string, msg_data: unknown): void;
    on_change(callback: (event: DocumentEvent) => void, allow_batches: true): void;
    on_change(callback: (event: DocumentChangedEvent) => void, allow_batches?: false): void;
    remove_on_change(callback: ((event: DocumentEvent) => void) | ((event: DocumentChangedEvent) => void)): void;
    _trigger_on_change(event: DocumentEvent): void;
    _trigger_on_event(event: BokehEvent): void;
    on_event<T extends BokehEventType>(event: T, ...callback: DocumentEventCallback<BokehEventMap[T]>[]): void;
    on_event<T extends BokehEvent>(event: Class<T>, ...callback: DocumentEventCallback<T>[]): void;
    to_json_string(include_defaults?: boolean): string;
    to_json(include_defaults?: boolean): DocJson;
    static from_json_string(s: string, events?: Out<DocumentEvent[]>): Document;
    private static _handle_version;
    static from_json(doc_json: DocJson, events?: Out<DocumentEvent[]>): Document;
    replace_with_json(json: DocJson): void;
    create_json_patch(events: DocumentChangedEvent[]): Patch;
    apply_json_patch(patch: Patch, buffers?: Map<ID, ArrayBuffer>): void;
}
//# sourceMappingURL=document.d.ts.map