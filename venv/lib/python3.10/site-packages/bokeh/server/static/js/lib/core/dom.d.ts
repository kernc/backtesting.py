import { BBox } from "./util/bbox";
import type { Size, Box, Extents, PlainObject } from "./types";
import type { CSSStyles, CSSStyleSheetDecl } from "./css";
export type Optional<T> = {
    [P in keyof T]?: T[P] | null | undefined;
};
export type HTMLElementName = keyof HTMLElementTagNameMap;
export type CSSClass = string;
export type ElementOurAttrs = {
    class?: CSSClass | (CSSClass | null | undefined)[];
    style?: CSSStyles | string;
    data?: PlainObject<string | null | undefined>;
};
export type ElementCommonAttrs = {
    id: Element["id"];
    title: HTMLElement["title"];
    tabIndex: HTMLOrSVGElement["tabIndex"];
};
export type HTMLAttrs<_T extends HTMLElementName, ElementSpecificAttrs> = ElementOurAttrs & Optional<ElementCommonAttrs> & Optional<ElementSpecificAttrs>;
export type HTMLItem = string | Node | NodeList | HTMLCollection | null | undefined;
export type HTMLChild = HTMLItem | HTMLItem[];
export declare function create_element<T extends keyof HTMLElementTagNameMap>(tag: T, attrs: HTMLAttrs<T, {}> | null, ...children: HTMLChild[]): HTMLElementTagNameMap[T];
export type AAttrs = {
    href: HTMLAnchorElement["href"];
    target: HTMLAnchorElement["target"];
};
export type AbbrAttrs = {};
export type AddressAttrs = {};
export type AreaAttrs = {};
export type ArticleAttrs = {};
export type AsideAttrs = {};
export type AudioAttrs = {};
export type BAttrs = {};
export type BaseAttrs = {};
export type BdiAttrs = {};
export type BdoAttrs = {};
export type BlockQuoteAttrs = {};
export type BodyAttrs = {};
export type BrAttrs = {};
export type ButtonAttrs = {
    type: "button";
    disabled: HTMLButtonElement["disabled"];
};
export type CanvasAttrs = {
    width: HTMLCanvasElement["width"];
    height: HTMLCanvasElement["height"];
};
export type CaptionAttrs = {};
export type CiteAttrs = {};
export type CodeAttrs = {};
export type ColAttrs = {};
export type ColGroupAttrs = {};
export type DataAttrs = {};
export type DataListAttrs = {};
export type DdAttrs = {};
export type DelAttrs = {};
export type DetailsAttrs = {};
export type DfnAttrs = {};
export type DialogAttrs = {};
export type DivAttrs = {};
export type DlAttrs = {};
export type DtAttrs = {};
export type EmAttrs = {};
export type EmbedAttrs = {};
export type FieldSetAttrs = {};
export type FigCaptionAttrs = {};
export type FigureAttrs = {};
export type FooterAttrs = {};
export type FormAttrs = {};
export type H1Attrs = {};
export type H2Attrs = {};
export type H3Attrs = {};
export type H4Attrs = {};
export type H5Attrs = {};
export type H6Attrs = {};
export type HeadAttrs = {};
export type HeaderAttrs = {};
export type HGroupAttrs = {};
export type HrAttrs = {};
export type HtmlAttrs = {};
export type IAttrs = {};
export type IFrameAttrs = {};
export type ImgAttrs = {};
export type InputAttrs = {
    type: "text" | "checkbox" | "radio" | "file" | "color";
    name: HTMLInputElement["name"];
    multiple: HTMLInputElement["multiple"];
    disabled: HTMLInputElement["disabled"];
    checked: HTMLInputElement["checked"];
    placeholder: HTMLInputElement["placeholder"];
    accept: HTMLInputElement["accept"];
    value: HTMLInputElement["value"];
    readonly: HTMLInputElement["readOnly"];
    webkitdirectory: HTMLInputElement["webkitdirectory"];
};
export type InsAttrs = {};
export type KbdAttrs = {};
export type LabelAttrs = {
    for: HTMLLabelElement["htmlFor"];
};
export type LegendAttrs = {};
export type LiAttrs = {};
export type LinkAttrs = {
    rel: HTMLLinkElement["rel"];
    href: HTMLLinkElement["href"];
    disabled: HTMLLinkElement["disabled"];
};
export type MainAttrs = {};
export type MapAttrs = {};
export type MarkAttrs = {};
export type MenuAttrs = {};
export type MetaAttrs = {};
export type MeterAttrs = {};
export type NavAttrs = {};
export type NoScriptAttrs = {};
export type ObjectAttrs = {};
export type OlAttrs = {};
export type OptGroupAttrs = {
    disabled: HTMLOptGroupElement["disabled"];
    label: HTMLOptGroupElement["label"];
};
export type OptionAttrs = {
    disabled: HTMLOptionElement["disabled"];
    value: HTMLOptionElement["value"];
};
export type OutputAttrs = {};
export type PAttrs = {};
export type PictureAttrs = {};
export type PreAttrs = {};
export type ProgressAttrs = {};
export type QAttrs = {};
export type RpAttrs = {};
export type RtAttrs = {};
export type RubyAttrs = {};
export type SAttrs = {};
export type SAmpAttrs = {};
export type ScriptAttrs = {};
export type SearchAttrs = {};
export type SectionAttrs = {};
export type SelectAttrs = {
    name: HTMLSelectElement["name"];
    disabled: HTMLSelectElement["disabled"];
    multiple: HTMLSelectElement["multiple"];
};
export type SlotAttrs = {};
export type SmallAttrs = {};
export type SourceAttrs = {};
export type SpanAttrs = {};
export type StrongAttrs = {};
export type StyleAttrs = {};
export type SubAttrs = {};
export type SummaryAttrs = {};
export type SupAttrs = {};
export type TableAttrs = {};
export type TBodyAttrs = {};
export type TdAttrs = {};
export type TemplateAttrs = {};
export type TextAreaAttrs = {};
export type TFootAttrs = {};
export type ThAttrs = {};
export type THeadAttrs = {};
export type TimeAttrs = {};
export type TitleAttrs = {};
export type TrAttrs = {};
export type TrackAttrs = {};
export type UAttrs = {};
export type UlAttrs = {};
export type VideoAttrs = {};
export type WbrAttrs = {};
export declare const a: (attrs?: HTMLChild | HTMLAttrs<"a", AAttrs>, ...children: HTMLChild[]) => HTMLAnchorElement;
export declare const abbr: (attrs?: HTMLChild | HTMLAttrs<"abbr", AbbrAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const address: (attrs?: HTMLChild | HTMLAttrs<"address", AddressAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const area: (attrs?: HTMLChild | HTMLAttrs<"area", AreaAttrs>, ...children: HTMLChild[]) => HTMLAreaElement;
export declare const article: (attrs?: HTMLChild | HTMLAttrs<"article", ArticleAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const aside: (attrs?: HTMLChild | HTMLAttrs<"aside", AsideAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const audio: (attrs?: HTMLChild | HTMLAttrs<"audio", AudioAttrs>, ...children: HTMLChild[]) => HTMLAudioElement;
export declare const b: (attrs?: HTMLChild | HTMLAttrs<"b", BAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const base: (attrs?: HTMLChild | HTMLAttrs<"base", BaseAttrs>, ...children: HTMLChild[]) => HTMLBaseElement;
export declare const bdi: (attrs?: HTMLChild | HTMLAttrs<"bdi", BdiAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const bdo: (attrs?: HTMLChild | HTMLAttrs<"bdo", BdoAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const blockquote: (attrs?: HTMLChild | HTMLAttrs<"blockquote", BlockQuoteAttrs>, ...children: HTMLChild[]) => HTMLQuoteElement;
export declare const body: (attrs?: HTMLChild | HTMLAttrs<"body", BodyAttrs>, ...children: HTMLChild[]) => HTMLBodyElement;
export declare const br: (attrs?: HTMLChild | HTMLAttrs<"br", BrAttrs>, ...children: HTMLChild[]) => HTMLBRElement;
export declare const button: (attrs?: HTMLChild | HTMLAttrs<"button", ButtonAttrs>, ...children: HTMLChild[]) => HTMLButtonElement;
export declare const canvas: (attrs?: HTMLChild | HTMLAttrs<"canvas", CanvasAttrs>, ...children: HTMLChild[]) => HTMLCanvasElement;
export declare const caption: (attrs?: HTMLChild | HTMLAttrs<"caption", CaptionAttrs>, ...children: HTMLChild[]) => HTMLTableCaptionElement;
export declare const cite: (attrs?: HTMLChild | HTMLAttrs<"cite", CiteAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const code: (attrs?: HTMLChild | HTMLAttrs<"code", CodeAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const col: (attrs?: HTMLChild | HTMLAttrs<"col", ColAttrs>, ...children: HTMLChild[]) => HTMLTableColElement;
export declare const colgroup: (attrs?: HTMLChild | HTMLAttrs<"colgroup", ColGroupAttrs>, ...children: HTMLChild[]) => HTMLTableColElement;
export declare const data: (attrs?: HTMLChild | HTMLAttrs<"data", DataAttrs>, ...children: HTMLChild[]) => HTMLDataElement;
export declare const datalist: (attrs?: HTMLChild | HTMLAttrs<"datalist", DataListAttrs>, ...children: HTMLChild[]) => HTMLDataListElement;
export declare const dd: (attrs?: HTMLChild | HTMLAttrs<"dd", DdAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const del: (attrs?: HTMLChild | HTMLAttrs<"del", DelAttrs>, ...children: HTMLChild[]) => HTMLModElement;
export declare const details: (attrs?: HTMLChild | HTMLAttrs<"details", DetailsAttrs>, ...children: HTMLChild[]) => HTMLDetailsElement;
export declare const dfn: (attrs?: HTMLChild | HTMLAttrs<"dfn", DfnAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const dialog: (attrs?: HTMLChild | HTMLAttrs<"dialog", DialogAttrs>, ...children: HTMLChild[]) => HTMLDialogElement;
export declare const div: (attrs?: HTMLChild | HTMLAttrs<"div", DivAttrs>, ...children: HTMLChild[]) => HTMLDivElement;
export declare const dl: (attrs?: HTMLChild | HTMLAttrs<"dl", DlAttrs>, ...children: HTMLChild[]) => HTMLDListElement;
export declare const dt: (attrs?: HTMLChild | HTMLAttrs<"dt", DtAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const em: (attrs?: HTMLChild | HTMLAttrs<"em", EmAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const embed: (attrs?: HTMLChild | HTMLAttrs<"embed", EmbedAttrs>, ...children: HTMLChild[]) => HTMLEmbedElement;
export declare const fieldset: (attrs?: HTMLChild | HTMLAttrs<"fieldset", FieldSetAttrs>, ...children: HTMLChild[]) => HTMLFieldSetElement;
export declare const figcaption: (attrs?: HTMLChild | HTMLAttrs<"figcaption", FigCaptionAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const figure: (attrs?: HTMLChild | HTMLAttrs<"figure", FigureAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const footer: (attrs?: HTMLChild | HTMLAttrs<"footer", FooterAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const form: (attrs?: HTMLChild | HTMLAttrs<"form", FormAttrs>, ...children: HTMLChild[]) => HTMLFormElement;
export declare const h1: (attrs?: HTMLChild | HTMLAttrs<"h1", H1Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const h2: (attrs?: HTMLChild | HTMLAttrs<"h2", H2Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const h3: (attrs?: HTMLChild | HTMLAttrs<"h3", H3Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const h4: (attrs?: HTMLChild | HTMLAttrs<"h4", H4Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const h5: (attrs?: HTMLChild | HTMLAttrs<"h5", H5Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const h6: (attrs?: HTMLChild | HTMLAttrs<"h6", H6Attrs>, ...children: HTMLChild[]) => HTMLHeadingElement;
export declare const head: (attrs?: HTMLChild | HTMLAttrs<"head", HeadAttrs>, ...children: HTMLChild[]) => HTMLHeadElement;
export declare const header: (attrs?: HTMLChild | HTMLAttrs<"header", HeaderAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const hgroup: (attrs?: HTMLChild | HTMLAttrs<"hgroup", HGroupAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const hr: (attrs?: HTMLChild | HTMLAttrs<"hr", HrAttrs>, ...children: HTMLChild[]) => HTMLHRElement;
export declare const html: (attrs?: HTMLChild | HTMLAttrs<"html", HtmlAttrs>, ...children: HTMLChild[]) => HTMLHtmlElement;
export declare const i: (attrs?: HTMLChild | HTMLAttrs<"i", IAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const iframe: (attrs?: HTMLChild | HTMLAttrs<"iframe", IFrameAttrs>, ...children: HTMLChild[]) => HTMLIFrameElement;
export declare const img: (attrs?: HTMLChild | HTMLAttrs<"img", ImgAttrs>, ...children: HTMLChild[]) => HTMLImageElement;
export declare const input: (attrs?: HTMLChild | HTMLAttrs<"input", InputAttrs>, ...children: HTMLChild[]) => HTMLInputElement;
export declare const ins: (attrs?: HTMLChild | HTMLAttrs<"ins", InsAttrs>, ...children: HTMLChild[]) => HTMLModElement;
export declare const kbd: (attrs?: HTMLChild | HTMLAttrs<"kbd", KbdAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const label: (attrs?: HTMLChild | HTMLAttrs<"label", LabelAttrs>, ...children: HTMLChild[]) => HTMLLabelElement;
export declare const legend: (attrs?: HTMLChild | HTMLAttrs<"legend", LegendAttrs>, ...children: HTMLChild[]) => HTMLLegendElement;
export declare const li: (attrs?: HTMLChild | HTMLAttrs<"li", LiAttrs>, ...children: HTMLChild[]) => HTMLLIElement;
export declare const link: (attrs?: HTMLChild | HTMLAttrs<"link", LinkAttrs>, ...children: HTMLChild[]) => HTMLLinkElement;
export declare const main: (attrs?: HTMLChild | HTMLAttrs<"main", MainAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const map: (attrs?: HTMLChild | HTMLAttrs<"map", MapAttrs>, ...children: HTMLChild[]) => HTMLMapElement;
export declare const mark: (attrs?: HTMLChild | HTMLAttrs<"mark", MarkAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const menu: (attrs?: HTMLChild | HTMLAttrs<"menu", MenuAttrs>, ...children: HTMLChild[]) => HTMLMenuElement;
export declare const meta: (attrs?: HTMLChild | HTMLAttrs<"meta", MetaAttrs>, ...children: HTMLChild[]) => HTMLMetaElement;
export declare const meter: (attrs?: HTMLChild | HTMLAttrs<"meter", MeterAttrs>, ...children: HTMLChild[]) => HTMLMeterElement;
export declare const nav: (attrs?: HTMLChild | HTMLAttrs<"nav", NavAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const noscript: (attrs?: HTMLChild | HTMLAttrs<"noscript", NoScriptAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const object: (attrs?: HTMLChild | HTMLAttrs<"object", ObjectAttrs>, ...children: HTMLChild[]) => HTMLObjectElement;
export declare const ol: (attrs?: HTMLChild | HTMLAttrs<"ol", OlAttrs>, ...children: HTMLChild[]) => HTMLOListElement;
export declare const optgroup: (attrs?: HTMLChild | HTMLAttrs<"optgroup", OptGroupAttrs>, ...children: HTMLChild[]) => HTMLOptGroupElement;
export declare const option: (attrs?: HTMLChild | HTMLAttrs<"option", OptionAttrs>, ...children: HTMLChild[]) => HTMLOptionElement;
export declare const output: (attrs?: HTMLChild | HTMLAttrs<"output", OutputAttrs>, ...children: HTMLChild[]) => HTMLOutputElement;
export declare const p: (attrs?: HTMLChild | HTMLAttrs<"p", PAttrs>, ...children: HTMLChild[]) => HTMLParagraphElement;
export declare const picture: (attrs?: HTMLChild | HTMLAttrs<"picture", PictureAttrs>, ...children: HTMLChild[]) => HTMLPictureElement;
export declare const pre: (attrs?: HTMLChild | HTMLAttrs<"pre", PreAttrs>, ...children: HTMLChild[]) => HTMLPreElement;
export declare const progress: (attrs?: HTMLChild | HTMLAttrs<"progress", ProgressAttrs>, ...children: HTMLChild[]) => HTMLProgressElement;
export declare const q: (attrs?: HTMLChild | HTMLAttrs<"q", QAttrs>, ...children: HTMLChild[]) => HTMLQuoteElement;
export declare const rp: (attrs?: HTMLChild | HTMLAttrs<"rp", RpAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const rt: (attrs?: HTMLChild | HTMLAttrs<"rt", RtAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const ruby: (attrs?: HTMLChild | HTMLAttrs<"ruby", RubyAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const s: (attrs?: HTMLChild | HTMLAttrs<"s", SAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const samp: (attrs?: HTMLChild | HTMLAttrs<"samp", SAmpAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const script: (attrs?: HTMLChild | HTMLAttrs<"script", ScriptAttrs>, ...children: HTMLChild[]) => HTMLScriptElement;
export declare const search: (attrs?: HTMLChild | HTMLAttrs<"search", SearchAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const section: (attrs?: HTMLChild | HTMLAttrs<"section", SectionAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const select: (attrs?: HTMLChild | HTMLAttrs<"select", SelectAttrs>, ...children: HTMLChild[]) => HTMLSelectElement;
export declare const slot: (attrs?: HTMLChild | HTMLAttrs<"slot", SlotAttrs>, ...children: HTMLChild[]) => HTMLSlotElement;
export declare const small: (attrs?: HTMLChild | HTMLAttrs<"small", SmallAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const source: (attrs?: HTMLChild | HTMLAttrs<"source", SourceAttrs>, ...children: HTMLChild[]) => HTMLSourceElement;
export declare const span: (attrs?: HTMLChild | HTMLAttrs<"span", SpanAttrs>, ...children: HTMLChild[]) => HTMLSpanElement;
export declare const strong: (attrs?: HTMLChild | HTMLAttrs<"strong", StrongAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const style: (attrs?: HTMLChild | HTMLAttrs<"style", StyleAttrs>, ...children: HTMLChild[]) => HTMLStyleElement;
export declare const sub: (attrs?: HTMLChild | HTMLAttrs<"sub", SubAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const summary: (attrs?: HTMLChild | HTMLAttrs<"summary", SummaryAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const sup: (attrs?: HTMLChild | HTMLAttrs<"sup", SupAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const table: (attrs?: HTMLChild | HTMLAttrs<"table", TableAttrs>, ...children: HTMLChild[]) => HTMLTableElement;
export declare const tbody: (attrs?: HTMLChild | HTMLAttrs<"tbody", TBodyAttrs>, ...children: HTMLChild[]) => HTMLTableSectionElement;
export declare const td: (attrs?: HTMLChild | HTMLAttrs<"td", TdAttrs>, ...children: HTMLChild[]) => HTMLTableCellElement;
export declare const template: (attrs?: HTMLChild | HTMLAttrs<"template", TemplateAttrs>, ...children: HTMLChild[]) => HTMLTemplateElement;
export declare const textarea: (attrs?: HTMLChild | HTMLAttrs<"textarea", TextAreaAttrs>, ...children: HTMLChild[]) => HTMLTextAreaElement;
export declare const tfoot: (attrs?: HTMLChild | HTMLAttrs<"tfoot", TFootAttrs>, ...children: HTMLChild[]) => HTMLTableSectionElement;
export declare const th: (attrs?: HTMLChild | HTMLAttrs<"th", ThAttrs>, ...children: HTMLChild[]) => HTMLTableCellElement;
export declare const thead: (attrs?: HTMLChild | HTMLAttrs<"thead", THeadAttrs>, ...children: HTMLChild[]) => HTMLTableSectionElement;
export declare const time: (attrs?: HTMLChild | HTMLAttrs<"time", TimeAttrs>, ...children: HTMLChild[]) => HTMLTimeElement;
export declare const title: (attrs?: HTMLChild | HTMLAttrs<"title", TitleAttrs>, ...children: HTMLChild[]) => HTMLTitleElement;
export declare const tr: (attrs?: HTMLChild | HTMLAttrs<"tr", TrAttrs>, ...children: HTMLChild[]) => HTMLTableRowElement;
export declare const track: (attrs?: HTMLChild | HTMLAttrs<"track", TrackAttrs>, ...children: HTMLChild[]) => HTMLTrackElement;
export declare const u: (attrs?: HTMLChild | HTMLAttrs<"u", UAttrs>, ...children: HTMLChild[]) => HTMLElement;
export declare const ul: (attrs?: HTMLChild | HTMLAttrs<"ul", UlAttrs>, ...children: HTMLChild[]) => HTMLUListElement;
export declare const video: (attrs?: HTMLChild | HTMLAttrs<"video", VideoAttrs>, ...children: HTMLChild[]) => HTMLVideoElement;
export declare const wbr: (attrs?: HTMLChild | HTMLAttrs<"wbr", WbrAttrs>, ...children: HTMLChild[]) => HTMLElement;
export type SVGAttrs = {
    [key: string]: string | false | null | undefined;
};
export declare function createSVGElement<T extends keyof SVGElementTagNameMap>(tag: T, attrs?: SVGAttrs | null, ...children: HTMLChild[]): SVGElementTagNameMap[T];
export declare function text(str: string): Text;
export declare function nbsp(): Text;
export declare function prepend(element: Node, ...nodes: Node[]): void;
export declare function empty(node: Node, attrs?: boolean): void;
export declare function contains(element: Element, child: Node): boolean;
export declare function display(element: HTMLElement, display?: boolean): void;
export declare function undisplay(element: HTMLElement): void;
export declare function show(element: HTMLElement): void;
export declare function hide(element: HTMLElement): void;
export declare function offset_bbox(element: Element): BBox;
export declare function parent(el: HTMLElement, selector: string): HTMLElement | null;
export type ElementExtents = {
    border: Extents;
    margin: Extents;
    padding: Extents;
};
export declare function extents(el: HTMLElement): ElementExtents;
export declare function size(el: HTMLElement): Size;
export declare function scroll_size(el: HTMLElement): Size;
export declare function outer_size(el: HTMLElement): Size;
export declare function content_size(el: HTMLElement): Size;
export declare function bounding_box(el: Element): BBox;
export declare function box_size(el: Element): Size;
export declare function position(el: HTMLElement, box: Box, margin?: Extents): void;
export declare class ClassList {
    private readonly class_list;
    constructor(class_list: DOMTokenList);
    get values(): string[];
    has(cls: string): boolean;
    add(...classes: string[]): this;
    remove(...classes: string[] | string[][]): this;
    clear(): this;
    toggle(cls: string, activate?: boolean): this;
}
export declare function classes(el: HTMLElement): ClassList;
export declare function toggle_attribute(el: HTMLElement, attr: string, state?: boolean): void;
type WhitespaceKeys = "Tab" | "Enter" | " ";
type UIKeys = "Escape";
type NavigationKeys = "Home" | "End" | "PageUp" | "PageDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";
type EditingKeys = "Backspace" | "Delete";
export type Keys = WhitespaceKeys | UIKeys | NavigationKeys | EditingKeys;
export declare enum MouseButton {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Auxiliary = 4,
    Left = 1,
    Right = 2,
    Middle = 4
}
export declare abstract class StyleSheet {
    protected readonly el: HTMLStyleElement | HTMLLinkElement;
    install(el: HTMLElement | ShadowRoot): void;
    uninstall(): void;
}
export declare class InlineStyleSheet extends StyleSheet {
    protected readonly el: HTMLStyleElement;
    constructor(css?: string | CSSStyleSheetDecl);
    get css(): string;
    protected _update(css: string): void;
    clear(): void;
    private _to_css;
    replace(css: string, styles?: CSSStyles): void;
    prepend(css: string, styles?: CSSStyles): void;
    append(css: string, styles?: CSSStyles): void;
    remove(): void;
}
export declare class GlobalInlineStyleSheet extends InlineStyleSheet {
    install(): void;
}
export declare class ImportedStyleSheet extends StyleSheet {
    protected readonly el: HTMLLinkElement;
    constructor(url: string);
    replace(url: string): void;
    remove(): void;
}
export declare class GlobalImportedStyleSheet extends ImportedStyleSheet {
    install(): void;
}
export type StyleSheetLike = StyleSheet | string;
export declare function dom_ready(): Promise<void>;
export declare function px(value: number | string): string;
export declare const supports_adopted_stylesheets: boolean;
export {};
//# sourceMappingURL=dom.d.ts.map