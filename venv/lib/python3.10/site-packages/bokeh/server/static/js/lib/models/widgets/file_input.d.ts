import { InputWidget, InputWidgetView } from "./input_widget";
import type { StyleSheetLike } from "../../core/dom";
import * as p from "../../core/properties";
export declare class FileInputView extends InputWidgetView {
    model: FileInput;
    input_el: HTMLInputElement;
    connect_signals(): void;
    stylesheets(): StyleSheetLike[];
    protected _render_input(): HTMLElement;
    render(): void;
    load_files(files: FileList): Promise<void>;
    protected _read_file(file: File): Promise<string>;
}
export declare namespace FileInput {
    type Attrs = p.AttrsOf<Props>;
    type Props = InputWidget.Props & {
        value: p.Property<string | string[]>;
        mime_type: p.Property<string | string[]>;
        filename: p.Property<string | string[]>;
        accept: p.Property<string | string[]>;
        multiple: p.Property<boolean>;
        directory: p.Property<boolean>;
    };
}
export interface FileInput extends FileInput.Attrs {
}
export declare class FileInput extends InputWidget {
    properties: FileInput.Props;
    __view_type__: FileInputView;
    constructor(attrs?: Partial<FileInput.Attrs>);
}
//# sourceMappingURL=file_input.d.ts.map