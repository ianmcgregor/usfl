'use strict';

function FPS(el) {

    var time = 0,
        fps = 0,
        currentFps = 0,
        averageFps = 0,
        ticks = 0,
        totalFps = 0;
    //  getMem = window.performance && window.performance.memory,
    //  lastUsedHeap = 0,
    //  gcPauses = 0;

    if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'fps');
        el.style.position = 'absolute';
        el.style.top = '0px';
        el.style.right = '0px';
        el.style.padding = '2px 6px';
        el.style.zIndex = '99999';
        el.style.background = '#000';
        el.style.color = '#fff';
        el.style.fontSize = '10px';
        document.body.appendChild(el);
    }

    function report() {
        el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;

        // if (getMem) {
        //     // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-memory-info
        //     var memoryInfo = window.performance.memory;
        //     var percentUsed = memoryInfo.totalJSHeapSize / memoryInfo.jsHeapSizeLimit;

        //     if (memoryInfo.usedJSHeapSize < lastUsedHeap) {
        //         // console.log('Garbage collected!');
        //         gcPauses++;
        //         lastUsedHeap = memoryInfo.usedJSHeapSize;
        //     }
        //     // memoryInfo.jsHeapSizeLimit;
        //     // memoryInfo.totalJSHeapSize;
        //     // memoryInfo.usedJSHeapSize;
        //     el.innerHTML = 'FPS: ' + currentFps +
        //                                    '<br />AVE: ' + averageFps +
        //                                    '<br />MEM: ' + (percentUsed * 100).toFixed(1) + '%' +
        //                                    '<br />totalJSHeapSize: ' + memoryInfo.totalJSHeapSize +
        //                                    '<br />jsHeapSizeLimit: ' + memoryInfo.jsHeapSizeLimit +
        //                                    '<br />usedJSHeapSize: ' + memoryInfo.usedJSHeapSize +
        //                                    '<br />GC: ' + gcPauses;
        // }
    }

    function update(now) {
        // console.log('-->', now);

        if (now === undefined) {
            now = Date.now();
        }
        if (time === 0) {
            time = now;
        }
        // console.log(now, time);
        if (now - 1000 > time) {
            time = now;
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

    function autoUpdate() {
        window.requestAnimationFrame(autoUpdate);

        update();
    }

    return {
        'autoUpdate': autoUpdate,
        'update': update
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = FPS;
}
