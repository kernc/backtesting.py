import type { DocJson } from "../document";
import type { ID } from "../core/types";
import type { ViewManager } from "../core/view_manager";
import type { DocsJson, RenderItem } from "./json";
import type { EmbedTarget } from "./dom";
export type { DocsJson, RenderItem, Roots } from "./json";
export { add_document_standalone, index } from "./standalone";
export { add_document_from_session } from "./server";
export { embed_items_notebook, kernels } from "./notebook";
export type JsonItem = {
    doc: DocJson;
    root_id: ID;
    target_id: ID;
};
export declare function embed_item(item: JsonItem, target?: ID | EmbedTarget): Promise<ViewManager>;
export declare function embed_items(docs_json: string | DocsJson, render_items: RenderItem[], app_path?: string, absolute_url?: string): Promise<ViewManager[]>;
//# sourceMappingURL=index.d.ts.map