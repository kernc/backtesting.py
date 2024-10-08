import { InputWidget, InputWidgetView } from "./input_widget";
import type { Color } from "../../core/types";
import type * as p from "../../core/properties";
export declare class ColorPickerView extends InputWidgetView {
    model: ColorPicker;
    connect_signals(): void;
    protected _render_input(): HTMLElement;
    render(): void;
    change_input(): void;
}
export declare namespace ColorPicker {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        color: p.Property<Color>;
    };
}
export interface ColorPicker extends ColorPicker.Attrs {
}
export declare class ColorPicker extends InputWidget {
    properties: ColorPicker.Props;
    __view_type__: ColorPickerView;
    constructor(attrs?: Partial<ColorPicker.Attrs>);
}
//# sourceMappingURL=color_picker.d.ts.map