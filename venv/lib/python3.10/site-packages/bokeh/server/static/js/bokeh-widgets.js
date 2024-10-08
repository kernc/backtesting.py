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
598: /* models/widgets/main.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const Widgets = tslib_1.__importStar(require(599) /* ./index */);
    exports.Widgets = Widgets;
    const base_1 = require(7) /* ../../base */;
    (0, base_1.register_models)(Widgets);
},
599: /* models/widgets/index.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    var abstract_button_1 = require(600) /* ./abstract_button */;
    __esExport("AbstractButton", abstract_button_1.AbstractButton);
    var autocomplete_input_1 = require(604) /* ./autocomplete_input */;
    __esExport("AutocompleteInput", autocomplete_input_1.AutocompleteInput);
    var button_1 = require(610) /* ./button */;
    __esExport("Button", button_1.Button);
    var checkbox_button_group_1 = require(611) /* ./checkbox_button_group */;
    __esExport("CheckboxButtonGroup", checkbox_button_group_1.CheckboxButtonGroup);
    var checkbox_group_1 = require(614) /* ./checkbox_group */;
    __esExport("CheckboxGroup", checkbox_group_1.CheckboxGroup);
    var checkbox_1 = require(617) /* ./checkbox */;
    __esExport("Checkbox", checkbox_1.Checkbox);
    var color_picker_1 = require(619) /* ./color_picker */;
    __esExport("ColorPicker", color_picker_1.ColorPicker);
    var date_picker_1 = require(620) /* ./date_picker */;
    __esExport("DatePicker", date_picker_1.DatePicker);
    var date_range_picker_1 = require(632) /* ./date_range_picker */;
    __esExport("DateRangePicker", date_range_picker_1.DateRangePicker);
    var datetime_picker_1 = require(633) /* ./datetime_picker */;
    __esExport("DatetimePicker", datetime_picker_1.DatetimePicker);
    var datetime_range_picker_1 = require(635) /* ./datetime_range_picker */;
    __esExport("DatetimeRangePicker", datetime_range_picker_1.DatetimeRangePicker);
    var div_1 = require(636) /* ./div */;
    __esExport("Div", div_1.Div);
    var dropdown_1 = require(639) /* ./dropdown */;
    __esExport("Dropdown", dropdown_1.Dropdown);
    var file_input_1 = require(641) /* ./file_input */;
    __esExport("FileInput", file_input_1.FileInput);
    var help_button_1 = require(642) /* ./help_button */;
    __esExport("HelpButton", help_button_1.HelpButton);
    var input_widget_1 = require(607) /* ./input_widget */;
    __esExport("InputWidget", input_widget_1.InputWidget);
    var markup_1 = require(637) /* ./markup */;
    __esExport("Markup", markup_1.Markup);
    var multi_choice_1 = require(643) /* ./multi_choice */;
    __esExport("MultiChoice", multi_choice_1.MultiChoice);
    var multiselect_1 = require(646) /* ./multiselect */;
    __esExport("MultiSelect", multiselect_1.MultiSelect);
    var multiple_date_picker_1 = require(647) /* ./multiple_date_picker */;
    __esExport("MultipleDatePicker", multiple_date_picker_1.MultipleDatePicker);
    var multiple_datetime_picker_1 = require(648) /* ./multiple_datetime_picker */;
    __esExport("MultipleDatetimePicker", multiple_datetime_picker_1.MultipleDatetimePicker);
    var numeric_input_1 = require(649) /* ./numeric_input */;
    __esExport("NumericInput", numeric_input_1.NumericInput);
    var palette_select_1 = require(650) /* ./palette_select */;
    __esExport("PaletteSelect", palette_select_1.PaletteSelect);
    var paragraph_1 = require(656) /* ./paragraph */;
    __esExport("Paragraph", paragraph_1.Paragraph);
    var password_input_1 = require(657) /* ./password_input */;
    __esExport("PasswordInput", password_input_1.PasswordInput);
    var pretext_1 = require(659) /* ./pretext */;
    __esExport("PreText", pretext_1.PreText);
    var radio_button_group_1 = require(660) /* ./radio_button_group */;
    __esExport("RadioButtonGroup", radio_button_group_1.RadioButtonGroup);
    var radio_group_1 = require(661) /* ./radio_group */;
    __esExport("RadioGroup", radio_group_1.RadioGroup);
    var select_1 = require(662) /* ./select */;
    __esExport("Select", select_1.Select);
    var spinner_1 = require(663) /* ./spinner */;
    __esExport("Spinner", spinner_1.Spinner);
    var switch_1 = require(664) /* ./switch */;
    __esExport("Switch", switch_1.Switch);
    var textarea_input_1 = require(666) /* ./textarea_input */;
    __esExport("TextAreaInput", textarea_input_1.TextAreaInput);
    var text_input_1 = require(605) /* ./text_input */;
    __esExport("TextInput", text_input_1.TextInput);
    var time_picker_1 = require(667) /* ./time_picker */;
    __esExport("TimePicker", time_picker_1.TimePicker);
    var toggle_1 = require(668) /* ./toggle */;
    __esExport("Toggle", toggle_1.Toggle);
    var widget_1 = require(707) /* ./widget */;
    __esExport("Widget", widget_1.Widget);
    tslib_1.__exportStar(require(669) /* ./sliders */, exports);
},
600: /* models/widgets/abstract_button.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const enums_1 = require(20) /* ../../core/enums */;
    const dom_1 = require(63) /* ../../core/dom */;
    const build_views_1 = require(56) /* ../../core/build_views */;
    const types_1 = require(8) /* ../../core/util/types */;
    const control_1 = require(601) /* ./control */;
    const dom_node_1 = require(125) /* ../dom/dom_node */;
    const text_1 = require(321) /* ../dom/text */;
    const icon_1 = require(487) /* ../ui/icons/icon */;
    const buttons_css_1 = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */), buttons = buttons_css_1;
    class AbstractButtonView extends control_1.ControlView {
        *controls() {
            yield this.button_el;
        }
        *children() {
            yield* super.children();
            if (this.label_view != null) {
                yield this.label_view;
            }
            if (this.icon_view != null) {
                yield this.icon_view;
            }
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            await this._rebuild_label();
            await this._rebuild_icon();
        }
        async _rebuild_label() {
            this.label_view?.remove();
            const label = (() => {
                const { label } = this.model;
                return (0, types_1.isString)(label) ? new text_1.Text({ content: label }) : label;
            })();
            this.label_view = await this.owner.build_view(label, this);
        }
        async _rebuild_icon() {
            this.icon_view?.remove();
            const { icon } = this.model;
            if (icon != null) {
                this.icon_view = await (0, build_views_1.build_view)(icon, { parent: this });
            }
        }
        connect_signals() {
            super.connect_signals();
            const { label, icon, button_type, disabled } = this.model.properties;
            this.on_transitive_change(label, async () => {
                await this._rebuild_label();
                this.render();
            });
            this.on_transitive_change(icon, async () => {
                await this._rebuild_icon();
                this.render();
            });
            this.on_change([button_type, disabled], () => {
                this.render();
            });
        }
        remove() {
            this.label_view?.remove();
            this.icon_view?.remove();
            super.remove();
        }
        stylesheets() {
            return [...super.stylesheets(), buttons_css_1.default];
        }
        _render_button(...children) {
            return (0, dom_1.button)({
                type: "button",
                disabled: this.model.disabled,
                class: [buttons.btn, buttons[`btn_${this.model.button_type}`]],
            }, ...children);
        }
        render() {
            super.render();
            this.label_view?.render();
            this.button_el = this._render_button(this.label_view?.el);
            this.button_el.addEventListener("click", () => this.click());
            if (this.icon_view != null) {
                const separator = this.model.label != "" ? (0, dom_1.nbsp)() : (0, dom_1.text)("");
                (0, dom_1.prepend)(this.button_el, this.icon_view.el, separator);
                this.icon_view.render();
            }
            this.group_el = (0, dom_1.div)({ class: buttons.btn_group }, this.button_el);
            this.shadow_el.append(this.group_el);
        }
        click() { }
    }
    exports.AbstractButtonView = AbstractButtonView;
    AbstractButtonView.__name__ = "AbstractButtonView";
    class AbstractButton extends control_1.Control {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.AbstractButton = AbstractButton;
    _a = AbstractButton;
    AbstractButton.__name__ = "AbstractButton";
    (() => {
        _a.define(({ Str, Ref, Or, Nullable }) => ({
            label: [Or(Ref(dom_node_1.DOMNode), Str), "Button"],
            icon: [Nullable(Ref(icon_1.Icon)), null],
            button_type: [enums_1.ButtonType, "default"],
        }));
    })();
},
601: /* models/widgets/control.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const widget_1 = require(707) /* ./widget */;
    const dom_1 = require(63) /* ../../core/dom */;
    class ControlView extends widget_1.WidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.disabled, (disabled) => {
                for (const el of this.controls()) {
                    (0, dom_1.toggle_attribute)(el, "disabled", disabled);
                }
            });
        }
    }
    exports.ControlView = ControlView;
    ControlView.__name__ = "ControlView";
    class Control extends widget_1.Widget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Control = Control;
    Control.__name__ = "Control";
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
603: /* styles/buttons.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.btn = "bk-btn";
    exports.active = "bk-active";
    exports.btn_default = "bk-btn-default";
    exports.btn_primary = "bk-btn-primary";
    exports.btn_success = "bk-btn-success";
    exports.btn_warning = "bk-btn-warning";
    exports.btn_danger = "bk-btn-danger";
    exports.btn_light = "bk-btn-light";
    exports.btn_group = "bk-btn-group";
    exports.vertical = "bk-vertical";
    exports.horizontal = "bk-horizontal";
    exports.dropdown_toggle = "bk-dropdown-toggle";
    exports.default = `.bk-btn,::file-selector-button{height:100%;display:inline-block;text-align:center;vertical-align:middle;white-space:nowrap;cursor:pointer;padding:var(--padding-vertical) var(--padding-horizontal);font-size:var(--font-size);border:1px solid transparent;border-radius:var(--border-radius);outline:0;outline-offset:-5px;user-select:none;-webkit-user-select:none;}.bk-btn:hover,::file-selector-button:hover,.bk-btn:focus,::file-selector-button:focus{text-decoration:none;}.bk-btn:active,::file-selector-button:active,.bk-active.bk-btn,.bk-active::file-selector-button{background-image:none;box-shadow:inset 0 3px 5px rgba(0, 0, 0, 0.125);}.bk-btn[disabled]{cursor:not-allowed;pointer-events:none;opacity:0.65;box-shadow:none;}::file-selector-button{color:#333;background-color:#fff;border-color:#ccc;}::file-selector-button:hover{background-color:#f5f5f5;border-color:#b8b8b8;}.bk-active::file-selector-button{background-color:#ebebeb;border-color:#adadad;}::file-selector-button[disabled],::file-selector-button[disabled]:hover,::file-selector-button[disabled]:focus,::file-selector-button[disabled]:active,.bk-active::file-selector-button[disabled]{background-color:#e6e6e6;border-color:#ccc;}::file-selector-button:focus,::file-selector-button:active{outline:1px dotted #ccc;}.bk-btn-default{color:#333;background-color:#fff;border-color:#ccc;}.bk-btn-default:hover{background-color:#f5f5f5;border-color:#b8b8b8;}.bk-active.bk-btn-default{background-color:#ebebeb;border-color:#adadad;}.bk-btn-default[disabled],.bk-btn-default[disabled]:hover,.bk-btn-default[disabled]:focus,.bk-btn-default[disabled]:active,.bk-active.bk-btn-default[disabled]{background-color:#e6e6e6;border-color:#ccc;}.bk-btn-default:focus,.bk-btn-default:active{outline:1px dotted #ccc;}.bk-btn-primary{color:#fff;background-color:#428bca;border-color:#357ebd;}.bk-btn-primary:hover{background-color:#3681c1;border-color:#2c699e;}.bk-active.bk-btn-primary{background-color:#3276b1;border-color:#285e8e;}.bk-btn-primary[disabled],.bk-btn-primary[disabled]:hover,.bk-btn-primary[disabled]:focus,.bk-btn-primary[disabled]:active,.bk-active.bk-btn-primary[disabled]{background-color:#506f89;border-color:#357ebd;}.bk-btn-primary:focus,.bk-btn-primary:active{outline:1px dotted #ccc;}.bk-btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c;}.bk-btn-success:hover{background-color:#4eb24e;border-color:#409240;}.bk-active.bk-btn-success{background-color:#47a447;border-color:#398439;}.bk-btn-success[disabled],.bk-btn-success[disabled]:hover,.bk-btn-success[disabled]:focus,.bk-btn-success[disabled]:active,.bk-active.bk-btn-success[disabled]{background-color:#667b66;border-color:#4cae4c;}.bk-btn-success:focus,.bk-btn-success:active{outline:1px dotted #ccc;}.bk-btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236;}.bk-btn-warning:hover{background-color:#eea43b;border-color:#e89014;}.bk-active.bk-btn-warning{background-color:#ed9c28;border-color:#d58512;}.bk-btn-warning[disabled],.bk-btn-warning[disabled]:hover,.bk-btn-warning[disabled]:focus,.bk-btn-warning[disabled]:active,.bk-active.bk-btn-warning[disabled]{background-color:#c89143;border-color:#eea236;}.bk-btn-warning:focus,.bk-btn-warning:active{outline:1px dotted #ccc;}.bk-btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a;}.bk-btn-danger:hover{background-color:#d5433e;border-color:#bd2d29;}.bk-active.bk-btn-danger{background-color:#d2322d;border-color:#ac2925;}.bk-btn-danger[disabled],.bk-btn-danger[disabled]:hover,.bk-btn-danger[disabled]:focus,.bk-btn-danger[disabled]:active,.bk-active.bk-btn-danger[disabled]{background-color:#a55350;border-color:#d43f3a;}.bk-btn-danger:focus,.bk-btn-danger:active{outline:1px dotted #ccc;}.bk-btn-light{color:#333;background-color:#fff;border-color:#ccc;border-color:transparent;}.bk-btn-light:hover{background-color:#f5f5f5;border-color:#b8b8b8;}.bk-active.bk-btn-light{background-color:#ebebeb;border-color:#adadad;}.bk-btn-light[disabled],.bk-btn-light[disabled]:hover,.bk-btn-light[disabled]:focus,.bk-btn-light[disabled]:active,.bk-active.bk-btn-light[disabled]{background-color:#e6e6e6;border-color:#ccc;}.bk-btn-light:focus,.bk-btn-light:active{outline:1px dotted #ccc;}.bk-btn-group{height:100%;display:flex;flex-wrap:nowrap;align-items:center;}.bk-btn-group:not(.bk-vertical),.bk-btn-group.bk-horizontal{flex-direction:row;}.bk-btn-group.bk-vertical{flex-direction:column;}.bk-btn-group > .bk-btn{flex-grow:1;}.bk-btn-group:not(.bk-vertical) > .bk-btn + .bk-btn{margin-left:-1px;}.bk-btn-group.bk-vertical > .bk-btn + .bk-btn{margin-top:-1px;}.bk-btn-group:not(.bk-vertical) > .bk-btn:first-child:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;}.bk-btn-group.bk-vertical > .bk-btn:first-child:not(:last-child){border-bottom-left-radius:0;border-bottom-right-radius:0;}.bk-btn-group:not(.bk-vertical) > .bk-btn:not(:first-child):last-child{border-bottom-left-radius:0;border-top-left-radius:0;}.bk-btn-group.bk-vertical > .bk-btn:not(:first-child):last-child{border-top-left-radius:0;border-top-right-radius:0;}.bk-btn-group > .bk-btn:not(:first-child):not(:last-child){border-radius:0;}.bk-btn-group.bk-vertical > .bk-btn{width:100%;}.bk-btn-group .bk-dropdown-toggle{flex:0 0 0;padding:var(--padding-vertical) calc(var(--padding-horizontal)/2);}`;
},
604: /* models/widgets/autocomplete_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const text_input_1 = require(605) /* ./text_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const iterator_1 = require(34) /* ../../core/util/iterator */;
    const math_1 = require(11) /* ../../core/util/math */;
    const kinds_1 = require(21) /* ../../core/kinds */;
    const dropdown_css_1 = tslib_1.__importStar(require(609) /* ../../styles/dropdown.css */), dropdown = dropdown_css_1;
    const SearchStrategy = (0, kinds_1.Enum)("starts_with", "includes");
    class AutocompleteInputView extends text_input_1.TextInputView {
        constructor() {
            super(...arguments);
            this._open = false;
            this._last_value = "";
            this._hover_index = 0;
        }
        stylesheets() {
            return [...super.stylesheets(), dropdown_css_1.default];
        }
        render() {
            super.render();
            this.input_el.addEventListener("focusin", () => this._toggle_menu());
            this.menu = (0, dom_1.div)({ class: [dropdown.menu, dropdown.below] });
            this.menu.addEventListener("click", (event) => this._menu_click(event));
            this.menu.addEventListener("mouseover", (event) => this._menu_hover(event));
            this.shadow_el.appendChild(this.menu);
            (0, dom_1.undisplay)(this.menu);
        }
        change_input() {
            if (this._open && this.menu.children.length > 0) {
                this.model.value = this.menu.children[this._hover_index].textContent;
                this.input_el.focus();
                this._hide_menu();
            }
            else if (!this.model.restrict) {
                super.change_input();
            }
        }
        _update_completions(completions) {
            (0, dom_1.empty)(this.menu);
            const { max_completions } = this.model;
            const selected_completions = max_completions != null ? (0, iterator_1.take)(completions, max_completions) : completions;
            for (const text of selected_completions) {
                const item = (0, dom_1.div)(text);
                this.menu.append(item);
            }
            this.menu.firstElementChild?.classList.add(dropdown.active);
        }
        compute_completions(value) {
            const norm_function = (() => {
                const { case_sensitive } = this.model;
                return case_sensitive ? (t) => t : (t) => t.toLowerCase();
            })();
            const search_function = (() => {
                switch (this.model.search_strategy) {
                    case "starts_with": return (t, v) => t.startsWith(v);
                    case "includes": return (t, v) => t.includes(v);
                }
            })();
            const normalized_value = norm_function(value);
            const completions = [];
            for (const text of this.model.completions) {
                const normalized_text = norm_function(text);
                if (search_function(normalized_text, normalized_value)) {
                    completions.push(text);
                }
            }
            return completions;
        }
        _toggle_menu() {
            const { value } = this.input_el;
            if (value.length < this.model.min_characters) {
                this._hide_menu();
                return;
            }
            const completions = this.compute_completions(value);
            this._update_completions(completions);
            if (completions.length == 0) {
                this._hide_menu();
            }
            else {
                this._show_menu();
            }
        }
        _show_menu() {
            if (!this._open) {
                this._open = true;
                this._hover_index = 0;
                this._last_value = this.model.value;
                (0, dom_1.display)(this.menu);
                const listener = (event) => {
                    if (!event.composedPath().includes(this.el)) {
                        document.removeEventListener("click", listener);
                        this._hide_menu();
                    }
                };
                document.addEventListener("click", listener);
            }
        }
        _hide_menu() {
            if (this._open) {
                this._open = false;
                (0, dom_1.undisplay)(this.menu);
            }
        }
        _menu_click(event) {
            if (event.target != event.currentTarget && event.target instanceof Element) {
                this.model.value = event.target.textContent;
                this.input_el.focus();
                this._hide_menu();
            }
        }
        _menu_hover(event) {
            if (event.target != event.currentTarget && event.target instanceof Element) {
                for (let i = 0; i < this.menu.children.length; i++) {
                    if (this.menu.children[i].textContent == event.target.textContent) {
                        this._bump_hover(i);
                        break;
                    }
                }
            }
        }
        _bump_hover(new_index) {
            const n_children = this.menu.children.length;
            if (this._open && n_children > 0) {
                this.menu.children[this._hover_index].classList.remove(dropdown.active);
                this._hover_index = (0, math_1.clamp)(new_index, 0, n_children - 1);
                this.menu.children[this._hover_index].classList.add(dropdown.active);
            }
        }
        _keyup(event) {
            super._keyup(event);
            switch (event.key) {
                case "Enter": {
                    this.change_input();
                    break;
                }
                case "Escape": {
                    this._hide_menu();
                    break;
                }
                case "ArrowUp": {
                    this._bump_hover(this._hover_index - 1);
                    break;
                }
                case "ArrowDown": {
                    this._bump_hover(this._hover_index + 1);
                    break;
                }
                default:
                    this._toggle_menu();
            }
        }
    }
    exports.AutocompleteInputView = AutocompleteInputView;
    AutocompleteInputView.__name__ = "AutocompleteInputView";
    class AutocompleteInput extends text_input_1.TextInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.AutocompleteInput = AutocompleteInput;
    _a = AutocompleteInput;
    AutocompleteInput.__name__ = "AutocompleteInput";
    (() => {
        _a.prototype.default_view = AutocompleteInputView;
        _a.define(({ Bool, Int, Str, List, NonNegative, Positive, Nullable }) => ({
            completions: [List(Str), []],
            min_characters: [NonNegative(Int), 2],
            max_completions: [Nullable(Positive(Int)), null],
            case_sensitive: [Bool, true],
            restrict: [Bool, true],
            search_strategy: [SearchStrategy, "starts_with"],
        }));
    })();
},
605: /* models/widgets/text_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const text_like_input_1 = require(606) /* ./text_like_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class TextInputView extends text_like_input_1.TextLikeInputView {
        connect_signals() {
            super.connect_signals();
            const { prefix, suffix } = this.model.properties;
            this.on_change([prefix, suffix], () => this.render());
        }
        _render_input() {
            this.input_el = (0, dom_1.input)({ type: "text", class: inputs.input });
            const { prefix, suffix } = this.model;
            const prefix_el = prefix != null ? (0, dom_1.div)({ class: "bk-input-prefix" }, prefix) : null;
            const suffix_el = suffix != null ? (0, dom_1.div)({ class: "bk-input-suffix" }, suffix) : null;
            const container_el = (0, dom_1.div)({ class: "bk-input-container" }, prefix_el, this.input_el, suffix_el);
            return container_el;
        }
        render() {
            super.render();
            this.input_el.addEventListener("keyup", (event) => this._keyup(event));
        }
        _keyup(event) {
            if (event.key == "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey) {
                this.model.trigger_event(new bokeh_events_1.ValueSubmit(this.input_el.value));
            }
        }
    }
    exports.TextInputView = TextInputView;
    TextInputView.__name__ = "TextInputView";
    class TextInput extends text_like_input_1.TextLikeInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.TextInput = TextInput;
    _a = TextInput;
    TextInput.__name__ = "TextInput";
    (() => {
        _a.prototype.default_view = TextInputView;
        _a.define(({ Str, Nullable }) => ({
            prefix: [Nullable(Str), null],
            suffix: [Nullable(Str), null],
        }));
    })();
},
606: /* models/widgets/text_like_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const input_widget_1 = require(607) /* ./input_widget */;
    class TextLikeInputView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.value.change, () => this.input_el.value = this.model.value);
            this.connect(this.model.properties.value_input.change, () => this.input_el.value = this.model.value_input);
            this.connect(this.model.properties.disabled.change, () => this.input_el.disabled = this.model.disabled);
            this.connect(this.model.properties.placeholder.change, () => this.input_el.placeholder = this.model.placeholder);
            this.connect(this.model.properties.max_length.change, () => {
                const { max_length } = this.model;
                if (max_length != null) {
                    this.input_el.maxLength = max_length;
                }
                else {
                    this.input_el.removeAttribute("maxLength");
                }
            });
        }
        render() {
            super.render();
            const { input_el } = this;
            input_el.value = this.model.value;
            input_el.disabled = this.model.disabled;
            input_el.placeholder = this.model.placeholder;
            if (this.model.max_length != null) {
                input_el.maxLength = this.model.max_length;
            }
            input_el.addEventListener("change", () => this.change_input());
            input_el.addEventListener("input", () => this.change_input_value());
        }
        change_input() {
            this.model.value = this.input_el.value;
            super.change_input();
        }
        change_input_value() {
            this.model.value_input = this.input_el.value;
            super.change_input();
        }
    }
    exports.TextLikeInputView = TextLikeInputView;
    TextLikeInputView.__name__ = "TextLikeInputView";
    class TextLikeInput extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.TextLikeInput = TextLikeInput;
    _a = TextLikeInput;
    TextLikeInput.__name__ = "TextLikeInput";
    (() => {
        _a.define(({ Int, Str, Nullable }) => ({
            value: [Str, ""],
            value_input: [Str, ""],
            placeholder: [Str, ""],
            max_length: [Nullable(Int), null],
        }));
    })();
},
607: /* models/widgets/input_widget.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a, _b;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ClearInput_1;
    const control_1 = require(601) /* ./control */;
    const tooltip_1 = require(420) /* ../ui/tooltip */;
    const html_1 = require(408) /* ../dom/html */;
    const types_1 = require(8) /* ../../core/util/types */;
    const build_views_1 = require(56) /* ../../core/build_views */;
    const dom_1 = require(63) /* ../../core/dom */;
    const view_1 = require(58) /* ../../core/view */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    const inputs_css_1 = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */), inputs = inputs_css_1;
    const icons_css_1 = tslib_1.__importDefault(require(123) /* ../../styles/icons.css */);
    let ClearInput = (_a = class ClearInput extends bokeh_events_1.ModelEvent {
        constructor(model) {
            super();
            this.model = model;
            this.origin = model;
        }
        static from_values(values) {
            const { model } = values;
            return new ClearInput_1(model);
        }
    },
        (() => {
            ClearInput_1 = _a;
        })(),
        _a.__name__ = "ClearInput",
        _a);
    exports.ClearInput = ClearInput;
    exports.ClearInput = ClearInput = ClearInput_1 = __decorate([
        (0, bokeh_events_1.server_event)("clear_input")
    ], ClearInput);
    class InputWidgetView extends control_1.ControlView {
        constructor() {
            super(...arguments);
            this.description = null;
            this.desc_el = null;
        }
        *controls() {
            yield this.input_el;
        }
        *children() {
            yield* super.children();
            const { title, description } = this;
            if (title instanceof view_1.View) {
                yield title;
            }
            if (description instanceof view_1.View) {
                yield description;
            }
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            await this._build_title();
            await this._build_description();
        }
        remove() {
            const { title, description } = this;
            if (title instanceof view_1.View) {
                title.remove();
            }
            if (description instanceof view_1.View) {
                description.remove();
            }
            super.remove();
        }
        connect_signals() {
            super.connect_signals();
            const { title, description } = this.model.properties;
            this.on_change(title, async () => {
                await this._build_title();
                this.render();
            });
            this.on_change(description, async () => {
                await this._build_description();
                this.render();
            });
        }
        stylesheets() {
            return [...super.stylesheets(), inputs_css_1.default, icons_css_1.default];
        }
        render() {
            super.render();
            this.desc_el = this._build_description_el();
            this.title_el = this._build_title_el();
            const input_or_container_el = this._render_input();
            this.input_el.id = "input";
            this.group_el = (0, dom_1.div)({ class: inputs.input_group }, this.title_el, input_or_container_el);
            this.shadow_el.append(this.group_el);
        }
        _build_description_el() {
            const { description } = this;
            if (description == null) {
                return null;
            }
            else {
                const icon_el = (0, dom_1.div)({ class: inputs.icon });
                const desc_el = (0, dom_1.div)({ class: inputs.description }, icon_el);
                if ((0, types_1.isString)(description)) {
                    desc_el.title = description;
                }
                else {
                    if (description.model.target == "auto") {
                        description.target = desc_el;
                    }
                    let persistent = false;
                    const toggle = (visible) => {
                        description.model.setv({
                            visible,
                            closable: persistent,
                        });
                        icon_el.classList.toggle(inputs.opaque, visible && persistent);
                    };
                    this.on_change(description.model.properties.visible, () => {
                        const { visible } = description.model;
                        if (!visible) {
                            persistent = false;
                        }
                        toggle(visible);
                    });
                    desc_el.addEventListener("mouseenter", () => {
                        toggle(true);
                    });
                    desc_el.addEventListener("mouseleave", () => {
                        if (!persistent) {
                            toggle(false);
                        }
                    });
                    document.addEventListener("mousedown", (event) => {
                        const path = event.composedPath();
                        if (path.includes(description.el)) {
                            return;
                        }
                        else if (path.includes(desc_el)) {
                            persistent = !persistent;
                            toggle(persistent);
                        }
                        else {
                            persistent = false;
                            toggle(false);
                        }
                    });
                    window.addEventListener("blur", () => {
                        persistent = false;
                        toggle(false);
                    });
                }
                return desc_el;
            }
        }
        async _build_title() {
            const { title } = this.model;
            if (title instanceof html_1.HTML) {
                this.title = await (0, build_views_1.build_view)(title, { parent: this });
            }
            else {
                this.title = title;
            }
        }
        async _build_description() {
            const { description } = this.model;
            if (description instanceof tooltip_1.Tooltip) {
                this.description = await (0, build_views_1.build_view)(description, { parent: this });
            }
            else {
                this.description = description;
            }
        }
        _build_title_el() {
            const { title } = this;
            const content = (() => {
                if (title instanceof html_1.HTMLView) {
                    title.render();
                    return title.el;
                }
                else {
                    return title;
                }
            })();
            const display = title == "" ? "none" : "";
            return (0, dom_1.label)({ for: "input", style: { display } }, content, this.desc_el);
        }
        change_input() { }
    }
    exports.InputWidgetView = InputWidgetView;
    InputWidgetView.__name__ = "InputWidgetView";
    class InputWidget extends control_1.Control {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.InputWidget = InputWidget;
    _b = InputWidget;
    InputWidget.__name__ = "InputWidget";
    (() => {
        _b.define(({ Str, Nullable, Or, Ref }) => ({
            title: [Or(Str, Ref(html_1.HTML)), ""],
            description: [Nullable(Or(Str, Ref(tooltip_1.Tooltip))), null],
        }));
    })();
},
608: /* styles/widgets/inputs.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.input = "bk-input";
    exports.disabled = "bk-disabled";
    exports.input_container = "bk-input-container";
    exports.input_prefix = "bk-input-prefix";
    exports.input_suffix = "bk-input-suffix";
    exports.input_group = "bk-input-group";
    exports.inline = "bk-inline";
    exports.spin_wrapper = "bk-spin-wrapper";
    exports.spin_btn = "bk-spin-btn";
    exports.spin_btn_up = "bk-spin-btn-up";
    exports.spin_btn_down = "bk-spin-btn-down";
    exports.description = "bk-description";
    exports.icon = "bk-icon";
    exports.opaque = "bk-opaque";
    exports.default = `:host{--input-min-height:calc(var(--line-height-computed) + 2*var(--padding-vertical) + 2px);}.bk-input{position:relative;display:inline-block;width:100%;flex-grow:1;min-height:var(--input-min-height);padding:0 var(--padding-horizontal);background-color:#fff;border:1px solid #ccc;border-radius:var(--border-radius);resize:none;}.bk-input:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);}.bk-input::placeholder,.bk-input:-ms-input-placeholder,.bk-input::-moz-placeholder,.bk-input::-webkit-input-placeholder{color:#999;opacity:1;}.bk-input[disabled],.bk-input.bk-disabled{cursor:not-allowed;background-color:#eee;opacity:1;}.bk-input-container{width:100%;height:100%;display:flex;flex-direction:row;flex-wrap:nowrap;}.bk-input-container .bk-input-prefix,.bk-input-container .bk-input-suffix{display:flex;align-items:center;flex:0 1 0;border:1px solid #ccc;border-radius:var(--border-radius);padding:0 var(--padding-horizontal);background-color:#e6e6e6;}.bk-input-container .bk-input-prefix{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;}.bk-input-container .bk-input-suffix{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0;}.bk-input-container .bk-input{flex:1 0 0;}.bk-input-container .bk-input:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0;}.bk-input-container .bk-input:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;}input[type=file].bk-input{padding-left:0;}input[type=file]::file-selector-button{box-sizing:inherit;font-family:inherit;font-size:inherit;line-height:inherit;}select:not([multiple]).bk-input,select:not([size]).bk-input{height:auto;appearance:none;-webkit-appearance:none;background-image:url('data:image/svg+xml;utf8,<svg version="1.1" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg"><path d="M 0,0 25,0 12.5,20 Z" fill="black" /></svg>');background-position:right 0.5em center;background-size:8px 6px;background-repeat:no-repeat;padding-right:calc(var(--padding-horizontal) + 8px);}option{padding:0;}select[multiple].bk-input,select[size].bk-input,textarea.bk-input{height:auto;}.bk-input-group{position:relative;width:100%;height:100%;display:inline-flex;flex-wrap:nowrap;align-items:start;flex-direction:column;white-space:nowrap;}.bk-input-group.bk-inline{flex-direction:row;}.bk-input-group.bk-inline > *:not(:first-child){margin-left:5px;}.bk-input-group > .bk-spin-wrapper{display:inherit;width:inherit;height:inherit;position:relative;overflow:hidden;padding:0;vertical-align:middle;}.bk-input-group > .bk-spin-wrapper input{padding-right:20px;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn{position:absolute;display:block;height:50%;min-height:0;min-width:0;width:30px;padding:0;margin:0;right:0;border:none;background:none;cursor:pointer;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn:before{content:"";display:inline-block;transform:translateY(-50%);border-left:5px solid transparent;border-right:5px solid transparent;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-up{top:0;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-up:before{border-bottom:5px solid black;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-up:disabled:before{border-bottom-color:grey;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-down{bottom:0;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-down:before{border-top:5px solid black;}.bk-input-group > .bk-spin-wrapper > .bk-spin-btn.bk-spin-btn-down:disabled:before{border-top-color:grey;}.bk-description{position:relative;display:inline-block;margin-left:0.25em;vertical-align:middle;margin-top:-2px;cursor:pointer;}.bk-description > .bk-icon{opacity:0.5;width:18px;height:18px;background-color:gray;mask-image:var(--bokeh-icon-help);mask-size:contain;mask-repeat:no-repeat;-webkit-mask-image:var(--bokeh-icon-help);-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;}label:hover > .bk-description > .bk-icon,.bk-icon.bk-opaque{opacity:1;}`;
},
609: /* styles/dropdown.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.menu = "bk-menu";
    exports.above = "bk-above";
    exports.below = "bk-below";
    exports.divider = "bk-divider";
    exports.active = "bk-active";
    exports.default = `:host{position:relative;}.bk-menu{position:absolute;left:0;width:100%;z-index:var(--bokeh-top-level);cursor:pointer;font-size:var(--font-size);background-color:#fff;border:1px solid #ccc;border-radius:var(--border-radius);box-shadow:0 6px 12px rgba(0, 0, 0, 0.175);}.bk-menu.bk-above{bottom:100%;}.bk-menu.bk-below{top:100%;}.bk-menu > .bk-divider{height:1px;margin:calc(var(--line-height-computed)/2 - 1px) 0;overflow:hidden;background-color:#e5e5e5;}.bk-menu > :not(.bk-divider){padding:var(--padding-vertical) var(--padding-horizontal);}.bk-menu > :not(.bk-divider):hover,.bk-menu > :not(.bk-divider).bk-active{background-color:#e6e6e6;}`;
},
610: /* models/widgets/button.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const abstract_button_1 = require(600) /* ./abstract_button */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    class ButtonView extends abstract_button_1.AbstractButtonView {
        click() {
            this.model.trigger_event(new bokeh_events_1.ButtonClick());
            super.click();
        }
    }
    exports.ButtonView = ButtonView;
    ButtonView.__name__ = "ButtonView";
    class Button extends abstract_button_1.AbstractButton {
        constructor(attrs) {
            super(attrs);
        }
        on_click(callback) {
            this.on_event(bokeh_events_1.ButtonClick, callback);
        }
    }
    exports.Button = Button;
    _a = Button;
    Button.__name__ = "Button";
    (() => {
        _a.prototype.default_view = ButtonView;
        _a.override({
            label: "Button",
        });
    })();
},
611: /* models/widgets/checkbox_button_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_button_group_1 = require(612) /* ./toggle_button_group */;
    const buttons = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */);
    class CheckboxButtonGroupView extends toggle_button_group_1.ToggleButtonGroupView {
        get active() {
            return new Set(this.model.active);
        }
        change_active(i) {
            const { active } = this;
            active.has(i) ? active.delete(i) : active.add(i);
            this.model.active = [...active].sort();
        }
        _update_active() {
            const { active } = this;
            this._buttons.forEach((button_el, i) => {
                button_el.classList.toggle(buttons.active, active.has(i));
            });
        }
    }
    exports.CheckboxButtonGroupView = CheckboxButtonGroupView;
    CheckboxButtonGroupView.__name__ = "CheckboxButtonGroupView";
    class CheckboxButtonGroup extends toggle_button_group_1.ToggleButtonGroup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.CheckboxButtonGroup = CheckboxButtonGroup;
    _a = CheckboxButtonGroup;
    CheckboxButtonGroup.__name__ = "CheckboxButtonGroup";
    (() => {
        _a.prototype.default_view = CheckboxButtonGroupView;
        _a.define(({ Int, List }) => ({
            active: [List(Int), []],
        }));
    })();
},
612: /* models/widgets/toggle_button_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const oriented_control_1 = require(613) /* ./oriented_control */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    const enums_1 = require(20) /* ../../core/enums */;
    const dom_1 = require(63) /* ../../core/dom */;
    const buttons_css_1 = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */), buttons = buttons_css_1;
    class ToggleButtonGroupView extends oriented_control_1.OrientedControlView {
        *controls() {
            yield* this._buttons; // TODO: HTMLButtonElement[]
        }
        connect_signals() {
            super.connect_signals();
            const p = this.model.properties;
            this.on_change(p.button_type, () => this.render());
            this.on_change(p.labels, () => this.render());
            this.on_change(p.active, () => this._update_active());
        }
        stylesheets() {
            return [...super.stylesheets(), buttons_css_1.default];
        }
        render() {
            super.render();
            this._buttons = this.model.labels.map((label, i) => {
                const button_el = (0, dom_1.button)({
                    class: [buttons.btn, buttons[`btn_${this.model.button_type}`]],
                    disabled: this.model.disabled,
                }, label);
                button_el.addEventListener("click", () => {
                    this.change_active(i);
                    this.model.trigger_event(new bokeh_events_1.ButtonClick());
                });
                return button_el;
            });
            this._update_active();
            const orient = this.model.orientation == "horizontal" ? buttons.horizontal : buttons.vertical;
            const group = (0, dom_1.div)({ class: [buttons.btn_group, orient] }, this._buttons);
            this.shadow_el.appendChild(group);
        }
    }
    exports.ToggleButtonGroupView = ToggleButtonGroupView;
    ToggleButtonGroupView.__name__ = "ToggleButtonGroupView";
    class ToggleButtonGroup extends oriented_control_1.OrientedControl {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.ToggleButtonGroup = ToggleButtonGroup;
    _a = ToggleButtonGroup;
    ToggleButtonGroup.__name__ = "ToggleButtonGroup";
    (() => {
        _a.define(({ Str, List }) => ({
            labels: [List(Str), []],
            button_type: [enums_1.ButtonType, "default"],
        }));
    })();
},
613: /* models/widgets/oriented_control.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const control_1 = require(601) /* ./control */;
    const enums_1 = require(20) /* ../../core/enums */;
    class OrientedControlView extends control_1.ControlView {
    }
    exports.OrientedControlView = OrientedControlView;
    OrientedControlView.__name__ = "OrientedControlView";
    class OrientedControl extends control_1.Control {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.OrientedControl = OrientedControl;
    _a = OrientedControl;
    OrientedControl.__name__ = "OrientedControl";
    (() => {
        _a.define(() => ({
            orientation: [enums_1.Orientation, "horizontal"],
        }));
    })();
},
614: /* models/widgets/checkbox_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_input_group_1 = require(615) /* ./toggle_input_group */;
    const dom_1 = require(63) /* ../../core/dom */;
    const array_1 = require(10) /* ../../core/util/array */;
    const iterator_1 = require(34) /* ../../core/util/iterator */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class CheckboxGroupView extends toggle_input_group_1.ToggleInputGroupView {
        get active() {
            return new Set(this.model.active);
        }
        connect_signals() {
            super.connect_signals();
            const { active } = this.model.properties;
            this.on_change(active, () => {
                const { active } = this;
                for (const [input_el, i] of (0, iterator_1.enumerate)(this._inputs)) {
                    input_el.checked = active.has(i);
                }
            });
        }
        render() {
            super.render();
            const group = (0, dom_1.div)({ class: [inputs.input_group, this.model.inline ? inputs.inline : null] });
            this.shadow_el.appendChild(group);
            const { active, labels } = this.model;
            this._inputs = [];
            for (let i = 0; i < labels.length; i++) {
                const checkbox = (0, dom_1.input)({ type: "checkbox", value: `${i}` });
                checkbox.addEventListener("change", () => this.change_active(i));
                this._inputs.push(checkbox);
                if (this.model.disabled) {
                    checkbox.disabled = true;
                }
                if ((0, array_1.includes)(active, i)) {
                    checkbox.checked = true;
                }
                const label_el = (0, dom_1.label)(checkbox, (0, dom_1.span)(labels[i]));
                group.appendChild(label_el);
            }
        }
        change_active(i) {
            const { active } = this;
            active.has(i) ? active.delete(i) : active.add(i);
            this.model.active = [...active].sort();
        }
    }
    exports.CheckboxGroupView = CheckboxGroupView;
    CheckboxGroupView.__name__ = "CheckboxGroupView";
    class CheckboxGroup extends toggle_input_group_1.ToggleInputGroup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.CheckboxGroup = CheckboxGroup;
    _a = CheckboxGroup;
    CheckboxGroup.__name__ = "CheckboxGroup";
    (() => {
        _a.prototype.default_view = CheckboxGroupView;
        _a.define(({ Int, List }) => ({
            active: [List(Int), []],
        }));
    })();
},
615: /* models/widgets/toggle_input_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const control_1 = require(601) /* ./control */;
    const inputs_css_1 = tslib_1.__importDefault(require(608) /* ../../styles/widgets/inputs.css */);
    const checkbox_css_1 = tslib_1.__importDefault(require(616) /* ../../styles/widgets/checkbox.css */);
    class ToggleInputGroupView extends control_1.ControlView {
        *controls() {
            yield* this._inputs;
        }
        connect_signals() {
            super.connect_signals();
            const { labels, inline } = this.model.properties;
            this.on_change([labels, inline], () => this.render());
        }
        stylesheets() {
            return [...super.stylesheets(), inputs_css_1.default, checkbox_css_1.default];
        }
    }
    exports.ToggleInputGroupView = ToggleInputGroupView;
    ToggleInputGroupView.__name__ = "ToggleInputGroupView";
    class ToggleInputGroup extends control_1.Control {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.ToggleInputGroup = ToggleInputGroup;
    _a = ToggleInputGroup;
    ToggleInputGroup.__name__ = "ToggleInputGroup";
    (() => {
        _a.define(({ Bool, Str, List }) => ({
            labels: [List(Str), []],
            inline: [Bool, false],
        }));
    })();
},
616: /* styles/widgets/checkbox.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `input[type="checkbox"],input[type="radio"]{margin:0;}input[type="checkbox"] + *,input[type="radio"] + *{position:relative;top:-2px;margin-left:3px;}`;
},
617: /* models/widgets/checkbox.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_input_1 = require(618) /* ./toggle_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const checkbox_css_1 = tslib_1.__importDefault(require(616) /* ../../styles/widgets/checkbox.css */);
    class CheckboxView extends toggle_input_1.ToggleInputView {
        stylesheets() {
            return [...super.stylesheets(), checkbox_css_1.default];
        }
        connect_signals() {
            super.connect_signals();
            const { label } = this.model.properties;
            this.on_change(label, () => this._update_label());
        }
        render() {
            super.render();
            this.checkbox_el = (0, dom_1.input)({ type: "checkbox" });
            this.label_el = (0, dom_1.span)(this.model.label);
            this.checkbox_el.addEventListener("change", () => this._toggle_active());
            this._update_active();
            this._update_disabled();
            this.shadow_el.append(this.checkbox_el, this.label_el);
        }
        _update_active() {
            this.checkbox_el.checked = this.model.active;
        }
        _update_disabled() {
            this.checkbox_el.toggleAttribute("disabled", this.model.disabled);
        }
        _update_label() {
            this.label_el.textContent = this.model.label;
        }
    }
    exports.CheckboxView = CheckboxView;
    CheckboxView.__name__ = "CheckboxView";
    class Checkbox extends toggle_input_1.ToggleInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Checkbox = Checkbox;
    _a = Checkbox;
    Checkbox.__name__ = "Checkbox";
    (() => {
        _a.prototype.default_view = CheckboxView;
        _a.define(({ Str }) => ({
            label: [Str, ""],
        }));
    })();
},
618: /* models/widgets/toggle_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const widget_1 = require(707) /* ./widget */;
    class ToggleInputView extends widget_1.WidgetView {
        connect_signals() {
            super.connect_signals();
            const { active, disabled } = this.model.properties;
            this.on_change(active, () => this._update_active());
            this.on_change(disabled, () => this._update_disabled());
        }
        _toggle_active() {
            if (!this.model.disabled) {
                this.model.active = !this.model.active;
            }
        }
    }
    exports.ToggleInputView = ToggleInputView;
    ToggleInputView.__name__ = "ToggleInputView";
    class ToggleInput extends widget_1.Widget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.ToggleInput = ToggleInput;
    _a = ToggleInput;
    ToggleInput.__name__ = "ToggleInput";
    (() => {
        _a.define(({ Bool }) => ({
            active: [Bool, false],
        }));
    })();
},
619: /* models/widgets/color_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const input_widget_1 = require(607) /* ./input_widget */;
    const dom_1 = require(63) /* ../../core/dom */;
    const color_1 = require(22) /* ../../core/util/color */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class ColorPickerView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.name.change, () => this.input_el.name = this.model.name ?? "");
            this.connect(this.model.properties.color.change, () => this.input_el.value = (0, color_1.color2hexrgb)(this.model.color));
            this.connect(this.model.properties.disabled.change, () => this.input_el.disabled = this.model.disabled);
        }
        _render_input() {
            return this.input_el = (0, dom_1.input)({
                type: "color",
                class: inputs.input,
                name: this.model.name,
                value: (0, color_1.color2hexrgb)(this.model.color),
                disabled: this.model.disabled,
            });
        }
        render() {
            super.render();
            this.input_el.addEventListener("change", () => this.change_input());
        }
        change_input() {
            this.model.color = this.input_el.value;
            super.change_input();
        }
    }
    exports.ColorPickerView = ColorPickerView;
    ColorPickerView.__name__ = "ColorPickerView";
    class ColorPicker extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.ColorPicker = ColorPicker;
    _a = ColorPicker;
    ColorPicker.__name__ = "ColorPicker";
    (() => {
        _a.prototype.default_view = ColorPickerView;
        _a.define(({ Color }) => ({
            color: [Color, "#000000"],
        }));
    })();
},
620: /* models/widgets/date_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    class DatePickerView extends base_date_picker_1.BaseDatePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "single",
            };
        }
        _on_change(selected) {
            (0, assert_1.assert)(selected.length <= 1);
            this.model.value = (() => {
                if (selected.length == 0) {
                    return null;
                }
                else {
                    const [datetime] = selected;
                    const date = this._format_date(datetime);
                    return date;
                }
            })();
        }
    }
    exports.DatePickerView = DatePickerView;
    DatePickerView.__name__ = "DatePickerView";
    class DatePicker extends base_date_picker_1.BaseDatePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DatePicker = DatePicker;
    _a = DatePicker;
    DatePicker.__name__ = "DatePicker";
    (() => {
        _a.prototype.default_view = DatePickerView;
        _a.define(({ Nullable }) => ({
            value: [Nullable(base_date_picker_1.DateLike), null],
        }));
    })();
},
621: /* models/widgets/base_date_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const picker_base_1 = require(622) /* ./picker_base */;
    const types_1 = require(8) /* ../../core/util/types */;
    const kinds_1 = require(21) /* ../../core/kinds */;
    exports.DateLike = (0, kinds_1.Or)((0, kinds_1.Ref)(Date), kinds_1.Str, kinds_1.Float);
    exports.DateLikeList = (0, kinds_1.List)((0, kinds_1.Or)(exports.DateLike, (0, kinds_1.Tuple)(exports.DateLike, exports.DateLike), (0, kinds_1.Struct)({ from: exports.DateLike, to: exports.DateLike })));
    class BaseDatePickerView extends picker_base_1.PickerBaseView {
        _format_date(date) {
            const { picker } = this;
            return picker.formatDate(date, picker.config.dateFormat);
        }
        connect_signals() {
            super.connect_signals();
            const { value, min_date, max_date, disabled_dates, enabled_dates, date_format } = this.model.properties;
            this.connect(value.change, () => {
                const { value } = this.model;
                if (value != null) {
                    this.picker.setDate(value);
                }
                else {
                    this.picker.clear();
                }
            });
            this.connect(min_date.change, () => this.picker.set("minDate", this.model.min_date));
            this.connect(max_date.change, () => this.picker.set("maxDate", this.model.max_date));
            this.connect(disabled_dates.change, () => {
                const { disabled_dates } = this.model;
                this.picker.set("disable", disabled_dates != null ? this._convert_date_list(disabled_dates) : []);
            });
            this.connect(enabled_dates.change, () => {
                const { enabled_dates } = this.model;
                if (enabled_dates != null) {
                    this.picker.set("enable", this._convert_date_list(enabled_dates));
                }
                else {
                    // this reimplements `set()` for the `undefined` case
                    this.picker.config._enable = undefined;
                    this.picker.redraw();
                    this.picker.updateValue(true);
                }
            });
            this.connect(date_format.change, () => this.picker.set("altFormat", this.model.date_format));
        }
        get flatpickr_options() {
            const { value, min_date, max_date, disabled_dates, enabled_dates, date_format } = this.model;
            const options = super.flatpickr_options;
            options.altInput = true;
            options.altFormat = date_format;
            options.dateFormat = "Y-m-d";
            if (value != null) {
                options.defaultDate = value;
            }
            if (min_date != null) {
                options.minDate = min_date;
            }
            if (max_date != null) {
                options.maxDate = max_date;
            }
            if (disabled_dates != null) {
                options.disable = this._convert_date_list(disabled_dates);
            }
            if (enabled_dates != null) {
                options.enable = this._convert_date_list(enabled_dates);
            }
            return options;
        }
        _convert_date_list(value) {
            const result = [];
            for (const item of value) {
                if ((0, types_1.isArray)(item)) {
                    const [from, to] = item;
                    result.push({ from, to });
                }
                else {
                    result.push(item);
                }
            }
            return result;
        }
    }
    exports.BaseDatePickerView = BaseDatePickerView;
    BaseDatePickerView.__name__ = "BaseDatePickerView";
    class BaseDatePicker extends picker_base_1.PickerBase {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.BaseDatePicker = BaseDatePicker;
    _a = BaseDatePicker;
    BaseDatePicker.__name__ = "BaseDatePicker";
    (() => {
        _a.define(({ Nullable }) => ({
            min_date: [Nullable(exports.DateLike), null],
            max_date: [Nullable(exports.DateLike), null],
            disabled_dates: [Nullable(exports.DateLikeList), null],
            enabled_dates: [Nullable(exports.DateLikeList), null],
            date_format: [kinds_1.Str, "Y-m-d"],
        }));
    })();
},
622: /* models/widgets/picker_base.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const flatpickr_1 = tslib_1.__importDefault(require(623) /* flatpickr */);
    const input_widget_1 = require(607) /* ./input_widget */;
    const dom_1 = require(63) /* ../../core/dom */;
    const enums_1 = require(20) /* ../../core/enums */;
    const dom_2 = require(63) /* ../../core/dom */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    const flatpickr_css_1 = tslib_1.__importDefault(require(631) /* ../../styles/widgets/flatpickr.css */);
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class PickerBaseView extends input_widget_1.InputWidgetView {
        get picker() {
            (0, assert_1.assert)(this._picker != null);
            return this._picker;
        }
        *controls() {
            yield this.picker.altInput ?? this.input_el;
        }
        remove() {
            this._picker?.destroy();
            super.remove();
        }
        stylesheets() {
            return [...super.stylesheets(), flatpickr_css_1.default];
        }
        connect_signals() {
            super.connect_signals();
            const { inline } = this.model.properties;
            this.connect(inline.change, () => this.picker.set("inline", this.model.inline));
        }
        get flatpickr_options() {
            return {
                appendTo: this.group_el,
                inline: this.model.inline,
                position: this._position.bind(this),
                onChange: (selected) => {
                    this._on_change(selected);
                    this.change_input();
                },
            };
        }
        _render_input() {
            return this.input_el = (0, dom_1.input)({ type: "text", class: inputs.input, disabled: this.model.disabled });
        }
        render() {
            super.render();
            this._picker?.destroy();
            const options = this.flatpickr_options;
            this._picker = (0, flatpickr_1.default)(this.input_el, options);
        }
        // https://github.com/flatpickr/flatpickr/pull/2362
        _position(self, custom_el) {
            const positionElement = custom_el ?? self._positionElement;
            const calendarHeight = [...self.calendarContainer.children].reduce((acc, child) => acc + (0, dom_2.bounding_box)(child).height, 0);
            const calendarWidth = self.calendarContainer.offsetWidth;
            const configPos = this.model.position.split(" ");
            const configPosVertical = configPos[0];
            const configPosHorizontal = configPos.length > 1 ? configPos[1] : null;
            // const inputBounds = positionElement.getBoundingClientRect()
            const inputBounds = {
                top: positionElement.offsetTop,
                bottom: positionElement.offsetTop + positionElement.offsetHeight,
                left: positionElement.offsetLeft,
                right: positionElement.offsetLeft + positionElement.offsetWidth,
                width: positionElement.offsetWidth,
            };
            const distanceFromBottom = window.innerHeight - inputBounds.bottom;
            const showOnTop = configPosVertical === "above" ||
                (configPosVertical !== "below" &&
                    distanceFromBottom < calendarHeight &&
                    inputBounds.top > calendarHeight);
            // const top =
            //   window.scrollY +
            //   inputBounds.top +
            //   (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2)
            const top = self.config.appendTo != null
                ? inputBounds.top +
                    (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2)
                : window.scrollY +
                    inputBounds.top +
                    (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            self.calendarContainer.classList.toggle("arrowTop", !showOnTop);
            self.calendarContainer.classList.toggle("arrowBottom", showOnTop);
            if (self.config.inline) {
                return;
            }
            let left = window.scrollX + inputBounds.left;
            let isCenter = false;
            let isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            }
            else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            self.calendarContainer.classList.toggle("arrowLeft", !isCenter && !isRight);
            self.calendarContainer.classList.toggle("arrowCenter", isCenter);
            self.calendarContainer.classList.toggle("arrowRight", isRight);
            const right = window.document.body.offsetWidth -
                (window.scrollX + inputBounds.right);
            const rightMost = left + calendarWidth > window.document.body.offsetWidth;
            const centerMost = right + calendarWidth > window.document.body.offsetWidth;
            self.calendarContainer.classList.toggle("rightMost", rightMost);
            if (self.config.static) {
                return;
            }
            self.calendarContainer.style.top = `${top}px`;
            if (!rightMost) {
                self.calendarContainer.style.left = `${left}px`;
                self.calendarContainer.style.right = "auto";
            }
            else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = `${right}px`;
            }
            else {
                const css = this.shadow_el.styleSheets[0];
                const bodyWidth = window.document.body.offsetWidth;
                const centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                const centerBefore = ".flatpickr-calendar.centerMost:before";
                const centerAfter = ".flatpickr-calendar.centerMost:after";
                const centerIndex = css.cssRules.length;
                const centerStyle = `{left:${inputBounds.left}px;right:auto;}`;
                self.calendarContainer.classList.toggle("rightMost", false);
                self.calendarContainer.classList.toggle("centerMost", true);
                css.insertRule(`${centerBefore},${centerAfter}${centerStyle}`, centerIndex);
                self.calendarContainer.style.left = `${centerLeft}px`;
                self.calendarContainer.style.right = "auto";
            }
        }
    }
    exports.PickerBaseView = PickerBaseView;
    PickerBaseView.__name__ = "PickerBaseView";
    class PickerBase extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.PickerBase = PickerBase;
    _a = PickerBase;
    PickerBase.__name__ = "PickerBase";
    (() => {
        _a.define(({ Bool }) => {
            return {
                position: [enums_1.CalendarPosition, "auto"],
                inline: [Bool, false],
            };
        });
    })();
},
623: /* flatpickr/dist/esm/index.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function (t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    const options_1 = require(624) /* ./types/options */;
    const default_1 = tslib_1.__importDefault(require(625) /* ./l10n/default */);
    const utils_1 = require(626) /* ./utils */;
    const dom_1 = require(627) /* ./utils/dom */;
    const dates_1 = require(628) /* ./utils/dates */;
    const formatting_1 = require(629) /* ./utils/formatting */;
    require(630) /* ./utils/polyfills */;
    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: __assign(__assign({}, options_1.defaults), flatpickr.defaultConfig),
            l10n: default_1.default,
        };
        self.parseDate = (0, dates_1.createDateParser)({ config: self.config, l10n: self.l10n });
        self._handlers = [];
        self.pluginElements = [];
        self.loadedPlugins = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self.onMouseOver = onMouseOver;
        self._createElement = dom_1.createElement;
        self.createDay = createDay;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.updateValue = updateValue;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function (month, yr) {
                    if (month === void 0) {
                        month = self.currentMonth;
                    }
                    if (yr === void 0) {
                        yr = self.currentYear;
                    }
                    if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                        return 29;
                    return self.l10n.daysInMonth[month];
                },
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile)
                build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) {
                    setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
                }
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (!self.isMobile && isSafari) {
                positionCalendar();
            }
            triggerEvent("onReady");
        }
        function getClosestActiveElement() {
            var _a;
            return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
                .activeElement || document.activeElement);
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1) {
                return;
            }
            else if (config.noCalendar !== true) {
                window.requestAnimationFrame(function () {
                    if (self.calendarContainer !== undefined) {
                        self.calendarContainer.style.visibility = "hidden";
                        self.calendarContainer.style.display = "block";
                    }
                    if (self.daysContainer !== undefined) {
                        var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                        self.daysContainer.style.width = daysWidth + "px";
                        self.calendarContainer.style.width =
                            daysWidth +
                                (self.weekWrapper !== undefined
                                    ? self.weekWrapper.offsetWidth
                                    : 0) +
                                "px";
                        self.calendarContainer.style.removeProperty("visibility");
                        self.calendarContainer.style.removeProperty("display");
                    }
                });
            }
        }
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate === undefined ||
                    (0, dates_1.compareDates)(new Date(), self.config.minDate) >= 0
                    ? new Date()
                    : new Date(self.config.minDate.getTime());
                var defaults = (0, dates_1.getDefaultHours)(self.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self.selectedDates = [defaultDate];
                self.latestSelectedDateObj = defaultDate;
            }
            if (e !== undefined && e.type !== "blur") {
                timeWrapper(e);
            }
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) {
                self._debouncedChange();
            }
        }
        function ampm2military(hour, amPM) {
            return (hour % 12) + 12 * (0, utils_1.int)(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
                case 0:
                case 12:
                    return 12;
                default:
                    return hour % 12;
            }
        }
        function setHoursFromInputs() {
            if (self.hourElement === undefined || self.minuteElement === undefined)
                return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                ? (parseInt(self.secondElement.value, 10) || 0) % 60
                : 0;
            if (self.amPM !== undefined) {
                hours = ampm2military(hours, self.amPM.textContent);
            }
            var limitMinHours = self.config.minTime !== undefined ||
                (self.config.minDate &&
                    self.minDateHasTime &&
                    self.latestSelectedDateObj &&
                    (0, dates_1.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) ===
                        0);
            var limitMaxHours = self.config.maxTime !== undefined ||
                (self.config.maxDate &&
                    self.maxDateHasTime &&
                    self.latestSelectedDateObj &&
                    (0, dates_1.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) ===
                        0);
            if (self.config.maxTime !== undefined &&
                self.config.minTime !== undefined &&
                self.config.minTime > self.config.maxTime) {
                var minBound = (0, dates_1.calculateSecondsSinceMidnight)(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                var maxBound = (0, dates_1.calculateSecondsSinceMidnight)(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                var currentTime = (0, dates_1.calculateSecondsSinceMidnight)(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = (0, dates_1.parseSeconds)(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            }
            else {
                if (limitMaxHours) {
                    var maxTime = self.config.maxTime !== undefined
                        ? self.config.maxTime
                        : self.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours())
                        minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes())
                        seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self.config.minTime !== undefined
                        ? self.config.minTime
                        : self.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                        minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes())
                        seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date && date instanceof Date) {
                setHours(date.getHours(), date.getMinutes(), date.getSeconds());
            }
        }
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== undefined) {
                self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            }
            if (!self.hourElement || !self.minuteElement || self.isMobile)
                return;
            self.hourElement.value = (0, utils_1.pad)(!self.config.time_24hr
                ? ((12 + hours) % 12) + 12 * (0, utils_1.int)(hours % 12 === 0)
                : hours);
            self.minuteElement.value = (0, utils_1.pad)(minutes);
            if (self.amPM !== undefined)
                self.amPM.textContent = self.l10n.amPM[(0, utils_1.int)(hours >= 12)];
            if (self.secondElement !== undefined)
                self.secondElement.value = (0, utils_1.pad)(seconds);
        }
        function onYearInput(event) {
            var eventTarget = (0, dom_1.getEventTarget)(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1000 > 1 ||
                (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                changeYear(year);
            }
        }
        function bind(element, event, handler, options) {
            if (event instanceof Array)
                return event.forEach(function (ev) { return bind(element, ev, handler, options); });
            if (element instanceof Array)
                return element.forEach(function (el) { return bind(el, event, handler, options); });
            element.addEventListener(event, handler, options);
            self._handlers.push({
                remove: function () { return element.removeEventListener(event, handler, options); },
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        function bindEvents() {
            if (self.config.wrap) {
                ["open", "close", "toggle", "clear"].forEach(function (evt) {
                    Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                        return bind(el, "click", self[evt]);
                    });
                });
            }
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = (0, utils_1.debounce)(onResize, 50);
            self._debouncedChange = (0, utils_1.debounce)(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                bind(self.daysContainer, "mouseover", function (e) {
                    if (self.config.mode === "range")
                        onMouseOver((0, dom_1.getEventTarget)(e));
                });
            bind(self._input, "keydown", onKeyDown);
            if (self.calendarContainer !== undefined) {
                bind(self.calendarContainer, "keydown", onKeyDown);
            }
            if (!self.config.inline && !self.config.static)
                bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== undefined)
                bind(window.document, "touchstart", documentClick);
            else
                bind(window.document, "mousedown", documentClick);
            bind(window.document, "focus", documentClick, { capture: true });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "click", self.open);
            }
            if (self.daysContainer !== undefined) {
                bind(self.monthNav, "click", onMonthNavClick);
                bind(self.monthNav, ["keyup", "increment"], onYearInput);
                bind(self.daysContainer, "click", selectDate);
            }
            if (self.timeContainer !== undefined &&
                self.minuteElement !== undefined &&
                self.hourElement !== undefined) {
                var selText = function (e) {
                    return (0, dom_1.getEventTarget)(e).select();
                };
                bind(self.timeContainer, ["increment"], updateTime);
                bind(self.timeContainer, "blur", updateTime, { capture: true });
                bind(self.timeContainer, "click", timeIncrement);
                bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                if (self.secondElement !== undefined)
                    bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                if (self.amPM !== undefined) {
                    bind(self.amPM, "click", function (e) {
                        updateTime(e);
                    });
                }
            }
            if (self.config.allowInput) {
                bind(self._input, "blur", onBlur);
            }
        }
        function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== undefined
                ? self.parseDate(jumpDate)
                : self.latestSelectedDateObj ||
                    (self.config.minDate && self.config.minDate > self.now
                        ? self.config.minDate
                        : self.config.maxDate && self.config.maxDate < self.now
                            ? self.config.maxDate
                            : self.now);
            var oldYear = self.currentYear;
            var oldMonth = self.currentMonth;
            try {
                if (jumpTo !== undefined) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            }
            catch (e) {
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            if (triggerChange && self.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange &&
                (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                triggerEvent("onMonthChange");
            }
            self.redraw();
        }
        function timeIncrement(e) {
            var eventTarget = (0, dom_1.getEventTarget)(e);
            if (~eventTarget.className.indexOf("arrow"))
                incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        function incrementNumInput(e, delta, inputElem) {
            var target = e && (0, dom_1.getEventTarget)(e);
            var input = inputElem ||
                (target && target.parentNode && target.parentNode.firstChild);
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = (0, dom_1.createElement)("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = (0, dom_1.createElement)("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = (0, dom_1.createElement)("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = (0, dom_1.createElement)("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) {
                fragment.appendChild(buildTime());
            }
            (0, dom_1.toggleClass)(self.calendarContainer, "rangeMode", self.config.mode === "range");
            (0, dom_1.toggleClass)(self.calendarContainer, "animate", self.config.animate === true);
            (0, dom_1.toggleClass)(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== undefined &&
                self.config.appendTo.nodeType !== undefined;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) {
                    if (!customAppend && self.element.parentNode)
                        self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                    else if (self.config.appendTo !== undefined)
                        self.config.appendTo.appendChild(self.calendarContainer);
                }
                if (self.config.static) {
                    var wrapper = (0, dom_1.createElement)("div", "flatpickr-wrapper");
                    if (self.element.parentNode)
                        self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput)
                        wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline)
                (self.config.appendTo !== undefined
                    ? self.config.appendTo
                    : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, _dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = (0, dom_1.createElement)("span", className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 &&
                (0, dates_1.compareDates)(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        (0, dom_1.toggleClass)(dayElement, "startRange", self.selectedDates[0] &&
                            (0, dates_1.compareDates)(date, self.selectedDates[0], true) === 0);
                        (0, dom_1.toggleClass)(dayElement, "endRange", self.selectedDates[1] &&
                            (0, dates_1.compareDates)(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay")
                            dayElement.classList.add("inRange");
                    }
                }
            }
            else {
                dayElement.classList.add("flatpickr-disabled");
            }
            if (self.config.mode === "range") {
                if (isDateInRange(date) && !isDateSelected(date))
                    dayElement.classList.add("inRange");
            }
            if (self.weekNumbers &&
                self.config.showMonths === 1 &&
                className !== "prevMonthDay" &&
                i % 7 === 6) {
                self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            }
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                        return c;
                }
            }
            return undefined;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1
                ? current.dateObj.getMonth()
                : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m
                    ? current.$i + delta
                    : delta < 0
                        ? month.children.length - 1
                        : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 &&
                        isEnabled(c.dateObj) &&
                        Math.abs(current.$i - i) >= Math.abs(delta))
                        return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return undefined;
        }
        function focusOnDay(current, offset) {
            var activeElement = getClosestActiveElement();
            var dayFocused = isInView(activeElement || document.body);
            var startElem = current !== undefined
                ? current
                : dayFocused
                    ? activeElement
                    : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                        ? self.selectedDateElem
                        : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                            ? self.todayDateElem
                            : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === undefined) {
                self._input.focus();
            }
            else if (!dayFocused) {
                focusOnDayElem(startElem);
            }
            else {
                getNextAvailableDay(startElem, offset);
            }
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            }
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
            }
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            }
            var dayContainer = (0, dom_1.createElement)("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === undefined) {
                return;
            }
            (0, dom_1.clearNode)(self.daysContainer);
            if (self.weekNumbers)
                (0, dom_1.clearNode)(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) {
                onMouseOver();
            }
        }
        function buildMonthSwitch() {
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType !== "dropdown")
                return;
            var shouldBuildMonth = function (month) {
                if (self.config.minDate !== undefined &&
                    self.currentYear === self.config.minDate.getFullYear() &&
                    month < self.config.minDate.getMonth()) {
                    return false;
                }
                return !(self.config.maxDate !== undefined &&
                    self.currentYear === self.config.maxDate.getFullYear() &&
                    month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i))
                    continue;
                var month = (0, dom_1.createElement)("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = (0, formatting_1.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) {
                    month.selected = true;
                }
                self.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = (0, dom_1.createElement)("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                monthElement = (0, dom_1.createElement)("span", "cur-month");
            }
            else {
                self.monthsDropdownContainer = (0, dom_1.createElement)("select", "flatpickr-monthDropdown-months");
                self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                bind(self.monthsDropdownContainer, "change", function (e) {
                    var target = (0, dom_1.getEventTarget)(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self.changeMonth(selectedMonth - self.currentMonth);
                    triggerEvent("onMonthChange");
                });
                buildMonthSwitch();
                monthElement = self.monthsDropdownContainer;
            }
            var yearInput = (0, dom_1.createNumberInput)("cur-year", { tabindex: "-1" });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) {
                yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            }
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled =
                    !!self.config.minDate &&
                        self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = (0, dom_1.createElement)("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container: container,
                yearElement: yearElement,
                monthElement: monthElement,
            };
        }
        function buildMonths() {
            (0, dom_1.clearNode)(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--;) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = (0, dom_1.createElement)("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = (0, dom_1.createElement)("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = (0, dom_1.createElement)("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function () { return self.__hidePrevMonthArrow; },
                set: function (bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        (0, dom_1.toggleClass)(self.prevMonthNav, "flatpickr-disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                },
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function () { return self.__hideNextMonthArrow; },
                set: function (bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        (0, dom_1.toggleClass)(self.nextMonthNav, "flatpickr-disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                },
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar)
                self.calendarContainer.classList.add("noCalendar");
            var defaults = (0, dates_1.getDefaultHours)(self.config);
            self.timeContainer = (0, dom_1.createElement)("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = (0, dom_1.createElement)("span", "flatpickr-time-separator", ":");
            var hourInput = (0, dom_1.createNumberInput)("flatpickr-hour", {
                "aria-label": self.l10n.hourAriaLabel,
            });
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = (0, dom_1.createNumberInput)("flatpickr-minute", {
                "aria-label": self.l10n.minuteAriaLabel,
            });
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = (0, utils_1.pad)(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getHours()
                : self.config.time_24hr
                    ? defaults.hours
                    : military2ampm(defaults.hours));
            self.minuteElement.value = (0, utils_1.pad)(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getMinutes()
                : defaults.minutes);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.hourElement.setAttribute("maxlength", "2");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.minuteElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr)
                self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = (0, dom_1.createNumberInput)("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = (0, utils_1.pad)(self.latestSelectedDateObj
                    ? self.latestSelectedDateObj.getSeconds()
                    : defaults.seconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.secondElement.setAttribute("maxlength", "2");
                self.timeContainer.appendChild((0, dom_1.createElement)("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                self.amPM = (0, dom_1.createElement)("span", "flatpickr-am-pm", self.l10n.amPM[(0, utils_1.int)((self.latestSelectedDateObj
                    ? self.hourElement.value
                    : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer)
                self.weekdayContainer = (0, dom_1.createElement)("div", "flatpickr-weekdays");
            else
                (0, dom_1.clearNode)(self.weekdayContainer);
            for (var i = self.config.showMonths; i--;) {
                var container = (0, dom_1.createElement)("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self.weekdayContainer) {
                return;
            }
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            }
            for (var i = self.config.showMonths; i--;) {
                self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
        }
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = (0, dom_1.createElement)("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild((0, dom_1.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = (0, dom_1.createElement)("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers,
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) {
                isOffset = true;
            }
            var delta = isOffset ? value : value - self.currentMonth;
            if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                (delta > 0 && self._hideNextMonthArrow === true))
                return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) {
                triggerChangeEvent = true;
            }
            if (toInitial === void 0) {
                toInitial = true;
            }
            self.input.value = "";
            if (self.altInput !== undefined)
                self.altInput.value = "";
            if (self.mobileInput !== undefined)
                self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = undefined;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            if (self.config.enableTime === true) {
                var _a = (0, dates_1.getDefaultHours)(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self.redraw();
            if (triggerChangeEvent)
                triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.classList.remove("open");
                }
                if (self._input !== undefined) {
                    self._input.classList.remove("active");
                }
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== undefined)
                triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--;) {
                self._handlers[i].remove();
            }
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode)
                    self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = undefined;
            }
            else if (self.calendarContainer && self.calendarContainer.parentNode) {
                if (self.config.static && self.calendarContainer.parentNode) {
                    var wrapper = self.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while (wrapper.firstChild)
                            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                }
                else
                    self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            }
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode)
                    self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
            }
            [
                "_showTimeInput",
                "latestSelectedDateObj",
                "_hideNextMonthArrow",
                "_hidePrevMonthArrow",
                "__hideNextMonthArrow",
                "__hidePrevMonthArrow",
                "isMobile",
                "isOpen",
                "selectedDateElem",
                "minDateHasTime",
                "maxDateHasTime",
                "days",
                "daysContainer",
                "_input",
                "_positionElement",
                "innerContainer",
                "rContainer",
                "monthNav",
                "todayDateElem",
                "calendarContainer",
                "weekdayContainer",
                "prevMonthNav",
                "nextMonthNav",
                "monthsDropdownContainer",
                "currentMonthElement",
                "currentYearElement",
                "navigationCurrentMonth",
                "selectedDateElem",
                "config",
            ].forEach(function (k) {
                try {
                    delete self[k];
                }
                catch (_) { }
            });
        }
        function isCalendarElem(elem) {
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = (0, dom_1.getEventTarget)(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input ||
                    eventTarget_1 === self.altInput ||
                    self.element.contains(eventTarget_1) ||
                    (e.path &&
                        e.path.indexOf &&
                        (~e.path.indexOf(self.input) ||
                            ~e.path.indexOf(self.altInput)));
                var lostFocus = !isInput &&
                    !isCalendarElement &&
                    !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                    return elem.contains(eventTarget_1);
                });
                if (lostFocus && isIgnored) {
                    if (self.config.allowInput) {
                        self.setDate(self._input.value, false, self.config.altInput
                            ? self.config.altFormat
                            : self.config.dateFormat);
                    }
                    if (self.timeContainer !== undefined &&
                        self.minuteElement !== undefined &&
                        self.hourElement !== undefined &&
                        self.input.value !== "" &&
                        self.input.value !== undefined) {
                        updateTime();
                    }
                    self.close();
                    if (self.config &&
                        self.config.mode === "range" &&
                        self.selectedDates.length === 1)
                        self.clear(false);
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear ||
                (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate &&
                self.currentYear === self.config.maxDate.getFullYear()) {
                self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
            }
            else if (self.config.minDate &&
                self.currentYear === self.config.minDate.getFullYear()) {
                self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            }
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            var _a;
            if (timeless === void 0) {
                timeless = true;
            }
            var dateToCheck = self.parseDate(date, undefined, timeless);
            if ((self.config.minDate &&
                dateToCheck &&
                (0, dates_1.compareDates)(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                (self.config.maxDate &&
                    dateToCheck &&
                    (0, dates_1.compareDates)(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                return false;
            if (!self.config.enable && self.config.disable.length === 0)
                return true;
            if (dateToCheck === undefined)
                return false;
            var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" &&
                    d(dateToCheck))
                    return bool;
                else if (d instanceof Date &&
                    dateToCheck !== undefined &&
                    d.getTime() === dateToCheck.getTime())
                    return bool;
                else if (typeof d === "string") {
                    var parsed = self.parseDate(d, undefined, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime()
                        ? bool
                        : !bool;
                }
                else if (typeof d === "object" &&
                    dateToCheck !== undefined &&
                    d.from &&
                    d.to &&
                    dateToCheck.getTime() >= d.from.getTime() &&
                    dateToCheck.getTime() <= d.to.getTime())
                    return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== undefined)
                return (elem.className.indexOf("hidden") === -1 &&
                    elem.className.indexOf("flatpickr-disabled") === -1 &&
                    self.daysContainer.contains(elem));
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self._input;
            var valueChanged = self._input.value.trimEnd() !== getDateStr();
            if (isInput &&
                valueChanged &&
                !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
            }
        }
        function onKeyDown(e) {
            var eventTarget = (0, dom_1.getEventTarget)(e);
            var isInput = self.config.wrap
                ? element.contains(eventTarget)
                : eventTarget === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) {
                if (allowInput) {
                    self.setDate(self._input.value, true, eventTarget === self.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                    self.close();
                    return eventTarget.blur();
                }
                else {
                    self.open();
                }
            }
            else if (isCalendarElem(eventTarget) ||
                allowKeydown ||
                allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer &&
                    self.timeContainer.contains(eventTarget);
                switch (e.keyCode) {
                    case 13:
                        if (isTimeObj) {
                            e.preventDefault();
                            updateTime();
                            focusAndClose();
                        }
                        else
                            selectDate(e);
                        break;
                    case 27:
                        e.preventDefault();
                        focusAndClose();
                        break;
                    case 8:
                    case 46:
                        if (isInput && !self.config.allowInput) {
                            e.preventDefault();
                            self.clear();
                        }
                        break;
                    case 37:
                    case 39:
                        if (!isTimeObj && !isInput) {
                            e.preventDefault();
                            var activeElement = getClosestActiveElement();
                            if (self.daysContainer !== undefined &&
                                (allowInput === false ||
                                    (activeElement && isInView(activeElement)))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey)
                                    focusOnDay(undefined, delta_1);
                                else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        }
                        else if (self.hourElement)
                            self.hourElement.focus();
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if ((self.daysContainer &&
                            eventTarget.$i !== undefined) ||
                            eventTarget === self.input ||
                            eventTarget === self.altInput) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                            else if (!isTimeObj)
                                focusOnDay(undefined, delta * 7);
                        }
                        else if (eventTarget === self.currentYearElement) {
                            changeYear(self.currentYear - delta);
                        }
                        else if (self.config.enableTime) {
                            if (!isTimeObj && self.hourElement)
                                self.hourElement.focus();
                            updateTime(e);
                            self._debouncedChange();
                        }
                        break;
                    case 9:
                        if (isTimeObj) {
                            var elems = [
                                self.hourElement,
                                self.minuteElement,
                                self.secondElement,
                                self.amPM,
                            ]
                                .concat(self.pluginElements)
                                .filter(function (x) { return x; });
                            var i = elems.indexOf(eventTarget);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                e.preventDefault();
                                (target || self._input).focus();
                            }
                        }
                        else if (!self.config.noCalendar &&
                            self.daysContainer &&
                            self.daysContainer.contains(eventTarget) &&
                            e.shiftKey) {
                            e.preventDefault();
                            self._input.focus();
                        }
                        break;
                    default:
                        break;
                }
            }
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                switch (e.key) {
                    case self.l10n.amPM[0].charAt(0):
                    case self.l10n.amPM[0].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                        break;
                    case self.l10n.amPM[1].charAt(0):
                    case self.l10n.amPM[1].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                        break;
                }
            }
            if (isInput || isCalendarElem(eventTarget)) {
                triggerEvent("onKeyDown", e);
            }
        }
        function onMouseOver(elem, cellClass) {
            if (cellClass === void 0) {
                cellClass = "flatpickr-day";
            }
            if (self.selectedDates.length !== 1 ||
                (elem &&
                    (!elem.classList.contains(cellClass) ||
                        elem.classList.contains("flatpickr-disabled"))))
                return;
            var hoverDate = elem
                ? elem.dateObj.getTime()
                : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < rangeEndDate; t += dates_1.duration.DAY) {
                if (!isEnabled(new Date(t), true)) {
                    containsDisabled =
                        containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                    if (t < initialDate && (!minRange || t > minRange))
                        minRange = t;
                    else if (t > initialDate && (!maxRange || t < maxRange))
                        maxRange = t;
                }
            }
            var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
            hoverableCells.forEach(function (dayElem) {
                var date = dayElem.dateObj;
                var timestamp = date.getTime();
                var outOfRange = (minRange > 0 && timestamp < minRange) ||
                    (maxRange > 0 && timestamp > maxRange);
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    ["inRange", "startRange", "endRange"].forEach(function (c) {
                        dayElem.classList.remove(c);
                    });
                    return;
                }
                else if (containsDisabled && !outOfRange)
                    return;
                ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                if (elem !== undefined) {
                    elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                        ? "startRange"
                        : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate)
                        dayElem.classList.add("startRange");
                    else if (initialDate > hoverDate && timestamp === initialDate)
                        dayElem.classList.add("endRange");
                    if (timestamp >= minRange &&
                        (maxRange === 0 || timestamp <= maxRange) &&
                        (0, dates_1.isBetween)(timestamp, initialDate, hoverDate))
                        dayElem.classList.add("inRange");
                }
            });
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline)
                positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) {
                positionElement = self._positionElement;
            }
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = (0, dom_1.getEventTarget)(e);
                    if (eventTarget) {
                        eventTarget.blur();
                    }
                }
                if (self.mobileInput !== undefined) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            }
            else if (self._input.disabled || self.config.inline) {
                return;
            }
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) {
                if (self.config.allowInput === false &&
                    (e === undefined ||
                        !self.timeContainer.contains(e.relatedTarget))) {
                    setTimeout(function () { return self.hourElement.select(); }, 50);
                }
            }
        }
        function minMaxDateSetter(type) {
            return function (date) {
                var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== undefined) {
                    self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                        dateObj.getHours() > 0 ||
                            dateObj.getMinutes() > 0 ||
                            dateObj.getSeconds() > 0;
                }
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                    if (!self.selectedDates.length && type === "min")
                        setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== undefined)
                        self.currentYearElement[type] = dateObj.getFullYear().toString();
                    else
                        self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled =
                        !!inverseDateObj &&
                            dateObj !== undefined &&
                            inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "allowInvalidPreload",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile",
            ];
            var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function () { return self.config._enable; },
                set: function (dates) {
                    self.config._enable = parseDateRules(dates);
                },
            });
            Object.defineProperty(self.config, "disable", {
                get: function () { return self.config._disable; },
                set: function (dates) {
                    self.config._disable = parseDateRules(dates);
                },
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || options_1.defaults.dateFormat;
                formats.dateFormat =
                    userConfig.noCalendar || timeMode
                        ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                        : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput &&
                (userConfig.enableTime || timeMode) &&
                !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || options_1.defaults.altFormat;
                formats.altFormat =
                    userConfig.noCalendar || timeMode
                        ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                        : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
            }
            Object.defineProperty(self.config, "minDate", {
                get: function () { return self.config._minDate; },
                set: minMaxDateSetter("min"),
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function () { return self.config._maxDate; },
                set: minMaxDateSetter("max"),
            });
            var minMaxTimeSetter = function (type) {
                return function (val) {
                    self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
                };
            };
            Object.defineProperty(self.config, "minTime", {
                get: function () { return self.config._minTime; },
                set: minMaxTimeSetter("min"),
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function () { return self.config._maxTime; },
                set: minMaxTimeSetter("max"),
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++)
                self.config[boolOpts[i]] =
                    self.config[boolOpts[i]] === true ||
                        self.config[boolOpts[i]] === "true";
            options_1.HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                self.config[hook] = (0, utils_1.arrayify)(self.config[hook] || []).map(bindToInstance);
            });
            self.isMobile =
                !self.config.disableMobile &&
                    !self.config.inline &&
                    self.config.mode === "single" &&
                    !self.config.disable.length &&
                    !self.config.enable &&
                    !self.config.weekNumbers &&
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (var i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) {
                    if (options_1.HOOKS.indexOf(key) > -1) {
                        self.config[key] = (0, utils_1.arrayify)(pluginConf[key])
                            .map(bindToInstance)
                            .concat(self.config[key]);
                    }
                    else if (typeof userConfig[key] === "undefined")
                        self.config[key] = pluginConf[key];
                }
            }
            if (!userConfig.altInputClass) {
                self.config.altInputClass =
                    getInputElem().className + " " + self.config.altInputClass;
            }
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self.config.wrap
                ? element.querySelector("[data-input]")
                : element;
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" &&
                typeof flatpickr.l10ns[self.config.locale] === "undefined")
                self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
                ? self.config.locale
                : self.config.locale !== "default"
                    ? flatpickr.l10ns[self.config.locale]
                    : undefined));
            formatting_1.tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
            formatting_1.tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
            formatting_1.tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
            formatting_1.tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
            formatting_1.tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === undefined &&
                flatpickr.defaultConfig.time_24hr === undefined) {
                self.config.time_24hr = self.l10n.time_24hr;
            }
            self.formatDate = (0, dates_1.createDateFormatter)(self);
            self.parseDate = (0, dates_1.createDateParser)({ config: self.config, l10n: self.l10n });
        }
        function positionCalendar(customPositionElement) {
            if (typeof self.config.position === "function") {
                return void self.config.position(self, customPositionElement);
            }
            if (self.calendarContainer === undefined)
                return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                (configPosVertical !== "below" &&
                    distanceFromBottom < calendarHeight &&
                    inputBounds.top > calendarHeight);
            var top = window.pageYOffset +
                inputBounds.top +
                (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            (0, dom_1.toggleClass)(self.calendarContainer, "arrowTop", !showOnTop);
            (0, dom_1.toggleClass)(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline)
                return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            }
            else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            (0, dom_1.toggleClass)(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
            (0, dom_1.toggleClass)(self.calendarContainer, "arrowCenter", isCenter);
            (0, dom_1.toggleClass)(self.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth -
                (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            (0, dom_1.toggleClass)(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static)
                return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            }
            else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            }
            else {
                var doc = getDocumentStyleSheet();
                if (doc === undefined)
                    return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                (0, dom_1.toggleClass)(self.calendarContainer, "rightMost", false);
                (0, dom_1.toggleClass)(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (!sheet.cssRules)
                    continue;
                try {
                    sheet.cssRules;
                }
                catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile)
                return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                navigator.msMaxTouchPoints !== undefined) {
                setTimeout(self.close, 0);
            }
            else {
                self.close();
            }
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function (day) {
                return day.classList &&
                    day.classList.contains("flatpickr-day") &&
                    !day.classList.contains("flatpickr-disabled") &&
                    !day.classList.contains("notAllowed");
            };
            var t = (0, dom_1.findParent)((0, dom_1.getEventTarget)(e), isSelectable);
            if (t === undefined)
                return;
            var target = t;
            var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                selectedDate.getMonth() >
                    self.currentMonth + self.config.showMonths - 1) &&
                self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single")
                self.selectedDates = [selectedDate];
            else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex)
                    self.selectedDates.splice(parseInt(selectedIndex), 1);
                else
                    self.selectedDates.push(selectedDate);
            }
            else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) {
                    self.clear(false, false);
                }
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                if ((0, dates_1.compareDates)(selectedDate, self.selectedDates[0], true) !== 0)
                    self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            if (!shouldChangeMonth &&
                self.config.mode !== "range" &&
                self.config.showMonths === 1)
                focusOnDayElem(target);
            else if (self.selectedDateElem !== undefined &&
                self.hourElement === undefined) {
                self.selectedDateElem && self.selectedDateElem.focus();
            }
            if (self.hourElement !== undefined)
                self.hourElement !== undefined && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" &&
                    self.selectedDates.length === 2 &&
                    !self.config.enableTime;
                if (single || range) {
                    focusAndClose();
                }
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [setupLocale, updateWeekdays],
            showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
            minDate: [jumpToDate],
            maxDate: [jumpToDate],
            positionElement: [updatePositionElement],
            clickOpens: [
                function () {
                    if (self.config.clickOpens === true) {
                        bind(self._input, "focus", self.open);
                        bind(self._input, "click", self.open);
                    }
                    else {
                        self._input.removeEventListener("focus", self.open);
                        self._input.removeEventListener("click", self.open);
                    }
                },
            ],
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self.config, option);
                for (var key in option) {
                    if (CALLBACKS[key] !== undefined)
                        CALLBACKS[key].forEach(function (x) { return x(); });
                }
            }
            else {
                self.config[option] = value;
                if (CALLBACKS[option] !== undefined)
                    CALLBACKS[option].forEach(function (x) { return x(); });
                else if (options_1.HOOKS.indexOf(option) > -1)
                    self.config[option] = (0, utils_1.arrayify)(value);
            }
            self.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array)
                dates = inputDate.map(function (d) { return self.parseDate(d, format); });
            else if (inputDate instanceof Date || typeof inputDate === "number")
                dates = [self.parseDate(inputDate, format)];
            else if (typeof inputDate === "string") {
                switch (self.config.mode) {
                    case "single":
                    case "time":
                        dates = [self.parseDate(inputDate, format)];
                        break;
                    case "multiple":
                        dates = inputDate
                            .split(self.config.conjunction)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    case "range":
                        dates = inputDate
                            .split(self.l10n.rangeSeparator)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    default:
                        break;
                }
            }
            else
                self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = (self.config.allowInvalidPreload
                ? dates
                : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
            if (self.config.mode === "range")
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) {
                triggerChange = false;
            }
            if (format === void 0) {
                format = self.config.dateFormat;
            }
            if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.latestSelectedDateObj =
                self.selectedDates[self.selectedDates.length - 1];
            self.redraw();
            jumpToDate(undefined, triggerChange);
            setHoursFromDate();
            if (self.selectedDates.length === 0) {
                self.clear(false);
            }
            updateValue(triggerChange);
            if (triggerChange)
                triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr
                .slice()
                .map(function (rule) {
                if (typeof rule === "string" ||
                    typeof rule === "number" ||
                    rule instanceof Date) {
                    return self.parseDate(rule, undefined, true);
                }
                else if (rule &&
                    typeof rule === "object" &&
                    rule.from &&
                    rule.to)
                    return {
                        from: self.parseDate(rule.from, undefined),
                        to: self.parseDate(rule.to, undefined),
                    };
                return rule;
            })
                .filter(function (x) { return x; });
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date();
            var preloadedDate = self.config.defaultDate ||
                ((self.input.nodeName === "INPUT" ||
                    self.input.nodeName === "TEXTAREA") &&
                    self.input.placeholder &&
                    self.input.value === self.input.placeholder
                    ? null
                    : self.input.value);
            if (preloadedDate)
                setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate =
                self.selectedDates.length > 0
                    ? self.selectedDates[0]
                    : self.config.minDate &&
                        self.config.minDate.getTime() > self.now.getTime()
                        ? self.config.minDate
                        : self.config.maxDate &&
                            self.config.maxDate.getTime() < self.now.getTime()
                            ? self.config.maxDate
                            : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0)
                self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== undefined)
                self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== undefined)
                self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime =
                !!self.config.minDate &&
                    (self.config.minDate.getHours() > 0 ||
                        self.config.minDate.getMinutes() > 0 ||
                        self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime =
                !!self.config.maxDate &&
                    (self.config.maxDate.getHours() > 0 ||
                        self.config.maxDate.getMinutes() > 0 ||
                        self.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self.input = getInputElem();
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                self.altInput = (0, dom_1.createElement)(self.input.nodeName, self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode)
                    self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput)
                self._input.setAttribute("readonly", "readonly");
            updatePositionElement();
        }
        function updatePositionElement() {
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime
                ? self.config.noCalendar
                    ? "time"
                    : "datetime-local"
                : "date";
            self.mobileInput = (0, dom_1.createElement)("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr =
                inputType === "datetime-local"
                    ? "Y-m-d\\TH:i:S"
                    : inputType === "date"
                        ? "Y-m-d"
                        : "H:i:S";
            if (self.selectedDates.length > 0) {
                self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            }
            if (self.config.minDate)
                self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate)
                self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            if (self.input.getAttribute("step"))
                self.mobileInput.step = String(self.input.getAttribute("step"));
            self.input.type = "hidden";
            if (self.altInput !== undefined)
                self.altInput.type = "hidden";
            try {
                if (self.input.parentNode)
                    self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            }
            catch (_a) { }
            bind(self.mobileInput, "change", function (e) {
                self.setDate((0, dom_1.getEventTarget)(e).value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            });
        }
        function toggle(e) {
            if (self.isOpen === true)
                return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            if (self.config === undefined)
                return;
            var hooks = self.config[event];
            if (hooks !== undefined && hooks.length > 0) {
                for (var i = 0; hooks[i] && i < hooks.length; i++)
                    hooks[i](self.selectedDates, self.input.value, self, data);
            }
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                var selectedDate = self.selectedDates[i];
                if (selectedDate instanceof Date &&
                    (0, dates_1.compareDates)(selectedDate, date) === 0)
                    return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2)
                return false;
            return ((0, dates_1.compareDates)(date, self.selectedDates[0]) >= 0 &&
                (0, dates_1.compareDates)(date, self.selectedDates[1]) <= 0);
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav)
                return;
            self.yearElements.forEach(function (yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                if (self.config.showMonths > 1 ||
                    self.config.monthSelectorType === "static") {
                    self.monthElements[i].textContent =
                        (0, formatting_1.monthToStr)(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                }
                else {
                    self.monthsDropdownContainer.value = d.getMonth().toString();
                }
                yearElement.value = d.getFullYear().toString();
            });
            self._hidePrevMonthArrow =
                self.config.minDate !== undefined &&
                    (self.currentYear === self.config.minDate.getFullYear()
                        ? self.currentMonth <= self.config.minDate.getMonth()
                        : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow =
                self.config.maxDate !== undefined &&
                    (self.currentYear === self.config.maxDate.getFullYear()
                        ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                        : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(specificFormat) {
            var format = specificFormat ||
                (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
            return self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, format); })
                .filter(function (d, i, arr) {
                return self.config.mode !== "range" ||
                    self.config.enableTime ||
                    arr.indexOf(d) === i;
            })
                .join(self.config.mode !== "range"
                ? self.config.conjunction
                : self.l10n.rangeSeparator);
        }
        function updateValue(triggerChange) {
            if (triggerChange === void 0) {
                triggerChange = true;
            }
            if (self.mobileInput !== undefined && self.mobileFormatStr) {
                self.mobileInput.value =
                    self.latestSelectedDateObj !== undefined
                        ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                        : "";
            }
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== undefined) {
                self.altInput.value = getDateStr(self.config.altFormat);
            }
            if (triggerChange !== false)
                triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = (0, dom_1.getEventTarget)(e);
            var isPrevMonth = self.prevMonthNav.contains(eventTarget);
            var isNextMonth = self.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) {
                changeMonth(isPrevMonth ? -1 : 1);
            }
            else if (self.yearElements.indexOf(eventTarget) >= 0) {
                eventTarget.select();
            }
            else if (eventTarget.classList.contains("arrowUp")) {
                self.changeYear(self.currentYear + 1);
            }
            else if (eventTarget.classList.contains("arrowDown")) {
                self.changeYear(self.currentYear - 1);
            }
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = (0, dom_1.getEventTarget)(e), input = eventTarget;
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                self.amPM.textContent =
                    self.l10n.amPM[(0, utils_1.int)(self.amPM.textContent === self.l10n.amPM[0])];
            }
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue =
                        max +
                            newValue +
                            (0, utils_1.int)(!isHourElem) +
                            ((0, utils_1.int)(isHourElem) && (0, utils_1.int)(!self.amPM));
                    if (isMinuteElem)
                        incrementNumInput(undefined, -1, self.hourElement);
                }
                else if (newValue > max) {
                    newValue =
                        input === self.hourElement ? newValue - max - (0, utils_1.int)(!self.amPM) : min;
                    if (isMinuteElem)
                        incrementNumInput(undefined, 1, self.hourElement);
                }
                if (self.amPM &&
                    isHourElem &&
                    (step === 1
                        ? newValue + curValue === 23
                        : Math.abs(newValue - curValue) > step)) {
                    self.amPM.textContent =
                        self.l10n.amPM[(0, utils_1.int)(self.amPM.textContent === self.l10n.amPM[0])];
                }
                input.value = (0, utils_1.pad)(newValue);
            }
        }
        init();
        return self;
    }
    function _flatpickr(nodeList, config) {
        var nodes = Array.prototype.slice
            .call(nodeList)
            .filter(function (x) { return x instanceof HTMLElement; });
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null)
                    continue;
                if (node._flatpickr !== undefined) {
                    node._flatpickr.destroy();
                    node._flatpickr = undefined;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    if (typeof HTMLElement !== "undefined" &&
        typeof HTMLCollection !== "undefined" &&
        typeof NodeList !== "undefined") {
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function (config) {
            return _flatpickr([this], config);
        };
    }
    var flatpickr = function (selector, config) {
        if (typeof selector === "string") {
            return _flatpickr(window.document.querySelectorAll(selector), config);
        }
        else if (selector instanceof Node) {
            return _flatpickr([selector], config);
        }
        else {
            return _flatpickr(selector, config);
        }
    };
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: __assign({}, default_1.default),
        default: __assign({}, default_1.default),
    };
    flatpickr.localize = function (l10n) {
        flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function (config) {
        flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = (0, dates_1.createDateParser)({});
    flatpickr.formatDate = (0, dates_1.createDateFormatter)({});
    flatpickr.compareDates = dates_1.compareDates;
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
        jQuery.fn.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
    }
    Date.prototype.fp_incr = function (days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") {
        window.flatpickr = flatpickr;
    }
    exports.default = flatpickr;
},
624: /* flatpickr/dist/esm/types/options.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.HOOKS = [
        "onChange",
        "onClose",
        "onDayCreate",
        "onDestroy",
        "onKeyDown",
        "onMonthChange",
        "onOpen",
        "onParseConfig",
        "onReady",
        "onValueUpdate",
        "onYearChange",
        "onPreCalendarPosition",
    ];
    exports.defaults = {
        _disable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" &&
            window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enableSeconds: false,
        enableTime: false,
        errorHandler: function (err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function (givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
            var week1 = new Date(date.getFullYear(), 0, 4);
            return (1 +
                Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7));
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false,
    };
},
625: /* flatpickr/dist/esm/l10n/default.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.english = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function (nth) {
            var s = nth % 100;
            if (s > 3 && s < 21)
                return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false,
    };
    exports.default = exports.english;
},
626: /* flatpickr/dist/esm/utils/index.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.debounce = debounce;
    var pad = function (number, length) {
        if (length === void 0) {
            length = 2;
        }
        return ("000" + number).slice(length * -1);
    };
    exports.pad = pad;
    var int = function (bool) { return (bool === true ? 1 : 0); };
    exports.int = int;
    function debounce(fn, wait) {
        var t;
        return function () {
            var _this = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout(function () { return fn.apply(_this, args); }, wait);
        };
    }
    var arrayify = function (obj) {
        return obj instanceof Array ? obj : [obj];
    };
    exports.arrayify = arrayify;
},
627: /* flatpickr/dist/esm/utils/dom.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.toggleClass = toggleClass;
    exports.createElement = createElement;
    exports.clearNode = clearNode;
    exports.findParent = findParent;
    exports.createNumberInput = createNumberInput;
    exports.getEventTarget = getEventTarget;
    function toggleClass(elem, className, bool) {
        if (bool === true)
            return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined)
            e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild)
            node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node))
            return node;
        else if (node.parentNode)
            return findParent(node.parentNode, condition);
        return undefined;
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
            numInput.type = "number";
        }
        else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== undefined)
            for (var key in opts)
                numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        }
        catch (error) {
            return event.target;
        }
    }
},
628: /* flatpickr/dist/esm/utils/dates.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.compareDates = compareDates;
    exports.compareTimes = compareTimes;
    exports.getDefaultHours = getDefaultHours;
    const formatting_1 = require(629) /* ./formatting */;
    const options_1 = require(624) /* ../types/options */;
    const default_1 = require(625) /* ../l10n/default */;
    var createDateFormatter = function (_a) {
        var _b = _a.config, config = _b === void 0 ? options_1.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? default_1.english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function (dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== undefined && !isMobile) {
                return config.formatDate(dateObj, frmt, locale);
            }
            return frmt
                .split("")
                .map(function (c, i, arr) {
                return formatting_1.formats[c] && arr[i - 1] !== "\\"
                    ? formatting_1.formats[c](dateObj, locale, config)
                    : c !== "\\"
                        ? c
                        : "";
            })
                .join("");
        };
    };
    exports.createDateFormatter = createDateFormatter;
    var createDateParser = function (_a) {
        var _b = _a.config, config = _b === void 0 ? options_1.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? default_1.english : _c;
        return function (date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date)
                return undefined;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date)
                parsedDate = new Date(date.getTime());
            else if (typeof date !== "string" &&
                date.toFixed !== undefined)
                parsedDate = new Date(date);
            else if (typeof date === "string") {
                var format = givenFormat || (config || options_1.defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date();
                    timeless = true;
                }
                else if (config && config.parseDate) {
                    parsedDate = config.parseDate(date, format);
                }
                else if (/Z$/.test(datestr) ||
                    /GMT$/.test(datestr)) {
                    parsedDate = new Date(date);
                }
                else {
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token = format[i];
                        var isBackSlash = token === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (formatting_1.tokenRegex[token] && !escaped) {
                            regexStr += formatting_1.tokenRegex[token];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) {
                                ops[token !== "Y" ? "push" : "unshift"]({
                                    fn: formatting_1.revFormat[token],
                                    val: match[++matchIndex],
                                });
                            }
                        }
                        else if (!isBackSlash)
                            regexStr += ".";
                    }
                    parsedDate =
                        !config || !config.noCalendar
                            ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                            : new Date(new Date().setHours(0, 0, 0, 0));
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                    });
                    parsedDate = matched ? parsedDate : undefined;
                }
            }
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return undefined;
            }
            if (timeless === true)
                parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    exports.createDateParser = createDateParser;
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) {
            timeless = true;
        }
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    function compareTimes(date1, date2) {
        return (3600 * (date1.getHours() - date2.getHours()) +
            60 * (date1.getMinutes() - date2.getMinutes()) +
            date1.getSeconds() -
            date2.getSeconds());
    }
    var isBetween = function (ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    exports.isBetween = isBetween;
    var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    };
    exports.calculateSecondsSinceMidnight = calculateSecondsSinceMidnight;
    var parseSeconds = function (secondsSinceMidnight) {
        var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
        return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
    };
    exports.parseSeconds = parseSeconds;
    exports.duration = {
        DAY: 86400000,
    };
    function getDefaultHours(config) {
        var hours = config.defaultHour;
        var minutes = config.defaultMinute;
        var seconds = config.defaultSeconds;
        if (config.minDate !== undefined) {
            var minHour = config.minDate.getHours();
            var minMinutes = config.minDate.getMinutes();
            var minSeconds = config.minDate.getSeconds();
            if (hours < minHour) {
                hours = minHour;
            }
            if (hours === minHour && minutes < minMinutes) {
                minutes = minMinutes;
            }
            if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
                seconds = config.minDate.getSeconds();
        }
        if (config.maxDate !== undefined) {
            var maxHr = config.maxDate.getHours();
            var maxMinutes = config.maxDate.getMinutes();
            hours = Math.min(hours, maxHr);
            if (hours === maxHr)
                minutes = Math.min(maxMinutes, minutes);
            if (hours === maxHr && minutes === maxMinutes)
                seconds = config.maxDate.getSeconds();
        }
        return { hours: hours, minutes: minutes, seconds: seconds };
    }
},
629: /* flatpickr/dist/esm/utils/formatting.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const utils_1 = require(626) /* ../utils */;
    var doNothing = function () { return undefined; };
    var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
    exports.monthToStr = monthToStr;
    exports.revFormat = {
        D: doNothing,
        F: function (dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function (dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        H: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function (dateObj, amPM, locale) {
            dateObj.setHours((dateObj.getHours() % 12) +
                12 * (0, utils_1.int)(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function (dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
        W: function (dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function (dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function (_, ISODate) { return new Date(ISODate); },
        d: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function (dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        i: function (dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function (_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function (dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        },
    };
    exports.tokenRegex = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})",
    };
    exports.formats = {
        Z: function (date) { return date.toISOString(); },
        D: function (date, locale, options) {
            return locale.weekdays.shorthand[exports.formats.w(date, locale, options)];
        },
        F: function (date, locale, options) {
            return (0, exports.monthToStr)(exports.formats.n(date, locale, options) - 1, false, locale);
        },
        G: function (date, locale, options) {
            return (0, utils_1.pad)(exports.formats.h(date, locale, options));
        },
        H: function (date) { return (0, utils_1.pad)(date.getHours()); },
        J: function (date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        K: function (date, locale) { return locale.amPM[(0, utils_1.int)(date.getHours() > 11)]; },
        M: function (date, locale) {
            return (0, exports.monthToStr)(date.getMonth(), true, locale);
        },
        S: function (date) { return (0, utils_1.pad)(date.getSeconds()); },
        U: function (date) { return date.getTime() / 1000; },
        W: function (date, _, options) {
            return options.getWeek(date);
        },
        Y: function (date) { return (0, utils_1.pad)(date.getFullYear(), 4); },
        d: function (date) { return (0, utils_1.pad)(date.getDate()); },
        h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
        i: function (date) { return (0, utils_1.pad)(date.getMinutes()); },
        j: function (date) { return date.getDate(); },
        l: function (date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        m: function (date) { return (0, utils_1.pad)(date.getMonth() + 1); },
        n: function (date) { return date.getMonth() + 1; },
        s: function (date) { return date.getSeconds(); },
        u: function (date) { return date.getTime(); },
        w: function (date) { return date.getDay(); },
        y: function (date) { return String(date.getFullYear()).substring(2); },
    };
},
630: /* flatpickr/dist/esm/utils/polyfills.js */ function _(require, module, exports, __esModule, __esExport) {
    if (typeof Object.assign !== "function") {
        Object.assign = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!target) {
                throw TypeError("Cannot convert undefined or null to object");
            }
            var _loop_1 = function (source) {
                if (source) {
                    Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                }
            };
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var source = args_1[_a];
                _loop_1(source);
            }
            return target;
        };
    }
},
631: /* styles/widgets/flatpickr.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0, 0, 0, 0.08);box-shadow:1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0, 0, 0, 0.08);}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible;}.flatpickr-calendar.open{display:inline-block;z-index:99999;}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);}.flatpickr-calendar.inline{display:block;position:relative;top:2px;}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px);}.flatpickr-calendar.static.open{z-index:999;display:block;}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important;}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0;}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0;}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6;}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto;}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px;}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px;}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%;}.flatpickr-calendar:before{border-width:5px;margin:0 -5px;}.flatpickr-calendar:after{border-width:4px;margin:0 -4px;}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%;}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6;}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff;}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%;}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6;}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff;}.flatpickr-calendar:focus{outline:0;}.flatpickr-wrapper{position:relative;display:inline-block;}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.flatpickr-months .flatpickr-month{background:transparent;color:rgba(0, 0, 0, 0.9);fill:rgba(0, 0, 0, 0.9);height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:rgba(0, 0, 0, 0.9);fill:rgba(0, 0, 0, 0.9);}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none;}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative;}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0;}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0;}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9;}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747;}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px;}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill 0.1s;transition:fill 0.1s;fill:inherit;}.numInputWrapper{position:relative;height:auto;}.numInputWrapper input,.numInputWrapper span{display:inline-block;}.numInputWrapper input{width:100%;}.numInputWrapper input::-ms-clear{display:none;}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none;}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57, 57, 57, 0.15);-webkit-box-sizing:border-box;box-sizing:border-box;}.numInputWrapper span:hover{background:rgba(0, 0, 0, 0.1);}.numInputWrapper span:active{background:rgba(0, 0, 0, 0.2);}.numInputWrapper span:after{display:block;content:"";position:absolute;}.numInputWrapper span.arrowUp{top:0;border-bottom:0;}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57, 57, 57, 0.6);top:26%;}.numInputWrapper span.arrowDown{top:50%;}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57, 57, 57, 0.6);top:40%;}.numInputWrapper span svg{width:inherit;height:auto;}.numInputWrapper span svg path{fill:rgba(0, 0, 0, 0.5);}.numInputWrapper:hover{background:rgba(0, 0, 0, 0.05);}.numInputWrapper:hover span{opacity:1;}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px);}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:0.5ch;padding:0;}.flatpickr-current-month span.cur-month:hover{background:rgba(0, 0, 0, 0.05);}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\0;display:inline-block;}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0, 0, 0, 0.9);}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0, 0, 0, 0.9);}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 0.5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;}.flatpickr-current-month input.cur-year:focus{outline:0;}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0, 0, 0, 0.5);background:transparent;pointer-events:none;}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 0.5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto;}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none;}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0, 0, 0, 0.05);}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0;}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px;}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:rgba(0, 0, 0, 0.54);line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder;}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0;}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px;}.flatpickr-days:focus{outline:0;}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px);opacity:1;}.dayContainer + .dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 0 #e6e6e6;}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center;}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6;}.flatpickr-day.today{border-color:#959ea9;}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff;}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7;}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px;}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0;}.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 0 #569ff7;}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px;}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;box-shadow:-5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(57, 57, 57, 0.3);background:transparent;border-color:transparent;cursor:default;}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(57, 57, 57, 0.1);}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7, 5px 0 0 #569ff7;box-shadow:-5px 0 0 #569ff7, 5px 0 0 #569ff7;}.flatpickr-day.hidden{visibility:hidden;}.rangeMode .flatpickr-day{margin-top:1px;}.flatpickr-weekwrapper{float:left;}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 0 #e6e6e6;}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px;}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(57, 57, 57, 0.3);background:transparent;cursor:default;border:none;}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.flatpickr-time:after{content:"";display:table;clear:both;}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left;}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939;}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939;}.flatpickr-time.hasSeconds .numInputWrapper{width:26%;}.flatpickr-time.time24hr .numInputWrapper{width:49%;}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;}.flatpickr-time input.flatpickr-hour{font-weight:bold;}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400;}.flatpickr-time input:focus{outline:0;border:0;}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400;}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee;}.flatpickr-input[readonly]{cursor:pointer;}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0);}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0);}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);}}.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-box-shadow:0 3px 13px rgba(0, 0, 0, 0.08);box-shadow:0 3px 13px rgba(0, 0, 0, 0.08);}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible;}.flatpickr-calendar.open{display:inline-block;z-index:99999;}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);animation:fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);}.flatpickr-calendar.inline{display:block;position:relative;top:2px;}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px);}.flatpickr-calendar.static.open{z-index:999;display:block;}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none !important;box-shadow:none !important;}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;box-shadow:-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0;}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0;}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #eceef1;}.flatpickr-calendar.hasTime .flatpickr-innerContainer{border-bottom:0;}.flatpickr-calendar.hasTime .flatpickr-time{border:1px solid #eceef1;}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto;}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px;}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px;}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%;}.flatpickr-calendar:before{border-width:5px;margin:0 -5px;}.flatpickr-calendar:after{border-width:4px;margin:0 -4px;}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%;}.flatpickr-calendar.arrowTop:before{border-bottom-color:#eceef1;}.flatpickr-calendar.arrowTop:after{border-bottom-color:#eceef1;}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%;}.flatpickr-calendar.arrowBottom:before{border-top-color:#eceef1;}.flatpickr-calendar.arrowBottom:after{border-top-color:#eceef1;}.flatpickr-calendar:focus{outline:0;}.flatpickr-wrapper{position:relative;display:inline-block;}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.flatpickr-months .flatpickr-month{border-radius:5px 5px 0 0;background:#eceef1;color:#5a6171;fill:#5a6171;height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:#5a6171;fill:#5a6171;}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none;}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative;}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0;}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0;}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#bbb;}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747;}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px;}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill 0.1s;transition:fill 0.1s;fill:inherit;}.numInputWrapper{position:relative;height:auto;}.numInputWrapper input,.numInputWrapper span{display:inline-block;}.numInputWrapper input{width:100%;}.numInputWrapper input::-ms-clear{display:none;}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none;}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(72, 72, 72, 0.15);-webkit-box-sizing:border-box;box-sizing:border-box;}.numInputWrapper span:hover{background:rgba(0, 0, 0, 0.1);}.numInputWrapper span:active{background:rgba(0, 0, 0, 0.2);}.numInputWrapper span:after{display:block;content:"";position:absolute;}.numInputWrapper span.arrowUp{top:0;border-bottom:0;}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(72, 72, 72, 0.6);top:26%;}.numInputWrapper span.arrowDown{top:50%;}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(72, 72, 72, 0.6);top:40%;}.numInputWrapper span svg{width:inherit;height:auto;}.numInputWrapper span svg path{fill:rgba(90, 97, 113, 0.5);}.numInputWrapper:hover{background:rgba(0, 0, 0, 0.05);}.numInputWrapper:hover span{opacity:1;}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px);}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:0.5ch;padding:0;}.flatpickr-current-month span.cur-month:hover{background:rgba(0, 0, 0, 0.05);}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\0;display:inline-block;}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:#5a6171;}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:#5a6171;}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 0.5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;}.flatpickr-current-month input.cur-year:focus{outline:0;}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(90, 97, 113, 0.5);background:transparent;pointer-events:none;}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:#eceef1;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:none;padding:0 0 0 0.5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto;}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none;}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(0, 0, 0, 0.05);}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:#eceef1;outline:none;padding:0;}.flatpickr-weekdays{background:#eceef1;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px;}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}span.flatpickr-weekday{cursor:default;font-size:90%;background:#eceef1;color:#5a6171;line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder;}.dayContainer,.flatpickr-weeks{padding:1px 0 0 0;}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px;border-left:1px solid #eceef1;border-right:1px solid #eceef1;}.flatpickr-days:focus{outline:0;}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px, 0px, 0px);transform:translate3d(0px, 0px, 0px);opacity:1;}.dayContainer + .dayContainer{-webkit-box-shadow:-1px 0 0 #eceef1;box-shadow:-1px 0 0 #eceef1;}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#484848;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center;}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e2e2e2;border-color:#e2e2e2;}.flatpickr-day.today{border-color:#bbb;}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#bbb;background:#bbb;color:#fff;}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#ff5a5f;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#ff5a5f;}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px;}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0;}.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #ff5a5f;box-shadow:-10px 0 0 #ff5a5f;}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px;}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;box-shadow:-5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:rgba(72, 72, 72, 0.3);background:transparent;border-color:transparent;cursor:default;}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(72, 72, 72, 0.1);}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;box-shadow:-5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;}.flatpickr-day.hidden{visibility:hidden;}.rangeMode .flatpickr-day{margin-top:1px;}.flatpickr-weekwrapper{float:left;}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;border-left:1px solid #eceef1;}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px;}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(72, 72, 72, 0.3);background:transparent;cursor:default;border:none;}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;background:#fff;border-bottom:1px solid #eceef1;}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#fff;border-radius:0 0 5px 5px;}.flatpickr-time:after{content:"";display:table;clear:both;}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left;}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#484848;}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#484848;}.flatpickr-time.hasSeconds .numInputWrapper{width:26%;}.flatpickr-time.time24hr .numInputWrapper{width:49%;}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#484848;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;}.flatpickr-time input.flatpickr-hour{font-weight:bold;}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400;}.flatpickr-time input:focus{outline:0;border:0;}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#484848;font-weight:bold;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400;}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eaeaea;}.flatpickr-input[readonly]{cursor:pointer;}@-webkit-keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0);}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);}}@keyframes fpFadeInDown{from{opacity:0;-webkit-transform:translate3d(0, -20px, 0);transform:translate3d(0, -20px, 0);}to{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);}}span.flatpickr-day.selected{font-weight:bold;}`;
},
632: /* models/widgets/date_range_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    class DateRangePickerView extends base_date_picker_1.BaseDatePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "range",
            };
        }
        _on_change(selected) {
            switch (selected.length) {
                case 0:
                    this.model.value = null;
                    break;
                case 1: {
                    // Selection in progress, so do nothing and wait for two selected
                    // dates. Single date selection is still possible and represented
                    // by [date, date] tuple.
                    break;
                }
                case 2: {
                    const [from, to] = selected;
                    const from_date = this._format_date(from);
                    const to_date = this._format_date(to);
                    this.model.value = [from_date, to_date];
                    break;
                }
                default: {
                    (0, assert_1.assert)(false, "invalid length");
                }
            }
        }
    }
    exports.DateRangePickerView = DateRangePickerView;
    DateRangePickerView.__name__ = "DateRangePickerView";
    class DateRangePicker extends base_date_picker_1.BaseDatePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DateRangePicker = DateRangePicker;
    _a = DateRangePicker;
    DateRangePicker.__name__ = "DateRangePicker";
    (() => {
        _a.prototype.default_view = DateRangePickerView;
        _a.define(({ Tuple, Nullable }) => ({
            value: [Nullable(Tuple(base_date_picker_1.DateLike, base_date_picker_1.DateLike)), null],
        }));
    })();
},
633: /* models/widgets/datetime_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_datetime_picker_1 = require(634) /* ./base_datetime_picker */;
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    class DatetimePickerView extends base_datetime_picker_1.BaseDatetimePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "single",
            };
        }
        _on_change(selected) {
            (0, assert_1.assert)(selected.length <= 1);
            this.model.value = (() => {
                if (selected.length == 0) {
                    return null;
                }
                else {
                    const [datetime] = selected;
                    return this._format_date(datetime);
                }
            })();
        }
    }
    exports.DatetimePickerView = DatetimePickerView;
    DatetimePickerView.__name__ = "DatetimePickerView";
    class DatetimePicker extends base_datetime_picker_1.BaseDatetimePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DatetimePicker = DatetimePicker;
    _a = DatetimePicker;
    DatetimePicker.__name__ = "DatetimePicker";
    (() => {
        _a.prototype.default_view = DatetimePickerView;
        _a.define(({ Nullable }) => ({
            value: [Nullable(base_date_picker_1.DateLike), null],
        }));
    })();
},
634: /* models/widgets/base_datetime_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    const enums_1 = require(20) /* ../../core/enums */;
    class BaseDatetimePickerView extends base_date_picker_1.BaseDatePickerView {
        connect_signals() {
            super.connect_signals();
            const { value, hour_increment, minute_increment, second_increment, seconds, clock, } = this.model.properties;
            this.connect(value.change, () => {
                const { value } = this.model;
                if (value != null) {
                    this.picker.setDate(value);
                }
                else {
                    this.picker.clear();
                }
            });
            this.connect(hour_increment.change, () => this.picker.set("hourIncrement", this.model.hour_increment));
            this.connect(minute_increment.change, () => this.picker.set("minuteIncrement", this.model.minute_increment));
            this.connect(second_increment.change, () => this._update_second_increment());
            this.connect(seconds.change, () => this.picker.set("enableSeconds", this.model.seconds));
            this.connect(clock.change, () => this.picker.set("time_24hr", this.model.clock == "24h"));
        }
        get flatpickr_options() {
            const { hour_increment, minute_increment, seconds, clock } = this.model;
            const options = super.flatpickr_options;
            options.enableTime = true;
            options.dateFormat = "Y-m-dTH:i:S";
            options.hourIncrement = hour_increment;
            options.minuteIncrement = minute_increment;
            options.enableSeconds = seconds;
            options.time_24hr = clock == "24h";
            return options;
        }
        render() {
            super.render();
            this._update_second_increment();
        }
        _update_second_increment() {
            const { second_increment } = this.model;
            this.picker.secondElement?.setAttribute("step", second_increment.toString());
        }
    }
    exports.BaseDatetimePickerView = BaseDatetimePickerView;
    BaseDatetimePickerView.__name__ = "BaseDatetimePickerView";
    class BaseDatetimePicker extends base_date_picker_1.BaseDatePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.BaseDatetimePicker = BaseDatetimePicker;
    _a = BaseDatetimePicker;
    BaseDatetimePicker.__name__ = "BaseDatetimePicker";
    (() => {
        _a.define(({ Bool, Positive, Int }) => ({
            hour_increment: [Positive(Int), 1],
            minute_increment: [Positive(Int), 1],
            second_increment: [Positive(Int), 1],
            seconds: [Bool, false],
            clock: [enums_1.Clock, "24h"],
        }));
        _a.override({
            date_format: "Y-m-d H:i",
        });
    })();
},
635: /* models/widgets/datetime_range_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_datetime_picker_1 = require(634) /* ./base_datetime_picker */;
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    class DatetimeRangePickerView extends base_datetime_picker_1.BaseDatetimePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "range",
            };
        }
        _on_change(selected) {
            switch (selected.length) {
                case 0:
                    this.model.value = null;
                    break;
                case 1: {
                    // Selection in progress, so do nothing and wait for two selected
                    // datetimes. Single datetime selection is still possible and represented
                    // by [datetime, datetime] tuple.
                    break;
                }
                case 2: {
                    const [from, to] = selected;
                    const from_date = this._format_date(from);
                    const to_date = this._format_date(to);
                    this.model.value = [from_date, to_date];
                    break;
                }
                default: {
                    (0, assert_1.assert)(false, "invalid length");
                }
            }
        }
    }
    exports.DatetimeRangePickerView = DatetimeRangePickerView;
    DatetimeRangePickerView.__name__ = "DatetimeRangePickerView";
    class DatetimeRangePicker extends base_datetime_picker_1.BaseDatetimePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DatetimeRangePicker = DatetimeRangePicker;
    _a = DatetimeRangePicker;
    DatetimeRangePicker.__name__ = "DatetimeRangePicker";
    (() => {
        _a.prototype.default_view = DatetimeRangePickerView;
        _a.define(({ Nullable, Tuple }) => ({
            value: [Nullable(Tuple(base_date_picker_1.DateLike, base_date_picker_1.DateLike)), null],
        }));
    })();
},
636: /* models/widgets/div.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const markup_1 = require(637) /* ./markup */;
    class DivView extends markup_1.MarkupView {
        render() {
            super.render();
            if (this.model.render_as_text) {
                this.markup_el.textContent = this.model.text;
            }
            else {
                this.markup_el.innerHTML = this.has_math_disabled() ? this.model.text : this.process_tex(this.model.text);
            }
        }
    }
    exports.DivView = DivView;
    DivView.__name__ = "DivView";
    class Div extends markup_1.Markup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Div = Div;
    _a = Div;
    Div.__name__ = "Div";
    (() => {
        _a.prototype.default_view = DivView;
        _a.define(({ Bool }) => ({
            render_as_text: [Bool, false],
        }));
    })();
},
637: /* models/widgets/markup.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../../core/dom */;
    const widget_1 = require(707) /* ./widget */;
    const clearfix_css_1 = tslib_1.__importStar(require(638) /* ../../styles/clearfix.css */);
    class MarkupView extends widget_1.WidgetView {
        constructor() {
            super(...arguments);
            this._auto_width = "fit-content";
            this._auto_height = "auto";
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            if (this.provider.status == "not_started" || this.provider.status == "loading") {
                this.provider.ready.connect(() => {
                    if (this.contains_tex_string(this.model.text)) {
                        this.rerender();
                    }
                });
            }
        }
        has_math_disabled() {
            return this.model.disable_math || !this.contains_tex_string(this.model.text);
        }
        rerender() {
            this.render();
        }
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.change, () => {
                this.rerender();
            });
        }
        stylesheets() {
            return [...super.stylesheets(), clearfix_css_1.default, "p { margin: 0; }"];
        }
        render() {
            super.render();
            this.markup_el = (0, dom_1.div)({ class: clearfix_css_1.clearfix, style: { display: "inline-block" } });
            this.shadow_el.appendChild(this.markup_el);
            if (this.provider.status == "failed" || this.provider.status == "loaded") {
                this._has_finished = true;
            }
        }
    }
    exports.MarkupView = MarkupView;
    MarkupView.__name__ = "MarkupView";
    class Markup extends widget_1.Widget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Markup = Markup;
    _a = Markup;
    Markup.__name__ = "Markup";
    (() => {
        _a.define(({ Bool, Str }) => ({
            text: [Str, ""],
            disable_math: [Bool, false],
        }));
    })();
},
638: /* styles/clearfix.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.clearfix = "bk-clearfix";
    exports.default = `.bk-clearfix:before,.bk-clearfix:after{content:"";display:table;}.bk-clearfix:after{clear:both;}`;
},
639: /* models/widgets/dropdown.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const abstract_button_1 = require(600) /* ./abstract_button */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const callbacks_1 = require(50) /* ../../core/util/callbacks */;
    const buttons = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */);
    const dropdown_css_1 = tslib_1.__importStar(require(609) /* ../../styles/dropdown.css */), dropdown = dropdown_css_1;
    const caret_css_1 = tslib_1.__importStar(require(640) /* ../../styles/caret.css */), carets = caret_css_1;
    class DropdownView extends abstract_button_1.AbstractButtonView {
        constructor() {
            super(...arguments);
            this._open = false;
        }
        stylesheets() {
            return [...super.stylesheets(), dropdown_css_1.default, caret_css_1.default];
        }
        connect_signals() {
            super.connect_signals();
            const { menu } = this.model.properties;
            this.on_change(menu, () => this.rebuild_menu());
        }
        render() {
            super.render();
            const caret = (0, dom_1.div)({ class: [carets.caret, carets.down] });
            if (!this.model.is_split) {
                this.button_el.append(caret);
            }
            else {
                const toggle = this._render_button(caret);
                toggle.classList.add(buttons.dropdown_toggle);
                toggle.addEventListener("click", () => this._toggle_menu());
                this.group_el.append(toggle);
            }
            this.menu_el = (0, dom_1.div)({ class: [dropdown.menu, dropdown.below] });
            this.shadow_el.append(this.menu_el);
            this.rebuild_menu();
            (0, dom_1.undisplay)(this.menu_el);
        }
        _show_menu() {
            if (!this._open) {
                this._open = true;
                (0, dom_1.display)(this.menu_el);
                const listener = (event) => {
                    if (!event.composedPath().includes(this.el)) {
                        document.removeEventListener("click", listener);
                        this._hide_menu();
                    }
                };
                document.addEventListener("click", listener);
            }
        }
        _hide_menu() {
            if (this._open) {
                this._open = false;
                (0, dom_1.undisplay)(this.menu_el);
            }
        }
        _toggle_menu() {
            if (this._open) {
                this._hide_menu();
            }
            else {
                this._show_menu();
            }
        }
        click() {
            if (!this.model.is_split) {
                this._toggle_menu();
            }
            else {
                this._hide_menu();
                this.model.trigger_event(new bokeh_events_1.ButtonClick());
                super.click();
            }
        }
        _item_click(i) {
            this._hide_menu();
            const item = this.model.menu[i];
            if (item != null) {
                const value_or_callback = (0, types_1.isString)(item) ? item : item[1];
                if ((0, types_1.isString)(value_or_callback)) {
                    this.model.trigger_event(new bokeh_events_1.MenuItemClick(value_or_callback));
                }
                else {
                    void (0, callbacks_1.execute)(value_or_callback, this.model, { index: i });
                }
            }
        }
        rebuild_menu() {
            (0, dom_1.empty)(this.menu_el);
            const items = this.model.menu.map((item, i) => {
                if (item == null) {
                    return (0, dom_1.div)({ class: dropdown.divider });
                }
                else {
                    const label = (0, types_1.isString)(item) ? item : item[0];
                    const el = (0, dom_1.div)(label);
                    el.addEventListener("click", () => this._item_click(i));
                    return el;
                }
            });
            this.menu_el.append(...items);
        }
    }
    exports.DropdownView = DropdownView;
    DropdownView.__name__ = "DropdownView";
    class Dropdown extends abstract_button_1.AbstractButton {
        constructor(attrs) {
            super(attrs);
        }
        get is_split() {
            return this.split;
        }
    }
    exports.Dropdown = Dropdown;
    _a = Dropdown;
    Dropdown.__name__ = "Dropdown";
    (() => {
        _a.prototype.default_view = DropdownView;
        _a.define(({ Null, Bool, Str, List, Tuple, Or }) => ({
            split: [Bool, false],
            menu: [List(Or(Str, Tuple(Str, Or(Str /*TODO*/)), Null)), []],
        }));
        _a.override({
            label: "Dropdown",
        });
    })();
},
640: /* styles/caret.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.caret = "bk-caret";
    exports.down = "bk-down";
    exports.up = "bk-up";
    exports.left = "bk-left";
    exports.right = "bk-right";
    exports.default = `:host{--caret-width:4px;}.bk-caret{display:inline-block;vertical-align:middle;width:0;height:0;margin:0 5px;}.bk-caret.bk-down{border-top:var(--caret-width) solid;}.bk-caret.bk-up{border-bottom:var(--caret-width) solid;}.bk-caret.bk-down,.bk-caret.bk-up{border-right:var(--caret-width) solid transparent;border-left:var(--caret-width) solid transparent;}.bk-caret.bk-left{border-right:var(--caret-width) solid;}.bk-caret.bk-right{border-left:var(--caret-width) solid;}.bk-caret.bk-left,.bk-caret.bk-right{border-top:var(--caret-width) solid transparent;border-bottom:var(--caret-width) solid transparent;}`;
},
641: /* models/widgets/file_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const input_widget_1 = require(607) /* ./input_widget */;
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const p = tslib_1.__importStar(require(18) /* ../../core/properties */);
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    const buttons_css_1 = tslib_1.__importDefault(require(603) /* ../../styles/buttons.css */);
    class FileInputView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.model.on_event(input_widget_1.ClearInput, () => {
                this.model.setv({
                    value: "", // p.unset,
                    mime_type: "", // p.unset,
                    filename: "", // p.unset,
                });
                this.input_el.value = "";
            });
        }
        stylesheets() {
            return [...super.stylesheets(), buttons_css_1.default];
        }
        _render_input() {
            const { multiple, disabled, directory } = this.model;
            const accept = (() => {
                const { accept } = this.model;
                return (0, types_1.isString)(accept) ? accept : accept.join(",");
            })();
            return this.input_el = (0, dom_1.input)({ type: "file", class: inputs.input, multiple, accept, disabled, webkitdirectory: directory });
        }
        render() {
            super.render();
            this.input_el.addEventListener("change", async () => {
                const { files } = this.input_el;
                if (files != null) {
                    await this.load_files(files);
                }
            });
        }
        async load_files(files) {
            const values = [];
            const filenames = [];
            const mime_types = [];
            const { directory, multiple } = this.model;
            const accept = (() => {
                const { accept } = this.model;
                return (0, types_1.isString)(accept) ? accept : accept.join(",");
            })();
            for (const file of files) {
                const data_url = await this._read_file(file);
                const [, mime_type = "", , value = ""] = data_url.split(/[:;,]/, 4);
                if (directory) {
                    const ext = file.name.split(".").pop();
                    if ((accept.length > 0 && (0, types_1.isString)(ext)) ? accept.includes(`.${ext}`) : true) {
                        filenames.push(file.webkitRelativePath);
                        values.push(value);
                        mime_types.push(mime_type);
                    }
                }
                else {
                    filenames.push(file.name);
                    values.push(value);
                    mime_types.push(mime_type);
                }
            }
            const [value, filename, mime_type] = (() => {
                if (directory || multiple) {
                    return [values, filenames, mime_types];
                }
                else if (files.length != 0) {
                    return [values[0], filenames[0], mime_types[0]];
                }
                else {
                    return ["", "", ""];
                }
            })();
            this.model.setv({ value, filename, mime_type });
        }
        _read_file(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const { result } = reader;
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        reject(reader.error ?? new Error(`unable to read '${file.name}'`));
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }
    exports.FileInputView = FileInputView;
    FileInputView.__name__ = "FileInputView";
    class FileInput extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.FileInput = FileInput;
    _a = FileInput;
    FileInput.__name__ = "FileInput";
    (() => {
        _a.prototype.default_view = FileInputView;
        _a.define(({ Bool, Str, List, Or }) => ({
            value: [Or(Str, List(Str)), p.unset, { readonly: true }],
            mime_type: [Or(Str, List(Str)), p.unset, { readonly: true }],
            filename: [Or(Str, List(Str)), p.unset, { readonly: true }],
            accept: [Or(Str, List(Str)), ""],
            multiple: [Bool, false],
            directory: [Bool, false],
        }));
    })();
},
642: /* models/widgets/help_button.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const abstract_button_1 = require(600) /* ./abstract_button */;
    const tooltip_1 = require(420) /* ../ui/tooltip */;
    const builtin_icon_1 = require(486) /* ../ui/icons/builtin_icon */;
    const build_views_1 = require(56) /* ../../core/build_views */;
    class HelpButtonView extends abstract_button_1.AbstractButtonView {
        *children() {
            yield* super.children();
            yield this.tooltip;
        }
        async lazy_initialize() {
            await super.lazy_initialize();
            const { tooltip } = this.model;
            this.tooltip = await (0, build_views_1.build_view)(tooltip, { parent: this });
        }
        remove() {
            this.tooltip.remove();
            super.remove();
        }
        render() {
            super.render();
            let persistent = false;
            const toggle = (visible) => {
                this.tooltip.model.setv({
                    visible,
                    closable: persistent,
                });
                //icon_el.style.visibility = visible && persistent ? "visible" : ""
            };
            this.on_change(this.tooltip.model.properties.visible, () => {
                const { visible } = this.tooltip.model;
                if (!visible) {
                    persistent = false;
                }
                toggle(visible);
            });
            this.el.addEventListener("mouseenter", () => {
                toggle(true);
            });
            this.el.addEventListener("mouseleave", () => {
                if (!persistent) {
                    toggle(false);
                }
            });
            document.addEventListener("mousedown", (event) => {
                const path = event.composedPath();
                if (path.includes(this.tooltip.el)) {
                    return;
                }
                else if (path.includes(this.el)) {
                    persistent = !persistent;
                    toggle(persistent);
                }
                else {
                    persistent = false;
                    toggle(false);
                }
            });
            window.addEventListener("blur", () => {
                persistent = false;
                toggle(false);
            });
        }
    }
    exports.HelpButtonView = HelpButtonView;
    HelpButtonView.__name__ = "HelpButtonView";
    class HelpButton extends abstract_button_1.AbstractButton {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.HelpButton = HelpButton;
    _a = HelpButton;
    HelpButton.__name__ = "HelpButton";
    (() => {
        _a.prototype.default_view = HelpButtonView;
        _a.define(({ Ref }) => ({
            tooltip: [Ref(tooltip_1.Tooltip)],
        }));
        _a.override({
            label: "",
            icon: () => new builtin_icon_1.BuiltinIcon({ icon_name: "help", size: 18 }),
            button_type: "default",
        });
    })();
},
643: /* models/widgets/multi_choice.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const choices_js_1 = tslib_1.__importDefault(require(644) /* choices.js */);
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const eq_1 = require(26) /* ../../core/util/eq */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    const choices_css_1 = tslib_1.__importDefault(require(645) /* ../../styles/widgets/choices.css */);
    const input_widget_1 = require(607) /* ./input_widget */;
    function retarget(event) {
        Object.defineProperty(event, "target", {
            get: () => event.composedPath()[0] ?? null,
            configurable: true,
        });
        return event;
    }
    class OurChoices extends choices_js_1.default {
        _onFocus(event) {
            super._onFocus(retarget(event));
        }
        _onBlur(event) {
            super._onBlur(retarget(event));
        }
        _onKeyUp(event) {
            super._onKeyUp(retarget(event));
        }
        _onKeyDown(event) {
            super._onKeyDown(retarget(event));
        }
        _onClick(event) {
            super._onClick(retarget(event));
        }
        _onTouchEnd(event) {
            super._onTouchEnd(retarget(event));
        }
        _onMouseDown(event) {
            super._onMouseDown(retarget(event));
        }
        _onMouseOver(event) {
            super._onMouseOver(retarget(event));
        }
    }
    OurChoices.__name__ = "OurChoices";
    class MultiChoiceView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.disabled.change, () => this.set_disabled());
            const { value, max_items, option_limit, search_option_limit, delete_button, placeholder, options, name, title } = this.model.properties;
            this.on_change([max_items, option_limit, search_option_limit, delete_button, placeholder, options, name, title], () => this.render());
            this.on_change(value, () => {
                // Detects if value change originated in UI or elsewhere. Choices.js automatically
                // updates itself, so we don't have to do anything, and in fact we shouldn't do
                // anything, because the component is finicky and hard to update without breaking
                // something, loosing focus, etc.
                if (!(0, eq_1.is_equal)(this.model.value, this._current_values)) {
                    this.render();
                }
            });
        }
        stylesheets() {
            return [...super.stylesheets(), choices_css_1.default];
        }
        _render_input() {
            return this.input_el = (0, dom_1.select)({
                multiple: true,
                class: inputs.input,
                name: this.model.name,
                disabled: this.model.disabled,
            });
        }
        render() {
            super.render();
            const selected = new Set(this.model.value);
            const choices = this.model.options.map((opt) => {
                let value, label;
                if ((0, types_1.isString)(opt)) {
                    value = label = opt;
                }
                else {
                    [value, label] = opt;
                }
                return { value, label, selected: selected.has(value) };
            });
            const fill = this.model.solid ? "solid" : "light";
            const item = `choices__item ${fill}`;
            const button = `choices__button ${fill}`;
            const options = {
                choices,
                itemSelectText: "",
                duplicateItemsAllowed: false,
                shouldSort: false,
                removeItemButton: this.model.delete_button,
                classNames: { item, button }, // XXX: missing typings
                placeholderValue: this.model.placeholder,
                maxItemCount: this.model.max_items ?? -1,
                renderChoiceLimit: this.model.option_limit ?? -1,
                searchResultLimit: this.model.search_option_limit ?? 4,
            };
            this.choice_el = new OurChoices(this.input_el, options);
            this.input_el.addEventListener("change", () => this.change_input());
        }
        set_disabled() {
            if (this.model.disabled) {
                this.choice_el.disable();
            }
            else {
                this.choice_el.enable();
            }
        }
        get _current_values() {
            const values = this.choice_el.getValue();
            return values.map((item) => item.value);
        }
        change_input() {
            this.model.value = this._current_values;
            super.change_input();
        }
    }
    exports.MultiChoiceView = MultiChoiceView;
    MultiChoiceView.__name__ = "MultiChoiceView";
    class MultiChoice extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.MultiChoice = MultiChoice;
    _a = MultiChoice;
    MultiChoice.__name__ = "MultiChoice";
    (() => {
        _a.prototype.default_view = MultiChoiceView;
        _a.define(({ Bool, Int, Str, List, Tuple, Or, Nullable }) => ({
            value: [List(Str), []],
            options: [List(Or(Str, Tuple(Str, Str))), []],
            max_items: [Nullable(Int), null],
            delete_button: [Bool, true],
            placeholder: [Nullable(Str), null],
            option_limit: [Nullable(Int), null],
            search_option_limit: [Nullable(Int), null],
            solid: [Bool, true],
        }));
    })();
},
644: /* choices.js/public/assets/scripts/choices.js */ function _(require, module, exports, __esModule, __esExport) {
    /*! choices.js v10.2.0 | © 2022 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
    (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === 'object' && typeof module === 'object')
            module.exports = factory();
        else if (typeof define === 'function' && define.amd)
            define([], factory);
        else if (typeof exports === 'object')
            exports["Choices"] = factory();
        else
            root["Choices"] = factory();
    })(window, function () {
        return /******/ (function () {
            /******/ "use strict";
            /******/ var __webpack_modules__ = ({
                /***/ 282: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.clearChoices = exports.activateChoices = exports.filterChoices = exports.addChoice = void 0;
                    var constants_1 = __webpack_require__(883);
                    var addChoice = function (_a) {
                        var value = _a.value, label = _a.label, id = _a.id, groupId = _a.groupId, disabled = _a.disabled, elementId = _a.elementId, customProperties = _a.customProperties, placeholder = _a.placeholder, keyCode = _a.keyCode;
                        return {
                            type: constants_1.ACTION_TYPES.ADD_CHOICE,
                            value: value,
                            label: label,
                            id: id,
                            groupId: groupId,
                            disabled: disabled,
                            elementId: elementId,
                            customProperties: customProperties,
                            placeholder: placeholder,
                            keyCode: keyCode
                        };
                    };
                    exports.addChoice = addChoice;
                    var filterChoices = function (results) {
                        return {
                            type: constants_1.ACTION_TYPES.FILTER_CHOICES,
                            results: results
                        };
                    };
                    exports.filterChoices = filterChoices;
                    var activateChoices = function (active) {
                        if (active === void 0) {
                            active = true;
                        }
                        return {
                            type: constants_1.ACTION_TYPES.ACTIVATE_CHOICES,
                            active: active
                        };
                    };
                    exports.activateChoices = activateChoices;
                    var clearChoices = function () {
                        return {
                            type: constants_1.ACTION_TYPES.CLEAR_CHOICES
                        };
                    };
                    exports.clearChoices = clearChoices;
                    /***/ 
                }),
                /***/ 783: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.addGroup = void 0;
                    var constants_1 = __webpack_require__(883);
                    var addGroup = function (_a) {
                        var value = _a.value, id = _a.id, active = _a.active, disabled = _a.disabled;
                        return {
                            type: constants_1.ACTION_TYPES.ADD_GROUP,
                            value: value,
                            id: id,
                            active: active,
                            disabled: disabled
                        };
                    };
                    exports.addGroup = addGroup;
                    /***/ 
                }),
                /***/ 464: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.highlightItem = exports.removeItem = exports.addItem = void 0;
                    var constants_1 = __webpack_require__(883);
                    var addItem = function (_a) {
                        var value = _a.value, label = _a.label, id = _a.id, choiceId = _a.choiceId, groupId = _a.groupId, customProperties = _a.customProperties, placeholder = _a.placeholder, keyCode = _a.keyCode;
                        return {
                            type: constants_1.ACTION_TYPES.ADD_ITEM,
                            value: value,
                            label: label,
                            id: id,
                            choiceId: choiceId,
                            groupId: groupId,
                            customProperties: customProperties,
                            placeholder: placeholder,
                            keyCode: keyCode
                        };
                    };
                    exports.addItem = addItem;
                    var removeItem = function (id, choiceId) {
                        return {
                            type: constants_1.ACTION_TYPES.REMOVE_ITEM,
                            id: id,
                            choiceId: choiceId
                        };
                    };
                    exports.removeItem = removeItem;
                    var highlightItem = function (id, highlighted) {
                        return {
                            type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
                            id: id,
                            highlighted: highlighted
                        };
                    };
                    exports.highlightItem = highlightItem;
                    /***/ 
                }),
                /***/ 137: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.setIsLoading = exports.resetTo = exports.clearAll = void 0;
                    var constants_1 = __webpack_require__(883);
                    var clearAll = function () {
                        return {
                            type: constants_1.ACTION_TYPES.CLEAR_ALL
                        };
                    };
                    exports.clearAll = clearAll;
                    var resetTo = function (state) {
                        return {
                            type: constants_1.ACTION_TYPES.RESET_TO,
                            state: state
                        };
                    };
                    exports.resetTo = resetTo;
                    var setIsLoading = function (isLoading) {
                        return {
                            type: constants_1.ACTION_TYPES.SET_IS_LOADING,
                            isLoading: isLoading
                        };
                    };
                    exports.setIsLoading = setIsLoading;
                    /***/ 
                }),
                /***/ 373: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
                        if (pack || arguments.length === 2)
                            for (var i = 0, l = from.length, ar; i < l; i++) {
                                if (ar || !(i in from)) {
                                    if (!ar)
                                        ar = Array.prototype.slice.call(from, 0, i);
                                    ar[i] = from[i];
                                }
                            }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    };
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var deepmerge_1 = __importDefault(__webpack_require__(996));
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    var fuse_js_1 = __importDefault(__webpack_require__(221));
                    var choices_1 = __webpack_require__(282);
                    var groups_1 = __webpack_require__(783);
                    var items_1 = __webpack_require__(464);
                    var misc_1 = __webpack_require__(137);
                    var components_1 = __webpack_require__(520);
                    var constants_1 = __webpack_require__(883);
                    var defaults_1 = __webpack_require__(789);
                    var utils_1 = __webpack_require__(799);
                    var reducers_1 = __webpack_require__(655);
                    var store_1 = __importDefault(__webpack_require__(744));
                    var templates_1 = __importDefault(__webpack_require__(686));
                    /** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */
                    var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
                    var USER_DEFAULTS = {};
                    /**
                     * Choices
                     * @author Josh Johnson<josh@joshuajohnson.co.uk>
                     */
                    var Choices = /** @class */ function () {
                        function Choices(element, userConfig) {
                            if (element === void 0) {
                                element = '[data-choice]';
                            }
                            if (userConfig === void 0) {
                                userConfig = {};
                            }
                            var _this = this;
                            if (userConfig.allowHTML === undefined) {
                                console.warn('Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
                            }
                            this.config = deepmerge_1.default.all([defaults_1.DEFAULT_CONFIG, Choices.defaults.options, userConfig], 
                            // When merging array configs, replace with a copy of the userConfig array,
                            // instead of concatenating with the default array
                            {
                                arrayMerge: function (_, sourceArray) {
                                    return __spreadArray([], sourceArray, true);
                                }
                            });
                            var invalidConfigOptions = (0, utils_1.diff)(this.config, defaults_1.DEFAULT_CONFIG);
                            if (invalidConfigOptions.length) {
                                console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
                            }
                            var passedElement = typeof element === 'string' ? document.querySelector(element) : element;
                            if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
                                throw TypeError('Expected one of the following types text|select-one|select-multiple');
                            }
                            this._isTextElement = passedElement.type === constants_1.TEXT_TYPE;
                            this._isSelectOneElement = passedElement.type === constants_1.SELECT_ONE_TYPE;
                            this._isSelectMultipleElement = passedElement.type === constants_1.SELECT_MULTIPLE_TYPE;
                            this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
                            this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;
                            if (!['auto', 'always'].includes("".concat(this.config.renderSelectedChoices))) {
                                this.config.renderSelectedChoices = 'auto';
                            }
                            if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
                                var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
                                this.config.addItemFilter = re.test.bind(re);
                            }
                            if (this._isTextElement) {
                                this.passedElement = new components_1.WrappedInput({
                                    element: passedElement,
                                    classNames: this.config.classNames,
                                    delimiter: this.config.delimiter
                                });
                            }
                            else {
                                this.passedElement = new components_1.WrappedSelect({
                                    element: passedElement,
                                    classNames: this.config.classNames,
                                    template: function (data) {
                                        return _this._templates.option(data);
                                    }
                                });
                            }
                            this.initialised = false;
                            this._store = new store_1.default();
                            this._initialState = reducers_1.defaultState;
                            this._currentState = reducers_1.defaultState;
                            this._prevState = reducers_1.defaultState;
                            this._currentValue = '';
                            this._canSearch = !!this.config.searchEnabled;
                            this._isScrollingOnIe = false;
                            this._highlightPosition = 0;
                            this._wasTap = true;
                            this._placeholderValue = this._generatePlaceholderValue();
                            this._baseId = (0, utils_1.generateId)(this.passedElement.element, 'choices-');
                            /**
                             * setting direction in cases where it's explicitly set on passedElement
                             * or when calculated direction is different from the document
                             */
                            this._direction = this.passedElement.dir;
                            if (!this._direction) {
                                var elementDirection = window.getComputedStyle(this.passedElement.element).direction;
                                var documentDirection = window.getComputedStyle(document.documentElement).direction;
                                if (elementDirection !== documentDirection) {
                                    this._direction = elementDirection;
                                }
                            }
                            this._idNames = {
                                itemChoice: 'item-choice'
                            };
                            if (this._isSelectElement) {
                                // Assign preset groups from passed element
                                this._presetGroups = this.passedElement.optionGroups;
                                // Assign preset options from passed element
                                this._presetOptions = this.passedElement.options;
                            }
                            // Assign preset choices from passed object
                            this._presetChoices = this.config.choices;
                            // Assign preset items from passed object first
                            this._presetItems = this.config.items;
                            // Add any values passed from attribute
                            if (this.passedElement.value && this._isTextElement) {
                                var splitValues = this.passedElement.value.split(this.config.delimiter);
                                this._presetItems = this._presetItems.concat(splitValues);
                            }
                            // Create array of choices from option elements
                            if (this.passedElement.options) {
                                this.passedElement.options.forEach(function (option) {
                                    _this._presetChoices.push({
                                        value: option.value,
                                        label: option.innerHTML,
                                        selected: !!option.selected,
                                        disabled: option.disabled || option.parentNode.disabled,
                                        placeholder: option.value === '' || option.hasAttribute('placeholder'),
                                        customProperties: (0, utils_1.parseCustomProperties)(option.dataset.customProperties)
                                    });
                                });
                            }
                            this._render = this._render.bind(this);
                            this._onFocus = this._onFocus.bind(this);
                            this._onBlur = this._onBlur.bind(this);
                            this._onKeyUp = this._onKeyUp.bind(this);
                            this._onKeyDown = this._onKeyDown.bind(this);
                            this._onClick = this._onClick.bind(this);
                            this._onTouchMove = this._onTouchMove.bind(this);
                            this._onTouchEnd = this._onTouchEnd.bind(this);
                            this._onMouseDown = this._onMouseDown.bind(this);
                            this._onMouseOver = this._onMouseOver.bind(this);
                            this._onFormReset = this._onFormReset.bind(this);
                            this._onSelectKey = this._onSelectKey.bind(this);
                            this._onEnterKey = this._onEnterKey.bind(this);
                            this._onEscapeKey = this._onEscapeKey.bind(this);
                            this._onDirectionKey = this._onDirectionKey.bind(this);
                            this._onDeleteKey = this._onDeleteKey.bind(this);
                            // If element has already been initialised with Choices, fail silently
                            if (this.passedElement.isActive) {
                                if (!this.config.silent) {
                                    console.warn('Trying to initialise Choices on element already initialised', {
                                        element: element
                                    });
                                }
                                this.initialised = true;
                                return;
                            }
                            // Let's go
                            this.init();
                        }
                        Object.defineProperty(Choices, "defaults", {
                            get: function () {
                                return Object.preventExtensions({
                                    get options() {
                                        return USER_DEFAULTS;
                                    },
                                    get templates() {
                                        return templates_1.default;
                                    }
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Choices.prototype.init = function () {
                            if (this.initialised) {
                                return;
                            }
                            this._createTemplates();
                            this._createElements();
                            this._createStructure();
                            this._store.subscribe(this._render);
                            this._render();
                            this._addEventListeners();
                            var shouldDisable = !this.config.addItems || this.passedElement.element.hasAttribute('disabled');
                            if (shouldDisable) {
                                this.disable();
                            }
                            this.initialised = true;
                            var callbackOnInit = this.config.callbackOnInit;
                            // Run callback if it is a function
                            if (callbackOnInit && typeof callbackOnInit === 'function') {
                                callbackOnInit.call(this);
                            }
                        };
                        Choices.prototype.destroy = function () {
                            if (!this.initialised) {
                                return;
                            }
                            this._removeEventListeners();
                            this.passedElement.reveal();
                            this.containerOuter.unwrap(this.passedElement.element);
                            this.clearStore();
                            if (this._isSelectElement) {
                                this.passedElement.options = this._presetOptions;
                            }
                            this._templates = templates_1.default;
                            this.initialised = false;
                        };
                        Choices.prototype.enable = function () {
                            if (this.passedElement.isDisabled) {
                                this.passedElement.enable();
                            }
                            if (this.containerOuter.isDisabled) {
                                this._addEventListeners();
                                this.input.enable();
                                this.containerOuter.enable();
                            }
                            return this;
                        };
                        Choices.prototype.disable = function () {
                            if (!this.passedElement.isDisabled) {
                                this.passedElement.disable();
                            }
                            if (!this.containerOuter.isDisabled) {
                                this._removeEventListeners();
                                this.input.disable();
                                this.containerOuter.disable();
                            }
                            return this;
                        };
                        Choices.prototype.highlightItem = function (item, runEvent) {
                            if (runEvent === void 0) {
                                runEvent = true;
                            }
                            if (!item || !item.id) {
                                return this;
                            }
                            var id = item.id, _a = item.groupId, groupId = _a === void 0 ? -1 : _a, _b = item.value, value = _b === void 0 ? '' : _b, _c = item.label, label = _c === void 0 ? '' : _c;
                            var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
                            this._store.dispatch((0, items_1.highlightItem)(id, true));
                            if (runEvent) {
                                this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
                                    id: id,
                                    value: value,
                                    label: label,
                                    groupValue: group && group.value ? group.value : null
                                });
                            }
                            return this;
                        };
                        Choices.prototype.unhighlightItem = function (item) {
                            if (!item || !item.id) {
                                return this;
                            }
                            var id = item.id, _a = item.groupId, groupId = _a === void 0 ? -1 : _a, _b = item.value, value = _b === void 0 ? '' : _b, _c = item.label, label = _c === void 0 ? '' : _c;
                            var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
                            this._store.dispatch((0, items_1.highlightItem)(id, false));
                            this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
                                id: id,
                                value: value,
                                label: label,
                                groupValue: group && group.value ? group.value : null
                            });
                            return this;
                        };
                        Choices.prototype.highlightAll = function () {
                            var _this = this;
                            this._store.items.forEach(function (item) {
                                return _this.highlightItem(item);
                            });
                            return this;
                        };
                        Choices.prototype.unhighlightAll = function () {
                            var _this = this;
                            this._store.items.forEach(function (item) {
                                return _this.unhighlightItem(item);
                            });
                            return this;
                        };
                        Choices.prototype.removeActiveItemsByValue = function (value) {
                            var _this = this;
                            this._store.activeItems.filter(function (item) {
                                return item.value === value;
                            }).forEach(function (item) {
                                return _this._removeItem(item);
                            });
                            return this;
                        };
                        Choices.prototype.removeActiveItems = function (excludedId) {
                            var _this = this;
                            this._store.activeItems.filter(function (_a) {
                                var id = _a.id;
                                return id !== excludedId;
                            }).forEach(function (item) {
                                return _this._removeItem(item);
                            });
                            return this;
                        };
                        Choices.prototype.removeHighlightedItems = function (runEvent) {
                            var _this = this;
                            if (runEvent === void 0) {
                                runEvent = false;
                            }
                            this._store.highlightedActiveItems.forEach(function (item) {
                                _this._removeItem(item);
                                // If this action was performed by the user
                                // trigger the event
                                if (runEvent) {
                                    _this._triggerChange(item.value);
                                }
                            });
                            return this;
                        };
                        Choices.prototype.showDropdown = function (preventInputFocus) {
                            var _this = this;
                            if (this.dropdown.isActive) {
                                return this;
                            }
                            requestAnimationFrame(function () {
                                _this.dropdown.show();
                                _this.containerOuter.open(_this.dropdown.distanceFromTopWindow);
                                if (!preventInputFocus && _this._canSearch) {
                                    _this.input.focus();
                                }
                                _this.passedElement.triggerEvent(constants_1.EVENTS.showDropdown, {});
                            });
                            return this;
                        };
                        Choices.prototype.hideDropdown = function (preventInputBlur) {
                            var _this = this;
                            if (!this.dropdown.isActive) {
                                return this;
                            }
                            requestAnimationFrame(function () {
                                _this.dropdown.hide();
                                _this.containerOuter.close();
                                if (!preventInputBlur && _this._canSearch) {
                                    _this.input.removeActiveDescendant();
                                    _this.input.blur();
                                }
                                _this.passedElement.triggerEvent(constants_1.EVENTS.hideDropdown, {});
                            });
                            return this;
                        };
                        Choices.prototype.getValue = function (valueOnly) {
                            if (valueOnly === void 0) {
                                valueOnly = false;
                            }
                            var values = this._store.activeItems.reduce(function (selectedItems, item) {
                                var itemValue = valueOnly ? item.value : item;
                                selectedItems.push(itemValue);
                                return selectedItems;
                            }, []);
                            return this._isSelectOneElement ? values[0] : values;
                        };
                        Choices.prototype.setValue = function (items) {
                            var _this = this;
                            if (!this.initialised) {
                                return this;
                            }
                            items.forEach(function (value) {
                                return _this._setChoiceOrItem(value);
                            });
                            return this;
                        };
                        Choices.prototype.setChoiceByValue = function (value) {
                            var _this = this;
                            if (!this.initialised || this._isTextElement) {
                                return this;
                            }
                            // If only one value has been passed, convert to array
                            var choiceValue = Array.isArray(value) ? value : [value];
                            // Loop through each value and
                            choiceValue.forEach(function (val) {
                                return _this._findAndSelectChoiceByValue(val);
                            });
                            return this;
                        };
                        /**
                         * Set choices of select input via an array of objects (or function that returns array of object or promise of it),
                         * a value field name and a label field name.
                         * This behaves the same as passing items via the choices option but can be called after initialising Choices.
                         * This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices.
                         * Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc).
                         *
                         * **Input types affected:** select-one, select-multiple
                         *
                         * @example
                         * ```js
                         * const example = new Choices(element);
                         *
                         * example.setChoices([
                         *   {value: 'One', label: 'Label One', disabled: true},
                         *   {value: 'Two', label: 'Label Two', selected: true},
                         *   {value: 'Three', label: 'Label Three'},
                         * ], 'value', 'label', false);
                         * ```
                         *
                         * @example
                         * ```js
                         * const example = new Choices(element);
                         *
                         * example.setChoices(async () => {
                         *   try {
                         *      const items = await fetch('/items');
                         *      return items.json()
                         *   } catch(err) {
                         *      console.error(err)
                         *   }
                         * });
                         * ```
                         *
                         * @example
                         * ```js
                         * const example = new Choices(element);
                         *
                         * example.setChoices([{
                         *   label: 'Group one',
                         *   id: 1,
                         *   disabled: false,
                         *   choices: [
                         *     {value: 'Child One', label: 'Child One', selected: true},
                         *     {value: 'Child Two', label: 'Child Two',  disabled: true},
                         *     {value: 'Child Three', label: 'Child Three'},
                         *   ]
                         * },
                         * {
                         *   label: 'Group two',
                         *   id: 2,
                         *   disabled: false,
                         *   choices: [
                         *     {value: 'Child Four', label: 'Child Four', disabled: true},
                         *     {value: 'Child Five', label: 'Child Five'},
                         *     {value: 'Child Six', label: 'Child Six', customProperties: {
                         *       description: 'Custom description about child six',
                         *       random: 'Another random custom property'
                         *     }},
                         *   ]
                         * }], 'value', 'label', false);
                         * ```
                         */
                        Choices.prototype.setChoices = function (choicesArrayOrFetcher, value, label, replaceChoices) {
                            var _this = this;
                            if (choicesArrayOrFetcher === void 0) {
                                choicesArrayOrFetcher = [];
                            }
                            if (value === void 0) {
                                value = 'value';
                            }
                            if (label === void 0) {
                                label = 'label';
                            }
                            if (replaceChoices === void 0) {
                                replaceChoices = false;
                            }
                            if (!this.initialised) {
                                throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
                            }
                            if (!this._isSelectElement) {
                                throw new TypeError("setChoices can't be used with INPUT based Choices");
                            }
                            if (typeof value !== 'string' || !value) {
                                throw new TypeError("value parameter must be a name of 'value' field in passed objects");
                            }
                            // Clear choices if needed
                            if (replaceChoices) {
                                this.clearChoices();
                            }
                            if (typeof choicesArrayOrFetcher === 'function') {
                                // it's a choices fetcher function
                                var fetcher_1 = choicesArrayOrFetcher(this);
                                if (typeof Promise === 'function' && fetcher_1 instanceof Promise) {
                                    // that's a promise
                                    // eslint-disable-next-line no-promise-executor-return
                                    return new Promise(function (resolve) {
                                        return requestAnimationFrame(resolve);
                                    }).then(function () {
                                        return _this._handleLoadingState(true);
                                    }).then(function () {
                                        return fetcher_1;
                                    }).then(function (data) {
                                        return _this.setChoices(data, value, label, replaceChoices);
                                    }).catch(function (err) {
                                        if (!_this.config.silent) {
                                            console.error(err);
                                        }
                                    }).then(function () {
                                        return _this._handleLoadingState(false);
                                    }).then(function () {
                                        return _this;
                                    });
                                }
                                // function returned something else than promise, let's check if it's an array of choices
                                if (!Array.isArray(fetcher_1)) {
                                    throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
                                }
                                // recursion with results, it's sync and choices were cleared already
                                return this.setChoices(fetcher_1, value, label, false);
                            }
                            if (!Array.isArray(choicesArrayOrFetcher)) {
                                throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
                            }
                            this.containerOuter.removeLoadingState();
                            this._startLoading();
                            choicesArrayOrFetcher.forEach(function (groupOrChoice) {
                                if (groupOrChoice.choices) {
                                    _this._addGroup({
                                        id: groupOrChoice.id ? parseInt("".concat(groupOrChoice.id), 10) : null,
                                        group: groupOrChoice,
                                        valueKey: value,
                                        labelKey: label
                                    });
                                }
                                else {
                                    var choice = groupOrChoice;
                                    _this._addChoice({
                                        value: choice[value],
                                        label: choice[label],
                                        isSelected: !!choice.selected,
                                        isDisabled: !!choice.disabled,
                                        placeholder: !!choice.placeholder,
                                        customProperties: choice.customProperties
                                    });
                                }
                            });
                            this._stopLoading();
                            return this;
                        };
                        Choices.prototype.clearChoices = function () {
                            this._store.dispatch((0, choices_1.clearChoices)());
                            return this;
                        };
                        Choices.prototype.clearStore = function () {
                            this._store.dispatch((0, misc_1.clearAll)());
                            return this;
                        };
                        Choices.prototype.clearInput = function () {
                            var shouldSetInputWidth = !this._isSelectOneElement;
                            this.input.clear(shouldSetInputWidth);
                            if (!this._isTextElement && this._canSearch) {
                                this._isSearching = false;
                                this._store.dispatch((0, choices_1.activateChoices)(true));
                            }
                            return this;
                        };
                        Choices.prototype._render = function () {
                            if (this._store.isLoading()) {
                                return;
                            }
                            this._currentState = this._store.state;
                            var stateChanged = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items;
                            var shouldRenderChoices = this._isSelectElement;
                            var shouldRenderItems = this._currentState.items !== this._prevState.items;
                            if (!stateChanged) {
                                return;
                            }
                            if (shouldRenderChoices) {
                                this._renderChoices();
                            }
                            if (shouldRenderItems) {
                                this._renderItems();
                            }
                            this._prevState = this._currentState;
                        };
                        Choices.prototype._renderChoices = function () {
                            var _this = this;
                            var _a = this._store, activeGroups = _a.activeGroups, activeChoices = _a.activeChoices;
                            var choiceListFragment = document.createDocumentFragment();
                            this.choiceList.clear();
                            if (this.config.resetScrollPosition) {
                                requestAnimationFrame(function () {
                                    return _this.choiceList.scrollToTop();
                                });
                            }
                            // If we have grouped options
                            if (activeGroups.length >= 1 && !this._isSearching) {
                                // If we have a placeholder choice along with groups
                                var activePlaceholders = activeChoices.filter(function (activeChoice) {
                                    return activeChoice.placeholder === true && activeChoice.groupId === -1;
                                });
                                if (activePlaceholders.length >= 1) {
                                    choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
                                }
                                choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
                            }
                            else if (activeChoices.length >= 1) {
                                choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
                            }
                            // If we have choices to show
                            if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
                                var activeItems = this._store.activeItems;
                                var canAddItem = this._canAddItem(activeItems, this.input.value);
                                // ...and we can select them
                                if (canAddItem.response) {
                                    // ...append them and highlight the first choice
                                    this.choiceList.append(choiceListFragment);
                                    this._highlightChoice();
                                }
                                else {
                                    var notice = this._getTemplate('notice', canAddItem.notice);
                                    this.choiceList.append(notice);
                                }
                            }
                            else {
                                // Otherwise show a notice
                                var dropdownItem = void 0;
                                var notice = void 0;
                                if (this._isSearching) {
                                    notice = typeof this.config.noResultsText === 'function' ? this.config.noResultsText() : this.config.noResultsText;
                                    dropdownItem = this._getTemplate('notice', notice, 'no-results');
                                }
                                else {
                                    notice = typeof this.config.noChoicesText === 'function' ? this.config.noChoicesText() : this.config.noChoicesText;
                                    dropdownItem = this._getTemplate('notice', notice, 'no-choices');
                                }
                                this.choiceList.append(dropdownItem);
                            }
                        };
                        Choices.prototype._renderItems = function () {
                            var activeItems = this._store.activeItems || [];
                            this.itemList.clear();
                            // Create a fragment to store our list items
                            // (so we don't have to update the DOM for each item)
                            var itemListFragment = this._createItemsFragment(activeItems);
                            // If we have items to add, append them
                            if (itemListFragment.childNodes) {
                                this.itemList.append(itemListFragment);
                            }
                        };
                        Choices.prototype._createGroupsFragment = function (groups, choices, fragment) {
                            var _this = this;
                            if (fragment === void 0) {
                                fragment = document.createDocumentFragment();
                            }
                            var getGroupChoices = function (group) {
                                return choices.filter(function (choice) {
                                    if (_this._isSelectOneElement) {
                                        return choice.groupId === group.id;
                                    }
                                    return choice.groupId === group.id && (_this.config.renderSelectedChoices === 'always' || !choice.selected);
                                });
                            };
                            // If sorting is enabled, filter groups
                            if (this.config.shouldSort) {
                                groups.sort(this.config.sorter);
                            }
                            groups.forEach(function (group) {
                                var groupChoices = getGroupChoices(group);
                                if (groupChoices.length >= 1) {
                                    var dropdownGroup = _this._getTemplate('choiceGroup', group);
                                    fragment.appendChild(dropdownGroup);
                                    _this._createChoicesFragment(groupChoices, fragment, true);
                                }
                            });
                            return fragment;
                        };
                        Choices.prototype._createChoicesFragment = function (choices, fragment, withinGroup) {
                            var _this = this;
                            if (fragment === void 0) {
                                fragment = document.createDocumentFragment();
                            }
                            if (withinGroup === void 0) {
                                withinGroup = false;
                            }
                            // Create a fragment to store our list items (so we don't have to update the DOM for each item)
                            var _a = this.config, renderSelectedChoices = _a.renderSelectedChoices, searchResultLimit = _a.searchResultLimit, renderChoiceLimit = _a.renderChoiceLimit;
                            var filter = this._isSearching ? utils_1.sortByScore : this.config.sorter;
                            var appendChoice = function (choice) {
                                var shouldRender = renderSelectedChoices === 'auto' ? _this._isSelectOneElement || !choice.selected : true;
                                if (shouldRender) {
                                    var dropdownItem = _this._getTemplate('choice', choice, _this.config.itemSelectText);
                                    fragment.appendChild(dropdownItem);
                                }
                            };
                            var rendererableChoices = choices;
                            if (renderSelectedChoices === 'auto' && !this._isSelectOneElement) {
                                rendererableChoices = choices.filter(function (choice) {
                                    return !choice.selected;
                                });
                            }
                            // Split array into placeholders and "normal" choices
                            var _b = rendererableChoices.reduce(function (acc, choice) {
                                if (choice.placeholder) {
                                    acc.placeholderChoices.push(choice);
                                }
                                else {
                                    acc.normalChoices.push(choice);
                                }
                                return acc;
                            }, {
                                placeholderChoices: [],
                                normalChoices: []
                            }), placeholderChoices = _b.placeholderChoices, normalChoices = _b.normalChoices;
                            // If sorting is enabled or the user is searching, filter choices
                            if (this.config.shouldSort || this._isSearching) {
                                normalChoices.sort(filter);
                            }
                            var choiceLimit = rendererableChoices.length;
                            // Prepend placeholeder
                            var sortedChoices = this._isSelectOneElement ? __spreadArray(__spreadArray([], placeholderChoices, true), normalChoices, true) : normalChoices;
                            if (this._isSearching) {
                                choiceLimit = searchResultLimit;
                            }
                            else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
                                choiceLimit = renderChoiceLimit;
                            }
                            // Add each choice to dropdown within range
                            for (var i = 0; i < choiceLimit; i += 1) {
                                if (sortedChoices[i]) {
                                    appendChoice(sortedChoices[i]);
                                }
                            }
                            return fragment;
                        };
                        Choices.prototype._createItemsFragment = function (items, fragment) {
                            var _this = this;
                            if (fragment === void 0) {
                                fragment = document.createDocumentFragment();
                            }
                            // Create fragment to add elements to
                            var _a = this.config, shouldSortItems = _a.shouldSortItems, sorter = _a.sorter, removeItemButton = _a.removeItemButton;
                            // If sorting is enabled, filter items
                            if (shouldSortItems && !this._isSelectOneElement) {
                                items.sort(sorter);
                            }
                            if (this._isTextElement) {
                                // Update the value of the hidden input
                                this.passedElement.value = items.map(function (_a) {
                                    var value = _a.value;
                                    return value;
                                }).join(this.config.delimiter);
                            }
                            else {
                                // Update the options of the hidden input
                                this.passedElement.options = items;
                            }
                            var addItemToFragment = function (item) {
                                // Create new list element
                                var listItem = _this._getTemplate('item', item, removeItemButton);
                                // Append it to list
                                fragment.appendChild(listItem);
                            };
                            // Add each list item to list
                            items.forEach(addItemToFragment);
                            return fragment;
                        };
                        Choices.prototype._triggerChange = function (value) {
                            if (value === undefined || value === null) {
                                return;
                            }
                            this.passedElement.triggerEvent(constants_1.EVENTS.change, {
                                value: value
                            });
                        };
                        Choices.prototype._selectPlaceholderChoice = function (placeholderChoice) {
                            this._addItem({
                                value: placeholderChoice.value,
                                label: placeholderChoice.label,
                                choiceId: placeholderChoice.id,
                                groupId: placeholderChoice.groupId,
                                placeholder: placeholderChoice.placeholder
                            });
                            this._triggerChange(placeholderChoice.value);
                        };
                        Choices.prototype._handleButtonAction = function (activeItems, element) {
                            if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
                                return;
                            }
                            var itemId = element.parentNode && element.parentNode.dataset.id;
                            var itemToRemove = itemId && activeItems.find(function (item) {
                                return item.id === parseInt(itemId, 10);
                            });
                            if (!itemToRemove) {
                                return;
                            }
                            // Remove item associated with button
                            this._removeItem(itemToRemove);
                            this._triggerChange(itemToRemove.value);
                            if (this._isSelectOneElement && this._store.placeholderChoice) {
                                this._selectPlaceholderChoice(this._store.placeholderChoice);
                            }
                        };
                        Choices.prototype._handleItemAction = function (activeItems, element, hasShiftKey) {
                            var _this = this;
                            if (hasShiftKey === void 0) {
                                hasShiftKey = false;
                            }
                            if (!activeItems || !element || !this.config.removeItems || this._isSelectOneElement) {
                                return;
                            }
                            var passedId = element.dataset.id;
                            // We only want to select one item with a click
                            // so we deselect any items that aren't the target
                            // unless shift is being pressed
                            activeItems.forEach(function (item) {
                                if (item.id === parseInt("".concat(passedId), 10) && !item.highlighted) {
                                    _this.highlightItem(item);
                                }
                                else if (!hasShiftKey && item.highlighted) {
                                    _this.unhighlightItem(item);
                                }
                            });
                            // Focus input as without focus, a user cannot do anything with a
                            // highlighted item
                            this.input.focus();
                        };
                        Choices.prototype._handleChoiceAction = function (activeItems, element) {
                            if (!activeItems || !element) {
                                return;
                            }
                            // If we are clicking on an option
                            var id = element.dataset.id;
                            var choice = id && this._store.getChoiceById(id);
                            if (!choice) {
                                return;
                            }
                            var passedKeyCode = activeItems[0] && activeItems[0].keyCode ? activeItems[0].keyCode : undefined;
                            var hasActiveDropdown = this.dropdown.isActive;
                            // Update choice keyCode
                            choice.keyCode = passedKeyCode;
                            this.passedElement.triggerEvent(constants_1.EVENTS.choice, {
                                choice: choice
                            });
                            if (!choice.selected && !choice.disabled) {
                                var canAddItem = this._canAddItem(activeItems, choice.value);
                                if (canAddItem.response) {
                                    this._addItem({
                                        value: choice.value,
                                        label: choice.label,
                                        choiceId: choice.id,
                                        groupId: choice.groupId,
                                        customProperties: choice.customProperties,
                                        placeholder: choice.placeholder,
                                        keyCode: choice.keyCode
                                    });
                                    this._triggerChange(choice.value);
                                }
                            }
                            this.clearInput();
                            // We want to close the dropdown if we are dealing with a single select box
                            if (hasActiveDropdown && this._isSelectOneElement) {
                                this.hideDropdown(true);
                                this.containerOuter.focus();
                            }
                        };
                        Choices.prototype._handleBackspace = function (activeItems) {
                            if (!this.config.removeItems || !activeItems) {
                                return;
                            }
                            var lastItem = activeItems[activeItems.length - 1];
                            var hasHighlightedItems = activeItems.some(function (item) {
                                return item.highlighted;
                            });
                            // If editing the last item is allowed and there are not other selected items,
                            // we can edit the item value. Otherwise if we can remove items, remove all selected items
                            if (this.config.editItems && !hasHighlightedItems && lastItem) {
                                this.input.value = lastItem.value;
                                this.input.setWidth();
                                this._removeItem(lastItem);
                                this._triggerChange(lastItem.value);
                            }
                            else {
                                if (!hasHighlightedItems) {
                                    // Highlight last item if none already highlighted
                                    this.highlightItem(lastItem, false);
                                }
                                this.removeHighlightedItems(true);
                            }
                        };
                        Choices.prototype._startLoading = function () {
                            this._store.dispatch((0, misc_1.setIsLoading)(true));
                        };
                        Choices.prototype._stopLoading = function () {
                            this._store.dispatch((0, misc_1.setIsLoading)(false));
                        };
                        Choices.prototype._handleLoadingState = function (setLoading) {
                            if (setLoading === void 0) {
                                setLoading = true;
                            }
                            var placeholderItem = this.itemList.getChild(".".concat(this.config.classNames.placeholder));
                            if (setLoading) {
                                this.disable();
                                this.containerOuter.addLoadingState();
                                if (this._isSelectOneElement) {
                                    if (!placeholderItem) {
                                        placeholderItem = this._getTemplate('placeholder', this.config.loadingText);
                                        if (placeholderItem) {
                                            this.itemList.append(placeholderItem);
                                        }
                                    }
                                    else {
                                        placeholderItem.innerHTML = this.config.loadingText;
                                    }
                                }
                                else {
                                    this.input.placeholder = this.config.loadingText;
                                }
                            }
                            else {
                                this.enable();
                                this.containerOuter.removeLoadingState();
                                if (this._isSelectOneElement) {
                                    if (placeholderItem) {
                                        placeholderItem.innerHTML = this._placeholderValue || '';
                                    }
                                }
                                else {
                                    this.input.placeholder = this._placeholderValue || '';
                                }
                            }
                        };
                        Choices.prototype._handleSearch = function (value) {
                            if (!this.input.isFocussed) {
                                return;
                            }
                            var choices = this._store.choices;
                            var _a = this.config, searchFloor = _a.searchFloor, searchChoices = _a.searchChoices;
                            var hasUnactiveChoices = choices.some(function (option) {
                                return !option.active;
                            });
                            // Check that we have a value to search and the input was an alphanumeric character
                            if (value !== null && typeof value !== 'undefined' && value.length >= searchFloor) {
                                var resultCount = searchChoices ? this._searchChoices(value) : 0;
                                // Trigger search event
                                this.passedElement.triggerEvent(constants_1.EVENTS.search, {
                                    value: value,
                                    resultCount: resultCount
                                });
                            }
                            else if (hasUnactiveChoices) {
                                // Otherwise reset choices to active
                                this._isSearching = false;
                                this._store.dispatch((0, choices_1.activateChoices)(true));
                            }
                        };
                        Choices.prototype._canAddItem = function (activeItems, value) {
                            var canAddItem = true;
                            var notice = typeof this.config.addItemText === 'function' ? this.config.addItemText(value) : this.config.addItemText;
                            if (!this._isSelectOneElement) {
                                var isDuplicateValue = (0, utils_1.existsInArray)(activeItems, value);
                                if (this.config.maxItemCount > 0 && this.config.maxItemCount <= activeItems.length) {
                                    // If there is a max entry limit and we have reached that limit
                                    // don't update
                                    canAddItem = false;
                                    notice = typeof this.config.maxItemText === 'function' ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText;
                                }
                                if (!this.config.duplicateItemsAllowed && isDuplicateValue && canAddItem) {
                                    canAddItem = false;
                                    notice = typeof this.config.uniqueItemText === 'function' ? this.config.uniqueItemText(value) : this.config.uniqueItemText;
                                }
                                if (this._isTextElement && this.config.addItems && canAddItem && typeof this.config.addItemFilter === 'function' && !this.config.addItemFilter(value)) {
                                    canAddItem = false;
                                    notice = typeof this.config.customAddItemText === 'function' ? this.config.customAddItemText(value) : this.config.customAddItemText;
                                }
                            }
                            return {
                                response: canAddItem,
                                notice: notice
                            };
                        };
                        Choices.prototype._searchChoices = function (value) {
                            var newValue = typeof value === 'string' ? value.trim() : value;
                            var currentValue = typeof this._currentValue === 'string' ? this._currentValue.trim() : this._currentValue;
                            if (newValue.length < 1 && newValue === "".concat(currentValue, " ")) {
                                return 0;
                            }
                            // If new value matches the desired length and is not the same as the current value with a space
                            var haystack = this._store.searchableChoices;
                            var needle = newValue;
                            var options = Object.assign(this.config.fuseOptions, {
                                keys: __spreadArray([], this.config.searchFields, true),
                                includeMatches: true
                            });
                            var fuse = new fuse_js_1.default(haystack, options);
                            var results = fuse.search(needle); // see https://github.com/krisk/Fuse/issues/303
                            this._currentValue = newValue;
                            this._highlightPosition = 0;
                            this._isSearching = true;
                            this._store.dispatch((0, choices_1.filterChoices)(results));
                            return results.length;
                        };
                        Choices.prototype._addEventListeners = function () {
                            var documentElement = document.documentElement;
                            // capture events - can cancel event processing or propagation
                            documentElement.addEventListener('touchend', this._onTouchEnd, true);
                            this.containerOuter.element.addEventListener('keydown', this._onKeyDown, true);
                            this.containerOuter.element.addEventListener('mousedown', this._onMouseDown, true);
                            // passive events - doesn't call `preventDefault` or `stopPropagation`
                            documentElement.addEventListener('click', this._onClick, {
                                passive: true
                            });
                            documentElement.addEventListener('touchmove', this._onTouchMove, {
                                passive: true
                            });
                            this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
                                passive: true
                            });
                            if (this._isSelectOneElement) {
                                this.containerOuter.element.addEventListener('focus', this._onFocus, {
                                    passive: true
                                });
                                this.containerOuter.element.addEventListener('blur', this._onBlur, {
                                    passive: true
                                });
                            }
                            this.input.element.addEventListener('keyup', this._onKeyUp, {
                                passive: true
                            });
                            this.input.element.addEventListener('focus', this._onFocus, {
                                passive: true
                            });
                            this.input.element.addEventListener('blur', this._onBlur, {
                                passive: true
                            });
                            if (this.input.element.form) {
                                this.input.element.form.addEventListener('reset', this._onFormReset, {
                                    passive: true
                                });
                            }
                            this.input.addEventListeners();
                        };
                        Choices.prototype._removeEventListeners = function () {
                            var documentElement = document.documentElement;
                            documentElement.removeEventListener('touchend', this._onTouchEnd, true);
                            this.containerOuter.element.removeEventListener('keydown', this._onKeyDown, true);
                            this.containerOuter.element.removeEventListener('mousedown', this._onMouseDown, true);
                            documentElement.removeEventListener('click', this._onClick);
                            documentElement.removeEventListener('touchmove', this._onTouchMove);
                            this.dropdown.element.removeEventListener('mouseover', this._onMouseOver);
                            if (this._isSelectOneElement) {
                                this.containerOuter.element.removeEventListener('focus', this._onFocus);
                                this.containerOuter.element.removeEventListener('blur', this._onBlur);
                            }
                            this.input.element.removeEventListener('keyup', this._onKeyUp);
                            this.input.element.removeEventListener('focus', this._onFocus);
                            this.input.element.removeEventListener('blur', this._onBlur);
                            if (this.input.element.form) {
                                this.input.element.form.removeEventListener('reset', this._onFormReset);
                            }
                            this.input.removeEventListeners();
                        };
                        Choices.prototype._onKeyDown = function (event) {
                            var keyCode = event.keyCode;
                            var activeItems = this._store.activeItems;
                            var hasFocusedInput = this.input.isFocussed;
                            var hasActiveDropdown = this.dropdown.isActive;
                            var hasItems = this.itemList.hasChildren();
                            var keyString = String.fromCharCode(keyCode);
                            // eslint-disable-next-line no-control-regex
                            var wasPrintableChar = /[^\x00-\x1F]/.test(keyString);
                            var BACK_KEY = constants_1.KEY_CODES.BACK_KEY, DELETE_KEY = constants_1.KEY_CODES.DELETE_KEY, ENTER_KEY = constants_1.KEY_CODES.ENTER_KEY, A_KEY = constants_1.KEY_CODES.A_KEY, ESC_KEY = constants_1.KEY_CODES.ESC_KEY, UP_KEY = constants_1.KEY_CODES.UP_KEY, DOWN_KEY = constants_1.KEY_CODES.DOWN_KEY, PAGE_UP_KEY = constants_1.KEY_CODES.PAGE_UP_KEY, PAGE_DOWN_KEY = constants_1.KEY_CODES.PAGE_DOWN_KEY;
                            if (!this._isTextElement && !hasActiveDropdown && wasPrintableChar) {
                                this.showDropdown();
                                if (!this.input.isFocussed) {
                                    /*
                                      We update the input value with the pressed key as
                                      the input was not focussed at the time of key press
                                      therefore does not have the value of the key.
                                    */
                                    this.input.value += event.key.toLowerCase();
                                }
                            }
                            switch (keyCode) {
                                case A_KEY:
                                    return this._onSelectKey(event, hasItems);
                                case ENTER_KEY:
                                    return this._onEnterKey(event, activeItems, hasActiveDropdown);
                                case ESC_KEY:
                                    return this._onEscapeKey(hasActiveDropdown);
                                case UP_KEY:
                                case PAGE_UP_KEY:
                                case DOWN_KEY:
                                case PAGE_DOWN_KEY:
                                    return this._onDirectionKey(event, hasActiveDropdown);
                                case DELETE_KEY:
                                case BACK_KEY:
                                    return this._onDeleteKey(event, activeItems, hasFocusedInput);
                                default:
                            }
                        };
                        Choices.prototype._onKeyUp = function (_a) {
                            var target = _a.target, keyCode = _a.keyCode;
                            var value = this.input.value;
                            var activeItems = this._store.activeItems;
                            var canAddItem = this._canAddItem(activeItems, value);
                            var backKey = constants_1.KEY_CODES.BACK_KEY, deleteKey = constants_1.KEY_CODES.DELETE_KEY;
                            // We are typing into a text input and have a value, we want to show a dropdown
                            // notice. Otherwise hide the dropdown
                            if (this._isTextElement) {
                                var canShowDropdownNotice = canAddItem.notice && value;
                                if (canShowDropdownNotice) {
                                    var dropdownItem = this._getTemplate('notice', canAddItem.notice);
                                    this.dropdown.element.innerHTML = dropdownItem.outerHTML;
                                    this.showDropdown(true);
                                }
                                else {
                                    this.hideDropdown(true);
                                }
                            }
                            else {
                                var wasRemovalKeyCode = keyCode === backKey || keyCode === deleteKey;
                                var userHasRemovedValue = wasRemovalKeyCode && target && !target.value;
                                var canReactivateChoices = !this._isTextElement && this._isSearching;
                                var canSearch = this._canSearch && canAddItem.response;
                                if (userHasRemovedValue && canReactivateChoices) {
                                    this._isSearching = false;
                                    this._store.dispatch((0, choices_1.activateChoices)(true));
                                }
                                else if (canSearch) {
                                    this._handleSearch(this.input.rawValue);
                                }
                            }
                            this._canSearch = this.config.searchEnabled;
                        };
                        Choices.prototype._onSelectKey = function (event, hasItems) {
                            var ctrlKey = event.ctrlKey, metaKey = event.metaKey;
                            var hasCtrlDownKeyPressed = ctrlKey || metaKey;
                            // If CTRL + A or CMD + A have been pressed and there are items to select
                            if (hasCtrlDownKeyPressed && hasItems) {
                                this._canSearch = false;
                                var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
                                if (shouldHightlightAll) {
                                    this.highlightAll();
                                }
                            }
                        };
                        Choices.prototype._onEnterKey = function (event, activeItems, hasActiveDropdown) {
                            var target = event.target;
                            var enterKey = constants_1.KEY_CODES.ENTER_KEY;
                            var targetWasButton = target && target.hasAttribute('data-button');
                            if (this._isTextElement && target && target.value) {
                                var value = this.input.value;
                                var canAddItem = this._canAddItem(activeItems, value);
                                if (canAddItem.response) {
                                    this.hideDropdown(true);
                                    this._addItem({
                                        value: value
                                    });
                                    this._triggerChange(value);
                                    this.clearInput();
                                }
                            }
                            if (targetWasButton) {
                                this._handleButtonAction(activeItems, target);
                                event.preventDefault();
                            }
                            if (hasActiveDropdown) {
                                var highlightedChoice = this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));
                                if (highlightedChoice) {
                                    // add enter keyCode value
                                    if (activeItems[0]) {
                                        activeItems[0].keyCode = enterKey; // eslint-disable-line no-param-reassign
                                    }
                                    this._handleChoiceAction(activeItems, highlightedChoice);
                                }
                                event.preventDefault();
                            }
                            else if (this._isSelectOneElement) {
                                this.showDropdown();
                                event.preventDefault();
                            }
                        };
                        Choices.prototype._onEscapeKey = function (hasActiveDropdown) {
                            if (hasActiveDropdown) {
                                this.hideDropdown(true);
                                this.containerOuter.focus();
                            }
                        };
                        Choices.prototype._onDirectionKey = function (event, hasActiveDropdown) {
                            var keyCode = event.keyCode, metaKey = event.metaKey;
                            var downKey = constants_1.KEY_CODES.DOWN_KEY, pageUpKey = constants_1.KEY_CODES.PAGE_UP_KEY, pageDownKey = constants_1.KEY_CODES.PAGE_DOWN_KEY;
                            // If up or down key is pressed, traverse through options
                            if (hasActiveDropdown || this._isSelectOneElement) {
                                this.showDropdown();
                                this._canSearch = false;
                                var directionInt = keyCode === downKey || keyCode === pageDownKey ? 1 : -1;
                                var skipKey = metaKey || keyCode === pageDownKey || keyCode === pageUpKey;
                                var selectableChoiceIdentifier = '[data-choice-selectable]';
                                var nextEl = void 0;
                                if (skipKey) {
                                    if (directionInt > 0) {
                                        nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
                                    }
                                    else {
                                        nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                                    }
                                }
                                else {
                                    var currentEl = this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));
                                    if (currentEl) {
                                        nextEl = (0, utils_1.getAdjacentEl)(currentEl, selectableChoiceIdentifier, directionInt);
                                    }
                                    else {
                                        nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                                    }
                                }
                                if (nextEl) {
                                    // We prevent default to stop the cursor moving
                                    // when pressing the arrow
                                    if (!(0, utils_1.isScrolledIntoView)(nextEl, this.choiceList.element, directionInt)) {
                                        this.choiceList.scrollToChildElement(nextEl, directionInt);
                                    }
                                    this._highlightChoice(nextEl);
                                }
                                // Prevent default to maintain cursor position whilst
                                // traversing dropdown options
                                event.preventDefault();
                            }
                        };
                        Choices.prototype._onDeleteKey = function (event, activeItems, hasFocusedInput) {
                            var target = event.target;
                            // If backspace or delete key is pressed and the input has no value
                            if (!this._isSelectOneElement && !target.value && hasFocusedInput) {
                                this._handleBackspace(activeItems);
                                event.preventDefault();
                            }
                        };
                        Choices.prototype._onTouchMove = function () {
                            if (this._wasTap) {
                                this._wasTap = false;
                            }
                        };
                        Choices.prototype._onTouchEnd = function (event) {
                            var target = (event || event.touches[0]).target;
                            var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
                            if (touchWasWithinContainer) {
                                var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
                                if (containerWasExactTarget) {
                                    if (this._isTextElement) {
                                        this.input.focus();
                                    }
                                    else if (this._isSelectMultipleElement) {
                                        this.showDropdown();
                                    }
                                }
                                // Prevents focus event firing
                                event.stopPropagation();
                            }
                            this._wasTap = true;
                        };
                        /**
                         * Handles mousedown event in capture mode for containetOuter.element
                         */
                        Choices.prototype._onMouseDown = function (event) {
                            var target = event.target;
                            if (!(target instanceof HTMLElement)) {
                                return;
                            }
                            // If we have our mouse down on the scrollbar and are on IE11...
                            if (IS_IE11 && this.choiceList.element.contains(target)) {
                                // check if click was on a scrollbar area
                                var firstChoice = this.choiceList.element.firstElementChild;
                                var isOnScrollbar = this._direction === 'ltr' ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
                                this._isScrollingOnIe = isOnScrollbar;
                            }
                            if (target === this.input.element) {
                                return;
                            }
                            var item = target.closest('[data-button],[data-item],[data-choice]');
                            if (item instanceof HTMLElement) {
                                var hasShiftKey = event.shiftKey;
                                var activeItems = this._store.activeItems;
                                var dataset = item.dataset;
                                if ('button' in dataset) {
                                    this._handleButtonAction(activeItems, item);
                                }
                                else if ('item' in dataset) {
                                    this._handleItemAction(activeItems, item, hasShiftKey);
                                }
                                else if ('choice' in dataset) {
                                    this._handleChoiceAction(activeItems, item);
                                }
                            }
                            event.preventDefault();
                        };
                        /**
                         * Handles mouseover event over this.dropdown
                         * @param {MouseEvent} event
                         */
                        Choices.prototype._onMouseOver = function (_a) {
                            var target = _a.target;
                            if (target instanceof HTMLElement && 'choice' in target.dataset) {
                                this._highlightChoice(target);
                            }
                        };
                        Choices.prototype._onClick = function (_a) {
                            var target = _a.target;
                            var clickWasWithinContainer = this.containerOuter.element.contains(target);
                            if (clickWasWithinContainer) {
                                if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
                                    if (this._isTextElement) {
                                        if (document.activeElement !== this.input.element) {
                                            this.input.focus();
                                        }
                                    }
                                    else {
                                        this.showDropdown();
                                        this.containerOuter.focus();
                                    }
                                }
                                else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
                                    this.hideDropdown();
                                }
                            }
                            else {
                                var hasHighlightedItems = this._store.highlightedActiveItems.length > 0;
                                if (hasHighlightedItems) {
                                    this.unhighlightAll();
                                }
                                this.containerOuter.removeFocusState();
                                this.hideDropdown(true);
                            }
                        };
                        Choices.prototype._onFocus = function (_a) {
                            var _b;
                            var _this = this;
                            var target = _a.target;
                            var focusWasWithinContainer = target && this.containerOuter.element.contains(target);
                            if (!focusWasWithinContainer) {
                                return;
                            }
                            var focusActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
                                if (target === _this.input.element) {
                                    _this.containerOuter.addFocusState();
                                }
                            }, _b[constants_1.SELECT_ONE_TYPE] = function () {
                                _this.containerOuter.addFocusState();
                                if (target === _this.input.element) {
                                    _this.showDropdown(true);
                                }
                            }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
                                if (target === _this.input.element) {
                                    _this.showDropdown(true);
                                    // If element is a select box, the focused element is the container and the dropdown
                                    // isn't already open, focus and show dropdown
                                    _this.containerOuter.addFocusState();
                                }
                            }, _b);
                            focusActions[this.passedElement.element.type]();
                        };
                        Choices.prototype._onBlur = function (_a) {
                            var _b;
                            var _this = this;
                            var target = _a.target;
                            var blurWasWithinContainer = target && this.containerOuter.element.contains(target);
                            if (blurWasWithinContainer && !this._isScrollingOnIe) {
                                var activeItems = this._store.activeItems;
                                var hasHighlightedItems_1 = activeItems.some(function (item) {
                                    return item.highlighted;
                                });
                                var blurActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
                                    if (target === _this.input.element) {
                                        _this.containerOuter.removeFocusState();
                                        if (hasHighlightedItems_1) {
                                            _this.unhighlightAll();
                                        }
                                        _this.hideDropdown(true);
                                    }
                                }, _b[constants_1.SELECT_ONE_TYPE] = function () {
                                    _this.containerOuter.removeFocusState();
                                    if (target === _this.input.element || target === _this.containerOuter.element && !_this._canSearch) {
                                        _this.hideDropdown(true);
                                    }
                                }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
                                    if (target === _this.input.element) {
                                        _this.containerOuter.removeFocusState();
                                        _this.hideDropdown(true);
                                        if (hasHighlightedItems_1) {
                                            _this.unhighlightAll();
                                        }
                                    }
                                }, _b);
                                blurActions[this.passedElement.element.type]();
                            }
                            else {
                                // On IE11, clicking the scollbar blurs our input and thus
                                // closes the dropdown. To stop this, we refocus our input
                                // if we know we are on IE *and* are scrolling.
                                this._isScrollingOnIe = false;
                                this.input.element.focus();
                            }
                        };
                        Choices.prototype._onFormReset = function () {
                            this._store.dispatch((0, misc_1.resetTo)(this._initialState));
                        };
                        Choices.prototype._highlightChoice = function (el) {
                            var _this = this;
                            if (el === void 0) {
                                el = null;
                            }
                            var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));
                            if (!choices.length) {
                                return;
                            }
                            var passedEl = el;
                            var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState)));
                            // Remove any highlighted choices
                            highlightedChoices.forEach(function (choice) {
                                choice.classList.remove(_this.config.classNames.highlightedState);
                                choice.setAttribute('aria-selected', 'false');
                            });
                            if (passedEl) {
                                this._highlightPosition = choices.indexOf(passedEl);
                            }
                            else {
                                // Highlight choice based on last known highlight location
                                if (choices.length > this._highlightPosition) {
                                    // If we have an option to highlight
                                    passedEl = choices[this._highlightPosition];
                                }
                                else {
                                    // Otherwise highlight the option before
                                    passedEl = choices[choices.length - 1];
                                }
                                if (!passedEl) {
                                    passedEl = choices[0];
                                }
                            }
                            passedEl.classList.add(this.config.classNames.highlightedState);
                            passedEl.setAttribute('aria-selected', 'true');
                            this.passedElement.triggerEvent(constants_1.EVENTS.highlightChoice, {
                                el: passedEl
                            });
                            if (this.dropdown.isActive) {
                                // IE11 ignores aria-label and blocks virtual keyboard
                                // if aria-activedescendant is set without a dropdown
                                this.input.setActiveDescendant(passedEl.id);
                                this.containerOuter.setActiveDescendant(passedEl.id);
                            }
                        };
                        Choices.prototype._addItem = function (_a) {
                            var value = _a.value, _b = _a.label, label = _b === void 0 ? null : _b, _c = _a.choiceId, choiceId = _c === void 0 ? -1 : _c, _d = _a.groupId, groupId = _d === void 0 ? -1 : _d, _e = _a.customProperties, customProperties = _e === void 0 ? {} : _e, _f = _a.placeholder, placeholder = _f === void 0 ? false : _f, _g = _a.keyCode, keyCode = _g === void 0 ? -1 : _g;
                            var passedValue = typeof value === 'string' ? value.trim() : value;
                            var items = this._store.items;
                            var passedLabel = label || passedValue;
                            var passedOptionId = choiceId || -1;
                            var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
                            var id = items ? items.length + 1 : 1;
                            // If a prepended value has been passed, prepend it
                            if (this.config.prependValue) {
                                passedValue = this.config.prependValue + passedValue.toString();
                            }
                            // If an appended value has been passed, append it
                            if (this.config.appendValue) {
                                passedValue += this.config.appendValue.toString();
                            }
                            this._store.dispatch((0, items_1.addItem)({
                                value: passedValue,
                                label: passedLabel,
                                id: id,
                                choiceId: passedOptionId,
                                groupId: groupId,
                                customProperties: customProperties,
                                placeholder: placeholder,
                                keyCode: keyCode
                            }));
                            if (this._isSelectOneElement) {
                                this.removeActiveItems(id);
                            }
                            // Trigger change event
                            this.passedElement.triggerEvent(constants_1.EVENTS.addItem, {
                                id: id,
                                value: passedValue,
                                label: passedLabel,
                                customProperties: customProperties,
                                groupValue: group && group.value ? group.value : null,
                                keyCode: keyCode
                            });
                        };
                        Choices.prototype._removeItem = function (item) {
                            var id = item.id, value = item.value, label = item.label, customProperties = item.customProperties, choiceId = item.choiceId, groupId = item.groupId;
                            var group = groupId && groupId >= 0 ? this._store.getGroupById(groupId) : null;
                            if (!id || !choiceId) {
                                return;
                            }
                            this._store.dispatch((0, items_1.removeItem)(id, choiceId));
                            this.passedElement.triggerEvent(constants_1.EVENTS.removeItem, {
                                id: id,
                                value: value,
                                label: label,
                                customProperties: customProperties,
                                groupValue: group && group.value ? group.value : null
                            });
                        };
                        Choices.prototype._addChoice = function (_a) {
                            var value = _a.value, _b = _a.label, label = _b === void 0 ? null : _b, _c = _a.isSelected, isSelected = _c === void 0 ? false : _c, _d = _a.isDisabled, isDisabled = _d === void 0 ? false : _d, _e = _a.groupId, groupId = _e === void 0 ? -1 : _e, _f = _a.customProperties, customProperties = _f === void 0 ? {} : _f, _g = _a.placeholder, placeholder = _g === void 0 ? false : _g, _h = _a.keyCode, keyCode = _h === void 0 ? -1 : _h;
                            if (typeof value === 'undefined' || value === null) {
                                return;
                            }
                            // Generate unique id
                            var choices = this._store.choices;
                            var choiceLabel = label || value;
                            var choiceId = choices ? choices.length + 1 : 1;
                            var choiceElementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choiceId);
                            this._store.dispatch((0, choices_1.addChoice)({
                                id: choiceId,
                                groupId: groupId,
                                elementId: choiceElementId,
                                value: value,
                                label: choiceLabel,
                                disabled: isDisabled,
                                customProperties: customProperties,
                                placeholder: placeholder,
                                keyCode: keyCode
                            }));
                            if (isSelected) {
                                this._addItem({
                                    value: value,
                                    label: choiceLabel,
                                    choiceId: choiceId,
                                    customProperties: customProperties,
                                    placeholder: placeholder,
                                    keyCode: keyCode
                                });
                            }
                        };
                        Choices.prototype._addGroup = function (_a) {
                            var _this = this;
                            var group = _a.group, id = _a.id, _b = _a.valueKey, valueKey = _b === void 0 ? 'value' : _b, _c = _a.labelKey, labelKey = _c === void 0 ? 'label' : _c;
                            var groupChoices = (0, utils_1.isType)('Object', group) ? group.choices : Array.from(group.getElementsByTagName('OPTION'));
                            var groupId = id || Math.floor(new Date().valueOf() * Math.random());
                            var isDisabled = group.disabled ? group.disabled : false;
                            if (groupChoices) {
                                this._store.dispatch((0, groups_1.addGroup)({
                                    value: group.label,
                                    id: groupId,
                                    active: true,
                                    disabled: isDisabled
                                }));
                                var addGroupChoices = function (choice) {
                                    var isOptDisabled = choice.disabled || choice.parentNode && choice.parentNode.disabled;
                                    _this._addChoice({
                                        value: choice[valueKey],
                                        label: (0, utils_1.isType)('Object', choice) ? choice[labelKey] : choice.innerHTML,
                                        isSelected: choice.selected,
                                        isDisabled: isOptDisabled,
                                        groupId: groupId,
                                        customProperties: choice.customProperties,
                                        placeholder: choice.placeholder
                                    });
                                };
                                groupChoices.forEach(addGroupChoices);
                            }
                            else {
                                this._store.dispatch((0, groups_1.addGroup)({
                                    value: group.label,
                                    id: group.id,
                                    active: false,
                                    disabled: group.disabled
                                }));
                            }
                        };
                        Choices.prototype._getTemplate = function (template) {
                            var _a;
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            return (_a = this._templates[template]).call.apply(_a, __spreadArray([this, this.config], args, false));
                        };
                        Choices.prototype._createTemplates = function () {
                            var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
                            var userTemplates = {};
                            if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === 'function') {
                                userTemplates = callbackOnCreateTemplates.call(this, utils_1.strToEl);
                            }
                            this._templates = (0, deepmerge_1.default)(templates_1.default, userTemplates);
                        };
                        Choices.prototype._createElements = function () {
                            this.containerOuter = new components_1.Container({
                                element: this._getTemplate('containerOuter', this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type, this.config.labelId),
                                classNames: this.config.classNames,
                                type: this.passedElement.element.type,
                                position: this.config.position
                            });
                            this.containerInner = new components_1.Container({
                                element: this._getTemplate('containerInner'),
                                classNames: this.config.classNames,
                                type: this.passedElement.element.type,
                                position: this.config.position
                            });
                            this.input = new components_1.Input({
                                element: this._getTemplate('input', this._placeholderValue),
                                classNames: this.config.classNames,
                                type: this.passedElement.element.type,
                                preventPaste: !this.config.paste
                            });
                            this.choiceList = new components_1.List({
                                element: this._getTemplate('choiceList', this._isSelectOneElement)
                            });
                            this.itemList = new components_1.List({
                                element: this._getTemplate('itemList', this._isSelectOneElement)
                            });
                            this.dropdown = new components_1.Dropdown({
                                element: this._getTemplate('dropdown'),
                                classNames: this.config.classNames,
                                type: this.passedElement.element.type
                            });
                        };
                        Choices.prototype._createStructure = function () {
                            // Hide original element
                            this.passedElement.conceal();
                            // Wrap input in container preserving DOM ordering
                            this.containerInner.wrap(this.passedElement.element);
                            // Wrapper inner container with outer container
                            this.containerOuter.wrap(this.containerInner.element);
                            if (this._isSelectOneElement) {
                                this.input.placeholder = this.config.searchPlaceholderValue || '';
                            }
                            else if (this._placeholderValue) {
                                this.input.placeholder = this._placeholderValue;
                                this.input.setWidth();
                            }
                            this.containerOuter.element.appendChild(this.containerInner.element);
                            this.containerOuter.element.appendChild(this.dropdown.element);
                            this.containerInner.element.appendChild(this.itemList.element);
                            if (!this._isTextElement) {
                                this.dropdown.element.appendChild(this.choiceList.element);
                            }
                            if (!this._isSelectOneElement) {
                                this.containerInner.element.appendChild(this.input.element);
                            }
                            else if (this.config.searchEnabled) {
                                this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild);
                            }
                            if (this._isSelectElement) {
                                this._highlightPosition = 0;
                                this._isSearching = false;
                                this._startLoading();
                                if (this._presetGroups.length) {
                                    this._addPredefinedGroups(this._presetGroups);
                                }
                                else {
                                    this._addPredefinedChoices(this._presetChoices);
                                }
                                this._stopLoading();
                            }
                            if (this._isTextElement) {
                                this._addPredefinedItems(this._presetItems);
                            }
                        };
                        Choices.prototype._addPredefinedGroups = function (groups) {
                            var _this = this;
                            // If we have a placeholder option
                            var placeholderChoice = this.passedElement.placeholderOption;
                            if (placeholderChoice && placeholderChoice.parentNode && placeholderChoice.parentNode.tagName === 'SELECT') {
                                this._addChoice({
                                    value: placeholderChoice.value,
                                    label: placeholderChoice.innerHTML,
                                    isSelected: placeholderChoice.selected,
                                    isDisabled: placeholderChoice.disabled,
                                    placeholder: true
                                });
                            }
                            groups.forEach(function (group) {
                                return _this._addGroup({
                                    group: group,
                                    id: group.id || null
                                });
                            });
                        };
                        Choices.prototype._addPredefinedChoices = function (choices) {
                            var _this = this;
                            // If sorting is enabled or the user is searching, filter choices
                            if (this.config.shouldSort) {
                                choices.sort(this.config.sorter);
                            }
                            var hasSelectedChoice = choices.some(function (choice) {
                                return choice.selected;
                            });
                            var firstEnabledChoiceIndex = choices.findIndex(function (choice) {
                                return choice.disabled === undefined || !choice.disabled;
                            });
                            choices.forEach(function (choice, index) {
                                var _a = choice.value, value = _a === void 0 ? '' : _a, label = choice.label, customProperties = choice.customProperties, placeholder = choice.placeholder;
                                if (_this._isSelectElement) {
                                    // If the choice is actually a group
                                    if (choice.choices) {
                                        _this._addGroup({
                                            group: choice,
                                            id: choice.id || null
                                        });
                                    }
                                    else {
                                        /**
                                         * If there is a selected choice already or the choice is not the first in
                                         * the array, add each choice normally.
                                         *
                                         * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
                                         */
                                        var shouldPreselect = _this._isSelectOneElement && !hasSelectedChoice && index === firstEnabledChoiceIndex;
                                        var isSelected = shouldPreselect ? true : choice.selected;
                                        var isDisabled = choice.disabled;
                                        _this._addChoice({
                                            value: value,
                                            label: label,
                                            isSelected: !!isSelected,
                                            isDisabled: !!isDisabled,
                                            placeholder: !!placeholder,
                                            customProperties: customProperties
                                        });
                                    }
                                }
                                else {
                                    _this._addChoice({
                                        value: value,
                                        label: label,
                                        isSelected: !!choice.selected,
                                        isDisabled: !!choice.disabled,
                                        placeholder: !!choice.placeholder,
                                        customProperties: customProperties
                                    });
                                }
                            });
                        };
                        Choices.prototype._addPredefinedItems = function (items) {
                            var _this = this;
                            items.forEach(function (item) {
                                if (typeof item === 'object' && item.value) {
                                    _this._addItem({
                                        value: item.value,
                                        label: item.label,
                                        choiceId: item.id,
                                        customProperties: item.customProperties,
                                        placeholder: item.placeholder
                                    });
                                }
                                if (typeof item === 'string') {
                                    _this._addItem({
                                        value: item
                                    });
                                }
                            });
                        };
                        Choices.prototype._setChoiceOrItem = function (item) {
                            var _this = this;
                            var itemType = (0, utils_1.getType)(item).toLowerCase();
                            var handleType = {
                                object: function () {
                                    if (!item.value) {
                                        return;
                                    }
                                    // If we are dealing with a select input, we need to create an option first
                                    // that is then selected. For text inputs we can just add items normally.
                                    if (!_this._isTextElement) {
                                        _this._addChoice({
                                            value: item.value,
                                            label: item.label,
                                            isSelected: true,
                                            isDisabled: false,
                                            customProperties: item.customProperties,
                                            placeholder: item.placeholder
                                        });
                                    }
                                    else {
                                        _this._addItem({
                                            value: item.value,
                                            label: item.label,
                                            choiceId: item.id,
                                            customProperties: item.customProperties,
                                            placeholder: item.placeholder
                                        });
                                    }
                                },
                                string: function () {
                                    if (!_this._isTextElement) {
                                        _this._addChoice({
                                            value: item,
                                            label: item,
                                            isSelected: true,
                                            isDisabled: false
                                        });
                                    }
                                    else {
                                        _this._addItem({
                                            value: item
                                        });
                                    }
                                }
                            };
                            handleType[itemType]();
                        };
                        Choices.prototype._findAndSelectChoiceByValue = function (value) {
                            var _this = this;
                            var choices = this._store.choices;
                            // Check 'value' property exists and the choice isn't already selected
                            var foundChoice = choices.find(function (choice) {
                                return _this.config.valueComparer(choice.value, value);
                            });
                            if (foundChoice && !foundChoice.selected) {
                                this._addItem({
                                    value: foundChoice.value,
                                    label: foundChoice.label,
                                    choiceId: foundChoice.id,
                                    groupId: foundChoice.groupId,
                                    customProperties: foundChoice.customProperties,
                                    placeholder: foundChoice.placeholder,
                                    keyCode: foundChoice.keyCode
                                });
                            }
                        };
                        Choices.prototype._generatePlaceholderValue = function () {
                            if (this._isSelectElement && this.passedElement.placeholderOption) {
                                var placeholderOption = this.passedElement.placeholderOption;
                                return placeholderOption ? placeholderOption.text : null;
                            }
                            var _a = this.config, placeholder = _a.placeholder, placeholderValue = _a.placeholderValue;
                            var dataset = this.passedElement.element.dataset;
                            if (placeholder) {
                                if (placeholderValue) {
                                    return placeholderValue;
                                }
                                if (dataset.placeholder) {
                                    return dataset.placeholder;
                                }
                            }
                            return null;
                        };
                        return Choices;
                    }();
                    exports["default"] = Choices;
                    /***/ 
                }),
                /***/ 613: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var utils_1 = __webpack_require__(799);
                    var constants_1 = __webpack_require__(883);
                    var Container = /** @class */ function () {
                        function Container(_a) {
                            var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
                            this.element = element;
                            this.classNames = classNames;
                            this.type = type;
                            this.position = position;
                            this.isOpen = false;
                            this.isFlipped = false;
                            this.isFocussed = false;
                            this.isDisabled = false;
                            this.isLoading = false;
                            this._onFocus = this._onFocus.bind(this);
                            this._onBlur = this._onBlur.bind(this);
                        }
                        Container.prototype.addEventListeners = function () {
                            this.element.addEventListener('focus', this._onFocus);
                            this.element.addEventListener('blur', this._onBlur);
                        };
                        Container.prototype.removeEventListeners = function () {
                            this.element.removeEventListener('focus', this._onFocus);
                            this.element.removeEventListener('blur', this._onBlur);
                        };
                        /**
                         * Determine whether container should be flipped based on passed
                         * dropdown position
                         */
                        Container.prototype.shouldFlip = function (dropdownPos) {
                            if (typeof dropdownPos !== 'number') {
                                return false;
                            }
                            // If flip is enabled and the dropdown bottom position is
                            // greater than the window height flip the dropdown.
                            var shouldFlip = false;
                            if (this.position === 'auto') {
                                shouldFlip = !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
                            }
                            else if (this.position === 'top') {
                                shouldFlip = true;
                            }
                            return shouldFlip;
                        };
                        Container.prototype.setActiveDescendant = function (activeDescendantID) {
                            this.element.setAttribute('aria-activedescendant', activeDescendantID);
                        };
                        Container.prototype.removeActiveDescendant = function () {
                            this.element.removeAttribute('aria-activedescendant');
                        };
                        Container.prototype.open = function (dropdownPos) {
                            this.element.classList.add(this.classNames.openState);
                            this.element.setAttribute('aria-expanded', 'true');
                            this.isOpen = true;
                            if (this.shouldFlip(dropdownPos)) {
                                this.element.classList.add(this.classNames.flippedState);
                                this.isFlipped = true;
                            }
                        };
                        Container.prototype.close = function () {
                            this.element.classList.remove(this.classNames.openState);
                            this.element.setAttribute('aria-expanded', 'false');
                            this.removeActiveDescendant();
                            this.isOpen = false;
                            // A dropdown flips if it does not have space within the page
                            if (this.isFlipped) {
                                this.element.classList.remove(this.classNames.flippedState);
                                this.isFlipped = false;
                            }
                        };
                        Container.prototype.focus = function () {
                            if (!this.isFocussed) {
                                this.element.focus();
                            }
                        };
                        Container.prototype.addFocusState = function () {
                            this.element.classList.add(this.classNames.focusState);
                        };
                        Container.prototype.removeFocusState = function () {
                            this.element.classList.remove(this.classNames.focusState);
                        };
                        Container.prototype.enable = function () {
                            this.element.classList.remove(this.classNames.disabledState);
                            this.element.removeAttribute('aria-disabled');
                            if (this.type === constants_1.SELECT_ONE_TYPE) {
                                this.element.setAttribute('tabindex', '0');
                            }
                            this.isDisabled = false;
                        };
                        Container.prototype.disable = function () {
                            this.element.classList.add(this.classNames.disabledState);
                            this.element.setAttribute('aria-disabled', 'true');
                            if (this.type === constants_1.SELECT_ONE_TYPE) {
                                this.element.setAttribute('tabindex', '-1');
                            }
                            this.isDisabled = true;
                        };
                        Container.prototype.wrap = function (element) {
                            (0, utils_1.wrap)(element, this.element);
                        };
                        Container.prototype.unwrap = function (element) {
                            if (this.element.parentNode) {
                                // Move passed element outside this element
                                this.element.parentNode.insertBefore(element, this.element);
                                // Remove this element
                                this.element.parentNode.removeChild(this.element);
                            }
                        };
                        Container.prototype.addLoadingState = function () {
                            this.element.classList.add(this.classNames.loadingState);
                            this.element.setAttribute('aria-busy', 'true');
                            this.isLoading = true;
                        };
                        Container.prototype.removeLoadingState = function () {
                            this.element.classList.remove(this.classNames.loadingState);
                            this.element.removeAttribute('aria-busy');
                            this.isLoading = false;
                        };
                        Container.prototype._onFocus = function () {
                            this.isFocussed = true;
                        };
                        Container.prototype._onBlur = function () {
                            this.isFocussed = false;
                        };
                        return Container;
                    }();
                    exports["default"] = Container;
                    /***/ 
                }),
                /***/ 217: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var Dropdown = /** @class */ function () {
                        function Dropdown(_a) {
                            var element = _a.element, type = _a.type, classNames = _a.classNames;
                            this.element = element;
                            this.classNames = classNames;
                            this.type = type;
                            this.isActive = false;
                        }
                        Object.defineProperty(Dropdown.prototype, "distanceFromTopWindow", {
                            /**
                             * Bottom position of dropdown in viewport coordinates
                             */
                            get: function () {
                                return this.element.getBoundingClientRect().bottom;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Dropdown.prototype.getChild = function (selector) {
                            return this.element.querySelector(selector);
                        };
                        /**
                         * Show dropdown to user by adding active state class
                         */
                        Dropdown.prototype.show = function () {
                            this.element.classList.add(this.classNames.activeState);
                            this.element.setAttribute('aria-expanded', 'true');
                            this.isActive = true;
                            return this;
                        };
                        /**
                         * Hide dropdown from user
                         */
                        Dropdown.prototype.hide = function () {
                            this.element.classList.remove(this.classNames.activeState);
                            this.element.setAttribute('aria-expanded', 'false');
                            this.isActive = false;
                            return this;
                        };
                        return Dropdown;
                    }();
                    exports["default"] = Dropdown;
                    /***/ 
                }),
                /***/ 520: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.WrappedSelect = exports.WrappedInput = exports.List = exports.Input = exports.Container = exports.Dropdown = void 0;
                    var dropdown_1 = __importDefault(__webpack_require__(217));
                    exports.Dropdown = dropdown_1.default;
                    var container_1 = __importDefault(__webpack_require__(613));
                    exports.Container = container_1.default;
                    var input_1 = __importDefault(__webpack_require__(11));
                    exports.Input = input_1.default;
                    var list_1 = __importDefault(__webpack_require__(624));
                    exports.List = list_1.default;
                    var wrapped_input_1 = __importDefault(__webpack_require__(541));
                    exports.WrappedInput = wrapped_input_1.default;
                    var wrapped_select_1 = __importDefault(__webpack_require__(982));
                    exports.WrappedSelect = wrapped_select_1.default;
                    /***/ 
                }),
                /***/ 11: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var utils_1 = __webpack_require__(799);
                    var constants_1 = __webpack_require__(883);
                    var Input = /** @class */ function () {
                        function Input(_a) {
                            var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
                            this.element = element;
                            this.type = type;
                            this.classNames = classNames;
                            this.preventPaste = preventPaste;
                            this.isFocussed = this.element.isEqualNode(document.activeElement);
                            this.isDisabled = element.disabled;
                            this._onPaste = this._onPaste.bind(this);
                            this._onInput = this._onInput.bind(this);
                            this._onFocus = this._onFocus.bind(this);
                            this._onBlur = this._onBlur.bind(this);
                        }
                        Object.defineProperty(Input.prototype, "placeholder", {
                            set: function (placeholder) {
                                this.element.placeholder = placeholder;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Input.prototype, "value", {
                            get: function () {
                                return (0, utils_1.sanitise)(this.element.value);
                            },
                            set: function (value) {
                                this.element.value = value;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Input.prototype, "rawValue", {
                            get: function () {
                                return this.element.value;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Input.prototype.addEventListeners = function () {
                            this.element.addEventListener('paste', this._onPaste);
                            this.element.addEventListener('input', this._onInput, {
                                passive: true
                            });
                            this.element.addEventListener('focus', this._onFocus, {
                                passive: true
                            });
                            this.element.addEventListener('blur', this._onBlur, {
                                passive: true
                            });
                        };
                        Input.prototype.removeEventListeners = function () {
                            this.element.removeEventListener('input', this._onInput);
                            this.element.removeEventListener('paste', this._onPaste);
                            this.element.removeEventListener('focus', this._onFocus);
                            this.element.removeEventListener('blur', this._onBlur);
                        };
                        Input.prototype.enable = function () {
                            this.element.removeAttribute('disabled');
                            this.isDisabled = false;
                        };
                        Input.prototype.disable = function () {
                            this.element.setAttribute('disabled', '');
                            this.isDisabled = true;
                        };
                        Input.prototype.focus = function () {
                            if (!this.isFocussed) {
                                this.element.focus();
                            }
                        };
                        Input.prototype.blur = function () {
                            if (this.isFocussed) {
                                this.element.blur();
                            }
                        };
                        Input.prototype.clear = function (setWidth) {
                            if (setWidth === void 0) {
                                setWidth = true;
                            }
                            if (this.element.value) {
                                this.element.value = '';
                            }
                            if (setWidth) {
                                this.setWidth();
                            }
                            return this;
                        };
                        /**
                         * Set the correct input width based on placeholder
                         * value or input value
                         */
                        Input.prototype.setWidth = function () {
                            // Resize input to contents or placeholder
                            var _a = this.element, style = _a.style, value = _a.value, placeholder = _a.placeholder;
                            style.minWidth = "".concat(placeholder.length + 1, "ch");
                            style.width = "".concat(value.length + 1, "ch");
                        };
                        Input.prototype.setActiveDescendant = function (activeDescendantID) {
                            this.element.setAttribute('aria-activedescendant', activeDescendantID);
                        };
                        Input.prototype.removeActiveDescendant = function () {
                            this.element.removeAttribute('aria-activedescendant');
                        };
                        Input.prototype._onInput = function () {
                            if (this.type !== constants_1.SELECT_ONE_TYPE) {
                                this.setWidth();
                            }
                        };
                        Input.prototype._onPaste = function (event) {
                            if (this.preventPaste) {
                                event.preventDefault();
                            }
                        };
                        Input.prototype._onFocus = function () {
                            this.isFocussed = true;
                        };
                        Input.prototype._onBlur = function () {
                            this.isFocussed = false;
                        };
                        return Input;
                    }();
                    exports["default"] = Input;
                    /***/ 
                }),
                /***/ 624: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var constants_1 = __webpack_require__(883);
                    var List = /** @class */ function () {
                        function List(_a) {
                            var element = _a.element;
                            this.element = element;
                            this.scrollPos = this.element.scrollTop;
                            this.height = this.element.offsetHeight;
                        }
                        List.prototype.clear = function () {
                            this.element.innerHTML = '';
                        };
                        List.prototype.append = function (node) {
                            this.element.appendChild(node);
                        };
                        List.prototype.getChild = function (selector) {
                            return this.element.querySelector(selector);
                        };
                        List.prototype.hasChildren = function () {
                            return this.element.hasChildNodes();
                        };
                        List.prototype.scrollToTop = function () {
                            this.element.scrollTop = 0;
                        };
                        List.prototype.scrollToChildElement = function (element, direction) {
                            var _this = this;
                            if (!element) {
                                return;
                            }
                            var listHeight = this.element.offsetHeight;
                            // Scroll position of dropdown
                            var listScrollPosition = this.element.scrollTop + listHeight;
                            var elementHeight = element.offsetHeight;
                            // Distance from bottom of element to top of parent
                            var elementPos = element.offsetTop + elementHeight;
                            // Difference between the element and scroll position
                            var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
                            requestAnimationFrame(function () {
                                _this._animateScroll(destination, direction);
                            });
                        };
                        List.prototype._scrollDown = function (scrollPos, strength, destination) {
                            var easing = (destination - scrollPos) / strength;
                            var distance = easing > 1 ? easing : 1;
                            this.element.scrollTop = scrollPos + distance;
                        };
                        List.prototype._scrollUp = function (scrollPos, strength, destination) {
                            var easing = (scrollPos - destination) / strength;
                            var distance = easing > 1 ? easing : 1;
                            this.element.scrollTop = scrollPos - distance;
                        };
                        List.prototype._animateScroll = function (destination, direction) {
                            var _this = this;
                            var strength = constants_1.SCROLLING_SPEED;
                            var choiceListScrollTop = this.element.scrollTop;
                            var continueAnimation = false;
                            if (direction > 0) {
                                this._scrollDown(choiceListScrollTop, strength, destination);
                                if (choiceListScrollTop < destination) {
                                    continueAnimation = true;
                                }
                            }
                            else {
                                this._scrollUp(choiceListScrollTop, strength, destination);
                                if (choiceListScrollTop > destination) {
                                    continueAnimation = true;
                                }
                            }
                            if (continueAnimation) {
                                requestAnimationFrame(function () {
                                    _this._animateScroll(destination, direction);
                                });
                            }
                        };
                        return List;
                    }();
                    exports["default"] = List;
                    /***/ 
                }),
                /***/ 730: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var utils_1 = __webpack_require__(799);
                    var WrappedElement = /** @class */ function () {
                        function WrappedElement(_a) {
                            var element = _a.element, classNames = _a.classNames;
                            this.element = element;
                            this.classNames = classNames;
                            if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
                                throw new TypeError('Invalid element passed');
                            }
                            this.isDisabled = false;
                        }
                        Object.defineProperty(WrappedElement.prototype, "isActive", {
                            get: function () {
                                return this.element.dataset.choice === 'active';
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(WrappedElement.prototype, "dir", {
                            get: function () {
                                return this.element.dir;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(WrappedElement.prototype, "value", {
                            get: function () {
                                return this.element.value;
                            },
                            set: function (value) {
                                // you must define setter here otherwise it will be readonly property
                                this.element.value = value;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        WrappedElement.prototype.conceal = function () {
                            // Hide passed input
                            this.element.classList.add(this.classNames.input);
                            this.element.hidden = true;
                            // Remove element from tab index
                            this.element.tabIndex = -1;
                            // Backup original styles if any
                            var origStyle = this.element.getAttribute('style');
                            if (origStyle) {
                                this.element.setAttribute('data-choice-orig-style', origStyle);
                            }
                            this.element.setAttribute('data-choice', 'active');
                        };
                        WrappedElement.prototype.reveal = function () {
                            // Reinstate passed element
                            this.element.classList.remove(this.classNames.input);
                            this.element.hidden = false;
                            this.element.removeAttribute('tabindex');
                            // Recover original styles if any
                            var origStyle = this.element.getAttribute('data-choice-orig-style');
                            if (origStyle) {
                                this.element.removeAttribute('data-choice-orig-style');
                                this.element.setAttribute('style', origStyle);
                            }
                            else {
                                this.element.removeAttribute('style');
                            }
                            this.element.removeAttribute('data-choice');
                            // Re-assign values - this is weird, I know
                            // @todo Figure out why we need to do this
                            this.element.value = this.element.value; // eslint-disable-line no-self-assign
                        };
                        WrappedElement.prototype.enable = function () {
                            this.element.removeAttribute('disabled');
                            this.element.disabled = false;
                            this.isDisabled = false;
                        };
                        WrappedElement.prototype.disable = function () {
                            this.element.setAttribute('disabled', '');
                            this.element.disabled = true;
                            this.isDisabled = true;
                        };
                        WrappedElement.prototype.triggerEvent = function (eventType, data) {
                            (0, utils_1.dispatchEvent)(this.element, eventType, data);
                        };
                        return WrappedElement;
                    }();
                    exports["default"] = WrappedElement;
                    /***/ 
                }),
                /***/ 541: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __extends = this && this.__extends || function () {
                        var extendStatics = function (d, b) {
                            extendStatics = Object.setPrototypeOf || {
                                __proto__: []
                            } instanceof Array && function (d, b) {
                                d.__proto__ = b;
                            } || function (d, b) {
                                for (var p in b)
                                    if (Object.prototype.hasOwnProperty.call(b, p))
                                        d[p] = b[p];
                            };
                            return extendStatics(d, b);
                        };
                        return function (d, b) {
                            if (typeof b !== "function" && b !== null)
                                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                            extendStatics(d, b);
                            function __() {
                                this.constructor = d;
                            }
                            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                        };
                    }();
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var wrapped_element_1 = __importDefault(__webpack_require__(730));
                    var WrappedInput = /** @class */ function (_super) {
                        __extends(WrappedInput, _super);
                        function WrappedInput(_a) {
                            var element = _a.element, classNames = _a.classNames, delimiter = _a.delimiter;
                            var _this = _super.call(this, {
                                element: element,
                                classNames: classNames
                            }) || this;
                            _this.delimiter = delimiter;
                            return _this;
                        }
                        Object.defineProperty(WrappedInput.prototype, "value", {
                            get: function () {
                                return this.element.value;
                            },
                            set: function (value) {
                                this.element.setAttribute('value', value);
                                this.element.value = value;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        return WrappedInput;
                    }(wrapped_element_1.default);
                    exports["default"] = WrappedInput;
                    /***/ 
                }),
                /***/ 982: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __extends = this && this.__extends || function () {
                        var extendStatics = function (d, b) {
                            extendStatics = Object.setPrototypeOf || {
                                __proto__: []
                            } instanceof Array && function (d, b) {
                                d.__proto__ = b;
                            } || function (d, b) {
                                for (var p in b)
                                    if (Object.prototype.hasOwnProperty.call(b, p))
                                        d[p] = b[p];
                            };
                            return extendStatics(d, b);
                        };
                        return function (d, b) {
                            if (typeof b !== "function" && b !== null)
                                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                            extendStatics(d, b);
                            function __() {
                                this.constructor = d;
                            }
                            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                        };
                    }();
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var wrapped_element_1 = __importDefault(__webpack_require__(730));
                    var WrappedSelect = /** @class */ function (_super) {
                        __extends(WrappedSelect, _super);
                        function WrappedSelect(_a) {
                            var element = _a.element, classNames = _a.classNames, template = _a.template;
                            var _this = _super.call(this, {
                                element: element,
                                classNames: classNames
                            }) || this;
                            _this.template = template;
                            return _this;
                        }
                        Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
                            get: function () {
                                return this.element.querySelector('option[value=""]') ||
                                    // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
                                    this.element.querySelector('option[placeholder]');
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(WrappedSelect.prototype, "optionGroups", {
                            get: function () {
                                return Array.from(this.element.getElementsByTagName('OPTGROUP'));
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(WrappedSelect.prototype, "options", {
                            get: function () {
                                return Array.from(this.element.options);
                            },
                            set: function (options) {
                                var _this = this;
                                var fragment = document.createDocumentFragment();
                                var addOptionToFragment = function (data) {
                                    // Create a standard select option
                                    var option = _this.template(data);
                                    // Append it to fragment
                                    fragment.appendChild(option);
                                };
                                // Add each list item to list
                                options.forEach(function (optionData) {
                                    return addOptionToFragment(optionData);
                                });
                                this.appendDocFragment(fragment);
                            },
                            enumerable: false,
                            configurable: true
                        });
                        WrappedSelect.prototype.appendDocFragment = function (fragment) {
                            this.element.innerHTML = '';
                            this.element.appendChild(fragment);
                        };
                        return WrappedSelect;
                    }(wrapped_element_1.default);
                    exports["default"] = WrappedSelect;
                    /***/ 
                }),
                /***/ 883: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.SCROLLING_SPEED = exports.SELECT_MULTIPLE_TYPE = exports.SELECT_ONE_TYPE = exports.TEXT_TYPE = exports.KEY_CODES = exports.ACTION_TYPES = exports.EVENTS = void 0;
                    exports.EVENTS = {
                        showDropdown: 'showDropdown',
                        hideDropdown: 'hideDropdown',
                        change: 'change',
                        choice: 'choice',
                        search: 'search',
                        addItem: 'addItem',
                        removeItem: 'removeItem',
                        highlightItem: 'highlightItem',
                        highlightChoice: 'highlightChoice',
                        unhighlightItem: 'unhighlightItem'
                    };
                    exports.ACTION_TYPES = {
                        ADD_CHOICE: 'ADD_CHOICE',
                        FILTER_CHOICES: 'FILTER_CHOICES',
                        ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
                        CLEAR_CHOICES: 'CLEAR_CHOICES',
                        ADD_GROUP: 'ADD_GROUP',
                        ADD_ITEM: 'ADD_ITEM',
                        REMOVE_ITEM: 'REMOVE_ITEM',
                        HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
                        CLEAR_ALL: 'CLEAR_ALL',
                        RESET_TO: 'RESET_TO',
                        SET_IS_LOADING: 'SET_IS_LOADING'
                    };
                    exports.KEY_CODES = {
                        BACK_KEY: 46,
                        DELETE_KEY: 8,
                        ENTER_KEY: 13,
                        A_KEY: 65,
                        ESC_KEY: 27,
                        UP_KEY: 38,
                        DOWN_KEY: 40,
                        PAGE_UP_KEY: 33,
                        PAGE_DOWN_KEY: 34
                    };
                    exports.TEXT_TYPE = 'text';
                    exports.SELECT_ONE_TYPE = 'select-one';
                    exports.SELECT_MULTIPLE_TYPE = 'select-multiple';
                    exports.SCROLLING_SPEED = 4;
                    /***/ 
                }),
                /***/ 789: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.DEFAULT_CONFIG = exports.DEFAULT_CLASSNAMES = void 0;
                    var utils_1 = __webpack_require__(799);
                    exports.DEFAULT_CLASSNAMES = {
                        containerOuter: 'choices',
                        containerInner: 'choices__inner',
                        input: 'choices__input',
                        inputCloned: 'choices__input--cloned',
                        list: 'choices__list',
                        listItems: 'choices__list--multiple',
                        listSingle: 'choices__list--single',
                        listDropdown: 'choices__list--dropdown',
                        item: 'choices__item',
                        itemSelectable: 'choices__item--selectable',
                        itemDisabled: 'choices__item--disabled',
                        itemChoice: 'choices__item--choice',
                        placeholder: 'choices__placeholder',
                        group: 'choices__group',
                        groupHeading: 'choices__heading',
                        button: 'choices__button',
                        activeState: 'is-active',
                        focusState: 'is-focused',
                        openState: 'is-open',
                        disabledState: 'is-disabled',
                        highlightedState: 'is-highlighted',
                        selectedState: 'is-selected',
                        flippedState: 'is-flipped',
                        loadingState: 'is-loading',
                        noResults: 'has-no-results',
                        noChoices: 'has-no-choices'
                    };
                    exports.DEFAULT_CONFIG = {
                        items: [],
                        choices: [],
                        silent: false,
                        renderChoiceLimit: -1,
                        maxItemCount: -1,
                        addItems: true,
                        addItemFilter: null,
                        removeItems: true,
                        removeItemButton: false,
                        editItems: false,
                        allowHTML: true,
                        duplicateItemsAllowed: true,
                        delimiter: ',',
                        paste: true,
                        searchEnabled: true,
                        searchChoices: true,
                        searchFloor: 1,
                        searchResultLimit: 4,
                        searchFields: ['label', 'value'],
                        position: 'auto',
                        resetScrollPosition: true,
                        shouldSort: true,
                        shouldSortItems: false,
                        sorter: utils_1.sortByAlpha,
                        placeholder: true,
                        placeholderValue: null,
                        searchPlaceholderValue: null,
                        prependValue: null,
                        appendValue: null,
                        renderSelectedChoices: 'auto',
                        loadingText: 'Loading...',
                        noResultsText: 'No results found',
                        noChoicesText: 'No choices to choose from',
                        itemSelectText: 'Press to select',
                        uniqueItemText: 'Only unique values can be added',
                        customAddItemText: 'Only values matching specific conditions can be added',
                        addItemText: function (value) {
                            return "Press Enter to add <b>\"".concat((0, utils_1.sanitise)(value), "\"</b>");
                        },
                        maxItemText: function (maxItemCount) {
                            return "Only ".concat(maxItemCount, " values can be added");
                        },
                        valueComparer: function (value1, value2) {
                            return value1 === value2;
                        },
                        fuseOptions: {
                            includeScore: true
                        },
                        labelId: '',
                        callbackOnInit: null,
                        callbackOnCreateTemplates: null,
                        classNames: exports.DEFAULT_CLASSNAMES
                    };
                    /***/ 
                }),
                /***/ 18: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 978: 
                /***/ (function (__unused_webpack_module, exports) {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 948: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 359: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 285: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 533: 
                /***/ (function (__unused_webpack_module, exports) {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 187: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                        if (k2 === undefined)
                            k2 = k;
                        var desc = Object.getOwnPropertyDescriptor(m, k);
                        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                            desc = {
                                enumerable: true,
                                get: function () {
                                    return m[k];
                                }
                            };
                        }
                        Object.defineProperty(o, k2, desc);
                    } : function (o, m, k, k2) {
                        if (k2 === undefined)
                            k2 = k;
                        o[k2] = m[k];
                    });
                    var __exportStar = this && this.__exportStar || function (m, exports) {
                        for (var p in m)
                            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                                __createBinding(exports, m, p);
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    __exportStar(__webpack_require__(18), exports);
                    __exportStar(__webpack_require__(978), exports);
                    __exportStar(__webpack_require__(948), exports);
                    __exportStar(__webpack_require__(359), exports);
                    __exportStar(__webpack_require__(285), exports);
                    __exportStar(__webpack_require__(533), exports);
                    __exportStar(__webpack_require__(287), exports);
                    __exportStar(__webpack_require__(132), exports);
                    __exportStar(__webpack_require__(837), exports);
                    __exportStar(__webpack_require__(598), exports);
                    __exportStar(__webpack_require__(369), exports);
                    __exportStar(__webpack_require__(37), exports);
                    __exportStar(__webpack_require__(47), exports);
                    __exportStar(__webpack_require__(923), exports);
                    __exportStar(__webpack_require__(876), exports);
                    /***/ 
                }),
                /***/ 287: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 132: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 837: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 598: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 37: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 369: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 47: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 923: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 876: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /***/ 
                }),
                /***/ 799: 
                /***/ (function (__unused_webpack_module, exports) {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.parseCustomProperties = exports.diff = exports.cloneObject = exports.existsInArray = exports.dispatchEvent = exports.sortByScore = exports.sortByAlpha = exports.strToEl = exports.sanitise = exports.isScrolledIntoView = exports.getAdjacentEl = exports.wrap = exports.isType = exports.getType = exports.generateId = exports.generateChars = exports.getRandomNumber = void 0;
                    var getRandomNumber = function (min, max) {
                        return Math.floor(Math.random() * (max - min) + min);
                    };
                    exports.getRandomNumber = getRandomNumber;
                    var generateChars = function (length) {
                        return Array.from({
                            length: length
                        }, function () {
                            return (0, exports.getRandomNumber)(0, 36).toString(36);
                        }).join('');
                    };
                    exports.generateChars = generateChars;
                    var generateId = function (element, prefix) {
                        var id = element.id || element.name && "".concat(element.name, "-").concat((0, exports.generateChars)(2)) || (0, exports.generateChars)(4);
                        id = id.replace(/(:|\.|\[|\]|,)/g, '');
                        id = "".concat(prefix, "-").concat(id);
                        return id;
                    };
                    exports.generateId = generateId;
                    var getType = function (obj) {
                        return Object.prototype.toString.call(obj).slice(8, -1);
                    };
                    exports.getType = getType;
                    var isType = function (type, obj) {
                        return obj !== undefined && obj !== null && (0, exports.getType)(obj) === type;
                    };
                    exports.isType = isType;
                    var wrap = function (element, wrapper) {
                        if (wrapper === void 0) {
                            wrapper = document.createElement('div');
                        }
                        if (element.parentNode) {
                            if (element.nextSibling) {
                                element.parentNode.insertBefore(wrapper, element.nextSibling);
                            }
                            else {
                                element.parentNode.appendChild(wrapper);
                            }
                        }
                        return wrapper.appendChild(element);
                    };
                    exports.wrap = wrap;
                    var getAdjacentEl = function (startEl, selector, direction) {
                        if (direction === void 0) {
                            direction = 1;
                        }
                        var prop = "".concat(direction > 0 ? 'next' : 'previous', "ElementSibling");
                        var sibling = startEl[prop];
                        while (sibling) {
                            if (sibling.matches(selector)) {
                                return sibling;
                            }
                            sibling = sibling[prop];
                        }
                        return sibling;
                    };
                    exports.getAdjacentEl = getAdjacentEl;
                    var isScrolledIntoView = function (element, parent, direction) {
                        if (direction === void 0) {
                            direction = 1;
                        }
                        if (!element) {
                            return false;
                        }
                        var isVisible;
                        if (direction > 0) {
                            // In view from bottom
                            isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
                        }
                        else {
                            // In view from top
                            isVisible = element.offsetTop >= parent.scrollTop;
                        }
                        return isVisible;
                    };
                    exports.isScrolledIntoView = isScrolledIntoView;
                    var sanitise = function (value) {
                        if (typeof value !== 'string') {
                            return value;
                        }
                        return value.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
                    };
                    exports.sanitise = sanitise;
                    exports.strToEl = function () {
                        var tmpEl = document.createElement('div');
                        return function (str) {
                            var cleanedInput = str.trim();
                            tmpEl.innerHTML = cleanedInput;
                            var firldChild = tmpEl.children[0];
                            while (tmpEl.firstChild) {
                                tmpEl.removeChild(tmpEl.firstChild);
                            }
                            return firldChild;
                        };
                    }();
                    var sortByAlpha = function (_a, _b) {
                        var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
                        var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
                        return label.localeCompare(label2, [], {
                            sensitivity: 'base',
                            ignorePunctuation: true,
                            numeric: true
                        });
                    };
                    exports.sortByAlpha = sortByAlpha;
                    var sortByScore = function (a, b) {
                        var _a = a.score, scoreA = _a === void 0 ? 0 : _a;
                        var _b = b.score, scoreB = _b === void 0 ? 0 : _b;
                        return scoreA - scoreB;
                    };
                    exports.sortByScore = sortByScore;
                    var dispatchEvent = function (element, type, customArgs) {
                        if (customArgs === void 0) {
                            customArgs = null;
                        }
                        var event = new CustomEvent(type, {
                            detail: customArgs,
                            bubbles: true,
                            cancelable: true
                        });
                        return element.dispatchEvent(event);
                    };
                    exports.dispatchEvent = dispatchEvent;
                    var existsInArray = function (array, value, key) {
                        if (key === void 0) {
                            key = 'value';
                        }
                        return array.some(function (item) {
                            if (typeof value === 'string') {
                                return item[key] === value.trim();
                            }
                            return item[key] === value;
                        });
                    };
                    exports.existsInArray = existsInArray;
                    var cloneObject = function (obj) {
                        return JSON.parse(JSON.stringify(obj));
                    };
                    exports.cloneObject = cloneObject;
                    /**
                     * Returns an array of keys present on the first but missing on the second object
                     */
                    var diff = function (a, b) {
                        var aKeys = Object.keys(a).sort();
                        var bKeys = Object.keys(b).sort();
                        return aKeys.filter(function (i) {
                            return bKeys.indexOf(i) < 0;
                        });
                    };
                    exports.diff = diff;
                    var parseCustomProperties = function (customProperties) {
                        if (typeof customProperties !== 'undefined') {
                            try {
                                return JSON.parse(customProperties);
                            }
                            catch (e) {
                                return customProperties;
                            }
                        }
                        return {};
                    };
                    exports.parseCustomProperties = parseCustomProperties;
                    /***/ 
                }),
                /***/ 273: 
                /***/ (function (__unused_webpack_module, exports) {
                    var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
                        if (pack || arguments.length === 2)
                            for (var i = 0, l = from.length, ar; i < l; i++) {
                                if (ar || !(i in from)) {
                                    if (!ar)
                                        ar = Array.prototype.slice.call(from, 0, i);
                                    ar[i] = from[i];
                                }
                            }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.defaultState = void 0;
                    exports.defaultState = [];
                    function choices(state, action) {
                        if (state === void 0) {
                            state = exports.defaultState;
                        }
                        if (action === void 0) {
                            action = {};
                        }
                        switch (action.type) {
                            case 'ADD_CHOICE':
                                {
                                    var addChoiceAction = action;
                                    var choice = {
                                        id: addChoiceAction.id,
                                        elementId: addChoiceAction.elementId,
                                        groupId: addChoiceAction.groupId,
                                        value: addChoiceAction.value,
                                        label: addChoiceAction.label || addChoiceAction.value,
                                        disabled: addChoiceAction.disabled || false,
                                        selected: false,
                                        active: true,
                                        score: 9999,
                                        customProperties: addChoiceAction.customProperties,
                                        placeholder: addChoiceAction.placeholder || false
                                    };
                                    /*
                                      A disabled choice appears in the choice dropdown but cannot be selected
                                      A selected choice has been added to the passed input's value (added as an item)
                                      An active choice appears within the choice dropdown
                                    */
                                    return __spreadArray(__spreadArray([], state, true), [choice], false);
                                }
                            case 'ADD_ITEM':
                                {
                                    var addItemAction_1 = action;
                                    // When an item is added and it has an associated choice,
                                    // we want to disable it so it can't be chosen again
                                    if (addItemAction_1.choiceId > -1) {
                                        return state.map(function (obj) {
                                            var choice = obj;
                                            if (choice.id === parseInt("".concat(addItemAction_1.choiceId), 10)) {
                                                choice.selected = true;
                                            }
                                            return choice;
                                        });
                                    }
                                    return state;
                                }
                            case 'REMOVE_ITEM':
                                {
                                    var removeItemAction_1 = action;
                                    // When an item is removed and it has an associated choice,
                                    // we want to re-enable it so it can be chosen again
                                    if (removeItemAction_1.choiceId && removeItemAction_1.choiceId > -1) {
                                        return state.map(function (obj) {
                                            var choice = obj;
                                            if (choice.id === parseInt("".concat(removeItemAction_1.choiceId), 10)) {
                                                choice.selected = false;
                                            }
                                            return choice;
                                        });
                                    }
                                    return state;
                                }
                            case 'FILTER_CHOICES':
                                {
                                    var filterChoicesAction_1 = action;
                                    return state.map(function (obj) {
                                        var choice = obj;
                                        // Set active state based on whether choice is
                                        // within filtered results
                                        choice.active = filterChoicesAction_1.results.some(function (_a) {
                                            var item = _a.item, score = _a.score;
                                            if (item.id === choice.id) {
                                                choice.score = score;
                                                return true;
                                            }
                                            return false;
                                        });
                                        return choice;
                                    });
                                }
                            case 'ACTIVATE_CHOICES':
                                {
                                    var activateChoicesAction_1 = action;
                                    return state.map(function (obj) {
                                        var choice = obj;
                                        choice.active = activateChoicesAction_1.active;
                                        return choice;
                                    });
                                }
                            case 'CLEAR_CHOICES':
                                {
                                    return exports.defaultState;
                                }
                            default:
                                {
                                    return state;
                                }
                        }
                    }
                    exports["default"] = choices;
                    /***/ 
                }),
                /***/ 871: 
                /***/ (function (__unused_webpack_module, exports) {
                    var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
                        if (pack || arguments.length === 2)
                            for (var i = 0, l = from.length, ar; i < l; i++) {
                                if (ar || !(i in from)) {
                                    if (!ar)
                                        ar = Array.prototype.slice.call(from, 0, i);
                                    ar[i] = from[i];
                                }
                            }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.defaultState = void 0;
                    exports.defaultState = [];
                    function groups(state, action) {
                        if (state === void 0) {
                            state = exports.defaultState;
                        }
                        if (action === void 0) {
                            action = {};
                        }
                        switch (action.type) {
                            case 'ADD_GROUP':
                                {
                                    var addGroupAction = action;
                                    return __spreadArray(__spreadArray([], state, true), [{
                                            id: addGroupAction.id,
                                            value: addGroupAction.value,
                                            active: addGroupAction.active,
                                            disabled: addGroupAction.disabled
                                        }], false);
                                }
                            case 'CLEAR_CHOICES':
                                {
                                    return [];
                                }
                            default:
                                {
                                    return state;
                                }
                        }
                    }
                    exports["default"] = groups;
                    /***/ 
                }),
                /***/ 655: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.defaultState = void 0;
                    var redux_1 = __webpack_require__(791);
                    var items_1 = __importDefault(__webpack_require__(52));
                    var groups_1 = __importDefault(__webpack_require__(871));
                    var choices_1 = __importDefault(__webpack_require__(273));
                    var loading_1 = __importDefault(__webpack_require__(502));
                    var utils_1 = __webpack_require__(799);
                    exports.defaultState = {
                        groups: [],
                        items: [],
                        choices: [],
                        loading: false
                    };
                    var appReducer = (0, redux_1.combineReducers)({
                        items: items_1.default,
                        groups: groups_1.default,
                        choices: choices_1.default,
                        loading: loading_1.default
                    });
                    var rootReducer = function (passedState, action) {
                        var state = passedState;
                        // If we are clearing all items, groups and options we reassign
                        // state and then pass that state to our proper reducer. This isn't
                        // mutating our actual state
                        // See: http://stackoverflow.com/a/35641992
                        if (action.type === 'CLEAR_ALL') {
                            state = exports.defaultState;
                        }
                        else if (action.type === 'RESET_TO') {
                            return (0, utils_1.cloneObject)(action.state);
                        }
                        return appReducer(state, action);
                    };
                    exports["default"] = rootReducer;
                    /***/ 
                }),
                /***/ 52: 
                /***/ (function (__unused_webpack_module, exports) {
                    var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
                        if (pack || arguments.length === 2)
                            for (var i = 0, l = from.length, ar; i < l; i++) {
                                if (ar || !(i in from)) {
                                    if (!ar)
                                        ar = Array.prototype.slice.call(from, 0, i);
                                    ar[i] = from[i];
                                }
                            }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.defaultState = void 0;
                    exports.defaultState = [];
                    function items(state, action) {
                        if (state === void 0) {
                            state = exports.defaultState;
                        }
                        if (action === void 0) {
                            action = {};
                        }
                        switch (action.type) {
                            case 'ADD_ITEM':
                                {
                                    var addItemAction = action;
                                    // Add object to items array
                                    var newState = __spreadArray(__spreadArray([], state, true), [{
                                            id: addItemAction.id,
                                            choiceId: addItemAction.choiceId,
                                            groupId: addItemAction.groupId,
                                            value: addItemAction.value,
                                            label: addItemAction.label,
                                            active: true,
                                            highlighted: false,
                                            customProperties: addItemAction.customProperties,
                                            placeholder: addItemAction.placeholder || false,
                                            keyCode: null
                                        }], false);
                                    return newState.map(function (obj) {
                                        var item = obj;
                                        item.highlighted = false;
                                        return item;
                                    });
                                }
                            case 'REMOVE_ITEM':
                                {
                                    // Set item to inactive
                                    return state.map(function (obj) {
                                        var item = obj;
                                        if (item.id === action.id) {
                                            item.active = false;
                                        }
                                        return item;
                                    });
                                }
                            case 'HIGHLIGHT_ITEM':
                                {
                                    var highlightItemAction_1 = action;
                                    return state.map(function (obj) {
                                        var item = obj;
                                        if (item.id === highlightItemAction_1.id) {
                                            item.highlighted = highlightItemAction_1.highlighted;
                                        }
                                        return item;
                                    });
                                }
                            default:
                                {
                                    return state;
                                }
                        }
                    }
                    exports["default"] = items;
                    /***/ 
                }),
                /***/ 502: 
                /***/ (function (__unused_webpack_module, exports) {
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    exports.defaultState = void 0;
                    exports.defaultState = false;
                    var general = function (state, action) {
                        if (state === void 0) {
                            state = exports.defaultState;
                        }
                        if (action === void 0) {
                            action = {};
                        }
                        switch (action.type) {
                            case 'SET_IS_LOADING':
                                {
                                    return action.isLoading;
                                }
                            default:
                                {
                                    return state;
                                }
                        }
                    };
                    exports["default"] = general;
                    /***/ 
                }),
                /***/ 744: 
                /***/ (function (__unused_webpack_module, exports, __webpack_require__) {
                    var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
                        if (pack || arguments.length === 2)
                            for (var i = 0, l = from.length, ar; i < l; i++) {
                                if (ar || !(i in from)) {
                                    if (!ar)
                                        ar = Array.prototype.slice.call(from, 0, i);
                                    ar[i] = from[i];
                                }
                            }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    };
                    var __importDefault = this && this.__importDefault || function (mod) {
                        return mod && mod.__esModule ? mod : {
                            "default": mod
                        };
                    };
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    var redux_1 = __webpack_require__(791);
                    var index_1 = __importDefault(__webpack_require__(655));
                    var Store = /** @class */ function () {
                        function Store() {
                            this._store = (0, redux_1.createStore)(index_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
                        }
                        /**
                         * Subscribe store to function call (wrapped Redux method)
                         */
                        Store.prototype.subscribe = function (onChange) {
                            this._store.subscribe(onChange);
                        };
                        /**
                         * Dispatch event to store (wrapped Redux method)
                         */
                        Store.prototype.dispatch = function (action) {
                            this._store.dispatch(action);
                        };
                        Object.defineProperty(Store.prototype, "state", {
                            /**
                             * Get store object (wrapping Redux method)
                             */
                            get: function () {
                                return this._store.getState();
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "items", {
                            /**
                             * Get items from store
                             */
                            get: function () {
                                return this.state.items;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "activeItems", {
                            /**
                             * Get active items from store
                             */
                            get: function () {
                                return this.items.filter(function (item) {
                                    return item.active === true;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "highlightedActiveItems", {
                            /**
                             * Get highlighted items from store
                             */
                            get: function () {
                                return this.items.filter(function (item) {
                                    return item.active && item.highlighted;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "choices", {
                            /**
                             * Get choices from store
                             */
                            get: function () {
                                return this.state.choices;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "activeChoices", {
                            /**
                             * Get active choices from store
                             */
                            get: function () {
                                return this.choices.filter(function (choice) {
                                    return choice.active === true;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "selectableChoices", {
                            /**
                             * Get selectable choices from store
                             */
                            get: function () {
                                return this.choices.filter(function (choice) {
                                    return choice.disabled !== true;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "searchableChoices", {
                            /**
                             * Get choices that can be searched (excluding placeholders)
                             */
                            get: function () {
                                return this.selectableChoices.filter(function (choice) {
                                    return choice.placeholder !== true;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "placeholderChoice", {
                            /**
                             * Get placeholder choice from store
                             */
                            get: function () {
                                return __spreadArray([], this.choices, true).reverse().find(function (choice) {
                                    return choice.placeholder === true;
                                });
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "groups", {
                            /**
                             * Get groups from store
                             */
                            get: function () {
                                return this.state.groups;
                            },
                            enumerable: false,
                            configurable: true
                        });
                        Object.defineProperty(Store.prototype, "activeGroups", {
                            /**
                             * Get active groups from store
                             */
                            get: function () {
                                var _a = this, groups = _a.groups, choices = _a.choices;
                                return groups.filter(function (group) {
                                    var isActive = group.active === true && group.disabled === false;
                                    var hasActiveOptions = choices.some(function (choice) {
                                        return choice.active === true && choice.disabled === false;
                                    });
                                    return isActive && hasActiveOptions;
                                }, []);
                            },
                            enumerable: false,
                            configurable: true
                        });
                        /**
                         * Get loading state from store
                         */
                        Store.prototype.isLoading = function () {
                            return this.state.loading;
                        };
                        /**
                         * Get single choice by it's ID
                         */
                        Store.prototype.getChoiceById = function (id) {
                            return this.activeChoices.find(function (choice) {
                                return choice.id === parseInt(id, 10);
                            });
                        };
                        /**
                         * Get group by group id
                         */
                        Store.prototype.getGroupById = function (id) {
                            return this.groups.find(function (group) {
                                return group.id === id;
                            });
                        };
                        return Store;
                    }();
                    exports["default"] = Store;
                    /***/ 
                }),
                /***/ 686: 
                /***/ (function (__unused_webpack_module, exports) {
                    /**
                     * Helpers to create HTML elements used by Choices
                     * Can be overridden by providing `callbackOnCreateTemplates` option
                     */
                    Object.defineProperty(exports, "__esModule", ({
                        value: true
                    }));
                    var templates = {
                        containerOuter: function (_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
                            var containerOuter = _a.classNames.containerOuter;
                            var div = Object.assign(document.createElement('div'), {
                                className: containerOuter
                            });
                            div.dataset.type = passedElementType;
                            if (dir) {
                                div.dir = dir;
                            }
                            if (isSelectOneElement) {
                                div.tabIndex = 0;
                            }
                            if (isSelectElement) {
                                div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');
                                if (searchEnabled) {
                                    div.setAttribute('aria-autocomplete', 'list');
                                }
                            }
                            div.setAttribute('aria-haspopup', 'true');
                            div.setAttribute('aria-expanded', 'false');
                            if (labelId) {
                                div.setAttribute('aria-labelledby', labelId);
                            }
                            return div;
                        },
                        containerInner: function (_a) {
                            var containerInner = _a.classNames.containerInner;
                            return Object.assign(document.createElement('div'), {
                                className: containerInner
                            });
                        },
                        itemList: function (_a, isSelectOneElement) {
                            var _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
                            return Object.assign(document.createElement('div'), {
                                className: "".concat(list, " ").concat(isSelectOneElement ? listSingle : listItems)
                            });
                        },
                        placeholder: function (_a, value) {
                            var _b;
                            var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
                            return Object.assign(document.createElement('div'), (_b = {
                                className: placeholder
                            }, _b[allowHTML ? 'innerHTML' : 'innerText'] = value, _b));
                        },
                        item: function (_a, _b, removeItemButton) {
                            var _c, _d;
                            var allowHTML = _a.allowHTML, _e = _a.classNames, item = _e.item, button = _e.button, highlightedState = _e.highlightedState, itemSelectable = _e.itemSelectable, placeholder = _e.placeholder;
                            var id = _b.id, value = _b.value, label = _b.label, customProperties = _b.customProperties, active = _b.active, disabled = _b.disabled, highlighted = _b.highlighted, isPlaceholder = _b.placeholder;
                            var div = Object.assign(document.createElement('div'), (_c = {
                                className: item
                            }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c));
                            Object.assign(div.dataset, {
                                item: '',
                                id: id,
                                value: value,
                                customProperties: customProperties
                            });
                            if (active) {
                                div.setAttribute('aria-selected', 'true');
                            }
                            if (disabled) {
                                div.setAttribute('aria-disabled', 'true');
                            }
                            if (isPlaceholder) {
                                div.classList.add(placeholder);
                            }
                            div.classList.add(highlighted ? highlightedState : itemSelectable);
                            if (removeItemButton) {
                                if (disabled) {
                                    div.classList.remove(itemSelectable);
                                }
                                div.dataset.deletable = '';
                                /** @todo This MUST be localizable, not hardcoded! */
                                var REMOVE_ITEM_TEXT = 'Remove item';
                                var removeButton = Object.assign(document.createElement('button'), (_d = {
                                    type: 'button',
                                    className: button
                                }, _d[allowHTML ? 'innerHTML' : 'innerText'] = REMOVE_ITEM_TEXT, _d));
                                removeButton.setAttribute('aria-label', "".concat(REMOVE_ITEM_TEXT, ": '").concat(value, "'"));
                                removeButton.dataset.button = '';
                                div.appendChild(removeButton);
                            }
                            return div;
                        },
                        choiceList: function (_a, isSelectOneElement) {
                            var list = _a.classNames.list;
                            var div = Object.assign(document.createElement('div'), {
                                className: list
                            });
                            if (!isSelectOneElement) {
                                div.setAttribute('aria-multiselectable', 'true');
                            }
                            div.setAttribute('role', 'listbox');
                            return div;
                        },
                        choiceGroup: function (_a, _b) {
                            var _c;
                            var allowHTML = _a.allowHTML, _d = _a.classNames, group = _d.group, groupHeading = _d.groupHeading, itemDisabled = _d.itemDisabled;
                            var id = _b.id, value = _b.value, disabled = _b.disabled;
                            var div = Object.assign(document.createElement('div'), {
                                className: "".concat(group, " ").concat(disabled ? itemDisabled : '')
                            });
                            div.setAttribute('role', 'group');
                            Object.assign(div.dataset, {
                                group: '',
                                id: id,
                                value: value
                            });
                            if (disabled) {
                                div.setAttribute('aria-disabled', 'true');
                            }
                            div.appendChild(Object.assign(document.createElement('div'), (_c = {
                                className: groupHeading
                            }, _c[allowHTML ? 'innerHTML' : 'innerText'] = value, _c)));
                            return div;
                        },
                        choice: function (_a, _b, selectText) {
                            var _c;
                            var allowHTML = _a.allowHTML, _d = _a.classNames, item = _d.item, itemChoice = _d.itemChoice, itemSelectable = _d.itemSelectable, selectedState = _d.selectedState, itemDisabled = _d.itemDisabled, placeholder = _d.placeholder;
                            var id = _b.id, value = _b.value, label = _b.label, groupId = _b.groupId, elementId = _b.elementId, isDisabled = _b.disabled, isSelected = _b.selected, isPlaceholder = _b.placeholder;
                            var div = Object.assign(document.createElement('div'), (_c = {
                                id: elementId
                            }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c.className = "".concat(item, " ").concat(itemChoice), _c));
                            if (isSelected) {
                                div.classList.add(selectedState);
                            }
                            if (isPlaceholder) {
                                div.classList.add(placeholder);
                            }
                            div.setAttribute('role', groupId && groupId > 0 ? 'treeitem' : 'option');
                            Object.assign(div.dataset, {
                                choice: '',
                                id: id,
                                value: value,
                                selectText: selectText
                            });
                            if (isDisabled) {
                                div.classList.add(itemDisabled);
                                div.dataset.choiceDisabled = '';
                                div.setAttribute('aria-disabled', 'true');
                            }
                            else {
                                div.classList.add(itemSelectable);
                                div.dataset.choiceSelectable = '';
                            }
                            return div;
                        },
                        input: function (_a, placeholderValue) {
                            var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned;
                            var inp = Object.assign(document.createElement('input'), {
                                type: 'search',
                                name: 'search_terms',
                                className: "".concat(input, " ").concat(inputCloned),
                                autocomplete: 'off',
                                autocapitalize: 'off',
                                spellcheck: false
                            });
                            inp.setAttribute('role', 'textbox');
                            inp.setAttribute('aria-autocomplete', 'list');
                            inp.setAttribute('aria-label', placeholderValue);
                            return inp;
                        },
                        dropdown: function (_a) {
                            var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
                            var div = document.createElement('div');
                            div.classList.add(list, listDropdown);
                            div.setAttribute('aria-expanded', 'false');
                            return div;
                        },
                        notice: function (_a, innerText, type) {
                            var _b;
                            var allowHTML = _a.allowHTML, _c = _a.classNames, item = _c.item, itemChoice = _c.itemChoice, noResults = _c.noResults, noChoices = _c.noChoices;
                            if (type === void 0) {
                                type = '';
                            }
                            var classes = [item, itemChoice];
                            if (type === 'no-choices') {
                                classes.push(noChoices);
                            }
                            else if (type === 'no-results') {
                                classes.push(noResults);
                            }
                            return Object.assign(document.createElement('div'), (_b = {}, _b[allowHTML ? 'innerHTML' : 'innerText'] = innerText, _b.className = classes.join(' '), _b));
                        },
                        option: function (_a) {
                            var label = _a.label, value = _a.value, customProperties = _a.customProperties, active = _a.active, disabled = _a.disabled;
                            var opt = new Option(label, value, false, active);
                            if (customProperties) {
                                opt.dataset.customProperties = "".concat(customProperties);
                            }
                            opt.disabled = !!disabled;
                            return opt;
                        }
                    };
                    exports["default"] = templates;
                    /***/ 
                }),
                /***/ 996: 
                /***/ (function (module) {
                    var isMergeableObject = function isMergeableObject(value) {
                        return isNonNullObject(value)
                            && !isSpecial(value);
                    };
                    function isNonNullObject(value) {
                        return !!value && typeof value === 'object';
                    }
                    function isSpecial(value) {
                        var stringValue = Object.prototype.toString.call(value);
                        return stringValue === '[object RegExp]'
                            || stringValue === '[object Date]'
                            || isReactElement(value);
                    }
                    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
                    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
                    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
                    function isReactElement(value) {
                        return value.$$typeof === REACT_ELEMENT_TYPE;
                    }
                    function emptyTarget(val) {
                        return Array.isArray(val) ? [] : {};
                    }
                    function cloneUnlessOtherwiseSpecified(value, options) {
                        return (options.clone !== false && options.isMergeableObject(value))
                            ? deepmerge(emptyTarget(value), value, options)
                            : value;
                    }
                    function defaultArrayMerge(target, source, options) {
                        return target.concat(source).map(function (element) {
                            return cloneUnlessOtherwiseSpecified(element, options);
                        });
                    }
                    function getMergeFunction(key, options) {
                        if (!options.customMerge) {
                            return deepmerge;
                        }
                        var customMerge = options.customMerge(key);
                        return typeof customMerge === 'function' ? customMerge : deepmerge;
                    }
                    function getEnumerableOwnPropertySymbols(target) {
                        return Object.getOwnPropertySymbols
                            ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
                                return target.propertyIsEnumerable(symbol);
                            })
                            : [];
                    }
                    function getKeys(target) {
                        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
                    }
                    function propertyIsOnObject(object, property) {
                        try {
                            return property in object;
                        }
                        catch (_) {
                            return false;
                        }
                    }
                    // Protects from prototype poisoning and unexpected merging up the prototype chain.
                    function propertyIsUnsafe(target, key) {
                        return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
                            && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
                                && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
                    }
                    function mergeObject(target, source, options) {
                        var destination = {};
                        if (options.isMergeableObject(target)) {
                            getKeys(target).forEach(function (key) {
                                destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
                            });
                        }
                        getKeys(source).forEach(function (key) {
                            if (propertyIsUnsafe(target, key)) {
                                return;
                            }
                            if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
                                destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
                            }
                            else {
                                destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
                            }
                        });
                        return destination;
                    }
                    function deepmerge(target, source, options) {
                        options = options || {};
                        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
                        options.isMergeableObject = options.isMergeableObject || isMergeableObject;
                        // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
                        // implementations can use it. The caller may not replace it.
                        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
                        var sourceIsArray = Array.isArray(source);
                        var targetIsArray = Array.isArray(target);
                        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
                        if (!sourceAndTargetTypesMatch) {
                            return cloneUnlessOtherwiseSpecified(source, options);
                        }
                        else if (sourceIsArray) {
                            return options.arrayMerge(target, source, options);
                        }
                        else {
                            return mergeObject(target, source, options);
                        }
                    }
                    deepmerge.all = function deepmergeAll(array, options) {
                        if (!Array.isArray(array)) {
                            throw new Error('first argument should be an array');
                        }
                        return array.reduce(function (prev, next) {
                            return deepmerge(prev, next, options);
                        }, {});
                    };
                    var deepmerge_1 = deepmerge;
                    module.exports = deepmerge_1;
                    /***/ 
                }),
                /***/ 221: 
                /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                    __webpack_require__.r(__webpack_exports__);
                    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                        /* harmony export */ "default": function () { return /* binding */ Fuse; }
                        /* harmony export */ 
                    });
                    /**
                     * Fuse.js v6.6.2 - Lightweight fuzzy-search (http://fusejs.io)
                     *
                     * Copyright (c) 2022 Kiro Risk (http://kiro.me)
                     * All Rights Reserved. Apache Software License 2.0
                     *
                     * http://www.apache.org/licenses/LICENSE-2.0
                     */
                    function isArray(value) {
                        return !Array.isArray
                            ? getTag(value) === '[object Array]'
                            : Array.isArray(value);
                    }
                    // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
                    const INFINITY = 1 / 0;
                    function baseToString(value) {
                        // Exit early for strings to avoid a performance hit in some environments.
                        if (typeof value == 'string') {
                            return value;
                        }
                        let result = value + '';
                        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
                    }
                    function toString(value) {
                        return value == null ? '' : baseToString(value);
                    }
                    function isString(value) {
                        return typeof value === 'string';
                    }
                    function isNumber(value) {
                        return typeof value === 'number';
                    }
                    // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
                    function isBoolean(value) {
                        return (value === true ||
                            value === false ||
                            (isObjectLike(value) && getTag(value) == '[object Boolean]'));
                    }
                    function isObject(value) {
                        return typeof value === 'object';
                    }
                    // Checks if `value` is object-like.
                    function isObjectLike(value) {
                        return isObject(value) && value !== null;
                    }
                    function isDefined(value) {
                        return value !== undefined && value !== null;
                    }
                    function isBlank(value) {
                        return !value.trim().length;
                    }
                    // Gets the `toStringTag` of `value`.
                    // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
                    function getTag(value) {
                        return value == null
                            ? value === undefined
                                ? '[object Undefined]'
                                : '[object Null]'
                            : Object.prototype.toString.call(value);
                    }
                    const EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';
                    const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
                    const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
                    const PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
                    const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
                    const INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
                    const hasOwn = Object.prototype.hasOwnProperty;
                    class KeyStore {
                        constructor(keys) {
                            this._keys = [];
                            this._keyMap = {};
                            let totalWeight = 0;
                            keys.forEach((key) => {
                                let obj = createKey(key);
                                totalWeight += obj.weight;
                                this._keys.push(obj);
                                this._keyMap[obj.id] = obj;
                                totalWeight += obj.weight;
                            });
                            // Normalize weights so that their sum is equal to 1
                            this._keys.forEach((key) => {
                                key.weight /= totalWeight;
                            });
                        }
                        get(keyId) {
                            return this._keyMap[keyId];
                        }
                        keys() {
                            return this._keys;
                        }
                        toJSON() {
                            return JSON.stringify(this._keys);
                        }
                    }
                    function createKey(key) {
                        let path = null;
                        let id = null;
                        let src = null;
                        let weight = 1;
                        let getFn = null;
                        if (isString(key) || isArray(key)) {
                            src = key;
                            path = createKeyPath(key);
                            id = createKeyId(key);
                        }
                        else {
                            if (!hasOwn.call(key, 'name')) {
                                throw new Error(MISSING_KEY_PROPERTY('name'));
                            }
                            const name = key.name;
                            src = name;
                            if (hasOwn.call(key, 'weight')) {
                                weight = key.weight;
                                if (weight <= 0) {
                                    throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
                                }
                            }
                            path = createKeyPath(name);
                            id = createKeyId(name);
                            getFn = key.getFn;
                        }
                        return { path, id, weight, src, getFn };
                    }
                    function createKeyPath(key) {
                        return isArray(key) ? key : key.split('.');
                    }
                    function createKeyId(key) {
                        return isArray(key) ? key.join('.') : key;
                    }
                    function get(obj, path) {
                        let list = [];
                        let arr = false;
                        const deepGet = (obj, path, index) => {
                            if (!isDefined(obj)) {
                                return;
                            }
                            if (!path[index]) {
                                // If there's no path left, we've arrived at the object we care about.
                                list.push(obj);
                            }
                            else {
                                let key = path[index];
                                const value = obj[key];
                                if (!isDefined(value)) {
                                    return;
                                }
                                // If we're at the last value in the path, and if it's a string/number/bool,
                                // add it to the list
                                if (index === path.length - 1 &&
                                    (isString(value) || isNumber(value) || isBoolean(value))) {
                                    list.push(toString(value));
                                }
                                else if (isArray(value)) {
                                    arr = true;
                                    // Search each item in the array.
                                    for (let i = 0, len = value.length; i < len; i += 1) {
                                        deepGet(value[i], path, index + 1);
                                    }
                                }
                                else if (path.length) {
                                    // An object. Recurse further.
                                    deepGet(value, path, index + 1);
                                }
                            }
                        };
                        // Backwards compatibility (since path used to be a string)
                        deepGet(obj, isString(path) ? path.split('.') : path, 0);
                        return arr ? list : list[0];
                    }
                    const MatchOptions = {
                        // Whether the matches should be included in the result set. When `true`, each record in the result
                        // set will include the indices of the matched characters.
                        // These can consequently be used for highlighting purposes.
                        includeMatches: false,
                        // When `true`, the matching function will continue to the end of a search pattern even if
                        // a perfect match has already been located in the string.
                        findAllMatches: false,
                        // Minimum number of characters that must be matched before a result is considered a match
                        minMatchCharLength: 1
                    };
                    const BasicOptions = {
                        // When `true`, the algorithm continues searching to the end of the input even if a perfect
                        // match is found before the end of the same input.
                        isCaseSensitive: false,
                        // When true, the matching function will continue to the end of a search pattern even if
                        includeScore: false,
                        // List of properties that will be searched. This also supports nested properties.
                        keys: [],
                        // Whether to sort the result list, by score
                        shouldSort: true,
                        // Default sort function: sort by ascending score, ascending index
                        sortFn: (a, b) => a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
                    };
                    const FuzzyOptions = {
                        // Approximately where in the text is the pattern expected to be found?
                        location: 0,
                        // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
                        // (of both letters and location), a threshold of '1.0' would match anything.
                        threshold: 0.6,
                        // Determines how close the match must be to the fuzzy location (specified above).
                        // An exact letter match which is 'distance' characters away from the fuzzy location
                        // would score as a complete mismatch. A distance of '0' requires the match be at
                        // the exact location specified, a threshold of '1000' would require a perfect match
                        // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
                        distance: 100
                    };
                    const AdvancedOptions = {
                        // When `true`, it enables the use of unix-like search commands
                        useExtendedSearch: false,
                        // The get function to use when fetching an object's properties.
                        // The default will search nested paths *ie foo.bar.baz*
                        getFn: get,
                        // When `true`, search will ignore `location` and `distance`, so it won't matter
                        // where in the string the pattern appears.
                        // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
                        ignoreLocation: false,
                        // When `true`, the calculation for the relevance score (used for sorting) will
                        // ignore the field-length norm.
                        // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
                        ignoreFieldNorm: false,
                        // The weight to determine how much field length norm effects scoring.
                        fieldNormWeight: 1
                    };
                    var Config = {
                        ...BasicOptions,
                        ...MatchOptions,
                        ...FuzzyOptions,
                        ...AdvancedOptions
                    };
                    const SPACE = /[^ ]+/g;
                    // Field-length norm: the shorter the field, the higher the weight.
                    // Set to 3 decimals to reduce index size.
                    function norm(weight = 1, mantissa = 3) {
                        const cache = new Map();
                        const m = Math.pow(10, mantissa);
                        return {
                            get(value) {
                                const numTokens = value.match(SPACE).length;
                                if (cache.has(numTokens)) {
                                    return cache.get(numTokens);
                                }
                                // Default function is 1/sqrt(x), weight makes that variable
                                const norm = 1 / Math.pow(numTokens, 0.5 * weight);
                                // In place of `toFixed(mantissa)`, for faster computation
                                const n = parseFloat(Math.round(norm * m) / m);
                                cache.set(numTokens, n);
                                return n;
                            },
                            clear() {
                                cache.clear();
                            }
                        };
                    }
                    class FuseIndex {
                        constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
                            this.norm = norm(fieldNormWeight, 3);
                            this.getFn = getFn;
                            this.isCreated = false;
                            this.setIndexRecords();
                        }
                        setSources(docs = []) {
                            this.docs = docs;
                        }
                        setIndexRecords(records = []) {
                            this.records = records;
                        }
                        setKeys(keys = []) {
                            this.keys = keys;
                            this._keysMap = {};
                            keys.forEach((key, idx) => {
                                this._keysMap[key.id] = idx;
                            });
                        }
                        create() {
                            if (this.isCreated || !this.docs.length) {
                                return;
                            }
                            this.isCreated = true;
                            // List is Array<String>
                            if (isString(this.docs[0])) {
                                this.docs.forEach((doc, docIndex) => {
                                    this._addString(doc, docIndex);
                                });
                            }
                            else {
                                // List is Array<Object>
                                this.docs.forEach((doc, docIndex) => {
                                    this._addObject(doc, docIndex);
                                });
                            }
                            this.norm.clear();
                        }
                        // Adds a doc to the end of the index
                        add(doc) {
                            const idx = this.size();
                            if (isString(doc)) {
                                this._addString(doc, idx);
                            }
                            else {
                                this._addObject(doc, idx);
                            }
                        }
                        // Removes the doc at the specified index of the index
                        removeAt(idx) {
                            this.records.splice(idx, 1);
                            // Change ref index of every subsquent doc
                            for (let i = idx, len = this.size(); i < len; i += 1) {
                                this.records[i].i -= 1;
                            }
                        }
                        getValueForItemAtKeyId(item, keyId) {
                            return item[this._keysMap[keyId]];
                        }
                        size() {
                            return this.records.length;
                        }
                        _addString(doc, docIndex) {
                            if (!isDefined(doc) || isBlank(doc)) {
                                return;
                            }
                            let record = {
                                v: doc,
                                i: docIndex,
                                n: this.norm.get(doc)
                            };
                            this.records.push(record);
                        }
                        _addObject(doc, docIndex) {
                            let record = { i: docIndex, $: {} };
                            // Iterate over every key (i.e, path), and fetch the value at that key
                            this.keys.forEach((key, keyIndex) => {
                                let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
                                if (!isDefined(value)) {
                                    return;
                                }
                                if (isArray(value)) {
                                    let subRecords = [];
                                    const stack = [{ nestedArrIndex: -1, value }];
                                    while (stack.length) {
                                        const { nestedArrIndex, value } = stack.pop();
                                        if (!isDefined(value)) {
                                            continue;
                                        }
                                        if (isString(value) && !isBlank(value)) {
                                            let subRecord = {
                                                v: value,
                                                i: nestedArrIndex,
                                                n: this.norm.get(value)
                                            };
                                            subRecords.push(subRecord);
                                        }
                                        else if (isArray(value)) {
                                            value.forEach((item, k) => {
                                                stack.push({
                                                    nestedArrIndex: k,
                                                    value: item
                                                });
                                            });
                                        }
                                        else
                                            ;
                                    }
                                    record.$[keyIndex] = subRecords;
                                }
                                else if (isString(value) && !isBlank(value)) {
                                    let subRecord = {
                                        v: value,
                                        n: this.norm.get(value)
                                    };
                                    record.$[keyIndex] = subRecord;
                                }
                            });
                            this.records.push(record);
                        }
                        toJSON() {
                            return {
                                keys: this.keys,
                                records: this.records
                            };
                        }
                    }
                    function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
                        const myIndex = new FuseIndex({ getFn, fieldNormWeight });
                        myIndex.setKeys(keys.map(createKey));
                        myIndex.setSources(docs);
                        myIndex.create();
                        return myIndex;
                    }
                    function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
                        const { keys, records } = data;
                        const myIndex = new FuseIndex({ getFn, fieldNormWeight });
                        myIndex.setKeys(keys);
                        myIndex.setIndexRecords(records);
                        return myIndex;
                    }
                    function computeScore$1(pattern, { errors = 0, currentLocation = 0, expectedLocation = 0, distance = Config.distance, ignoreLocation = Config.ignoreLocation } = {}) {
                        const accuracy = errors / pattern.length;
                        if (ignoreLocation) {
                            return accuracy;
                        }
                        const proximity = Math.abs(expectedLocation - currentLocation);
                        if (!distance) {
                            // Dodge divide by zero error.
                            return proximity ? 1.0 : accuracy;
                        }
                        return accuracy + proximity / distance;
                    }
                    function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
                        let indices = [];
                        let start = -1;
                        let end = -1;
                        let i = 0;
                        for (let len = matchmask.length; i < len; i += 1) {
                            let match = matchmask[i];
                            if (match && start === -1) {
                                start = i;
                            }
                            else if (!match && start !== -1) {
                                end = i - 1;
                                if (end - start + 1 >= minMatchCharLength) {
                                    indices.push([start, end]);
                                }
                                start = -1;
                            }
                        }
                        // (i-1 - start) + 1 => i - start
                        if (matchmask[i - 1] && i - start >= minMatchCharLength) {
                            indices.push([start, i - 1]);
                        }
                        return indices;
                    }
                    // Machine word size
                    const MAX_BITS = 32;
                    function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
                        if (pattern.length > MAX_BITS) {
                            throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
                        }
                        const patternLen = pattern.length;
                        // Set starting location at beginning text and initialize the alphabet.
                        const textLen = text.length;
                        // Handle the case when location > text.length
                        const expectedLocation = Math.max(0, Math.min(location, textLen));
                        // Highest score beyond which we give up.
                        let currentThreshold = threshold;
                        // Is there a nearby exact match? (speedup)
                        let bestLocation = expectedLocation;
                        // Performance: only computer matches when the minMatchCharLength > 1
                        // OR if `includeMatches` is true.
                        const computeMatches = minMatchCharLength > 1 || includeMatches;
                        // A mask of the matches, used for building the indices
                        const matchMask = computeMatches ? Array(textLen) : [];
                        let index;
                        // Get all exact matches, here for speed up
                        while ((index = text.indexOf(pattern, bestLocation)) > -1) {
                            let score = computeScore$1(pattern, {
                                currentLocation: index,
                                expectedLocation,
                                distance,
                                ignoreLocation
                            });
                            currentThreshold = Math.min(score, currentThreshold);
                            bestLocation = index + patternLen;
                            if (computeMatches) {
                                let i = 0;
                                while (i < patternLen) {
                                    matchMask[index + i] = 1;
                                    i += 1;
                                }
                            }
                        }
                        // Reset the best location
                        bestLocation = -1;
                        let lastBitArr = [];
                        let finalScore = 1;
                        let binMax = patternLen + textLen;
                        const mask = 1 << (patternLen - 1);
                        for (let i = 0; i < patternLen; i += 1) {
                            // Scan for the best match; each iteration allows for one more error.
                            // Run a binary search to determine how far from the match location we can stray
                            // at this error level.
                            let binMin = 0;
                            let binMid = binMax;
                            while (binMin < binMid) {
                                const score = computeScore$1(pattern, {
                                    errors: i,
                                    currentLocation: expectedLocation + binMid,
                                    expectedLocation,
                                    distance,
                                    ignoreLocation
                                });
                                if (score <= currentThreshold) {
                                    binMin = binMid;
                                }
                                else {
                                    binMax = binMid;
                                }
                                binMid = Math.floor((binMax - binMin) / 2 + binMin);
                            }
                            // Use the result from this iteration as the maximum for the next.
                            binMax = binMid;
                            let start = Math.max(1, expectedLocation - binMid + 1);
                            let finish = findAllMatches
                                ? textLen
                                : Math.min(expectedLocation + binMid, textLen) + patternLen;
                            // Initialize the bit array
                            let bitArr = Array(finish + 2);
                            bitArr[finish + 1] = (1 << i) - 1;
                            for (let j = finish; j >= start; j -= 1) {
                                let currentLocation = j - 1;
                                let charMatch = patternAlphabet[text.charAt(currentLocation)];
                                if (computeMatches) {
                                    // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
                                    matchMask[currentLocation] = +!!charMatch;
                                }
                                // First pass: exact match
                                bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;
                                // Subsequent passes: fuzzy match
                                if (i) {
                                    bitArr[j] |=
                                        ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
                                }
                                if (bitArr[j] & mask) {
                                    finalScore = computeScore$1(pattern, {
                                        errors: i,
                                        currentLocation,
                                        expectedLocation,
                                        distance,
                                        ignoreLocation
                                    });
                                    // This match will almost certainly be better than any existing match.
                                    // But check anyway.
                                    if (finalScore <= currentThreshold) {
                                        // Indeed it is
                                        currentThreshold = finalScore;
                                        bestLocation = currentLocation;
                                        // Already passed `loc`, downhill from here on in.
                                        if (bestLocation <= expectedLocation) {
                                            break;
                                        }
                                        // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
                                        start = Math.max(1, 2 * expectedLocation - bestLocation);
                                    }
                                }
                            }
                            // No hope for a (better) match at greater error levels.
                            const score = computeScore$1(pattern, {
                                errors: i + 1,
                                currentLocation: expectedLocation,
                                expectedLocation,
                                distance,
                                ignoreLocation
                            });
                            if (score > currentThreshold) {
                                break;
                            }
                            lastBitArr = bitArr;
                        }
                        const result = {
                            isMatch: bestLocation >= 0,
                            // Count exact matches (those with a score of 0) to be "almost" exact
                            score: Math.max(0.001, finalScore)
                        };
                        if (computeMatches) {
                            const indices = convertMaskToIndices(matchMask, minMatchCharLength);
                            if (!indices.length) {
                                result.isMatch = false;
                            }
                            else if (includeMatches) {
                                result.indices = indices;
                            }
                        }
                        return result;
                    }
                    function createPatternAlphabet(pattern) {
                        let mask = {};
                        for (let i = 0, len = pattern.length; i < len; i += 1) {
                            const char = pattern.charAt(i);
                            mask[char] = (mask[char] || 0) | (1 << (len - i - 1));
                        }
                        return mask;
                    }
                    class BitapSearch {
                        constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation } = {}) {
                            this.options = {
                                location,
                                threshold,
                                distance,
                                includeMatches,
                                findAllMatches,
                                minMatchCharLength,
                                isCaseSensitive,
                                ignoreLocation
                            };
                            this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
                            this.chunks = [];
                            if (!this.pattern.length) {
                                return;
                            }
                            const addChunk = (pattern, startIndex) => {
                                this.chunks.push({
                                    pattern,
                                    alphabet: createPatternAlphabet(pattern),
                                    startIndex
                                });
                            };
                            const len = this.pattern.length;
                            if (len > MAX_BITS) {
                                let i = 0;
                                const remainder = len % MAX_BITS;
                                const end = len - remainder;
                                while (i < end) {
                                    addChunk(this.pattern.substr(i, MAX_BITS), i);
                                    i += MAX_BITS;
                                }
                                if (remainder) {
                                    const startIndex = len - MAX_BITS;
                                    addChunk(this.pattern.substr(startIndex), startIndex);
                                }
                            }
                            else {
                                addChunk(this.pattern, 0);
                            }
                        }
                        searchIn(text) {
                            const { isCaseSensitive, includeMatches } = this.options;
                            if (!isCaseSensitive) {
                                text = text.toLowerCase();
                            }
                            // Exact match
                            if (this.pattern === text) {
                                let result = {
                                    isMatch: true,
                                    score: 0
                                };
                                if (includeMatches) {
                                    result.indices = [[0, text.length - 1]];
                                }
                                return result;
                            }
                            // Otherwise, use Bitap algorithm
                            const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
                            let allIndices = [];
                            let totalScore = 0;
                            let hasMatches = false;
                            this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
                                const { isMatch, score, indices } = search(text, pattern, alphabet, {
                                    location: location + startIndex,
                                    distance,
                                    threshold,
                                    findAllMatches,
                                    minMatchCharLength,
                                    includeMatches,
                                    ignoreLocation
                                });
                                if (isMatch) {
                                    hasMatches = true;
                                }
                                totalScore += score;
                                if (isMatch && indices) {
                                    allIndices = [...allIndices, ...indices];
                                }
                            });
                            let result = {
                                isMatch: hasMatches,
                                score: hasMatches ? totalScore / this.chunks.length : 1
                            };
                            if (hasMatches && includeMatches) {
                                result.indices = allIndices;
                            }
                            return result;
                        }
                    }
                    class BaseMatch {
                        constructor(pattern) {
                            this.pattern = pattern;
                        }
                        static isMultiMatch(pattern) {
                            return getMatch(pattern, this.multiRegex);
                        }
                        static isSingleMatch(pattern) {
                            return getMatch(pattern, this.singleRegex);
                        }
                        search( /*text*/) { }
                    }
                    function getMatch(pattern, exp) {
                        const matches = pattern.match(exp);
                        return matches ? matches[1] : null;
                    }
                    // Token: 'file
                    class ExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'exact';
                        }
                        static get multiRegex() {
                            return /^="(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^=(.*)$/;
                        }
                        search(text) {
                            const isMatch = text === this.pattern;
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [0, this.pattern.length - 1]
                            };
                        }
                    }
                    // Token: !fire
                    class InverseExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'inverse-exact';
                        }
                        static get multiRegex() {
                            return /^!"(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^!(.*)$/;
                        }
                        search(text) {
                            const index = text.indexOf(this.pattern);
                            const isMatch = index === -1;
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [0, text.length - 1]
                            };
                        }
                    }
                    // Token: ^file
                    class PrefixExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'prefix-exact';
                        }
                        static get multiRegex() {
                            return /^\^"(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^\^(.*)$/;
                        }
                        search(text) {
                            const isMatch = text.startsWith(this.pattern);
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [0, this.pattern.length - 1]
                            };
                        }
                    }
                    // Token: !^fire
                    class InversePrefixExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'inverse-prefix-exact';
                        }
                        static get multiRegex() {
                            return /^!\^"(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^!\^(.*)$/;
                        }
                        search(text) {
                            const isMatch = !text.startsWith(this.pattern);
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [0, text.length - 1]
                            };
                        }
                    }
                    // Token: .file$
                    class SuffixExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'suffix-exact';
                        }
                        static get multiRegex() {
                            return /^"(.*)"\$$/;
                        }
                        static get singleRegex() {
                            return /^(.*)\$$/;
                        }
                        search(text) {
                            const isMatch = text.endsWith(this.pattern);
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [text.length - this.pattern.length, text.length - 1]
                            };
                        }
                    }
                    // Token: !.file$
                    class InverseSuffixExactMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'inverse-suffix-exact';
                        }
                        static get multiRegex() {
                            return /^!"(.*)"\$$/;
                        }
                        static get singleRegex() {
                            return /^!(.*)\$$/;
                        }
                        search(text) {
                            const isMatch = !text.endsWith(this.pattern);
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices: [0, text.length - 1]
                            };
                        }
                    }
                    class FuzzyMatch extends BaseMatch {
                        constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation } = {}) {
                            super(pattern);
                            this._bitapSearch = new BitapSearch(pattern, {
                                location,
                                threshold,
                                distance,
                                includeMatches,
                                findAllMatches,
                                minMatchCharLength,
                                isCaseSensitive,
                                ignoreLocation
                            });
                        }
                        static get type() {
                            return 'fuzzy';
                        }
                        static get multiRegex() {
                            return /^"(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^(.*)$/;
                        }
                        search(text) {
                            return this._bitapSearch.searchIn(text);
                        }
                    }
                    // Token: 'file
                    class IncludeMatch extends BaseMatch {
                        constructor(pattern) {
                            super(pattern);
                        }
                        static get type() {
                            return 'include';
                        }
                        static get multiRegex() {
                            return /^'"(.*)"$/;
                        }
                        static get singleRegex() {
                            return /^'(.*)$/;
                        }
                        search(text) {
                            let location = 0;
                            let index;
                            const indices = [];
                            const patternLen = this.pattern.length;
                            // Get all exact matches
                            while ((index = text.indexOf(this.pattern, location)) > -1) {
                                location = index + patternLen;
                                indices.push([index, location - 1]);
                            }
                            const isMatch = !!indices.length;
                            return {
                                isMatch,
                                score: isMatch ? 0 : 1,
                                indices
                            };
                        }
                    }
                    // ❗Order is important. DO NOT CHANGE.
                    const searchers = [
                        ExactMatch,
                        IncludeMatch,
                        PrefixExactMatch,
                        InversePrefixExactMatch,
                        InverseSuffixExactMatch,
                        SuffixExactMatch,
                        InverseExactMatch,
                        FuzzyMatch
                    ];
                    const searchersLen = searchers.length;
                    // Regex to split by spaces, but keep anything in quotes together
                    const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
                    const OR_TOKEN = '|';
                    // Return a 2D array representation of the query, for simpler parsing.
                    // Example:
                    // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
                    function parseQuery(pattern, options = {}) {
                        return pattern.split(OR_TOKEN).map((item) => {
                            let query = item
                                .trim()
                                .split(SPACE_RE)
                                .filter((item) => item && !!item.trim());
                            let results = [];
                            for (let i = 0, len = query.length; i < len; i += 1) {
                                const queryItem = query[i];
                                // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
                                let found = false;
                                let idx = -1;
                                while (!found && ++idx < searchersLen) {
                                    const searcher = searchers[idx];
                                    let token = searcher.isMultiMatch(queryItem);
                                    if (token) {
                                        results.push(new searcher(token, options));
                                        found = true;
                                    }
                                }
                                if (found) {
                                    continue;
                                }
                                // 2. Handle single query matches (i.e, once that are *not* quoted)
                                idx = -1;
                                while (++idx < searchersLen) {
                                    const searcher = searchers[idx];
                                    let token = searcher.isSingleMatch(queryItem);
                                    if (token) {
                                        results.push(new searcher(token, options));
                                        break;
                                    }
                                }
                            }
                            return results;
                        });
                    }
                    // These extended matchers can return an array of matches, as opposed
                    // to a singl match
                    const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);
                    /**
                     * Command-like searching
                     * ======================
                     *
                     * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
                     * search in a given text.
                     *
                     * Search syntax:
                     *
                     * | Token       | Match type                 | Description                            |
                     * | ----------- | -------------------------- | -------------------------------------- |
                     * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
                     * | `=scheme`   | exact-match                | Items that are `scheme`                |
                     * | `'python`   | include-match              | Items that include `python`            |
                     * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
                     * | `^java`     | prefix-exact-match         | Items that start with `java`           |
                     * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
                     * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
                     * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
                     *
                     * A single pipe character acts as an OR operator. For example, the following
                     * query matches entries that start with `core` and end with either`go`, `rb`,
                     * or`py`.
                     *
                     * ```
                     * ^core go$ | rb$ | py$
                     * ```
                     */
                    class ExtendedSearch {
                        constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
                            this.query = null;
                            this.options = {
                                isCaseSensitive,
                                includeMatches,
                                minMatchCharLength,
                                findAllMatches,
                                ignoreLocation,
                                location,
                                threshold,
                                distance
                            };
                            this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
                            this.query = parseQuery(this.pattern, this.options);
                        }
                        static condition(_, options) {
                            return options.useExtendedSearch;
                        }
                        searchIn(text) {
                            const query = this.query;
                            if (!query) {
                                return {
                                    isMatch: false,
                                    score: 1
                                };
                            }
                            const { includeMatches, isCaseSensitive } = this.options;
                            text = isCaseSensitive ? text : text.toLowerCase();
                            let numMatches = 0;
                            let allIndices = [];
                            let totalScore = 0;
                            // ORs
                            for (let i = 0, qLen = query.length; i < qLen; i += 1) {
                                const searchers = query[i];
                                // Reset indices
                                allIndices.length = 0;
                                numMatches = 0;
                                // ANDs
                                for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
                                    const searcher = searchers[j];
                                    const { isMatch, indices, score } = searcher.search(text);
                                    if (isMatch) {
                                        numMatches += 1;
                                        totalScore += score;
                                        if (includeMatches) {
                                            const type = searcher.constructor.type;
                                            if (MultiMatchSet.has(type)) {
                                                allIndices = [...allIndices, ...indices];
                                            }
                                            else {
                                                allIndices.push(indices);
                                            }
                                        }
                                    }
                                    else {
                                        totalScore = 0;
                                        numMatches = 0;
                                        allIndices.length = 0;
                                        break;
                                    }
                                }
                                // OR condition, so if TRUE, return
                                if (numMatches) {
                                    let result = {
                                        isMatch: true,
                                        score: totalScore / numMatches
                                    };
                                    if (includeMatches) {
                                        result.indices = allIndices;
                                    }
                                    return result;
                                }
                            }
                            // Nothing was matched
                            return {
                                isMatch: false,
                                score: 1
                            };
                        }
                    }
                    const registeredSearchers = [];
                    function register(...args) {
                        registeredSearchers.push(...args);
                    }
                    function createSearcher(pattern, options) {
                        for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
                            let searcherClass = registeredSearchers[i];
                            if (searcherClass.condition(pattern, options)) {
                                return new searcherClass(pattern, options);
                            }
                        }
                        return new BitapSearch(pattern, options);
                    }
                    const LogicalOperator = {
                        AND: '$and',
                        OR: '$or'
                    };
                    const KeyType = {
                        PATH: '$path',
                        PATTERN: '$val'
                    };
                    const isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
                    const isPath = (query) => !!query[KeyType.PATH];
                    const isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
                    const convertToExplicit = (query) => ({
                        [LogicalOperator.AND]: Object.keys(query).map((key) => ({
                            [key]: query[key]
                        }))
                    });
                    // When `auto` is `true`, the parse function will infer and initialize and add
                    // the appropriate `Searcher` instance
                    function parse(query, options, { auto = true } = {}) {
                        const next = (query) => {
                            let keys = Object.keys(query);
                            const isQueryPath = isPath(query);
                            if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
                                return next(convertToExplicit(query));
                            }
                            if (isLeaf(query)) {
                                const key = isQueryPath ? query[KeyType.PATH] : keys[0];
                                const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
                                if (!isString(pattern)) {
                                    throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
                                }
                                const obj = {
                                    keyId: createKeyId(key),
                                    pattern
                                };
                                if (auto) {
                                    obj.searcher = createSearcher(pattern, options);
                                }
                                return obj;
                            }
                            let node = {
                                children: [],
                                operator: keys[0]
                            };
                            keys.forEach((key) => {
                                const value = query[key];
                                if (isArray(value)) {
                                    value.forEach((item) => {
                                        node.children.push(next(item));
                                    });
                                }
                            });
                            return node;
                        };
                        if (!isExpression(query)) {
                            query = convertToExplicit(query);
                        }
                        return next(query);
                    }
                    // Practical scoring function
                    function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
                        results.forEach((result) => {
                            let totalScore = 1;
                            result.matches.forEach(({ key, norm, score }) => {
                                const weight = key ? key.weight : null;
                                totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
                            });
                            result.score = totalScore;
                        });
                    }
                    function transformMatches(result, data) {
                        const matches = result.matches;
                        data.matches = [];
                        if (!isDefined(matches)) {
                            return;
                        }
                        matches.forEach((match) => {
                            if (!isDefined(match.indices) || !match.indices.length) {
                                return;
                            }
                            const { indices, value } = match;
                            let obj = {
                                indices,
                                value
                            };
                            if (match.key) {
                                obj.key = match.key.src;
                            }
                            if (match.idx > -1) {
                                obj.refIndex = match.idx;
                            }
                            data.matches.push(obj);
                        });
                    }
                    function transformScore(result, data) {
                        data.score = result.score;
                    }
                    function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
                        const transformers = [];
                        if (includeMatches)
                            transformers.push(transformMatches);
                        if (includeScore)
                            transformers.push(transformScore);
                        return results.map((result) => {
                            const { idx } = result;
                            const data = {
                                item: docs[idx],
                                refIndex: idx
                            };
                            if (transformers.length) {
                                transformers.forEach((transformer) => {
                                    transformer(result, data);
                                });
                            }
                            return data;
                        });
                    }
                    class Fuse {
                        constructor(docs, options = {}, index) {
                            this.options = { ...Config, ...options };
                            if (this.options.useExtendedSearch &&
                                !true) { }
                            this._keyStore = new KeyStore(this.options.keys);
                            this.setCollection(docs, index);
                        }
                        setCollection(docs, index) {
                            this._docs = docs;
                            if (index && !(index instanceof FuseIndex)) {
                                throw new Error(INCORRECT_INDEX_TYPE);
                            }
                            this._myIndex =
                                index ||
                                    createIndex(this.options.keys, this._docs, {
                                        getFn: this.options.getFn,
                                        fieldNormWeight: this.options.fieldNormWeight
                                    });
                        }
                        add(doc) {
                            if (!isDefined(doc)) {
                                return;
                            }
                            this._docs.push(doc);
                            this._myIndex.add(doc);
                        }
                        remove(predicate = ( /* doc, idx */) => false) {
                            const results = [];
                            for (let i = 0, len = this._docs.length; i < len; i += 1) {
                                const doc = this._docs[i];
                                if (predicate(doc, i)) {
                                    this.removeAt(i);
                                    i -= 1;
                                    len -= 1;
                                    results.push(doc);
                                }
                            }
                            return results;
                        }
                        removeAt(idx) {
                            this._docs.splice(idx, 1);
                            this._myIndex.removeAt(idx);
                        }
                        getIndex() {
                            return this._myIndex;
                        }
                        search(query, { limit = -1 } = {}) {
                            const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
                            let results = isString(query)
                                ? isString(this._docs[0])
                                    ? this._searchStringList(query)
                                    : this._searchObjectList(query)
                                : this._searchLogical(query);
                            computeScore(results, { ignoreFieldNorm });
                            if (shouldSort) {
                                results.sort(sortFn);
                            }
                            if (isNumber(limit) && limit > -1) {
                                results = results.slice(0, limit);
                            }
                            return format(results, this._docs, {
                                includeMatches,
                                includeScore
                            });
                        }
                        _searchStringList(query) {
                            const searcher = createSearcher(query, this.options);
                            const { records } = this._myIndex;
                            const results = [];
                            // Iterate over every string in the index
                            records.forEach(({ v: text, i: idx, n: norm }) => {
                                if (!isDefined(text)) {
                                    return;
                                }
                                const { isMatch, score, indices } = searcher.searchIn(text);
                                if (isMatch) {
                                    results.push({
                                        item: text,
                                        idx,
                                        matches: [{ score, value: text, norm, indices }]
                                    });
                                }
                            });
                            return results;
                        }
                        _searchLogical(query) {
                            const expression = parse(query, this.options);
                            const evaluate = (node, item, idx) => {
                                if (!node.children) {
                                    const { keyId, searcher } = node;
                                    const matches = this._findMatches({
                                        key: this._keyStore.get(keyId),
                                        value: this._myIndex.getValueForItemAtKeyId(item, keyId),
                                        searcher
                                    });
                                    if (matches && matches.length) {
                                        return [
                                            {
                                                idx,
                                                item,
                                                matches
                                            }
                                        ];
                                    }
                                    return [];
                                }
                                const res = [];
                                for (let i = 0, len = node.children.length; i < len; i += 1) {
                                    const child = node.children[i];
                                    const result = evaluate(child, item, idx);
                                    if (result.length) {
                                        res.push(...result);
                                    }
                                    else if (node.operator === LogicalOperator.AND) {
                                        return [];
                                    }
                                }
                                return res;
                            };
                            const records = this._myIndex.records;
                            const resultMap = {};
                            const results = [];
                            records.forEach(({ $: item, i: idx }) => {
                                if (isDefined(item)) {
                                    let expResults = evaluate(expression, item, idx);
                                    if (expResults.length) {
                                        // Dedupe when adding
                                        if (!resultMap[idx]) {
                                            resultMap[idx] = { idx, item, matches: [] };
                                            results.push(resultMap[idx]);
                                        }
                                        expResults.forEach(({ matches }) => {
                                            resultMap[idx].matches.push(...matches);
                                        });
                                    }
                                }
                            });
                            return results;
                        }
                        _searchObjectList(query) {
                            const searcher = createSearcher(query, this.options);
                            const { keys, records } = this._myIndex;
                            const results = [];
                            // List is Array<Object>
                            records.forEach(({ $: item, i: idx }) => {
                                if (!isDefined(item)) {
                                    return;
                                }
                                let matches = [];
                                // Iterate over every key (i.e, path), and fetch the value at that key
                                keys.forEach((key, keyIndex) => {
                                    matches.push(...this._findMatches({
                                        key,
                                        value: item[keyIndex],
                                        searcher
                                    }));
                                });
                                if (matches.length) {
                                    results.push({
                                        idx,
                                        item,
                                        matches
                                    });
                                }
                            });
                            return results;
                        }
                        _findMatches({ key, value, searcher }) {
                            if (!isDefined(value)) {
                                return [];
                            }
                            let matches = [];
                            if (isArray(value)) {
                                value.forEach(({ v: text, i: idx, n: norm }) => {
                                    if (!isDefined(text)) {
                                        return;
                                    }
                                    const { isMatch, score, indices } = searcher.searchIn(text);
                                    if (isMatch) {
                                        matches.push({
                                            score,
                                            key,
                                            value: text,
                                            idx,
                                            norm,
                                            indices
                                        });
                                    }
                                });
                            }
                            else {
                                const { v: text, n: norm } = value;
                                const { isMatch, score, indices } = searcher.searchIn(text);
                                if (isMatch) {
                                    matches.push({ score, key, value: text, norm, indices });
                                }
                            }
                            return matches;
                        }
                    }
                    Fuse.version = '6.6.2';
                    Fuse.createIndex = createIndex;
                    Fuse.parseIndex = parseIndex;
                    Fuse.config = Config;
                    {
                        Fuse.parseQuery = parse;
                    }
                    {
                        register(ExtendedSearch);
                    }
                    /***/ 
                }),
                /***/ 791: 
                /***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
                    // ESM COMPAT FLAG
                    __webpack_require__.r(__webpack_exports__);
                    // EXPORTS
                    __webpack_require__.d(__webpack_exports__, {
                        "__DO_NOT_USE__ActionTypes": function () { return /* binding */ ActionTypes; },
                        "applyMiddleware": function () { return /* binding */ applyMiddleware; },
                        "bindActionCreators": function () { return /* binding */ bindActionCreators; },
                        "combineReducers": function () { return /* binding */ combineReducers; },
                        "compose": function () { return /* binding */ compose; },
                        "createStore": function () { return /* binding */ createStore; },
                        "legacy_createStore": function () { return /* binding */ legacy_createStore; }
                    });
                    ; // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
                    function _typeof(obj) {
                        "@babel/helpers - typeof";
                        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                            return typeof obj;
                        } : function (obj) {
                            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        }, _typeof(obj);
                    }
                    ; // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js
                    function _toPrimitive(input, hint) {
                        if (_typeof(input) !== "object" || input === null)
                            return input;
                        var prim = input[Symbol.toPrimitive];
                        if (prim !== undefined) {
                            var res = prim.call(input, hint || "default");
                            if (_typeof(res) !== "object")
                                return res;
                            throw new TypeError("@@toPrimitive must return a primitive value.");
                        }
                        return (hint === "string" ? String : Number)(input);
                    }
                    ; // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
                    function _toPropertyKey(arg) {
                        var key = _toPrimitive(arg, "string");
                        return _typeof(key) === "symbol" ? key : String(key);
                    }
                    ; // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
                    function _defineProperty(obj, key, value) {
                        key = _toPropertyKey(key);
                        if (key in obj) {
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: true,
                                configurable: true,
                                writable: true
                            });
                        }
                        else {
                            obj[key] = value;
                        }
                        return obj;
                    }
                    ; // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
                    function ownKeys(object, enumerableOnly) {
                        var keys = Object.keys(object);
                        if (Object.getOwnPropertySymbols) {
                            var symbols = Object.getOwnPropertySymbols(object);
                            enumerableOnly && (symbols = symbols.filter(function (sym) {
                                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                            })), keys.push.apply(keys, symbols);
                        }
                        return keys;
                    }
                    function _objectSpread2(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = null != arguments[i] ? arguments[i] : {};
                            i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
                                _defineProperty(target, key, source[key]);
                            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
                                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                            });
                        }
                        return target;
                    }
                    ; // CONCATENATED MODULE: ./node_modules/redux/es/redux.js
                    /**
                     * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
                     *
                     * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
                     * during build.
                     * @param {number} code
                     */
                    function formatProdErrorMessage(code) {
                        return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
                    }
                    // Inlined version of the `symbol-observable` polyfill
                    var $$observable = (function () {
                        return typeof Symbol === 'function' && Symbol.observable || '@@observable';
                    })();
                    /**
                     * These are private action types reserved by Redux.
                     * For any unknown actions, you must return the current state.
                     * If the current state is undefined, you must return the initial state.
                     * Do not reference these action types directly in your code.
                     */
                    var randomString = function randomString() {
                        return Math.random().toString(36).substring(7).split('').join('.');
                    };
                    var ActionTypes = {
                        INIT: "@@redux/INIT" + randomString(),
                        REPLACE: "@@redux/REPLACE" + randomString(),
                        PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
                            return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
                        }
                    };
                    /**
                     * @param {any} obj The object to inspect.
                     * @returns {boolean} True if the argument appears to be a plain object.
                     */
                    function isPlainObject(obj) {
                        if (typeof obj !== 'object' || obj === null)
                            return false;
                        var proto = obj;
                        while (Object.getPrototypeOf(proto) !== null) {
                            proto = Object.getPrototypeOf(proto);
                        }
                        return Object.getPrototypeOf(obj) === proto;
                    }
                    // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
                    function miniKindOf(val) {
                        if (val === void 0)
                            return 'undefined';
                        if (val === null)
                            return 'null';
                        var type = typeof val;
                        switch (type) {
                            case 'boolean':
                            case 'string':
                            case 'number':
                            case 'symbol':
                            case 'function':
                                {
                                    return type;
                                }
                        }
                        if (Array.isArray(val))
                            return 'array';
                        if (isDate(val))
                            return 'date';
                        if (isError(val))
                            return 'error';
                        var constructorName = ctorName(val);
                        switch (constructorName) {
                            case 'Symbol':
                            case 'Promise':
                            case 'WeakMap':
                            case 'WeakSet':
                            case 'Map':
                            case 'Set':
                                return constructorName;
                        } // other
                        return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
                    }
                    function ctorName(val) {
                        return typeof val.constructor === 'function' ? val.constructor.name : null;
                    }
                    function isError(val) {
                        return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
                    }
                    function isDate(val) {
                        if (val instanceof Date)
                            return true;
                        return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
                    }
                    function kindOf(val) {
                        var typeOfVal = typeof val;
                        if (false) { }
                        return typeOfVal;
                    }
                    /**
                     * @deprecated
                     *
                     * **We recommend using the `configureStore` method
                     * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
                     *
                     * Redux Toolkit is our recommended approach for writing Redux logic today,
                     * including store setup, reducers, data fetching, and more.
                     *
                     * **For more details, please read this Redux docs page:**
                     * **https://redux.js.org/introduction/why-rtk-is-redux-today**
                     *
                     * `configureStore` from Redux Toolkit is an improved version of `createStore` that
                     * simplifies setup and helps avoid common bugs.
                     *
                     * You should not be using the `redux` core package by itself today, except for learning purposes.
                     * The `createStore` method from the core `redux` package will not be removed, but we encourage
                     * all users to migrate to using Redux Toolkit for all Redux code.
                     *
                     * If you want to use `createStore` without this visual deprecation warning, use
                     * the `legacy_createStore` import instead:
                     *
                     * `import { legacy_createStore as createStore} from 'redux'`
                     *
                     */
                    function createStore(reducer, preloadedState, enhancer) {
                        var _ref2;
                        if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
                            throw new Error(true ? formatProdErrorMessage(0) : 0);
                        }
                        if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
                            enhancer = preloadedState;
                            preloadedState = undefined;
                        }
                        if (typeof enhancer !== 'undefined') {
                            if (typeof enhancer !== 'function') {
                                throw new Error(true ? formatProdErrorMessage(1) : 0);
                            }
                            return enhancer(createStore)(reducer, preloadedState);
                        }
                        if (typeof reducer !== 'function') {
                            throw new Error(true ? formatProdErrorMessage(2) : 0);
                        }
                        var currentReducer = reducer;
                        var currentState = preloadedState;
                        var currentListeners = [];
                        var nextListeners = currentListeners;
                        var isDispatching = false;
                        /**
                         * This makes a shallow copy of currentListeners so we can use
                         * nextListeners as a temporary list while dispatching.
                         *
                         * This prevents any bugs around consumers calling
                         * subscribe/unsubscribe in the middle of a dispatch.
                         */
                        function ensureCanMutateNextListeners() {
                            if (nextListeners === currentListeners) {
                                nextListeners = currentListeners.slice();
                            }
                        }
                        /**
                         * Reads the state tree managed by the store.
                         *
                         * @returns {any} The current state tree of your application.
                         */
                        function getState() {
                            if (isDispatching) {
                                throw new Error(true ? formatProdErrorMessage(3) : 0);
                            }
                            return currentState;
                        }
                        /**
                         * Adds a change listener. It will be called any time an action is dispatched,
                         * and some part of the state tree may potentially have changed. You may then
                         * call `getState()` to read the current state tree inside the callback.
                         *
                         * You may call `dispatch()` from a change listener, with the following
                         * caveats:
                         *
                         * 1. The subscriptions are snapshotted just before every `dispatch()` call.
                         * If you subscribe or unsubscribe while the listeners are being invoked, this
                         * will not have any effect on the `dispatch()` that is currently in progress.
                         * However, the next `dispatch()` call, whether nested or not, will use a more
                         * recent snapshot of the subscription list.
                         *
                         * 2. The listener should not expect to see all state changes, as the state
                         * might have been updated multiple times during a nested `dispatch()` before
                         * the listener is called. It is, however, guaranteed that all subscribers
                         * registered before the `dispatch()` started will be called with the latest
                         * state by the time it exits.
                         *
                         * @param {Function} listener A callback to be invoked on every dispatch.
                         * @returns {Function} A function to remove this change listener.
                         */
                        function subscribe(listener) {
                            if (typeof listener !== 'function') {
                                throw new Error(true ? formatProdErrorMessage(4) : 0);
                            }
                            if (isDispatching) {
                                throw new Error(true ? formatProdErrorMessage(5) : 0);
                            }
                            var isSubscribed = true;
                            ensureCanMutateNextListeners();
                            nextListeners.push(listener);
                            return function unsubscribe() {
                                if (!isSubscribed) {
                                    return;
                                }
                                if (isDispatching) {
                                    throw new Error(true ? formatProdErrorMessage(6) : 0);
                                }
                                isSubscribed = false;
                                ensureCanMutateNextListeners();
                                var index = nextListeners.indexOf(listener);
                                nextListeners.splice(index, 1);
                                currentListeners = null;
                            };
                        }
                        /**
                         * Dispatches an action. It is the only way to trigger a state change.
                         *
                         * The `reducer` function, used to create the store, will be called with the
                         * current state tree and the given `action`. Its return value will
                         * be considered the **next** state of the tree, and the change listeners
                         * will be notified.
                         *
                         * The base implementation only supports plain object actions. If you want to
                         * dispatch a Promise, an Observable, a thunk, or something else, you need to
                         * wrap your store creating function into the corresponding middleware. For
                         * example, see the documentation for the `redux-thunk` package. Even the
                         * middleware will eventually dispatch plain object actions using this method.
                         *
                         * @param {Object} action A plain object representing “what changed”. It is
                         * a good idea to keep actions serializable so you can record and replay user
                         * sessions, or use the time travelling `redux-devtools`. An action must have
                         * a `type` property which may not be `undefined`. It is a good idea to use
                         * string constants for action types.
                         *
                         * @returns {Object} For convenience, the same action object you dispatched.
                         *
                         * Note that, if you use a custom middleware, it may wrap `dispatch()` to
                         * return something else (for example, a Promise you can await).
                         */
                        function dispatch(action) {
                            if (!isPlainObject(action)) {
                                throw new Error(true ? formatProdErrorMessage(7) : 0);
                            }
                            if (typeof action.type === 'undefined') {
                                throw new Error(true ? formatProdErrorMessage(8) : 0);
                            }
                            if (isDispatching) {
                                throw new Error(true ? formatProdErrorMessage(9) : 0);
                            }
                            try {
                                isDispatching = true;
                                currentState = currentReducer(currentState, action);
                            }
                            finally {
                                isDispatching = false;
                            }
                            var listeners = currentListeners = nextListeners;
                            for (var i = 0; i < listeners.length; i++) {
                                var listener = listeners[i];
                                listener();
                            }
                            return action;
                        }
                        /**
                         * Replaces the reducer currently used by the store to calculate the state.
                         *
                         * You might need this if your app implements code splitting and you want to
                         * load some of the reducers dynamically. You might also need this if you
                         * implement a hot reloading mechanism for Redux.
                         *
                         * @param {Function} nextReducer The reducer for the store to use instead.
                         * @returns {void}
                         */
                        function replaceReducer(nextReducer) {
                            if (typeof nextReducer !== 'function') {
                                throw new Error(true ? formatProdErrorMessage(10) : 0);
                            }
                            currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
                            // Any reducers that existed in both the new and old rootReducer
                            // will receive the previous state. This effectively populates
                            // the new state tree with any relevant data from the old one.
                            dispatch({
                                type: ActionTypes.REPLACE
                            });
                        }
                        /**
                         * Interoperability point for observable/reactive libraries.
                         * @returns {observable} A minimal observable of state changes.
                         * For more information, see the observable proposal:
                         * https://github.com/tc39/proposal-observable
                         */
                        function observable() {
                            var _ref;
                            var outerSubscribe = subscribe;
                            return _ref = {
                                /**
                                 * The minimal observable subscription method.
                                 * @param {Object} observer Any object that can be used as an observer.
                                 * The observer object should have a `next` method.
                                 * @returns {subscription} An object with an `unsubscribe` method that can
                                 * be used to unsubscribe the observable from the store, and prevent further
                                 * emission of values from the observable.
                                 */
                                subscribe: function subscribe(observer) {
                                    if (typeof observer !== 'object' || observer === null) {
                                        throw new Error(true ? formatProdErrorMessage(11) : 0);
                                    }
                                    function observeState() {
                                        if (observer.next) {
                                            observer.next(getState());
                                        }
                                    }
                                    observeState();
                                    var unsubscribe = outerSubscribe(observeState);
                                    return {
                                        unsubscribe: unsubscribe
                                    };
                                }
                            }, _ref[$$observable] = function () {
                                return this;
                            }, _ref;
                        } // When a store is created, an "INIT" action is dispatched so that every
                        // reducer returns their initial state. This effectively populates
                        // the initial state tree.
                        dispatch({
                            type: ActionTypes.INIT
                        });
                        return _ref2 = {
                            dispatch: dispatch,
                            subscribe: subscribe,
                            getState: getState,
                            replaceReducer: replaceReducer
                        }, _ref2[$$observable] = observable, _ref2;
                    }
                    /**
                     * Creates a Redux store that holds the state tree.
                     *
                     * **We recommend using `configureStore` from the
                     * `@reduxjs/toolkit` package**, which replaces `createStore`:
                     * **https://redux.js.org/introduction/why-rtk-is-redux-today**
                     *
                     * The only way to change the data in the store is to call `dispatch()` on it.
                     *
                     * There should only be a single store in your app. To specify how different
                     * parts of the state tree respond to actions, you may combine several reducers
                     * into a single reducer function by using `combineReducers`.
                     *
                     * @param {Function} reducer A function that returns the next state tree, given
                     * the current state tree and the action to handle.
                     *
                     * @param {any} [preloadedState] The initial state. You may optionally specify it
                     * to hydrate the state from the server in universal apps, or to restore a
                     * previously serialized user session.
                     * If you use `combineReducers` to produce the root reducer function, this must be
                     * an object with the same shape as `combineReducers` keys.
                     *
                     * @param {Function} [enhancer] The store enhancer. You may optionally specify it
                     * to enhance the store with third-party capabilities such as middleware,
                     * time travel, persistence, etc. The only store enhancer that ships with Redux
                     * is `applyMiddleware()`.
                     *
                     * @returns {Store} A Redux store that lets you read the state, dispatch actions
                     * and subscribe to changes.
                     */
                    var legacy_createStore = createStore;
                    /**
                     * Prints a warning in the console if it exists.
                     *
                     * @param {String} message The warning message.
                     * @returns {void}
                     */
                    function warning(message) {
                        /* eslint-disable no-console */
                        if (typeof console !== 'undefined' && typeof console.error === 'function') {
                            console.error(message);
                        }
                        /* eslint-enable no-console */
                        try {
                            // This error was thrown as a convenience so that if you enable
                            // "break on all exceptions" in your console,
                            // it would pause the execution at this line.
                            throw new Error(message);
                        }
                        catch (e) { } // eslint-disable-line no-empty
                    }
                    function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
                        var reducerKeys = Object.keys(reducers);
                        var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
                        if (reducerKeys.length === 0) {
                            return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
                        }
                        if (!isPlainObject(inputState)) {
                            return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
                        }
                        var unexpectedKeys = Object.keys(inputState).filter(function (key) {
                            return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
                        });
                        unexpectedKeys.forEach(function (key) {
                            unexpectedKeyCache[key] = true;
                        });
                        if (action && action.type === ActionTypes.REPLACE)
                            return;
                        if (unexpectedKeys.length > 0) {
                            return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
                        }
                    }
                    function assertReducerShape(reducers) {
                        Object.keys(reducers).forEach(function (key) {
                            var reducer = reducers[key];
                            var initialState = reducer(undefined, {
                                type: ActionTypes.INIT
                            });
                            if (typeof initialState === 'undefined') {
                                throw new Error(true ? formatProdErrorMessage(12) : 0);
                            }
                            if (typeof reducer(undefined, {
                                type: ActionTypes.PROBE_UNKNOWN_ACTION()
                            }) === 'undefined') {
                                throw new Error(true ? formatProdErrorMessage(13) : 0);
                            }
                        });
                    }
                    /**
                     * Turns an object whose values are different reducer functions, into a single
                     * reducer function. It will call every child reducer, and gather their results
                     * into a single state object, whose keys correspond to the keys of the passed
                     * reducer functions.
                     *
                     * @param {Object} reducers An object whose values correspond to different
                     * reducer functions that need to be combined into one. One handy way to obtain
                     * it is to use ES6 `import * as reducers` syntax. The reducers may never return
                     * undefined for any action. Instead, they should return their initial state
                     * if the state passed to them was undefined, and the current state for any
                     * unrecognized action.
                     *
                     * @returns {Function} A reducer function that invokes every reducer inside the
                     * passed object, and builds a state object with the same shape.
                     */
                    function combineReducers(reducers) {
                        var reducerKeys = Object.keys(reducers);
                        var finalReducers = {};
                        for (var i = 0; i < reducerKeys.length; i++) {
                            var key = reducerKeys[i];
                            if (false) { }
                            if (typeof reducers[key] === 'function') {
                                finalReducers[key] = reducers[key];
                            }
                        }
                        var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
                        // keys multiple times.
                        var unexpectedKeyCache;
                        if (false) { }
                        var shapeAssertionError;
                        try {
                            assertReducerShape(finalReducers);
                        }
                        catch (e) {
                            shapeAssertionError = e;
                        }
                        return function combination(state, action) {
                            if (state === void 0) {
                                state = {};
                            }
                            if (shapeAssertionError) {
                                throw shapeAssertionError;
                            }
                            if (false) {
                                var warningMessage;
                            }
                            var hasChanged = false;
                            var nextState = {};
                            for (var _i = 0; _i < finalReducerKeys.length; _i++) {
                                var _key = finalReducerKeys[_i];
                                var reducer = finalReducers[_key];
                                var previousStateForKey = state[_key];
                                var nextStateForKey = reducer(previousStateForKey, action);
                                if (typeof nextStateForKey === 'undefined') {
                                    var actionType = action && action.type;
                                    throw new Error(true ? formatProdErrorMessage(14) : 0);
                                }
                                nextState[_key] = nextStateForKey;
                                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                            }
                            hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
                            return hasChanged ? nextState : state;
                        };
                    }
                    function bindActionCreator(actionCreator, dispatch) {
                        return function () {
                            return dispatch(actionCreator.apply(this, arguments));
                        };
                    }
                    /**
                     * Turns an object whose values are action creators, into an object with the
                     * same keys, but with every function wrapped into a `dispatch` call so they
                     * may be invoked directly. This is just a convenience method, as you can call
                     * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
                     *
                     * For convenience, you can also pass an action creator as the first argument,
                     * and get a dispatch wrapped function in return.
                     *
                     * @param {Function|Object} actionCreators An object whose values are action
                     * creator functions. One handy way to obtain it is to use ES6 `import * as`
                     * syntax. You may also pass a single function.
                     *
                     * @param {Function} dispatch The `dispatch` function available on your Redux
                     * store.
                     *
                     * @returns {Function|Object} The object mimicking the original object, but with
                     * every action creator wrapped into the `dispatch` call. If you passed a
                     * function as `actionCreators`, the return value will also be a single
                     * function.
                     */
                    function bindActionCreators(actionCreators, dispatch) {
                        if (typeof actionCreators === 'function') {
                            return bindActionCreator(actionCreators, dispatch);
                        }
                        if (typeof actionCreators !== 'object' || actionCreators === null) {
                            throw new Error(true ? formatProdErrorMessage(16) : 0);
                        }
                        var boundActionCreators = {};
                        for (var key in actionCreators) {
                            var actionCreator = actionCreators[key];
                            if (typeof actionCreator === 'function') {
                                boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
                            }
                        }
                        return boundActionCreators;
                    }
                    /**
                     * Composes single-argument functions from right to left. The rightmost
                     * function can take multiple arguments as it provides the signature for
                     * the resulting composite function.
                     *
                     * @param {...Function} funcs The functions to compose.
                     * @returns {Function} A function obtained by composing the argument functions
                     * from right to left. For example, compose(f, g, h) is identical to doing
                     * (...args) => f(g(h(...args))).
                     */
                    function compose() {
                        for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
                            funcs[_key] = arguments[_key];
                        }
                        if (funcs.length === 0) {
                            return function (arg) {
                                return arg;
                            };
                        }
                        if (funcs.length === 1) {
                            return funcs[0];
                        }
                        return funcs.reduce(function (a, b) {
                            return function () {
                                return a(b.apply(void 0, arguments));
                            };
                        });
                    }
                    /**
                     * Creates a store enhancer that applies middleware to the dispatch method
                     * of the Redux store. This is handy for a variety of tasks, such as expressing
                     * asynchronous actions in a concise manner, or logging every action payload.
                     *
                     * See `redux-thunk` package as an example of the Redux middleware.
                     *
                     * Because middleware is potentially asynchronous, this should be the first
                     * store enhancer in the composition chain.
                     *
                     * Note that each middleware will be given the `dispatch` and `getState` functions
                     * as named arguments.
                     *
                     * @param {...Function} middlewares The middleware chain to be applied.
                     * @returns {Function} A store enhancer applying the middleware.
                     */
                    function applyMiddleware() {
                        for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
                            middlewares[_key] = arguments[_key];
                        }
                        return function (createStore) {
                            return function () {
                                var store = createStore.apply(void 0, arguments);
                                var _dispatch = function dispatch() {
                                    throw new Error(true ? formatProdErrorMessage(15) : 0);
                                };
                                var middlewareAPI = {
                                    getState: store.getState,
                                    dispatch: function dispatch() {
                                        return _dispatch.apply(void 0, arguments);
                                    }
                                };
                                var chain = middlewares.map(function (middleware) {
                                    return middleware(middlewareAPI);
                                });
                                _dispatch = compose.apply(void 0, chain)(store.dispatch);
                                return _objectSpread2(_objectSpread2({}, store), {}, {
                                    dispatch: _dispatch
                                });
                            };
                        };
                    }
                    /*
                     * This is a dummy function to check if the function name has been altered by minification.
                     * If the function has been minified and NODE_ENV !== 'production', warn the user.
                     */
                    function isCrushed() { }
                    if (false) { }
                    /***/ 
                })
                /******/ 
            });
            /************************************************************************/
            /******/ // The module cache
            /******/ var __webpack_module_cache__ = {};
            /******/
            /******/ // The require function
            /******/ function __webpack_require__(moduleId) {
                /******/ // Check if module is in cache
                /******/ var cachedModule = __webpack_module_cache__[moduleId];
                /******/ if (cachedModule !== undefined) {
                    /******/ return cachedModule.exports;
                    /******/ }
                /******/ // Create a new module (and put it into the cache)
                /******/ var module = __webpack_module_cache__[moduleId] = {
                    /******/ // no module.id needed
                    /******/ // no module.loaded needed
                    /******/ exports: {}
                    /******/ 
                };
                /******/
                /******/ // Execute the module function
                /******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Return the exports of the module
                /******/ return module.exports;
                /******/ 
            }
            /******/
            /************************************************************************/
            /******/ /* webpack/runtime/compat get default export */
            /******/ !function () {
                /******/ // getDefaultExport function for compatibility with non-harmony modules
                /******/ __webpack_require__.n = function (module) {
                    /******/ var getter = module && module.__esModule ?
                        /******/ function () { return module['default']; } :
                        /******/ function () { return module; };
                    /******/ __webpack_require__.d(getter, { a: getter });
                    /******/ return getter;
                    /******/ 
                };
                /******/ 
            }();
            /******/
            /******/ /* webpack/runtime/define property getters */
            /******/ !function () {
                /******/ // define getter functions for harmony exports
                /******/ __webpack_require__.d = function (exports, definition) {
                    /******/ for (var key in definition) {
                        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                            /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                            /******/ }
                        /******/ }
                    /******/ 
                };
                /******/ 
            }();
            /******/
            /******/ /* webpack/runtime/hasOwnProperty shorthand */
            /******/ !function () {
                /******/ __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
                /******/ 
            }();
            /******/
            /******/ /* webpack/runtime/make namespace object */
            /******/ !function () {
                /******/ // define __esModule on exports
                /******/ __webpack_require__.r = function (exports) {
                    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                        /******/ }
                    /******/ Object.defineProperty(exports, '__esModule', { value: true });
                    /******/ 
                };
                /******/ 
            }();
            /******/
            /************************************************************************/
            var __webpack_exports__ = {};
            // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
            !function () {
                /* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(373);
                /* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_scripts_choices__WEBPACK_IMPORTED_MODULE_0__);
                /* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(187);
                /* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(_scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__);
                /* harmony import */ var _scripts_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(883);
                /* harmony import */ var _scripts_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(789);
                /* harmony import */ var _scripts_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(686);
                /* harmony default export */ __webpack_exports__["default"] = ((_scripts_choices__WEBPACK_IMPORTED_MODULE_0___default()));
            }();
            __webpack_exports__ = __webpack_exports__["default"];
            /******/ return __webpack_exports__;
            /******/ 
        })();
    });
},
645: /* styles/widgets/choices.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `.choices{position:relative;overflow:hidden;margin-bottom:24px;font-size:16px;}.choices:focus{outline:none;}.choices:last-child{margin-bottom:0;}.choices.is-open{overflow:visible;}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;user-select:none;}.choices.is-disabled .choices__item{cursor:not-allowed;}.choices [hidden]{display:none !important;}.choices[data-type*=select-one]{cursor:pointer;}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px;}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0;}.choices[data-type*=select-one] .choices__button{background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==");padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:0.25;}.choices[data-type*=select-one] .choices__button:hover,.choices[data-type*=select-one] .choices__button:focus{opacity:1;}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4;}.choices[data-type*=select-one] .choices__item[data-value=""] .choices__button{display:none;}.choices[data-type*=select-one]::after{content:"";height:0;width:0;border-style:solid;border-color:#333 transparent transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none;}.choices[data-type*=select-one].is-open::after{border-color:transparent transparent #333 transparent;margin-top:-7.5px;}.choices[data-type*=select-one][dir=rtl]::after{left:11.5px;right:auto;}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0;}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text;}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin-top:0;margin-right:-4px;margin-bottom:0;margin-left:8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==");background-size:8px;width:8px;line-height:1;opacity:0.75;border-radius:0;}.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=text] .choices__button:hover,.choices[data-type*=text] .choices__button:focus{opacity:1;}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden;}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7;}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0;}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px;}.choices__list{margin:0;padding-left:0;list-style:none;}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%;}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px;}.choices__list--single .choices__item{width:100%;}.choices__list--multiple{display:inline;}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box;}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px;}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px;}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1;}.is-disabled .choices__list--multiple .choices__item{background-color:#aaaaaa;border:1px solid #919191;}.choices__list--dropdown,.choices__list[aria-expanded]{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility;}.is-active.choices__list--dropdown,.is-active.choices__list[aria-expanded]{visibility:visible;}.is-open .choices__list--dropdown,.is-open .choices__list[aria-expanded]{border-color:#b7b7b7;}.is-flipped .choices__list--dropdown,.is-flipped .choices__list[aria-expanded]{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:0.25rem 0.25rem 0 0;}.choices__list--dropdown .choices__list,.choices__list[aria-expanded] .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position;}.choices__list--dropdown .choices__item,.choices__list[aria-expanded] .choices__item{position:relative;padding:10px;font-size:14px;}[dir=rtl] .choices__list--dropdown .choices__item,[dir=rtl] .choices__list[aria-expanded] .choices__item{text-align:right;}@media (min-width: 640px){.choices__list--dropdown .choices__item--selectable,.choices__list[aria-expanded] .choices__item--selectable{padding-right:100px;}.choices__list--dropdown .choices__item--selectable::after,.choices__list[aria-expanded] .choices__item--selectable::after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%);}[dir=rtl] .choices__list--dropdown .choices__item--selectable,[dir=rtl] .choices__list[aria-expanded] .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px;}[dir=rtl] .choices__list--dropdown .choices__item--selectable::after,[dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after{right:auto;left:10px;}}.choices__list--dropdown .choices__item--selectable.is-highlighted,.choices__list[aria-expanded] .choices__item--selectable.is-highlighted{background-color:#f2f2f2;}.choices__list--dropdown .choices__item--selectable.is-highlighted::after,.choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after{opacity:0.5;}.choices__item{cursor:default;}.choices__item--selectable{cursor:pointer;}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;user-select:none;opacity:0.5;}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray;}.choices__button{text-indent:-9999px;-webkit-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer;}.choices__button:focus{outline:none;}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px;}.choices__input:focus{outline:0;}.choices__input::-webkit-search-decoration,.choices__input::-webkit-search-cancel-button,.choices__input::-webkit-search-results-button,.choices__input::-webkit-search-results-decoration{display:none;}.choices__input::-ms-clear,.choices__input::-ms-reveal{display:none;width:0;height:0;}[dir=rtl] .choices__input{padding-right:2px;padding-left:0;}.choices__placeholder{opacity:0.5;}.choices{width:100%;}.choices{box-sizing:border-box;}.choices *,.choices *:before,.choices *:after{box-sizing:inherit;}input[type="search"]{margin:0;}.choices__inner .choices__item.light{background-color:rgba(0, 126, 255, 0.08);border-radius:5px;border:1px solid rgba(0, 126, 255, 0.24);color:#007eff;}.choices__inner .choices__item.solid{background-color:#1f77b4;border:none;border-radius:5px;color:white;}.choices__inner .choices__item.solid .is-highlighted{background-color:#1f77b4;border:none;}.choices__input{background-color:transparent;}.choices__inner{background:transparent;border:1px solid darkgray;border-radius:5px;min-height:0;padding:calc(var(--padding-vertical) / 2) var(--padding-horizontal);}.choices__list{white-space:initial;}.choices__list--dropdown,.choices__list[aria-expanded]{z-index:var(--bokeh-top-level);}.choices__list--dropdown .choices__item--selectable,.choices__list[aria-expanded] .choices__item--selectable{padding-right:0;}.choices[data-type*=select-multiple] .choices__button.light{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDA3ZWZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);}.choices[data-type*=select-multiple] .choices__button.solid{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);border-left:1px solid white;opacity:1;}`;
},
646: /* models/widgets/multiselect.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const input_widget_1 = require(607) /* ./input_widget */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class MultiSelectView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.value.change, () => this.render_selection());
            this.connect(this.model.properties.options.change, () => this.render());
            this.connect(this.model.properties.name.change, () => this.render());
            this.connect(this.model.properties.title.change, () => this.render());
            this.connect(this.model.properties.size.change, () => this.render());
            this.connect(this.model.properties.disabled.change, () => this.render());
        }
        _render_input() {
            const options = this.model.options.map((opt) => {
                let value, _label;
                if ((0, types_1.isString)(opt)) {
                    value = _label = opt;
                }
                else {
                    [value, _label] = opt;
                }
                return (0, dom_1.option)({ value }, _label);
            });
            this.input_el = (0, dom_1.select)({
                multiple: true,
                class: inputs.input,
                name: this.model.name,
                disabled: this.model.disabled,
            }, options);
            this.input_el.addEventListener("change", () => this.change_input());
            return this.input_el;
        }
        render() {
            super.render();
            this.render_selection();
        }
        render_selection() {
            const selected = new Set(this.model.value);
            for (const el of this.shadow_el.querySelectorAll("option")) {
                el.selected = selected.has(el.value);
            }
            // Note that some browser implementations might not reduce
            // the number of visible options for size <= 3.
            this.input_el.size = this.model.size;
        }
        change_input() {
            const is_focused = this.shadow_el.querySelector("select:focus") != null;
            const values = [];
            for (const el of this.shadow_el.querySelectorAll("option")) {
                if (el.selected) {
                    values.push(el.value);
                }
            }
            this.model.value = values;
            super.change_input();
            // Restore focus back to the <select> afterwards,
            // so that even if python on_change callback is invoked,
            // focus remains on <select> and one can seamlessly scroll
            // up/down.
            if (is_focused) {
                this.input_el.focus();
            }
        }
    }
    exports.MultiSelectView = MultiSelectView;
    MultiSelectView.__name__ = "MultiSelectView";
    class MultiSelect extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.MultiSelect = MultiSelect;
    _a = MultiSelect;
    MultiSelect.__name__ = "MultiSelect";
    (() => {
        _a.prototype.default_view = MultiSelectView;
        _a.define(({ Int, Str, List, Tuple, Or }) => ({
            value: [List(Str), []],
            options: [List(Or(Str, Tuple(Str, Str))), []],
            size: [Int, 4], // 4 is the HTML default
        }));
    })();
},
647: /* models/widgets/multiple_date_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    class MultipleDatePickerView extends base_date_picker_1.BaseDatePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "multiple",
                conjunction: this.model.separator,
            };
        }
        _on_change(selected) {
            this.model.value = selected.map((datetime) => this._format_date(datetime));
        }
    }
    exports.MultipleDatePickerView = MultipleDatePickerView;
    MultipleDatePickerView.__name__ = "MultipleDatePickerView";
    class MultipleDatePicker extends base_date_picker_1.BaseDatePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.MultipleDatePicker = MultipleDatePicker;
    _a = MultipleDatePicker;
    MultipleDatePicker.__name__ = "MultipleDatePicker";
    (() => {
        _a.prototype.default_view = MultipleDatePickerView;
        _a.define(({ Str, List }) => ({
            value: [List(base_date_picker_1.DateLike), []],
            separator: [Str, ", "],
        }));
    })();
},
648: /* models/widgets/multiple_datetime_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const base_datetime_picker_1 = require(634) /* ./base_datetime_picker */;
    const base_date_picker_1 = require(621) /* ./base_date_picker */;
    class MultipleDatetimePickerView extends base_datetime_picker_1.BaseDatetimePickerView {
        get flatpickr_options() {
            return {
                ...super.flatpickr_options,
                mode: "multiple",
                conjunction: this.model.separator,
            };
        }
        _on_change(selected) {
            this.model.value = selected.map((datetime) => this._format_date(datetime));
        }
    }
    exports.MultipleDatetimePickerView = MultipleDatetimePickerView;
    MultipleDatetimePickerView.__name__ = "MultipleDatetimePickerView";
    class MultipleDatetimePicker extends base_datetime_picker_1.BaseDatetimePicker {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.MultipleDatetimePicker = MultipleDatetimePicker;
    _a = MultipleDatetimePicker;
    MultipleDatetimePicker.__name__ = "MultipleDatetimePicker";
    (() => {
        _a.prototype.default_view = MultipleDatetimePickerView;
        _a.define(({ Str, List }) => ({
            value: [List(base_date_picker_1.DateLike), []],
            separator: [Str, ", "],
        }));
    })();
},
649: /* models/widgets/numeric_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const numbro = tslib_1.__importStar(require(246) /* @bokeh/numbro */);
    const input_widget_1 = require(607) /* ./input_widget */;
    const tick_formatter_1 = require(192) /* ../formatters/tick_formatter */;
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    const int_regex = /^[-+]?\d*$/;
    const float_regex = /^[-+]?\d*\.?\d*(?:(?:\d|\d.)[eE][-+]?)*\d*$/;
    class NumericInputView extends input_widget_1.InputWidgetView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.name.change, () => this.input_el.name = this.model.name ?? "");
            this.connect(this.model.properties.value.change, () => {
                this.input_el.value = this.format_value;
                this.old_value = this.input_el.value;
            });
            this.connect(this.model.properties.low.change, () => {
                const { value, low, high } = this.model;
                if (low != null && high != null) {
                    (0, assert_1.assert)(low <= high, "Invalid bounds, low must be inferior to high");
                }
                if (value != null && low != null && value < low) {
                    this.model.value = low;
                }
            });
            this.connect(this.model.properties.high.change, () => {
                const { value, low, high } = this.model;
                if (low != null && high != null) {
                    (0, assert_1.assert)(high >= low, "Invalid bounds, high must be superior to low");
                }
                if (value != null && high != null && value > high) {
                    this.model.value = high;
                }
            });
            this.connect(this.model.properties.high.change, () => this.input_el.placeholder = this.model.placeholder);
            this.connect(this.model.properties.disabled.change, () => this.input_el.disabled = this.model.disabled);
            this.connect(this.model.properties.placeholder.change, () => this.input_el.placeholder = this.model.placeholder);
        }
        get format_value() {
            return this.model.value != null ? this.model.pretty(this.model.value) : "";
        }
        _set_input_filter(inputFilter) {
            this.input_el.addEventListener("input", () => {
                const { selectionStart, selectionEnd } = this.input_el;
                if (!inputFilter(this.input_el.value)) { // an invalid character is entered
                    const difflen = this.old_value.length - this.input_el.value.length;
                    this.input_el.value = this.old_value;
                    if (selectionStart != null && selectionEnd != null) {
                        this.input_el.setSelectionRange(selectionStart - 1, selectionEnd + difflen);
                    }
                }
                else {
                    this.old_value = this.input_el.value;
                }
            });
        }
        _render_input() {
            return this.input_el = (0, dom_1.input)({
                type: "text",
                class: inputs.input,
                name: this.model.name,
                value: this.format_value,
                disabled: this.model.disabled,
                placeholder: this.model.placeholder,
            });
        }
        render() {
            super.render();
            this.old_value = this.format_value;
            this.set_input_filter();
            this.input_el.addEventListener("change", () => this.change_input());
            this.input_el.addEventListener("focusout", () => this.input_el.value = this.format_value);
        }
        set_input_filter() {
            const regex = this.model.mode == "int" ? int_regex : float_regex;
            this._set_input_filter((value) => regex.test(value));
        }
        bound_value(value) {
            let output = value;
            const { low, high } = this.model;
            output = low != null ? Math.max(low, output) : output;
            output = high != null ? Math.min(high, output) : output;
            return output;
        }
        get value() {
            let value = this.input_el.value != "" ? Number(this.input_el.value) : null;
            if (value != null) {
                value = this.bound_value(value);
            }
            return value;
        }
        change_input() {
            if (this.value == null) {
                this.model.value = null;
            }
            else if (!Number.isNaN(this.value)) {
                this.model.value = this.value;
            }
        }
    }
    exports.NumericInputView = NumericInputView;
    NumericInputView.__name__ = "NumericInputView";
    class NumericInput extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return numbro.format(value, format);
            }
            else {
                return format.doFormat([value], { loc: 0 })[0];
            }
        }
        pretty(value) {
            if (this.format != null) {
                return this._formatter(value, this.format);
            }
            else {
                return `${value}`;
            }
        }
    }
    exports.NumericInput = NumericInput;
    _a = NumericInput;
    NumericInput.__name__ = "NumericInput";
    (() => {
        _a.prototype.default_view = NumericInputView;
        _a.define(({ Float, Str, Enum, Ref, Or, Nullable }) => ({
            value: [Nullable(Float), null],
            placeholder: [Str, ""],
            mode: [Enum("int", "float"), "int"],
            format: [Nullable(Or(Str, Ref(tick_formatter_1.TickFormatter))), null],
            low: [Nullable(Float), null],
            high: [Nullable(Float), null],
        }));
    })();
},
650: /* models/widgets/palette_select.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../../core/dom */;
    const panes_1 = require(651) /* ../../core/util/panes */;
    const iterator_1 = require(34) /* ../../core/util/iterator */;
    const color_1 = require(22) /* ../../core/util/color */;
    const math_1 = require(11) /* ../../core/util/math */;
    const array_1 = require(10) /* ../../core/util/array */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    const input_widget_1 = require(607) /* ./input_widget */;
    const inputs_css = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    const palette_select_css = tslib_1.__importStar(require(653) /* ../../styles/widgets/palette_select.css */);
    const item_css = tslib_1.__importStar(require(654) /* ../../styles/widgets/palette_select_item.css */);
    const pane_css = tslib_1.__importStar(require(655) /* ../../styles/widgets/palette_select_pane.css */);
    const icons_css = tslib_1.__importStar(require(123) /* ../../styles/icons.css */);
    const kinds_1 = require(21) /* ../../core/kinds */;
    const Item = (0, kinds_1.Tuple)(kinds_1.Str, (0, kinds_1.Arrayable)(kinds_1.Color));
    class PaletteSelectView extends input_widget_1.InputWidgetView {
        constructor() {
            super(...arguments);
            this._style = new dom_1.InlineStyleSheet();
            this._style_menu = new dom_1.InlineStyleSheet();
        }
        stylesheets() {
            return [...super.stylesheets(), palette_select_css.default, item_css.default, icons_css.default, this._style];
        }
        connect_signals() {
            super.connect_signals();
            const { value, items, ncols, swatch_width, swatch_height } = this.model.properties;
            this.on_change([items, swatch_width, swatch_height], () => this.render());
            this.on_change(value, () => this._update_value());
            this.on_change(ncols, () => this._update_ncols());
        }
        _update_value() {
            (0, dom_1.empty)(this._value_el);
            const content = this._render_value();
            if (content != null) {
                this._value_el.append(content);
            }
        }
        _update_ncols() {
            const { ncols } = this.model;
            this._pane.el.style.setProperty("--number-of-columns", `${ncols}`);
        }
        _render_item(item) {
            const [name] = item;
            const i = this.model.items.indexOf(item);
            (0, assert_1.assert)(i != -1);
            const swatch = (0, dom_1.div)({ class: item_css.swatch, id: `item_${i}` });
            return (0, dom_1.div)({ class: item_css.entry }, swatch, (0, dom_1.div)(name));
        }
        _render_value() {
            const { value, items } = this.model;
            const entry = items.find(([name]) => name == value);
            if (entry != null) {
                return this._render_item(entry);
            }
            else {
                return null;
            }
        }
        _render_input() {
            this._value_el = (0, dom_1.div)({ class: [palette_select_css.value, item_css.entry] }, this._render_value());
            const chevron_el = (0, dom_1.div)({ class: [palette_select_css.chevron, icons_css.tool_icon_chevron_down] });
            const input_el = (0, dom_1.div)({ class: [inputs_css.input, palette_select_css.value_input] }, this._value_el, chevron_el);
            if (this.model.disabled) {
                input_el.classList.add(inputs_css.disabled);
            }
            else {
                input_el.tabIndex = 0;
            }
            this.input_el = input_el; // XXX Div is not an Input-like element
            return this.input_el;
        }
        render() {
            super.render();
            const { swatch_width, swatch_height } = this.model;
            this._style.replace(`
      .${item_css.swatch} {
        width: ${swatch_width}px;
        height: ${swatch_height == "auto" ? "auto" : (0, dom_1.px)(swatch_height)};
      }
    `);
            for (const [item, i] of (0, iterator_1.enumerate)(this.model.items)) {
                const [, colors] = item;
                const n = colors.length;
                const stops = (0, array_1.linspace)(0, 100, n + 1);
                const color_map = [];
                for (const [color, i] of (0, iterator_1.enumerate)(colors)) {
                    const [from, to] = [stops[i], stops[i + 1]];
                    color_map.push(`${(0, color_1.color2css)(color)} ${from}% ${to}%`);
                }
                const gradient = color_map.join(", ");
                this._style.append(`
        #item_${i} {
          background: linear-gradient(to right, ${gradient});
        }
      `);
            }
            // The widget and its menu are independent components, so they need
            // to have their own stylesheets.
            this._style_menu.replace(this._style.css);
            const item_els = [];
            for (const [item, i] of (0, iterator_1.enumerate)(this.model.items)) {
                const entry_el = this._render_item(item);
                const item_el = (0, dom_1.div)({ class: item_css.item, tabIndex: 0 }, entry_el);
                item_el.addEventListener("pointerup", () => {
                    this.select(item);
                });
                item_el.addEventListener("keyup", (event) => {
                    switch (event.key) {
                        case "Enter": {
                            this.select(item);
                            break;
                        }
                        case "Escape": {
                            this.hide();
                            break;
                        }
                        default:
                    }
                });
                const move_focus = (offset) => {
                    const { items } = this.model;
                    const j = (0, math_1.cycle)(i + offset, 0, items.length - 1);
                    item_els[j].focus();
                };
                item_el.addEventListener("keydown", (event) => {
                    const offset = (() => {
                        switch (event.key) {
                            case "ArrowUp": return -this.model.ncols;
                            case "ArrowDown": return +this.model.ncols;
                            case "ArrowLeft": return -1;
                            case "ArrowRight": return +1;
                            default: return null;
                        }
                    })();
                    if (offset != null) {
                        event.preventDefault();
                        move_focus(offset);
                    }
                });
                item_els.push(item_el);
            }
            this._pane = new panes_1.DropPane(item_els, {
                target: this.group_el,
                prevent_hide: this.input_el,
                extra_stylesheets: [item_css.default, pane_css.default, this._style_menu],
            });
            this._update_ncols();
            this.input_el.addEventListener("pointerup", () => {
                this.toggle();
            });
            this.input_el.addEventListener("keyup", (event) => {
                switch (event.key) {
                    case "Enter": {
                        this.toggle();
                        break;
                    }
                    case "Escape": {
                        this.hide();
                        break;
                    }
                    default:
                }
            });
            const move_selection = (offset) => {
                const { items, value } = this.model;
                const i = items.findIndex(([name]) => value == name);
                if (i != -1) {
                    const j = (0, math_1.cycle)(i + offset, 0, items.length - 1);
                    this.select(items[j]);
                }
            };
            this.input_el.addEventListener("keydown", (event) => {
                const offset = (() => {
                    switch (event.key) {
                        case "ArrowUp": return -1;
                        case "ArrowDown": return +1;
                        default: return null;
                    }
                })();
                if (offset != null) {
                    event.preventDefault();
                    move_selection(offset);
                }
            });
        }
        select(item) {
            this.hide();
            const [name] = item;
            this.model.value = name;
            super.change_input();
            this.input_el.focus();
        }
        toggle() {
            if (!this.model.disabled) {
                this._pane.toggle();
            }
        }
        hide() {
            this._pane.hide();
        }
    }
    exports.PaletteSelectView = PaletteSelectView;
    PaletteSelectView.__name__ = "PaletteSelectView";
    class PaletteSelect extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.PaletteSelect = PaletteSelect;
    _a = PaletteSelect;
    PaletteSelect.__name__ = "PaletteSelect";
    (() => {
        _a.prototype.default_view = PaletteSelectView;
        _a.define(({ Int, Str, List, NonNegative, Positive, Or, Auto }) => ({
            value: [Str],
            items: [List(Item)],
            ncols: [Positive(Int), 1],
            swatch_width: [NonNegative(Int), 100],
            swatch_height: [Or(Auto, NonNegative(Int)), "auto"],
        }));
    })();
},
651: /* core/util/panes.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../dom */;
    const types_1 = require(8) /* ./types */;
    const panes_css_1 = tslib_1.__importDefault(require(652) /* ../../styles/panes.css */);
    const base_css_1 = tslib_1.__importDefault(require(66) /* ../../styles/base.css */);
    //import {DOMComponentView} from "../dom_view"
    class DropPane {
        get is_open() {
            return this._open;
        }
        constructor(contents, options) {
            this.el = (0, dom_1.div)();
            this._open = false;
            this._on_mousedown = (event) => {
                if (event.composedPath().includes(this.el)) {
                    return;
                }
                const { prevent_hide } = this;
                if (prevent_hide instanceof HTMLElement) {
                    if (event.composedPath().includes(prevent_hide)) {
                        return;
                    }
                }
                else if (prevent_hide != null) {
                    if (prevent_hide(event)) {
                        return;
                    }
                }
                this.hide();
            };
            this._on_keydown = (event) => {
                switch (event.key) {
                    case "Escape": {
                        this.hide();
                        break;
                    }
                    default:
                }
            };
            this._on_blur = () => {
                this.hide();
            };
            this.contents = contents;
            this.target = options.target;
            this.prevent_hide = options.prevent_hide;
            this.extra_stylesheets = options.extra_stylesheets ?? [];
            this.shadow_el = this.el.attachShadow({ mode: "open" });
            this.class_list = new dom_1.ClassList(this.el.classList);
        }
        remove() {
            this._unlisten();
            this.el.remove();
        }
        _listen() {
            document.addEventListener("mousedown", this._on_mousedown);
            document.addEventListener("keydown", this._on_keydown);
            window.addEventListener("blur", this._on_blur);
        }
        _unlisten() {
            document.removeEventListener("mousedown", this._on_mousedown);
            document.removeEventListener("keydown", this._on_keydown);
            window.removeEventListener("blur", this._on_blur);
        }
        stylesheets() {
            return [base_css_1.default, /*...super.stylesheets(), */ panes_css_1.default, ...this.extra_stylesheets];
        }
        empty() {
            (0, dom_1.empty)(this.shadow_el);
            this.class_list.clear();
        }
        render() {
            this.empty();
            for (const style of this.stylesheets()) {
                const stylesheet = (0, types_1.isString)(style) ? new dom_1.InlineStyleSheet(style) : style;
                stylesheet.install(this.shadow_el);
            }
            this.shadow_el.append(...this.contents);
        }
        show() {
            if (!this._open) {
                this.render();
                const actual_target = this.target.shadowRoot ?? this.target;
                actual_target.appendChild(this.el);
                this._listen();
                this._open = true;
            }
        }
        hide() {
            if (this._open) {
                this._open = false;
                this._unlisten();
                this.el.remove();
            }
        }
        toggle() {
            this._open ? this.hide() : this.show();
        }
    }
    exports.DropPane = DropPane;
    DropPane.__name__ = "DropPane";
},
652: /* styles/panes.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `:host{position:absolute;top:100%;min-width:100%;width:auto;height:auto;user-select:none;-webkit-user-select:none;z-index:var(--bokeh-top-level);cursor:pointer;font-size:var(--font-size);background-color:#fff;border:1px solid #ccc;border-radius:var(--border-radius);box-shadow:2px 4px 8px rgba(0, 0, 0, 0.175);}`;
},
653: /* styles/widgets/palette_select.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.value_input = "bk-value-input";
    exports.value = "bk-value";
    exports.chevron = "bk-chevron";
    exports.default = `.bk-value-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;gap:1em;cursor:pointer;}.bk-value{flex-grow:1;}.bk-chevron{width:16px;height:16px;mask-size:100% 100%;-webkit-mask-size:100% 100%;mask-position:center center;-webkit-mask-position:center center;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;}`;
},
654: /* styles/widgets/palette_select_item.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.entry = "bk-entry";
    exports.swatch = "bk-swatch";
    exports.item = "bk-item";
    exports.active = "bk-active";
    exports.default = `.bk-entry{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;gap:0.5em;}.bk-swatch{width:100px;height:auto;align-self:stretch;}.bk-item{--active-tool-highlight:#26aae1;border:1px solid transparent;}.bk-item.bk-active{border-color:var(--active-tool-highlight);}.bk-item:hover{background-color:#f9f9f9;}.bk-item:focus,.bk-item:focus-visible{outline:1px dotted var(--active-tool-highlight);outline-offset:-1px;}.bk-item::-moz-focus-inner{border:0;}`;
},
655: /* styles/widgets/palette_select_pane.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `:host{--number-of-columns:1;padding:5px;display:grid;grid-template-columns:repeat(var(--number-of-columns), 1fr);gap:0.25em;}`;
},
656: /* models/widgets/paragraph.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const markup_1 = require(637) /* ./markup */;
    const dom_1 = require(63) /* ../../core/dom */;
    class ParagraphView extends markup_1.MarkupView {
        render() {
            super.render();
            // This overrides default user-agent styling and helps layout work
            const content = (0, dom_1.p)({ style: { margin: "0px" } });
            if (this.has_math_disabled()) {
                content.textContent = this.model.text;
            }
            else {
                content.innerHTML = this.process_tex(this.model.text);
            }
            this.markup_el.appendChild(content);
        }
    }
    exports.ParagraphView = ParagraphView;
    ParagraphView.__name__ = "ParagraphView";
    class Paragraph extends markup_1.Markup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Paragraph = Paragraph;
    _a = Paragraph;
    Paragraph.__name__ = "Paragraph";
    (() => {
        _a.prototype.default_view = ParagraphView;
    })();
},
657: /* models/widgets/password_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const text_input_1 = require(605) /* ./text_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const password_input_css_1 = tslib_1.__importDefault(require(658) /* ../../styles/widgets/password_input.css */);
    const icons_css_1 = tslib_1.__importDefault(require(123) /* ../../styles/icons.css */);
    class PasswordInputView extends text_input_1.TextInputView {
        stylesheets() {
            return [...super.stylesheets(), password_input_css_1.default, icons_css_1.default];
        }
        render() {
            super.render();
            this.input_el.type = "password";
            this.toggle_el = (0, dom_1.div)({ class: "bk-toggle" });
            this.toggle_el.addEventListener("click", () => {
                const { input_el, toggle_el } = this;
                const is_visible = input_el.type == "text";
                toggle_el.classList.toggle("bk-visible", !is_visible);
                input_el.type = is_visible ? "password" : "text";
            });
            this.shadow_el.append(this.toggle_el);
        }
    }
    exports.PasswordInputView = PasswordInputView;
    PasswordInputView.__name__ = "PasswordInputView";
    class PasswordInput extends text_input_1.TextInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.PasswordInput = PasswordInput;
    _a = PasswordInput;
    PasswordInput.__name__ = "PasswordInput";
    (() => {
        _a.prototype.default_view = PasswordInputView;
    })();
},
658: /* styles/widgets/password_input.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.input = "bk-input";
    exports.toggle = "bk-toggle";
    exports.visible = "bk-visible";
    exports.default = `:host{--toggle-size:14px;--toggle-padding:4px;--toggle-width:calc(var(--toggle-size) + 2*var(--toggle-padding));}.bk-input{padding-right:max();}.bk-toggle{position:absolute;right:0;top:0;width:var(--toggle-width);height:100%;padding:0 var(--toggle-padding);background-color:var(--bokeh-icon-color);mask-image:var(--bokeh-icon-see-off);-webkit-mask-image:var(--bokeh-icon-see-off);mask-size:var(--toggle-size) var(--toggle-size);-webkit-mask-size:var(--toggle-size) var(--toggle-size);mask-position:center center;-webkit-mask-position:center center;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;cursor:pointer;}.bk-toggle.bk-visible{mask-image:var(--bokeh-icon-see-on);-webkit-mask-image:var(--bokeh-icon-see-on);}`;
},
659: /* models/widgets/pretext.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const markup_1 = require(637) /* ./markup */;
    const dom_1 = require(63) /* ../../core/dom */;
    class PreTextView extends markup_1.MarkupView {
        render() {
            super.render();
            const content = (0, dom_1.pre)({ style: { overflow: "auto" } }, this.model.text);
            this.markup_el.appendChild(content);
        }
    }
    exports.PreTextView = PreTextView;
    PreTextView.__name__ = "PreTextView";
    class PreText extends markup_1.Markup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.PreText = PreText;
    _a = PreText;
    PreText.__name__ = "PreText";
    (() => {
        _a.prototype.default_view = PreTextView;
    })();
},
660: /* models/widgets/radio_button_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_button_group_1 = require(612) /* ./toggle_button_group */;
    const buttons = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */);
    class RadioButtonGroupView extends toggle_button_group_1.ToggleButtonGroupView {
        change_active(i) {
            if (this.model.active !== i) {
                this.model.active = i;
            }
        }
        _update_active() {
            const { active } = this.model;
            this._buttons.forEach((button_el, i) => {
                button_el.classList.toggle(buttons.active, active === i);
            });
        }
    }
    exports.RadioButtonGroupView = RadioButtonGroupView;
    RadioButtonGroupView.__name__ = "RadioButtonGroupView";
    class RadioButtonGroup extends toggle_button_group_1.ToggleButtonGroup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.RadioButtonGroup = RadioButtonGroup;
    _a = RadioButtonGroup;
    RadioButtonGroup.__name__ = "RadioButtonGroup";
    (() => {
        _a.prototype.default_view = RadioButtonGroupView;
        _a.define(({ Int, Nullable }) => ({
            active: [Nullable(Int), null],
        }));
    })();
},
661: /* models/widgets/radio_group.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_input_group_1 = require(615) /* ./toggle_input_group */;
    const dom_1 = require(63) /* ../../core/dom */;
    const string_1 = require(40) /* ../../core/util/string */;
    const iterator_1 = require(34) /* ../../core/util/iterator */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class RadioGroupView extends toggle_input_group_1.ToggleInputGroupView {
        connect_signals() {
            super.connect_signals();
            const { active } = this.model.properties;
            this.on_change(active, () => {
                const { active } = this.model;
                for (const [input_el, i] of (0, iterator_1.enumerate)(this._inputs)) {
                    input_el.checked = active == i;
                }
            });
        }
        render() {
            super.render();
            const group = (0, dom_1.div)({ class: [inputs.input_group, this.model.inline ? inputs.inline : null] });
            this.shadow_el.appendChild(group);
            const name = (0, string_1.unique_id)();
            const { active, labels } = this.model;
            this._inputs = [];
            for (let i = 0; i < labels.length; i++) {
                const radio = (0, dom_1.input)({ type: "radio", name, value: `${i}` });
                radio.addEventListener("change", () => this.change_active(i));
                this._inputs.push(radio);
                if (this.model.disabled) {
                    radio.disabled = true;
                }
                if (i == active) {
                    radio.checked = true;
                }
                const label_el = (0, dom_1.label)(radio, (0, dom_1.span)(labels[i]));
                group.appendChild(label_el);
            }
        }
        change_active(i) {
            this.model.active = i;
        }
    }
    exports.RadioGroupView = RadioGroupView;
    RadioGroupView.__name__ = "RadioGroupView";
    class RadioGroup extends toggle_input_group_1.ToggleInputGroup {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.RadioGroup = RadioGroup;
    _a = RadioGroup;
    RadioGroup.__name__ = "RadioGroup";
    (() => {
        _a.prototype.default_view = RadioGroupView;
        _a.define(({ Int, Nullable }) => ({
            active: [Nullable(Int), null],
        }));
    })();
},
662: /* models/widgets/select.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const dom_1 = require(63) /* ../../core/dom */;
    const types_1 = require(8) /* ../../core/util/types */;
    const object_1 = require(9) /* ../../core/util/object */;
    const input_widget_1 = require(607) /* ./input_widget */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    const kinds_1 = require(21) /* ../../core/kinds */;
    const Value = kinds_1.Unknown;
    const Label = kinds_1.Str;
    const Options = (0, kinds_1.List)((0, kinds_1.Or)(Label, (0, kinds_1.Tuple)(Value, Label)));
    const OptionsGroups = (0, kinds_1.Dict)(Options);
    const NotSelected = "";
    class SelectView extends input_widget_1.InputWidgetView {
        constructor() {
            super(...arguments);
            this._known_values = new Map();
        }
        connect_signals() {
            super.connect_signals();
            const { value, options } = this.model.properties;
            this.on_change(value, () => {
                this._update_value();
            });
            this.on_change(options, () => {
                (0, dom_1.empty)(this.input_el);
                this.input_el.append(...this.options_el());
                this._update_value();
            });
        }
        options_el() {
            const { _known_values } = this;
            _known_values.clear();
            function build_options(values) {
                return values.map((el) => {
                    let value, label;
                    if ((0, types_1.isString)(el)) {
                        value = label = el;
                    }
                    else {
                        [value, label] = el;
                    }
                    _known_values.set(value, label);
                    return (0, dom_1.option)({ value: label }, label);
                });
            }
            const { options } = this.model;
            if ((0, types_1.isArray)(options)) {
                return build_options(options);
            }
            else {
                return (0, object_1.entries)(options).map(([label, values]) => (0, dom_1.optgroup)({ label }, build_options(values)));
            }
        }
        _render_input() {
            this.input_el = (0, dom_1.select)({
                class: inputs.input,
                name: this.model.name,
                disabled: this.model.disabled,
            }, this.options_el());
            this.input_el.addEventListener("change", () => this.change_input());
            return this.input_el;
        }
        render() {
            super.render();
            this._update_value();
        }
        change_input() {
            const selected_label = this.input_el.value;
            const found = [...this._known_values].find(([_, label]) => selected_label == label);
            const value = (() => {
                if (found == null) {
                    return NotSelected;
                }
                else {
                    const [value, _] = found;
                    return value;
                }
            })();
            this.model.value = value;
            super.change_input();
        }
        _update_value() {
            const { value } = this.model;
            const label = this._known_values.get(value);
            if (label !== undefined) {
                this.input_el.value = label;
            }
            else {
                this.input_el.removeAttribute("value");
                this.input_el.selectedIndex = -1;
            }
        }
    }
    exports.SelectView = SelectView;
    SelectView.__name__ = "SelectView";
    class Select extends input_widget_1.InputWidget {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Select = Select;
    _a = Select;
    Select.__name__ = "Select";
    (() => {
        _a.prototype.default_view = SelectView;
        _a.define(() => {
            return {
                value: [Value, NotSelected],
                options: [(0, kinds_1.Or)(Options, OptionsGroups), []],
            };
        });
    })();
},
663: /* models/widgets/spinner.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const numeric_input_1 = require(649) /* ./numeric_input */;
    const p = tslib_1.__importStar(require(18) /* ../../core/properties */);
    const dom_1 = require(63) /* ../../core/dom */;
    const { min, max } = Math;
    function debounce(func, wait, immediate = false) {
        //func must works by side effects
        let timeoutId;
        return function (...args) {
            const context = this;
            const doLater = function () {
                timeoutId = undefined;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const shouldCallNow = immediate && timeoutId === undefined;
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(doLater, wait);
            if (shouldCallNow) {
                func.apply(context, args);
            }
        };
    }
    // Inspiration from https://github.com/uNmAnNeR/ispinjs
    class SpinnerView extends numeric_input_1.NumericInputView {
        *buttons() {
            yield this.btn_up_el;
            yield this.btn_down_el;
        }
        initialize() {
            super.initialize();
            this._handles = { interval: undefined, timeout: undefined };
            this._interval = 200;
        }
        connect_signals() {
            super.connect_signals();
            const p = this.model.properties;
            this.on_change(p.disabled, () => {
                for (const btn of this.buttons()) {
                    (0, dom_1.toggle_attribute)(btn, "disabled", this.model.disabled);
                }
            });
        }
        _render_input() {
            super._render_input();
            this.btn_up_el = (0, dom_1.button)({ class: "bk-spin-btn bk-spin-btn-up" });
            this.btn_down_el = (0, dom_1.button)({ class: "bk-spin-btn bk-spin-btn-down" });
            const { input_el, btn_up_el, btn_down_el } = this;
            this.wrapper_el = (0, dom_1.div)({ class: "bk-spin-wrapper" }, input_el, btn_up_el, btn_down_el);
            return this.wrapper_el;
        }
        render() {
            super.render();
            for (const btn of this.buttons()) {
                (0, dom_1.toggle_attribute)(btn, "disabled", this.model.disabled);
                btn.addEventListener("mousedown", (evt) => this._btn_mouse_down(evt));
                btn.addEventListener("mouseup", () => this._btn_mouse_up());
                btn.addEventListener("mouseleave", () => this._btn_mouse_leave());
            }
            this.input_el.addEventListener("keydown", (evt) => {
                this._input_key_down(evt);
            });
            this.input_el.addEventListener("keyup", () => {
                this.model.value_throttled = this.model.value;
            });
            this.input_el.addEventListener("wheel", (evt) => {
                this._input_mouse_wheel(evt);
            });
            this.input_el.addEventListener("wheel", debounce(() => {
                this.model.value_throttled = this.model.value;
            }, this.model.wheel_wait, false));
        }
        remove() {
            this._stop_incrementation();
            super.remove();
        }
        _start_incrementation(sign) {
            clearInterval(this._handles.interval);
            this._counter = 0;
            const { step } = this.model;
            const increment_with_increasing_rate = (step) => {
                this._counter += 1;
                if (this._counter % 5 == 0) {
                    const quotient = Math.floor(this._counter / 5);
                    if (quotient < 10) {
                        clearInterval(this._handles.interval);
                        this._handles.interval = setInterval(() => increment_with_increasing_rate(step), this._interval / (quotient + 1));
                    }
                    else if (quotient >= 10 && quotient <= 13) {
                        clearInterval(this._handles.interval);
                        this._handles.interval = setInterval(() => increment_with_increasing_rate(step * 2), this._interval / 10);
                    }
                }
                this.increment(step);
            };
            this._handles.interval = setInterval(() => increment_with_increasing_rate(sign * step), this._interval);
        }
        _stop_incrementation() {
            clearTimeout(this._handles.timeout);
            this._handles.timeout = undefined;
            clearInterval(this._handles.interval);
            this._handles.interval = undefined;
            this.model.value_throttled = this.model.value;
        }
        _btn_mouse_down(event) {
            event.preventDefault();
            const sign = event.currentTarget === this.btn_up_el ? 1 : -1;
            this.increment(sign * this.model.step);
            this.input_el.focus();
            //while mouse is down we increment at a certain rate
            this._handles.timeout = setTimeout(() => this._start_incrementation(sign), this._interval);
        }
        _btn_mouse_up() {
            this._stop_incrementation();
        }
        _btn_mouse_leave() {
            this._stop_incrementation();
        }
        _input_mouse_wheel(event) {
            if (this.shadow_el.activeElement === this.input_el) {
                event.preventDefault();
                const sign = event.deltaY > 0 ? -1 : 1;
                this.increment(sign * this.model.step);
            }
        }
        _input_key_down(event) {
            const step = (() => {
                const { step, page_step_multiplier } = this.model;
                switch (event.key) {
                    case "ArrowUp": return step;
                    case "ArrowDown": return -step;
                    case "PageUp": return page_step_multiplier * step;
                    case "PageDown": return -page_step_multiplier * step;
                    default: return null;
                }
            })();
            if (step != null) {
                event.preventDefault();
                this.increment(step);
            }
        }
        increment(step) {
            const { low, high } = this.model;
            if (this.model.value == null) {
                if (step > 0) {
                    this.model.value = low != null ? low : (high != null ? min(0, high) : 0);
                }
                else if (step < 0) {
                    this.model.value = high != null ? high : (low != null ? max(low, 0) : 0);
                }
            }
            else {
                this.model.value = this.bound_value(this.model.value + step);
            }
        }
        change_input() {
            super.change_input();
            this.model.value_throttled = this.model.value;
        }
        bound_value(value) {
            const { low, high } = this.model;
            if (low != null && value < low) {
                return this.model.value ?? 0;
            }
            if (high != null && value > high) {
                return this.model.value ?? 0;
            }
            return value;
        }
    }
    exports.SpinnerView = SpinnerView;
    SpinnerView.__name__ = "SpinnerView";
    class Spinner extends numeric_input_1.NumericInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Spinner = Spinner;
    _a = Spinner;
    Spinner.__name__ = "Spinner";
    (() => {
        _a.prototype.default_view = SpinnerView;
        _a.define(({ Float, Nullable }) => ({
            value_throttled: [Nullable(Float), p.unset, { readonly: true }],
            step: [Float, 1],
            page_step_multiplier: [Float, 10],
            wheel_wait: [Float, 100],
        }));
        _a.override({
            mode: "float",
        });
    })();
},
664: /* models/widgets/switch.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const toggle_input_1 = require(618) /* ./toggle_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const switch_css_1 = tslib_1.__importDefault(require(665) /* ../../styles/widgets/switch.css */);
    class SwitchView extends toggle_input_1.ToggleInputView {
        stylesheets() {
            return [...super.stylesheets(), switch_css_1.default];
        }
        connect_signals() {
            super.connect_signals();
            this.el.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "Enter":
                    case " ": {
                        event.preventDefault();
                        this._toggle_active();
                        break;
                    }
                }
            });
            this.el.addEventListener("click", () => this._toggle_active());
        }
        render() {
            super.render();
            this.bar_el = (0, dom_1.div)({ class: "bar" });
            this.knob_el = (0, dom_1.div)({ class: "knob", tabIndex: 0 });
            const body_el = (0, dom_1.div)({ class: "body" }, this.bar_el, this.knob_el);
            this._update_active();
            this._update_disabled();
            this.shadow_el.appendChild(body_el);
        }
        _update_active() {
            this.el.classList.toggle("active", this.model.active);
        }
        _update_disabled() {
            this.el.classList.toggle("disabled", this.model.disabled);
        }
    }
    exports.SwitchView = SwitchView;
    SwitchView.__name__ = "SwitchView";
    class Switch extends toggle_input_1.ToggleInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Switch = Switch;
    _a = Switch;
    Switch.__name__ = "Switch";
    (() => {
        _a.prototype.default_view = SwitchView;
        _a.override({
            width: 32,
        });
    })();
},
665: /* styles/widgets/switch.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `:host{cursor:pointer;}:host(.disabled){cursor:default;}:host{--switch-size:16px;--bar-height:10px;}.body{width:100%;height:var(--switch-size);}.bar{position:relative;top:calc(50% - var(--bar-height)/2);height:var(--bar-height);border-radius:calc(var(--bar-height)/2);background-color:#e5e5e5;transition-property:background-color;}.knob{position:absolute;top:0;left:0;width:var(--switch-size);height:var(--switch-size);border-radius:8px;background-color:#adadad;transition-property:left, background-color;}:host(.active) .bar{background-color:#c2d5f7;}:host(.active) .knob{left:calc(100% - var(--switch-size));background-color:#3b80f0;}`;
},
666: /* models/widgets/textarea_input.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const text_like_input_1 = require(606) /* ./text_like_input */;
    const dom_1 = require(63) /* ../../core/dom */;
    const inputs = tslib_1.__importStar(require(608) /* ../../styles/widgets/inputs.css */);
    class TextAreaInputView extends text_like_input_1.TextLikeInputView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.rows.change, () => this.input_el.rows = this.model.rows);
            this.connect(this.model.properties.cols.change, () => this.input_el.cols = this.model.cols);
        }
        _render_input() {
            return this.input_el = (0, dom_1.textarea)({ class: inputs.input });
        }
        render() {
            super.render();
            this.input_el.cols = this.model.cols;
            this.input_el.rows = this.model.rows;
        }
    }
    exports.TextAreaInputView = TextAreaInputView;
    TextAreaInputView.__name__ = "TextAreaInputView";
    class TextAreaInput extends text_like_input_1.TextLikeInput {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.TextAreaInput = TextAreaInput;
    _a = TextAreaInput;
    TextAreaInput.__name__ = "TextAreaInput";
    (() => {
        _a.prototype.default_view = TextAreaInputView;
        _a.define(({ Int }) => ({
            cols: [Int, 20],
            rows: [Int, 2],
        }));
        _a.override({
            max_length: 500,
        });
    })();
},
667: /* models/widgets/time_picker.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const picker_base_1 = require(622) /* ./picker_base */;
    const kinds_1 = require(21) /* ../../core/kinds */;
    const enums_1 = require(20) /* ../../core/enums */;
    const assert_1 = require(12) /* ../../core/util/assert */;
    exports.TimeLike = (0, kinds_1.Or)(kinds_1.Str, kinds_1.Float);
    class TimePickerView extends picker_base_1.PickerBaseView {
        _format_time(date) {
            const { picker } = this;
            return picker.formatDate(date, picker.config.dateFormat);
        }
        connect_signals() {
            super.connect_signals();
            const { value, min_time, max_time, time_format, hour_increment, minute_increment, second_increment, seconds, clock, } = this.model.properties;
            this.connect(value.change, () => {
                const { value } = this.model;
                if (value != null) {
                    this.picker.setDate(value);
                }
                else {
                    this.picker.clear();
                }
            });
            this.connect(min_time.change, () => this.picker.set("minTime", this.model.min_time));
            this.connect(max_time.change, () => this.picker.set("maxTime", this.model.max_time));
            this.connect(time_format.change, () => this.picker.set("altFormat", this.model.time_format));
            this.connect(hour_increment.change, () => this.picker.set("hourIncrement", this.model.hour_increment));
            this.connect(minute_increment.change, () => this.picker.set("minuteIncrement", this.model.minute_increment));
            this.connect(second_increment.change, () => this._update_second_increment());
            this.connect(seconds.change, () => this.picker.set("enableSeconds", this.model.seconds));
            this.connect(clock.change, () => this.picker.set("time_24hr", this.model.clock == "24h"));
        }
        get flatpickr_options() {
            const { value, min_time, max_time, time_format, hour_increment, minute_increment, seconds, clock } = this.model;
            const options = super.flatpickr_options;
            options.enableTime = true;
            options.noCalendar = true;
            options.altInput = true;
            options.altFormat = time_format;
            options.dateFormat = "H:i:S";
            options.hourIncrement = hour_increment;
            options.minuteIncrement = minute_increment;
            options.enableSeconds = seconds;
            options.time_24hr = clock == "24h";
            if (value != null) {
                options.defaultDate = value;
            }
            if (min_time != null) {
                options.minTime = min_time;
            }
            if (max_time != null) {
                options.maxTime = max_time;
            }
            return options;
        }
        render() {
            super.render();
            this._update_second_increment();
        }
        _update_second_increment() {
            const { second_increment } = this.model;
            this.picker.secondElement?.setAttribute("step", second_increment.toString());
        }
        _on_change(selected) {
            (0, assert_1.assert)(selected.length <= 1);
            this.model.value = (() => {
                if (selected.length == 0) {
                    return null;
                }
                else {
                    const [datetime] = selected;
                    return this._format_time(datetime);
                }
            })();
        }
    }
    exports.TimePickerView = TimePickerView;
    TimePickerView.__name__ = "TimePickerView";
    class TimePicker extends picker_base_1.PickerBase {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.TimePicker = TimePicker;
    _a = TimePicker;
    TimePicker.__name__ = "TimePicker";
    (() => {
        _a.prototype.default_view = TimePickerView;
        _a.define(({ Bool, Str, Nullable, Positive, Int }) => ({
            value: [Nullable(exports.TimeLike), null],
            min_time: [Nullable(exports.TimeLike), null],
            max_time: [Nullable(exports.TimeLike), null],
            time_format: [Str, "H:i"],
            hour_increment: [Positive(Int), 1],
            minute_increment: [Positive(Int), 1],
            second_increment: [Positive(Int), 1],
            seconds: [Bool, false],
            clock: [enums_1.Clock, "24h"],
        }));
    })();
},
668: /* models/widgets/toggle.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const abstract_button_1 = require(600) /* ./abstract_button */;
    const bokeh_events_1 = require(53) /* ../../core/bokeh_events */;
    const buttons = tslib_1.__importStar(require(603) /* ../../styles/buttons.css */);
    class ToggleView extends abstract_button_1.AbstractButtonView {
        connect_signals() {
            super.connect_signals();
            this.connect(this.model.properties.active.change, () => this._update_active());
        }
        render() {
            super.render();
            this._update_active();
        }
        click() {
            this.model.active = !this.model.active;
            this.model.trigger_event(new bokeh_events_1.ButtonClick());
            super.click();
        }
        _update_active() {
            this.button_el.classList.toggle(buttons.active, this.model.active);
        }
    }
    exports.ToggleView = ToggleView;
    ToggleView.__name__ = "ToggleView";
    class Toggle extends abstract_button_1.AbstractButton {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Toggle = Toggle;
    _a = Toggle;
    Toggle.__name__ = "Toggle";
    (() => {
        _a.prototype.default_view = ToggleView;
        _a.define(({ Bool }) => ({
            active: [Bool, false],
        }));
        _a.override({
            label: "Toggle",
        });
    })();
},
669: /* models/widgets/sliders/index.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    var categorical_slider_1 = require(670) /* ./categorical_slider */;
    __esExport("CategoricalSlider", categorical_slider_1.CategoricalSlider);
    var date_range_slider_1 = require(675) /* ./date_range_slider */;
    __esExport("DateRangeSlider", date_range_slider_1.DateRangeSlider);
    var date_slider_1 = require(678) /* ./date_slider */;
    __esExport("DateSlider", date_slider_1.DateSlider);
    var datetime_range_slider_1 = require(680) /* ./datetime_range_slider */;
    __esExport("DatetimeRangeSlider", datetime_range_slider_1.DatetimeRangeSlider);
    var range_slider_1 = require(681) /* ./range_slider */;
    __esExport("RangeSlider", range_slider_1.RangeSlider);
    var slider_1 = require(682) /* ./slider */;
    __esExport("Slider", slider_1.Slider);
},
670: /* models/widgets/sliders/categorical_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const abstract_slider_1 = require(671) /* ./abstract_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class CategoricalSliderView extends abstract_slider_1.AbstractSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "tap";
        }
        connect_signals() {
            super.connect_signals();
            const { categories } = this.model.properties;
            this.on_change([categories], () => this._update_slider());
        }
        _calc_to() {
            const { categories } = this.model;
            return {
                range: {
                    min: 0,
                    max: categories.length - 1,
                },
                start: [this.model.value],
                step: 1,
                format: {
                    to: (value) => categories[value],
                    from: (value) => categories.indexOf(value),
                },
            };
        }
        _calc_from([value]) {
            const { categories } = this.model;
            return categories[value | 0]; // value may not be an integer due to noUiSlider's FP math
        }
        pretty(value) {
            return (0, types_1.isNumber)(value) ? this.model.categories[value] : value;
        }
    }
    exports.CategoricalSliderView = CategoricalSliderView;
    CategoricalSliderView.__name__ = "CategoricalSliderView";
    class CategoricalSlider extends abstract_slider_1.AbstractSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.CategoricalSlider = CategoricalSlider;
    _a = CategoricalSlider;
    CategoricalSlider.__name__ = "CategoricalSlider";
    (() => {
        _a.prototype.default_view = CategoricalSliderView;
        _a.define(({ List, Str }) => ({
            categories: [List(Str)],
        }));
    })();
},
671: /* models/widgets/sliders/abstract_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const nouislider_1 = tslib_1.__importDefault(require(672) /* nouislider */);
    const p = tslib_1.__importStar(require(18) /* ../../../core/properties */);
    const dom_1 = require(63) /* ../../../core/dom */;
    const array_1 = require(10) /* ../../../core/util/array */;
    const color_1 = require(22) /* ../../../core/util/color */;
    const oriented_control_1 = require(613) /* ../oriented_control */;
    const sliders_css_1 = tslib_1.__importStar(require(673) /* ../../../styles/widgets/sliders.css */), sliders = sliders_css_1;
    const nouislider_css_1 = tslib_1.__importDefault(require(674) /* ../../../styles/widgets/nouislider.css */);
    const inputs = tslib_1.__importStar(require(608) /* ../../../styles/widgets/inputs.css */);
    class AbstractSliderView extends oriented_control_1.OrientedControlView {
        constructor() {
            super(...arguments);
            this.connected = false;
            this._auto_width = "auto";
            this._auto_height = "auto";
        }
        *controls() {
            yield this.slider_el;
        }
        get _steps() {
            return this._noUiSlider.steps;
        }
        _update_slider() {
            this._noUiSlider.updateOptions(this._calc_to(), true);
        }
        connect_signals() {
            super.connect_signals();
            const { direction, orientation, tooltips } = this.model.properties;
            this.on_change([direction, orientation, tooltips], () => this.render());
            const { bar_color } = this.model.properties;
            this.on_change(bar_color, () => {
                this._set_bar_color();
            });
            const { value, title, show_value } = this.model.properties;
            this.on_change([value, title, show_value], () => this._update_title());
            this.on_change(value, () => this._update_slider());
        }
        stylesheets() {
            return [...super.stylesheets(), nouislider_css_1.default, sliders_css_1.default];
        }
        _update_title() {
            (0, dom_1.empty)(this.title_el);
            const hide_header = this.model.title == null || (this.model.title.length == 0 && !this.model.show_value);
            this.title_el.style.display = hide_header ? "none" : "";
            if (!hide_header) {
                const { title } = this.model;
                if (title != null && title.length > 0) {
                    if (this.contains_tex_string(title)) {
                        this.title_el.innerHTML = `${this.process_tex(title)}: `;
                    }
                    else {
                        this.title_el.textContent = `${title}: `;
                    }
                }
                if (this.model.show_value) {
                    const { start } = this._calc_to();
                    const pretty = start.map((v) => this.pretty(v)).join(" .. ");
                    this.title_el.appendChild((0, dom_1.span)({ class: sliders.slider_value }, pretty));
                }
            }
        }
        _set_bar_color() {
            if (this.connected !== false && !this.model.disabled && this.slider_el != null) {
                const connect_el = this.slider_el.querySelector(".noUi-connect");
                connect_el.style.backgroundColor = (0, color_1.color2css)(this.model.bar_color);
            }
        }
        render() {
            super.render();
            let tooltips;
            if (this.model.tooltips) {
                const formatter = {
                    to: (value) => this.pretty(value),
                };
                const { start } = this._calc_to();
                tooltips = (0, array_1.repeat)(formatter, start.length);
            }
            else {
                tooltips = null;
            }
            if (this.slider_el == null) {
                this.slider_el = (0, dom_1.div)();
                this._noUiSlider = nouislider_1.default.create(this.slider_el, {
                    ...this._calc_to(),
                    behaviour: this.behaviour,
                    connect: this.connected,
                    tooltips: tooltips ?? false,
                    orientation: this.model.orientation,
                    direction: this.model.direction,
                });
                this._noUiSlider.on("slide", (_, __, values) => this._slide(values));
                this._noUiSlider.on("change", (_, __, values) => this._change(values));
                const toggle_tooltip = (i, show) => {
                    if (tooltips == null || this.slider_el == null) {
                        return;
                    }
                    const handle = this.slider_el.querySelectorAll(".noUi-handle")[i];
                    const tooltip = handle.querySelector(".noUi-tooltip");
                    tooltip.style.display = show ? "block" : "";
                };
                this._noUiSlider.on("start", () => this._toggle_user_select(false));
                this._noUiSlider.on("end", () => this._toggle_user_select(true));
                this._noUiSlider.on("start", (_, i) => toggle_tooltip(i, true));
                this._noUiSlider.on("end", (_, i) => toggle_tooltip(i, false));
            }
            else {
                this._update_slider();
            }
            this._set_bar_color();
            if (this.model.disabled) {
                this.slider_el.setAttribute("disabled", "true");
            }
            else {
                this.slider_el.removeAttribute("disabled");
            }
            this.title_el = (0, dom_1.div)({ class: sliders.slider_title });
            this._update_title();
            this.group_el = (0, dom_1.div)({ class: inputs.input_group }, this.title_el, this.slider_el);
            this.shadow_el.appendChild(this.group_el);
            this._has_finished = true;
        }
        _toggle_user_select(enable) {
            const { style } = document.body;
            const value = enable ? "" : "none";
            style.userSelect = value;
            style.webkitUserSelect = value;
        }
        _slide(values) {
            this.model.value = this._calc_from(values);
        }
        _change(values) {
            const value = this._calc_from(values);
            this.model.setv({ value, value_throttled: value });
        }
    }
    exports.AbstractSliderView = AbstractSliderView;
    AbstractSliderView.__name__ = "AbstractSliderView";
    class AbstractSlider extends oriented_control_1.OrientedControl {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.AbstractSlider = AbstractSlider;
    _a = AbstractSlider;
    AbstractSlider.__name__ = "AbstractSlider";
    (() => {
        _a.define(({ Unknown, Bool, Str, Color, Enum, Nullable }) => {
            return {
                title: [Nullable(Str), ""],
                show_value: [Bool, true],
                value: [Unknown],
                value_throttled: [Unknown, p.unset, { readonly: true }],
                direction: [Enum("ltr", "rtl"), "ltr"],
                tooltips: [Bool, true],
                bar_color: [Color, "#e6e6e6"],
            };
        });
        _a.override({
            width: 300, // sliders don't have any intrinsic width
        });
    })();
},
672: /* nouislider/dist/nouislider.mjs */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.create = initialize;
    (function (PipsMode) {
        PipsMode["Range"] = "range";
        PipsMode["Steps"] = "steps";
        PipsMode["Positions"] = "positions";
        PipsMode["Count"] = "count";
        PipsMode["Values"] = "values";
    })(exports.PipsMode || (exports.PipsMode = {}));
    (function (PipsType) {
        PipsType[PipsType["None"] = -1] = "None";
        PipsType[PipsType["NoValue"] = 0] = "NoValue";
        PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
        PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
    })(exports.PipsType || (exports.PipsType = {}));
    //region Helper Methods
    function isValidFormatter(entry) {
        return isValidPartialFormatter(entry) && typeof entry.from === "function";
    }
    function isValidPartialFormatter(entry) {
        // partial formatters only need a to function and not a from function
        return typeof entry === "object" && typeof entry.to === "function";
    }
    function removeElement(el) {
        el.parentElement.removeChild(el);
    }
    function isSet(value) {
        return value !== null && value !== undefined;
    }
    // Bindable version
    function preventDefault(e) {
        e.preventDefault();
    }
    // Removes duplicates from an array.
    function unique(array) {
        return array.filter(function (a) {
            return !this[a] ? (this[a] = true) : false;
        }, {});
    }
    // Round a value to the closest 'to'.
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    // Current position of an element relative to the document.
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);
        // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
        }
        return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
    }
    // Checks whether a value is numerical.
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }
    // Sets a class and removes it after [duration] ms.
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout(function () {
                removeClass(element, className);
            }, duration);
        }
    }
    // Limits a value to 0 - 100
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    // Wraps a variable as an array, if it isn't one yet.
    // Note that an input array is returned by reference!
    function asArray(a) {
        return Array.isArray(a) ? a : [a];
    }
    // Counts decimals
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    // http://youmightnotneedjquery.com/#add_class
    function addClass(el, className) {
        if (el.classList && !/\s/.test(className)) {
            el.classList.add(className);
        }
        else {
            el.className += " " + className;
        }
    }
    // http://youmightnotneedjquery.com/#remove_class
    function removeClass(el, className) {
        if (el.classList && !/\s/.test(className)) {
            el.classList.remove(className);
        }
        else {
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    }
    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
                ? doc.documentElement.scrollLeft
                : doc.body.scrollLeft;
        var y = supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
                ? doc.documentElement.scrollTop
                : doc.body.scrollTop;
        return {
            x: x,
            y: y,
        };
    }
    // we provide a function to compute constants instead
    // of accessing window.* as soon as the module needs it
    // so that we do not compute anything if not needed
    function getActions() {
        // Determine the events to bind. IE11 implements pointerEvents without
        // a prefix, which breaks compatibility with the IE10 implementation.
        return window.navigator.pointerEnabled
            ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup",
            }
            : window.navigator.msPointerEnabled
                ? {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp",
                }
                : {
                    start: "mousedown touchstart",
                    move: "mousemove touchmove",
                    end: "mouseup touchend",
                };
    }
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // Issue #785
    function getSupportsPassive() {
        var supportsPassive = false;
        /* eslint-disable */
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function () {
                    supportsPassive = true;
                },
            });
            // @ts-ignore
            window.addEventListener("test", null, opts);
        }
        catch (e) { }
        /* eslint-enable */
        return supportsPassive;
    }
    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    //endregion
    //region Range Calculation
    // Determine the size of a sub-range in relation to a full range.
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    // (percentage) How many percent is this value of this range?
    function fromPercentage(range, value, startRange) {
        return (value * 100) / (range[startRange + 1] - range[startRange]);
    }
    // (percentage) Where is this value on this range?
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
    }
    // (value) How much is this percentage on this range?
    function isPercentage(range, value) {
        return (value * (range[1] - range[0])) / 100 + range[0];
    }
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) {
            j += 1;
        }
        return j;
    }
    // (percentage) Input a value, find where, on a scale of 0-100, it applies.
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
            return 100;
        }
        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
    }
    // (value) Input a percentage, find where it is on the specified range.
    function fromStepping(xVal, xPct, value) {
        // There is no range group that fits 100
        if (value >= 100) {
            return xVal.slice(-1)[0];
        }
        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
    }
    // (percentage) Get the step that applies at a certain value.
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
            return value;
        }
        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];
        // If 'snap' is set, steps are used as fixed points on the slider.
        if (snap) {
            // Find the closest position, a or b.
            if (value - a > (b - a) / 2) {
                return b;
            }
            return a;
        }
        if (!xSteps[j - 1]) {
            return value;
        }
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    //endregion
    //region Spectrum
    var Spectrum = /** @class */ (function () {
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [singleStep || false];
            this.xNumSteps = [false];
            this.snap = snap;
            var index;
            var ordered = [];
            // Map the object keys to an array.
            Object.keys(entry).forEach(function (index) {
                ordered.push([asArray(entry[index]), index]);
            });
            // Sort all entries by value (numeric sort).
            ordered.sort(function (a, b) {
                return a[0][0] - b[0][0];
            });
            // Convert all entries to subranges.
            for (index = 0; index < ordered.length; index++) {
                this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            }
            // Store the actual step values.
            // xSteps is sorted in the same order as xPct and xVal.
            this.xNumSteps = this.xSteps.slice(0);
            // Convert all numeric steps to the percentage of the subrange they represent.
            for (index = 0; index < this.xNumSteps.length; index++) {
                this.handleStepPoint(index, this.xNumSteps[index]);
            }
        }
        Spectrum.prototype.getDistance = function (value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) {
                distances[index] = fromPercentage(this.xVal, value, index);
            }
            return distances;
        };
        // Calculate the percentual distance over the whole scale of ranges.
        // direction: 0 = backwards / 1 = forwards
        Spectrum.prototype.getAbsoluteDistance = function (value, distances, direction) {
            var xPct_index = 0;
            // Calculate range where to start calculation
            if (value < this.xPct[this.xPct.length - 1]) {
                while (value > this.xPct[xPct_index + 1]) {
                    xPct_index++;
                }
            }
            else if (value === this.xPct[this.xPct.length - 1]) {
                xPct_index = this.xPct.length - 2;
            }
            // If looking backwards and the value is exactly at a range separator then look one range further
            if (!direction && value === this.xPct[xPct_index + 1]) {
                xPct_index++;
            }
            if (distances === null) {
                distances = [];
            }
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            // Calculate what part of the start range the value is
            if (direction) {
                start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            else {
                start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            // Do until the complete distance across ranges is calculated
            while (rest_rel_distance > 0) {
                // Calculate the percentage of total range
                range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                // Detect if the margin, padding or limit is larger then the current range and calculate
                if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                    // If larger then take the percentual distance of the whole range
                    rel_range_distance = range_pct * start_factor;
                    // Rest factor of relative percentual distance still to be calculated
                    rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                    // Set start factor to 1 as for next range it does not apply.
                    start_factor = 1;
                }
                else {
                    // If smaller or equal then take the percentual distance of the calculate percentual part of that range
                    rel_range_distance = ((distances[xPct_index + range_counter] * range_pct) / 100) * rest_factor;
                    // No rest left as the rest fits in current range
                    rest_factor = 0;
                }
                if (direction) {
                    abs_distance_counter = abs_distance_counter - rel_range_distance;
                    // Limit range to first range when distance becomes outside of minimum range
                    if (this.xPct.length + range_counter >= 1) {
                        range_counter--;
                    }
                }
                else {
                    abs_distance_counter = abs_distance_counter + rel_range_distance;
                    // Limit range to last range when distance becomes outside of maximum range
                    if (this.xPct.length - range_counter >= 1) {
                        range_counter++;
                    }
                }
                // Rest of relative percentual distance still to be calculated
                rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
        };
        Spectrum.prototype.toStepping = function (value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function (value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function (value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
            var j = getJ(value, this.xPct);
            // When at the top or stepping down, look at the previous sub-range
            if (value === 100 || (isDown && value === this.xPct[j - 1])) {
                j = Math.max(j - 1, 1);
            }
            return (this.xVal[j] - this.xVal[j - 1]) / size;
        };
        Spectrum.prototype.getNearbySteps = function (value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[j - 2],
                    step: this.xNumSteps[j - 2],
                    highestStep: this.xHighestCompleteStep[j - 2],
                },
                thisStep: {
                    startValue: this.xVal[j - 1],
                    step: this.xNumSteps[j - 1],
                    highestStep: this.xHighestCompleteStep[j - 1],
                },
                stepAfter: {
                    startValue: this.xVal[j],
                    step: this.xNumSteps[j],
                    highestStep: this.xHighestCompleteStep[j],
                },
            };
        };
        Spectrum.prototype.countStepDecimals = function () {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        Spectrum.prototype.hasNoSize = function () {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        };
        // Outside testing
        Spectrum.prototype.convert = function (value) {
            return this.getStep(this.toStepping(value));
        };
        Spectrum.prototype.handleEntryPoint = function (index, value) {
            var percentage;
            // Covert min/max syntax to 0 and 100.
            if (index === "min") {
                percentage = 0;
            }
            else if (index === "max") {
                percentage = 100;
            }
            else {
                percentage = parseFloat(index);
            }
            // Check for correct input.
            if (!isNumeric(percentage) || !isNumeric(value[0])) {
                throw new Error("noUiSlider: 'range' value isn't numeric.");
            }
            // Store values.
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            // NaN will evaluate to false too, but to keep
            // logging clear, set step explicitly. Make sure
            // not to override the 'step' setting with false.
            if (!percentage) {
                if (!isNaN(value1)) {
                    this.xSteps[0] = value1;
                }
            }
            else {
                this.xSteps.push(isNaN(value1) ? false : value1);
            }
            this.xHighestCompleteStep.push(0);
        };
        Spectrum.prototype.handleStepPoint = function (i, n) {
            // Ignore 'false' stepping.
            if (!n) {
                return;
            }
            // Step over zero-length ranges (#948);
            if (this.xVal[i] === this.xVal[i + 1]) {
                this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                return;
            }
            // Factor to range ratio
            this.xSteps[i] =
                fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
        };
        return Spectrum;
    }());
    //endregion
    //region Options
    /*	Every input option is tested and parsed. This will prevent
        endless validation in internal methods. These tests are
        structured with an item for every option available. An
        option can be marked as required by setting the 'r' flag.
        The testing function is provided with three arguments:
            - The provided value for the option;
            - A reference to the options object;
            - The name for the option;
    
        The testing function returns false when an error is detected,
        or true when everything is OK. It can also modify the option
        object, to make sure all values can be correctly looped elsewhere. */
    //region Defaults
    var defaultFormatter = {
        to: function (value) {
            return value === undefined ? "" : value.toFixed(2);
        },
        from: Number,
    };
    var cssClasses = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub",
    };
    exports.cssClasses = cssClasses;
    // Namespaces of internal event listeners
    var INTERNAL_EVENT_NS = {
        tooltips: ".__tooltips",
        aria: ".__aria",
    };
    //endregion
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'step' is not numeric.");
        }
        // The step option can still be used to set stepping
        // for linear sliders. Overwritten if set in 'range'.
        parsed.singleStep = entry;
    }
    function testKeyboardPageMultiplier(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
        }
        parsed.keyboardPageMultiplier = entry;
    }
    function testKeyboardMultiplier(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
        }
        parsed.keyboardMultiplier = entry;
    }
    function testKeyboardDefaultStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
        }
        parsed.keyboardDefaultStep = entry;
    }
    function testRange(parsed, entry) {
        // Filter incorrect input.
        if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider: 'range' is not an object.");
        }
        // Catch missing start or end.
        if (entry.min === undefined || entry.max === undefined) {
            throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        }
        parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        entry = asArray(entry);
        // Validate input. Values aren't tested, as the public .val method
        // will always provide a valid location.
        if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider: 'start' option is incorrect.");
        }
        // Store the number of handles.
        parsed.handles = entry.length;
        // When the slider is initialized, the .val method will
        // be called with the start options.
        parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'snap' option must be a boolean.");
        }
        // Enforce 100% stepping within subranges.
        parsed.snap = entry;
    }
    function testAnimate(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'animate' option must be a boolean.");
        }
        // Enforce 100% stepping within subranges.
        parsed.animate = entry;
    }
    function testAnimationDuration(parsed, entry) {
        if (typeof entry !== "number") {
            throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        }
        parsed.animationDuration = entry;
    }
    function testConnect(parsed, entry) {
        var connect = [false];
        var i;
        // Map legacy options
        if (entry === "lower") {
            entry = [true, false];
        }
        else if (entry === "upper") {
            entry = [false, true];
        }
        // Handle boolean options
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
                connect.push(entry);
            }
            connect.push(false);
        }
        // Reject invalid input
        else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        }
        else {
            connect = entry;
        }
        parsed.connect = connect;
    }
    function testOrientation(parsed, entry) {
        // Set orientation to an a numerical value for easy
        // array selection.
        switch (entry) {
            case "horizontal":
                parsed.ort = 0;
                break;
            case "vertical":
                parsed.ort = 1;
                break;
            default:
                throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'margin' option must be numeric.");
        }
        // Issue #582
        if (entry === 0) {
            return;
        }
        parsed.margin = parsed.spectrum.getDistance(entry);
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'limit' option must be numeric.");
        }
        parsed.limit = parsed.spectrum.getDistance(entry);
        if (!parsed.limit || parsed.handles < 2) {
            throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
        }
    }
    function testPadding(parsed, entry) {
        var index;
        if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        }
        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        }
        if (entry === 0) {
            return;
        }
        if (!Array.isArray(entry)) {
            entry = [entry, entry];
        }
        // 'getDistance' returns false for invalid values.
        parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
        for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
            // last "range" can't contain step size as it is purely an endpoint.
            if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
                throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
            }
        }
        var totalPadding = entry[0] + entry[1];
        var firstValue = parsed.spectrum.xVal[0];
        var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
        if (totalPadding / (lastValue - firstValue) > 1) {
            throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
        }
    }
    function testDirection(parsed, entry) {
        // Set direction as a numerical value for easy parsing.
        // Invert connection for RTL sliders, so that the proper
        // handles get the connect/background classes.
        switch (entry) {
            case "ltr":
                parsed.dir = 0;
                break;
            case "rtl":
                parsed.dir = 1;
                break;
            default:
                throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        // Make sure the input is a string.
        if (typeof entry !== "string") {
            throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        }
        // Check if the string contains any keywords.
        // None are required.
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;
        var dragAll = entry.indexOf("drag-all") >= 0;
        var smoothSteps = entry.indexOf("smooth-steps") >= 0;
        if (fixed) {
            if (parsed.handles !== 2) {
                throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            }
            // Use margin to enforce fixed state
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }
        if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
        }
        parsed.events = {
            tap: tap || snap,
            drag: drag,
            dragAll: dragAll,
            smoothSteps: smoothSteps,
            fixed: fixed,
            snap: snap,
            hover: hover,
            unconstrained: unconstrained,
        };
    }
    function testTooltips(parsed, entry) {
        if (entry === false) {
            return;
        }
        if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) {
                parsed.tooltips.push(entry);
            }
        }
        else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) {
                throw new Error("noUiSlider: must pass a formatter for all handles.");
            }
            entry.forEach(function (formatter) {
                if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                    throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                }
            });
            parsed.tooltips = entry;
        }
    }
    function testHandleAttributes(parsed, entry) {
        if (entry.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a attributes for all handles.");
        }
        parsed.handleAttributes = entry;
    }
    function testAriaFormat(parsed, entry) {
        if (!isValidPartialFormatter(entry)) {
            throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
        }
        parsed.ariaFormat = entry;
    }
    function testFormat(parsed, entry) {
        if (!isValidFormatter(entry)) {
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        }
        parsed.format = entry;
    }
    function testKeyboardSupport(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
        }
        parsed.keyboardSupport = entry;
    }
    function testDocumentElement(parsed, entry) {
        // This is an advanced option. Passed values are used without validation.
        parsed.documentElement = entry;
    }
    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        }
        parsed.cssPrefix = entry;
    }
    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") {
            throw new Error("noUiSlider: 'cssClasses' must be an object.");
        }
        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach(function (key) {
                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            });
        }
        else {
            parsed.cssClasses = entry;
        }
    }
    // Test all developer settings and parse to assumption-safe values.
    function testOptions(options) {
        // To prove a fix for #537, freeze options here.
        // If the object is modified, an error will be thrown.
        // Object.freeze(options);
        var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter,
        };
        // Tests are executed in the order they are presented here.
        var tests = {
            step: { r: false, t: testStep },
            keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
            keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
            keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses },
            handleAttributes: { r: false, t: testHandleAttributes },
        };
        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses: cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10,
        };
        // AriaFormat defaults to regular format, if any.
        if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
        }
        // Run all options through a testing mechanism to ensure correct
        // input. It should be noted that options might get modified to
        // be handled properly. E.g. wrapping integers in arrays.
        Object.keys(tests).forEach(function (name) {
            // If the option isn't set, but it is required, throw an error.
            if (!isSet(options[name]) && defaults[name] === undefined) {
                if (tests[name].r) {
                    throw new Error("noUiSlider: '" + name + "' is required.");
                }
                return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        });
        // Forward pips options
        parsed.pips = options.pips;
        // All recent browsers accept unprefixed transform.
        // We need -ms- for IE9 and -webkit- for older Android;
        // Assume use of -webkit- if unprefixed and -ms- are not supported.
        // https://caniuse.com/#feat=transforms2d
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== undefined;
        var noPrefix = d.style.transform !== undefined;
        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
        // Pips don't move, so we can place them using left/top.
        var styles = [
            ["left", "top"],
            ["right", "bottom"],
        ];
        parsed.style = styles[parsed.dir][parsed.ort];
        return parsed;
    }
    //endregion
    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();
        // All variables local to 'scope' are prefixed with 'scope_'
        // Slider DOM Nodes
        var scope_Target = target;
        var scope_Base;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;
        // Slider state values
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};
        // Document Nodes
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;
        // For horizontal sliders in standard ltr documents,
        // make .noUi-origin overflow to the left so the document doesn't scroll.
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
        // Creates a node, adds it to target, returns the new node.
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) {
                addClass(div, className);
            }
            addTarget.appendChild(div);
            return div;
        }
        // Append a origin to the base
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                // 0 = focusable and reachable
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", function (event) {
                    return eventKeydown(event, handleNumber);
                });
            }
            if (options.handleAttributes !== undefined) {
                var attributes_1 = options.handleAttributes[handleNumber];
                Object.keys(attributes_1).forEach(function (attribute) {
                    handle.setAttribute(attribute, attributes_1[attribute]);
                });
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) {
                addClass(handle, options.cssClasses.handleLower);
            }
            else if (handleNumber === options.handles - 1) {
                addClass(handle, options.cssClasses.handleUpper);
            }
            origin.handle = handle;
            return origin;
        }
        // Insert nodes for connect elements
        function addConnect(base, add) {
            if (!add) {
                return false;
            }
            return addNodeTo(base, options.cssClasses.connect);
        }
        // Add handles to the slider base.
        function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(connectBase, connectOptions[0]));
            // [::::O====O====O====]
            // connectOptions = [0, 1, 1, 1]
            for (var i = 0; i < options.handles; i++) {
                // Keep a list of all added handles.
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
        }
        // Initialize a single slider.
        function addSlider(addTarget) {
            // Apply classes and data to the target.
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) {
                addClass(addTarget, options.cssClasses.ltr);
            }
            else {
                addClass(addTarget, options.cssClasses.rtl);
            }
            if (options.ort === 0) {
                addClass(addTarget, options.cssClasses.horizontal);
            }
            else {
                addClass(addTarget, options.cssClasses.vertical);
            }
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") {
                addClass(addTarget, options.cssClasses.textDirectionRtl);
            }
            else {
                addClass(addTarget, options.cssClasses.textDirectionLtr);
            }
            return addNodeTo(addTarget, options.cssClasses.base);
        }
        function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) {
                return false;
            }
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }
        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }
        // Disable the slider dragging if any handle is disabled
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }
        function disable(handleNumber) {
            if (handleNumber !== null && handleNumber !== undefined) {
                scope_Handles[handleNumber].setAttribute("disabled", "");
                scope_Handles[handleNumber].handle.removeAttribute("tabindex");
            }
            else {
                scope_Target.setAttribute("disabled", "");
                scope_Handles.forEach(function (handle) {
                    handle.handle.removeAttribute("tabindex");
                });
            }
        }
        function enable(handleNumber) {
            if (handleNumber !== null && handleNumber !== undefined) {
                scope_Handles[handleNumber].removeAttribute("disabled");
                scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
            }
            else {
                scope_Target.removeAttribute("disabled");
                scope_Handles.forEach(function (handle) {
                    handle.removeAttribute("disabled");
                    handle.handle.setAttribute("tabindex", "0");
                });
            }
        }
        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                scope_Tooltips.forEach(function (tooltip) {
                    if (tooltip) {
                        removeElement(tooltip);
                    }
                });
                scope_Tooltips = null;
            }
        }
        // The tooltips option is a shorthand for using the 'update' event.
        function tooltips() {
            removeTooltips();
            // Tooltips are added with options.tooltips in original order.
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function (values, handleNumber, unencoded) {
                if (!scope_Tooltips || !options.tooltips) {
                    return;
                }
                if (scope_Tooltips[handleNumber] === false) {
                    return;
                }
                var formattedValue = values[handleNumber];
                if (options.tooltips[handleNumber] !== true) {
                    formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                }
                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
        }
        function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, function (values, handleNumber, unencoded, tap, positions) {
                // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                scope_HandleNumbers.forEach(function (index) {
                    var handle = scope_Handles[index];
                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                    var now = positions[index];
                    // Formatted value for display
                    var text = String(options.ariaFormat.to(unencoded[index]));
                    // Map to slider range values
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);
                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                });
            });
        }
        function getGroup(pips) {
            // Use the range.
            if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) {
                return scope_Spectrum.xVal;
            }
            if (pips.mode === exports.PipsMode.Count) {
                if (pips.values < 2) {
                    throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                }
                // Divide 0 - 100 in 'count' parts.
                var interval = pips.values - 1;
                var spread = 100 / interval;
                var values = [];
                // List these parts and have them handled as 'positions'.
                while (interval--) {
                    values[interval] = interval * spread;
                }
                values.push(100);
                return mapToRange(values, pips.stepped);
            }
            if (pips.mode === exports.PipsMode.Positions) {
                // Map all percentages to on-range values.
                return mapToRange(pips.values, pips.stepped);
            }
            if (pips.mode === exports.PipsMode.Values) {
                // If the value must be stepped, it needs to be converted to a percentage first.
                if (pips.stepped) {
                    return pips.values.map(function (value) {
                        // Convert to percentage, apply step, return to value.
                        return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                    });
                }
                // Otherwise, we can simply use the values.
                return pips.values;
            }
            return []; // pips.mode = never
        }
        function mapToRange(values, stepped) {
            return values.map(function (value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
        }
        function generateSpread(pips) {
            function safeIncrement(value, increment) {
                // Avoid floating point variance by dropping the smallest decimal places.
                return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            // Create a copy of the group, sort it and filter away all duplicates.
            group = unique(group.slice().sort(function (a, b) {
                return a - b;
            }));
            // Make sure the range starts with the first element.
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }
            // Likewise for the last one.
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }
            group.forEach(function (current, index) {
                // Get the current step and the lower + upper positions.
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = pips.mode === exports.PipsMode.Steps;
                // When using 'steps' mode, use the provided steps.
                // Otherwise, we'll step on to the next subrange.
                if (isSteps) {
                    step = scope_Spectrum.xNumSteps[index];
                }
                // Default to a 'full' step.
                if (!step) {
                    step = high - low;
                }
                // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
                if (high === undefined) {
                    high = low;
                }
                // Make sure step isn't 0, which would cause an infinite loop (#654)
                step = Math.max(step, 0.0000001);
                // Find all steps in the subrange.
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    // Get the percentage value for the current step,
                    // calculate the size for the subrange.
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;
                    steps = pctDifference / (pips.density || 1);
                    realSteps = Math.round(steps);
                    // This ratio represents the amount of percentage-space a point indicates.
                    // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                    // Round the percentage offset to an even number, then divide by two
                    // to spread the offset on both sides of the range.
                    stepSize = pctDifference / realSteps;
                    // Divide all points evenly, adding the correct number to this subrange.
                    // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                    for (q = 1; q <= realSteps; q += 1) {
                        // The ratio between the rounded value and the actual size might be ~1% off.
                        // Correct the percentage offset by the number of points
                        // per subrange. density = 1 will result in 100 points on the
                        // full range, 2 for 50, 4 for 25, etc.
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                    }
                    // Determine the point type.
                    type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                    // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                    if (!index && ignoreFirst && i !== high) {
                        type = 0;
                    }
                    if (!(i === high && ignoreLast)) {
                        // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                        indexes[newPct.toFixed(5)] = [i, type];
                    }
                    // Update the percentage count.
                    prevPct = newPct;
                }
            });
            return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {},
                _a[exports.PipsType.None] = "",
                _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal,
                _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge,
                _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub,
                _a);
            var markerSizeClasses = (_b = {},
                _b[exports.PipsType.None] = "",
                _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal,
                _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge,
                _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub,
                _b);
            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset, value, type) {
                // Apply the filter function, if it is set.
                type = filterFunc ? filterFunc(value, type) : type;
                if (type === exports.PipsType.None) {
                    return;
                }
                // Add a marker for every point
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";
                // Values are only appended for points marked '1' or '2'.
                if (type > exports.PipsType.NoValue) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", String(value));
                    node.style[options.style] = offset + "%";
                    node.innerHTML = String(formatter.to(value));
                }
            }
            // Append all points.
            Object.keys(spread).forEach(function (offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            });
            return element;
        }
        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }
        function pips(pips) {
            // Fix #669
            removePips();
            var spread = generateSpread(pips);
            var filter = pips.filter;
            var format = pips.format || {
                to: function (value) {
                    return String(Math.round(value));
                },
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
        }
        // Shorthand for base dimensions.
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = ("offset" + ["Width", "Height"][options.ort]);
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }
        // Handler for attaching events trough a proxy.
        function attachEvent(events, element, callback, data) {
            // This function can be used to 'filter' events to the slider.
            // element is a node, not a nodeList
            var method = function (event) {
                var e = fixEvent(event, data.pageOffset, data.target || element);
                // fixEvent returns false if this event has a different target
                // when handling (multi-) touch events;
                if (!e) {
                    return false;
                }
                // doNotReject is passed by all end events to make sure released touches
                // are not rejected, leaving the slider "stuck" to the cursor;
                if (isSliderDisabled() && !data.doNotReject) {
                    return false;
                }
                // Stop if an active 'tap' transition is taking place.
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                    return false;
                }
                // Ignore right or middle clicks on start #454
                if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                    return false;
                }
                // Ignore right or middle clicks on start #454
                if (data.hover && e.buttons) {
                    return false;
                }
                // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                // touch-action: manipulation, but that allows panning, which breaks
                // sliders after zooming/on non-responsive pages.
                // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                if (!supportsPassive) {
                    e.preventDefault();
                }
                e.calcPoint = e.points[options.ort];
                // Call the event handler with the event [ and additional data ].
                callback(e, data);
                return;
            };
            var methods = [];
            // Bind a closure on the target for every event type.
            events.split(" ").forEach(function (eventName) {
                element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                methods.push([eventName, method]);
            });
            return methods;
        }
        // Provide a clean event with standardized offset values.
        function fixEvent(e, pageOffset, eventTarget) {
            // Filter the event to register the type, which can be
            // touch, mouse or pointer. Offset changes need to be
            // made on an event specific basis.
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            // IE10 implemented pointer events with a prefix;
            if (e.type.indexOf("MSPointer") === 0) {
                pointer = true;
            }
            // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
            // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
            // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
            if (e.type === "mousedown" && !e.buttons && !e.touches) {
                return false;
            }
            // The only thing one handle should be concerned about is the touches that originated on top of it.
            if (touch) {
                // Returns true if a touch originated on the target.
                var isTouchOnTarget = function (checkTouch) {
                    var target = checkTouch.target;
                    return (target === eventTarget ||
                        eventTarget.contains(target) ||
                        (e.composed && e.composedPath().shift() === eventTarget));
                };
                // In the case of touchstart events, we need to make sure there is still no more than one
                // touch on the target so we look amongst all touches.
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                    // Do not support more than one touch per handle.
                    if (targetTouches.length > 1) {
                        return false;
                    }
                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                }
                else {
                    // In the other cases, find on changedTouches is enough.
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                    // Cancel if the target touch has not moved.
                    if (!targetTouch) {
                        return false;
                    }
                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer; // Fix #435
            return e;
        }
        // Translate a coordinate in the document to a percentage on the slider
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = (location * 100) / baseSize();
            // Clamp proposal between 0% and 100%
            // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
            // are used (e.g. contained handles feature)
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
        }
        // Find handle closest to a certain percentage on the slider
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach(function (handle, index) {
                // Disabled handles are ignored
                if (isHandleDisabled(index)) {
                    return;
                }
                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                // Initial state
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                // Difference with this handle is smaller than the previously checked handle
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            });
            return handleNumber;
        }
        // Fire 'end' when a mouse or pen leaves the document.
        function documentLeave(event, data) {
            if (event.type === "mouseout" &&
                event.target.nodeName === "HTML" &&
                event.relatedTarget === null) {
                eventEnd(event, data);
            }
        }
        // Handle movement on document for handle and range drag.
        function eventMove(event, data) {
            // Fix #498
            // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
            // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
            // IE9 has .buttons and .which zero on mousemove.
            // Firefox breaks the spec MDN defines.
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                return eventEnd(event, data);
            }
            // Check if we are moving up or down
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            // Convert the movement into a percentage of the slider width/height
            var proposal = (movement * 100) / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
        }
        // Unbind move events on document, call callbacks.
        function eventEnd(event, data) {
            // The handle is no longer active, so remove the class.
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }
            // Unbind the move and end events, which are added on 'start'.
            data.listeners.forEach(function (c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            });
            if (scope_ActiveHandlesCount === 0) {
                // Remove dragging class.
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();
                // Remove cursor styles and text-selection events bound to the body.
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }
            if (options.events.smoothSteps) {
                data.handleNumbers.forEach(function (handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                });
                data.handleNumbers.forEach(function (handleNumber) {
                    fireEvent("update", handleNumber);
                });
            }
            data.handleNumbers.forEach(function (handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            });
        }
        // Bind move events on document.
        function eventStart(event, data) {
            // Ignore event if any handle is disabled
            if (data.handleNumbers.some(isHandleDisabled)) {
                return;
            }
            var handle;
            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];
                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;
                // Mark the handle as 'active' so it can be styled.
                addClass(handle, options.cssClasses.active);
            }
            // A drag should never propagate up to the 'tap' event.
            event.stopPropagation();
            // Record the event listeners.
            var listeners = [];
            // Attach the move and end events.
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                // The event target has changed so we need to propagate the original one so that we keep
                // relying on it to extract target touches.
                target: event.target,
                handle: handle,
                connect: data.connect,
                listeners: listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice(),
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers,
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers,
            });
            // We want to make sure we pushed the listeners in the listener list rather than creating
            // a new one as it has already been passed to the event handlers.
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            // Text selection isn't an issue on touch devices,
            // so adding cursor styles can be skipped.
            if (event.cursor) {
                // Prevent the 'I' cursor and extend the range-drag cursor.
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                // Mark the target with a dragging state.
                if (scope_Handles.length > 1) {
                    addClass(scope_Target, options.cssClasses.drag);
                }
                // Prevent text selection when dragging the handles.
                // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                // The 'cursor' flag is false.
                // See: http://caniuse.com/#search=selectstart
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach(function (handleNumber) {
                fireEvent("start", handleNumber);
            });
        }
        // Move closest handle to tapped location.
        function eventTap(event) {
            // The tap event shouldn't propagate up
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            // Tackle the case that all handles are 'disabled'.
            if (handleNumber === false) {
                return;
            }
            // Flag the slider as it is now in a transitional state.
            // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
            if (!options.events.snap) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
                fireEvent("change", handleNumber, true);
                fireEvent("set", handleNumber, true);
            }
            else {
                eventStart(event, { handleNumbers: [handleNumber] });
            }
        }
        // Fires a 'hover' event for a hovered mouse/pen position.
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function (targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) {
                    scope_Events[targetEvent].forEach(function (callback) {
                        callback.call(scope_Self, value);
                    });
                }
            });
        }
        // Handles keydown on focused handles
        // Don't move the document when pressing arrow keys on focused handles
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
                return false;
            }
            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];
            var largeStepKeys = ["PageDown", "PageUp"];
            var edgeKeys = ["Home", "End"];
            if (options.dir && !options.ort) {
                // On an right-to-left slider, the left and right keys act inverted
                horizontalKeys.reverse();
            }
            else if (options.ort && !options.dir) {
                // On a top-to-bottom slider, the up and down keys act inverted
                verticalKeys.reverse();
                largeStepKeys.reverse();
            }
            // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) {
                return true;
            }
            event.preventDefault();
            var to;
            if (isUp || isDown) {
                var direction = isDown ? 0 : 1;
                var steps = getNextStepsForHandle(handleNumber);
                var step = steps[direction];
                // At the edge of a slider, do nothing
                if (step === null) {
                    return false;
                }
                // No step set, use the default of 10% of the sub-range
                if (step === false) {
                    step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                }
                if (isLargeUp || isLargeDown) {
                    step *= options.keyboardPageMultiplier;
                }
                else {
                    step *= options.keyboardMultiplier;
                }
                // Step over zero-length ranges (#948);
                step = Math.max(step, 0.0000001);
                // Decrement for down steps
                step = (isDown ? -1 : 1) * step;
                to = scope_Values[handleNumber] + step;
            }
            else if (isMax) {
                // End key
                to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
            }
            else {
                // Home key
                to = options.spectrum.xVal[0];
            }
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
        }
        // Attach events to several slider parts.
        function bindSliderEvents(behaviour) {
            // Attach the standard drag event to the handles.
            if (!behaviour.fixed) {
                scope_Handles.forEach(function (handle, index) {
                    // These events are only bound to the visual handle
                    // element, not the 'real' origin element.
                    attachEvent(actions.start, handle.children[0], eventStart, {
                        handleNumbers: [index],
                    });
                });
            }
            // Attach the tap event to the slider base.
            if (behaviour.tap) {
                attachEvent(actions.start, scope_Base, eventTap, {});
            }
            // Fire hover events
            if (behaviour.hover) {
                attachEvent(actions.move, scope_Base, eventHover, {
                    hover: true,
                });
            }
            // Make the range draggable.
            if (behaviour.drag) {
                scope_Connects.forEach(function (connect, index) {
                    if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                        return;
                    }
                    var handleBefore = scope_Handles[index - 1];
                    var handleAfter = scope_Handles[index];
                    var eventHolders = [connect];
                    var handlesToDrag = [handleBefore, handleAfter];
                    var handleNumbersToDrag = [index - 1, index];
                    addClass(connect, options.cssClasses.draggable);
                    // When the range is fixed, the entire range can
                    // be dragged by the handles. The handle in the first
                    // origin will propagate the start event upward,
                    // but it needs to be bound manually on the other.
                    if (behaviour.fixed) {
                        eventHolders.push(handleBefore.children[0]);
                        eventHolders.push(handleAfter.children[0]);
                    }
                    if (behaviour.dragAll) {
                        handlesToDrag = scope_Handles;
                        handleNumbersToDrag = scope_HandleNumbers;
                    }
                    eventHolders.forEach(function (eventHolder) {
                        attachEvent(actions.start, eventHolder, eventStart, {
                            handles: handlesToDrag,
                            handleNumbers: handleNumbersToDrag,
                            connect: connect,
                        });
                    });
                });
            }
        }
        // Attach an event to this slider, possibly including a namespace
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            // If the event bound is 'update,' fire it immediately for all handles.
            if (namespacedEvent.split(".")[0] === "update") {
                scope_Handles.forEach(function (a, index) {
                    fireEvent("update", index);
                });
            }
        }
        function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
        }
        // Undo attachment of event
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach(function (bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);
                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                    // only delete protected internal event if intentional
                    if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
                        delete scope_Events[bind];
                    }
                }
            });
        }
        // External event handling
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function (targetEvent) {
                var eventType = targetEvent.split(".")[0];
                if (eventName === eventType) {
                    scope_Events[targetEvent].forEach(function (callback) {
                        callback.call(
                        // Use the slider public API as the scope ('this')
                        scope_Self, 
                        // Return values as array, so arg_1[arg_2] is always valid.
                        scope_Values.map(options.format.to), 
                        // Handle index, 0 or 1
                        handleNumber, 
                        // Un-formatted slider values
                        scope_Values.slice(), 
                        // Event is fired by tap, true or false
                        tap || false, 
                        // Left offset of the handle, in relation to the slider
                        scope_Locations.slice(), 
                        // add the slider public API to an accessible parameter when this is unavailable
                        scope_Self);
                    });
                }
            });
        }
        // Split out the handle positioning logic so the Move event can use it, too
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
            var distance;
            // For sliders with multiple handles, limit movement to the other handle.
            // Apply the margin option by adding it to the handle positions.
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                    to = Math.max(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                    to = Math.min(to, distance);
                }
            }
            // The limit option has the opposite effect, limiting handles to a
            // maximum distance from another. Limit must be > 0, as otherwise
            // handles would be unmovable.
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                    to = Math.min(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                    to = Math.max(to, distance);
                }
            }
            // The padding option keeps the handles a certain distance from the
            // edges of the slider. Padding must be > 0.
            if (options.padding) {
                if (handleNumber === 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                    to = Math.max(to, distance);
                }
                if (handleNumber === scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                    to = Math.min(to, distance);
                }
            }
            if (!smoothSteps) {
                to = scope_Spectrum.getStep(to);
            }
            // Limit percentage to the 0 - 100 range
            to = limit(to);
            // Return false if handle can't move
            if (to === reference[handleNumber] && !getValue) {
                return false;
            }
            return to;
        }
        // Uses slider orientation to create CSS rules. a = base value;
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }
        // Moves handle(s) by a percentage
        // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
        function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            // Store first handle now, so we still have it in case handleNumbers is reversed
            var firstHandle = handleNumbers[0];
            var smoothSteps = options.events.smoothSteps;
            var b = [!upward, upward];
            var f = [upward, !upward];
            // Copy handleNumbers so we don't change the dataset
            handleNumbers = handleNumbers.slice();
            // Check to see which handle is 'leading'.
            // If that one can't move the second can't either.
            if (upward) {
                handleNumbers.reverse();
            }
            // Step 1: get the maximum percentage that any of the handles can move
            if (handleNumbers.length > 1) {
                handleNumbers.forEach(function (handleNumber, o) {
                    var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                    // Stop if one of the handles can't move.
                    if (to === false) {
                        proposal = 0;
                    }
                    else {
                        proposal = to - proposals[handleNumber];
                        proposals[handleNumber] = to;
                    }
                });
            }
            // If using one handle, check backward AND forward
            else {
                b = f = [true];
            }
            var state = false;
            // Step 2: Try to set the handles with the found percentage
            handleNumbers.forEach(function (handleNumber, o) {
                state =
                    setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
            });
            // Step 3: If a handle moved, fire events
            if (state) {
                handleNumbers.forEach(function (handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                });
                // If target is a connect, then fire drag event
                if (connect != undefined) {
                    fireEvent("drag", firstHandle);
                }
            }
        }
        // Takes a base value and an offset. This offset is used for the connect bar size.
        // In the initial design for this feature, the origin element was 1% wide.
        // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
        // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }
        // Updates scope_Locations and scope_Values, updates visual state
        function updateHandlePosition(handleNumber, to) {
            // Update locations.
            scope_Locations[handleNumber] = to;
            // Convert the value to the slider stepping/range.
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
        }
        // Handles before the slider middle are stacked later = higher,
        // Handles after the middle later is lower
        // [[7] [8] .......... | .......... [5] [4]
        function setZindex() {
            scope_HandleNumbers.forEach(function (handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = String(zIndex);
            });
        }
        // Test suggested values and apply margin, step.
        // if exactInput is true, don't run checkHandlePosition, then the handle can be placed in between steps (#436)
        function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
            if (!exactInput) {
                to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
            }
            if (to === false) {
                return false;
            }
            updateHandlePosition(handleNumber, to);
            return true;
        }
        // Updates style attribute for connect nodes
        function updateConnect(index) {
            // Skip connects set to false
            if (!scope_Connects[index]) {
                return;
            }
            var l = 0;
            var h = 100;
            if (index !== 0) {
                l = scope_Locations[index - 1];
            }
            if (index !== scope_Connects.length - 1) {
                h = scope_Locations[index];
            }
            // We use two rules:
            // 'translate' to change the left/top offset;
            // 'scale' to change the width of the element;
            // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] =
                translateRule + " " + scaleRule;
        }
        // Parses value passed to .set method. Returns current value if not parse-able.
        function resolveToValue(to, handleNumber) {
            // Setting with null indicates an 'ignore'.
            // Inputting 'false' is invalid.
            if (to === null || to === false || to === undefined) {
                return scope_Locations[handleNumber];
            }
            // If a formatted number was passed, attempt to decode it.
            if (typeof to === "number") {
                to = String(to);
            }
            to = options.format.from(to);
            if (to !== false) {
                to = scope_Spectrum.toStepping(to);
            }
            // If parsing the number failed, use the current value.
            if (to === false || isNaN(to)) {
                return scope_Locations[handleNumber];
            }
            return to;
        }
        // Set the slider value.
        function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === undefined;
            // Event fires by default
            fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
            // Animation is optional.
            // Make sure the initial values were set before using animated placement.
            if (options.animate && !isInit) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            // First pass, without lookAhead but with lookBackward. Values are set from left to right.
            scope_HandleNumbers.forEach(function (handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            });
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            // Spread handles evenly across the slider if the range has no size (min=max)
            if (isInit && scope_Spectrum.hasNoSize()) {
                exactInput = true;
                scope_Locations[0] = 0;
                if (scope_HandleNumbers.length > 1) {
                    var space_1 = 100 / (scope_HandleNumbers.length - 1);
                    scope_HandleNumbers.forEach(function (handleNumber) {
                        scope_Locations[handleNumber] = handleNumber * space_1;
                    });
                }
            }
            // Secondary passes. Now that all base values are set, apply constraints.
            // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
            for (; i < scope_HandleNumbers.length; ++i) {
                scope_HandleNumbers.forEach(function (handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                });
            }
            setZindex();
            scope_HandleNumbers.forEach(function (handleNumber) {
                fireEvent("update", handleNumber);
                // Fire the event only for handles that received a new value, as per #579
                if (values[handleNumber] !== null && fireSetEvent) {
                    fireEvent("set", handleNumber);
                }
            });
        }
        // Reset slider to initial values
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }
        // Set value for a single handle
        function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            // Ensure numeric input
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
                throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            }
            // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
            // The exactInput argument can be used to ignore slider stepping (#436)
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) {
                fireEvent("set", handleNumber);
            }
        }
        // Get the slider value.
        function valueGet(unencoded) {
            if (unencoded === void 0) {
                unencoded = false;
            }
            if (unencoded) {
                // return a copy of the raw values
                return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            }
            var values = scope_Values.map(options.format.to);
            // If only one handle is used, return a single value.
            if (values.length === 1) {
                return values[0];
            }
            return values;
        }
        // Removes classes from the root and empties it.
        function destroy() {
            // remove protected internal listeners
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach(function (key) {
                removeClass(scope_Target, options.cssClasses[key]);
            });
            while (scope_Target.firstChild) {
                scope_Target.removeChild(scope_Target.firstChild);
            }
            delete scope_Target.noUiSlider;
        }
        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            // If snapped, directly use defined step value
            if (options.snap) {
                return [
                    value - nearbySteps.stepBefore.startValue || null,
                    nearbySteps.stepAfter.startValue - value || null,
                ];
            }
            // If the next value in this step moves into the next step,
            // the increment is the start of the next step - the current value
            if (increment !== false) {
                if (value + increment > nearbySteps.stepAfter.startValue) {
                    increment = nearbySteps.stepAfter.startValue - value;
                }
            }
            // If the value is beyond the starting point
            if (value > nearbySteps.thisStep.startValue) {
                decrement = nearbySteps.thisStep.step;
            }
            else if (nearbySteps.stepBefore.step === false) {
                decrement = false;
            }
            // If a handle is at the start of a step, it always steps back into the previous step first
            else {
                decrement = value - nearbySteps.stepBefore.highestStep;
            }
            // Now, if at the slider edges, there is no in/decrement
            if (location === 100) {
                increment = null;
            }
            else if (location === 0) {
                decrement = null;
            }
            // As per #391, the comparison for the decrement step can have some rounding issues.
            var stepDecimals = scope_Spectrum.countStepDecimals();
            // Round per #391
            if (increment !== null && increment !== false) {
                increment = Number(increment.toFixed(stepDecimals));
            }
            if (decrement !== null && decrement !== false) {
                decrement = Number(decrement.toFixed(stepDecimals));
            }
            return [decrement, increment];
        }
        // Get the current step size for the slider.
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }
        // Updatable: margin, limit, padding, step, range, animate, snap
        function updateOptions(optionsToUpdate, fireSetEvent) {
            // Spectrum is created using the range, snap, direction and step options.
            // 'snap' and 'step' can be updated.
            // If 'snap' and 'step' are not passed, they should remain unchanged.
            var v = valueGet();
            var updateAble = [
                "margin",
                "limit",
                "padding",
                "range",
                "animate",
                "snap",
                "step",
                "format",
                "pips",
                "tooltips",
            ];
            // Only change options that we're actually passed to update.
            updateAble.forEach(function (name) {
                // Check for undefined. null removes the value.
                if (optionsToUpdate[name] !== undefined) {
                    originalOptions[name] = optionsToUpdate[name];
                }
            });
            var newOptions = testOptions(originalOptions);
            // Load new options into the slider state
            updateAble.forEach(function (name) {
                if (optionsToUpdate[name] !== undefined) {
                    options[name] = newOptions[name];
                }
            });
            scope_Spectrum = newOptions.spectrum;
            // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            // Update pips, removes existing.
            if (options.pips) {
                pips(options.pips);
            }
            else {
                removePips();
            }
            // Update tooltips, removes existing.
            if (options.tooltips) {
                tooltips();
            }
            else {
                removeTooltips();
            }
            // Invalidate the current positioning so valueSet forces an update.
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
        }
        // Initialization steps
        function setupSlider() {
            // Create the base element, initialize HTML and set classes.
            // Add handles and connect elements.
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            // Attach user events.
            bindSliderEvents(options.events);
            // Use the public value method to set the start values.
            valueSet(options.start);
            if (options.pips) {
                pips(options.pips);
            }
            if (options.tooltips) {
                tooltips();
            }
            aria();
        }
        setupSlider();
        var scope_Self = {
            destroy: destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            disable: disable,
            enable: enable,
            // Exposed for unit testing, don't use this in your application.
            __moveHandles: function (upward, proposal, handleNumbers) {
                moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions: updateOptions,
            target: scope_Target,
            removePips: removePips,
            removeTooltips: removeTooltips,
            getPositions: function () {
                return scope_Locations.slice();
            },
            getTooltips: function () {
                return scope_Tooltips;
            },
            getOrigins: function () {
                return scope_Handles;
            },
            pips: pips, // Issue #594
        };
        return scope_Self;
    }
    // Run the standard initializer
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) {
            throw new Error("noUiSlider: create requires a single element, got: " + target);
        }
        // Throw an error if the slider was already initialized.
        if (target.noUiSlider) {
            throw new Error("noUiSlider: Slider was already initialized.");
        }
        // Test the options and create the slider environment;
        var options = testOptions(originalOptions);
        var api = scope(target, options, originalOptions);
        target.noUiSlider = api;
        return api;
    }
    exports.default = {
        // Exposed for unit testing, don't use this in your application.
        __spectrum: Spectrum,
        // A reference to the default classes, allows global changes.
        // Use the cssClasses option for changes to one slider.
        cssClasses: cssClasses,
        create: initialize,
    };
},
673: /* styles/widgets/sliders.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.slider_title = "bk-slider-title";
    exports.slider_value = "bk-slider-value";
    exports.default = `.bk-slider-title{white-space:nowrap;}.bk-slider-value{font-weight:600;}`;
},
674: /* styles/widgets/nouislider.css.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    exports.default = `.noUi-target,.noUi-target *{-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-user-select:none;-ms-touch-action:none;touch-action:none;-ms-user-select:none;-moz-user-select:none;user-select:none;-moz-box-sizing:border-box;box-sizing:border-box;}.noUi-target{position:relative;}.noUi-base,.noUi-connects{width:100%;height:100%;position:relative;z-index:1;}.noUi-connects{overflow:hidden;z-index:0;}.noUi-connect,.noUi-origin{will-change:transform;position:absolute;z-index:1;top:0;right:0;height:100%;width:100%;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;-webkit-transform-style:preserve-3d;transform-origin:0 0;transform-style:flat;}.noUi-txt-dir-rtl.noUi-horizontal .noUi-origin{left:0;right:auto;}.noUi-vertical .noUi-origin{top:-100%;width:0;}.noUi-horizontal .noUi-origin{height:0;}.noUi-handle{-webkit-backface-visibility:hidden;backface-visibility:hidden;position:absolute;}.noUi-touch-area{height:100%;width:100%;}.noUi-state-tap .noUi-connect,.noUi-state-tap .noUi-origin{-webkit-transition:transform 0.3s;transition:transform 0.3s;}.noUi-state-drag *{cursor:inherit !important;}.noUi-horizontal{height:18px;}.noUi-horizontal .noUi-handle{width:34px;height:28px;right:-17px;top:-6px;}.noUi-vertical{width:18px;}.noUi-vertical .noUi-handle{width:28px;height:34px;right:-6px;bottom:-17px;}.noUi-txt-dir-rtl.noUi-horizontal .noUi-handle{left:-17px;right:auto;}.noUi-target{background:#FAFAFA;border-radius:4px;border:1px solid #D3D3D3;box-shadow:inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB;}.noUi-connects{border-radius:3px;}.noUi-connect{background:#3FB8AF;}.noUi-draggable{cursor:ew-resize;}.noUi-vertical .noUi-draggable{cursor:ns-resize;}.noUi-handle{border:1px solid #D9D9D9;border-radius:3px;background:#FFF;cursor:default;box-shadow:inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;}.noUi-active{box-shadow:inset 0 0 1px #FFF, inset 0 1px 7px #DDD, 0 3px 6px -3px #BBB;}.noUi-handle:before,.noUi-handle:after{content:"";display:block;position:absolute;height:14px;width:1px;background:#E8E7E6;left:14px;top:6px;}.noUi-handle:after{left:17px;}.noUi-vertical .noUi-handle:before,.noUi-vertical .noUi-handle:after{width:14px;height:1px;left:6px;top:14px;}.noUi-vertical .noUi-handle:after{top:17px;}[disabled] .noUi-connect{background:#B8B8B8;}[disabled].noUi-target,[disabled].noUi-handle,[disabled] .noUi-handle{cursor:not-allowed;}.noUi-pips,.noUi-pips *{-moz-box-sizing:border-box;box-sizing:border-box;}.noUi-pips{position:absolute;color:#999;}.noUi-value{position:absolute;white-space:nowrap;text-align:center;}.noUi-value-sub{color:#ccc;font-size:10px;}.noUi-marker{position:absolute;background:#CCC;}.noUi-marker-sub{background:#AAA;}.noUi-marker-large{background:#AAA;}.noUi-pips-horizontal{padding:10px 0;height:80px;top:100%;left:0;width:100%;}.noUi-value-horizontal{-webkit-transform:translate(-50%, 50%);transform:translate(-50%, 50%);}.noUi-rtl .noUi-value-horizontal{-webkit-transform:translate(50%, 50%);transform:translate(50%, 50%);}.noUi-marker-horizontal.noUi-marker{margin-left:-1px;width:2px;height:5px;}.noUi-marker-horizontal.noUi-marker-sub{height:10px;}.noUi-marker-horizontal.noUi-marker-large{height:15px;}.noUi-pips-vertical{padding:0 10px;height:100%;top:0;left:100%;}.noUi-value-vertical{-webkit-transform:translate(0, -50%);transform:translate(0, -50%);padding-left:25px;}.noUi-rtl .noUi-value-vertical{-webkit-transform:translate(0, 50%);transform:translate(0, 50%);}.noUi-marker-vertical.noUi-marker{width:5px;height:2px;margin-top:-1px;}.noUi-marker-vertical.noUi-marker-sub{width:10px;}.noUi-marker-vertical.noUi-marker-large{width:15px;}.noUi-tooltip{display:block;position:absolute;border:1px solid #D9D9D9;border-radius:3px;background:#fff;color:#000;padding:5px;text-align:center;white-space:nowrap;}.noUi-horizontal .noUi-tooltip{-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0);left:50%;bottom:120%;}.noUi-vertical .noUi-tooltip{-webkit-transform:translate(0, -50%);transform:translate(0, -50%);top:50%;right:120%;}.noUi-horizontal .noUi-origin > .noUi-tooltip{-webkit-transform:translate(50%, 0);transform:translate(50%, 0);left:auto;bottom:10px;}.noUi-vertical .noUi-origin > .noUi-tooltip{-webkit-transform:translate(0, -18px);transform:translate(0, -18px);top:auto;right:28px;}.noUi-handle{cursor:grab;cursor:-webkit-grab;}.noUi-handle.noUi-active{cursor:grabbing;cursor:-webkit-grabbing;}.noUi-handle:after,.noUi-handle:before{display:none;}.noUi-tooltip{display:none;white-space:nowrap;}.noUi-handle:hover .noUi-tooltip{display:block;}:host{--slider-size:10px;--handle-width:14px;--handle-height:18px;--handle-right:calc(-1*var(--handle-width)/2);--handle-top:calc(-1*(var(--handle-height) - var(--slider-size))/2 - 1px);--slider-margin:calc((var(--handle-height) - var(--slider-size))/2 + 1px);}.noUi-horizontal{width:100%;height:var(--slider-size);}.noUi-vertical{width:var(--slider-size);height:100%;}.noUi-horizontal .noUi-handle{width:var(--handle-width);height:var(--handle-height);right:var(--handle-right);top:var(--handle-top);}.noUi-vertical .noUi-handle{width:var(--handle-height);height:var(--handle-width);right:var(--handle-top);top:var(--handle-right);}.noUi-target.noUi-horizontal{margin:var(--slider-margin) 0px;}.noUi-target.noUi-vertical{margin:0px var(--slider-margin);}`;
},
675: /* models/widgets/sliders/date_range_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const timezone_1 = tslib_1.__importDefault(require(248) /* timezone */);
    const numerical_range_slider_1 = require(676) /* ./numerical_range_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class DateRangeSliderView extends numerical_range_slider_1.NumericalRangeSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "drag";
            this.connected = [false, true, false];
        }
        _calc_to() {
            const spec = super._calc_to();
            spec.step *= 86400000;
            return spec;
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return (0, timezone_1.default)(value, format);
            }
            else {
                return format.compute(value);
            }
        }
    }
    exports.DateRangeSliderView = DateRangeSliderView;
    DateRangeSliderView.__name__ = "DateRangeSliderView";
    class DateRangeSlider extends numerical_range_slider_1.NumericalRangeSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DateRangeSlider = DateRangeSlider;
    _a = DateRangeSlider;
    DateRangeSlider.__name__ = "DateRangeSlider";
    (() => {
        _a.prototype.default_view = DateRangeSliderView;
        _a.override({
            format: "%d %b %Y",
        });
    })();
},
676: /* models/widgets/sliders/numerical_range_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const base_numerical_slider_1 = require(677) /* ./base_numerical_slider */;
    class NumericalRangeSliderView extends base_numerical_slider_1.BaseNumericalSliderView {
        _calc_to() {
            return {
                range: {
                    min: this.model.start,
                    max: this.model.end,
                },
                start: this.model.value,
                step: this.model.step,
            };
        }
        _calc_from(values) {
            return values;
        }
    }
    exports.NumericalRangeSliderView = NumericalRangeSliderView;
    NumericalRangeSliderView.__name__ = "NumericalRangeSliderView";
    class NumericalRangeSlider extends base_numerical_slider_1.BaseNumericalSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.NumericalRangeSlider = NumericalRangeSlider;
    NumericalRangeSlider.__name__ = "NumericalRangeSlider";
},
677: /* models/widgets/sliders/base_numerical_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const abstract_slider_1 = require(671) /* ./abstract_slider */;
    const tick_formatter_1 = require(192) /* ../../formatters/tick_formatter */;
    class BaseNumericalSliderView extends abstract_slider_1.AbstractSliderView {
        connect_signals() {
            super.connect_signals();
            const { start, end, step } = this.model.properties;
            this.on_change([start, end, step], () => this._update_slider());
        }
        pretty(value) {
            return this._formatter(value, this.model.format);
        }
    }
    exports.BaseNumericalSliderView = BaseNumericalSliderView;
    BaseNumericalSliderView.__name__ = "BaseNumericalSliderView";
    class BaseNumericalSlider extends abstract_slider_1.AbstractSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.BaseNumericalSlider = BaseNumericalSlider;
    _a = BaseNumericalSlider;
    BaseNumericalSlider.__name__ = "BaseNumericalSlider";
    (() => {
        _a.define(({ Float, Str, Or, Ref }) => {
            return {
                start: [Float],
                end: [Float],
                step: [Float, 1],
                format: [Or(Str, Ref(tick_formatter_1.TickFormatter))],
            };
        });
    })();
},
678: /* models/widgets/sliders/date_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const timezone_1 = tslib_1.__importDefault(require(248) /* timezone */);
    const numerical_slider_1 = require(679) /* ./numerical_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class DateSliderView extends numerical_slider_1.NumericalSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "tap";
            this.connected = [true, false];
        }
        _calc_to() {
            const spec = super._calc_to();
            spec.step *= 86400000;
            return spec;
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return (0, timezone_1.default)(value, format);
            }
            else {
                return format.compute(value);
            }
        }
    }
    exports.DateSliderView = DateSliderView;
    DateSliderView.__name__ = "DateSliderView";
    class DateSlider extends numerical_slider_1.NumericalSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DateSlider = DateSlider;
    _a = DateSlider;
    DateSlider.__name__ = "DateSlider";
    (() => {
        _a.prototype.default_view = DateSliderView;
        _a.override({
            format: "%d %b %Y",
        });
    })();
},
679: /* models/widgets/sliders/numerical_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    __esModule();
    const base_numerical_slider_1 = require(677) /* ./base_numerical_slider */;
    class NumericalSliderView extends base_numerical_slider_1.BaseNumericalSliderView {
        _calc_to() {
            const { start, end, value, step } = this.model;
            return {
                range: {
                    min: start,
                    max: end,
                },
                start: [value],
                step,
            };
        }
        _calc_from([value]) {
            if (Number.isInteger(this.model.start) && Number.isInteger(this.model.end) && Number.isInteger(this.model.step)) {
                return Math.round(value);
            }
            else {
                return value;
            }
        }
    }
    exports.NumericalSliderView = NumericalSliderView;
    NumericalSliderView.__name__ = "NumericalSliderView";
    class NumericalSlider extends base_numerical_slider_1.BaseNumericalSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.NumericalSlider = NumericalSlider;
    NumericalSlider.__name__ = "NumericalSlider";
},
680: /* models/widgets/sliders/datetime_range_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const timezone_1 = tslib_1.__importDefault(require(248) /* timezone */);
    const numerical_range_slider_1 = require(676) /* ./numerical_range_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class DatetimeRangeSliderView extends numerical_range_slider_1.NumericalRangeSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "drag";
            this.connected = [false, true, false];
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return (0, timezone_1.default)(value, format);
            }
            else {
                return format.compute(value);
            }
        }
    }
    exports.DatetimeRangeSliderView = DatetimeRangeSliderView;
    DatetimeRangeSliderView.__name__ = "DatetimeRangeSliderView";
    class DatetimeRangeSlider extends numerical_range_slider_1.NumericalRangeSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.DatetimeRangeSlider = DatetimeRangeSlider;
    _a = DatetimeRangeSlider;
    DatetimeRangeSlider.__name__ = "DatetimeRangeSlider";
    (() => {
        _a.prototype.default_view = DatetimeRangeSliderView;
        _a.override({
            format: "%d %b %Y %H:%M:%S",
            step: 3600000, // 1 hour
        });
    })();
},
681: /* models/widgets/sliders/range_slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const numbro = tslib_1.__importStar(require(246) /* @bokeh/numbro */);
    const numerical_range_slider_1 = require(676) /* ./numerical_range_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class RangeSliderView extends numerical_range_slider_1.NumericalRangeSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "drag";
            this.connected = [false, true, false];
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return numbro.format(value, format);
            }
            else {
                return format.compute(value);
            }
        }
    }
    exports.RangeSliderView = RangeSliderView;
    RangeSliderView.__name__ = "RangeSliderView";
    class RangeSlider extends numerical_range_slider_1.NumericalRangeSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.RangeSlider = RangeSlider;
    _a = RangeSlider;
    RangeSlider.__name__ = "RangeSlider";
    (() => {
        _a.prototype.default_view = RangeSliderView;
        _a.override({
            format: "0[.]00",
        });
    })();
},
682: /* models/widgets/sliders/slider.js */ function _(require, module, exports, __esModule, __esExport) {
    var _a;
    __esModule();
    const tslib_1 = require(1) /* tslib */;
    const numbro = tslib_1.__importStar(require(246) /* @bokeh/numbro */);
    const numerical_slider_1 = require(679) /* ./numerical_slider */;
    const types_1 = require(8) /* ../../../core/util/types */;
    class SliderView extends numerical_slider_1.NumericalSliderView {
        constructor() {
            super(...arguments);
            this.behaviour = "tap";
            this.connected = [true, false];
        }
        _formatter(value, format) {
            if ((0, types_1.isString)(format)) {
                return numbro.format(value, format);
            }
            else {
                return format.compute(value);
            }
        }
    }
    exports.SliderView = SliderView;
    SliderView.__name__ = "SliderView";
    class Slider extends numerical_slider_1.NumericalSlider {
        constructor(attrs) {
            super(attrs);
        }
    }
    exports.Slider = Slider;
    _a = Slider;
    Slider.__name__ = "Slider";
    (() => {
        _a.prototype.default_view = SliderView;
        _a.override({
            format: "0[.]00",
        });
    })();
},
}, 598, {"models/widgets/main":598,"models/widgets/index":599,"models/widgets/abstract_button":600,"models/widgets/control":601,"models/widgets/widget":707,"styles/buttons.css":603,"models/widgets/autocomplete_input":604,"models/widgets/text_input":605,"models/widgets/text_like_input":606,"models/widgets/input_widget":607,"styles/widgets/inputs.css":608,"styles/dropdown.css":609,"models/widgets/button":610,"models/widgets/checkbox_button_group":611,"models/widgets/toggle_button_group":612,"models/widgets/oriented_control":613,"models/widgets/checkbox_group":614,"models/widgets/toggle_input_group":615,"styles/widgets/checkbox.css":616,"models/widgets/checkbox":617,"models/widgets/toggle_input":618,"models/widgets/color_picker":619,"models/widgets/date_picker":620,"models/widgets/base_date_picker":621,"models/widgets/picker_base":622,"styles/widgets/flatpickr.css":631,"models/widgets/date_range_picker":632,"models/widgets/datetime_picker":633,"models/widgets/base_datetime_picker":634,"models/widgets/datetime_range_picker":635,"models/widgets/div":636,"models/widgets/markup":637,"styles/clearfix.css":638,"models/widgets/dropdown":639,"styles/caret.css":640,"models/widgets/file_input":641,"models/widgets/help_button":642,"models/widgets/multi_choice":643,"styles/widgets/choices.css":645,"models/widgets/multiselect":646,"models/widgets/multiple_date_picker":647,"models/widgets/multiple_datetime_picker":648,"models/widgets/numeric_input":649,"models/widgets/palette_select":650,"core/util/panes":651,"styles/panes.css":652,"styles/widgets/palette_select.css":653,"styles/widgets/palette_select_item.css":654,"styles/widgets/palette_select_pane.css":655,"models/widgets/paragraph":656,"models/widgets/password_input":657,"styles/widgets/password_input.css":658,"models/widgets/pretext":659,"models/widgets/radio_button_group":660,"models/widgets/radio_group":661,"models/widgets/select":662,"models/widgets/spinner":663,"models/widgets/switch":664,"styles/widgets/switch.css":665,"models/widgets/textarea_input":666,"models/widgets/time_picker":667,"models/widgets/toggle":668,"models/widgets/sliders/index":669,"models/widgets/sliders/categorical_slider":670,"models/widgets/sliders/abstract_slider":671,"styles/widgets/sliders.css":673,"styles/widgets/nouislider.css":674,"models/widgets/sliders/date_range_slider":675,"models/widgets/sliders/numerical_range_slider":676,"models/widgets/sliders/base_numerical_slider":677,"models/widgets/sliders/date_slider":678,"models/widgets/sliders/numerical_slider":679,"models/widgets/sliders/datetime_range_slider":680,"models/widgets/sliders/range_slider":681,"models/widgets/sliders/slider":682}, {});});
//# sourceMappingURL=bokeh-widgets.js.map
