import type { AngleUnits, Direction } from "../enums";
declare const PI: number, abs: (x: number) => number, sqrt: (x: number) => number;
export { PI, abs, sqrt };
export declare function angle_norm(angle: number): number;
export declare function angle_dist(lhs: number, rhs: number): number;
export declare function angle_between(mid: number, lhs: number, rhs: number, anticlock?: boolean): boolean;
export declare function randomIn(min: number, max?: number): number;
export declare function atan2(start: [number, number], end: [number, number]): number;
export declare function radians(degrees: number): number;
export declare function degrees(radians: number): number;
export declare function compute_angle(angle: number, units: AngleUnits, dir?: Direction): number;
export declare const resolve_angle: typeof compute_angle;
export declare function invert_angle(angle: number, units: AngleUnits, dir?: Direction): number;
export declare function to_radians_coeff(units: AngleUnits): number;
export declare function minmax(v0: number, v1: number): [number, number];
export declare function clamp(val: number, min: number, max: number): number;
export declare function cycle(val: number, min: number, max: number): number;
export declare function log(x: number, base?: number): number;
export declare function gcd(a: number, b: number): number;
export declare function lcm(a: number, ...rest: number[]): number;
export declare const float: unique symbol;
export interface Floating {
    [float](): number;
}
export declare function is_Floating<T>(obj: T): obj is T & Floating;
export declare class Fraction implements Floating {
    readonly numer: number;
    readonly denom: number;
    constructor(numer: number, denom: number);
    [float](): number;
    toString(): string;
}
export declare const float32_epsilon = 1.1920928955078125e-7;
export declare function factorial(x: number): number;
type Poly = number[];
export declare function hermite(n: number): Poly;
export declare function eval_poly(poly: Poly, x: number): number;
//# sourceMappingURL=math.d.ts.map