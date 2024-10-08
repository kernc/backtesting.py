import type { DocJson } from "../document";
import { Message } from "../protocol/message";
import { Receiver } from "../protocol/receiver";
import { ClientSession } from "./session";
export declare const DEFAULT_SERVER_WEBSOCKET_URL = "ws://localhost:5006/ws";
export declare const DEFAULT_TOKEN = "eyJzZXNzaW9uX2lkIjogImRlZmF1bHQifQ";
export type Rejecter = (error: Error | string) => void;
export type SessionResolver = (s: ClientSession) => void;
export type MessageResolver = (m: Message<unknown>) => void;
export type PendingReply = {
    resolve: MessageResolver;
    reject: Rejecter;
};
export type Token = {
    session_expiry: number;
    session_id: string;
    [key: string]: unknown;
};
export declare function parse_token(token: string): Token;
export declare class ClientConnection {
    readonly url: string;
    readonly token: string;
    readonly args_string: string | null;
    protected readonly _number: number;
    socket: WebSocket | null;
    session: ClientSession | null;
    closed_permanently: boolean;
    id: string;
    protected _current_handler: ((message: Message<unknown>) => void) | null;
    protected _pending_replies: Map<string, PendingReply>;
    protected _pending_messages: Message<unknown>[];
    protected readonly _receiver: Receiver;
    constructor(url?: string, token?: string, args_string?: string | null);
    connect(): Promise<ClientSession>;
    close(): void;
    protected _schedule_reconnect(milliseconds: number): void;
    send(message: Message<unknown>): void;
    send_with_reply<T>(message: Message<unknown>): Promise<Message<T>>;
    protected _pull_doc_json(): Promise<DocJson>;
    protected _repull_session_doc(resolve: SessionResolver, reject: Rejecter): Promise<void>;
    protected _on_open(resolve: SessionResolver, reject: Rejecter): void;
    protected _on_message(event: MessageEvent): void;
    protected _on_close(event: CloseEvent, reject: Rejecter): void;
    protected _on_error(reject: Rejecter): void;
    protected _close_bad_protocol(detail: string): void;
    protected _awaiting_ack_handler(message: Message<unknown>, resolve: SessionResolver, reject: Rejecter): void;
    protected _steady_state_handler(message: Message<unknown>): void;
}
export declare function pull_session(url?: string, token?: string, args_string?: string): Promise<ClientSession>;
//# sourceMappingURL=connection.d.ts.map