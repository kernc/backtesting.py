import type { Constructor } from "../../core/kinds";
import type { HasProps } from "../../core/has_props";
export declare const Length: import("../../core/kinds").Kinds.NonNegative<number>;
export type Length = typeof Length["__type__"];
export declare const HAnchor: import("../../core/kinds").Kinds.Or<["start" | "center" | "end", "center" | "left" | "right", number]>;
export type HAnchor = typeof HAnchor["__type__"];
export declare const VAnchor: import("../../core/kinds").Kinds.Or<["start" | "center" | "end", "center" | "top" | "bottom", number]>;
export type VAnchor = typeof VAnchor["__type__"];
export declare const Anchor: import("../../core/kinds").Kinds.Or<["center" | "left" | "right" | "top" | "bottom" | "top_left" | "top_center" | "top_right" | "center_left" | "center_center" | "center_right" | "bottom_left" | "bottom_center" | "bottom_right", [number | "start" | "center" | "end" | "left" | "right", number | "start" | "center" | "end" | "top" | "bottom"]]>;
export type Anchor = typeof Anchor["__type__"];
export declare const AutoAnchor: import("../../core/kinds").Kinds.Or<["auto", "center" | "left" | "right" | "top" | "bottom" | "top_left" | "top_center" | "top_right" | "center_left" | "center_center" | "center_right" | "bottom_left" | "bottom_center" | "bottom_right", [number | "auto" | "start" | "center" | "end" | "left" | "right", number | "auto" | "start" | "center" | "end" | "top" | "bottom"]]>;
export type AutoAnchor = typeof AutoAnchor["__type__"];
export declare const TextAnchor: import("../../core/kinds").Kinds.Or<["center" | "left" | "right" | "top" | "bottom" | "top_left" | "top_center" | "top_right" | "center_left" | "center_center" | "center_right" | "bottom_left" | "bottom_center" | "bottom_right" | [number | "start" | "center" | "end" | "left" | "right", number | "start" | "center" | "end" | "top" | "bottom"], "auto"]>;
export type TextAnchor = typeof TextAnchor["__type__"];
export declare const Padding: import("../../core/kinds").Kinds.Or<[number, [number, number], Partial<{
    x: number;
    y: number;
}>, [number, number, number, number], Partial<{
    left: number;
    right: number;
    top: number;
    bottom: number;
}>]>;
export type Padding = typeof Padding["__type__"];
export declare const BorderRadius: import("../../core/kinds").Kinds.Or<[number, [number, number, number, number], Partial<{
    top_left: number;
    top_right: number;
    bottom_right: number;
    bottom_left: number;
}>]>;
export type BorderRadius = typeof BorderRadius["__type__"];
export declare const Index: import("../../core/kinds").Kinds.NonNegative<number>;
export type Index = typeof Index["__type__"];
export declare const Span: import("../../core/kinds").Kinds.NonNegative<number>;
export type Span = typeof Span["__type__"];
export declare const GridChild: <T extends HasProps>(child: Constructor<T>) => import("../../core/kinds").Kinds.Tuple<[T, number, number, number | undefined, number | undefined]>;
export declare const GridSpacing: import("../../core/kinds").Kinds.Or<[number, [number, number]]>;
export type GridSpacing = typeof GridSpacing["__type__"];
export declare const TrackAlign: import("../../core/kinds").Kinds.Enum<"auto" | "start" | "center" | "end">;
export type TrackAlign = typeof TrackAlign["__type__"];
export declare const TrackSize: import("../../core/kinds").Kinds.Str;
export type TrackSize = typeof TrackSize["__type__"];
export declare const TrackSizing: import("../../core/kinds").Kinds.PartialStruct<{
    size: string;
    align: "auto" | "start" | "center" | "end";
}>;
export type TrackSizing = typeof TrackSizing["__type__"];
export declare const TrackSizingLike: import("../../core/kinds").Kinds.Or<[string, Partial<{
    size: string;
    align: "auto" | "start" | "center" | "end";
}>]>;
export type TrackSizingLike = typeof TrackSizingLike["__type__"];
export declare const TracksSizing: import("../../core/kinds").Kinds.Or<[string | Partial<{
    size: string;
    align: "auto" | "start" | "center" | "end";
}>, (string | Partial<{
    size: string;
    align: "auto" | "start" | "center" | "end";
}>)[], Map<number, string | Partial<{
    size: string;
    align: "auto" | "start" | "center" | "end";
}>>]>;
export type TracksSizing = typeof TracksSizing["__type__"];
//# sourceMappingURL=kinds.d.ts.map