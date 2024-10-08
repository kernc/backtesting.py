import { WebDataSource } from "./web_data_source";
import type * as p from "../../core/properties";
export declare namespace ServerSentDataSource {
    type Attrs = p.AttrsOf<Props>;
    type Props = WebDataSource.Props;
}
export interface ServerSentDataSource extends ServerSentDataSource.Attrs {
}
export declare class ServerSentDataSource extends WebDataSource {
    properties: ServerSentDataSource.Props;
    constructor(attrs?: Partial<ServerSentDataSource.Attrs>);
    protected initialized: boolean;
    setup(): void;
}
//# sourceMappingURL=server_sent_data_source.d.ts.map