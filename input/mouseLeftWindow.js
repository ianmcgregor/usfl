module.exports = function mouseLeftWindow(cb) {
    function handler(event) {
        const from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            cb();
        }
    }

    document.addEventListener('mouseout', handler, false);

    return {
        destroy () {
            document.removeEventListener('mouseout', handler);
        }
    };
};
