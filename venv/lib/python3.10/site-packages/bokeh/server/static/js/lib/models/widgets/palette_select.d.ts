import { InlineStyleSheet } from "../../core/dom";
import type { StyleSheetLike } from "../../core/dom";
import { DropPane } from "../../core/util/panes";
import type * as p from "../../core/properties";
import { InputWidget, InputWidgetView } from "./input_widget";
declare const Item: import("../../core/kinds").Kinds.Tuple<[string, import("../../core/types").Arrayable<import("../../core/types").Color>]>;
type Item = typeof Item["__type__"];
export declare class PaletteSelectView extends InputWidgetView {
    model: PaletteSelect;
    input_el: HTMLSelectElement;
    protected _value_el: HTMLElement;
    protected _pane: DropPane;
    protected readonly _style: InlineStyleSheet;
    protected readonly _style_menu: InlineStyleSheet;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    protected _update_value(): void;
    protected _update_ncols(): void;
    protected _render_item(item: Item): HTMLElement;
    protected _render_value(): HTMLElement | null;
    protected _render_input(): HTMLElement;
    render(): void;
    select(item: Item): void;
    toggle(): void;
    hide(): void;
}
export declare namespace PaletteSelect {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<string>;
        items: p.Property<Item[]>;
        ncols: p.Property<number>;
        swatch_width: p.Property<number>;
        swatch_height: p.Property<number | "auto">;
    };
}
export interface PaletteSelect extends PaletteSelect.Attrs {
}
export declare class PaletteSelect extends InputWidget {
    properties: PaletteSelect.Props;
    __view_type__: PaletteSelectView;
    constructor(attrs?: Partial<PaletteSelect.Attrs>);
}
export {};
//# sourceMappingURL=palette_select.d.ts.map