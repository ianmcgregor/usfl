export default function mouseLeftWindow(cb) {
    document.addEventListener('mouseout', (event) => {
        const from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            cb();
        }
    });
}
