import type { DataProvider, SortColumn } from "@bokeh/slickgrid";
import { Grid as SlickGrid } from "@bokeh/slickgrid";
import type * as p from "../../../core/properties";
import type { StyleSheetLike } from "../../../core/dom";
import type { Arrayable } from "../../../core/types";
import type { DOMBoxSizing } from "../../layouts/layout_dom";
import { WidgetView } from "../widget";
import type { ColumnType, Item } from "./definitions";
import { TableWidget } from "./table_widget";
import { TableColumn } from "./table_column";
import type { ColumnarDataSource } from "../../sources/columnar_data_source";
import type { CDSView, CDSViewView } from "../../sources/cds_view";
import type { IterViews } from "../../../core/build_views";
export declare const AutosizeModes: {
    fit_columns: "FCV";
    fit_viewport: "FVC";
    force_fit: "LFF";
    none: "NOA";
};
export type AutosizeMode = "FCV" | "FVC" | "LFF" | "NOA";
export declare class TableDataProvider implements DataProvider<Item> {
    index: number[];
    source: ColumnarDataSource;
    view: CDSView;
    constructor(source: ColumnarDataSource, view: CDSView);
    init(source: ColumnarDataSource, view: CDSView): void;
    getLength(): number;
    getItem(offset: number): Item;
    getField(offset: number, field: string): unknown;
    setField(offset: number, field: string, value: unknown): void;
    getRecords(): Item[];
    getItems(): Item[];
    slice(start: number, end: number | null, step?: number): Item[];
    sort(columns: SortColumn<Item>[]): void;
}
export declare class DataTableView extends WidgetView {
    model: DataTable;
    protected cds_view: CDSViewView;
    protected data: TableDataProvider;
    protected grid: SlickGrid<Item>;
    protected _in_selection_update: boolean;
    protected _width: number | null;
    private _filtered_selection;
    get data_source(): p.Property<ColumnarDataSource>;
    protected wrapper_el: HTMLElement;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    _after_resize(): void;
    _after_layout(): void;
    box_sizing(): DOMBoxSizing;
    updateLayout(initialized: boolean, rerender: boolean): void;
    updateGrid(): void;
    updateSelection(): void;
    newIndexColumn(): ColumnType;
    get autosize(): AutosizeMode;
    render(): void;
    protected _render_table(): void;
    _after_render(): void;
    _hide_header(): void;
    get_selected_rows(): number[];
    protected _sync_selected_with_view(): void;
}
export declare namespace DataTable {
    type Attrs = p.AttrsOf<Props>;
    type Props = TableWidget.Props & {
        autosize_mode: p.Property<"fit_columns" | "fit_viewport" | "none" | "force_fit">;
        auto_edit: p.Property<boolean>;
        columns: p.Property<TableColumn[]>;
        fit_columns: p.Property<boolean | null>;
        frozen_columns: p.Property<number | null>;
        frozen_rows: p.Property<number | null>;
        sortable: p.Property<boolean>;
        reorderable: p.Property<boolean>;
        editable: p.Property<boolean>;
        selectable: p.Property<boolean | "checkbox">;
        index_position: p.Property<number | null>;
        index_header: p.Property<string>;
        index_width: p.Property<number>;
        scroll_to_selection: p.Property<boolean>;
        header_row: p.Property<boolean>;
        row_height: p.Property<number>;
    };
}
export interface DataTable extends DataTable.Attrs {
}
export declare class DataTable extends TableWidget {
    properties: DataTable.Props;
    __view_type__: DataTableView;
    private _sort_columns;
    get sort_columns(): {
        field: string;
        sortAsc: boolean;
    }[];
    constructor(attrs?: Partial<DataTable.Attrs>);
    update_sort_columns(sort_cols: SortColumn<Item>[]): void;
    get_scroll_index(grid_range: {
        top: number;
        bottom: number;
    }, selected_indices: Arrayable<number>): number | null;
}
//# sourceMappingURL=data_table.d.ts.map