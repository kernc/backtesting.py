import { Control, ControlView } from "./control";
import type { TooltipView } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { HTML, HTMLView } from "../dom/html";
import type { IterViews } from "../../core/build_views";
import type { StyleSheetLike } from "../../core/dom";
import type * as p from "../../core/properties";
import { ModelEvent } from "../../core/bokeh_events";
export type HTMLInputElementLike = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare class ClearInput extends ModelEvent {
    readonly model: InputWidget;
    constructor(model: InputWidget);
    static from_values(values: object): ClearInput;
}
export declare abstract class InputWidgetView extends ControlView {
    model: InputWidget;
    protected title: HTMLView | string;
    protected description: TooltipView | string | null;
    protected input_el: HTMLInputElementLike;
    protected title_el: HTMLLabelElement;
    desc_el: HTMLElement | null;
    protected group_el: HTMLElement;
    controls(): Generator<HTMLInputElementLike, void, unknown>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
    protected _build_description_el(): HTMLElement | null;
    protected _build_title(): Promise<void>;
    protected _build_description(): Promise<void>;
    protected _build_title_el(): HTMLLabelElement;
    protected abstract _render_input(): HTMLElement;
    change_input(): void;
}
export declare namespace InputWidget {
    type Attrs = p.AttrsOf<Props>;
    type Props = Control.Props & {
        title: p.Property<string | HTML>;
        description: p.Property<string | Tooltip | null>;
    };
}
export interface InputWidget extends InputWidget.Attrs {
}
export declare abstract class InputWidget extends Control {
    properties: InputWidget.Props;
    __view_type__: InputWidgetView;
    constructor(attrs?: Partial<InputWidget.Attrs>);
}
//# sourceMappingURL=input_widget.d.ts.map