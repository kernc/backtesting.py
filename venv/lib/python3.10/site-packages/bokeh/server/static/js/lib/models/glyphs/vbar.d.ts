import { LRTB, LRTBView } from "./lrtb";
import type { LRTBRect } from "./lrtb";
import * as p from "../../core/properties";
export interface VBarView extends VBar.Data {
}
export declare class VBarView extends LRTBView {
    model: VBar;
    visuals: VBar.Visuals;
    scenterxy(i: number): [number, number];
    protected _lrtb(i: number): LRTBRect;
    protected _map_data(): void;
}
export declare namespace VBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = LRTB.Props & {
        x: p.XCoordinateSpec;
        bottom: p.YCoordinateSpec;
        width: p.DistanceSpec;
        top: p.YCoordinateSpec;
    };
    type Visuals = LRTB.Visuals;
    type Data = LRTB.Data & p.GlyphDataOf<Props>;
}
export interface VBar extends VBar.Attrs {
}
export declare class VBar extends LRTB {
    properties: VBar.Props;
    __view_type__: VBarView;
    constructor(attrs?: Partial<VBar.Attrs>);
}
//# sourceMappingURL=vbar.d.ts.map