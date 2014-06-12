'use strict';

function HTMLAudio() {
    this._sound = null;
    this._loop = false;
    this._volume = 1;
    this._playing = false;
    this._paused = false;
}

HTMLAudio.prototype = {
    add: function(el) {
        this._sound = el;
        return this._sound;
    },
    play: function() {
        if(this._sound.volume !== undefined) {
            this._sound.volume = this._volume;
        }
        this._sound.play();
        this._playing = true;
        this._paused = false;

        var self = this;
        this._sound.addEventListener('ended', function() {
            if(self._loop) {
                this.currentTime = 0;
                this.play();
            }
            else {
                self._playing = false;
            }
        }, false);
    },
    pause: function() {
        this._sound.pause();
        this._playing = false;
        this._paused = true;
    },
    stop: function() {
        this._sound.pause();
        this._playing = false;
        this._paused = false;
    }
};

Object.defineProperty(HTMLAudio.prototype, 'loop', {
    get: function() {
        return this._loop;
    },
    set: function(value) {
        this._loop = value;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'volume', {
    get: function() {
        return this._volume;
    },
    set: function(value) {
        if(isNaN(value)) {
            return;
        }
        this._volume = value;
        if(this._sound && this._sound.volume !== undefined) {
            this._sound.volume = this._volume;
        }
    }
});

Object.defineProperty(HTMLAudio.prototype, 'playing', {
    get: function() {
        return this._playing;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'paused', {
    get: function() {
        return this._paused;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'sound', {
    get: function() {
        return this._sound;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = HTMLAudio;
}
