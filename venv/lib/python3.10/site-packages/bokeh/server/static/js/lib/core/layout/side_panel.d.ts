import type { Size } from "./types";
import { Sizeable } from "./types";
import { ContentLayoutable } from "./layoutable";
import type { Side, Face, Orientation } from "../enums";
export type Orient = "parallel" | "normal" | "horizontal" | "vertical";
type VerticalAlign = "top" | "center" | "baseline" | "bottom";
type Align = "left" | "center" | "right";
export type Dimension = 0 | 1;
export type Normal = -1 | 0 | 1;
export declare class SidePanel {
    readonly side: Side;
    readonly face: Face;
    readonly dimension: Dimension;
    readonly orientation: Orientation;
    readonly is_horizontal: boolean;
    readonly is_vertical: boolean;
    readonly normals: [Normal, Normal];
    constructor(side: Side, face?: Face | "auto");
    get face_adjusted_side(): Side;
    get_label_text_heuristics(orient: Orient | number): {
        vertical_align: VerticalAlign;
        align: Align;
    };
    get_label_angle_heuristic(orient: Orient | number): number;
}
export declare class SideLayout extends ContentLayoutable {
    readonly panel: SidePanel;
    readonly get_size: () => Size;
    readonly rotate: boolean;
    constructor(panel: SidePanel, get_size: () => Size, rotate?: boolean);
    protected _content_size(): Sizeable;
    has_size_changed(): boolean;
}
export {};
//# sourceMappingURL=side_panel.d.ts.map