import { Icon, IconView } from "./icon";
import type { Color } from "../../../core/types";
import type { StyleSheetLike } from "../../../core/dom";
import { InlineStyleSheet } from "../../../core/dom";
import type * as p from "../../../core/properties";
export declare class BuiltinIconView extends IconView {
    model: BuiltinIcon;
    protected readonly _style: InlineStyleSheet;
    stylesheets(): StyleSheetLike[];
    render(): void;
}
export declare namespace BuiltinIcon {
    type Attrs = p.AttrsOf<Props>;
    type Props = Icon.Props & {
        icon_name: p.Property<string>;
        color: p.Property<Color>;
    };
}
export interface BuiltinIcon extends BuiltinIcon.Attrs {
}
export declare class BuiltinIcon extends Icon {
    properties: BuiltinIcon.Props;
    __view_type__: BuiltinIconView;
    constructor(attrs?: Partial<BuiltinIcon.Attrs>);
}
//# sourceMappingURL=builtin_icon.d.ts.map