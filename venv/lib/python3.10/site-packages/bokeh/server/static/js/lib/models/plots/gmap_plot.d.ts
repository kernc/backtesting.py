import { Plot } from "./plot";
import type * as p from "../../core/properties";
import { MapType } from "../../core/enums";
import { Model } from "../../model";
import { GMapPlotView } from "./gmap_plot_canvas";
export { GMapPlotView };
export declare namespace MapOptions {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        lat: p.Property<number>;
        lng: p.Property<number>;
        zoom: p.Property<number>;
    };
}
export interface MapOptions extends MapOptions.Attrs {
}
export declare class MapOptions extends Model {
    properties: MapOptions.Props;
    constructor(attrs?: Partial<MapOptions.Attrs>);
}
export declare namespace GMapOptions {
    type Attrs = p.AttrsOf<Props>;
    type Props = MapOptions.Props & {
        map_type: p.Property<MapType>;
        scale_control: p.Property<boolean>;
        styles: p.Property<string | null>;
        tilt: p.Property<number>;
    };
}
export interface GMapOptions extends GMapOptions.Attrs {
}
export declare class GMapOptions extends MapOptions {
    properties: GMapOptions.Props;
    constructor(attrs?: Partial<GMapOptions.Attrs>);
}
export declare namespace GMapPlot {
    type Attrs = p.AttrsOf<Props>;
    type Props = Plot.Props & {
        map_options: p.Property<GMapOptions>;
        api_key: p.Property<ArrayBuffer>;
        api_version: p.Property<string>;
    };
}
export interface GMapPlot extends GMapPlot.Attrs {
}
export declare class GMapPlot extends Plot {
    properties: GMapPlot.Props;
    use_map: boolean;
    constructor(attrs?: Partial<GMapPlot.Attrs>);
}
//# sourceMappingURL=gmap_plot.d.ts.map