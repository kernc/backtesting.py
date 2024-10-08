import { Coordinate } from "./coordinate";
import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare const ImplicitTarget: import("../../core/kinds").Kinds.Enum<"canvas" | "plot" | "frame" | "parent">;
export type ImplicitTarget = typeof ImplicitTarget["__type__"];
export declare const NodeTarget: import("../../core/kinds").Kinds.Or<[Model, "canvas" | "plot" | "frame" | "parent"]>;
export type NodeTarget = typeof NodeTarget["__type__"];
export declare class BoxNodes {
    readonly target: ImplicitTarget;
    readonly frozen: boolean;
    constructor(target: ImplicitTarget, frozen?: boolean);
    private _node;
    private _left;
    get left(): Node;
    private _right;
    get right(): Node;
    private _top;
    get top(): Node;
    private _bottom;
    get bottom(): Node;
    freeze(): BoxNodes;
}
export declare namespace Node {
    type Attrs = p.AttrsOf<Props>;
    type Props = Coordinate.Props & {
        target: p.Property<NodeTarget>;
        symbol: p.Property<string>;
        offset: p.Property<number>;
    };
}
export interface Node extends Node.Attrs {
}
export declare class Node extends Coordinate {
    properties: Node.Props;
    constructor(attrs?: Partial<Node.Attrs>);
    private static _frame_nodes;
    static get frame(): BoxNodes;
    private static _canvas_nodes;
    static get canvas(): BoxNodes;
}
//# sourceMappingURL=node.d.ts.map