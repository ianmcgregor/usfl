import events from 'events';

export default class emitter extends events.EventEmitter {
    constructor() {
        super();

        this.setMaxListeners(20);
    }

    off (type, listener) {
        if (listener) {
            return this.removeListener(type, listener);
        }
        if (type) {
            return this.removeAllListeners(type);
        }
        return this.removeAllListeners();
    }
}
