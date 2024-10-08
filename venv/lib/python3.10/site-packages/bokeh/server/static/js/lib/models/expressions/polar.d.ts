import { CoordinateTransform } from "../expressions/coordinate_transform";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import { Direction } from "../../core/enums";
import * as p from "../../core/properties";
export declare namespace PolarTransform {
    type Attrs = p.AttrsOf<Props>;
    type Props = CoordinateTransform.Props & {
        radius: p.DistanceSpec;
        angle: p.AngleSpec;
        direction: p.Property<Direction>;
    };
}
export interface PolarTransform extends PolarTransform.Attrs {
}
export declare class PolarTransform extends CoordinateTransform {
    properties: PolarTransform.Props;
    constructor(attrs?: Partial<PolarTransform.Attrs>);
    protected _v_compute(source: ColumnarDataSource): {
        x: Float64Array;
        y: Float64Array;
    };
}
//# sourceMappingURL=polar.d.ts.map