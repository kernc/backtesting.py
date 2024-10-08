import { ColorMapper } from "./color_mapper";
import type { Arrayable, Color } from "../../core/types";
import type * as p from "../../core/properties";
import { GlyphRenderer } from "../renderers/glyph_renderer";
export declare namespace ContinuousColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = ColorMapper.Props & {
        high: p.Property<number | null>;
        low: p.Property<number | null>;
        high_color: p.Property<Color | null>;
        low_color: p.Property<Color | null>;
        domain: p.Property<[GlyphRenderer, string | string[]][]>;
    };
}
export interface ContinuousColorMapper extends ContinuousColorMapper.Attrs {
}
export declare abstract class ContinuousColorMapper extends ColorMapper {
    properties: ContinuousColorMapper.Props;
    constructor(attrs?: Partial<ContinuousColorMapper.Attrs>);
    connect_signals(): void;
    update_data(): void;
    MatricsType: {
        min: number;
        max: number;
    };
    get metrics(): this["MatricsType"];
    protected _collect(domain: [GlyphRenderer, string | string[]][]): Generator<any, void, any>;
    protected _scan_data: {
        min: number;
        max: number;
    } | null;
    protected abstract scan(data: Arrayable<number>, n: number): {
        min: number;
        max: number;
    };
    _v_compute<T>(data: Arrayable<number>, values: Arrayable<T>, palette: Arrayable<T>, colors: {
        nan_color: T;
        low_color?: T;
        high_color?: T;
    }): void;
    protected _colors<T>(conv: (c: Color) => T): {
        nan_color: T;
        low_color?: T;
        high_color?: T;
    };
    protected cmap<T>(value: number, palette: Arrayable<T>, low_color: T, high_color: T): T;
    abstract index_to_value(index: number): number;
    abstract value_to_index(value: number, palette_length: number): number;
}
//# sourceMappingURL=continuous_color_mapper.d.ts.map