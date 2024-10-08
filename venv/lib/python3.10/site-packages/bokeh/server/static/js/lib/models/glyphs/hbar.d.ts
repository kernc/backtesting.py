import { LRTB, LRTBView } from "./lrtb";
import type { LRTBRect } from "./lrtb";
import * as p from "../../core/properties";
export interface HBarView extends HBar.Data {
}
export declare class HBarView extends LRTBView {
    model: HBar;
    visuals: HBar.Visuals;
    scenterxy(i: number): [number, number];
    protected _lrtb(i: number): LRTBRect;
    protected _map_data(): void;
}
export declare namespace HBar {
    type Attrs = p.AttrsOf<Props>;
    type Props = LRTB.Props & {
        left: p.XCoordinateSpec;
        y: p.YCoordinateSpec;
        height: p.DistanceSpec;
        right: p.XCoordinateSpec;
    };
    type Visuals = LRTB.Visuals;
    type Data = LRTB.Data & p.GlyphDataOf<Props>;
}
export interface HBar extends HBar.Attrs {
}
export declare class HBar extends LRTB {
    properties: HBar.Props;
    __view_type__: HBarView;
    constructor(attrs?: Partial<HBar.Attrs>);
}
//# sourceMappingURL=hbar.d.ts.map