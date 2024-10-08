export declare class AssertionError extends Error {
}
export declare class UnreachableError extends Error {
}
export declare function assert(condition: boolean | (() => boolean), message?: string): asserts condition;
export declare function assert_debug(condition: boolean | (() => boolean), message?: string): asserts condition;
export declare function unreachable(msg?: string): never;
//# sourceMappingURL=assert.d.ts.map