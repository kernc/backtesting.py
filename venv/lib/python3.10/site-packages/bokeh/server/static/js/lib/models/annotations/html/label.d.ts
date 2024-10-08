import { TextAnnotation, TextAnnotationView } from "./text_annotation";
import { CoordinateUnits, AngleUnits } from "../../../core/enums";
import type { Size } from "../../../core/layout";
import * as mixins from "../../../core/property_mixins";
import type * as p from "../../../core/properties";
export declare class HTMLLabelView extends TextAnnotationView {
    model: HTMLLabel;
    visuals: HTMLLabel.Visuals;
    update_layout(): void;
    protected _get_size(): Size;
    protected _paint(): void;
}
export declare namespace HTMLLabel {
    type Props = TextAnnotation.Props & {
        x: p.Property<number>;
        x_units: p.Property<CoordinateUnits>;
        y: p.Property<number>;
        y_units: p.Property<CoordinateUnits>;
        text: p.Property<string>;
        angle: p.Property<number>;
        angle_units: p.Property<AngleUnits>;
        x_offset: p.Property<number>;
        y_offset: p.Property<number>;
    } & Mixins;
    type Attrs = p.AttrsOf<Props>;
    type Mixins = mixins.Text & mixins.BorderLine & mixins.BackgroundFill & mixins.BackgroundHatch;
    type Visuals = TextAnnotation.Visuals;
}
export interface HTMLLabel extends HTMLLabel.Attrs {
}
export declare class HTMLLabel extends TextAnnotation {
    properties: HTMLLabel.Props;
    __view_type__: HTMLLabelView;
    constructor(attrs?: Partial<HTMLLabel.Attrs>);
}
//# sourceMappingURL=label.d.ts.map