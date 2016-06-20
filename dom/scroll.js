import eventBus from '../events/eventBus';

export default function scroll() {

    let lastScrollY = 0,
        ticking = false,
        timeoutId;

    function update() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => eventBus.emit('scrollend', lastScrollY), 200);

        eventBus.emit('scroll', lastScrollY);
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function onScroll() {
        // lastScrollY = window.scrollY;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    }

    window.addEventListener('scroll', onScroll, false);
}
