import emitter from '../events/emitter';

export default function touchInput(el) {
    el = el || document.body;

    const data = {
        start: [-1, -1],
        move: [-1, -1],
        end: [-1, -1],
        position: [-1, -1],
        distance: [0, 0],
        direction: ['none', 'none'],
        touching: false,
        originalEvent: null
    };

    let self;

    function touchHandler(event) {
        if (!(event && event.touches)) {
            return;
        }
        data.originalEvent = event;
        const touch = event.touches[0];
        const x = touch && touch.pageX;
        const y = touch && touch.pageY;

        switch (event.type) {
            case 'touchstart':
                data.start[0] = data.move[0] = data.end[0] = data.position[0] = x;
                data.start[1] = data.move[1] = data.end[1] = data.position[1] = y;
                data.touching = true;
                self.emit('start', data);
                break;
            case 'touchmove':
                data.move[0] = data.position[0] = x;
                data.move[1] = data.position[1] = y;
                self.emit('move', data);
                break;
            case 'touchend':
                data.end[0] = data.position[0] = x;
                data.end[1] = data.position[1] = y;
                data.touching = false;
                self.emit('end', data);
                break;
            default: break;
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return self;
    }

    function destroy() {
        self.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return self;
    }

    listen(el);

    self = Object.create(emitter.prototype, {
        _events: {
            value: {}
        },
        listen: {
            value: listen
        },
        isDown: {
            value: function() {
                return data.touching;
            }
        },
        getTouch: {
            value: function() {
                return data;
            }
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(self);
}
