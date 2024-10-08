import { Node } from "../coordinates/node";
export declare const Corner: import("../../core/kinds").Kinds.Enum<"top_left" | "top_right" | "bottom_left" | "bottom_right">;
export type Corner = typeof Corner["__type__"];
export declare const Edge: import("../../core/kinds").Kinds.Enum<"left" | "right" | "top" | "bottom">;
export type Edge = typeof Edge["__type__"];
export declare const HitTarget: import("../../core/kinds").Kinds.Enum<"area" | "left" | "right" | "top" | "bottom" | "top_left" | "top_right" | "bottom_left" | "bottom_right">;
export type HitTarget = typeof HitTarget["__type__"];
export declare const Resizable: import("../../core/kinds").Kinds.Enum<"left" | "right" | "top" | "bottom" | "none" | "all" | "x" | "y">;
export type Resizable = typeof Resizable["__type__"];
export declare const Movable: import("../../core/kinds").Kinds.Enum<"none" | "both" | "x" | "y">;
export type Movable = typeof Movable["__type__"];
export declare const Limit: import("../../core/kinds").Kinds.Nullable<number | Node>;
export type Limit = typeof Limit["__type__"];
//# sourceMappingURL=box_kinds.d.ts.map