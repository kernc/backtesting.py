import { Model } from "../../model";
import type { Geometry } from "../../core/geometry";
import type { HitTestResult } from "../../core/hittest";
import type { SelectionMode } from "../../core/enums";
import type { GlyphRendererView } from "../renderers/glyph_renderer";
import type { ColumnarDataSource } from "../sources/columnar_data_source";
export declare abstract class SelectionPolicy extends Model {
    abstract hit_test(geometry: Geometry, renderer_views: GlyphRendererView[]): HitTestResult;
    do_selection(hit_test_result: HitTestResult, source: ColumnarDataSource, final: boolean, mode: SelectionMode): boolean;
}
export declare class IntersectRenderers extends SelectionPolicy {
    hit_test(geometry: Geometry, renderer_views: GlyphRendererView[]): HitTestResult;
}
export declare class UnionRenderers extends SelectionPolicy {
    hit_test(geometry: Geometry, renderer_views: GlyphRendererView[]): HitTestResult;
}
//# sourceMappingURL=interaction_policy.d.ts.map