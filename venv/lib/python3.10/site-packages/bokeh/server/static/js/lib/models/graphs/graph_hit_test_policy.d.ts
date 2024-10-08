import { Model } from "../../model";
import type { HitTestResult } from "../../core/hittest";
import type { Geometry } from "../../core/geometry";
import type { SelectionMode } from "../../core/enums";
import type * as p from "../../core/properties";
import { Selection } from "../selections/selection";
import type { GraphRenderer, GraphRendererView } from "../renderers/graph_renderer";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { GlyphRendererView } from "../renderers/glyph_renderer";
type IndicesType = "selection" | "inspection";
export declare namespace GraphHitTestPolicy {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface GraphHitTestPolicy extends Model.Attrs {
}
export declare abstract class GraphHitTestPolicy extends Model {
    properties: GraphHitTestPolicy.Props;
    constructor(attrs?: Partial<GraphHitTestPolicy.Attrs>);
    abstract hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    abstract do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    abstract do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
    protected _hit_test(geometry: Geometry, graph_view: GraphRendererView, renderer_view: GlyphRendererView): HitTestResult;
}
export declare namespace EdgesOnly {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphHitTestPolicy.Props;
}
export interface EdgesOnly extends EdgesOnly.Attrs {
}
export declare class EdgesOnly extends GraphHitTestPolicy {
    properties: EdgesOnly.Props;
    constructor(attrs?: Partial<EdgesOnly.Attrs>);
    hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
}
export declare namespace NodesOnly {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphHitTestPolicy.Props;
}
export interface NodesOnly extends NodesOnly.Attrs {
}
export declare class NodesOnly extends GraphHitTestPolicy {
    properties: NodesOnly.Props;
    constructor(attrs?: Partial<NodesOnly.Attrs>);
    hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
}
export declare namespace NodesAndLinkedEdges {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphHitTestPolicy.Props;
}
export interface NodesAndLinkedEdges extends NodesAndLinkedEdges.Attrs {
}
export declare class NodesAndLinkedEdges extends GraphHitTestPolicy {
    properties: NodesAndLinkedEdges.Props;
    constructor(attrs?: Partial<NodesAndLinkedEdges.Attrs>);
    hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    get_linked_edges(node_source: ColumnarDataSource, edge_source: ColumnarDataSource, mode: IndicesType): Selection;
    do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
}
export declare namespace EdgesAndLinkedNodes {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphHitTestPolicy.Props;
}
export interface EdgesAndLinkedNodes extends EdgesAndLinkedNodes.Attrs {
}
export declare class EdgesAndLinkedNodes extends GraphHitTestPolicy {
    properties: EdgesAndLinkedNodes.Props;
    constructor(attrs?: Partial<EdgesAndLinkedNodes.Attrs>);
    hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    get_linked_nodes(node_source: ColumnarDataSource, edge_source: ColumnarDataSource, mode: IndicesType): Selection;
    do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
}
export declare namespace NodesAndAdjacentNodes {
    type Attrs = p.AttrsOf<Props>;
    type Props = GraphHitTestPolicy.Props;
}
export interface NodesAndAdjacentNodes extends NodesAndAdjacentNodes.Attrs {
}
export declare class NodesAndAdjacentNodes extends GraphHitTestPolicy {
    properties: NodesAndAdjacentNodes.Props;
    constructor(attrs?: Partial<NodesAndAdjacentNodes.Attrs>);
    hit_test(geometry: Geometry, graph_view: GraphRendererView): HitTestResult;
    get_adjacent_nodes(node_source: ColumnarDataSource, edge_source: ColumnarDataSource, mode: IndicesType): Selection;
    do_selection(hit_test_result: HitTestResult, graph: GraphRenderer, final: boolean, mode: SelectionMode): boolean;
    do_inspection(hit_test_result: HitTestResult, geometry: Geometry, graph_view: GraphRendererView, final: boolean, mode: SelectionMode): boolean;
}
export {};
//# sourceMappingURL=graph_hit_test_policy.d.ts.map