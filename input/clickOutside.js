export default function clickOutside(el, fn) {
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
            fn(event);
        }
    }

    function onTouchOutside(event) {
        document.body.removeEventListener('click', onClickOutside);
        onClickOutside(event);
    }

    function destroy() {
        document.body.removeEventListener('click', onClickOutside);
        document.body.removeEventListener('touchstart', onTouchOutside);
    }

    document.body.addEventListener('click', onClickOutside);
    document.body.addEventListener('touchstart', onTouchOutside);

    return {
        destroy
    };
}
