import { DOMElement, DOMElementView } from "./dom_element";
import type * as p from "../../core/properties";
export declare class SpanView extends DOMElementView {
    model: Span;
    static tag_name: "span";
}
export declare namespace Span {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props;
}
export interface Span extends Span.Attrs {
}
export declare class Span extends DOMElement {
    properties: Span.Props;
    __view_type__: SpanView;
}
export declare class DivView extends DOMElementView {
    model: Div;
    static tag_name: "div";
}
export declare namespace Div {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props;
}
export interface Div extends Div.Attrs {
}
export declare class Div extends DOMElement {
    properties: Div.Props;
    __view_type__: DivView;
}
export declare class TableView extends DOMElementView {
    model: Table;
    static tag_name: "table";
}
export declare namespace Table {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props;
}
export interface Table extends Table.Attrs {
}
export declare class Table extends DOMElement {
    properties: Table.Props;
    __view_type__: TableView;
}
export declare class TableRowView extends DOMElementView {
    model: TableRow;
    static tag_name: "tr";
}
export declare namespace TableRow {
    type Attrs = p.AttrsOf<Props>;
    type Props = DOMElement.Props;
}
export interface TableRow extends TableRow.Attrs {
}
export declare class TableRow extends DOMElement {
    properties: TableRow.Props;
    __view_type__: TableRowView;
}
//# sourceMappingURL=elements.d.ts.map