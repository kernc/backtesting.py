import { Model } from "../../model";
import type { Extent, Bounds } from "./tile_utils";
import type { Dict } from "../../core/types";
import type * as p from "../../core/properties";
export type Tile = {
    tile_coords: [number, number, number];
};
export declare namespace TileSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        url: p.Property<string>;
        tile_size: p.Property<number>;
        max_zoom: p.Property<number>;
        min_zoom: p.Property<number>;
        extra_url_vars: p.Property<Dict<string>>;
        attribution: p.Property<string>;
        x_origin_offset: p.Property<number>;
        y_origin_offset: p.Property<number>;
        initial_resolution: p.Property<number | null>;
    };
}
export interface TileSource extends TileSource.Attrs {
}
export declare abstract class TileSource extends Model {
    properties: TileSource.Props;
    constructor(attrs?: Partial<TileSource.Attrs>);
    tiles: Map<string, Tile>;
    initialize(): void;
    connect_signals(): void;
    string_lookup_replace(str: string, lookup: Dict<string>): string;
    protected _normalize_case(): void;
    protected _clear_cache(): void;
    tile_xyz_to_key(x: number, y: number, z: number): string;
    key_to_tile_xyz(key: string): [number, number, number];
    sort_tiles_from_center(tiles: [number, number, number, Bounds][], tile_extent: Extent): void;
    get_image_url(x: number, y: number, z: number): string;
    abstract tile_xyz_to_quadkey(x: number, y: number, z: number): string;
    abstract quadkey_to_tile_xyz(quadkey: string): [number, number, number];
    abstract children_by_tile_xyz(x: number, y: number, z: number): [number, number, number, Bounds][];
    abstract get_closest_parent_by_tile_xyz(x: number, y: number, z: number): [number, number, number];
    abstract get_tiles_by_extent(extent: Extent, level: number, tile_border?: number): [number, number, number, Bounds][];
    abstract get_level_by_extent(extent: Extent, height: number, width: number): number;
    abstract snap_to_zoom_level(extent: Extent, height: number, width: number, level: number): Extent;
    abstract normalize_xyz(x: number, y: number, z: number): [number, number, number];
}
//# sourceMappingURL=tile_source.d.ts.map