import emitter from '../events/emitter';

export default function MouseWheel(speed) {
    speed = speed || 2;

    let mouseWheel;

    function mouseWheelHandler(event) {
        const direction = (event.detail < 0 || event.wheelDelta > 0) ? 1 : -1;
        const delta = direction * speed;

        if (direction > 0) {
            mouseWheel.emit('up', delta);
        } else {
            mouseWheel.emit('down', delta);
        }

        mouseWheel.emit('update', delta);
    }

    function add() {
        if ('onmousewheel' in window) {
            window.addEventListener('mousewheel', mouseWheelHandler, false);
        } else if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
        }
    }

    function remove() {
        if ('onmousewheel' in window) {
            window.removeEventListener('mousewheel', mouseWheelHandler, false);
        } else if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', mouseWheelHandler, false);
        }
    }

    add();

    mouseWheel = Object.create(emitter.prototype, {
        _events: {
            value: {}
        },
        add: {
            value: add
        },
        remove: {
            value: remove
        }
    });

    return Object.freeze(mouseWheel);
}
