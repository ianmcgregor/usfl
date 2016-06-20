export default function delegateEvents(parentEl, eventType, tagName, cb) {
    tagName = tagName.toUpperCase();

    parentEl.addEventListener(eventType, (event) => {
        let target = event.target;

        while (target !== parentEl) {
            if (target.tagName === tagName) {
                event.stopImmediatePropagation();
                cb(target, event);
                break;
            }
            target = target.parentNode;
        }
    });
}
