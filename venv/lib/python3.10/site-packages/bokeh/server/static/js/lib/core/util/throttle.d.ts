export type ThrottledFn = {
    (): Promise<void>;
    stop(): void;
};
export declare function throttle(func: () => void, wait: number): ThrottledFn;
//# sourceMappingURL=throttle.d.ts.map