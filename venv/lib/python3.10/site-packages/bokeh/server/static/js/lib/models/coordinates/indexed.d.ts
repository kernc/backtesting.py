import { Coordinate } from "./coordinate";
import type * as p from "../../core/properties";
import type { GlyphRenderer } from "../renderers/glyph_renderer";
export declare namespace Indexed {
    type Attrs = p.AttrsOf<Props>;
    type Props = Coordinate.Props & {
        index: p.Property<number>;
        renderer: p.Property<GlyphRenderer>;
    };
}
export interface Indexed extends Indexed.Attrs {
}
export declare class Indexed extends Coordinate {
    properties: Indexed.Props;
    constructor(attrs?: Partial<Indexed.Attrs>);
}
//# sourceMappingURL=indexed.d.ts.map