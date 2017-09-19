import eventBus from '../events/eventBus';

export default function scroll({
    onScroll = lastScrollY => eventBus.emit('scroll', lastScrollY),
    onScrollEnd = lastScrollY => eventBus.emit('scrollend', lastScrollY),
    callNow = false,
    endTimeout = 200
} = {}) {

    let lastScrollY = 0;
    let ticking = false;
    let timeoutId;

    function update() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => onScrollEnd(lastScrollY), endTimeout);

        onScroll(lastScrollY);
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function scrollHandler() {
        // lastScrollY = window.scrollY;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    }

    function start() {
        window.addEventListener('scroll', scrollHandler, false);
    }

    function stop() {
        window.removeEventListener('scroll', scrollHandler);
    }

    start();

    if (callNow) {
        scrollHandler();
    }

    return {start, stop};
}
