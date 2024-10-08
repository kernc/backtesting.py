import type * as types from "./types";
type ESMap<K, V> = globalThis.Map<K, V>;
declare const ESMap: MapConstructor;
type ESSet<V> = globalThis.Set<V>;
declare const ESSet: SetConstructor;
type ESIterable<V> = globalThis.Iterable<V>;
type DOMNode = globalThis.Node;
declare const DOMNode: {
    new (): globalThis.Node;
    prototype: globalThis.Node;
    readonly ELEMENT_NODE: 1;
    readonly ATTRIBUTE_NODE: 2;
    readonly TEXT_NODE: 3;
    readonly CDATA_SECTION_NODE: 4;
    readonly ENTITY_REFERENCE_NODE: 5;
    readonly ENTITY_NODE: 6;
    readonly PROCESSING_INSTRUCTION_NODE: 7;
    readonly COMMENT_NODE: 8;
    readonly DOCUMENT_NODE: 9;
    readonly DOCUMENT_TYPE_NODE: 10;
    readonly DOCUMENT_FRAGMENT_NODE: 11;
    readonly NOTATION_NODE: 12;
    readonly DOCUMENT_POSITION_DISCONNECTED: 1;
    readonly DOCUMENT_POSITION_PRECEDING: 2;
    readonly DOCUMENT_POSITION_FOLLOWING: 4;
    readonly DOCUMENT_POSITION_CONTAINS: 8;
    readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
};
export declare abstract class Kind<T> {
    __type__: T;
    coerce?(value: unknown): unknown;
    abstract valid(value: unknown): value is this["__type__"];
    abstract may_have_refs(): boolean;
}
export type Constructor<T> = Function & {
    prototype: T;
};
export declare namespace Kinds {
    abstract class Primitive<T> extends Kind<T> {
        may_have_refs(): boolean;
    }
    class Any extends Primitive<any> {
        valid(value: unknown): value is any;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Unknown extends Primitive<unknown> {
        valid(value: unknown): value is unknown;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Bool extends Primitive<boolean> {
        valid(value: unknown): value is boolean;
        toString(): string;
    }
    class Ref<ObjType extends object> extends Kind<ObjType> {
        readonly obj_type: Constructor<ObjType>;
        constructor(obj_type: Constructor<ObjType>);
        valid(value: unknown): value is ObjType;
        toString(): string;
        may_have_refs(): boolean;
    }
    class AnyRef<ObjType extends object> extends Kind<ObjType> {
        valid(value: unknown): value is ObjType;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Float extends Primitive<number> {
        valid(value: unknown): value is number;
        toString(): string;
    }
    class Int extends Float {
        valid(value: unknown): value is number;
        toString(): string;
    }
    class Percent extends Float {
        valid(value: unknown): value is number;
        toString(): string;
    }
    type TupleKind<T extends unknown[]> = {
        [K in keyof T]: Kind<T[K]>;
    };
    type ObjectKind<T extends {
        [key: string]: unknown;
    }> = {
        [K in keyof T]: Kind<T[K]>;
    };
    class Or<T extends [unknown, ...unknown[]]> extends Kind<T[number]> {
        readonly types: TupleKind<T>;
        constructor(types: TupleKind<T>);
        valid(value: unknown): value is T[number];
        toString(): string;
        may_have_refs(): boolean;
    }
    class And<T0, T1> extends Kind<T0 & T1> {
        readonly types: [Kind<T0>, Kind<T1>];
        constructor(type0: Kind<T0>, type1: Kind<T1>);
        valid(value: unknown): value is T0 & T1;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Tuple<T extends [unknown, ...unknown[]]> extends Kind<T> {
        readonly types: TupleKind<T>;
        constructor(types: TupleKind<T>);
        valid(value: unknown): value is T;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Struct<T extends {
        [key: string]: unknown;
    }> extends Kind<T> {
        readonly struct_type: ObjectKind<T>;
        constructor(struct_type: ObjectKind<T>);
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class PartialStruct<T extends {
        [key: string]: unknown;
    }> extends Kind<Partial<T>> {
        readonly struct_type: ObjectKind<T>;
        constructor(struct_type: ObjectKind<T>);
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class Iterable<ItemType> extends Kind<ESIterable<ItemType>> {
        readonly item_type: Kind<ItemType>;
        constructor(item_type: Kind<ItemType>);
        valid(value: unknown): value is ESIterable<ItemType>;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Arrayable<ItemType> extends Kind<types.Arrayable<ItemType>> {
        readonly item_type: Kind<ItemType>;
        constructor(item_type: Kind<ItemType>);
        valid(value: unknown): value is types.Arrayable<ItemType>;
        toString(): string;
        may_have_refs(): boolean;
    }
    class List<ItemType> extends Kind<ItemType[]> {
        readonly item_type: Kind<ItemType>;
        constructor(item_type: Kind<ItemType>);
        valid(value: unknown): value is ItemType[];
        toString(): string;
        may_have_refs(): boolean;
    }
    class NonEmptyList<ItemType> extends List<ItemType> {
        valid(value: unknown): value is ItemType[];
        toString(): string;
    }
    class Null extends Primitive<null> {
        valid(value: unknown): value is null;
        toString(): string;
    }
    class Nullable<BaseType> extends Kind<BaseType | null> {
        readonly base_type: Kind<BaseType>;
        constructor(base_type: Kind<BaseType>);
        valid(value: unknown): value is BaseType | null;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Opt<BaseType> extends Kind<BaseType | undefined> {
        readonly base_type: Kind<BaseType>;
        constructor(base_type: Kind<BaseType>);
        valid(value: unknown): value is BaseType | undefined;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Bytes extends Kind<ArrayBuffer> {
        valid(value: unknown): value is ArrayBuffer;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Str extends Primitive<string> {
        valid(value: unknown): value is string;
        toString(): string;
    }
    class Regex extends Str {
        readonly regex: RegExp;
        constructor(regex: RegExp);
        valid(value: unknown): value is string;
        toString(): string;
    }
    class Enum<T extends string | number> extends Primitive<T> {
        readonly values: ESSet<T>;
        constructor(values: ESIterable<T>);
        valid(value: unknown): value is T;
        [Symbol.iterator](): Generator<T, void, undefined>;
        toString(): string;
    }
    class Dict<ItemType> extends Kind<types.Dict<ItemType>> {
        readonly item_type: Kind<ItemType>;
        constructor(item_type: Kind<ItemType>);
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class Mapping<KeyType, ItemType> extends Kind<ESMap<KeyType, ItemType>> {
        readonly key_type: Kind<KeyType>;
        readonly item_type: Kind<ItemType>;
        constructor(key_type: Kind<KeyType>, item_type: Kind<ItemType>);
        coerce(value: unknown): unknown;
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class Set<ItemType> extends Kind<ESSet<ItemType>> {
        readonly item_type: Kind<ItemType>;
        constructor(item_type: Kind<ItemType>);
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class Color extends Kind<types.Color> {
        valid(value: unknown): value is types.Color;
        toString(): string;
        may_have_refs(): boolean;
    }
    class CSSLength extends Str {
        toString(): string;
    }
    class Func<Args extends unknown[], Ret> extends Kind<(...args: Args) => Ret> {
        valid(value: unknown): value is this["__type__"];
        toString(): string;
        may_have_refs(): boolean;
    }
    class NonNegative<BaseType extends number> extends Kind<BaseType> {
        readonly base_type: Kind<BaseType>;
        constructor(base_type: Kind<BaseType>);
        valid(value: unknown): value is BaseType;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Positive<BaseType extends number> extends Kind<BaseType> {
        readonly base_type: Kind<BaseType>;
        constructor(base_type: Kind<BaseType>);
        valid(value: unknown): value is BaseType;
        toString(): string;
        may_have_refs(): boolean;
    }
    class Node extends Kind<DOMNode> {
        valid(value: unknown): value is DOMNode;
        toString(): string;
        may_have_refs(): boolean;
    }
}
export declare const Any: Kinds.Any;
export declare const Unknown: Kinds.Unknown;
export declare const Bool: Kinds.Bool;
export declare const Float: Kinds.Float;
export declare const Int: Kinds.Int;
export declare const Bytes: Kinds.Bytes;
export declare const Str: Kinds.Str;
export declare const Regex: (regex: RegExp) => Kinds.Regex;
export declare const Null: Kinds.Null;
export declare const Nullable: <BaseType>(base_type: Kind<BaseType>) => Kinds.Nullable<BaseType>;
export declare const Opt: <BaseType>(base_type: Kind<BaseType>) => Kinds.Opt<BaseType>;
export declare const Or: <T extends [unknown, ...unknown[]]>(...types: Kinds.TupleKind<T>) => Kinds.Or<T>;
export declare const And: <T0, T1>(type0: Kind<T0>, type1: Kind<T1>) => Kinds.And<T0, T1>;
export declare const Tuple: <T extends [unknown, ...unknown[]]>(...types: Kinds.TupleKind<T>) => Kinds.Tuple<T>;
export declare const Struct: <T extends {
    [key: string]: unknown;
}>(struct_type: Kinds.ObjectKind<T>) => Kinds.Struct<T>;
export declare const PartialStruct: <T extends {
    [key: string]: unknown;
}>(struct_type: Kinds.ObjectKind<T>) => Kinds.PartialStruct<T>;
export declare const Iterable: <ItemType>(item_type: Kind<ItemType>) => Kinds.Iterable<ItemType>;
export declare const Arrayable: <ItemType>(item_type: Kind<ItemType>) => Kinds.Arrayable<ItemType>;
export declare const List: <ItemType>(item_type: Kind<ItemType>) => Kinds.List<ItemType>;
export declare const NonEmptyList: <ItemType>(item_type: Kind<ItemType>) => Kinds.NonEmptyList<ItemType>;
export declare const Dict: <V>(item_type: Kind<V>) => Kinds.Dict<V>;
export declare const Mapping: <K, V>(key_type: Kind<K>, item_type: Kind<V>) => Kinds.Mapping<K, V>;
export declare const Set: <V>(item_type: Kind<V>) => Kinds.Set<V>;
export declare const Enum: <T extends string | number>(...values: T[]) => Kinds.Enum<T>;
export declare const Ref: <ObjType extends object>(obj_type: Constructor<ObjType>) => Kinds.Ref<ObjType>;
export declare const AnyRef: <ObjType extends object>() => Kinds.AnyRef<ObjType>;
export declare const Func: <Args extends unknown[], Ret>() => Kinds.Func<Args, Ret>;
export declare const Node: Kinds.Node;
export declare const NonNegative: <BaseType extends number>(base_type: Kind<BaseType>) => Kinds.NonNegative<BaseType>;
export declare const Positive: <BaseType extends number>(base_type: Kind<BaseType>) => Kinds.Positive<BaseType>;
export declare const Percent: Kinds.Percent;
export declare const Alpha: Kinds.Percent;
export declare const Color: Kinds.Color;
export declare const Auto: Kinds.Enum<"auto">;
export declare const CSSLength: Kinds.CSSLength;
export declare const FontSize: Kinds.Str;
export declare const Font: Kinds.Str;
export declare const Angle: Kinds.Float;
export type Float = typeof Float["__type__"];
/** @deprecated */
export declare const Boolean: Kinds.Bool;
/** @deprecated */
export declare const String: Kinds.Str;
/** @deprecated */
export declare const Number: Kinds.Float;
/** @deprecated */
export declare const Array: <ItemType>(item_type: Kind<ItemType>) => Kinds.List<ItemType>;
/** @deprecated */
export declare const Map: <K, V>(key_type: Kind<K>, item_type: Kind<V>) => Kinds.Mapping<K, V>;
/** @deprecated */
export declare const Function: <Args extends unknown[], Ret>() => Kinds.Func<Args, Ret>;
export {};
//# sourceMappingURL=kinds.d.ts.map