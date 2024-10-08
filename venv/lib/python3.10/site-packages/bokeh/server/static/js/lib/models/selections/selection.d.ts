import { Model } from "../../model";
import type * as p from "../../core/properties";
import type { SelectionMode } from "../../core/enums";
import type { Glyph, GlyphView } from "../glyphs/glyph";
export declare const OpaqueIndices: import("../../core/kinds").Kinds.Arrayable<number>;
export type OpaqueIndices = typeof OpaqueIndices["__type__"];
export declare const MultiIndices: import("../../core/kinds").Kinds.Mapping<number, import("../../core/types").Arrayable<number>>;
export type MultiIndices = typeof MultiIndices["__type__"];
export type ImageIndex = {
    index: number;
    i: number;
    j: number;
    flat_index: number;
};
export type ImageIndices = ImageIndex[];
export declare namespace Selection {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        indices: p.Property<OpaqueIndices>;
        line_indices: p.Property<OpaqueIndices>;
        multiline_indices: p.Property<MultiIndices>;
        image_indices: p.Property<ImageIndex[]>;
        view: p.Property<GlyphView | null>;
        selected_glyphs: p.Property<Glyph[]>;
    };
}
export interface Selection extends Selection.Attrs {
}
export declare class Selection extends Model {
    properties: Selection.Props;
    constructor(attrs?: Partial<Selection.Attrs>);
    get_view(): GlyphView | null;
    get selected_glyph(): Glyph | null;
    add_to_selected_glyphs(glyph: Glyph): void;
    update(selection: Selection, _final?: boolean, mode?: SelectionMode): void;
    invert(size: number): void;
    clear(): void;
    map(mapper: (index: number) => number): Selection;
    is_empty(): boolean;
    protected _union_image_indices(...collection: ImageIndices[]): ImageIndices;
    update_through_replacement(other: Selection): void;
    update_through_toggle(other: Selection): void;
    update_through_union(other: Selection): void;
    update_through_intersection(other: Selection): void;
    update_through_subtraction(other: Selection): void;
    update_through_symmetric_difference(other: Selection): void;
}
//# sourceMappingURL=selection.d.ts.map