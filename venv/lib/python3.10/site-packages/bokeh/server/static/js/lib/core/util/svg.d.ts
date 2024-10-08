/**
 * Based on https://github.com/gliffy/canvas2svg
 */
import { AffineTransform } from "./affine";
import type { PlainObject } from "../types";
import type { Random } from "./random";
type FontData = {
    style: string;
    size: string;
    family: string;
    weight: string;
    decoration: string;
};
type Style<T> = {
    svgAttr?: string;
    canvas: T;
    svg?: unknown;
    apply?: string;
};
type StyleAttr = "strokeStyle" | "fillStyle" | "lineCap" | "lineJoin" | "miterLimit" | "lineWidth" | "globalAlpha" | "shadowColor" | "shadowOffsetX" | "shadowOffsetY" | "shadowBlur" | "lineDash" | "lineDashOffset" | "direction" | "font" | "fontKerning" | "fontStretch" | "fontVariantCaps" | "letterSpacing" | "textAlign" | "textBaseline" | "textRendering" | "wordSpacing";
type StyleState = {
    [K in StyleAttr & keyof BaseCanvasRenderingContext2D]: Style<BaseCanvasRenderingContext2D[K]>;
} & {
    lineDash: Style<number[]>;
};
declare class CanvasGradient implements globalThis.CanvasGradient {
    __root: SVGElement;
    __ctx: SVGRenderingContext2D;
    constructor(gradientNode: SVGElement, ctx: SVGRenderingContext2D);
    /**
     * Adds a color stop to the gradient root
     */
    addColorStop(offset: number, color: string): void;
}
declare class CanvasPattern implements globalThis.CanvasPattern {
    __root: SVGPatternElement;
    __ctx: SVGRenderingContext2D;
    constructor(pattern: SVGPatternElement, ctx: SVGRenderingContext2D);
    setTransform(_transform?: DOMMatrix2DInit): void;
}
type Options = {
    width?: number;
    height?: number;
    document?: Document;
    ctx?: CanvasRenderingContext2D;
};
type Path = string;
type SVGCanvasState = {
    transform: AffineTransform;
    clip_path: Path | null;
    attributes: StyleState;
};
/**
 * The mock canvas context
 * @param o - options include:
 * ctx - existing Context2D to wrap around
 * width - width of your canvas (defaults to 500)
 * height - height of your canvas (defaults to 500)
 * document - the document object (defaults to the current document)
 */
type BaseCanvasRenderingContext2D = CanvasCompositing & CanvasDrawImage & CanvasDrawPath & CanvasFillStrokeStyles & CanvasFilters & CanvasImageData & CanvasImageSmoothing & CanvasPath & CanvasPathDrawingStyles & CanvasRect & CanvasShadowStyles & CanvasState & CanvasText & CanvasTextDrawingStyles & CanvasTransform & CanvasUserInterface;
export declare class SVGRenderingContext2D implements BaseCanvasRenderingContext2D {
    __canvas: HTMLCanvasElement;
    __ctx: CanvasRenderingContext2D;
    __root: SVGSVGElement;
    __ids: Set<string>;
    __defs: SVGElement;
    __stack: SVGCanvasState[];
    __document: Document;
    __currentElement: SVGElement;
    __currentDefaultPath: string;
    __currentPosition: {
        x: number;
        y: number;
    } | null;
    static __random: Random;
    get canvas(): SVGRenderingContext2D;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    fillStyle: string | CanvasGradient | CanvasPattern;
    lineCap: CanvasLineCap;
    lineJoin: CanvasLineJoin;
    miterLimit: number;
    lineWidth: number;
    globalAlpha: number;
    globalCompositeOperation: GlobalCompositeOperation;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    lineDash: string | number[] | null;
    lineDashOffset: number;
    filter: string;
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: ImageSmoothingQuality;
    direction: CanvasDirection;
    font: string;
    fontKerning: CanvasFontKerning;
    fontStretch: CanvasFontStretch;
    fontVariantCaps: CanvasFontVariantCaps;
    letterSpacing: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    textRendering: CanvasTextRendering;
    wordSpacing: string;
    private _width;
    private _height;
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    private _transform;
    constructor(options?: Options);
    protected _random_string(): string;
    /**
     * Creates the specified svg element
     */
    __createElement(elementName: string, properties?: PlainObject<string | number>, resetFill?: boolean): SVGElement;
    /**
     * Applies default canvas styles to the context
     */
    __setDefaultStyles(): void;
    /**
     * Applies styles on restore
     */
    __applyStyleState(style_state: StyleState): void;
    /**
     * Gets the current style state
     */
    __getStyleState(): StyleState;
    /**
     * Apples the current styles to the current SVG element. On "ctx.fill" or "ctx.stroke"
     */
    __applyStyleToCurrentElement(type: string): void;
    /**
      * Returns the serialized value of the svg so far
      * @param fixNamedEntities - Standalone SVG doesn't support named entities, which document.createTextNode encodes.
      *                           If true, we attempt to find all named entities and encode it as a numeric entity.
      * @return serialized svg
      */
    get_serialized_svg(fixNamedEntities?: boolean): string;
    get_svg(): SVGSVGElement;
    /**
      * Will generate a group tag.
      */
    save(): void;
    /**
      * Sets current element to parent, or just root if already root
      */
    restore(): void;
    isContextLost(): boolean;
    reset(): void;
    private _apply_transform;
    /**
      *  scales the current element
      */
    scale(x: number, y?: number): void;
    /**
      * rotates the current element
      */
    rotate(angle: number): void;
    /**
      * translates the current element
      */
    translate(x: number, y: number): void;
    /**
      * applies a transform to the current element
      */
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    /**
      * Create a new Path Element
      */
    beginPath(): void;
    protected __init_element(): void;
    /**
      * Helper function to apply currentDefaultPath to current path element
      */
    __applyCurrentDefaultPath(): void;
    /**
      * Helper function to add path command
      */
    __addPathCommand(x: number, y: number, path: string): void;
    get _hasCurrentDefaultPath(): boolean;
    /**
      * Adds the move command to the current path element,
      * if the currentPathElement is not empty create a new path element
      */
    moveTo(x: number, y: number): void;
    /**
      * Closes the current path
      */
    closePath(): void;
    /**
      * Adds a line to command
      */
    lineTo(x: number, y: number): void;
    /**
      * Add a bezier command
      */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    /**
      * Adds a quadratic curve to command
      */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
      * Adds the arcTo to the current path
      *
      * @see http://www.w3.org/TR/2015/WD-2dcontext-20150514/#dom-context-2d-arcto
      */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    /**
      * Sets the stroke property on the current element
      */
    stroke(): void;
    /**
      * Sets fill properties on the current element
      */
    fill(fill_rule?: CanvasFillRule): void;
    fill(path: Path2D, fill_rule?: CanvasFillRule): void;
    /**
      *  Adds a rectangle to the path.
      */
    rect(x: number, y: number, width: number, height: number): void;
    /**
      * adds a rectangle element
      */
    fillRect(x: number, y: number, width: number, height: number): void;
    /**
      * Draws a rectangle with no fill
      * @param x
      * @param y
      * @param width
      * @param height
      */
    strokeRect(x: number, y: number, width: number, height: number): void;
    /**
      * Clear entire canvas:
      * 1. save current transforms
      * 2. remove all the childNodes of the root g element
      */
    __clearCanvas(): void;
    /**
      * "Clears" a canvas by just drawing a white rectangle in the current group.
      */
    clearRect(x: number, y: number, width: number, height: number): void;
    roundRect(_x: number, _y: number, _w: number, _h: number, _radii?: number | DOMPointInit | Iterable<number | DOMPointInit>): void;
    /**
      * Adds a linear gradient to a defs tag.
      * Returns a canvas gradient object that has a reference to it's parent def
      */
    createLinearGradient(x1: number, y1: number, x2: number, y2: number): CanvasGradient;
    /**
      * Adds a radial gradient to a defs tag.
      * Returns a canvas gradient object that has a reference to it's parent def
      */
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    createConicGradient(_start_angle: number, _x: number, _y: number): CanvasGradient;
    /**
      * Parses the font string and returns svg mapping
      */
    __parseFont(): FontData;
    /**
      * Fills or strokes text
      */
    __applyText(text: string, x: number, y: number, action: "fill" | "stroke"): void;
    /**
      * Creates a text element, in position x,y
      */
    fillText(text: string, x: number, y: number): void;
    /**
      * Strokes text
      */
    strokeText(text: string, x: number, y: number): void;
    /**
      * No need to implement this for svg.
      */
    measureText(text: string): TextMetrics;
    arc(x: number, y: number, radius: number, start_angle: number, end_angle: number, counterclockwise?: boolean): void;
    ellipse(x: number, y: number, radius_x: number, radius_y: number, rotation: number, start_angle: number, end_angle: number, counterclockwise?: boolean): void;
    private _clip_path;
    /**
      * Generates a ClipPath from the clip command.
      */
    clip(fill_rule?: CanvasFillRule): void;
    clip(path: Path2D, fill_rule?: CanvasFillRule): void;
    drawImage(image: CanvasImageSource, dx: number, dy: number): void;
    drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
    /**
      * Generates a pattern tag
      */
    createPattern(image: CanvasImageSource, _repetition: string | null): CanvasPattern | null;
    getLineDash(): number[];
    setLineDash(segments: number[]): void;
    getTransform(): DOMMatrix;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    setTransform(transform?: DOMMatrix2DInit): void;
    setTransform(matrix: DOMMatrix): void;
    resetTransform(): void;
    isPointInPath(x: number, y: number, fill_rule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fill_rule?: CanvasFillRule): boolean;
    isPointInStroke(x: number, y: number): boolean;
    isPointInStroke(path: Path2D, x: number, y: number): boolean;
    createImageData(sw: number, sh: number): ImageData;
    createImageData(imagedata: ImageData): ImageData;
    getImageData(_sx: number, _sy: number, _sw: number, _sh: number): ImageData;
    putImageData(imagedata: ImageData, dx: number, dy: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void;
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    scrollPathIntoView(): void;
    scrollPathIntoView(path: Path2D): void;
}
export {};
//# sourceMappingURL=svg.d.ts.map