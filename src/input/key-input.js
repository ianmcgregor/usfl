import array from '../array/array';
import Emitter from '../events/emitter';
import keyboard from './keyboard';

export default function keyInput() {
    const api = new Emitter();
    const keys = array(256, false);

    function emitKey(keyCode) {
        const keyName = Object.keys(keyboard).reduce((value, key) => {
            return keyboard[key] === keyCode ? key : value;
        }, '').toLowerCase();
        if (keyName) {
            api.emit(keyName.toLowerCase());
        }
    }

    function onKeyDown(event) {
        event.preventDefault();
        keys[event.keyCode] = true;
        api.emit('keydown', event.keyCode);
        emitKey(event.keyCode);
    }

    function onKeyUp(event) {
        event.preventDefault();
        keys[event.keyCode] = false;
        api.emit('keyup', event.keyCode);
    }

    function add() {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    function remove() {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
    }

    function isDown(key) {
        return keys[key];
    }

    function left() {
        return keys[keyboard.LEFT] || keys[keyboard.A];
    }

    function right() {
        return keys[keyboard.RIGHT] || keys[keyboard.D];
    }

    function up() {
        return keys[keyboard.UP] || keys[keyboard.W];
    }

    function down() {
        return keys[keyboard.DOWN] || keys[keyboard.S];
    }

    function space() {
        return keys[keyboard.SPACE];
    }

    function enable(value = true) {
        remove();
        if (value) {
            add();
        }
    }

    add();

    return Object.assign(api, {
        keyboard,
        enable,
        isDown,
        left,
        right,
        up,
        down,
        space
    });
}
