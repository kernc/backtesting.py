import { Callback } from "./callback";
import { Dialog } from "../ui/dialog";
import type * as p from "../../core/properties";
export declare namespace CloseDialog {
    type Attrs = p.AttrsOf<Props>;
    type Props = Callback.Props & {
        dialog: p.Property<Dialog>;
    };
}
export interface CloseDialog extends CloseDialog.Attrs {
}
export declare class CloseDialog extends Callback {
    properties: CloseDialog.Props;
    constructor(attrs?: Partial<CloseDialog.Attrs>);
    execute(): Promise<void>;
}
//# sourceMappingURL=close_dialog.d.ts.map