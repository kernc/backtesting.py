if (!window._bt_scale_range) {
    window._bt_scale_range = function (range, min, max, pad) {
        "use strict";
        if (min !== Infinity && max !== -Infinity) {
            pad = pad ? (max - min) * .03 : 0;
            range.start = min - pad;
            range.end = max + pad;
        } else console.error('backtesting: scale range error:', min, max, range);
    };
}

clearTimeout(window._bt_autoscale_timeout);

window._bt_autoscale_timeout = setTimeout(function () {
    /**
     * @variable cb_obj `fig_ohlc.x_range`.
     * @variable source `ColumnDataSource`
     * @variable ohlc_range `fig_ohlc.y_range`.
     * @variable volume_range `fig_volume.y_range`.
     */
    "use strict";

    let i = Math.max(Math.floor(cb_obj.start), 0),
        j = Math.min(Math.ceil(cb_obj.end), source.data['ohlc_high'].length);

    let max = Math.max.apply(null, source.data['ohlc_high'].slice(i, j)),
        min = Math.min.apply(null, source.data['ohlc_low'].slice(i, j));
    _bt_scale_range(ohlc_range, min, max, true);

    if (volume_range) {
        max = Math.max.apply(null, source.data['Volume'].slice(i, j));
        _bt_scale_range(volume_range, 0, max * 1.03, false);
    }

}, 50);
