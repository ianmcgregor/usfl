import Emitter from './emitter';

export default function heartbeat(interval) {
    let beat = null,
        time = 0,
        numTimes = 0,
        maxTimes = 0,
        running = false;

    function start(maxNumTimes = 0, timeOffset = 0) {
        maxTimes = maxNumTimes;
        time = timeOffset;
        numTimes = 0;
        running = true;
        return beat;
    }

    function stop() {
        running = false;
        return beat;
    }

    function update(dt = 1) {
        if (!running) {
            return beat;
        }

        if (maxTimes > 0 && numTimes >= maxTimes) {
            running = false;
            beat.emit('complete');
            return beat;
        }

        time += dt;

        if (time >= interval) {
            time = 0;
            numTimes++;
            beat.emit('update', numTimes);
        }
        return beat;
    }

    function setInterval(value) {
        interval = value;
        return beat;
    }

    beat = Object.assign(new Emitter(), {
        start,
        stop,
        update,
        setInterval
    });

    Object.defineProperties(beat, {
        interval: {
            get() {
                return interval;
            },
            set(value) {
                interval = value;
            }
        }
    });

    return beat;
}
