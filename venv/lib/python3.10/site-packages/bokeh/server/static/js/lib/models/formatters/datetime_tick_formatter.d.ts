import { ContextWhich, Location, ResolutionType } from "../../core/enums";
import type * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
import { TickFormatter } from "./tick_formatter";
export type { ResolutionType } from "../../core/enums";
export declare const resolution_order: ResolutionType[];
export declare const tm_index_for_resolution: {
    [key in ResolutionType]: number;
};
export declare function _get_resolution(resolution_secs: number, span_secs: number): ResolutionType;
export declare function _mktime(t: number): number[];
export declare function _strftime(t: number, format: string): string;
export declare function _us(t: number): number;
export declare namespace DatetimeTickFormatter {
    type Attrs = p.AttrsOf<Props>;
    type Props = TickFormatter.Props & {
        microseconds: p.Property<string>;
        milliseconds: p.Property<string>;
        seconds: p.Property<string>;
        minsec: p.Property<string>;
        minutes: p.Property<string>;
        hourmin: p.Property<string>;
        hours: p.Property<string>;
        days: p.Property<string>;
        months: p.Property<string>;
        years: p.Property<string>;
        strip_leading_zeros: p.Property<boolean | Arrayable<ResolutionType>>;
        boundary_scaling: p.Property<boolean>;
        hide_repeats: p.Property<boolean>;
        context: p.Property<string | DatetimeTickFormatter | null>;
        context_which: p.Property<ContextWhich>;
        context_location: p.Property<Location>;
    };
}
export interface DatetimeTickFormatter extends DatetimeTickFormatter.Attrs {
}
export declare class DatetimeTickFormatter extends TickFormatter {
    properties: DatetimeTickFormatter.Props;
    constructor(attrs?: Partial<DatetimeTickFormatter.Attrs>);
    doFormat(ticks: number[], _opts: {
        loc: number;
    }, _resolution?: ResolutionType): string[];
    _compute_label(t: number, resolution: ResolutionType): string;
    _compute_context_labels(ticks: number[], resolution: ResolutionType): string[];
    _build_full_labels(base_labels: string[], context_labels: string[]): string[];
    _hide_repeating_labels(labels: string[]): string[];
}
//# sourceMappingURL=datetime_tick_formatter.d.ts.map