import type { Document } from "./document";
import type { Data } from "../core/types";
import type { HasProps } from "../core/has_props";
import type { Ref } from "../core/util/refs";
import type { PatchSet } from "../core/patching";
import type { Equatable, Comparator } from "../core/util/eq";
import { equals } from "../core/util/eq";
import type { Serializable, Serializer, ModelRep } from "../core/serialization";
import { serialize } from "../core/serialization";
export type ModelChanged = {
    kind: "ModelChanged";
    model: Ref;
    attr: string;
    new: unknown;
};
export type MessageSent = {
    kind: "MessageSent";
    msg_type: string;
    msg_data?: unknown;
};
export type TitleChanged = {
    kind: "TitleChanged";
    title: string;
};
export type RootAdded = {
    kind: "RootAdded";
    model: ModelRep;
};
export type RootRemoved = {
    kind: "RootRemoved";
    model: Ref;
};
export type ColumnDataChanged = {
    kind: "ColumnDataChanged";
    model: Ref;
    attr: string;
    data: unknown;
    cols?: string[];
};
export type ColumnsStreamed = {
    kind: "ColumnsStreamed";
    model: Ref;
    attr: string;
    data: unknown;
    rollover?: number;
};
export type ColumnsPatched = {
    kind: "ColumnsPatched";
    model: Ref;
    attr: string;
    patches: unknown;
};
export type DocumentChanged = ModelChanged | MessageSent | TitleChanged | RootAdded | RootRemoved | ColumnDataChanged | ColumnsStreamed | ColumnsPatched;
export declare namespace Decoded {
    type ModelChanged = {
        kind: "ModelChanged";
        model: HasProps;
        attr: string;
        new: unknown;
    };
    type MessageSent = {
        kind: "MessageSent";
        msg_type: string;
        msg_data?: unknown;
    };
    type TitleChanged = {
        kind: "TitleChanged";
        title: string;
    };
    type RootAdded = {
        kind: "RootAdded";
        model: HasProps;
    };
    type RootRemoved = {
        kind: "RootRemoved";
        model: HasProps;
    };
    type ColumnDataChanged = {
        kind: "ColumnDataChanged";
        model: HasProps;
        attr: string;
        data: Data;
        cols?: string[];
    };
    type ColumnsStreamed = {
        kind: "ColumnsStreamed";
        model: HasProps;
        attr: string;
        data: Data;
        rollover?: number;
    };
    type ColumnsPatched = {
        kind: "ColumnsPatched";
        model: HasProps;
        attr: string;
        patches: PatchSet<unknown>;
    };
    type DocumentChanged = ModelChanged | MessageSent | TitleChanged | RootAdded | RootRemoved | ColumnDataChanged | ColumnsStreamed | ColumnsPatched;
}
export declare abstract class DocumentEvent implements Equatable {
    readonly document: Document;
    constructor(document: Document);
    get [Symbol.toStringTag](): string;
    [equals](that: this, cmp: Comparator): boolean;
    /**
     * Indicates whether this event should be emitted internally within bokehjs,
     * or whether it should also be synchronized with the server, if any session
     * is listening for such events.
     */
    sync: boolean;
}
export declare class DocumentEventBatch<T extends DocumentChangedEvent> extends DocumentEvent {
    readonly events: T[];
    constructor(document: Document, events: T[]);
    [equals](that: this, cmp: Comparator): boolean;
}
export declare abstract class DocumentChangedEvent extends DocumentEvent implements Serializable {
    readonly abstract kind: string;
    abstract [serialize](serializer: Serializer): DocumentChanged;
}
export declare class MessageSentEvent extends DocumentChangedEvent {
    readonly msg_type: string;
    readonly msg_data: unknown;
    kind: "MessageSent";
    constructor(document: Document, msg_type: string, msg_data: unknown);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): DocumentChanged;
}
export declare class ModelChangedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    readonly attr: string;
    readonly value: unknown;
    kind: "ModelChanged";
    constructor(document: Document, model: HasProps, attr: string, value: unknown);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): DocumentChanged;
}
export declare class ColumnDataChangedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    readonly attr: string;
    readonly data: Data;
    readonly cols?: string[] | undefined;
    kind: "ColumnDataChanged";
    constructor(document: Document, model: HasProps, attr: string, data: Data, cols?: string[] | undefined);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): ColumnDataChanged;
}
export declare class ColumnsStreamedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    readonly attr: string;
    readonly data: Data;
    readonly rollover?: number | undefined;
    kind: "ColumnsStreamed";
    constructor(document: Document, model: HasProps, attr: string, data: Data, rollover?: number | undefined);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): ColumnsStreamed;
}
export declare class ColumnsPatchedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    readonly attr: string;
    readonly patches: PatchSet<unknown>;
    kind: "ColumnsPatched";
    constructor(document: Document, model: HasProps, attr: string, patches: PatchSet<unknown>);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): ColumnsPatched;
}
export declare class TitleChangedEvent extends DocumentChangedEvent {
    readonly title: string;
    kind: "TitleChanged";
    constructor(document: Document, title: string);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](_serializer: Serializer): TitleChanged;
}
export declare class RootAddedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    kind: "RootAdded";
    constructor(document: Document, model: HasProps);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](serializer: Serializer): RootAdded;
}
export declare class RootRemovedEvent extends DocumentChangedEvent {
    readonly model: HasProps;
    kind: "RootRemoved";
    constructor(document: Document, model: HasProps);
    [equals](that: this, cmp: Comparator): boolean;
    [serialize](_serializer: Serializer): RootRemoved;
}
//# sourceMappingURL=events.d.ts.map