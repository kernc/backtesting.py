import type { HasProps } from "./has_props";
import type { View, ViewOf } from "./view";
import type { ViewManager } from "./view_manager";
export type { IterViews, ViewOf } from "./view";
export type ViewStorage<T extends HasProps> = Map<T, ViewOf<T>>;
export type Options<T extends View> = {
    parent: T["parent"] | null;
    owner?: ViewManager;
};
export declare function build_view<T extends HasProps>(model: T, options?: Options<ViewOf<T>>, cls?: (model: T) => T["default_view"]): Promise<ViewOf<T>>;
export type BuildResult<T extends HasProps> = {
    created: ViewOf<T>[];
    removed: ViewOf<T>[];
};
export declare function build_views<T extends HasProps>(view_storage: ViewStorage<T>, models: T[], options?: Options<ViewOf<T>>, cls?: (model: T) => T["default_view"]): Promise<BuildResult<T>>;
export declare function remove_views(view_storage: ViewStorage<HasProps>): void;
export declare function traverse_views(views: View[], fn: (view: View) => void): void;
//# sourceMappingURL=build_views.d.ts.map