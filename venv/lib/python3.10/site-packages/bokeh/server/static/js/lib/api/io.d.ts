import { Document } from "../document";
import type { EmbedTarget } from "../embed/dom";
import type { ViewOf } from "../core/view";
import type { HasProps } from "../core/has_props";
import type { UIElement } from "../models/ui/ui_element";
export declare function show<T extends UIElement>(obj: T, target?: EmbedTarget | string): Promise<ViewOf<T>>;
export declare function show<T extends UIElement>(obj: T[], target?: EmbedTarget | string): Promise<ViewOf<T>[]>;
export declare function show(obj: Document, target?: EmbedTarget | string): Promise<ViewOf<HasProps>[]>;
export declare function show(obj: UIElement | Document, target?: EmbedTarget | string): Promise<ViewOf<HasProps> | ViewOf<HasProps>[]>;
//# sourceMappingURL=io.d.ts.map