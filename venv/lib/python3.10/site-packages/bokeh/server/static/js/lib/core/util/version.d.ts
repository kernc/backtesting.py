import type { Equatable } from "./eq";
import { equals } from "./eq";
export declare enum ReleaseType {
    Dev = 0,
    Candidate = 1,
    Release = 2
}
export declare class Version implements Equatable {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly type: ReleaseType;
    readonly revision: number;
    readonly build: number;
    constructor(major: number, minor: number, patch: number, type?: ReleaseType, revision?: number, build?: number);
    static from(version: string): Version | null;
    toString(): string;
    [equals](that: this): boolean;
}
//# sourceMappingURL=version.d.ts.map