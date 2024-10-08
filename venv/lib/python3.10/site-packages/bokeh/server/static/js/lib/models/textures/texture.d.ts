import { Model } from "../../model";
import type { PatternSource } from "../../core/visuals/patterns";
import type { Color } from "../../core/types";
import { TextureRepetition } from "../../core/enums";
import type * as p from "../../core/properties";
export declare namespace Texture {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props & {
        repetition: p.Property<TextureRepetition>;
    };
}
export interface Texture extends Texture.Attrs {
}
export declare abstract class Texture extends Model {
    properties: Texture.Props;
    constructor(attrs?: Partial<Texture.Attrs>);
    abstract get_pattern(color: Color, alpha: number, scale: number, weight: number): PatternSource | Promise<PatternSource>;
}
//# sourceMappingURL=texture.d.ts.map