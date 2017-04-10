export default function FPS(style = {}) {
    let time = 0;
    let fps = 0;
    let currentFps = 0;
    let averageFps = 0;
    let ticks = 0;
    let totalFps = 0;
    let lastFps = 0;
    let lastAverage = 0;
    let logMsg = null;

    const el = document.createElement('div');
    el.setAttribute('id', 'fps');
    el.style.fontFamily = 'monospace';
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.padding = '2px 6px';
    el.style.zIndex = '99999';
    el.style.background = '#000';
    el.style.color = '#fff';
    el.style.fontSize = '10px';
    document.body.appendChild(el);

    Object.keys(style).forEach((prop) => {
        el.style[prop] = style[prop];
    });

    function report() {
        lastFps = currentFps;
        lastAverage = averageFps;
        el.innerHTML = `FPS: ${currentFps}<br />AVE: ${averageFps}`;

        if (logMsg) {
            el.innerHTML = `${el.innerHTML}<br />MSG: ${logMsg}`;
        }
    }

    function update(now) {
        if (typeof now === 'undefined') {
            now = Date.now();
        }

        if (time === 0) {
            time = now;
        }

        if (now - 1000 > time) {
            time = now;
            currentFps = fps;
            fps = 0;

            if (currentFps > 1) {
                ticks++;
                totalFps += currentFps;
                averageFps = Math.floor(totalFps / ticks);
            }

            if (currentFps !== lastFps || averageFps !== lastAverage) {
                report();
            }
        }

        fps++;
    }

    function auto() {
        window.requestAnimationFrame(auto);

        update();
    }

    function log(value) {
        logMsg = String(value);
        report();
    }

    return {
        auto,
        el,
        log,
        update
    };
}
