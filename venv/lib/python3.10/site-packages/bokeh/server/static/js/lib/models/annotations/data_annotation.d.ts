import { Annotation, AnnotationView } from "./annotation";
import { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Context2d } from "../../core/util/canvas";
import * as p from "../../core/properties";
export declare abstract class DataAnnotationView extends AnnotationView {
    model: DataAnnotation;
    connect_signals(): void;
    protected _rerender(): void;
    set_data(source: ColumnarDataSource): void;
    abstract map_data(): void;
    abstract _paint_data(ctx: Context2d): void;
    private _initial_set_data;
    protected _paint(): void;
}
export declare namespace DataAnnotation {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        source: p.Property<ColumnarDataSource>;
    };
    type Visuals = Annotation.Visuals;
}
export interface DataAnnotation extends DataAnnotation.Attrs {
}
export declare abstract class DataAnnotation extends Annotation {
    properties: DataAnnotation.Props;
    __view_type__: DataAnnotationView;
    constructor(attrs?: Partial<DataAnnotation.Attrs>);
}
//# sourceMappingURL=data_annotation.d.ts.map