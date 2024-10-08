import { Callback } from "./callback";
import { Dialog } from "../ui/dialog";
import type * as p from "../../core/properties";
export declare namespace OpenDialog {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        dialog: p.Property<Dialog>;
    };
}
export interface OpenDialog extends OpenDialog.Attrs {
}
export declare class OpenDialog extends Callback {
    properties: OpenDialog.Props;
    constructor(attrs?: Partial<OpenDialog.Attrs>);
    execute(): Promise<void>;
}
//# sourceMappingURL=open_dialog.d.ts.map