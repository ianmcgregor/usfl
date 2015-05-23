'use strict';

var Keyboard = require('./keyboard');

function KeyInput() {
    var keys = [];

    for (var i = 0; i < 256; i++) {
        keys.push(false);
    }

    function onKeyDown(event) {
        event.preventDefault();
        keys[event.keyCode] = true;
    }

    function onKeyUp(event) {
        event.preventDefault();
        keys[event.keyCode] = false;
    }

    var self = {
        on: function() {
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);
        },
        off: function() {
            document.removeEventListener('keydown', onKeyDown, false);
            document.removeEventListener('keyup', onKeyUp, false);
        },
        isDown: function(key) {
            return keys[key];
        },
        left: function() {
            return keys[Keyboard.LEFT] || keys[Keyboard.A];
        },
        right: function() {
            return keys[Keyboard.RIGHT] || keys[Keyboard.D];
        },
        up: function() {
            return keys[Keyboard.UP] || keys[Keyboard.W];
        },
        down: function() {
            return keys[Keyboard.DOWN] || keys[Keyboard.S];
        },
        space: function() {
            return keys[Keyboard.SPACEBAR];
        }
    };

    self.on();

    return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = KeyInput;
}
