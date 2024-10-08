import { Renderer, RendererView } from "./renderer";
import type * as p from "../../core/properties";
export declare abstract class GuideRendererView extends RendererView {
    model: GuideRenderer;
    visuals: GuideRenderer.Visuals;
}
export declare namespace GuideRenderer {
    type Attrs = p.AttrsOf<Props>;
    type Props = Renderer.Props;
    type Visuals = Renderer.Visuals;
}
export interface GuideRenderer extends GuideRenderer.Attrs {
}
export declare abstract class GuideRenderer extends Renderer {
    properties: GuideRenderer.Props;
    __view_type__: GuideRendererView;
    constructor(attrs?: Partial<GuideRenderer.Attrs>);
}
//# sourceMappingURL=guide_renderer.d.ts.map