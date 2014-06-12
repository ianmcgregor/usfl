'use strict';

var signals = require('signals');

function VideoObject() {
    var NETWORK_STATE = ['NETWORK_EMPTY','NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE'],
        READY_STATE = ['HAVE_NOTHING','HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA'],
        ERROR_STATE = ['','ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'],
        self,
        videoElement = null,
        onReady = new signals.Signal(),
        onPlay = new signals.Signal(),
        onError = new signals.Signal(),
        onEnded = new signals.Signal(),
        onTimeUpdate = new signals.Signal(),
        forceLoadTimeout = null;

    var canplayHandler = function() {
        onReady.dispatch(self);
    };

    var playHandler = function() {
        onPlay.dispatch(self);
    };

    var endedHandler = function() {
        onEnded.dispatch(self);
    };

    var errorHandler = function(event) {
        onError.dispatch(self, event.target.error);
    };

    var timeupdateHandler = function() {
        if(onTimeUpdate.getNumListeners() > 0) {
            onTimeUpdate.dispatch(self, videoElement.currentTime);
        }
    };

    var create = function() {
        if(videoElement !== null) {
            return;
        }
        videoElement = document.createElement('video');
        videoElement.addEventListener('canplaythrough', canplayHandler, false);
        videoElement.addEventListener('play', playHandler, false);
        videoElement.addEventListener('playing', playHandler, false);
        //videoElement.addEventListener('loadedmetadata', canplayHandler, false);
        //videoElement.addEventListener('loadeddata', loadedHandler, false);
        videoElement.addEventListener('error', errorHandler, false);
        videoElement.addEventListener('ended', endedHandler, false);
        videoElement.addEventListener('timeupdate', timeupdateHandler, false);
    };

    var unload = function() {
        clearTimeout(forceLoadTimeout);

        onReady.removeAll();
        onPlay.removeAll();
        onError.removeAll();
        onEnded.removeAll();
        onTimeUpdate.removeAll();

        if(videoElement === null) {
            return;
        }

        videoElement.pause();

        try {
            videoElement.removeAttribute('src');
            //videoElement.setAttribute('src', '');
            //videoElement.load();
        } catch(e) {}
    };

    var destroy = function() {
        unload();
        if(videoElement === null) {
            return;
        }

        videoElement.removeEventListener('canplaythrough', canplayHandler, false);
        videoElement.removeEventListener('play', playHandler, false);
        videoElement.removeEventListener('playing', playHandler, false);
        //videoElement.removeEventListener('loadedmetadata', canplayHandler, false);
        //videoElement.removeEventListener('loadeddata', loadedHandler, false);
        videoElement.removeEventListener('error', errorHandler, false);
        videoElement.removeEventListener('ended', endedHandler, false);
        videoElement.removeEventListener('timeupdate', timeupdateHandler, false);

        if(videoElement.parentElement) {
            videoElement.parentElement.removeChild(videoElement);
        }
        videoElement = null;
    };

    var load = function(url) {
        if(videoElement === null) {
            create();
        }
        //videoElement.setAttribute('preload', 'auto');
        //videoElement.setAttribute('autoplay', false);
        //videoElement.setAttribute('poster', 'assets/img/wallpapers/test-medium.jpg');
        videoElement.setAttribute('src', url);
        videoElement.load();
    };

    var forceLoad = function(pauseDelay) {
        if(pauseDelay === undefined) {
            pauseDelay = 40;
        }
        play();
        forceLoadTimeout = setTimeout(function() {
            pause();
            seek(0);
        }, pauseDelay);
    };

    var play = function() {
        if(videoElement) {
            clearTimeout(forceLoadTimeout);
            videoElement.play();
        }
    };

    var pause = function() {
        if(videoElement) {
            videoElement.pause();
        }
    };

    var seek = function(time) {
        try {
            videoElement.currentTime = time;
        } catch(e) {

        }
    };

    var getNetworkStateString = function() {
        if(videoElement) {
            var i = videoElement.networkState;
            return NETWORK_STATE[i];
        }
        return '';
    };

    var getReadyStateString = function() {
        if(videoElement) {
            var i = videoElement.readyState;
            return READY_STATE[i];
        }
        return '';
    };

    var getErrorStateString = function() {
        if(videoElement) {
            var i = videoElement.error ? videoElement.error.code : 0;
            return ERROR_STATE[i];
        }
        return '';
    };

    var getBufferProgress = function() {
        if(isNaN(videoElement.duration)) {
            return -1;
        }
        var p = -1;
        if (videoElement.buffered && videoElement.buffered.length > 0 && videoElement.buffered.end && videoElement.duration) {
            p = videoElement.buffered.end(0) / videoElement.duration;
            if(isNaN(p)) {
                p = -1;
            }
        }
        return Math.round(p * 10) / 10;
    };

    self = {
        'onReady': onReady,
        'onPlay': onPlay,
        'onError': onError,
        'onEnded': onEnded,
        'onTimeUpdate': onTimeUpdate,

        'create': create,
        'load': load,
        'forceLoad': forceLoad,
        'unload': unload,
        'destroy': destroy,
        'play': play,
        'pause': pause,
        'seek': seek,
        'getBufferProgress': getBufferProgress,
        'getReadyStateString': getReadyStateString,
        'getNetworkStateString': getNetworkStateString,
        'getErrorStateString': getErrorStateString,

        getElement: function() {
            return videoElement;
        },
        getVolume: function() {
            if(videoElement === null) {
                return NaN;
            }
            return videoElement.volume;
        },
        setVolume: function(value) {
            if(videoElement === null) {
                return;
            }
            videoElement.volume = value;
        }
    };

    return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = VideoObject;
}
