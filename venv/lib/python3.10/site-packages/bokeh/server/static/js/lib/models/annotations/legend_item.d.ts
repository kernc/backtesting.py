import { Model } from "../../model";
import type { Legend } from "./legend";
import { GlyphRenderer } from "../renderers/glyph_renderer";
import * as p from "../../core/properties";
export declare namespace LegendItem {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        label: p.DataSpec<string | null>;
        renderers: p.Property<GlyphRenderer[]>;
        index: p.Property<number | null>;
        visible: p.Property<boolean>;
    };
}
export interface LegendItem extends LegendItem.Attrs {
}
export declare class LegendItem extends Model {
    properties: LegendItem.Props;
    legend: Legend | null;
    constructor(attrs?: Partial<LegendItem.Attrs>);
    _check_data_sources_on_renderers(): boolean;
    _check_field_label_on_data_source(): boolean;
    initialize(): void;
    get_field_from_label_prop(): string | null;
    get_labels_list_from_label_prop(): string[];
}
//# sourceMappingURL=legend_item.d.ts.map