import { LRTB, LRTBView } from "./lrtb";
import type { LRTBRect } from "./lrtb";
import * as p from "../../core/properties";
export interface BlockView extends Block.Data {
}
export declare class BlockView extends LRTBView {
    model: Block;
    visuals: Block.Visuals;
    scenterxy(i: number): [number, number];
    protected _lrtb(i: number): LRTBRect;
    protected _map_data(): void;
}
export declare namespace Block {
    type Attrs = p.AttrsOf<Props>;
    type Props = LRTB.Props & {
        x: p.CoordinateSpec;
        y: p.CoordinateSpec;
        width: p.DistanceSpec;
        height: p.DistanceSpec;
    };
    type Visuals = LRTB.Visuals;
    type Data = LRTB.Data & p.GlyphDataOf<Props> & {
        readonly max_width: number;
    };
}
export interface Block extends Block.Attrs {
}
export declare class Block extends LRTB {
    properties: Block.Props;
    __view_type__: BlockView;
    constructor(attrs?: Partial<Block.Attrs>);
}
//# sourceMappingURL=block.d.ts.map