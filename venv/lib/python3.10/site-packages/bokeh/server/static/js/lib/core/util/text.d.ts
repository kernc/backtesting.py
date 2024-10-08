export type BoxMetrics = {
    width: number;
    height: number;
    ascent: number;
    descent: number;
};
export type FontMetrics = {
    height: number;
    ascent: number;
    descent: number;
    cap_height: number;
    x_height: number;
};
export declare function font_metrics(font: string): FontMetrics;
export declare function parse_css_font_size(size: string): {
    value: number;
    unit: string;
} | null;
export declare function parse_css_length(size: string): {
    value: number;
    unit: string;
} | null;
//# sourceMappingURL=text.d.ts.map