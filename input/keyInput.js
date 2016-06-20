import keyboard from './keyboard';

export default function keyInput() {
    const keys = [];

    for (let i = 0; i < 256; i++) {
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

    const self = {
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
            return keys[keyboard.LEFT] || keys[keyboard.A];
        },
        right: function() {
            return keys[keyboard.RIGHT] || keys[keyboard.D];
        },
        up: function() {
            return keys[keyboard.UP] || keys[keyboard.W];
        },
        down: function() {
            return keys[keyboard.DOWN] || keys[keyboard.S];
        },
        space: function() {
            return keys[keyboard.SPACEBAR];
        }
    };

    self.on();

    return self;
}
