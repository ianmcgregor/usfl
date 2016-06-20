// screen.width / screen.height is often wrong in Android
const height = () => Math.max(window.outerHeight, window.screen.height);
const width = () => Math.max(window.outerWidth, window.screen.width);
const dpr = () => window.devicePixelRatio || 1;
const retina = () => dpr() > 1;

export default {
    width,
    height,
    dpr,
    retina
};
