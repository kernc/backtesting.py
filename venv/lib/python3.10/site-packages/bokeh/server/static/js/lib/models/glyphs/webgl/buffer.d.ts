import type { ReglWrapper } from "./regl_wrap";
import type { LineCap, LineJoin } from "../../../core/enums";
import type { HatchPattern } from "../../../core/property_mixins";
import type { uint32, Arrayable } from "../../../core/types";
import type { Uniform } from "../../../core/uniforms";
import type { AttributeConfig, Buffer } from "regl";
type WrappedArrayType = Float32Array | Uint8Array;
declare abstract class WrappedBuffer<ArrayType extends WrappedArrayType> {
    protected regl_wrapper: ReglWrapper;
    protected buffer?: Buffer;
    protected array?: ArrayType;
    protected is_scalar: boolean;
    protected elements_per_primitive: number;
    constructor(regl_wrapper: ReglWrapper, elements_per_primitive?: number);
    protected abstract bytes_per_element(): number;
    get_array(): ArrayType;
    get_sized_array(length: number): ArrayType;
    protected is_normalized(): boolean;
    get length(): number;
    protected abstract new_array(len: number): ArrayType;
    set_from_array(numbers: Arrayable<number>): void;
    set_from_prop(prop: Uniform<number>): void;
    set_from_scalar(scalar: number): void;
    to_attribute_config(offset?: number, scalar_divisor?: number): AttributeConfig;
    to_attribute_config_nested(offset_vector?: number, divisor?: number): AttributeConfig;
    update(is_scalar?: boolean): void;
}
export declare class Float32Buffer extends WrappedBuffer<Float32Array> {
    protected bytes_per_element(): number;
    protected new_array(len: number): Float32Array;
}
export declare class Uint8Buffer extends WrappedBuffer<Uint8Array> {
    protected bytes_per_element(): number;
    protected new_array(len: number): Uint8Array;
    set_from_color(color_prop: Uniform<uint32>, alpha_prop: Uniform<number>): void;
    set_from_hatch_pattern(hatch_pattern_prop: Uniform<HatchPattern>): void;
    set_from_line_cap(line_cap_prop: Uniform<LineCap>): void;
    set_from_line_join(line_join_prop: Uniform<LineJoin>): void;
}
export declare class NormalizedUint8Buffer extends Uint8Buffer {
    protected is_normalized(): boolean;
}
export {};
//# sourceMappingURL=buffer.d.ts.map