import type { Comparator, Equatable } from "../util/eq";
import { equals } from "../util/eq";
export declare class Buffer implements Equatable {
    readonly buffer: ArrayBuffer;
    constructor(buffer: ArrayBuffer);
    to_base64(): string;
    [equals](that: Buffer, cmp: Comparator): boolean;
}
export declare class Base64Buffer extends Buffer {
    toJSON(): string;
}
//# sourceMappingURL=buffer.d.ts.map