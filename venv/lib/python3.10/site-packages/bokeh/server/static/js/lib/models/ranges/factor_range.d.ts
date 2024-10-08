import { Range } from "./range";
import { PaddingUnits } from "../../core/enums";
import * as p from "../../core/properties";
import { Signal0 } from "../../core/signaling";
import type { Arrayable } from "../../core/types";
import { ScreenArray } from "../../core/types";
export type FactorLevel = 1 | 2 | 3;
export type L1Factor = string;
export type L2Factor = [string, string];
export type L3Factor = [string, string, string];
export type Factor = L1Factor | L2Factor | L3Factor;
export type FactorSeq = L1Factor[] | L2Factor[] | L3Factor[];
export declare const Factor: import("../../core/kinds").Kinds.Or<[string, [string, string], [string, string, string]]>;
export declare const FactorSeq: import("../../core/kinds").Kinds.Or<[string[], [string, string][], [string, string, string][]]>;
export type L1OffsetFactor = [string, number];
export type L2OffsetFactor = [string, string, number];
export type L3OffsetFactor = [string, string, string, number];
export type OffsetFactor = L1OffsetFactor | L2OffsetFactor | L3OffsetFactor;
export type FactorLike = number | Factor | OffsetFactor;
export type L1Mapping = Map<string, {
    value: number;
}>;
export type L2Mapping = Map<string, {
    value: number;
    mapping: L1Mapping;
}>;
export type L3Mapping = Map<string, {
    value: number;
    mapping: L2Mapping;
}>;
export type Mapping = L1Mapping | L2Mapping | L3Mapping;
export type L1MappingSpec = {
    mapping: L1Mapping;
    inner_padding: number;
};
export type L2MappingSpec = {
    mapping: L2Mapping;
    tops: L1Factor[];
    inner_padding: number;
};
export type L3MappingSpec = {
    mapping: L3Mapping;
    tops: L1Factor[];
    mids: L2Factor[];
    inner_padding: number;
};
export type MappingEntry = {
    value: number;
    mapping?: L1Mapping | L2Mapping;
};
type MappingFor<T> = T extends L1Factor ? L1Mapping : T extends L2Factor ? L2Mapping : T extends L3Factor ? L3Mapping : never;
type BoxedAtMost<T> = T extends L1Factor ? [L1Factor] : T extends L2Factor ? [L1Factor] | L2Factor : T extends L3Factor ? [L1Factor] | L2Factor | L3Factor : never;
export declare function map_one_level(factors: L1Factor[], padding: number, offset?: number): L1MappingSpec;
export declare function map_two_levels(factors: L2Factor[], outer_pad: number, factor_pad: number, offset?: number): L2MappingSpec;
export declare function map_three_levels(factors: L3Factor[], outer_pad: number, inner_pad: number, factor_pad: number, offset?: number): L3MappingSpec;
export declare abstract class FactorMapper<FactorType> {
    readonly levels: FactorLevel;
    readonly mids: L2Factor[] | null;
    readonly tops: L1Factor[] | null;
    readonly inner_padding: number;
    protected readonly mapping: MappingFor<FactorType>;
    constructor({ levels, mapping, tops, mids, inner_padding }: {
        levels: FactorLevel;
        mapping: MappingFor<FactorType>;
        tops?: L1Factor[] | null;
        mids?: L2Factor[] | null;
        inner_padding: number;
    });
    static compute_levels(factors: Factor[]): FactorLevel;
    static for(range: FactorRange): L1FactorMapper | L2FactorMapper | L3FactorMapper;
    map(x: FactorLike): number;
    private lookup_value;
    protected abstract lookup_entry(x: BoxedAtMost<FactorType>): MappingEntry | null;
}
declare class L1FactorMapper extends FactorMapper<L1Factor> {
    constructor(range: FactorRange);
    protected lookup_entry(x: BoxedAtMost<L1Factor>): MappingEntry | null;
}
declare class L2FactorMapper extends FactorMapper<L2Factor> {
    constructor(range: FactorRange);
    protected lookup_entry(x: BoxedAtMost<L2Factor>): MappingEntry | null;
}
declare class L3FactorMapper extends FactorMapper<L3Factor> {
    constructor(range: FactorRange);
    protected lookup_entry(x: BoxedAtMost<L3Factor>): MappingEntry | null;
}
export declare namespace FactorRange {
    type Attrs = p.AttrsOf<Props>;
    type Props = Range.Props & {
        factors: p.Property<Factor[]>;
        factor_padding: p.Property<number>;
        subgroup_padding: p.Property<number>;
        group_padding: p.Property<number>;
        range_padding: p.Property<number>;
        range_padding_units: p.Property<PaddingUnits>;
        start: p.Property<number>;
        end: p.Property<number>;
    };
}
export interface FactorRange extends FactorRange.Attrs {
}
export declare class FactorRange extends Range {
    properties: FactorRange.Props;
    constructor(attrs?: Partial<FactorRange.Attrs>);
    mapper: L1FactorMapper | L2FactorMapper | L3FactorMapper;
    get min(): number;
    get max(): number;
    initialize(): void;
    connect_signals(): void;
    readonly invalidate_synthetic: Signal0<this>;
    reset(): void;
    /** Convert a categorical factor into a synthetic coordinate. */
    synthetic(x: FactorLike): number;
    /** Convert an array of categorical factors into synthetic coordinates. */
    v_synthetic(xs: Arrayable<FactorLike>): ScreenArray;
    /** Convert a synthetic coordinate into a categorical factor. */
    factor(x: number): Factor | null;
    private compute_bounds;
    private configure;
}
export {};
//# sourceMappingURL=factor_range.d.ts.map