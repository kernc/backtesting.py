import type { LayoutDOMView } from "./layout_dom";
import type { Container } from "../../core/layout/grid";
import { Layoutable } from "../../core/layout/layoutable";
import type { Sizeable, SizeHint, Size } from "../../core/layout";
import { BBox } from "../../core/util/bbox";
export declare class GridAlignmentLayout extends Layoutable {
    readonly children: Container<LayoutDOMView>;
    constructor(children: Container<LayoutDOMView>);
    protected _measure(_viewport: Sizeable): SizeHint;
    compute(viewport?: Partial<Size>): void;
    _set_geometry(outer: BBox, inner: BBox): void;
}
//# sourceMappingURL=alignments.d.ts.map