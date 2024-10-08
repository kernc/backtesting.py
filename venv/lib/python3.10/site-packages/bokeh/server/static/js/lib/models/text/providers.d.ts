import { Signal0 } from "../../core/signaling";
type MathJaxStatus = "not_started" | "loaded" | "loading" | "failed";
export declare abstract class MathJaxProvider {
    readonly ready: Signal0<this>;
    status: MathJaxStatus;
    abstract get MathJax(): typeof MathJax | null;
    abstract fetch(): Promise<void>;
}
export declare class NoProvider extends MathJaxProvider {
    get MathJax(): null;
    fetch(): Promise<void>;
}
export declare class CDNProvider extends MathJaxProvider {
    get MathJax(): typeof MathJax | null;
    fetch(): Promise<void>;
}
export declare class BundleProvider extends MathJaxProvider {
    _mathjax: typeof MathJax | null;
    get MathJax(): typeof MathJax | null;
    fetch(): Promise<void>;
}
export declare const default_provider: MathJaxProvider;
export {};
//# sourceMappingURL=providers.d.ts.map