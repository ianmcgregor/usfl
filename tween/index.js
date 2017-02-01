import {easeOutQuad} from '../ease/quad';

export default class Tween {
    constructor(ob, props, duration, ease = easeOutQuad, onComplete = null) {
        this.ob = ob;

        if (props) {
            this.to(props, duration, ease, onComplete);
        }
    }

    to(props, duration, ease = easeOutQuad, onComplete = null) {
        this.duration = duration;
        this.ease = ease;
        this.onComplete = onComplete;
        this.time = 0;

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

        this.time += dt;

        if (this.time > this.duration) {
            this.time = this.duration;
        }

        for (let i = 0; i < this._props.length; i++) {
            const prop = this._props[i];
            this.ob[prop] = this.ease(this.time, this._beginVals[prop], this._changeVals[prop], this.duration);
        }

        if (this.time === this.duration && this.onComplete) {
            this.onComplete();
        }
    }

    reset() {
        this.time = 0;
    }
}
