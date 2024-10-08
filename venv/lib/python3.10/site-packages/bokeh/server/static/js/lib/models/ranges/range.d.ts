import { Model } from "../../model";
import type { PlotView } from "../plots/plot";
import type * as p from "../../core/properties";
declare const Bounds: import("../../core/kinds").Kinds.Nullable<"auto" | [number | null, number | null]>;
type Bounds = typeof Bounds["__type__"];
export declare namespace Range {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        bounds: p.Property<Bounds>;
        min_interval: p.Property<number | null>;
        max_interval: p.Property<number | null>;
    };
}
export interface Range extends Range.Attrs {
}
export declare abstract class Range extends Model {
    properties: Range.Props;
    constructor(attrs?: Partial<Range.Attrs>);
    protected _computed_bounds: [number, number];
    get computed_bounds(): [number, number];
    abstract start: number;
    abstract end: number;
    abstract get min(): number;
    abstract get max(): number;
    have_updated_interactively: boolean;
    abstract reset(): void;
    get is_reversed(): boolean;
    get is_valid(): boolean;
    get interval(): [number, number];
    get span(): number;
    get linked_plots(): ReadonlySet<PlotView>;
}
export {};
//# sourceMappingURL=range.d.ts.map