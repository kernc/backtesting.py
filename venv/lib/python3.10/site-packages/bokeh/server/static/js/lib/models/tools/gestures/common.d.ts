export declare const Modifiers: import("../../../core/kinds").Kinds.PartialStruct<{
    shift: boolean;
    ctrl: boolean;
    alt: boolean;
}>;
export type Modifiers = typeof Modifiers["__type__"];
export declare function satisfies_modifiers(expected: Modifiers, received: Modifiers): boolean;
export declare function print_modifiers(modifiers: Modifiers): string;
//# sourceMappingURL=common.d.ts.map