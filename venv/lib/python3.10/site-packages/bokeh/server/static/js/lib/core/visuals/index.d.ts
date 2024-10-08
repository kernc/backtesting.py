import { Line, LineScalar, LineVector } from "./line";
import { Fill, FillScalar, FillVector } from "./fill";
import { Text, TextScalar, TextVector } from "./text";
import { Hatch, HatchScalar, HatchVector } from "./hatch";
import { Image, ImageScalar, ImageVector } from "./image";
export { Line, LineScalar, LineVector };
export { Fill, FillScalar, FillVector };
export { Text, TextScalar, TextVector };
export { Hatch, HatchScalar, HatchVector };
export { Image, ImageScalar, ImageVector };
import type { DOMComponentView } from "../dom_view";
import type { Paintable } from "./visual";
export type { Paintable };
import { VisualProperties, VisualUniforms } from "./visual";
export { VisualProperties, VisualUniforms };
export declare class Visuals {
    [Symbol.iterator](): Generator<VisualProperties | VisualUniforms, void, undefined>;
    protected _visuals: (VisualProperties | VisualUniforms)[];
    constructor(view: DOMComponentView & Paintable);
}
//# sourceMappingURL=index.d.ts.map