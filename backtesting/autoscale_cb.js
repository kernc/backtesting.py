if (!window._bt_extremes)
    window._bt_extremes = function (arr, initial, agg_func) {
        const CHUNK = 32768;
        let extreme = initial;
        for (let i = 0, len = arr.length; i < len; i += CHUNK) {
            const subarr = CHUNK >= len ? arr : arr.slice(i, i + CHUNK);
            extreme = agg_func(extreme, agg_func.apply(null, subarr));
        }
        return extreme;
    };

if (!window._bt_bin_search)
    window._bt_bin_search = function (index, value) {
        let mid,
            min = 0,
            max = index.length - 1;

        while (min < max) {
            mid = (min + max) / 2 | 0;
            if (index[mid] < value)
                min = mid + 1;
            else
                max = mid - 1;
        }
        return min;
    };

if (!window._bt_scale_range)
    window._bt_scale_range = function (range, highs, lows) {
        const max = _bt_extremes(highs, -Infinity, Math.max),
              min = lows && _bt_extremes(lows, Infinity, Math.min);
        if (min !== Infinity && max !== -Infinity) {
            const pad = (max - min) * .03;
            range.start = min - pad;
            range.end = max + pad;
        }
    };

clearTimeout(window._bt_autoscale_timeout);

window._bt_autoscale_timeout = setTimeout(function () {
    /**
     * @variable cb_obj `fig_ohlc.x_range`.
     * @variable source `ColumnDataSource`
     * @variable ohlc_range `fig_ohlc.y_range`.
     * @variable volume_range `fig_volume.y_range`.
     */

    let index = source.data['index'],
        i = Math.max(_bt_bin_search(index, cb_obj.start) - 1, 0),
        j = Math.min(_bt_bin_search(index, cb_obj.end) + 1, index.length);

    _bt_scale_range(
        ohlc_range,
        source.data['ohlc_high'].slice(i, j),
        source.data['ohlc_low'].slice(i, j));
    try {
        _bt_scale_range(
            volume_range,
            source.data['Volume'].slice(i, j),
            0);
    } catch (e) {}  // volume_range may be undefined

}, 50);
