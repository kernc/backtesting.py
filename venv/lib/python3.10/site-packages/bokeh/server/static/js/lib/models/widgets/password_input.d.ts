import { TextInput, TextInputView } from "./text_input";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
export declare class PasswordInputView extends TextInputView {
    model: PasswordInput;
    toggle_el: HTMLElement;
    stylesheets(): StyleSheetLike[];
    render(): void;
}
export declare namespace PasswordInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = TextInput.Props;
}
export interface PasswordInput extends PasswordInput.Attrs {
}
export declare class PasswordInput extends TextInput {
    properties: PasswordInput.Props;
    __view_type__: PasswordInputView;
    constructor(attrs?: Partial<PasswordInput.Attrs>);
}
//# sourceMappingURL=password_input.d.ts.map