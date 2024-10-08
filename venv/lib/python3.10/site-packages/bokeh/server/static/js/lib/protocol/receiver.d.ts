import { Message } from "./message";
export type Fragment = string | ArrayBuffer;
export declare class Receiver {
    message: Message<unknown> | null;
    protected _partial: Message<unknown> | null;
    protected _fragments: [string?, string?, string?];
    protected _buf_header: string | null;
    protected _current_consumer: (fragment: Fragment) => void;
    consume(fragment: Fragment): void;
    _HEADER(fragment: Fragment): void;
    _METADATA(fragment: Fragment): void;
    _CONTENT(fragment: Fragment): void;
    _BUFFER_HEADER(fragment: Fragment): void;
    _BUFFER_PAYLOAD(fragment: Fragment): void;
    private _assume_text;
    private _assume_binary;
    private _check_complete;
}
//# sourceMappingURL=receiver.d.ts.map