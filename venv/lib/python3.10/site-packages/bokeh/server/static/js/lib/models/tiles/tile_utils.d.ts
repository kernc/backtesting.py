export declare function geographic_to_meters(x_lon: number, y_lat: number): [number, number];
export declare function meters_to_geographic(mx: number, my: number): [number, number];
export type Bounds = [number, number, number, number];
export type Extent = [number, number, number, number];
export declare function geographic_extent_to_meters(extent: Extent): Extent;
export declare function meters_extent_to_geographic(extent: Extent): Extent;
//# sourceMappingURL=tile_utils.d.ts.map