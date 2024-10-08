import { LayoutProvider } from "./layout_provider";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type { Arrayable } from "../../core/types";
import type * as p from "../../core/properties";
export declare const GraphLayout: import("../../core/kinds").Kinds.Or<[import("core/types").Dict<Arrayable<number>>, Map<string | number, Arrayable<number>>]>;
export type GraphLayout = typeof GraphLayout["__type__"];
export declare namespace StaticLayoutProvider {
    type Attrs = p.AttrsOf<Props>;
    type Props = LayoutProvider.Props & {
        graph_layout: p.Property<GraphLayout>;
    };
}
export interface StaticLayoutProvider extends StaticLayoutProvider.Attrs {
}
export declare class StaticLayoutProvider extends LayoutProvider {
    properties: StaticLayoutProvider.Props;
    constructor(attrs?: Partial<StaticLayoutProvider.Attrs>);
    get_node_coordinates(node_source: ColumnarDataSource): [Arrayable<number>, Arrayable<number>];
    get_edge_coordinates(edge_source: ColumnarDataSource): [Arrayable<number>[], Arrayable<number>[]];
}
//# sourceMappingURL=static_layout_provider.d.ts.map