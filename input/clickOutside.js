function getTest(el) {
    if (Array.isArray(el)) {
        return target => el.includes(target);
    }
    if (typeof el === 'function') {
        return target => el(target);
    }
    return target => target === el;
}

export default function clickOutside(el, fn) {
    const test = getTest(el);

    function onClickOutside(event) {
        let target = event.target;
        let inside = false;

        while (target !== document.body) {
            if (test(target)) {
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

    destroy();

    document.body.addEventListener('click', onClickOutside);
    document.body.addEventListener('touchstart', onTouchOutside);

    return {
        destroy
    };
}
