import type { ViewOf, View } from "../../core/view";
import { StyledElement, StyledElementView } from "../ui/styled_element";
import * as visuals from "../../core/visuals";
import { RenderLevel } from "../../core/enums";
import type * as p from "../../core/properties";
import type { CanvasLayer } from "../../core/util/canvas";
import type { Plot, PlotView } from "../plots/plot";
import type { CanvasView } from "../canvas/canvas";
import { CoordinateTransform, CoordinateMapping } from "../coordinates/coordinate_mapping";
import type { Node } from "../coordinates/node";
import type { XY } from "../../core/util/bbox";
import { Menu } from "../ui/menus/menu";
import type { HTML } from "../dom/html";
import { RendererGroup } from "./renderer_group";
import { InlineStyleSheet } from "../../core/dom";
import type { StyleSheetLike } from "../../core/dom";
export declare abstract class RendererView extends StyledElementView implements visuals.Paintable {
    model: Renderer;
    visuals: Renderer.Visuals;
    readonly parent: PlotView;
    readonly position: InlineStyleSheet;
    rendering_target(): HTMLElement;
    protected _context_menu: ViewOf<Menu> | null;
    get context_menu(): ViewOf<Menu> | null;
    protected _coordinates?: CoordinateTransform;
    get coordinates(): CoordinateTransform;
    private _custom_coordinates;
    set coordinates(custom_coordinates: CoordinateTransform | null);
    stylesheets(): StyleSheetLike[];
    initialize(): void;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    protected _initialize_coordinates(): CoordinateTransform;
    get plot_view(): PlotView;
    get plot_model(): Plot;
    get layer(): CanvasLayer;
    get canvas(): CanvasView;
    request_paint(): void;
    request_layout(): void;
    notify_finished(): void;
    notify_finished_after_paint(): void;
    interactive_hit?(sx: number, sy: number): boolean;
    get needs_clip(): boolean;
    get has_webgl(): boolean;
    get displayed(): boolean;
    get is_renderable(): boolean;
    paint(): void;
    protected abstract _paint(): void;
    renderer_view<T extends Renderer>(_renderer: T): T["__view_type__"] | undefined;
    /**
     * Geometry setup that doesn't change between paints.
     */
    update_geometry(): void;
    /**
     * Geometry setup that changes between paints.
     */
    compute_geometry(): void;
    /**
     * Updates the position of the associated DOM element.
     */
    update_position(): void;
    resolve_frame(): View | null;
    resolve_canvas(): View | null;
    resolve_plot(): View | null;
    resolve_symbol(node: Node): XY | number;
    get attribution(): HTML | string | null;
}
export declare namespace Renderer {
    type Attrs = p.AttrsOf<Props>;
    type Props = StyledElement.Props & {
        group: p.Property<RendererGroup | null>;
        level: p.Property<RenderLevel>;
        visible: p.Property<boolean>;
        x_range_name: p.Property<string>;
        y_range_name: p.Property<string>;
        coordinates: p.Property<CoordinateMapping | null>;
        propagate_hover: p.Property<boolean>;
        context_menu: p.Property<Menu | null>;
    };
    type Visuals = visuals.Visuals;
}
export interface Renderer extends Renderer.Attrs {
}
export declare abstract class Renderer extends StyledElement {
    properties: Renderer.Props;
    __view_type__: RendererView;
    constructor(attrs?: Partial<Renderer.Attrs>);
}
//# sourceMappingURL=renderer.d.ts.map