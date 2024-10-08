import { DataAnnotation, DataAnnotationView } from "../data_annotation";
import type { ColumnarDataSource } from "../../sources/columnar_data_source";
import * as mixins from "../../../core/property_mixins";
import type * as visuals from "../../../core/visuals";
import { CoordinateUnits } from "../../../core/enums";
import * as p from "../../../core/properties";
import type { FloatArray } from "../../../core/types";
import { ScreenArray } from "../../../core/types";
import type { Context2d } from "../../../core/util/canvas";
export declare class HTMLLabelSetView extends DataAnnotationView {
    model: HTMLLabelSet;
    visuals: HTMLLabelSet.Visuals;
    protected _x: FloatArray;
    protected _y: FloatArray;
    protected sx: ScreenArray;
    protected sy: ScreenArray;
    protected text: p.Uniform<string | null>;
    protected angle: p.Uniform<number>;
    protected x_offset: p.Uniform<number>;
    protected y_offset: p.Uniform<number>;
    protected els: HTMLElement[];
    set_data(source: ColumnarDataSource): void;
    remove(): void;
    protected _rerender(): void;
    map_data(): void;
    _paint_data(): void;
    protected _paint_text(ctx: Context2d, i: number, text: string, sx: number, sy: number, angle: number): void;
}
export declare namespace HTMLLabelSet {
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
export interface HTMLLabelSet extends HTMLLabelSet.Attrs {
}
export declare class HTMLLabelSet extends DataAnnotation {
    properties: HTMLLabelSet.Props;
    __view_type__: HTMLLabelSetView;
    constructor(attrs?: Partial<HTMLLabelSet.Attrs>);
}
//# sourceMappingURL=label_set.d.ts.map