import { Model } from "../../model";
import { View } from "../../core/view";
import type { GraphicsBox } from "../../core/graphics";
import type * as p from "../../core/properties";
import type { RendererView } from "../renderers/renderer";
export declare abstract class BaseTextView extends View {
    model: BaseText;
    readonly parent: RendererView;
    abstract graphics(): GraphicsBox;
}
export declare namespace BaseText {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        text: p.Property<string>;
    };
}
export interface BaseText extends BaseText.Attrs {
}
export declare class BaseText extends Model {
    properties: BaseText.Props;
    __view_type__: BaseTextView;
    constructor(attrs?: Partial<BaseText.Attrs>);
}
//# sourceMappingURL=base_text.d.ts.map