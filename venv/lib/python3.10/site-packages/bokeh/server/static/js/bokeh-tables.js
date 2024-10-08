'use strict';
/*!
 * Copyright (c) Anaconda, Inc., and Bokeh Contributors
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of Anaconda nor the names of any contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */
(function(root, factory) {
  factory(root["Bokeh"], "3.6.0");
})(this, function(Bokeh, version) {
  let define;
  return (function(modules, entry, aliases, externals) {
    const bokeh = typeof Bokeh !== "undefined" ? (version != null ? Bokeh[version] : Bokeh) : null;
    if (bokeh != null) {
      return bokeh.register_plugin(modules, entry, aliases);
    } else {
      throw new Error("Cannot find Bokeh" + (version != null ? " " + version : "") + ". You have to load it prior to loading plugins.");
    }
  })
({
683: /* models/widgets/tables/main.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const Tables = tslib_1.__importStar(require(684) /* ./index */);
    exports.Tables = Tables;
    const base_1 = require(7) /* ../../../base */;
    (0, base_1.register_models)(Tables);
},
684: /* models/widgets/tables/index.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    tslib_1.__exportStar(require(685) /* ./cell_editors */, exports);
    tslib_1.__exportStar(require(688) /* ./cell_formatters */, exports);
    var data_table_1 = require(691) /* ./data_table */;
    __esExport("DataTable", data_table_1.DataTable);
    var table_column_1 = require(709) /* ./table_column */;
    __esExport("TableColumn", table_column_1.TableColumn);
    var table_widget_1 = require(708) /* ./table_widget */;
    __esExport("TableWidget", table_widget_1.TableWidget);
    var row_aggregators_1 = require(711) /* ./row_aggregators */;
    __esExport("AvgAggregator", row_aggregators_1.AvgAggregator);
    __esExport("MinAggregator", row_aggregators_1.MinAggregator);
    __esExport("MaxAggregator", row_aggregators_1.MaxAggregator);
    __esExport("SumAggregator", row_aggregators_1.SumAggregator);
    var data_cube_1 = require(712) /* ./data_cube */;
    __esExport("GroupingInfo", data_cube_1.GroupingInfo);
    __esExport("DataCube", data_cube_1.DataCube);
},
685: /* models/widgets/tables/cell_editors.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../../../core/dom */;
    const types_1 = require(8) /* ../../../core/util/types */;
    const dom_view_1 = require(57) /* ../../../core/dom_view */;
    const model_1 = require(51) /* ../../../model */;
    const definitions_1 = require(686) /* ./definitions */;
    const tables = tslib_1.__importStar(require(687) /* ../../../styles/widgets/tables.css */);
    class CellEditorView extends dom_view_1.DOMComponentView {
        get emptyValue() {
            return null;
        }
        constructor(options) {
            const { model, parent } = options.column;
            super({ model, parent, ...options });
            this.args = options;
            this.initialize(); // XXX: no build_views()
            this.render(); // XXX: this isn't governed by layout
        }
        initialize() {
            super.initialize();
            this.inputEl = this._createInput();
            this.defaultValue = null;
        }
        async lazy_initialize() {
            throw new Error("unsupported");
        }
        css_classes() {
            return super.css_classes().concat(tables.cell_editor);
        }
        render() {
            this.args.container.append(this.el);
            this.shadow_el.appendChild(this.inputEl);
            this.renderEditor();
            this.disableNavigation();
        }
        renderEditor() { }
        disableNavigation() {
            // XXX: without cast `event` is of non-specific type `Event`
            this.inputEl.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                    case "ArrowRight":
                    case "ArrowUp":
                    case "ArrowDown":
                    case "PageUp":
                    case "PageDown": {
                        event.stopImmediatePropagation();
                        break;
                    }
                }
            });
        }
        destroy() {
            this.remove();
        }
        focus() {
            this.inputEl.focus();
        }
        show() { }
        hide() { }
        position() { }
        getValue() {
            return this.inputEl.value;
        }
        setValue(val) {
            this.inputEl.value = val;
        }
        serializeValue() {
            return this.getValue();
        }
        isValueChanged() {
            return !(this.getValue() == "" && this.defaultValue == null) && this.getValue() !== this.defaultValue;
        }
        applyValue(item, state) {
            const grid_data = this.args.grid.getData();
            const offset = grid_data.index.indexOf(item[definitions_1.DTINDEX_NAME]);
            grid_data.setField(offset, this.args.column.field, state);
        }
        loadValue(item) {
            const value = item[this.args.column.field];
            this.defaultValue = value != null ? value : this.emptyValue;
            this.setValue(this.defaultValue);
        }
        validateValue(value) {
            if (this.args.column.validator) {
                const result = this.args.column.validator(value);
                if (!result.valid) {
                    return result;
                }
            }
            return { valid: true, msg: null };
        }
        validate() {
            return this.validateValue(this.getValue());
        }
    }
    exports.CellEditorView = CellEditorView;
    CellEditorView.__name__ = "CellEditorView";
    class CellEditor extends model_1.Model {
    }
    exports.CellEditor = CellEditor;
    CellEditor.__name__ = "CellEditor";
    class StringEditorView extends CellEditorView {
        get emptyValue() {
            return "";
        }
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
        renderEditor() {
            //completions = @model.completions
            //if completions.length != 0
            //  @inputEl.classList.add("bk-cell-editor-completion")
            //  $(@inputEl).autocomplete({source: completions})
            //  $(@inputEl).autocomplete("widget")
            this.inputEl.focus();
            this.inputEl.select();
        }
        loadValue(item) {
            super.loadValue(item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        }
    }
    exports.StringEditorView = StringEditorView;
    StringEditorView.__name__ = "StringEditorView";
    class StringEditor extends CellEditor {
    }
    exports.StringEditor = StringEditor;
    _a = StringEditor;
    StringEditor.__name__ = "StringEditor";
    (() => {
        _a.prototype.default_view = StringEditorView;
        _a.define(({ Str, List }) => ({
            completions: [List(Str), []],
        }));
    })();
    class TextEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.textarea)();
        }
        renderEditor() {
            this.inputEl.focus();
            this.inputEl.select();
        }
    }
    exports.TextEditorView = TextEditorView;
    TextEditorView.__name__ = "TextEditorView";
    class TextEditor extends CellEditor {
    }
    exports.TextEditor = TextEditor;
    _b = TextEditor;
    TextEditor.__name__ = "TextEditor";
    (() => {
        _b.prototype.default_view = TextEditorView;
    })();
    class SelectEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.select)();
        }
        renderEditor() {
            for (const opt of this.model.options) {
                this.inputEl.appendChild((0, dom_1.option)({ value: opt }, opt));
            }
            this.focus();
        }
    }
    exports.SelectEditorView = SelectEditorView;
    SelectEditorView.__name__ = "SelectEditorView";
    class SelectEditor extends CellEditor {
    }
    exports.SelectEditor = SelectEditor;
    _c = SelectEditor;
    SelectEditor.__name__ = "SelectEditor";
    (() => {
        _c.prototype.default_view = SelectEditorView;
        _c.define(({ Str, List }) => ({
            options: [List(Str), []],
        }));
    })();
    class PercentEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
    }
    exports.PercentEditorView = PercentEditorView;
    PercentEditorView.__name__ = "PercentEditorView";
    class PercentEditor extends CellEditor {
    }
    exports.PercentEditor = PercentEditor;
    _d = PercentEditor;
    PercentEditor.__name__ = "PercentEditor";
    (() => {
        _d.prototype.default_view = PercentEditorView;
    })();
    class CheckboxEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "checkbox" });
        }
        renderEditor() {
            this.focus();
        }
        loadValue(item) {
            this.defaultValue = !!item[this.args.column.field];
            this.inputEl.checked = this.defaultValue;
        }
        serializeValue() {
            return this.inputEl.checked;
        }
    }
    exports.CheckboxEditorView = CheckboxEditorView;
    CheckboxEditorView.__name__ = "CheckboxEditorView";
    class CheckboxEditor extends CellEditor {
    }
    exports.CheckboxEditor = CheckboxEditor;
    _e = CheckboxEditor;
    CheckboxEditor.__name__ = "CheckboxEditor";
    (() => {
        _e.prototype.default_view = CheckboxEditorView;
    })();
    class IntEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
        renderEditor() {
            //$(@inputEl).spinner({step: @model.step})
            this.inputEl.focus();
            this.inputEl.select();
        }
        remove() {
            //$(@inputEl).spinner("destroy")
            super.remove();
        }
        serializeValue() {
            const value = parseInt(this.getValue(), 10);
            return isNaN(value) ? 0 : value;
        }
        loadValue(item) {
            super.loadValue(item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        }
        validateValue(value) {
            if ((0, types_1.isString)(value)) {
                value = Number(value);
            }
            if ((0, types_1.isInteger)(value)) {
                return super.validateValue(value);
            }
            else {
                return { valid: false, msg: "Please enter a valid integer" };
            }
        }
    }
    exports.IntEditorView = IntEditorView;
    IntEditorView.__name__ = "IntEditorView";
    class IntEditor extends CellEditor {
    }
    exports.IntEditor = IntEditor;
    _f = IntEditor;
    IntEditor.__name__ = "IntEditor";
    (() => {
        _f.prototype.default_view = IntEditorView;
        _f.define(({ Int }) => ({
            step: [Int, 1],
        }));
    })();
    class NumberEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
        renderEditor() {
            //$(@inputEl).spinner({step: @model.step})
            this.inputEl.focus();
            this.inputEl.select();
        }
        remove() {
            //$(@inputEl).spinner("destroy")
            super.remove();
        }
        serializeValue() {
            const value = parseFloat(this.getValue());
            return isNaN(value) ? 0.0 : value;
        }
        loadValue(item) {
            super.loadValue(item);
            this.inputEl.defaultValue = this.defaultValue;
            this.inputEl.select();
        }
        validateValue(value) {
            if (isNaN(value)) {
                return { valid: false, msg: "Please enter a valid number" };
            }
            else {
                return super.validateValue(value);
            }
        }
    }
    exports.NumberEditorView = NumberEditorView;
    NumberEditorView.__name__ = "NumberEditorView";
    class NumberEditor extends CellEditor {
    }
    exports.NumberEditor = NumberEditor;
    _g = NumberEditor;
    NumberEditor.__name__ = "NumberEditor";
    (() => {
        _g.prototype.default_view = NumberEditorView;
        _g.define(({ Float }) => ({
            step: [Float, 0.01],
        }));
    })();
    class TimeEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
    }
    exports.TimeEditorView = TimeEditorView;
    TimeEditorView.__name__ = "TimeEditorView";
    class TimeEditor extends CellEditor {
    }
    exports.TimeEditor = TimeEditor;
    _h = TimeEditor;
    TimeEditor.__name__ = "TimeEditor";
    (() => {
        _h.prototype.default_view = TimeEditorView;
    })();
    class DateEditorView extends CellEditorView {
        _createInput() {
            return (0, dom_1.input)({ type: "text" });
        }
        get emptyValue() {
            return new Date();
        }
        renderEditor() {
            //this.calendarOpen = false
            //@$datepicker = $(@inputEl).datepicker({
            //  showOn: "button"
            //  buttonImageOnly: true
            //  beforeShow: () => @calendarOpen = true
            //  onClose: () => @calendarOpen = false
            //})
            //@$datepicker.siblings(".ui-datepicker-trigger").css("vertical-align": "middle")
            //@$datepicker.width(@$datepicker.width() - (14 + 2*4 + 4)) # img width + margins + edge distance
            this.inputEl.focus();
            this.inputEl.select();
        }
        destroy() {
            //$.datepicker.dpDiv.stop(true, true)
            //@$datepicker.datepicker("hide")
            //@$datepicker.datepicker("destroy")
            super.destroy();
        }
        show() {
            //if @calendarOpen
            //  $.datepicker.dpDiv.stop(true, true).show()
            super.show();
        }
        hide() {
            //if @calendarOpen
            //  $.datepicker.dpDiv.stop(true, true).hide()
            super.hide();
        }
        position( /*_position*/) {
            //if @calendarOpen
            //  $.datepicker.dpDiv.css(top: position.top + 30, left: position.left)
            return super.position();
        }
        getValue() {
            //return @$datepicker.datepicker("getDate").getTime()
        }
        setValue(_val) {
            //@$datepicker.datepicker("setDate", new Date(val))
        }
    }
    exports.DateEditorView = DateEditorView;
    DateEditorView.__name__ = "DateEditorView";
    class DateEditor extends CellEditor {
    }
    exports.DateEditor = DateEditor;
    _j = DateEditor;
    DateEditor.__name__ = "DateEditor";
    (() => {
        _j.prototype.default_view = DateEditorView;
    })();
},
686: /* models/widgets/tables/definitions.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.DTINDEX_NAME = "__bkdt_internal_index__";
},
687: /* styles/widgets/tables.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.data_table = "bk-data-table";
    exports.cell_special_defaults = "bk-cell-special-defaults";
    exports.cell_select = "bk-cell-select";
    exports.cell_index = "bk-cell-index";
    exports.header_index = "bk-header-index";
    exports.cell_editor = "bk-cell-editor";
    exports.cell_editor_completion = "bk-cell-editor-completion";
    exports.default = `:host{--data-table-font-size:var(--font-size);}.bk-data-table{box-sizing:content-box;width:100%;height:100%;font-size:var(--data-table-font-size);}.bk-data-table input[type="checkbox"]{margin-left:4px;margin-right:4px;}.bk-cell-special-defaults{border-right-color:silver;border-right-style:solid;background:#f5f5f5;}.bk-cell-select{border-right-color:silver;border-right-style:solid;background:#f5f5f5;}.slick-cell.bk-cell-index{border-right-color:silver;border-right-style:solid;background:#f5f5f5;text-align:right;background:#f0f0f0;color:#909090;}.bk-header-index .slick-column-name{float:right;}.slick-row.selected .bk-cell-index{background-color:transparent;}.slick-row.odd{background:#f0f0f0;}.slick-cell{padding-left:4px;padding-right:4px;border-right-color:transparent;border:0.25px solid transparent;}.slick-cell .bk{line-height:inherit;}.slick-cell.active{border-style:dashed;}.slick-cell.selected{background-color:#F0F8FF;}.slick-cell.editable{padding-left:0;padding-right:0;}.bk-cell-editor{display:contents;}.bk-cell-editor input,.bk-cell-editor select{width:100%;height:100%;border:0;margin:0;padding:0;outline:0;background:transparent;vertical-align:baseline;}.bk-cell-editor input{padding-left:4px;padding-right:4px;}.bk-cell-editor-completion{font-size:var(--data-table-font-size);}`;
},
688: /* models/widgets/tables/cell_formatters.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a, _b, _c, _d, _e, _f;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const timezone_1 = tslib_1.__importDefault(require(248) /* timezone */);
    const Numbro = tslib_1.__importStar(require(246) /* @bokeh/numbro */);
    const underscore_template_1 = require(689) /* underscore.template */;
    const p = tslib_1.__importStar(require(18) /* ../../../core/properties */);
    const dom_1 = require(63) /* ../../../core/dom */;
    const vectorization_1 = require(28) /* ../../../core/vectorization */;
    const enums_1 = require(20) /* ../../../core/enums */;
    const types_1 = require(8) /* ../../../core/util/types */;
    const string_1 = require(40) /* ../../../core/util/string */;
    const color_1 = require(22) /* ../../../core/util/color */;
    const model_1 = require(51) /* ../../../model */;
    const color_mapper_1 = require(216) /* ../../mappers/color_mapper */;
    const assert_1 = require(12) /* ../../../core/util/assert */;
    class CellFormatter extends model_1.Model {
        constructor(attrs) {
            super(attrs);
        }
        doFormat(_row, _cell, value, _columnDef, _dataContext) {
            if (value == null) {
                return "";
            }
            else {
                return `${value}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        }
    }
    exports.CellFormatter = CellFormatter;
    CellFormatter.__name__ = "CellFormatter";
    class StringFormatter extends CellFormatter {
        constructor(attrs) {
            super(attrs);
        }
        doFormat(_row, _cell, value, _columnDef, dataContext) {
            const { font_style, text_align, text_color, background_color } = this;
            if (Number.isNaN(value)) {
                value = this.nan_format;
            }
            else if (value == null) {
                value = this.null_format;
            }
            const text = (0, dom_1.div)(value == null ? "" : `${value}`);
            // Font style
            let resolved_font_style;
            if ((0, vectorization_1.isValue)(font_style)) {
                resolved_font_style = font_style.value;
            }
            else if ((0, vectorization_1.isField)(font_style)) {
                resolved_font_style = dataContext[font_style.field];
            }
            else if ((0, vectorization_1.isExpr)(font_style)) {
                // TODO
            }
            else {
                (0, assert_1.unreachable)();
            }
            switch (resolved_font_style) {
                case "normal":
                    // nothing to do
                    break;
                case "italic":
                    text.style.fontStyle = "italic";
                    break;
                case "bold":
                    text.style.fontWeight = "bold";
                    break;
                case "bold italic":
                    text.style.fontStyle = "italic";
                    text.style.fontWeight = "bold";
                    break;
            }
            // Text align
            if ((0, vectorization_1.isValue)(text_align)) {
                text.style.textAlign = text_align.value;
            }
            else if ((0, vectorization_1.isField)(text_align)) {
                text.style.textAlign = dataContext[text_align.field];
            }
            else if ((0, vectorization_1.isExpr)(text_align)) {
                // TODO
            }
            else {
                (0, assert_1.unreachable)();
            }
            // Text color
            // Handle the most common case first : isValue and value == null
            if ((0, vectorization_1.isValue)(text_color)) {
                if (text_color.value != null) {
                    text.style.color = (0, color_1.color2css)(text_color.value);
                }
            }
            else if ((0, vectorization_1.isField)(text_color)) {
                if (text_color.transform != null && text_color.transform instanceof color_mapper_1.ColorMapper) {
                    const rgba_array = text_color.transform.rgba_mapper.v_compute([dataContext[text_color.field]]);
                    const [r, g, b, a] = rgba_array;
                    text.style.color = (0, color_1.rgba2css)([r, g, b, a]);
                }
                else {
                    text.style.color = (0, color_1.color2css)(dataContext[text_color.field]);
                }
            }
            else if ((0, vectorization_1.isExpr)(text_color)) {
                // TODO
            }
            else {
                (0, assert_1.unreachable)();
            }
            // Background color
            if ((0, vectorization_1.isValue)(background_color)) {
                if (background_color.value != null) {
                    text.style.backgroundColor = (0, color_1.color2css)(background_color.value);
                }
            }
            else if ((0, vectorization_1.isField)(background_color)) {
                if (background_color.transform != null && background_color.transform instanceof color_mapper_1.ColorMapper) {
                    const rgba_array = background_color.transform.rgba_mapper.v_compute([dataContext[background_color.field]]);
                    const [r, g, b, a] = rgba_array;
                    text.style.backgroundColor = (0, color_1.rgba2css)([r, g, b, a]);
                }
                else {
                    text.style.backgroundColor = (0, color_1.color2css)(dataContext[background_color.field]);
                }
            }
            else if ((0, vectorization_1.isExpr)(background_color)) {
                // TODO
            }
            else {
                (0, assert_1.unreachable)();
            }
            return text.outerHTML;
        }
    }
    exports.StringFormatter = StringFormatter;
    _a = StringFormatter;
    StringFormatter.__name__ = "StringFormatter";
    (() => {
        _a.define(({ Str }) => ({
            font_style: [p.FontStyleSpec, { value: "normal" }],
            text_align: [p.TextAlignSpec, { value: "left" }],
            text_color: [p.ColorSpec, null],
            background_color: [p.ColorSpec, null],
            nan_format: [Str, "NaN"],
            null_format: [Str, "(null)"],
        }));
    })();
    class ScientificFormatter extends StringFormatter {
        constructor(attrs) {
            super(attrs);
        }
        get scientific_limit_low() {
            return 10.0 ** this.power_limit_low;
        }
        get scientific_limit_high() {
            return 10.0 ** this.power_limit_high;
        }
        doFormat(row, cell, value, columnDef, dataContext) {
            const need_sci = Math.abs(value) <= this.scientific_limit_low || Math.abs(value) >= this.scientific_limit_high;
            let precision = this.precision;
            // toExponential does not handle precision values < 0 correctly
            if (precision < 1) {
                precision = 1;
            }
            if (Number.isNaN(value)) {
                value = this.nan_format;
            }
            else if (value == null) {
                value = this.null_format;
            }
            else if (value == 0) {
                value = (0, string_1.to_fixed)(value, 1);
            }
            else if (need_sci) {
                value = value.toExponential(precision);
            }
            else {
                value = (0, string_1.to_fixed)(value, precision);
            }
            // add StringFormatter formatting
            return super.doFormat(row, cell, value, columnDef, dataContext);
        }
    }
    exports.ScientificFormatter = ScientificFormatter;
    _b = ScientificFormatter;
    ScientificFormatter.__name__ = "ScientificFormatter";
    (() => {
        _b.define(({ Float }) => ({
            precision: [Float, 10],
            power_limit_high: [Float, 5],
            power_limit_low: [Float, -3],
        }));
        _b.override({
            nan_format: "-",
            null_format: "-",
        });
    })();
    class NumberFormatter extends StringFormatter {
        constructor(attrs) {
            super(attrs);
        }
        doFormat(row, cell, value, columnDef, dataContext) {
            const { format, language, nan_format, null_format } = this;
            const rounding = (() => {
                switch (this.rounding) {
                    case "round":
                    case "nearest": return Math.round;
                    case "floor":
                    case "rounddown": return Math.floor;
                    case "ceil":
                    case "roundup": return Math.ceil;
                }
            })();
            if (Number.isNaN(value)) {
                value = nan_format;
            }
            else if (value == null) {
                value = null_format;
            }
            else {
                value = Numbro.format(value, format, language, rounding);
            }
            return super.doFormat(row, cell, value, columnDef, dataContext);
        }
    }
    exports.NumberFormatter = NumberFormatter;
    _c = NumberFormatter;
    NumberFormatter.__name__ = "NumberFormatter";
    (() => {
        _c.define(({ Str }) => ({
            format: [Str, "0,0"],
            language: [Str, "en"],
            rounding: [enums_1.RoundingFunction, "round"],
        }));
        _c.override({
            nan_format: "-",
            null_format: "-",
        });
    })();
    class BooleanFormatter extends CellFormatter {
        constructor(attrs) {
            super(attrs);
        }
        doFormat(_row, _cell, value, _columnDef, _dataContext) {
            return !!value ? (0, dom_1.i)({ class: this.icon }).outerHTML : "";
        }
    }
    exports.BooleanFormatter = BooleanFormatter;
    _d = BooleanFormatter;
    BooleanFormatter.__name__ = "BooleanFormatter";
    (() => {
        _d.define(({ Str }) => ({
            icon: [Str, "check"],
        }));
    })();
    class DateFormatter extends StringFormatter {
        constructor(attrs) {
            super(attrs);
        }
        getFormat() {
            // using definitions provided here: https://api.jqueryui.com/datepicker/
            // except not implementing TICKS
            switch (this.format) {
                case "ATOM":
                case "W3C":
                case "RFC-3339":
                case "ISO-8601":
                    return "%Y-%m-%d";
                case "COOKIE":
                    return "%a, %d %b %Y";
                case "RFC-850":
                    return "%A, %d-%b-%y";
                case "RFC-1123":
                case "RFC-2822":
                    return "%a, %e %b %Y";
                case "RSS":
                case "RFC-822":
                case "RFC-1036":
                    return "%a, %e %b %y";
                case "TIMESTAMP":
                    return undefined;
                default:
                    return this.format;
            }
        }
        doFormat(row, cell, value, columnDef, dataContext) {
            function parse(date) {
                /* Parse bare dates as UTC. */
                const has_tz = /Z$|[+-]\d\d((:?)\d\d)?$/.test(date); // ISO 8601 TZ designation or offset
                const iso_date = has_tz ? date : `${date}Z`;
                return new Date(iso_date).getTime();
            }
            const epoch = (() => {
                if (value == null || (0, types_1.isNumber)(value)) {
                    return value;
                }
                else if ((0, types_1.isString)(value)) {
                    const epoch = Number(value);
                    return isNaN(epoch) ? parse(value) : epoch;
                }
                else if (value instanceof Date) {
                    return value.valueOf();
                }
                else {
                    return Number(value);
                }
            })();
            const NaT = -9223372036854776.0;
            const date = (() => {
                if (Number.isNaN(epoch) || epoch == NaT) {
                    return this.nan_format;
                }
                else if (value == null) {
                    return this.null_format;
                }
                else {
                    return (0, timezone_1.default)(epoch, this.getFormat());
                }
            })();
            return super.doFormat(row, cell, date, columnDef, dataContext);
        }
    }
    exports.DateFormatter = DateFormatter;
    _e = DateFormatter;
    DateFormatter.__name__ = "DateFormatter";
    (() => {
        _e.define(({ Str }) => ({
            format: [Str, "ISO-8601"],
        }));
        _e.override({
            nan_format: "-",
            null_format: "-",
        });
    })();
    class HTMLTemplateFormatter extends CellFormatter {
        constructor(attrs) {
            super(attrs);
        }
        doFormat(_row, _cell, value, _columnDef, dataContext) {
            const { template } = this;
            if (value == null) {
                return "";
            }
            else {
                const compiled_template = underscore_template_1._.template(template);
                const context = { ...dataContext, value };
                return compiled_template(context);
            }
        }
    }
    exports.HTMLTemplateFormatter = HTMLTemplateFormatter;
    _f = HTMLTemplateFormatter;
    HTMLTemplateFormatter.__name__ = "HTMLTemplateFormatter";
    (() => {
        _f.define(({ Str }) => ({
            template: [Str, "<%= value %>"],
        }));
    })();
},
689: /* underscore.template/lib/index.js */ function _(require, module, exports, __esModule, __esExport) {
    var _ = require(690) /* ./underscore.template */;
    var UnderscoreTemplate = _.template;
    function Template(text, data, settings) {
        return UnderscoreTemplate(text, data, settings);
    }
    Template._ = _;
    module.exports = Template;
    // If we're in the browser,
    // define it if we're using AMD, otherwise leak a global.
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Template;
        });
    }
    else if (typeof window !== 'undefined' || typeof navigator !== 'undefined') {
        window.UnderscoreTemplate = Template;
    }
},
690: /* underscore.template/lib/underscore.template.js */ function _(require, module, exports, __esModule, __esExport) {
    //     Underscore.js 1.5.2
    //     http://underscorejs.org
    //     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    //     Underscore may be freely distributed under the MIT license.
    // Establish the object that gets returned to break out of a loop iteration.
    var breaker = {};
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    // Create quick reference variables for speed access to core prototypes.
    var slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeForEach = ArrayProto.forEach, nativeKeys = Object.keys, nativeIsArray = Array.isArray;
    // Create a safe reference to the Underscore object for use below.
    var _ = function () { };
    // Collection Functions
    // --------------------
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null)
            return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        }
        else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker)
                    return;
            }
        }
        else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker)
                    return;
            }
        }
    };
    // Object Functions
    // ----------------
    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = nativeKeys || function (obj) {
        if (obj !== Object(obj))
            throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key))
                keys.push(key);
        return keys;
    };
    // Fill in a given object with default properties.
    _.defaults = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0)
                        obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };
    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, path) {
        if (!_.isArray(path)) {
            return obj != null && hasOwnProperty.call(obj, path);
        }
        var length = path.length;
        for (var i = 0; i < length; i++) {
            var key = path[i];
            if (obj == null || !hasOwnProperty.call(obj, key)) {
                return false;
            }
            obj = obj[key];
        }
        return !!length;
    };
    // List of HTML entities for escaping.
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    // Regexes containing the keys and values listed immediately above.
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g')
    };
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    _.each(['escape'], function (method) {
        _[method] = function (string) {
            if (string == null)
                return '';
            return ('' + string).replace(entityRegexes[method], function (match) {
                return entityMap[method][match];
            });
        };
    });
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;
    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) { return '\\' + escapes[match]; });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        // If a variable is not specified, place data values in local scope.
        if (!settings.variable)
            source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        }
        catch (e) {
            e.source = source;
            throw e;
        }
        if (data)
            return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };
        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    module.exports = _;
},
691: /* models/widgets/tables/data_table.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const slick_rowselectionmodel_1 = require(692) /* @bokeh/slickgrid/plugins/slick.rowselectionmodel */;
    const slick_checkboxselectcolumn_1 = require(696) /* @bokeh/slickgrid/plugins/slick.checkboxselectcolumn */;
    const slick_cellexternalcopymanager_1 = require(697) /* @bokeh/slickgrid/plugins/slick.cellexternalcopymanager */;
    const slickgrid_1 = require(698) /* @bokeh/slickgrid */;
    const dom_1 = require(63) /* ../../../core/dom */;
    const object_1 = require(9) /* ../../../core/util/object */;
    const string_1 = require(40) /* ../../../core/util/string */;
    const types_1 = require(8) /* ../../../core/util/types */;
    const array_1 = require(10) /* ../../../core/util/array */;
    const arrayable_1 = require(13) /* ../../../core/util/arrayable */;
    const ndarray_1 = require(30) /* ../../../core/util/ndarray */;
    const logging_1 = require(19) /* ../../../core/logging */;
    const widget_1 = require(707) /* ../widget */;
    const definitions_1 = require(686) /* ./definitions */;
    const table_widget_1 = require(708) /* ./table_widget */;
    const table_column_1 = require(709) /* ./table_column */;
    const build_views_1 = require(56) /* ../../../core/build_views */;
    const tables_css_1 = tslib_1.__importStar(require(687) /* ../../../styles/widgets/tables.css */), tables = tables_css_1;
    const slickgrid_css_1 = tslib_1.__importDefault(require(710) /* ../../../styles/widgets/slickgrid.css */);
    exports.AutosizeModes = {
        fit_columns: "FCV",
        fit_viewport: "FVC",
        force_fit: "LFF",
        none: "NOA",
    };
    let _warned_not_reorderable = false;
    class TableDataProvider {
        constructor(source, view) {
            this.init(source, view);
        }
        init(source, view) {
            if (definitions_1.DTINDEX_NAME in source.data) {
                throw new Error(`special name ${definitions_1.DTINDEX_NAME} cannot be used as a data table column`);
            }
            this.source = source;
            this.view = view;
            this.index = [...this.view.indices];
        }
        getLength() {
            return this.index.length;
        }
        getItem(offset) {
            const item = {};
            const data = (0, object_1.dict)(this.source.data);
            for (const [field, column] of data) {
                const i = this.index[offset];
                const value = (0, ndarray_1.is_NDArray)(column) ? column.get(i) : column[i];
                item[field] = value;
            }
            item[definitions_1.DTINDEX_NAME] = this.index[offset];
            return item;
        }
        getField(offset, field) {
            if (field == definitions_1.DTINDEX_NAME) {
                return this.index[offset];
            }
            else {
                const data = (0, object_1.dict)(this.source.data);
                const column = data.get(field) ?? [];
                const i = this.index[offset];
                return (0, ndarray_1.is_NDArray)(column) ? column.get(i) : column[i];
            }
        }
        setField(offset, field, value) {
            // field assumed never to be internal index name (ctor would throw)
            const index = this.index[offset];
            const patches = new Map([
                [field, [[index, value]]],
            ]);
            this.source.patch(patches);
        }
        getRecords() {
            return (0, array_1.range)(0, this.getLength()).map((i) => this.getItem(i));
        }
        getItems() {
            return this.getRecords();
        }
        slice(start, end, step = 1) {
            end = end ?? this.getLength();
            return (0, array_1.range)(start, end, step).map((i) => this.getItem(i));
        }
        sort(columns) {
            let cols = columns.map((column) => [column.sortCol, column.sortAsc ? 1 : -1]);
            if (cols.length == 0) {
                cols = [[{ field: definitions_1.DTINDEX_NAME }, 1]];
            }
            const records = this.getRecords();
            const old_index = this.index.slice();
            this.index.sort((i0, i1) => {
                for (const [col, sign] of cols) {
                    const v0 = records[old_index.indexOf(i0)][col.field];
                    const v1 = records[old_index.indexOf(i1)][col.field];
                    if (col.sorter != null) {
                        return sign * col.sorter.compute(v0, v1);
                    }
                    if (v0 === v1) {
                        continue;
                    }
                    if ((0, types_1.isNumber)(v0) && (0, types_1.isNumber)(v1)) {
                        /* eslint-disable @typescript-eslint/strict-boolean-expressions */
                        return sign * (v0 - v1 || +isNaN(v0) - +isNaN(v1));
                    }
                    else {
                        const result = `${v0}`.localeCompare(`${v1}`);
                        if (result == 0) {
                            continue;
                        }
                        else {
                            return sign * result;
                        }
                    }
                }
                return 0;
            });
        }
    }
    exports.TableDataProvider = TableDataProvider;
    TableDataProvider.__name__ = "TableDataProvider";
    class DataTableView extends widget_1.WidgetView {
        constructor() {
            super(...arguments);
            this._in_selection_update = false;
            this._width = null;
            this._filtered_selection = [];
        }
        get data_source() {
            return this.model.properties.source;
        }
        *children() {
            yield* super.children();
            yield this.cds_view;
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            this.cds_view = await (0, build_views_1.build_view)(this.model.view, { parent: this });
        }
        remove() {
            this.cds_view.remove();
            this.grid.destroy();
            super.remove();
        }
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.change, () => {
                this.render();
                this.r_after_render();
            });
            for (const column of this.model.columns) {
                this.connect(column.change, () => {
                    this.render();
                    this.r_after_render();
                });
            }
            // changes to the source trigger the callback below via
            // compute_indices hooks in cds view
            // TODO reevaluate the control flow when taking a general look at events
            this.connect(this.model.view.change, () => this.updateGrid());
            this.connect(this.model.source.selected.change, () => this.updateSelection());
            this.connect(this.model.source.selected.properties.indices.change, () => this.updateSelection());
        }
        stylesheets() {
            return [...super.stylesheets(), slickgrid_css_1.default, tables_css_1.default];
        }
        _after_resize() {
            super._after_resize();
            this.grid.resizeCanvas();
            this.updateLayout(true, false);
        }
        _after_layout() {
            super._after_layout();
            this.grid.resizeCanvas();
            this.updateLayout(true, false);
        }
        box_sizing() {
            const sizing = super.box_sizing();
            if (this.model.autosize_mode === "fit_viewport" && this._width != null) {
                sizing.width = this._width;
            }
            return sizing;
        }
        updateLayout(initialized, rerender) {
            const autosize = this.autosize;
            if (autosize === exports.AutosizeModes.fit_columns || autosize === exports.AutosizeModes.force_fit) {
                if (!initialized) {
                    this.grid.resizeCanvas();
                }
                this.grid.autosizeColumns();
            }
            else if (initialized && rerender && autosize === exports.AutosizeModes.fit_viewport) {
                this.invalidate_layout();
            }
        }
        updateGrid() {
            this.data.init(this.model.source, this.model.view);
            // This is obnoxious but there is no better way to programmatically force
            // a re-sort on the existing sorted columns until/if we start using DataView
            if (this.model.sortable) {
                const columns = this.grid.getColumns();
                const sorters = this.grid.getSortColumns().map((x) => ({
                    sortCol: {
                        field: columns[this.grid.getColumnIndex(x.columnId)].field,
                    },
                    sortAsc: x.sortAsc,
                }));
                this.data.sort(sorters);
            }
            this._sync_selected_with_view();
            this.updateSelection();
            this.grid.invalidate();
            this.updateLayout(true, true);
        }
        updateSelection() {
            if (this.model.selectable === false || this._in_selection_update) {
                return;
            }
            const { indices } = this.model.source.selected;
            const permuted_indices = (0, array_1.sort_by)((0, array_1.map)(indices, (x) => this.data.index.indexOf(x)), (x) => x);
            this._in_selection_update = true;
            try {
                this.grid.setSelectedRows([...permuted_indices]);
            }
            finally {
                this._in_selection_update = false;
            }
            // If the selection is not in the current slickgrid viewport, scroll the
            // datatable to start at the row before the first selected row, so that
            // the selection is immediately brought into view. We don't scroll when
            // the selection is already in the viewport so that selecting from the
            // datatable itself does not re-scroll.
            const cur_grid_range = this.grid.getViewport();
            const scroll_index = this.model.get_scroll_index(cur_grid_range, permuted_indices);
            if (scroll_index != null) {
                this.grid.scrollRowToTop(scroll_index);
            }
        }
        newIndexColumn() {
            return {
                id: (0, string_1.unique_id)(),
                name: this.model.index_header,
                field: definitions_1.DTINDEX_NAME,
                width: this.model.index_width,
                behavior: "select",
                cannotTriggerInsert: true,
                resizable: false,
                selectable: false,
                sortable: true,
                cssClass: tables.cell_index,
                headerCssClass: tables.header_index,
            };
        }
        get autosize() {
            let autosize;
            if (this.model.fit_columns === true) {
                autosize = exports.AutosizeModes.force_fit;
            }
            else if (this.model.fit_columns === false) {
                autosize = exports.AutosizeModes.none;
            }
            else {
                autosize = exports.AutosizeModes[this.model.autosize_mode];
            }
            return autosize;
        }
        render() {
            super.render();
            this.wrapper_el = (0, dom_1.div)({ class: tables.data_table });
            this.shadow_el.appendChild(this.wrapper_el);
        }
        _render_table() {
            const columns = this.model.columns.filter((column) => column.visible).map((column) => {
                return { ...column.toColumn(), parent: this };
            });
            let checkbox_selector = null;
            if (this.model.selectable == "checkbox") {
                checkbox_selector = new slick_checkboxselectcolumn_1.CheckboxSelectColumn({ cssClass: tables.cell_select });
                columns.unshift(checkbox_selector.getColumnDefinition());
            }
            if (this.model.index_position != null) {
                const index_position = this.model.index_position;
                const index = this.newIndexColumn();
                // This is to be able to provide negative index behaviour that
                // matches what python users will expect
                if (index_position == -1) {
                    columns.push(index);
                }
                else if (index_position < -1) {
                    columns.splice(index_position + 1, 0, index);
                }
                else {
                    columns.splice(index_position, 0, index);
                }
            }
            let { reorderable } = this.model;
            if (reorderable && !(typeof $ != "undefined" && typeof $.fn != "undefined" && "sortable" in $.fn)) {
                if (!_warned_not_reorderable) {
                    logging_1.logger.warn("jquery-ui is required to enable DataTable.reorderable");
                    _warned_not_reorderable = true;
                }
                reorderable = false;
            }
            let frozen_row = -1;
            let frozen_bottom = false;
            const { frozen_rows, frozen_columns } = this.model;
            const frozen_column = frozen_columns == null ? -1 : frozen_columns - 1;
            if (frozen_rows != null) {
                frozen_bottom = frozen_rows < 0;
                frozen_row = Math.abs(frozen_rows);
            }
            const options = {
                enableCellNavigation: this.model.selectable !== false,
                enableColumnReorder: reorderable,
                autosizeColsMode: this.autosize,
                multiColumnSort: this.model.sortable,
                editable: this.model.editable,
                autoEdit: this.model.auto_edit,
                autoHeight: false,
                rowHeight: this.model.row_height,
                frozenColumn: frozen_column,
                frozenRow: frozen_row,
                frozenBottom: frozen_bottom,
                explicitInitialization: false,
            };
            this.data = new TableDataProvider(this.model.source, this.model.view);
            this.grid = new slickgrid_1.Grid(this.wrapper_el, this.data, columns, options);
            if (this.autosize == exports.AutosizeModes.fit_viewport) {
                this.grid.autosizeColumns();
                let width = 0;
                for (const column of columns) {
                    width += column.width ?? 0;
                }
                this._width = Math.ceil(width);
            }
            this.grid.onSort.subscribe((_event, args) => {
                if (!this.model.sortable) {
                    return;
                }
                const to_sort = args.sortCols;
                if (to_sort == null) {
                    return;
                }
                this.data.sort(to_sort);
                this.grid.invalidate();
                this.updateSelection();
                this.grid.render();
                if (!this.model.header_row) {
                    this._hide_header();
                }
                this.model.update_sort_columns(to_sort);
            });
            if (this.model.selectable !== false) {
                this.grid.setSelectionModel(new slick_rowselectionmodel_1.RowSelectionModel({ selectActiveRow: checkbox_selector == null }));
                if (checkbox_selector != null) {
                    this.grid.registerPlugin(checkbox_selector);
                }
                const pluginOptions = {
                    dataItemColumnValueExtractor(val, col) {
                        // As defined in this file, Item can contain any type values
                        let value = val[col.field];
                        if ((0, types_1.isString)(value)) {
                            value = value.replace(/\n/g, "\\n");
                        }
                        return value;
                    },
                    includeHeaderWhenCopying: false,
                };
                this.grid.registerPlugin(new slick_cellexternalcopymanager_1.CellExternalCopyManager(pluginOptions));
                this.grid.onSelectedRowsChanged.subscribe((_event, args) => {
                    if (this._in_selection_update) {
                        return;
                    }
                    this.model.source.selected.indices = args.rows.map((i) => this.data.index[i]);
                });
                this.updateSelection();
                if (!this.model.header_row) {
                    this._hide_header();
                }
            }
        }
        _after_render() {
            const initialized = typeof this.grid !== "undefined";
            this._render_table();
            this.updateLayout(initialized, false);
            super._after_render();
        }
        _hide_header() {
            for (const el of this.shadow_el.querySelectorAll(".slick-header-columns")) {
                el.style.height = "0px";
            }
            this.grid.resizeCanvas();
        }
        get_selected_rows() {
            return this.grid.getSelectedRows();
        }
        _sync_selected_with_view() {
            const index = this.data.view.indices;
            const { source } = this.data;
            const not_filtered = (0, arrayable_1.filter)(source.selected.indices, (i) => index.get(i));
            const was_filtered = new Set((0, arrayable_1.filter)(this._filtered_selection, (i) => index.get(i)));
            this._filtered_selection = [
                ...(0, arrayable_1.filter)(this._filtered_selection, (i) => !was_filtered.has(i)),
                ...(0, arrayable_1.filter)(source.selected.indices, (i) => !index.get(i)),
            ];
            source.selected.indices = [
                ...was_filtered,
                ...not_filtered,
            ];
        }
    }
    exports.DataTableView = DataTableView;
    DataTableView.__name__ = "DataTableView";
    class DataTable extends table_widget_1.TableWidget {
        get sort_columns() {
            return this._sort_columns;
        }
        constructor(attrs) {
            super(attrs);
            this._sort_columns = [];
        }
        update_sort_columns(sort_cols) {
            this._sort_columns = sort_cols.map(({ sortCol, sortAsc }) => ({ field: sortCol.field, sortAsc }));
        }
        get_scroll_index(grid_range, selected_indices) {
            if (!this.scroll_to_selection || (selected_indices.length == 0)) {
                return null;
            }
            if (!(0, array_1.some)(selected_indices, i => grid_range.top <= i && i <= grid_range.bottom)) {
                return Math.max(0, Math.min(...selected_indices) - 1);
            }
            return null;
        }
    }
    exports.DataTable = DataTable;
    _a = DataTable;
    DataTable.__name__ = "DataTable";
    (() => {
        _a.prototype.default_view = DataTableView;
        _a.define(({ List, Bool, Int, Ref, Str, Enum, Or, Nullable }) => ({
            autosize_mode: [Enum("fit_columns", "fit_viewport", "none", "force_fit"), "force_fit"],
            auto_edit: [Bool, false],
            columns: [List(Ref(table_column_1.TableColumn)), []],
            fit_columns: [Nullable(Bool), null],
            frozen_columns: [Nullable(Int), null],
            frozen_rows: [Nullable(Int), null],
            sortable: [Bool, true],
            reorderable: [Bool, true],
            editable: [Bool, false],
            selectable: [Or(Bool, Enum("checkbox")), true],
            index_position: [Nullable(Int), 0],
            index_header: [Str, "#"],
            index_width: [Int, 40],
            scroll_to_selection: [Bool, true],
            header_row: [Bool, true],
            row_height: [Int, 25],
        }));
        _a.override({
            width: 600,
            height: 400,
        });
    })();
},
692: /* @bokeh/slickgrid/plugins/slick.rowselectionmodel.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ../slick.jquery */;
    var Slick = require(695) /* ../slick.core */;
    function RowSelectionModel(options) {
        var _grid;
        var _ranges = [];
        var _self = this;
        var _handler = new Slick.EventHandler();
        var _inHandler;
        var _options;
        var _defaults = {
            selectActiveRow: true
        };
        function init(grid) {
            _options = $.extend(true, {}, _defaults, options);
            _grid = grid;
            _handler.subscribe(_grid.onActiveCellChanged, wrapHandler(handleActiveCellChange));
            _handler.subscribe(_grid.onKeyDown, wrapHandler(handleKeyDown));
            _handler.subscribe(_grid.onClick, wrapHandler(handleClick));
        }
        function destroy() {
            _handler.unsubscribeAll();
        }
        function wrapHandler(handler) {
            return function () {
                if (!_inHandler) {
                    _inHandler = true;
                    handler.apply(this, arguments);
                    _inHandler = false;
                }
            };
        }
        function rangesToRows(ranges) {
            var rows = [];
            for (var i = 0; i < ranges.length; i++) {
                for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
                    rows.push(j);
                }
            }
            return rows;
        }
        function rowsToRanges(rows) {
            var ranges = [];
            var lastCell = _grid.getColumns().length - 1;
            for (var i = 0; i < rows.length; i++) {
                ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
            }
            return ranges;
        }
        function getRowsRange(from, to) {
            var i, rows = [];
            for (i = from; i <= to; i++) {
                rows.push(i);
            }
            for (i = to; i < from; i++) {
                rows.push(i);
            }
            return rows;
        }
        function getSelectedRows() {
            return rangesToRows(_ranges);
        }
        function setSelectedRows(rows) {
            setSelectedRanges(rowsToRanges(rows));
        }
        function setSelectedRanges(ranges) {
            // simple check for: empty selection didn't change, prevent firing onSelectedRangesChanged
            if ((!_ranges || _ranges.length === 0) && (!ranges || ranges.length === 0)) {
                return;
            }
            _ranges = ranges;
            _self.onSelectedRangesChanged.notify(_ranges);
        }
        function getSelectedRanges() {
            return _ranges;
        }
        function handleActiveCellChange(e, data) {
            if (_options.selectActiveRow && data.row != null) {
                setSelectedRanges([new Slick.Range(data.row, 0, data.row, _grid.getColumns().length - 1)]);
            }
        }
        function handleKeyDown(e) {
            var activeRow = _grid.getActiveCell();
            if (_grid.getOptions().multiSelect && activeRow
                && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey
                && (e.which == Slick.keyCode.UP || e.which == Slick.keyCode.DOWN)) {
                var selectedRows = getSelectedRows();
                selectedRows.sort(function (x, y) {
                    return x - y;
                });
                if (!selectedRows.length) {
                    selectedRows = [activeRow.row];
                }
                var top = selectedRows[0];
                var bottom = selectedRows[selectedRows.length - 1];
                var active;
                if (e.which == Slick.keyCode.DOWN) {
                    active = activeRow.row < bottom || top == bottom ? ++bottom : ++top;
                }
                else {
                    active = activeRow.row < bottom ? --bottom : --top;
                }
                if (active >= 0 && active < _grid.getDataLength()) {
                    _grid.scrollRowIntoView(active);
                    var tempRanges = rowsToRanges(getRowsRange(top, bottom));
                    setSelectedRanges(tempRanges);
                }
                e.preventDefault();
                e.stopPropagation();
            }
        }
        function handleClick(e) {
            var cell = _grid.getCellFromEvent(e);
            if (!cell || !_grid.canCellBeActive(cell.row, cell.cell)) {
                return false;
            }
            if (!_grid.getOptions().multiSelect || (!e.ctrlKey && !e.shiftKey && !e.metaKey)) {
                return false;
            }
            var selection = rangesToRows(_ranges);
            var idx = $.inArray(cell.row, selection);
            if (idx === -1 && (e.ctrlKey || e.metaKey)) {
                selection.push(cell.row);
                _grid.setActiveCell(cell.row, cell.cell);
            }
            else if (idx !== -1 && (e.ctrlKey || e.metaKey)) {
                selection = $.grep(selection, function (o, i) {
                    return (o !== cell.row);
                });
                _grid.setActiveCell(cell.row, cell.cell);
            }
            else if (selection.length && e.shiftKey) {
                var last = selection.pop();
                var from = Math.min(cell.row, last);
                var to = Math.max(cell.row, last);
                selection = [];
                for (var i = from; i <= to; i++) {
                    if (i !== last) {
                        selection.push(i);
                    }
                }
                selection.push(last);
                _grid.setActiveCell(cell.row, cell.cell);
            }
            var tempRanges = rowsToRanges(selection);
            setSelectedRanges(tempRanges);
            e.stopImmediatePropagation();
            return true;
        }
        $.extend(this, {
            "getSelectedRows": getSelectedRows,
            "setSelectedRows": setSelectedRows,
            "getSelectedRanges": getSelectedRanges,
            "setSelectedRanges": setSelectedRanges,
            "init": init,
            "destroy": destroy,
            "pluginName": "RowSelectionModel",
            "onSelectedRangesChanged": new Slick.Event()
        });
    }
    module.exports = {
        "RowSelectionModel": RowSelectionModel
    };
},
693: /* @bokeh/slickgrid/slick.jquery.js */ function _(require, module, exports, __esModule, __esExport) {
    module.exports = typeof $ !== "undefined" ? $ : require(694) /* jquery */;
},
694: /* jquery/dist/jquery.js */ function _(require, module, exports, __esModule, __esExport) {
    /*!
     * jQuery JavaScript Library v3.7.1
     * https://jquery.com/
     *
     * Copyright OpenJS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2023-08-28T13:37Z
     */
    (function (global, factory) {
        "use strict";
        if (typeof module === "object" && typeof module.exports === "object") {
            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket trac-14549 for more info.
            module.exports = global.document ?
                factory(global, true) :
                function (w) {
                    if (!w.document) {
                        throw new Error("jQuery requires a window with a document");
                    }
                    return factory(w);
                };
        }
        else {
            factory(global);
        }
        // Pass this if window is not defined yet
    })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
        // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
        // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
        // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
        // enough that all such attempts are guarded in a try block.
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function (array) {
            return arr.flat.call(array);
        } : function (array) {
            return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction(obj) {
            // Support: Chrome <=57, Firefox <=52
            // In some browsers, typeof returns "function" for HTML <object> elements
            // (i.e., `typeof document.createElement( "object" ) === "function"`).
            // We don't want to classify *any* DOM node as a function.
            // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
            // Plus for old WebKit, typeof returns "function" for HTML collections
            // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
            return typeof obj === "function" && typeof obj.nodeType !== "number" &&
                typeof obj.item !== "function";
        };
        var isWindow = function isWindow(obj) {
            return obj != null && obj === obj.window;
        };
        var document = window.document;
        var preservedScriptAttributes = {
            type: true,
            src: true,
            nonce: true,
            noModule: true
        };
        function DOMEval(code, node, doc) {
            doc = doc || document;
            var i, val, script = doc.createElement("script");
            script.text = code;
            if (node) {
                for (i in preservedScriptAttributes) {
                    // Support: Firefox 64+, Edge 18+
                    // Some browsers don't support the "nonce" property on scripts.
                    // On the other hand, just using `getAttribute` is not enough as
                    // the `nonce` attribute is reset to an empty string whenever it
                    // becomes browsing-context connected.
                    // See https://github.com/whatwg/html/issues/2369
                    // See https://html.spec.whatwg.org/#nonce-attributes
                    // The `node.getAttribute` check was added for the sake of
                    // `jQuery.globalEval` so that it can fake a nonce-containing node
                    // via an object.
                    val = node[i] || node.getAttribute && node.getAttribute(i);
                    if (val) {
                        script.setAttribute(i, val);
                    }
                }
            }
            doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj) {
            if (obj == null) {
                return obj + "";
            }
            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        }
        /* global Symbol */
        // Defining this global in .eslintrc.json would create a danger of using the global
        // unguarded in another place, it seems safer to define global only for this module
        var version = "3.7.1", rhtmlSuffix = /HTML$/i, 
        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        };
        jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: version,
            constructor: jQuery,
            // The default length of a jQuery object is 0
            length: 0,
            toArray: function () {
                return slice.call(this);
            },
            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function (num) {
                // Return all the elements in a clean array
                if (num == null) {
                    return slice.call(this);
                }
                // Return just the one element from the set
                return num < 0 ? this[num + this.length] : this[num];
            },
            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function (elems) {
                // Build a new jQuery matched element set
                var ret = jQuery.merge(this.constructor(), elems);
                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                // Return the newly-formed element set
                return ret;
            },
            // Execute a callback for every element in the matched set.
            each: function (callback) {
                return jQuery.each(this, callback);
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            even: function () {
                return this.pushStack(jQuery.grep(this, function (_elem, i) {
                    return (i + 1) % 2;
                }));
            },
            odd: function () {
                return this.pushStack(jQuery.grep(this, function (_elem, i) {
                    return i % 2;
                }));
            },
            eq: function (i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                // Skip the boolean and the target
                target = arguments[i] || {};
                i++;
            }
            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !isFunction(target)) {
                target = {};
            }
            // Extend jQuery itself if only one argument is passed
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        copy = options[name];
                        // Prevent Object.prototype pollution
                        // Prevent never-ending loop
                        if (name === "__proto__" || target === copy) {
                            continue;
                        }
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (jQuery.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {
                            src = target[name];
                            // Ensure proper type for the source value
                            if (copyIsArray && !Array.isArray(src)) {
                                clone = [];
                            }
                            else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                                clone = {};
                            }
                            else {
                                clone = src;
                            }
                            copyIsArray = false;
                            // Never move original objects, clone them
                            target[name] = jQuery.extend(deep, clone, copy);
                            // Don't bring in undefined values
                        }
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // Return the modified object
            return target;
        };
        jQuery.extend({
            // Unique for each copy of jQuery on the page
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            // Assume jQuery is ready without the ready module
            isReady: true,
            error: function (msg) {
                throw new Error(msg);
            },
            noop: function () { },
            isPlainObject: function (obj) {
                var proto, Ctor;
                // Detect obvious negatives
                // Use toString instead of jQuery.type to catch host objects
                if (!obj || toString.call(obj) !== "[object Object]") {
                    return false;
                }
                proto = getProto(obj);
                // Objects with no prototype (e.g., `Object.create( null )`) are plain
                if (!proto) {
                    return true;
                }
                // Objects with prototype are plain iff they were constructed by a global Object function
                Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
            },
            isEmptyObject: function (obj) {
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },
            // Evaluates a script in a provided context; falls back to the global one
            // if not specified.
            globalEval: function (code, options, doc) {
                DOMEval(code, { nonce: options && options.nonce }, doc);
            },
            each: function (obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj)) {
                    length = obj.length;
                    for (; i < length; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                return obj;
            },
            // Retrieve the text value of an array of DOM nodes
            text: function (elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += jQuery.text(node);
                    }
                }
                if (nodeType === 1 || nodeType === 11) {
                    return elem.textContent;
                }
                if (nodeType === 9) {
                    return elem.documentElement.textContent;
                }
                if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
                return ret;
            },
            // results is for internal usage only
            makeArray: function (arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArrayLike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ?
                            [arr] : arr);
                    }
                    else {
                        push.call(ret, arr);
                    }
                }
                return ret;
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : indexOf.call(arr, elem, i);
            },
            isXMLDoc: function (elem) {
                var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
                // Assume HTML when documentElement doesn't yet exist, such as inside
                // document fragments.
                return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
            },
            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge: function (first, second) {
                var len = +second.length, j = 0, i = first.length;
                for (; j < len; j++) {
                    first[i++] = second[j];
                }
                first.length = i;
                return first;
            },
            grep: function (elems, callback, invert) {
                var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i]);
                    }
                }
                return matches;
            },
            // arg is for internal usage only
            map: function (elems, callback, arg) {
                var length, value, i = 0, ret = [];
                // Go through the array, translating each of the items to their new values
                if (isArrayLike(elems)) {
                    length = elems.length;
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                    // Go through every key on the object,
                }
                else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                }
                // Flatten any nested arrays
                return flat(ret);
            },
            // A global GUID counter for objects
            guid: 1,
            // jQuery.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: support
        });
        if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        // Populate the class2type map
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        function isArrayLike(obj) {
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && "length" in obj && obj.length, type = toType(obj);
            if (isFunction(obj) || isWindow(obj)) {
                return false;
            }
            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
        }
        function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var pop = arr.pop;
        var sort = arr.sort;
        var splice = arr.splice;
        var whitespace = "[\\x20\\t\\r\\n\\f]";
        var rtrimCSS = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
        // Note: an element does not contain itself
        jQuery.contains = function (a, b) {
            var bup = b && b.parentNode;
            return a === bup || !!(bup && bup.nodeType === 1 && (
            // Support: IE 9 - 11+
            // IE doesn't have `contains` on SVG.
            a.contains ?
                a.contains(bup) :
                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
        };
        // CSS string/identifier serialization
        // https://drafts.csswg.org/cssom/#common-serializing-idioms
        var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
        function fcssescape(ch, asCodePoint) {
            if (asCodePoint) {
                // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                if (ch === "\0") {
                    return "\uFFFD";
                }
                // Control characters and (dependent upon position) numbers get escaped as code points
                return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            // Other potentially-special ASCII characters get backslash-escaped
            return "\\" + ch;
        }
        jQuery.escapeSelector = function (sel) {
            return (sel + "").replace(rcssescape, fcssescape);
        };
        var preferredDoc = document, pushNative = push;
        (function () {
            var i, Expr, outermostContext, sortInput, hasDuplicate, push = pushNative, 
            // Local document vars
            document, documentElement, documentIsHTML, rbuggyQSA, matches, 
            // Instance-specific data
            expando = jQuery.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
                "loop|multiple|open|readonly|required|scoped", 
            // Regular expressions
            // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
            identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", 
            // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
            attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
                whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)", 
            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" +
                whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                ID: new RegExp("^#(" + identifier + ")"),
                CLASS: new RegExp("^\\.(" + identifier + ")"),
                TAG: new RegExp("^(" + identifier + "|[*])"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
                    whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                needsContext: new RegExp("^" + whitespace +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
                    "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, 
            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, 
            // CSS escapes
            // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace +
                "?|\\\\([^\\r\\n\\f])", "g"), funescape = function (escape, nonHex) {
                var high = "0x" + escape.slice(1) - 0x10000;
                if (nonHex) {
                    // Strip the backslash prefix from a non-hex escape sequence
                    return nonHex;
                }
                // Replace a hexadecimal escape sequence with the encoded Unicode code point
                // Support: IE <=11+
                // For values outside the Basic Multilingual Plane (BMP), manually construct a
                // surrogate pair
                return high < 0 ?
                    String.fromCharCode(high + 0x10000) :
                    String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            }, 
            // Used for iframes; see `setDocument`.
            // Support: IE 9 - 11+, Edge 12 - 18+
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE/Edge.
            unloadHandler = function () {
                setDocument();
            }, inDisabledFieldset = addCombinator(function (elem) {
                return elem.disabled === true && nodeName(elem, "fieldset");
            }, { dir: "parentNode", next: "legend" });
            // Support: IE <=9 only
            // Accessing document.activeElement can throw unexpectedly
            // https://bugs.jquery.com/ticket/13393
            function safeActiveElement() {
                try {
                    return document.activeElement;
                }
                catch (err) { }
            }
            // Optimize for push.apply( _, NodeList )
            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                // Support: Android <=4.0
                // Detect silently failing push.apply
                // eslint-disable-next-line no-unused-expressions
                arr[preferredDoc.childNodes.length].nodeType;
            }
            catch (e) {
                push = {
                    apply: function (target, els) {
                        pushNative.apply(target, slice.call(els));
                    },
                    call: function (target) {
                        pushNative.apply(target, slice.call(arguments, 1));
                    }
                };
            }
            function find(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, 
                // nodeType defaults to 9, since context defaults to document
                nodeType = context ? context.nodeType : 9;
                results = results || [];
                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results;
                }
                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                    setDocument(context);
                    context = context || document;
                    if (documentIsHTML) {
                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                            // ID selector
                            if ((m = match[1])) {
                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {
                                        // Support: IE 9 only
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            push.call(results, elem);
                                            return results;
                                        }
                                    }
                                    else {
                                        return results;
                                    }
                                    // Element context
                                }
                                else {
                                    // Support: IE 9 only
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        find.contains(context, elem) &&
                                        elem.id === m) {
                                        push.call(results, elem);
                                        return results;
                                    }
                                }
                                // Type selector
                            }
                            else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                                // Class selector
                            }
                            else if ((m = match[3]) && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }
                        // Take advantage of querySelectorAll
                        if (!nonnativeSelectorCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            newSelector = selector;
                            newContext = context;
                            // qSA considers elements outside a scoping root when evaluating child or
                            // descendant combinators, which is not what we want.
                            // In such cases, we work around the behavior by prefixing every selector in the
                            // list with an ID selector referencing the scope context.
                            // The technique has to be used as well when a leading combinator is used
                            // as such selectors are not recognized by querySelectorAll.
                            // Thanks to Andrew Dupont for this technique.
                            if (nodeType === 1 &&
                                (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                                // We can use :scope instead of the ID hack if the browser
                                // supports it & if we're not changing the context.
                                // Support: IE 11+, Edge 17 - 18+
                                // IE/Edge sometimes throw a "Permission denied" error when
                                // strict-comparing two documents; shallow comparisons work.
                                // eslint-disable-next-line eqeqeq
                                if (newContext != context || !support.scope) {
                                    // Capture the context ID, setting it first if necessary
                                    if ((nid = context.getAttribute("id"))) {
                                        nid = jQuery.escapeSelector(nid);
                                    }
                                    else {
                                        context.setAttribute("id", (nid = expando));
                                    }
                                }
                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = (nid ? "#" + nid : ":scope") + " " +
                                        toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");
                            }
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results;
                            }
                            catch (qsaError) {
                                nonnativeSelectorCache(selector, true);
                            }
                            finally {
                                if (nid === expando) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }
                // All others
                return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
            }
            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];
                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties
                    // (see https://github.com/jquery/sizzle/issues/157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }
            /**
             * Mark a function for special use by jQuery selector module
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }
            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");
                try {
                    return !!fn(el);
                }
                catch (e) {
                    return false;
                }
                finally {
                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    // release memory in IE
                    el = null;
                }
            }
            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    return nodeName(elem, "input") && elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    return (nodeName(elem, "input") || nodeName(elem, "button")) &&
                        elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {
                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {
                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {
                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {
                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                }
                                else {
                                    return elem.disabled === disabled;
                                }
                            }
                            // Support: IE 6 - 11+
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||
                                // Where there is no isDisabled, check manually
                                elem.isDisabled !== !disabled &&
                                    inDisabledFieldset(elem) === disabled;
                        }
                        return elem.disabled === disabled;
                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    }
                    else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }
                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }
            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }
            /**
             * Checks a node for validity as a jQuery selector context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }
            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [node] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            function setDocument(node) {
                var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                // Return early if doc is invalid or already selected
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }
                // Update global variables
                document = doc;
                documentElement = document.documentElement;
                documentIsHTML = !jQuery.isXMLDoc(document);
                // Support: iOS 7 only, IE 9 - 11+
                // Older browsers didn't support unprefixed `matches`.
                matches = documentElement.matches ||
                    documentElement.webkitMatchesSelector ||
                    documentElement.msMatchesSelector;
                // Support: IE 9 - 11+, Edge 12 - 18+
                // Accessing iframe documents after unload throws "permission denied" errors
                // (see trac-13936).
                // Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
                // all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
                if (documentElement.msMatchesSelector &&
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    preferredDoc != document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                    // Support: IE 9 - 11+, Edge 12 - 18+
                    subWindow.addEventListener("unload", unloadHandler);
                }
                // Support: IE <10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    documentElement.appendChild(el).id = jQuery.expando;
                    return !document.getElementsByName ||
                        !document.getElementsByName(jQuery.expando).length;
                });
                // Support: IE 9 only
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node.
                support.disconnectedMatch = assert(function (el) {
                    return matches.call(el, "*");
                });
                // Support: IE 9 - 11+, Edge 12 - 18+
                // IE/Edge don't support the :scope pseudo-class.
                support.scope = assert(function () {
                    return document.querySelectorAll(":scope");
                });
                // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
                // Make sure the `:has()` argument is parsed unforgivingly.
                // We include `*` in the test to detect buggy implementations that are
                // _selectively_ forgiving (specifically when the list includes at least
                // one valid selector).
                // Note that we treat complete lack of support for `:has()` as if it were
                // spec-compliant support, which is fine because use of `:has()` in such
                // environments will fail in the qSA path and fall back to jQuery traversal
                // anyway.
                support.cssHas = assert(function () {
                    try {
                        document.querySelector(":has(*,:jqfake)");
                        return false;
                    }
                    catch (e) {
                        return true;
                    }
                });
                // ID filter and find
                if (support.getById) {
                    Expr.filter.ID = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find.ID = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                }
                else {
                    Expr.filter.ID = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find.ID = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems, elem = context.getElementById(id);
                            if (elem) {
                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }
                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }
                            return [];
                        }
                    };
                }
                // Tag
                Expr.find.TAG = function (tag, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(tag);
                        // DocumentFragment nodes don't have gEBTN
                    }
                    else {
                        return context.querySelectorAll(tag);
                    }
                };
                // Class
                Expr.find.CLASS = function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };
                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */
                // QSA and matchesSelector support
                rbuggyQSA = [];
                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function (el) {
                    var input;
                    documentElement.appendChild(el).innerHTML =
                        "<a id='" + expando + "' href='' disabled='disabled'></a>" +
                            "<select id='" + expando + "-\r\\' disabled='disabled'>" +
                            "<option selected=''></option></select>";
                    // Support: iOS <=7 - 8 only
                    // Boolean attributes and "value" are not treated correctly in some XML documents
                    if (!el.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    // Support: iOS <=7 - 8 only
                    if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    // Support: iOS 8 only
                    // https://bugs.webkit.org/show_bug.cgi?id=136851
                    // In-page `selector#id sibling-combinator selector` fails
                    if (!el.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                    // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
                    // In some of the document kinds, these selectors wouldn't work natively.
                    // This is probably OK but for backwards compatibility we want to maintain
                    // handling them through jQuery traversal in jQuery 3.x.
                    if (!el.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    el.appendChild(input).setAttribute("name", "D");
                    // Support: IE 9 - 11+
                    // IE's :disabled selector does not pick up the children of disabled fieldsets
                    // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
                    // In some of the document kinds, these selectors wouldn't work natively.
                    // This is probably OK but for backwards compatibility we want to maintain
                    // handling them through jQuery traversal in jQuery 3.x.
                    documentElement.appendChild(el).disabled = true;
                    if (el.querySelectorAll(":disabled").length !== 2) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    // Support: IE 11+, Edge 15 - 18+
                    // IE 11/Edge don't find elements on a `[name='']` query in some cases.
                    // Adding a temporary attribute to the document before the selection works
                    // around the issue.
                    // Interestingly, IE 10 & older don't seem to have the issue.
                    input = document.createElement("input");
                    input.setAttribute("name", "");
                    el.appendChild(input);
                    if (!el.querySelectorAll("[name='']").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" +
                            whitespace + "*(?:''|\"\")");
                    }
                });
                if (!support.cssHas) {
                    // Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
                    // Our regular `try-catch` mechanism fails to detect natively-unsupported
                    // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
                    // in browsers that parse the `:has()` argument as a forgiving selector list.
                    // https://drafts.csswg.org/selectors/#relational now requires the argument
                    // to be parsed unforgivingly, but browsers have not yet fully adjusted.
                    rbuggyQSA.push(":has");
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                /* Sorting
                ---------------------------------------------------------------------- */
                // Document order sorting
                sortOrder = function (a, b) {
                    // Flag for duplicate removal
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    // Sort on method existence if only one input has compareDocumentPosition
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if (compare) {
                        return compare;
                    }
                    // Calculate position if both inputs belong to the same document
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    compare = (a.ownerDocument || a) == (b.ownerDocument || b) ?
                        a.compareDocumentPosition(b) :
                        // Otherwise we know they are disconnected
                        1;
                    // Disconnected nodes
                    if (compare & 1 ||
                        (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                        // Choose the first element that is related to our preferred document
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        if (a === document || a.ownerDocument == preferredDoc &&
                            find.contains(preferredDoc, a)) {
                            return -1;
                        }
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        if (b === document || b.ownerDocument == preferredDoc &&
                            find.contains(preferredDoc, b)) {
                            return 1;
                        }
                        // Maintain original order
                        return sortInput ?
                            (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                            0;
                    }
                    return compare & 4 ? -1 : 1;
                };
                return document;
            }
            find.matches = function (expr, elements) {
                return find(expr, null, null, elements);
            };
            find.matchesSelector = function (elem, expr) {
                setDocument(elem);
                if (documentIsHTML &&
                    !nonnativeSelectorCache[expr + " "] &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    }
                    catch (e) {
                        nonnativeSelectorCache(expr, true);
                    }
                }
                return find(expr, document, null, [elem]).length > 0;
            };
            find.contains = function (context, elem) {
                // Set document vars if needed
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ((context.ownerDocument || context) != document) {
                    setDocument(context);
                }
                return jQuery.contains(context, elem);
            };
            find.attr = function (elem, name) {
                // Set document vars if needed
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ((elem.ownerDocument || elem) != document) {
                    setDocument(elem);
                }
                var fn = Expr.attrHandle[name.toLowerCase()], 
                // Don't get fooled by Object.prototype properties (see trac-13807)
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;
                if (val !== undefined) {
                    return val;
                }
                return elem.getAttribute(name);
            };
            find.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };
            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            jQuery.uniqueSort = function (results) {
                var elem, duplicates = [], j = 0, i = 0;
                // Unless we *know* we can detect duplicates, assume their presence
                //
                // Support: Android <=4.0+
                // Testing for detecting duplicates is unpredictable so instead assume we can't
                // depend on duplicate detection in all browsers without a stable sort.
                hasDuplicate = !support.sortStable;
                sortInput = !support.sortStable && slice.call(results, 0);
                sort.call(results, sortOrder);
                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        splice.call(results, duplicates[j], 1);
                    }
                }
                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;
                return results;
            };
            jQuery.fn.uniqueSort = function () {
                return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
            };
            Expr = jQuery.expr = {
                // Can be adjusted by the user
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },
                preFilter: {
                    ATTR: function (match) {
                        match[1] = match[1].replace(runescape, funescape);
                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "")
                            .replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }
                        return match.slice(0, 4);
                    },
                    CHILD: function (match) {
                        /* matches from matchExpr["CHILD"]
                            1 type (only|nth|...)
                            2 what (child|of-type)
                            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                            4 xn-component of xn+y argument ([+-]?\d*n|)
                            5 sign of xn-component
                            6 x of xn-component
                            7 sign of y-component
                            8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                find.error(match[0]);
                            }
                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ?
                                match[5] + (match[6] || 1) :
                                2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");
                            // other types prohibit arguments
                        }
                        else if (match[3]) {
                            find.error(match[0]);
                        }
                        return match;
                    },
                    PSEUDO: function (match) {
                        var excess, unquoted = !match[6] && match[2];
                        if (matchExpr.CHILD.test(match[0])) {
                            return null;
                        }
                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";
                            // Strip excess characters from unquoted arguments
                        }
                        else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }
                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },
                filter: {
                    TAG: function (nodeNameSelector) {
                        var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } :
                            function (elem) {
                                return nodeName(elem, expectedNodeName);
                            };
                    },
                    CLASS: function (className) {
                        var pattern = classCache[className + " "];
                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className +
                                "(" + whitespace + "|$)")) &&
                                classCache(className, function (elem) {
                                    return pattern.test(typeof elem.className === "string" && elem.className ||
                                        typeof elem.getAttribute !== "undefined" &&
                                            elem.getAttribute("class") ||
                                        "");
                                });
                    },
                    ATTR: function (name, operator, check) {
                        return function (elem) {
                            var result = find.attr(elem, name);
                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }
                            result += "";
                            if (operator === "=") {
                                return result === check;
                            }
                            if (operator === "!=") {
                                return result !== check;
                            }
                            if (operator === "^=") {
                                return check && result.indexOf(check) === 0;
                            }
                            if (operator === "*=") {
                                return check && result.indexOf(check) > -1;
                            }
                            if (operator === "$=") {
                                return check && result.slice(-check.length) === check;
                            }
                            if (operator === "~=") {
                                return (" " + result.replace(rwhitespace, " ") + " ")
                                    .indexOf(check) > -1;
                            }
                            if (operator === "|=") {
                                return result === check || result.slice(0, check.length + 1) === check + "-";
                            }
                            return false;
                        };
                    },
                    CHILD: function (type, what, _argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                        return first === 1 && last === 0 ?
                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :
                            function (elem, _context, xml) {
                                var cache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                                if (parent) {
                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    nodeName(node, name) :
                                                    node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }
                                    start = [forward ? parent.firstChild : parent.lastChild];
                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[expando] || (parent[expando] = {});
                                        cache = outerCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {
                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            outerCache = elem[expando] || (elem[expando] = {});
                                            cache = outerCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }
                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {
                                                if ((ofType ?
                                                    nodeName(node, name) :
                                                    node.nodeType === 1) &&
                                                    ++diff) {
                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] ||
                                                            (node[expando] = {});
                                                        outerCache[type] = [dirruns, diff];
                                                    }
                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },
                    PSEUDO: function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // https://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            find.error("unsupported pseudo: " + pseudo);
                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as jQuery does
                        if (fn[expando]) {
                            return fn(argument);
                        }
                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx, matched = fn(seed, argument), i = matched.length;
                                    while (i--) {
                                        idx = indexOf.call(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }
                        return fn;
                    }
                },
                pseudos: {
                    // Potentially complex pseudos
                    not: markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
                        return matcher[expando] ?
                            markFunction(function (seed, matches, _context, xml) {
                                var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, _context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element
                                // (see https://github.com/jquery/sizzle/issues/299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),
                    has: markFunction(function (selector) {
                        return function (elem) {
                            return find(selector, elem).length > 0;
                        };
                    }),
                    contains: markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
                        };
                    }),
                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // https://www.w3.org/TR/selectors/#lang-pseudo
                    lang: markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            find.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),
                    // Miscellaneous
                    target: function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    root: function (elem) {
                        return elem === documentElement;
                    },
                    focus: function (elem) {
                        return elem === safeActiveElement() &&
                            document.hasFocus() &&
                            !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    // Boolean properties
                    enabled: createDisabledPseudo(false),
                    disabled: createDisabledPseudo(true),
                    checked: function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        return (nodeName(elem, "input") && !!elem.checked) ||
                            (nodeName(elem, "option") && !!elem.selected);
                    },
                    selected: function (elem) {
                        // Support: IE <=11+
                        // Accessing the selectedIndex property
                        // forces the browser to treat the default option as
                        // selected when in an optgroup.
                        if (elem.parentNode) {
                            // eslint-disable-next-line no-unused-expressions
                            elem.parentNode.selectedIndex;
                        }
                        return elem.selected === true;
                    },
                    // Contents
                    empty: function (elem) {
                        // https://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },
                    parent: function (elem) {
                        return !Expr.pseudos.empty(elem);
                    },
                    // Element/input types
                    header: function (elem) {
                        return rheader.test(elem.nodeName);
                    },
                    input: function (elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    button: function (elem) {
                        return nodeName(elem, "input") && elem.type === "button" ||
                            nodeName(elem, "button");
                    },
                    text: function (elem) {
                        var attr;
                        return nodeName(elem, "input") && elem.type === "text" &&
                            // Support: IE <10 only
                            // New HTML5 attribute values (e.g., "search") appear
                            // with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null ||
                                attr.toLowerCase() === "text");
                    },
                    // Position-in-collection
                    first: createPositionalPseudo(function () {
                        return [0];
                    }),
                    last: createPositionalPseudo(function (_matchIndexes, length) {
                        return [length - 1];
                    }),
                    eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),
                    even: createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    odd: createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    lt: createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i;
                        if (argument < 0) {
                            i = argument + length;
                        }
                        else if (argument > length) {
                            i = length;
                        }
                        else {
                            i = argument;
                        }
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    gt: createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };
            Expr.pseudos.nth = Expr.pseudos.eq;
            // Add button/input type pseudos
            for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }
            // Easy API for creating new setFilters
            function setFilters() { }
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            function tokenize(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }
                    matched = false;
                    // Combinators
                    if ((match = rleadingCombinator.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrimCSS, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }
                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }
                    if (!matched) {
                        break;
                    }
                }
                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                if (parseOnly) {
                    return soFar.length;
                }
                return soFar ?
                    find.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
            }
            function toSelector(tokens) {
                var i = 0, len = tokens.length, selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === "parentNode", doneName = done++;
                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :
                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, outerCache, newCache = [dirruns, doneName];
                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    if (skip && nodeName(elem, skip)) {
                                        elem = elem[dir] || elem;
                                    }
                                    else if ((oldCache = outerCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {
                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    }
                                    else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[key] = newCache;
                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }
            function multipleContexts(selector, contexts, results) {
                var i = 0, len = contexts.length;
                for (; i < len; i++) {
                    find(selector, contexts[i], results);
                }
                return results;
            }
            function condense(unmatched, map, filter, context, xml) {
                var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }
                return newUnmatched;
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, 
                    // Get initial elements from seed or context
                    elems = seed ||
                        multipleContexts(selector || "*", context.nodeType ? [context] : context, []), 
                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems;
                    if (matcher) {
                        // If we have a postFinder, or filtered seed, or non-seed postFilter
                        // or preexisting results,
                        matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ?
                            // ...intermediate processing is necessary
                            [] :
                            // ...otherwise use results directly
                            results;
                        // Find primary matches
                        matcher(matcherIn, matcherOut, context, xml);
                    }
                    else {
                        matcherOut = matcherIn;
                    }
                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }
                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }
                        // Add elements to results, through postFinder if defined
                    }
                    else {
                        matcherOut = condense(matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        }
                        else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }
            function matcherFromTokens(tokens) {
                var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, 
                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true), matchers = [function (elem, context, xml) {
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        var ret = (!leadingRelative && (xml || context != outermostContext)) || ((checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                        // Avoid hanging onto element
                        // (see https://github.com/jquery/sizzle/issues/299)
                        checkContext = null;
                        return ret;
                    }];
                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    }
                    else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens.slice(0, i - 1)
                                .concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrimCSS, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                        }
                        matchers.push(matcher);
                    }
                }
                return elementMatcher(matchers);
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, 
                    // We must always have either seed elements or outermost context
                    elems = seed || byElement && Expr.find.TAG("*", outermost), 
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1), len = elems.length;
                    if (outermost) {
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        outermostContext = context == document || context || outermost;
                    }
                    // Add elements passing elementMatchers directly to results
                    // Support: iOS <=7 - 9 only
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
                    // elements by id. (see trac-14142)
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            // eslint-disable-next-line eqeqeq
                            if (!context && elem.ownerDocument != document) {
                                setDocument(elem);
                                xml = !documentIsHTML;
                            }
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context || document, xml)) {
                                    push.call(results, elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        // Track unmatched elements for set filters
                        if (bySet) {
                            // They will have gone through all possible matchers
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            // Lengthen the array for every element, matched or not
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    // `i` is now the count of elements visited above, and adding it to `matchedCount`
                    // makes the latter nonnegative.
                    matchedCount += i;
                    // Apply set filters to unmatched elements
                    // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                    // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                    // no element matchers and no seed.
                    // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                    // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                    // numerically zero.
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            // Discard index placeholder values to get only actual matches
                            setMatched = condense(setMatched);
                        }
                        // Add matches to results
                        push.apply(results, setMatched);
                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if (outermost && !seed && setMatched.length > 0 &&
                            (matchedCount + setMatchers.length) > 1) {
                            jQuery.uniqueSort(results);
                        }
                    }
                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }
            function compile(selector, match /* Internal Use Only */) {
                var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        }
                        else {
                            elementMatchers.push(cached);
                        }
                    }
                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            }
            /**
             * A low-level selection function that works with jQuery's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with jQuery selector compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            function select(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize((selector = compiled.selector || selector));
                results = results || [];
                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {
                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                            // Precompiled matchers will still verify ancestry, so step up a level
                        }
                        else if (compiled) {
                            context = context.parentNode;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    // Fetch a seed set for right-to-left matching
                    i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) &&
                                testContext(context.parentNode) || context))) {
                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                return results;
            }
            // One-time assignments
            // Support: Android <=4.0 - 4.1+
            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            // Initialize against the default document
            setDocument();
            // Support: Android <=4.0 - 4.1+
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });
            jQuery.find = find;
            // Deprecated
            jQuery.expr[":"] = jQuery.expr.pseudos;
            jQuery.unique = jQuery.uniqueSort;
            // These have always been private, but they used to be documented as part of
            // Sizzle so let's maintain them for now for backwards compatibility purposes.
            find.compile = compile;
            find.select = select;
            find.setDocument = setDocument;
            find.tokenize = tokenize;
            find.escape = jQuery.escapeSelector;
            find.getText = jQuery.text;
            find.isXML = jQuery.isXMLDoc;
            find.selectors = jQuery.expr;
            find.support = jQuery.support;
            find.uniqueSort = jQuery.uniqueSort;
            /* eslint-enable */
        })();
        var dir = function (elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        };
        var siblings = function (n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
        // Implement the identical functionality for filter and not
        function winnow(elements, qualifier, not) {
            if (isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not;
                });
            }
            // Single element
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return (elem === qualifier) !== not;
                });
            }
            // Arraylike of elements (jQuery, arguments, Array)
            if (typeof qualifier !== "string") {
                return jQuery.grep(elements, function (elem) {
                    return (indexOf.call(qualifier, elem) > -1) !== not;
                });
            }
            // Filtered directly for both simple and complex selectors
            return jQuery.filter(qualifier, elements, not);
        }
        jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")";
            }
            if (elems.length === 1 && elem.nodeType === 1) {
                return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
            }
            return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
        };
        jQuery.fn.extend({
            find: function (selector) {
                var i, ret, len = this.length, self = this;
                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    }));
                }
                ret = this.pushStack([]);
                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret);
                }
                return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function (selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },
            not: function (selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },
            is: function (selector) {
                return !!winnow(this, 
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                    selector || [], false).length;
            }
        });
        // Initialize a jQuery object
        // A central reference to the root jQuery(document)
        var rootjQuery, 
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
        // Strict HTML recognition (trac-11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;
            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }
            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;
            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];
                }
                else {
                    match = rquickExpr.exec(selector);
                }
                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (isFunction(this[match])) {
                                    this[match](context[match]);
                                    // ...and otherwise set as attributes
                                }
                                else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                        // HANDLE: $(#id)
                    }
                    else {
                        elem = document.getElementById(match[2]);
                        if (elem) {
                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }
                    // HANDLE: $(expr, $(...))
                }
                else if (!context || context.jquery) {
                    return (context || root).find(selector);
                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                }
                else {
                    return this.constructor(context).find(selector);
                }
                // HANDLE: $(DOMElement)
            }
            else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
                // HANDLE: $(function)
                // Shortcut for document ready
            }
            else if (isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }
            return jQuery.makeArray(selector, this);
        };
        // Give the init function the jQuery prototype for later instantiation
        init.prototype = jQuery.fn;
        // Initialize central reference
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, 
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        jQuery.fn.extend({
            has: function (target) {
                var targets = jQuery(target, this), l = targets.length;
                return this.filter(function () {
                    var i = 0;
                    for (; i < l; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return true;
                        }
                    }
                });
            },
            closest: function (selectors, context) {
                var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
                // Positional selectors never match, since there's no _selection_ context
                if (!rneedsContext.test(selectors)) {
                    for (; i < l; i++) {
                        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                            // Always skip document fragments
                            if (cur.nodeType < 11 && (targets ?
                                targets.index(cur) > -1 :
                                // Don't pass non-elements to jQuery#find
                                cur.nodeType === 1 &&
                                    jQuery.find.matchesSelector(cur, selectors))) {
                                matched.push(cur);
                                break;
                            }
                        }
                    }
                }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
            },
            // Determine the position of an element within the set
            index: function (elem) {
                // No argument, return index in parent
                if (!elem) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
                }
                // Index in selector
                if (typeof elem === "string") {
                    return indexOf.call(jQuery(elem), this[0]);
                }
                // Locate the position of the desired element
                return indexOf.call(this, 
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem);
            },
            add: function (selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function (selector) {
                return this.add(selector == null ?
                    this.prevObject : this.prevObject.filter(selector));
            }
        });
        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) { }
            return cur;
        }
        jQuery.each({
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function (elem, _i, until) {
                return dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return dir(elem, "previousSibling");
            },
            nextUntil: function (elem, _i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, _i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return siblings(elem.firstChild);
            },
            contents: function (elem) {
                if (elem.contentDocument != null &&
                    // Support: IE 11+
                    // <object> elements with no `data` attribute has an object
                    // `contentDocument` with a `null` prototype.
                    getProto(elem.contentDocument)) {
                    return elem.contentDocument;
                }
                // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, "template")) {
                    elem = elem.content || elem;
                }
                return jQuery.merge([], elem.childNodes);
            }
        }, function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var matched = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    matched = jQuery.filter(selector, matched);
                }
                if (this.length > 1) {
                    // Remove duplicates
                    if (!guaranteedUnique[name]) {
                        jQuery.uniqueSort(matched);
                    }
                    // Reverse order for parents* and prev-derivatives
                    if (rparentsprev.test(name)) {
                        matched.reverse();
                    }
                }
                return this.pushStack(matched);
            };
        });
        var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
        // Convert String-formatted options into Object-formatted ones
        function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
                object[flag] = true;
            });
            return object;
        }
        /*
         * Create a callback list using the following parameters:
         *
         *	options: an optional list of space-separated options that will change how
         *			the callback list behaves or a more traditional option object
         *
         * By default a callback list will act like an event callback list and can be
         * "fired" multiple times.
         *
         * Possible options:
         *
         *	once:			will ensure the callback list can only be fired once (like a Deferred)
         *
         *	memory:			will keep track of previous values and will call any callback added
         *					after the list has been fired right away with the latest "memorized"
         *					values (like a Deferred)
         *
         *	unique:			will ensure a callback can only be added once (no duplicate in the list)
         *
         *	stopOnFalse:	interrupt callings when a callback returns false
         *
         */
        jQuery.Callbacks = function (options) {
            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options = typeof options === "string" ?
                createOptions(options) :
                jQuery.extend({}, options);
            var // Flag to know if list is currently firing
            firing, 
            // Last fire value for non-forgettable lists
            memory, 
            // Flag to know if list was already fired
            fired, 
            // Flag to prevent firing
            locked, 
            // Actual callback list
            list = [], 
            // Queue of execution data for repeatable lists
            queue = [], 
            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1, 
            // Fire callbacks
            fire = function () {
                // Enforce single-firing
                locked = locked || options.once;
                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {
                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }
                firing = false;
                // Clean up if we're done firing for good
                if (locked) {
                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];
                        // Otherwise, this object is spent
                    }
                    else {
                        list = "";
                    }
                }
            }, 
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                }
                                else if (arg && arg.length && toType(arg) !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },
                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },
                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };
            return self;
        };
        function Identity(v) {
            return v;
        }
        function Thrower(ex) {
            throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
            var method;
            try {
                // Check for promise aspect first to privilege synchronous behavior
                if (value && isFunction((method = value.promise))) {
                    method.call(value).done(resolve).fail(reject);
                    // Other thenables
                }
                else if (value && isFunction((method = value.then))) {
                    method.call(value, resolve, reject);
                    // Other non-thenables
                }
                else {
                    // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                    // * false: [ value ].slice( 0 ) => resolve( value )
                    // * true: [ value ].slice( 1 ) => resolve()
                    resolve.apply(undefined, [value].slice(noValue));
                }
                // For Promises/A+, convert exceptions into rejections
                // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
                // Deferred#then to conditionally suppress rejection.
            }
            catch (value) {
                // Support: Android 4.0 only
                // Strict mode functions invoked without .call/.apply get global-object context
                reject.apply(undefined, [value]);
            }
        }
        jQuery.extend({
            Deferred: function (func) {
                var tuples = [
                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    ["notify", "progress", jQuery.Callbacks("memory"),
                        jQuery.Callbacks("memory"), 2],
                    ["resolve", "done", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 1, "rejected"]
                ], state = "pending", promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },
                    // Keep pipe for back-compat
                    pipe: function ( /* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (_i, tuple) {
                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    }
                                    else {
                                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;
                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this, args = arguments, mightThrow = function () {
                                    var returned, then;
                                    // Support: Promises/A+ section 2.3.3.3.3
                                    // https://promisesaplus.com/#point-59
                                    // Ignore double-resolution attempts
                                    if (depth < maxDepth) {
                                        return;
                                    }
                                    returned = handler.apply(that, args);
                                    // Support: Promises/A+ section 2.3.1
                                    // https://promisesaplus.com/#point-48
                                    if (returned === deferred.promise()) {
                                        throw new TypeError("Thenable self-resolution");
                                    }
                                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                                    // https://promisesaplus.com/#point-54
                                    // https://promisesaplus.com/#point-75
                                    // Retrieve `then` only once
                                    then = returned &&
                                        // Support: Promises/A+ section 2.3.4
                                        // https://promisesaplus.com/#point-64
                                        // Only check objects and functions for thenability
                                        (typeof returned === "object" ||
                                            typeof returned === "function") &&
                                        returned.then;
                                    // Handle a returned thenable
                                    if (isFunction(then)) {
                                        // Special processors (notify) just wait for resolution
                                        if (special) {
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                            // Normal processors (resolve) also hook into progress
                                        }
                                        else {
                                            // ...and disregard older resolution values
                                            maxDepth++;
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                        }
                                        // Handle all other returned values
                                    }
                                    else {
                                        // Only substitute handlers pass on context
                                        // and multiple values (non-spec behavior)
                                        if (handler !== Identity) {
                                            that = undefined;
                                            args = [returned];
                                        }
                                        // Process the value(s)
                                        // Default process is resolve
                                        (special || deferred.resolveWith)(that, args);
                                    }
                                }, 
                                // Only normal processors (resolve) catch and reject exceptions
                                process = special ?
                                    mightThrow :
                                    function () {
                                        try {
                                            mightThrow();
                                        }
                                        catch (e) {
                                            if (jQuery.Deferred.exceptionHook) {
                                                jQuery.Deferred.exceptionHook(e, process.error);
                                            }
                                            // Support: Promises/A+ section 2.3.3.3.4.1
                                            // https://promisesaplus.com/#point-61
                                            // Ignore post-resolution exceptions
                                            if (depth + 1 >= maxDepth) {
                                                // Only substitute handlers pass on context
                                                // and multiple values (non-spec behavior)
                                                if (handler !== Thrower) {
                                                    that = undefined;
                                                    args = [e];
                                                }
                                                deferred.rejectWith(that, args);
                                            }
                                        }
                                    };
                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                }
                                else {
                                    // Call an optional hook to record the error, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getErrorHook) {
                                        process.error = jQuery.Deferred.getErrorHook();
                                        // The deprecated alias of the above. While the name suggests
                                        // returning the stack, not an error instance, jQuery just passes
                                        // it directly to `console.warn` so both will work; an instance
                                        // just better cooperates with source maps.
                                    }
                                    else if (jQuery.Deferred.getStackHook) {
                                        process.error = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }
                        return jQuery.Deferred(function (newDefer) {
                            // progress_handlers.add( ... )
                            tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ?
                                onProgress :
                                Identity, newDefer.notifyWith));
                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ?
                                onFulfilled :
                                Identity));
                            // rejected_handlers.add( ... )
                            tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ?
                                onRejected :
                                Thrower));
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
                // Add list-specific methods
                jQuery.each(tuples, function (i, tuple) {
                    var list = tuple[2], stateString = tuple[5];
                    // promise.progress = list.add
                    // promise.done = list.add
                    // promise.fail = list.add
                    promise[tuple[1]] = list.add;
                    // Handle state
                    if (stateString) {
                        list.add(function () {
                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        }, 
                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable, 
                        // rejected_handlers.disable
                        // fulfilled_handlers.disable
                        tuples[3 - i][3].disable, 
                        // progress_callbacks.lock
                        tuples[0][2].lock, 
                        // progress_handlers.lock
                        tuples[0][3].lock);
                    }
                    // progress_handlers.fire
                    // fulfilled_handlers.fire
                    // rejected_handlers.fire
                    list.add(tuple[3].fire);
                    // deferred.notify = function() { deferred.notifyWith(...) }
                    // deferred.resolve = function() { deferred.resolveWith(...) }
                    // deferred.reject = function() { deferred.rejectWith(...) }
                    deferred[tuple[0]] = function () {
                        deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                        return this;
                    };
                    // deferred.notifyWith = list.fireWith
                    // deferred.resolveWith = list.fireWith
                    // deferred.rejectWith = list.fireWith
                    deferred[tuple[0] + "With"] = list.fireWith;
                });
                // Make the deferred a promise
                promise.promise(deferred);
                // Call given func if any
                if (func) {
                    func.call(deferred, deferred);
                }
                // All done!
                return deferred;
            },
            // Deferred helper
            when: function (singleValue) {
                var 
                // count of uncompleted subordinates
                remaining = arguments.length, 
                // count of unprocessed arguments
                i = remaining, 
                // subordinate fulfillment data
                resolveContexts = Array(i), resolveValues = slice.call(arguments), 
                // the primary Deferred
                primary = jQuery.Deferred(), 
                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!(--remaining)) {
                            primary.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };
                // Single- and empty arguments are adopted like Promise.resolve
                if (remaining <= 1) {
                    adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);
                    // Use .then() to unwrap secondary thenables (cf. gh-3000)
                    if (primary.state() === "pending" ||
                        isFunction(resolveValues[i] && resolveValues[i].then)) {
                        return primary.then();
                    }
                }
                // Multiple arguments are aggregated like Promise.all array elements
                while (i--) {
                    adoptValue(resolveValues[i], updateFunc(i), primary.reject);
                }
                return primary.promise();
            }
        });
        // These usually indicate a programmer mistake during development,
        // warn about them ASAP rather than swallowing them by default.
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        // If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
        // captured before the async barrier to get the original error cause
        // which may otherwise be hidden.
        jQuery.Deferred.exceptionHook = function (error, asyncError) {
            // Support: IE 8 - 9 only
            // Console exists when dev tools are open, which can happen at any time
            if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, asyncError);
            }
        };
        jQuery.readyException = function (error) {
            window.setTimeout(function () {
                throw error;
            });
        };
        // The deferred used on DOM ready
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function (fn) {
            readyList
                .then(fn)
                // Wrap jQuery.readyException in a function so that the lookup
                // happens at the time of error handling instead of callback
                // registration.
                .catch(function (error) {
                jQuery.readyException(error);
            });
            return this;
        };
        jQuery.extend({
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,
            // A counter to track how many items to wait for before
            // the ready event fires. See trac-6781
            readyWait: 1,
            // Handle when the DOM is ready
            ready: function (wait) {
                // Abort if there are pending holds or we're already ready
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }
                // Remember that the DOM is ready
                jQuery.isReady = true;
                // If a normal DOM Ready event fired, decrement, and wait if need be
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }
                // If there are functions bound, to execute
                readyList.resolveWith(document, [jQuery]);
            }
        });
        jQuery.ready.then = readyList.then;
        // The ready event handler and self cleanup method
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready();
        }
        // Catch cases where $(document).ready() is called
        // after the browser event has already occurred.
        // Support: IE <=9 - 10 only
        // Older IE sometimes signals "interactive" too soon
        if (document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout(jQuery.ready);
        }
        else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", completed);
            // A fallback to window.onload, that will always work
            window.addEventListener("load", completed);
        }
        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, len = elems.length, bulk = key == null;
            // Sets many values
            if (toType(key) === "object") {
                chainable = true;
                for (i in key) {
                    access(elems, fn, i, key[i], true, emptyGet, raw);
                }
                // Sets one value
            }
            else if (value !== undefined) {
                chainable = true;
                if (!isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    // Bulk operations run against the entire set
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                        // ...except when executing function values
                    }
                    else {
                        bulk = fn;
                        fn = function (elem, _key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (; i < len; i++) {
                        fn(elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }
            if (chainable) {
                return elems;
            }
            // Gets
            if (bulk) {
                return fn.call(elems);
            }
            return len ? fn(elems[0], key) : emptyGet;
        };
        // Matches dashed string for camelizing
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        // Used by camelCase as callback to replace()
        function fcamelCase(_all, letter) {
            return letter.toUpperCase();
        }
        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE <=9 - 11, Edge 12 - 15
        // Microsoft forgot to hump their vendor prefix (trac-9572)
        function camelCase(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function (owner) {
            // Accepts only:
            //  - Node
            //    - Node.ELEMENT_NODE
            //    - Node.DOCUMENT_NODE
            //  - Object
            //    - Any
            return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
        };
        function Data() {
            this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
            cache: function (owner) {
                // Check if the owner object already has a cache
                var value = owner[this.expando];
                // If not, create one
                if (!value) {
                    value = {};
                    // We can accept data for non-element nodes in modern browsers,
                    // but we should not, see trac-8335.
                    // Always return an empty object.
                    if (acceptData(owner)) {
                        // If it is a node unlikely to be stringify-ed or looped over
                        // use plain assignment
                        if (owner.nodeType) {
                            owner[this.expando] = value;
                            // Otherwise secure it in a non-enumerable property
                            // configurable must be true to allow the property to be
                            // deleted when data is removed
                        }
                        else {
                            Object.defineProperty(owner, this.expando, {
                                value: value,
                                configurable: true
                            });
                        }
                    }
                }
                return value;
            },
            set: function (owner, data, value) {
                var prop, cache = this.cache(owner);
                // Handle: [ owner, key, value ] args
                // Always use camelCase key (gh-2257)
                if (typeof data === "string") {
                    cache[camelCase(data)] = value;
                    // Handle: [ owner, { properties } ] args
                }
                else {
                    // Copy the properties one-by-one to the cache object
                    for (prop in data) {
                        cache[camelCase(prop)] = data[prop];
                    }
                }
                return cache;
            },
            get: function (owner, key) {
                return key === undefined ?
                    this.cache(owner) :
                    // Always use camelCase key (gh-2257)
                    owner[this.expando] && owner[this.expando][camelCase(key)];
            },
            access: function (owner, key, value) {
                // In cases where either:
                //
                //   1. No key was specified
                //   2. A string key was specified, but no value provided
                //
                // Take the "read" path and allow the get method to determine
                // which value to return, respectively either:
                //
                //   1. The entire cache object
                //   2. The data stored at the key
                //
                if (key === undefined ||
                    ((key && typeof key === "string") && value === undefined)) {
                    return this.get(owner, key);
                }
                // When the key is not a string, or both a key and value
                // are specified, set or extend (existing objects) with either:
                //
                //   1. An object of properties
                //   2. A key and value
                //
                this.set(owner, key, value);
                // Since the "set" path can have two possible entry points
                // return the expected data based on which path was taken[*]
                return value !== undefined ? value : key;
            },
            remove: function (owner, key) {
                var i, cache = owner[this.expando];
                if (cache === undefined) {
                    return;
                }
                if (key !== undefined) {
                    // Support array or space separated string of keys
                    if (Array.isArray(key)) {
                        // If key is an array of keys...
                        // We always set camelCase keys, so remove that.
                        key = key.map(camelCase);
                    }
                    else {
                        key = camelCase(key);
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        key = key in cache ?
                            [key] :
                            (key.match(rnothtmlwhite) || []);
                    }
                    i = key.length;
                    while (i--) {
                        delete cache[key[i]];
                    }
                }
                // Remove the expando if there's no more data
                if (key === undefined || jQuery.isEmptyObject(cache)) {
                    // Support: Chrome <=35 - 45
                    // Webkit & Blink performance suffers when deleting properties
                    // from DOM nodes, so set to undefined instead
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                    if (owner.nodeType) {
                        owner[this.expando] = undefined;
                    }
                    else {
                        delete owner[this.expando];
                    }
                }
            },
            hasData: function (owner) {
                var cache = owner[this.expando];
                return cache !== undefined && !jQuery.isEmptyObject(cache);
            }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        //	Implementation Summary
        //
        //	1. Enforce API surface and semantic compatibility with 1.9.x branch
        //	2. Improve the module's maintainability by reducing the storage
        //		paths to a single mechanism.
        //	3. Use the same single mechanism to support "private" and "user" data.
        //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
        //	5. Avoid exposing implementation details on user objects (eg. expando properties)
        //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
            if (data === "true") {
                return true;
            }
            if (data === "false") {
                return false;
            }
            if (data === "null") {
                return null;
            }
            // Only convert to a number if it doesn't change the string
            if (data === +data + "") {
                return +data;
            }
            if (rbrace.test(data)) {
                return JSON.parse(data);
            }
            return data;
        }
        function dataAttr(elem, key, data) {
            var name;
            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = getData(data);
                    }
                    catch (e) { }
                    // Make sure we set the data so it isn't changed later
                    dataUser.set(elem, key, data);
                }
                else {
                    data = undefined;
                }
            }
            return data;
        }
        jQuery.extend({
            hasData: function (elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },
            data: function (elem, name, data) {
                return dataUser.access(elem, name, data);
            },
            removeData: function (elem, name) {
                dataUser.remove(elem, name);
            },
            // TODO: Now that all calls to _data and _removeData have been replaced
            // with direct calls to dataPriv methods, these can be deprecated.
            _data: function (elem, name, data) {
                return dataPriv.access(elem, name, data);
            },
            _removeData: function (elem, name) {
                dataPriv.remove(elem, name);
            }
        });
        jQuery.fn.extend({
            data: function (key, value) {
                var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                // Gets all values
                if (key === undefined) {
                    if (this.length) {
                        data = dataUser.get(elem);
                        if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                            i = attrs.length;
                            while (i--) {
                                // Support: IE 11 only
                                // The attrs elements can be null (trac-14894)
                                if (attrs[i]) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                            }
                            dataPriv.set(elem, "hasDataAttrs", true);
                        }
                    }
                    return data;
                }
                // Sets multiple values
                if (typeof key === "object") {
                    return this.each(function () {
                        dataUser.set(this, key);
                    });
                }
                return access(this, function (value) {
                    var data;
                    // The calling jQuery object (element matches) is not empty
                    // (and therefore has an element appears at this[ 0 ]) and the
                    // `value` parameter was not undefined. An empty jQuery object
                    // will result in `undefined` for elem = this[ 0 ] which will
                    // throw an exception if an attempt to read a data cache is made.
                    if (elem && value === undefined) {
                        // Attempt to get data from the cache
                        // The key will always be camelCased in Data
                        data = dataUser.get(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // Attempt to "discover" the data in
                        // HTML5 custom data-* attrs
                        data = dataAttr(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // We tried really hard, but the data doesn't exist.
                        return;
                    }
                    // Set the data...
                    this.each(function () {
                        // We always store the camelCased key
                        dataUser.set(this, key, value);
                    });
                }, null, value, arguments.length > 1, null, true);
            },
            removeData: function (key) {
                return this.each(function () {
                    dataUser.remove(this, key);
                });
            }
        });
        jQuery.extend({
            queue: function (elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = dataPriv.get(elem, type);
                    // Speed up dequeue by getting out quickly if this is just a lookup
                    if (data) {
                        if (!queue || Array.isArray(data)) {
                            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                        }
                        else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },
            dequeue: function (elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                    jQuery.dequeue(elem, type);
                };
                // If the fx queue is dequeued, always remove the progress sentinel
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--;
                }
                if (fn) {
                    // Add a progress sentinel to prevent the fx queue from being
                    // automatically dequeued
                    if (type === "fx") {
                        queue.unshift("inprogress");
                    }
                    // Clear up the last queue stop function
                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }
                if (!startLength && hooks) {
                    hooks.empty.fire();
                }
            },
            // Not public - generate a queueHooks object, or return the current one
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        dataPriv.remove(elem, [type + "queue", key]);
                    })
                });
            }
        });
        jQuery.fn.extend({
            queue: function (type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }
                return data === undefined ?
                    this :
                    this.each(function () {
                        var queue = jQuery.queue(this, type, data);
                        // Ensure a hooks for this queue
                        jQuery._queueHooks(this, type);
                        if (type === "fx" && queue[0] !== "inprogress") {
                            jQuery.dequeue(this, type);
                        }
                    });
            },
            dequeue: function (type) {
                return this.each(function () {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function (type) {
                return this.queue(type || "fx", []);
            },
            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function (type, obj) {
                var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
                if (typeof type !== "string") {
                    obj = type;
                    type = undefined;
                }
                type = type || "fx";
                while (i--) {
                    tmp = dataPriv.get(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve);
                    }
                }
                resolve();
                return defer.promise(obj);
            }
        });
        var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document.documentElement;
        var isAttached = function (elem) {
            return jQuery.contains(elem.ownerDocument, elem);
        }, composed = { composed: true };
        // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
        // Check attachment across shadow DOM boundaries when possible (gh-3504)
        // Support: iOS 10.0-10.2 only
        // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
        // leading to errors. We need to check for `getRootNode`.
        if (documentElement.getRootNode) {
            isAttached = function (elem) {
                return jQuery.contains(elem.ownerDocument, elem) ||
                    elem.getRootNode(composed) === elem.ownerDocument;
            };
        }
        var isHiddenWithinTree = function (elem, el) {
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;
            // Inline style trumps all
            return elem.style.display === "none" ||
                elem.style.display === "" &&
                    // Otherwise, check computed style
                    // Support: Firefox <=43 - 45
                    // Disconnected elements can have computed display: none, so first confirm that elem is
                    // in the document.
                    isAttached(elem) &&
                    jQuery.css(elem, "display") === "none";
        };
        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale, maxIterations = 20, currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), 
            // Starting value computation is required for potential unit mismatches
            initialInUnit = elem.nodeType &&
                (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                // Support: Firefox <=54
                // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
                initial = initial / 2;
                // Trust units reported by jQuery.css
                unit = unit || initialInUnit[3];
                // Iteratively approximate from a nonzero starting point
                initialInUnit = +initial || 1;
                while (maxIterations--) {
                    // Evaluate and update our best guess (doubling guesses that zero out).
                    // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                    jQuery.style(elem, prop, initialInUnit + unit);
                    if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                        maxIterations = 0;
                    }
                    initialInUnit = initialInUnit / scale;
                }
                initialInUnit = initialInUnit * 2;
                jQuery.style(elem, prop, initialInUnit + unit);
                // Make sure we update the tween properties later on
                valueParts = valueParts || [];
            }
            if (valueParts) {
                initialInUnit = +initialInUnit || +initial || 0;
                // Apply relative offset (+=/-=) if specified
                adjusted = valueParts[1] ?
                    initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                    +valueParts[2];
                if (tween) {
                    tween.unit = unit;
                    tween.start = initialInUnit;
                    tween.end = adjusted;
                }
            }
            return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
            var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
            if (display) {
                return display;
            }
            temp = doc.body.appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, "display");
            temp.parentNode.removeChild(temp);
            if (display === "none") {
                display = "block";
            }
            defaultDisplayMap[nodeName] = display;
            return display;
        }
        function showHide(elements, show) {
            var display, elem, values = [], index = 0, length = elements.length;
            // Determine new display value for elements that need to change
            for (; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                display = elem.style.display;
                if (show) {
                    // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                    // check is required in this first loop unless we have a nonempty display value (either
                    // inline or about-to-be-restored)
                    if (display === "none") {
                        values[index] = dataPriv.get(elem, "display") || null;
                        if (!values[index]) {
                            elem.style.display = "";
                        }
                    }
                    if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                        values[index] = getDefaultDisplay(elem);
                    }
                }
                else {
                    if (display !== "none") {
                        values[index] = "none";
                        // Remember what we're overwriting
                        dataPriv.set(elem, "display", display);
                    }
                }
            }
            // Set the display of the elements in a second loop to avoid constant reflow
            for (index = 0; index < length; index++) {
                if (values[index] != null) {
                    elements[index].style.display = values[index];
                }
            }
            return elements;
        }
        jQuery.fn.extend({
            show: function () {
                return showHide(this, true);
            },
            hide: function () {
                return showHide(this);
            },
            toggle: function (state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }
                return this.each(function () {
                    if (isHiddenWithinTree(this)) {
                        jQuery(this).show();
                    }
                    else {
                        jQuery(this).hide();
                    }
                });
            }
        });
        var rcheckableType = (/^(?:checkbox|radio)$/i);
        var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);
        var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);
        (function () {
            var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
            // Support: Android 4.0 - 4.3 only
            // Check state lost if the name is set (trac-11217)
            // Support: Windows Web Apps (WWA)
            // `name` and `type` must use .setAttribute for WWA (trac-14901)
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            // Support: Android <=4.1 only
            // Older WebKit doesn't clone checked state correctly in fragments
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
            // Support: IE <=11 only
            // Make sure textarea (and checkbox) defaultValue is properly cloned
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
            // Support: IE <=9 only
            // IE <=9 replaces <option> tags with their contents when inserted outside of
            // the select element.
            div.innerHTML = "<option></option>";
            support.option = !!div.lastChild;
        })();
        // We have to close these tags to support XHTML (trac-13200)
        var wrapMap = {
            // XHTML parsers do not magically insert elements in the
            // same way that tag soup parsers do. So we cannot shorten
            // this by omitting <tbody> or other required elements.
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        // Support: IE <=9 only
        if (!support.option) {
            wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
            // Support: IE <=9 - 11 only
            // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
            var ret;
            if (typeof context.getElementsByTagName !== "undefined") {
                ret = context.getElementsByTagName(tag || "*");
            }
            else if (typeof context.querySelectorAll !== "undefined") {
                ret = context.querySelectorAll(tag || "*");
            }
            else {
                ret = [];
            }
            if (tag === undefined || tag && nodeName(context, tag)) {
                return jQuery.merge([context], ret);
            }
            return ret;
        }
        // Mark scripts as having already been evaluated
        function setGlobalEval(elems, refElements) {
            var i = 0, l = elems.length;
            for (; i < l; i++) {
                dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
            }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
            var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    // Add nodes directly
                    if (toType(elem) === "object") {
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        // Convert non-html into a text node
                    }
                    else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                        // Convert html into DOM nodes
                    }
                    else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, tmp.childNodes);
                        // Remember the top-level container
                        tmp = fragment.firstChild;
                        // Ensure the created nodes are orphaned (trac-12392)
                        tmp.textContent = "";
                    }
                }
            }
            // Remove wrapper from fragment
            fragment.textContent = "";
            i = 0;
            while ((elem = nodes[i++])) {
                // Skip elements already in the context collection (trac-4087)
                if (selection && jQuery.inArray(elem, selection) > -1) {
                    if (ignored) {
                        ignored.push(elem);
                    }
                    continue;
                }
                attached = isAttached(elem);
                // Append to fragment
                tmp = getAll(fragment.appendChild(elem), "script");
                // Preserve script evaluation history
                if (attached) {
                    setGlobalEval(tmp);
                }
                // Capture executables
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
            return true;
        }
        function returnFalse() {
            return false;
        }
        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    on(elem, type, selector, data, types[type], one);
                }
                return elem;
            }
            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            }
            else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                }
                else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            }
            else if (!fn) {
                return elem;
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        }
        /*
         * Helper functions for managing events -- not part of the public interface.
         * Props to Dean Edwards' addEvent library for many of the ideas.
         */
        jQuery.event = {
            global: {},
            add: function (elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                // Only attach events to objects that accept data
                if (!acceptData(elem)) {
                    return;
                }
                // Caller can pass in an object of custom data in lieu of the handler
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
                // Ensure that invalid selectors throw exceptions at attach time
                // Evaluate against documentElement in case elem is a non-element node (e.g., document)
                if (selector) {
                    jQuery.find.matchesSelector(documentElement, selector);
                }
                // Make sure that the handler has a unique ID, used to find/remove it later
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }
                // Init the element's event structure and main handler, if this is the first
                if (!(events = elemData.events)) {
                    events = elemData.events = Object.create(null);
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        // Discard the second event of a jQuery.event.trigger() and
                        // when an event is called after a page has unloaded
                        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                            jQuery.event.dispatch.apply(elem, arguments) : undefined;
                    };
                }
                // Handle multiple events separated by a space
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // There *must* be a type, no attaching namespace-only handlers
                    if (!type) {
                        continue;
                    }
                    // If event changes its type, use the special event handlers for the changed type
                    special = jQuery.event.special[type] || {};
                    // If selector defined, determine special event api type, otherwise given type
                    type = (selector ? special.delegateType : special.bindType) || type;
                    // Update special based on newly reset type
                    special = jQuery.event.special[type] || {};
                    // handleObj is passed to all event handlers
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    // Init the event handler queue if we're the first
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        // Only use addEventListener if the special events handler returns false
                        if (!special.setup ||
                            special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle);
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }
                    // Add to the element's handler list, delegates in front
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    }
                    else {
                        handlers.push(handleObj);
                    }
                    // Keep track of which events have ever been used, for event optimization
                    jQuery.event.global[type] = true;
                }
            },
            // Detach an event or set of events from an element
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return;
                }
                // Once for each type.namespace in types; type may be omitted
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // Unbind all events (on this namespace, if provided) for the element
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] &&
                        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    // Remove matching events
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) &&
                            (!handler || handler.guid === handleObj.guid) &&
                            (!tmp || tmp.test(handleObj.namespace)) &&
                            (!selector || selector === handleObj.selector ||
                                selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }
                    // Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    if (origCount && !handlers.length) {
                        if (!special.teardown ||
                            special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }
                        delete events[type];
                    }
                }
                // Remove data and the expando if it's no longer used
                if (jQuery.isEmptyObject(events)) {
                    dataPriv.remove(elem, "handle events");
                }
            },
            dispatch: function (nativeEvent) {
                var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), 
                // Make a writable jQuery.Event from the native event object
                event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
                // Use the fix-ed jQuery.Event rather than the (read-only) native event
                args[0] = event;
                for (i = 1; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }
                event.delegateTarget = this;
                // Call the preDispatch hook for the mapped type, and let it bail if desired
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return;
                }
                // Determine handlers
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                // Run delegates first; they may want to stop propagation beneath us
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) &&
                        !event.isImmediatePropagationStopped()) {
                        // If the event is namespaced, then each handler is only invoked if it is
                        // specially universal or its namespaces are a superset of the event's.
                        if (!event.rnamespace || handleObj.namespace === false ||
                            event.rnamespace.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                                handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        }
                    }
                }
                // Call the postDispatch hook for the mapped type
                if (special.postDispatch) {
                    special.postDispatch.call(this, event);
                }
                return event.result;
            },
            handlers: function (event, handlers) {
                var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                // Find delegate handlers
                if (delegateCount &&
                    // Support: IE <=9
                    // Black-hole SVG <use> instance trees (trac-13180)
                    cur.nodeType &&
                    // Support: Firefox <=42
                    // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                    // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                    // Support: IE 11 only
                    // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                    !(event.type === "click" && event.button >= 1)) {
                    for (; cur !== this; cur = cur.parentNode || this) {
                        // Don't check non-elements (trac-13208)
                        // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
                        if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                            matchedHandlers = [];
                            matchedSelectors = {};
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];
                                // Don't conflict with Object.prototype properties (trac-13203)
                                sel = handleObj.selector + " ";
                                if (matchedSelectors[sel] === undefined) {
                                    matchedSelectors[sel] = handleObj.needsContext ?
                                        jQuery(sel, this).index(cur) > -1 :
                                        jQuery.find(sel, this, null, [cur]).length;
                                }
                                if (matchedSelectors[sel]) {
                                    matchedHandlers.push(handleObj);
                                }
                            }
                            if (matchedHandlers.length) {
                                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                            }
                        }
                    }
                }
                // Add the remaining (directly-bound) handlers
                cur = this;
                if (delegateCount < handlers.length) {
                    handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
                }
                return handlerQueue;
            },
            addProp: function (name, hook) {
                Object.defineProperty(jQuery.Event.prototype, name, {
                    enumerable: true,
                    configurable: true,
                    get: isFunction(hook) ?
                        function () {
                            if (this.originalEvent) {
                                return hook(this.originalEvent);
                            }
                        } :
                        function () {
                            if (this.originalEvent) {
                                return this.originalEvent[name];
                            }
                        },
                    set: function (value) {
                        Object.defineProperty(this, name, {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: value
                        });
                    }
                });
            },
            fix: function (originalEvent) {
                return originalEvent[jQuery.expando] ?
                    originalEvent :
                    new jQuery.Event(originalEvent);
            },
            special: {
                load: {
                    // Prevent triggered image.load events from bubbling to window.load
                    noBubble: true
                },
                click: {
                    // Utilize native event to ensure correct state for checkable inputs
                    setup: function (data) {
                        // For mutual compressibility with _default, replace `this` access with a local var.
                        // `|| data` is dead code meant only to preserve the variable through minification.
                        var el = this || data;
                        // Claim the first handler
                        if (rcheckableType.test(el.type) &&
                            el.click && nodeName(el, "input")) {
                            // dataPriv.set( el, "click", ... )
                            leverageNative(el, "click", true);
                        }
                        // Return false to allow normal processing in the caller
                        return false;
                    },
                    trigger: function (data) {
                        // For mutual compressibility with _default, replace `this` access with a local var.
                        // `|| data` is dead code meant only to preserve the variable through minification.
                        var el = this || data;
                        // Force setup before triggering a click
                        if (rcheckableType.test(el.type) &&
                            el.click && nodeName(el, "input")) {
                            leverageNative(el, "click");
                        }
                        // Return non-false to allow normal event-path propagation
                        return true;
                    },
                    // For cross-browser consistency, suppress native .click() on links
                    // Also prevent it if we're currently inside a leveraged native-event stack
                    _default: function (event) {
                        var target = event.target;
                        return rcheckableType.test(target.type) &&
                            target.click && nodeName(target, "input") &&
                            dataPriv.get(target, "click") ||
                            nodeName(target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function (event) {
                        // Support: Firefox 20+
                        // Firefox doesn't alert if the returnValue field is not set.
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            }
        };
        // Ensure the presence of an event listener that handles manually-triggered
        // synthetic events by interrupting progress until reinvoked in response to
        // *native* events that it fires directly, ensuring that state changes have
        // already occurred before other listeners are invoked.
        function leverageNative(el, type, isSetup) {
            // Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
            if (!isSetup) {
                if (dataPriv.get(el, type) === undefined) {
                    jQuery.event.add(el, type, returnTrue);
                }
                return;
            }
            // Register the controller as a special universal handler for all event namespaces
            dataPriv.set(el, type, false);
            jQuery.event.add(el, type, {
                namespace: false,
                handler: function (event) {
                    var result, saved = dataPriv.get(this, type);
                    if ((event.isTrigger & 1) && this[type]) {
                        // Interrupt processing of the outer synthetic .trigger()ed event
                        if (!saved) {
                            // Store arguments for use when handling the inner native event
                            // There will always be at least one argument (an event object), so this array
                            // will not be confused with a leftover capture object.
                            saved = slice.call(arguments);
                            dataPriv.set(this, type, saved);
                            // Trigger the native event and capture its result
                            this[type]();
                            result = dataPriv.get(this, type);
                            dataPriv.set(this, type, false);
                            if (saved !== result) {
                                // Cancel the outer synthetic event
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                return result;
                            }
                            // If this is an inner synthetic event for an event with a bubbling surrogate
                            // (focus or blur), assume that the surrogate already propagated from triggering
                            // the native event and prevent that from happening again here.
                            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                            // less bad than duplication.
                        }
                        else if ((jQuery.event.special[type] || {}).delegateType) {
                            event.stopPropagation();
                        }
                        // If this is a native event triggered above, everything is now in order
                        // Fire an inner synthetic event with the original arguments
                    }
                    else if (saved) {
                        // ...and capture the result
                        dataPriv.set(this, type, jQuery.event.trigger(saved[0], saved.slice(1), this));
                        // Abort handling of the native event by all jQuery handlers while allowing
                        // native handlers on the same element to run. On target, this is achieved
                        // by stopping immediate propagation just on the jQuery event. However,
                        // the native event is re-wrapped by a jQuery one on each level of the
                        // propagation so the only way to stop it for jQuery is to stop it for
                        // everyone via native `stopPropagation()`. This is not a problem for
                        // focus/blur which don't bubble, but it does also stop click on checkboxes
                        // and radios. We accept this limitation.
                        event.stopPropagation();
                        event.isImmediatePropagationStopped = returnTrue;
                    }
                }
            });
        }
        jQuery.removeEvent = function (elem, type, handle) {
            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle);
            }
        };
        jQuery.Event = function (src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }
            // Event object
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = src.defaultPrevented ||
                    src.defaultPrevented === undefined &&
                        // Support: Android <=2.3 only
                        src.returnValue === false ?
                    returnTrue :
                    returnFalse;
                // Create target properties
                // Support: Safari <=6 - 7 only
                // Target should not be a text node (trac-504, trac-13143)
                this.target = (src.target && src.target.nodeType === 3) ?
                    src.target.parentNode :
                    src.target;
                this.currentTarget = src.currentTarget;
                this.relatedTarget = src.relatedTarget;
                // Event type
            }
            else {
                this.type = src;
            }
            // Put explicitly provided properties onto the event object
            if (props) {
                jQuery.extend(this, props);
            }
            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = src && src.timeStamp || Date.now();
            // Mark it as fixed
            this[jQuery.expando] = true;
        };
        // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
        // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
        jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e && !this.isSimulated) {
                    e.preventDefault();
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopPropagation();
                }
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        };
        // Includes all common event props including KeyEvent and MouseEvent specific props
        jQuery.each({
            altKey: true,
            bubbles: true,
            cancelable: true,
            changedTouches: true,
            ctrlKey: true,
            detail: true,
            eventPhase: true,
            metaKey: true,
            pageX: true,
            pageY: true,
            shiftKey: true,
            view: true,
            "char": true,
            code: true,
            charCode: true,
            key: true,
            keyCode: true,
            button: true,
            buttons: true,
            clientX: true,
            clientY: true,
            offsetX: true,
            offsetY: true,
            pointerId: true,
            pointerType: true,
            screenX: true,
            screenY: true,
            targetTouches: true,
            toElement: true,
            touches: true,
            which: true
        }, jQuery.event.addProp);
        jQuery.each({ focus: "focusin", blur: "focusout" }, function (type, delegateType) {
            function focusMappedHandler(nativeEvent) {
                if (document.documentMode) {
                    // Support: IE 11+
                    // Attach a single focusin/focusout handler on the document while someone wants
                    // focus/blur. This is because the former are synchronous in IE while the latter
                    // are async. In other browsers, all those handlers are invoked synchronously.
                    // `handle` from private data would already wrap the event, but we need
                    // to change the `type` here.
                    var handle = dataPriv.get(this, "handle"), event = jQuery.event.fix(nativeEvent);
                    event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
                    event.isSimulated = true;
                    // First, handle focusin/focusout
                    handle(nativeEvent);
                    // ...then, handle focus/blur
                    //
                    // focus/blur don't bubble while focusin/focusout do; simulate the former by only
                    // invoking the handler at the lower level.
                    if (event.target === event.currentTarget) {
                        // The setup part calls `leverageNative`, which, in turn, calls
                        // `jQuery.event.add`, so event handle will already have been set
                        // by this point.
                        handle(event);
                    }
                }
                else {
                    // For non-IE browsers, attach a single capturing handler on the document
                    // while someone wants focusin/focusout.
                    jQuery.event.simulate(delegateType, nativeEvent.target, jQuery.event.fix(nativeEvent));
                }
            }
            jQuery.event.special[type] = {
                // Utilize native event if possible so blur/focus sequence is correct
                setup: function () {
                    var attaches;
                    // Claim the first handler
                    // dataPriv.set( this, "focus", ... )
                    // dataPriv.set( this, "blur", ... )
                    leverageNative(this, type, true);
                    if (document.documentMode) {
                        // Support: IE 9 - 11+
                        // We use the same native handler for focusin & focus (and focusout & blur)
                        // so we need to coordinate setup & teardown parts between those events.
                        // Use `delegateType` as the key as `type` is already used by `leverageNative`.
                        attaches = dataPriv.get(this, delegateType);
                        if (!attaches) {
                            this.addEventListener(delegateType, focusMappedHandler);
                        }
                        dataPriv.set(this, delegateType, (attaches || 0) + 1);
                    }
                    else {
                        // Return false to allow normal processing in the caller
                        return false;
                    }
                },
                trigger: function () {
                    // Force setup before trigger
                    leverageNative(this, type);
                    // Return non-false to allow normal event-path propagation
                    return true;
                },
                teardown: function () {
                    var attaches;
                    if (document.documentMode) {
                        attaches = dataPriv.get(this, delegateType) - 1;
                        if (!attaches) {
                            this.removeEventListener(delegateType, focusMappedHandler);
                            dataPriv.remove(this, delegateType);
                        }
                        else {
                            dataPriv.set(this, delegateType, attaches);
                        }
                    }
                    else {
                        // Return false to indicate standard teardown should be applied
                        return false;
                    }
                },
                // Suppress native focus or blur if we're currently inside
                // a leveraged native-event stack
                _default: function (event) {
                    return dataPriv.get(event.target, type);
                },
                delegateType: delegateType
            };
            // Support: Firefox <=44
            // Firefox doesn't have focus(in | out) events
            // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
            //
            // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
            // focus(in | out) events fire after focus & blur events,
            // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
            // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
            //
            // Support: IE 9 - 11+
            // To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
            // attach a single handler for both events in IE.
            jQuery.event.special[delegateType] = {
                setup: function () {
                    // Handle: regular nodes (via `this.ownerDocument`), window
                    // (via `this.document`) & document (via `this`).
                    var doc = this.ownerDocument || this.document || this, dataHolder = document.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
                    // Support: IE 9 - 11+
                    // We use the same native handler for focusin & focus (and focusout & blur)
                    // so we need to coordinate setup & teardown parts between those events.
                    // Use `delegateType` as the key as `type` is already used by `leverageNative`.
                    if (!attaches) {
                        if (document.documentMode) {
                            this.addEventListener(delegateType, focusMappedHandler);
                        }
                        else {
                            doc.addEventListener(type, focusMappedHandler, true);
                        }
                    }
                    dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this.document || this, dataHolder = document.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
                    if (!attaches) {
                        if (document.documentMode) {
                            this.removeEventListener(delegateType, focusMappedHandler);
                        }
                        else {
                            doc.removeEventListener(type, focusMappedHandler, true);
                        }
                        dataPriv.remove(dataHolder, delegateType);
                    }
                    else {
                        dataPriv.set(dataHolder, delegateType, attaches);
                    }
                }
            };
        });
        // Create mouseenter/leave events using mouseover/out and event-time checks
        // so that event delegation works in jQuery.
        // Do the same for pointerenter/pointerleave and pointerover/pointerout
        //
        // Support: Safari 7 only
        // Safari sends mouseenter too often; see:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
        // for the description of the bug (it existed in older Chrome versions as well).
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    // For mouseenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });
        jQuery.fn.extend({
            on: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn);
            },
            one: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    // ( event )  dispatched jQuery.Event
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType, handleObj.selector, handleObj.handler);
                    return this;
                }
                if (typeof types === "object") {
                    // ( types-object [, selector] )
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    // ( types [, fn] )
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function () {
                    jQuery.event.remove(this, types, fn, selector);
                });
            }
        });
        var 
        // Support: IE <=10 - 11, Edge 12 - 13 only
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i, 
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        // Prefer a tbody over its parent table for containing new rows
        function manipulationTarget(elem, content) {
            if (nodeName(elem, "table") &&
                nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
                return jQuery(elem).children("tbody")[0] || elem;
            }
            return elem;
        }
        // Replace/restore the type attribute of script elements for safe DOM manipulation
        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem;
        }
        function restoreScript(elem) {
            if ((elem.type || "").slice(0, 5) === "true/") {
                elem.type = elem.type.slice(5);
            }
            else {
                elem.removeAttribute("type");
            }
            return elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, udataOld, udataCur, events;
            if (dest.nodeType !== 1) {
                return;
            }
            // 1. Copy private data: events, handlers, etc.
            if (dataPriv.hasData(src)) {
                pdataOld = dataPriv.get(src);
                events = pdataOld.events;
                if (events) {
                    dataPriv.remove(dest, "handle events");
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i]);
                        }
                    }
                }
            }
            // 2. Copy user data
            if (dataUser.hasData(src)) {
                udataOld = dataUser.access(src);
                udataCur = jQuery.extend({}, udataOld);
                dataUser.set(dest, udataCur);
            }
        }
        // Fix IE bugs, see support tests
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            // Fails to persist the checked state of a cloned checkbox or radio button.
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked;
                // Fails to return the selected option to the default selected state when cloning options
            }
            else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }
        function domManip(collection, args, callback, ignored) {
            // Flatten any nested arrays
            args = flat(args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
            // We can't cloneNode fragments that contain checked, in WebKit
            if (valueIsFunction ||
                (l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test(value))) {
                return collection.each(function (index) {
                    var self = collection.eq(index);
                    if (valueIsFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    domManip(self, args, callback, ignored);
                });
            }
            if (l) {
                fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                // Require either new content or an interest in ignored elements to invoke the callback
                if (first || ignored) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    // Use the original fragment for the last item
                    // instead of the first because it can end up
                    // being emptied incorrectly in certain situations (trac-8070).
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                // Support: Android <=4.0 only, PhantomJS 1 only
                                // push.apply(_, arraylike) throws on ancient WebKit
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(collection[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        // Re-enable scripts
                        jQuery.map(scripts, restoreScript);
                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") &&
                                !dataPriv.access(node, "globalEval") &&
                                jQuery.contains(doc, node)) {
                                if (node.src && (node.type || "").toLowerCase() !== "module") {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl && !node.noModule) {
                                        jQuery._evalUrl(node.src, {
                                            nonce: node.nonce || node.getAttribute("nonce")
                                        }, doc);
                                    }
                                }
                                else {
                                    // Unwrap a CDATA section containing script contents. This shouldn't be
                                    // needed as in XML documents they're already not visible when
                                    // inspecting element contents and in HTML documents they have no
                                    // meaning but we're preserving that logic for backwards compatibility.
                                    // This will be removed completely in 4.0. See gh-4904.
                                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                                }
                            }
                        }
                    }
                }
            }
            return collection;
        }
        function remove(elem, selector, keepData) {
            var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
            for (; (node = nodes[i]) != null; i++) {
                if (!keepData && node.nodeType === 1) {
                    jQuery.cleanData(getAll(node));
                }
                if (node.parentNode) {
                    if (keepData && isAttached(node)) {
                        setGlobalEval(getAll(node, "script"));
                    }
                    node.parentNode.removeChild(node);
                }
            }
            return elem;
        }
        jQuery.extend({
            htmlPrefilter: function (html) {
                return html;
            },
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
                // Fix IE cloning issues
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                    !jQuery.isXMLDoc(elem)) {
                    // We eschew jQuery#find here for performance reasons:
                    // https://jsperf.com/getall-vs-sizzle/2
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        fixInput(srcElements[i], destElements[i]);
                    }
                }
                // Copy the events from the original to the clone
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            cloneCopyEvent(srcElements[i], destElements[i]);
                        }
                    }
                    else {
                        cloneCopyEvent(elem, clone);
                    }
                }
                // Preserve script evaluation history
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }
                // Return the cloned set
                return clone;
            },
            cleanData: function (elems) {
                var data, elem, type, special = jQuery.event.special, i = 0;
                for (; (elem = elems[i]) !== undefined; i++) {
                    if (acceptData(elem)) {
                        if ((data = elem[dataPriv.expando])) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);
                                        // This is a shortcut to avoid jQuery.event.remove's overhead
                                    }
                                    else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                            }
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataPriv.expando] = undefined;
                        }
                        if (elem[dataUser.expando]) {
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataUser.expando] = undefined;
                        }
                    }
                }
            }
        });
        jQuery.fn.extend({
            detach: function (selector) {
                return remove(this, selector, true);
            },
            remove: function (selector) {
                return remove(this, selector);
            },
            text: function (value) {
                return access(this, function (value) {
                    return value === undefined ?
                        jQuery.text(this) :
                        this.empty().each(function () {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                this.textContent = value;
                            }
                        });
                }, null, value, arguments.length);
            },
            append: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },
            after: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },
            empty: function () {
                var elem, i = 0;
                for (; (elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        // Prevent memory leaks
                        jQuery.cleanData(getAll(elem, false));
                        // Remove any remaining nodes
                        elem.textContent = "";
                    }
                }
                return this;
            },
            clone: function (dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function () {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function (value) {
                return access(this, function (value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML;
                    }
                    // See if we can take a shortcut and just use innerHTML
                    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                        !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                // Remove element nodes and prevent memory leaks
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }
                            elem = 0;
                            // If using innerHTML throws an exception, use the fallback method
                        }
                        catch (e) { }
                    }
                    if (elem) {
                        this.empty().append(value);
                    }
                }, null, value, arguments.length);
            },
            replaceWith: function () {
                var ignored = [];
                // Make the changes, replacing each non-ignored context element with the new content
                return domManip(this, arguments, function (elem) {
                    var parent = this.parentNode;
                    if (jQuery.inArray(this, ignored) < 0) {
                        jQuery.cleanData(getAll(this));
                        if (parent) {
                            parent.replaceChild(elem, this);
                        }
                    }
                    // Force callback invocation
                }, ignored);
            }
        });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // .get() because push.apply(_, arraylike) throws on ancient WebKit
                    push.apply(ret, elems.get());
                }
                return this.pushStack(ret);
            };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var rcustomProp = /^--/;
        var getStyles = function (elem) {
            // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(elem);
        };
        var swap = function (elem, options, callback) {
            var ret, name, old = {};
            // Remember the old values, and insert the new ones
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.call(elem);
            // Revert the old values
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function () {
            // Executing both pixelPosition & boxSizingReliable tests require only one layout
            // so they're executed at the same time to save the second computation.
            function computeStyleTests() {
                // This is a singleton, we need to execute it only once
                if (!div) {
                    return;
                }
                container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                    "margin-top:1px;padding:0;border:0";
                div.style.cssText =
                    "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                        "margin:auto;border:1px;padding:1px;" +
                        "width:60%;top:1%";
                documentElement.appendChild(container).appendChild(div);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = divStyle.top !== "1%";
                // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
                reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
                // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
                // Some styles come back with percentage values, even though they shouldn't
                div.style.right = "60%";
                pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
                // Support: IE 9 - 11 only
                // Detect misreporting of content dimensions for box-sizing:border-box elements
                boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
                // Support: IE 9 only
                // Detect overflow:scroll screwiness (gh-3699)
                // Support: Chrome <=64
                // Don't get tricked when zoom affects offsetWidth (gh-4029)
                div.style.position = "absolute";
                scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
                documentElement.removeChild(container);
                // Nullify the div so it wouldn't be stored in the memory and
                // it will also be a sign that checks already performed
                div = null;
            }
            function roundPixelMeasures(measure) {
                return Math.round(parseFloat(measure));
            }
            var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
            // Finish early in limited (non-browser) environments
            if (!div.style) {
                return;
            }
            // Support: IE <=9 - 11 only
            // Style of cloned element affects source element cloned (trac-8908)
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            jQuery.extend(support, {
                boxSizingReliable: function () {
                    computeStyleTests();
                    return boxSizingReliableVal;
                },
                pixelBoxStyles: function () {
                    computeStyleTests();
                    return pixelBoxStylesVal;
                },
                pixelPosition: function () {
                    computeStyleTests();
                    return pixelPositionVal;
                },
                reliableMarginLeft: function () {
                    computeStyleTests();
                    return reliableMarginLeftVal;
                },
                scrollboxSize: function () {
                    computeStyleTests();
                    return scrollboxSizeVal;
                },
                // Support: IE 9 - 11+, Edge 15 - 18+
                // IE/Edge misreport `getComputedStyle` of table rows with width/height
                // set in CSS while `offset*` properties report correct values.
                // Behavior in IE 9 is more subtle than in newer versions & it passes
                // some versions of this test; make sure not to make it pass there!
                //
                // Support: Firefox 70+
                // Only Firefox includes border widths
                // in computed dimensions. (gh-4529)
                reliableTrDimensions: function () {
                    var table, tr, trChild, trStyle;
                    if (reliableTrDimensionsVal == null) {
                        table = document.createElement("table");
                        tr = document.createElement("tr");
                        trChild = document.createElement("div");
                        table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                        tr.style.cssText = "box-sizing:content-box;border:1px solid";
                        // Support: Chrome 86+
                        // Height set through cssText does not get applied.
                        // Computed height then comes back as 0.
                        tr.style.height = "1px";
                        trChild.style.height = "9px";
                        // Support: Android 8 Chrome 86+
                        // In our bodyBackground.html iframe,
                        // display for all div elements is set to "inline",
                        // which causes a problem only in Android 8 Chrome 86.
                        // Ensuring the div is `display: block`
                        // gets around this issue.
                        trChild.style.display = "block";
                        documentElement
                            .appendChild(table)
                            .appendChild(tr)
                            .appendChild(trChild);
                        trStyle = window.getComputedStyle(tr);
                        reliableTrDimensionsVal = (parseInt(trStyle.height, 10) +
                            parseInt(trStyle.borderTopWidth, 10) +
                            parseInt(trStyle.borderBottomWidth, 10)) === tr.offsetHeight;
                        documentElement.removeChild(table);
                    }
                    return reliableTrDimensionsVal;
                }
            });
        })();
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), 
            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;
            computed = computed || getStyles(elem);
            // getPropertyValue is needed for:
            //   .css('filter') (IE 9 only, trac-12537)
            //   .css('--customProperty) (gh-3144)
            if (computed) {
                // Support: IE <=9 - 11+
                // IE only supports `"float"` in `getPropertyValue`; in computed styles
                // it's only available as `"cssFloat"`. We no longer modify properties
                // sent to `.css()` apart from camelCasing, so we need to check both.
                // Normally, this would create difference in behavior: if
                // `getPropertyValue` returns an empty string, the value returned
                // by `.css()` would be `undefined`. This is usually the case for
                // disconnected elements. However, in IE even disconnected elements
                // with no styles return `"none"` for `getPropertyValue( "float" )`
                ret = computed.getPropertyValue(name) || computed[name];
                if (isCustomProp && ret) {
                    // Support: Firefox 105+, Chrome <=105+
                    // Spec requires trimming whitespace for custom properties (gh-4926).
                    // Firefox only trims leading whitespace. Chrome just collapses
                    // both leading & trailing whitespace to a single space.
                    //
                    // Fall back to `undefined` if empty string returned.
                    // This collapses a missing definition with property defined
                    // and set to an empty string but there's no standard API
                    // allowing us to differentiate them without a performance penalty
                    // and returning `undefined` aligns with older jQuery.
                    //
                    // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
                    // as whitespace while CSS does not, but this is not a problem
                    // because CSS preprocessing replaces them with U+000A LINE FEED
                    // (which *is* CSS whitespace)
                    // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
                    ret = ret.replace(rtrimCSS, "$1") || undefined;
                }
                if (ret === "" && !isAttached(elem)) {
                    ret = jQuery.style(elem, name);
                }
                // A tribute to the "awesome hack by Dean Edwards"
                // Android Browser returns percentage for some values,
                // but width seems to be reliably pixels.
                // This is against the CSSOM draft spec:
                // https://drafts.csswg.org/cssom/#resolved-values
                if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret !== undefined ?
                // Support: IE <=9 - 11 only
                // IE returns zIndex value as an integer.
                ret + "" :
                ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
                get: function () {
                    if (conditionFn()) {
                        // Hook not needed (or it's not possible to use it due
                        // to missing dependency), remove it.
                        delete this.get;
                        return;
                    }
                    // Hook needed; redefine it so that the support test is not executed again.
                    return (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document.createElement("div").style, vendorProps = {};
        // Return a vendor-prefixed property or undefined
        function vendorPropName(name) {
            // Check for vendor prefixed names
            var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        }
        // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
        function finalPropName(name) {
            var final = jQuery.cssProps[name] || vendorProps[name];
            if (final) {
                return final;
            }
            if (name in emptyStyle) {
                return name;
            }
            return vendorProps[name] = vendorPropName(name) || name;
        }
        var 
        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        };
        function setPositiveNumber(_elem, value, subtract) {
            // Any relative (+/-) values have already been
            // normalized at this point
            var matches = rcssNum.exec(value);
            return matches ?
                // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
                value;
        }
        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
            var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
            // Adjustment may not be necessary
            if (box === (isBorderBox ? "border" : "content")) {
                return 0;
            }
            for (; i < 4; i += 2) {
                // Both box models exclude margin
                // Count margin delta separately to only add it after scroll gutter adjustment.
                // This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
                if (box === "margin") {
                    marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
                }
                // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
                if (!isBorderBox) {
                    // Add padding
                    delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    // For "border" or "margin", add border
                    if (box !== "padding") {
                        delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                        // But still keep track of it otherwise
                    }
                    else {
                        extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                    // If we get here with a border-box (content + padding + border), we're seeking "content" or
                    // "padding" or "margin"
                }
                else {
                    // For "content", subtract padding
                    if (box === "content") {
                        delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    }
                    // For "content" or "padding", subtract border
                    if (box !== "margin") {
                        delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
            }
            // Account for positive content-box scroll gutter when requested by providing computedVal
            if (!isBorderBox && computedVal >= 0) {
                // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
                // Assuming integer scroll gutter, subtract the rest and round down
                delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                    computedVal -
                    delta -
                    extra -
                    0.5
                // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
                // Use an explicit zero to avoid NaN (gh-3964)
                )) || 0;
            }
            return delta + marginDelta;
        }
        function getWidthOrHeight(elem, dimension, extra) {
            // Start with computed style
            var styles = getStyles(elem), 
            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
            // Fake content-box until we know it's needed to know the true value.
            boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded &&
                jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
            // Support: Firefox <=54
            // Return a confounding non-pixel value or feign ignorance, as appropriate.
            if (rnumnonpx.test(val)) {
                if (!extra) {
                    return val;
                }
                val = "auto";
            }
            // Support: IE 9 - 11 only
            // Use offsetWidth/offsetHeight for when box sizing is unreliable.
            // In those cases, the computed value can be trusted to be border-box.
            if ((!support.boxSizingReliable() && isBorderBox ||
                // Support: IE 10 - 11+, Edge 15 - 18+
                // IE/Edge misreport `getComputedStyle` of table rows with width/height
                // set in CSS while `offset*` properties report correct values.
                // Interestingly, in some cases IE 9 doesn't suffer from this issue.
                !support.reliableTrDimensions() && nodeName(elem, "tr") ||
                // Fall back to offsetWidth/offsetHeight when value is "auto"
                // This happens for inline elements with no explicit setting (gh-3571)
                val === "auto" ||
                // Support: Android <=4.1 - 4.3 only
                // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
                !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
                // Make sure the element is visible & connected
                elem.getClientRects().length) {
                isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
                // Where available, offsetWidth/offsetHeight approximate border box dimensions.
                // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
                // retrieved value as a content box dimension.
                valueIsBorderBox = offsetProp in elem;
                if (valueIsBorderBox) {
                    val = elem[offsetProp];
                }
            }
            // Normalize "" and auto
            val = parseFloat(val) || 0;
            // Adjust for the element's box model
            return (val +
                boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, 
                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val)) + "px";
        }
        jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            // We should always get a number back from opacity
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },
            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
                animationIterationCount: true,
                aspectRatio: true,
                borderImageSlice: true,
                columnCount: true,
                flexGrow: true,
                flexShrink: true,
                fontWeight: true,
                gridArea: true,
                gridColumn: true,
                gridColumnEnd: true,
                gridColumnStart: true,
                gridRow: true,
                gridRowEnd: true,
                gridRowStart: true,
                lineHeight: true,
                opacity: true,
                order: true,
                orphans: true,
                scale: true,
                widows: true,
                zIndex: true,
                zoom: true,
                // SVG-related
                fillOpacity: true,
                floodOpacity: true,
                stopOpacity: true,
                strokeMiterlimit: true,
                strokeOpacity: true
            },
            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {},
            // Get and set the style property on a DOM Node
            style: function (elem, name, value, extra) {
                // Don't set styles on text and comment nodes
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }
                // Make sure that we're working with the right name
                var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
                // Make sure that we're working with the right name. We don't
                // want to query the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Gets hook for the prefixed version, then unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // Check if we're setting a value
                if (value !== undefined) {
                    type = typeof value;
                    // Convert "+=" or "-=" to relative numbers (trac-7345)
                    if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                        value = adjustCSS(elem, name, ret);
                        // Fixes bug trac-9237
                        type = "number";
                    }
                    // Make sure that null and NaN values aren't set (trac-7116)
                    if (value == null || value !== value) {
                        return;
                    }
                    // If a number was passed in, add the unit (except for certain CSS properties)
                    // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
                    // "px" to a few hardcoded values.
                    if (type === "number" && !isCustomProp) {
                        value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                    }
                    // background-* props affect original clone's values
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit";
                    }
                    // If a hook was provided, use that value, otherwise just set the specified value
                    if (!hooks || !("set" in hooks) ||
                        (value = hooks.set(elem, value, extra)) !== undefined) {
                        if (isCustomProp) {
                            style.setProperty(name, value);
                        }
                        else {
                            style[name] = value;
                        }
                    }
                }
                else {
                    // If a hook was provided get the non-computed value from there
                    if (hooks && "get" in hooks &&
                        (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret;
                    }
                    // Otherwise just get the value from the style object
                    return style[name];
                }
            },
            css: function (elem, name, extra, styles) {
                var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
                // Make sure that we're working with the right name. We don't
                // want to modify the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Try prefixed name followed by the unprefixed name
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // If a hook was provided get the computed value from there
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }
                // Otherwise, if a way to get the computed value exists, use that
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }
                // Convert "normal" to computed value
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }
                // Make numeric if forced or a qualifier was provided and val looks numeric
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || isFinite(num) ? num || 0 : val;
                }
                return val;
            }
        });
        jQuery.each(["height", "width"], function (_i, dimension) {
            jQuery.cssHooks[dimension] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        // Certain elements can have dimension info if we invisibly show them
                        // but it must have a current display style that would benefit
                        return rdisplayswap.test(jQuery.css(elem, "display")) &&
                            // Support: Safari 8+
                            // Table columns in Safari have non-zero offsetWidth & zero
                            // getBoundingClientRect().width unless display is changed.
                            // Support: IE <=11 only
                            // Running getBoundingClientRect on a disconnected node
                            // in IE throws an error.
                            (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                            swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, dimension, extra);
                            }) :
                            getWidthOrHeight(elem, dimension, extra);
                    }
                },
                set: function (elem, value, extra) {
                    var matches, styles = getStyles(elem), 
                    // Only read styles.position if the test has a chance to fail
                    // to avoid forcing a reflow.
                    scrollboxSizeBuggy = !support.scrollboxSize() &&
                        styles.position === "absolute", 
                    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
                    boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded &&
                        jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ?
                        boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) :
                        0;
                    // Account for unreliable border-box dimensions by comparing offset* to computed and
                    // faking a content-box to get border and padding (gh-3699)
                    if (isBorderBox && scrollboxSizeBuggy) {
                        subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                            parseFloat(styles[dimension]) -
                            boxModelAdjustment(elem, dimension, "border", false, styles) -
                            0.5);
                    }
                    // Convert to pixels if value adjustment is needed
                    if (subtract && (matches = rcssNum.exec(value)) &&
                        (matches[3] || "px") !== "px") {
                        elem.style[dimension] = value;
                        value = jQuery.css(elem, dimension);
                    }
                    return setPositiveNumber(elem, value, subtract);
                }
            };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                        swap(elem, { marginLeft: 0 }, function () {
                            return elem.getBoundingClientRect().left;
                        })) + "px";
            }
        });
        // These hooks are used by animate to expand properties
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0, expanded = {}, 
                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];
                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] =
                            parts[i] || parts[i - 2] || parts[0];
                    }
                    return expanded;
                }
            };
            if (prefix !== "margin") {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
        jQuery.fn.extend({
            css: function (name, value) {
                return access(this, function (elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (Array.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (; i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], false, styles);
                        }
                        return map;
                    }
                    return value !== undefined ?
                        jQuery.style(elem, name, value) :
                        jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            }
        });
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || jQuery.easing._default;
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ?
                    hooks.get(this) :
                    Tween.propHooks._default.get(this);
            },
            run: function (percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                }
                else {
                    this.pos = eased = percent;
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (hooks && hooks.set) {
                    hooks.set(this);
                }
                else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;
                    // Use a property on the element directly when it is not a DOM element,
                    // or when there is no matching style property that exists.
                    if (tween.elem.nodeType !== 1 ||
                        tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                        return tween.elem[tween.prop];
                    }
                    // Passing an empty string as a 3rd parameter to .css will automatically
                    // attempt a parseFloat and fallback to a string if the parse fails.
                    // Simple values such as "10px" are parsed to Float;
                    // complex values such as "rotate(1rad)" are returned as-is.
                    result = jQuery.css(tween.elem, tween.prop, "");
                    // Empty strings, null, undefined and "auto" are converted to 0.
                    return !result || result === "auto" ? 0 : result;
                },
                set: function (tween) {
                    // Use step hook for back compat.
                    // Use cssHook if its there.
                    // Use .style if available and use plain properties where available.
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    }
                    else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] ||
                        tween.elem.style[finalPropName(tween.prop)] != null)) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    }
                    else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };
        // Support: IE <=9 only
        // Panic based approach to setting things on disconnected nodes
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };
        jQuery.easing = {
            linear: function (p) {
                return p;
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        // Back compat <1.8 extension point
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
            if (inProgress) {
                if (document.hidden === false && window.requestAnimationFrame) {
                    window.requestAnimationFrame(schedule);
                }
                else {
                    window.setTimeout(schedule, jQuery.fx.interval);
                }
                jQuery.fx.tick();
            }
        }
        // Animations created synchronously will run synchronously
        function createFxNow() {
            window.setTimeout(function () {
                fxNow = undefined;
            });
            return (fxNow = Date.now());
        }
        // Generate parameters to create a standard animation
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = { height: type };
            // If we include width, step value is 1 to do all cssExpand values,
            // otherwise step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type;
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type;
            }
            return attrs;
        }
        function createTween(value, prop, animation) {
            var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
            for (; index < length; index++) {
                if ((tween = collection[index].call(animation, prop, value))) {
                    // We're done with this property
                    return tween;
                }
            }
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
            // Queue-skipping animations hijack the fx hooks
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function () {
                        if (!hooks.unqueued) {
                            oldfire();
                        }
                    };
                }
                hooks.unqueued++;
                anim.always(function () {
                    // Ensure the complete handler is called before this completes
                    anim.always(function () {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire();
                        }
                    });
                });
            }
            // Detect show/hide animations
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.test(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ? "hide" : "show")) {
                        // Pretend to be hidden if this is a "show" and
                        // there is still data from a stopped show/hide
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = true;
                            // Ignore all other no-op show/hide data
                        }
                        else {
                            continue;
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                }
            }
            // Bail out if this is a no-op like .hide().hide()
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
                return;
            }
            // Restrict "overflow" and "display" styles during box animations
            if (isBox && elem.nodeType === 1) {
                // Support: IE <=9 - 11, Edge 12 - 15
                // Record all 3 overflow attributes because IE does not infer the shorthand
                // from identically-valued overflowX and overflowY and Edge just mirrors
                // the overflowX value there.
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                // Identify a display type, preferring old show/hide data over the CSS cascade
                restoreDisplay = dataShow && dataShow.display;
                if (restoreDisplay == null) {
                    restoreDisplay = dataPriv.get(elem, "display");
                }
                display = jQuery.css(elem, "display");
                if (display === "none") {
                    if (restoreDisplay) {
                        display = restoreDisplay;
                    }
                    else {
                        // Get nonempty value(s) by temporarily forcing visibility
                        showHide([elem], true);
                        restoreDisplay = elem.style.display || restoreDisplay;
                        display = jQuery.css(elem, "display");
                        showHide([elem]);
                    }
                }
                // Animate inline elements as inline-block
                if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                    if (jQuery.css(elem, "float") === "none") {
                        // Restore the original display value at the end of pure show/hide animations
                        if (!propTween) {
                            anim.done(function () {
                                style.display = restoreDisplay;
                            });
                            if (restoreDisplay == null) {
                                display = style.display;
                                restoreDisplay = display === "none" ? "" : display;
                            }
                        }
                        style.display = "inline-block";
                    }
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
            // Implement show/hide animations
            propTween = false;
            for (prop in orig) {
                // General show/hide setup for this element animation
                if (!propTween) {
                    if (dataShow) {
                        if ("hidden" in dataShow) {
                            hidden = dataShow.hidden;
                        }
                    }
                    else {
                        dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                    }
                    // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                    if (toggle) {
                        dataShow.hidden = !hidden;
                    }
                    // Show elements before animating them
                    if (hidden) {
                        showHide([elem], true);
                    }
                    /* eslint-disable no-loop-func */
                    anim.done(function () {
                        /* eslint-enable no-loop-func */
                        // The final step of a "hide" animation is actually hiding the element
                        if (!hidden) {
                            showHide([elem]);
                        }
                        dataPriv.remove(elem, "fxshow");
                        for (prop in orig) {
                            jQuery.style(elem, prop, orig[prop]);
                        }
                    });
                }
                // Per-property setup
                propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = propTween.start;
                    if (hidden) {
                        propTween.end = propTween.start;
                        propTween.start = 0;
                    }
                }
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
                name = camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (Array.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    // Not quite $.extend, this won't overwrite existing keys.
                    // Reusing 'index' because we have the correct "name"
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                }
                else {
                    specialEasing[name] = easing;
                }
            }
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
                // Don't match elem in the :animated selector
                delete tick.elem;
            }), tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), 
                // Support: Android 2.3 only
                // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
                temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                // If there's more to do, yield
                if (percent < 1 && length) {
                    return remaining;
                }
                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                }
                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0, 
                    // If we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    }
                    else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }), props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index++) {
                result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    if (isFunction(result.stop)) {
                        jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                            result.stop.bind(result);
                    }
                    return result;
                }
            }
            jQuery.map(props, createTween, animation);
            if (isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation);
            }
            // Attach callbacks from options
            animation
                .progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always);
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            }));
            return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [function (prop, value) {
                        var tween = this.createTween(prop, value);
                        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                        return tween;
                    }]
            },
            tweener: function (props, callback) {
                if (isFunction(props)) {
                    callback = props;
                    props = ["*"];
                }
                else {
                    props = props.match(rnothtmlwhite);
                }
                var prop, index = 0, length = props.length;
                for (; index < length; index++) {
                    prop = props[index];
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                    Animation.tweeners[prop].unshift(callback);
                }
            },
            prefilters: [defaultPrefilter],
            prefilter: function (callback, prepend) {
                if (prepend) {
                    Animation.prefilters.unshift(callback);
                }
                else {
                    Animation.prefilters.push(callback);
                }
            }
        });
        jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing ||
                    isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !isFunction(easing) && easing
            };
            // Go to the end state if fx are off
            if (jQuery.fx.off) {
                opt.duration = 0;
            }
            else {
                if (typeof opt.duration !== "number") {
                    if (opt.duration in jQuery.fx.speeds) {
                        opt.duration = jQuery.fx.speeds[opt.duration];
                    }
                    else {
                        opt.duration = jQuery.fx.speeds._default;
                    }
                }
            }
            // Normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            // Queueing
            opt.old = opt.complete;
            opt.complete = function () {
                if (isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };
            return opt;
        };
        jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {
                // Show any hidden elements after setting opacity to 0
                return this.filter(isHiddenWithinTree).css("opacity", 0).show()
                    // Animate to the value specified
                    .end().animate({ opacity: to }, speed, easing, callback);
            },
            animate: function (prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === false ?
                    this.each(doAnimation) :
                    this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
                var stopQueue = function (hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue) {
                    this.queue(type || "fx", []);
                }
                return this.each(function () {
                    var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index]);
                        }
                    }
                    else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index]);
                            }
                        }
                    }
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this &&
                            (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = false;
                            timers.splice(index, 1);
                        }
                    }
                    // Start the next in the queue if the last step wasn't forced.
                    // Timers currently will call their complete callbacks, which
                    // will dequeue but only if they were gotoEnd.
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            finish: function (type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function () {
                    var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                    // Enable finishing flag on private data
                    data.finish = true;
                    // Empty the queue first
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, true);
                    }
                    // Look for any active animations, and finish them
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(true);
                            timers.splice(index, 1);
                        }
                    }
                    // Look for any animations in the old queue and finish them
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this);
                        }
                    }
                    // Turn off finishing flag
                    delete data.finish;
                });
            }
        });
        jQuery.each(["toggle", "show", "hide"], function (_i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ?
                    cssFn.apply(this, arguments) :
                    this.animate(genFx(name, true), speed, easing, callback);
            };
        });
        // Generate shortcuts for custom animations
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: { opacity: "show" },
            fadeOut: { opacity: "hide" },
            fadeToggle: { opacity: "toggle" }
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function () {
            var timer, i = 0, timers = jQuery.timers;
            fxNow = Date.now();
            for (; i < timers.length; i++) {
                timer = timers[i];
                // Run the timer and safely remove it when done (allowing for external removal)
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
            fxNow = undefined;
        };
        jQuery.fx.timer = function (timer) {
            jQuery.timers.push(timer);
            jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function () {
            if (inProgress) {
                return;
            }
            inProgress = true;
            schedule();
        };
        jQuery.fx.stop = function () {
            inProgress = null;
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };
        // Based off of the plugin by Clint Helfers, with permission.
        jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function () {
                    window.clearTimeout(timeout);
                };
            });
        };
        (function () {
            var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            // Support: Android <=4.3 only
            // Default value for a checkbox should be "on"
            support.checkOn = input.value !== "";
            // Support: IE <=11 only
            // Must access selectedIndex to make default options select
            support.optSelected = opt.selected;
            // Support: IE <=11 only
            // An input loses its value after becoming a radio
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function (name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function (name) {
                return this.each(function () {
                    jQuery.removeAttr(this, name);
                });
            }
        });
        jQuery.extend({
            attr: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set attributes on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                // Fallback to prop when attributes are not supported
                if (typeof elem.getAttribute === "undefined") {
                    return jQuery.prop(elem, name, value);
                }
                // Attribute hooks are determined by the lowercase version
                // Grab necessary hook if one is defined
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    hooks = jQuery.attrHooks[name.toLowerCase()] ||
                        (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                        return;
                    }
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    elem.setAttribute(name, value + "");
                    return value;
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                ret = jQuery.find.attr(elem, name);
                // Non-existent attributes return null, we normalize to undefined
                return ret == null ? undefined : ret;
            },
            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!support.radioValue && value === "radio" &&
                            nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            },
            removeAttr: function (elem, value) {
                var name, i = 0, 
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);
                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        elem.removeAttribute(name);
                    }
                }
            }
        });
        // Hooks for boolean attributes
        boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr(elem, name);
                }
                else {
                    elem.setAttribute(name, name);
                }
                return name;
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function (elem, name, isXML) {
                var ret, handle, lowercaseName = name.toLowerCase();
                if (!isXML) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[lowercaseName];
                    attrHandle[lowercaseName] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        lowercaseName :
                        null;
                    attrHandle[lowercaseName] = handle;
                }
                return ret;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function (name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function (name) {
                return this.each(function () {
                    delete this[jQuery.propFix[name] || name];
                });
            }
        });
        jQuery.extend({
            prop: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set properties on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    // Fix name and attach hooks
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }
                if (value !== undefined) {
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    return (elem[name] = value);
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                return elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        // Support: IE <=9 - 11 only
                        // elem.tabIndex doesn't always return the
                        // correct value when it hasn't been explicitly set
                        // Use proper attribute retrieval (trac-12072)
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        if (tabindex) {
                            return parseInt(tabindex, 10);
                        }
                        if (rfocusable.test(elem.nodeName) ||
                            rclickable.test(elem.nodeName) &&
                                elem.href) {
                            return 0;
                        }
                        return -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        // Support: IE <=11 only
        // Accessing the selectedIndex property
        // forces the browser to respect setting selected
        // on the option
        // The getter ensures a default option is selected
        // when in an optgroup
        // eslint rule "no-unused-expressions" is disabled for this code
        // since it considers such accessions noop
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                    return null;
                },
                set: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
            };
        }
        jQuery.each([
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable"
        ], function () {
            jQuery.propFix[this.toLowerCase()] = this;
        });
        // Strip and collapse whitespace according to HTML spec
        // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
        function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ");
        }
        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function classesToArray(value) {
            if (Array.isArray(value)) {
                return value;
            }
            if (typeof value === "string") {
                return value.match(rnothtmlwhite) || [];
            }
            return [];
        }
        jQuery.fn.extend({
            addClass: function (value) {
                var classNames, cur, curValue, className, i, finalValue;
                if (isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).addClass(value.call(this, j, getClass(this)));
                    });
                }
                classNames = classesToArray(value);
                if (classNames.length) {
                    return this.each(function () {
                        curValue = getClass(this);
                        cur = this.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            for (i = 0; i < classNames.length; i++) {
                                className = classNames[i];
                                if (cur.indexOf(" " + className + " ") < 0) {
                                    cur += className + " ";
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                this.setAttribute("class", finalValue);
                            }
                        }
                    });
                }
                return this;
            },
            removeClass: function (value) {
                var classNames, cur, curValue, className, i, finalValue;
                if (isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).removeClass(value.call(this, j, getClass(this)));
                    });
                }
                if (!arguments.length) {
                    return this.attr("class", "");
                }
                classNames = classesToArray(value);
                if (classNames.length) {
                    return this.each(function () {
                        curValue = getClass(this);
                        // This expression is here for better compressibility (see addClass)
                        cur = this.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            for (i = 0; i < classNames.length; i++) {
                                className = classNames[i];
                                // Remove *all* instances
                                while (cur.indexOf(" " + className + " ") > -1) {
                                    cur = cur.replace(" " + className + " ", " ");
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                this.setAttribute("class", finalValue);
                            }
                        }
                    });
                }
                return this;
            },
            toggleClass: function (value, stateVal) {
                var classNames, className, i, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
                if (isFunction(value)) {
                    return this.each(function (i) {
                        jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                    });
                }
                if (typeof stateVal === "boolean" && isValidValue) {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }
                classNames = classesToArray(value);
                return this.each(function () {
                    if (isValidValue) {
                        // Toggle individual class names
                        self = jQuery(this);
                        for (i = 0; i < classNames.length; i++) {
                            className = classNames[i];
                            // Check each className given, space separated list
                            if (self.hasClass(className)) {
                                self.removeClass(className);
                            }
                            else {
                                self.addClass(className);
                            }
                        }
                        // Toggle whole class name
                    }
                    else if (value === undefined || type === "boolean") {
                        className = getClass(this);
                        if (className) {
                            // Store className if set
                            dataPriv.set(this, "__className__", className);
                        }
                        // If the element has a class name or if we're passed `false`,
                        // then remove the whole classname (if there was one, the above saved it).
                        // Otherwise bring back whatever was previously saved (if anything),
                        // falling back to the empty string if nothing was stored.
                        if (this.setAttribute) {
                            this.setAttribute("class", className || value === false ?
                                "" :
                                dataPriv.get(this, "__className__") || "");
                        }
                    }
                });
            },
            hasClass: function (selector) {
                var className, elem, i = 0;
                className = " " + selector + " ";
                while ((elem = this[i++])) {
                    if (elem.nodeType === 1 &&
                        (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                        return true;
                    }
                }
                return false;
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function (value) {
                var hooks, ret, valueIsFunction, elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] ||
                            jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks &&
                            "get" in hooks &&
                            (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }
                        ret = elem.value;
                        // Handle most common string cases
                        if (typeof ret === "string") {
                            return ret.replace(rreturn, "");
                        }
                        // Handle cases where value is null/undef or number
                        return ret == null ? "" : ret;
                    }
                    return;
                }
                valueIsFunction = isFunction(value);
                return this.each(function (i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (valueIsFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    }
                    else {
                        val = value;
                    }
                    // Treat null/undefined as ""; convert numbers to string
                    if (val == null) {
                        val = "";
                    }
                    else if (typeof val === "number") {
                        val += "";
                    }
                    else if (Array.isArray(val)) {
                        val = jQuery.map(val, function (value) {
                            return value == null ? "" : value + "";
                        });
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    // If set returns undefined, fall back to normal setting
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ?
                            val :
                            // Support: IE <=10 - 11 only
                            // option.text throws exceptions (trac-14686, trac-14858)
                            // Strip and collapse whitespace
                            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                            stripAndCollapse(jQuery.text(elem));
                    }
                },
                select: {
                    get: function (elem) {
                        var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                        if (index < 0) {
                            i = max;
                        }
                        else {
                            i = one ? index : 0;
                        }
                        // Loop through all the selected options
                        for (; i < max; i++) {
                            option = options[i];
                            // Support: IE <=9 only
                            // IE8-9 doesn't update selected after form reset (trac-2551)
                            if ((option.selected || i === index) &&
                                // Don't return options that are disabled or in a disabled optgroup
                                !option.disabled &&
                                (!option.parentNode.disabled ||
                                    !nodeName(option.parentNode, "optgroup"))) {
                                // Get the specific value for the option
                                value = jQuery(option).val();
                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }
                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }
                        return values;
                    },
                    set: function (elem, value) {
                        var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                        while (i--) {
                            option = options[i];
                            /* eslint-disable no-cond-assign */
                            if (option.selected =
                                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                optionSet = true;
                            }
                            /* eslint-enable no-cond-assign */
                        }
                        // Force browsers to behave consistently when non-matching value is set
                        if (!optionSet) {
                            elem.selectedIndex = -1;
                        }
                        return values;
                    }
                }
            }
        });
        // Radios and checkboxes getter/setter
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (Array.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
        // Return jQuery for attributes-only inclusion
        var location = window.location;
        var nonce = { guid: Date.now() };
        var rquery = (/\?/);
        // Cross-browser xml parsing
        jQuery.parseXML = function (data) {
            var xml, parserErrorElem;
            if (!data || typeof data !== "string") {
                return null;
            }
            // Support: IE 9 - 11 only
            // IE throws on parseFromString with invalid input.
            try {
                xml = (new window.DOMParser()).parseFromString(data, "text/xml");
            }
            catch (e) { }
            parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
            if (!xml || parserErrorElem) {
                jQuery.error("Invalid XML: " + (parserErrorElem ?
                    jQuery.map(parserErrorElem.childNodes, function (el) {
                        return el.textContent;
                    }).join("\n") :
                    data));
            }
            return xml;
        };
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function (e) {
            e.stopPropagation();
        };
        jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = lastElement = tmp = elem = elem || document;
                // Don't do events on text and comment nodes
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return;
                }
                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return;
                }
                if (type.indexOf(".") > -1) {
                    // Namespaced trigger; create a regexp to match event type in handle()
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort();
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                // Caller can pass in a jQuery.Event object, Object, or just an event type string
                event = event[jQuery.expando] ?
                    event :
                    new jQuery.Event(type, typeof event === "object" && event);
                // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.rnamespace = event.namespace ?
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                    null;
                // Clean up the event in case it is being reused
                event.result = undefined;
                if (!event.target) {
                    event.target = elem;
                }
                // Clone any incoming data and prepend the event, creating the handler arg list
                data = data == null ?
                    [event] :
                    jQuery.makeArray(data, [event]);
                // Allow special events to draw outside the lines
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return;
                }
                // Determine event propagation path in advance, per W3C events spec (trac-9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
                if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode;
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur;
                    }
                    // Only add window if we got to document (e.g., not plain obj or detached DOM)
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                }
                // Fire handlers on the event path
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    lastElement = cur;
                    event.type = i > 1 ?
                        bubbleType :
                        special.bindType || type;
                    // jQuery handler
                    handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] &&
                        dataPriv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data);
                    }
                    // Native handler
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === false) {
                            event.preventDefault();
                        }
                    }
                }
                event.type = type;
                // If nobody prevented the default action, do it now
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default ||
                        special._default.apply(eventPath.pop(), data) === false) &&
                        acceptData(elem)) {
                        // Call a native DOM method on the target with the same name as the event.
                        // Don't do default actions on window, that's where global variables be (trac-6170)
                        if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                            // Don't re-trigger an onFOO event when we call its FOO() method
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null;
                            }
                            // Prevent re-triggering of the same event, since we already bubbled it above
                            jQuery.event.triggered = type;
                            if (event.isPropagationStopped()) {
                                lastElement.addEventListener(type, stopPropagationCallback);
                            }
                            elem[type]();
                            if (event.isPropagationStopped()) {
                                lastElement.removeEventListener(type, stopPropagationCallback);
                            }
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp;
                            }
                        }
                    }
                }
                return event.result;
            },
            // Piggyback on a donor event to simulate a different one
            // Used only for `focus(in | out)` events
            simulate: function (type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true
                });
                jQuery.event.trigger(e, null, elem);
            }
        });
        jQuery.fn.extend({
            trigger: function (type, data) {
                return this.each(function () {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function (type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (Array.isArray(obj)) {
                // Serialize array item.
                jQuery.each(obj, function (i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        // Treat each array item as a scalar.
                        add(prefix, v);
                    }
                    else {
                        // Item is non-scalar (array or object), encode its numeric index.
                        buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                    }
                });
            }
            else if (!traditional && toType(obj) === "object") {
                // Serialize object item.
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            }
            else {
                // Serialize scalar item.
                add(prefix, obj);
            }
        }
        // Serialize an array of form elements or a set of
        // key/values into a query string
        jQuery.param = function (a, traditional) {
            var prefix, s = [], add = function (key, valueOrFunction) {
                // If value is a function, invoke it and use its return value
                var value = isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;
                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };
            if (a == null) {
                return "";
            }
            // If an array was passed in, assume that it is an array of form elements.
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                // Serialize the form elements
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            }
            else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            // Return the resulting serialization
            return s.join("&");
        };
        jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                }).filter(function () {
                    var type = this.type;
                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                }).map(function (_i, elem) {
                    var val = jQuery(this).val();
                    if (val == null) {
                        return null;
                    }
                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        });
                    }
                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }).get();
            }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, 
        // trac-7653, trac-8125, trac-8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, 
        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {}, 
        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {}, 
        // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
        allTypes = "*/".concat("*"), 
        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
        originAnchor.href = location.href;
        // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
        function addToPrefiltersOrTransports(structure) {
            // dataTypeExpression is optional and defaults to "*"
            return function (dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }
                var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
                if (isFunction(func)) {
                    // For each dataType in the dataTypeExpression
                    while ((dataType = dataTypes[i++])) {
                        // Prepend if requested
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);
                            // Otherwise append
                        }
                        else {
                            (structure[dataType] = structure[dataType] || []).push(func);
                        }
                    }
                }
            };
        }
        // Base inspection function for prefilters and transports
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {}, seekingTransport = (structure === transports);
            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" &&
                        !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false;
                    }
                    else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport);
                    }
                });
                return selected;
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        // A special extend for ajax options
        // that takes "flat" options (not to be deep extended)
        // Fixes trac-9887
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }
            return target;
        }
        /* Handles responses to an ajax request:
         * - finds the right dataType (mediates between content-type and expected dataType)
         * - returns the corresponding response
         */
        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                }
            }
            // Check if we're dealing with a known content-type
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break;
                    }
                }
            }
            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0];
            }
            else {
                // Try convertible dataTypes
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    if (!firstDataType) {
                        firstDataType = type;
                    }
                }
                // Or just use first one
                finalDataType = finalDataType || firstDataType;
            }
            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType);
                }
                return responses[finalDataType];
            }
        }
        /* Chain conversions given the request and the original response
         * Also sets the responseXXX fields on the jqXHR instance
         */
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {}, 
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();
            // Create converters map with lowercased keys
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv];
                }
            }
            current = dataTypes.shift();
            // Convert to each sequential dataType
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response;
                }
                // Apply the dataFilter if provided
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    // There's only work to do if current dataType is non-auto
                    if (current === "*") {
                        current = prev;
                        // Convert response if prev dataType is non-auto and differs from current
                    }
                    else if (prev !== "*" && prev !== current) {
                        // Seek a direct converter
                        conv = converters[prev + " " + current] || converters["* " + current];
                        // If none found, seek a pair
                        if (!conv) {
                            for (conv2 in converters) {
                                // If conv2 outputs current
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    // If prev can be converted to accepted input
                                    conv = converters[prev + " " + tmp[0]] ||
                                        converters["* " + tmp[0]];
                                    if (conv) {
                                        // Condense equivalence converters
                                        if (conv === true) {
                                            conv = converters[conv2];
                                            // Otherwise, insert the intermediate dataType
                                        }
                                        else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        // Apply converter (if not an equivalence)
                        if (conv !== true) {
                            // Unless errors are allowed to bubble, catch and return them
                            if (conv && s.throws) {
                                response = conv(response);
                            }
                            else {
                                try {
                                    response = conv(response);
                                }
                                catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return { state: "success", data: response };
        }
        jQuery.extend({
            // Counter for holding the number of active queries
            active: 0,
            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                /*
                timeout: 0,
                data: null,
                dataType: null,
                username: null,
                password: null,
                cache: null,
                throws: false,
                traditional: false,
                headers: {},
                */
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                // Data converters
                // Keys separate source (or catchall "*") and destination types with a single space
                converters: {
                    // Convert anything to text
                    "* text": String,
                    // Text to html (true = no transformation)
                    "text html": true,
                    // Evaluate text as a json expression
                    "text json": JSON.parse,
                    // Parse text as xml
                    "text xml": jQuery.parseXML
                },
                // For options that shouldn't be deep extended:
                // you can add your own custom options here if
                // and when you create one that shouldn't be
                // deep extended (see ajaxExtend)
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function (target, settings) {
                return settings ?
                    // Building a settings object
                    ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
                    // Extending ajaxSettings
                    ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            // Main method
            ajax: function (url, options) {
                // If url is an object, simulate pre-1.5 signature
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }
                // Force options to be an object
                options = options || {};
                var transport, 
                // URL without anti-cache param
                cacheURL, 
                // Response headers
                responseHeadersString, responseHeaders, 
                // timeout handle
                timeoutTimer, 
                // Url cleanup var
                urlAnchor, 
                // Request state (becomes false upon send and true upon completion)
                completed, 
                // To know if global events are to be dispatched
                fireGlobals, 
                // Loop variable
                i, 
                // uncached part of the url
                uncached, 
                // Create the final options object
                s = jQuery.ajaxSetup({}, options), 
                // Callbacks context
                callbackContext = s.context || s, 
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event, 
                // Deferreds
                deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), 
                // Status-dependent callbacks
                statusCode = s.statusCode || {}, 
                // Headers (they are sent all at once)
                requestHeaders = {}, requestHeadersNames = {}, 
                // Default abort message
                strAbort = "canceled", 
                // Fake xhr
                jqXHR = {
                    readyState: 0,
                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase() + " "] =
                                        (responseHeaders[match[1].toLowerCase() + " "] || [])
                                            .concat(match[2]);
                                }
                            }
                            match = responseHeaders[key.toLowerCase() + " "];
                        }
                        return match == null ? null : match.join(", ");
                    },
                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },
                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                            else {
                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },
                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
                // Attach deferreds
                deferred.promise(jqXHR);
                // Add protocol if not provided (prefilters might expect it)
                // Handle falsy url in the settings object (trac-10093: consistency with old signature)
                // We also use the url parameter if available
                s.url = ((url || s.url || location.href) + "")
                    .replace(rprotocol, location.protocol + "//");
                // Alias method option to type as per ticket trac-12004
                s.type = options.method || options.type || s.method || s.type;
                // Extract dataTypes list
                s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
                // A cross-domain request is in order when the origin doesn't match the current origin.
                if (s.crossDomain == null) {
                    urlAnchor = document.createElement("a");
                    // Support: IE <=8 - 11, Edge 12 - 15
                    // IE throws exception on accessing the href property if url is malformed,
                    // e.g. http://example.com:80x/
                    try {
                        urlAnchor.href = s.url;
                        // Support: IE <=8 - 11 only
                        // Anchor's host property isn't correctly set when s.url is relative
                        urlAnchor.href = urlAnchor.href;
                        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                            urlAnchor.protocol + "//" + urlAnchor.host;
                    }
                    catch (e) {
                        // If there is an error parsing the URL, assume it is crossDomain,
                        // it can be rejected by the transport if it is invalid
                        s.crossDomain = true;
                    }
                }
                // Convert data if not already a string
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional);
                }
                // Apply prefilters
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                // If request was aborted inside a prefilter, stop there
                if (completed) {
                    return jqXHR;
                }
                // We can fire global events as of now if asked to
                // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
                fireGlobals = jQuery.event && s.global;
                // Watch for a new set of requests
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart");
                }
                // Uppercase the type
                s.type = s.type.toUpperCase();
                // Determine if request has content
                s.hasContent = !rnoContent.test(s.type);
                // Save the URL in case we're toying with the If-Modified-Since
                // and/or If-None-Match header later on
                // Remove hash to simplify url manipulation
                cacheURL = s.url.replace(rhash, "");
                // More options handling for requests with no content
                if (!s.hasContent) {
                    // Remember the hash so we can put it back
                    uncached = s.url.slice(cacheURL.length);
                    // If data is available and should be processed, append data to url
                    if (s.data && (s.processData || typeof s.data === "string")) {
                        cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                        // trac-9682: remove data so that it's not used in an eventual retry
                        delete s.data;
                    }
                    // Add or update anti-cache param if needed
                    if (s.cache === false) {
                        cacheURL = cacheURL.replace(rantiCache, "$1");
                        uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce.guid++) +
                            uncached;
                    }
                    // Put hash and anti-cache on the URL that will be requested (gh-1732)
                    s.url = cacheURL + uncached;
                    // Change '%20' to '+' if this is encoded form body content (gh-2658)
                }
                else if (s.data && s.processData &&
                    (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                    s.data = s.data.replace(r20, "+");
                }
                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                    }
                }
                // Set the correct header, if data is being sent
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType);
                }
                // Set the Accepts header for the server, depending on the dataType
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] +
                        (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                    s.accepts["*"]);
                // Check for headers option
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i]);
                }
                // Allow custom headers/mimetypes and early abort
                if (s.beforeSend &&
                    (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                    // Abort if not done already and return
                    return jqXHR.abort();
                }
                // Aborting is no longer a cancellation
                strAbort = "abort";
                // Install callbacks on deferreds
                completeDeferred.add(s.complete);
                jqXHR.done(s.success);
                jqXHR.fail(s.error);
                // Get transport
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                // If no transport, we auto-abort
                if (!transport) {
                    done(-1, "No Transport");
                }
                else {
                    jqXHR.readyState = 1;
                    // Send global event
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                    }
                    // If request was aborted inside ajaxSend, stop there
                    if (completed) {
                        return jqXHR;
                    }
                    // Timeout
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = window.setTimeout(function () {
                            jqXHR.abort("timeout");
                        }, s.timeout);
                    }
                    try {
                        completed = false;
                        transport.send(requestHeaders, done);
                    }
                    catch (e) {
                        // Rethrow post-completion exceptions
                        if (completed) {
                            throw e;
                        }
                        // Propagate others as results
                        done(-1, e);
                    }
                }
                // Callback for when everything is done
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    // Ignore repeat invocations
                    if (completed) {
                        return;
                    }
                    completed = true;
                    // Clear timeout if it exists
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer);
                    }
                    // Dereference transport for early garbage collection
                    // (no matter how long the jqXHR object will be used)
                    transport = undefined;
                    // Cache response headers
                    responseHeadersString = headers || "";
                    // Set readyState
                    jqXHR.readyState = status > 0 ? 4 : 0;
                    // Determine if successful
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    // Get response data
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses);
                    }
                    // Use a noop converter for missing script but not if jsonp
                    if (!isSuccess &&
                        jQuery.inArray("script", s.dataTypes) > -1 &&
                        jQuery.inArray("json", s.dataTypes) < 0) {
                        s.converters["text script"] = function () { };
                    }
                    // Convert no matter what (that way responseXXX fields are always set)
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    // If successful, handle type chaining
                    if (isSuccess) {
                        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified;
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified;
                            }
                        }
                        // if no content
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";
                            // if not modified
                        }
                        else if (status === 304) {
                            statusText = "notmodified";
                            // If we have data, let's convert it
                        }
                        else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error;
                        }
                    }
                    else {
                        // Extract error from statusText and normalize for non-aborts
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0;
                            }
                        }
                    }
                    // Set data for the fake xhr object
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    // Success/Error
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                    }
                    else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                    }
                    // Status-dependent callbacks
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                    }
                    // Complete
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        // Handle the global AJAX counter
                        if (!(--jQuery.active)) {
                            jQuery.event.trigger("ajaxStop");
                        }
                    }
                }
                return jqXHR;
            },
            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });
        jQuery.each(["get", "post"], function (_i, method) {
            jQuery[method] = function (url, data, callback, type) {
                // Shift arguments if data argument was omitted
                if (isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                // The url can be an options object (which then must have .url)
                return jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url));
            };
        });
        jQuery.ajaxPrefilter(function (s) {
            var i;
            for (i in s.headers) {
                if (i.toLowerCase() === "content-type") {
                    s.contentType = s.headers[i] || "";
                }
            }
        });
        jQuery._evalUrl = function (url, options, doc) {
            return jQuery.ajax({
                url: url,
                // Make this explicit, since user can override this through ajaxSetup (trac-11264)
                type: "GET",
                dataType: "script",
                cache: true,
                async: false,
                global: false,
                // Only evaluate the response if it is successful (gh-4126)
                // dataFilter is not invoked for failure responses, so using it instead
                // of the default converter is kludgy but it works.
                converters: {
                    "text script": function () { }
                },
                dataFilter: function (response) {
                    jQuery.globalEval(response, options, doc);
                }
            });
        };
        jQuery.fn.extend({
            wrapAll: function (html) {
                var wrap;
                if (this[0]) {
                    if (isFunction(html)) {
                        html = html.call(this[0]);
                    }
                    // The elements to wrap the target around
                    wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }
                    wrap.map(function () {
                        var elem = this;
                        while (elem.firstElementChild) {
                            elem = elem.firstElementChild;
                        }
                        return elem;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function (html) {
                if (isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }
                return this.each(function () {
                    var self = jQuery(this), contents = self.contents();
                    if (contents.length) {
                        contents.wrapAll(html);
                    }
                    else {
                        self.append(html);
                    }
                });
            },
            wrap: function (html) {
                var htmlIsFunction = isFunction(html);
                return this.each(function (i) {
                    jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function (selector) {
                this.parent(selector).not("body").each(function () {
                    jQuery(this).replaceWith(this.childNodes);
                });
                return this;
            }
        });
        jQuery.expr.pseudos.hidden = function (elem) {
            return !jQuery.expr.pseudos.visible(elem);
        };
        jQuery.expr.pseudos.visible = function (elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function () {
            try {
                return new window.XMLHttpRequest();
            }
            catch (e) { }
        };
        var xhrSuccessStatus = {
            // File protocol always yields status code 0, assume 200
            0: 200,
            // Support: IE <=9 only
            // trac-1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function (options) {
            var callback, errorCallback;
            // Cross domain only allowed if supported through XMLHttpRequest
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function (headers, complete) {
                        var i, xhr = options.xhr();
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        // Set headers
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                        // Callback
                        callback = function (type) {
                            return function () {
                                if (callback) {
                                    callback = errorCallback = xhr.onload =
                                        xhr.onerror = xhr.onabort = xhr.ontimeout =
                                            xhr.onreadystatechange = null;
                                    if (type === "abort") {
                                        xhr.abort();
                                    }
                                    else if (type === "error") {
                                        // Support: IE <=9 only
                                        // On a manual native abort, IE9 throws
                                        // errors on any property access that is not readyState
                                        if (typeof xhr.status !== "number") {
                                            complete(0, "error");
                                        }
                                        else {
                                            complete(
                                            // File: protocol always yields status 0; see trac-8605, trac-14207
                                            xhr.status, xhr.statusText);
                                        }
                                    }
                                    else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, 
                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        (xhr.responseType || "text") !== "text" ||
                                            typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText }, xhr.getAllResponseHeaders());
                                    }
                                }
                            };
                        };
                        // Listen to events
                        xhr.onload = callback();
                        errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                        // Support: IE 9 only
                        // Use onreadystatechange to replace onabort
                        // to handle uncaught aborts
                        if (xhr.onabort !== undefined) {
                            xhr.onabort = errorCallback;
                        }
                        else {
                            xhr.onreadystatechange = function () {
                                // Check readyState before timeout as it changes
                                if (xhr.readyState === 4) {
                                    // Allow onerror to be called first,
                                    // but that will not handle a native abort
                                    // Also, save errorCallback to a variable
                                    // as xhr.onerror cannot be accessed
                                    window.setTimeout(function () {
                                        if (callback) {
                                            errorCallback();
                                        }
                                    });
                                }
                            };
                        }
                        // Create the abort callback
                        callback = callback("abort");
                        try {
                            // Do send the request (this may raise an exception)
                            xhr.send(options.hasContent && options.data || null);
                        }
                        catch (e) {
                            // trac-14683: Only rethrow if this hasn't been notified as an error yet
                            if (callback) {
                                throw e;
                            }
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
        jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false;
            }
        });
        // Install script dataType
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, " +
                    "application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });
        // Handle cache's special case and crossDomain
        jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
            }
        });
        // Bind script tag hack transport
        jQuery.ajaxTransport("script", function (s) {
            // This transport only deals with cross domain or forced-by-attrs requests
            if (s.crossDomain || s.scriptAttrs) {
                var script, callback;
                return {
                    send: function (_, complete) {
                        script = jQuery("<script>")
                            .attr(s.scriptAttrs || {})
                            .prop({ charset: s.scriptCharset, src: s.url })
                            .on("load error", callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        });
                        // Use native DOM manipulation to avoid our domManip AJAX trickery
                        document.head.appendChild(script[0]);
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        // Default jsonp settings
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
                this[callback] = true;
                return callback;
            }
        });
        // Detect, normalize options and install callbacks for jsonp requests
        jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                    (s.contentType || "")
                        .indexOf("application/x-www-form-urlencoded") === 0 &&
                    rjsonp.test(s.data) && "data");
            // Handle iff the expected data type is "jsonp" or we have a parameter to set
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                    s.jsonpCallback() :
                    s.jsonpCallback;
                // Insert callback into url or form data
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                }
                else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                }
                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };
                // Force json dataType
                s.dataTypes[0] = "json";
                // Install callback
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments;
                };
                // Clean-up function (fires after converters)
                jqXHR.always(function () {
                    // If previous value didn't exist - remove it
                    if (overwritten === undefined) {
                        jQuery(window).removeProp(callbackName);
                        // Otherwise restore preexisting value
                    }
                    else {
                        window[callbackName] = overwritten;
                    }
                    // Save back as free
                    if (s[callbackName]) {
                        // Make sure that re-using the options doesn't screw things around
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        // Save the callback name for future use
                        oldCallbacks.push(callbackName);
                    }
                    // Call if it was a function and we have a response
                    if (responseContainer && isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }
                    responseContainer = overwritten = undefined;
                });
                // Delegate to script
                return "script";
            }
        });
        // Support: Safari 8 only
        // In Safari 8 documents created via document.implementation.createHTMLDocument
        // collapse sibling forms: the second one becomes a child of the first one.
        // Because of that, this security measure has to be disabled in Safari 8.
        // https://bugs.webkit.org/show_bug.cgi?id=137337
        support.createHTMLDocument = (function () {
            var body = document.implementation.createHTMLDocument("").body;
            body.innerHTML = "<form></form><form></form>";
            return body.childNodes.length === 2;
        })();
        // Argument "data" should be string of html
        // context (optional): If specified, the fragment will be created in this context,
        // defaults to document
        // keepScripts (optional): If true, will include scripts passed in the html string
        jQuery.parseHTML = function (data, context, keepScripts) {
            if (typeof data !== "string") {
                return [];
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            var base, parsed, scripts;
            if (!context) {
                // Stop scripts or inline event handlers from being executed immediately
                // by using document.implementation
                if (support.createHTMLDocument) {
                    context = document.implementation.createHTMLDocument("");
                    // Set the base href for the created document
                    // so any parsed elements with URLs
                    // are based on the document's URL (gh-2965)
                    base = context.createElement("base");
                    base.href = document.location.href;
                    context.head.appendChild(base);
                }
                else {
                    context = document;
                }
            }
            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];
            // Single tag
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove();
            }
            return jQuery.merge([], parsed.childNodes);
        };
        /**
         * Load a url into a page
         */
        jQuery.fn.load = function (url, params, callback) {
            var selector, type, response, self = this, off = url.indexOf(" ");
            if (off > -1) {
                selector = stripAndCollapse(url.slice(off));
                url = url.slice(0, off);
            }
            // If it's a function
            if (isFunction(params)) {
                // We assume that it's the callback
                callback = params;
                params = undefined;
                // Otherwise, build a param string
            }
            else if (params && typeof params === "object") {
                type = "POST";
            }
            // If we have elements to modify, make the request
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,
                    // If "type" variable is undefined, then "GET" method will be used.
                    // Make value of this field explicit since
                    // user can override it through ajaxSetup method
                    type: type || "GET",
                    dataType: "html",
                    data: params
                }).done(function (responseText) {
                    // Save response for use in complete callback
                    response = arguments;
                    self.html(selector ?
                        // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                        // Otherwise use the full result
                        responseText);
                    // If the request succeeds, this function gets "data", "status", "jqXHR"
                    // but they are ignored because response was set above.
                    // If it fails, this function gets "jqXHR", "status", "error"
                }).always(callback && function (jqXHR, status) {
                    self.each(function () {
                        callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                    });
                });
            }
            return this;
        };
        jQuery.expr.pseudos.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
        jQuery.offset = {
            setOffset: function (elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
                // Set position first, in-case top/left are set even on static elem
                if (position === "static") {
                    elem.style.position = "relative";
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") &&
                    (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                // Need to be able to calculate position if either
                // top or left is auto and position is either absolute or fixed
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                }
                else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }
                if (isFunction(options)) {
                    // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                    options = options.call(elem, i, jQuery.extend({}, curOffset));
                }
                if (options.top != null) {
                    props.top = (options.top - curOffset.top) + curTop;
                }
                if (options.left != null) {
                    props.left = (options.left - curOffset.left) + curLeft;
                }
                if ("using" in options) {
                    options.using.call(elem, props);
                }
                else {
                    curElem.css(props);
                }
            }
        };
        jQuery.fn.extend({
            // offset() relates an element's border box to the document origin
            offset: function (options) {
                // Preserve chaining for setter
                if (arguments.length) {
                    return options === undefined ?
                        this :
                        this.each(function (i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                }
                var rect, win, elem = this[0];
                if (!elem) {
                    return;
                }
                // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
                // Support: IE <=11 only
                // Running getBoundingClientRect on a
                // disconnected node in IE throws an error
                if (!elem.getClientRects().length) {
                    return { top: 0, left: 0 };
                }
                // Get document-relative position by adding viewport scroll to viewport-relative gBCR
                rect = elem.getBoundingClientRect();
                win = elem.ownerDocument.defaultView;
                return {
                    top: rect.top + win.pageYOffset,
                    left: rect.left + win.pageXOffset
                };
            },
            // position() relates an element's margin box to its offset parent's padding box
            // This corresponds to the behavior of CSS absolute positioning
            position: function () {
                if (!this[0]) {
                    return;
                }
                var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
                // position:fixed elements are offset from the viewport, which itself always has zero offset
                if (jQuery.css(elem, "position") === "fixed") {
                    // Assume position:fixed implies availability of getBoundingClientRect
                    offset = elem.getBoundingClientRect();
                }
                else {
                    offset = this.offset();
                    // Account for the *real* offset parent, which can be the document or its root element
                    // when a statically positioned element is identified
                    doc = elem.ownerDocument;
                    offsetParent = elem.offsetParent || doc.documentElement;
                    while (offsetParent &&
                        (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                        jQuery.css(offsetParent, "position") === "static") {
                        offsetParent = offsetParent.parentNode;
                    }
                    if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                        // Incorporate borders into its offset, since they are outside its content origin
                        parentOffset = jQuery(offsetParent).offset();
                        parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                        parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                    }
                }
                // Subtract parent offsets and element margins
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            },
            // This method will return documentElement in the following cases:
            // 1) For the element inside the iframe without offsetParent, this method will return
            //    documentElement of the parent window
            // 2) For the hidden or detached element
            // 3) For body or html element, i.e. in case of the html node - it will return itself
            //
            // but those exceptions were never presented as a real life use-cases
            // and might be considered as more preferable results.
            //
            // This logic, however, is not guaranteed and can change at any point in the future
            offsetParent: function () {
                return this.map(function () {
                    var offsetParent = this.offsetParent;
                    while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || documentElement;
                });
            }
        });
        // Create scrollLeft and scrollTop methods
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function (val) {
                return access(this, function (elem, method, val) {
                    // Coalesce documents and windows
                    var win;
                    if (isWindow(elem)) {
                        win = elem;
                    }
                    else if (elem.nodeType === 9) {
                        win = elem.defaultView;
                    }
                    if (val === undefined) {
                        return win ? win[prop] : elem[method];
                    }
                    if (win) {
                        win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                    }
                    else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length);
            };
        });
        // Support: Safari <=7 - 9.1, Chrome <=37 - 49
        // Add the top/left cssHooks using jQuery.fn.position
        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
        // getComputedStyle returns percent when specified for top/left/bottom/right;
        // rather than make the css module depend on the offset module, just check for it here
        jQuery.each(["top", "left"], function (_i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            });
        });
        // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
        jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function (defaultExtra, funcName) {
                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                    return access(this, function (elem, type, value) {
                        var doc;
                        if (isWindow(elem)) {
                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }
                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;
                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                        }
                        return value === undefined ?
                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :
                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
        });
        jQuery.each([
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend"
        ], function (_i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        });
        jQuery.fn.extend({
            bind: function (types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function (selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
                // ( namespace ) or ( selector, types [, fn] )
                return arguments.length === 1 ?
                    this.off(selector, "**") :
                    this.off(types, selector || "**", fn);
            },
            hover: function (fnOver, fnOut) {
                return this
                    .on("mouseenter", fnOver)
                    .on("mouseleave", fnOut || fnOver);
            }
        });
        jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });
        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        // Require that the "whitespace run" starts from a non-whitespace
        // to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
        var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        // Bind a function to a context, optionally partially applying any
        // arguments.
        // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
        // However, it is not slated for removal any time soon
        jQuery.proxy = function (fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!isFunction(fn)) {
                return undefined;
            }
            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };
            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        };
        jQuery.holdReady = function (hold) {
            if (hold) {
                jQuery.readyWait++;
            }
            else {
                jQuery.ready(true);
            }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = toType;
        jQuery.now = Date.now;
        jQuery.isNumeric = function (obj) {
            // As of jQuery 3.0, isNumeric is limited to
            // strings and numbers (primitives or objects)
            // that can be coerced to finite numbers (gh-2662)
            var type = jQuery.type(obj);
            return (type === "number" || type === "string") &&
                // parseFloat NaNs numeric-cast false positives ("")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                !isNaN(obj - parseFloat(obj));
        };
        jQuery.trim = function (text) {
            return text == null ?
                "" :
                (text + "").replace(rtrim, "$1");
        };
        // Register as a named AMD module, since jQuery can be concatenated with other
        // files that may use define, but not via a proper concatenation script that
        // understands anonymous AMD modules. A named AMD is safest and most robust
        // way to register. Lowercase jquery is used because AMD module names are
        // derived from file names, and jQuery is normally delivered in a lowercase
        // file name. Do this after creating the global so that if an AMD module wants
        // to call noConflict to hide this version of jQuery, it will work.
        // Note that for maximum portability, libraries that are not jQuery should
        // declare themselves as anonymous modules, and avoid setting a global if an
        // AMD loader is present. jQuery is a special case. For more information, see
        // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
        if (typeof define === "function" && define.amd) {
            define("jquery", [], function () {
                return jQuery;
            });
        }
        var 
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery, 
        // Map over the $ in case of overwrite
        _$ = window.$;
        jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        };
        // Expose jQuery and $ identifiers, even in AMD
        // (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
        // and CommonJS for browser emulators (trac-13566)
        if (typeof noGlobal === "undefined") {
            window.jQuery = window.$ = jQuery;
        }
        return jQuery;
    });
},
695: /* @bokeh/slickgrid/slick.core.js */ function _(require, module, exports, __esModule, __esExport) {
    /***
     * Contains core SlickGrid classes.
     * @module Core
     * @namespace Slick
     */
    var $ = require(693) /* ./slick.jquery */;
    /***
     * An event object for passing data to event handlers and letting them control propagation.
     * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
     * @class EventData
     * @constructor
     */
    function EventData() {
        var isPropagationStopped = false;
        var isImmediatePropagationStopped = false;
        /***
         * Stops event from propagating up the DOM tree.
         * @method stopPropagation
         */
        this.stopPropagation = function () {
            isPropagationStopped = true;
        };
        /***
         * Returns whether stopPropagation was called on this event object.
         * @method isPropagationStopped
         * @return {Boolean}
         */
        this.isPropagationStopped = function () {
            return isPropagationStopped;
        };
        /***
         * Prevents the rest of the handlers from being executed.
         * @method stopImmediatePropagation
         */
        this.stopImmediatePropagation = function () {
            isImmediatePropagationStopped = true;
        };
        /***
         * Returns whether stopImmediatePropagation was called on this event object.\
         * @method isImmediatePropagationStopped
         * @return {Boolean}
         */
        this.isImmediatePropagationStopped = function () {
            return isImmediatePropagationStopped;
        };
    }
    /***
     * A simple publisher-subscriber implementation.
     * @class Event
     * @constructor
     */
    function Event() {
        var handlers = [];
        /***
         * Adds an event handler to be called when the event is fired.
         * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
         * object the event was fired with.<p>
         * @method subscribe
         * @param fn {Function} Event handler.
         */
        this.subscribe = function (fn) {
            handlers.push(fn);
        };
        /***
         * Removes an event handler added with <code>subscribe(fn)</code>.
         * @method unsubscribe
         * @param fn {Function} Event handler to be removed.
         */
        this.unsubscribe = function (fn) {
            for (var i = handlers.length - 1; i >= 0; i--) {
                if (handlers[i] === fn) {
                    handlers.splice(i, 1);
                }
            }
        };
        /***
         * Fires an event notifying all subscribers.
         * @method notify
         * @param args {Object} Additional data object to be passed to all handlers.
         * @param e {EventData}
         *      Optional.
         *      An <code>EventData</code> object to be passed to all handlers.
         *      For DOM events, an existing W3C/jQuery event object can be passed in.
         * @param scope {Object}
         *      Optional.
         *      The scope ("this") within which the handler will be executed.
         *      If not specified, the scope will be set to the <code>Event</code> instance.
         */
        this.notify = function (args, e, scope) {
            e = e || new EventData();
            scope = scope || this;
            var returnValue;
            for (var i = 0; i < handlers.length && !(e.isPropagationStopped() || e.isImmediatePropagationStopped()); i++) {
                returnValue = handlers[i].call(scope, e, args);
            }
            return returnValue;
        };
    }
    function EventHandler() {
        var handlers = [];
        this.subscribe = function (event, handler) {
            handlers.push({
                event: event,
                handler: handler
            });
            event.subscribe(handler);
            return this; // allow chaining
        };
        this.unsubscribe = function (event, handler) {
            var i = handlers.length;
            while (i--) {
                if (handlers[i].event === event &&
                    handlers[i].handler === handler) {
                    handlers.splice(i, 1);
                    event.unsubscribe(handler);
                    return;
                }
            }
            return this; // allow chaining
        };
        this.unsubscribeAll = function () {
            var i = handlers.length;
            while (i--) {
                handlers[i].event.unsubscribe(handlers[i].handler);
            }
            handlers = [];
            return this; // allow chaining
        };
    }
    /***
     * A structure containing a range of cells.
     * @class Range
     * @constructor
     * @param fromRow {Integer} Starting row.
     * @param fromCell {Integer} Starting cell.
     * @param toRow {Integer} Optional. Ending row. Defaults to <code>fromRow</code>.
     * @param toCell {Integer} Optional. Ending cell. Defaults to <code>fromCell</code>.
     */
    function Range(fromRow, fromCell, toRow, toCell) {
        if (toRow === undefined && toCell === undefined) {
            toRow = fromRow;
            toCell = fromCell;
        }
        /***
         * @property fromRow
         * @type {Integer}
         */
        this.fromRow = Math.min(fromRow, toRow);
        /***
         * @property fromCell
         * @type {Integer}
         */
        this.fromCell = Math.min(fromCell, toCell);
        /***
         * @property toRow
         * @type {Integer}
         */
        this.toRow = Math.max(fromRow, toRow);
        /***
         * @property toCell
         * @type {Integer}
         */
        this.toCell = Math.max(fromCell, toCell);
        /***
         * Returns whether a range represents a single row.
         * @method isSingleRow
         * @return {Boolean}
         */
        this.isSingleRow = function () {
            return this.fromRow == this.toRow;
        };
        /***
         * Returns whether a range represents a single cell.
         * @method isSingleCell
         * @return {Boolean}
         */
        this.isSingleCell = function () {
            return this.fromRow == this.toRow && this.fromCell == this.toCell;
        };
        /***
         * Returns whether a range contains a given cell.
         * @method contains
         * @param row {Integer}
         * @param cell {Integer}
         * @return {Boolean}
         */
        this.contains = function (row, cell) {
            return row >= this.fromRow && row <= this.toRow &&
                cell >= this.fromCell && cell <= this.toCell;
        };
        /***
         * Returns a readable representation of a range.
         * @method toString
         * @return {String}
         */
        this.toString = function () {
            if (this.isSingleCell()) {
                return "(" + this.fromRow + ":" + this.fromCell + ")";
            }
            else {
                return "(" + this.fromRow + ":" + this.fromCell + " - " + this.toRow + ":" + this.toCell + ")";
            }
        };
    }
    /***
     * A base class that all special / non-data rows (like Group and GroupTotals) derive from.
     * @class NonDataItem
     * @constructor
     */
    function NonDataItem() {
        this.__nonDataRow = true;
    }
    /***
     * Information about a group of rows.
     * @class Group
     * @extends Slick.NonDataItem
     * @constructor
     */
    function Group() {
        this.__group = true;
        /**
         * Grouping level, starting with 0.
         * @property level
         * @type {Number}
         */
        this.level = 0;
        /***
         * Number of rows in the group.
         * @property count
         * @type {Integer}
         */
        this.count = 0;
        /***
         * Grouping value.
         * @property value
         * @type {Object}
         */
        this.value = null;
        /***
         * Formatted display value of the group.
         * @property title
         * @type {String}
         */
        this.title = null;
        /***
         * Whether a group is collapsed.
         * @property collapsed
         * @type {Boolean}
         */
        this.collapsed = false;
        /***
         * Whether a group selection checkbox is checked.
         * @property selectChecked
         * @type {Boolean}
         */
        this.selectChecked = false;
        /***
         * GroupTotals, if any.
         * @property totals
         * @type {GroupTotals}
         */
        this.totals = null;
        /**
         * Rows that are part of the group.
         * @property rows
         * @type {Array}
         */
        this.rows = [];
        /**
         * Sub-groups that are part of the group.
         * @property groups
         * @type {Array}
         */
        this.groups = null;
        /**
         * A unique key used to identify the group.  This key can be used in calls to DataView
         * collapseGroup() or expandGroup().
         * @property groupingKey
         * @type {Object}
         */
        this.groupingKey = null;
    }
    Group.prototype = new NonDataItem();
    /***
     * Compares two Group instances.
     * @method equals
     * @return {Boolean}
     * @param group {Group} Group instance to compare to.
     */
    Group.prototype.equals = function (group) {
        return this.value === group.value &&
            this.count === group.count &&
            this.collapsed === group.collapsed &&
            this.title === group.title;
    };
    /***
     * Information about group totals.
     * An instance of GroupTotals will be created for each totals row and passed to the aggregators
     * so that they can store arbitrary data in it.  That data can later be accessed by group totals
     * formatters during the display.
     * @class GroupTotals
     * @extends Slick.NonDataItem
     * @constructor
     */
    function GroupTotals() {
        this.__groupTotals = true;
        /***
         * Parent Group.
         * @param group
         * @type {Group}
         */
        this.group = null;
        /***
         * Whether the totals have been fully initialized / calculated.
         * Will be set to false for lazy-calculated group totals.
         * @param initialized
         * @type {Boolean}
         */
        this.initialized = false;
    }
    GroupTotals.prototype = new NonDataItem();
    /***
     * A locking helper to track the active edit controller and ensure that only a single controller
     * can be active at a time.  This prevents a whole class of state and validation synchronization
     * issues.  An edit controller (such as SlickGrid) can query if an active edit is in progress
     * and attempt a commit or cancel before proceeding.
     * @class EditorLock
     * @constructor
     */
    function EditorLock() {
        var activeEditController = null;
        /***
         * Returns true if a specified edit controller is active (has the edit lock).
         * If the parameter is not specified, returns true if any edit controller is active.
         * @method isActive
         * @param editController {EditController}
         * @return {Boolean}
         */
        this.isActive = function (editController) {
            return (editController ? activeEditController === editController : activeEditController !== null);
        };
        /***
         * Sets the specified edit controller as the active edit controller (acquire edit lock).
         * If another edit controller is already active, and exception will be throw new Error(.
         * @method activate
         * @param editController {EditController} edit controller acquiring the lock
         */
        this.activate = function (editController) {
            if (editController === activeEditController) { // already activated?
                return;
            }
            if (activeEditController !== null) {
                throw new Error("SlickGrid.EditorLock.activate: an editController is still active, can't activate another editController");
            }
            if (!editController.commitCurrentEdit) {
                throw new Error("SlickGrid.EditorLock.activate: editController must implement .commitCurrentEdit()");
            }
            if (!editController.cancelCurrentEdit) {
                throw new Error("SlickGrid.EditorLock.activate: editController must implement .cancelCurrentEdit()");
            }
            activeEditController = editController;
        };
        /***
         * Unsets the specified edit controller as the active edit controller (release edit lock).
         * If the specified edit controller is not the active one, an exception will be throw new Error(.
         * @method deactivate
         * @param editController {EditController} edit controller releasing the lock
         */
        this.deactivate = function (editController) {
            if (!activeEditController) {
                return;
            }
            if (activeEditController !== editController) {
                throw new Error("SlickGrid.EditorLock.deactivate: specified editController is not the currently active one");
            }
            activeEditController = null;
        };
        /***
         * Attempts to commit the current edit by calling "commitCurrentEdit" method on the active edit
         * controller and returns whether the commit attempt was successful (commit may fail due to validation
         * errors, etc.).  Edit controller's "commitCurrentEdit" must return true if the commit has succeeded
         * and false otherwise.  If no edit controller is active, returns true.
         * @method commitCurrentEdit
         * @return {Boolean}
         */
        this.commitCurrentEdit = function () {
            return (activeEditController ? activeEditController.commitCurrentEdit() : true);
        };
        /***
         * Attempts to cancel the current edit by calling "cancelCurrentEdit" method on the active edit
         * controller and returns whether the edit was successfully cancelled.  If no edit controller is
         * active, returns true.
         * @method cancelCurrentEdit
         * @return {Boolean}
         */
        this.cancelCurrentEdit = function cancelCurrentEdit() {
            return (activeEditController ? activeEditController.cancelCurrentEdit() : true);
        };
    }
    /**
     *
     * @param {Array} treeColumns Array com levels of columns
     * @returns {{hasDepth: 'hasDepth', getTreeColumns: 'getTreeColumns', extractColumns: 'extractColumns', getDepth: 'getDepth', getColumnsInDepth: 'getColumnsInDepth', getColumnsInGroup: 'getColumnsInGroup', visibleColumns: 'visibleColumns', filter: 'filter', reOrder: reOrder}}
     * @constructor
     */
    function TreeColumns(treeColumns) {
        var columnsById = {};
        function init() {
            mapToId(treeColumns);
        }
        function mapToId(columns) {
            columns
                .forEach(function (column) {
                columnsById[column.id] = column;
                if (column.columns)
                    mapToId(column.columns);
            });
        }
        function filter(node, condition) {
            return node.filter(function (column) {
                var valid = condition.call(column);
                if (valid && column.columns)
                    column.columns = filter(column.columns, condition);
                return valid && (!column.columns || column.columns.length);
            });
        }
        function sort(columns, grid) {
            columns
                .sort(function (a, b) {
                var indexA = getOrDefault(grid.getColumnIndex(a.id)), indexB = getOrDefault(grid.getColumnIndex(b.id));
                return indexA - indexB;
            })
                .forEach(function (column) {
                if (column.columns)
                    sort(column.columns, grid);
            });
        }
        function getOrDefault(value) {
            return typeof value === 'undefined' ? -1 : value;
        }
        function getDepth(node) {
            if (node.length)
                for (var i in node)
                    return getDepth(node[i]);
            else if (node.columns)
                return 1 + getDepth(node.columns);
            else
                return 1;
        }
        function getColumnsInDepth(node, depth, current) {
            var columns = [];
            current = current || 0;
            if (depth == current) {
                if (node.length)
                    node.forEach(function (n) {
                        if (n.columns)
                            n.extractColumns = function () {
                                return extractColumns(n);
                            };
                    });
                return node;
            }
            else
                for (var i in node)
                    if (node[i].columns) {
                        columns = columns.concat(getColumnsInDepth(node[i].columns, depth, current + 1));
                    }
            return columns;
        }
        function extractColumns(node) {
            var result = [];
            if (node.hasOwnProperty('length')) {
                for (var i = 0; i < node.length; i++)
                    result = result.concat(extractColumns(node[i]));
            }
            else {
                if (node.hasOwnProperty('columns'))
                    result = result.concat(extractColumns(node.columns));
                else
                    return node;
            }
            return result;
        }
        function cloneTreeColumns() {
            return $.extend(true, [], treeColumns);
        }
        init();
        this.hasDepth = function () {
            for (var i in treeColumns)
                if (treeColumns[i].hasOwnProperty('columns'))
                    return true;
            return false;
        };
        this.getTreeColumns = function () {
            return treeColumns;
        };
        this.extractColumns = function () {
            return this.hasDepth() ? extractColumns(treeColumns) : treeColumns;
        };
        this.getDepth = function () {
            return getDepth(treeColumns);
        };
        this.getColumnsInDepth = function (depth) {
            return getColumnsInDepth(treeColumns, depth);
        };
        this.getColumnsInGroup = function (groups) {
            return extractColumns(groups);
        };
        this.visibleColumns = function () {
            return filter(cloneTreeColumns(), function () {
                return this.visible;
            });
        };
        this.filter = function (condition) {
            return filter(cloneTreeColumns(), condition);
        };
        this.reOrder = function (grid) {
            return sort(treeColumns, grid);
        };
        this.getById = function (id) {
            return columnsById[id];
        };
        this.getInIds = function (ids) {
            return ids.map(function (id) {
                return columnsById[id];
            });
        };
    }
    /***
     * Polyfill for Map to support old browsers but
     * benefit of the Map speed in modern browsers.
     * @class Map
     * @constructor
     */
    var Map = 'Map' in window ? window.Map : function Map() {
        var data = {};
        /***
         * Gets the item with the given key from the map or undefined if
         * the map does not contain the item.
         * @method get
         * @param key {Map} The key of the item in the map.
         */
        this.get = function (key) {
            return data[key];
        };
        /***
         * Adds or updates the item with the given key in the map.
         * @method set
         * @param key The key of the item in the map.
         * @param value The value to insert into the map of the item in the map.
         */
        this.set = function (key, value) {
            data[key] = value;
        };
        /***
         * Gets a value indicating whether the given key is present in the map.
         * @method has
         * @param key The key of the item in the map.
         * @return {Boolean}
         */
        this.has = function (key) {
            return key in data;
        };
        /***
         * Removes the item with the given key from the map.
         * @method delete
         * @param key The key of the item in the map.
         */
        this.delete = function (key) {
            delete data[key];
        };
    };
    module.exports = {
        "Event": Event,
        "EventData": EventData,
        "EventHandler": EventHandler,
        "Range": Range,
        "Map": Map,
        "NonDataRow": NonDataItem,
        "Group": Group,
        "GroupTotals": GroupTotals,
        "EditorLock": EditorLock,
        /***
         * A global singleton editor lock.
         * @class GlobalEditorLock
         * @static
         * @constructor
         */
        "GlobalEditorLock": new EditorLock(),
        "TreeColumns": TreeColumns,
        "keyCode": {
            SPACE: 8,
            BACKSPACE: 8,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            ESC: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            TAB: 9,
            UP: 38,
            A: 65,
            C: 67,
            V: 86
        },
        "preClickClassName": "slick-edit-preclick",
        "GridAutosizeColsMode": {
            None: 'NOA',
            LegacyOff: 'LOF',
            LegacyForceFit: 'LFF',
            IgnoreViewport: 'IGV',
            FitColsToViewport: 'FCV',
            FitViewportToCols: 'FVC'
        },
        "ColAutosizeMode": {
            Locked: 'LCK',
            Guide: 'GUI',
            Content: 'CON',
            ContentIntelligent: 'CTI'
        },
        "RowSelectionMode": {
            FirstRow: 'FS1',
            FirstNRows: 'FSN',
            AllRows: 'ALL',
            LastRow: 'LS1'
        },
        "ValueFilterMode": {
            None: 'NONE',
            DeDuplicate: 'DEDP',
            GetGreatestAndSub: 'GR8T',
            GetLongestTextAndSub: 'LNSB',
            GetLongestText: 'LNSC'
        },
        "WidthEvalMode": {
            CanvasTextSize: 'CANV',
            HTML: 'HTML'
        }
    };
},
696: /* @bokeh/slickgrid/plugins/slick.checkboxselectcolumn.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ../slick.jquery */;
    var Slick = require(695) /* ../slick.core */;
    function CheckboxSelectColumn(options) {
        var _grid;
        var _selectableOverride = null;
        var _selectAll_UID = createUID();
        var _handler = new Slick.EventHandler();
        var _selectedRowsLookup = {};
        var _defaults = {
            columnId: "_checkbox_selector",
            cssClass: null,
            hideSelectAllCheckbox: false,
            toolTip: "Select/Deselect All",
            width: 30,
            hideInColumnTitleRow: false,
            hideInFilterHeaderRow: true
        };
        var _isSelectAllChecked = false;
        var _options = $.extend(true, {}, _defaults, options);
        // user could override the checkbox icon logic from within the options or after instantiating the plugin
        if (typeof _options.selectableOverride === 'function') {
            selectableOverride(_options.selectableOverride);
        }
        function init(grid) {
            _grid = grid;
            _handler
                .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
                .subscribe(_grid.onClick, handleClick)
                .subscribe(_grid.onKeyDown, handleKeyDown);
            if (!_options.hideInFilterHeaderRow) {
                addCheckboxToFilterHeaderRow(grid);
            }
            if (!_options.hideInColumnTitleRow) {
                _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
            }
        }
        function destroy() {
            _handler.unsubscribeAll();
        }
        function getOptions() {
            return _options;
        }
        function setOptions(options) {
            _options = $.extend(true, {}, _options, options);
            if (_options.hideSelectAllCheckbox) {
                hideSelectAllFromColumnHeaderTitleRow();
                hideSelectAllFromColumnHeaderFilterRow();
            }
            else {
                if (!_options.hideInColumnTitleRow) {
                    renderSelectAllCheckbox(_isSelectAllChecked);
                    _handler.subscribe(_grid.onHeaderClick, handleHeaderClick);
                }
                else {
                    hideSelectAllFromColumnHeaderTitleRow();
                }
                if (!_options.hideInFilterHeaderRow) {
                    var selectAllContainer = $("#filter-checkbox-selectall-container");
                    selectAllContainer.show();
                    selectAllContainer.find('input[type="checkbox"]').prop("checked", _isSelectAllChecked);
                }
                else {
                    hideSelectAllFromColumnHeaderFilterRow();
                }
            }
        }
        function hideSelectAllFromColumnHeaderTitleRow() {
            _grid.updateColumnHeader(_options.columnId, "", "");
        }
        function hideSelectAllFromColumnHeaderFilterRow() {
            $("#filter-checkbox-selectall-container").hide();
        }
        function handleSelectedRowsChanged(e, args) {
            var selectedRows = _grid.getSelectedRows();
            var lookup = {}, row, i, k;
            var disabledCount = 0;
            if (typeof _selectableOverride === 'function') {
                for (k = 0; k < _grid.getDataLength(); k++) {
                    // If we are allowed to select the row
                    var dataItem = _grid.getDataItem(k);
                    if (!checkSelectableOverride(i, dataItem, _grid)) {
                        disabledCount++;
                    }
                }
            }
            var removeList = [];
            for (i = 0; i < selectedRows.length; i++) {
                row = selectedRows[i];
                // If we are allowed to select the row
                var rowItem = _grid.getDataItem(row);
                if (checkSelectableOverride(i, rowItem, _grid)) {
                    lookup[row] = true;
                    if (lookup[row] !== _selectedRowsLookup[row]) {
                        _grid.invalidateRow(row);
                        delete _selectedRowsLookup[row];
                    }
                }
                else {
                    removeList.push(row);
                }
            }
            for (i in _selectedRowsLookup) {
                _grid.invalidateRow(i);
            }
            _selectedRowsLookup = lookup;
            _grid.render();
            _isSelectAllChecked = selectedRows.length && selectedRows.length + disabledCount >= _grid.getDataLength();
            if (!_options.hideInColumnTitleRow && !_options.hideSelectAllCheckbox) {
                renderSelectAllCheckbox(_isSelectAllChecked);
            }
            if (!_options.hideInFilterHeaderRow) {
                var selectAllElm = $("#header-filter-selector" + _selectAll_UID);
                selectAllElm.prop("checked", _isSelectAllChecked);
            }
            // Remove items that shouln't of been selected in the first place (Got here Ctrl + click)
            if (removeList.length > 0) {
                for (i = 0; i < removeList.length; i++) {
                    var remIdx = selectedRows.indexOf(removeList[i]);
                    selectedRows.splice(remIdx, 1);
                }
                _grid.setSelectedRows(selectedRows);
            }
        }
        function handleKeyDown(e, args) {
            if (e.which == 32) {
                if (_grid.getColumns()[args.cell].id === _options.columnId) {
                    // if editing, try to commit
                    if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
                        toggleRowSelection(args.row);
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }
        function handleClick(e, args) {
            // clicking on a row select checkbox
            if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }
                toggleRowSelection(args.row);
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
        function toggleRowSelection(row) {
            var dataContext = _grid.getDataItem(row);
            if (!checkSelectableOverride(row, dataContext, _grid)) {
                return;
            }
            if (_selectedRowsLookup[row]) {
                _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                    return n != row;
                }));
            }
            else {
                _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
            }
            _grid.setActiveCell(row, getCheckboxColumnCellIndex());
        }
        function selectRows(rowArray) {
            var i, l = rowArray.length, addRows = [];
            for (i = 0; i < l; i++) {
                if (!_selectedRowsLookup[rowArray[i]]) {
                    addRows[addRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows(_grid.getSelectedRows().concat(addRows));
        }
        function deSelectRows(rowArray) {
            var i, l = rowArray.length, removeRows = [];
            for (i = 0; i < l; i++) {
                if (_selectedRowsLookup[rowArray[i]]) {
                    removeRows[removeRows.length] = rowArray[i];
                }
            }
            _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                return removeRows.indexOf(n) < 0;
            }));
        }
        function handleHeaderClick(e, args) {
            if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }
                if ($(e.target).is(":checked")) {
                    var rows = [];
                    for (var i = 0; i < _grid.getDataLength(); i++) {
                        // Get the row and check it's a selectable row before pushing it onto the stack
                        var rowItem = _grid.getDataItem(i);
                        if (!rowItem.__group && !rowItem.__groupTotals && checkSelectableOverride(i, rowItem, _grid)) {
                            rows.push(i);
                        }
                    }
                    _grid.setSelectedRows(rows);
                }
                else {
                    _grid.setSelectedRows([]);
                }
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
        var _checkboxColumnCellIndex = null;
        function getCheckboxColumnCellIndex() {
            if (_checkboxColumnCellIndex === null) {
                _checkboxColumnCellIndex = 0;
                var colArr = _grid.getColumns();
                for (var i = 0; i < colArr.length; i++) {
                    if (colArr[i].id == _options.columnId) {
                        _checkboxColumnCellIndex = i;
                    }
                }
            }
            return _checkboxColumnCellIndex;
        }
        function getColumnDefinition() {
            return {
                id: _options.columnId,
                name: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>",
                toolTip: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : _options.toolTip,
                field: "sel",
                width: _options.width,
                resizable: false,
                sortable: false,
                cssClass: _options.cssClass,
                hideSelectAllCheckbox: _options.hideSelectAllCheckbox,
                formatter: checkboxSelectionFormatter
            };
        }
        function addCheckboxToFilterHeaderRow(grid) {
            _handler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                if (args.column.field === "sel") {
                    $(args.node).empty();
                    $("<span id='filter-checkbox-selectall-container'><input id='header-filter-selector" + _selectAll_UID + "' type='checkbox'><label for='header-filter-selector" + _selectAll_UID + "'></label></span>")
                        .appendTo(args.node)
                        .on('click', function (evnt) {
                        handleHeaderClick(evnt, args);
                    });
                }
            });
        }
        function createUID() {
            return Math.round(10000000 * Math.random());
        }
        function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext, grid) {
            var UID = createUID() + row;
            if (dataContext) {
                if (!checkSelectableOverride(row, dataContext, grid)) {
                    return null;
                }
                else {
                    return _selectedRowsLookup[row]
                        ? "<input id='selector" + UID + "' type='checkbox' checked='checked'><label for='selector" + UID + "'></label>"
                        : "<input id='selector" + UID + "' type='checkbox'><label for='selector" + UID + "'></label>";
                }
            }
            return null;
        }
        function checkSelectableOverride(row, dataContext, grid) {
            if (typeof _selectableOverride === 'function') {
                return _selectableOverride(row, dataContext, grid);
            }
            return true;
        }
        function renderSelectAllCheckbox(isSelectAllChecked) {
            if (isSelectAllChecked) {
                _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox' checked='checked'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
            }
            else {
                _grid.updateColumnHeader(_options.columnId, "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>", _options.toolTip);
            }
        }
        /**
         * Method that user can pass to override the default behavior or making every row a selectable row.
         * In order word, user can choose which rows to be selectable or not by providing his own logic.
         * @param overrideFn: override function callback
         */
        function selectableOverride(overrideFn) {
            _selectableOverride = overrideFn;
        }
        $.extend(this, {
            "init": init,
            "destroy": destroy,
            "pluginName": "CheckboxSelectColumn",
            "deSelectRows": deSelectRows,
            "selectRows": selectRows,
            "getColumnDefinition": getColumnDefinition,
            "getOptions": getOptions,
            "selectableOverride": selectableOverride,
            "setOptions": setOptions,
        });
    }
    module.exports = {
        "CheckboxSelectColumn": CheckboxSelectColumn
    };
},
697: /* @bokeh/slickgrid/plugins/slick.cellexternalcopymanager.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ../slick.jquery */;
    var Slick = require(695) /* ../slick.core */;
    var keyCodes = Slick.keyCode;
    function CellExternalCopyManager(options) {
        /*
          This manager enables users to copy/paste data from/to an external Spreadsheet application
          such as MS-Excel® or OpenOffice-Spreadsheet.
          
          Since it is not possible to access directly the clipboard in javascript, the plugin uses
          a trick to do it's job. After detecting the keystroke, we dynamically create a textarea
          where the browser copies/pastes the serialized data.
          
          options:
            copiedCellStyle : sets the css className used for copied cells. default : "copied"
            copiedCellStyleLayerKey : sets the layer key for setting css values of copied cells. default : "copy-manager"
            dataItemColumnValueExtractor : option to specify a custom column value extractor function
            dataItemColumnValueSetter : option to specify a custom column value setter function
            clipboardCommandHandler : option to specify a custom handler for paste actions
            includeHeaderWhenCopying : set to true and the plugin will take the name property from each column (which is usually what appears in your header) and put that as the first row of the text that's copied to the clipboard
            bodyElement: option to specify a custom DOM element which to will be added the hidden textbox. It's useful if the grid is inside a modal dialog.
            onCopyInit: optional handler to run when copy action initializes
            onCopySuccess: optional handler to run when copy action is complete
            newRowCreator: function to add rows to table if paste overflows bottom of table, if this function is not provided new rows will be ignored.
            readOnlyMode: suppresses paste
            headerColumnValueExtractor : option to specify a custom column header value extractor function
        */
        var _grid;
        var _self = this;
        var _copiedRanges;
        var _options = options || {};
        var _copiedCellStyleLayerKey = _options.copiedCellStyleLayerKey || "copy-manager";
        var _copiedCellStyle = _options.copiedCellStyle || "copied";
        var _clearCopyTI = 0;
        var _bodyElement = _options.bodyElement || document.body;
        var _onCopyInit = _options.onCopyInit || null;
        var _onCopySuccess = _options.onCopySuccess || null;
        function init(grid) {
            _grid = grid;
            _grid.onKeyDown.subscribe(handleKeyDown);
            // we need a cell selection model
            var cellSelectionModel = grid.getSelectionModel();
            if (!cellSelectionModel) {
                throw new Error("Selection model is mandatory for this plugin. Please set a selection model on the grid before adding this plugin: grid.setSelectionModel(new Slick.CellSelectionModel())");
            }
            // we give focus on the grid when a selection is done on it.
            // without this, if the user selects a range of cell without giving focus on a particular cell, the grid doesn't get the focus and key stroke handles (ctrl+c) don't work
            cellSelectionModel.onSelectedRangesChanged.subscribe(function (e, args) {
                _grid.focus();
            });
        }
        function destroy() {
            _grid.onKeyDown.unsubscribe(handleKeyDown);
        }
        function getHeaderValueForColumn(columnDef) {
            if (_options.headerColumnValueExtractor) {
                var val = _options.headerColumnValueExtractor(columnDef);
                if (val) {
                    return val;
                }
            }
            return columnDef.name;
        }
        function getDataItemValueForColumn(item, columnDef, e) {
            if (_options.dataItemColumnValueExtractor) {
                var val = _options.dataItemColumnValueExtractor(item, columnDef);
                if (val) {
                    return val;
                }
            }
            var retVal = '';
            // if a custom getter is not defined, we call serializeValue of the editor to serialize
            if (columnDef.editor) {
                var editorArgs = {
                    'container': $("<p>"), // a dummy container
                    'column': columnDef,
                    'position': { 'top': 0, 'left': 0 }, // a dummy position required by some editors
                    'grid': _grid,
                    'event': e
                };
                var editor = new columnDef.editor(editorArgs);
                editor.loadValue(item);
                retVal = editor.serializeValue();
                editor.destroy();
            }
            else {
                retVal = item[columnDef.field];
            }
            return retVal;
        }
        function setDataItemValueForColumn(item, columnDef, value) {
            if (columnDef.denyPaste) {
                return null;
            }
            if (_options.dataItemColumnValueSetter) {
                return _options.dataItemColumnValueSetter(item, columnDef, value);
            }
            // if a custom setter is not defined, we call applyValue of the editor to unserialize
            if (columnDef.editor) {
                var editorArgs = {
                    'container': $("body"), // a dummy container
                    'column': columnDef,
                    'position': { 'top': 0, 'left': 0 }, // a dummy position required by some editors
                    'grid': _grid
                };
                var editor = new columnDef.editor(editorArgs);
                editor.loadValue(item);
                editor.applyValue(item, value);
                editor.destroy();
            }
            else {
                item[columnDef.field] = value;
            }
        }
        function _createTextBox(innerText) {
            var ta = document.createElement('textarea');
            ta.style.position = 'absolute';
            ta.style.left = '-1000px';
            ta.style.top = document.body.scrollTop + 'px';
            ta.value = innerText;
            _bodyElement.appendChild(ta);
            ta.select();
            return ta;
        }
        function _decodeTabularData(_grid, ta) {
            var columns = _grid.getColumns();
            var clipText = ta.value;
            var clipRows = clipText.split(/[\n\f\r]/);
            // trim trailing CR if present
            if (clipRows[clipRows.length - 1] === "") {
                clipRows.pop();
            }
            var clippedRange = [];
            var j = 0;
            _bodyElement.removeChild(ta);
            for (var i = 0; i < clipRows.length; i++) {
                if (clipRows[i] !== "")
                    clippedRange[j++] = clipRows[i].split("\t");
                else
                    clippedRange[j++] = [""];
            }
            var selectedCell = _grid.getActiveCell();
            var ranges = _grid.getSelectionModel().getSelectedRanges();
            var selectedRange = ranges && ranges.length ? ranges[0] : null; // pick only one selection
            var activeRow = null;
            var activeCell = null;
            if (selectedRange) {
                activeRow = selectedRange.fromRow;
                activeCell = selectedRange.fromCell;
            }
            else if (selectedCell) {
                activeRow = selectedCell.row;
                activeCell = selectedCell.cell;
            }
            else {
                // we don't know where to paste
                return;
            }
            var oneCellToMultiple = false;
            var destH = clippedRange.length;
            var destW = clippedRange.length ? clippedRange[0].length : 0;
            if (clippedRange.length == 1 && clippedRange[0].length == 1 && selectedRange) {
                oneCellToMultiple = true;
                destH = selectedRange.toRow - selectedRange.fromRow + 1;
                destW = selectedRange.toCell - selectedRange.fromCell + 1;
            }
            var availableRows = _grid.getData().length - activeRow;
            var addRows = 0;
            // ignore new rows if we don't have a "newRowCreator"
            if (availableRows < destH && _options.newRowCreator) {
                var d = _grid.getData();
                for (addRows = 1; addRows <= destH - availableRows; addRows++)
                    d.push({});
                _grid.setData(d);
                _grid.render();
            }
            var overflowsBottomOfGrid = activeRow + destH > _grid.getDataLength();
            if (_options.newRowCreator && overflowsBottomOfGrid) {
                var newRowsNeeded = activeRow + destH - _grid.getDataLength();
                _options.newRowCreator(newRowsNeeded);
            }
            var clipCommand = {
                isClipboardCommand: true,
                clippedRange: clippedRange,
                oldValues: [],
                cellExternalCopyManager: _self,
                _options: _options,
                setDataItemValueForColumn: setDataItemValueForColumn,
                markCopySelection: markCopySelection,
                oneCellToMultiple: oneCellToMultiple,
                activeRow: activeRow,
                activeCell: activeCell,
                destH: destH,
                destW: destW,
                maxDestY: _grid.getDataLength(),
                maxDestX: _grid.getColumns().length,
                h: 0,
                w: 0,
                execute: function () {
                    this.h = 0;
                    for (var y = 0; y < this.destH; y++) {
                        this.oldValues[y] = [];
                        this.w = 0;
                        this.h++;
                        for (var x = 0; x < this.destW; x++) {
                            this.w++;
                            var desty = activeRow + y;
                            var destx = activeCell + x;
                            if (desty < this.maxDestY && destx < this.maxDestX) {
                                var nd = _grid.getCellNode(desty, destx);
                                var dt = _grid.getDataItem(desty);
                                this.oldValues[y][x] = dt[columns[destx]['field']];
                                if (oneCellToMultiple)
                                    this.setDataItemValueForColumn(dt, columns[destx], clippedRange[0][0]);
                                else
                                    this.setDataItemValueForColumn(dt, columns[destx], clippedRange[y] ? clippedRange[y][x] : '');
                                _grid.updateCell(desty, destx);
                                _grid.onCellChange.notify({
                                    row: desty,
                                    cell: destx,
                                    item: dt,
                                    grid: _grid
                                });
                            }
                        }
                    }
                    var bRange = {
                        'fromCell': activeCell,
                        'fromRow': activeRow,
                        'toCell': activeCell + this.w - 1,
                        'toRow': activeRow + this.h - 1
                    };
                    this.markCopySelection([bRange]);
                    _grid.getSelectionModel().setSelectedRanges([bRange]);
                    this.cellExternalCopyManager.onPasteCells.notify({ ranges: [bRange] });
                },
                undo: function () {
                    for (var y = 0; y < this.destH; y++) {
                        for (var x = 0; x < this.destW; x++) {
                            var desty = activeRow + y;
                            var destx = activeCell + x;
                            if (desty < this.maxDestY && destx < this.maxDestX) {
                                var nd = _grid.getCellNode(desty, destx);
                                var dt = _grid.getDataItem(desty);
                                if (oneCellToMultiple)
                                    this.setDataItemValueForColumn(dt, columns[destx], this.oldValues[0][0]);
                                else
                                    this.setDataItemValueForColumn(dt, columns[destx], this.oldValues[y][x]);
                                _grid.updateCell(desty, destx);
                                _grid.onCellChange.notify({
                                    row: desty,
                                    cell: destx,
                                    item: dt,
                                    grid: _grid
                                });
                            }
                        }
                    }
                    var bRange = {
                        'fromCell': activeCell,
                        'fromRow': activeRow,
                        'toCell': activeCell + this.w - 1,
                        'toRow': activeRow + this.h - 1
                    };
                    this.markCopySelection([bRange]);
                    _grid.getSelectionModel().setSelectedRanges([bRange]);
                    this.cellExternalCopyManager.onPasteCells.notify({ ranges: [bRange] });
                    if (addRows > 1) {
                        var d = _grid.getData();
                        for (; addRows > 1; addRows--)
                            d.splice(d.length - 1, 1);
                        _grid.setData(d);
                        _grid.render();
                    }
                }
            };
            if (_options.clipboardCommandHandler) {
                _options.clipboardCommandHandler(clipCommand);
            }
            else {
                clipCommand.execute();
            }
        }
        function handleKeyDown(e, args) {
            var ranges;
            if (!_grid.getEditorLock().isActive() || _grid.getOptions().autoEdit) {
                if (e.which == keyCodes.ESC) {
                    if (_copiedRanges) {
                        e.preventDefault();
                        clearCopySelection();
                        _self.onCopyCancelled.notify({ ranges: _copiedRanges });
                        _copiedRanges = null;
                    }
                }
                if ((e.which === keyCodes.C || e.which === keyCodes.INSERT) && (e.ctrlKey || e.metaKey) && !e.shiftKey) { // CTRL+C or CTRL+INS
                    if (_onCopyInit) {
                        _onCopyInit.call();
                    }
                    ranges = _grid.getSelectionModel().getSelectedRanges();
                    if (ranges.length !== 0) {
                        _copiedRanges = ranges;
                        markCopySelection(ranges);
                        _self.onCopyCells.notify({ ranges: ranges });
                        var columns = _grid.getColumns();
                        var clipText = "";
                        for (var rg = 0; rg < ranges.length; rg++) {
                            var range = ranges[rg];
                            var clipTextRows = [];
                            for (var i = range.fromRow; i < range.toRow + 1; i++) {
                                var clipTextCells = [];
                                var dt = _grid.getDataItem(i);
                                if (clipTextRows.length === 0 && _options.includeHeaderWhenCopying) {
                                    var clipTextHeaders = [];
                                    for (var j = range.fromCell; j < range.toCell + 1; j++) {
                                        if (columns[j].name.length > 0)
                                            clipTextHeaders.push(getHeaderValueForColumn(columns[j]));
                                    }
                                    clipTextRows.push(clipTextHeaders.join("\t"));
                                }
                                for (var j = range.fromCell; j < range.toCell + 1; j++) {
                                    clipTextCells.push(getDataItemValueForColumn(dt, columns[j], e));
                                }
                                clipTextRows.push(clipTextCells.join("\t"));
                            }
                            clipText += clipTextRows.join("\r\n") + "\r\n";
                        }
                        if (window.clipboardData) {
                            window.clipboardData.setData("Text", clipText);
                            return true;
                        }
                        else {
                            var focusEl = document.activeElement;
                            var ta = _createTextBox(clipText);
                            ta.focus();
                            setTimeout(function () {
                                _bodyElement.removeChild(ta);
                                // restore focus
                                if (focusEl)
                                    focusEl.focus();
                                else
                                    console.log("Not element to restore focus to after copy?");
                            }, 100);
                            if (_onCopySuccess) {
                                var rowCount = 0;
                                // If it's cell selection, use the toRow/fromRow fields
                                if (ranges.length === 1) {
                                    rowCount = (ranges[0].toRow + 1) - ranges[0].fromRow;
                                }
                                else {
                                    rowCount = ranges.length;
                                }
                                _onCopySuccess.call(this, rowCount);
                            }
                            return false;
                        }
                    }
                }
                if (!_options.readOnlyMode && ((e.which === keyCodes.V && (e.ctrlKey || e.metaKey) && !e.shiftKey)
                    || (e.which === keyCodes.INSERT && e.shiftKey && !e.ctrlKey))) { // CTRL+V or Shift+INS
                    var ta = _createTextBox('');
                    setTimeout(function () {
                        _decodeTabularData(_grid, ta);
                    }, 100);
                    return false;
                }
            }
        }
        function markCopySelection(ranges) {
            clearCopySelection();
            var columns = _grid.getColumns();
            var hash = {};
            for (var i = 0; i < ranges.length; i++) {
                for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
                    hash[j] = {};
                    for (var k = ranges[i].fromCell; k <= ranges[i].toCell && k < columns.length; k++) {
                        hash[j][columns[k].id] = _copiedCellStyle;
                    }
                }
            }
            _grid.setCellCssStyles(_copiedCellStyleLayerKey, hash);
            clearTimeout(_clearCopyTI);
            _clearCopyTI = setTimeout(function () {
                _self.clearCopySelection();
            }, 2000);
        }
        function clearCopySelection() {
            _grid.removeCellCssStyles(_copiedCellStyleLayerKey);
        }
        function setIncludeHeaderWhenCopying(includeHeaderWhenCopying) {
            _options.includeHeaderWhenCopying = includeHeaderWhenCopying;
        }
        $.extend(this, {
            "init": init,
            "destroy": destroy,
            "pluginName": "CellExternalCopyManager",
            "clearCopySelection": clearCopySelection,
            "handleKeyDown": handleKeyDown,
            "onCopyCells": new Slick.Event(),
            "onCopyCancelled": new Slick.Event(),
            "onPasteCells": new Slick.Event(),
            "setIncludeHeaderWhenCopying": setIncludeHeaderWhenCopying
        });
    }
    module.exports = {
        "CellExternalCopyManager": CellExternalCopyManager
    };
},
698: /* @bokeh/slickgrid/index.js */ function _(require, module, exports, __esModule, __esExport) {
    var tslib = require(1) /* tslib */;
    tslib.__exportStar(require(695) /* ./slick.core */, module.exports);
    tslib.__exportStar(require(699) /* ./slick.grid */, module.exports);
    tslib.__exportStar(require(702) /* ./slick.dataview */, module.exports);
    tslib.__exportStar(require(703) /* ./slick.editors */, module.exports);
    tslib.__exportStar(require(704) /* ./slick.formatters */, module.exports);
    tslib.__exportStar(require(705) /* ./slick.remotemodel */, module.exports);
    tslib.__exportStar(require(706) /* ./slick.groupitemmetadataprovider */, module.exports);
},
699: /* @bokeh/slickgrid/slick.grid.js */ function _(require, module, exports, __esModule, __esExport) {
    /**
     * @license
     * (c) 2009-2016 Michael Leibman
     * michael{dot}leibman{at}gmail{dot}com
     * http://github.com/mleibman/slickgrid
     *
     * Distributed under MIT license.
     * All rights reserved.
     *
     * SlickGrid v2.4
     *
     * NOTES:
     *     Cell/row DOM manipulations are done directly bypassing jQuery's DOM manipulation methods.
     *     This increases the speed dramatically, but can only be done safely because there are no event handlers
     *     or data associated with any cell/row DOM nodes.  Cell editors must make sure they implement .destroy()
     *     and do proper cleanup.
     */
    const jQuery = require(693) /* ./slick.jquery */;
    const $ = jQuery;
    var Slick = require(695) /* ./slick.core */;
    // shared across all grids on the page
    var scrollbarDimensions;
    var maxSupportedCssHeight; // browser's breaking point
    //////////////////////////////////////////////////////////////////////////////////////////////
    // SlickGrid class implementation (available as Slick.Grid)
    /**
     * Creates a new instance of the grid.
     * @class SlickGrid
     * @constructor
     * @param {Node}              container   Container node to create the grid in.
     * @param {Array,Object}      data        An array of objects for databinding.
     * @param {Array}             columns     An array of column definitions.
     * @param {Object}            options     Grid options.
     **/
    function SlickGrid(container, data, columns, options) {
        if (!$.fn.drag) {
            require(700) /* ./lib/jquery.event.drag-2.3.0 */;
        }
        if (!$.fn.drop) {
            require(701) /* ./lib/jquery.event.drop-2.3.0 */;
        }
        // settings
        var defaults = {
            alwaysShowVerticalScroll: false,
            alwaysAllowHorizontalScroll: false,
            explicitInitialization: false,
            rowHeight: 25,
            defaultColumnWidth: 80,
            enableAddRow: false,
            leaveSpaceForNewRows: false,
            editable: false,
            autoEdit: true,
            suppressActiveCellChangeOnEdit: false,
            enableCellNavigation: true,
            enableColumnReorder: true,
            asyncEditorLoading: false,
            asyncEditorLoadDelay: 100,
            forceFitColumns: false,
            enableAsyncPostRender: false,
            asyncPostRenderDelay: 50,
            enableAsyncPostRenderCleanup: false,
            asyncPostRenderCleanupDelay: 40,
            autoHeight: false,
            editorLock: Slick.GlobalEditorLock,
            showColumnHeader: true,
            showHeaderRow: false,
            headerRowHeight: 25,
            createFooterRow: false,
            showFooterRow: false,
            footerRowHeight: 25,
            createPreHeaderPanel: false,
            showPreHeaderPanel: false,
            preHeaderPanelHeight: 25,
            showTopPanel: false,
            topPanelHeight: 25,
            formatterFactory: null,
            editorFactory: null,
            cellFlashingCssClass: "flashing",
            selectedCellCssClass: "selected",
            multiSelect: true,
            enableTextSelectionOnCells: false,
            dataItemColumnValueExtractor: null,
            frozenBottom: false,
            frozenColumn: -1,
            frozenRow: -1,
            frozenRightViewportMinWidth: 100,
            fullWidthRows: false,
            multiColumnSort: false,
            numberedMultiColumnSort: false,
            tristateMultiColumnSort: false,
            sortColNumberInSeparateSpan: false,
            defaultFormatter: defaultFormatter,
            forceSyncScrolling: false,
            addNewRowCssClass: "new-row",
            preserveCopiedSelectionOnPaste: false,
            showCellSelection: true,
            viewportClass: null,
            minRowBuffer: 3,
            emulatePagingWhenScrolling: true, // when scrolling off bottom of viewport, place new row at top of viewport
            editorCellNavOnLRKeys: false,
            enableMouseWheelScrollHandler: true,
            doPaging: true,
            autosizeColsMode: Slick.GridAutosizeColsMode.LegacyOff,
            autosizeColPaddingPx: 4,
            autosizeTextAvgToMWidthRatio: 0.75,
            viewportSwitchToScrollModeWidthPercent: undefined,
            viewportMinWidthPx: undefined,
            viewportMaxWidthPx: undefined,
            suppressCssChangesOnHiddenInit: false
        };
        var columnDefaults = {
            name: "",
            resizable: true,
            sortable: false,
            minWidth: 30,
            maxWidth: undefined,
            rerenderOnResize: false,
            headerCssClass: null,
            defaultSortAsc: true,
            focusable: true,
            selectable: true,
        };
        var columnAutosizeDefaults = {
            ignoreHeaderText: false,
            colValueArray: undefined,
            allowAddlPercent: undefined,
            formatterOverride: undefined,
            autosizeMode: Slick.ColAutosizeMode.ContentIntelligent,
            rowSelectionModeOnInit: undefined,
            rowSelectionMode: Slick.RowSelectionMode.FirstNRows,
            rowSelectionCount: 100,
            valueFilterMode: Slick.ValueFilterMode.None,
            widthEvalMode: Slick.WidthEvalMode.CanvasTextSize,
            sizeToRemaining: undefined,
            widthPx: undefined,
            colDataTypeOf: undefined
        };
        // scroller
        var th; // virtual height
        var h; // real scrollable height
        var ph; // page height
        var n; // number of pages
        var cj; // "jumpiness" coefficient
        var page = 0; // current page
        var offset = 0; // current page offset
        var vScrollDir = 1;
        // private
        var initialized = false;
        var $container;
        var uid = "slickgrid_" + Math.round(1000000 * Math.random());
        var self = this;
        var $focusSink, $focusSink2;
        var $groupHeaders = $();
        var $headerScroller;
        var $headers;
        var $headerRow, $headerRowScroller, $headerRowSpacerL, $headerRowSpacerR;
        var $footerRow, $footerRowScroller, $footerRowSpacerL, $footerRowSpacerR;
        var $preHeaderPanel, $preHeaderPanelScroller, $preHeaderPanelSpacer;
        var $preHeaderPanelR, $preHeaderPanelScrollerR, $preHeaderPanelSpacerR;
        var $topPanelScroller;
        var $topPanel;
        var $viewport;
        var $canvas;
        var $style;
        var $boundAncestors;
        var treeColumns;
        var stylesheet, columnCssRulesL, columnCssRulesR;
        var viewportH, viewportW;
        var canvasWidth, canvasWidthL, canvasWidthR;
        var headersWidth, headersWidthL, headersWidthR;
        var viewportHasHScroll, viewportHasVScroll;
        var headerColumnWidthDiff = 0, headerColumnHeightDiff = 0, // border+padding
        cellWidthDiff = 0, cellHeightDiff = 0, jQueryNewWidthBehaviour = false;
        var absoluteColumnMinWidth;
        var hasFrozenRows = false;
        var frozenRowsHeight = 0;
        var actualFrozenRow = -1;
        var paneTopH = 0;
        var paneBottomH = 0;
        var viewportTopH = 0;
        var viewportBottomH = 0;
        var topPanelH = 0;
        var headerRowH = 0;
        var footerRowH = 0;
        var tabbingDirection = 1;
        var $activeCanvasNode;
        var $activeViewportNode;
        var activePosX;
        var activeRow, activeCell;
        var activeCellNode = null;
        var currentEditor = null;
        var serializedEditorValue;
        var editController;
        var rowsCache = {};
        var renderedRows = 0;
        var numVisibleRows = 0;
        var prevScrollTop = 0;
        var scrollTop = 0;
        var lastRenderedScrollTop = 0;
        var lastRenderedScrollLeft = 0;
        var prevScrollLeft = 0;
        var scrollLeft = 0;
        var selectionModel;
        var selectedRows = [];
        var plugins = [];
        var cellCssClasses = {};
        var columnsById = {};
        var sortColumns = [];
        var columnPosLeft = [];
        var columnPosRight = [];
        var pagingActive = false;
        var pagingIsLastPage = false;
        var scrollThrottle = ActionThrottle(render, 50);
        // async call handles
        var h_editorLoader = null;
        var h_render = null;
        var h_postrender = null;
        var h_postrenderCleanup = null;
        var postProcessedRows = {};
        var postProcessToRow = null;
        var postProcessFromRow = null;
        var postProcessedCleanupQueue = [];
        var postProcessgroupId = 0;
        // perf counters
        var counter_rows_rendered = 0;
        var counter_rows_removed = 0;
        var $paneHeaderL;
        var $paneHeaderR;
        var $paneTopL;
        var $paneTopR;
        var $paneBottomL;
        var $paneBottomR;
        var $headerScrollerL;
        var $headerScrollerR;
        var $headerL;
        var $headerR;
        var $groupHeadersL;
        var $groupHeadersR;
        var $headerRowScrollerL;
        var $headerRowScrollerR;
        var $footerRowScrollerL;
        var $footerRowScrollerR;
        var $headerRowL;
        var $headerRowR;
        var $footerRowL;
        var $footerRowR;
        var $topPanelScrollerL;
        var $topPanelScrollerR;
        var $topPanelL;
        var $topPanelR;
        var $viewportTopL;
        var $viewportTopR;
        var $viewportBottomL;
        var $viewportBottomR;
        var $canvasTopL;
        var $canvasTopR;
        var $canvasBottomL;
        var $canvasBottomR;
        var $viewportScrollContainerX;
        var $viewportScrollContainerY;
        var $headerScrollContainer;
        var $headerRowScrollContainer;
        var $footerRowScrollContainer;
        // store css attributes if display:none is active in container or parent
        var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
        var $hiddenParents;
        var oldProps = [];
        var columnResizeDragging = false;
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Initialization
        function init() {
            if (container instanceof $) {
                $container = container;
            }
            else {
                $container = $(container);
            }
            if ($container.length < 1) {
                throw new Error("SlickGrid requires a valid container, " + container + " does not exist in the DOM.");
            }
            // calculate these only once and share between grid instances
            maxSupportedCssHeight = maxSupportedCssHeight || getMaxSupportedCssHeight();
            options = $.extend({}, defaults, options);
            validateAndEnforceOptions();
            columnDefaults.width = options.defaultColumnWidth;
            if (!options.suppressCssChangesOnHiddenInit) {
                cacheCssForHiddenInit();
            }
            treeColumns = new Slick.TreeColumns(columns);
            columns = treeColumns.extractColumns();
            updateColumnProps();
            // validate loaded JavaScript modules against requested options
            if (options.enableColumnReorder && !$.fn.sortable) {
                throw new Error("SlickGrid's 'enableColumnReorder = true' option requires jquery-ui.sortable module to be loaded");
            }
            editController = {
                "commitCurrentEdit": commitCurrentEdit,
                "cancelCurrentEdit": cancelCurrentEdit
            };
            $container
                .empty()
                .css("overflow", "hidden")
                .css("outline", 0)
                .addClass(uid)
                .addClass("ui-widget");
            // set up a positioning container if needed
            if (!(/relative|absolute|fixed/).test($container.css("position"))) {
                $container.css("position", "relative");
            }
            $focusSink = $("<div tabIndex='0' hideFocus style='position:fixed;width:0;height:0;top:0;left:0;outline:0;'></div>").appendTo($container);
            // Containers used for scrolling frozen columns and rows
            $paneHeaderL = $("<div class='slick-pane slick-pane-header slick-pane-left' tabIndex='0' />").appendTo($container);
            $paneHeaderR = $("<div class='slick-pane slick-pane-header slick-pane-right' tabIndex='0' />").appendTo($container);
            $paneTopL = $("<div class='slick-pane slick-pane-top slick-pane-left' tabIndex='0' />").appendTo($container);
            $paneTopR = $("<div class='slick-pane slick-pane-top slick-pane-right' tabIndex='0' />").appendTo($container);
            $paneBottomL = $("<div class='slick-pane slick-pane-bottom slick-pane-left' tabIndex='0' />").appendTo($container);
            $paneBottomR = $("<div class='slick-pane slick-pane-bottom slick-pane-right' tabIndex='0' />").appendTo($container);
            if (options.createPreHeaderPanel) {
                $preHeaderPanelScroller = $("<div class='slick-preheader-panel ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($paneHeaderL);
                $preHeaderPanel = $("<div />").appendTo($preHeaderPanelScroller);
                $preHeaderPanelSpacer = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .appendTo($preHeaderPanelScroller);
                $preHeaderPanelScrollerR = $("<div class='slick-preheader-panel ui-state-default' style='overflow:hidden;position:relative;' />").appendTo($paneHeaderR);
                $preHeaderPanelR = $("<div />").appendTo($preHeaderPanelScrollerR);
                $preHeaderPanelSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .appendTo($preHeaderPanelScrollerR);
                if (!options.showPreHeaderPanel) {
                    $preHeaderPanelScroller.hide();
                    $preHeaderPanelScrollerR.hide();
                }
            }
            // Append the header scroller containers
            $headerScrollerL = $("<div class='slick-header ui-state-default slick-header-left' />").appendTo($paneHeaderL);
            $headerScrollerR = $("<div class='slick-header ui-state-default slick-header-right' />").appendTo($paneHeaderR);
            // Cache the header scroller containers
            $headerScroller = $().add($headerScrollerL).add($headerScrollerR);
            if (treeColumns.hasDepth()) {
                $groupHeadersL = [];
                $groupHeadersR = [];
                for (var index = 0; index < treeColumns.getDepth() - 1; index++) {
                    $groupHeadersL[index] = $("<div class='slick-group-header-columns slick-group-header-columns-left' style='left:-1000px' />").appendTo($headerScrollerL);
                    $groupHeadersR[index] = $("<div class='slick-group-header-columns slick-group-header-columns-right' style='left:-1000px' />").appendTo($headerScrollerR);
                }
                $groupHeaders = $().add($groupHeadersL).add($groupHeadersR);
            }
            // Append the columnn containers to the headers
            $headerL = $("<div class='slick-header-columns slick-header-columns-left' style='left:-1000px' />").appendTo($headerScrollerL);
            $headerR = $("<div class='slick-header-columns slick-header-columns-right' style='left:-1000px' />").appendTo($headerScrollerR);
            // Cache the header columns
            $headers = $().add($headerL).add($headerR);
            $headerRowScrollerL = $("<div class='slick-headerrow ui-state-default' />").appendTo($paneTopL);
            $headerRowScrollerR = $("<div class='slick-headerrow ui-state-default' />").appendTo($paneTopR);
            $headerRowScroller = $().add($headerRowScrollerL).add($headerRowScrollerR);
            $headerRowSpacerL = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                .appendTo($headerRowScrollerL);
            $headerRowSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                .appendTo($headerRowScrollerR);
            $headerRowL = $("<div class='slick-headerrow-columns slick-headerrow-columns-left' />").appendTo($headerRowScrollerL);
            $headerRowR = $("<div class='slick-headerrow-columns slick-headerrow-columns-right' />").appendTo($headerRowScrollerR);
            $headerRow = $().add($headerRowL).add($headerRowR);
            // Append the top panel scroller
            $topPanelScrollerL = $("<div class='slick-top-panel-scroller ui-state-default' />").appendTo($paneTopL);
            $topPanelScrollerR = $("<div class='slick-top-panel-scroller ui-state-default' />").appendTo($paneTopR);
            $topPanelScroller = $().add($topPanelScrollerL).add($topPanelScrollerR);
            // Append the top panel
            $topPanelL = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScrollerL);
            $topPanelR = $("<div class='slick-top-panel' style='width:10000px' />").appendTo($topPanelScrollerR);
            $topPanel = $().add($topPanelL).add($topPanelR);
            if (!options.showColumnHeader) {
                $headerScroller.hide();
            }
            if (!options.showTopPanel) {
                $topPanelScroller.hide();
            }
            if (!options.showHeaderRow) {
                $headerRowScroller.hide();
            }
            // Append the viewport containers
            $viewportTopL = $("<div class='slick-viewport slick-viewport-top slick-viewport-left' tabIndex='0' hideFocus />").appendTo($paneTopL);
            $viewportTopR = $("<div class='slick-viewport slick-viewport-top slick-viewport-right' tabIndex='0' hideFocus />").appendTo($paneTopR);
            $viewportBottomL = $("<div class='slick-viewport slick-viewport-bottom slick-viewport-left' tabIndex='0' hideFocus />").appendTo($paneBottomL);
            $viewportBottomR = $("<div class='slick-viewport slick-viewport-bottom slick-viewport-right' tabIndex='0' hideFocus />").appendTo($paneBottomR);
            // Cache the viewports
            $viewport = $().add($viewportTopL).add($viewportTopR).add($viewportBottomL).add($viewportBottomR);
            // Default the active viewport to the top left
            $activeViewportNode = $viewportTopL;
            // Append the canvas containers
            $canvasTopL = $("<div class='grid-canvas grid-canvas-top grid-canvas-left' tabIndex='0' hideFocus />").appendTo($viewportTopL);
            $canvasTopR = $("<div class='grid-canvas grid-canvas-top grid-canvas-right' tabIndex='0' hideFocus />").appendTo($viewportTopR);
            $canvasBottomL = $("<div class='grid-canvas grid-canvas-bottom grid-canvas-left' tabIndex='0' hideFocus />").appendTo($viewportBottomL);
            $canvasBottomR = $("<div class='grid-canvas grid-canvas-bottom grid-canvas-right' tabIndex='0' hideFocus />").appendTo($viewportBottomR);
            if (options.viewportClass)
                $viewport.toggleClass(options.viewportClass, true);
            // Cache the canvases
            $canvas = $().add($canvasTopL).add($canvasTopR).add($canvasBottomL).add($canvasBottomR);
            scrollbarDimensions = scrollbarDimensions || measureScrollbar();
            // Default the active canvas to the top left
            $activeCanvasNode = $canvasTopL;
            // pre-header
            if ($preHeaderPanelSpacer)
                $preHeaderPanelSpacer.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");
            $headers.width(getHeadersWidth());
            $headerRowSpacerL.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");
            $headerRowSpacerR.css("width", getCanvasWidth() + scrollbarDimensions.width + "px");
            // footer Row
            if (options.createFooterRow) {
                $footerRowScrollerR = $("<div class='slick-footerrow ui-state-default' />").appendTo($paneTopR);
                $footerRowScrollerL = $("<div class='slick-footerrow ui-state-default' />").appendTo($paneTopL);
                $footerRowScroller = $().add($footerRowScrollerL).add($footerRowScrollerR);
                $footerRowSpacerL = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
                    .appendTo($footerRowScrollerL);
                $footerRowSpacerR = $("<div style='display:block;height:1px;position:absolute;top:0;left:0;'></div>")
                    .css("width", getCanvasWidth() + scrollbarDimensions.width + "px")
                    .appendTo($footerRowScrollerR);
                $footerRowL = $("<div class='slick-footerrow-columns slick-footerrow-columns-left' />").appendTo($footerRowScrollerL);
                $footerRowR = $("<div class='slick-footerrow-columns slick-footerrow-columns-right' />").appendTo($footerRowScrollerR);
                $footerRow = $().add($footerRowL).add($footerRowR);
                if (!options.showFooterRow) {
                    $footerRowScroller.hide();
                }
            }
            $focusSink2 = $focusSink.clone().appendTo($container);
            if (!options.explicitInitialization) {
                finishInitialization();
            }
        }
        function finishInitialization() {
            if (!initialized) {
                initialized = true;
                getViewportWidth();
                getViewportHeight();
                // header columns and cells may have different padding/border skewing width calculations (box-sizing, hello?)
                // calculate the diff so we can set consistent sizes
                measureCellPaddingAndBorder();
                // for usability reasons, all text selection in SlickGrid is disabled
                // with the exception of input and textarea elements (selection must
                // be enabled there so that editors work as expected); note that
                // selection in grid cells (grid body) is already unavailable in
                // all browsers except IE
                disableSelection($headers); // disable all text selection in header (including input and textarea)
                if (!options.enableTextSelectionOnCells) {
                    // disable text selection in grid cells except in input and textarea elements
                    // (this is IE-specific, because selectstart event will only fire in IE)
                    $viewport.on("selectstart.ui", function (event) {
                        return $(event.target).is("input,textarea");
                    });
                }
                setFrozenOptions();
                setPaneVisibility();
                setScroller();
                setOverflow();
                updateColumnCaches();
                createColumnHeaders();
                createColumnGroupHeaders();
                createColumnFooter();
                setupColumnSort();
                createCssRules();
                resizeCanvas();
                bindAncestorScrollEvents();
                $container
                    .on("resize.slickgrid", resizeCanvas);
                $viewport
                    .on("scroll", handleScroll);
                if (jQuery.fn.mousewheel && options.enableMouseWheelScrollHandler) {
                    $viewport.on("mousewheel", handleMouseWheel);
                }
                $headerScroller
                    //.on("scroll", handleHeaderScroll)
                    .on("contextmenu", handleHeaderContextMenu)
                    .on("click", handleHeaderClick)
                    .on("mouseenter", ".slick-header-column", handleHeaderMouseEnter)
                    .on("mouseleave", ".slick-header-column", handleHeaderMouseLeave);
                $headerRowScroller
                    .on("scroll", handleHeaderRowScroll);
                if (options.createFooterRow) {
                    $footerRow
                        .on("contextmenu", handleFooterContextMenu)
                        .on("click", handleFooterClick);
                    $footerRowScroller
                        .on("scroll", handleFooterRowScroll);
                }
                if (options.createPreHeaderPanel) {
                    $preHeaderPanelScroller
                        .on("scroll", handlePreHeaderPanelScroll);
                }
                $focusSink.add($focusSink2)
                    .on("keydown", handleKeyDown);
                $canvas
                    .on("keydown", handleKeyDown)
                    .on("click", handleClick)
                    .on("dblclick", handleDblClick)
                    .on("contextmenu", handleContextMenu)
                    .on("draginit", handleDragInit)
                    .on("dragstart", { distance: 3 }, handleDragStart)
                    .on("drag", handleDrag)
                    .on("dragend", handleDragEnd)
                    .on("mouseenter", ".slick-cell", handleMouseEnter)
                    .on("mouseleave", ".slick-cell", handleMouseLeave);
                if (!options.suppressCssChangesOnHiddenInit) {
                    restoreCssFromHiddenInit();
                }
            }
        }
        function cacheCssForHiddenInit() {
            // handle display:none on container or container parents
            $hiddenParents = $container.parents().addBack().not(':visible');
            $hiddenParents.each(function () {
                var old = {};
                for (var name in cssShow) {
                    old[name] = this.style[name];
                    this.style[name] = cssShow[name];
                }
                oldProps.push(old);
            });
        }
        function restoreCssFromHiddenInit() {
            // finish handle display:none on container or container parents
            // - put values back the way they were
            $hiddenParents.each(function (i) {
                var old = oldProps[i];
                for (var name in cssShow) {
                    this.style[name] = old[name];
                }
            });
        }
        function hasFrozenColumns() {
            return options.frozenColumn > -1;
        }
        function registerPlugin(plugin) {
            plugins.unshift(plugin);
            plugin.init(self);
        }
        function unregisterPlugin(plugin) {
            for (var i = plugins.length; i >= 0; i--) {
                if (plugins[i] === plugin) {
                    if (plugins[i].destroy) {
                        plugins[i].destroy();
                    }
                    plugins.splice(i, 1);
                    break;
                }
            }
        }
        function getPluginByName(name) {
            for (var i = plugins.length - 1; i >= 0; i--) {
                if (plugins[i].pluginName === name) {
                    return plugins[i];
                }
            }
            return undefined;
        }
        function setSelectionModel(model) {
            if (selectionModel) {
                selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged);
                if (selectionModel.destroy) {
                    selectionModel.destroy();
                }
            }
            selectionModel = model;
            if (selectionModel) {
                selectionModel.init(self);
                selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged);
            }
        }
        function getSelectionModel() {
            return selectionModel;
        }
        function getCanvasNode(columnIdOrIdx, rowIndex) {
            return _getContainerElement(getCanvases(), columnIdOrIdx, rowIndex);
        }
        function getActiveCanvasNode(element) {
            setActiveCanvasNode(element);
            return $activeCanvasNode[0];
        }
        function getCanvases() {
            return $canvas;
        }
        function setActiveCanvasNode(element) {
            if (element) {
                $activeCanvasNode = $(element.target).closest('.grid-canvas');
            }
        }
        function getViewportNode(columnIdOrIdx, rowIndex) {
            return _getContainerElement(getViewports(), columnIdOrIdx, rowIndex);
        }
        function getViewports() {
            return $viewport;
        }
        function getActiveViewportNode(element) {
            setActiveViewportNode(element);
            return $activeViewportNode[0];
        }
        function setActiveViewportNode(element) {
            if (element) {
                $activeViewportNode = $(element.target).closest('.slick-viewport');
            }
        }
        function _getContainerElement($targetContainers, columnIdOrIdx, rowIndex) {
            if (!$targetContainers) {
                return;
            }
            if (!columnIdOrIdx) {
                columnIdOrIdx = 0;
            }
            if (!rowIndex) {
                rowIndex = 0;
            }
            var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));
            var isBottomSide = hasFrozenRows && rowIndex >= actualFrozenRow + (options.frozenBottom ? 0 : 1);
            var isRightSide = hasFrozenColumns() && idx > options.frozenColumn;
            return $targetContainers[(isBottomSide ? 2 : 0) + (isRightSide ? 1 : 0)];
        }
        function measureScrollbar() {
            var $outerdiv = $('<div class="' + $viewport.className + '" style="position:absolute; top:-10000px; left:-10000px; overflow:auto; width:100px; height:100px;"></div>').appendTo('body');
            var $innerdiv = $('<div style="width:200px; height:200px; overflow:auto;"></div>').appendTo($outerdiv);
            var dim = {
                width: $outerdiv[0].offsetWidth - $outerdiv[0].clientWidth,
                height: $outerdiv[0].offsetHeight - $outerdiv[0].clientHeight
            };
            $innerdiv.remove();
            $outerdiv.remove();
            return dim;
        }
        function getHeadersWidth() {
            headersWidth = headersWidthL = headersWidthR = 0;
            var includeScrollbar = !options.autoHeight;
            for (var i = 0, ii = columns.length; i < ii; i++) {
                var width = columns[i].width;
                if ((options.frozenColumn) > -1 && (i > options.frozenColumn)) {
                    headersWidthR += width;
                }
                else {
                    headersWidthL += width;
                }
            }
            if (includeScrollbar) {
                if ((options.frozenColumn) > -1 && (i > options.frozenColumn)) {
                    headersWidthR += scrollbarDimensions.width;
                }
                else {
                    headersWidthL += scrollbarDimensions.width;
                }
            }
            if (hasFrozenColumns()) {
                headersWidthL = headersWidthL + 1000;
                headersWidthR = Math.max(headersWidthR, viewportW) + headersWidthL;
                headersWidthR += scrollbarDimensions.width;
            }
            else {
                headersWidthL += scrollbarDimensions.width;
                headersWidthL = Math.max(headersWidthL, viewportW) + 1000;
            }
            headersWidth = headersWidthL + headersWidthR;
            return Math.max(headersWidth, viewportW) + 1000;
        }
        function getHeadersWidthL() {
            headersWidthL = 0;
            columns.forEach(function (column, i) {
                if (!((options.frozenColumn) > -1 && (i > options.frozenColumn)))
                    headersWidthL += column.width;
            });
            if (hasFrozenColumns()) {
                headersWidthL += 1000;
            }
            else {
                headersWidthL += scrollbarDimensions.width;
                headersWidthL = Math.max(headersWidthL, viewportW) + 1000;
            }
            return headersWidthL;
        }
        function getHeadersWidthR() {
            headersWidthR = 0;
            columns.forEach(function (column, i) {
                if ((options.frozenColumn) > -1 && (i > options.frozenColumn))
                    headersWidthR += column.width;
            });
            if (hasFrozenColumns()) {
                headersWidthR = Math.max(headersWidthR, viewportW) + getHeadersWidthL();
                headersWidthR += scrollbarDimensions.width;
            }
            return headersWidthR;
        }
        function getCanvasWidth() {
            var availableWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
            var i = columns.length;
            canvasWidthL = canvasWidthR = 0;
            while (i--) {
                if (hasFrozenColumns() && (i > options.frozenColumn)) {
                    canvasWidthR += columns[i].width;
                }
                else {
                    canvasWidthL += columns[i].width;
                }
            }
            var totalRowWidth = canvasWidthL + canvasWidthR;
            return options.fullWidthRows ? Math.max(totalRowWidth, availableWidth) : totalRowWidth;
        }
        function updateCanvasWidth(forceColumnWidthsUpdate) {
            var oldCanvasWidth = canvasWidth;
            var oldCanvasWidthL = canvasWidthL;
            var oldCanvasWidthR = canvasWidthR;
            var widthChanged;
            canvasWidth = getCanvasWidth();
            widthChanged = canvasWidth !== oldCanvasWidth || canvasWidthL !== oldCanvasWidthL || canvasWidthR !== oldCanvasWidthR;
            if (widthChanged || hasFrozenColumns() || hasFrozenRows) {
                $canvasTopL.width(canvasWidthL);
                getHeadersWidth();
                $headerL.width(headersWidthL);
                $headerR.width(headersWidthR);
                if (hasFrozenColumns()) {
                    $canvasTopR.width(canvasWidthR);
                    $paneHeaderL.width(canvasWidthL);
                    $paneHeaderR.css('left', canvasWidthL);
                    $paneHeaderR.css('width', viewportW - canvasWidthL);
                    $paneTopL.width(canvasWidthL);
                    $paneTopR.css('left', canvasWidthL);
                    $paneTopR.css('width', viewportW - canvasWidthL);
                    $headerRowScrollerL.width(canvasWidthL);
                    $headerRowScrollerR.width(viewportW - canvasWidthL);
                    $headerRowL.width(canvasWidthL);
                    $headerRowR.width(canvasWidthR);
                    if (options.createFooterRow) {
                        $footerRowScrollerL.width(canvasWidthL);
                        $footerRowScrollerR.width(viewportW - canvasWidthL);
                        $footerRowL.width(canvasWidthL);
                        $footerRowR.width(canvasWidthR);
                    }
                    if (options.createPreHeaderPanel) {
                        $preHeaderPanel.width(canvasWidth);
                    }
                    $viewportTopL.width(canvasWidthL);
                    $viewportTopR.width(viewportW - canvasWidthL);
                    if (hasFrozenRows) {
                        $paneBottomL.width(canvasWidthL);
                        $paneBottomR.css('left', canvasWidthL);
                        $viewportBottomL.width(canvasWidthL);
                        $viewportBottomR.width(viewportW - canvasWidthL);
                        $canvasBottomL.width(canvasWidthL);
                        $canvasBottomR.width(canvasWidthR);
                    }
                }
                else {
                    $paneHeaderL.width('100%');
                    $paneTopL.width('100%');
                    $headerRowScrollerL.width('100%');
                    $headerRowL.width(canvasWidth);
                    if (options.createFooterRow) {
                        $footerRowScrollerL.width('100%');
                        $footerRowL.width(canvasWidth);
                    }
                    if (options.createPreHeaderPanel) {
                        $preHeaderPanel.width('100%');
                        $preHeaderPanel.width(canvasWidth);
                    }
                    $viewportTopL.width('100%');
                    if (hasFrozenRows) {
                        $viewportBottomL.width('100%');
                        $canvasBottomL.width(canvasWidthL);
                    }
                }
                viewportHasHScroll = (canvasWidth >= viewportW - scrollbarDimensions.width);
            }
            $headerRowSpacerL.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
            $headerRowSpacerR.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
            if (options.createFooterRow) {
                $footerRowSpacerL.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
                $footerRowSpacerR.width(canvasWidth + (viewportHasVScroll ? scrollbarDimensions.width : 0));
            }
            if (widthChanged || forceColumnWidthsUpdate) {
                applyColumnWidths();
            }
        }
        function disableSelection($target) {
            if ($target && $target.jquery) {
                $target
                    .attr("unselectable", "on")
                    .css("MozUserSelect", "none")
                    .on("selectstart.ui", function () {
                    return false;
                }); // from jquery:ui.core.js 1.7.2
            }
        }
        function getMaxSupportedCssHeight() {
            var supportedHeight = 1000000;
            // FF reports the height back but still renders blank after ~6M px
            var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 6000000 : 1000000000;
            var div = $("<div style='display:none' />").appendTo(document.body);
            while (true) {
                var test = supportedHeight * 2;
                div.css("height", test);
                if (test > testUpTo || div.height() !== test) {
                    break;
                }
                else {
                    supportedHeight = test;
                }
            }
            div.remove();
            return supportedHeight;
        }
        function getUID() {
            return uid;
        }
        function getHeaderColumnWidthDiff() {
            return headerColumnWidthDiff;
        }
        function getScrollbarDimensions() {
            return scrollbarDimensions;
        }
        // TODO:  this is static.  need to handle page mutation.
        function bindAncestorScrollEvents() {
            var elem = (hasFrozenRows && !options.frozenBottom) ? $canvasBottomL[0] : $canvasTopL[0];
            while ((elem = elem.parentNode) != document.body && elem != null) {
                // bind to scroll containers only
                if (elem == $viewportTopL[0] || elem.scrollWidth != elem.clientWidth || elem.scrollHeight != elem.clientHeight) {
                    var $elem = $(elem);
                    if (!$boundAncestors) {
                        $boundAncestors = $elem;
                    }
                    else {
                        $boundAncestors = $boundAncestors.add($elem);
                    }
                    $elem.on("scroll." + uid, handleActiveCellPositionChange);
                }
            }
        }
        function unbindAncestorScrollEvents() {
            if (!$boundAncestors) {
                return;
            }
            $boundAncestors.off("scroll." + uid);
            $boundAncestors = null;
        }
        function updateColumnHeader(columnId, title, toolTip) {
            if (!initialized) {
                return;
            }
            var idx = getColumnIndex(columnId);
            if (idx == null) {
                return;
            }
            var columnDef = columns[idx];
            var $header = $headers.children().eq(idx);
            if ($header) {
                if (title !== undefined) {
                    columns[idx].name = title;
                }
                if (toolTip !== undefined) {
                    columns[idx].toolTip = toolTip;
                }
                trigger(self.onBeforeHeaderCellDestroy, {
                    "node": $header[0],
                    "column": columnDef,
                    "grid": self
                });
                $header
                    .attr("title", toolTip || "")
                    .children().eq(0).html(title);
                trigger(self.onHeaderCellRendered, {
                    "node": $header[0],
                    "column": columnDef,
                    "grid": self
                });
            }
        }
        function getHeader(columnDef) {
            if (!columnDef) {
                return hasFrozenColumns() ? $headers : $headerL;
            }
            var idx = getColumnIndex(columnDef.id);
            return hasFrozenColumns() ? ((idx <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
        }
        function getHeaderColumn(columnIdOrIdx) {
            var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));
            var targetHeader = hasFrozenColumns() ? ((idx <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
            var targetIndex = hasFrozenColumns() ? ((idx <= options.frozenColumn) ? idx : idx - options.frozenColumn - 1) : idx;
            var $rtn = targetHeader.children().eq(targetIndex);
            return $rtn && $rtn[0];
        }
        function getHeaderRow() {
            return hasFrozenColumns() ? $headerRow : $headerRow[0];
        }
        function getFooterRow() {
            return hasFrozenColumns() ? $footerRow : $footerRow[0];
        }
        function getPreHeaderPanel() {
            return $preHeaderPanel[0];
        }
        function getPreHeaderPanelRight() {
            return $preHeaderPanelR[0];
        }
        function getHeaderRowColumn(columnIdOrIdx) {
            var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));
            var $headerRowTarget;
            if (hasFrozenColumns()) {
                if (idx <= options.frozenColumn) {
                    $headerRowTarget = $headerRowL;
                }
                else {
                    $headerRowTarget = $headerRowR;
                    idx -= options.frozenColumn + 1;
                }
            }
            else {
                $headerRowTarget = $headerRowL;
            }
            var $header = $headerRowTarget.children().eq(idx);
            return $header && $header[0];
        }
        function getFooterRowColumn(columnIdOrIdx) {
            var idx = (typeof columnIdOrIdx === "number" ? columnIdOrIdx : getColumnIndex(columnIdOrIdx));
            var $footerRowTarget;
            if (hasFrozenColumns()) {
                if (idx <= options.frozenColumn) {
                    $footerRowTarget = $footerRowL;
                }
                else {
                    $footerRowTarget = $footerRowR;
                    idx -= options.frozenColumn + 1;
                }
            }
            else {
                $footerRowTarget = $footerRowL;
            }
            var $footer = $footerRowTarget && $footerRowTarget.children().eq(idx);
            return $footer && $footer[0];
        }
        function createColumnFooter() {
            if (options.createFooterRow) {
                $footerRow.find(".slick-footerrow-column")
                    .each(function () {
                    var columnDef = $(this).data("column");
                    if (columnDef) {
                        trigger(self.onBeforeFooterRowCellDestroy, {
                            "node": this,
                            "column": columnDef,
                            "grid": self
                        });
                    }
                });
                $footerRowL.empty();
                $footerRowR.empty();
                for (var i = 0; i < columns.length; i++) {
                    var m = columns[i];
                    var footerRowCell = $("<div class='ui-state-default slick-footerrow-column l" + i + " r" + i + "'></div>")
                        .data("column", m)
                        .addClass(hasFrozenColumns() && i <= options.frozenColumn ? 'frozen' : '')
                        .appendTo(hasFrozenColumns() && (i > options.frozenColumn) ? $footerRowR : $footerRowL);
                    trigger(self.onFooterRowCellRendered, {
                        "node": footerRowCell[0],
                        "column": m,
                        "grid": self
                    });
                }
            }
        }
        function createColumnGroupHeaders() {
            var columnsLength = 0;
            var frozenColumnsValid = false;
            if (!treeColumns.hasDepth())
                return;
            for (var index = 0; index < $groupHeadersL.length; index++) {
                $groupHeadersL[index].empty();
                $groupHeadersR[index].empty();
                var groupColumns = treeColumns.getColumnsInDepth(index);
                for (var indexGroup in groupColumns) {
                    var m = groupColumns[indexGroup];
                    columnsLength += m.extractColumns().length;
                    if (hasFrozenColumns() && index === 0 && (columnsLength - 1) === options.frozenColumn)
                        frozenColumnsValid = true;
                    $("<div class='ui-state-default slick-group-header-column' />")
                        .html("<span class='slick-column-name'>" + m.name + "</span>")
                        .attr("id", "" + uid + m.id)
                        .attr("title", m.toolTip || "")
                        .data("column", m)
                        .addClass(m.headerCssClass || "")
                        .addClass(hasFrozenColumns() && (columnsLength - 1) > options.frozenColumn ? 'frozen' : '')
                        .appendTo(hasFrozenColumns() && (columnsLength - 1) > options.frozenColumn ? $groupHeadersR[index] : $groupHeadersL[index]);
                }
                if (hasFrozenColumns() && index === 0 && !frozenColumnsValid) {
                    $groupHeadersL[index].empty();
                    $groupHeadersR[index].empty();
                    alert("All columns of group should to be grouped!");
                    break;
                }
            }
            applyColumnGroupHeaderWidths();
        }
        function createColumnHeaders() {
            function onMouseEnter() {
                $(this).addClass("ui-state-hover");
            }
            function onMouseLeave() {
                $(this).removeClass("ui-state-hover");
            }
            $headers.find(".slick-header-column")
                .each(function () {
                var columnDef = $(this).data("column");
                if (columnDef) {
                    trigger(self.onBeforeHeaderCellDestroy, {
                        "node": this,
                        "column": columnDef,
                        "grid": self
                    });
                }
            });
            $headerL.empty();
            $headerR.empty();
            getHeadersWidth();
            $headerL.width(headersWidthL);
            $headerR.width(headersWidthR);
            $headerRow.find(".slick-headerrow-column")
                .each(function () {
                var columnDef = $(this).data("column");
                if (columnDef) {
                    trigger(self.onBeforeHeaderRowCellDestroy, {
                        "node": this,
                        "column": columnDef,
                        "grid": self
                    });
                }
            });
            $headerRowL.empty();
            $headerRowR.empty();
            if (options.createFooterRow) {
                $footerRowL.find(".slick-footerrow-column")
                    .each(function () {
                    var columnDef = $(this).data("column");
                    if (columnDef) {
                        trigger(self.onBeforeFooterRowCellDestroy, {
                            "node": this,
                            "column": columnDef,
                            "grid": self
                        });
                    }
                });
                $footerRowL.empty();
                if (hasFrozenColumns()) {
                    $footerRowR.find(".slick-footerrow-column")
                        .each(function () {
                        var columnDef = $(this).data("column");
                        if (columnDef) {
                            trigger(self.onBeforeFooterRowCellDestroy, {
                                "node": this,
                                "column": columnDef,
                                "grid": self
                            });
                        }
                    });
                    $footerRowR.empty();
                }
            }
            for (var i = 0; i < columns.length; i++) {
                var m = columns[i];
                var $headerTarget = hasFrozenColumns() ? ((i <= options.frozenColumn) ? $headerL : $headerR) : $headerL;
                var $headerRowTarget = hasFrozenColumns() ? ((i <= options.frozenColumn) ? $headerRowL : $headerRowR) : $headerRowL;
                var header = $("<div class='ui-state-default slick-header-column' />")
                    .html("<span class='slick-column-name'>" + m.name + "</span>")
                    .width(m.width - headerColumnWidthDiff)
                    .attr("id", "" + uid + m.id)
                    .attr("title", m.toolTip || "")
                    .data("column", m)
                    .addClass(m.headerCssClass || "")
                    .addClass(hasFrozenColumns() && i <= options.frozenColumn ? 'frozen' : '')
                    .appendTo($headerTarget);
                if (options.enableColumnReorder || m.sortable) {
                    header
                        .on('mouseenter', onMouseEnter)
                        .on('mouseleave', onMouseLeave);
                }
                if (m.hasOwnProperty('headerCellAttrs') && m.headerCellAttrs instanceof Object) {
                    for (var key in m.headerCellAttrs) {
                        if (m.headerCellAttrs.hasOwnProperty(key)) {
                            header.attr(key, m.headerCellAttrs[key]);
                        }
                    }
                }
                if (m.sortable) {
                    header.addClass("slick-header-sortable");
                    header.append("<span class='slick-sort-indicator"
                        + (options.numberedMultiColumnSort && !options.sortColNumberInSeparateSpan ? " slick-sort-indicator-numbered" : "") + "' />");
                    if (options.numberedMultiColumnSort && options.sortColNumberInSeparateSpan) {
                        header.append("<span class='slick-sort-indicator-numbered' />");
                    }
                }
                trigger(self.onHeaderCellRendered, {
                    "node": header[0],
                    "column": m,
                    "grid": self
                });
                if (options.showHeaderRow) {
                    var headerRowCell = $("<div class='ui-state-default slick-headerrow-column l" + i + " r" + i + "'></div>")
                        .data("column", m)
                        .addClass(hasFrozenColumns() && i <= options.frozenColumn ? 'frozen' : '')
                        .appendTo($headerRowTarget);
                    trigger(self.onHeaderRowCellRendered, {
                        "node": headerRowCell[0],
                        "column": m,
                        "grid": self
                    });
                }
                if (options.createFooterRow && options.showFooterRow) {
                    var footerRowCell = $("<div class='ui-state-default slick-footerrow-column l" + i + " r" + i + "'></div>")
                        .data("column", m)
                        .appendTo($footerRow);
                    trigger(self.onFooterRowCellRendered, {
                        "node": footerRowCell[0],
                        "column": m,
                        "grid": self
                    });
                }
            }
            setSortColumns(sortColumns);
            setupColumnResize();
            if (options.enableColumnReorder) {
                if (typeof options.enableColumnReorder == 'function') {
                    options.enableColumnReorder(self, $headers, headerColumnWidthDiff, setColumns, setupColumnResize, columns, getColumnIndex, uid, trigger);
                }
                else {
                    setupColumnReorder();
                }
            }
        }
        function setupColumnSort() {
            $headers.click(function (e) {
                if (columnResizeDragging)
                    return;
                // temporary workaround for a bug in jQuery 1.7.1 (http://bugs.jquery.com/ticket/11328)
                e.metaKey = e.metaKey || e.ctrlKey;
                if ($(e.target).hasClass("slick-resizable-handle")) {
                    return;
                }
                var $col = $(e.target).closest(".slick-header-column");
                if (!$col.length) {
                    return;
                }
                var column = $col.data("column");
                if (column.sortable) {
                    if (!getEditorLock().commitCurrentEdit()) {
                        return;
                    }
                    var previousSortColumns = $.extend(true, [], sortColumns);
                    var sortColumn = null;
                    var i = 0;
                    for (; i < sortColumns.length; i++) {
                        if (sortColumns[i].columnId == column.id) {
                            sortColumn = sortColumns[i];
                            sortColumn.sortAsc = !sortColumn.sortAsc;
                            break;
                        }
                    }
                    var hadSortCol = !!sortColumn;
                    if (options.tristateMultiColumnSort) {
                        if (!sortColumn) {
                            sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
                        }
                        if (hadSortCol && sortColumn.sortAsc) {
                            // three state: remove sort rather than go back to ASC
                            sortColumns.splice(i, 1);
                            sortColumn = null;
                        }
                        if (!options.multiColumnSort) {
                            sortColumns = [];
                        }
                        if (sortColumn && (!hadSortCol || !options.multiColumnSort)) {
                            sortColumns.push(sortColumn);
                        }
                    }
                    else {
                        // legacy behaviour
                        if (e.metaKey && options.multiColumnSort) {
                            if (sortColumn) {
                                sortColumns.splice(i, 1);
                            }
                        }
                        else {
                            if ((!e.shiftKey && !e.metaKey) || !options.multiColumnSort) {
                                sortColumns = [];
                            }
                            if (!sortColumn) {
                                sortColumn = { columnId: column.id, sortAsc: column.defaultSortAsc };
                                sortColumns.push(sortColumn);
                            }
                            else if (sortColumns.length === 0) {
                                sortColumns.push(sortColumn);
                            }
                        }
                    }
                    var onSortArgs;
                    if (!options.multiColumnSort) {
                        onSortArgs = {
                            multiColumnSort: false,
                            previousSortColumns: previousSortColumns,
                            columnId: (sortColumns.length > 0 ? column.id : null),
                            sortCol: (sortColumns.length > 0 ? column : null),
                            sortAsc: (sortColumns.length > 0 ? sortColumns[0].sortAsc : true)
                        };
                    }
                    else {
                        onSortArgs = {
                            multiColumnSort: true,
                            previousSortColumns: previousSortColumns,
                            sortCols: $.map(sortColumns, function (col) {
                                return { columnId: columns[getColumnIndex(col.columnId)].id, sortCol: columns[getColumnIndex(col.columnId)], sortAsc: col.sortAsc };
                            })
                        };
                    }
                    if (trigger(self.onBeforeSort, onSortArgs, e) !== false) {
                        setSortColumns(sortColumns);
                        trigger(self.onSort, onSortArgs, e);
                    }
                }
            });
        }
        function currentPositionInHeader(id) {
            var currentPosition = 0;
            $headers.find('.slick-header-column').each(function (i) {
                if (this.id == id) {
                    currentPosition = i;
                    return false;
                }
            });
            return currentPosition;
        }
        function limitPositionInGroup(idColumn) {
            var groupColumnOfPreviousPosition, startLimit = 0, endLimit = 0;
            treeColumns
                .getColumnsInDepth($groupHeadersL.length - 1)
                .some(function (groupColumn) {
                startLimit = endLimit;
                endLimit += groupColumn.columns.length;
                groupColumn.columns.some(function (column) {
                    if (column.id === idColumn)
                        groupColumnOfPreviousPosition = groupColumn;
                    return groupColumnOfPreviousPosition;
                });
                return groupColumnOfPreviousPosition;
            });
            endLimit--;
            return {
                start: startLimit,
                end: endLimit,
                group: groupColumnOfPreviousPosition
            };
        }
        function remove(arr, elem) {
            var index = arr.lastIndexOf(elem);
            if (index > -1) {
                arr.splice(index, 1);
                remove(arr, elem);
            }
        }
        function columnPositionValidInGroup($item) {
            var currentPosition = currentPositionInHeader($item[0].id);
            var limit = limitPositionInGroup($item.data('column').id);
            var positionValid = limit.start <= currentPosition && currentPosition <= limit.end;
            return {
                limit: limit,
                valid: positionValid,
                message: positionValid ? '' : 'Column "'.concat($item.text(), '" can be reordered only within the "', limit.group.name, '" group!')
            };
        }
        function setupColumnReorder() {
            $headers.filter(":ui-sortable").sortable("destroy");
            var columnScrollTimer = null;
            function scrollColumnsRight() {
                $viewportScrollContainerX[0].scrollLeft = $viewportScrollContainerX[0].scrollLeft + 10;
            }
            function scrollColumnsLeft() {
                $viewportScrollContainerX[0].scrollLeft = $viewportScrollContainerX[0].scrollLeft - 10;
            }
            var canDragScroll;
            $headers.sortable({
                containment: "parent",
                distance: 3,
                axis: "x",
                cursor: "default",
                tolerance: "intersection",
                helper: "clone",
                placeholder: "slick-sortable-placeholder ui-state-default slick-header-column",
                start: function (e, ui) {
                    ui.placeholder.width(ui.helper.outerWidth() - headerColumnWidthDiff);
                    canDragScroll = !hasFrozenColumns() ||
                        (ui.placeholder.offset().left + ui.placeholder.width()) > $viewportScrollContainerX.offset().left;
                    $(ui.helper).addClass("slick-header-column-active");
                },
                beforeStop: function (e, ui) {
                    $(ui.helper).removeClass("slick-header-column-active");
                },
                sort: function (e, ui) {
                    if (canDragScroll && e.originalEvent.pageX > $container[0].clientWidth) {
                        if (!(columnScrollTimer)) {
                            columnScrollTimer = setInterval(scrollColumnsRight, 100);
                        }
                    }
                    else if (canDragScroll && e.originalEvent.pageX < $viewportScrollContainerX.offset().left) {
                        if (!(columnScrollTimer)) {
                            columnScrollTimer = setInterval(scrollColumnsLeft, 100);
                        }
                    }
                    else {
                        clearInterval(columnScrollTimer);
                        columnScrollTimer = null;
                    }
                },
                stop: function (e, ui) {
                    var cancel = false;
                    clearInterval(columnScrollTimer);
                    columnScrollTimer = null;
                    var limit = null;
                    if (treeColumns.hasDepth()) {
                        var validPositionInGroup = columnPositionValidInGroup(ui.item);
                        limit = validPositionInGroup.limit;
                        cancel = !validPositionInGroup.valid;
                        if (cancel)
                            alert(validPositionInGroup.message);
                    }
                    if (cancel || !getEditorLock().commitCurrentEdit()) {
                        $(this).sortable("cancel");
                        return;
                    }
                    var reorderedIds = $headerL.sortable("toArray");
                    reorderedIds = reorderedIds.concat($headerR.sortable("toArray"));
                    var reorderedColumns = [];
                    for (var i = 0; i < reorderedIds.length; i++) {
                        reorderedColumns.push(columns[getColumnIndex(reorderedIds[i].replace(uid, ""))]);
                    }
                    setColumns(reorderedColumns);
                    trigger(self.onColumnsReordered, { impactedColumns: getImpactedColumns(limit) });
                    e.stopPropagation();
                    setupColumnResize();
                }
            });
        }
        function getImpactedColumns(limit) {
            var impactedColumns = [];
            if (limit) {
                for (var i = limit.start; i <= limit.end; i++) {
                    impactedColumns.push(columns[i]);
                }
            }
            else {
                impactedColumns = columns;
            }
            return impactedColumns;
        }
        function setupColumnResize() {
            var $col, j, k, c, pageX, columnElements, minPageX, maxPageX, firstResizable, lastResizable;
            var frozenLeftColMaxWidth = 0;
            columnElements = $headers.children();
            columnElements.find(".slick-resizable-handle").remove();
            columnElements.each(function (i, e) {
                if (i >= columns.length) {
                    return;
                }
                if (columns[i].resizable) {
                    if (firstResizable === undefined) {
                        firstResizable = i;
                    }
                    lastResizable = i;
                }
            });
            if (firstResizable === undefined) {
                return;
            }
            columnElements.each(function (i, e) {
                if (i >= columns.length) {
                    return;
                }
                if (i < firstResizable || (options.forceFitColumns && i >= lastResizable)) {
                    return;
                }
                $col = $(e);
                $("<div class='slick-resizable-handle' />")
                    .appendTo(e)
                    .on("dragstart", function (e, dd) {
                    if (!getEditorLock().commitCurrentEdit()) {
                        return false;
                    }
                    pageX = e.pageX;
                    frozenLeftColMaxWidth = 0;
                    $(this).parent().addClass("slick-header-column-active");
                    var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
                    // lock each column's width option to current width
                    columnElements.each(function (i, e) {
                        if (i >= columns.length) {
                            return;
                        }
                        columns[i].previousWidth = $(e).outerWidth();
                    });
                    if (options.forceFitColumns) {
                        shrinkLeewayOnRight = 0;
                        stretchLeewayOnRight = 0;
                        // colums on right affect maxPageX/minPageX
                        for (j = i + 1; j < columns.length; j++) {
                            c = columns[j];
                            if (c.resizable) {
                                if (stretchLeewayOnRight !== null) {
                                    if (c.maxWidth) {
                                        stretchLeewayOnRight += c.maxWidth - c.previousWidth;
                                    }
                                    else {
                                        stretchLeewayOnRight = null;
                                    }
                                }
                                shrinkLeewayOnRight += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                            }
                        }
                    }
                    var shrinkLeewayOnLeft = 0, stretchLeewayOnLeft = 0;
                    for (j = 0; j <= i; j++) {
                        // columns on left only affect minPageX
                        c = columns[j];
                        if (c.resizable) {
                            if (stretchLeewayOnLeft !== null) {
                                if (c.maxWidth) {
                                    stretchLeewayOnLeft += c.maxWidth - c.previousWidth;
                                }
                                else {
                                    stretchLeewayOnLeft = null;
                                }
                            }
                            shrinkLeewayOnLeft += c.previousWidth - Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                        }
                    }
                    if (shrinkLeewayOnRight === null) {
                        shrinkLeewayOnRight = 100000;
                    }
                    if (shrinkLeewayOnLeft === null) {
                        shrinkLeewayOnLeft = 100000;
                    }
                    if (stretchLeewayOnRight === null) {
                        stretchLeewayOnRight = 100000;
                    }
                    if (stretchLeewayOnLeft === null) {
                        stretchLeewayOnLeft = 100000;
                    }
                    maxPageX = pageX + Math.min(shrinkLeewayOnRight, stretchLeewayOnLeft);
                    minPageX = pageX - Math.min(shrinkLeewayOnLeft, stretchLeewayOnRight);
                })
                    .on("drag", function (e, dd) {
                    columnResizeDragging = true;
                    var actualMinWidth, d = Math.min(maxPageX, Math.max(minPageX, e.pageX)) - pageX, x;
                    var newCanvasWidthL = 0, newCanvasWidthR = 0;
                    var viewportWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
                    if (d < 0) { // shrink column
                        x = d;
                        for (j = i; j >= 0; j--) {
                            c = columns[j];
                            if (c.resizable) {
                                actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                if (x && c.previousWidth + x < actualMinWidth) {
                                    x += c.previousWidth - actualMinWidth;
                                    c.width = actualMinWidth;
                                }
                                else {
                                    c.width = c.previousWidth + x;
                                    x = 0;
                                }
                            }
                        }
                        for (k = 0; k <= i; k++) {
                            c = columns[k];
                            if (hasFrozenColumns() && (k > options.frozenColumn)) {
                                newCanvasWidthR += c.width;
                            }
                            else {
                                newCanvasWidthL += c.width;
                            }
                        }
                        if (options.forceFitColumns) {
                            x = -d;
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (c.resizable) {
                                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                        x -= c.maxWidth - c.previousWidth;
                                        c.width = c.maxWidth;
                                    }
                                    else {
                                        c.width = c.previousWidth + x;
                                        x = 0;
                                    }
                                    if (hasFrozenColumns() && (j > options.frozenColumn)) {
                                        newCanvasWidthR += c.width;
                                    }
                                    else {
                                        newCanvasWidthL += c.width;
                                    }
                                }
                            }
                        }
                        else {
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (hasFrozenColumns() && (j > options.frozenColumn)) {
                                    newCanvasWidthR += c.width;
                                }
                                else {
                                    newCanvasWidthL += c.width;
                                }
                            }
                        }
                        if (options.forceFitColumns) {
                            x = -d;
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (c.resizable) {
                                    if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                        x -= c.maxWidth - c.previousWidth;
                                        c.width = c.maxWidth;
                                    }
                                    else {
                                        c.width = c.previousWidth + x;
                                        x = 0;
                                    }
                                }
                            }
                        }
                    }
                    else { // stretch column
                        x = d;
                        newCanvasWidthL = 0;
                        newCanvasWidthR = 0;
                        for (j = i; j >= 0; j--) {
                            c = columns[j];
                            if (c.resizable) {
                                if (x && c.maxWidth && (c.maxWidth - c.previousWidth < x)) {
                                    x -= c.maxWidth - c.previousWidth;
                                    c.width = c.maxWidth;
                                }
                                else {
                                    var newWidth = c.previousWidth + x;
                                    var resizedCanvasWidthL = canvasWidthL + x;
                                    if (hasFrozenColumns() && (j <= options.frozenColumn)) {
                                        // if we're on the left frozen side, we need to make sure that our left section width never goes over the total viewport width
                                        if (newWidth > frozenLeftColMaxWidth && resizedCanvasWidthL < (viewportWidth - options.frozenRightViewportMinWidth)) {
                                            frozenLeftColMaxWidth = newWidth; // keep max column width ref, if we go over the limit this number will stop increasing
                                        }
                                        c.width = ((resizedCanvasWidthL + options.frozenRightViewportMinWidth) > viewportWidth) ? frozenLeftColMaxWidth : newWidth;
                                    }
                                    else {
                                        c.width = newWidth;
                                    }
                                    x = 0;
                                }
                            }
                        }
                        for (k = 0; k <= i; k++) {
                            c = columns[k];
                            if (hasFrozenColumns() && (k > options.frozenColumn)) {
                                newCanvasWidthR += c.width;
                            }
                            else {
                                newCanvasWidthL += c.width;
                            }
                        }
                        if (options.forceFitColumns) {
                            x = -d;
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (c.resizable) {
                                    actualMinWidth = Math.max(c.minWidth || 0, absoluteColumnMinWidth);
                                    if (x && c.previousWidth + x < actualMinWidth) {
                                        x += c.previousWidth - actualMinWidth;
                                        c.width = actualMinWidth;
                                    }
                                    else {
                                        c.width = c.previousWidth + x;
                                        x = 0;
                                    }
                                    if (hasFrozenColumns() && (j > options.frozenColumn)) {
                                        newCanvasWidthR += c.width;
                                    }
                                    else {
                                        newCanvasWidthL += c.width;
                                    }
                                }
                            }
                        }
                        else {
                            for (j = i + 1; j < columns.length; j++) {
                                c = columns[j];
                                if (hasFrozenColumns() && (j > options.frozenColumn)) {
                                    newCanvasWidthR += c.width;
                                }
                                else {
                                    newCanvasWidthL += c.width;
                                }
                            }
                        }
                    }
                    if (hasFrozenColumns() && newCanvasWidthL != canvasWidthL) {
                        $headerL.width(newCanvasWidthL + 1000);
                        $paneHeaderR.css('left', newCanvasWidthL);
                    }
                    applyColumnHeaderWidths();
                    applyColumnGroupHeaderWidths();
                    if (options.syncColumnCellResize) {
                        applyColumnWidths();
                    }
                    trigger(self.onColumnsDrag, {
                        triggeredByColumn: $(this).parent().attr("id").replace(uid, ""),
                        resizeHandle: $(this)
                    });
                })
                    .on("dragend", function (e, dd) {
                    $(this).parent().removeClass("slick-header-column-active");
                    var triggeredByColumn = $(this).parent().attr("id").replace(uid, "");
                    if (trigger(self.onBeforeColumnsResize, { triggeredByColumn: triggeredByColumn }) === true) {
                        applyColumnHeaderWidths();
                        applyColumnGroupHeaderWidths();
                    }
                    var newWidth;
                    for (j = 0; j < columns.length; j++) {
                        c = columns[j];
                        newWidth = $(columnElements[j]).outerWidth();
                        if (c.previousWidth !== newWidth && c.rerenderOnResize) {
                            invalidateAllRows();
                        }
                    }
                    updateCanvasWidth(true);
                    render();
                    trigger(self.onColumnsResized, { triggeredByColumn: triggeredByColumn });
                    setTimeout(function () { columnResizeDragging = false; }, 300);
                })
                    .on("dblclick", function () {
                    var triggeredByColumn = $(this).parent().attr("id").replace(uid, "");
                    trigger(self.onColumnsResizeDblClick, { triggeredByColumn: triggeredByColumn });
                });
            });
        }
        function getVBoxDelta($el) {
            var p = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            var delta = 0;
            if ($el && typeof $el.css === 'function') {
                $.each(p, function (n, val) {
                    delta += parseFloat($el.css(val)) || 0;
                });
            }
            return delta;
        }
        function setFrozenOptions() {
            options.frozenColumn = (options.frozenColumn >= 0 && options.frozenColumn < columns.length)
                ? parseInt(options.frozenColumn)
                : -1;
            if (options.frozenRow > -1) {
                hasFrozenRows = true;
                frozenRowsHeight = (options.frozenRow) * options.rowHeight;
                var dataLength = getDataLength();
                actualFrozenRow = (options.frozenBottom)
                    ? (dataLength - options.frozenRow)
                    : options.frozenRow;
            }
            else {
                hasFrozenRows = false;
            }
        }
        function setPaneVisibility() {
            if (hasFrozenColumns()) {
                $paneHeaderR.show();
                $paneTopR.show();
                if (hasFrozenRows) {
                    $paneBottomL.show();
                    $paneBottomR.show();
                }
                else {
                    $paneBottomR.hide();
                    $paneBottomL.hide();
                }
            }
            else {
                $paneHeaderR.hide();
                $paneTopR.hide();
                $paneBottomR.hide();
                if (hasFrozenRows) {
                    $paneBottomL.show();
                }
                else {
                    $paneBottomR.hide();
                    $paneBottomL.hide();
                }
            }
        }
        function setOverflow() {
            $viewportTopL.css({
                'overflow-x': (hasFrozenColumns()) ? (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'scroll') : (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'auto'),
                'overflow-y': (!hasFrozenColumns() && options.alwaysShowVerticalScroll) ? "scroll" : ((hasFrozenColumns()) ? (hasFrozenRows ? 'hidden' : 'hidden') : (hasFrozenRows ? 'scroll' : 'auto'))
            });
            $viewportTopR.css({
                'overflow-x': (hasFrozenColumns()) ? (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'scroll') : (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'hidden' : 'auto'),
                'overflow-y': options.alwaysShowVerticalScroll ? "scroll" : ((hasFrozenColumns()) ? (hasFrozenRows ? 'scroll' : 'auto') : (hasFrozenRows ? 'scroll' : 'auto'))
            });
            $viewportBottomL.css({
                'overflow-x': (hasFrozenColumns()) ? (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'scroll' : 'auto') : (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'auto' : 'auto'),
                'overflow-y': (!hasFrozenColumns() && options.alwaysShowVerticalScroll) ? "scroll" : ((hasFrozenColumns()) ? (hasFrozenRows ? 'hidden' : 'hidden') : (hasFrozenRows ? 'scroll' : 'auto'))
            });
            $viewportBottomR.css({
                'overflow-x': (hasFrozenColumns()) ? (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'scroll' : 'auto') : (hasFrozenRows && !options.alwaysAllowHorizontalScroll ? 'auto' : 'auto'),
                'overflow-y': options.alwaysShowVerticalScroll ? "scroll" : ((hasFrozenColumns()) ? (hasFrozenRows ? 'auto' : 'auto') : (hasFrozenRows ? 'auto' : 'auto'))
            });
            if (options.viewportClass) {
                $viewportTopL.toggleClass(options.viewportClass, true);
                $viewportTopR.toggleClass(options.viewportClass, true);
                $viewportBottomL.toggleClass(options.viewportClass, true);
                $viewportBottomR.toggleClass(options.viewportClass, true);
            }
        }
        function setScroller() {
            if (hasFrozenColumns()) {
                $headerScrollContainer = $headerScrollerR;
                $headerRowScrollContainer = $headerRowScrollerR;
                $footerRowScrollContainer = $footerRowScrollerR;
                if (hasFrozenRows) {
                    if (options.frozenBottom) {
                        $viewportScrollContainerX = $viewportBottomR;
                        $viewportScrollContainerY = $viewportTopR;
                    }
                    else {
                        $viewportScrollContainerX = $viewportScrollContainerY = $viewportBottomR;
                    }
                }
                else {
                    $viewportScrollContainerX = $viewportScrollContainerY = $viewportTopR;
                }
            }
            else {
                $headerScrollContainer = $headerScrollerL;
                $headerRowScrollContainer = $headerRowScrollerL;
                $footerRowScrollContainer = $footerRowScrollerL;
                if (hasFrozenRows) {
                    if (options.frozenBottom) {
                        $viewportScrollContainerX = $viewportBottomL;
                        $viewportScrollContainerY = $viewportTopL;
                    }
                    else {
                        $viewportScrollContainerX = $viewportScrollContainerY = $viewportBottomL;
                    }
                }
                else {
                    $viewportScrollContainerX = $viewportScrollContainerY = $viewportTopL;
                }
            }
        }
        function measureCellPaddingAndBorder() {
            var el;
            var h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"];
            var v = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"];
            // jquery prior to version 1.8 handles .width setter/getter as a direct css write/read
            // jquery 1.8 changed .width to read the true inner element width if box-sizing is set to border-box, and introduced a setter for .outerWidth
            // so for equivalent functionality, prior to 1.8 use .width, and after use .outerWidth
            var verArray = $.fn.jquery.split('.');
            jQueryNewWidthBehaviour = (verArray[0] == 1 && verArray[1] >= 8) || verArray[0] >= 2;
            el = $("<div class='ui-state-default slick-header-column' style='visibility:hidden'>-</div>").appendTo($headers);
            headerColumnWidthDiff = headerColumnHeightDiff = 0;
            if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
                $.each(h, function (n, val) {
                    headerColumnWidthDiff += parseFloat(el.css(val)) || 0;
                });
                $.each(v, function (n, val) {
                    headerColumnHeightDiff += parseFloat(el.css(val)) || 0;
                });
            }
            el.remove();
            var r = $("<div class='slick-row' />").appendTo($canvas);
            el = $("<div class='slick-cell' id='' style='visibility:hidden'>-</div>").appendTo(r);
            cellWidthDiff = cellHeightDiff = 0;
            if (el.css("box-sizing") != "border-box" && el.css("-moz-box-sizing") != "border-box" && el.css("-webkit-box-sizing") != "border-box") {
                $.each(h, function (n, val) {
                    cellWidthDiff += parseFloat(el.css(val)) || 0;
                });
                $.each(v, function (n, val) {
                    cellHeightDiff += parseFloat(el.css(val)) || 0;
                });
            }
            r.remove();
            absoluteColumnMinWidth = Math.max(headerColumnWidthDiff, cellWidthDiff);
        }
        function createCssRules() {
            $style = $("<style type='text/css' rel='stylesheet' />");
            if ($container[0].parentNode instanceof ShadowRoot)
                $container[0].parentNode.insertBefore($style[0], $container[0]);
            else
                $style.appendTo($("head"));
            var rowHeight = (options.rowHeight - cellHeightDiff);
            var rules = [
                "." + uid + " .slick-group-header-column { left: 1000px; }",
                "." + uid + " .slick-header-column { left: 1000px; }",
                "." + uid + " .slick-top-panel { height:" + options.topPanelHeight + "px; }",
                "." + uid + " .slick-preheader-panel { height:" + options.preHeaderPanelHeight + "px; }",
                "." + uid + " .slick-headerrow-columns { height:" + options.headerRowHeight + "px; }",
                "." + uid + " .slick-footerrow-columns { height:" + options.footerRowHeight + "px; }",
                "." + uid + " .slick-cell { height:" + rowHeight + "px; }",
                "." + uid + " .slick-row { height:" + options.rowHeight + "px; }"
            ];
            for (var i = 0; i < columns.length; i++) {
                rules.push("." + uid + " .l" + i + " { }");
                rules.push("." + uid + " .r" + i + " { }");
            }
            if ($style[0].styleSheet) { // IE
                $style[0].styleSheet.cssText = rules.join(" ");
            }
            else {
                $style[0].appendChild(document.createTextNode(rules.join(" ")));
            }
        }
        function getColumnCssRules(idx) {
            var i;
            if (!stylesheet) {
                var sheets;
                if ($container[0].parentNode instanceof ShadowRoot)
                    sheets = $container[0].parentNode.styleSheets;
                else
                    sheets = document.styleSheets;
                for (i = 0; i < sheets.length; i++) {
                    if ((sheets[i].ownerNode || sheets[i].owningElement) == $style[0]) {
                        stylesheet = sheets[i];
                        break;
                    }
                }
                if (!stylesheet) {
                    throw new Error("SlickGrid Cannot find stylesheet.");
                }
                // find and cache column CSS rules
                columnCssRulesL = [];
                columnCssRulesR = [];
                var cssRules = (stylesheet.cssRules || stylesheet.rules);
                var matches, columnIdx;
                for (i = 0; i < cssRules.length; i++) {
                    var selector = cssRules[i].selectorText;
                    if (matches = /\.l\d+/.exec(selector)) {
                        columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
                        columnCssRulesL[columnIdx] = cssRules[i];
                    }
                    else if (matches = /\.r\d+/.exec(selector)) {
                        columnIdx = parseInt(matches[0].substr(2, matches[0].length - 2), 10);
                        columnCssRulesR[columnIdx] = cssRules[i];
                    }
                }
            }
            return {
                "left": columnCssRulesL[idx],
                "right": columnCssRulesR[idx]
            };
        }
        function removeCssRules() {
            $style.remove();
            stylesheet = null;
        }
        function destroy(shouldDestroyAllElements) {
            getEditorLock().cancelCurrentEdit();
            trigger(self.onBeforeDestroy, {});
            var i = plugins.length;
            while (i--) {
                unregisterPlugin(plugins[i]);
            }
            if (options.enableColumnReorder) {
                $headers.filter(":ui-sortable").sortable("destroy");
            }
            unbindAncestorScrollEvents();
            $container.off(".slickgrid");
            removeCssRules();
            $canvas.off();
            $viewport.off();
            $headerScroller.off();
            $headerRowScroller.off();
            if ($footerRow) {
                $footerRow.off();
            }
            if ($footerRowScroller) {
                $footerRowScroller.off();
            }
            if ($preHeaderPanelScroller) {
                $preHeaderPanelScroller.off();
            }
            $focusSink.off();
            $(".slick-resizable-handle").off();
            $(".slick-header-column").off();
            $container.empty().removeClass(uid);
            if (shouldDestroyAllElements) {
                destroyAllElements();
            }
        }
        function destroyAllElements() {
            $activeCanvasNode = null;
            $activeViewportNode = null;
            $boundAncestors = null;
            $canvas = null;
            $canvasTopL = null;
            $canvasTopR = null;
            $canvasBottomL = null;
            $canvasBottomR = null;
            $container = null;
            $focusSink = null;
            $focusSink2 = null;
            $groupHeaders = null;
            $groupHeadersL = null;
            $groupHeadersR = null;
            $headerL = null;
            $headerR = null;
            $headers = null;
            $headerRow = null;
            $headerRowL = null;
            $headerRowR = null;
            $headerRowSpacerL = null;
            $headerRowSpacerR = null;
            $headerRowScrollContainer = null;
            $headerRowScroller = null;
            $headerRowScrollerL = null;
            $headerRowScrollerR = null;
            $headerScrollContainer = null;
            $headerScroller = null;
            $headerScrollerL = null;
            $headerScrollerR = null;
            $hiddenParents = null;
            $footerRow = null;
            $footerRowL = null;
            $footerRowR = null;
            $footerRowSpacerL = null;
            $footerRowSpacerR = null;
            $footerRowScroller = null;
            $footerRowScrollerL = null;
            $footerRowScrollerR = null;
            $footerRowScrollContainer = null;
            $preHeaderPanel = null;
            $preHeaderPanelR = null;
            $preHeaderPanelScroller = null;
            $preHeaderPanelScrollerR = null;
            $preHeaderPanelSpacer = null;
            $preHeaderPanelSpacerR = null;
            $topPanel = null;
            $topPanelScroller = null;
            $style = null;
            $topPanelScrollerL = null;
            $topPanelScrollerR = null;
            $topPanelL = null;
            $topPanelR = null;
            $paneHeaderL = null;
            $paneHeaderR = null;
            $paneTopL = null;
            $paneTopR = null;
            $paneBottomL = null;
            $paneBottomR = null;
            $viewport = null;
            $viewportTopL = null;
            $viewportTopR = null;
            $viewportBottomL = null;
            $viewportBottomR = null;
            $viewportScrollContainerX = null;
            $viewportScrollContainerY = null;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Column Autosizing
        //////////////////////////////////////////////////////////////////////////////////////////////
        var canvas = null;
        var canvas_context = null;
        function autosizeColumn(columnOrIndexOrId, isInit) {
            var c = columnOrIndexOrId;
            if (typeof columnOrIndexOrId === 'number') {
                c = columns[columnOrIndexOrId];
            }
            else if (typeof columnOrIndexOrId === 'string') {
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].Id === columnOrIndexOrId) {
                        c = columns[i];
                    }
                }
            }
            var $gridCanvas = $(getCanvasNode(0, 0));
            getColAutosizeWidth(c, $gridCanvas, isInit);
        }
        function autosizeColumns(autosizeMode, isInit) {
            //LogColWidths();
            autosizeMode = autosizeMode || options.autosizeColsMode;
            if (autosizeMode === Slick.GridAutosizeColsMode.LegacyForceFit
                || autosizeMode === Slick.GridAutosizeColsMode.LegacyOff) {
                legacyAutosizeColumns();
                return;
            }
            if (autosizeMode === Slick.GridAutosizeColsMode.None) {
                return;
            }
            // test for brower canvas support, canvas_context!=null if supported
            canvas = document.createElement("canvas");
            if (canvas && canvas.getContext) {
                canvas_context = canvas.getContext("2d");
            }
            // pass in the grid canvas
            var $gridCanvas = $(getCanvasNode(0, 0));
            var viewportWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
            // iterate columns to get autosizes
            var i, c, colWidth, reRender, totalWidth = 0, totalWidthLessSTR = 0, strColsMinWidth = 0, totalMinWidth = 0, totalLockedColWidth = 0;
            for (i = 0; i < columns.length; i++) {
                c = columns[i];
                getColAutosizeWidth(c, $gridCanvas, isInit);
                totalLockedColWidth += (c.autoSize.autosizeMode === Slick.ColAutosizeMode.Locked ? c.width : 0);
                totalMinWidth += (c.autoSize.autosizeMode === Slick.ColAutosizeMode.Locked ? c.width : c.minWidth);
                totalWidth += c.autoSize.widthPx;
                totalWidthLessSTR += (c.autoSize.sizeToRemaining ? 0 : c.autoSize.widthPx);
                strColsMinWidth += (c.autoSize.sizeToRemaining ? c.minWidth || 0 : 0);
            }
            var strColTotalGuideWidth = totalWidth - totalWidthLessSTR;
            if (autosizeMode === Slick.GridAutosizeColsMode.FitViewportToCols) {
                // - if viewport with is outside MinViewportWidthPx and MaxViewportWidthPx, then the viewport is set to
                //   MinViewportWidthPx or MaxViewportWidthPx and the FitColsToViewport algorithm is used
                // - viewport is resized to fit columns
                var setWidth = totalWidth + scrollbarDimensions.width;
                autosizeMode = Slick.GridAutosizeColsMode.IgnoreViewport;
                if (options.viewportMaxWidthPx && setWidth > options.viewportMaxWidthPx) {
                    setWidth = options.viewportMaxWidthPx;
                    autosizeMode = Slick.GridAutosizeColsMode.FitColsToViewport;
                }
                else if (options.viewportMinWidthPx && setWidth < options.viewportMinWidthPx) {
                    setWidth = options.viewportMinWidthPx;
                    autosizeMode = Slick.GridAutosizeColsMode.FitColsToViewport;
                }
                else {
                    // falling back to IgnoreViewport will size the columns as-is, with render checking
                    //for (i = 0; i < columns.length; i++) { columns[i].width = columns[i].autoSize.widthPx; }
                }
                $container.width(setWidth);
            }
            if (autosizeMode === Slick.GridAutosizeColsMode.FitColsToViewport) {
                if (strColTotalGuideWidth > 0 && totalWidthLessSTR < viewportWidth - strColsMinWidth) {
                    // if addl space remains in the viewport and there are SizeToRemaining cols, just the SizeToRemaining cols expand proportionally to fill viewport
                    for (i = 0; i < columns.length; i++) {
                        c = columns[i];
                        var totalSTRViewportWidth = viewportWidth - totalWidthLessSTR;
                        if (c.autoSize.sizeToRemaining) {
                            colWidth = totalSTRViewportWidth * c.autoSize.widthPx / strColTotalGuideWidth;
                        }
                        else {
                            colWidth = c.autoSize.widthPx;
                        }
                        if (c.rerenderOnResize && c.width != colWidth) {
                            reRender = true;
                        }
                        c.width = colWidth;
                    }
                }
                else if ((options.viewportSwitchToScrollModeWidthPercent && totalWidthLessSTR + strColsMinWidth > viewportWidth * options.viewportSwitchToScrollModeWidthPercent / 100)
                    || (totalMinWidth > viewportWidth)) {
                    // if the total columns width is wider than the viewport by switchToScrollModeWidthPercent, switch to IgnoreViewport mode
                    autosizeMode = Slick.GridAutosizeColsMode.IgnoreViewport;
                }
                else {
                    // otherwise (ie. no SizeToRemaining cols or viewport smaller than columns) all cols other than 'Locked' scale in proportion to fill viewport
                    // and SizeToRemaining get minWidth
                    var unallocatedColWidth = totalWidthLessSTR - totalLockedColWidth;
                    var unallocatedViewportWidth = viewportWidth - totalLockedColWidth - strColsMinWidth;
                    for (i = 0; i < columns.length; i++) {
                        c = columns[i];
                        colWidth = c.width;
                        if (c.autoSize.autosizeMode !== Slick.ColAutosizeMode.Locked) {
                            if (c.autoSize.sizeToRemaining) {
                                colWidth = c.minWidth;
                            }
                            else {
                                // size width proportionally to free space (we know we have enough room due to the earlier calculations)
                                colWidth = unallocatedViewportWidth / unallocatedColWidth * c.autoSize.widthPx;
                                if (colWidth < c.minWidth) {
                                    colWidth = c.minWidth;
                                }
                                // remove the just allocated widths from the allocation pool
                                unallocatedColWidth -= c.autoSize.widthPx;
                                unallocatedViewportWidth -= colWidth;
                            }
                        }
                        if (c.rerenderOnResize && c.width != colWidth) {
                            reRender = true;
                        }
                        c.width = colWidth;
                    }
                }
            }
            if (autosizeMode === Slick.GridAutosizeColsMode.IgnoreViewport) {
                // just size columns as-is
                for (i = 0; i < columns.length; i++) {
                    colWidth = columns[i].autoSize.widthPx;
                    if (columns[i].rerenderOnResize && columns[i].width != colWidth) {
                        reRender = true;
                    }
                    columns[i].width = colWidth;
                }
            }
            //LogColWidths();
            reRenderColumns(reRender);
        }
        function LogColWidths() {
            var s = "Col Widths:";
            for (var i = 0; i < columns.length; i++) {
                s += ' ' + columns[i].width;
            }
            console.log(s);
        }
        function getColAutosizeWidth(columnDef, $gridCanvas, isInit) {
            var autoSize = columnDef.autoSize;
            // set to width as default
            autoSize.widthPx = columnDef.width;
            if (autoSize.autosizeMode === Slick.ColAutosizeMode.Locked
                || autoSize.autosizeMode === Slick.ColAutosizeMode.Guide) {
                return;
            }
            var dl = getDataLength(); //getDataItem();
            // ContentIntelligent takes settings from column data type
            if (autoSize.autosizeMode === Slick.ColAutosizeMode.ContentIntelligent) {
                // default to column colDataTypeOf (can be used if initially there are no data rows)
                var colDataTypeOf = autoSize.colDataTypeOf;
                var colDataItem;
                if (dl > 0) {
                    var tempRow = getDataItem(0);
                    if (tempRow) {
                        colDataItem = tempRow[columnDef.field];
                        colDataTypeOf = typeof colDataItem;
                        if (colDataTypeOf === 'object') {
                            if (colDataItem instanceof Date) {
                                colDataTypeOf = "date";
                            }
                            if (typeof moment !== 'undefined' && colDataItem instanceof moment) {
                                colDataTypeOf = "moment";
                            }
                        }
                    }
                }
                if (colDataTypeOf === 'boolean') {
                    autoSize.colValueArray = [true, false];
                }
                if (colDataTypeOf === 'number') {
                    autoSize.valueFilterMode = Slick.ValueFilterMode.GetGreatestAndSub;
                    autoSize.rowSelectionMode = Slick.RowSelectionMode.AllRows;
                }
                if (colDataTypeOf === 'string') {
                    autoSize.valueFilterMode = Slick.ValueFilterMode.GetLongestText;
                    autoSize.rowSelectionMode = Slick.RowSelectionMode.AllRows;
                    autoSize.allowAddlPercent = 5;
                }
                if (colDataTypeOf === 'date') {
                    autoSize.colValueArray = [new Date(2009, 8, 30, 12, 20, 20)]; // Sep 30th 2009, 12:20:20 AM
                }
                if (colDataTypeOf === 'moment' && typeof moment !== 'undefined') {
                    autoSize.colValueArray = [moment([2009, 8, 30, 12, 20, 20])]; // Sep 30th 2009, 12:20:20 AM
                }
            }
            // at this point, the autosizeMode is effectively 'Content', so proceed to get size
            var colWidth = getColContentSize(columnDef, $gridCanvas, isInit);
            var addlPercentMultiplier = (autoSize.allowAddlPercent ? (1 + autoSize.allowAddlPercent / 100) : 1);
            colWidth = colWidth * addlPercentMultiplier + options.autosizeColPaddingPx;
            if (columnDef.minWidth && colWidth < columnDef.minWidth) {
                colWidth = columnDef.minWidth;
            }
            if (columnDef.maxWidth && colWidth > columnDef.maxWidth) {
                colWidth = columnDef.maxWidth;
            }
            autoSize.widthPx = colWidth;
        }
        function getColContentSize(columnDef, $gridCanvas, isInit) {
            var autoSize = columnDef.autoSize;
            var widthAdjustRatio = 1;
            // at this point, the autosizeMode is effectively 'Content', so proceed to get size
            // get header width, if we are taking notice of it
            var i, ii;
            var maxColWidth = 0;
            var headerWidth = 0;
            if (!autoSize.ignoreHeaderText) {
                headerWidth = getColHeaderWidth(columnDef);
            }
            if (autoSize.colValueArray) {
                // if an array of values are specified, just pass them in instead of data
                maxColWidth = getColWidth(columnDef, $gridCanvas, autoSize.colValueArray);
                return Math.max(headerWidth, maxColWidth);
            }
            // select rows to evaluate using rowSelectionMode and rowSelectionCount
            var rows = getData();
            if (rows.getItems) {
                rows = rows.getItems();
            }
            var rowSelectionMode = (isInit ? autoSize.rowSelectionModeOnInit : undefined) || autoSize.rowSelectionMode;
            if (rowSelectionMode === Slick.RowSelectionMode.FirstRow) {
                rows = rows.slice(0, 1);
            }
            if (rowSelectionMode === Slick.RowSelectionMode.LastRow) {
                rows = rows.slice(rows.length - 1, rows.length);
            }
            if (rowSelectionMode === Slick.RowSelectionMode.FirstNRows) {
                rows = rows.slice(0, autoSize.rowSelectionCount);
            }
            // now use valueFilterMode to further filter selected rows
            if (autoSize.valueFilterMode === Slick.ValueFilterMode.DeDuplicate) {
                var rowsDict = {};
                for (i = 0, ii = rows.length; i < ii; i++) {
                    rowsDict[rows[i][columnDef.field]] = true;
                }
                if (Object.keys) {
                    rows = Object.keys(rowsDict);
                }
                else {
                    rows = [];
                    for (var i in rowsDict)
                        rows.push(i);
                }
            }
            if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetGreatestAndSub) {
                // get greatest abs value in data
                var tempVal, maxVal, maxAbsVal = 0;
                for (i = 0, ii = rows.length; i < ii; i++) {
                    tempVal = rows[i][columnDef.field];
                    if (Math.abs(tempVal) > maxAbsVal) {
                        maxVal = tempVal;
                        maxAbsVal = Math.abs(tempVal);
                    }
                }
                // now substitute a '9' for all characters (to get widest width) and convert back to a number
                maxVal = '' + maxVal;
                maxVal = Array(maxVal.length + 1).join("9");
                maxVal = +maxVal;
                rows = [maxVal];
            }
            if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetLongestTextAndSub) {
                // get greatest abs value in data
                var tempVal, maxLen = 0;
                for (i = 0, ii = rows.length; i < ii; i++) {
                    tempVal = rows[i][columnDef.field];
                    if ((tempVal || '').length > maxLen) {
                        maxLen = tempVal.length;
                    }
                }
                // now substitute a 'c' for all characters
                tempVal = Array(maxLen + 1).join("m");
                widthAdjustRatio = options.autosizeTextAvgToMWidthRatio;
                rows = [tempVal];
            }
            if (autoSize.valueFilterMode === Slick.ValueFilterMode.GetLongestText) {
                // get greatest abs value in data
                var tempVal, maxLen = 0, maxIndex = 0;
                if (row.length) {
                    for (i = 0, ii = rows.length; i < ii; i++) {
                        tempVal = rows[i][columnDef.field];
                        if ((tempVal || '').length > maxLen) {
                            maxLen = tempVal.length;
                            maxIndex = i;
                        }
                    }
                    // now substitute a 'c' for all characters
                    tempVal = rows[maxIndex][columnDef.field];
                }
                rows = [tempVal];
            }
            maxColWidth = getColWidth(columnDef, $gridCanvas, rows) * widthAdjustRatio;
            return Math.max(headerWidth, maxColWidth);
        }
        function getColWidth(columnDef, $gridCanvas, data) {
            var colIndex = getColumnIndex(columnDef.id);
            var $rowEl = $('<div class="slick-row ui-widget-content"></div>');
            var $cellEl = $('<div class="slick-cell"></div>');
            $cellEl.css({
                "position": "absolute",
                "visibility": "hidden",
                "text-overflow": "initial",
                "white-space": "nowrap"
            });
            $rowEl.append($cellEl);
            $gridCanvas.append($rowEl);
            var len, max = 0, text, maxText, formatterResult, maxWidth = 0, val;
            // use canvas - very fast, but text-only
            if (canvas_context && columnDef.autoSize.widthEvalMode === Slick.WidthEvalMode.CanvasTextSize) {
                canvas_context.font = $cellEl.css("font-size") + " " + $cellEl.css("font-family");
                $(data).each(function (index, row) {
                    // row is either an array or values or a single value
                    val = (Array.isArray(row) ? row[columnDef.field] : row);
                    text = '' + val;
                    len = text ? canvas_context.measureText(text).width : 0;
                    if (len > max) {
                        max = len;
                        maxText = text;
                    }
                });
                $cellEl.html(maxText);
                len = $cellEl.outerWidth();
                $rowEl.remove();
                $cellEl = null;
                return len;
            }
            $(data).each(function (index, row) {
                val = (Array.isArray(row) ? row[columnDef.field] : row);
                if (columnDef.formatterOverride) {
                    // use formatterOverride as first preference
                    formatterResult = columnDef.formatterOverride(index, colIndex, val, columnDef, row, self);
                }
                else if (columnDef.formatter) {
                    // otherwise, use formatter
                    formatterResult = columnDef.formatter(index, colIndex, val, columnDef, row, self);
                }
                else {
                    // otherwise, use plain text
                    formatterResult = '' + val;
                }
                applyFormatResultToCellNode(formatterResult, $cellEl[0]);
                len = $cellEl.outerWidth();
                if (len > max) {
                    max = len;
                }
            });
            $rowEl.remove();
            $cellEl = null;
            return max;
        }
        function getColHeaderWidth(columnDef) {
            var width = 0;
            //if (columnDef && (!columnDef.resizable || columnDef._autoCalcWidth === true)) return;
            var headerColElId = getUID() + columnDef.id;
            var headerColEl = document.getElementById(headerColElId);
            var dummyHeaderColElId = headerColElId + "_";
            if (headerColEl) {
                // headers have been created, use clone technique
                var clone = headerColEl.cloneNode(true);
                clone.id = dummyHeaderColElId;
                clone.style.cssText = 'position: absolute; visibility: hidden;right: auto;text-overflow: initial;white-space: nowrap;';
                headerColEl.parentNode.insertBefore(clone, headerColEl);
                width = clone.offsetWidth;
                clone.parentNode.removeChild(clone);
            }
            else {
                // headers have not yet been created, create a new node
                var header = getHeader(columnDef);
                headerColEl = $("<div class='ui-state-default slick-header-column' />")
                    .html("<span class='slick-column-name'>" + columnDef.name + "</span>")
                    .attr("id", dummyHeaderColElId)
                    .css({ "position": "absolute", "visibility": "hidden", "right": "auto", "text-overflow:": "initial", "white-space": "nowrap" })
                    .addClass(columnDef.headerCssClass || "")
                    .appendTo(header);
                width = headerColEl[0].offsetWidth;
                header[0].removeChild(headerColEl[0]);
            }
            return width;
        }
        function legacyAutosizeColumns() {
            var i, c, widths = [], shrinkLeeway = 0, total = 0, prevTotal, availWidth = viewportHasVScroll ? viewportW - scrollbarDimensions.width : viewportW;
            for (i = 0; i < columns.length; i++) {
                c = columns[i];
                widths.push(c.width);
                total += c.width;
                if (c.resizable) {
                    shrinkLeeway += c.width - Math.max(c.minWidth, absoluteColumnMinWidth);
                }
            }
            // shrink
            prevTotal = total;
            while (total > availWidth && shrinkLeeway) {
                var shrinkProportion = (total - availWidth) / shrinkLeeway;
                for (i = 0; i < columns.length && total > availWidth; i++) {
                    c = columns[i];
                    var width = widths[i];
                    if (!c.resizable || width <= c.minWidth || width <= absoluteColumnMinWidth) {
                        continue;
                    }
                    var absMinWidth = Math.max(c.minWidth, absoluteColumnMinWidth);
                    var shrinkSize = Math.floor(shrinkProportion * (width - absMinWidth)) || 1;
                    shrinkSize = Math.min(shrinkSize, width - absMinWidth);
                    total -= shrinkSize;
                    shrinkLeeway -= shrinkSize;
                    widths[i] -= shrinkSize;
                }
                if (prevTotal <= total) { // avoid infinite loop
                    break;
                }
                prevTotal = total;
            }
            // grow
            prevTotal = total;
            while (total < availWidth) {
                var growProportion = availWidth / total;
                for (i = 0; i < columns.length && total < availWidth; i++) {
                    c = columns[i];
                    var currentWidth = widths[i];
                    var growSize;
                    if (!c.resizable || c.maxWidth <= currentWidth) {
                        growSize = 0;
                    }
                    else {
                        growSize = Math.min(Math.floor(growProportion * currentWidth) - currentWidth, (c.maxWidth - currentWidth) || 1000000) || 1;
                    }
                    total += growSize;
                    widths[i] += (total <= availWidth ? growSize : 0);
                }
                if (prevTotal >= total) { // avoid infinite loop
                    break;
                }
                prevTotal = total;
            }
            var reRender = false;
            for (i = 0; i < columns.length; i++) {
                if (columns[i].rerenderOnResize && columns[i].width != widths[i]) {
                    reRender = true;
                }
                columns[i].width = widths[i];
            }
            reRenderColumns(reRender);
        }
        function reRenderColumns(reRender) {
            applyColumnHeaderWidths();
            applyColumnGroupHeaderWidths();
            updateCanvasWidth(true);
            trigger(self.onAutosizeColumns, { "columns": columns });
            if (reRender) {
                invalidateAllRows();
                render();
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // General
        //////////////////////////////////////////////////////////////////////////////////////////////
        function trigger(evt, args, e) {
            e = e || new Slick.EventData();
            args = args || {};
            args.grid = self;
            return evt.notify(args, e, self);
        }
        function getEditorLock() {
            return options.editorLock;
        }
        function getEditController() {
            return editController;
        }
        function getColumnIndex(id) {
            return columnsById[id];
        }
        function applyColumnGroupHeaderWidths() {
            if (!treeColumns.hasDepth())
                return;
            for (var depth = $groupHeadersL.length - 1; depth >= 0; depth--) {
                var groupColumns = treeColumns.getColumnsInDepth(depth);
                $().add($groupHeadersL[depth]).add($groupHeadersR[depth]).each(function (i) {
                    var $groupHeader = $(this), currentColumnIndex = 0;
                    $groupHeader.width(i === 0 ? getHeadersWidthL() : getHeadersWidthR());
                    $groupHeader.children().each(function () {
                        var $groupHeaderColumn = $(this);
                        var m = $(this).data('column');
                        m.width = 0;
                        m.columns.forEach(function () {
                            var $headerColumn = $groupHeader.next().children(':eq(' + (currentColumnIndex++) + ')');
                            m.width += $headerColumn.outerWidth();
                        });
                        $groupHeaderColumn.width(m.width - headerColumnWidthDiff);
                    });
                });
            }
        }
        function applyColumnHeaderWidths() {
            if (!initialized) {
                return;
            }
            var h;
            for (var i = 0, headers = $headers.children(), ii = columns.length; i < ii; i++) {
                h = $(headers[i]);
                if (jQueryNewWidthBehaviour) {
                    if (h.outerWidth() !== columns[i].width) {
                        h.outerWidth(columns[i].width);
                    }
                }
                else {
                    if (h.width() !== columns[i].width - headerColumnWidthDiff) {
                        h.width(columns[i].width - headerColumnWidthDiff);
                    }
                }
            }
            updateColumnCaches();
        }
        function applyColumnWidths() {
            var x = 0, w, rule;
            for (var i = 0; i < columns.length; i++) {
                w = columns[i].width;
                rule = getColumnCssRules(i);
                rule.left.style.left = x + "px";
                rule.right.style.right = (((options.frozenColumn != -1 && i > options.frozenColumn) ? canvasWidthR : canvasWidthL) - x - w) + "px";
                // If this column is frozen, reset the css left value since the
                // column starts in a new viewport.
                if (options.frozenColumn == i) {
                    x = 0;
                }
                else {
                    x += columns[i].width;
                }
            }
        }
        function setSortColumn(columnId, ascending) {
            setSortColumns([{ columnId: columnId, sortAsc: ascending }]);
        }
        function setSortColumns(cols) {
            sortColumns = cols;
            var numberCols = options.numberedMultiColumnSort && sortColumns.length > 1;
            var headerColumnEls = $headers.children();
            headerColumnEls
                .removeClass("slick-header-column-sorted")
                .find(".slick-sort-indicator")
                .removeClass("slick-sort-indicator-asc slick-sort-indicator-desc");
            headerColumnEls
                .find(".slick-sort-indicator-numbered")
                .text('');
            $.each(sortColumns, function (i, col) {
                if (col.sortAsc == null) {
                    col.sortAsc = true;
                }
                var columnIndex = getColumnIndex(col.columnId);
                if (columnIndex != null) {
                    headerColumnEls.eq(columnIndex)
                        .addClass("slick-header-column-sorted")
                        .find(".slick-sort-indicator")
                        .addClass(col.sortAsc ? "slick-sort-indicator-asc" : "slick-sort-indicator-desc");
                    if (numberCols) {
                        headerColumnEls.eq(columnIndex)
                            .find(".slick-sort-indicator-numbered")
                            .text(i + 1);
                    }
                }
            });
        }
        function getSortColumns() {
            return sortColumns;
        }
        function handleSelectedRangesChanged(e, ranges) {
            var previousSelectedRows = selectedRows.slice(0); // shallow copy previously selected rows for later comparison
            selectedRows = [];
            var hash = {};
            for (var i = 0; i < ranges.length; i++) {
                for (var j = ranges[i].fromRow; j <= ranges[i].toRow; j++) {
                    if (!hash[j]) { // prevent duplicates
                        selectedRows.push(j);
                        hash[j] = {};
                    }
                    for (var k = ranges[i].fromCell; k <= ranges[i].toCell; k++) {
                        if (canCellBeSelected(j, k)) {
                            hash[j][columns[k].id] = options.selectedCellCssClass;
                        }
                    }
                }
            }
            setCellCssStyles(options.selectedCellCssClass, hash);
            if (!simpleArrayEquals(previousSelectedRows, selectedRows)) {
                trigger(self.onSelectedRowsChanged, { rows: getSelectedRows(), previousSelectedRows: previousSelectedRows }, e);
            }
        }
        // compare 2 simple arrays (integers or strings only, do not use to compare object arrays)
        function simpleArrayEquals(arr1, arr2) {
            if (!Array.isArray(arr1) || !Array.isArray(arr2))
                return true;
            const s1 = new Set(arr1);
            const s2 = new Set(arr2);
            if (s1.size != s2.size)
                return false;
            for (const item of s1) {
                if (!s2.has(item))
                    return false;
            }
            return true;
        }
        function getColumns() {
            return columns;
        }
        function updateColumnCaches() {
            // Pre-calculate cell boundaries.
            columnPosLeft = [];
            columnPosRight = [];
            var x = 0;
            for (var i = 0, ii = columns.length; i < ii; i++) {
                columnPosLeft[i] = x;
                columnPosRight[i] = x + columns[i].width;
                if (options.frozenColumn == i) {
                    x = 0;
                }
                else {
                    x += columns[i].width;
                }
            }
        }
        function updateColumnProps() {
            columnsById = {};
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].width) {
                    columns[i].widthRequest = columns[i].width;
                }
                var m = columns[i] = $.extend({}, columnDefaults, columns[i]);
                m.autoSize = $.extend({}, columnAutosizeDefaults, m.autoSize);
                columnsById[m.id] = i;
                if (m.minWidth && m.width < m.minWidth) {
                    m.width = m.minWidth;
                }
                if (m.maxWidth && m.width > m.maxWidth) {
                    m.width = m.maxWidth;
                }
                if (!m.resizable) {
                    // there is difference between user resizable and autoWidth resizable
                    //m.autoSize.autosizeMode = Slick.ColAutosizeMode.Locked;
                }
            }
        }
        function setColumns(columnDefinitions) {
            trigger(self.onBeforeSetColumns, { previousColumns: columns, newColumns: columnDefinitions, grid: self });
            var _treeColumns = new Slick.TreeColumns(columnDefinitions);
            if (_treeColumns.hasDepth()) {
                treeColumns = _treeColumns;
                columns = treeColumns.extractColumns();
            }
            else {
                columns = columnDefinitions;
            }
            updateColumnProps();
            updateColumnCaches();
            if (initialized) {
                setPaneVisibility();
                setOverflow();
                invalidateAllRows();
                createColumnHeaders();
                createColumnGroupHeaders();
                createColumnFooter();
                removeCssRules();
                createCssRules();
                resizeCanvas();
                updateCanvasWidth();
                applyColumnHeaderWidths();
                applyColumnWidths();
                handleScroll();
            }
        }
        function getOptions() {
            return options;
        }
        function setOptions(args, suppressRender, suppressColumnSet, suppressSetOverflow) {
            if (!getEditorLock().commitCurrentEdit()) {
                return;
            }
            makeActiveCellNormal();
            if (args.showColumnHeader !== undefined) {
                setColumnHeaderVisibility(args.showColumnHeader);
            }
            if (options.enableAddRow !== args.enableAddRow) {
                invalidateRow(getDataLength());
            }
            var originalOptions = $.extend(true, {}, options);
            options = $.extend(options, args);
            trigger(self.onSetOptions, { "optionsBefore": originalOptions, "optionsAfter": options });
            validateAndEnforceOptions();
            $viewport.css("overflow-y", options.autoHeight ? "hidden" : "auto");
            if (!suppressRender) {
                render();
            }
            setFrozenOptions();
            setScroller();
            if (!suppressSetOverflow) {
                setOverflow();
            }
            if (!suppressColumnSet) {
                setColumns(treeColumns.extractColumns());
            }
            if (options.enableMouseWheelScrollHandler && $viewport && jQuery.fn.mousewheel) {
                var viewportEvents = $._data($viewport[0], "events");
                if (!viewportEvents || !viewportEvents.mousewheel) {
                    $viewport.on("mousewheel", handleMouseWheel);
                }
            }
            else if (options.enableMouseWheelScrollHandler === false) {
                $viewport.off("mousewheel"); // remove scroll handler when option is disable
            }
        }
        function validateAndEnforceOptions() {
            if (options.autoHeight) {
                options.leaveSpaceForNewRows = false;
            }
            if (options.forceFitColumns) {
                options.autosizeColsMode = Slick.GridAutosizeColsMode.LegacyForceFit;
                console.log("forceFitColumns option is deprecated - use autosizeColsMode");
            }
        }
        function setData(newData, scrollToTop) {
            data = newData;
            invalidateAllRows();
            updateRowCount();
            if (scrollToTop) {
                scrollTo(0);
            }
        }
        function getData() {
            return data;
        }
        function getDataLength() {
            if (data.getLength) {
                return data.getLength();
            }
            else {
                return data && data.length || 0;
            }
        }
        function getDataLengthIncludingAddNew() {
            return getDataLength() + (!options.enableAddRow ? 0
                : (!pagingActive || pagingIsLastPage ? 1 : 0));
        }
        function getDataItem(i) {
            if (data.getItem) {
                return data.getItem(i);
            }
            else {
                return data[i];
            }
        }
        function getTopPanel() {
            return $topPanel[0];
        }
        function setTopPanelVisibility(visible, animate) {
            var animated = (animate === false) ? false : true;
            if (options.showTopPanel != visible) {
                options.showTopPanel = visible;
                if (visible) {
                    if (animated) {
                        $topPanelScroller.slideDown("fast", resizeCanvas);
                    }
                    else {
                        $topPanelScroller.show();
                        resizeCanvas();
                    }
                }
                else {
                    if (animated) {
                        $topPanelScroller.slideUp("fast", resizeCanvas);
                    }
                    else {
                        $topPanelScroller.hide();
                        resizeCanvas();
                    }
                }
            }
        }
        function setHeaderRowVisibility(visible, animate) {
            var animated = (animate === false) ? false : true;
            if (options.showHeaderRow != visible) {
                options.showHeaderRow = visible;
                if (visible) {
                    if (animated) {
                        $headerRowScroller.slideDown("fast", resizeCanvas);
                    }
                    else {
                        $headerRowScroller.show();
                        resizeCanvas();
                    }
                }
                else {
                    if (animated) {
                        $headerRowScroller.slideUp("fast", resizeCanvas);
                    }
                    else {
                        $headerRowScroller.hide();
                        resizeCanvas();
                    }
                }
            }
        }
        function setColumnHeaderVisibility(visible, animate) {
            if (options.showColumnHeader != visible) {
                options.showColumnHeader = visible;
                if (visible) {
                    if (animate) {
                        $headerScroller.slideDown("fast", resizeCanvas);
                    }
                    else {
                        $headerScroller.show();
                        resizeCanvas();
                    }
                }
                else {
                    if (animate) {
                        $headerScroller.slideUp("fast", resizeCanvas);
                    }
                    else {
                        $headerScroller.hide();
                        resizeCanvas();
                    }
                }
            }
        }
        function setFooterRowVisibility(visible, animate) {
            var animated = (animate === false) ? false : true;
            if (options.showFooterRow != visible) {
                options.showFooterRow = visible;
                if (visible) {
                    if (animated) {
                        $footerRowScroller.slideDown("fast", resizeCanvas);
                    }
                    else {
                        $footerRowScroller.show();
                        resizeCanvas();
                    }
                }
                else {
                    if (animated) {
                        $footerRowScroller.slideUp("fast", resizeCanvas);
                    }
                    else {
                        $footerRowScroller.hide();
                        resizeCanvas();
                    }
                }
            }
        }
        function setPreHeaderPanelVisibility(visible, animate) {
            var animated = (animate === false) ? false : true;
            if (options.showPreHeaderPanel != visible) {
                options.showPreHeaderPanel = visible;
                if (visible) {
                    if (animated) {
                        $preHeaderPanelScroller.slideDown("fast", resizeCanvas);
                        $preHeaderPanelScrollerR.slideDown("fast", resizeCanvas);
                    }
                    else {
                        $preHeaderPanelScroller.show();
                        $preHeaderPanelScrollerR.show();
                        resizeCanvas();
                    }
                }
                else {
                    if (animated) {
                        $preHeaderPanelScroller.slideUp("fast", resizeCanvas);
                        $preHeaderPanelScrollerR.slideUp("fast", resizeCanvas);
                    }
                    else {
                        $preHeaderPanelScroller.hide();
                        $preHeaderPanelScrollerR.hide();
                        resizeCanvas();
                    }
                }
            }
        }
        function getContainerNode() {
            return $container.get(0);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Rendering / Scrolling
        function getRowTop(row) {
            return options.rowHeight * row - offset;
        }
        function getRowFromPosition(y) {
            return Math.floor((y + offset) / options.rowHeight);
        }
        function scrollTo(y) {
            y = Math.max(y, 0);
            y = Math.min(y, th - $viewportScrollContainerY.height() + ((viewportHasHScroll || hasFrozenColumns()) ? scrollbarDimensions.height : 0));
            var oldOffset = offset;
            page = Math.min(n - 1, Math.floor(y / ph));
            offset = Math.round(page * cj);
            var newScrollTop = y - offset;
            if (offset != oldOffset) {
                var range = getVisibleRange(newScrollTop);
                cleanupRows(range);
                updateRowPositions();
            }
            if (prevScrollTop != newScrollTop) {
                vScrollDir = (prevScrollTop + oldOffset < newScrollTop + offset) ? 1 : -1;
                lastRenderedScrollTop = (scrollTop = prevScrollTop = newScrollTop);
                if (hasFrozenColumns()) {
                    $viewportTopL[0].scrollTop = newScrollTop;
                }
                if (hasFrozenRows) {
                    $viewportBottomL[0].scrollTop = $viewportBottomR[0].scrollTop = newScrollTop;
                }
                $viewportScrollContainerY[0].scrollTop = newScrollTop;
                trigger(self.onViewportChanged, {});
            }
        }
        function defaultFormatter(row, cell, value, columnDef, dataContext, grid) {
            if (value == null) {
                return "";
            }
            else {
                return (value + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        }
        function getFormatter(row, column) {
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            // look up by id, then index
            var columnOverrides = rowMetadata &&
                rowMetadata.columns &&
                (rowMetadata.columns[column.id] || rowMetadata.columns[getColumnIndex(column.id)]);
            return (columnOverrides && columnOverrides.formatter) ||
                (rowMetadata && rowMetadata.formatter) ||
                column.formatter ||
                (options.formatterFactory && options.formatterFactory.getFormatter(column)) ||
                options.defaultFormatter;
        }
        function getEditor(row, cell) {
            var column = columns[cell];
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            var columnMetadata = rowMetadata && rowMetadata.columns;
            if (columnMetadata && columnMetadata[column.id] && columnMetadata[column.id].editor !== undefined) {
                return columnMetadata[column.id].editor;
            }
            if (columnMetadata && columnMetadata[cell] && columnMetadata[cell].editor !== undefined) {
                return columnMetadata[cell].editor;
            }
            return column.editor || (options.editorFactory && options.editorFactory.getEditor(column));
        }
        function getDataItemValueForColumn(item, columnDef) {
            if (options.dataItemColumnValueExtractor) {
                return options.dataItemColumnValueExtractor(item, columnDef);
            }
            return item[columnDef.field];
        }
        function appendRowHtml(stringArrayL, stringArrayR, row, range, dataLength) {
            var d = getDataItem(row);
            var dataLoading = row < dataLength && !d;
            var rowCss = "slick-row" +
                (hasFrozenRows && row <= options.frozenRow ? ' frozen' : '') +
                (dataLoading ? " loading" : "") +
                (row === activeRow && options.showCellSelection ? " active" : "") +
                (row % 2 == 1 ? " odd" : " even");
            if (!d) {
                rowCss += " " + options.addNewRowCssClass;
            }
            var metadata = data.getItemMetadata && data.getItemMetadata(row);
            if (metadata && metadata.cssClasses) {
                rowCss += " " + metadata.cssClasses;
            }
            var frozenRowOffset = getFrozenRowOffset(row);
            var rowHtml = "<div class='ui-widget-content " + rowCss + "' style='top:"
                + (getRowTop(row) - frozenRowOffset)
                + "px'>";
            stringArrayL.push(rowHtml);
            if (hasFrozenColumns()) {
                stringArrayR.push(rowHtml);
            }
            var colspan, m;
            for (var i = 0, ii = columns.length; i < ii; i++) {
                m = columns[i];
                colspan = 1;
                if (metadata && metadata.columns) {
                    var columnData = metadata.columns[m.id] || metadata.columns[i];
                    colspan = (columnData && columnData.colspan) || 1;
                    if (colspan === "*") {
                        colspan = ii - i;
                    }
                }
                // Do not render cells outside of the viewport.
                if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
                    if (!m.alwaysRenderColumn && columnPosLeft[i] > range.rightPx) {
                        // All columns to the right are outside the range.
                        break;
                    }
                    if (hasFrozenColumns() && (i > options.frozenColumn)) {
                        appendCellHtml(stringArrayR, row, i, colspan, d);
                    }
                    else {
                        appendCellHtml(stringArrayL, row, i, colspan, d);
                    }
                }
                else if (m.alwaysRenderColumn || (hasFrozenColumns() && i <= options.frozenColumn)) {
                    appendCellHtml(stringArrayL, row, i, colspan, d);
                }
                if (colspan > 1) {
                    i += (colspan - 1);
                }
            }
            stringArrayL.push("</div>");
            if (hasFrozenColumns()) {
                stringArrayR.push("</div>");
            }
        }
        function appendCellHtml(stringArray, row, cell, colspan, item) {
            // stringArray: stringBuilder containing the HTML parts
            // row, cell: row and column index
            // colspan: HTML colspan
            // item: grid data for row
            var m = columns[cell];
            var cellCss = "slick-cell l" + cell + " r" + Math.min(columns.length - 1, cell + colspan - 1) +
                (m.cssClass ? " " + m.cssClass : "");
            if (hasFrozenColumns() && cell <= options.frozenColumn) {
                cellCss += (" frozen");
            }
            if (row === activeRow && cell === activeCell && options.showCellSelection) {
                cellCss += (" active");
            }
            // TODO:  merge them together in the setter
            for (var key in cellCssClasses) {
                if (cellCssClasses[key][row] && cellCssClasses[key][row][m.id]) {
                    cellCss += (" " + cellCssClasses[key][row][m.id]);
                }
            }
            var value = null, formatterResult = '';
            if (item) {
                value = getDataItemValueForColumn(item, m);
                formatterResult = getFormatter(row, m)(row, cell, value, m, item, self);
                if (formatterResult === null || formatterResult === undefined) {
                    formatterResult = '';
                }
            }
            // get addl css class names from object type formatter return and from string type return of onBeforeAppendCell
            var addlCssClasses = trigger(self.onBeforeAppendCell, { row: row, cell: cell, value: value, dataContext: item }) || '';
            addlCssClasses += (formatterResult && formatterResult.addClasses ? (addlCssClasses ? ' ' : '') + formatterResult.addClasses : '');
            var toolTip = formatterResult && formatterResult.toolTip ? "title='" + formatterResult.toolTip + "'" : '';
            var customAttrStr = '';
            if (m.hasOwnProperty('cellAttrs') && m.cellAttrs instanceof Object) {
                for (var key in m.cellAttrs) {
                    if (m.cellAttrs.hasOwnProperty(key)) {
                        customAttrStr += ' ' + key + '="' + m.cellAttrs[key] + '" ';
                    }
                }
            }
            stringArray.push("<div class='" + cellCss + (addlCssClasses ? ' ' + addlCssClasses : '') + "' " + toolTip + customAttrStr + ">");
            // if there is a corresponding row (if not, this is the Add New row or this data hasn't been loaded yet)
            if (item) {
                stringArray.push(Object.prototype.toString.call(formatterResult) !== '[object Object]' ? formatterResult : formatterResult.text);
            }
            stringArray.push("</div>");
            rowsCache[row].cellRenderQueue.push(cell);
            rowsCache[row].cellColSpans[cell] = colspan;
        }
        function cleanupRows(rangeToKeep) {
            for (var i in rowsCache) {
                var removeFrozenRow = true;
                if (hasFrozenRows
                    && ((options.frozenBottom && i >= actualFrozenRow) // Frozen bottom rows
                        || (!options.frozenBottom && i <= actualFrozenRow) // Frozen top rows
                    )) {
                    removeFrozenRow = false;
                }
                if (((i = parseInt(i, 10)) !== activeRow)
                    && (i < rangeToKeep.top || i > rangeToKeep.bottom)
                    && (removeFrozenRow)) {
                    removeRowFromCache(i);
                }
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
        }
        function invalidate() {
            updateRowCount();
            invalidateAllRows();
            render();
        }
        function invalidateAllRows() {
            if (currentEditor) {
                makeActiveCellNormal();
            }
            for (var row in rowsCache) {
                removeRowFromCache(row);
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
        }
        function queuePostProcessedRowForCleanup(cacheEntry, postProcessedRow, rowIdx) {
            postProcessgroupId++;
            // store and detach node for later async cleanup
            for (var columnIdx in postProcessedRow) {
                if (postProcessedRow.hasOwnProperty(columnIdx)) {
                    postProcessedCleanupQueue.push({
                        actionType: 'C',
                        groupId: postProcessgroupId,
                        node: cacheEntry.cellNodesByColumnIdx[columnIdx | 0],
                        columnIdx: columnIdx | 0,
                        rowIdx: rowIdx
                    });
                }
            }
            postProcessedCleanupQueue.push({
                actionType: 'R',
                groupId: postProcessgroupId,
                node: cacheEntry.rowNode
            });
            cacheEntry.rowNode.detach();
        }
        function queuePostProcessedCellForCleanup(cellnode, columnIdx, rowIdx) {
            postProcessedCleanupQueue.push({
                actionType: 'C',
                groupId: postProcessgroupId,
                node: cellnode,
                columnIdx: columnIdx,
                rowIdx: rowIdx
            });
            $(cellnode).detach();
        }
        function removeRowFromCache(row) {
            var cacheEntry = rowsCache[row];
            if (!cacheEntry) {
                return;
            }
            if (options.enableAsyncPostRenderCleanup && postProcessedRows[row]) {
                queuePostProcessedRowForCleanup(cacheEntry, postProcessedRows[row], row);
            }
            else {
                cacheEntry.rowNode.each(function () {
                    this.parentElement.removeChild(this);
                });
            }
            delete rowsCache[row];
            delete postProcessedRows[row];
            renderedRows--;
            counter_rows_removed++;
        }
        function invalidateRows(rows) {
            var i, rl;
            if (!rows || !rows.length) {
                return;
            }
            vScrollDir = 0;
            rl = rows.length;
            for (i = 0; i < rl; i++) {
                if (currentEditor && activeRow === rows[i]) {
                    makeActiveCellNormal();
                }
                if (rowsCache[rows[i]]) {
                    removeRowFromCache(rows[i]);
                }
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
        }
        function invalidateRow(row) {
            if (!row && row !== 0) {
                return;
            }
            invalidateRows([row]);
        }
        function applyFormatResultToCellNode(formatterResult, cellNode, suppressRemove) {
            if (formatterResult === null || formatterResult === undefined) {
                formatterResult = '';
            }
            if (Object.prototype.toString.call(formatterResult) !== '[object Object]') {
                cellNode.innerHTML = formatterResult;
                return;
            }
            cellNode.innerHTML = formatterResult.text;
            if (formatterResult.removeClasses && !suppressRemove) {
                $(cellNode).removeClass(formatterResult.removeClasses);
            }
            if (formatterResult.addClasses) {
                $(cellNode).addClass(formatterResult.addClasses);
            }
            if (formatterResult.toolTip) {
                $(cellNode).attr("title", formatterResult.toolTip);
            }
        }
        function updateCell(row, cell) {
            var cellNode = getCellNode(row, cell);
            if (!cellNode) {
                return;
            }
            var m = columns[cell], d = getDataItem(row);
            if (currentEditor && activeRow === row && activeCell === cell) {
                currentEditor.loadValue(d);
            }
            else {
                var formatterResult = d ? getFormatter(row, m)(row, cell, getDataItemValueForColumn(d, m), m, d, self) : "";
                applyFormatResultToCellNode(formatterResult, cellNode);
                invalidatePostProcessingResults(row);
            }
        }
        function updateRow(row) {
            var cacheEntry = rowsCache[row];
            if (!cacheEntry) {
                return;
            }
            ensureCellNodesInRowsCache(row);
            var formatterResult, d = getDataItem(row);
            for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
                if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
                    continue;
                }
                columnIdx = columnIdx | 0;
                var m = columns[columnIdx], node = cacheEntry.cellNodesByColumnIdx[columnIdx][0];
                if (row === activeRow && columnIdx === activeCell && currentEditor) {
                    currentEditor.loadValue(d);
                }
                else if (d) {
                    formatterResult = getFormatter(row, m)(row, columnIdx, getDataItemValueForColumn(d, m), m, d, self);
                    applyFormatResultToCellNode(formatterResult, node);
                }
                else {
                    node.innerHTML = "";
                }
            }
            invalidatePostProcessingResults(row);
        }
        function getViewportHeight() {
            if (!options.autoHeight || options.frozenColumn != -1) {
                topPanelH = (options.showTopPanel) ? options.topPanelHeight + getVBoxDelta($topPanelScroller) : 0;
                headerRowH = (options.showHeaderRow) ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0;
                footerRowH = (options.showFooterRow) ? options.footerRowHeight + getVBoxDelta($footerRowScroller) : 0;
            }
            if (options.autoHeight) {
                var fullHeight = $paneHeaderL.outerHeight();
                fullHeight += (options.showHeaderRow) ? options.headerRowHeight + getVBoxDelta($headerRowScroller) : 0;
                fullHeight += (options.showFooterRow) ? options.footerRowHeight + getVBoxDelta($footerRowScroller) : 0;
                fullHeight += (getCanvasWidth() > viewportW) ? scrollbarDimensions.height : 0;
                viewportH = options.rowHeight
                    * getDataLengthIncludingAddNew()
                    + ((options.frozenColumn == -1) ? fullHeight : 0);
            }
            else {
                var columnNamesH = (options.showColumnHeader) ? parseFloat($.css($headerScroller[0], "height"))
                    + getVBoxDelta($headerScroller) : 0;
                var preHeaderH = (options.createPreHeaderPanel && options.showPreHeaderPanel) ? options.preHeaderPanelHeight + getVBoxDelta($preHeaderPanelScroller) : 0;
                viewportH = parseFloat($.css($container[0], "height", true))
                    - parseFloat($.css($container[0], "paddingTop", true))
                    - parseFloat($.css($container[0], "paddingBottom", true))
                    - columnNamesH
                    - topPanelH
                    - headerRowH
                    - footerRowH
                    - preHeaderH;
            }
            numVisibleRows = Math.ceil(viewportH / options.rowHeight);
            return viewportH;
        }
        function getViewportWidth() {
            viewportW = parseFloat($container.width());
        }
        function resizeCanvas() {
            if (!initialized) {
                return;
            }
            paneTopH = 0;
            paneBottomH = 0;
            viewportTopH = 0;
            viewportBottomH = 0;
            getViewportWidth();
            getViewportHeight();
            // Account for Frozen Rows
            if (hasFrozenRows) {
                if (options.frozenBottom) {
                    paneTopH = viewportH - frozenRowsHeight - scrollbarDimensions.height;
                    paneBottomH = frozenRowsHeight + scrollbarDimensions.height;
                }
                else {
                    paneTopH = frozenRowsHeight;
                    paneBottomH = viewportH - frozenRowsHeight;
                }
            }
            else {
                paneTopH = viewportH;
            }
            // The top pane includes the top panel and the header row
            paneTopH += topPanelH + headerRowH + footerRowH;
            if (hasFrozenColumns() && options.autoHeight) {
                paneTopH += scrollbarDimensions.height;
            }
            // The top viewport does not contain the top panel or header row
            viewportTopH = paneTopH - topPanelH - headerRowH - footerRowH;
            if (options.autoHeight) {
                if (hasFrozenColumns()) {
                    $container.height(paneTopH
                        + parseFloat($.css($headerScrollerL[0], "height")));
                }
                $paneTopL.css('position', 'relative');
            }
            $paneTopL.css({
                'top': $paneHeaderL.height() || (options.showHeaderRow ? options.headerRowHeight : 0) + (options.showPreHeaderPanel ? options.preHeaderPanelHeight : 0),
                'height': paneTopH
            });
            var paneBottomTop = $paneTopL.position().top
                + paneTopH;
            if (!options.autoHeight) {
                $viewportTopL.height(viewportTopH);
            }
            if (hasFrozenColumns()) {
                $paneTopR.css({
                    'top': $paneHeaderL.height(), 'height': paneTopH
                });
                $viewportTopR.height(viewportTopH);
                if (hasFrozenRows) {
                    $paneBottomL.css({
                        'top': paneBottomTop, 'height': paneBottomH
                    });
                    $paneBottomR.css({
                        'top': paneBottomTop, 'height': paneBottomH
                    });
                    $viewportBottomR.height(paneBottomH);
                }
            }
            else {
                if (hasFrozenRows) {
                    $paneBottomL.css({
                        'width': '100%', 'height': paneBottomH
                    });
                    $paneBottomL.css('top', paneBottomTop);
                }
            }
            if (hasFrozenRows) {
                $viewportBottomL.height(paneBottomH);
                if (options.frozenBottom) {
                    $canvasBottomL.height(frozenRowsHeight);
                    if (hasFrozenColumns()) {
                        $canvasBottomR.height(frozenRowsHeight);
                    }
                }
                else {
                    $canvasTopL.height(frozenRowsHeight);
                    if (hasFrozenColumns()) {
                        $canvasTopR.height(frozenRowsHeight);
                    }
                }
            }
            else {
                $viewportTopR.height(viewportTopH);
            }
            if (!scrollbarDimensions || !scrollbarDimensions.width) {
                scrollbarDimensions = measureScrollbar();
            }
            if (options.autosizeColsMode === Slick.GridAutosizeColsMode.LegacyForceFit) {
                autosizeColumns();
            }
            updateRowCount();
            handleScroll();
            // Since the width has changed, force the render() to reevaluate virtually rendered cells.
            lastRenderedScrollLeft = -1;
            render();
        }
        function updatePagingStatusFromView(pagingInfo) {
            pagingActive = (pagingInfo.pageSize !== 0);
            pagingIsLastPage = (pagingInfo.pageNum == pagingInfo.totalPages - 1);
        }
        function updateRowCount() {
            if (!initialized) {
                return;
            }
            var dataLength = getDataLength();
            var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
            var numberOfRows = 0;
            var oldH = (hasFrozenRows && !options.frozenBottom) ? $canvasBottomL.height() : $canvasTopL.height();
            if (hasFrozenRows) {
                var numberOfRows = getDataLength() - options.frozenRow;
            }
            else {
                var numberOfRows = dataLengthIncludingAddNew + (options.leaveSpaceForNewRows ? numVisibleRows - 1 : 0);
            }
            var tempViewportH = $viewportScrollContainerY.height();
            var oldViewportHasVScroll = viewportHasVScroll;
            // with autoHeight, we do not need to accommodate the vertical scroll bar
            viewportHasVScroll = options.alwaysShowVerticalScroll || !options.autoHeight && (numberOfRows * options.rowHeight > tempViewportH);
            makeActiveCellNormal();
            // remove the rows that are now outside of the data range
            // this helps avoid redundant calls to .removeRow() when the size of the data decreased by thousands of rows
            var r1 = dataLength - 1;
            for (var i in rowsCache) {
                if (i > r1) {
                    removeRowFromCache(i);
                }
            }
            if (options.enableAsyncPostRenderCleanup) {
                startPostProcessingCleanup();
            }
            if (activeCellNode && activeRow > r1) {
                resetActiveCell();
            }
            var oldH = h;
            if (options.autoHeight) {
                h = options.rowHeight * numberOfRows;
            }
            else {
                th = Math.max(options.rowHeight * numberOfRows, tempViewportH - scrollbarDimensions.height);
                if (th < maxSupportedCssHeight) {
                    // just one page
                    h = ph = th;
                    n = 1;
                    cj = 0;
                }
                else {
                    // break into pages
                    h = maxSupportedCssHeight;
                    ph = h / 100;
                    n = Math.floor(th / ph);
                    cj = (th - h) / (n - 1);
                }
            }
            if (h !== oldH) {
                if (hasFrozenRows && !options.frozenBottom) {
                    $canvasBottomL.css("height", h);
                    if (hasFrozenColumns()) {
                        $canvasBottomR.css("height", h);
                    }
                }
                else {
                    $canvasTopL.css("height", h);
                    $canvasTopR.css("height", h);
                }
                scrollTop = $viewportScrollContainerY[0].scrollTop;
            }
            var oldScrollTopInRange = (scrollTop + offset <= th - tempViewportH);
            if (th == 0 || scrollTop == 0) {
                page = offset = 0;
            }
            else if (oldScrollTopInRange) {
                // maintain virtual position
                scrollTo(scrollTop + offset);
            }
            else {
                // scroll to bottom
                scrollTo(th - tempViewportH);
            }
            if (h != oldH && options.autoHeight) {
                resizeCanvas();
            }
            if (options.autosizeColsMode === Slick.GridAutosizeColsMode.LegacyForceFit && oldViewportHasVScroll != viewportHasVScroll) {
                autosizeColumns();
            }
            updateCanvasWidth(false);
        }
        function getVisibleRange(viewportTop, viewportLeft) {
            if (viewportTop == null) {
                viewportTop = scrollTop;
            }
            if (viewportLeft == null) {
                viewportLeft = scrollLeft;
            }
            return {
                top: getRowFromPosition(viewportTop),
                bottom: getRowFromPosition(viewportTop + viewportH) + 1,
                leftPx: viewportLeft,
                rightPx: viewportLeft + viewportW
            };
        }
        function getRenderedRange(viewportTop, viewportLeft) {
            var range = getVisibleRange(viewportTop, viewportLeft);
            var buffer = Math.round(viewportH / options.rowHeight);
            var minBuffer = options.minRowBuffer;
            if (vScrollDir == -1) {
                range.top -= buffer;
                range.bottom += minBuffer;
            }
            else if (vScrollDir == 1) {
                range.top -= minBuffer;
                range.bottom += buffer;
            }
            else {
                range.top -= minBuffer;
                range.bottom += minBuffer;
            }
            range.top = Math.max(0, range.top);
            range.bottom = Math.min(getDataLengthIncludingAddNew() - 1, range.bottom);
            range.leftPx -= viewportW;
            range.rightPx += viewportW;
            range.leftPx = Math.max(0, range.leftPx);
            range.rightPx = Math.min(canvasWidth, range.rightPx);
            return range;
        }
        function ensureCellNodesInRowsCache(row) {
            var cacheEntry = rowsCache[row];
            if (cacheEntry) {
                if (cacheEntry.cellRenderQueue.length) {
                    var $lastNode = cacheEntry.rowNode.children().last();
                    while (cacheEntry.cellRenderQueue.length) {
                        var columnIdx = cacheEntry.cellRenderQueue.pop();
                        cacheEntry.cellNodesByColumnIdx[columnIdx] = $lastNode;
                        $lastNode = $lastNode.prev();
                        // Hack to retrieve the frozen columns because
                        if ($lastNode.length === 0) {
                            $lastNode = $(cacheEntry.rowNode[0]).children().last();
                        }
                    }
                }
            }
        }
        function cleanUpCells(range, row) {
            // Ignore frozen rows
            if (hasFrozenRows
                && ((options.frozenBottom && row > actualFrozenRow) // Frozen bottom rows
                    || (row <= actualFrozenRow) // Frozen top rows
                )) {
                return;
            }
            var totalCellsRemoved = 0;
            var cacheEntry = rowsCache[row];
            // Remove cells outside the range.
            var cellsToRemove = [];
            for (var i in cacheEntry.cellNodesByColumnIdx) {
                // I really hate it when people mess with Array.prototype.
                if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(i)) {
                    continue;
                }
                // This is a string, so it needs to be cast back to a number.
                i = i | 0;
                // Ignore frozen columns
                if (i <= options.frozenColumn) {
                    continue;
                }
                // Ignore alwaysRenderedColumns
                if (Array.isArray(columns) && columns[i] && columns[i].alwaysRenderColumn) {
                    continue;
                }
                var colspan = cacheEntry.cellColSpans[i];
                if (columnPosLeft[i] > range.rightPx ||
                    columnPosRight[Math.min(columns.length - 1, i + colspan - 1)] < range.leftPx) {
                    if (!(row == activeRow && i == activeCell)) {
                        cellsToRemove.push(i);
                    }
                }
            }
            var cellToRemove, cellNode;
            while ((cellToRemove = cellsToRemove.pop()) != null) {
                cellNode = cacheEntry.cellNodesByColumnIdx[cellToRemove][0];
                if (options.enableAsyncPostRenderCleanup && postProcessedRows[row] && postProcessedRows[row][cellToRemove]) {
                    queuePostProcessedCellForCleanup(cellNode, cellToRemove, row);
                }
                else {
                    cellNode.parentElement.removeChild(cellNode);
                }
                delete cacheEntry.cellColSpans[cellToRemove];
                delete cacheEntry.cellNodesByColumnIdx[cellToRemove];
                if (postProcessedRows[row]) {
                    delete postProcessedRows[row][cellToRemove];
                }
                totalCellsRemoved++;
            }
        }
        function cleanUpAndRenderCells(range) {
            var cacheEntry;
            var stringArray = [];
            var processedRows = [];
            var cellsAdded;
            var totalCellsAdded = 0;
            var colspan;
            for (var row = range.top, btm = range.bottom; row <= btm; row++) {
                cacheEntry = rowsCache[row];
                if (!cacheEntry) {
                    continue;
                }
                // cellRenderQueue populated in renderRows() needs to be cleared first
                ensureCellNodesInRowsCache(row);
                cleanUpCells(range, row);
                // Render missing cells.
                cellsAdded = 0;
                var metadata = data.getItemMetadata && data.getItemMetadata(row);
                metadata = metadata && metadata.columns;
                var d = getDataItem(row);
                // TODO:  shorten this loop (index? heuristics? binary search?)
                for (var i = 0, ii = columns.length; i < ii; i++) {
                    // Cells to the right are outside the range.
                    if (columnPosLeft[i] > range.rightPx) {
                        break;
                    }
                    // Already rendered.
                    if ((colspan = cacheEntry.cellColSpans[i]) != null) {
                        i += (colspan > 1 ? colspan - 1 : 0);
                        continue;
                    }
                    colspan = 1;
                    if (metadata) {
                        var columnData = metadata[columns[i].id] || metadata[i];
                        colspan = (columnData && columnData.colspan) || 1;
                        if (colspan === "*") {
                            colspan = ii - i;
                        }
                    }
                    if (columnPosRight[Math.min(ii - 1, i + colspan - 1)] > range.leftPx) {
                        appendCellHtml(stringArray, row, i, colspan, d);
                        cellsAdded++;
                    }
                    i += (colspan > 1 ? colspan - 1 : 0);
                }
                if (cellsAdded) {
                    totalCellsAdded += cellsAdded;
                    processedRows.push(row);
                }
            }
            if (!stringArray.length) {
                return;
            }
            var x = document.createElement("div");
            x.innerHTML = stringArray.join("");
            var processedRow;
            var node;
            while ((processedRow = processedRows.pop()) != null) {
                cacheEntry = rowsCache[processedRow];
                var columnIdx;
                while ((columnIdx = cacheEntry.cellRenderQueue.pop()) != null) {
                    node = x.lastChild;
                    if (hasFrozenColumns() && (columnIdx > options.frozenColumn)) {
                        cacheEntry.rowNode[1].appendChild(node);
                    }
                    else {
                        cacheEntry.rowNode[0].appendChild(node);
                    }
                    cacheEntry.cellNodesByColumnIdx[columnIdx] = $(node);
                }
            }
        }
        function renderRows(range) {
            var stringArrayL = [], stringArrayR = [], rows = [], needToReselectCell = false, dataLength = getDataLength();
            for (var i = range.top, ii = range.bottom; i <= ii; i++) {
                if (rowsCache[i] || (hasFrozenRows && options.frozenBottom && i == getDataLength())) {
                    continue;
                }
                renderedRows++;
                rows.push(i);
                // Create an entry right away so that appendRowHtml() can
                // start populatating it.
                rowsCache[i] = {
                    "rowNode": null,
                    // ColSpans of rendered cells (by column idx).
                    // Can also be used for checking whether a cell has been rendered.
                    "cellColSpans": [],
                    // Cell nodes (by column idx).  Lazy-populated by ensureCellNodesInRowsCache().
                    "cellNodesByColumnIdx": [],
                    // Column indices of cell nodes that have been rendered, but not yet indexed in
                    // cellNodesByColumnIdx.  These are in the same order as cell nodes added at the
                    // end of the row.
                    "cellRenderQueue": []
                };
                appendRowHtml(stringArrayL, stringArrayR, i, range, dataLength);
                if (activeCellNode && activeRow === i) {
                    needToReselectCell = true;
                }
                counter_rows_rendered++;
            }
            if (!rows.length) {
                return;
            }
            var x = document.createElement("div"), xRight = document.createElement("div");
            x.innerHTML = stringArrayL.join("");
            xRight.innerHTML = stringArrayR.join("");
            for (var i = 0, ii = rows.length; i < ii; i++) {
                if ((hasFrozenRows) && (rows[i] >= actualFrozenRow)) {
                    if (hasFrozenColumns()) {
                        rowsCache[rows[i]].rowNode = $()
                            .add($(x.firstChild))
                            .add($(xRight.firstChild));
                        $canvasBottomL[0].append(x.firstChild);
                        $canvasBottomR[0].append(xRight.firstChild);
                    }
                    else {
                        rowsCache[rows[i]].rowNode = $()
                            .add($(x.firstChild));
                        $canvasBottomL[0].append($(x.firstChild));
                    }
                }
                else if (hasFrozenColumns()) {
                    rowsCache[rows[i]].rowNode = $()
                        .add($(x.firstChild))
                        .add($(xRight.firstChild));
                    $canvasTopL[0].append(x.firstChild);
                    $canvasTopR[0].append(xRight.firstChild);
                }
                else {
                    rowsCache[rows[i]].rowNode = $()
                        .add($(x.firstChild));
                    $canvasTopL[0].append(x.firstChild);
                }
            }
            if (needToReselectCell) {
                activeCellNode = getCellNode(activeRow, activeCell);
            }
        }
        function startPostProcessing() {
            if (!options.enableAsyncPostRender) {
                return;
            }
            clearTimeout(h_postrender);
            h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
        }
        function startPostProcessingCleanup() {
            if (!options.enableAsyncPostRenderCleanup) {
                return;
            }
            clearTimeout(h_postrenderCleanup);
            h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
        }
        function invalidatePostProcessingResults(row) {
            // change status of columns to be re-rendered
            for (var columnIdx in postProcessedRows[row]) {
                if (postProcessedRows[row].hasOwnProperty(columnIdx)) {
                    postProcessedRows[row][columnIdx] = 'C';
                }
            }
            postProcessFromRow = Math.min(postProcessFromRow, row);
            postProcessToRow = Math.max(postProcessToRow, row);
            startPostProcessing();
        }
        function updateRowPositions() {
            for (var row in rowsCache) {
                var rowNumber = row ? parseInt(row) : 0;
                rowsCache[rowNumber].rowNode[0].style.top = getRowTop(rowNumber) + "px";
            }
        }
        function render() {
            if (!initialized) {
                return;
            }
            scrollThrottle.dequeue();
            var visible = getVisibleRange();
            var rendered = getRenderedRange();
            // remove rows no longer in the viewport
            cleanupRows(rendered);
            // add new rows & missing cells in existing rows
            if (lastRenderedScrollLeft != scrollLeft) {
                if (hasFrozenRows) {
                    var renderedFrozenRows = $.extend(true, {}, rendered);
                    if (options.frozenBottom) {
                        renderedFrozenRows.top = actualFrozenRow;
                        renderedFrozenRows.bottom = getDataLength();
                    }
                    else {
                        renderedFrozenRows.top = 0;
                        renderedFrozenRows.bottom = options.frozenRow;
                    }
                    cleanUpAndRenderCells(renderedFrozenRows);
                }
                cleanUpAndRenderCells(rendered);
            }
            // render missing rows
            renderRows(rendered);
            // Render frozen rows
            if (hasFrozenRows) {
                if (options.frozenBottom) {
                    renderRows({
                        top: actualFrozenRow, bottom: getDataLength() - 1, leftPx: rendered.leftPx, rightPx: rendered.rightPx
                    });
                }
                else {
                    renderRows({
                        top: 0, bottom: options.frozenRow - 1, leftPx: rendered.leftPx, rightPx: rendered.rightPx
                    });
                }
            }
            postProcessFromRow = visible.top;
            postProcessToRow = Math.min(getDataLengthIncludingAddNew() - 1, visible.bottom);
            startPostProcessing();
            lastRenderedScrollTop = scrollTop;
            lastRenderedScrollLeft = scrollLeft;
            h_render = null;
            trigger(self.onRendered, { startRow: visible.top, endRow: visible.bottom, grid: self });
        }
        function handleHeaderScroll() {
            handleElementScroll($headerScrollContainer[0]);
        }
        function handleHeaderRowScroll() {
            var scrollLeft = $headerRowScrollContainer[0].scrollLeft;
            if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
                $viewportScrollContainerX[0].scrollLeft = scrollLeft;
            }
        }
        function handleFooterRowScroll() {
            var scrollLeft = $footerRowScrollContainer[0].scrollLeft;
            if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
                $viewportScrollContainerX[0].scrollLeft = scrollLeft;
            }
        }
        function handlePreHeaderPanelScroll() {
            handleElementScroll($preHeaderPanelScroller[0]);
        }
        function handleElementScroll(element) {
            var scrollLeft = element.scrollLeft;
            if (scrollLeft != $viewportScrollContainerX[0].scrollLeft) {
                $viewportScrollContainerX[0].scrollLeft = scrollLeft;
            }
        }
        function handleScroll() {
            scrollTop = $viewportScrollContainerY[0].scrollTop;
            scrollLeft = $viewportScrollContainerX[0].scrollLeft;
            return _handleScroll(false);
        }
        function _handleScroll(isMouseWheel) {
            var maxScrollDistanceY = $viewportScrollContainerY[0].scrollHeight - $viewportScrollContainerY[0].clientHeight;
            var maxScrollDistanceX = $viewportScrollContainerY[0].scrollWidth - $viewportScrollContainerY[0].clientWidth;
            // Protect against erroneous clientHeight/Width greater than scrollHeight/Width.
            // Sometimes seen in Chrome.
            maxScrollDistanceY = Math.max(0, maxScrollDistanceY);
            maxScrollDistanceX = Math.max(0, maxScrollDistanceX);
            // Ceiling the max scroll values
            if (scrollTop > maxScrollDistanceY) {
                scrollTop = maxScrollDistanceY;
            }
            if (scrollLeft > maxScrollDistanceX) {
                scrollLeft = maxScrollDistanceX;
            }
            var vScrollDist = Math.abs(scrollTop - prevScrollTop);
            var hScrollDist = Math.abs(scrollLeft - prevScrollLeft);
            if (hScrollDist) {
                prevScrollLeft = scrollLeft;
                $viewportScrollContainerX[0].scrollLeft = scrollLeft;
                $headerScrollContainer[0].scrollLeft = scrollLeft;
                $topPanelScroller[0].scrollLeft = scrollLeft;
                $headerRowScrollContainer[0].scrollLeft = scrollLeft;
                if (options.createFooterRow) {
                    $footerRowScrollContainer[0].scrollLeft = scrollLeft;
                }
                if (options.createPreHeaderPanel) {
                    if (hasFrozenColumns()) {
                        $preHeaderPanelScrollerR[0].scrollLeft = scrollLeft;
                    }
                    else {
                        $preHeaderPanelScroller[0].scrollLeft = scrollLeft;
                    }
                }
                if (hasFrozenColumns()) {
                    if (hasFrozenRows) {
                        $viewportTopR[0].scrollLeft = scrollLeft;
                    }
                }
                else {
                    if (hasFrozenRows) {
                        $viewportTopL[0].scrollLeft = scrollLeft;
                    }
                }
            }
            if (vScrollDist) {
                vScrollDir = prevScrollTop < scrollTop ? 1 : -1;
                prevScrollTop = scrollTop;
                if (isMouseWheel) {
                    $viewportScrollContainerY[0].scrollTop = scrollTop;
                }
                if (hasFrozenColumns()) {
                    if (hasFrozenRows && !options.frozenBottom) {
                        $viewportBottomL[0].scrollTop = scrollTop;
                    }
                    else {
                        $viewportTopL[0].scrollTop = scrollTop;
                    }
                }
                // switch virtual pages if needed
                if (vScrollDist < viewportH) {
                    scrollTo(scrollTop + offset);
                }
                else {
                    var oldOffset = offset;
                    if (h == viewportH) {
                        page = 0;
                    }
                    else {
                        page = Math.min(n - 1, Math.floor(scrollTop * ((th - viewportH) / (h - viewportH)) * (1 / ph)));
                    }
                    offset = Math.round(page * cj);
                    if (oldOffset != offset) {
                        invalidateAllRows();
                    }
                }
            }
            if (hScrollDist || vScrollDist) {
                var dx = Math.abs(lastRenderedScrollLeft - scrollLeft);
                var dy = Math.abs(lastRenderedScrollTop - scrollTop);
                if (dx > 20 || dy > 20) {
                    // if rendering is forced or scrolling is small enough to be "easy", just render
                    if (options.forceSyncScrolling || (dy < viewportH && dx < viewportW)) {
                        render();
                    }
                    else {
                        // otherwise, perform "difficult" renders at a capped frequency
                        scrollThrottle.enqueue();
                    }
                    trigger(self.onViewportChanged, {});
                }
            }
            trigger(self.onScroll, { scrollLeft: scrollLeft, scrollTop: scrollTop });
            if (hScrollDist || vScrollDist)
                return true;
            return false;
        }
        /*
        limits the frequency at which the provided action is executed.
        call enqueue to execute the action - it will execute either immediately or, if it was executed less than minPeriod_ms in the past, as soon as minPeriod_ms has expired.
        call dequeue to cancel any pending action.
        */
        function ActionThrottle(action, minPeriod_ms) {
            var blocked = false;
            var queued = false;
            function enqueue() {
                if (!blocked) {
                    blockAndExecute();
                }
                else {
                    queued = true;
                }
            }
            function dequeue() {
                queued = false;
            }
            function blockAndExecute() {
                blocked = true;
                setTimeout(unblock, minPeriod_ms);
                action();
            }
            function unblock() {
                if (queued) {
                    dequeue();
                    blockAndExecute();
                }
                else {
                    blocked = false;
                }
            }
            return {
                enqueue: enqueue,
                dequeue: dequeue
            };
        }
        function asyncPostProcessRows() {
            var dataLength = getDataLength();
            while (postProcessFromRow <= postProcessToRow) {
                var row = (vScrollDir >= 0) ? postProcessFromRow++ : postProcessToRow--;
                var cacheEntry = rowsCache[row];
                if (!cacheEntry || row >= dataLength) {
                    continue;
                }
                if (!postProcessedRows[row]) {
                    postProcessedRows[row] = {};
                }
                ensureCellNodesInRowsCache(row);
                for (var columnIdx in cacheEntry.cellNodesByColumnIdx) {
                    if (!cacheEntry.cellNodesByColumnIdx.hasOwnProperty(columnIdx)) {
                        continue;
                    }
                    columnIdx = columnIdx | 0;
                    var m = columns[columnIdx];
                    var processedStatus = postProcessedRows[row][columnIdx]; // C=cleanup and re-render, R=rendered
                    if (m.asyncPostRender && processedStatus !== 'R') {
                        var node = cacheEntry.cellNodesByColumnIdx[columnIdx];
                        if (node) {
                            m.asyncPostRender(node, row, getDataItem(row), m, (processedStatus === 'C'));
                        }
                        postProcessedRows[row][columnIdx] = 'R';
                    }
                }
                h_postrender = setTimeout(asyncPostProcessRows, options.asyncPostRenderDelay);
                return;
            }
        }
        function asyncPostProcessCleanupRows() {
            if (postProcessedCleanupQueue.length > 0) {
                var groupId = postProcessedCleanupQueue[0].groupId;
                // loop through all queue members with this groupID
                while (postProcessedCleanupQueue.length > 0 && postProcessedCleanupQueue[0].groupId == groupId) {
                    var entry = postProcessedCleanupQueue.shift();
                    if (entry.actionType == 'R') {
                        $(entry.node).remove();
                    }
                    if (entry.actionType == 'C') {
                        var column = columns[entry.columnIdx];
                        if (column.asyncPostRenderCleanup && entry.node) {
                            // cleanup must also remove element
                            column.asyncPostRenderCleanup(entry.node, entry.rowIdx, column);
                        }
                    }
                }
                // call this function again after the specified delay
                h_postrenderCleanup = setTimeout(asyncPostProcessCleanupRows, options.asyncPostRenderCleanupDelay);
            }
        }
        function updateCellCssStylesOnRenderedRows(addedHash, removedHash) {
            var node, columnId, addedRowHash, removedRowHash;
            for (var row in rowsCache) {
                removedRowHash = removedHash && removedHash[row];
                addedRowHash = addedHash && addedHash[row];
                if (removedRowHash) {
                    for (columnId in removedRowHash) {
                        if (!addedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
                            node = getCellNode(row, getColumnIndex(columnId));
                            if (node) {
                                $(node).removeClass(removedRowHash[columnId]);
                            }
                        }
                    }
                }
                if (addedRowHash) {
                    for (columnId in addedRowHash) {
                        if (!removedRowHash || removedRowHash[columnId] != addedRowHash[columnId]) {
                            node = getCellNode(row, getColumnIndex(columnId));
                            if (node) {
                                $(node).addClass(addedRowHash[columnId]);
                            }
                        }
                    }
                }
            }
        }
        function addCellCssStyles(key, hash) {
            if (cellCssClasses[key]) {
                throw new Error("SlickGrid addCellCssStyles: cell CSS hash with key '" + key + "' already exists.");
            }
            cellCssClasses[key] = hash;
            updateCellCssStylesOnRenderedRows(hash, null);
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
        }
        function removeCellCssStyles(key) {
            if (!cellCssClasses[key]) {
                return;
            }
            updateCellCssStylesOnRenderedRows(null, cellCssClasses[key]);
            delete cellCssClasses[key];
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": null, "grid": self });
        }
        function setCellCssStyles(key, hash) {
            var prevHash = cellCssClasses[key];
            cellCssClasses[key] = hash;
            updateCellCssStylesOnRenderedRows(hash, prevHash);
            trigger(self.onCellCssStylesChanged, { "key": key, "hash": hash, "grid": self });
        }
        function getCellCssStyles(key) {
            return cellCssClasses[key];
        }
        function flashCell(row, cell, speed) {
            speed = speed || 100;
            function toggleCellClass($cell, times) {
                if (!times) {
                    return;
                }
                setTimeout(function () {
                    $cell.queue(function () {
                        $cell.toggleClass(options.cellFlashingCssClass).dequeue();
                        toggleCellClass($cell, times - 1);
                    });
                }, speed);
            }
            if (rowsCache[row]) {
                var $cell = $(getCellNode(row, cell));
                toggleCellClass($cell, 4);
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Interactivity
        function handleMouseWheel(e, delta, deltaX, deltaY) {
            scrollTop = Math.max(0, $viewportScrollContainerY[0].scrollTop - (deltaY * options.rowHeight));
            scrollLeft = $viewportScrollContainerX[0].scrollLeft + (deltaX * 10);
            var handled = _handleScroll(true);
            if (handled)
                e.preventDefault();
        }
        function handleDragInit(e, dd) {
            var cell = getCellFromEvent(e);
            if (!cell || !cellExists(cell.row, cell.cell)) {
                return false;
            }
            var retval = trigger(self.onDragInit, dd, e);
            if (e.isImmediatePropagationStopped()) {
                return retval;
            }
            // if nobody claims to be handling drag'n'drop by stopping immediate propagation,
            // cancel out of it
            return false;
        }
        function handleDragStart(e, dd) {
            var cell = getCellFromEvent(e);
            if (!cell || !cellExists(cell.row, cell.cell)) {
                return false;
            }
            var retval = trigger(self.onDragStart, dd, e);
            if (e.isImmediatePropagationStopped()) {
                return retval;
            }
            return false;
        }
        function handleDrag(e, dd) {
            return trigger(self.onDrag, dd, e);
        }
        function handleDragEnd(e, dd) {
            trigger(self.onDragEnd, dd, e);
        }
        function handleKeyDown(e) {
            trigger(self.onKeyDown, { row: activeRow, cell: activeCell }, e);
            var handled = e.isImmediatePropagationStopped();
            var keyCode = Slick.keyCode;
            if (!handled) {
                if (!e.shiftKey && !e.altKey) {
                    if (options.editable && currentEditor && currentEditor.keyCaptureList) {
                        if (currentEditor.keyCaptureList.indexOf(e.which) > -1) {
                            return;
                        }
                    }
                    if (e.which == keyCode.HOME) {
                        handled = (e.ctrlKey) ? navigateTop() : navigateRowStart();
                    }
                    else if (e.which == keyCode.END) {
                        handled = (e.ctrlKey) ? navigateBottom() : navigateRowEnd();
                    }
                }
            }
            if (!handled) {
                if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
                    // editor may specify an array of keys to bubble
                    if (options.editable && currentEditor && currentEditor.keyCaptureList) {
                        if (currentEditor.keyCaptureList.indexOf(e.which) > -1) {
                            return;
                        }
                    }
                    if (e.which == keyCode.ESCAPE) {
                        if (!getEditorLock().isActive()) {
                            return; // no editing mode to cancel, allow bubbling and default processing (exit without cancelling the event)
                        }
                        cancelEditAndSetFocus();
                    }
                    else if (e.which == keyCode.PAGE_DOWN) {
                        navigatePageDown();
                        handled = true;
                    }
                    else if (e.which == keyCode.PAGE_UP) {
                        navigatePageUp();
                        handled = true;
                    }
                    else if (e.which == keyCode.LEFT) {
                        handled = navigateLeft();
                    }
                    else if (e.which == keyCode.RIGHT) {
                        handled = navigateRight();
                    }
                    else if (e.which == keyCode.UP) {
                        handled = navigateUp();
                    }
                    else if (e.which == keyCode.DOWN) {
                        handled = navigateDown();
                    }
                    else if (e.which == keyCode.TAB) {
                        handled = navigateNext();
                    }
                    else if (e.which == keyCode.ENTER) {
                        if (options.editable) {
                            if (currentEditor) {
                                // adding new row
                                if (activeRow === getDataLength()) {
                                    navigateDown();
                                }
                                else {
                                    commitEditAndSetFocus();
                                }
                            }
                            else {
                                if (getEditorLock().commitCurrentEdit()) {
                                    makeActiveCellEditable(undefined, undefined, e);
                                }
                            }
                        }
                        handled = true;
                    }
                }
                else if (e.which == keyCode.TAB && e.shiftKey && !e.ctrlKey && !e.altKey) {
                    handled = navigatePrev();
                }
            }
            if (handled) {
                // the event has been handled so don't let parent element (bubbling/propagation) or browser (default) handle it
                e.stopPropagation();
                e.preventDefault();
                try {
                    e.originalEvent.keyCode = 0; // prevent default behaviour for special keys in IE browsers (F3, F5, etc.)
                }
                // ignore exceptions - setting the original event's keycode throws access denied exception for "Ctrl"
                // (hitting control key only, nothing else), "Shift" (maybe others)
                catch (error) {
                }
            }
        }
        function handleClick(e) {
            if (!currentEditor) {
                // if this click resulted in some cell child node getting focus,
                // don't steal it back - keyboard events will still bubble up
                // IE9+ seems to default DIVs to tabIndex=0 instead of -1, so check for cell clicks directly.
                if (e.target != document.activeElement || $(e.target).hasClass("slick-cell")) {
                    var selection = getTextSelection(); //store text-selection and restore it after
                    setFocus();
                    setTextSelection(selection);
                }
            }
            var cell = getCellFromEvent(e);
            if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
                return;
            }
            trigger(self.onClick, { row: cell.row, cell: cell.cell }, e);
            if (e.isImmediatePropagationStopped()) {
                return;
            }
            // this optimisation causes trouble - MLeibman #329
            //if ((activeCell != cell.cell || activeRow != cell.row) && canCellBeActive(cell.row, cell.cell)) {
            if (canCellBeActive(cell.row, cell.cell)) {
                if (!getEditorLock().isActive() || getEditorLock().commitCurrentEdit()) {
                    scrollRowIntoView(cell.row, false);
                    var preClickModeOn = (e.target && e.target.className === Slick.preClickClassName);
                    var column = columns[cell.cell];
                    var suppressActiveCellChangedEvent = !!(options.editable && column && column.editor && options.suppressActiveCellChangeOnEdit);
                    setActiveCellInternal(getCellNode(cell.row, cell.cell), null, preClickModeOn, suppressActiveCellChangedEvent, e);
                }
            }
        }
        function handleContextMenu(e) {
            var $cell = $(e.target).closest(".slick-cell", $canvas);
            if ($cell.length === 0) {
                return;
            }
            // are we editing this cell?
            if (activeCellNode === $cell[0] && currentEditor !== null) {
                return;
            }
            trigger(self.onContextMenu, {}, e);
        }
        function handleDblClick(e) {
            var cell = getCellFromEvent(e);
            if (!cell || (currentEditor !== null && activeRow == cell.row && activeCell == cell.cell)) {
                return;
            }
            trigger(self.onDblClick, { row: cell.row, cell: cell.cell }, e);
            if (e.isImmediatePropagationStopped()) {
                return;
            }
            if (options.editable) {
                gotoCell(cell.row, cell.cell, true, e);
            }
        }
        function handleHeaderMouseEnter(e) {
            trigger(self.onHeaderMouseEnter, {
                "column": $(this).data("column"),
                "grid": self
            }, e);
        }
        function handleHeaderMouseLeave(e) {
            trigger(self.onHeaderMouseLeave, {
                "column": $(this).data("column"),
                "grid": self
            }, e);
        }
        function handleHeaderContextMenu(e) {
            var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
            var column = $header && $header.data("column");
            trigger(self.onHeaderContextMenu, { column: column }, e);
        }
        function handleHeaderClick(e) {
            if (columnResizeDragging)
                return;
            var $header = $(e.target).closest(".slick-header-column", ".slick-header-columns");
            var column = $header && $header.data("column");
            if (column) {
                trigger(self.onHeaderClick, { column: column }, e);
            }
        }
        function handleFooterContextMenu(e) {
            var $footer = $(e.target).closest(".slick-footerrow-column", ".slick-footerrow-columns");
            var column = $footer && $footer.data("column");
            trigger(self.onFooterContextMenu, { column: column }, e);
        }
        function handleFooterClick(e) {
            var $footer = $(e.target).closest(".slick-footerrow-column", ".slick-footerrow-columns");
            var column = $footer && $footer.data("column");
            trigger(self.onFooterClick, { column: column }, e);
        }
        function handleMouseEnter(e) {
            trigger(self.onMouseEnter, {}, e);
        }
        function handleMouseLeave(e) {
            trigger(self.onMouseLeave, {}, e);
        }
        function cellExists(row, cell) {
            return !(row < 0 || row >= getDataLength() || cell < 0 || cell >= columns.length);
        }
        function getCellFromPoint(x, y) {
            var row = getRowFromPosition(y);
            var cell = 0;
            var w = 0;
            for (var i = 0; i < columns.length && w < x; i++) {
                w += columns[i].width;
                cell++;
            }
            if (cell < 0) {
                cell = 0;
            }
            return { row: row, cell: cell - 1 };
        }
        function getCellFromNode(cellNode) {
            // read column number from .l<columnNumber> CSS class
            var cls = /l\d+/.exec(cellNode.className);
            if (!cls) {
                throw new Error("SlickGrid getCellFromNode: cannot get cell - " + cellNode.className);
            }
            return parseInt(cls[0].substr(1, cls[0].length - 1), 10);
        }
        function getRowFromNode(rowNode) {
            for (var row in rowsCache) {
                for (var i in rowsCache[row].rowNode) {
                    if (rowsCache[row].rowNode[i] === rowNode)
                        return (row ? parseInt(row) : 0);
                }
            }
            return null;
        }
        function getFrozenRowOffset(row) {
            var offset = (hasFrozenRows)
                ? (options.frozenBottom)
                    ? (row >= actualFrozenRow)
                        ? (h < viewportTopH)
                            ? (actualFrozenRow * options.rowHeight)
                            : h
                        : 0
                    : (row >= actualFrozenRow)
                        ? frozenRowsHeight
                        : 0
                : 0;
            return offset;
        }
        function getCellFromEvent(e) {
            var row, cell;
            var $cell = $(e.target).closest(".slick-cell", $canvas);
            if (!$cell.length) {
                return null;
            }
            row = getRowFromNode($cell[0].parentNode);
            if (hasFrozenRows) {
                var c = $cell.parents('.grid-canvas').offset();
                var rowOffset = 0;
                var isBottom = $cell.parents('.grid-canvas-bottom').length;
                if (isBottom) {
                    rowOffset = (options.frozenBottom) ? $canvasTopL.height() : frozenRowsHeight;
                }
                row = getCellFromPoint(e.clientX - c.left, e.clientY - c.top + rowOffset + $(document).scrollTop()).row;
            }
            cell = getCellFromNode($cell[0]);
            if (row == null || cell == null) {
                return null;
            }
            else {
                return {
                    "row": row,
                    "cell": cell
                };
            }
        }
        function getCellNodeBox(row, cell) {
            if (!cellExists(row, cell)) {
                return null;
            }
            var frozenRowOffset = getFrozenRowOffset(row);
            var y1 = getRowTop(row) - frozenRowOffset;
            var y2 = y1 + options.rowHeight - 1;
            var x1 = 0;
            for (var i = 0; i < cell; i++) {
                x1 += columns[i].width;
                if (options.frozenColumn == i) {
                    x1 = 0;
                }
            }
            var x2 = x1 + columns[cell].width;
            return {
                top: y1,
                left: x1,
                bottom: y2,
                right: x2
            };
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Cell switching
        function resetActiveCell() {
            setActiveCellInternal(null, false);
        }
        function setFocus() {
            if (tabbingDirection == -1) {
                $focusSink[0].focus();
            }
            else {
                $focusSink2[0].focus();
            }
        }
        function scrollCellIntoView(row, cell, doPaging) {
            scrollRowIntoView(row, doPaging);
            if (cell <= options.frozenColumn) {
                return;
            }
            var colspan = getColspan(row, cell);
            internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell + (colspan > 1 ? colspan - 1 : 0)]);
        }
        function internalScrollColumnIntoView(left, right) {
            var scrollRight = scrollLeft + $viewportScrollContainerX.width();
            if (left < scrollLeft) {
                $viewportScrollContainerX.scrollLeft(left);
                handleScroll();
                render();
            }
            else if (right > scrollRight) {
                $viewportScrollContainerX.scrollLeft(Math.min(left, right - $viewportScrollContainerX[0].clientWidth));
                handleScroll();
                render();
            }
        }
        function scrollColumnIntoView(cell) {
            internalScrollColumnIntoView(columnPosLeft[cell], columnPosRight[cell]);
        }
        function setActiveCellInternal(newCell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent, e) {
            if (activeCellNode !== null) {
                makeActiveCellNormal();
                $(activeCellNode).removeClass("active");
                if (rowsCache[activeRow]) {
                    rowsCache[activeRow].rowNode.removeClass("active");
                }
            }
            var activeCellChanged = (activeCellNode !== newCell);
            activeCellNode = newCell;
            if (activeCellNode != null) {
                var $activeCellNode = $(activeCellNode);
                var $activeCellOffset = $activeCellNode.offset();
                var rowOffset = Math.floor($activeCellNode.parents('.grid-canvas').offset().top);
                var isBottom = $activeCellNode.parents('.grid-canvas-bottom').length;
                if (hasFrozenRows && isBottom) {
                    rowOffset -= (options.frozenBottom)
                        ? $canvasTopL.height()
                        : frozenRowsHeight;
                }
                var cell = getCellFromPoint($activeCellOffset.left, Math.ceil($activeCellOffset.top) - rowOffset);
                activeRow = cell.row;
                activeCell = activePosX = activeCell = activePosX = getCellFromNode(activeCellNode);
                if (opt_editMode == null) {
                    opt_editMode = (activeRow == getDataLength()) || options.autoEdit;
                }
                if (options.showCellSelection) {
                    $activeCellNode.addClass("active");
                    if (rowsCache[activeRow]) {
                        rowsCache[activeRow].rowNode.addClass("active");
                    }
                }
                if (options.editable && opt_editMode && isCellPotentiallyEditable(activeRow, activeCell)) {
                    clearTimeout(h_editorLoader);
                    if (options.asyncEditorLoading) {
                        h_editorLoader = setTimeout(function () {
                            makeActiveCellEditable(undefined, preClickModeOn, e);
                        }, options.asyncEditorLoadDelay);
                    }
                    else {
                        makeActiveCellEditable(undefined, preClickModeOn, e);
                    }
                }
            }
            else {
                activeRow = activeCell = null;
            }
            // this optimisation causes trouble - MLeibman #329
            //if (activeCellChanged) {
            if (!suppressActiveCellChangedEvent) {
                trigger(self.onActiveCellChanged, getActiveCell());
            }
            //}
        }
        function clearTextSelection() {
            if (document.selection && document.selection.empty) {
                try {
                    //IE fails here if selected element is not in dom
                    document.selection.empty();
                }
                catch (e) { }
            }
            else if (window.getSelection) {
                var sel = window.getSelection();
                if (sel && sel.removeAllRanges) {
                    sel.removeAllRanges();
                }
            }
        }
        function isCellPotentiallyEditable(row, cell) {
            var dataLength = getDataLength();
            // is the data for this row loaded?
            if (row < dataLength && !getDataItem(row)) {
                return false;
            }
            // are we in the Add New row?  can we create new from this cell?
            if (columns[cell].cannotTriggerInsert && row >= dataLength) {
                return false;
            }
            // does this cell have an editor?
            if (!getEditor(row, cell)) {
                return false;
            }
            return true;
        }
        function makeActiveCellNormal() {
            if (!currentEditor) {
                return;
            }
            trigger(self.onBeforeCellEditorDestroy, { editor: currentEditor });
            currentEditor.destroy();
            currentEditor = null;
            if (activeCellNode) {
                var d = getDataItem(activeRow);
                $(activeCellNode).removeClass("editable invalid");
                if (d) {
                    var column = columns[activeCell];
                    var formatter = getFormatter(activeRow, column);
                    var formatterResult = formatter(activeRow, activeCell, getDataItemValueForColumn(d, column), column, d, self);
                    applyFormatResultToCellNode(formatterResult, activeCellNode);
                    invalidatePostProcessingResults(activeRow);
                }
            }
            // if there previously was text selected on a page (such as selected text in the edit cell just removed),
            // IE can't set focus to anything else correctly
            if (navigator.userAgent.toLowerCase().match(/msie/)) {
                clearTextSelection();
            }
            getEditorLock().deactivate(editController);
        }
        function makeActiveCellEditable(editor, preClickModeOn, e) {
            if (!activeCellNode) {
                return;
            }
            if (!options.editable) {
                throw new Error("SlickGrid makeActiveCellEditable : should never get called when options.editable is false");
            }
            // cancel pending async call if there is one
            clearTimeout(h_editorLoader);
            if (!isCellPotentiallyEditable(activeRow, activeCell)) {
                return;
            }
            var columnDef = columns[activeCell];
            var item = getDataItem(activeRow);
            if (trigger(self.onBeforeEditCell, { row: activeRow, cell: activeCell, item: item, column: columnDef, target: 'grid' }) === false) {
                setFocus();
                return;
            }
            getEditorLock().activate(editController);
            $(activeCellNode).addClass("editable");
            var useEditor = editor || getEditor(activeRow, activeCell);
            // don't clear the cell if a custom editor is passed through
            if (!editor && !useEditor.suppressClearOnEdit) {
                activeCellNode.innerHTML = "";
            }
            var metadata = data.getItemMetadata && data.getItemMetadata(activeRow);
            metadata = metadata && metadata.columns;
            var columnMetaData = metadata && (metadata[columnDef.id] || metadata[activeCell]);
            currentEditor = new useEditor({
                grid: self,
                gridPosition: absBox($container[0]),
                position: absBox(activeCellNode),
                container: activeCellNode,
                column: columnDef,
                columnMetaData: columnMetaData,
                item: item || {},
                event: e,
                commitChanges: commitEditAndSetFocus,
                cancelChanges: cancelEditAndSetFocus
            });
            if (item) {
                currentEditor.loadValue(item);
                if (preClickModeOn && currentEditor.preClick) {
                    currentEditor.preClick();
                }
            }
            serializedEditorValue = currentEditor.serializeValue();
            if (currentEditor.position) {
                handleActiveCellPositionChange();
            }
        }
        function commitEditAndSetFocus() {
            // if the commit fails, it would do so due to a validation error
            // if so, do not steal the focus from the editor
            if (getEditorLock().commitCurrentEdit()) {
                setFocus();
                if (options.autoEdit) {
                    navigateDown();
                }
            }
        }
        function cancelEditAndSetFocus() {
            if (getEditorLock().cancelCurrentEdit()) {
                setFocus();
            }
        }
        function absBox(elem) {
            var box = {
                top: elem.offsetTop,
                left: elem.offsetLeft,
                bottom: 0,
                right: 0,
                width: $(elem).outerWidth(),
                height: $(elem).outerHeight(),
                visible: true
            };
            box.bottom = box.top + box.height;
            box.right = box.left + box.width;
            // walk up the tree
            var offsetParent = elem.offsetParent;
            while ((elem = elem.parentNode) != document.body) {
                if (elem == null)
                    break;
                if (box.visible && elem.scrollHeight != elem.offsetHeight && $(elem).css("overflowY") != "visible") {
                    box.visible = box.bottom > elem.scrollTop && box.top < elem.scrollTop + elem.clientHeight;
                }
                if (box.visible && elem.scrollWidth != elem.offsetWidth && $(elem).css("overflowX") != "visible") {
                    box.visible = box.right > elem.scrollLeft && box.left < elem.scrollLeft + elem.clientWidth;
                }
                box.left -= elem.scrollLeft;
                box.top -= elem.scrollTop;
                if (elem === offsetParent) {
                    box.left += elem.offsetLeft;
                    box.top += elem.offsetTop;
                    offsetParent = elem.offsetParent;
                }
                box.bottom = box.top + box.height;
                box.right = box.left + box.width;
            }
            return box;
        }
        function getActiveCellPosition() {
            return absBox(activeCellNode);
        }
        function getGridPosition() {
            return absBox($container[0]);
        }
        function handleActiveCellPositionChange() {
            if (!activeCellNode) {
                return;
            }
            trigger(self.onActiveCellPositionChanged, {});
            if (currentEditor) {
                var cellBox = getActiveCellPosition();
                if (currentEditor.show && currentEditor.hide) {
                    if (!cellBox.visible) {
                        currentEditor.hide();
                    }
                    else {
                        currentEditor.show();
                    }
                }
                if (currentEditor.position) {
                    currentEditor.position(cellBox);
                }
            }
        }
        function getCellEditor() {
            return currentEditor;
        }
        function getActiveCell() {
            if (!activeCellNode) {
                return null;
            }
            else {
                return { row: activeRow, cell: activeCell };
            }
        }
        function getActiveCellNode() {
            return activeCellNode;
        }
        //This get/set methods are used for keeping text-selection. These don't consider IE because they don't loose text-selection.
        //Fix for firefox selection. See https://github.com/mleibman/SlickGrid/pull/746/files
        function getTextSelection() {
            var textSelection = null;
            if (window.getSelection) {
                var selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    textSelection = selection.getRangeAt(0);
                }
            }
            return textSelection;
        }
        function setTextSelection(selection) {
            if (window.getSelection && selection) {
                var target = window.getSelection();
                target.removeAllRanges();
                target.addRange(selection);
            }
        }
        function scrollRowIntoView(row, doPaging) {
            if (!hasFrozenRows ||
                (!options.frozenBottom && row > actualFrozenRow - 1) ||
                (options.frozenBottom && row < actualFrozenRow - 1)) {
                var viewportScrollH = $viewportScrollContainerY.height();
                // if frozen row on top
                // subtract number of frozen row
                var rowNumber = (hasFrozenRows && !options.frozenBottom ? row - options.frozenRow : row);
                var rowAtTop = rowNumber * options.rowHeight;
                var rowAtBottom = (rowNumber + 1) * options.rowHeight
                    - viewportScrollH
                    + (viewportHasHScroll ? scrollbarDimensions.height : 0);
                // need to page down?
                if ((rowNumber + 1) * options.rowHeight > scrollTop + viewportScrollH + offset) {
                    scrollTo(doPaging ? rowAtTop : rowAtBottom);
                    render();
                }
                // or page up?
                else if (rowNumber * options.rowHeight < scrollTop + offset) {
                    scrollTo(doPaging ? rowAtBottom : rowAtTop);
                    render();
                }
            }
        }
        function scrollRowToTop(row) {
            scrollTo(row * options.rowHeight);
            render();
        }
        function scrollPage(dir) {
            var deltaRows = dir * numVisibleRows;
            /// First fully visible row crosses the line with
            /// y == bottomOfTopmostFullyVisibleRow
            var bottomOfTopmostFullyVisibleRow = scrollTop + options.rowHeight - 1;
            scrollTo((getRowFromPosition(bottomOfTopmostFullyVisibleRow) + deltaRows) * options.rowHeight);
            render();
            if (options.enableCellNavigation && activeRow != null) {
                var row = activeRow + deltaRows;
                var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
                if (row >= dataLengthIncludingAddNew) {
                    row = dataLengthIncludingAddNew - 1;
                }
                if (row < 0) {
                    row = 0;
                }
                var cell = 0, prevCell = null;
                var prevActivePosX = activePosX;
                while (cell <= activePosX) {
                    if (canCellBeActive(row, cell)) {
                        prevCell = cell;
                    }
                    cell += getColspan(row, cell);
                }
                if (prevCell !== null) {
                    setActiveCellInternal(getCellNode(row, prevCell));
                    activePosX = prevActivePosX;
                }
                else {
                    resetActiveCell();
                }
            }
        }
        function navigatePageDown() {
            scrollPage(1);
        }
        function navigatePageUp() {
            scrollPage(-1);
        }
        function navigateTop() {
            navigateToRow(0);
        }
        function navigateBottom() {
            navigateToRow(getDataLength() - 1);
        }
        function navigateToRow(row) {
            var num_rows = getDataLength();
            if (!num_rows)
                return true;
            if (row < 0)
                row = 0;
            else if (row >= num_rows)
                row = num_rows - 1;
            scrollCellIntoView(row, 0, true);
            if (options.enableCellNavigation && activeRow != null) {
                var cell = 0, prevCell = null;
                var prevActivePosX = activePosX;
                while (cell <= activePosX) {
                    if (canCellBeActive(row, cell)) {
                        prevCell = cell;
                    }
                    cell += getColspan(row, cell);
                }
                if (prevCell !== null) {
                    setActiveCellInternal(getCellNode(row, prevCell));
                    activePosX = prevActivePosX;
                }
                else {
                    resetActiveCell();
                }
            }
            return true;
        }
        function getColspan(row, cell) {
            var metadata = data.getItemMetadata && data.getItemMetadata(row);
            if (!metadata || !metadata.columns) {
                return 1;
            }
            var columnData = metadata.columns[columns[cell].id] || metadata.columns[cell];
            var colspan = (columnData && columnData.colspan);
            if (colspan === "*") {
                colspan = columns.length - cell;
            }
            else {
                colspan = colspan || 1;
            }
            return colspan;
        }
        function findFirstFocusableCell(row) {
            var cell = 0;
            while (cell < columns.length) {
                if (canCellBeActive(row, cell)) {
                    return cell;
                }
                cell += getColspan(row, cell);
            }
            return null;
        }
        function findLastFocusableCell(row) {
            var cell = 0;
            var lastFocusableCell = null;
            while (cell < columns.length) {
                if (canCellBeActive(row, cell)) {
                    lastFocusableCell = cell;
                }
                cell += getColspan(row, cell);
            }
            return lastFocusableCell;
        }
        function gotoRight(row, cell, posX) {
            if (cell >= columns.length) {
                return null;
            }
            do {
                cell += getColspan(row, cell);
            } while (cell < columns.length && !canCellBeActive(row, cell));
            if (cell < columns.length) {
                return {
                    "row": row,
                    "cell": cell,
                    "posX": cell
                };
            }
            return null;
        }
        function gotoLeft(row, cell, posX) {
            if (cell <= 0) {
                return null;
            }
            var firstFocusableCell = findFirstFocusableCell(row);
            if (firstFocusableCell === null || firstFocusableCell >= cell) {
                return null;
            }
            var prev = {
                "row": row,
                "cell": firstFocusableCell,
                "posX": firstFocusableCell
            };
            var pos;
            while (true) {
                pos = gotoRight(prev.row, prev.cell, prev.posX);
                if (!pos) {
                    return null;
                }
                if (pos.cell >= cell) {
                    return prev;
                }
                prev = pos;
            }
        }
        function gotoDown(row, cell, posX) {
            var prevCell;
            var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
            while (true) {
                if (++row >= dataLengthIncludingAddNew) {
                    return null;
                }
                prevCell = cell = 0;
                while (cell <= posX) {
                    prevCell = cell;
                    cell += getColspan(row, cell);
                }
                if (canCellBeActive(row, prevCell)) {
                    return {
                        "row": row,
                        "cell": prevCell,
                        "posX": posX
                    };
                }
            }
        }
        function gotoUp(row, cell, posX) {
            var prevCell;
            while (true) {
                if (--row < 0) {
                    return null;
                }
                prevCell = cell = 0;
                while (cell <= posX) {
                    prevCell = cell;
                    cell += getColspan(row, cell);
                }
                if (canCellBeActive(row, prevCell)) {
                    return {
                        "row": row,
                        "cell": prevCell,
                        "posX": posX
                    };
                }
            }
        }
        function gotoNext(row, cell, posX) {
            if (row == null && cell == null) {
                row = cell = posX = 0;
                if (canCellBeActive(row, cell)) {
                    return {
                        "row": row,
                        "cell": cell,
                        "posX": cell
                    };
                }
            }
            var pos = gotoRight(row, cell, posX);
            if (pos) {
                return pos;
            }
            var firstFocusableCell = null;
            var dataLengthIncludingAddNew = getDataLengthIncludingAddNew();
            // if at last row, cycle through columns rather than get stuck in the last one
            if (row === dataLengthIncludingAddNew - 1) {
                row--;
            }
            while (++row < dataLengthIncludingAddNew) {
                firstFocusableCell = findFirstFocusableCell(row);
                if (firstFocusableCell !== null) {
                    return {
                        "row": row,
                        "cell": firstFocusableCell,
                        "posX": firstFocusableCell
                    };
                }
            }
            return null;
        }
        function gotoPrev(row, cell, posX) {
            if (row == null && cell == null) {
                row = getDataLengthIncludingAddNew() - 1;
                cell = posX = columns.length - 1;
                if (canCellBeActive(row, cell)) {
                    return {
                        "row": row,
                        "cell": cell,
                        "posX": cell
                    };
                }
            }
            var pos;
            var lastSelectableCell;
            while (!pos) {
                pos = gotoLeft(row, cell, posX);
                if (pos) {
                    break;
                }
                if (--row < 0) {
                    return null;
                }
                cell = 0;
                lastSelectableCell = findLastFocusableCell(row);
                if (lastSelectableCell !== null) {
                    pos = {
                        "row": row,
                        "cell": lastSelectableCell,
                        "posX": lastSelectableCell
                    };
                }
            }
            return pos;
        }
        function gotoRowStart(row, cell, posX) {
            var newCell = findFirstFocusableCell(row);
            if (newCell === null)
                return null;
            return {
                "row": row,
                "cell": newCell,
                "posX": newCell
            };
        }
        function gotoRowEnd(row, cell, posX) {
            var newCell = findLastFocusableCell(row);
            if (newCell === null)
                return null;
            return {
                "row": row,
                "cell": newCell,
                "posX": newCell
            };
        }
        function navigateRight() {
            return navigate("right");
        }
        function navigateLeft() {
            return navigate("left");
        }
        function navigateDown() {
            return navigate("down");
        }
        function navigateUp() {
            return navigate("up");
        }
        function navigateNext() {
            return navigate("next");
        }
        function navigatePrev() {
            return navigate("prev");
        }
        function navigateRowStart() {
            return navigate("home");
        }
        function navigateRowEnd() {
            return navigate("end");
        }
        /**
         * @param {string} dir Navigation direction.
         * @return {boolean} Whether navigation resulted in a change of active cell.
         */
        function navigate(dir) {
            if (!options.enableCellNavigation) {
                return false;
            }
            if (!activeCellNode && dir != "prev" && dir != "next") {
                return false;
            }
            if (!getEditorLock().commitCurrentEdit()) {
                return true;
            }
            setFocus();
            var tabbingDirections = {
                "up": -1,
                "down": 1,
                "left": -1,
                "right": 1,
                "prev": -1,
                "next": 1,
                "home": -1,
                "end": 1
            };
            tabbingDirection = tabbingDirections[dir];
            var stepFunctions = {
                "up": gotoUp,
                "down": gotoDown,
                "left": gotoLeft,
                "right": gotoRight,
                "prev": gotoPrev,
                "next": gotoNext,
                "home": gotoRowStart,
                "end": gotoRowEnd
            };
            var stepFn = stepFunctions[dir];
            var pos = stepFn(activeRow, activeCell, activePosX);
            if (pos) {
                if (hasFrozenRows && options.frozenBottom & pos.row == getDataLength()) {
                    return;
                }
                var isAddNewRow = (pos.row == getDataLength());
                if ((!options.frozenBottom && pos.row >= actualFrozenRow)
                    || (options.frozenBottom && pos.row < actualFrozenRow)) {
                    scrollCellIntoView(pos.row, pos.cell, !isAddNewRow && options.emulatePagingWhenScrolling);
                }
                setActiveCellInternal(getCellNode(pos.row, pos.cell));
                activePosX = pos.posX;
                return true;
            }
            else {
                setActiveCellInternal(getCellNode(activeRow, activeCell));
                return false;
            }
        }
        function getCellNode(row, cell) {
            if (rowsCache[row]) {
                ensureCellNodesInRowsCache(row);
                try {
                    if (rowsCache[row].cellNodesByColumnIdx.length > cell) {
                        return rowsCache[row].cellNodesByColumnIdx[cell][0];
                    }
                    else {
                        return null;
                    }
                }
                catch (e) {
                    return rowsCache[row].cellNodesByColumnIdx[cell];
                }
            }
            return null;
        }
        function setActiveCell(row, cell, opt_editMode, preClickModeOn, suppressActiveCellChangedEvent) {
            if (!initialized) {
                return;
            }
            if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
                return;
            }
            if (!options.enableCellNavigation) {
                return;
            }
            scrollCellIntoView(row, cell, false);
            setActiveCellInternal(getCellNode(row, cell), opt_editMode, preClickModeOn, suppressActiveCellChangedEvent);
        }
        function setActiveRow(row, cell, suppressScrollIntoView) {
            if (!initialized) {
                return;
            }
            if (row > getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
                return;
            }
            activeRow = row;
            if (!suppressScrollIntoView) {
                scrollCellIntoView(row, cell || 0, false);
            }
        }
        function canCellBeActive(row, cell) {
            if (!options.enableCellNavigation || row >= getDataLengthIncludingAddNew() ||
                row < 0 || cell >= columns.length || cell < 0) {
                return false;
            }
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            if (rowMetadata && typeof rowMetadata.focusable !== "undefined") {
                return !!rowMetadata.focusable;
            }
            var columnMetadata = rowMetadata && rowMetadata.columns;
            if (columnMetadata && columnMetadata[columns[cell].id] && typeof columnMetadata[columns[cell].id].focusable !== "undefined") {
                return !!columnMetadata[columns[cell].id].focusable;
            }
            if (columnMetadata && columnMetadata[cell] && typeof columnMetadata[cell].focusable !== "undefined") {
                return !!columnMetadata[cell].focusable;
            }
            return !!columns[cell].focusable;
        }
        function canCellBeSelected(row, cell) {
            if (row >= getDataLength() || row < 0 || cell >= columns.length || cell < 0) {
                return false;
            }
            var rowMetadata = data.getItemMetadata && data.getItemMetadata(row);
            if (rowMetadata && typeof rowMetadata.selectable !== "undefined") {
                return !!rowMetadata.selectable;
            }
            var columnMetadata = rowMetadata && rowMetadata.columns && (rowMetadata.columns[columns[cell].id] || rowMetadata.columns[cell]);
            if (columnMetadata && typeof columnMetadata.selectable !== "undefined") {
                return !!columnMetadata.selectable;
            }
            return !!columns[cell].selectable;
        }
        function gotoCell(row, cell, forceEdit, e) {
            if (!initialized) {
                return;
            }
            if (!canCellBeActive(row, cell)) {
                return;
            }
            if (!getEditorLock().commitCurrentEdit()) {
                return;
            }
            scrollCellIntoView(row, cell, false);
            var newCell = getCellNode(row, cell);
            // if selecting the 'add new' row, start editing right away
            var column = columns[cell];
            var suppressActiveCellChangedEvent = !!(options.editable && column && column.editor && options.suppressActiveCellChangeOnEdit);
            setActiveCellInternal(newCell, (forceEdit || (row === getDataLength()) || options.autoEdit), null, suppressActiveCellChangedEvent, e);
            // if no editor was created, set the focus back on the grid
            if (!currentEditor) {
                setFocus();
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // IEditor implementation for the editor lock
        function commitCurrentEdit() {
            var item = getDataItem(activeRow);
            var column = columns[activeCell];
            if (currentEditor) {
                if (currentEditor.isValueChanged()) {
                    var validationResults = currentEditor.validate();
                    if (validationResults.valid) {
                        if (activeRow < getDataLength()) {
                            var editCommand = {
                                row: activeRow,
                                cell: activeCell,
                                editor: currentEditor,
                                serializedValue: currentEditor.serializeValue(),
                                prevSerializedValue: serializedEditorValue,
                                execute: function () {
                                    this.editor.applyValue(item, this.serializedValue);
                                    updateRow(this.row);
                                    trigger(self.onCellChange, {
                                        command: 'execute',
                                        row: this.row,
                                        cell: this.cell,
                                        item: item,
                                        column: column
                                    });
                                },
                                undo: function () {
                                    this.editor.applyValue(item, this.prevSerializedValue);
                                    updateRow(this.row);
                                    trigger(self.onCellChange, {
                                        command: 'undo',
                                        row: this.row,
                                        cell: this.cell,
                                        item: item,
                                        column: column
                                    });
                                }
                            };
                            if (options.editCommandHandler) {
                                makeActiveCellNormal();
                                options.editCommandHandler(item, column, editCommand);
                            }
                            else {
                                editCommand.execute();
                                makeActiveCellNormal();
                            }
                        }
                        else {
                            var newItem = {};
                            currentEditor.applyValue(newItem, currentEditor.serializeValue());
                            makeActiveCellNormal();
                            trigger(self.onAddNewRow, { item: newItem, column: column });
                        }
                        // check whether the lock has been re-acquired by event handlers
                        return !getEditorLock().isActive();
                    }
                    else {
                        // Re-add the CSS class to trigger transitions, if any.
                        $(activeCellNode).removeClass("invalid");
                        $(activeCellNode).width(); // force layout
                        $(activeCellNode).addClass("invalid");
                        trigger(self.onValidationError, {
                            editor: currentEditor,
                            cellNode: activeCellNode,
                            validationResults: validationResults,
                            row: activeRow,
                            cell: activeCell,
                            column: column
                        });
                        currentEditor.focus();
                        return false;
                    }
                }
                makeActiveCellNormal();
            }
            return true;
        }
        function cancelCurrentEdit() {
            makeActiveCellNormal();
            return true;
        }
        function rowsToRanges(rows) {
            var ranges = [];
            var lastCell = columns.length - 1;
            for (var i = 0; i < rows.length; i++) {
                ranges.push(new Slick.Range(rows[i], 0, rows[i], lastCell));
            }
            return ranges;
        }
        function getSelectedRows() {
            if (!selectionModel) {
                throw new Error("SlickGrid Selection model is not set");
            }
            return selectedRows.slice(0);
        }
        function setSelectedRows(rows) {
            if (!selectionModel) {
                throw new Error("SlickGrid Selection model is not set");
            }
            if (self && self.getEditorLock && !self.getEditorLock().isActive()) {
                selectionModel.setSelectedRanges(rowsToRanges(rows));
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Debug
        this.debug = function () {
            var s = "";
            s += ("\n" + "counter_rows_rendered:  " + counter_rows_rendered);
            s += ("\n" + "counter_rows_removed:  " + counter_rows_removed);
            s += ("\n" + "renderedRows:  " + renderedRows);
            s += ("\n" + "numVisibleRows:  " + numVisibleRows);
            s += ("\n" + "maxSupportedCssHeight:  " + maxSupportedCssHeight);
            s += ("\n" + "n(umber of pages):  " + n);
            s += ("\n" + "(current) page:  " + page);
            s += ("\n" + "page height (ph):  " + ph);
            s += ("\n" + "vScrollDir:  " + vScrollDir);
            alert(s);
        };
        // a debug helper to be able to access private members
        this.eval = function (expr) {
            return eval(expr);
        };
        //////////////////////////////////////////////////////////////////////////////////////////////
        // Public API
        $.extend(this, {
            "slickGridVersion": "2.4.41",
            // Events
            "onScroll": new Slick.Event(),
            "onBeforeSort": new Slick.Event(),
            "onSort": new Slick.Event(),
            "onHeaderMouseEnter": new Slick.Event(),
            "onHeaderMouseLeave": new Slick.Event(),
            "onHeaderContextMenu": new Slick.Event(),
            "onHeaderClick": new Slick.Event(),
            "onHeaderCellRendered": new Slick.Event(),
            "onBeforeHeaderCellDestroy": new Slick.Event(),
            "onHeaderRowCellRendered": new Slick.Event(),
            "onFooterRowCellRendered": new Slick.Event(),
            "onFooterContextMenu": new Slick.Event(),
            "onFooterClick": new Slick.Event(),
            "onBeforeHeaderRowCellDestroy": new Slick.Event(),
            "onBeforeFooterRowCellDestroy": new Slick.Event(),
            "onMouseEnter": new Slick.Event(),
            "onMouseLeave": new Slick.Event(),
            "onClick": new Slick.Event(),
            "onDblClick": new Slick.Event(),
            "onContextMenu": new Slick.Event(),
            "onKeyDown": new Slick.Event(),
            "onAddNewRow": new Slick.Event(),
            "onBeforeAppendCell": new Slick.Event(),
            "onValidationError": new Slick.Event(),
            "onViewportChanged": new Slick.Event(),
            "onColumnsReordered": new Slick.Event(),
            "onColumnsDrag": new Slick.Event(),
            "onColumnsResized": new Slick.Event(),
            "onColumnsResizeDblClick": new Slick.Event(),
            "onBeforeColumnsResize": new Slick.Event(),
            "onCellChange": new Slick.Event(),
            "onCompositeEditorChange": new Slick.Event(),
            "onBeforeEditCell": new Slick.Event(),
            "onBeforeCellEditorDestroy": new Slick.Event(),
            "onBeforeDestroy": new Slick.Event(),
            "onActiveCellChanged": new Slick.Event(),
            "onActiveCellPositionChanged": new Slick.Event(),
            "onDragInit": new Slick.Event(),
            "onDragStart": new Slick.Event(),
            "onDrag": new Slick.Event(),
            "onDragEnd": new Slick.Event(),
            "onSelectedRowsChanged": new Slick.Event(),
            "onCellCssStylesChanged": new Slick.Event(),
            "onAutosizeColumns": new Slick.Event(),
            "onBeforeSetColumns": new Slick.Event(),
            "onRendered": new Slick.Event(),
            "onSetOptions": new Slick.Event(),
            // Methods
            "registerPlugin": registerPlugin,
            "unregisterPlugin": unregisterPlugin,
            "getPluginByName": getPluginByName,
            "getColumns": getColumns,
            "setColumns": setColumns,
            "getColumnIndex": getColumnIndex,
            "updateColumnHeader": updateColumnHeader,
            "setSortColumn": setSortColumn,
            "setSortColumns": setSortColumns,
            "getSortColumns": getSortColumns,
            "autosizeColumns": autosizeColumns,
            "autosizeColumn": autosizeColumn,
            "getOptions": getOptions,
            "setOptions": setOptions,
            "getData": getData,
            "getDataLength": getDataLength,
            "getDataItem": getDataItem,
            "setData": setData,
            "getSelectionModel": getSelectionModel,
            "setSelectionModel": setSelectionModel,
            "getSelectedRows": getSelectedRows,
            "setSelectedRows": setSelectedRows,
            "getContainerNode": getContainerNode,
            "updatePagingStatusFromView": updatePagingStatusFromView,
            "applyFormatResultToCellNode": applyFormatResultToCellNode,
            "render": render,
            "reRenderColumns": reRenderColumns,
            "invalidate": invalidate,
            "invalidateRow": invalidateRow,
            "invalidateRows": invalidateRows,
            "invalidateAllRows": invalidateAllRows,
            "updateCell": updateCell,
            "updateRow": updateRow,
            "getViewport": getVisibleRange,
            "getRenderedRange": getRenderedRange,
            "resizeCanvas": resizeCanvas,
            "updateRowCount": updateRowCount,
            "scrollRowIntoView": scrollRowIntoView,
            "scrollRowToTop": scrollRowToTop,
            "scrollCellIntoView": scrollCellIntoView,
            "scrollColumnIntoView": scrollColumnIntoView,
            "getCanvasNode": getCanvasNode,
            "getUID": getUID,
            "getHeaderColumnWidthDiff": getHeaderColumnWidthDiff,
            "getScrollbarDimensions": getScrollbarDimensions,
            "getHeadersWidth": getHeadersWidth,
            "getCanvasWidth": getCanvasWidth,
            "getCanvases": getCanvases,
            "getActiveCanvasNode": getActiveCanvasNode,
            "setActiveCanvasNode": setActiveCanvasNode,
            "getViewportNode": getViewportNode,
            "getViewports": getViewports,
            "getActiveViewportNode": getActiveViewportNode,
            "setActiveViewportNode": setActiveViewportNode,
            "focus": setFocus,
            "scrollTo": scrollTo,
            "cacheCssForHiddenInit": cacheCssForHiddenInit,
            "restoreCssFromHiddenInit": restoreCssFromHiddenInit,
            "getCellFromPoint": getCellFromPoint,
            "getCellFromEvent": getCellFromEvent,
            "getActiveCell": getActiveCell,
            "setActiveCell": setActiveCell,
            "setActiveRow": setActiveRow,
            "getActiveCellNode": getActiveCellNode,
            "getActiveCellPosition": getActiveCellPosition,
            "resetActiveCell": resetActiveCell,
            "editActiveCell": makeActiveCellEditable,
            "getCellEditor": getCellEditor,
            "getCellNode": getCellNode,
            "getCellNodeBox": getCellNodeBox,
            "canCellBeSelected": canCellBeSelected,
            "canCellBeActive": canCellBeActive,
            "navigatePrev": navigatePrev,
            "navigateNext": navigateNext,
            "navigateUp": navigateUp,
            "navigateDown": navigateDown,
            "navigateLeft": navigateLeft,
            "navigateRight": navigateRight,
            "navigatePageUp": navigatePageUp,
            "navigatePageDown": navigatePageDown,
            "navigateTop": navigateTop,
            "navigateBottom": navigateBottom,
            "navigateRowStart": navigateRowStart,
            "navigateRowEnd": navigateRowEnd,
            "gotoCell": gotoCell,
            "getTopPanel": getTopPanel,
            "setTopPanelVisibility": setTopPanelVisibility,
            "getPreHeaderPanel": getPreHeaderPanel,
            "getPreHeaderPanelLeft": getPreHeaderPanel,
            "getPreHeaderPanelRight": getPreHeaderPanelRight,
            "setPreHeaderPanelVisibility": setPreHeaderPanelVisibility,
            "getHeader": getHeader,
            "getHeaderColumn": getHeaderColumn,
            "setHeaderRowVisibility": setHeaderRowVisibility,
            "getHeaderRow": getHeaderRow,
            "getHeaderRowColumn": getHeaderRowColumn,
            "setFooterRowVisibility": setFooterRowVisibility,
            "getFooterRow": getFooterRow,
            "getFooterRowColumn": getFooterRowColumn,
            "getGridPosition": getGridPosition,
            "flashCell": flashCell,
            "addCellCssStyles": addCellCssStyles,
            "setCellCssStyles": setCellCssStyles,
            "removeCellCssStyles": removeCellCssStyles,
            "getCellCssStyles": getCellCssStyles,
            "getFrozenRowOffset": getFrozenRowOffset,
            "setColumnHeaderVisibility": setColumnHeaderVisibility,
            "init": finishInitialization,
            "destroy": destroy,
            // IEditor implementation
            "getEditorLock": getEditorLock,
            "getEditController": getEditController
        });
        init();
    }
    module.exports = {
        Grid: SlickGrid
    };
},
700: /* @bokeh/slickgrid/lib/jquery.event.drag-2.3.0.js */ function _(require, module, exports, __esModule, __esExport) {
    /*!
     * jquery.event.drag - v 2.3.0
     * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
     * Open Source MIT License - http://threedubmedia.com/code/license
     */
    // Created: 2008-06-04
    // Updated: 2012-05-21
    // Updated: 2016-08-16   Luiz Gonzaga dos Santos Filho
    // REQUIRES: jquery 1.8 +, , event.drag 2.3.0
    // TESTED WITH: jQuery 1.8.3, 1.11.2, 2.2.4, and 3.1.0
    var $ = require(693) /* ../slick.jquery */;
    // add the jquery instance method
    $.fn.drag = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "", 
        // figure out the event handler...
        fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        // fix the event type
        if (type.indexOf("drag") !== 0)
            type = "drag" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.on(type, opts, fn) : this.trigger(type);
    };
    // local refs (increase compression)
    var $event = $.event, $special = $event.special, 
    // configure the drag special event
    drag = $special.drag = {
        // these are the default settings
        defaults: {
            which: 1, // mouse button pressed to start drag sequence
            distance: 0, // distance dragged before dragstart
            not: ':input', // selector to suppress dragging on target elements
            handle: null, // selector to match handle target elements
            relative: false, // true to use "position", false to use "offset"
            drop: true, // false to suppress drop events, true or selector to allow
            click: false // false to suppress click events after dragend (no proxy)
        },
        // the key name for stored drag data
        datakey: "dragdata",
        // prevent bubbling for better performance
        noBubble: true,
        // count bound related events
        add: function (obj) {
            // read the interaction data
            var data = $.data(this, drag.datakey), 
            // read any passed options
            opts = obj.data || {};
            // count another realted event
            data.related += 1;
            // extend data options bound with this event
            // don't iterate "opts" in case it is a node
            $.each(drag.defaults, function (key, def) {
                if (opts[key] !== undefined)
                    data[key] = opts[key];
            });
        },
        // forget unbound related events
        remove: function () {
            $.data(this, drag.datakey).related -= 1;
        },
        // configure interaction, capture settings
        setup: function () {
            // check for related events
            if ($.data(this, drag.datakey))
                return;
            // initialize the drag data with copied defaults
            var data = $.extend({ related: 0 }, drag.defaults);
            // store the interaction data
            $.data(this, drag.datakey, data);
            // bind the mousedown event, which starts drag interactions
            $event.add(this, "touchstart mousedown", drag.init, data);
            // prevent image dragging in IE...
            if (this.attachEvent)
                this.attachEvent("ondragstart", drag.dontstart);
        },
        // destroy configured interaction
        teardown: function () {
            var data = $.data(this, drag.datakey) || {};
            // check for related events
            if (data.related)
                return;
            // remove the stored data
            $.removeData(this, drag.datakey);
            // remove the mousedown event
            $event.remove(this, "touchstart mousedown", drag.init);
            // enable text selection
            drag.textselect(true);
            // un-prevent image dragging in IE...
            if (this.detachEvent)
                this.detachEvent("ondragstart", drag.dontstart);
        },
        // initialize the interaction
        init: function (event) {
            // sorry, only one touch at a time
            if (drag.touched)
                return;
            // the drag/drop interaction data
            var dd = event.data, results;
            // check the which directive
            if (event.which != 0 && dd.which > 0 && event.which != dd.which)
                return;
            // check for suppressed selector and/or
            // make sure the target css class starts with "slick" so that we know we are in a Slick Grid
            var targetClass = $(event.target).attr('class') || "";
            if ($(event.target).is(dd.not) || (!targetClass || targetClass.toString().indexOf('slick') === -1))
                return;
            // check for handle selector
            if (dd.handle && !$(event.target).closest(dd.handle, event.currentTarget).length)
                return;
            drag.touched = event.type == 'touchstart' ? this : null;
            dd.propagates = 1;
            dd.mousedown = this;
            dd.interactions = [drag.interaction(this, dd)];
            dd.target = event.target;
            dd.pageX = event.pageX;
            dd.pageY = event.pageY;
            dd.dragging = null;
            // handle draginit event...
            results = drag.hijack(event, "draginit", dd);
            // early cancel
            if (!dd.propagates)
                return;
            // flatten the result set
            results = drag.flatten(results);
            // insert new interaction elements
            if (results && results.length) {
                dd.interactions = [];
                $.each(results, function () {
                    dd.interactions.push(drag.interaction(this, dd));
                });
            }
            // remember how many interactions are propagating
            dd.propagates = dd.interactions.length;
            // locate and init the drop targets
            if (dd.drop !== false && $special.drop)
                $special.drop.handler(event, dd);
            // disable text selection
            drag.textselect(false);
            // bind additional events...
            if (drag.touched)
                $event.add(drag.touched, "touchmove touchend", drag.handler, dd);
            else
                $event.add(document, "mousemove mouseup", drag.handler, dd);
            // helps prevent text selection or scrolling
            if (!drag.touched || dd.live)
                return false;
        },
        // returns an interaction object
        interaction: function (elem, dd) {
            var offset = (elem && elem.ownerDocument)
                ? $(elem)[dd.relative ? "position" : "offset"]() || { top: 0, left: 0 }
                : { top: 0, left: 0 };
            return {
                drag: elem,
                callback: new drag.callback(),
                droppable: [],
                offset: offset
            };
        },
        // handle drag-releatd DOM events
        handler: function (event) {
            // read the data before hijacking anything
            var dd = event.data;
            // handle various events
            switch (event.type) {
                // mousemove, check distance, start dragging
                case !dd.dragging && 'touchmove':
                    event.preventDefault();
                case !dd.dragging && 'mousemove':
                    //  drag tolerance, x² + y² = distance²
                    if (Math.pow(event.pageX - dd.pageX, 2) + Math.pow(event.pageY - dd.pageY, 2) < Math.pow(dd.distance, 2))
                        break; // distance tolerance not reached
                    event.target = dd.target; // force target from "mousedown" event (fix distance issue)
                    drag.hijack(event, "dragstart", dd); // trigger "dragstart"
                    if (dd.propagates) // "dragstart" not rejected
                        dd.dragging = true; // activate interaction
                // mousemove, dragging
                case 'touchmove':
                    event.preventDefault();
                case 'mousemove':
                    if (dd.dragging) {
                        // trigger "drag"
                        drag.hijack(event, "drag", dd);
                        if (dd.propagates) {
                            // manage drop events
                            if (dd.drop !== false && $special.drop)
                                $special.drop.handler(event, dd); // "dropstart", "dropend"
                            break; // "drag" not rejected, stop
                        }
                        event.type = "mouseup"; // helps "drop" handler behave
                    }
                // mouseup, stop dragging
                case 'touchend':
                case 'mouseup':
                default:
                    if (drag.touched)
                        $event.remove(drag.touched, "touchmove touchend", drag.handler); // remove touch events
                    else
                        $event.remove(document, "mousemove mouseup", drag.handler); // remove page events
                    if (dd.dragging) {
                        if (dd.drop !== false && $special.drop)
                            $special.drop.handler(event, dd); // "drop"
                        drag.hijack(event, "dragend", dd); // trigger "dragend"
                    }
                    drag.textselect(true); // enable text selection
                    // if suppressing click events...
                    if (dd.click === false && dd.dragging)
                        $.data(dd.mousedown, "suppress.click", new Date().getTime() + 5);
                    dd.dragging = drag.touched = false; // deactivate element
                    break;
            }
        },
        // re-use event object for custom events
        hijack: function (event, type, dd, x, elem) {
            // not configured
            if (!dd)
                return;
            // remember the original event and type
            var orig = { event: event.originalEvent, type: event.type }, 
            // is the event drag related or drog related?
            mode = type.indexOf("drop") ? "drag" : "drop", 
            // iteration vars
            result, i = x || 0, ia, $elems, callback, len = !isNaN(x) ? x : dd.interactions.length;
            // modify the event type
            event.type = type;
            // protects originalEvent from side-effects
            var noop = function () { };
            event.originalEvent = new $.Event(orig.event, {
                preventDefault: noop,
                stopPropagation: noop,
                stopImmediatePropagation: noop
            });
            // initialize the results
            dd.results = [];
            // handle each interacted element
            do
                if (ia = dd.interactions[i]) {
                    // validate the interaction
                    if (type !== "dragend" && ia.cancelled)
                        continue;
                    // set the dragdrop properties on the event object
                    callback = drag.properties(event, dd, ia);
                    // prepare for more results
                    ia.results = [];
                    // handle each element
                    $(elem || ia[mode] || dd.droppable).each(function (p, subject) {
                        // identify drag or drop targets individually
                        callback.target = subject;
                        // force propagtion of the custom event
                        event.isPropagationStopped = function () { return false; };
                        // handle the event
                        result = subject ? $event.dispatch.call(subject, event, callback) : null;
                        // stop the drag interaction for this element
                        if (result === false) {
                            if (mode == "drag") {
                                ia.cancelled = true;
                                dd.propagates -= 1;
                            }
                            if (type == "drop") {
                                ia[mode][p] = null;
                            }
                        }
                        // assign any dropinit elements
                        else if (type == "dropinit")
                            ia.droppable.push(drag.element(result) || subject);
                        // accept a returned proxy element
                        if (type == "dragstart")
                            ia.proxy = $(drag.element(result) || ia.drag)[0];
                        // remember this result
                        ia.results.push(result);
                        // forget the event result, for recycling
                        delete event.result;
                        // break on cancelled handler
                        if (type !== "dropinit")
                            return result;
                    });
                    // flatten the results
                    dd.results[i] = drag.flatten(ia.results);
                    // accept a set of valid drop targets
                    if (type == "dropinit")
                        ia.droppable = drag.flatten(ia.droppable);
                    // locate drop targets
                    if (type == "dragstart" && !ia.cancelled)
                        callback.update();
                }
            while (++i < len);
            // restore the original event & type
            event.type = orig.type;
            event.originalEvent = orig.event;
            // return all handler results
            return drag.flatten(dd.results);
        },
        // extend the callback object with drag/drop properties...
        properties: function (event, dd, ia) {
            var obj = ia.callback;
            // elements
            obj.drag = ia.drag;
            obj.proxy = ia.proxy || ia.drag;
            // starting mouse position
            obj.startX = dd.pageX;
            obj.startY = dd.pageY;
            // current distance dragged
            obj.deltaX = event.pageX - dd.pageX;
            obj.deltaY = event.pageY - dd.pageY;
            // original element position
            obj.originalX = ia.offset.left;
            obj.originalY = ia.offset.top;
            // adjusted element position
            obj.offsetX = obj.originalX + obj.deltaX;
            obj.offsetY = obj.originalY + obj.deltaY;
            // assign the drop targets information
            obj.drop = drag.flatten((ia.drop || []).slice());
            obj.available = drag.flatten((ia.droppable || []).slice());
            return obj;
        },
        // determine is the argument is an element or jquery instance
        element: function (arg) {
            if (arg && (arg.jquery || arg.nodeType == 1))
                return arg;
        },
        // flatten nested jquery objects and arrays into a single dimension array
        flatten: function (arr) {
            return $.map(arr, function (member) {
                return member && member.jquery ? $.makeArray(member) :
                    member && member.length ? drag.flatten(member) : member;
            });
        },
        // toggles text selection attributes ON (true) or OFF (false)
        textselect: function (bool) {
            $(document)[bool ? "off" : "on"]("selectstart", drag.dontstart)
                .css("MozUserSelect", bool ? "" : "none");
            // .attr("unselectable", bool ? "off" : "on" )
            document.unselectable = bool ? "off" : "on";
        },
        // suppress "selectstart" and "ondragstart" events
        dontstart: function () {
            return false;
        },
        // a callback instance contructor
        callback: function () { }
    };
    // callback methods
    drag.callback.prototype = {
        update: function () {
            if ($special.drop && this.available.length)
                $.each(this.available, function (i) {
                    $special.drop.locate(this, i);
                });
        }
    };
    // patch $.event.$dispatch to allow suppressing clicks
    var $dispatch = $event.dispatch;
    $event.dispatch = function (event) {
        if ($.data(this, "suppress." + event.type) - new Date().getTime() > 0) {
            $.removeData(this, "suppress." + event.type);
            return;
        }
        return $dispatch.apply(this, arguments);
    };
    // share the same special event configuration with related events...
    $special.draginit = $special.dragstart = $special.dragend = drag;
},
701: /* @bokeh/slickgrid/lib/jquery.event.drop-2.3.0.js */ function _(require, module, exports, __esModule, __esExport) {
    /*!
     * jquery.event.drop - v 2.3.0
     * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
     * Open Source MIT License - http://threedubmedia.com/code/license
     */
    // Created: 2008-06-04
    // Updated: 2012-05-21
    // Updated: 2016-08-16   Luiz Gonzaga dos Santos Filho
    // REQUIRES: jquery 1.8 +, , event.drag 2.3.0
    // TESTED WITH: jQuery 1.8.3, 1.11.2, 2.2.4, and 3.1.0
    var $ = require(693) /* ../slick.jquery */;
    // Events: drop, dropstart, dropend
    // add the jquery instance method
    $.fn.drop = function (str, arg, opts) {
        // figure out the event type
        var type = typeof str == "string" ? str : "", 
        // figure out the event handler...
        fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
        // fix the event type
        if (type.indexOf("drop") !== 0)
            type = "drop" + type;
        // were options passed
        opts = (str == fn ? arg : opts) || {};
        // trigger or bind event handler
        return fn ? this.on(type, opts, fn) : this.trigger(type);
    };
    // DROP MANAGEMENT UTILITY
    // returns filtered drop target elements, caches their positions
    $.drop = function (opts) {
        opts = opts || {};
        // safely set new options...
        drop.multi = opts.multi === true ? Infinity :
            opts.multi === false ? 1 : !isNaN(opts.multi) ? opts.multi : drop.multi;
        drop.delay = opts.delay || drop.delay;
        drop.tolerance = $.isFunction(opts.tolerance) ? opts.tolerance :
            opts.tolerance === null ? null : drop.tolerance;
        drop.mode = opts.mode || drop.mode || 'intersect';
    };
    // local refs (increase compression)
    var $event = $.event, $special = $event.special, 
    // configure the drop special event
    drop = $.event.special.drop = {
        // these are the default settings
        multi: 1, // allow multiple drop winners per dragged element
        delay: 20, // async timeout delay
        mode: 'overlap', // drop tolerance mode
        // internal cache
        targets: [],
        // the key name for stored drop data
        datakey: "dropdata",
        // prevent bubbling for better performance
        noBubble: true,
        // count bound related events
        add: function (obj) {
            // read the interaction data
            var data = $.data(this, drop.datakey);
            // count another realted event
            data.related += 1;
        },
        // forget unbound related events
        remove: function () {
            $.data(this, drop.datakey).related -= 1;
        },
        // configure the interactions
        setup: function () {
            // check for related events
            if ($.data(this, drop.datakey))
                return;
            // initialize the drop element data
            var data = {
                related: 0,
                active: [],
                anyactive: 0,
                winner: 0,
                location: {}
            };
            // store the drop data on the element
            $.data(this, drop.datakey, data);
            // store the drop target in internal cache
            drop.targets.push(this);
        },
        // destroy the configure interaction
        teardown: function () {
            var data = $.data(this, drop.datakey) || {};
            // check for related events
            if (data.related)
                return;
            // remove the stored data
            $.removeData(this, drop.datakey);
            // reference the targeted element
            var element = this;
            // remove from the internal cache
            drop.targets = $.grep(drop.targets, function (target) {
                return (target !== element);
            });
        },
        // shared event handler
        handler: function (event, dd) {
            // local vars
            var results, $targets;
            // make sure the right data is available
            if (!dd)
                return;
            // handle various events
            switch (event.type) {
                // draginit, from $.event.special.drag
                case 'mousedown': // DROPINIT >>
                case 'touchstart': // DROPINIT >>
                    // collect and assign the drop targets
                    $targets = $(drop.targets);
                    if (typeof dd.drop == "string")
                        $targets = $targets.filter(dd.drop);
                    // reset drop data winner properties
                    $targets.each(function () {
                        var data = $.data(this, drop.datakey);
                        data.active = [];
                        data.anyactive = 0;
                        data.winner = 0;
                    });
                    // set available target elements
                    dd.droppable = $targets;
                    // activate drop targets for the initial element being dragged
                    $special.drag.hijack(event, "dropinit", dd);
                    break;
                // drag, from $.event.special.drag
                case 'mousemove': // TOLERATE >>
                case 'touchmove': // TOLERATE >>
                    drop.event = event; // store the mousemove event
                    if (!drop.timer)
                        // monitor drop targets
                        drop.tolerate(dd);
                    break;
                // dragend, from $.event.special.drag
                case 'mouseup': // DROP >> DROPEND >>
                case 'touchend': // DROP >> DROPEND >>
                    drop.timer = clearTimeout(drop.timer); // delete timer
                    if (dd.propagates) {
                        $special.drag.hijack(event, "drop", dd);
                        $special.drag.hijack(event, "dropend", dd);
                    }
                    break;
            }
        },
        // returns the location positions of an element
        locate: function (elem, index) {
            var data = $.data(elem, drop.datakey), $elem = $(elem), posi = $elem.length && !$elem.is(document) ? $elem.offset() : {}, height = $elem.outerHeight(), width = $elem.outerWidth(), location = {
                elem: elem,
                width: width,
                height: height,
                top: posi.top,
                left: posi.left,
                right: posi.left + width,
                bottom: posi.top + height
            };
            // drag elements might not have dropdata
            if (data) {
                data.location = location;
                data.index = index;
                data.elem = elem;
            }
            return location;
        },
        // test the location positions of an element against another OR an X,Y coord
        contains: function (target, test) {
            return ((test[0] || test.left) >= target.left && (test[0] || test.right) <= target.right
                && (test[1] || test.top) >= target.top && (test[1] || test.bottom) <= target.bottom);
        },
        // stored tolerance modes
        modes: {
            // target with mouse wins, else target with most overlap wins
            'intersect': function (event, proxy, target) {
                return this.contains(target, [event.pageX, event.pageY]) ? // check cursor
                    1e9 : this.modes.overlap.apply(this, arguments); // check overlap
            },
            // target with most overlap wins
            'overlap': function (event, proxy, target) {
                // calculate the area of overlap...
                return Math.max(0, Math.min(target.bottom, proxy.bottom) - Math.max(target.top, proxy.top))
                    * Math.max(0, Math.min(target.right, proxy.right) - Math.max(target.left, proxy.left));
            },
            // proxy is completely contained within target bounds
            'fit': function (event, proxy, target) {
                return this.contains(target, proxy) ? 1 : 0;
            },
            // center of the proxy is contained within target bounds
            'middle': function (event, proxy, target) {
                return this.contains(target, [proxy.left + proxy.width * .5, proxy.top + proxy.height * .5]) ? 1 : 0;
            }
        },
        // sort drop target cache by by winner (dsc), then index (asc)
        sort: function (a, b) {
            return (b.winner - a.winner) || (a.index - b.index);
        },
        // async, recursive tolerance execution
        tolerate: function (dd) {
            // declare local refs
            var i, drp, drg, data, arr, len, elem, 
            // interaction iteration variables
            x = 0, ia, end = dd.interactions.length, 
            // determine the mouse coords
            xy = [drop.event.pageX, drop.event.pageY], 
            // custom or stored tolerance fn
            tolerance = drop.tolerance || drop.modes[drop.mode];
            // go through each passed interaction...
            do
                if (ia = dd.interactions[x]) {
                    // check valid interaction
                    if (!ia)
                        return;
                    // initialize or clear the drop data
                    ia.drop = [];
                    // holds the drop elements
                    arr = [];
                    len = ia.droppable.length;
                    // determine the proxy location, if needed
                    if (tolerance)
                        drg = drop.locate(ia.proxy);
                    // reset the loop
                    i = 0;
                    // loop each stored drop target
                    do
                        if (elem = ia.droppable[i]) {
                            data = $.data(elem, drop.datakey);
                            drp = data.location;
                            if (!drp)
                                continue;
                            // find a winner: tolerance function is defined, call it
                            data.winner = tolerance ? tolerance.call(drop, drop.event, drg, drp)
                                // mouse position is always the fallback
                                : drop.contains(drp, xy) ? 1 : 0;
                            arr.push(data);
                        }
                    while (++i < len); // loop
                    // sort the drop targets
                    arr.sort(drop.sort);
                    // reset the loop
                    i = 0;
                    // loop through all of the targets again
                    do
                        if (data = arr[i]) {
                            // winners...
                            if (data.winner && ia.drop.length < drop.multi) {
                                // new winner... dropstart
                                if (!data.active[x] && !data.anyactive) {
                                    // check to make sure that this is not prevented
                                    if ($special.drag.hijack(drop.event, "dropstart", dd, x, data.elem)[0] !== false) {
                                        data.active[x] = 1;
                                        data.anyactive += 1;
                                    }
                                    // if false, it is not a winner
                                    else
                                        data.winner = 0;
                                }
                                // if it is still a winner
                                if (data.winner)
                                    ia.drop.push(data.elem);
                            }
                            // losers...
                            else if (data.active[x] && data.anyactive == 1) {
                                // former winner... dropend
                                $special.drag.hijack(drop.event, "dropend", dd, x, data.elem);
                                data.active[x] = 0;
                                data.anyactive -= 1;
                            }
                        }
                    while (++i < len); // loop
                }
            while (++x < end); // loop
            // check if the mouse is still moving or is idle
            if (drop.last && xy[0] == drop.last.pageX && xy[1] == drop.last.pageY)
                delete drop.timer; // idle, don't recurse
            else // recurse
                drop.timer = setTimeout(function () {
                    drop.tolerate(dd);
                }, drop.delay);
            // remember event, to compare idleness
            drop.last = drop.event;
        }
    };
    // share the same special event configuration with related events...
    $special.dropinit = $special.dropstart = $special.dropend = drop;
},
702: /* @bokeh/slickgrid/slick.dataview.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ./slick.jquery */;
    var Slick = require(695) /* ./slick.core */;
    /***
     * A sample Model implementation.
     * Provides a filtered view of the underlying data.
     *
     * Relies on the data item having an "id" property uniquely identifying it.
     */
    function DataView(options) {
        var self = this;
        var defaults = {
            groupItemMetadataProvider: null,
            inlineFilters: false
        };
        // private
        var idProperty = "id"; // property holding a unique row id
        var items = []; // data by index
        var rows = []; // data by row
        var idxById = new Slick.Map(); // indexes by id
        var rowsById = null; // rows by id; lazy-calculated
        var filter = null; // filter function
        var updated = null; // updated item ids
        var suspend = false; // suspends the recalculation
        var isBulkSuspend = false; // delays various operations like the
        // index update and delete to efficient
        // versions at endUpdate
        var bulkDeleteIds = new Slick.Map();
        var sortAsc = true;
        var fastSortField;
        var sortComparer;
        var refreshHints = {};
        var prevRefreshHints = {};
        var filterArgs;
        var filteredItems = [];
        var compiledFilter;
        var compiledFilterWithCaching;
        var filterCache = [];
        var _grid = null;
        // grouping
        var groupingInfoDefaults = {
            getter: null,
            formatter: null,
            comparer: function (a, b) {
                return (a.value === b.value ? 0 :
                    (a.value > b.value ? 1 : -1));
            },
            predefinedValues: [],
            aggregators: [],
            aggregateEmpty: false,
            aggregateCollapsed: false,
            aggregateChildGroups: false,
            collapsed: false,
            displayTotalsRow: true,
            lazyTotalsCalculation: false
        };
        var groupingInfos = [];
        var groups = [];
        var toggledGroupsByLevel = [];
        var groupingDelimiter = ':|:';
        var selectedRowIds = null;
        var pagesize = 0;
        var pagenum = 0;
        var totalRows = 0;
        // events
        var onSetItemsCalled = new Slick.Event();
        var onRowCountChanged = new Slick.Event();
        var onRowsChanged = new Slick.Event();
        var onRowsOrCountChanged = new Slick.Event();
        var onBeforePagingInfoChanged = new Slick.Event();
        var onPagingInfoChanged = new Slick.Event();
        var onGroupExpanded = new Slick.Event();
        var onGroupCollapsed = new Slick.Event();
        options = $.extend(true, {}, defaults, options);
        /***
         * Begins a bached update of the items in the data view.
         * @param bulkUpdate {Boolean} if set to true, most data view modifications
         * including deletes and the related events are postponed to the endUpdate call.
         * As certain operations are postponed during this update, some methods might not
         * deliver fully consistent information.
         */
        function beginUpdate(bulkUpdate) {
            suspend = true;
            isBulkSuspend = bulkUpdate === true;
        }
        function endUpdate() {
            var wasBulkSuspend = isBulkSuspend;
            isBulkSuspend = false;
            suspend = false;
            if (wasBulkSuspend) {
                processBulkDelete();
                ensureIdUniqueness();
            }
            refresh();
        }
        function destroy() {
            items = [];
            idxById = null;
            rowsById = null;
            filter = null;
            updated = null;
            sortComparer = null;
            filterCache = [];
            filteredItems = [];
            compiledFilter = null;
            compiledFilterWithCaching = null;
            if (_grid && _grid.onSelectedRowsChanged && _grid.onCellCssStylesChanged) {
                _grid.onSelectedRowsChanged.unsubscribe();
                _grid.onCellCssStylesChanged.unsubscribe();
            }
            if (self.onRowsOrCountChanged) {
                self.onRowsOrCountChanged.unsubscribe();
            }
        }
        function setRefreshHints(hints) {
            refreshHints = hints;
        }
        function setFilterArgs(args) {
            filterArgs = args;
        }
        /***
         * Processes all delete requests placed during bulk update
         * by recomputing the items and idxById members.
         */
        function processBulkDelete() {
            // the bulk update is processed by
            // recomputing the whole items array and the index lookup in one go.
            // this is done by placing the not-deleted items
            // from left to right into the array and shrink the array the the new
            // size afterwards.
            // see https://github.com/6pac/SlickGrid/issues/571 for further details.
            var id, item, newIdx = 0;
            for (var i = 0, l = items.length; i < l; i++) {
                item = items[i];
                id = item[idProperty];
                if (id === undefined) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
                // if items have been marked as deleted we skip them for the new final items array
                // and we remove them from the lookup table.
                if (bulkDeleteIds.has(id)) {
                    idxById.delete(id);
                }
                else {
                    // for items which are not deleted, we add them to the
                    // next free position in the array and register the index in the lookup.
                    items[newIdx] = item;
                    idxById.set(id, newIdx);
                    ++newIdx;
                }
            }
            // here we shrink down the full item array to the ones actually
            // inserted in the cleanup loop above.
            items.length = newIdx;
            // and finally cleanup the deleted ids to start cleanly on the next update.
            bulkDeleteIds = new Slick.Map();
        }
        function updateIdxById(startingIndex) {
            if (isBulkSuspend) { // during bulk update we do not reorganize
                return;
            }
            startingIndex = startingIndex || 0;
            var id;
            for (var i = startingIndex, l = items.length; i < l; i++) {
                id = items[i][idProperty];
                if (id === undefined) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
                idxById.set(id, i);
            }
        }
        function ensureIdUniqueness() {
            if (isBulkSuspend) { // during bulk update we do not reorganize
                return;
            }
            var id;
            for (var i = 0, l = items.length; i < l; i++) {
                id = items[i][idProperty];
                if (id === undefined || idxById.get(id) !== i) {
                    throw new Error("[SlickGrid DataView] Each data element must implement a unique 'id' property");
                }
            }
        }
        function getItems() {
            return items;
        }
        function getIdPropertyName() {
            return idProperty;
        }
        function setItems(data, objectIdProperty) {
            if (objectIdProperty !== undefined) {
                idProperty = objectIdProperty;
            }
            items = filteredItems = data;
            onSetItemsCalled.notify({ idProperty: objectIdProperty, itemCount: items.length }, null, self);
            idxById = new Slick.Map();
            updateIdxById();
            ensureIdUniqueness();
            refresh();
        }
        function setPagingOptions(args) {
            if (onBeforePagingInfoChanged.notify(getPagingInfo(), null, self) !== false) {
                if (args.pageSize != undefined) {
                    pagesize = args.pageSize;
                    pagenum = pagesize ? Math.min(pagenum, Math.max(0, Math.ceil(totalRows / pagesize) - 1)) : 0;
                }
                if (args.pageNum != undefined) {
                    pagenum = Math.min(args.pageNum, Math.max(0, Math.ceil(totalRows / pagesize) - 1));
                }
                onPagingInfoChanged.notify(getPagingInfo(), null, self);
                refresh();
            }
        }
        function getPagingInfo() {
            var totalPages = pagesize ? Math.max(1, Math.ceil(totalRows / pagesize)) : 1;
            return { pageSize: pagesize, pageNum: pagenum, totalRows: totalRows, totalPages: totalPages, dataView: self };
        }
        function sort(comparer, ascending) {
            sortAsc = ascending;
            sortComparer = comparer;
            fastSortField = null;
            if (ascending === false) {
                items.reverse();
            }
            items.sort(comparer);
            if (ascending === false) {
                items.reverse();
            }
            idxById = new Slick.Map();
            updateIdxById();
            refresh();
        }
        /***
         * Provides a workaround for the extremely slow sorting in IE.
         * Does a [lexicographic] sort on a give column by temporarily overriding Object.prototype.toString
         * to return the value of that field and then doing a native Array.sort().
         */
        function fastSort(field, ascending) {
            sortAsc = ascending;
            fastSortField = field;
            sortComparer = null;
            var oldToString = Object.prototype.toString;
            Object.prototype.toString = (typeof field == "function") ? field : function () {
                return this[field];
            };
            // an extra reversal for descending sort keeps the sort stable
            // (assuming a stable native sort implementation, which isn't true in some cases)
            if (ascending === false) {
                items.reverse();
            }
            items.sort();
            Object.prototype.toString = oldToString;
            if (ascending === false) {
                items.reverse();
            }
            idxById = new Slick.Map();
            updateIdxById();
            refresh();
        }
        function reSort() {
            if (sortComparer) {
                sort(sortComparer, sortAsc);
            }
            else if (fastSortField) {
                fastSort(fastSortField, sortAsc);
            }
        }
        function getFilteredItems() {
            return filteredItems;
        }
        function getFilteredItemCount() {
            return filteredItems.length;
        }
        function getFilter() {
            return filter;
        }
        function setFilter(filterFn) {
            filter = filterFn;
            if (options.inlineFilters) {
                compiledFilter = compileFilter();
                compiledFilterWithCaching = compileFilterWithCaching();
            }
            refresh();
        }
        function getGrouping() {
            return groupingInfos;
        }
        function setGrouping(groupingInfo) {
            if (!options.groupItemMetadataProvider) {
                options.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
            }
            groups = [];
            toggledGroupsByLevel = [];
            groupingInfo = groupingInfo || [];
            groupingInfos = (groupingInfo instanceof Array) ? groupingInfo : [groupingInfo];
            for (var i = 0; i < groupingInfos.length; i++) {
                var gi = groupingInfos[i] = $.extend(true, {}, groupingInfoDefaults, groupingInfos[i]);
                gi.getterIsAFn = typeof gi.getter === "function";
                // pre-compile accumulator loops
                gi.compiledAccumulators = [];
                var idx = gi.aggregators.length;
                while (idx--) {
                    gi.compiledAccumulators[idx] = compileAccumulatorLoop(gi.aggregators[idx]);
                }
                toggledGroupsByLevel[i] = {};
            }
            refresh();
        }
        /**
         * @deprecated Please use {@link setGrouping}.
         */
        function groupBy(valueGetter, valueFormatter, sortComparer) {
            if (valueGetter == null) {
                setGrouping([]);
                return;
            }
            setGrouping({
                getter: valueGetter,
                formatter: valueFormatter,
                comparer: sortComparer
            });
        }
        /**
         * @deprecated Please use {@link setGrouping}.
         */
        function setAggregators(groupAggregators, includeCollapsed) {
            if (!groupingInfos.length) {
                throw new Error("[SlickGrid DataView] At least one grouping must be specified before calling setAggregators().");
            }
            groupingInfos[0].aggregators = groupAggregators;
            groupingInfos[0].aggregateCollapsed = includeCollapsed;
            setGrouping(groupingInfos);
        }
        function getItemByIdx(i) {
            return items[i];
        }
        function getIdxById(id) {
            return idxById.get(id);
        }
        function ensureRowsByIdCache() {
            if (!rowsById) {
                rowsById = {};
                for (var i = 0, l = rows.length; i < l; i++) {
                    rowsById[rows[i][idProperty]] = i;
                }
            }
        }
        function getRowByItem(item) {
            ensureRowsByIdCache();
            return rowsById[item[idProperty]];
        }
        function getRowById(id) {
            ensureRowsByIdCache();
            return rowsById[id];
        }
        function getItemById(id) {
            return items[idxById.get(id)];
        }
        function mapItemsToRows(itemArray) {
            var rows = [];
            ensureRowsByIdCache();
            for (var i = 0, l = itemArray.length; i < l; i++) {
                var row = rowsById[itemArray[i][idProperty]];
                if (row != null) {
                    rows[rows.length] = row;
                }
            }
            return rows;
        }
        function mapIdsToRows(idArray) {
            var rows = [];
            ensureRowsByIdCache();
            for (var i = 0, l = idArray.length; i < l; i++) {
                var row = rowsById[idArray[i]];
                if (row != null) {
                    rows[rows.length] = row;
                }
            }
            return rows;
        }
        function mapRowsToIds(rowArray) {
            var ids = [];
            for (var i = 0, l = rowArray.length; i < l; i++) {
                if (rowArray[i] < rows.length) {
                    ids[ids.length] = rows[rowArray[i]][idProperty];
                }
            }
            return ids;
        }
        /***
         * Performs the update operations of a single item by id without
         * triggering any events or refresh operations.
         * @param id The new id of the item.
         * @param item The item which should be the new value for the given id.
         */
        function updateSingleItem(id, item) {
            // see also https://github.com/mleibman/SlickGrid/issues/1082
            if (!idxById.has(id)) {
                throw new Error("[SlickGrid DataView] Invalid id");
            }
            // What if the specified item also has an updated idProperty?
            // Then we'll have to update the index as well, and possibly the `updated` cache too.
            if (id !== item[idProperty]) {
                // make sure the new id is unique:
                var newId = item[idProperty];
                if (newId == null) {
                    throw new Error("[SlickGrid DataView] Cannot update item to associate with a null id");
                }
                if (idxById.has(newId)) {
                    throw new Error("[SlickGrid DataView] Cannot update item to associate with a non-unique id");
                }
                idxById.set(newId, idxById.get(id));
                idxById.delete(id);
                // Also update the `updated` hashtable/markercache? Yes, `recalc()` inside `refresh()` needs that one!
                if (updated && updated[id]) {
                    delete updated[id];
                }
                // Also update the row indexes? no need since the `refresh()`, further down, blows away the `rowsById[]` cache!
                id = newId;
            }
            items[idxById.get(id)] = item;
            // Also update the rows? no need since the `refresh()`, further down, blows away the `rows[]` cache and recalculates it via `recalc()`!
            if (!updated) {
                updated = {};
            }
            updated[id] = true;
        }
        /***
         * Updates a single item in the data view given the id and new value.
         * @param id The new id of the item.
         * @param item The item which should be the new value for the given id.
         */
        function updateItem(id, item) {
            updateSingleItem(id, item);
            refresh();
        }
        /***
         * Updates multiple items in the data view given the new ids and new values.
         * @param id {Array} The array of new ids which is in the same order as the items.
         * @param newItems {Array} The new items that should be set in the data view for the given ids.
         */
        function updateItems(ids, newItems) {
            if (ids.length !== newItems.length) {
                throw new Error("[SlickGrid DataView] Mismatch on the length of ids and items provided to update");
            }
            for (var i = 0, l = newItems.length; i < l; i++) {
                updateSingleItem(ids[i], newItems[i]);
            }
            refresh();
        }
        /***
         * Inserts a single item into the data view at the given position.
         * @param insertBefore {Number} The 0-based index before which the item should be inserted.
         * @param item The item to insert.
         */
        function insertItem(insertBefore, item) {
            items.splice(insertBefore, 0, item);
            updateIdxById(insertBefore);
            refresh();
        }
        /***
         * Inserts multiple items into the data view at the given position.
         * @param insertBefore {Number} The 0-based index before which the items should be inserted.
         * @param newItems {Array}  The items to insert.
         */
        function insertItems(insertBefore, newItems) {
            Array.prototype.splice.apply(items, [insertBefore, 0].concat(newItems));
            updateIdxById(insertBefore);
            refresh();
        }
        /***
         * Adds a single item at the end of the data view.
         * @param item The item to add at the end.
         */
        function addItem(item) {
            items.push(item);
            updateIdxById(items.length - 1);
            refresh();
        }
        /***
         * Adds multiple items at the end of the data view.
         * @param newItems {Array} The items to add at the end.
         */
        function addItems(newItems) {
            items = items.concat(newItems);
            updateIdxById(items.length - newItems.length);
            refresh();
        }
        /***
         * Deletes a single item identified by the given id from the data view.
         * @param id The id identifying the object to delete.
         */
        function deleteItem(id) {
            if (isBulkSuspend) {
                bulkDeleteIds.set(id, true);
            }
            else {
                var idx = idxById.get(id);
                if (idx === undefined) {
                    throw new Error("[SlickGrid DataView] Invalid id");
                }
                idxById.delete(id);
                items.splice(idx, 1);
                updateIdxById(idx);
                refresh();
            }
        }
        /***
         * Deletes multiple item identified by the given ids from the data view.
         * @param ids {Array} The ids of the items to delete.
         */
        function deleteItems(ids) {
            if (ids.length === 0) {
                return;
            }
            if (isBulkSuspend) {
                for (var i = 0, l = ids.length; i < l; i++) {
                    var id = ids[i];
                    var idx = idxById.get(id);
                    if (idx === undefined) {
                        throw new Error("[SlickGrid DataView] Invalid id");
                    }
                    bulkDeleteIds.set(id, true);
                }
            }
            else {
                // collect all indexes
                var indexesToDelete = [];
                for (var i = 0, l = ids.length; i < l; i++) {
                    var id = ids[i];
                    var idx = idxById.get(id);
                    if (idx === undefined) {
                        throw new Error("[SlickGrid DataView] Invalid id");
                    }
                    idxById.delete(id);
                    indexesToDelete.push(idx);
                }
                // Remove from back to front
                indexesToDelete.sort();
                for (var i = indexesToDelete.length - 1; i >= 0; --i) {
                    items.splice(indexesToDelete[i], 1);
                }
                // update lookup from front to back
                updateIdxById(indexesToDelete[0]);
                refresh();
            }
        }
        function sortedAddItem(item) {
            if (!sortComparer) {
                throw new Error("[SlickGrid DataView] sortedAddItem() requires a sort comparer, use sort()");
            }
            insertItem(sortedIndex(item), item);
        }
        function sortedUpdateItem(id, item) {
            if (!idxById.has(id) || id !== item[idProperty]) {
                throw new Error("[SlickGrid DataView] Invalid or non-matching id " + idxById.get(id));
            }
            if (!sortComparer) {
                throw new Error("[SlickGrid DataView] sortedUpdateItem() requires a sort comparer, use sort()");
            }
            var oldItem = getItemById(id);
            if (sortComparer(oldItem, item) !== 0) {
                // item affects sorting -> must use sorted add
                deleteItem(id);
                sortedAddItem(item);
            }
            else { // update does not affect sorting -> regular update works fine
                updateItem(id, item);
            }
        }
        function sortedIndex(searchItem) {
            var low = 0, high = items.length;
            while (low < high) {
                var mid = low + high >>> 1;
                if (sortComparer(items[mid], searchItem) === -1) {
                    low = mid + 1;
                }
                else {
                    high = mid;
                }
            }
            return low;
        }
        function getItemCount() {
            return items.length;
        }
        function getLength() {
            return rows.length;
        }
        function getItem(i) {
            var item = rows[i];
            // if this is a group row, make sure totals are calculated and update the title
            if (item && item.__group && item.totals && !item.totals.initialized) {
                var gi = groupingInfos[item.level];
                if (!gi.displayTotalsRow) {
                    calculateTotals(item.totals);
                    item.title = gi.formatter ? gi.formatter(item) : item.value;
                }
            }
            // if this is a totals row, make sure it's calculated
            else if (item && item.__groupTotals && !item.initialized) {
                calculateTotals(item);
            }
            return item;
        }
        function getItemMetadata(i) {
            var item = rows[i];
            if (item === undefined) {
                return null;
            }
            // overrides for grouping rows
            if (item.__group) {
                return options.groupItemMetadataProvider.getGroupRowMetadata(item);
            }
            // overrides for totals rows
            if (item.__groupTotals) {
                return options.groupItemMetadataProvider.getTotalsRowMetadata(item);
            }
            return null;
        }
        function expandCollapseAllGroups(level, collapse) {
            if (level == null) {
                for (var i = 0; i < groupingInfos.length; i++) {
                    toggledGroupsByLevel[i] = {};
                    groupingInfos[i].collapsed = collapse;
                    if (collapse === true) {
                        onGroupCollapsed.notify({ level: i, groupingKey: null });
                    }
                    else {
                        onGroupExpanded.notify({ level: i, groupingKey: null });
                    }
                }
            }
            else {
                toggledGroupsByLevel[level] = {};
                groupingInfos[level].collapsed = collapse;
                if (collapse === true) {
                    onGroupCollapsed.notify({ level: level, groupingKey: null });
                }
                else {
                    onGroupExpanded.notify({ level: level, groupingKey: null });
                }
            }
            refresh();
        }
        /**
         * @param level {Number} Optional level to collapse.  If not specified, applies to all levels.
         */
        function collapseAllGroups(level) {
            expandCollapseAllGroups(level, true);
        }
        /**
         * @param level {Number} Optional level to expand.  If not specified, applies to all levels.
         */
        function expandAllGroups(level) {
            expandCollapseAllGroups(level, false);
        }
        function expandCollapseGroup(level, groupingKey, collapse) {
            toggledGroupsByLevel[level][groupingKey] = groupingInfos[level].collapsed ^ collapse;
            refresh();
        }
        /**
         * @param varArgs Either a Slick.Group's "groupingKey" property, or a
         *     variable argument list of grouping values denoting a unique path to the row.  For
         *     example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of
         *     the 'high' group.
         */
        function collapseGroup(varArgs) {
            var args = Array.prototype.slice.call(arguments);
            var arg0 = args[0];
            var groupingKey;
            var level;
            if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
                groupingKey = arg0;
                level = arg0.split(groupingDelimiter).length - 1;
            }
            else {
                groupingKey = args.join(groupingDelimiter);
                level = args.length - 1;
            }
            expandCollapseGroup(level, groupingKey, true);
            onGroupCollapsed.notify({ level: level, groupingKey: groupingKey });
        }
        /**
         * @param varArgs Either a Slick.Group's "groupingKey" property, or a
         *     variable argument list of grouping values denoting a unique path to the row.  For
         *     example, calling expandGroup('high', '10%') will expand the '10%' subgroup of
         *     the 'high' group.
         */
        function expandGroup(varArgs) {
            var args = Array.prototype.slice.call(arguments);
            var arg0 = args[0];
            var groupingKey;
            var level;
            if (args.length === 1 && arg0.indexOf(groupingDelimiter) !== -1) {
                level = arg0.split(groupingDelimiter).length - 1;
                groupingKey = arg0;
            }
            else {
                level = args.length - 1;
                groupingKey = args.join(groupingDelimiter);
            }
            expandCollapseGroup(level, groupingKey, false);
            onGroupExpanded.notify({ level: level, groupingKey: groupingKey });
        }
        function getGroups() {
            return groups;
        }
        function extractGroups(rows, parentGroup) {
            var group;
            var val;
            var groups = [];
            var groupsByVal = {};
            var r;
            var level = parentGroup ? parentGroup.level + 1 : 0;
            var gi = groupingInfos[level];
            for (var i = 0, l = gi.predefinedValues.length; i < l; i++) {
                val = gi.predefinedValues[i];
                group = groupsByVal[val];
                if (!group) {
                    group = new Slick.Group();
                    group.value = val;
                    group.level = level;
                    group.groupingKey = (parentGroup ? parentGroup.groupingKey + groupingDelimiter : '') + val;
                    groups[groups.length] = group;
                    groupsByVal[val] = group;
                }
            }
            for (var i = 0, l = rows.length; i < l; i++) {
                r = rows[i];
                val = gi.getterIsAFn ? gi.getter(r) : r[gi.getter];
                group = groupsByVal[val];
                if (!group) {
                    group = new Slick.Group();
                    group.value = val;
                    group.level = level;
                    group.groupingKey = (parentGroup ? parentGroup.groupingKey + groupingDelimiter : '') + val;
                    groups[groups.length] = group;
                    groupsByVal[val] = group;
                }
                group.rows[group.count++] = r;
            }
            if (level < groupingInfos.length - 1) {
                for (var i = 0; i < groups.length; i++) {
                    group = groups[i];
                    group.groups = extractGroups(group.rows, group);
                }
            }
            if (groups.length) {
                addTotals(groups, level);
            }
            groups.sort(groupingInfos[level].comparer);
            return groups;
        }
        function calculateTotals(totals) {
            var group = totals.group;
            var gi = groupingInfos[group.level];
            var isLeafLevel = (group.level == groupingInfos.length);
            var agg, idx = gi.aggregators.length;
            if (!isLeafLevel && gi.aggregateChildGroups) {
                // make sure all the subgroups are calculated
                var i = group.groups.length;
                while (i--) {
                    if (!group.groups[i].totals.initialized) {
                        calculateTotals(group.groups[i].totals);
                    }
                }
            }
            while (idx--) {
                agg = gi.aggregators[idx];
                agg.init();
                if (!isLeafLevel && gi.aggregateChildGroups) {
                    gi.compiledAccumulators[idx].call(agg, group.groups);
                }
                else {
                    gi.compiledAccumulators[idx].call(agg, group.rows);
                }
                agg.storeResult(totals);
            }
            totals.initialized = true;
        }
        function addGroupTotals(group) {
            var gi = groupingInfos[group.level];
            var totals = new Slick.GroupTotals();
            totals.group = group;
            group.totals = totals;
            if (!gi.lazyTotalsCalculation) {
                calculateTotals(totals);
            }
        }
        function addTotals(groups, level) {
            level = level || 0;
            var gi = groupingInfos[level];
            var groupCollapsed = gi.collapsed;
            var toggledGroups = toggledGroupsByLevel[level];
            var idx = groups.length, g;
            while (idx--) {
                g = groups[idx];
                if (g.collapsed && !gi.aggregateCollapsed) {
                    continue;
                }
                // Do a depth-first aggregation so that parent group aggregators can access subgroup totals.
                if (g.groups) {
                    addTotals(g.groups, level + 1);
                }
                if (gi.aggregators.length && (gi.aggregateEmpty || g.rows.length || (g.groups && g.groups.length))) {
                    addGroupTotals(g);
                }
                g.collapsed = groupCollapsed ^ toggledGroups[g.groupingKey];
                g.title = gi.formatter ? gi.formatter(g) : g.value;
            }
        }
        function flattenGroupedRows(groups, level) {
            level = level || 0;
            var gi = groupingInfos[level];
            var groupedRows = [], rows, gl = 0, g;
            for (var i = 0, l = groups.length; i < l; i++) {
                g = groups[i];
                groupedRows[gl++] = g;
                if (!g.collapsed) {
                    rows = g.groups ? flattenGroupedRows(g.groups, level + 1) : g.rows;
                    for (var j = 0, jj = rows.length; j < jj; j++) {
                        groupedRows[gl++] = rows[j];
                    }
                }
                if (g.totals && gi.displayTotalsRow && (!g.collapsed || gi.aggregateCollapsed)) {
                    groupedRows[gl++] = g.totals;
                }
            }
            return groupedRows;
        }
        function getFunctionInfo(fn) {
            var fnStr = fn.toString();
            var usingEs5 = fnStr.indexOf('function') >= 0; // with ES6, the word function is not present
            var fnRegex = usingEs5 ? /^function[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/ : /^[^(]*\(([^)]*)\)\s*{([\s\S]*)}$/;
            var matches = fn.toString().match(fnRegex);
            return {
                params: matches[1].split(","),
                body: matches[2]
            };
        }
        function compileAccumulatorLoop(aggregator) {
            if (aggregator.accumulate) {
                var accumulatorInfo = getFunctionInfo(aggregator.accumulate);
                var fn = new Function("_items", "for (var " + accumulatorInfo.params[0] + ", _i=0, _il=_items.length; _i<_il; _i++) {" +
                    accumulatorInfo.params[0] + " = _items[_i]; " +
                    accumulatorInfo.body +
                    "}");
                var fnName = "compiledAccumulatorLoop";
                fn.displayName = fnName;
                fn.name = setFunctionName(fn, fnName);
                return fn;
            }
            else {
                return function noAccumulator() {
                };
            }
        }
        function compileFilter() {
            var filterInfo = getFunctionInfo(filter);
            var filterPath1 = "{ continue _coreloop; }$1";
            var filterPath2 = "{ _retval[_idx++] = $item$; continue _coreloop; }$1";
            // make some allowances for minification - there's only so far we can go with RegEx
            var filterBody = filterInfo.body
                .replace(/return false\s*([;}]|\}|$)/gi, filterPath1)
                .replace(/return!1([;}]|\}|$)/gi, filterPath1)
                .replace(/return true\s*([;}]|\}|$)/gi, filterPath2)
                .replace(/return!0([;}]|\}|$)/gi, filterPath2)
                .replace(/return ([^;}]+?)\s*([;}]|$)/gi, "{ if ($1) { _retval[_idx++] = $item$; }; continue _coreloop; }$2");
            // This preserves the function template code after JS compression,
            // so that replace() commands still work as expected.
            var tpl = [
                //"function(_items, _args) { ",
                "var _retval = [], _idx = 0; ",
                "var $item$, $args$ = _args; ",
                "_coreloop: ",
                "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
                "$item$ = _items[_i]; ",
                "$filter$; ",
                "} ",
                "return _retval; "
                //"}"
            ].join("");
            tpl = tpl.replace(/\$filter\$/gi, filterBody);
            tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
            tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);
            var fn = new Function("_items,_args", tpl);
            var fnName = "compiledFilter";
            fn.displayName = fnName;
            fn.name = setFunctionName(fn, fnName);
            return fn;
        }
        function compileFilterWithCaching() {
            var filterInfo = getFunctionInfo(filter);
            var filterPath1 = "{ continue _coreloop; }$1";
            var filterPath2 = "{ _cache[_i] = true;_retval[_idx++] = $item$; continue _coreloop; }$1";
            // make some allowances for minification - there's only so far we can go with RegEx
            var filterBody = filterInfo.body
                .replace(/return false\s*([;}]|\}|$)/gi, filterPath1)
                .replace(/return!1([;}]|\}|$)/gi, filterPath1)
                .replace(/return true\s*([;}]|\}|$)/gi, filterPath2)
                .replace(/return!0([;}]|\}|$)/gi, filterPath2)
                .replace(/return ([^;}]+?)\s*([;}]|$)/gi, "{ if ((_cache[_i] = $1)) { _retval[_idx++] = $item$; }; continue _coreloop; }$2");
            // This preserves the function template code after JS compression,
            // so that replace() commands still work as expected.
            var tpl = [
                //"function(_items, _args, _cache) { ",
                "var _retval = [], _idx = 0; ",
                "var $item$, $args$ = _args; ",
                "_coreloop: ",
                "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
                "$item$ = _items[_i]; ",
                "if (_cache[_i]) { ",
                "_retval[_idx++] = $item$; ",
                "continue _coreloop; ",
                "} ",
                "$filter$; ",
                "} ",
                "return _retval; "
                //"}"
            ].join("");
            tpl = tpl.replace(/\$filter\$/gi, filterBody);
            tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
            tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);
            var fn = new Function("_items,_args,_cache", tpl);
            var fnName = "compiledFilterWithCaching";
            fn.displayName = fnName;
            fn.name = setFunctionName(fn, fnName);
            return fn;
        }
        /**
         * In ES5 we could set the function name on the fly but in ES6 this is forbidden and we need to set it through differently
         * We can use Object.defineProperty and set it the property to writable, see MDN for reference
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
         * @param {string} fn
         * @param {string} fnName
         */
        function setFunctionName(fn, fnName) {
            try {
                Object.defineProperty(fn, 'name', {
                    writable: true,
                    value: fnName
                });
            }
            catch (err) {
                fn.name = fnName;
            }
        }
        function uncompiledFilter(items, args) {
            var retval = [], idx = 0;
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (filter(items[i], args)) {
                    retval[idx++] = items[i];
                }
            }
            return retval;
        }
        function uncompiledFilterWithCaching(items, args, cache) {
            var retval = [], idx = 0, item;
            for (var i = 0, ii = items.length; i < ii; i++) {
                item = items[i];
                if (cache[i]) {
                    retval[idx++] = item;
                }
                else if (filter(item, args)) {
                    retval[idx++] = item;
                    cache[i] = true;
                }
            }
            return retval;
        }
        function getFilteredAndPagedItems(items) {
            if (filter) {
                var batchFilter = options.inlineFilters ? compiledFilter : uncompiledFilter;
                var batchFilterWithCaching = options.inlineFilters ? compiledFilterWithCaching : uncompiledFilterWithCaching;
                if (refreshHints.isFilterNarrowing) {
                    filteredItems = batchFilter(filteredItems, filterArgs);
                }
                else if (refreshHints.isFilterExpanding) {
                    filteredItems = batchFilterWithCaching(items, filterArgs, filterCache);
                }
                else if (!refreshHints.isFilterUnchanged) {
                    filteredItems = batchFilter(items, filterArgs);
                }
            }
            else {
                // special case:  if not filtering and not paging, the resulting
                // rows collection needs to be a copy so that changes due to sort
                // can be caught
                filteredItems = pagesize ? items : items.concat();
            }
            // get the current page
            var paged;
            if (pagesize) {
                if (filteredItems.length <= pagenum * pagesize) {
                    if (filteredItems.length === 0) {
                        pagenum = 0;
                    }
                    else {
                        pagenum = Math.floor((filteredItems.length - 1) / pagesize);
                    }
                }
                paged = filteredItems.slice(pagesize * pagenum, pagesize * pagenum + pagesize);
            }
            else {
                paged = filteredItems;
            }
            return { totalRows: filteredItems.length, rows: paged };
        }
        function getRowDiffs(rows, newRows) {
            var item, r, eitherIsNonData, diff = [];
            var from = 0, to = Math.max(newRows.length, rows.length);
            if (refreshHints && refreshHints.ignoreDiffsBefore) {
                from = Math.max(0, Math.min(newRows.length, refreshHints.ignoreDiffsBefore));
            }
            if (refreshHints && refreshHints.ignoreDiffsAfter) {
                to = Math.min(newRows.length, Math.max(0, refreshHints.ignoreDiffsAfter));
            }
            for (var i = from, rl = rows.length; i < to; i++) {
                if (i >= rl) {
                    diff[diff.length] = i;
                }
                else {
                    item = newRows[i];
                    r = rows[i];
                    if (!item || (groupingInfos.length && (eitherIsNonData = (item.__nonDataRow) || (r.__nonDataRow)) &&
                        item.__group !== r.__group ||
                        item.__group && !item.equals(r))
                        || (eitherIsNonData &&
                            // no good way to compare totals since they are arbitrary DTOs
                            // deep object comparison is pretty expensive
                            // always considering them 'dirty' seems easier for the time being
                            (item.__groupTotals || r.__groupTotals))
                        || item[idProperty] != r[idProperty]
                        || (updated && updated[item[idProperty]])) {
                        diff[diff.length] = i;
                    }
                }
            }
            return diff;
        }
        function recalc(_items) {
            rowsById = null;
            if (refreshHints.isFilterNarrowing != prevRefreshHints.isFilterNarrowing ||
                refreshHints.isFilterExpanding != prevRefreshHints.isFilterExpanding) {
                filterCache = [];
            }
            var filteredItems = getFilteredAndPagedItems(_items);
            totalRows = filteredItems.totalRows;
            var newRows = filteredItems.rows;
            groups = [];
            if (groupingInfos.length) {
                groups = extractGroups(newRows);
                if (groups.length) {
                    newRows = flattenGroupedRows(groups);
                }
            }
            var diff = getRowDiffs(rows, newRows);
            rows = newRows;
            return diff;
        }
        function refresh() {
            if (suspend) {
                return;
            }
            var previousPagingInfo = $.extend(true, {}, getPagingInfo());
            var countBefore = rows.length;
            var totalRowsBefore = totalRows;
            var diff = recalc(items, filter); // pass as direct refs to avoid closure perf hit
            // if the current page is no longer valid, go to last page and recalc
            // we suffer a performance penalty here, but the main loop (recalc) remains highly optimized
            if (pagesize && totalRows < pagenum * pagesize) {
                pagenum = Math.max(0, Math.ceil(totalRows / pagesize) - 1);
                diff = recalc(items, filter);
            }
            updated = null;
            prevRefreshHints = refreshHints;
            refreshHints = {};
            if (totalRowsBefore !== totalRows) {
                // use the previously saved paging info
                if (onBeforePagingInfoChanged.notify(previousPagingInfo, null, self) !== false) {
                    onPagingInfoChanged.notify(getPagingInfo(), null, self);
                }
            }
            if (countBefore !== rows.length) {
                onRowCountChanged.notify({ previous: countBefore, current: rows.length, itemCount: items.length, dataView: self, callingOnRowsChanged: (diff.length > 0) }, null, self);
            }
            if (diff.length > 0) {
                onRowsChanged.notify({ rows: diff, itemCount: items.length, dataView: self, calledOnRowCountChanged: (countBefore !== rows.length) }, null, self);
            }
            if (countBefore !== rows.length || diff.length > 0) {
                onRowsOrCountChanged.notify({
                    rowsDiff: diff, previousRowCount: countBefore, currentRowCount: rows.length, itemCount: items.length,
                    rowCountChanged: countBefore !== rows.length, rowsChanged: diff.length > 0, dataView: self
                }, null, self);
            }
        }
        /***
         * Wires the grid and the DataView together to keep row selection tied to item ids.
         * This is useful since, without it, the grid only knows about rows, so if the items
         * move around, the same rows stay selected instead of the selection moving along
         * with the items.
         *
         * NOTE:  This doesn't work with cell selection model.
         *
         * @param grid {Slick.Grid} The grid to sync selection with.
         * @param preserveHidden {Boolean} Whether to keep selected items that go out of the
         *     view due to them getting filtered out.
         * @param preserveHiddenOnSelectionChange {Boolean} Whether to keep selected items
         *     that are currently out of the view (see preserveHidden) as selected when selection
         *     changes.
         * @return {Slick.Event} An event that notifies when an internal list of selected row ids
         *     changes.  This is useful since, in combination with the above two options, it allows
         *     access to the full list selected row ids, and not just the ones visible to the grid.
         * @method syncGridSelection
         */
        function syncGridSelection(grid, preserveHidden, preserveHiddenOnSelectionChange) {
            var self = this;
            _grid = grid;
            var inHandler;
            selectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
            var onSelectedRowIdsChanged = new Slick.Event();
            function setSelectedRowIds(rowIds) {
                if (selectedRowIds.join(",") == rowIds.join(",")) {
                    return;
                }
                selectedRowIds = rowIds;
                onSelectedRowIdsChanged.notify({
                    "grid": grid,
                    "ids": selectedRowIds,
                    "dataView": self
                }, new Slick.EventData(), self);
            }
            function update() {
                if (selectedRowIds.length > 0) {
                    inHandler = true;
                    var selectedRows = self.mapIdsToRows(selectedRowIds);
                    if (!preserveHidden) {
                        setSelectedRowIds(self.mapRowsToIds(selectedRows));
                    }
                    grid.setSelectedRows(selectedRows);
                    inHandler = false;
                }
            }
            grid.onSelectedRowsChanged.subscribe(function (e, args) {
                if (inHandler) {
                    return;
                }
                var newSelectedRowIds = self.mapRowsToIds(grid.getSelectedRows());
                if (!preserveHiddenOnSelectionChange || !grid.getOptions().multiSelect) {
                    setSelectedRowIds(newSelectedRowIds);
                }
                else {
                    // keep the ones that are hidden
                    var existing = $.grep(selectedRowIds, function (id) { return self.getRowById(id) === undefined; });
                    // add the newly selected ones
                    setSelectedRowIds(existing.concat(newSelectedRowIds));
                }
            });
            this.onRowsOrCountChanged.subscribe(update);
            return onSelectedRowIdsChanged;
        }
        /** Get all selected IDs */
        function getAllSelectedIds() {
            return selectedRowIds;
        }
        /** Get all selected dataContext items */
        function getAllSelectedItems() {
            var selectedData = [];
            var selectedIds = getAllSelectedIds();
            selectedIds.forEach(function (id) {
                selectedData.push(self.getItemById(id));
            });
            return selectedData;
        }
        function syncGridCellCssStyles(grid, key) {
            var hashById;
            var inHandler;
            // since this method can be called after the cell styles have been set,
            // get the existing ones right away
            storeCellCssStyles(grid.getCellCssStyles(key));
            function storeCellCssStyles(hash) {
                hashById = {};
                for (var row in hash) {
                    var id = rows[row][idProperty];
                    hashById[id] = hash[row];
                }
            }
            function update() {
                if (hashById) {
                    inHandler = true;
                    ensureRowsByIdCache();
                    var newHash = {};
                    for (var id in hashById) {
                        var row = rowsById[id];
                        if (row != undefined) {
                            newHash[row] = hashById[id];
                        }
                    }
                    grid.setCellCssStyles(key, newHash);
                    inHandler = false;
                }
            }
            grid.onCellCssStylesChanged.subscribe(function (e, args) {
                if (inHandler) {
                    return;
                }
                if (key != args.key) {
                    return;
                }
                if (args.hash) {
                    storeCellCssStyles(args.hash);
                }
                else {
                    grid.onCellCssStylesChanged.unsubscribe();
                    self.onRowsOrCountChanged.unsubscribe(update);
                }
            });
            this.onRowsOrCountChanged.subscribe(update);
        }
        $.extend(this, {
            // methods
            "beginUpdate": beginUpdate,
            "endUpdate": endUpdate,
            "destroy": destroy,
            "setPagingOptions": setPagingOptions,
            "getPagingInfo": getPagingInfo,
            "getIdPropertyName": getIdPropertyName,
            "getItems": getItems,
            "setItems": setItems,
            "setFilter": setFilter,
            "getFilter": getFilter,
            "getFilteredItems": getFilteredItems,
            "getFilteredItemCount": getFilteredItemCount,
            "sort": sort,
            "fastSort": fastSort,
            "reSort": reSort,
            "setGrouping": setGrouping,
            "getGrouping": getGrouping,
            "groupBy": groupBy,
            "setAggregators": setAggregators,
            "collapseAllGroups": collapseAllGroups,
            "expandAllGroups": expandAllGroups,
            "collapseGroup": collapseGroup,
            "expandGroup": expandGroup,
            "getGroups": getGroups,
            "getAllSelectedIds": getAllSelectedIds,
            "getAllSelectedItems": getAllSelectedItems,
            "getIdxById": getIdxById,
            "getRowByItem": getRowByItem,
            "getRowById": getRowById,
            "getItemById": getItemById,
            "getItemByIdx": getItemByIdx,
            "mapItemsToRows": mapItemsToRows,
            "mapRowsToIds": mapRowsToIds,
            "mapIdsToRows": mapIdsToRows,
            "setRefreshHints": setRefreshHints,
            "setFilterArgs": setFilterArgs,
            "refresh": refresh,
            "updateItem": updateItem,
            "updateItems": updateItems,
            "insertItem": insertItem,
            "insertItems": insertItems,
            "addItem": addItem,
            "addItems": addItems,
            "deleteItem": deleteItem,
            "deleteItems": deleteItems,
            "sortedAddItem": sortedAddItem,
            "sortedUpdateItem": sortedUpdateItem,
            "syncGridSelection": syncGridSelection,
            "syncGridCellCssStyles": syncGridCellCssStyles,
            // data provider methods
            "getItemCount": getItemCount,
            "getLength": getLength,
            "getItem": getItem,
            "getItemMetadata": getItemMetadata,
            // events
            "onSetItemsCalled": onSetItemsCalled,
            "onRowCountChanged": onRowCountChanged,
            "onRowsChanged": onRowsChanged,
            "onRowsOrCountChanged": onRowsOrCountChanged,
            "onBeforePagingInfoChanged": onBeforePagingInfoChanged,
            "onPagingInfoChanged": onPagingInfoChanged,
            "onGroupExpanded": onGroupExpanded,
            "onGroupCollapsed": onGroupCollapsed,
        });
    }
    function AvgAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.count_ = 0;
            this.nonNullCount_ = 0;
            this.sum_ = 0;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            this.count_++;
            if (val != null && val !== "" && !isNaN(val)) {
                this.nonNullCount_++;
                this.sum_ += parseFloat(val);
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.avg) {
                groupTotals.avg = {};
            }
            if (this.nonNullCount_ !== 0) {
                groupTotals.avg[this.field_] = this.sum_ / this.nonNullCount_;
            }
        };
    }
    function MinAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.min_ = null;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            if (val != null && val !== "" && !isNaN(val)) {
                if (this.min_ == null || val < this.min_) {
                    this.min_ = val;
                }
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.min) {
                groupTotals.min = {};
            }
            groupTotals.min[this.field_] = this.min_;
        };
    }
    function MaxAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.max_ = null;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            if (val != null && val !== "" && !isNaN(val)) {
                if (this.max_ == null || val > this.max_) {
                    this.max_ = val;
                }
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.max) {
                groupTotals.max = {};
            }
            groupTotals.max[this.field_] = this.max_;
        };
    }
    function SumAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.sum_ = null;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            if (val != null && val !== "" && !isNaN(val)) {
                this.sum_ += parseFloat(val);
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.sum) {
                groupTotals.sum = {};
            }
            groupTotals.sum[this.field_] = this.sum_;
        };
    }
    function CountAggregator(field) {
        this.field_ = field;
        this.init = function () {
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.count) {
                groupTotals.count = {};
            }
            groupTotals.count[this.field_] = groupTotals.group.rows.length;
        };
    }
    // TODO:  add more built-in aggregators
    // TODO:  merge common aggregators in one to prevent needles iterating
    var Aggregators = {
        Avg: AvgAggregator,
        Min: MinAggregator,
        Max: MaxAggregator,
        Sum: SumAggregator,
        Count: CountAggregator,
    };
    module.exports = {
        DataView: DataView,
        Aggregators: Aggregators,
        Data: { Aggregators: Aggregators },
    };
},
703: /* @bokeh/slickgrid/slick.editors.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ./slick.jquery */;
    var Slick = require(695) /* ./slick.core */;
    /***
     * Contains basic SlickGrid editors.
     * @module Editors
     * @namespace Slick
     */
    function TextEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            $input = $("<INPUT type=text class='editor-text' />")
                .appendTo(args.container)
                .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
                .focus()
                .select();
            // don't show Save/Cancel when it's a Composite Editor and also trigger a onCompositeEditorChange event when input changes
            if (args.compositeEditorOptions) {
                $input.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $input.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.getValue = function () {
            return $input.val();
        };
        this.setValue = function (val) {
            $input.val(val);
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field] || "";
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            return $input.val();
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    function IntegerEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            $input = $("<INPUT type=text class='editor-text' />")
                .appendTo(args.container)
                .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
                .focus()
                .select();
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
            if (args.compositeEditorOptions) {
                $input.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $input.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid integer"
                };
            }
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    function FloatEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            $input = $("<INPUT type=text class='editor-text' />")
                .appendTo(args.container)
                .on("keydown.nav", navOnLR ? handleKeydownLRNav : handleKeydownLRNoNav)
                .focus()
                .select();
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
            if (args.compositeEditorOptions) {
                $input.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $input.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        function getDecimalPlaces() {
            // returns the number of fixed decimal places or null
            var rtn = args.column.editorFixedDecimalPlaces;
            if (typeof rtn == 'undefined') {
                rtn = FloatEditor.DefaultDecimalPlaces;
            }
            return (!rtn && rtn !== 0 ? null : rtn);
        }
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (defaultValue || defaultValue === 0)
                && defaultValue.toFixed) {
                defaultValue = defaultValue.toFixed(decPlaces);
            }
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            var rtn = parseFloat($input.val());
            if (FloatEditor.AllowEmptyValue) {
                if (!rtn && rtn !== 0) {
                    rtn = '';
                }
            }
            else {
                rtn = rtn || 0;
            }
            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (rtn || rtn === 0)
                && rtn.toFixed) {
                rtn = parseFloat(rtn.toFixed(decPlaces));
            }
            return rtn;
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid number"
                };
            }
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    FloatEditor.DefaultDecimalPlaces = null;
    FloatEditor.AllowEmptyValue = false;
    function DateEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;
        this.args = args;
        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");
            $input.appendTo(args.container);
            $input.focus().select();
            $input.datepicker({
                showOn: "button",
                buttonImageOnly: true,
                beforeShow: function () {
                    calendarOpen = true;
                },
                onClose: function () {
                    calendarOpen = false;
                    // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
                    if (args.compositeEditorOptions) {
                        var activeCell = args.grid.getActiveCell();
                        // when valid, we'll also apply the new value to the dataContext item object
                        if (scope.validate().valid) {
                            scope.applyValue(scope.args.item, scope.serializeValue());
                        }
                        scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                        args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                    }
                }
            });
            $input.width($input.width() - (!args.compositeEditorOptions ? 18 : 28));
        };
        this.destroy = function () {
            $.datepicker.dpDiv.stop(true, true);
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };
        this.show = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).show();
            }
        };
        this.hide = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).hide();
            }
        };
        this.position = function (position) {
            if (!calendarOpen) {
                return;
            }
            $.datepicker.dpDiv
                .css("top", position.top + 30)
                .css("left", position.left);
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };
        this.serializeValue = function () {
            return $input.val();
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    function YesNoSelectEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
            $select.appendTo(args.container);
            $select.focus();
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
            if (args.compositeEditorOptions) {
                $select.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $select.remove();
        };
        this.focus = function () {
            $select.focus();
        };
        this.loadValue = function (item) {
            $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
            $select.select();
        };
        this.serializeValue = function () {
            return ($select.val() == "yes");
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };
        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    function CheckboxEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
            $select.appendTo(args.container);
            $select.focus();
            // trigger onCompositeEditorChange event when input checkbox changes and it's a Composite Editor
            if (args.compositeEditorOptions) {
                $select.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
        };
        this.destroy = function () {
            $select.remove();
        };
        this.focus = function () {
            $select.focus();
        };
        this.loadValue = function (item) {
            defaultValue = !!item[args.column.field];
            if (defaultValue) {
                $select.prop('checked', true);
            }
            else {
                $select.prop('checked', false);
            }
        };
        this.preClick = function () {
            $select.prop('checked', !$select.prop('checked'));
        };
        this.serializeValue = function () {
            return $select.prop('checked');
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (this.serializeValue() !== defaultValue);
        };
        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    function PercentCompleteEditor(args) {
        var $input, $picker;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            $input = $("<INPUT type=text class='editor-percentcomplete' />");
            $input.width($(args.container).innerWidth() - 25);
            $input.appendTo(args.container);
            $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
            $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");
            $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");
            $input.focus().select();
            $picker.find(".editor-percentcomplete-slider").slider({
                orientation: "vertical",
                range: "min",
                value: defaultValue,
                slide: function (event, ui) {
                    $input.val(ui.value);
                },
                stop: function (event, ui) {
                    // trigger onCompositeEditorChange event when slider stops and it's a Composite Editor
                    if (args.compositeEditorOptions) {
                        var activeCell = args.grid.getActiveCell();
                        // when valid, we'll also apply the new value to the dataContext item object
                        if (scope.validate().valid) {
                            scope.applyValue(scope.args.item, scope.serializeValue());
                        }
                        scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                        args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                    }
                }
            });
            $picker.find(".editor-percentcomplete-buttons button").on("click", function (e) {
                $input.val($(this).attr("val"));
                $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
            });
        };
        this.destroy = function () {
            $input.remove();
            $picker.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };
        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
        };
        this.validate = function () {
            if (isNaN(parseInt($input.val(), 10))) {
                return {
                    valid: false,
                    msg: "Please enter a valid positive number"
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    /*
     * An example of a "detached" editor.
     * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    function LongTextEditor(args) {
        var $input, $wrapper;
        var defaultValue;
        var scope = this;
        this.args = args;
        this.init = function () {
            var compositeEditorOptions = args.compositeEditorOptions;
            var navOnLR = args.grid.getOptions().editorCellNavOnLRKeys;
            var $container = compositeEditorOptions ? args.container : $('body');
            $wrapper = $("<DIV class='slick-large-editor-text' style='z-index:10000;background:white;padding:5px;border:3px solid gray; border-radius:10px;'/>")
                .appendTo($container);
            if (compositeEditorOptions) {
                $wrapper.css({ position: 'relative', padding: 0, border: 0 });
            }
            else {
                $wrapper.css({ position: 'absolute' });
            }
            $input = $("<TEXTAREA hidefocus rows=5 style='background:white;width:250px;height:80px;border:0;outline:0'>")
                .appendTo($wrapper);
            // trigger onCompositeEditorChange event when input changes and it's a Composite Editor
            if (compositeEditorOptions) {
                $input.on("change", function () {
                    var activeCell = args.grid.getActiveCell();
                    // when valid, we'll also apply the new value to the dataContext item object
                    if (scope.validate().valid) {
                        scope.applyValue(scope.args.item, scope.serializeValue());
                    }
                    scope.applyValue(scope.args.compositeEditorOptions.formValues, scope.serializeValue());
                    args.grid.onCompositeEditorChange.notify({ row: activeCell.row, cell: activeCell.cell, item: scope.args.item, column: scope.args.column, formValues: scope.args.compositeEditorOptions.formValues });
                });
            }
            else {
                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);
                $wrapper.find("button:first").on("click", this.save);
                $wrapper.find("button:last").on("click", this.cancel);
                $input.on("keydown", this.handleKeyDown);
                scope.position(args.position);
            }
            $input.focus().select();
        };
        this.handleKeyDown = function (e) {
            if (e.which == Slick.keyCode.ENTER && e.ctrlKey) {
                scope.save();
            }
            else if (e.which == Slick.keyCode.ESCAPE) {
                e.preventDefault();
                scope.cancel();
            }
            else if (e.which == Slick.keyCode.TAB && e.shiftKey) {
                e.preventDefault();
                args.grid.navigatePrev();
            }
            else if (e.which == Slick.keyCode.TAB) {
                e.preventDefault();
                args.grid.navigateNext();
            }
            else if (e.which == Slick.keyCode.LEFT || e.which == Slick.keyCode.RIGHT) {
                if (args.grid.getOptions().editorCellNavOnLRKeys) {
                    var cursorPosition = this.selectionStart;
                    var textLength = this.value.length;
                    if (e.keyCode === Slick.keyCode.LEFT && cursorPosition === 0) {
                        args.grid.navigatePrev();
                    }
                    if (e.keyCode === Slick.keyCode.RIGHT && cursorPosition >= textLength - 1) {
                        args.grid.navigateNext();
                    }
                }
            }
        };
        this.save = function () {
            args.commitChanges();
        };
        this.cancel = function () {
            $input.val(defaultValue);
            args.cancelChanges();
        };
        this.hide = function () {
            $wrapper.hide();
        };
        this.show = function () {
            $wrapper.show();
        };
        this.position = function (position) {
            $wrapper
                .css("top", position.top - 5)
                .css("left", position.left - 5);
        };
        this.destroy = function () {
            $wrapper.remove();
        };
        this.focus = function () {
            $input.focus();
        };
        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };
        this.serializeValue = function () {
            return $input.val();
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() === "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val(), args);
                if (!validationResults.valid) {
                    return validationResults;
                }
            }
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }
    /*
     * Depending on the value of Grid option 'editorCellNavOnLRKeys', us
     * Navigate to the cell on the left if the cursor is at the beginning of the input string
     * and to the right cell if it's at the end. Otherwise, move the cursor within the text
     */
    function handleKeydownLRNav(e) {
        var cursorPosition = this.selectionStart;
        var textLength = this.value.length;
        if ((e.keyCode === Slick.keyCode.LEFT && cursorPosition > 0) ||
            e.keyCode === Slick.keyCode.RIGHT && cursorPosition < textLength - 1) {
            e.stopImmediatePropagation();
        }
    }
    function handleKeydownLRNoNav(e) {
        if (e.keyCode === Slick.keyCode.LEFT || e.keyCode === Slick.keyCode.RIGHT) {
            e.stopImmediatePropagation();
        }
    }
    module.exports = {
        Editors: {
            Text: TextEditor,
            Integer: IntegerEditor,
            Float: FloatEditor,
            Date: DateEditor,
            YesNoSelect: YesNoSelectEditor,
            Checkbox: CheckboxEditor,
            PercentComplete: PercentCompleteEditor,
            LongText: LongTextEditor
        }
    };
},
704: /* @bokeh/slickgrid/slick.formatters.js */ function _(require, module, exports, __esModule, __esExport) {
    var Slick = require(695) /* ./slick.core */;
    /***
     * Contains basic SlickGrid formatters.
     *
     * NOTE:  These are merely examples.  You will most likely need to implement something more
     *        robust/extensible/localizable/etc. for your use!
     *
     * @module Formatters
     * @namespace Slick
     */
    function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "-";
        }
        else if (value < 50) {
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        }
        else {
            return "<span style='color:green'>" + value + "%</span>";
        }
    }
    function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }
        var color;
        if (value < 30) {
            color = "red";
        }
        else if (value < 70) {
            color = "silver";
        }
        else {
            color = "green";
        }
        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }
    function YesNoFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    }
    function CheckboxFormatter(row, cell, value, columnDef, dataContext) {
        return '<img class="slick-edit-preclick" src="../images/' + (value ? "CheckboxY" : "CheckboxN") + '.png">';
    }
    function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "<img src='../images/tick.png'>" : "";
    }
    module.exports = {
        Formatters: {
            PercentComplete: PercentCompleteFormatter,
            PercentCompleteBar: PercentCompleteBarFormatter,
            YesNo: YesNoFormatter,
            Checkmark: CheckmarkFormatter,
            Checkbox: CheckboxFormatter
        }
    };
},
705: /* @bokeh/slickgrid/slick.remotemodel.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ./slick.jquery */;
    var Slick = require(695) /* ./slick.core */;
    /***
     * A sample AJAX data store implementation.
     * Right now, it's hooked up to load search results from Octopart, but can
     * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
     */
    function RemoteModel() {
        // private
        var PAGESIZE = 50;
        var data = { length: 0 };
        var searchstr = "";
        var sortcol = null;
        var sortdir = 1;
        var h_request = null;
        var req = null; // ajax request
        // events
        var onDataLoading = new Slick.Event();
        var onDataLoaded = new Slick.Event();
        function init() {
        }
        function isDataLoaded(from, to) {
            for (var i = from; i <= to; i++) {
                if (data[i] == undefined || data[i] == null) {
                    return false;
                }
            }
            return true;
        }
        function clear() {
            for (var key in data) {
                delete data[key];
            }
            data.length = 0;
        }
        function ensureData(from, to) {
            if (req) {
                req.abort();
                for (var i = req.fromPage; i <= req.toPage; i++)
                    data[i * PAGESIZE] = undefined;
            }
            if (from < 0) {
                from = 0;
            }
            if (data.length > 0) {
                to = Math.min(to, data.length - 1);
            }
            var fromPage = Math.floor(from / PAGESIZE);
            var toPage = Math.floor(to / PAGESIZE);
            while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
                fromPage++;
            while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
                toPage--;
            if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
                // TODO:  look-ahead
                onDataLoaded.notify({ from: from, to: to });
                return;
            }
            var url = "http://octopart.com/api/v3/parts/search?apikey=68b25f31&include[]=short_description&show[]=uid&show[]=manufacturer&show[]=mpn&show[]=brand&show[]=octopart_url&show[]=short_description&q=" + searchstr + "&start=" + (fromPage * PAGESIZE) + "&limit=" + (((toPage - fromPage) * PAGESIZE) + PAGESIZE);
            if (sortcol != null) {
                url += ("&sortby=" + sortcol + ((sortdir > 0) ? "+asc" : "+desc"));
            }
            if (h_request != null) {
                clearTimeout(h_request);
            }
            h_request = setTimeout(function () {
                for (var i = fromPage; i <= toPage; i++)
                    data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'
                onDataLoading.notify({ from: from, to: to });
                req = $.jsonp({
                    url: url,
                    callbackParameter: "callback",
                    cache: true,
                    success: onSuccess,
                    error: function () {
                        onError(fromPage, toPage);
                    }
                });
                req.fromPage = fromPage;
                req.toPage = toPage;
            }, 50);
        }
        function onError(fromPage, toPage) {
            alert("error loading pages " + fromPage + " to " + toPage);
        }
        function onSuccess(resp) {
            var from = resp.request.start, to = from + resp.results.length;
            data.length = Math.min(parseInt(resp.hits), 1000); // limitation of the API
            for (var i = 0; i < resp.results.length; i++) {
                var item = resp.results[i].item;
                data[from + i] = item;
                data[from + i].index = from + i;
            }
            req = null;
            onDataLoaded.notify({ from: from, to: to });
        }
        function reloadData(from, to) {
            for (var i = from; i <= to; i++)
                delete data[i];
            ensureData(from, to);
        }
        function setSort(column, dir) {
            sortcol = column;
            sortdir = dir;
            clear();
        }
        function setSearch(str) {
            searchstr = str;
            clear();
        }
        init();
        return {
            // properties
            "data": data,
            // methods
            "clear": clear,
            "isDataLoaded": isDataLoaded,
            "ensureData": ensureData,
            "reloadData": reloadData,
            "setSort": setSort,
            "setSearch": setSearch,
            // events
            "onDataLoading": onDataLoading,
            "onDataLoaded": onDataLoaded
        };
    }
    module.exports = {
        RemoteModel: RemoteModel
    };
},
706: /* @bokeh/slickgrid/slick.groupitemmetadataprovider.js */ function _(require, module, exports, __esModule, __esExport) {
    var $ = require(693) /* ./slick.jquery */;
    var Slick = require(695) /* ./slick.core */;
    /***
     * Provides item metadata for group (Slick.Group) and totals (Slick.Totals) rows produced by the DataView.
     * This metadata overrides the default behavior and formatting of those rows so that they appear and function
     * correctly when processed by the grid.
     *
     * This class also acts as a grid plugin providing event handlers to expand & collapse groups.
     * If "grid.registerPlugin(...)" is not called, expand & collapse will not work.
     *
     * @class GroupItemMetadataProvider
     * @module Data
     * @namespace Slick.Data
     * @constructor
     * @param inputOptions
     */
    function GroupItemMetadataProvider(inputOptions) {
        var _grid;
        var _defaults = {
            checkboxSelect: false,
            checkboxSelectCssClass: "slick-group-select-checkbox",
            checkboxSelectPlugin: null,
            groupCssClass: "slick-group",
            groupTitleCssClass: "slick-group-title",
            totalsCssClass: "slick-group-totals",
            groupFocusable: true,
            totalsFocusable: false,
            toggleCssClass: "slick-group-toggle",
            toggleExpandedCssClass: "expanded",
            toggleCollapsedCssClass: "collapsed",
            enableExpandCollapse: true,
            groupFormatter: defaultGroupCellFormatter,
            totalsFormatter: defaultTotalsCellFormatter,
            includeHeaderTotals: false
        };
        var options = $.extend(true, {}, _defaults, inputOptions);
        function getOptions() {
            return options;
        }
        function setOptions(inputOptions) {
            $.extend(true, options, inputOptions);
        }
        function defaultGroupCellFormatter(row, cell, value, columnDef, item, grid) {
            if (!options.enableExpandCollapse) {
                return item.title;
            }
            var indentation = item.level * 15 + "px";
            return (options.checkboxSelect ? '<span class="' + options.checkboxSelectCssClass +
                ' ' + (item.selectChecked ? 'checked' : 'unchecked') + '"></span>' : '') +
                "<span class='" + options.toggleCssClass + " " +
                (item.collapsed ? options.toggleCollapsedCssClass : options.toggleExpandedCssClass) +
                "' style='margin-left:" + indentation + "'>" +
                "</span>" +
                "<span class='" + options.groupTitleCssClass + "' level='" + item.level + "'>" +
                item.title +
                "</span>";
        }
        function defaultTotalsCellFormatter(row, cell, value, columnDef, item, grid) {
            return (columnDef.groupTotalsFormatter && columnDef.groupTotalsFormatter(item, columnDef, grid)) || "";
        }
        function init(grid) {
            _grid = grid;
            _grid.onClick.subscribe(handleGridClick);
            _grid.onKeyDown.subscribe(handleGridKeyDown);
        }
        function destroy() {
            if (_grid) {
                _grid.onClick.unsubscribe(handleGridClick);
                _grid.onKeyDown.unsubscribe(handleGridKeyDown);
            }
        }
        function handleGridClick(e, args) {
            var $target = $(e.target);
            var item = this.getDataItem(args.row);
            if (item && item instanceof Slick.Group && $target.hasClass(options.toggleCssClass)) {
                var range = _grid.getRenderedRange();
                this.getData().setRefreshHints({
                    ignoreDiffsBefore: range.top,
                    ignoreDiffsAfter: range.bottom + 1
                });
                if (item.collapsed) {
                    this.getData().expandGroup(item.groupingKey);
                }
                else {
                    this.getData().collapseGroup(item.groupingKey);
                }
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            if (item && item instanceof Slick.Group && $target.hasClass(options.checkboxSelectCssClass)) {
                item.selectChecked = !item.selectChecked;
                $target.removeClass((item.selectChecked ? "unchecked" : "checked"));
                $target.addClass((item.selectChecked ? "checked" : "unchecked"));
                // get rowIndexes array
                var rowIndexes = _grid.getData().mapItemsToRows(item.rows);
                (item.selectChecked ? options.checkboxSelectPlugin.selectRows : options.checkboxSelectPlugin.deSelectRows)(rowIndexes);
            }
        }
        // TODO:  add -/+ handling
        function handleGridKeyDown(e, args) {
            if (options.enableExpandCollapse && (e.which == Slick.keyCode.SPACE)) {
                var activeCell = this.getActiveCell();
                if (activeCell) {
                    var item = this.getDataItem(activeCell.row);
                    if (item && item instanceof Slick.Group) {
                        var range = _grid.getRenderedRange();
                        this.getData().setRefreshHints({
                            ignoreDiffsBefore: range.top,
                            ignoreDiffsAfter: range.bottom + 1
                        });
                        if (item.collapsed) {
                            this.getData().expandGroup(item.groupingKey);
                        }
                        else {
                            this.getData().collapseGroup(item.groupingKey);
                        }
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
            }
        }
        function getGroupRowMetadata(item) {
            var groupLevel = item && item.level;
            return {
                selectable: false,
                focusable: options.groupFocusable,
                cssClasses: options.groupCssClass + ' slick-group-level-' + groupLevel,
                formatter: options.includeHeaderTotals && options.totalsFormatter,
                columns: {
                    0: {
                        colspan: options.includeHeaderTotals ? "1" : "*",
                        formatter: options.groupFormatter,
                        editor: null
                    }
                }
            };
        }
        function getTotalsRowMetadata(item) {
            var groupLevel = item && item.group && item.group.level;
            return {
                selectable: false,
                focusable: options.totalsFocusable,
                cssClasses: options.totalsCssClass + ' slick-group-level-' + groupLevel,
                formatter: options.totalsFormatter,
                editor: null
            };
        }
        return {
            "init": init,
            "destroy": destroy,
            "getGroupRowMetadata": getGroupRowMetadata,
            "getTotalsRowMetadata": getTotalsRowMetadata,
            "getOptions": getOptions,
            "setOptions": setOptions
        };
    }
    module.exports = {
        GroupItemMetadataProvider: GroupItemMetadataProvider
    };
},
707: /* models/widgets/widget.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const layout_dom_1 = require(406) /* ../layouts/layout_dom */;
    const providers_1 = require(182) /* ../text/providers */;
    class WidgetView extends layout_dom_1.LayoutDOMView {
        get child_models() {
            return [];
        }
        get provider() {
            return providers_1.default_provider;
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            if (this.provider.status == "not_started") {
                await this.provider.fetch();
            }
        }
        _after_layout() {
            super._after_layout();
            if (this.provider.status == "loading") {
                this._has_finished = false;
            }
        }
        process_tex(text) {
            if (this.provider.MathJax == null) {
                return text;
            }
            const tex_parts = this.provider.MathJax.find_tex(text);
            const processed_text = [];
            let last_index = 0;
            for (const part of tex_parts) {
                processed_text.push(text.slice(last_index, part.start.n));
                processed_text.push(this.provider.MathJax.tex2svg(part.math, { display: part.display }).outerHTML);
                last_index = part.end.n;
            }
            if (last_index < text.length) {
                processed_text.push(text.slice(last_index));
            }
            return processed_text.join("");
        }
        contains_tex_string(text) {
            if (this.provider.MathJax == null) {
                return false;
            }
            return this.provider.MathJax.find_tex(text).length > 0;
        }
        ;
    }
    exports.WidgetView = WidgetView;
    WidgetView.__name__ = "WidgetView";
    class Widget extends layout_dom_1.LayoutDOM {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Widget = Widget;
    _a = Widget;
    Widget.__name__ = "Widget";
    (() => {
        _a.override({
            margin: 5,
        });
    })();
},
708: /* models/widgets/tables/table_widget.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const widget_1 = require(707) /* ../widget */;
    const column_data_source_1 = require(133) /* ../../sources/column_data_source */;
    const cds_view_1 = require(237) /* ../../sources/cds_view */;
    class TableWidget extends widget_1.Widget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.TableWidget = TableWidget;
    _a = TableWidget;
    TableWidget.__name__ = "TableWidget";
    (() => {
        _a.define(({ Ref }) => ({
            source: [Ref(column_data_source_1.ColumnDataSource), () => new column_data_source_1.ColumnDataSource()],
            view: [Ref(cds_view_1.CDSView), () => new cds_view_1.CDSView()],
        }));
    })();
},
709: /* models/widgets/tables/table_column.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const cell_formatters_1 = require(688) /* ./cell_formatters */;
    const cell_editors_1 = require(685) /* ./cell_editors */;
    const string_1 = require(40) /* ../../../core/util/string */;
    const enums_1 = require(20) /* ../../../core/enums */;
    const comparisons_1 = require(329) /* ../../../models/comparisons */;
    const model_1 = require(51) /* ../../../model */;
    class TableColumn extends model_1.Model {
        constructor(attrs) {
            super(attrs);
        }
        toColumn() {
            return {
                id: (0, string_1.unique_id)(),
                field: this.field,
                name: this.title ?? this.field,
                width: this.width,
                formatter: this.formatter.doFormat.bind(this.formatter),
                model: this.editor,
                editor: this.editor.default_view,
                sortable: this.sortable,
                defaultSortAsc: this.default_sort == "ascending",
                sorter: this.sorter,
            };
        }
    }
    exports.TableColumn = TableColumn;
    _a = TableColumn;
    TableColumn.__name__ = "TableColumn";
    (() => {
        _a.define(({ Bool, Float, Str, Nullable, Ref }) => ({
            field: [Str],
            title: [Nullable(Str), null],
            width: [Float, 300],
            formatter: [Ref(cell_formatters_1.CellFormatter), () => new cell_formatters_1.StringFormatter()],
            editor: [Ref(cell_editors_1.CellEditor), () => new cell_editors_1.StringEditor()],
            sortable: [Bool, true],
            default_sort: [enums_1.Sort, "ascending"],
            visible: [Bool, true],
            sorter: [Nullable(Ref(comparisons_1.Comparison)), null],
        }));
    })();
},
710: /* styles/widgets/slickgrid.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `.slick-header.ui-state-default,.slick-headerrow.ui-state-default,.slick-footerrow.ui-state-default,.slick-top-panel-scroller.ui-state-default,.slick-group-header.ui-state-default{width:100%;overflow:auto;position:relative;border-left:0px !important;}.slick-header.ui-state-default{overflow:inherit;}.slick-header::-webkit-scrollbar,.slick-headerrow::-webkit-scrollbar,.slick-footerrow::-webkit-scrollbar{display:none;}.slick-header-columns,.slick-headerrow-columns,.slick-footerrow-columns,.slick-group-header-columns{position:relative;white-space:nowrap;cursor:default;overflow:hidden;}.slick-header-column.ui-state-default,.slick-group-header-column.ui-state-default{position:relative;display:inline-block;box-sizing:content-box !important;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;height:16px;line-height:16px;margin:0;padding:4px;border-right:1px solid silver;border-left:0px !important;border-top:0px !important;border-bottom:0px !important;float:left;}.slick-footerrow-column.ui-state-default{-o-text-overflow:ellipsis;text-overflow:ellipsis;margin:0;padding:4px;border-right:1px solid silver;border-left:0px;border-top:0px;border-bottom:0px;float:left;line-height:20px;vertical-align:middle;}.slick-headerrow-column.ui-state-default,.slick-footerrow-column.ui-state-default{padding:4px;}.slick-header-column-sorted{font-style:italic;}.slick-sort-indicator{display:inline-block;width:8px;height:5px;margin-left:4px;margin-top:6px;float:left;}.slick-sort-indicator-numbered{display:inline-block;width:8px;height:5px;margin-left:4px;margin-top:0;line-height:20px;float:left;font-family:Arial;font-style:normal;font-weight:bold;color:#6190CD;}.slick-sort-indicator-desc{background:url(images/sort-desc.gif);}.slick-sort-indicator-asc{background:url(images/sort-asc.gif);}.slick-resizable-handle{position:absolute;font-size:0.1px;display:block;cursor:col-resize;width:9px;right:-5px;top:0;height:100%;z-index:1;}.slick-sortable-placeholder{background:silver;}.grid-canvas{position:relative;outline:0;}.slick-row.ui-widget-content,.slick-row.ui-state-active{position:absolute;border:0px;width:100%;}.slick-cell,.slick-headerrow-column,.slick-footerrow-column{position:absolute;border:1px solid transparent;border-right:1px dotted silver;border-bottom-color:silver;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;vertical-align:middle;z-index:1;padding:1px 2px 2px 1px;margin:0;white-space:nowrap;cursor:default;}.slick-cell,.slick-headerrow-column{border-bottom-color:silver;}.slick-footerrow-column{border-top-color:silver;}.slick-group-toggle{display:inline-block;}.slick-cell.highlighted{background:lightskyblue;background:rgba(0, 0, 255, 0.2);-webkit-transition:all 0.5s;-moz-transition:all 0.5s;-o-transition:all 0.5s;transition:all 0.5s;}.slick-cell.flashing{border:1px solid red !important;}.slick-cell.editable{z-index:11;overflow:visible;background:white;border-color:black;border-style:solid;}.slick-cell:focus{outline:none;}.slick-reorder-proxy{display:inline-block;background:blue;opacity:0.15;cursor:move;}.slick-reorder-guide{display:inline-block;height:2px;background:blue;opacity:0.7;}.slick-selection{z-index:10;position:absolute;border:2px dashed black;}.slick-pane{position:absolute;outline:0;overflow:hidden;width:100%;}.slick-pane-header{display:block;}.slick-header{overflow:hidden;position:relative;}.slick-headerrow{overflow:hidden;position:relative;}.slick-top-panel-scroller{overflow:hidden;position:relative;}.slick-top-panel{width:10000px;}.slick-viewport{position:relative;outline:0;width:100%;}.slick-header-columns{background:url('images/header-columns-bg.gif') repeat-x center bottom;border-bottom:1px solid silver;}.slick-header-column{background:url('images/header-columns-bg.gif') repeat-x center bottom;border-right:1px solid silver;}.slick-header-column:hover,.slick-header-column-active{background:white url('images/header-columns-over-bg.gif') repeat-x center bottom;}.slick-headerrow{background:#fafafa;}.slick-headerrow-column{background:#fafafa;border-bottom:0;height:100%;}.slick-row.ui-state-active{background:#F5F7D7;}.slick-row{position:absolute;background:white;border:0px;line-height:20px;}.slick-row.selected{z-index:10;background:#DFE8F6;}.slick-cell{padding-left:4px;padding-right:4px;}.slick-group{border-bottom:2px solid silver;}.slick-group-toggle{width:9px;height:9px;margin-right:5px;}.slick-group-toggle.expanded{background:url(images/collapse.gif) no-repeat center center;}.slick-group-toggle.collapsed{background:url(images/expand.gif) no-repeat center center;}.slick-group-totals{color:gray;background:white;}.slick-group-select-checkbox{width:13px;height:13px;margin:3px 10px 0 0;display:inline-block;}.slick-group-select-checkbox.checked{background:url(images/GrpCheckboxY.png) no-repeat center center;}.slick-group-select-checkbox.unchecked{background:url(images/GrpCheckboxN.png) no-repeat center center;}.slick-cell.selected{background-color:beige;}.slick-cell.active{border-color:gray;border-style:solid;}.slick-sortable-placeholder{background:silver !important;}.slick-row.odd{background:#fafafa;}.slick-row.ui-state-active{background:#F5F7D7;}.slick-row.loading{opacity:0.5;}.slick-cell.invalid{border-color:red;-moz-animation-duration:0.2s;-webkit-animation-duration:0.2s;-moz-animation-name:slickgrid-invalid-hilite;-webkit-animation-name:slickgrid-invalid-hilite;}@-moz-keyframes slickgrid-invalid-hilite{from{box-shadow:0 0 6px red;}to{box-shadow:none;}}@-webkit-keyframes slickgrid-invalid-hilite{from{box-shadow:0 0 6px red;}to{box-shadow:none;}}.slick-column-name,.slick-sort-indicator{display:inline-block;float:left;margin-bottom:100px;}.slick-header-button{display:inline-block;float:right;vertical-align:top;margin:1px;margin-bottom:100px;height:15px;width:15px;background-repeat:no-repeat;background-position:center center;cursor:pointer;}.slick-header-button-hidden{width:0;-webkit-transition:0.2s width;-ms-transition:0.2s width;transition:0.2s width;}.slick-header-column:hover > .slick-header-button{width:15px;}.slick-header-menubutton{position:absolute;right:0;top:0;bottom:0;width:14px;background-repeat:no-repeat;background-position:left center;background-image:url(../images/down.gif);cursor:pointer;display:none;border-left:thin ridge silver;}.slick-header-column:hover > .slick-header-menubutton,.slick-header-column-active .slick-header-menubutton{display:inline-block;}.slick-header-menu{position:absolute;display:inline-block;margin:0;padding:2px;cursor:default;}.slick-header-menuitem{list-style:none;margin:0;padding:0;cursor:pointer;display:block;}.slick-header-menuicon{display:inline-block;width:16px;height:16px;vertical-align:middle;margin-right:4px;background-repeat:no-repeat;background-position:center center;}.slick-header-menucontent{display:inline-block;vertical-align:middle;}.slick-header-menuitem-disabled{color:silver;}.slick-header-menuitem-hidden{display:none;}.slick-header-menuitem.slick-header-menuitem-divider{cursor:default;border:none;overflow:hidden;padding:0;height:1px;margin:8px 2px;background-color:#cecece;}.slick-header-menuitem-divider.slick-header-menuitem:hover{background-color:#cecece;}.slick-columnpicker{border:1px solid #718BB7;background:#f0f0f0;padding:6px;-moz-box-shadow:2px 2px 2px silver;-webkit-box-shadow:2px 2px 2px silver;box-shadow:2px 2px 2px silver;min-width:150px;cursor:default;position:absolute;z-index:20;overflow:auto;resize:both;}.slick-columnpicker > .close{float:right;}.slick-columnpicker .title{font-size:16px;width:60%;border-bottom:solid 1px #d6d6d6;margin-bottom:10px;}.slick-columnpicker li{list-style:none;margin:0;padding:0;background:none;}.slick-columnpicker input{margin:4px;}.slick-columnpicker li a{display:block;padding:4px;font-weight:bold;}.slick-columnpicker li a:hover{background:white;}.slick-columnpicker-list li.hidden{display:none;}.slick-pager{width:100%;height:26px;border:1px solid gray;border-top:0;background:url('../images/header-columns-bg.gif') repeat-x center bottom;vertical-align:middle;}.slick-pager .slick-pager-status{display:inline-block;padding:6px;}.slick-pager .ui-icon-container{display:inline-block;margin:2px;border-color:gray;}.slick-pager .slick-pager-nav{display:inline-block;float:left;padding:2px;}.slick-pager .slick-pager-settings{display:block;float:right;padding:2px;}.slick-pager .slick-pager-settings *{vertical-align:middle;}.slick-pager .slick-pager-settings a{padding:2px;text-decoration:underline;cursor:pointer;}.slick-header-columns{border-bottom:1px solid silver;background-image:none;}.slick-header-column{border-right:1px solid transparent;background-image:none;}.slick-header-column:last-of-type{border-right-color:transparent;}.slick-header-column:hover,.slick-header-column-active{background-color:#F0F8FF;background-image:none;}.slick-header-columns{background-image:none;}.slick-header-column{background-image:none;}.slick-header-column:hover,.slick-header-column-active{background-image:none;}.slick-group-toggle.expanded{background-image:url("data:image/gif;base64,R0lGODlhCQAJAPcAAAFGeoCAgNXz/+v5/+v6/+z5/+36//L7//X8//j9/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACQAJAAAIMwADCBxIUIDBgwIEChgwwECBAgQUFjBAkaJCABgxGlB4AGHCAAIQiBypEEECkScJqgwQEAA7");}.slick-group-toggle.collapsed{background-image:url("data:image/gif;base64,R0lGODlhCQAJAPcAAAFGeoCAgNXz/+v5/+v6/+z5/+36//L7//X8//j9/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACQAJAAAIOAADCBxIUIDBgwIEChgwAECBAgQUFjAAQIABAwoBaNSIMYCAAwIqGlSIAEHFkiQTIBCgkqDLAAEBADs=");}.slick-group-select-checkbox.checked{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNkRpr/UAAAEcSURBVChTjdI9S8NQFAbg/raQXVwCRRFE7GK7OXTwD+ikk066VF3a0ja0hQTyQdJrwNq0zrYSQRLEXMSWSlCIb8glqRcFD+9yz3nugXwU4n9XQqMoGjj36uBJsTwuaNo3EwBG4Yy7pe7Gv8YcvhJCGFVsjxsjxujj6OTSGlHv+U2WZUZbPWKOv1ZjT5a7pbIoiptbO5b73mwrjHa1B27l8VlTEIS1damlTnEE+EEN9/P8WrfH81qdAIGeXvTTmzltdCy46sEhxpKUINReZR9NnqZbr9puugxV3NjWh/k74WmmEdWhmUNy2jNmWRc6fZTVADCqao52u+DGWTACYNT3fRxwtatPufTNR4yCIGAUn5hS+vJHhWGY/ANx/A3tvdv+1tZmuwAAAABJRU5ErkJggg==");}.slick-group-select-checkbox.unchecked{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNkRpr/UAAACXSURBVChT1dIxC4MwEAXg/v8/VOhQVDBNakV0KA6pxS4JhWRSIYPEJxwdDi1de7wleR+3JIf486w0hKCKRpSvvOhZcCmvNQBRuKqdah03U7UjNNH81rOaBYDo8SQaPX8JANFEaLaGBeAPaaY61rGksiN6TmR5H1j9CSoAosYYHLA7vTxYMvVEZa0liif23r93xjm3/oEYF8PiDn/I2FHCAAAAAElFTkSuQmCC");}.slick-sort-indicator-desc{background-image:url("data:image/gif;base64,R0lGODlhDQAFAIcAAGGQzUD/QOPu+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAANAAUAAAgeAAUAGEgQgIAACBEKLHgwYcKFBh1KFNhQosOKEgMCADs=");}.slick-sort-indicator-asc{background-image:url("data:image/gif;base64,R0lGODlhDQAFAIcAAGGQzUD/QOPu+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAANAAUAAAgbAAMIDABgoEGDABIeRJhQ4cKGEA8KmEiRosGAADs=");}.slick-header-menubutton{background-image:url("data:image/gif;base64,R0lGODlhDgAOAIABADtKYwAAACH5BAEAAAEALAAAAAAOAA4AAAISjI+py+0PHZgUsGobhTn6DxoFADs=");}.detailView-toggle.expand{background-image:url("data:image/gif;base64,R0lGODlhBQANAHAAACH5BAEAAAMALAAAAAAFAA0AgePu+wAAAGGQzQAAAAIQxD4gqJsCHxRttaMY2rz3AgA7");}.detailView-toggle.collapse{background-image:url("data:image/gif;base64,R0lGODlhDQAFAIcAAGGQzUD/QOPu+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAANAAUAAAgeAAUAGEgQgIAACBEKLHgwYcKFBh1KFNhQosOKEgMCADs=");}.slick-pager{background-image:none;}`;
},
711: /* models/widgets/tables/row_aggregators.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const slickgrid_1 = require(698) /* @bokeh/slickgrid */;
    const { Avg, Min, Max, Sum } = slickgrid_1.Data.Aggregators;
    const model_1 = require(51) /* ../../../model */;
    class RowAggregator extends model_1.Model {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.RowAggregator = RowAggregator;
    _a = RowAggregator;
    RowAggregator.__name__ = "RowAggregator";
    (() => {
        _a.define(({ Str }) => ({
            field_: [Str, ""],
        }));
    })();
    const avg = new Avg();
    class AvgAggregator extends RowAggregator {
        constructor() {
            super(...arguments);
            this.key = "avg";
            this.init = avg.init;
            this.accumulate = avg.accumulate;
            this.storeResult = avg.storeResult;
        }
    }
    exports.AvgAggregator = AvgAggregator;
    AvgAggregator.__name__ = "AvgAggregator";
    const min = new Min();
    class MinAggregator extends RowAggregator {
        constructor() {
            super(...arguments);
            this.key = "min";
            this.init = min.init;
            this.accumulate = min.accumulate;
            this.storeResult = min.storeResult;
        }
    }
    exports.MinAggregator = MinAggregator;
    MinAggregator.__name__ = "MinAggregator";
    const max = new Max();
    class MaxAggregator extends RowAggregator {
        constructor() {
            super(...arguments);
            this.key = "max";
            this.init = max.init;
            this.accumulate = max.accumulate;
            this.storeResult = max.storeResult;
        }
    }
    exports.MaxAggregator = MaxAggregator;
    MaxAggregator.__name__ = "MaxAggregator";
    const sum = new Sum();
    class SumAggregator extends RowAggregator {
        constructor() {
            super(...arguments);
            this.key = "sum";
            this.init = sum.init;
            this.accumulate = sum.accumulate;
            this.storeResult = sum.storeResult;
        }
    }
    exports.SumAggregator = SumAggregator;
    SumAggregator.__name__ = "SumAggregator";
},
712: /* models/widgets/tables/data_cube.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a, _b;
    __esModule();
    const dom_1 = require(63) /* ../../../core/dom */;
    const object_1 = require(9) /* ../../../core/util/object */;
    const types_1 = require(8) /* ../../../core/util/types */;
    const assert_1 = require(12) /* ../../../core/util/assert */;
    const slickgrid_1 = require(698) /* @bokeh/slickgrid */;
    const definitions_1 = require(686) /* ./definitions */;
    const data_table_1 = require(691) /* ./data_table */;
    const column_data_source_1 = require(133) /* ../../sources/column_data_source */;
    const row_aggregators_1 = require(711) /* ./row_aggregators */;
    const model_1 = require(51) /* ../../../model */;
    function groupCellFormatter(_row, _cell, _value, _columnDef, dataContext) {
        const { collapsed, level, title } = dataContext;
        const toggle = (0, dom_1.span)({
            class: `slick-group-toggle ${collapsed ? "collapsed" : "expanded"}`,
            style: { "margin-left": `${level * 15}px` },
        });
        const titleElement = (0, dom_1.span)({
            class: "slick-group-title",
        }, title);
        return `${toggle.outerHTML}${titleElement.outerHTML}`;
    }
    function indentFormatter(formatter, indent) {
        return (row, cell, value, columnDef, dataContext) => {
            const spacer = (0, dom_1.span)({
                class: "slick-group-toggle",
                style: { "margin-left": `${(indent ?? 0) * 15}px` },
            });
            const formatted = formatter != null ? formatter(row, cell, value, columnDef, dataContext) : `${value}`;
            return `${spacer.outerHTML}${formatted.replace(/^<div/, "<span").replace(/div>$/, "span>")}`;
        };
    }
    function handleGridClick(event, args) {
        const item = this.getDataItem(args.row);
        if (item instanceof slickgrid_1.Group && event.target.classList.contains("slick-group-toggle")) {
            if (item.collapsed) {
                this.getData().expandGroup(item.groupingKey);
            }
            else {
                this.getData().collapseGroup(item.groupingKey);
            }
            event.stopImmediatePropagation();
            event.preventDefault();
            this.invalidate();
            this.render();
        }
    }
    class GroupingInfo extends model_1.Model {
        constructor(attrs) {
            super(attrs);
        }
        get comparer() {
            return (a, b) => {
                return a.value === b.value ? 0 : a.value > b.value ? 1 : -1;
            };
        }
    }
    exports.GroupingInfo = GroupingInfo;
    _a = GroupingInfo;
    GroupingInfo.__name__ = "GroupingInfo";
    (() => {
        _a.define(({ Bool, Str, List, Ref }) => ({
            getter: [Str, ""],
            aggregators: [List(Ref(row_aggregators_1.RowAggregator)), []],
            collapsed: [Bool, false],
        }));
    })();
    class DataCubeProvider extends data_table_1.TableDataProvider {
        constructor(source, view, columns, target) {
            super(source, view);
            this.columns = columns;
            this.groupingInfos = [];
            this.groupingDelimiter = ":|:";
            this.target = target;
        }
        setGrouping(groupingInfos) {
            this.groupingInfos = groupingInfos;
            this.toggledGroupsByLevel = groupingInfos.map(() => ({}));
            this.refresh();
        }
        extractGroups(rows, parent_group) {
            const groups = [];
            const groupsByValue = new Map();
            const level = parent_group != null ? parent_group.level + 1 : 0;
            const { comparer, getter } = this.groupingInfos[level];
            for (const row of rows) {
                const column = (0, object_1.dict)(this.source.data).get(getter);
                (0, assert_1.assert)(column != null);
                const value = column[row];
                let group = groupsByValue.get(value);
                if (group == null) {
                    const groupingKey = parent_group != null ? `${parent_group.groupingKey}${this.groupingDelimiter}${value}` : `${value}`;
                    group = Object.assign(new slickgrid_1.Group(), { value, level, groupingKey });
                    groups.push(group);
                    groupsByValue.set(value, group);
                }
                group.rows.push(row);
            }
            if (level < this.groupingInfos.length - 1) {
                for (const group of groups) {
                    group.groups = this.extractGroups(group.rows, group);
                }
            }
            groups.sort(comparer);
            return groups;
        }
        calculateTotals(group, aggregators) {
            const totals = { avg: {}, max: {}, min: {}, sum: {} };
            const data = (0, object_1.dict)(this.source.data);
            const names = [...data.keys()];
            const items = group.rows.map((i) => {
                return names.reduce((obj, name) => ({ ...obj, [name]: data.get(name)[i] }), {});
            });
            for (const aggregator of aggregators) {
                aggregator.init();
                for (const item of items) {
                    aggregator.accumulate(item);
                }
                aggregator.storeResult(totals);
            }
            return totals;
        }
        addTotals(groups, level = 0) {
            const { aggregators, collapsed: groupCollapsed } = this.groupingInfos[level];
            const toggledGroups = this.toggledGroupsByLevel[level];
            for (const group of groups) {
                if (!(0, types_1.is_nullish)(group.groups)) { // XXX: bad typings
                    this.addTotals(group.groups, level + 1);
                }
                if (aggregators.length != 0 && group.rows.length != 0) {
                    group.totals = this.calculateTotals(group, aggregators);
                }
                group.collapsed = groupCollapsed !== toggledGroups[group.groupingKey];
                group.title = group.value ? `${group.value}` : "";
            }
        }
        flattenedGroupedRows(groups, level = 0) {
            const rows = [];
            for (const group of groups) {
                rows.push(group);
                if (!group.collapsed) {
                    const subRows = !(0, types_1.is_nullish)(group.groups) // XXX: bad typings
                        ? this.flattenedGroupedRows(group.groups, level + 1)
                        : group.rows;
                    rows.push(...subRows);
                }
            }
            return rows;
        }
        refresh() {
            const groups = this.extractGroups(this.view.indices);
            const data = (0, object_1.dict)(this.source.data);
            const labels = data.get(this.columns[0].field);
            (0, assert_1.assert)(labels != null);
            if (groups.length != 0) {
                this.addTotals(groups);
                this.rows = this.flattenedGroupedRows(groups);
                this.target.data = {
                    row_indices: this.rows.map(value => value instanceof slickgrid_1.Group ? value.rows : value),
                    labels: this.rows.map(value => value instanceof slickgrid_1.Group ? value.title : labels[value]),
                };
            }
        }
        getLength() {
            return this.rows.length;
        }
        getItem(i) {
            const item = this.rows[i];
            const data = (0, object_1.dict)(this.source.data);
            return item instanceof slickgrid_1.Group
                ? item
                : [...data.keys()].reduce((obj, name) => ({ ...obj, [name]: data.get(name)[item] }), { [definitions_1.DTINDEX_NAME]: item });
        }
        getItemMetadata(i) {
            const my_item = this.rows[i];
            const columns = this.columns.slice(1);
            const aggregators = my_item instanceof slickgrid_1.Group
                ? this.groupingInfos[my_item.level].aggregators
                : [];
            function adapter(column) {
                const { field: my_field, formatter } = column;
                const aggregator = aggregators.find(({ field_ }) => field_ === my_field);
                if (aggregator != null) {
                    const { key } = aggregator;
                    return {
                        formatter(row, cell, _value, columnDef, dataContext) {
                            return formatter != null ? formatter(row, cell, dataContext.totals[key][my_field], columnDef, dataContext) : "";
                        },
                    };
                }
                return {};
            }
            return my_item instanceof slickgrid_1.Group
                ? {
                    selectable: false,
                    focusable: false,
                    cssClasses: "slick-group",
                    columns: [{ formatter: groupCellFormatter }, ...columns.map(adapter)],
                }
                : {};
        }
        collapseGroup(grouping_key) {
            const level = grouping_key.split(this.groupingDelimiter).length - 1;
            this.toggledGroupsByLevel[level][grouping_key] = !this.groupingInfos[level].collapsed;
            this.refresh();
        }
        expandGroup(grouping_key) {
            const level = grouping_key.split(this.groupingDelimiter).length - 1;
            this.toggledGroupsByLevel[level][grouping_key] = this.groupingInfos[level].collapsed;
            this.refresh();
        }
    }
    exports.DataCubeProvider = DataCubeProvider;
    DataCubeProvider.__name__ = "DataCubeProvider";
    class DataCubeView extends data_table_1.DataTableView {
        _render_table() {
            const options = {
                enableCellNavigation: this.model.selectable !== false,
                enableColumnReorder: false,
                autosizeColsMode: this.autosize,
                multiColumnSort: false,
                editable: this.model.editable,
                autoEdit: this.model.auto_edit,
                rowHeight: this.model.row_height,
            };
            const columns = this.model.columns.map(column => column.toColumn());
            columns[0].formatter = indentFormatter(columns[0].formatter, this.model.grouping.length);
            delete columns[0].editor;
            this.data = new DataCubeProvider(this.model.source, this.model.view, columns, this.model.target);
            this.data.setGrouping(this.model.grouping);
            this.el.style.width = `${this.model.width}px`;
            this.grid = new slickgrid_1.Grid(this.wrapper_el, this.data, columns, options);
            this.grid.onClick.subscribe(handleGridClick);
        }
    }
    exports.DataCubeView = DataCubeView;
    DataCubeView.__name__ = "DataCubeView";
    class DataCube extends data_table_1.DataTable {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DataCube = DataCube;
    _b = DataCube;
    DataCube.__name__ = "DataCube";
    (() => {
        _b.prototype.default_view = DataCubeView;
        _b.define(({ List, Ref }) => ({
            grouping: [List(Ref(GroupingInfo)), []],
            target: [Ref(column_data_source_1.ColumnDataSource)],
        }));
    })();
},
}, 683, {"models/widgets/tables/main":683,"models/widgets/tables/index":684,"models/widgets/tables/cell_editors":685,"models/widgets/tables/definitions":686,"styles/widgets/tables.css":687,"models/widgets/tables/cell_formatters":688,"models/widgets/tables/data_table":691,"models/widgets/widget":707,"models/widgets/tables/table_widget":708,"models/widgets/tables/table_column":709,"styles/widgets/slickgrid.css":710,"models/widgets/tables/row_aggregators":711,"models/widgets/tables/data_cube":712}, {});});
//# sourceMappingURL=bokeh-tables.js.map
