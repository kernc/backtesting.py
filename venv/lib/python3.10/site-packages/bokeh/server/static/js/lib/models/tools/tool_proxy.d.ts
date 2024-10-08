import type * as p from "../../core/properties";
import type { EventType } from "../../core/ui_events";
import { Signal0 } from "../../core/signaling";
import { Model } from "../../model";
import type { ToolView, EventRole } from "./tool";
import { Tool } from "./tool";
import type { ToolButton } from "./tool_button";
import type { MenuItem } from "../../core/util/menus";
export type ToolLike<T extends Tool> = T | ToolProxy<T>;
export declare namespace ToolProxy {
    type Attrs<T extends Tool> = p.AttrsOf<Props<T>>;
    type Props<T extends Tool> = Model.Props & {
        tools: p.Property<T[]>;
        active: p.Property<boolean>;
        disabled: p.Property<boolean>;
    };
}
export interface ToolProxy<T extends Tool> extends ToolProxy.Attrs<T> {
}
export declare class ToolProxy<T extends Tool> extends Model {
    properties: ToolProxy.Props<T>;
    __view_type__: ToolView;
    constructor(attrs?: Partial<ToolProxy.Attrs<T>>);
    do: Signal0<this>;
    get underlying(): Tool;
    tool_button(): ToolButton;
    get event_type(): EventType | EventType[] | undefined;
    get event_role(): EventRole;
    get event_types(): EventType[];
    get default_order(): number;
    get tooltip(): string;
    get tool_name(): string;
    get computed_icon(): string | undefined;
    get toggleable(): boolean;
    get visible(): boolean;
    initialize(): void;
    connect_signals(): void;
    doit(): void;
    set_active(): void;
    get menu(): MenuItem[] | null;
    supports_auto(): boolean;
}
//# sourceMappingURL=tool_proxy.d.ts.map