import EventEmitter from 'eventemitter3';

export class Loop {
    constructor() {
        this.update = this.update.bind(this);

        this.last = 0;
        this.raf = null;
        this.running = false;

        this.emitter = new EventEmitter();
    }

    start() {
        if (this.running) {
            return;
        }

        this.last = 0;
        this.running = true;
        this.update();
    }

    stop() {
        if (!this.running) {
            return;
        }

        this.running = false;
        window.cancelAnimationFrame(this.raf);
    }

    update() {
        if (!this.running) {
            return;
        }

        this.raf = window.requestAnimationFrame(this.update);

        const now = Date.now();
        const deltaTime = now - this.last;
        const deltaFrames = deltaTime * 0.06;
        this.last = now;

        this.emitter.emit('update', deltaFrames, deltaTime);
    }

    add(fn) {
        this.emitter.on('update', fn);
        return this;
    }

    remove(fn) {
        this.emitter.removeListener('update', fn);
    }
}

export default new Loop();
