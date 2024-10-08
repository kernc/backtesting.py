import { TextLikeInput, TextLikeInputView } from "./text_like_input";
import type * as p from "../../core/properties";
export declare class TextInputView extends TextLikeInputView {
    model: TextInput;
    input_el: HTMLInputElement;
    connect_signals(): void;
    protected _render_input(): HTMLElement;
    render(): void;
    protected _keyup(event: KeyboardEvent): void;
}
export declare namespace TextInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = TextLikeInput.Props & {
        prefix: p.Property<string | null>;
        suffix: p.Property<string | null>;
    };
}
export interface TextInput extends TextInput.Attrs {
}
export declare class TextInput extends TextLikeInput {
    properties: TextInput.Props;
    __view_type__: TextInputView;
    constructor(attrs?: Partial<TextInput.Attrs>);
}
//# sourceMappingURL=text_input.d.ts.map