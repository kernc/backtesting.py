import { GMapPlot, GMapPlotView } from "./gmap_plot";
import type * as p from "../../core/properties";
export declare class GMapView extends GMapPlotView {
    model: GMap;
}
export declare namespace GMap {
    type Attrs = p.AttrsOf<Props>;
    type Props = GMapPlot.Props;
}
export interface GMap extends GMap.Attrs {
}
export declare class GMap extends GMapPlot {
    properties: GMap.Props;
    __view_type__: GMapView;
    constructor(attrs?: Partial<GMap.Attrs>);
}
//# sourceMappingURL=gmap.d.ts.map