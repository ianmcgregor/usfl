export default {
    width: Math.max(window.outerWidth, window.screen.width),
    height: Math.max(window.outerHeight, window.screen.height),
    dpr: window.devicePixelRatio || 1,
    retina: window.devicePixelRatio > 1
};
