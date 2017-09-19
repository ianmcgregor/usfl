export default function delegateEvents(parentEl, eventType, filter, fn) {

    if (typeof filter === 'string') {
        const tagName = filter.toUpperCase();
        filter = target => target.tagName === tagName;
    }

    parentEl.addEventListener(eventType, (event) => {
        let target = event.target;

        while (target !== parentEl) {
            if (filter(target)) {
                event.stopImmediatePropagation();
                fn(target, event);
                break;
            }
            target = target.parentNode;
        }
    });
}
