/*
 * requestAnimationFrame (ios6 and android < 4.4)
 */
(function() {
    if (typeof window === 'undefined') {
        return;
    }
    if (!window.requestAnimationFrame) {
        const vendors = ['ms', 'moz', 'webkit', 'o'];
        for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] +
                'CancelRequestAnimationFrame'];
        }
    }
}());
