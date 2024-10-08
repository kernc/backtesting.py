import { Model } from "../../model";
import type * as p from "../../core/properties";
import type { BBox } from "../../core/util/bbox";
import type { Dict } from "../../core/types";
import { Indices } from "../../core/types";
export type DistanceMeasure = (i: number, j: number) => number;
export declare namespace LabelingPolicy {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface LabelingPolicy extends LabelingPolicy.Attrs {
}
export declare abstract class LabelingPolicy extends Model {
    properties: LabelingPolicy.Props;
    constructor(attrs?: Partial<LabelingPolicy.Attrs>);
    abstract filter(indices: Indices, bboxes: BBox[], distance: DistanceMeasure): Indices;
}
export declare namespace AllLabels {
    type Attrs = p.AttrsOf<Props>;
    type Props = LabelingPolicy.Props;
}
export interface AllLabels extends AllLabels.Attrs {
}
export declare class AllLabels extends LabelingPolicy {
    properties: AllLabels.Props;
    constructor(attrs?: Partial<AllLabels.Attrs>);
    filter(indices: Indices, _bboxes: BBox[], _distance: DistanceMeasure): Indices;
}
export declare namespace NoOverlap {
    type Attrs = p.AttrsOf<Props>;
    type Props = LabelingPolicy.Props & {
        min_distance: p.Property<number>;
    };
}
export interface NoOverlap extends NoOverlap.Attrs {
}
export declare class NoOverlap extends LabelingPolicy {
    properties: NoOverlap.Props;
    constructor(attrs?: Partial<NoOverlap.Attrs>);
    filter(indices: Indices, _bboxes: BBox[], distance: DistanceMeasure): Indices;
}
export declare namespace CustomLabelingPolicy {
    type Attrs = p.AttrsOf<Props>;
    type Props = LabelingPolicy.Props & {
        args: p.Property<Dict<unknown>>;
        code: p.Property<string>;
    };
}
export interface CustomLabelingPolicy extends CustomLabelingPolicy.Attrs {
}
export declare class CustomLabelingPolicy extends LabelingPolicy {
    properties: CustomLabelingPolicy.Props;
    constructor(attrs?: Partial<CustomLabelingPolicy.Attrs>);
    get names(): string[];
    get values(): unknown[];
    get func(): GeneratorFunction;
    filter(indices: Indices, bboxes: BBox[], distance: DistanceMeasure): Indices;
}
//# sourceMappingURL=labeling.d.ts.map