import { Mapper } from "./mapper";
import type { Factor } from "../ranges/factor_range";
import type * as p from "../../core/properties";
import { Signal0 } from "../../core/signaling";
import type { Arrayable, Color, uint32, RGBAArray } from "../../core/types";
import type { NDArrayType } from "../../core/util/ndarray";
export interface RGBAMapper {
    v_compute(xs: Arrayable<number> | NDArrayType<number> | Arrayable<Factor> | NDArrayType<Factor>): RGBAArray;
}
export declare function _convert_color(color: Color): uint32;
export declare function _convert_palette(palette: Color[]): Uint32Array;
export declare namespace ColorMapper {
    type Attrs = p.AttrsOf<Props>;
    type Props = Mapper.Props & {
        palette: p.Property<Color[]>;
        nan_color: p.Property<Color>;
    };
}
export interface ColorMapper extends ColorMapper.Attrs {
}
export declare abstract class ColorMapper extends Mapper<Color> {
    properties: ColorMapper.Props;
    metrics_change: Signal0<this>;
    constructor(attrs?: Partial<ColorMapper.Attrs>);
    initialize(): void;
    v_compute(xs: Arrayable<number> | Arrayable<Factor | number | null>): Arrayable<Color>;
    get rgba_mapper(): RGBAMapper;
    protected _colors<T>(conv: (c: Color) => T): {
        nan_color: T;
    };
    protected abstract _v_compute<T>(xs: Arrayable<uint32> | Arrayable<Factor | number | null>, values: Arrayable<T>, palette: Arrayable<T>, colors: {
        nan_color: T;
    }): void;
    protected _v_compute_uint32(xs: Arrayable<uint32> | Arrayable<Factor | number | null>, values: Arrayable<uint32>, palette: Arrayable<uint32>, colors: {
        nan_color: uint32;
    }): void;
}
//# sourceMappingURL=color_mapper.d.ts.map