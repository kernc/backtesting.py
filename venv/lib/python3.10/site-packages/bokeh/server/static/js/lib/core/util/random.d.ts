export declare const MAX_INT32 = 2147483647;
export declare abstract class AbstractRandom {
    abstract integer(): number;
    float(): number;
    floats(n: number, a?: number, b?: number): number[];
    choices<T>(n: number, items: ArrayLike<T>): T[];
    uniform(loc: number, scale: number): number;
    uniforms(loc: number, scale: number, size: number): Float64Array;
    normal(loc: number, scale: number): number;
    normals(loc: number, scale: number, size: number): Float64Array;
}
export declare class SystemRandom extends AbstractRandom {
    integer(): number;
}
export declare class LCGRandom extends AbstractRandom {
    private _seed;
    constructor(seed: number);
    integer(): number;
}
export declare class Random extends LCGRandom {
}
export declare const random: Random;
//# sourceMappingURL=random.d.ts.map