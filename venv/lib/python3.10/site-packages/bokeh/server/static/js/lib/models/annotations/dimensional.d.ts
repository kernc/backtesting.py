import { Model } from "../../model";
import type { Dict } from "../../core/types";
import type * as p from "../../core/properties";
export type BasisItem = {
    name: string;
    factor: number;
    tex_name: string;
};
export type Basis = BasisItem[];
export type PreferredValue = {
    new_value: number;
    new_unit: string;
    scale_factor: number;
    exact: boolean;
};
export declare namespace Dimensional {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        ticks: p.Property<number[]>;
        include: p.Property<string[] | null>;
        exclude: p.Property<string[]>;
    };
}
export interface Dimensional extends Dimensional.Attrs {
}
export declare abstract class Dimensional extends Model {
    properties: Dimensional.Props;
    constructor(attrs?: Partial<Dimensional.Attrs>);
    abstract get_basis(): Dict<[number, string, string?]>;
    compute(value: number, unit: string, exact?: boolean): PreferredValue;
}
export declare namespace CustomDimensional {
    type Attrs = p.AttrsOf<Props>;
    type Props = Dimensional.Props & {
        basis: p.Property<Dict<[number, string, string?]>>;
    };
}
export interface CustomDimensional extends CustomDimensional.Attrs {
}
export declare abstract class CustomDimensional extends Dimensional {
    properties: CustomDimensional.Props;
    constructor(attrs?: Partial<CustomDimensional.Attrs>);
    get_basis(): Dict<[number, string, string?]>;
}
export declare namespace Metric {
    type Attrs = p.AttrsOf<Props>;
    type Props = Dimensional.Props & {
        base_unit: p.Property<string>;
        full_unit: p.Property<string | null>;
    };
}
export interface Metric extends Metric.Attrs {
}
export declare class Metric extends Dimensional {
    properties: Metric.Props;
    constructor(attrs?: Partial<Metric.Attrs>);
    static _metric_basis: readonly [readonly ["Q", 1e+30, "Q", "quetta"], readonly ["R", 1e+27, "R", "ronna"], readonly ["Y", 1e+24, "Y", "yotta"], readonly ["Z", 1e+21, "Z", "zetta"], readonly ["E", 1000000000000000000, "E", "exa"], readonly ["P", 1000000000000000, "P", "peta"], readonly ["T", 1000000000000, "T", "tera"], readonly ["G", 1000000000, "G", "giga"], readonly ["M", 1000000, "M", "mega"], readonly ["k", 1000, "k", "kilo"], readonly ["h", 100, "h", "hecto"], readonly ["", 1, "", ""], readonly ["d", 0.1, "d", "deci"], readonly ["c", 0.01, "c", "centi"], readonly ["m", 0.001, "m", "milli"], readonly ["µ", 0.000001, "\\mu", "micro"], readonly ["n", 1e-9, "n", "nano"], readonly ["p", 1e-12, "p", "pico"], readonly ["f", 1e-15, "f", "femto"], readonly ["a", 1e-18, "a", "atto"], readonly ["z", 1e-21, "z", "zepto"], readonly ["y", 1e-24, "y", "yocto"], readonly ["r", 1e-27, "r", "ronto"], readonly ["q", 1e-30, "q", "quecto"]];
    get_basis(): Dict<[number, string, string?]>;
}
export declare namespace ReciprocalMetric {
    type Attrs = p.AttrsOf<Props>;
    type Props = Metric.Props;
}
export interface ReciprocalMetric extends ReciprocalMetric.Attrs {
}
export declare class ReciprocalMetric extends Metric {
    properties: ReciprocalMetric.Props;
    constructor(attrs?: Partial<ReciprocalMetric.Attrs>);
    get_basis(): Dict<[number, string, string?]>;
}
export declare namespace MetricLength {
    type Attrs = p.AttrsOf<Props>;
    type Props = Metric.Props;
}
export interface MetricLength extends MetricLength.Attrs {
}
export declare class MetricLength extends Metric {
    properties: MetricLength.Props;
    constructor(attrs?: Partial<MetricLength.Attrs>);
}
export declare namespace ReciprocalMetricLength {
    type Attrs = p.AttrsOf<Props>;
    type Props = ReciprocalMetric.Props;
}
export interface ReciprocalMetricLength extends MetricLength.Attrs {
}
export declare class ReciprocalMetricLength extends ReciprocalMetric {
    properties: ReciprocalMetricLength.Props;
    constructor(attrs?: Partial<ReciprocalMetricLength.Attrs>);
}
export declare namespace ImperialLength {
    type Attrs = p.AttrsOf<Props>;
    type Props = CustomDimensional.Props;
}
export interface ImperialLength extends ImperialLength.Attrs {
}
export declare abstract class ImperialLength extends CustomDimensional {
    properties: ImperialLength.Props;
    constructor(attrs?: Partial<ImperialLength.Attrs>);
}
export declare namespace Angular {
    type Attrs = p.AttrsOf<Props>;
    type Props = CustomDimensional.Props;
}
export interface Angular extends Angular.Attrs {
}
export declare abstract class Angular extends CustomDimensional {
    properties: Angular.Props;
    constructor(attrs?: Partial<Angular.Attrs>);
}
//# sourceMappingURL=dimensional.d.ts.map