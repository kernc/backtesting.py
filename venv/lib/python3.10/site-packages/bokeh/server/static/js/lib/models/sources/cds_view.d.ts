import { Model } from "../../model";
import type * as p from "../../core/properties";
import type { Selection } from "../selections/selection";
import { View } from "../../core/view";
import { Indices } from "../../core/types";
import { Filter } from "../filters/filter";
import type { ColumnarDataSource } from "./columnar_data_source";
export declare class CDSViewView extends View {
    model: CDSView;
    readonly parent: View & {
        readonly data_source: p.Property<ColumnarDataSource>;
    };
    initialize(): void;
    connect_signals(): void;
    compute_indices(): void;
}
export declare namespace CDSView {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        filter: p.Property<Filter>;
        indices: p.Property<Indices>;
        indices_map: p.Property<Map<number, number>>;
        masked: p.Property<Indices | null>;
    };
}
export interface CDSView extends CDSView.Attrs {
}
export declare class CDSView extends Model {
    properties: CDSView.Props;
    __view_type__: CDSViewView;
    constructor(attrs?: Partial<CDSView.Attrs>);
    private _indices;
    _indices_map_to_subset(): void;
    convert_selection_from_subset(selection_subset: Selection): Selection;
    convert_selection_to_subset(selection_full: Selection): Selection;
    convert_indices_from_subset(indices: number[]): number[];
    /** @deprecated */
    get filters(): Filter[];
    /** @deprecated */
    set filters(filters: Filter[]);
}
//# sourceMappingURL=cds_view.d.ts.map