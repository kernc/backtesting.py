import { Model } from "../../model";
import * as dom from "../../core/dom";
import type * as p from "../../core/properties";
export declare namespace StyleSheet {
    type Attrs = p.AttrsOf<Props>;
    type Props = Model.Props;
}
export interface StyleSheet extends StyleSheet.Attrs {
}
export declare abstract class StyleSheet extends Model {
    properties: StyleSheet.Props;
    constructor(attrs?: Partial<StyleSheet.Attrs>);
    abstract underlying(): dom.StyleSheet;
}
export declare namespace InlineStyleSheet {
    type Attrs = p.AttrsOf<Props>;
    type Props = StyleSheet.Props & {
        css: p.Property<string>;
    };
}
export interface InlineStyleSheet extends InlineStyleSheet.Attrs {
}
export declare class InlineStyleSheet extends StyleSheet {
    properties: InlineStyleSheet.Props;
    constructor(attrs?: Partial<InlineStyleSheet.Attrs>);
    underlying(): dom.StyleSheet;
}
export declare namespace ImportedStyleSheet {
    type Attrs = p.AttrsOf<Props>;
    type Props = StyleSheet.Props & {
        url: p.Property<string>;
    };
}
export interface ImportedStyleSheet extends ImportedStyleSheet.Attrs {
}
export declare class ImportedStyleSheet extends StyleSheet {
    properties: ImportedStyleSheet.Props;
    constructor(attrs?: Partial<ImportedStyleSheet.Attrs>);
    underlying(): dom.StyleSheet;
}
export declare namespace GlobalInlineStyleSheet {
    type Attrs = p.AttrsOf<Props>;
    type Props = InlineStyleSheet.Props;
}
export interface GlobalInlineStyleSheet extends GlobalInlineStyleSheet.Attrs {
}
export declare class GlobalInlineStyleSheet extends InlineStyleSheet {
    properties: GlobalInlineStyleSheet.Props;
    constructor(attrs?: Partial<GlobalInlineStyleSheet.Attrs>);
    private _underlying;
    underlying(): dom.StyleSheet;
}
export declare namespace GlobalImportedStyleSheet {
    type Attrs = p.AttrsOf<Props>;
    type Props = ImportedStyleSheet.Props;
}
export interface GlobalImportedStyleSheet extends GlobalImportedStyleSheet.Attrs {
}
export declare class GlobalImportedStyleSheet extends ImportedStyleSheet {
    properties: GlobalImportedStyleSheet.Props;
    constructor(attrs?: Partial<GlobalImportedStyleSheet.Attrs>);
    private _underlying;
    underlying(): dom.StyleSheet;
}
//# sourceMappingURL=stylesheets.d.ts.map