import type { Rect } from "../types";
/**
 * Formula from: http://pomax.nihongoresources.com/pages/bezier/
 *
 * if segment is quadratic bezier do:
 *   for both directions do:
 *     if control between start and end, compute linear bounding box
 *     otherwise, compute
 *       bound = u(1-t)^2 + 2v(1-t)t + wt^2
 *         (with t = ((u-v) / (u-2v+w)), with {u = start, v = control, w = end})
 *       if control precedes start, min = bound, otherwise max = bound
 */
export declare function qbb(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number): Rect;
export declare function cbb(x0: number, y0: number, cx0: number, cy0: number, cx1: number, cy1: number, x1: number, y1: number): Rect;
//# sourceMappingURL=algorithms.d.ts.map