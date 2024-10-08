import type { uint8, uint32, Color } from "../types";
export declare function byte(v: number): uint8;
export type RGBA = [R: uint8, G: uint8, B: uint8, A: uint8];
export declare function transparent(): RGBA;
export declare function encode_rgba([r, g, b, a]: RGBA): uint32;
export declare function decode_rgba(rgba: uint32): RGBA;
export declare function color2rgba(color: Color | null, alpha?: number): RGBA;
export declare function rgba2css([r, g, b, a]: RGBA): string;
export declare function color2css(color: Color | null, alpha?: number): string;
export declare function color2hex(color: Color | null, alpha?: number): string;
export declare function color2hexrgb(color: Color | null): string;
export declare function css4_parse(color: string): RGBA | null;
export declare function is_Color(value: unknown): value is Color;
export declare function is_dark([r, g, b]: RGBA): boolean;
export declare function brightness(color: Color): number;
export declare function luminance(color: Color): number;
//# sourceMappingURL=color.d.ts.map