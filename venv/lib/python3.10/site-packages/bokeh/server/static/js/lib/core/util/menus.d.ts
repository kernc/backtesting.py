import type { StyleSheetLike } from "../dom";
import { ClassList } from "../dom";
import type { Orientation } from "../enums";
export type ScreenPoint = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};
export type At = ScreenPoint | {
    left_of: HTMLElement;
} | {
    right_of: HTMLElement;
} | {
    below: HTMLElement;
} | {
    above: HTMLElement;
};
export type MenuEntry = {
    icon?: string;
    label?: string;
    tooltip?: string;
    class?: string;
    content?: HTMLElement;
    custom?: HTMLElement;
    active?: () => boolean;
    handler?: () => void;
    if?: () => boolean;
};
export type MenuItem = MenuEntry | null;
export type MenuOptions = {
    target: HTMLElement;
    orientation?: Orientation;
    reversed?: boolean;
    prevent_hide?: (event: MouseEvent) => boolean;
    extra_styles?: StyleSheetLike[];
    entry_handler?: (entry: MenuEntry, i: number) => void;
};
export declare class ContextMenu {
    readonly items: MenuItem[];
    readonly el: HTMLElement;
    readonly shadow_el: ShadowRoot;
    protected _open: boolean;
    get is_open(): boolean;
    get can_open(): boolean;
    readonly target: HTMLElement;
    readonly orientation: Orientation;
    readonly reversed: boolean;
    readonly prevent_hide?: (event: MouseEvent) => boolean;
    readonly extra_styles: StyleSheetLike[];
    readonly entry_handler?: (entry: MenuEntry, i: number) => void;
    readonly class_list: ClassList;
    constructor(items: MenuItem[], options: MenuOptions);
    protected _item_click: (entry: MenuEntry, i: number) => void;
    protected _on_mousedown: (event: MouseEvent) => void;
    protected _on_keydown: (event: KeyboardEvent) => void;
    protected _on_blur: () => void;
    remove(): void;
    protected _listen(): void;
    protected _unlisten(): void;
    protected _position(at: At): void;
    stylesheets(): StyleSheetLike[];
    empty(): void;
    render(): void;
    show(at?: At): void;
    hide(): void;
    toggle(at?: At): void;
}
//# sourceMappingURL=menus.d.ts.map