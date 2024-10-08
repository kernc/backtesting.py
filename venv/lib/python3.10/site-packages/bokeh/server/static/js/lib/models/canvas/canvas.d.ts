import type * as p from "../../core/properties";
import { OutputBackend } from "../../core/enums";
import { UIEventBus } from "../../core/ui_events";
import type { Context2d } from "../../core/util/canvas";
import { CanvasLayer } from "../../core/util/canvas";
import { UIElement, UIElementView } from "../ui/ui_element";
import type { PlotView } from "../plots/plot";
import type { ReglWrapper } from "../glyphs/webgl/regl_wrap";
import type { StyleSheetLike } from "../../core/dom";
import { InlineStyleSheet } from "../../core/dom";
export type FrameBox = [number, number, number, number];
export type WebGLState = {
    readonly canvas: HTMLCanvasElement;
    readonly regl_wrapper: ReglWrapper;
};
export declare class CanvasView extends UIElementView {
    model: Canvas;
    webgl: WebGLState | null;
    underlays_el: HTMLElement;
    primary: CanvasLayer;
    overlays: CanvasLayer;
    overlays_el: HTMLElement;
    events_el: HTMLElement;
    ui_event_bus: UIEventBus;
    protected _size: InlineStyleSheet;
    initialize(): void;
    get layers(): (HTMLElement | CanvasLayer)[];
    lazy_initialize(): Promise<void>;
    remove(): void;
    stylesheets(): StyleSheetLike[];
    render(): void;
    get pixel_ratio(): number;
    _update_bbox(): boolean;
    after_resize(): void;
    _after_resize(): void;
    resize(): void;
    prepare_webgl(frame_box: FrameBox): void;
    blit_webgl(ctx: Context2d): void;
    protected _clear_webgl(): void;
    compose(): CanvasLayer;
    create_layer(): CanvasLayer;
    to_blob(): Promise<Blob>;
    plot_views: PlotView[];
}
export declare namespace Canvas {
    type Attrs = p.AttrsOf<Props>;
    type Props = UIElement.Props & {
        hidpi: p.Property<boolean>;
        output_backend: p.Property<OutputBackend>;
    };
}
export interface Canvas extends Canvas.Attrs {
}
export declare class Canvas extends UIElement {
    properties: Canvas.Props;
    __view_type__: CanvasView;
    constructor(attrs?: Partial<Canvas.Attrs>);
}
//# sourceMappingURL=canvas.d.ts.map