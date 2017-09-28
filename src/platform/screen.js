const hasWin = typeof window !== 'undefined';

export default {
    width: hasWin ? Math.max(window.outerWidth, window.screen.width) : 0,
    height: hasWin ? Math.max(window.outerHeight, window.screen.height) : 0,
    dpr: hasWin ? window.devicePixelRatio || 1 : 1,
    retina: hasWin ? window.devicePixelRatio > 1 : false
};
