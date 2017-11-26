import EventEmitter from 'eventemitter3';

class Loop {
    constructor() {
        this.update = this.update.bind(this);

        this.raf = null;
        this.running = false;

        this.emitter = new EventEmitter();
    }

    start() {
        if (this.running) {
            return;
        }

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

        this.emitter.emit('update');
    }

    add(fn) {
        this.emitter.on('update', fn);
        return this;
    }

    remove(fn) {
        this.emitter.removeListener('update', fn);
        return this;
    }
}

const loop = new Loop();
loop.start();
export default loop;
