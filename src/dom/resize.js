import eventBus from '../events/eventBus';

export default function resize({
    onResize = () => eventBus.emit('resize'),
    callNow = false,
    debouceDelay = 500
} = {}) {

    let timeoutId = null;

    function resizeHandler() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => onResize(), debouceDelay);
    }

    function start() {
        window.addEventListener('resize', resizeHandler, false);
    }

    function stop() {
        window.removeEventListener('resize', resizeHandler);
    }

    start();

    if (callNow) {
        resizeHandler();
    }

    return {start, stop};
}
