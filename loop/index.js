import MiniSignal from 'mini-signals';

export default class Loop {
    constructor() {
        this.update = this.update.bind(this);
        this.onUpdate = new MiniSignal();

        this.raf = null;
        this.running = false;
        this.last = 0;
        this.delta = 0;
        this.elasped = 0;
        this.deltaSecs = 0;
        this.elaspedSecs = 0;

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
        this.last = 0;
        this.running = false;
        window.cancelAnimationFrame(this.raf);
    }

    update() {
        if (!this.running) {
            return;
        }

        this.raf = window.requestAnimationFrame(this.update);

        const now = Date.now();
        let deltaMs = now - this.last;
        if (deltaMs > 20) {
            deltaMs = 20;
        }
        this.last = now;

        this.delta = deltaMs * 0.06;
        this.elasped += this.delta;

        this.deltaSecs = deltaMs * 0.001;
        this.elaspedSecs += this.deltaSecs;

        //  // fixed step:
        // this.accumulated += dt;
        //
        // while (this.accumulated >= this.step) {
        //     this.accumulated -= this.step;
        //     this.onUpdate.dispatch(this.step);
        // }

        this.onUpdate.dispatch(this.delta, this.elasped);
    }

    add(fn, context) {
        return this.onUpdate.add(fn, context);
    }

    remove(binding) {
        this.onUpdate.detach(binding);
    }
}
