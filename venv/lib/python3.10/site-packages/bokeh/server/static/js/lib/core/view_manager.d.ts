import type { HasProps } from "./has_props";
import type { View, ViewOf, IterViews } from "./view";
import type { Options } from "./build_views";
declare abstract class AbstractViewQuery {
    abstract [Symbol.iterator](): IterViews;
    all_views(): IterViews;
    query(fn: (view: View) => boolean): IterViews;
    query_one(fn: (view: View) => boolean): View | null;
    find<T extends HasProps>(model: T): IterViews<ViewOf<T>>;
    find_by_id(id: string): IterViews;
    find_one<T extends HasProps>(model: T): ViewOf<T> | null;
    find_one_by_id(id: string): View | null;
    get_one<T extends HasProps>(model: T): ViewOf<T>;
    get_one_by_id(id: string): View;
    find_all<T extends HasProps>(model: T): ViewOf<T>[];
    find_all_by_id(id: string): View[];
}
export declare class ViewQuery extends AbstractViewQuery {
    view: View;
    constructor(view: View);
    [Symbol.iterator](): IterViews;
    toString(): string;
}
export declare class ViewManager extends AbstractViewQuery {
    protected global?: ViewManager | undefined;
    protected readonly _roots: Set<View>;
    constructor(roots?: Iterable<View>, global?: ViewManager | undefined);
    toString(): string;
    build_view<T extends HasProps>(model: T, parent?: Options<ViewOf<T>>["parent"]): Promise<ViewOf<T>>;
    get<T extends HasProps>(model: T): ViewOf<T> | null;
    get_by_id(id: string): ViewOf<HasProps> | null;
    add(view: View): void;
    delete(view: View): void;
    remove(view: View): void;
    clear(): void;
    get roots(): View[];
    [Symbol.iterator](): IterViews;
}
export {};
//# sourceMappingURL=view_manager.d.ts.map