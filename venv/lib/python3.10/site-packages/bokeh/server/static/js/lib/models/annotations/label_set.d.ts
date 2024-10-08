import { DataAnnotation, DataAnnotationView } from "./data_annotation";
import * as mixins from "../../core/property_mixins";
import type * as visuals from "../../core/visuals";
import { CoordinateUnits } from "../../core/enums";
import * as p from "../../core/properties";
import type { FloatArray } from "../../core/types";
import { ScreenArray } from "../../core/types";
import type { Context2d } from "../../core/util/canvas";
export declare class LabelSetView extends DataAnnotationView {
    model: LabelSet;
    visuals: LabelSet.Visuals;
    protected _x: FloatArray;
    protected _y: FloatArray;
    protected sx: ScreenArray;
    protected sy: ScreenArray;
    protected text: p.Uniform<string | null>;
    protected angle: p.Uniform<number>;
    protected x_offset: p.Uniform<number>;
    protected y_offset: p.Uniform<number>;
    map_data(): void;
    _paint_data(): void;
    protected _paint_text(ctx: Context2d, i: number, text: string, sx: number, sy: number, angle: number): void;
}
export declare namespace LabelSet {
    type Attrs = p.AttrsOf<Props>;
    type Props = DataAnnotation.Props & {
        x: p.XCoordinateSpec;
        y: p.YCoordinateSpec;
        x_units: p.Property<CoordinateUnits>;
        y_units: p.Property<CoordinateUnits>;
        text: p.NullStringSpec;
        angle: p.AngleSpec;
        x_offset: p.NumberSpec;
        y_offset: p.NumberSpec;
    } & Mixins;
    type Mixins = mixins.TextVector & mixins.Prefixed<"border", mixins.LineVector> & mixins.Prefixed<"background", mixins.FillVector>;
    type Visuals = DataAnnotation.Visuals & {
        text: visuals.TextVector;
        border_line: visuals.LineVector;
        background_fill: visuals.FillVector;
    };
}
export interface LabelSet extends LabelSet.Attrs {
}
export declare class LabelSet extends DataAnnotation {
    properties: LabelSet.Props;
    __view_type__: LabelSetView;
    constructor(attrs?: Partial<LabelSet.Attrs>);
}
//# sourceMappingURL=label_set.d.ts.map