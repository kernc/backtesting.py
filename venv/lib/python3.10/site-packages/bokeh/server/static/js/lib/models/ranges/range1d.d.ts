import { NumericalRange } from "./numerical_range";
import type * as p from "../../core/properties";
export declare namespace Range1d {
    type Attrs = p.AttrsOf<Props>;
    type Props = NumericalRange.Props & {
        reset_start: p.Property<number | null>;
        reset_end: p.Property<number | null>;
    };
}
export interface Range1d extends Range1d.Attrs {
}
export declare class Range1d extends NumericalRange {
    properties: Range1d.Props;
    constructor(attrs?: Partial<Range1d.Attrs>);
    protected _set_auto_bounds(): void;
    private _reset_start;
    private _reset_end;
    initialize(): void;
    get min(): number;
    get max(): number;
    reset(): void;
    map(fn: (v: number) => number): Range1d;
    widen(v: number): Range1d;
}
//# sourceMappingURL=range1d.d.ts.map