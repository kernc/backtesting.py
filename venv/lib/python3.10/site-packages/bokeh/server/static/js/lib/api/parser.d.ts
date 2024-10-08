type Primitive = null | boolean | string | number | symbol;
export declare const COMPOUND: unique symbol;
export declare const LITERAL: unique symbol;
export declare const IDENT: unique symbol;
export declare const MEMBER: unique symbol;
export declare const INDEX: unique symbol;
export declare const CALL: unique symbol;
export declare const UNARY: unique symbol;
export declare const BINARY: unique symbol;
export declare const SEQUENCE: unique symbol;
export declare const ARRAY: unique symbol;
export declare const FAILURE: unique symbol;
export type Expression = Identifier | Literal | UnaryExpression | BinaryExpression | CallExpression | MemberExpression | IndexExpression | SequenceExpression | ArrayExpression | CompoundExpression;
export type Identifier = {
    type: typeof IDENT;
    name: string;
};
export type Literal = {
    type: typeof LITERAL;
    value: Primitive;
};
export type UnaryExpression = {
    type: typeof UNARY;
    operator: string;
    argument: Expression;
    prefix: boolean;
};
export type BinaryExpression = {
    type: typeof BINARY;
    operator: string;
    left: Expression;
    right: Expression;
};
export type CallExpression = {
    type: typeof CALL;
    args: Expression[];
    callee: Expression;
};
export type MemberExpression = {
    type: typeof MEMBER;
    object: Expression;
    member: Identifier;
};
export type IndexExpression = {
    type: typeof INDEX;
    object: Expression;
    index: Expression;
};
export type SequenceExpression = {
    type: typeof SEQUENCE;
    expressions: Expression[];
};
export type ArrayExpression = {
    type: typeof ARRAY;
    elements: Expression[];
};
export type CompoundExpression = {
    type: typeof COMPOUND;
    body: Expression[];
};
export type Failure = {
    type: typeof FAILURE;
    message: string;
};
export declare class Parser {
    readonly expr: string;
    private index;
    constructor(expr: string);
    get char(): string;
    get code(): number;
    /**
     * throw error at index of the expression
     */
    error(message: string): never;
    /**
     * Push `index` up to the next non-space character
     */
    gobbleSpaces(): void;
    /**
     * Top-level method to parse all expressions and returns compound or single node
     */
    parse(): Expression | Failure;
    /**
     * top-level parser (but can be reused within as well)
     */
    gobbleExpressions(until: number | undefined): Expression[];
    /**
     * The main parsing function.
     */
    gobbleExpression(): Expression | false;
    /**
     * Search for the operation portion of the string (e.g. `+`, `===`)
     * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
     * and move down from 3 to 2 to 1 character until a matching binary operation is found
     * then, return that binary operation
     */
    gobbleBinaryOp(): string | false;
    /**
     * This function is responsible for gobbling an individual expression,
     * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
     */
    gobbleBinaryExpression(): Expression | false;
    /**
     * An individual part of a binary expression:
     * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
     */
    gobbleToken(): Expression | false;
    /**
     * Gobble properties of of identifiers/strings/arrays/groups.
     * e.g. `foo`, `bar.baz`, `foo['bar'].baz`
     * It also gobbles function calls:
     * e.g. `Math.acos(obj.angle)`
     */
    gobbleTokenProperty(node: Expression): Expression;
    /**
     * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
     * keep track of everything in the numeric literal and then calling `parseFloat` on that string
     */
    gobbleNumericLiteral(): Literal;
    /**
     * Parses a string literal, staring with single or double quotes with basic support for escape codes
     * e.g. `"hello world"`, `'this is\nJSEP'`
     */
    gobbleStringLiteral(): Literal;
    /**
     * Gobbles only identifiers
     * e.g.: `foo`, `_value`, `$x1`
     * Also, this function checks if that identifier is a literal:
     * (e.g. `true`, `false`, `null`) or `this`
     */
    gobbleIdentifier(): Identifier;
    /**
     * Gobbles a list of arguments within the context of a function call
     * or array literal. This function also assumes that the opening character
     * `(` or `[` has already been gobbled, and gobbles expressions and commas
     * until the terminator character `)` or `]` is encountered.
     * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
     */
    gobbleArguments(termination: number): Expression[];
    /**
     * Responsible for parsing a group of things within parentheses `()`
     * that have no identifier in front (so not a function call)
     * This function assumes that it needs to gobble the opening parenthesis
     * and then tries to gobble everything within that parenthesis, assuming
     * that the next thing it should see is the close parenthesis. If not,
     * then the expression probably doesn't have a `)`
     */
    gobbleGroup(): Expression | false;
    /**
     * Responsible for parsing Array literals `[1, 2, 3]`
     * This function assumes that it needs to gobble the opening bracket
     * and then tries to gobble the expressions as arguments.
     */
    gobbleArray(): ArrayExpression;
}
export {};
//# sourceMappingURL=parser.d.ts.map