import { Model } from "../../model";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import { CoordinateTransform } from "../expressions/coordinate_transform";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare namespace LayoutProvider {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface LayoutProvider extends LayoutProvider.Attrs {
}
export declare abstract class LayoutProvider extends Model {
    properties: LayoutProvider.Props;
    constructor(attrs?: Partial<LayoutProvider.Attrs>);
    abstract get_node_coordinates(graph_source: ColumnarDataSource): [Arrayable<number>, Arrayable<number>];
    abstract get_edge_coordinates(graph_source: ColumnarDataSource): [Arrayable<number>[], Arrayable<number>[]];
    get node_coordinates(): NodeCoordinates;
    get edge_coordinates(): EdgeCoordinates;
}
export declare namespace GraphCoordinates {
    type Attrs = p.AttrsOf<Props>;
    type Props = CoordinateTransform.Props & {
        layout: p.Property<LayoutProvider>;
    };
}
export interface GraphCoordinates extends GraphCoordinates.Attrs {
}
export declare abstract class GraphCoordinates extends CoordinateTransform {
    properties: GraphCoordinates.Props;
    constructor(attrs?: Partial<GraphCoordinates.Attrs>);
}
export declare namespace NodeCoordinates {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphCoordinates.Props;
}
export interface NodeCoordinates extends NodeCoordinates.Attrs {
}
export declare class NodeCoordinates extends GraphCoordinates {
    properties: NodeCoordinates.Props;
    constructor(attrs?: Partial<NodeCoordinates.Attrs>);
    _v_compute(source: ColumnarDataSource): {
        x: Arrayable<number>;
        y: Arrayable<number>;
    };
}
export declare namespace EdgeCoordinates {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphCoordinates.Props;
}
export interface EdgeCoordinates extends EdgeCoordinates.Attrs {
}
export declare class EdgeCoordinates extends GraphCoordinates {
    properties: EdgeCoordinates.Props;
    constructor(attrs?: Partial<EdgeCoordinates.Attrs>);
    _v_compute(source: ColumnarDataSource): {
        x: Arrayable<number>[];
        y: Arrayable<number>[];
    };
}
//# sourceMappingURL=layout_provider.d.ts.map