import api from './api';
import emitter from '../events/emitter';

const fullscreen = Object.create(emitter.prototype);

document.addEventListener(api.change, (event) => {
    fullscreen.emit('change', event);
});

document.addEventListener(api.error, (event) => {
    fullscreen.emit('error', event);
});

Object.defineProperties(fullscreen, {
    request: {
        value: function(el) {
            el = el || document.documentElement;
            el[api.request](true);
        }
    },
    exit: {
        value: function() {
            document[api.exit]();
        }
    },
    toggle: {
        value: function(el) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(el);
            }
        }
    },
    isSupported: {
        get() {
            return !!api.request;
        }
    },
    isFullscreen: {
        get() {
            return !!document[api.element];
        }
    },
    element: {
        enumerable: true,
        get() {
            return document[api.element];
        }
    },
    enabled: {
        enumerable: true,
        get() {
            return document[api.enabled];
        }
    }
});

export default fullscreen;
