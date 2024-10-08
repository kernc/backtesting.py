import { DataAnnotation, DataAnnotationView } from "./data_annotation";
import type { Arrayable } from "../../core/types";
import type { CoordinateUnits } from "../../core/enums";
import { Dimension } from "../../core/enums";
import type { Dimensional } from "../../core/vectorization";
import * as p from "../../core/properties";
export declare abstract class UpperLowerView extends DataAnnotationView {
    model: UpperLower;
    visuals: UpperLower.Visuals;
    protected _lower: Arrayable<number>;
    protected _upper: Arrayable<number>;
    protected _base: Arrayable<number>;
    protected _lower_sx: Arrayable<number>;
    protected _lower_sy: Arrayable<number>;
    protected _upper_sx: Arrayable<number>;
    protected _upper_sy: Arrayable<number>;
    map_data(): void;
}
export declare class XOrYCoordinateSpec extends p.CoordinateSpec {
    readonly obj: UpperLower;
    protected _value: Dimensional<this["__vector__"], CoordinateUnits> | p.Unset;
    get dimension(): "x" | "y";
    get units(): CoordinateUnits;
}
export declare namespace UpperLower {
    type Attrs = p.AttrsOf<Props>;
    type Props = DataAnnotation.Props & {
        dimension: p.Property<Dimension>;
        lower: XOrYCoordinateSpec;
        upper: XOrYCoordinateSpec;
        base: XOrYCoordinateSpec;
    };
    type Visuals = DataAnnotation.Visuals;
}
export interface UpperLower extends UpperLower.Attrs {
}
export declare class UpperLower extends DataAnnotation {
    properties: UpperLower.Props;
    constructor(attrs?: Partial<UpperLower.Attrs>);
}
//# sourceMappingURL=upper_lower.d.ts.map