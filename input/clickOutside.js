export default function clickOutside(el, cb) {
    function onClickOutside(event) {
        let target = event.target;
        let inside = false;

        while (target !== document.body) {
            if (target === el) {
                event.stopImmediatePropagation();
                inside = true;
                break;
            }
            target = target.parentNode;
        }

        if (!inside) {
            cb();
        }
    }
    document.body.addEventListener('mousedown', onClickOutside);
    document.body.addEventListener('touchstart', onClickOutside);

    return {
        destroy() {
            document.body.removeEventListener('mousedown', onClickOutside);
            document.body.removeEventListener('touchstart', onClickOutside);
        }
    };
}
