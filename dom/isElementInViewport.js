export default function isElementInViewport(el, buffer = 0) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 - buffer &&
        rect.left >= 0 - buffer &&
        rect.bottom <= window.innerHeight + buffer &&
        rect.right <= window.innerWidth + buffer
    );
}
