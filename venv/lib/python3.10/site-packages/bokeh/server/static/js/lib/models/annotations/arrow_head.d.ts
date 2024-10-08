import { Marking, MarkingView } from "../graphics/marking";
import type * as visuals from "../../core/visuals";
import { LineVector, FillVector } from "../../core/property_mixins";
import * as p from "../../core/properties";
import type { Context2d } from "../../core/util/canvas";
export declare abstract class ArrowHeadView extends MarkingView implements visuals.Paintable {
    abstract clip(ctx: Context2d, i: number): void;
}
export declare namespace ArrowHead {
    type Attrs = p.AttrsOf<Props>;
    type Props = Marking.Props & {
        size: p.NumberSpec;
    };
    type Visuals = visuals.Visuals;
}
export interface ArrowHead extends ArrowHead.Attrs {
}
export declare abstract class ArrowHead extends Marking {
    properties: ArrowHead.Props;
    __view_type__: ArrowHeadView;
    constructor(attrs?: Partial<ArrowHead.Attrs>);
}
export declare class OpenHeadView extends ArrowHeadView {
    model: OpenHead;
    visuals: OpenHead.Visuals;
    clip(ctx: Context2d, i: number): void;
    paint(ctx: Context2d, i: number): void;
}
export declare namespace OpenHead {
    type Attrs = p.AttrsOf<Props>;
    type Props = ArrowHead.Props & Mixins;
    type Mixins = LineVector;
    type Visuals = ArrowHead.Visuals & {
        line: visuals.LineVector;
    };
}
export interface OpenHead extends OpenHead.Attrs {
}
export declare class OpenHead extends ArrowHead {
    properties: OpenHead.Props;
    __view_type__: OpenHeadView;
    constructor(attrs?: Partial<OpenHead.Attrs>);
}
export declare class NormalHeadView extends ArrowHeadView {
    model: NormalHead;
    visuals: NormalHead.Visuals;
    clip(ctx: Context2d, i: number): void;
    paint(ctx: Context2d, i: number): void;
}
export declare namespace NormalHead {
    type Attrs = p.AttrsOf<Props>;
    type Props = ArrowHead.Props & Mixins;
    type Mixins = LineVector & FillVector;
    type Visuals = ArrowHead.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
    };
}
export interface NormalHead extends NormalHead.Attrs {
}
export declare class NormalHead extends ArrowHead {
    properties: NormalHead.Props;
    __view_type__: NormalHeadView;
    constructor(attrs?: Partial<NormalHead.Attrs>);
}
export declare class VeeHeadView extends ArrowHeadView {
    model: VeeHead;
    visuals: VeeHead.Visuals;
    clip(ctx: Context2d, i: number): void;
    paint(ctx: Context2d, i: number): void;
}
export declare namespace VeeHead {
    type Attrs = p.AttrsOf<Props>;
    type Props = ArrowHead.Props & Mixins;
    type Mixins = LineVector & FillVector;
    type Visuals = ArrowHead.Visuals & {
        line: visuals.LineVector;
        fill: visuals.FillVector;
    };
}
export interface VeeHead extends VeeHead.Attrs {
}
export declare class VeeHead extends ArrowHead {
    properties: VeeHead.Props;
    __view_type__: VeeHeadView;
    constructor(attrs?: Partial<VeeHead.Attrs>);
}
export declare class TeeHeadView extends ArrowHeadView {
    model: TeeHead;
    visuals: TeeHead.Visuals;
    paint(ctx: Context2d, i: number): void;
    clip(_ctx: Context2d, _i: number): void;
}
export declare namespace TeeHead {
    type Attrs = p.AttrsOf<Props>;
    type Props = ArrowHead.Props & Mixins;
    type Mixins = LineVector;
    type Visuals = ArrowHead.Visuals & {
        line: visuals.LineVector;
    };
}
export interface TeeHead extends TeeHead.Attrs {
}
export declare class TeeHead extends ArrowHead {
    properties: TeeHead.Props;
    __view_type__: TeeHeadView;
    constructor(attrs?: Partial<TeeHead.Attrs>);
}
//# sourceMappingURL=arrow_head.d.ts.map