import { Icon, IconView } from "./icon";
import type { StyleSheetLike } from "../../../core/dom";
import { InlineStyleSheet, ImportedStyleSheet, GlobalInlineStyleSheet } from "../../../core/dom";
import type * as p from "../../../core/properties";
export declare class TablerIconView extends IconView {
    model: TablerIcon;
    protected static readonly _url = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest";
    protected static readonly _fonts: GlobalInlineStyleSheet;
    protected readonly _tabler: ImportedStyleSheet;
    protected readonly _style: InlineStyleSheet;
    stylesheets(): StyleSheetLike[];
    render(): void;
}
export declare namespace TablerIcon {
    type Attrs = p.AttrsOf<Props>;
    type Props = Icon.Props & {
        icon_name: p.Property<string>;
    };
}
export interface TablerIcon extends TablerIcon.Attrs {
}
export declare class TablerIcon extends Icon {
    properties: TablerIcon.Props;
    __view_type__: TablerIconView;
    constructor(attrs?: Partial<TablerIcon.Attrs>);
}
//# sourceMappingURL=tabler_icon.d.ts.map