import type { ImageIndex } from "../../models/selections/selection";
import type { ColumnarDataSource } from "../../models/sources/columnar_data_source";
import type { CustomJSHover } from "../../models/tools/inspectors/customjs_hover";
import type { Dict } from "../types";
import type { BuiltinFormatter } from "../enums";
export type FormatterSpec = CustomJSHover | BuiltinFormatter;
export type Formatters = Dict<FormatterSpec>;
export type FormatterFunc = (value: unknown, format: string, special_vars: Vars) => string;
export type Index = number | ImageIndex;
export type Vars = {
    [key: string]: unknown;
};
export declare const DEFAULT_FORMATTERS: {
    [key in BuiltinFormatter]: FormatterFunc;
};
export declare function sprintf(format: string, ...args: unknown[]): string;
export declare function basic_formatter(value: unknown, _format: string, _special_vars: Vars): string;
export declare function get_formatter(spec: string, format?: string, formatters?: Formatters): FormatterFunc;
export declare const MISSING = "???";
export declare function _get_column_value(name: string, data_source: ColumnarDataSource, ind: Index | null): unknown | null;
type PlaceholderType = "$" | "@";
export declare function get_value(type: PlaceholderType, name: string, data_source: ColumnarDataSource, i: Index | null, special_vars: Vars): unknown;
export declare function replace_placeholders(content: string | {
    html: string;
}, data_source: ColumnarDataSource, i: Index | null, formatters?: Formatters, special_vars?: Vars, encode?: (v: string) => string): string | Node[];
type PlaceholderReplacer = (type: PlaceholderType, name: string, format: string | undefined, i: number, spec: string) => string | null | undefined;
export declare function process_placeholders(text: string, fn: PlaceholderReplacer): string;
export {};
//# sourceMappingURL=templating.d.ts.map