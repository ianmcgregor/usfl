import api from './api';
import emitter from '../events/emitter';

const visibility = Object.create(emitter.prototype, {
    hidden: {
        get: function() {
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
