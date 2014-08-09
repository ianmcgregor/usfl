/*
 * ie8
 */

'use strict';

var getEvent = function (e, el) {
    if (!e) { e = window.event; }

    if (e.srcElement) {
        e.target = e.srcElement;
        e.currentTarget = el;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
    }
    return e;
};

var addEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
    } else {
        return function (el, type, fn) {
            el.attachEvent('on' + type, function (e) {
                e = getEvent(e, el);
                fn(e);
            });
        };
    }
}());

var removeEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else {
        return function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    }
}());

var EventUtils = {
    'addEvent': addEvent,
    'removeEvent': removeEvent
};

if (typeof module === 'object' && module.exports) {
    module.exports = EventUtils;
}
