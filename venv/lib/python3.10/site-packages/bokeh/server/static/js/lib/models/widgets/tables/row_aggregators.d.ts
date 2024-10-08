import type { GroupTotals } from "@bokeh/slickgrid";
import type * as p from "../../../core/properties";
import { Model } from "../../../model";
export declare namespace RowAggregator {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        field_: p.Property<string>;
    };
}
export interface RowAggregator extends RowAggregator.Attrs {
    readonly key: string;
}
export declare abstract class RowAggregator extends Model {
    properties: RowAggregator.Props;
    constructor(attrs?: Partial<RowAggregator.Attrs>);
    abstract init(): void;
    abstract accumulate(item: {
        [key: string]: any;
    }): void;
    abstract storeResult(totals: GroupTotals<number>): void;
}
export declare class AvgAggregator extends RowAggregator {
    readonly key = "avg";
    init: () => void;
    accumulate: (item: Slick.SlickData) => void;
    storeResult: (groupTotals: GroupTotals<Slick.SlickData>) => void;
}
export declare class MinAggregator extends RowAggregator {
    readonly key = "min";
    init: () => void;
    accumulate: (item: Slick.SlickData) => void;
    storeResult: (groupTotals: GroupTotals<Slick.SlickData>) => void;
}
export declare class MaxAggregator extends RowAggregator {
    readonly key = "max";
    init: () => void;
    accumulate: (item: Slick.SlickData) => void;
    storeResult: (groupTotals: GroupTotals<Slick.SlickData>) => void;
}
export declare class SumAggregator extends RowAggregator {
    readonly key = "sum";
    init: () => void;
    accumulate: (item: Slick.SlickData) => void;
    storeResult: (groupTotals: GroupTotals<Slick.SlickData>) => void;
}
//# sourceMappingURL=row_aggregators.d.ts.map