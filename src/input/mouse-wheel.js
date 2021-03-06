import Emitter from '../events/emitter';

export default function mouseWheel(speed) {
    speed = speed || 2;

    let wheel = null;

    function wheelHandler(event) {
        const direction = (event.detail < 0 || event.wheelDelta > 0) ? 1 : -1;
        const delta = direction * speed;

        if (direction > 0) {
            wheel.emit('up', delta);
        } else {
            wheel.emit('down', delta);
        }

        wheel.emit('update', delta);
    }

    function add() {
        if ('onmousewheel' in window) {
            window.addEventListener('mousewheel', wheelHandler, false);
        } else if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    function remove() {
        if ('onmousewheel' in window) {
            window.removeEventListener('mousewheel', wheelHandler, false);
        } else if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    add();

    wheel = Object.assign(new Emitter(), {
        add,
        remove
    });

    return wheel;
}
