export type Listener = (obj: unknown) => void;
export declare class Diagnostics {
    protected readonly listeners: Set<Listener>;
    connect(listener: Listener): void;
    disconnect(listener: Listener): void;
    report(obj: unknown): void;
}
export declare const diagnostics: Diagnostics;
//# sourceMappingURL=diagnostics.d.ts.map