import type { Geometry } from "./geometry";
import type { SelectionMode } from "./enums";
import { Selection } from "../models/selections/selection";
import type { ColumnarDataSource } from "../models/sources/columnar_data_source";
import type { DataRenderer, DataRendererView } from "../models/renderers/data_renderer";
export declare class SelectionManager {
    readonly source: ColumnarDataSource;
    constructor(source: ColumnarDataSource);
    inspectors: Map<DataRenderer, Selection>;
    select(renderer_views: DataRendererView[], geometry: Geometry, final: boolean, mode?: SelectionMode): boolean;
    inspect(renderer_view: DataRendererView, geometry: Geometry): boolean;
    invert(rview?: DataRendererView): void;
    clear(rview?: DataRendererView): void;
    get_or_create_inspector(renderer: DataRenderer): Selection;
}
//# sourceMappingURL=selection_manager.d.ts.map