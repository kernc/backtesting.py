import type { SizeHint, Size, Margin } from "./types";
import { Layoutable } from "./layoutable";
import type { LRTB } from "../util/bbox";
import { BBox } from "../util/bbox";
export declare class BorderLayout extends Layoutable {
    [Symbol.iterator](): Generator<Layoutable, void, unknown>;
    top_panel: Layoutable;
    bottom_panel: Layoutable;
    left_panel: Layoutable;
    right_panel: Layoutable;
    center_panel: Layoutable;
    inner_top_panel?: Layoutable;
    inner_bottom_panel?: Layoutable;
    inner_left_panel?: Layoutable;
    inner_right_panel?: Layoutable;
    aligns: LRTB<boolean>;
    min_border: Margin;
    padding: Margin;
    center_border_width: number;
    protected _measure(viewport: Size): SizeHint;
    protected _set_geometry(outer: BBox, inner: BBox): void;
}
//# sourceMappingURL=border.d.ts.map