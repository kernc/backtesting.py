import { Callback } from "./callback";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
import type * as p from "../../core/properties";
export declare namespace OpenURL {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        url: p.Property<string>;
        same_tab: p.Property<boolean>;
    };
}
export interface OpenURL extends OpenURL.Attrs {
}
export declare class OpenURL extends Callback {
    properties: OpenURL.Props;
    constructor(attrs?: Partial<OpenURL.Attrs>);
    navigate(url: string): void;
    execute(_cb_obj: unknown, { source }: {
        source: ColumnarDataSource;
    }): void;
}
//# sourceMappingURL=open_url.d.ts.map