export default function debounce(handler) {
    let ticking = false;

    function update(event) {
        handler(event);
        ticking = false;
    }

    function requestTick(event) {
        if (!ticking) {
            window.requestAnimationFrame(() => update(event));
            ticking = true;
        }
    }

    return requestTick;
}
