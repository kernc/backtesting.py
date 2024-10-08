import type { Size } from "./types";
import { BBox } from "./util/bbox";
import type { Context2d } from "./util/canvas";
import type { FontMetrics } from "./util/text";
import type { Rect } from "./util/affine";
import type * as visuals from "./visuals";
export declare const text_width: (text: string, font: string) => number;
export type Position = {
    sx: number;
    sy: number;
    x_anchor?: number | "left" | "center" | "right";
    y_anchor?: number | "top" | "center" | "baseline" | "bottom";
};
type Val = number | {
    value: number;
    unit: "px" | "%";
};
type Extents = {
    left: Val;
    right: Val;
    top: Val;
    bottom: Val;
};
type Padding = Val | [v: Val, h: Val] | [top: Val, right: Val, bottom: Val, left: Val] | Extents;
export type TextHeightMetric = "x" | "cap" | "ascent" | "x_descent" | "cap_descent" | "ascent_descent";
export declare abstract class GraphicsBox {
    _position: Position;
    angle?: number;
    width?: {
        value: number;
        unit: "%";
    };
    height?: {
        value: number;
        unit: "%";
    };
    padding?: Padding;
    font_size_scale: number;
    text_height_metric?: TextHeightMetric;
    align: "auto" | "left" | "center" | "right" | "justify";
    _base_font_size: number;
    _x_anchor: "left" | "center" | "right";
    _y_anchor: "top" | "center" | "baseline" | "bottom";
    set base_font_size(v: number | null | undefined);
    get base_font_size(): number;
    set position(p: Position);
    get position(): Position;
    abstract set visuals(v: visuals.Text["Values"] | visuals.Line["Values"] | visuals.Fill["Values"]);
    abstract _rect(): Rect;
    abstract _size(): Size;
    abstract paint(ctx: Context2d): void;
    infer_text_height(): TextHeightMetric;
    bbox(): BBox;
    size(): Size;
    rect(): Rect;
    paint_rect(ctx: Context2d): void;
    paint_bbox(ctx: Context2d): void;
}
export declare class TextBox extends GraphicsBox {
    text: string;
    color: string;
    outline_color: string;
    font: string;
    line_height: number;
    private _visual_align;
    set visuals(v: visuals.Text["Values"]);
    constructor({ text }: {
        text: string;
    });
    infer_text_height(): "cap" | "ascent_descent";
    _text_line(fmetrics: FontMetrics): {
        height: number;
        ascent: number;
        descent: number;
    };
    get nlines(): number;
    _size(): Size & {
        metrics: FontMetrics;
    };
    _computed_position(size: Size, metrics: FontMetrics, nlines: number): {
        x: number;
        y: number;
    };
    _rect(): Rect;
    paint(ctx: Context2d): void;
}
export declare class BaseExpo extends GraphicsBox {
    readonly base: GraphicsBox;
    readonly expo: GraphicsBox;
    constructor(base: GraphicsBox, expo: GraphicsBox);
    get children(): GraphicsBox[];
    set base_font_size(v: number);
    set position(p: Position);
    get position(): Position;
    set visuals(v: visuals.Text["Values"] | visuals.Line["Values"] | visuals.Fill["Values"]);
    _shift_scale(): number;
    infer_text_height(): TextHeightMetric;
    _rect(): Rect;
    _size(): Size;
    paint(ctx: Context2d): void;
    paint_bbox(ctx: Context2d): void;
    _computed_position(): {
        x: number;
        y: number;
    };
}
export declare class GraphicsBoxes {
    readonly items: GraphicsBox[];
    constructor(items: GraphicsBox[]);
    set base_font_size(v: number | null | undefined);
    get length(): number;
    set visuals(v: visuals.Text["Values"] | visuals.Line["Values"] | visuals.Fill["Values"]);
    set angle(a: number);
    max_size(): Size;
}
export {};
//# sourceMappingURL=graphics.d.ts.map