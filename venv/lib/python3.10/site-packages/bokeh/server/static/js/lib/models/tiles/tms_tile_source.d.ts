import { MercatorTileSource } from "./mercator_tile_source";
import type * as p from "../../core/properties";
export declare namespace TMSTileSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = MercatorTileSource.Props;
}
export interface TMSTileSource extends TMSTileSource.Attrs {
}
export declare class TMSTileSource extends MercatorTileSource {
    properties: TMSTileSource.Props;
    constructor(attrs?: Partial<TMSTileSource.Attrs>);
    get_image_url(x: number, y: number, z: number): string;
}
//# sourceMappingURL=tms_tile_source.d.ts.map