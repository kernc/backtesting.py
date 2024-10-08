import { TextInput, TextInputView } from "./text_input";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
declare const SearchStrategy: import("../../core/kinds").Kinds.Enum<"includes" | "starts_with">;
type SearchStrategy = typeof SearchStrategy["__type__"];
export declare class AutocompleteInputView extends TextInputView {
    model: AutocompleteInput;
    protected _open: boolean;
    protected _last_value: string;
    protected _hover_index: number;
    protected menu: HTMLElement;
    stylesheets(): StyleSheetLike[];
    render(): void;
    change_input(): void;
    protected _update_completions(completions: string[]): void;
    compute_completions(value: string): string[];
    protected _toggle_menu(): void;
    protected _show_menu(): void;
    protected _hide_menu(): void;
    protected _menu_click(event: MouseEvent): void;
    protected _menu_hover(event: MouseEvent): void;
    protected _bump_hover(new_index: number): void;
    protected _keyup(event: KeyboardEvent): void;
}
export declare namespace AutocompleteInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = TextInput.Props & {
        completions: p.Property<string[]>;
        min_characters: p.Property<number>;
        max_completions: p.Property<number | null>;
        case_sensitive: p.Property<boolean>;
        restrict: p.Property<boolean>;
        search_strategy: p.Property<SearchStrategy>;
    };
}
export interface AutocompleteInput extends AutocompleteInput.Attrs {
}
export declare class AutocompleteInput extends TextInput {
    properties: AutocompleteInput.Props;
    __view_type__: AutocompleteInputView;
    constructor(attrs?: Partial<AutocompleteInput.Attrs>);
}
export {};
//# sourceMappingURL=autocomplete_input.d.ts.map