import { AbstractButton, AbstractButtonView } from "./abstract_button";
import type { TooltipView } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import type { IterViews } from "../../core/build_views";
import type * as p from "../../core/properties";
export declare class HelpButtonView extends AbstractButtonView {
    model: HelpButton;
    protected tooltip: TooltipView;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    render(): void;
}
export declare namespace HelpButton {
    type Attrs = p.AttrsOf<Props>;
    type Props = AbstractButton.Props & {
        tooltip: p.Property<Tooltip>;
    };
}
export interface HelpButton extends HelpButton.Attrs {
}
export declare class HelpButton extends AbstractButton {
    properties: HelpButton.Props;
    __view_type__: HelpButtonView;
    constructor(attrs?: Partial<HelpButton.Attrs>);
}
//# sourceMappingURL=help_button.d.ts.map