'use strict';

function FPS(el) {

    var ms = 0,
        fps = 0,
        currentFps = 0,
        averageFps = 0,
        ticks = 0,
        totalFps = 0;

    if(!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'fps');
        el.style.position = 'absolute';
        el.style.top = '0px';
        el.style.right = '0px';
        el.style.padding = '2px 6px';
        el.style.zIndex = '9999';
        el.style.background = '#000';
        el.style.color = '#fff';
        document.body.appendChild(el);
    }

    function report() {
        el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;
    }

    function update(time) {
        if(time === undefined) {
            time = Date.now();
        }
        if(ms === 0) {
            ms = time;
        }
        if (time - 1000 > ms) {
            ms = time;
            currentFps = fps;
            fps = 0;

            if (currentFps > 1) {
                ticks ++;
                totalFps += currentFps;
                averageFps = Math.floor(totalFps / ticks);
            }
            report();
        }
        fps++;
    }

    return {
        'update': update
    };
}

if(typeof module === 'object' && module.exports) {
    module.exports = FPS;
}
