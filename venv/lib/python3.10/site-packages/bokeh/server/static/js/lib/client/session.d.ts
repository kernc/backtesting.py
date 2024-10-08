import type { Patch, Document, DocumentEvent } from "../document";
import { Message } from "../protocol/message";
import type { ClientConnection } from "./connection";
export type OkMsg = Message<{}>;
export type ErrorMsg = Message<{
    text: string;
    traceback: string | null;
}>;
export type PatchMsg = Message<Patch>;
export declare class ClientSession {
    protected readonly _connection: ClientConnection;
    readonly document: Document;
    protected _document_listener: (event: DocumentEvent) => void;
    constructor(_connection: ClientConnection, document: Document);
    get id(): string;
    handle(message: Message<unknown>): void;
    notify_connection_lost(): void;
    close(): void;
    _connection_closed(): void;
    request_server_info(): Promise<{
        version_info: string;
    }>;
    force_roundtrip(): Promise<void>;
    protected _document_changed(event: DocumentEvent): void;
    protected _handle_patch(message: PatchMsg): void;
    protected _handle_ok(message: OkMsg): void;
    protected _handle_error(message: ErrorMsg): void;
}
//# sourceMappingURL=session.d.ts.map