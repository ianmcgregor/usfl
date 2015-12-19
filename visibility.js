'use strict';

var Emitter = require('./Emitter');

var visibility,
    hidden,
    visibilityChange;

function onVisibilityChange() {
    if (document[hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

if (visibilityChange !== undefined) {
    document.addEventListener(visibilityChange, onVisibilityChange, false);
}

visibility = Object.create(Emitter.prototype, {
    _events: { value: {} }
});

if (typeof module === 'object' && module.exports) {
    module.exports = visibility;
}
