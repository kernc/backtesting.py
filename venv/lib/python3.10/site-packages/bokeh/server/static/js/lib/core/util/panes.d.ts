import type { StyleSheetLike } from "../dom";
import { ClassList } from "../dom";
import type { Orientation } from "../enums";
export type Options = {
    target: HTMLElement;
    prevent_hide?: HTMLElement | ((event: UIEvent) => boolean);
    extra_stylesheets?: StyleSheetLike[];
};
export declare class DropPane {
    contents: HTMLElement[];
    readonly el: HTMLElement;
    readonly shadow_el: ShadowRoot;
    protected _open: boolean;
    get is_open(): boolean;
    readonly target: HTMLElement;
    readonly orientation: Orientation;
    readonly reversed: boolean;
    readonly prevent_hide?: HTMLElement | ((event: UIEvent) => boolean);
    readonly extra_stylesheets: StyleSheetLike[];
    readonly class_list: ClassList;
    constructor(contents: HTMLElement[], options: Options);
    protected _on_mousedown: (event: UIEvent) => void;
    protected _on_keydown: (event: KeyboardEvent) => void;
    protected _on_blur: () => void;
    remove(): void;
    protected _listen(): void;
    protected _unlisten(): void;
    stylesheets(): StyleSheetLike[];
    empty(): void;
    render(): void;
    show(): void;
    hide(): void;
    toggle(): void;
}
//# sourceMappingURL=panes.d.ts.map