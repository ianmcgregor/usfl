export default function mouseLeftWindow(fn) {
    function handler(event) {
        const from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            fn(event);
        }
    }

    document.addEventListener('mouseout', handler, false);

    return {
        destroy () {
            document.removeEventListener('mouseout', handler);
        }
    };
}
