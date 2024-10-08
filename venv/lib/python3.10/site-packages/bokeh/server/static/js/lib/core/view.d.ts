import { HasProps } from "./has_props";
import type { Property } from "./properties";
import type { Slot, ISignalable } from "./signaling";
import { Signal0, Signal } from "./signaling";
import type { BBox, XY } from "./util/bbox";
import type { Coordinate } from "../models/coordinates/coordinate";
import type { NodeTarget } from "../models/coordinates/node";
import { Node } from "../models/coordinates/node";
import { XY as XY_ } from "../models/coordinates/xy";
import { Indexed } from "../models/coordinates/indexed";
import { ViewManager, ViewQuery } from "./view_manager";
import type { Equatable, Comparator } from "./util/eq";
import { equals } from "./util/eq";
export type ViewOf<T extends HasProps> = T["__view_type__"];
export type SerializableState = {
    type: string;
    bbox?: BBox;
    children: SerializableState[];
};
export declare namespace View {
    type Options = {
        model: HasProps;
        parent: View | null;
        owner?: ViewManager;
    };
}
export type IterViews<T extends View = View> = Generator<T, void, undefined>;
export declare abstract class View implements ISignalable, Equatable {
    readonly removed: Signal0<this>;
    readonly model: HasProps;
    readonly parent: View | null;
    readonly root: View;
    readonly owner: ViewManager;
    readonly views: ViewQuery;
    protected _ready: Promise<void>;
    get ready(): Promise<void>;
    connect<Args, Sender extends object>(signal: Signal<Args, Sender>, slot: Slot<Args, Sender>): boolean;
    disconnect<Args, Sender extends object>(signal: Signal<Args, Sender>, slot: Slot<Args, Sender>): boolean;
    constructor(options: View.Options);
    initialize(): void;
    lazy_initialize(): Promise<void>;
    protected _destroyed: boolean;
    remove(): void;
    get is_destroyed(): boolean;
    toString(): string;
    [equals](that: this, _cmp: Comparator): boolean;
    children(): IterViews;
    protected _has_finished: boolean;
    mark_finished(): void;
    /**
     * Mark as finished even if e.g. external resources were not loaded yet.
     */
    force_finished(): void;
    finish(): void;
    private _idle_notified;
    notify_finished(): void;
    serializable_state(): SerializableState;
    get is_root(): boolean;
    has_finished(): boolean;
    get is_idle(): boolean;
    connect_signals(): void;
    disconnect_signals(): void;
    on_change(properties: Property<unknown> | Property<unknown>[], fn: () => void): void;
    on_transitive_change<T>(property: Property<T>, fn: () => void): void;
    cursor(_sx: number, _sy: number): string | null;
    on_hit?(sx: number, sy: number): boolean;
    resolve_frame(): View | null;
    resolve_canvas(): View | null;
    resolve_plot(): View | null;
    resolve_target(target: NodeTarget): View | null;
    resolve_symbol(_node: Node): XY | number;
    resolve_node(node: Node): XY | number;
    resolve_xy?(coord: XY_): XY;
    resolve_indexed?(coord: Indexed): XY;
    resolve_coordinate(coord: Coordinate): XY | number;
    resolve_as_xy(coord: Coordinate): XY;
    resolve_as_scalar(coord: Coordinate, dim: "x" | "y"): number;
}
//# sourceMappingURL=view.d.ts.map