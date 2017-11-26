export default function iOSPlayVideoInline(el, loop = true) {
    const frameTime = 1 / 25;

    let self = null;
    let lastTime = 0;
    let playing = false;

    // This can (and should) be put in a css file instead of doing styleSheets[0].insertRule:
    const cssRule = '.iOSPlayVideoInline::-webkit-media-controls { display:none !important; }';
    document.styleSheets[0].insertRule(cssRule, 0);

    el.removeAttribute('controls');
    el.classList.add('iOSPlayVideoInline');


    function seek(time) {
        el.currentTime = time;
        return self;
    }

    function pause() {
        playing = false;
        return self;
    }

    function updateFrame() {
        if (!playing) {
            return;
        }

        window.requestAnimationFrame(updateFrame);

        const now = Date.now();
        const deltaTime = now - lastTime;

        if (deltaTime >= frameTime * 1000) {
            lastTime = now;

            const ended = el.currentTime + frameTime >= el.duration;

            if (ended && loop) {
                seek(0);
            } else if (ended) {
                pause();
                // self.emit('ended');
            } else {
                seek(el.currentTime + frameTime);
            }

            // self.emit('timeupdate', el.currentTime, self);
        }
    }

    function play() {
        playing = true;
        updateFrame();
        return self;
    }

    function destroy() {
        // self.removeAllListeners();
        pause();
        window.cancelAnimationFrame(updateFrame);

        return self;
    }

    // self = Object.create(Emitter.prototype, {
    self = Object.create(null, {
        destroy: {
            value: destroy
        },
        pause: {
            value: pause
        },
        play: {
            value: play
        },
        seek: {
            value: seek
        },
        el: {
            get: function() {
                return el;
            }
        },
        currentTime: {
            get: function() {
                return el.currentTime;
            }
        },
        duration: {
            get: function() {
                return el.duration;
            }
        },
        loop: {
            get: function() {
                return loop;
            },
            set: function(value) {
                loop = value;
            }
        },
        playing: {
            get: function() {
                return playing;
            }
        }
    });

    return Object.freeze(self);
}
