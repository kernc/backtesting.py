export type Image = HTMLImageElement;
export type ImageHandlers = {
    loaded?: (image: Image) => void;
    failed?: () => void;
};
export type LoaderOptions = {
    attempts?: number;
    timeout?: number;
};
export declare function load_image(url: string, options?: LoaderOptions): Promise<Image>;
export declare class ImageLoader {
    readonly image: HTMLImageElement;
    promise: Promise<Image>;
    constructor(src: string | ArrayBuffer, config?: ImageHandlers & LoaderOptions);
    private _finished;
    get finished(): boolean;
}
//# sourceMappingURL=image.d.ts.map