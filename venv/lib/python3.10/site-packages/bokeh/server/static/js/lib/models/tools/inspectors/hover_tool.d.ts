import type { ViewStorage, IterViews, ViewOf } from "../../../core/build_views";
import { Anchor, HoverMode, LinePolicy, MutedPolicy, PointPolicy, TooltipAttachment } from "../../../core/enums";
import type { Geometry, GeometryData, PointGeometry, SpanGeometry } from "../../../core/geometry";
import type * as p from "../../../core/properties";
import type { Arrayable } from "../../../core/types";
import type { MoveEvent } from "../../../core/ui_events";
import type { CallbackLike1 } from "../../../core/util/callbacks";
import type { Formatters, Index } from "../../../core/util/templating";
import { Tooltip } from "../../ui/tooltip";
import { DOMElement } from "../../dom/dom_element";
import type { GlyphView } from "../../glyphs/glyph";
import { DataRenderer } from "../../renderers/data_renderer";
import { GlyphRenderer } from "../../renderers/glyph_renderer";
import type { Renderer } from "../../renderers/renderer";
import type { ImageIndex, MultiIndices, OpaqueIndices, Selection } from "../../selections/selection";
import type { ColumnarDataSource } from "../../sources/columnar_data_source";
import { InspectTool, InspectToolView } from "./inspect_tool";
export type TooltipVars = {
    index: number | null;
    glyph_view: GlyphView;
    type: string;
    x: number;
    y: number;
    sx: number;
    sy: number;
    snap_x: number;
    snap_y: number;
    snap_sx: number;
    snap_sy: number;
    name: string | null;
    indices?: MultiIndices | OpaqueIndices;
    segment_index?: number;
    image_index?: ImageIndex;
};
export declare function _nearest_line_hit(i: number, geometry: PointGeometry | SpanGeometry, dx: Arrayable<number>, dy: Arrayable<number>): [[number, number], number];
export declare function _line_hit(xs: Arrayable<number>, ys: Arrayable<number>, i: number): [[number, number], number];
export declare class HoverToolView extends InspectToolView {
    model: HoverTool;
    protected _current_sxy: [number, number] | null;
    readonly ttmodels: Map<GlyphRenderer, Tooltip>;
    protected readonly _ttviews: ViewStorage<Tooltip>;
    protected _template_el?: HTMLElement;
    protected _template_view?: ViewOf<DOMElement>;
    children(): IterViews;
    lazy_initialize(): Promise<void>;
    remove(): void;
    connect_signals(): void;
    protected _update_ttmodels(): Promise<void>;
    get computed_renderers(): DataRenderer[];
    _clear(): void;
    _move(ev: MoveEvent): void;
    _move_exit(): void;
    _inspect(sx: number, sy: number): void;
    _update(renderer: GlyphRenderer, geometry: PointGeometry | SpanGeometry, tooltip: Tooltip): void;
    update([renderer, { geometry }]: [GlyphRenderer, {
        geometry: Geometry;
    }]): void;
    _emit_callback(geometry: PointGeometry | SpanGeometry): void;
    _create_template(tooltips: [string, string][]): HTMLElement;
    _render_template(template: HTMLElement, tooltips: [string, string][], ds: ColumnarDataSource, index: Index | null, vars: TooltipVars): HTMLElement;
    _render_tooltips(ds: ColumnarDataSource, vars: TooltipVars): Element | null;
    protected _update_template(template_view: ViewOf<DOMElement>, ds: ColumnarDataSource, i: Index | null, vars: TooltipVars): void;
}
export declare namespace HoverTool {
    type Attrs = p.AttrsOf<Props>;
    type Props = InspectTool.Props & {
        tooltips: p.Property<null | DOMElement | string | [string, string][] | ((source: ColumnarDataSource, vars: TooltipVars) => HTMLElement)>;
        formatters: p.Property<Formatters>;
        renderers: p.Property<DataRenderer[] | "auto">;
        mode: p.Property<HoverMode>;
        muted_policy: p.Property<MutedPolicy>;
        point_policy: p.Property<PointPolicy>;
        line_policy: p.Property<LinePolicy>;
        show_arrow: p.Property<boolean>;
        anchor: p.Property<Anchor>;
        attachment: p.Property<TooltipAttachment>;
        callback: p.Property<CallbackLike1<HoverTool, {
            geometry: GeometryData;
            renderer: Renderer;
            index: Selection;
        }> | null>;
    };
}
export interface HoverTool extends HoverTool.Attrs {
}
export declare class HoverTool extends InspectTool {
    properties: HoverTool.Props;
    __view_type__: HoverToolView;
    constructor(attrs?: Partial<HoverTool.Attrs>);
    tool_name: string;
    tool_icon: string;
}
//# sourceMappingURL=hover_tool.d.ts.map