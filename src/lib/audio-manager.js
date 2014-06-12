'use strict';

// webkitAudioContextMonkeyPatch is breaking Firefox
//require('./webkitAudioContextMonkeyPatch.js');

var WebAudio = require('./web-audio.js'),
    HTMLAudio = require('./html-audio.js'),
    PageVisibility = require('./page-visibility.js');

function AudioManager() {
    this.webAudioContext = WebAudio.createContext();
    this._sounds = {};
    this._delayTimeouts = [];
    this._ext = undefined;
    this._isSupported = undefined;
    this._touchLocked = false;
    this._queued = [];

    PageVisibility.onPageHidden.add(function() {
        this.pauseAll();
    }, this);
    PageVisibility.onPageShown.add(function() {
        this.resumeAll();
    }, this);
}

AudioManager.prototype = {
    add: function(key, data, loop) {
        var sound = this.webAudioContext && !data.tagName ? new WebAudio(this.webAudioContext) : new HTMLAudio();
        sound.loop = !!(loop);
        sound.add(data);
        this._sounds[key] = sound;
        return sound;
    },
    getExtension: function() {
        if(!this._ext) {
            var el = document.createElement('audio');
            this._ext = (el.canPlayType('audio/ogg; codecs="vorbis"') ? '.ogg' : '.mp3');
        }
        return this._ext;
    },
    isSupported: function() {
        if(this._isSupported === undefined) {
            try {
                var el = document.createElement('audio');
                this._isSupported = !!(el && (el.canPlayType('audio/ogg; codecs="vorbis"') || el.canPlayType('audio/mpeg;')));
            } catch(e) {
                this._isSupported = false;
            }
        }
        return this._isSupported;
    },
    webAudioSupported: function() {
        return !!this.webAudioContext;
    },
    get: function(key) {
        return this._sounds[key];
    },
    play: function(key, delay, loop) {
        if(this._touchLocked) {
            this.queueUp(key, delay, loop);
            return;
        }
        var sound = this._sounds[key];
        if(!sound) {
            return;
        }
        if(loop !== undefined) {
            sound.loop = loop;
        }
        if(delay !== undefined && delay > 0) {
            var delayed = setTimeout(function(){
                sound.play();
            }, delay);
            this._delayTimeouts.push(delayed);
        }
        else {
            sound.play();
        }
    },
    mute: function() {
        for(var i in this._sounds) {
            this._sounds[i].volume = 0;
        }
    },
    unMute: function() {
        for(var i in this._sounds) {
            this._sounds[i].volume = 1;
        }
    },
    pause: function(key) {
        if(!this._sounds[key]) {
            return;
        }
        this._sounds[key].pause();
    },
    stop: function(key) {
        if(!this._sounds[key]) {
            return;
        }
        this._sounds[key].stop();
    },
    pauseAll: function() {
        for(var i in this._sounds) {
            if(this._sounds[i].playing) {
                this._sounds[i].pause();
            }
        }
    },
    resumeAll: function() {
        for(var i in this._sounds) {
            if(this._sounds[i].paused) {
                this._sounds[i].play();
            }
        }
    },
    stopAll: function() {
        for(var key in this._sounds) {
            this._sounds[key].stop();
        }
        for (var i = 0; i < this._delayTimeouts.length; i++) {
            clearTimeout(this._delayTimeouts[i]);
        }
        this._delayTimeouts.length = 0;
    },
    getTouchLocked: function() {
        return this._touchLocked;
    },
    setTouchLocked: function(value) {
        this._touchLocked = value;

        var self = this;
        var unlock = function() {
            self._touchLocked = false;
            document.body.removeEventListener('touchstart', unlock);
            for (var i = 0; i < self._queued.length; i++) {
                self._queued[i]();
            }
            self._queued.length = 0;
        };

        if(this._touchLocked) {
            document.body.addEventListener('touchstart', unlock, false);
        }
    },
    queueUp: function(key, delay, loop) {
        var self = this;
        var fn = function() {
            self.play(key, delay, loop);
        };
        this._queued.push(fn);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = AudioManager;
}
