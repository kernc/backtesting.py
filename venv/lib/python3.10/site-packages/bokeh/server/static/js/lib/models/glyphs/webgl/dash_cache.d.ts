import type { Regl, Texture2D } from "regl";
export type DashReturn = [[number, number, number, number], Texture2D, number];
type TextureReturn = [[number, number, number, number], Texture2D];
export declare class DashCache {
    private _regl;
    private _map;
    constructor(regl: Regl);
    protected _create_texture(pattern: number[]): TextureReturn;
    protected _get_key(pattern: number[]): string;
    _get_or_create(pattern: number[]): DashReturn;
    get(pattern: number[]): DashReturn;
}
export {};
//# sourceMappingURL=dash_cache.d.ts.map