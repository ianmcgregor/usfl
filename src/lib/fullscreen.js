'use strict';

var signals = require('signals');

var self,
    el = document.documentElement,
    isSupported = !!( el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen ),
    onChange = new signals.Signal();

function onFullscreenChange() {
    onChange.dispatch(self.isFullscreen());
}

if(isSupported) {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    //document.addEventListener('msfullscreenchange', onFullscreenChange);
}

self = {
    'isSupported': isSupported,
    'onChange': onChange,

    enter: function(element) {
        element = element || document.documentElement;

        var method = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen;// || element.msRequestFullscreen;

        if (method) {
            method.call(element);
        }
    },
    exit: function() {
        var method = document.exitFullscreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;// || document.msExitFullscreen;

        if (method) {
            method.call(document);
        }
    },
    toggle: function(element) {
        if(this.isFullscreen()) {
            this.exit();
        } else {
            this.enter(element);
        }
    },
    isFullscreen: function() {
        return !!( document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen );// || document.msFullscreenElement );
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = self;
}
