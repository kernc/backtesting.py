import { Icon, IconView } from "./icon";
import type { StyleSheetLike } from "../../../core/dom";
import { InlineStyleSheet } from "../../../core/dom";
import type * as p from "../../../core/properties";
export declare class SVGIconView extends IconView {
    model: SVGIcon;
    protected readonly _style: InlineStyleSheet;
    stylesheets(): StyleSheetLike[];
    render(): void;
}
export declare namespace SVGIcon {
    type Attrs = p.AttrsOf<Props>;
    type Props = Icon.Props & {
        svg: p.Property<string>;
    };
}
export interface SVGIcon extends SVGIcon.Attrs {
}
export declare class SVGIcon extends Icon {
    properties: SVGIcon.Props;
    __view_type__: SVGIconView;
    constructor(attrs?: Partial<SVGIcon.Attrs>);
}
//# sourceMappingURL=svg_icon.d.ts.map