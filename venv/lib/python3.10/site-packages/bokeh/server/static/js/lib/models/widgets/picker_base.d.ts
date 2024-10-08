import flatpickr from "flatpickr";
import { InputWidget, InputWidgetView } from "./input_widget";
import type { StyleSheetLike } from "../../core/dom";
import { CalendarPosition } from "../../core/enums";
import type * as p from "../../core/properties";
export declare abstract class PickerBaseView extends InputWidgetView {
    model: PickerBase;
    protected _picker?: flatpickr.Instance;
    get picker(): flatpickr.Instance;
    controls(): Generator<import("./input_widget").HTMLInputElementLike, void, unknown>;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    connect_signals(): void;
    protected get flatpickr_options(): flatpickr.Options.Options;
    protected abstract _on_change(selected: Date[]): void;
    protected _render_input(): HTMLElement;
    render(): void;
    protected _position(self: flatpickr.Instance, custom_el: HTMLElement | undefined): void;
}
export declare namespace PickerBase {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        position: p.Property<CalendarPosition>;
        inline: p.Property<boolean>;
    };
}
export interface PickerBase extends PickerBase.Attrs {
}
export declare abstract class PickerBase extends InputWidget {
    properties: PickerBase.Props;
    __view_type__: PickerBaseView;
    constructor(attrs?: Partial<PickerBase.Attrs>);
}
//# sourceMappingURL=picker_base.d.ts.map