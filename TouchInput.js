'use strict';

var EventEmitter = require('./emitter');

module.exports = function TouchInput(el, minSwipeDistance) {
    el = el || document.body;
    minSwipeDistance = minSwipeDistance || 10;

    var data = {
        start: [-1, -1],
        move: [-1, -1],
        end: [-1, -1],
        position: [-1, -1],
        distance: [0, 0],
        direction: ['none', 'none'],
        touching: false,
        originalEvent: null
    };

    var touchInput;

    function detectSwipe(i, a, b) {
        data.distance[i] = Math.abs(data.start[i] - data.end[i]);
        if (data.distance[i] >= minSwipeDistance) {
            data.direction[i] = data.start[i] > data.move[i] ? a : b;
            touchInput.emit('swipe', data.direction[i], data);
        }
    }

    function touchHandler(event) {
        if (!(event && event.touches)) {
            return;
        }
        data.originalEvent = event;
        var touch = event.touches[0];
        var x = touch && touch.pageX;
        var y = touch && touch.pageY;

        switch (event.type) {
            case 'touchstart':
                data.start[0] = data.move[0] = data.end[0] = data.position[0] = x;
                data.start[1] = data.move[1] = data.end[1] = data.position[1] = y;
                data.touching = true;
                break;
            case 'touchmove':
                data.move[0] = data.position[0] = x;
                data.move[1] = data.position[1] = y;
                break;
            case 'touchend':
                data.end[0] = data.position[0] = x;
                data.end[1] = data.position[1] = y;
                data.touching = false;
                if (touchInput.listenerCount('swipe')) {
                    detectSwipe(0, 'left', 'right');
                    detectSwipe(1, 'up', 'down');
                }
                break;
            default:
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return touchInput;
    }

    function destroy() {
        touchInput.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return touchInput;
    }

    listen(el);

    touchInput = Object.create(EventEmitter.prototype, {
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

    return Object.freeze(touchInput);
};
