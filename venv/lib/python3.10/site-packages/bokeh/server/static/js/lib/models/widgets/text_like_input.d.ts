import { InputWidget, InputWidgetView } from "./input_widget";
import type * as p from "../../core/properties";
export declare abstract class TextLikeInputView extends InputWidgetView {
    model: TextLikeInput;
    input_el: HTMLInputElement | HTMLTextAreaElement;
    connect_signals(): void;
    render(): void;
    change_input(): void;
    change_input_value(): void;
}
export declare namespace TextLikeInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<string>;
        value_input: p.Property<string>;
        placeholder: p.Property<string>;
        max_length: p.Property<number | null>;
    };
}
export interface TextLikeInput extends TextLikeInput.Attrs {
}
export declare class TextLikeInput extends InputWidget {
    properties: TextLikeInput.Props;
    __view_type__: TextLikeInputView;
    constructor(attrs?: Partial<TextLikeInput.Attrs>);
}
//# sourceMappingURL=text_like_input.d.ts.map