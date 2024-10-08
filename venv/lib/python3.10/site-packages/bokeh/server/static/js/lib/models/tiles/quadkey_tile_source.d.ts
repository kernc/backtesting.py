import { MercatorTileSource } from "./mercator_tile_source";
import type * as p from "../../core/properties";
export declare namespace QUADKEYTileSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = MercatorTileSource.Props;
}
export interface QUADKEYTileSource extends QUADKEYTileSource.Attrs {
}
export declare class QUADKEYTileSource extends MercatorTileSource {
    properties: QUADKEYTileSource.Props;
    constructor(attrs?: Partial<QUADKEYTileSource.Attrs>);
    get_image_url(x: number, y: number, z: number): string;
}
//# sourceMappingURL=quadkey_tile_source.d.ts.map