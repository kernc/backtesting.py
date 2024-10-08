import { Annotation, AnnotationView } from "./annotation";
import { LegendItem } from "./legend_item";
import { AlternationPolicy, Orientation, LegendLocation, LegendClickPolicy, Location } from "../../core/enums";
import type * as visuals from "../../core/visuals";
import * as mixins from "../../core/property_mixins";
import type * as p from "../../core/properties";
import { Signal0 } from "../../core/signaling";
import type { Size } from "../../core/layout";
import { BBox } from "../../core/util/bbox";
import type { Context2d } from "../../core/util/canvas";
import { TextBox } from "../../core/graphics";
import { Column, Row, Grid, ContentLayoutable, Sizeable, TextLayout } from "../../core/layout";
type HitTarget = {
    type: "entry";
    entry: LegendEntry;
};
type EntrySettings = {
    glyph_width: number;
    glyph_height: number;
    label_standoff: number;
    label_width: number;
    label_height: number;
};
declare class LegendEntry extends ContentLayoutable {
    readonly item: LegendItem;
    readonly label: unknown;
    readonly text: TextBox;
    readonly settings: EntrySettings;
    constructor(item: LegendItem, label: unknown, text: TextBox, settings: EntrySettings);
    get field(): string | null;
    _content_size(): Sizeable;
}
export declare class LegendView extends AnnotationView {
    model: Legend;
    visuals: Legend.Visuals;
    protected _get_size(): Size;
    update_layout(): void;
    connect_signals(): void;
    protected _bbox: BBox;
    get bbox(): BBox;
    protected grid: Grid<LegendEntry>;
    protected border_box: Column | Row;
    protected title_panel: TextLayout;
    get padding(): number;
    update_geometry(): void;
    compute_geometry(): void;
    interactive_hit(sx: number, sy: number): boolean;
    protected _hit_test(sx: number, sy: number): HitTarget | null;
    cursor(sx: number, sy: number): string | null;
    on_hit(sx: number, sy: number): boolean;
    protected _paint(): void;
    protected _draw_legend_box(ctx: Context2d): void;
    protected _draw_title(ctx: Context2d): void;
    protected _draw_legend_items(ctx: Context2d): void;
}
export declare namespace Legend {
    type Attrs = p.AttrsOf<Props>;
    type Props = Annotation.Props & {
        orientation: p.Property<Orientation>;
        ncols: p.Property<number | "auto">;
        nrows: p.Property<number | "auto">;
        location: p.Property<LegendLocation | [number, number]>;
        title: p.Property<string | null>;
        title_location: p.Property<Location>;
        title_standoff: p.Property<number>;
        label_standoff: p.Property<number>;
        glyph_height: p.Property<number>;
        glyph_width: p.Property<number>;
        label_height: p.Property<number>;
        label_width: p.Property<number>;
        margin: p.Property<number>;
        padding: p.Property<number>;
        spacing: p.Property<number>;
        items: p.Property<LegendItem[]>;
        click_policy: p.Property<LegendClickPolicy>;
        item_background_policy: p.Property<AlternationPolicy>;
    } & Mixins;
    type Mixins = mixins.LabelText & mixins.TitleText & mixins.InactiveFill & mixins.BorderLine & mixins.BackgroundFill & mixins.ItemBackgroundFill;
    type Visuals = Annotation.Visuals & {
        label_text: visuals.Text;
        title_text: visuals.Text;
        inactive_fill: visuals.Fill;
        border_line: visuals.Line;
        background_fill: visuals.Fill;
        item_background_fill: visuals.Fill;
    };
}
export interface Legend extends Legend.Attrs {
}
export declare class Legend extends Annotation {
    properties: Legend.Props;
    __view_type__: LegendView;
    item_change: Signal0<this>;
    constructor(attrs?: Partial<Legend.Attrs>);
    initialize(): void;
}
export {};
//# sourceMappingURL=legend.d.ts.map