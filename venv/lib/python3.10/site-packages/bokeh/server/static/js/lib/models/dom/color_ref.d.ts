import { ValueRef, ValueRefView } from "./value_ref";
import type { Formatters } from "./placeholder";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Index } from "../../core/util/templating";
import type { PlainObject } from "../../core/types";
import type * as p from "../../core/properties";
export declare class ColorRefView extends ValueRefView {
    model: ColorRef;
    value_el?: HTMLElement;
    swatch_el?: HTMLElement;
    render(): void;
    update(source: ColumnarDataSource, i: Index | null, _vars: PlainObject, _formatters?: Formatters): void;
}
export declare namespace ColorRef {
    type Attrs = p.AttrsOf<Props>;
    type Props = ValueRef.Props & {
        hex: p.Property<boolean>;
        swatch: p.Property<boolean>;
    };
}
export interface ColorRef extends ColorRef.Attrs {
}
export declare class ColorRef extends ValueRef {
    properties: ColorRef.Props;
    __view_type__: ColorRefView;
    constructor(attrs?: Partial<ColorRef.Attrs>);
}
//# sourceMappingURL=color_ref.d.ts.map