import {easeOutQuad} from '../ease/quad';

export default class Tween {
    constructor(ob, props, duration, options) {
        this.ob = ob;

        if (props) {
            this.to(props, duration, options);
        }
    }

    to(props, duration, options = {}) {
        this.duration = duration;
        this.ease = options.ease || easeOutQuad;
        this.delay = options.delay || 0;
        this.onUpdate = options.onUpdate;
        this.onComplete = options.onComplete;
        this.time = 0;
        this.complete = false;

        this._props = Object.keys(props);
        this._beginVals = {};
        this._changeVals = {};

        for (let i = 0; i < this._props.length; i++) {
            const prop = this._props[i];
            this._beginVals[prop] = this.ob[prop];
            this._changeVals[prop] = props[prop] - this._beginVals[prop];
        }
    }

    update(dt) {
        if (this.time === this.duration) {
            return;
        }

        if (this.delay > 0) {
            this.delay -= dt;
            return;
        }

        this.time += dt;

        if (this.time > this.duration) {
            this.time = this.duration;
        }

        for (let i = 0; i < this._props.length; i++) {
            const prop = this._props[i];
            this.ob[prop] = this.ease(this.time, this._beginVals[prop], this._changeVals[prop], this.duration);
        }

        if (this.onUpdate) {
            this.onUpdate(this.ob);
        }

        if (this.time === this.duration) {
            this.complete = true;

            if (this.onComplete) {
                this.onComplete(this.ob);
            }
        }
    }

    reset() {
        this.time = 0;
        this.complete = false;
    }
}
