let request = null,
    exit = null,
    change = null,
    error = null,
    element = null,
    enabled = null;

const docEl = (typeof document !== 'undefined' && document.documentElement) || {};

if (typeof docEl.requestFullscreen !== 'undefined') {
    request = 'requestFullscreen';
    exit = 'exitFullscreen';
    change = 'fullscreenchange';
    error = 'fullscreenerror';
    element = 'fullscreenElement';
    enabled = 'fullscreenEnabled';
} else if (typeof docEl.mozRequestFullScreen !== 'undefined') {
    request = 'mozRequestFullScreen';
    exit = 'mozCancelFullScreen';
    change = 'mozfullscreenchange';
    error = 'mozfullscreenerror';
    element = 'mozFullScreenElement';
    enabled = 'mozFullScreenEnabled';
} else if (typeof docEl.msRequestFullscreen !== 'undefined') {
    request = 'msRequestFullscreen';
    exit = 'msExitFullscreen';
    change = 'MSFullscreenChange';
    error = 'MSFullscreenError';
    element = 'msFullscreenElement';
    enabled = 'msFullscreenEnabled';
} else if (typeof docEl.webkitRequestFullscreen !== 'undefined') {
    request = 'webkitRequestFullscreen';
    exit = 'webkitExitFullscreen';
    change = 'webkitfullscreenchange';
    error = 'webkitFullscreenError';
    element = 'webkitFullscreenElement';
    enabled = 'webkitFullscreenEnabled';
}

export default {
    request,
    exit,
    change,
    error,
    element,
    enabled
};
