import type { Document } from "../document";
import type { View } from "../core/view";
import { ViewManager } from "../core/view_manager";
import type { EmbedTarget } from "./dom";
export declare const index: ViewManager & {
    readonly [key: string]: View;
};
export declare function add_document_standalone(document: Document, element: EmbedTarget, roots?: (EmbedTarget | null)[], use_for_title?: boolean): Promise<ViewManager>;
//# sourceMappingURL=standalone.d.ts.map