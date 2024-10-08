import type { Transform } from "./base";
import { BaseLineGL } from "./base_line";
import type { BaseLineVisuals } from "./base_line";
import type { ReglWrapper } from "./regl_wrap";
import type { MultiLineView } from "../multi_line";
export declare class MultiLineGL extends BaseLineGL {
    readonly glyph: MultiLineView;
    constructor(regl_wrapper: ReglWrapper, glyph: MultiLineView);
    draw(indices: number[], main_glyph: MultiLineView, transform: Transform): void;
    protected _get_visuals(): BaseLineVisuals;
    protected _set_data(data_changed: boolean): void;
    protected _set_length(): void;
}
//# sourceMappingURL=multi_line.d.ts.map