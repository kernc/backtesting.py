import type { Anchor, AutoAnchor, TextAnchor, HAnchor, VAnchor, BorderRadius, Padding } from "./kinds";
import type { TextAlign, TextBaseline } from "../../core/enums";
import type { XY, LRTB, Corners } from "../../core/util/bbox";
export declare function normalized_anchor(anchor: AutoAnchor): {
    x: HAnchor | "auto";
    y: VAnchor | "auto";
};
export declare function anchor(anchor: Anchor): XY<number>;
export declare function anchor(anchor: AutoAnchor): XY<number | "auto">;
export declare function text_anchor(text_anchor: TextAnchor, align: TextAlign, baseline: TextBaseline): XY<number>;
export declare function padding(padding: Padding): LRTB<number>;
export declare function border_radius(border_radius: BorderRadius): Corners<number>;
//# sourceMappingURL=resolve.d.ts.map