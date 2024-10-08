import { Model } from "../../model";
import type * as p from "../../core/properties";
export declare namespace Coordinate {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface Coordinate extends Coordinate.Attrs {
}
export declare abstract class Coordinate extends Model {
    properties: Coordinate.Props;
    constructor(attrs?: Partial<Coordinate.Attrs>);
}
//# sourceMappingURL=coordinate.d.ts.map