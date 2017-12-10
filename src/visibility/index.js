import api from './api';
import Emitter from '../events/emitter';

const visibility = new Emitter();

Object.defineProperties(visibility, {
    hidden: {
        get() {
            return document[api.hidden];
        }
    }
});

function onVisibilityChange() {
    if (document[api.hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (api.change) {
    document.addEventListener(api.change, onVisibilityChange, false);
}

export default visibility;
