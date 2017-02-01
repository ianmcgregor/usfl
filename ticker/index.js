// import Signal from 'signals';
import MiniSignal from 'mini-signals';

export default class Ticker {
    constructor() {
        this.update = this.update.bind(this);
        // this.onUpdate = new Signal();
        this.onUpdate = new MiniSignal();

        this.running = false;
        this.last = 0;
        // this.accumulated = 0;
        // this.step = 1000 / 60;
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
    }

    update() {
        if (!this.running) {
            return;
        }

        window.requestAnimationFrame(this.update);

        const now = Date.now();
        let dt = now - this.last;
        if (dt > 20) {
            dt = 20;
        }
        this.last = now;

        //  // fixed step:
        // this.accumulated += dt;
        //
        // while (this.accumulated >= this.step) {
        //     this.accumulated -= this.step;
        //     this.onUpdate.dispatch(this.step);
        // }

        this.onUpdate.dispatch(dt * 0.001);
    }

    add(fn, context) {
        return this.onUpdate.add(fn, context);
    }

    remove(binding) {
        this.onUpdate.detach(binding);
    }

    // remove(fn, context) {
    //     this.onUpdate.remove(fn, context);
    // }
}
