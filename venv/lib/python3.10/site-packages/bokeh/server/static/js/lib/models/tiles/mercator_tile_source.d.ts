import { TileSource } from "./tile_source";
import type * as p from "../../core/properties";
import type { Extent, Bounds } from "./tile_utils";
export declare namespace MercatorTileSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = TileSource.Props & {
        snap_to_zoom: p.Property<boolean>;
        wrap_around: p.Property<boolean>;
    };
}
export interface MercatorTileSource extends MercatorTileSource.Attrs {
}
export declare class MercatorTileSource extends TileSource {
    properties: MercatorTileSource.Props;
    constructor(attrs?: Partial<MercatorTileSource.Attrs>);
    protected _resolutions: number[];
    initialize(): void;
    protected _computed_initial_resolution(): number;
    is_valid_tile(x: number, y: number, z: number): boolean;
    parent_by_tile_xyz(x: number, y: number, z: number): [number, number, number];
    get_resolution(level: number): number;
    get_resolution_by_extent(extent: Extent, height: number, width: number): [number, number];
    get_level_by_extent(extent: Extent, height: number, width: number): number;
    get_closest_level_by_extent(extent: Extent, height: number, width: number): number;
    snap_to_zoom_level(extent: Extent, height: number, width: number, level: number): Extent;
    tms_to_wmts(x: number, y: number, z: number): [number, number, number];
    wmts_to_tms(x: number, y: number, z: number): [number, number, number];
    pixels_to_meters(px: number, py: number, level: number): [number, number];
    meters_to_pixels(mx: number, my: number, level: number): [number, number];
    pixels_to_tile(px: number, py: number): [number, number];
    pixels_to_raster(px: number, py: number, level: number): [number, number];
    meters_to_tile(mx: number, my: number, level: number): [number, number];
    get_tile_meter_bounds(tx: number, ty: number, level: number): Bounds;
    get_tile_geographic_bounds(tx: number, ty: number, level: number): Bounds;
    get_tiles_by_extent(extent: Extent, level: number, tile_border?: number): [number, number, number, Bounds][];
    quadkey_to_tile_xyz(quadKey: string): [number, number, number];
    tile_xyz_to_quadkey(x: number, y: number, z: number): string;
    children_by_tile_xyz(x: number, y: number, z: number): [number, number, number, Bounds][];
    get_closest_parent_by_tile_xyz(x: number, y: number, z: number): [number, number, number];
    normalize_xyz(x: number, y: number, z: number): [number, number, number];
    denormalize_xyz(x: number, y: number, z: number, world_x: number): [number, number, number];
    denormalize_meters(meters_x: number, meters_y: number, _level: number, world_x: number): [number, number];
    calculate_world_x_by_tile_xyz(x: number, _y: number, z: number): number;
}
//# sourceMappingURL=mercator_tile_source.d.ts.map