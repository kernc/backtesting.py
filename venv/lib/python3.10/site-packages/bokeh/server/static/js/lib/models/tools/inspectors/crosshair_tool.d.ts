import { InspectTool, InspectToolView } from "./inspect_tool";
import type { Renderer } from "../../renderers/renderer";
import { Span } from "../../annotations/span";
import { Dimensions } from "../../../core/enums";
import type { MoveEvent } from "../../../core/ui_events";
import type * as p from "../../../core/properties";
import type { Color } from "../../../core/types";
export declare class CrosshairToolView extends InspectToolView {
    model: CrosshairTool;
    protected _spans: Span[];
    get overlays(): Renderer[];
    initialize(): void;
    connect_signals(): void;
    protected _update_overlays(): void;
    _move(ev: MoveEvent): void;
    _move_exit(_e: MoveEvent): void;
    _update_spans(sx: number, sy: number): void;
}
export declare namespace CrosshairTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = InspectTool.Props & {
        overlay: p.Property<"auto" | Span | [Span, Span]>;
        dimensions: p.Property<Dimensions>;
        line_color: p.Property<Color>;
        line_width: p.Property<number>;
        line_alpha: p.Property<number>;
    };
}
export interface CrosshairTool extends CrosshairTool.Attrs {
}
export declare class CrosshairTool extends InspectTool {
    properties: CrosshairTool.Props;
    __view_type__: CrosshairToolView;
    constructor(attrs?: Partial<CrosshairTool.Attrs>);
    tool_name: string;
    tool_icon: string;
    get tooltip(): string;
}
//# sourceMappingURL=crosshair_tool.d.ts.map