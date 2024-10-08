import { ColumnDataSource } from "./column_data_source";
import { UpdateMode } from "../../core/enums";
import type { CallbackLike1 } from "../../core/util/callbacks";
import type { Data } from "../../core/types";
import type * as p from "../../core/properties";
import type { Arrayable } from "../../core/types";
export type AdapterFn = CallbackLike1<WebDataSource, {
    response: any;
}, Data | Promise<Data>>;
export declare namespace WebDataSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = ColumnDataSource.Props & {
        max_size: p.Property<number | null>;
        mode: p.Property<UpdateMode>;
        adapter: p.Property<AdapterFn | null>;
        data_url: p.Property<string>;
    };
}
export interface WebDataSource extends WebDataSource.Attrs {
}
export declare abstract class WebDataSource extends ColumnDataSource {
    properties: WebDataSource.Props;
    constructor(attrs?: Partial<WebDataSource.Attrs>);
    get_column(name: string): Arrayable;
    get_length(): number;
    abstract setup(): void;
    initialize(): void;
    load_data(raw_data: any, mode: UpdateMode, max_size?: number): Promise<void>;
}
//# sourceMappingURL=web_data_source.d.ts.map